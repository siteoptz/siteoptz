// components/dashboard/EnhancedGoogleServicesDashboard.tsx
// Enhanced dashboard with account selection, timeframes, and charts for Google services

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
  Activity,
  Calendar,
  Building,
  ChevronDown,
  LineChart
} from 'lucide-react';

// Enhanced interface definitions with account selection and charts
interface MCCAccount {
  customerId: string;
  name: string;
  descriptiveName: string;
  currencyCode: string;
  timeZone: string;
  accountType: string;
  testAccount: boolean;
}

interface AnalyticsProperty {
  propertyId: string;
  displayName: string;
  websiteUrl: string;
  industryCategory: string;
  timeZone: string;
  currencyCode: string;
}

interface ChartDataPoint {
  date: string;
  impressions?: number;
  clicks?: number;
  cost?: number;
  conversions?: number;
  ctr?: number;
  cpc?: number;
  users?: number;
  sessions?: number;
  pageViews?: number;
  bounceRate?: number;
  avgSessionDuration?: number;
}

interface ComparisonData {
  current: Record<string, any>;
  previous: Record<string, any>;
  change: Record<string, number>;
}

interface EnhancedAdsData {
  accounts: MCCAccount[];
  selectedAccount?: MCCAccount;
  campaigns: any[];
  summary: Record<string, any>;
  chartData: ChartDataPoint[];
  comparison?: ComparisonData;
  timeframe: string;
}

interface EnhancedAnalyticsData {
  properties: AnalyticsProperty[];
  selectedProperty?: AnalyticsProperty;
  overview: Record<string, any>;
  topPages: any[];
  trafficSources: any[];
  realTimeUsers: any;
  conversionGoals: any[];
  chartData: ChartDataPoint[];
  comparison?: ComparisonData;
  timeframe: string;
}

interface ServiceData {
  ads?: EnhancedAdsData;
  searchConsole?: any;
  tagManager?: any;
  analytics?: EnhancedAnalyticsData;
}

interface DashboardProps {
  className?: string;
}

