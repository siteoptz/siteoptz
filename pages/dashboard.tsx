import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { LogOut, User, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      // Not signed in, redirect to homepage
      router.push('/');
      return;
    }

    // Check if this user came from GHL form
    const { signup, source } = router.query;
    
    if (signup === 'true' && source === 'ghl') {
      setWelcomeMessage('Thank you for completing our discovery form! Your responses have been submitted and we\'ll be in touch soon.');
      
      // Clean up URL parameters
      router.replace('/dashboard', undefined, { shallow: true });
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  return (
    <>
      <Head>
        <title>Dashboard - SiteOptz</title>
        <meta name="description" content="Your SiteOptz dashboard" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Header */}
        <header className="bg-black border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-white">SiteOptz Dashboard</h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-300">
                  <User className="w-5 h-5 mr-2" />
                  {session.user?.name || session.user?.email}
                </div>
                
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center px-3 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Message for GHL Users */}
          {welcomeMessage && (
            <div className="mb-8 bg-gradient-to-r from-green-900/50 to-blue-900/50 border border-green-700 rounded-lg p-6">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold text-white mb-2">
                    Welcome to SiteOptz!
                  </h2>
                  <p className="text-gray-300">
                    {welcomeMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Info Card */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Account Info</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Email:</span>
                  <p className="text-white">{session.user?.email}</p>
                </div>
                <div>
                  <span className="text-gray-400">Name:</span>
                  <p className="text-white">{session.user?.name || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <p className="text-green-400">Active</p>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-white transition-colors">
                  View AI Tools
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-white transition-colors">
                  Compare Tools
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-white transition-colors">
                  Contact Support
                </button>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Next Steps</h3>
              <div className="space-y-3">
                <p className="text-gray-300 text-sm">
                  Your discovery form responses have been submitted successfully.
                </p>
                <p className="text-gray-300 text-sm">
                  Our team will review your responses and reach out within 24-48 hours to schedule your consultation.
                </p>
                <p className="text-cyan-400 text-sm">
                  Check your email for confirmation details.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}