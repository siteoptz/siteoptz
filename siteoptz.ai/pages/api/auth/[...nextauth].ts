import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { JWT } from 'next-auth/jwt'
import { Session } from 'next-auth'

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
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login', // Redirect errors to login page
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('🔥 OAuth Sign In Attempt:', {
        email: user?.email,
        provider: account?.provider,
        profileEmail: profile?.email
      });
      
      // CRITICAL: Check if Google OAuth credentials are properly configured
      if (account?.provider === 'google') {
        if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || 
            process.env.GOOGLE_CLIENT_ID.includes('your-') || 
            process.env.GOOGLE_CLIENT_SECRET.includes('your-')) {
          console.error('❌ Google OAuth not properly configured!');
          console.error('Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in Vercel environment variables');
          return false; // This will cause the OAuthCallback error
        }
      }
      
      // Only process Google OAuth
      if (account?.provider !== 'google') {
        return true;
      }

      // Validate we have an email
      if (!user?.email) {
        console.error('❌ No email provided from Google OAuth');
        return false;
      }

      try {
        // Check if user exists in GoHighLevel
        const existingContact = await searchGHLContact(user.email);
        
        if (!existingContact) {
          // New user - create in GoHighLevel with free plan
          console.log('🆕 New user via OAuth, creating in GHL:', user.email);
          await createGHLContact(
            user.email,
            user.name || 'User',
            'free' // Default to free plan for OAuth signups
          );
        } else {
          console.log('✅ Existing user found in GHL:', user.email);
        }
        
        // ALWAYS return true to allow sign in
        // Even if GHL operations fail, we want users to be able to authenticate
        return true;
      } catch (error) {
        console.error('⚠️ Sign in callback error:', error);
        // Still allow sign in even if GHL integration fails
        return true;
      }
    },
    
    async redirect({ url, baseUrl }) {
      console.log('🔄 Redirect callback:', { url, baseUrl });
      
      // Remove any hash fragments from the URL
      const cleanUrl = url.split('#')[0];
      
      // After successful sign in, redirect to dashboard
      if (cleanUrl.includes('/api/auth/callback/google') || 
          cleanUrl === baseUrl || 
          cleanUrl === baseUrl + '/' ||
          cleanUrl.includes('/login')) {
        console.log('✅ Redirecting to dashboard after OAuth sign in');
        return `${baseUrl}/dashboard`;
      }
      
      // Handle error redirects
      if (cleanUrl.includes('error=OAuthCallback')) {
        console.log('❌ OAuth error detected, redirecting to login with error');
        return `${baseUrl}/login?error=OAuthCallback`;
      }
      
      // Allow internal redirects
      if (cleanUrl.startsWith('/')) {
        return `${baseUrl}${cleanUrl}`;
      }
      
      // Allow same-origin redirects
      try {
        const urlObj = new URL(cleanUrl);
        const baseUrlObj = new URL(baseUrl);
        if (urlObj.origin === baseUrlObj.origin) {
          return cleanUrl;
        }
      } catch (error) {
        console.error('Invalid redirect URL:', cleanUrl);
      }
      
      // Default redirect to dashboard
      return `${baseUrl}/dashboard`;
    },
    
    async jwt({ token, user, account }: { token: JWT; user?: any; account?: any }) {
      // On initial sign in, fetch user data from GHL
      if (account && user) {
        token.accessToken = account.access_token;
        token.email = user.email;
        token.name = user.name;
        
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
    
    async session({ session, token }: { session: Session; token: JWT }) {
      // Add plan to session
      if (session.user) {
        (session.user as any).plan = token.plan || 'free';
        (session.user as any).email = token.email;
        (session.user as any).name = token.name;
        console.log('📋 Session created for:', token.email, 'with plan:', token.plan);
      }
      
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      
      return session;
    },
  },
  debug: true, // Enable debug mode to see more details about the error
  events: {
    async signIn({ user, account, profile }) {
      console.log('✅ SignIn Event:', { 
        email: user?.email, 
        provider: account?.provider 
      });
    },
    async signOut({ session, token }) {
      console.log('👋 SignOut Event:', session?.user?.email);
    },
    async createUser({ user }) {
      console.log('🆕 User Created:', user.email);
    },
    async session({ session, token }) {
      console.log('📋 Session Event:', session?.user?.email);
    }
  }
}

export default NextAuth(authOptions)