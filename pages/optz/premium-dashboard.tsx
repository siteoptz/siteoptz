// Premium Dashboard Page for optz.siteoptz.ai subdomain
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import PowerBIDashboard from '@/components/dashboard/PowerBIDashboard';
import { BarChart3, TrendingUp, Users, DollarSign, Lock, ArrowUp, ExternalLink } from 'lucide-react';

const OptzPremiumDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      // Redirect to Cyfe login for optz subdomain
      window.location.href = '/login';
      return;
    }

    const userPlan = session.user?.plan || 'free';
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserPlanBadge = (plan) => {
    const planConfig = {
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
          <p className="text-gray-400">Loading your premium analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Premium Analytics Dashboard - Optz by SiteOptz</title>
        <meta name="description" content="Advanced marketing analytics dashboard powered by Power BI for Optz clients" />
        <link rel="canonical" href="https://optz.siteoptz.ai/premium-dashboard" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Header */}
        <div className="bg-black border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <img src="/images/siteoptz-logo.png" alt="Optz by SiteOptz" className="h-8" />
                <div>
                  <h1 className="text-xl font-bold text-white">Optz Analytics</h1>
                  <p className="text-xs text-gray-400">Powered by SiteOptz</p>
                </div>
                {session?.user?.plan && getUserPlanBadge(session.user.plan)}
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">Welcome, {session?.user?.name}</span>
                <a
                  href="https://siteoptz.ai/upgrade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center"
                >
                  <ArrowUp className="w-4 h-4 mr-2" />
                  Upgrade Plan
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Marketing Reports</h2>
                
                {error ? (
                  <div className="text-red-400 text-sm p-4 bg-red-900/20 border border-red-900 rounded-lg">
                    <p className="font-medium mb-2">Unable to load reports</p>
                    <p>{error}</p>
                    {error.includes('Pro plan') && (
                      <a
                        href="https://siteoptz.ai/upgrade"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Upgrade Now →
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {reports.map((report) => (
                      <button
                        key={report.id}
                        onClick={() => setSelectedReport(report)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedReport?.id === report.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{report.name}</span>
                          {getUserPlanBadge(report.planTier)}
                        </div>
                        <p className="text-sm opacity-75 mt-1">{report.description}</p>
                      </button>
                    ))}
                  </div>
                )}

                {/* Plan Benefits */}
                <div className="mt-8 p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <h3 className="text-sm font-semibold text-white mb-3">Analytics Features</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-green-400" />
                      Multi-Platform Data
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                      Real-time Insights
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-green-400" />
                      Audience Analytics
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                      ROI Optimization
                    </div>
                  </div>
                </div>

                {/* White-label Notice */}
                <div className="mt-6 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <p className="text-xs text-blue-300">
                    <strong>Optz Analytics</strong> is powered by SiteOptz&apos;s advanced marketing intelligence platform.
                  </p>
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
                        <h2 className="text-2xl font-bold text-white">{selectedReport.name}</h2>
                        <p className="text-gray-400 mt-1">{selectedReport.description}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getUserPlanBadge(selectedReport.planTier)}
                        <span className="text-xs text-gray-500">
                          Updated: {new Date(selectedReport.modifiedDateTime).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Power BI Dashboard */}
                  <PowerBIDashboard
                    reportId={selectedReport.id}
                    height="800px"
                    showToolbar={true}
                    allowExport={session?.user?.plan !== 'pro'}
                    theme="dark"
                    className="shadow-2xl"
                  />

                  {/* White-label Footer */}
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-400">
                      Advanced analytics powered by{' '}
                      <a
                        href="https://siteoptz.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        SiteOptz.ai
                      </a>
                      {' '}• Built with Power BI Embedded
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-black border border-gray-800 rounded-lg p-12 text-center">
                  <Lock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Select a Report</h3>
                  <p className="text-gray-400 mb-6">
                    Choose a marketing analytics report from the sidebar to view your data insights.
                  </p>
                  {reports.length === 0 && !loading && (
                    <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 max-w-md mx-auto">
                      <p className="text-blue-300 text-sm">
                        No reports available for your current plan. 
                        <a
                          href="https://siteoptz.ai/upgrade"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 ml-1 underline"
                        >
                          Upgrade to access premium analytics →
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptzPremiumDashboard;