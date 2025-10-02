import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getCleanDashboardProps, UserPlan, CleanDashboardProps } from '@/lib/server-side-auth';
import { getGoogleAdsDataServerSide, CleanGoogleAdsData } from '@/lib/clean-google-ads';
import { CleanDashboardHeader } from '@/components/dashboard/CleanDashboardHeader';
import { 
  BarChart3, 
  Globe, 
  TrendingUp, 
  Settings,
  CheckCircle,
  Play,
  Crown,
  Users,
  Calendar,
  Star,
  ArrowRight
} from 'lucide-react';

interface CleanProDashboardProps extends CleanDashboardProps {
  googleAdsData: CleanGoogleAdsData | null;
  activeTab: string;
}

export default function CleanProDashboard({ 
  session, 
  userPlan, 
  googleAdsData,
  activeTab: initialActiveTab 
}: CleanProDashboardProps) {
  const [activeTab, setActiveTab] = useState(initialActiveTab || 'overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'platforms', label: 'Platforms', icon: Globe },
    { id: 'roi-dashboard', label: 'ROI Dashboard', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleGoogleAdsConnect = () => {
    window.location.href = '/api/marketing-platforms/google-ads/auth';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <CleanDashboardHeader 
        userPlan={userPlan} 
        currentPage="dashboard"
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="bg-black border border-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Pro Dashboard</h1>
              <p className="text-gray-300">Welcome back, {userPlan.userName}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              <span className="text-purple-400 font-semibold capitalize">Pro Plan</span>
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
            <OverviewTab userPlan={userPlan} googleAdsData={googleAdsData} />
          )}

          {activeTab === 'platforms' && (
            <PlatformsTab onGoogleAdsConnect={handleGoogleAdsConnect} />
          )}

          {activeTab === 'roi-dashboard' && (
            <ROIDashboardTab 
              googleAdsData={googleAdsData} 
              onGoogleAdsConnect={handleGoogleAdsConnect} 
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab userPlan={userPlan} />
          )}
        </div>
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ userPlan, googleAdsData }: { userPlan: UserPlan; googleAdsData: CleanGoogleAdsData | null }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Comparisons Today</span>
            <span className="text-white">{userPlan.usage.comparisons}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Comparisons</span>
            <span className="text-white">247</span>
          </div>
          {googleAdsData && (
            <div className="flex justify-between">
              <span className="text-gray-400">Google Ads ROAS</span>
              <span className="text-green-400">{googleAdsData.metrics.total_roas.toFixed(2)}x</span>
            </div>
          )}
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
          {userPlan.features.slice(0, 3).map((feature: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Platforms Tab Component
function PlatformsTab({ onGoogleAdsConnect }: { onGoogleAdsConnect: () => void }) {
  return (
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
          onClick={onGoogleAdsConnect}
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
  );
}

// ROI Dashboard Tab Component
function ROIDashboardTab({ 
  googleAdsData, 
  onGoogleAdsConnect 
}: { 
  googleAdsData: CleanGoogleAdsData | null; 
  onGoogleAdsConnect: () => void; 
}) {
  if (!googleAdsData) {
    return (
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">ROI Dashboard</h3>
        <div className="text-center py-12">
          <TrendingUp className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">Connect your Google Ads account to start tracking ROI</p>
          <button
            onClick={onGoogleAdsConnect}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded hover:from-blue-700 hover:to-purple-700 transition-colors"
          >
            Connect Google Ads
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">${googleAdsData.metrics.total_spend.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Total Spend</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{googleAdsData.metrics.total_roas.toFixed(2)}x</div>
            <div className="text-gray-400 text-sm">ROAS</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{googleAdsData.metrics.total_clicks.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Total Clicks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{googleAdsData.metrics.total_conversions}</div>
            <div className="text-gray-400 text-sm">Conversions</div>
          </div>
        </div>
      </div>

      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Campaign Performance</h3>
        <div className="space-y-4">
          {googleAdsData.campaigns.map((campaign) => (
            <div key={campaign.id} className="border border-gray-700 rounded p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-white font-medium">{campaign.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    campaign.status === 'ENABLED' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">${campaign.spent.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">of ${campaign.budget.toLocaleString()}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                <div>
                  <div className="text-gray-400">Impressions</div>
                  <div className="text-white">{campaign.impressions.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-400">Clicks</div>
                  <div className="text-white">{campaign.clicks.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-400">CTR</div>
                  <div className="text-white">{campaign.ctr.toFixed(2)}%</div>
                </div>
                <div>
                  <div className="text-gray-400">ROAS</div>
                  <div className="text-green-400">{campaign.roas.toFixed(2)}x</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Settings Tab Component
function SettingsTab({ userPlan }: { userPlan: UserPlan }) {
  return (
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
        <div>
          <label className="block text-gray-300 text-sm mb-2">Plan Information</label>
          <div className="bg-gray-800 border border-gray-700 rounded p-3">
            <div className="text-white font-medium">{userPlan.plan.charAt(0).toUpperCase() + userPlan.plan.slice(1)} Plan</div>
            <div className="text-gray-400 text-sm">Status: {userPlan.status}</div>
            <div className="text-gray-400 text-sm">Billing: {userPlan.billingCycle}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Get clean dashboard props with Pro plan requirement
    const result = await getCleanDashboardProps(context, 'pro');
    
    if ('redirect' in result) {
      return result;
    }

    const { session, userPlan, isAuthenticated } = result.props;

    // Get Google Ads data server-side (no client-side API calls)
    const googleAdsData = await getGoogleAdsDataServerSide(session.user?.email || '');

    // Get active tab from query params
    const activeTab = (context.query.tab as string) || 'overview';

    return {
      props: {
        session,
        userPlan,
        isAuthenticated,
        googleAdsData,
        activeTab,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
};