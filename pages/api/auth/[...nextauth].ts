import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import { sendWelcomeEmail, sendAdminNotificationEmail } from '../../../lib/gohighlevel-service'
import { handleUserAction, createUserDataFromOAuth } from '../../../lib/user-management-service'
import { getContactByEmail } from '../user/ghl-lookup'
const SiteOptzGoHighLevel = require('../../../utils/siteoptz-gohighlevel')

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // EmailProvider temporarily disabled until proper SMTP and database are configured
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SMTP_HOST,
    //     port: parseInt(process.env.EMAIL_SMTP_PORT || '587'),
    //     auth: {
    //       user: process.env.EMAIL_SMTP_USER,
    //       pass: process.env.EMAIL_SMTP_PASS,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' },
        authMode: { label: 'Auth Mode', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          console.log('🔐 Attempting credentials authentication for:', credentials.email);
          console.log('🔐 Password type:', credentials.password === 'otp-verified' ? 'OTP-verified' : 'Regular password');
          
          // Handle OTP-verified authentication (bypass GoHighLevel lookup)
          if (credentials.password === 'otp-verified') {
            console.log('✅ OTP-verified authentication - creating user session');
            
            const user = {
              id: credentials.email,
              name: credentials.name || 'User',
              email: credentials.email,
            }

            console.log('✅ OTP authentication successful:', user);
            return user;
          }
          
          // Check if GoHighLevel integration is enabled
          const isGHLEnabled = process.env.ENABLE_GHL === 'true';
          console.log('🔧 GHL Debug - isGHLEnabled:', isGHLEnabled);
          console.log('🔧 GHL Debug - Has API key:', !!process.env.GOHIGHLEVEL_API_KEY);
          console.log('🔧 GHL Debug - Has location ID:', !!process.env.GOHIGHLEVEL_LOCATION_ID);
          
          if (isGHLEnabled && process.env.GOHIGHLEVEL_API_KEY && process.env.GOHIGHLEVEL_LOCATION_ID) {
            console.log('🔍 Checking user in GoHighLevel for credentials auth:', credentials.email);
            // Check if user exists in GoHighLevel
            const ghlContact = await getContactByEmail(credentials.email);
            console.log('📋 GHL Contact result:', JSON.stringify(ghlContact, null, 2));
            
            if (ghlContact.exists) {
              console.log('✅ User found in GoHighLevel with name:', ghlContact.name);
              
              const user = {
                id: ghlContact.contactId || credentials.email,
                name: ghlContact.name || credentials.name || 'User',
                email: credentials.email,
              }

              console.log('✅ Credentials authentication successful with GoHighLevel data:', user);
              return user
            } else {
              console.log('⚠️ User not found in GoHighLevel:', credentials.email);
              console.log('🔍 Auth mode:', credentials.authMode);
              
              // Check if this is a login attempt for a non-existent user
              if (credentials.authMode === 'login') {
                console.log('❌ BLOCKING: Login attempt for non-existent user in GoHighLevel');
                console.log('- User Email:', credentials.email);
                console.log('- User should create account first');
                return null; // Block the authentication
              }
              
              console.log('⚠️ Registration attempt or fallback - allowing authentication:', credentials.email);
              
              // For registration or existing users, try to extract name from email if no name provided
              // This is a temporary fallback until GoHighLevel search is fixed
              let userName = credentials.name;
              if (!userName) {
                // Extract potential name from email (e.g., john.doe@email.com -> John Doe)
                const emailLocal = credentials.email.split('@')[0];
                if (emailLocal.includes('.')) {
                  const parts = emailLocal.split('.');
                  userName = parts.map(part => 
                    part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
                  ).join(' ');
                } else if (emailLocal.includes('_')) {
                  const parts = emailLocal.split('_');
                  userName = parts.map(part => 
                    part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
                  ).join(' ');
                } else {
                  // If no separators, capitalize first letter
                  userName = emailLocal.charAt(0).toUpperCase() + emailLocal.slice(1).toLowerCase();
                }
              }
              
              console.log('📝 Using fallback name for user:', userName);
              
              const user = {
                id: credentials.email,
                name: userName,
                email: credentials.email,
              }

              console.log('✅ Credentials authentication successful with fallback:', user);
              return user
            }
          } else {
            console.log('⚠️ GoHighLevel integration disabled');
            console.log('🔧 Credentials provided - name:', credentials.name, 'email:', credentials.email);
            console.log('🔍 Auth mode:', credentials.authMode);
            
            // When GoHighLevel is disabled, we can't verify user existence
            // But if user explicitly chose "login" mode, we should be cautious
            if (credentials.authMode === 'login') {
              console.log('⚠️ Login attempt with GoHighLevel disabled - cannot verify user existence');
              console.log('❌ BLOCKING: Login attempt when user verification is unavailable');
              console.log('- User Email:', credentials.email);
              console.log('- Recommend using registration or enabling GoHighLevel');
              return null; // Block login attempts when we can't verify users
            }
            
            console.log('⚠️ Registration attempt with GoHighLevel disabled - allowing basic authentication');
            
            // When GoHighLevel is disabled, try to extract a better name
            let userName = credentials.name;
            if (!userName) {
              // Extract potential name from email (e.g., john.doe@email.com -> John Doe)
              const emailLocal = credentials.email.split('@')[0];
              if (emailLocal.includes('.')) {
                const parts = emailLocal.split('.');
                userName = parts.map(part => 
                  part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
                ).join(' ');
              } else if (emailLocal.includes('_')) {
                const parts = emailLocal.split('_');
                userName = parts.map(part => 
                  part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
                ).join(' ');
              } else {
                // If no separators, capitalize first letter
                userName = emailLocal.charAt(0).toUpperCase() + emailLocal.slice(1).toLowerCase();
              }
            }
            
            console.log('📝 Using basic auth name for user:', userName);
            
            const user = {
              id: credentials.email,
              name: userName,
              email: credentials.email,
            }

            console.log('✅ Basic credentials authentication successful:', JSON.stringify(user, null, 2));
            return user
          }
        } catch (error) {
          console.error('❌ Credentials authentication error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string
      }
      
      // Get user plan for ALL users
      if (session?.user?.email) {
        try {
          // First, check Stripe for active subscription (highest priority)
          let userPlan = 'free';
          let planSource = 'default';
          
          // Check Stripe if available
          if (process.env.STRIPE_SECRET_KEY) {
            try {
              const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
              const customers = await stripe.customers.list({
                email: session.user.email,
                limit: 1
              });
              
              if (customers.data.length > 0) {
                const subscriptions = await stripe.subscriptions.list({
                  customer: customers.data[0].id,
                  status: 'active',
                  limit: 1
                });
                
                if (subscriptions.data.length > 0) {
                  const priceId = subscriptions.data[0].items.data[0].price.id;
                  
                  // Map price IDs to plans
                  if (priceId === process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID || 
                      priceId === process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID) {
                    userPlan = 'enterprise';
                    planSource = 'stripe';
                  } else if (priceId === process.env.STRIPE_PRO_MONTHLY_PRICE_ID || 
                             priceId === process.env.STRIPE_PRO_YEARLY_PRICE_ID) {
                    userPlan = 'pro';
                    planSource = 'stripe';
                  } else if (priceId === process.env.STRIPE_STARTER_MONTHLY_PRICE_ID || 
                             priceId === process.env.STRIPE_STARTER_YEARLY_PRICE_ID) {
                    userPlan = 'starter';
                    planSource = 'stripe';
                  }
                  
                  console.log(`✅ Stripe plan detected for ${session.user.email}: ${userPlan}`);
                }
              }
            } catch (stripeError) {
              console.error('Error checking Stripe in session:', stripeError);
            }
          }
          
          // If no Stripe plan, check GoHighLevel
          if (userPlan === 'free' && process.env.ENABLE_GHL === 'true') {
            try {
              const ghlContact = await getContactByEmail(session.user.email);
              if (ghlContact.exists) {
                if (ghlContact.plan && ghlContact.plan !== 'free') {
                  userPlan = ghlContact.plan;
                  planSource = 'ghl';
                  console.log(`📋 GoHighLevel plan detected for ${session.user.email}: ${userPlan}`);
                }
                
                // Also update name if available
                if (ghlContact.name) {
                  session.user.name = ghlContact.name;
                }
              }
            } catch (ghlError) {
              console.error('Error checking GoHighLevel in session:', ghlError);
            }
          }
          
          // Add plan to session
          (session.user as any).plan = userPlan;
          console.log(`🎯 Final plan for ${session.user.email}: ${userPlan} (source: ${planSource})`);
          
        } catch (error) {
          console.error('Error determining user plan in session:', error);
          (session.user as any).plan = 'free';
        }
      }
      
      return session
    },
    async signIn({ user, account, profile }) {
      try {
        console.log('🔥🔥🔥 === SIGNIN CALLBACK TRIGGERED === 🔥🔥🔥');
        console.log('🔥 User:', JSON.stringify(user, null, 2));
        console.log('🔥 Account:', JSON.stringify(account, null, 2));
        console.log('🔥 Profile:', JSON.stringify(profile, null, 2));
        console.log('🔥 Provider:', account?.provider);
        console.log('🔥 Account state:', account?.state);
        console.log('🔥 Timestamp:', new Date().toISOString());
        
        // Skip GoHighLevel integration for credentials provider
        // Email/password registrations are handled by /api/register-free-plan
        if (account?.provider === 'credentials') {
          console.log('✅ Credentials sign-in detected - skipping GoHighLevel integration (handled by register-free-plan API)');
          return true;
        }
        
        console.log('Environment check:');
        console.log('- GOHIGHLEVEL_API_KEY:', process.env.GOHIGHLEVEL_API_KEY ? 'Set' : 'Missing');
        console.log('- EMAIL_FROM:', process.env.EMAIL_FROM);
        console.log('- NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
        
        // Handle OAuth user registration/login with enhanced validation
        if (user?.email) {
          console.log('🔍 Processing OAuth user for:', user.email);
          
          // **ENHANCED: Step 1 - Check if this is a registration attempt**
          let businessInfo = null;
          let isRegistrationAttempt = false;
          
          try {
            // Check for pending business info (indicates registration attempt)
            const response = await fetch(`${process.env.NEXTAUTH_URL}/api/get-oauth-business-info?email=${encodeURIComponent(user.email)}`);
            if (response.ok) {
              const result = await response.json();
              if (result.success && result.data) {
                businessInfo = result.data;
                isRegistrationAttempt = true;
                console.log('✅ Registration attempt detected - business info found:', businessInfo);
              }
            }
          } catch (error) {
            console.log('No business info found - treating as login attempt');
          }
          
          // **ENHANCED: Step 2 - Check if user already exists in GoHighLevel**
          let existingUserCheck = { exists: false, contactId: null, userDetails: null };
          try {
            console.log('🔍 Checking if user exists in GoHighLevel for OAuth validation...');
            
            const isGHLEnabled = process.env.ENABLE_GHL === 'true';
            if (isGHLEnabled && process.env.GOHIGHLEVEL_API_KEY && process.env.GOHIGHLEVEL_LOCATION_ID) {
              const headers: Record<string, string> = {
                'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
                'Content-Type': 'application/json',
                'Version': '2021-07-28'
              };
              
              if (process.env.GOHIGHLEVEL_LOCATION_ID) {
                headers['Location-Id'] = process.env.GOHIGHLEVEL_LOCATION_ID;
              }
              
              const searchResponse = await fetch(
                `https://services.leadconnectorhq.com/contacts/search/duplicate?email=${encodeURIComponent(user.email)}`,
                { method: 'GET', headers }
              );

              if (searchResponse.ok) {
                const searchResult = await searchResponse.json();
                if (searchResult.contact && searchResult.contact.id) {
                  existingUserCheck = {
                    exists: true,
                    contactId: searchResult.contact.id,
                    userDetails: searchResult.contact
                  };
                  console.log('✅ Existing user found in GoHighLevel:', existingUserCheck.contactId);
                } else {
                  console.log('ℹ️ No existing user found in GoHighLevel for:', user.email);
                }
              } else {
                const errorText = await searchResponse.text();
                console.error('❌ GoHighLevel API error in signIn callback:', searchResponse.status, errorText);
                console.log('⚠️ Continuing with OAuth flow despite GoHighLevel error');
                // Continue with existingUserCheck.exists = false (default)
              }
            }
          } catch (error) {
            console.error('Error checking existing user in OAuth callback:', error);
          }
          
          // **ENHANCED: Step 3 - Apply conditional logic**
          
          // Check if GoHighLevel integration is working
          const isGHLEnabled = process.env.ENABLE_GHL === 'true';
          const hasGHLConfig = process.env.GOHIGHLEVEL_API_KEY && process.env.GOHIGHLEVEL_LOCATION_ID;
          
          if (isRegistrationAttempt) {
            if (!isGHLEnabled || !hasGHLConfig) {
              // GoHighLevel is disabled - block ALL OAuth registration attempts for safety
              console.log('🚫 BLOCKING: OAuth registration attempt while GoHighLevel is disabled');
              console.log('- User Email:', user.email);
              console.log('- GoHighLevel Enabled:', isGHLEnabled);
              console.log('- Has GHL Config:', hasGHLConfig);
              console.log('- Registration Data:', businessInfo);
              console.log('⚠️ Redirecting to email/password registration for security');
              
              throw new Error('OAUTH_REGISTRATION_DISABLED');
            } else if (existingUserCheck.exists) {
              // GoHighLevel is enabled and existing user detected - block registration
              console.log('❌ BLOCKING: Existing user attempting OAuth registration');
              console.log('- User Email:', user.email);
              console.log('- Existing Contact ID:', existingUserCheck.contactId);
              console.log('- Registration Data:', businessInfo);
              
              throw new Error('EXISTING_USER_REGISTRATION_ATTEMPT');
            } else {
              console.log('✅ New user OAuth registration allowed - proceeding');
            }
          } else {
            // This is a login attempt - check if user exists
            console.log('ℹ️ OAuth login attempt detected - validating user existence');
            
            if (!existingUserCheck.exists) {
              // User trying to login but doesn't exist - block login
              console.log('❌ BLOCKING: Non-existent user attempting OAuth login');
              console.log('- User Email:', user.email);
              console.log('- User should create account first');
              
              throw new Error('NON_EXISTENT_USER_LOGIN_ATTEMPT');
            } else {
              console.log('✅ Existing user OAuth login allowed - proceeding');
            }
          }
          
          // **ENHANCED: Step 4 - Process user action based on registration vs login**
          const userData = createUserDataFromOAuth(user, businessInfo);
          userData.provider = account?.provider || 'oauth';
          userData.isRegistrationAttempt = isRegistrationAttempt;
          
          console.log('OAuth user data to process:', JSON.stringify(userData, null, 2));
          console.log('- Is Registration Attempt:', isRegistrationAttempt);
          console.log('- User Exists:', existingUserCheck.exists);

          const userActionResult = await handleUserAction(userData);
          
          console.log('OAuth user action result:', JSON.stringify(userActionResult, null, 2));
          
          if (userActionResult.success) {
            if (userActionResult.isNewUser) {
              console.log('🆕 New OAuth user registered successfully - welcome email sent');
            } else {
              console.log('👤 Existing OAuth user signed in successfully - no welcome email');
            }
          } else {
            console.error('❌ Failed to process OAuth user:', userActionResult.error);
          }
        } else {
          console.log('No user email provided, skipping integrations');
        }
        
        console.log('=== SIGNIN CALLBACK COMPLETED ===');
        return true;
      } catch (error) {
        console.error('💥 Error in signIn callback:', error);
        
        // Handle specific error types
        if (error instanceof Error) {
          if (error.message === 'EXISTING_USER_REGISTRATION_ATTEMPT') {
            console.log('🚫 Blocking OAuth registration for existing user');
            return false;
          } else if (error.message === 'OAUTH_REGISTRATION_DISABLED') {
            console.log('🚫 Blocking OAuth registration - GoHighLevel integration disabled');
            return false;
          } else if (error.message === 'NON_EXISTENT_USER_LOGIN_ATTEMPT') {
            console.log('🚫 Blocking OAuth login for non-existent user');
            return false;
          }
        }
        
        // For other errors, still allow sign-in
        console.log('⚠️ Non-blocking error in signIn callback, allowing authentication to continue');
        return true;
      }
    },
    async redirect({ url, baseUrl }) {
      console.log('🔄 NextAuth redirect callback - URL:', url, 'BaseURL:', baseUrl);
      
      // Check if request is from optz.siteoptz.ai subdomain
      const isWhiteLabelSubdomain = baseUrl.includes('optz.siteoptz.ai');
      
      // Redirect to dashboard or desired page after sign-in
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      } else if (new URL(url).origin === baseUrl) {
        return url
      }
      
      // Redirect to white-label dashboard for subdomain users
      if (isWhiteLabelSubdomain) {
        console.log('🏷️ White-label subdomain detected, redirecting to white-label dashboard');
        return `${baseUrl}/dashboard/white-label`
      }
      
      // Use smart dashboard router that checks user plan server-side
      console.log('🎯 Redirecting to dashboard router for plan detection');
      return `${baseUrl}/dashboard`
    },
  },
  pages: {
    // Don't redirect to NextAuth default pages, handle in our modal
    signIn: undefined,
    signOut: undefined,
    error: undefined,
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
}

export default NextAuth(authOptions)