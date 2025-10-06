// Premium Dashboard Page with Power BI Integration
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const PowerBIDashboard = dynamic(
  () => import('@/components/dashboard/PowerBIDashboard'),
  { ssr: false }
);
import { BarChart3, TrendingUp, Users, DollarSign, Lock, ArrowUp } from 'lucide-react';

const PremiumDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reports, setReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin?callbackUrl=/premium-dashboard');
      return;
    }

    const userPlan = (session.user as any)?.plan || 'free';
    if (!['pro', 'premium', 'enterprise'].includes(userPlan)) {
      router.push('/upgrade');
      return;
    }

    fetchReports();
  }, [session, status, router]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/powerbi/reports');
      
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }

      const data = await response.json();
      setReports(data.reports || []);
      
      // Select first available report by default
      if (data.reports?.length > 0) {
        setSelectedReport(data.reports[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getUserPlanBadge = (plan: string) => {
    const planConfig: Record<string, { color: string; text: string }> = {
      pro: { color: 'bg-blue-500', text: 'Pro' },
      premium: { color: 'bg-purple-500', text: 'Premium' },
      enterprise: { color: 'bg-emerald-500', text: 'Enterprise' }
    };
    
    const config = planConfig[plan] || planConfig.pro;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
        {config.text}
      </span>
    );
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your premium dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Premium Analytics Dashboard - SiteOptz.ai</title>
        <meta name="description" content="Advanced marketing analytics dashboard powered by Power BI" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Header */}
        <div className="bg-black border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <img src="/images/siteoptz-logo.png" alt="SiteOptz" className="h-8" />
                <h1 className="text-xl font-bold text-white">Premium Analytics</h1>
                {(session?.user as any)?.plan && getUserPlanBadge((session?.user as any).plan)}
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">Welcome, {session?.user?.name}</span>
                <button
                  onClick={() => router.push('/upgrade')}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  <ArrowUp className="w-4 h-4 inline mr-2" />
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Available Reports</h2>
                
                {error ? (
                  <div className="text-red-400 text-sm p-4 bg-red-900/20 border border-red-900 rounded-lg">
                    {error}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {reports.map((report) => (
                      <button
                        key={(report as any).id}
                        onClick={() => setSelectedReport(report)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          (selectedReport as any)?.id === (report as any).id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{(report as any).name}</span>
                          {getUserPlanBadge((report as any).planTier)}
                        </div>
                        <p className="text-sm opacity-75 mt-1">{(report as any).description}</p>
                      </button>
                    ))}
                  </div>
                )}

                {/* Plan Benefits */}
                <div className="mt-8 p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <h3 className="text-sm font-semibold text-white mb-3">Your Plan Benefits</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-green-400" />
                      Advanced Analytics
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                      Real-time Data
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-green-400" />
                      Multi-platform Insights
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                      ROI Tracking
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Dashboard */}
            <div className="lg:col-span-3">
              {selectedReport ? (
                <div className="space-y-6">
                  {/* Dashboard Header */}
                  <div className="bg-black border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-white">{(selectedReport as any).name}</h2>
                        <p className="text-gray-400 mt-1">{(selectedReport as any).description}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getUserPlanBadge((selectedReport as any).planTier)}
                        <span className="text-xs text-gray-500">
                          Last updated: {new Date((selectedReport as any).modifiedDateTime).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Power BI Dashboard */}
                  <PowerBIDashboard
                    reportId={(selectedReport as any).id}
                    height="800px"
                    showToolbar={true}
                    allowExport={(session?.user as any)?.plan !== 'pro'}
                    theme="dark"
                    className="shadow-2xl"
                  />
                </div>
              ) : (
                <div className="bg-black border border-gray-800 rounded-lg p-12 text-center">
                  <Lock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Select a Report</h3>
                  <p className="text-gray-400">Choose a report from the sidebar to view your analytics dashboard.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumDashboard;