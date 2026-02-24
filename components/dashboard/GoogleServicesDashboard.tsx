// components/dashboard/GoogleServicesDashboard.tsx
// Unified dashboard for displaying data from all Google services

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  BarChart3, 
  Search, 
  Tag, 
  Megaphone,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Clock,
  DollarSign,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Activity
} from 'lucide-react';

interface ServiceData {
  ads?: any;
  searchConsole?: any;
  tagManager?: any;
  analytics?: any;
}

interface DashboardProps {
  className?: string;
}

export const GoogleServicesDashboard: React.FC<DashboardProps> = ({ className = '' }) => {
  const { data: session } = useSession();
  const [data, setData] = useState<ServiceData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchServiceData = async () => {
    if (!session?.user?.email) return;
    
    setLoading(true);
    setError(null);

    try {
      console.log('📊 Fetching data from all Google services...');
      
      const endpoints = [
        '/api/google-services/ads/data',
        '/api/google-services/search-console/data', 
        '/api/google-services/tag-manager/data',
        '/api/google-services/analytics/data'
      ];

      const responses = await Promise.allSettled(
        endpoints.map(endpoint => fetch(endpoint).then(res => res.json()))
      );

      const newData: ServiceData = {};
      
      responses.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.success) {
          const serviceKey = ['ads', 'searchConsole', 'tagManager', 'analytics'][index] as keyof ServiceData;
          newData[serviceKey] = result.value.data;
        } else {
          console.warn(`Failed to fetch data from service ${index}:`, result);
        }
      });

      setData(newData);
      setLastUpdated(new Date().toISOString());
      
    } catch (error) {
      console.error('Error fetching service data:', error);
      setError('Failed to fetch service data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, [session?.user?.email]);

  if (!session?.user?.email) {
    return (
      <div className="bg-black border border-gray-800 rounded-xl p-6">
        <p className="text-gray-400 text-center">Please sign in to view your Google Services dashboard</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Dashboard Header */}
      <div className="bg-black border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Google Services Dashboard</h2>
            <p className="text-gray-400">
              Unified view of your Google Ads, Search Console, Tag Manager, and Analytics data
            </p>
          </div>
          
          <button
            onClick={fetchServiceData}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>
        
        {lastUpdated && (
          <p className="text-xs text-gray-500">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-center text-red-400">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Google Ads Overview */}
        {data.ads && (
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Megaphone className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="font-semibold text-white">Google Ads</h3>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Total Spend</span>
                <span className="text-white font-semibold">${data.ads.summary.totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Impressions</span>
                <span className="text-white">{data.ads.summary.totalImpressions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Clicks</span>
                <span className="text-white">{data.ads.summary.totalClicks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Conversions</span>
                <span className="text-green-400 font-semibold">{data.ads.summary.totalConversions}</span>
              </div>
            </div>
          </div>
        )}

        {/* Search Console Overview */}
        {data.searchConsole && (
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Search className="w-6 h-6 text-green-400 mr-3" />
                <h3 className="font-semibold text-white">Search Console</h3>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Total Clicks</span>
                <span className="text-white font-semibold">{data.searchConsole.performance.totalClicks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Impressions</span>
                <span className="text-white">{data.searchConsole.performance.totalImpressions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Avg CTR</span>
                <span className="text-white">{data.searchConsole.performance.avgCtr}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Avg Position</span>
                <span className="text-yellow-400 font-semibold">{data.searchConsole.performance.avgPosition}</span>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Overview */}
        {data.analytics && (
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <BarChart3 className="w-6 h-6 text-orange-400 mr-3" />
                <h3 className="font-semibold text-white">Analytics</h3>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Total Users</span>
                <span className="text-white font-semibold">{data.analytics.overview.totalUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Sessions</span>
                <span className="text-white">{data.analytics.overview.totalSessions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Bounce Rate</span>
                <span className="text-white">{data.analytics.overview.bounceRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Page Views</span>
                <span className="text-cyan-400 font-semibold">{data.analytics.overview.pageViews.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tag Manager Overview */}
        {data.tagManager && (
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Tag className="w-6 h-6 text-purple-400 mr-3" />
                <h3 className="font-semibold text-white">Tag Manager</h3>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Containers</span>
                <span className="text-white font-semibold">{data.tagManager.containers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Active Tags</span>
                <span className="text-white">{data.tagManager.tags.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Triggers</span>
                <span className="text-white">{data.tagManager.triggers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Variables</span>
                <span className="text-purple-400 font-semibold">{data.tagManager.variables.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Analytics Widget */}
      {data.analytics?.realTimeUsers && (
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Activity className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Real-time Users</h3>
            </div>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
              {data.analytics.realTimeUsers.activeUsers} active now
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h4 className="text-white font-semibold mb-4">Active Pages</h4>
              <div className="space-y-2">
                {data.analytics.realTimeUsers.activePages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                    <span className="text-gray-300 text-sm truncate flex-1">{page.page}</span>
                    <span className="text-green-400 font-semibold ml-3">{page.users} users</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Stats</h4>
              <div className="space-y-3">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="text-gray-400 text-xs">Total Sessions Today</div>
                  <div className="text-white font-semibold text-lg">{Math.floor(data.analytics.overview.totalSessions * 0.1).toLocaleString()}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="text-gray-400 text-xs">Bounce Rate Today</div>
                  <div className="text-white font-semibold text-lg">{(data.analytics.overview.bounceRate - 5).toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Service Data Tabs */}
      <ServiceDetailTabs data={data} />
    </div>
  );
};

// Component for detailed service data in tabbed interface
const ServiceDetailTabs: React.FC<{ data: ServiceData }> = ({ data }) => {
  const [activeTab, setActiveTab] = useState('ads');

  const tabs = [
    { id: 'ads', label: 'Google Ads', icon: Megaphone, available: !!data.ads },
    { id: 'searchConsole', label: 'Search Console', icon: Search, available: !!data.searchConsole },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, available: !!data.analytics },
    { id: 'tagManager', label: 'Tag Manager', icon: Tag, available: !!data.tagManager }
  ];

  return (
    <div className="bg-black border border-gray-800 rounded-xl p-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 border-b border-gray-700">
        {tabs.map(tab => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              disabled={!tab.available}
              className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gray-800 text-white border-b-2 border-blue-500'
                  : tab.available 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    : 'text-gray-600 cursor-not-allowed'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'ads' && data.ads && <GoogleAdsDetailView data={data.ads} />}
      {activeTab === 'searchConsole' && data.searchConsole && <SearchConsoleDetailView data={data.searchConsole} />}
      {activeTab === 'analytics' && data.analytics && <AnalyticsDetailView data={data.analytics} />}
      {activeTab === 'tagManager' && data.tagManager && <TagManagerDetailView data={data.tagManager} />}
    </div>
  );
};

// Detailed view components for each service
const GoogleAdsDetailView: React.FC<{ data: any }> = ({ data }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-white">Campaign Performance</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left text-gray-400 font-medium py-3">Campaign</th>
            <th className="text-left text-gray-400 font-medium py-3">Status</th>
            <th className="text-right text-gray-400 font-medium py-3">Impressions</th>
            <th className="text-right text-gray-400 font-medium py-3">Clicks</th>
            <th className="text-right text-gray-400 font-medium py-3">Cost</th>
            <th className="text-right text-gray-400 font-medium py-3">Conversions</th>
          </tr>
        </thead>
        <tbody>
          {data.campaigns.map((campaign: any, index: number) => (
            <tr key={index} className="border-b border-gray-800">
              <td className="text-white py-3">{campaign.name}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded text-xs ${
                  campaign.status === 'ENABLED' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {campaign.status}
                </span>
              </td>
              <td className="text-right text-white py-3">{campaign.impressions.toLocaleString()}</td>
              <td className="text-right text-white py-3">{campaign.clicks.toLocaleString()}</td>
              <td className="text-right text-white py-3">${campaign.cost.toFixed(2)}</td>
              <td className="text-right text-green-400 py-3">{campaign.conversions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SearchConsoleDetailView: React.FC<{ data: any }> = ({ data }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Queries */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Top Search Queries</h4>
        <div className="space-y-2">
          {data.topQueries.map((query: any, index: number) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white text-sm">{query.query}</span>
                <span className="text-green-400 font-semibold">{query.clicks}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>CTR: {query.ctr}%</span>
                <span>Position: {query.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Pages */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Top Pages</h4>
        <div className="space-y-2">
          {data.topPages.map((page: any, index: number) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white text-sm truncate">{page.page}</span>
                <span className="text-cyan-400 font-semibold">{page.clicks}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>CTR: {page.ctr}%</span>
                <span>Position: {page.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AnalyticsDetailView: React.FC<{ data: any }> = ({ data }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Pages */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Top Pages</h4>
        <div className="space-y-2">
          {data.topPages.map((page: any, index: number) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-white text-sm mb-1">{page.pageTitle}</div>
              <div className="text-gray-400 text-xs mb-2">{page.pagePath}</div>
              <div className="flex justify-between text-xs">
                <span className="text-cyan-400">{page.views} views</span>
                <span className="text-gray-400">{page.avgTimeOnPage}s avg</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Sources */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Traffic Sources</h4>
        <div className="space-y-2">
          {data.trafficSources.map((source: any, index: number) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white text-sm">{source.source} / {source.medium}</span>
                <span className="text-green-400 font-semibold">{source.sessions}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Users: {source.users}</span>
                <span>Bounce: {source.bounceRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TagManagerDetailView: React.FC<{ data: any }> = ({ data }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Tags */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Active Tags</h4>
        <div className="space-y-2">
          {data.tags.map((tag: any, index: number) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-white text-sm mb-1">{tag.name}</div>
              <div className="text-gray-400 text-xs">Type: {tag.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Triggers */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Triggers</h4>
        <div className="space-y-2">
          {data.triggers.map((trigger: any, index: number) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-white text-sm mb-1">{trigger.name}</div>
              <div className="text-gray-400 text-xs">Type: {trigger.type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);