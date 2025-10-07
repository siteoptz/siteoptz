import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  BarChart3, 
  ExternalLink, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Layout,
  Monitor,
  User,
  Crown,
  Shield,
  Zap,
  ArrowUp,
  LogOut,
  TrendingUp
} from 'lucide-react';
import { 
  getOptzSession, 
  clearOptzSession, 
  getDashboardAccess, 
  getPlanFeatures, 
  canAccessDashboard,
  getUpgradeUrl,
  OptzSession 
} from '../../lib/optz-session';

interface Widget {
  id: string;
  name: string;
  type: string;
  description?: string;
  status: 'active' | 'inactive';
  lastUpdated: string;
  canAccess: boolean;
  dashboardUrl?: string;
}

interface SSOData {
  token: string;
  domain: string;
  dashboardUrls: {
    full: string;
    widgets: string;
    embed: string;
  };
  expires: string;
  user: {
    email: string;
    name: string;
    id: string;
  };
}

interface OptzDashboardProps {
  host: string;
}

export default function OptzDashboard({ host }: OptzDashboardProps) {
  const router = useRouter();
  const [session, setSession] = useState<OptzSession | null>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<string>('basic');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load session data on mount
  useEffect(() => {
    const sessionData = getOptzSession();
    if (sessionData) {
      setSession(sessionData);
      setLoading(false);
    } else {
      // No session found, redirect to login
      router.push('/optz');
    }
  }, [router]);

  const handleLogout = () => {
    clearOptzSession();
    router.push('/optz');
  };

  const handleUpgrade = () => {
    if (session) {
      const upgradeUrl = getUpgradeUrl(session.client.plan);
      window.open(upgradeUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // This should not happen due to redirect
  }

  const planFeatures = getPlanFeatures(session.client.plan);
  const dashboardAccess = getDashboardAccess(session.client.plan);
  
  const availableDashboards = [
    { id: 'basic', name: 'Basic Analytics', icon: BarChart3, available: dashboardAccess.basic },
    { id: 'marketing', name: 'Marketing ROI', icon: TrendingUp, available: dashboardAccess.marketing },
    { id: 'advanced', name: 'Advanced Analytics', icon: Shield, available: dashboardAccess.advanced },
    { id: 'executive', name: 'Executive Command', icon: Crown, available: dashboardAccess.executive }
  ].filter(dashboard => dashboard.available);

  return (
    <>
      <Head>
        <title>{session.client.companyName} - Analytics Dashboard</title>
        <meta name="description" content="Access your business intelligence dashboards with real-time data visualization." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`https://${host}/dashboard`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Header */}
        <header className="bg-black/50 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-white">{session.client.companyName}</h1>
                <div className="ml-4 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                  <span className="text-white text-sm font-medium uppercase">{session.client.plan}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm">Welcome, {session.client.username}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Plan Overview */}
          <div className="mb-8 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
                <p className="text-gray-300">Plan: {session.client.plan.charAt(0).toUpperCase() + session.client.plan.slice(1)}</p>
              </div>
              <div className="text-right">
                <p className="text-cyan-400 font-medium">{planFeatures.widgets} widgets</p>
                <p className="text-gray-400 text-sm">{planFeatures.refreshRate} refresh</p>
              </div>
            </div>
            
            {session.client.plan !== 'enterprise' && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 font-medium">Upgrade for More Features</p>
                    <p className="text-gray-300 text-sm">Get access to advanced analytics and more dashboards</p>
                  </div>
                  <button
                    onClick={handleUpgrade}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                             text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    <ArrowUp className="w-4 h-4" />
                    <span>Upgrade</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {availableDashboards.map((dashboard) => {
              const IconComponent = dashboard.icon;
              const isSelected = selectedDashboard === dashboard.id;
              
              return (
                <div
                  key={dashboard.id}
                  onClick={() => setSelectedDashboard(dashboard.id)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedDashboard(dashboard.id)}
                  role="button"
                  tabIndex={0}
                  className={`bg-black border rounded-xl p-6 cursor-pointer transition-all duration-200 
                            ${isSelected 
                              ? 'border-cyan-400 bg-cyan-500/10' 
                              : 'border-gray-800 hover:border-gray-600'}`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-lg ${isSelected ? 'bg-cyan-500' : 'bg-gray-700'}`}>
                      <IconComponent className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-300'}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{dashboard.name}</h3>
                      <p className="text-gray-400 text-sm">Real-time analytics</p>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Here you would integrate with actual Cyfe dashboard
                          console.log(`Opening ${dashboard.name} dashboard`);
                        }}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 
                                 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open Dashboard</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Features & Limits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Plan Features</h3>
              <div className="space-y-3">
                {planFeatures.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Available Dashboards</h3>
              <div className="space-y-3">
                {planFeatures.dashboards.map((dashboard, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span className="text-gray-300">{dashboard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="mt-8 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">Session started:</span>
                <span className="text-gray-300">{new Date(session.loginTime).toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const host = req.headers.host || 'optz.siteoptz.ai';

  return {
    props: {
      host,
    },
  };
};
