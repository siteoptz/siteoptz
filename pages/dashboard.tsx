import React from 'react';
import Head from 'next/head';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { User, LogOut, Mail, Calendar, Gift, ArrowLeft } from 'lucide-react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isFirstTime, setIsFirstTime] = React.useState(false);

  // Check if this is a first-time user and redirect to home if not authenticated
  React.useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) {
      router.push('/');
      return;
    }
    
    // Check for first-time user indicators
    const isNewUser = router.query.new === 'true' || 
                     localStorage.getItem('isFirstTimeUser') === 'true' ||
                     !localStorage.getItem('hasVisitedDashboard');
    
    if (isNewUser) {
      setIsFirstTime(true);
      localStorage.setItem('hasVisitedDashboard', 'true');
      localStorage.removeItem('isFirstTimeUser');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <Head>
        <title>Dashboard - SiteOptz.ai</title>
        <meta name="description" content="Your AI Tools Dashboard" />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Site
                </Link>
                <div className="h-6 w-px bg-gray-600" />
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 rounded-2xl p-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-16 h-16 rounded-full border-2 border-green-500"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {isFirstTime 
                      ? `Welcome, ${session.user?.name || session.user?.email?.split('@')[0] || 'there'}!`
                      : `Welcome back, ${session.user?.name || session.user?.email?.split('@')[0] || 'there'}!`
                    }
                  </h2>
                  <p className="text-gray-300 mb-4">
                    You&apos;re now part of the SiteOptz.ai community with access to our Free Plan - AI Tool Discovery.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{session.user?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Free Plan Benefits */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Your Free Plan Benefits</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-black border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Gift className="w-6 h-6 text-green-400" />
                  <h4 className="font-semibold text-white">Daily AI Tool Spotlight</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Get one fully-analyzed AI tool delivered daily via email to discover new opportunities.
                </p>
              </div>
              <div className="bg-black border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Gift className="w-6 h-6 text-green-400" />
                  <h4 className="font-semibold text-white">Tool Comparison</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Compare 2-3 tools side-by-side to make informed decisions for your business.
                </p>
              </div>
              <div className="bg-black border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Gift className="w-6 h-6 text-green-400" />
                  <h4 className="font-semibold text-white">AI Tool Database</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Browse 100+ validated AI tools with basic information and implementation scores.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/tools"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-center"
              >
                <div className="font-semibold mb-2">Browse AI Tools</div>
                <div className="text-sm opacity-90">Explore 100+ tools</div>
              </Link>
              <Link
                href="/compare"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-6 rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 text-center"
              >
                <div className="font-semibold mb-2">Compare Tools</div>
                <div className="text-sm opacity-90">Side-by-side analysis</div>
              </Link>
              <Link
                href="/why-us"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-center"
              >
                <div className="font-semibold mb-2">Upgrade Plan</div>
                <div className="text-sm opacity-90">Get more features</div>
              </Link>
              <button
                onClick={() => window.open('https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl', '_blank')}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 text-center"
              >
                <div className="font-semibold mb-2">Book Consultation</div>
                <div className="text-sm opacity-90">Free strategy call</div>
              </button>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="bg-black border border-gray-800 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">More Features Coming Soon</h3>
            <p className="text-gray-300 mb-6">
              We&apos;re building personalized recommendations, saved comparisons, and custom AI roadmaps just for you.
            </p>
            <div className="text-sm text-gray-500">
              Want early access? <Link href="/why-us" className="text-green-400 hover:text-green-300">Upgrade your plan</Link> today.
            </div>
          </div>
        </main>
      </div>
    </>
  );
}