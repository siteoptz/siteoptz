import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useUserPlan } from '../../hooks/useUserPlan';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { getDashboardContent, getUpgradePrompt } from '../../content/dashboard-marketing-content';
import { UpgradePrompt } from '../../components/UpgradePrompt';
import { generateGoogleAdsAuthUrl } from '../../lib/oauth-utils';
import { getStoredGoogleAdsAccount } from '../../lib/google-ads-api';
// import MarketingROIDashboard from '../../components/dashboard/MarketingROIDashboard';
// import PlatformIntegrations from '../../components/dashboard/PlatformIntegrations';
// import AIInsightsEngine from '../../components/dashboard/AIInsightsEngine';
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  Crown,
  BookOpen,
  TrendingUp,
  BarChart3,
  FileText,
  Phone,
  Settings,
  Share,
  Download,
  Play,
  Clock,
  Star,
  ArrowRight,
  Filter,
  Shield,
  Zap,
  User,
  Video,
  MessageSquare,
  Target,
  Globe,
  Code,
  Award,
  Building2,
  Rocket,
  CreditCard,
  Bell,
  DollarSign,
  Lock,
  Database,
  Brain,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';

interface ProDashboardProps {
  session: Session | null;
}

export default function ProDashboard({ session }: ProDashboardProps) {
  const { userPlan, loading } = useUserPlan();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [connectionStatus, setConnectionStatus] = useState<{ 
    message?: string; 
    type?: 'success' | 'error' 
  }>({});
  const [googleAdsConnection, setGoogleAdsConnection] = useState<{
    connected: boolean;
    accountInfo?: any;
    accountId?: string;
    loading: boolean;
  }>({ connected: false, loading: true });

  // Handle URL tab parameter and OAuth callbacks
  useEffect(() => {
    if (router.isReady) {
      if (router.query.tab) {
        setActiveTab(router.query.tab as string);
      }
      
      // Handle OAuth callback parameters
      if (router.query.success === 'true' && router.query.platform === 'google-ads') {
        setConnectionStatus({
          message: 'Google Ads connected successfully!',
          type: 'success'
        });
        // Clear the query params after showing message
        setTimeout(() => {
          router.replace('/dashboard/pro', undefined, { shallow: true });
        }, 100);
        // Clear the message after 5 seconds
        setTimeout(() => setConnectionStatus({}), 5000);
      } else if (router.query.error && router.query.platform === 'google-ads') {
        setConnectionStatus({
          message: `Failed to connect Google Ads: ${router.query.error}`,
          type: 'error'
        });
        // Clear the query params after showing message
        setTimeout(() => {
          router.replace('/dashboard/pro', undefined, { shallow: true });
        }, 100);
        // Clear the message after 5 seconds
        setTimeout(() => setConnectionStatus({}), 5000);
      }
    }
  }, [router.isReady, router.query]);

  // Check for Google Ads connection status
  useEffect(() => {
    const checkGoogleAdsConnection = async () => {
      try {
        if (!session?.user?.email) {
          console.log('No user session found, skipping Google Ads connection check');
          setGoogleAdsConnection({ connected: false, loading: false });
          return;
        }

        console.log('Checking Google Ads connection for user:', session.user.email);
        const connection = await getStoredGoogleAdsAccount(session.user.email);
        
        setGoogleAdsConnection({
          connected: connection?.connected || false,
          accountInfo: connection?.accountInfo,
          accountId: connection?.accountId,
          loading: false
        });

        if (connection?.connected) {
          console.log('✅ Google Ads account connected:', connection.accountInfo?.name);
        } else {
          console.log('❌ No Google Ads account connected');
        }
      } catch (error) {
        console.error('Error checking Google Ads connection:', error);
        setGoogleAdsConnection({ connected: false, loading: false });
      }
    };

    // Only check when session is loaded
    if (session) {
      checkGoogleAdsConnection();
    }
  }, [session]);
  
  const proContent = getDashboardContent('pro') as any;
  const enterpriseUpgrade = getUpgradePrompt('pro', 'enterprise') as any;

  if (loading || !userPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userPlan || userPlan.plan !== 'pro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-300">This page is for Pro plan users only.</p>
          <Link href="/dashboard" className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader userPlan={userPlan} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Connection Status Notification */}
        {connectionStatus.message && (
          <div className={`mb-6 p-4 rounded-lg border ${
            connectionStatus.type === 'success' 
              ? 'bg-green-900/20 border-green-500/50 text-green-400' 
              : 'bg-red-900/20 border-red-500/50 text-red-400'
          }`}>
            <div className="flex items-center">
              {connectionStatus.type === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <span className="w-5 h-5 mr-2">⚠️</span>
              )}
              {connectionStatus.message}
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
            <Crown className="w-8 h-8 text-purple-400 mr-3" />
            {proContent.hero.title}
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            {proContent.hero.subtitle}
          </p>
          <p className="text-lg text-gray-400 mb-8">
            {proContent.hero.description}
          </p>
          
          {/* Elite Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {proContent.hero.stats.map((stat: any, index: number) => {
              const colors = ['text-cyan-400', 'text-green-400', 'text-purple-400', 'text-yellow-400'];
              return (
                <div key={index} className="bg-black border border-gray-800 rounded-xl p-6 text-center">
                  <div className={`text-3xl font-bold ${colors[index]} mb-2`}>{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured: Optz BI Access */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 border border-purple-500/50 rounded-2xl p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    Optz BI - Marketing ROI Tracker
                    <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full font-medium">
                      LIVE NOW
                    </span>
                  </h2>
                  <p className="text-gray-300 mb-3">
                    Access your complete marketing analytics platform with real-time ROI tracking, 
                    platform integrations, and AI-powered insights.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-blue-400" />
                      Platform Sync
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4 text-purple-400" />
                      AI Insights
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      Real-time ROI
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/dashboard/pro/optz-bi"
                  className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <BarChart3 className="w-6 h-6 mr-3" />
                  Launch Optz BI
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Link>
                <a
                  href="http://localhost:3001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-purple-500/50 text-purple-300 px-6 py-2 rounded-lg hover:bg-purple-500/10 transition-all text-sm"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Open in New Window
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Quick Access</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/dashboard/pro/optz-bi"
              className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/50 rounded-xl p-6 hover:border-purple-400 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <BarChart3 className="w-8 h-8 text-purple-400" />
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Optz BI</h3>
              <p className="text-sm text-gray-400">
                Live marketing ROI tracker with platform integrations
              </p>
              <div className="mt-2">
                <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">LIVE APP</span>
              </div>
            </Link>

            <Link
              href="/dashboard/pro/billing"
              className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <CreditCard className="w-8 h-8 text-cyan-400" />
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Billing & Analytics</h3>
              <p className="text-sm text-gray-400">
                Advanced billing, usage analytics, and payment management
              </p>
            </Link>

            <Link
              href="/dashboard/pro/notifications"
              className="bg-black border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <Bell className="w-8 h-8 text-purple-400" />
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Smart Notifications</h3>
              <p className="text-sm text-gray-400">
                AI-powered alerts, consultation reminders, and team updates
              </p>
            </Link>

            <Link
              href="/dashboard/pro/settings"
              className="bg-black border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <Settings className="w-8 h-8 text-green-400" />
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Pro Settings</h3>
              <p className="text-sm text-gray-400">
                Team management, integrations, and advanced configurations
              </p>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-800">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'roi-dashboard', 'platforms', 'ai-insights', 'consulting', 'reports', 'team', 'support'].map((tab: string) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-purple-400 text-purple-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/-/g, ' ')}
                  {activeTab === tab && <span className="ml-2 text-xs">●</span>}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* ROI Dashboard Tab */}
        {activeTab === 'roi-dashboard' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-2">Marketing ROI Dashboard</h3>
              <p className="text-gray-300">Real-time marketing performance tracking and analytics</p>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-900/20 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">+12.5%</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">$45,231</h3>
                <p className="text-gray-400 text-sm">Total Revenue</p>
              </div>

              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-900/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-blue-400 text-sm font-medium">+8.2%</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">2.47x</h3>
                <p className="text-gray-400 text-sm">Overall ROI</p>
              </div>

              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-900/20 rounded-lg">
                    <Target className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-purple-400 text-sm font-medium">+15.3%</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">287</h3>
                <p className="text-gray-400 text-sm">Total Conversions</p>
              </div>

              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-900/20 rounded-lg">
                    <Users className="w-6 h-6 text-yellow-400" />
                  </div>
                  <span className="text-yellow-400 text-sm font-medium">+5.7%</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">$1,247</h3>
                <p className="text-gray-400 text-sm">Avg. Spend per Campaign</p>
              </div>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-white text-lg font-semibold mb-2">Marketing ROI Dashboard</h4>
                  <p className="text-gray-400 mb-4">Connect your marketing platforms to see detailed analytics</p>
                  <button 
                    onClick={() => setActiveTab('platforms')}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Connect Platforms First
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Platform Integrations Tab */}
        {activeTab === 'platforms' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-2">Platform Integrations</h3>
              <p className="text-gray-300">Connect your marketing platforms for unified analytics and ROI tracking</p>
            </div>

            {/* Platform Connection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Google Ads */}
              <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">G</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Google Ads</h4>
                      <p className="text-gray-400 text-sm">
                        {googleAdsConnection.connected && googleAdsConnection.accountInfo 
                          ? `${googleAdsConnection.accountInfo.name} (${googleAdsConnection.accountId})`
                          : 'Campaign performance'
                        }
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    googleAdsConnection.connected 
                      ? 'bg-green-900 text-green-400' 
                      : 'bg-gray-800 text-gray-400'
                  }`}>
                    {googleAdsConnection.loading ? 'Checking...' : 
                     googleAdsConnection.connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  {googleAdsConnection.connected 
                    ? `Connected to ${googleAdsConnection.accountInfo?.name || 'Google Ads'}. View campaign data and performance metrics.`
                    : 'Connect your Google Ads account to track campaigns, keywords, and performance metrics.'
                  }
                </p>
                {googleAdsConnection.connected ? (
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        alert('View Google Ads data would open analytics dashboard here.');
                      }}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      View Campaign Data
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm('Are you sure you want to disconnect your Google Ads account?')) {
                          if (!session?.user?.email) {
                            alert('Session not found. Please refresh the page.');
                            return;
                          }
                          // Clear stored connection
                          localStorage.removeItem(`google_ads_connection_${session.user.email}`);
                          setGoogleAdsConnection({ connected: false, loading: false });
                          console.log('Google Ads account disconnected for user:', session.user.email);
                          alert('Google Ads account disconnected.');
                        }
                      }}
                      className="w-full bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      Disconnect Account
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('🔵 Connect Google Ads button clicked');
                      
                      try {
                        const authUrl = generateGoogleAdsAuthUrl();
                        console.log('Generated OAuth URL:', authUrl);
                        
                        if (authUrl && authUrl !== '#') {
                          console.log('✅ Redirecting to Google OAuth...');
                          window.location.href = authUrl;
                        } else {
                          console.error('❌ Failed to generate OAuth URL');
                          alert('Unable to generate OAuth URL. Please check your configuration.');
                        }
                      } catch (error) {
                        console.error('Error in click handler:', error);
                        alert('Error: ' + (error instanceof Error ? error.message : String(error)));
                      }
                    }}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Connect Google Ads
                  </button>
                )}
              </div>

              {/* Meta Ads */}
              <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">f</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Meta Ads</h4>
                      <p className="text-gray-400 text-sm">Facebook & Instagram</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">
                    Disconnected
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Connect Meta Ads Manager to monitor Facebook and Instagram campaign performance.
                </p>
                <button 
                  onClick={() => {
                    alert('Meta Ads connection would open OAuth flow here. In production, this would connect to Facebook Marketing API for campaign tracking and analytics.');
                  }}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Connect Meta Ads
                </button>
              </div>

              {/* TikTok Ads */}
              <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-pink-500/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">T</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">TikTok Ads</h4>
                      <p className="text-gray-400 text-sm">Video advertising</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">
                    Disconnected
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Connect TikTok Ads Manager to track video ad performance and engagement metrics.
                </p>
                <button 
                  onClick={() => {
                    alert('TikTok Ads connection would open OAuth flow here. In production, this would connect to TikTok Marketing API for campaign tracking and analytics.');
                  }}
                  className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Connect TikTok Ads
                </button>
              </div>

              {/* Google Analytics */}
              <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-orange-500/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">GA</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Google Analytics</h4>
                      <p className="text-gray-400 text-sm">Website traffic</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">
                    Disconnected
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Link Google Analytics to track website traffic, conversions, and user behavior.
                </p>
                <button 
                  onClick={() => {
                    alert('Google Analytics connection would open OAuth flow here. In production, this would connect to Google Analytics API for website traffic and conversion tracking.');
                  }}
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Connect Google Analytics
                </button>
              </div>

              {/* LinkedIn Ads */}
              <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-blue-600/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">in</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">LinkedIn Ads</h4>
                      <p className="text-gray-400 text-sm">B2B advertising</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">
                    Coming Soon
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Connect LinkedIn Campaign Manager for B2B advertising performance tracking.
                </p>
                <button 
                  disabled
                  className="w-full bg-gray-700 text-gray-400 py-2 px-4 rounded-lg cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>

              {/* Twitter Ads */}
              <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-blue-400/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">X</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Twitter Ads</h4>
                      <p className="text-gray-400 text-sm">Social media ads</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">
                    Coming Soon
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Connect Twitter Ads Manager for social media campaign analytics.
                </p>
                <button 
                  disabled
                  className="w-full bg-gray-700 text-gray-400 py-2 px-4 rounded-lg cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Connection Status */}
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-purple-400 font-semibold mb-2">Secure Platform Integration</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    All platform connections use OAuth 2.0 for secure authentication. We only request read-only permissions 
                    to analyze your marketing data and never store your passwords. Your data is encrypted and handled 
                    according to industry security standards.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      OAuth 2.0 secure
                    </span>
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Read-only access
                    </span>
                    <span className="flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      Encrypted storage
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'ai-insights' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-900/20 to-purple-900/20 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-2">AI Insights Engine</h3>
              <p className="text-gray-300">Claude AI-powered recommendations and optimization insights</p>
            </div>

            {/* AI Insights Demo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sample Insights */}
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <h4 className="text-white font-semibold">AI-Generated Insights</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <h5 className="text-green-400 font-medium mb-1">Increase TikTok Budget by 40%</h5>
                        <p className="text-gray-300 text-sm mb-2">
                          TikTok campaigns are showing exceptional ROI (3.2x vs 2.1x average). Current budget constraints are limiting growth potential.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-green-400 text-sm font-medium">+$1,200 monthly revenue</span>
                          <span className="text-gray-400 text-xs">94% confidence</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div>
                        <h5 className="text-yellow-400 font-medium mb-1">High CPA Alert: Brand Campaign</h5>
                        <p className="text-gray-300 text-sm mb-2">
                          Brand Awareness campaign CPA ($42.86) is 35% above target ($32). This is impacting overall profitability.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-yellow-400 text-sm font-medium">Reduce CPA by 25%</span>
                          <span className="text-gray-400 text-xs">87% confidence</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <h5 className="text-blue-400 font-medium mb-1">New Keyword Opportunities</h5>
                        <p className="text-gray-300 text-sm mb-2">
                          Discovered 15 high-value keywords with low competition that could improve Google Ads performance.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400 text-sm font-medium">+$800 monthly revenue</span>
                          <span className="text-gray-400 text-xs">76% confidence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    alert('AI Insights generation would start here. In production, this would trigger Claude AI analysis of your marketing data.');
                  }}
                  className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Generate New Insights
                </button>
              </div>

              {/* AI Analysis Status */}
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <h4 className="text-white font-semibold">Claude AI Analysis</h4>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 text-sm">Last Analysis</span>
                      <span className="text-green-400 text-sm">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 text-sm">Insights Generated</span>
                      <span className="text-blue-400 text-sm">12 recommendations</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 text-sm">Confidence Score</span>
                      <span className="text-purple-400 text-sm">89% average</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Next Analysis</span>
                      <span className="text-yellow-400 text-sm">In 22 hours</span>
                    </div>
                  </div>

                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <h5 className="text-purple-400 font-medium mb-2">AI Analysis Capabilities</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Performance trend analysis</li>
                      <li>• Budget optimization recommendations</li>
                      <li>• Campaign scaling opportunities</li>
                      <li>• Cost efficiency improvements</li>
                      <li>• Predictive performance forecasting</li>
                      <li>• Competitive analysis insights</li>
                    </ul>
                  </div>

                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <h5 className="text-green-400 font-medium mb-2">Implementation Tracking</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Implemented This Month</span>
                        <span className="text-green-400">8 insights</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Pending Review</span>
                        <span className="text-yellow-400">3 insights</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Average Impact</span>
                        <span className="text-blue-400">+15% ROI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Brain className="w-6 h-6 text-purple-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-purple-400 font-semibold mb-2">Claude AI Analysis Engine</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Our AI continuously analyzes your marketing data to identify optimization opportunities, 
                    predict trends, and provide actionable recommendations. Insights are generated based on 
                    real-time performance data and industry benchmarks.
                  </p>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        alert('This would trigger real-time AI analysis of your connected marketing platforms.');
                      }}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Analyze Now
                    </button>
                    <button 
                      onClick={() => setActiveTab('platforms')}
                      className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Connect More Platforms
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Executive AI Advisory Board */}
            <div className="bg-black border border-gray-800 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <User className="w-8 h-8 text-purple-400 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{proContent.features.consulting.title}</h2>
                  <p className="text-gray-300">{proContent.features.consulting.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                {proContent.features.consulting.description}
              </p>
              
              {/* Session Types */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {proContent.features.consulting.sessions.map((session: any, index: number) => (
                  <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-400 mb-2">{session.type}</h4>
                    <p className="text-sm text-gray-300 mb-1">{session.duration}</p>
                    <p className="text-xs text-gray-400 mb-2">Value: {session.value}</p>
                    <p className="text-xs text-gray-500">{session.outcome}</p>
                  </div>
                ))}
              </div>

              {/* Next Session */}
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-white mb-2">Next Available Session</h4>
                <p className="text-purple-300">{proContent.features.consulting.nextSession.consultant}</p>
                <p className="text-sm text-gray-400">{proContent.features.consulting.nextSession.credentials}</p>
                <p className="text-sm text-blue-400">{proContent.features.consulting.nextSession.availability}</p>
              </div>

              <button className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                {proContent.features.consulting.cta.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-gray-500 mt-2">{proContent.features.consulting.cta.subtext}</p>
            </div>

            {/* Board-Ready Intelligence Reports */}
            <div className="bg-black border border-gray-800 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <FileText className="w-8 h-8 text-blue-400 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{proContent.features.customReports.title}</h2>
                  <p className="text-gray-300">{proContent.features.customReports.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                {proContent.features.customReports.description}
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {proContent.features.customReports.reports.map((report: any, index: number) => (
                  <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">{report.name}</h4>
                    <p className="text-sm text-gray-300 mb-1">{report.frequency}</p>
                    <p className="text-xs text-gray-400 mb-2">{report.insights}</p>
                    <p className="text-xs text-green-400">Value: {report.value}</p>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all">
                {proContent.features.customReports.cta.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-gray-500 mt-2">{proContent.features.customReports.cta.subtext}</p>
            </div>
          </div>
        )}

        {/* Consulting Tab */}
        {activeTab === 'consulting' && (
          <div className="space-y-8">
            {/* Active Team Display */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 text-yellow-400 mr-2" />
                {proContent.features.prioritySupport.title}
              </h2>
              <p className="text-gray-300 text-sm mb-2">{proContent.features.prioritySupport.subtitle}</p>
              <p className="text-gray-400 mb-6">{proContent.features.prioritySupport.description}</p>

              {/* Success Team */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {proContent.features.prioritySupport.team.map((member: any, index: number) => (
                  <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <h4 className="text-white font-medium">{member.name}</h4>
                        <p className="text-gray-400 text-sm">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{member.background}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.availability === 'On standby' || member.availability === 'Available now' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {member.availability}
                    </span>
                  </div>
                ))}
              </div>

              {/* Team Metrics */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-green-400">Response Time</h4>
                  <p className="text-2xl font-bold text-white">{proContent.features.prioritySupport.metrics.responseTime}</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-blue-400">Satisfaction Score</h4>
                  <p className="text-2xl font-bold text-white">{proContent.features.prioritySupport.metrics.satisfactionScore}</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-purple-400">Success Rate</h4>
                  <p className="text-2xl font-bold text-white">{proContent.features.prioritySupport.metrics.successRate}</p>
                </div>
              </div>

              <button className="inline-flex items-center bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all">
                {proContent.features.prioritySupport.cta.text}
                <MessageSquare className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-gray-500 mt-2">{proContent.features.prioritySupport.cta.subtext}</p>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-8">
            {/* Enterprise Command Center */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Building2 className="w-6 h-6 text-blue-400 mr-2" />
                {proContent.features.teamCollaboration.title}
              </h2>
              <p className="text-gray-300 text-sm mb-2">{proContent.features.teamCollaboration.subtitle}</p>
              <p className="text-gray-400 mb-6">{proContent.features.teamCollaboration.description}</p>

              {/* Capabilities */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Command Center Capabilities</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {proContent.features.teamCollaboration.capabilities.map((capability: any, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">Live Activity</h4>
                  <p className="text-3xl font-bold text-white mb-2">{proContent.features.teamCollaboration.activeNow}</p>
                  <p className="text-blue-300 text-sm">Currently collaborating</p>
                </div>
              </div>

              <button className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                {proContent.features.teamCollaboration.cta.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-gray-500 mt-2">{proContent.features.teamCollaboration.cta.subtext}</p>
            </div>
          </div>
        )}

        {/* Reports & Support Tabs - Using existing functionality */}
        {(activeTab === 'reports' || activeTab === 'support') && (
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              {activeTab === 'reports' ? 'Custom Reports' : 'Priority Support'}
            </h2>
            <p className="text-gray-400 mb-4">
              {activeTab === 'reports' 
                ? 'Generate custom white-label reports for your organization.'
                : 'Access your dedicated support team and resources.'
              }
            </p>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              {activeTab === 'reports' ? 'Generate Report' : 'Contact Support'}
            </button>
          </div>
        )}

        {/* Upgrade to Enterprise */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">{enterpriseUpgrade?.title}</h3>
          <p className="text-xl text-purple-100 mb-2">{enterpriseUpgrade?.subtitle}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="text-left">
              <h4 className="font-semibold text-white mb-4">Enterprise Unlocks:</h4>
              <ul className="space-y-3 text-purple-100">
                {enterpriseUpgrade?.benefits.map((benefit: any, index: number) => (
                  <li key={index} className="flex items-center">
                    <Crown className="w-5 h-5 text-yellow-400 mr-3" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-black/40 p-6 rounded-lg border border-purple-300/20">
              <blockquote className="text-purple-100 italic mb-4">
                &ldquo;{enterpriseUpgrade?.testimonial.quote}&rdquo;
              </blockquote>
              <cite className="text-sm text-purple-200">
                — {enterpriseUpgrade?.testimonial.author}, {enterpriseUpgrade?.testimonial.title}
              </cite>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-yellow-300 font-medium mb-2">⚡ {enterpriseUpgrade?.exclusivity}</p>
          </div>
          
          <Link 
            href="/upgrade" 
            className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-lg text-lg font-bold hover:from-yellow-400 hover:to-orange-400 transition-all"
          >
            {enterpriseUpgrade?.cta}
            <Rocket className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/#login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};