// pages/dashboard/white-label.tsx
// White Label Marketing ROI Dashboard using Cyfe widgets

import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getCleanDashboardProps, CleanDashboardProps } from '@/lib/server-side-auth';
import { useState, useEffect } from 'react';
import { CyfeIntegration, getDefaultCyfeConfig, MARKETING_WIDGETS } from '@/lib/cyfe-integration';

interface DashboardData {
  totalSpend: number;
  roas: number;
  clicks: number;
  conversions: number;
  costPerClick: number;
  conversionRate: number;
  campaigns: Array<{
    name: string;
    spent: number;
    clicks: number;
    roas: number;
    status: string;
  }>;
}

interface WhiteLabelDashboardProps extends CleanDashboardProps {
  dashboardData: DashboardData;
  cyfeConfig: {
    apiKey: string;
    baseUrl: string;
  };
}

export default function WhiteLabelDashboard({ 
  session, 
  userPlan, 
  dashboardData,
  cyfeConfig 
}: WhiteLabelDashboardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  const syncDataToCyfe = async () => {
    setIsLoading(true);
    setSyncStatus('syncing');
    
    try {
      const response = await fetch('/api/cyfe/sync-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dashboardData,
          userEmail: session.user?.email,
        }),
      });

      if (response.ok) {
        setSyncStatus('success');
        setLastSyncTime(new Date().toLocaleString());
      } else {
        setSyncStatus('error');
      }
    } catch (error) {
      console.error('Error syncing to Cyfe:', error);
      setSyncStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* White Label Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-white">
                Marketing ROI Tracker
              </div>
              <div className="ml-4 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-full">
                {userPlan.plan.charAt(0).toUpperCase() + userPlan.plan.slice(1)}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-gray-300">
                Welcome, {userPlan.userName}
              </div>
              <button
                onClick={syncDataToCyfe}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isLoading
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                }`}
              >
                {isLoading ? 'Syncing...' : 'Sync to Dashboard'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sync Status */}
        {syncStatus !== 'idle' && (
          <div className="mb-6">
            <div className={`p-4 rounded-lg border ${
              syncStatus === 'success' 
                ? 'bg-green-900/50 border-green-600 text-green-200'
                : syncStatus === 'error'
                ? 'bg-red-900/50 border-red-600 text-red-200'
                : 'bg-blue-900/50 border-blue-600 text-blue-200'
            }`}>
              {syncStatus === 'syncing' && 'Syncing data to Cyfe dashboard...'}
              {syncStatus === 'success' && `Successfully synced to Cyfe dashboard at ${lastSyncTime}`}
              {syncStatus === 'error' && 'Failed to sync data to Cyfe dashboard. Please try again.'}
            </div>
          </div>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Spend */}
          <div className="bg-black border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Total Ad Spend</h3>
                <div className="text-3xl font-bold text-white mt-2">
                  ${dashboardData.totalSpend.toLocaleString()}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-400 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          {/* ROAS */}
          <div className="bg-black border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Return on Ad Spend</h3>
                <div className="text-3xl font-bold text-white mt-2">
                  {dashboardData.roas.toFixed(2)}x
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Clicks */}
          <div className="bg-black border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Total Clicks</h3>
                <div className="text-3xl font-bold text-white mt-2">
                  {dashboardData.clicks.toLocaleString()}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
            </div>
          </div>

          {/* Conversions */}
          <div className="bg-black border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Conversions</h3>
                <div className="text-3xl font-bold text-white mt-2">
                  {dashboardData.conversions.toLocaleString()}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Cost Per Click */}
          <div className="bg-black border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Cost Per Click</h3>
                <div className="text-3xl font-bold text-white mt-2">
                  ${dashboardData.costPerClick.toFixed(2)}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-400 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-black border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Conversion Rate</h3>
                <div className="text-3xl font-bold text-white mt-2">
                  {dashboardData.conversionRate.toFixed(2)}%
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-pink-400 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Performance Table */}
        <div className="bg-black border border-gray-800 rounded-lg">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-lg font-medium text-white">Campaign Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Spend
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    ROAS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {dashboardData.campaigns.map((campaign, index) => (
                  <tr key={index} className="hover:bg-gray-900/50">
                    <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      ${campaign.spent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {campaign.clicks.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {campaign.roas.toFixed(2)}x
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.status === 'active' 
                          ? 'bg-green-900 text-green-200'
                          : campaign.status === 'paused'
                          ? 'bg-yellow-900 text-yellow-200'
                          : 'bg-red-900 text-red-200'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cyfe Integration Info */}
        <div className="mt-8 bg-black border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Dashboard Integration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Available Widgets</h4>
              <ul className="space-y-2">
                {Object.entries(MARKETING_WIDGETS).map(([key, widget]) => (
                  <li key={key} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                    {widget.title} ({widget.type})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Sync Information</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <div>API Endpoint: {cyfeConfig.baseUrl}</div>
                <div>Last Sync: {lastSyncTime || 'Never'}</div>
                <div>Status: {syncStatus === 'idle' ? 'Ready' : syncStatus}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const dashboardProps = await getCleanDashboardProps(context, 'pro');
  
  if ('redirect' in dashboardProps) {
    return dashboardProps;
  }

  // Mock dashboard data - in production, this would come from Google Ads API
  const dashboardData: DashboardData = {
    totalSpend: 15420,
    roas: 4.2,
    clicks: 8935,
    conversions: 234,
    costPerClick: 1.73,
    conversionRate: 2.62,
    campaigns: [
      {
        name: 'Search Campaign - Brand Terms',
        spent: 5420,
        clicks: 3200,
        roas: 5.8,
        status: 'active'
      },
      {
        name: 'Display Campaign - Remarketing',
        spent: 3200,
        clicks: 2150,
        roas: 3.9,
        status: 'active'
      },
      {
        name: 'Video Campaign - Product Demo',
        spent: 4800,
        clicks: 2585,
        roas: 4.1,
        status: 'paused'
      },
      {
        name: 'Shopping Campaign - Product Catalog',
        spent: 2000,
        clicks: 1000,
        roas: 2.8,
        status: 'active'
      }
    ]
  };

  const cyfeConfig = getDefaultCyfeConfig();

  return {
    props: {
      ...dashboardProps.props,
      dashboardData,
      cyfeConfig
    }
  };
};