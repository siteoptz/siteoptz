import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import { createGoHighLevelContact, sendWelcomeEmail, sendAdminNotificationEmail } from '../../../lib/gohighlevel-service'

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
        password: { label: 'Password', type: 'password' }
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
            name: 'User',
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
    async signIn({ user, account, profile, isNewUser }) {
      try {
        console.log('=== SIGNIN CALLBACK TRIGGERED ===');
        console.log('User:', JSON.stringify(user, null, 2));
        console.log('Account:', JSON.stringify(account, null, 2));
        console.log('IsNewUser:', isNewUser);
        console.log('Environment check:');
        console.log('- GOHIGHLEVEL_API_KEY:', process.env.GOHIGHLEVEL_API_KEY ? 'Set' : 'Missing');
        console.log('- EMAIL_FROM:', process.env.EMAIL_FROM);
        console.log('- NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
        
        // Handle new user registration
        if (user?.email) {
          console.log('Processing user registration/signin for:', user.email);
          
          const userData = {
            email: user.email,
            name: user.name || undefined,
            provider: account?.provider || 'credentials',
            plan: 'free', // Default to free plan for new registrations
          };

          console.log('User data to process:', JSON.stringify(userData, null, 2));

          // Create GoHighLevel contact (it will handle duplicates)
          console.log('Attempting to create GoHighLevel contact...');
          const ghlResult = await createGoHighLevelContact(userData);
          console.log('GoHighLevel result:', JSON.stringify(ghlResult, null, 2));
          
          if (ghlResult.success) {
            console.log('✅ GoHighLevel contact created/updated for:', user.email);
          } else {
            console.error('❌ Failed to create GoHighLevel contact:', ghlResult.error);
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