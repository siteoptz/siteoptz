import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
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
  userPlan?: any;
}

export default function ProDashboard({ session, userPlan }: ProDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Please log in to access the dashboard</div>
      </div>
    );
  }

  // Default user plan if not provided
  const plan = userPlan || {
    plan: 'pro',
    userName: session.user?.name || 'User',
    features: ['All Pro features', 'Unlimited comparisons', 'Priority support'],
    limits: { dailyComparisons: -1, monthlyConsultations: 4, maxTeamMembers: 10 }
  };

  const handleGoogleAdsConnect = () => {
    window.location.href = '/api/marketing-platforms/google-ads/auth';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'platforms', label: 'Platforms', icon: Globe },
    { id: 'roi-dashboard', label: 'ROI Dashboard', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-black border border-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Pro Dashboard</h1>
              <p className="text-gray-300">Welcome back, {plan.userName}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              <span className="text-white font-semibold capitalize">{plan.plan} Plan</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-black border border-gray-800 rounded-lg mb-6">
          <div className="flex space-x-1 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Quick Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Comparisons Today</span>
                    <span className="text-white">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Comparisons</span>
                    <span className="text-white">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROI Tracked</span>
                    <span className="text-green-400">+23.4%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Recent Activity</h3>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-400">Connected Google Ads account</div>
                  <div className="text-gray-400">Compared ChatGPT vs Claude</div>
                  <div className="text-gray-400">Generated ROI report</div>
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Plan Features</h3>
                <div className="space-y-2 text-sm">
                  {plan.features.slice(0, 3).map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'platforms' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">G</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Google Ads</h3>
                    <p className="text-gray-400 text-sm">Track your advertising ROI</p>
                  </div>
                </div>
                <button
                  onClick={handleGoogleAdsConnect}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Connect Google Ads
                </button>
              </div>
              
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">F</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Facebook Ads</h3>
                    <p className="text-gray-400 text-sm">Coming soon</p>
                  </div>
                </div>
                <button
                  disabled
                  className="w-full bg-gray-600 text-gray-400 px-4 py-2 rounded cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          )}

          {activeTab === 'roi-dashboard' && (
            <div className="bg-black border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">ROI Dashboard</h3>
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Connect your Google Ads account to start tracking ROI</p>
                <button
                  onClick={handleGoogleAdsConnect}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Connect Google Ads
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-black border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Email Notifications</label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-gray-400 text-sm">Receive ROI alerts and updates</span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Dashboard Theme</label>
                  <select className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-2">
                    <option>Dark (Current)</option>
                    <option>Light</option>
                    <option>Auto</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  // Get user plan server-side to avoid client-side API calls
  let userPlan = null;
  try {
    // Simple server-side plan logic without external API calls
    userPlan = {
      id: session.user?.email || 'user',
      plan: 'pro',
      status: 'active',
      billingCycle: 'monthly',
      userName: session.user?.name || 'User',
      features: [
        'All Starter features',
        'Unlimited comparisons',
        'Priority support',
        'Custom implementation guides',
        'Access to all AI tools',
        'Team collaboration features'
      ],
      limitations: [
        'Limited to 10 team members',
        'No white-label options'
      ],
      usage: {
        comparisons: Math.floor(Math.random() * 20),
        consultations: 0,
        teamMembers: 1
      },
      limits: {
        dailyComparisons: -1,
        monthlyConsultations: 4,
        maxTeamMembers: 10
      }
    };
  } catch (error) {
    console.error('Error fetching user plan:', error);
  }

  return {
    props: {
      session,
      userPlan,
    },
  };
};