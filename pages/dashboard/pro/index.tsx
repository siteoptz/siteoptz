import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getCleanDashboardProps, CleanDashboardProps } from '@/lib/server-side-auth';
import { CleanDashboardHeader } from '@/components/dashboard/CleanDashboardHeader';
import CleanMarketingROIDashboard from '@/components/dashboard/CleanMarketingROIDashboard';
import { getGoogleAdsDataServerSide, getGoogleAdsConnectionServerSide } from '@/lib/clean-google-ads';
import CyfeDashboard from '@/components/dashboard/CyfeDashboard';
import {
  BarChart3,
  BarChart2,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Globe,
  Zap,
  Shield,
  Crown,
  Star,
  ArrowRight,
  Building2,
  Settings,
  Bell,
  CreditCard,
  Sparkles,
  Activity
} from 'lucide-react';

interface ProDashboardProps extends CleanDashboardProps {
  googleAdsData: any;
  googleAdsConnection: any;
  activeTab: string;
}

export default function ProDashboard({ 
  session, 
  userPlan, 
  isAuthenticated,
  googleAdsData,
  googleAdsConnection,
  activeTab 
}: ProDashboardProps) {
  // Static tabs array - no dynamic content
  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3, highlight: false },
    { id: 'cyfe-analytics', name: 'Analytics Suite', icon: BarChart2, highlight: true, badge: 'PRO', badgeColor: 'purple' },
    { id: 'roi-dashboard', name: 'ROI Dashboard', icon: Target, highlight: false },
    { id: 'platforms', name: 'Platforms', icon: Globe, highlight: false },
    { id: 'ai-insights', name: 'AI Insights', icon: Zap, highlight: false },
    { id: 'settings', name: 'Settings', icon: Settings, highlight: false },
    { id: 'notifications', name: 'Notifications', icon: Bell, highlight: false },
    { id: 'billing', name: 'Billing', icon: CreditCard, highlight: false }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'roi-dashboard':
        return (
          <CleanMarketingROIDashboard
            googleAdsData={googleAdsData}
            googleAdsConnection={googleAdsConnection}
            dateRange="LAST_30_DAYS"
          />
        );
      
      case 'cyfe-analytics':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Advanced Analytics Suite</h2>
              <p className="text-gray-300">
                Access comprehensive business intelligence dashboards with real-time data streaming, 
                predictive analytics, and custom metrics. Pro plan users get access to advanced analytics 
                including cohort analysis, revenue attribution, and customer lifetime value tracking.
              </p>
            </div>
            
            <CyfeDashboard 
              userPlan="pro"
              userName={userPlan.userName || "User"}
              dashboardId="advanced"
              apiData={{
                metrics: {
                  'revenue-attribution': 15420,
                  'customer-ltv': 2847,
                  'churn-rate': 3.2,
                  'acquisition-cost': 127
                },
                chartData: {
                  'predictive-analytics': {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4 (Projected)'],
                    datasets: [{
                      label: 'Revenue Projection',
                      data: [450000, 520000, 610000, 750000],
                      backgroundColor: 'rgba(147, 51, 234, 0.2)',
                      borderColor: '#9333EA'
                    }]
                  },
                  'revenue-attribution': {
                    labels: ['Organic', 'Paid Search', 'Social', 'Email', 'Direct'],
                    datasets: [{
                      label: 'Revenue by Channel',
                      data: [35, 28, 18, 12, 7],
                      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
                    }]
                  }
                },
                tableData: {
                  'cohort-analysis': {
                    headers: ['Cohort', 'Month 1', 'Month 2', 'Month 3', 'Month 6', 'Month 12'],
                    rows: [
                      ['Jan 2024', '100%', '85%', '72%', '61%', '45%'],
                      ['Feb 2024', '100%', '88%', '75%', '64%', '48%'],
                      ['Mar 2024', '100%', '91%', '78%', '67%', '51%'],
                      ['Apr 2024', '100%', '89%', '76%', '65%', '-'],
                      ['May 2024', '100%', '92%', '79%', '-', '-']
                    ]
                  }
                },
                gaugeData: {
                  'customer-satisfaction': {
                    value: 8.7,
                    min: 0,
                    max: 10
                  },
                  'net-promoter-score': {
                    value: 72,
                    min: -100,
                    max: 100
                  }
                }
              }}
            />
          </div>
        );
      
      case 'platforms':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Platform Integrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Google Ads */}
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">GA</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Google Ads</h3>
                    <p className="text-gray-400 text-sm">Campaign performance tracking</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    googleAdsConnection.isConnected 
                      ? 'bg-green-900/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-900/20 text-red-400 border border-red-500/30'
                  }`}>
                    {googleAdsConnection.isConnected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
                <Link
                  href={googleAdsConnection.isConnected ? '/dashboard/pro?tab=roi-dashboard' : '/api/marketing-platforms/google-ads/auth'}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    googleAdsConnection.isConnected
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  {googleAdsConnection.isConnected ? 'View Dashboard' : 'Connect Google Ads'}
                </Link>
              </div>

              {/* Meta Ads */}
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Meta Ads</h3>
                    <p className="text-gray-400 text-sm">Facebook & Instagram campaigns</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-900/20 text-red-400 border border-red-500/30">
                    Not Connected
                  </span>
                </div>
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors">
                  Connect Meta Ads
                </button>
              </div>

              {/* TikTok Ads */}
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">T</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">TikTok Ads</h3>
                    <p className="text-gray-400 text-sm">TikTok campaign analytics</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-900/20 text-red-400 border border-red-500/30">
                    Not Connected
                  </span>
                </div>
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors">
                  Connect TikTok Ads
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'ai-insights':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">AI Insights</h2>
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Coming Soon</h3>
              </div>
              <p className="text-gray-400">
                AI-powered insights and recommendations will be available here. 
                Connect your marketing platforms to get personalized optimization suggestions.
              </p>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Profile Settings</h3>
              <p className="text-gray-400">Settings panel will be available here.</p>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Notifications</h2>
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
              <p className="text-gray-400">Notification settings will be available here.</p>
            </div>
          </div>
        );
      
      case 'billing':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Billing</h2>
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Billing Information</h3>
              <p className="text-gray-400">Billing details will be available here.</p>
            </div>
          </div>
        );
      
      default: // overview
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Pro Dashboard Overview</h2>
            
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Crown className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">Welcome to Pro!</h3>
              </div>
              <p className="text-gray-300 mb-4">
                You have access to all Pro features including unlimited comparisons, advanced analytics, 
                expert consultations, and our powerful Marketing ROI Dashboard.
              </p>
              <div className="flex flex-wrap gap-2">
                {userPlan.features.slice(0, 4).map((feature, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Featured Analytics Suite Card */}
            <div className="bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center animate-pulse">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      Advanced Analytics Suite Now Available
                      <Sparkles className="w-5 h-5 text-yellow-400 ml-2" />
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Access predictive analytics, cohort analysis, revenue attribution, and customer lifetime value tracking
                    </p>
                  </div>
                </div>
                <Link
                  href="/dashboard/pro?tab=cyfe-analytics"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium flex items-center shadow-lg shadow-purple-500/20"
                >
                  Open Analytics Suite
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Analytics Suite - Featured */}
              <Link
                href="/dashboard/pro?tab=cyfe-analytics"
                className="relative bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/50 rounded-xl p-6 hover:border-purple-400 transition-all group overflow-hidden"
              >
                <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-bl-lg">
                  PRO EXCLUSIVE
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BarChart2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Analytics Suite</h3>
                    <p className="text-gray-300 text-sm">Advanced business intelligence</p>
                  </div>
                </div>
                <div className="flex items-center text-purple-400 text-sm font-medium">
                  <span>Open Suite</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              
              <Link
                href="/dashboard/pro?tab=roi-dashboard"
                className="bg-black border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-colors group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">ROI Dashboard</h3>
                    <p className="text-gray-400 text-sm">Marketing performance tracking</p>
                  </div>
                </div>
                <div className="flex items-center text-blue-400 text-sm">
                  <span>View Dashboard</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>

              <Link
                href="/dashboard/pro?tab=platforms"
                className="bg-black border border-gray-800 rounded-xl p-6 hover:border-green-500 transition-colors group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-700 transition-colors">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Platforms</h3>
                    <p className="text-gray-400 text-sm">Connect marketing platforms</p>
                  </div>
                </div>
                <div className="flex items-center text-green-400 text-sm">
                  <span>Manage Connections</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>

              <Link
                href="/dashboard/pro?tab=ai-insights"
                className="bg-black border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-colors group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">AI Insights</h3>
                    <p className="text-gray-400 text-sm">Smart recommendations</p>
                  </div>
                </div>
                <div className="flex items-center text-purple-400 text-sm">
                  <span>Get Insights</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            </div>

            {/* Usage Stats */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Usage This Month</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{userPlan.usage.comparisons}</div>
                  <p className="text-gray-400 text-sm">Comparisons Made</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{userPlan.usage.consultations}</div>
                  <p className="text-gray-400 text-sm">Expert Consultations</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{userPlan.usage.teamMembers}</div>
                  <p className="text-gray-400 text-sm">Team Members</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <CleanDashboardHeader userPlan={userPlan} currentPage={activeTab} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation - Static */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`/dashboard/pro?tab=${tab.id}`}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? tab.highlight 
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-white text-black'
                      : tab.highlight
                        ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-white hover:from-purple-500/30 hover:to-indigo-500/30 border border-purple-500/30'
                        : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium">{tab.name}</span>
                  {tab.badge && (
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-bold ${
                      tab.badgeColor === 'purple' 
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                  {tab.highlight && (
                    <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tab } = context.query;
  const activeTab = (tab as string) || 'overview';

  // Get dashboard props with Pro plan requirement
  const dashboardProps = await getCleanDashboardProps(context, 'pro');
  
  if ('redirect' in dashboardProps) {
    return dashboardProps;
  }

  // Get Google Ads data server-side
  const [googleAdsData, googleAdsConnection] = await Promise.all([
    getGoogleAdsDataServerSide(dashboardProps.props.session.user.email),
    getGoogleAdsConnectionServerSide(dashboardProps.props.session.user.email)
  ]);

  return {
    props: {
      ...dashboardProps.props,
      googleAdsData,
      googleAdsConnection,
      activeTab
    }
  };
};
