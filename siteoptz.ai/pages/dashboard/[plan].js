import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from '../../utils/auth';
import Head from 'next/head';
import Link from 'next/link';

// Dashboard components
import DailySpotlight from '../../components/dashboard/DailySpotlight';
import BasicComparisons from '../../components/dashboard/BasicComparisons';
import CommunitySupport from '../../components/dashboard/CommunitySupport';
import ImplementationGuides from '../../components/dashboard/ImplementationGuides';

export default function PlanDashboard() {
  const router = useRouter();
  const { plan } = router.query;
  const [user, setUser] = useState(null);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!plan) return;

    // Check if user is authenticated
    const currentUser = getCurrentUser();
    
    if (!currentUser || !currentUser.authenticated) {
      // Not authenticated, redirect to login
      console.log('User not authenticated, redirecting to login');
      window.location.href = '/#login';
      return;
    }

    setUser(currentUser);
    
    // Load AI tools data
    fetch('/data/aiToolsData.json')
      .then(res => res.json())
      .then(data => {
        setTools(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load tools data:', err);
        setLoading(false);
      });

    console.log('Dashboard loaded for plan:', plan);
  }, [plan]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const planName = plan?.charAt(0).toUpperCase() + plan?.slice(1);
  const isPro = plan === 'pro' || plan === 'premium';
  const isStarter = plan === 'starter';
  const isFree = plan === 'free';

  return (
    <>
      <Head>
        <title>{planName} Dashboard - SiteOptz</title>
        <meta name="description" content={`Your ${planName} plan dashboard for AI tool management and insights.`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Header */}
        <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/" className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
                  SiteOptz
                </Link>
                <div className="h-6 w-px bg-gray-700"></div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Dashboard</span>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isFree ? 'bg-gray-800 text-gray-300' :
                    isStarter ? 'bg-blue-900 text-blue-300' :
                    'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                  }`}>
                    {planName}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-gray-300 text-sm">Welcome, {user?.email}</span>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
                >
                  ← Back to Site
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to your {planName} Dashboard
            </h1>
            <p className="text-gray-400">
              {isFree && "Explore AI tools with daily spotlight, limited comparisons, and community support."}
              {isStarter && "Access enhanced features with more comparisons and priority support."}
              {isPro && "Enjoy unlimited access to all AI tools, comparisons, and premium features."}
            </p>
          </div>

          {/* Upgrade Banner for Free Users */}
          {isFree && (
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Upgrade to unlock more features
                  </h3>
                  <p className="text-blue-200/80 text-sm">
                    Get unlimited comparisons, advanced analytics, and priority support
                  </p>
                </div>
                <Link
                  href="/#pricing"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  View Plans
                </Link>
              </div>
            </div>
          )}

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Features */}
            <div className="lg:col-span-2 space-y-8">
              {/* Daily Spotlight */}
              <DailySpotlight tools={tools} />
              
              {/* Basic Comparisons */}
              <BasicComparisons tools={tools} />
              
              {/* Implementation Guides */}
              <ImplementationGuides />
            </div>

            {/* Right Column - Support & Quick Actions */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link
                    href="/compare"
                    className="flex items-center gap-3 p-3 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors group"
                  >
                    <div className="text-cyan-400">🔍</div>
                    <div>
                      <h3 className="text-white group-hover:text-cyan-400 transition-colors">Browse Tools</h3>
                      <p className="text-gray-400 text-sm">Explore our database of AI tools</p>
                    </div>
                  </Link>
                  
                  <Link
                    href="/guides"
                    className="flex items-center gap-3 p-3 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors group"
                  >
                    <div className="text-cyan-400">📚</div>
                    <div>
                      <h3 className="text-white group-hover:text-cyan-400 transition-colors">Learning Center</h3>
                      <p className="text-gray-400 text-sm">Access guides and tutorials</p>
                    </div>
                  </Link>
                  
                  <button
                    onClick={() => alert('Settings coming soon!')}
                    className="flex items-center gap-3 p-3 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors group w-full text-left"
                  >
                    <div className="text-cyan-400">⚙️</div>
                    <div>
                      <h3 className="text-white group-hover:text-cyan-400 transition-colors">Account Settings</h3>
                      <p className="text-gray-400 text-sm">Manage your preferences</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Usage Stats for Free Plan */}
              {isFree && (
                <div className="bg-black border border-gray-800 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Usage Today</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm">Tool Comparisons</span>
                        <span className="text-gray-400 text-sm">3/3 limit</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-full"></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-800">
                      <p className="text-gray-400 text-sm mb-3">
                        Want unlimited comparisons?
                      </p>
                      <Link
                        href="/#pricing"
                        className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                      >
                        Upgrade Now
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Community Support */}
              <CommunitySupport />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}