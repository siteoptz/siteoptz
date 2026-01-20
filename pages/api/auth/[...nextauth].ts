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
async function createGHLContact(email: string, name: string, plan: string = 'free', isTrialUser: boolean = false) {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.log('GHL credentials not configured - skipping contact creation');
      return null;
    }

    // Determine tags and source based on signup type
    const tags = isTrialUser 
      ? [`siteoptz-trial-${plan}`, 'trial-user', 'oauth-signup']
      : [`siteoptz-plan-${plan}`, 'oauth-signup'];

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
        tags: tags,
        source: 'Google OAuth',
        customFields: {
          'signup_source': 'google_oauth',
          'signup_date': new Date().toISOString(),
          'is_trial_user': isTrialUser ? 'true' : 'false',
          'initial_plan': plan
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('GHL create contact failed:', error);
      return null;
    }

    const data = await response.json();
    console.log('✅ Created new GHL contact:', email, 'Plan:', plan, 'Trial:', isTrialUser);
    return data.contact;
  } catch (error) {
    console.error('GHL create contact error:', error);
    return null;
  }
}

// Helper function to add contact to trial pipeline
async function addToTrialPipeline(contactId: string, trialType: string) {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.log('GHL credentials not configured');
      return false;
    }

    // Pipeline configuration for different trial types
    const pipelineConfig = {
      'free': {
        pipelineId: process.env.GHL_FREE_TRIAL_PIPELINE_ID || 'default-free-pipeline',
        stageId: process.env.GHL_FREE_TRIAL_STAGE_ID || 'new-free-user'
      },
      'starter': {
        pipelineId: process.env.GHL_STARTER_TRIAL_PIPELINE_ID || 'default-starter-pipeline',
        stageId: process.env.GHL_STARTER_TRIAL_STAGE_ID || 'new-starter-trial'
      },
      'pro': {
        pipelineId: process.env.GHL_PRO_TRIAL_PIPELINE_ID || 'default-pro-pipeline',
        stageId: process.env.GHL_PRO_TRIAL_STAGE_ID || 'new-pro-trial'
      }
    };

    const config = pipelineConfig[trialType as keyof typeof pipelineConfig];
    
    const response = await fetch('https://services.leadconnectorhq.com/opportunities/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Location-Id': process.env.GHL_LOCATION_ID
      },
      body: JSON.stringify({
        contactId: contactId,
        pipelineId: config.pipelineId,
        pipelineStageId: config.stageId,
        title: `SiteOptz ${trialType.toUpperCase()} Trial - OAuth Signup`,
        monetaryValue: trialType === 'free' ? 0 : trialType === 'starter' ? 59 : 199,
        source: 'Google OAuth Trial Signup'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('GHL pipeline addition failed:', error);
      return false;
    }

    console.log('✅ Added contact to trial pipeline:', contactId, 'Type:', trialType);
    return true;
  } catch (error) {
    console.error('GHL pipeline addition error:', error);
    return false;
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
          // New user - determine if this is a trial signup
          // We can check for trial params in the callback URL or state
          const callbackUrl = account?.callbackUrl || '';
          const state = account?.state || '';
          const isTrialSignup = typeof callbackUrl === 'string' && callbackUrl.includes('trial=true') || 
                                 typeof state === 'string' && state.includes('trial') ||
                                 typeof callbackUrl === 'string' && callbackUrl.includes('plan=');
          
          // Extract plan from callback URL if present
          let plan = 'free';
          if (typeof callbackUrl === 'string' && callbackUrl) {
            const urlParams = new URLSearchParams(callbackUrl.split('?')[1] || '');
            plan = urlParams.get('plan') || 'free';
          }
          
          console.log('🆕 New user via OAuth:', user.email, 'Plan:', plan, 'Trial:', isTrialSignup);
          
          const newContact = await createGHLContact(
            user.email!,
            user.name || 'User',
            plan,
            isTrialSignup
          );
          
          if (!newContact && process.env.GHL_API_KEY) {
            // If GHL is configured but creation failed, block sign in
            console.error('❌ Failed to create GHL contact, blocking sign in');
            return false;
          }

          // If this is a trial signup, add to trial pipeline
          if (isTrialSignup && newContact) {
            await addToTrialPipeline(newContact.id, plan);
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