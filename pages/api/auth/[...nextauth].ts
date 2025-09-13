import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
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
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // TODO: Save user to database if they don't exist
        // const existingUser = await findUserByEmail(user.email)
        // if (!existingUser) {
        //   await createUser({
        //     email: user.email,
        //     name: user.name,
        //     image: user.image,
        //     provider: 'google'
        //   })
        // }
        
        console.log('Google sign-in successful:', user.email)
        return true
      }
      return true
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