import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// Helper function to check if user exists in GoHighLevel
async function searchGHLContact(email: string) {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.log('GHL credentials not configured');
      return null;
    }

    const response = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
          'Version': '2021-07-28',
          'Location-Id': process.env.GHL_LOCATION_ID
        }
      }
    );

    if (!response.ok) {
      console.error('GHL search failed:', response.status);
      return null;
    }

    const data = await response.json();
    if (data.contact) {
      console.log('✅ Found existing GHL contact:', email);
      return data.contact;
    }

    console.log('ℹ️ No GHL contact found for:', email);
    return null;
  } catch (error) {
    console.error('GHL search error:', error);
    return null;
  }
}

// Helper function to create new contact in GoHighLevel
async function createGHLContact(email: string, name: string, plan: string = 'free') {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.log('GHL credentials not configured - skipping contact creation');
      return null;
    }

    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Location-Id': process.env.GHL_LOCATION_ID
      },
      body: JSON.stringify({
        email,
        name,
        tags: [`siteoptz-plan-${plan}`],
        source: 'Google OAuth'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('GHL create contact failed:', error);
      return null;
    }

    const data = await response.json();
    console.log('✅ Created new GHL contact:', email, 'with plan:', plan);
    return data.contact;
  } catch (error) {
    console.error('GHL create contact error:', error);
    return null;
  }
}

// Helper function to extract plan from GHL contact tags
function extractPlanFromTags(tags: string[]): string {
  if (!tags || !Array.isArray(tags)) return 'free';
  
  const planTag = tags.find(tag => tag.startsWith('siteoptz-plan-'));
  if (planTag) {
    const plan = planTag.replace('siteoptz-plan-', '');
    console.log('📋 Extracted plan from GHL tags:', plan);
    return plan;
  }
  
  return 'free';
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('🔥 OAuth Sign In Attempt:', user.email);
      
      // Only process Google OAuth
      if (account?.provider !== 'google') {
        return true;
      }

      try {
        // Check if user exists in GoHighLevel
        const existingContact = await searchGHLContact(user.email!);
        
        if (!existingContact) {
          // New user - create in GoHighLevel with free plan
          console.log('🆕 New user via OAuth, creating in GHL:', user.email);
          const newContact = await createGHLContact(
            user.email!,
            user.name || 'User',
            'free' // Default to free plan for OAuth signups
          );
          
          if (!newContact && process.env.GHL_API_KEY) {
            // If GHL is configured but creation failed, block sign in
            console.error('❌ Failed to create GHL contact, blocking sign in');
            return false;
          }
        } else {
          console.log('✅ Existing user found in GHL:', user.email);
        }
        
        return true;
      } catch (error) {
        console.error('❌ Sign in callback error:', error);
        // If GHL integration fails but is not configured, allow sign in
        if (!process.env.GHL_API_KEY) {
          console.log('⚠️ GHL not configured, allowing sign in');
          return true;
        }
        return false;
      }
    },
    
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after sign in
      if (url === baseUrl + '/api/auth/callback/google' || url === baseUrl + '/') {
        return baseUrl + '/dashboard';
      }
      
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      
      return baseUrl + '/dashboard';
    },
    
    async jwt({ token, user, account }) {
      // On initial sign in, fetch user data from GHL
      if (account && user) {
        token.accessToken = account.access_token;
        
        try {
          // Get user's plan from GoHighLevel
          const ghlContact = await searchGHLContact(user.email!);
          if (ghlContact) {
            const plan = extractPlanFromTags(ghlContact.tags || []);
            token.plan = plan;
            console.log('📋 JWT: Set user plan to:', plan);
          } else {
            token.plan = 'free';
            console.log('📋 JWT: No GHL contact, defaulting to free plan');
          }
        } catch (error) {
          console.error('JWT callback error:', error);
          token.plan = 'free';
        }
      }
      
      return token;
    },
    
    async session({ session, token }) {
      // Add plan to session
      if (session.user) {
        (session.user as any).plan = token.plan || 'free';
        console.log('📋 Session: User plan is:', (session.user as any).plan);
      }
      
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions)