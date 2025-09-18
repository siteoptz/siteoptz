import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import { sendWelcomeEmail, sendAdminNotificationEmail } from '../../../lib/gohighlevel-service'
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
        name: { label: 'Name', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // TODO: Replace with your actual user authentication logic
        // This is a placeholder - in production, you'd verify against your database
        try {
          // Example: verify user credentials against your database
          // const user = await verifyUserCredentials(credentials.email, credentials.password)
          
          // For now, we'll create a mock user
          // In production, this should fetch from your database
          const user = {
            id: '1',
            name: credentials.name || 'User',
            email: credentials.email,
          }

          return user
        } catch (error) {
          console.error('Authentication error:', error)
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
      return session
    },
    async signIn({ user, account, profile }) {
      try {
        console.log('=== SIGNIN CALLBACK TRIGGERED ===');
        console.log('User:', JSON.stringify(user, null, 2));
        console.log('Account:', JSON.stringify(account, null, 2));
        console.log('Provider:', account?.provider);
        
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
        
        // Handle OAuth user registration only
        if (user?.email) {
          console.log('Processing OAuth user registration/signin for:', user.email);
          
          // Try to get business information if available
          let businessInfo = null;
          try {
            const response = await fetch(`${process.env.NEXTAUTH_URL}/api/get-oauth-business-info?email=${encodeURIComponent(user.email)}`);
            if (response.ok) {
              const result = await response.json();
              if (result.success) {
                businessInfo = result.data;
                console.log('✅ Retrieved business info for OAuth user:', businessInfo);
              }
            }
          } catch (error) {
            console.log('No business info found for OAuth user (this is normal for login)');
          }

          const userData = {
            email: user.email,
            name: user.name || undefined,
            provider: account?.provider || 'credentials',
            plan: 'free', // Default to free plan for new registrations
            // Use business information if available, otherwise use descriptive defaults
            company: businessInfo ? `Business Size: ${businessInfo.businessSize}` : `OAuth sign-in (${account?.provider || 'credentials'})`,
            companySize: businessInfo ? businessInfo.businessSize : `OAuth sign-in (${account?.provider || 'credentials'})`,
            interests: businessInfo ? businessInfo.aiToolsInterest : `OAuth sign-in (${account?.provider || 'credentials'})`,
          };

          console.log('User data to process:', JSON.stringify(userData, null, 2));

          // Create GoHighLevel contact using SiteOptzGoHighLevel class (same as form registration)
          console.log('Attempting to create GoHighLevel contact with SiteOptzGoHighLevel...');
          
          let ghlResult: { success: boolean; contactId?: string; opportunityId?: string; error?: string } = { success: false };
          
          // Check if GoHighLevel integration is enabled
          const isGHLEnabled = process.env.ENABLE_GHL === 'true';
          console.log('🔍 GoHighLevel Environment Check:');
          console.log('- ENABLE_GHL:', process.env.ENABLE_GHL);
          console.log('- API Key present:', !!process.env.GOHIGHLEVEL_API_KEY);
          console.log('- Location ID present:', !!process.env.GOHIGHLEVEL_LOCATION_ID);
          console.log('- Is Enabled:', isGHLEnabled);
          
          if (isGHLEnabled && process.env.GOHIGHLEVEL_API_KEY && process.env.GOHIGHLEVEL_LOCATION_ID) {
            try {
              // Initialize SiteOptzGoHighLevel class (same as form registration)
              const gohighlevel = new SiteOptzGoHighLevel(
                process.env.GOHIGHLEVEL_API_KEY,
                process.env.GOHIGHLEVEL_LOCATION_ID
              );
              
              // Prepare data for SiteOptz GoHighLevel integration (same format as form registration)
              const subscriberData = {
                email: userData.email,
                firstName: userData.name?.split(' ')[0] || '',
                lastName: userData.name?.split(' ').slice(1).join(' ') || '',
                source: businessInfo ? `OAuth Registration - ${userData.provider} (with business info)` : `OAuth Registration - ${userData.provider}`,
                aiToolsInterest: businessInfo ? businessInfo.aiToolsInterest : 'OAuth sign-in - not collected',
                businessSize: businessInfo ? businessInfo.businessSize : 'OAuth sign-in - not collected',
                registrationMethod: userData.provider,
                planType: 'free'
              };

              // Use addFreeTrialSubscriber method from comprehensive class
              const result = await gohighlevel.addFreeTrialSubscriber(subscriberData);
              
              if (result.success) {
                console.log('✅ Successfully added OAuth user to GoHighLevel using SiteOptzGoHighLevel');
                console.log('Contact ID:', result.contact?.id);
                console.log('Pipeline:', result.pipeline);
                ghlResult = { 
                  success: true, 
                  contactId: result.contact?.id,
                  opportunityId: result.pipeline?.id
                };
              } else {
                console.error('❌ Failed to add OAuth user to GoHighLevel');
                ghlResult = { success: false };
              }
            } catch (error) {
              console.error('Error in SiteOptz GoHighLevel OAuth registration:', error);
              ghlResult = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
            }
          } else {
            console.log('⚠️ GoHighLevel integration disabled or credentials missing for OAuth user');
            ghlResult = { success: false, error: 'Integration disabled or credentials missing' };
          }
          
          console.log('GoHighLevel result:', JSON.stringify(ghlResult, null, 2));
          
          if (ghlResult.success) {
            console.log('✅ GoHighLevel contact created/updated for:', user.email);
          } else {
            console.error('❌ Failed to create GoHighLevel contact:', ghlResult.error);
            console.error('❌ Contact data logged for manual review - check server logs');
            // Continue with email flow even if GoHighLevel fails
          }

          // Send welcome email (you might want to check if user is new in production)
          console.log('Attempting to send welcome email...');
          const welcomeResult = await sendWelcomeEmail(userData);
          console.log('Welcome email result:', JSON.stringify(welcomeResult, null, 2));
          
          if (welcomeResult.success) {
            console.log('✅ Welcome email sent to:', user.email);
          } else {
            console.error('❌ Failed to send welcome email:', welcomeResult.error);
          }

          // Send admin notification
          console.log('Attempting to send admin notification...');
          const adminResult = await sendAdminNotificationEmail(userData);
          console.log('Admin notification result:', JSON.stringify(adminResult, null, 2));
          
          if (adminResult.success) {
            console.log('✅ Admin notification sent for new user:', user.email);
          } else {
            console.error('❌ Failed to send admin notification:', adminResult.error);
          }
        } else {
          console.log('No user email provided, skipping integrations');
        }
        
        console.log('=== SIGNIN CALLBACK COMPLETED ===');
        return true;
      } catch (error) {
        console.error('💥 Error in signIn callback:', error);
        // Still allow sign-in even if notifications fail
        return true;
      }
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard or desired page after sign-in
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      } else if (new URL(url).origin === baseUrl) {
        return url
      }
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