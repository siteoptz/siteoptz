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
        name: { label: 'Name', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          console.log('🔐 Attempting credentials authentication for:', credentials.email);
          
          // Check if GoHighLevel integration is enabled
          const isGHLEnabled = process.env.ENABLE_GHL === 'true';
          
          if (isGHLEnabled && process.env.GOHIGHLEVEL_API_KEY && process.env.GOHIGHLEVEL_LOCATION_ID) {
            // Check if user exists in GoHighLevel
            const ghlContact = await getContactByEmail(credentials.email);
            
            if (ghlContact.exists) {
              console.log('✅ User found in GoHighLevel:', ghlContact.name);
              
              const user = {
                id: ghlContact.contactId || credentials.email,
                name: ghlContact.name || credentials.name || 'User',
                email: credentials.email,
              }

              console.log('✅ Credentials authentication successful with GoHighLevel data:', user);
              return user
            } else {
              console.log('⚠️ User not found in GoHighLevel, allowing fallback authentication:', credentials.email);
              
              // Allow authentication even if not in GoHighLevel (fallback for existing users)
              const user = {
                id: credentials.email,
                name: credentials.name || 'User',
                email: credentials.email,
              }

              console.log('✅ Credentials authentication successful with fallback:', user);
              return user
            }
          } else {
            console.log('⚠️ GoHighLevel integration disabled - allowing basic authentication');
            
            // When GoHighLevel is disabled, allow basic authentication
            // TODO: Add proper password verification here when implementing real authentication
            const user = {
              id: credentials.email,
              name: credentials.name || 'User',
              email: credentials.email,
            }

            console.log('✅ Basic credentials authentication successful:', user);
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
      return session
    },
    async signIn({ user, account, profile }) {
      try {
        console.log('=== SIGNIN CALLBACK TRIGGERED ===');
        console.log('User:', JSON.stringify(user, null, 2));
        console.log('Account:', JSON.stringify(account, null, 2));
        console.log('Profile:', JSON.stringify(profile, null, 2));
        console.log('Provider:', account?.provider);
        console.log('Account state:', account?.state);
        
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
          
          // Check if this is a registration attempt by looking for token in URL or pending business info
          let businessInfo = null;
          let isRegistrationAttempt = false;
          
          // Always try to get business info for OAuth users (for registration emails)
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

          // Create user data for conditional processing
          const userData = createUserDataFromOAuth(user, businessInfo);
          userData.provider = account?.provider || 'oauth';
          
          console.log('OAuth user data to process:', JSON.stringify(userData, null, 2));

          // Use conditional logic to handle OAuth user registration/login
          const userActionResult = await handleUserAction(userData);
          
          console.log('OAuth user action result:', JSON.stringify(userActionResult, null, 2));
          
          if (userActionResult.success) {
            if (userActionResult.isNewUser) {
              console.log('🆕 New OAuth user registered - welcome email sent');
            } else {
              console.log('👤 Existing OAuth user signed in - no welcome email');
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