export const EnhancedGoogleServicesDashboard: React.FC<DashboardProps> = ({ className = '' }) => {
  const { data: session } = useSession();
  const [data, setData] = useState<ServiceData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  
  // UI State
  const [selectedAdsAccount, setSelectedAdsAccount] = useState<string>('');
  const [selectedAnalyticsProperty, setSelectedAnalyticsProperty] = useState<string>('');
  const [timeframe, setTimeframe] = useState<string>('last_30_days');
  const [comparison, setComparison] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'ads' | 'analytics' | 'search' | 'tagmanager'>('overview');

  const fetchServiceData = async () => {
    if (!session?.user?.email) return;
    
    setLoading(true);
    setError(null);

    try {
      console.log('📊 Fetching enhanced data from all Google services...');
      
      const params = new URLSearchParams({
        timeframe,
        comparison: comparison.toString()
      });

      if (selectedAdsAccount) {
        params.append('accountId', selectedAdsAccount);
      }
      
      if (selectedAnalyticsProperty) {
        params.append('propertyId', selectedAnalyticsProperty);
      }

      const endpoints = [
        `/api/google-services/ads/data?${params.toString()}`,
        '/api/google-services/search-console/data',
        '/api/google-services/tag-manager/data',
        `/api/google-services/analytics/data?${params.toString()}`
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
  }, [session?.user?.email, selectedAdsAccount, selectedAnalyticsProperty, timeframe, comparison]);

  const TimeframeSelector = () => (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-gray-400" />
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white px-3 py-1 rounded-lg text-sm"
        >
          <option value="last_7_days">Last 7 days</option>
          <option value="last_30_days">Last 30 days</option>
          <option value="last_90_days">Last 90 days</option>
        </select>
      </div>
      
      <label className="flex items-center space-x-2 text-sm text-gray-400">
        <input
          type="checkbox"
          checked={comparison}
          onChange={(e) => setComparison(e.target.checked)}
          className="rounded"
        />
        <span>Compare periods</span>
      </label>
    </div>
  );

  const AccountSelector = ({ 
    accounts, 
    selectedAccount, 
    onAccountChange, 
    label 
  }: {
    accounts: MCCAccount[] | AnalyticsProperty[];
    selectedAccount: string;
    onAccountChange: (accountId: string) => void;
    label: string;
  }) => (
    <div className="flex items-center space-x-2">
      <Building className="w-4 h-4 text-gray-400" />
      <select
        value={selectedAccount}
        onChange={(e) => onAccountChange(e.target.value)}
        className="bg-gray-800 border border-gray-700 text-white px-3 py-1 rounded-lg text-sm"
      >
        <option value="">{label}</option>
        {accounts.map((account: any) => (
          <option key={account.customerId || account.propertyId} value={account.customerId || account.propertyId}>
            {account.name || account.displayName}
          </option>
        ))}
      </select>
    </div>
  );

  const SimpleLineChart = ({ data, dataKey, color = '#3B82F6' }: {
    data: ChartDataPoint[];
    dataKey: string;
    color?: string;
  }) => {
    if (!data || data.length === 0) return <div className="text-gray-500 text-sm">No chart data available</div>;

    const maxValue = Math.max(...data.map(d => (d as any)[dataKey] || 0));
    const minValue = Math.min(...data.map(d => (d as any)[dataKey] || 0));
    const range = maxValue - minValue || 1;

    return (
      <div className="h-32 flex items-end space-x-1">
        {data.map((point, index) => {
          const value = (point as any)[dataKey] || 0;
          const height = Math.max(((value - minValue) / range) * 100, 2);
          
          return (
            <div
              key={index}
              className="flex-1 bg-blue-500 rounded-t opacity-80 hover:opacity-100 transition-opacity"
              style={{ 
                height: `${height}%`,
                backgroundColor: color
              }}
              title={`${point.date}: ${value.toLocaleString()}`}
            />
          );
        })}
      </div>
    );
  };

  const ComparisonCard = ({ current, previous, change, metric, icon: Icon }: {
    current: any;
    previous: any;
    change: any;
    metric: string;
    icon: any;
  }) => (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400 capitalize">{metric.replace(/([A-Z])/g, ' $1')}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${change >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>
      <div className="text-lg font-semibold text-white">{current?.toLocaleString()}</div>
      <div className="text-xs text-gray-500">vs {previous?.toLocaleString()}</div>
    </div>
  );

  if (!session?.user?.email) {
    return (
      <div className="bg-black border border-gray-800 rounded-xl p-6">
        <p className="text-gray-400 text-center">Please sign in to view your Google Services dashboard</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Dashboard Header with Controls */}
      <div className="bg-black border border-gray-800 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Enhanced Google Services Dashboard</h2>
            <p className="text-gray-400">
              Advanced analytics with account selection, timeframes, and visual comparisons
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <TimeframeSelector />
            <button
              onClick={fetchServiceData}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Account Selectors */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {data.ads?.accounts && data.ads.accounts.length > 0 && (
            <AccountSelector
              accounts={data.ads.accounts}
              selectedAccount={selectedAdsAccount}
              onAccountChange={setSelectedAdsAccount}
              label="Select Google Ads Account"
            />
          )}
          
          {data.analytics?.properties && data.analytics.properties.length > 0 && (
            <AccountSelector
              accounts={data.analytics.properties}
              selectedAccount={selectedAnalyticsProperty}
              onAccountChange={setSelectedAnalyticsProperty}
              label="Select Analytics Property"
            />
          )}
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

      {/* Tab Navigation */}
      <div className="bg-black border border-gray-800 rounded-xl p-6">
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'ads', label: 'Google Ads', icon: Megaphone },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'search', label: 'Search Console', icon: Search },
            { id: 'tagmanager', label: 'Tag Manager', icon: Tag }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.ads && (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Megaphone className="w-5 h-5 text-blue-400" />
                    <span className="text-xs text-gray-500">Google Ads</span>
                  </div>
                  <div className="text-2xl font-bold text-white">${data.ads.summary?.totalCost?.toFixed(2)}</div>
                  <div className="text-sm text-gray-400">Total Spend</div>
                </div>
              )}

              {data.analytics && (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-green-400" />
                    <span className="text-xs text-gray-500">Analytics</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{data.analytics.overview?.totalUsers?.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Users</div>
                </div>
              )}

              {data.analytics && (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-5 h-5 text-purple-400" />
                    <span className="text-xs text-gray-500">Page Views</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{data.analytics.overview?.pageViews?.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Views</div>
                </div>
              )}

              {data.analytics && (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Activity className="w-5 h-5 text-red-400" />
                    <span className="text-xs text-gray-500">Real-time</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{data.analytics.realTimeUsers?.activeUsers}</div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
              )}
            </div>

            {/* Comparison Section */}
            {comparison && (data.ads?.comparison || data.analytics?.comparison) && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Period Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.ads?.comparison && (
                    <>
                      <ComparisonCard
                        current={data.ads.comparison.current.impressions}
                        previous={data.ads.comparison.previous.impressions}
                        change={data.ads.comparison.change.impressions}
                        metric="Impressions"
                        icon={Eye}
                      />
                      <ComparisonCard
                        current={data.ads.comparison.current.clicks}
                        previous={data.ads.comparison.previous.clicks}
                        change={data.ads.comparison.change.clicks}
                        metric="Clicks"
                        icon={MousePointer}
                      />
                    </>
                  )}
                  
                  {data.analytics?.comparison && (
                    <>
                      <ComparisonCard
                        current={data.analytics.comparison.current.users}
                        previous={data.analytics.comparison.previous.users}
                        change={data.analytics.comparison.change.users}
                        metric="Users"
                        icon={Users}
                      />
                      <ComparisonCard
                        current={data.analytics.comparison.current.sessions}
                        previous={data.analytics.comparison.previous.sessions}
                        change={data.analytics.comparison.change.sessions}
                        metric="Sessions"
                        icon={Activity}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ads' && data.ads && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ads Performance Chart */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <LineChart className="w-5 h-5 mr-2" />
                  Impressions Trend
                </h3>
                <SimpleLineChart data={data.ads.chartData} dataKey="impressions" color="#3B82F6" />
              </div>

              {/* Clicks Chart */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <LineChart className="w-5 h-5 mr-2" />
                  Clicks Trend
                </h3>
                <SimpleLineChart data={data.ads.chartData} dataKey="clicks" color="#10B981" />
              </div>
            </div>

            {/* Campaigns List */}
            {data.ads.campaigns && data.ads.campaigns.length > 0 && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Campaign Performance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-400 border-b border-gray-700">
                        <th className="text-left py-2">Campaign</th>
                        <th className="text-right py-2">Impressions</th>
                        <th className="text-right py-2">Clicks</th>
                        <th className="text-right py-2">Cost</th>
                        <th className="text-right py-2">Conversions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.ads.campaigns.map((campaign: any) => (
                        <tr key={campaign.id} className="border-b border-gray-800">
                          <td className="py-3 text-white">{campaign.name}</td>
                          <td className="py-3 text-right text-gray-300">{campaign.impressions?.toLocaleString()}</td>
                          <td className="py-3 text-right text-gray-300">{campaign.clicks?.toLocaleString()}</td>
                          <td className="py-3 text-right text-gray-300">${campaign.cost?.toFixed(2)}</td>
                          <td className="py-3 text-right text-gray-300">{campaign.conversions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && data.analytics && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Users Chart */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <LineChart className="w-5 h-5 mr-2" />
                  Users Trend
                </h3>
                <SimpleLineChart data={data.analytics.chartData} dataKey="users" color="#8B5CF6" />
              </div>

              {/* Page Views Chart */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <LineChart className="w-5 h-5 mr-2" />
                  Page Views Trend
                </h3>
                <SimpleLineChart data={data.analytics.chartData} dataKey="pageViews" color="#F59E0B" />
              </div>
            </div>

            {/* Top Pages */}
            {data.analytics.topPages && data.analytics.topPages.length > 0 && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Top Pages</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-400 border-b border-gray-700">
                        <th className="text-left py-2">Page</th>
                        <th className="text-right py-2">Views</th>
                        <th className="text-right py-2">Unique Views</th>
                        <th className="text-right py-2">Avg. Time</th>
                        <th className="text-right py-2">Bounce Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.analytics.topPages.slice(0, 5).map((page: any, index: number) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="py-3 text-white max-w-xs truncate">{page.pageTitle}</td>
                          <td className="py-3 text-right text-gray-300">{page.views?.toLocaleString()}</td>
                          <td className="py-3 text-right text-gray-300">{page.uniquePageviews?.toLocaleString()}</td>
                          <td className="py-3 text-right text-gray-300">{page.avgTimeOnPage?.toFixed(1)}s</td>
                          <td className="py-3 text-right text-gray-300">{page.bounceRate?.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Placeholder content for other tabs */}
        {(activeTab === 'search' || activeTab === 'tagmanager') && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              {activeTab === 'search' ? 'Search Console' : 'Tag Manager'} detailed view coming soon
            </div>
            <p className="text-gray-500 text-sm">Enhanced charts and analytics for this service will be available in the next update</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedGoogleServicesDashboard;