import { useSession, signIn, signOut, getProviders } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'

export default function OAuthDebug({ providers }: any) {
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGoogleSignIn = () => {
    console.log('🔍 Initiating Google sign-in...')
    signIn('google', { 
      callbackUrl: 'http://localhost:3000/dashboard',
      redirect: true 
    })
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-6">OAuth Debug Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Current Session:</h2>
          <pre className="bg-gray-800 p-4 rounded text-sm">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Available Providers:</h2>
          <pre className="bg-gray-800 p-4 rounded text-sm">
            {JSON.stringify(providers, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Environment Check (Client-side):</h2>
          <div className="bg-gray-800 p-4 rounded text-sm">
            <p>Public Google Client ID: {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? 'Set' : 'Not set'}</p>
            <p>Current URL: {mounted ? window.location.href : 'Loading...'}</p>
            <p>Expected Callback: http://localhost:3000/api/auth/callback/google</p>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleGoogleSignIn}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Test Google Sign In
          </button>
          
          <a
            href="/api/auth/signin/google"
            className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center"
          >
            Direct NextAuth Google URL
          </a>

          {session && (
            <button
              onClick={() => signOut()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: { providers }
  }
}