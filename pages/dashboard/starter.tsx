import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { useUserPlan } from '../../hooks/useUserPlan';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { FeatureGate } from '../../components/FeatureGate';
import { UpgradePrompt } from '../../components/UpgradePrompt';
import CyfeDashboard from '../../components/dashboard/CyfeDashboard';
import { 
  Search, 
  Calendar, 
  Users, 
  CheckCircle, 
  Zap,
  BookOpen,
  TrendingUp,
  BarChart3,
  FileText,
  Mail,
  Download,
  Share,
  Play,
  Clock,
  Star,
  ArrowRight,
  Filter,
  Crown,
  CreditCard,
  Bell,
  Settings,
  Sparkles,
  Activity
} from 'lucide-react';
import Link from 'next/link';

export default function StarterDashboard() {
  const { userPlan, loading } = useUserPlan();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Extract user name from session
  const userName = session?.user?.name || 'User';

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

  if (!userPlan || userPlan.plan !== 'starter') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-300">This page is for Starter plan users only.</p>
          <Link href="/dashboard" className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader userPlan={userPlan} userName={userName} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Zap className="w-8 h-8 text-blue-400 mr-3" />
            Welcome {userName} to SiteOptz {userPlan.plan.charAt(0).toUpperCase() + userPlan.plan.slice(1)}
          </h1>
          <p className="text-gray-300">
            Unlock unlimited comparisons, advanced analytics, and expert resources. Next billing: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-800">
            <nav className="-mb-px flex space-x-6">
              <button
                onClick={() => setActiveTab('overview')}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-400 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                }`}
              >
                Overview
              </button>
              
              <button
                onClick={() => setActiveTab('cyfe-dashboards')}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTab('cyfe-dashboards')}
                className={`relative py-2 px-3 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === 'cyfe-dashboards'
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10'
                    : 'border-transparent text-gray-300 hover:text-white hover:border-cyan-400/50 bg-gradient-to-r from-cyan-500/10 to-blue-500/10'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Marketing Dashboards</span>
                <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs rounded-full font-semibold">
                  NEW
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('comparisons')}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTab('comparisons')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'comparisons'
                    ? 'border-blue-400 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                }`}
              >
                Comparisons
              </button>
              
              <button
                onClick={() => setActiveTab('analytics')}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTab('analytics')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-blue-400 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                }`}
              >
                Analytics
              </button>
              
              <button
                onClick={() => setActiveTab('guides')}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTab('guides')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'guides'
                    ? 'border-blue-400 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                }`}
              >
                Guides
              </button>
              
              <button
                onClick={() => setActiveTab('webinars')}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTab('webinars')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'webinars'
                    ? 'border-blue-400 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                }`}
              >
                Webinars
              </button>
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Featured Dashboard Access Card */}
            <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      Marketing ROI Dashboard Available
                      <Sparkles className="w-5 h-5 text-yellow-400 ml-2" />
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Track your marketing performance with real-time analytics and multi-channel attribution
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('cyfe-dashboards')}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveTab('cyfe-dashboards')}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 font-medium flex items-center"
                >
                  Open Dashboards
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
            
            {/* Usage Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Comparisons Today</p>
                    <p className="text-2xl font-bold text-white">47</p>
                    <p className="text-green-400 text-xs mt-1">Unlimited ∞</p>
                  </div>
                  <Search className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">ROI Tracked</p>
                    <p className="text-2xl font-bold text-white">$12,450</p>
                    <p className="text-green-400 text-xs mt-1">+23% this month</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Guides Accessed</p>
                    <p className="text-2xl font-bold text-white">18/50+</p>
                    <p className="text-blue-400 text-xs mt-1">Keep exploring</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Webinars Attended</p>
                    <p className="text-2xl font-bold text-white">3/4</p>
                    <p className="text-purple-400 text-xs mt-1">This month</p>
                  </div>
                  <Play className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Quick Access Cards */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Quick Access</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/dashboard/starter/billing"
                  className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <CreditCard className="w-8 h-8 text-cyan-400" />
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Billing & Payments</h3>
                  <p className="text-sm text-gray-400">
                    Manage subscription, view invoices, and track usage
                  </p>
                </Link>

                <Link
                  href="/dashboard/starter/notifications"
                  className="bg-black border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Bell className="w-8 h-8 text-purple-400" />
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Notifications</h3>
                  <p className="text-sm text-gray-400">
                    Configure alerts, email preferences, and updates
                  </p>
                </Link>

                <Link
                  href="/dashboard/starter/settings"
                  className="bg-black border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Settings className="w-8 h-8 text-green-400" />
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Account Settings</h3>
                  <p className="text-sm text-gray-400">
                    Update profile, security, and preferences
                  </p>
                </Link>
              </div>
            </div>

            {/* ROI Tracking Dashboard */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 text-green-400 mr-2" />
                ROI Tracking Dashboard
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h3 className="font-semibold text-green-400">Time Saved</h3>
                    <p className="text-2xl font-bold text-white">127 hours</p>
                    <p className="text-green-300 text-sm">Equivalent to $6,350 value</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-400">Productivity Gains</h3>
                    <p className="text-2xl font-bold text-white">34%</p>
                    <p className="text-blue-300 text-sm">Since AI implementation</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-400">Cost Savings</h3>
                    <p className="text-2xl font-bold text-white">$8,200</p>
                    <p className="text-purple-300 text-sm">From tool optimization</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <h3 className="font-semibold text-amber-400">Implementation Progress</h3>
                    <p className="text-2xl font-bold text-white">73%</p>
                    <p className="text-amber-300 text-sm">On track for completion</p>
                  </div>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Upgrade to Pro for:</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center">
                      <Crown className="w-4 h-4 text-purple-400 mr-2" />
                      1-on-1 expert consultations
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-purple-400 mr-2" />
                      Team collaboration tools
                    </div>
                    <div className="flex items-center">
                      <BarChart3 className="w-4 h-4 text-purple-400 mr-2" />
                      Advanced analytics
                    </div>
                  </div>
                  <UpgradePrompt
                    currentPlan="starter"
                    requiredPlan="pro"
                    feature="expert consultations"
                    variant="inline"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Unlimited Comparisons Tab */}
        {activeTab === 'comparisons' && (
          <div className="space-y-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Search className="w-6 h-6 text-blue-400 mr-2" />
                Unlimited AI Tool Comparisons
              </h2>
              
              {/* Advanced Search and Filters */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-4">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search from 100+ AI tools..."
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Advanced Filters
                  </button>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg">
                    Compare Tools
                  </button>
                </div>
                
                {/* Filter Tags */}
                <div className="flex flex-wrap gap-2">
                  {['Content Generation', 'Data Analysis', 'Customer Service', 'Marketing', 'Productivity'].map((tag) => (
                    <span key={tag} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Comparisons */}
              <div>
                <h3 className="font-semibold text-white mb-3">Recent Comparisons</h3>
                <div className="space-y-3">
                  {[
                    { tools: 'ChatGPT vs Claude AI', date: 'Today', result: 'Claude AI recommended' },
                    { tools: 'Jasper vs Copy.ai', date: 'Yesterday', result: 'Jasper recommended' },
                    { tools: 'Midjourney vs DALL-E', date: '2 days ago', result: 'Midjourney recommended' }
                  ].map((comparison, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                      <div>
                        <p className="text-white font-medium">{comparison.tools}</p>
                        <p className="text-gray-400 text-sm">{comparison.date} • {comparison.result}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300">
                          <FileText className="w-4 h-4" />
                        </button>
                        <button className="text-green-400 hover:text-green-300">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-purple-400 hover:text-purple-300">
                          <Share className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Implementation Roadmaps Tab */}
        {activeTab === 'guides' && (
          <div className="space-y-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <BookOpen className="w-6 h-6 text-green-400 mr-2" />
                Implementation Roadmaps & Guides
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Industry Specific Guides */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Industry-Specific</h3>
                  {[
                    'E-commerce AI Implementation',
                    'Healthcare AI Solutions',
                    'Financial Services AI',
                    'Manufacturing Automation',
                    'Marketing Agency Tools'
                  ].map((guide, idx) => (
                    <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 hover:border-gray-600 transition-colors">
                      <h4 className="text-white font-medium text-sm">{guide}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-green-400 text-xs">✓ Available</span>
                        <button className="text-blue-400 hover:text-blue-300 text-xs">
                          View Guide →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Step-by-Step Roadmaps */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Step-by-Step Roadmaps</h3>
                  {[
                    'AI Strategy Development',
                    'Tool Selection Process',
                    'Implementation Timeline',
                    'Team Training Program',
                    'Performance Measurement'
                  ].map((roadmap, idx) => (
                    <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 hover:border-gray-600 transition-colors">
                      <h4 className="text-white font-medium text-sm">{roadmap}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-green-400 text-xs">✓ Available</span>
                        <div className="flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            <FileText className="w-3 h-3" />
                          </button>
                          <button className="text-green-400 hover:text-green-300">
                            <Download className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pro Features Preview */}
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-400 mb-3">Unlock with Pro</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Crown className="w-4 h-4 text-purple-400 mr-2" />
                      Custom implementation plans
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Users className="w-4 h-4 text-purple-400 mr-2" />
                      Team collaboration features
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-4 h-4 text-purple-400 mr-2" />
                      1-on-1 expert consultations
                    </div>
                  </div>
                  <UpgradePrompt
                    currentPlan="starter"
                    requiredPlan="pro"
                    feature="custom implementation plans"
                    variant="inline"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cyfe Dashboards Tab */}
        {activeTab === 'cyfe-dashboards' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Marketing Analytics Dashboards</h2>
              <p className="text-gray-300">
                Access real-time marketing analytics and ROI tracking with our integrated Cyfe dashboards.
                As a Starter plan user, you have access to Marketing ROI Dashboard with multi-channel tracking.
              </p>
            </div>
            
            <CyfeDashboard 
              userPlan="starter"
              userName={userName}
              dashboardId="marketing"
              apiData={{
                metrics: {
                  'roas-tracker': 4.2,
                  'campaign-performance': 85,
                  'conversion-funnel': 2.8
                },
                chartData: {
                  'conversion-funnel': {
                    labels: ['Visitors', 'Leads', 'Opportunities', 'Customers'],
                    datasets: [{
                      label: 'Conversion Funnel',
                      data: [10000, 3000, 800, 240],
                      backgroundColor: '#3B82F6',
                      borderColor: '#1D4ED8'
                    }]
                  }
                },
                tableData: {
                  'campaign-performance': {
                    headers: ['Campaign', 'Spend', 'Clicks', 'ROAS'],
                    rows: [
                      ['Search Campaign', '$5,420', '3,200', '5.8x'],
                      ['Display Campaign', '$3,200', '2,150', '3.9x'],
                      ['Video Campaign', '$4,800', '2,585', '4.1x']
                    ]
                  }
                },
                gaugeData: {
                  'roas-tracker': {
                    value: 4.2,
                    min: 0,
                    max: 10
                  }
                }
              }}
            />
          </div>
        )}

        {/* Weekly Expert Webinars Tab */}
        {activeTab === 'webinars' && (
          <div className="space-y-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Play className="w-6 h-6 text-purple-400 mr-2" />
                Weekly Expert Webinars
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Upcoming Webinars */}
                <div>
                  <h3 className="font-semibold text-white mb-3">Upcoming This Week</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-400">AI in Customer Service</h4>
                      <p className="text-gray-300 text-sm mt-1">
                        Learn how to implement AI chatbots and automation
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-gray-400 text-xs">Tomorrow 2:00 PM EST</span>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">
                          Register
                        </button>
                      </div>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-green-400">ROI Measurement Strategies</h4>
                      <p className="text-gray-300 text-sm mt-1">
                        Track and measure your AI implementation success
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-gray-400 text-xs">Friday 3:00 PM EST</span>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-xs">
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Past Recordings */}
                <div>
                  <h3 className="font-semibold text-white mb-3">Past Recordings</h3>
                  <div className="space-y-4">
                    {[
                      'AI Tool Selection Framework',
                      'Content Generation Best Practices',
                      'Data Analysis with AI',
                      'Marketing Automation Setup'
                    ].map((title, idx) => (
                      <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 hover:border-gray-600 transition-colors">
                        <h4 className="text-white font-medium text-sm">{title}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-gray-400 text-xs">45 mins</span>
                          <button className="text-purple-400 hover:text-purple-300 text-xs flex items-center">
                            <Play className="w-3 h-3 mr-1" />
                            Watch
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Priority Email Support */}
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Mail className="w-6 h-6 text-green-400 mr-2" />
            Priority Email Support
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                24-hour response time guarantee
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Direct access to AI experts
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Implementation guidance
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Contact Support
              </button>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-2">Want Phone Support?</h4>
              <p className="text-sm text-purple-300 mb-4">
                Get priority phone support, dedicated support line, and faster escalations with Pro plan.
              </p>
              <UpgradePrompt
                currentPlan="starter"
                requiredPlan="pro"
                feature="priority phone support"
                variant="inline"
              />
            </div>
          </div>
        </div>

        {/* Upgrade Prompts */}
        <div className="grid md:grid-cols-2 gap-6">
          <UpgradePrompt
            currentPlan="starter"
            requiredPlan="pro"
            feature="1-on-1 expert consultations and custom implementation plans"
          />
          <UpgradePrompt
            currentPlan="starter"
            requiredPlan="enterprise"
            feature="unlimited consultations, dedicated success manager, and on-site workshops"
          />
        </div>
      </main>
    </div>
  );
}

// Use the plan protection HOF
import { withPlanProtection } from '../../utils/planAccessControl';

export const getServerSideProps: GetServerSideProps = withPlanProtection('starter');