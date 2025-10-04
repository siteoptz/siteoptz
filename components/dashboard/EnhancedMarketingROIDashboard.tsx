import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Eye,
  MousePointer,
  Target,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Globe,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react';

interface GoogleAdsAccount {
  customer_id: string;
  descriptive_name: string;
  currency_code: string;
  time_zone: string;
  manager: boolean;
  test_account: boolean;
}

interface GoogleAdsCampaign {
  id: string;
  name: string;
  status: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cost_per_conversion: number;
  conversion_rate: number;
  ctr: number;
  cpc: number;
  cpm: number;
  roas: number;
}

interface GoogleAdsMetrics {
  total_spend: number;
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  average_cpc: number;
  average_cpm: number;
  average_ctr: number;
  average_conversion_rate: number;
  total_roas: number;
  cost_per_conversion: number;
}

interface DashboardView {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

export default function EnhancedMarketingROIDashboard() {
  const { data: session } = useSession();
  const [selectedAccount, setSelectedAccount] = useState<GoogleAdsAccount | null>(null);
  const [availableAccounts, setAvailableAccounts] = useState<GoogleAdsAccount[]>([]);
  const [campaigns, setCampaigns] = useState<GoogleAdsCampaign[]>([]);
  const [metrics, setMetrics] = useState<GoogleAdsMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('LAST_30_DAYS');
  const [activeView, setActiveView] = useState('overview');

  const dashboardViews: DashboardView[] = [
    {
      id: 'overview',
      name: 'Overview',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'High-level performance metrics and trends'
    },
    {
      id: 'campaigns',
      name: 'Campaigns',
      icon: <Target className="w-5 h-5" />,
      description: 'Detailed campaign performance analysis'
    },
    {
      id: 'keywords',
      name: 'Keywords',
      icon: <Zap className="w-5 h-5" />,
      description: 'Keyword performance and optimization opportunities'
    },
    {
      id: 'adgroups',
      name: 'Ad Groups',
      icon: <Building2 className="w-5 h-5" />,
      description: 'Ad group performance and structure analysis'
    },
    {
      id: 'recommendations',
      name: 'AI Insights',
      icon: <Activity className="w-5 h-5" />,
      description: 'AI-powered recommendations and optimizations'
    }
  ];

  const dateRangeOptions = [
    { value: 'TODAY', label: 'Today' },
    { value: 'YESTERDAY', label: 'Yesterday' },
    { value: 'LAST_7_DAYS', label: 'Last 7 days' },
    { value: 'LAST_30_DAYS', label: 'Last 30 days' },
    { value: 'LAST_90_DAYS', label: 'Last 90 days' }
  ];

  useEffect(() => {
    if (session?.user?.email) {
      loadGoogleAdsData();
    }
  }, [session, dateRange, selectedAccount, loadGoogleAdsData]);

  const loadGoogleAdsData = useCallback(async () => {
    if (!session?.user?.email) return;

    setLoading(true);
    setError(null);

    try {
      // Load available accounts
      const accountsResponse = await fetch('/api/marketing-platforms/google-ads/accounts');
      if (accountsResponse.ok) {
        const accounts = await accountsResponse.json();
        setAvailableAccounts(accounts);
        
        // Auto-select first account if none selected
        if (!selectedAccount && accounts.length > 0) {
          setSelectedAccount(accounts[0]);
        }
      }

      // Load campaign data
      if (selectedAccount) {
        const campaignsResponse = await fetch(`/api/marketing-platforms/google-ads/campaigns?dateRange=${dateRange}`);
        if (campaignsResponse.ok) {
          const campaignsData = await campaignsResponse.json();
          setCampaigns(campaignsData);
        }

        // Load metrics
        const metricsResponse = await fetch(`/api/marketing-platforms/google-ads/metrics?dateRange=${dateRange}`);
        if (metricsResponse.ok) {
          const metricsData = await metricsResponse.json();
          setMetrics(metricsData);
        }
      }
    } catch (error) {
      console.error('Error loading Google Ads data:', error);
      setError('Failed to load Google Ads data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [dateRange, selectedAccount, session?.user?.email]);

  const handleAccountChange = async (account: GoogleAdsAccount) => {
    setSelectedAccount(account);
    
    try {
      const response = await fetch('/api/marketing-platforms/google-ads/select-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: account.customer_id,
          accountName: account.descriptive_name,
          isMcc: account.manager
        }),
      });

      if (response.ok) {
        console.log('Account switched successfully');
        // Reload data for the new account
        await loadGoogleAdsData();
      } else {
        throw new Error('Failed to switch account');
      }
    } catch (error) {
      console.error('Error switching account:', error);
      setError('Failed to switch account. Please try again.');
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(2)}%`;
  };

  const getPerformanceColor = (value: number, threshold: number, reverse: boolean = false) => {
    const isGood = reverse ? value < threshold : value > threshold;
    return isGood ? 'text-green-400' : 'text-red-400';
  };

  const getPerformanceIcon = (value: number, threshold: number, reverse: boolean = false) => {
    const isGood = reverse ? value < threshold : value > threshold;
    return isGood ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        <span className="ml-3 text-white">Loading Google Ads data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-6 h-6 text-red-400" />
          <div>
            <h3 className="text-lg font-semibold text-red-400">Connection Error</h3>
            <p className="text-red-300">{error}</p>
            <button
              onClick={loadGoogleAdsData}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Marketing ROI Dashboard</h2>
          <p className="text-gray-400">Real-time Google Ads performance and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white"
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <button
            onClick={loadGoogleAdsData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Account Selection */}
      {availableAccounts.length > 1 && (
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Select Google Ads Account</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableAccounts.map((account) => (
              <div
                key={account.customer_id}
                onClick={() => handleAccountChange(account)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAccountChange(account);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select Google Ads account: ${account.descriptive_name}`}
                className={`p-4 rounded-lg border cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  selectedAccount?.customer_id === account.customer_id
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{account.descriptive_name}</h4>
                    <p className="text-gray-400 text-sm">ID: {account.customer_id}</p>
                    {account.manager && (
                      <span className="inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded mt-1">
                        MCC Account
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dashboard Views */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
        {dashboardViews.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeView === view.id
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {view.icon}
            <span className="font-medium">{view.name}</span>
          </button>
        ))}
      </div>

      {/* Overview View */}
      {activeView === 'overview' && metrics && (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 ${getPerformanceColor(metrics.total_roas, 2)}`}>
                  {getPerformanceIcon(metrics.total_roas, 2)}
                  <span className="text-sm font-medium">{formatNumber(metrics.total_roas)}x</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {formatCurrency(metrics.total_spend, selectedAccount?.currency_code)}
              </h3>
              <p className="text-gray-400 text-sm">Total Spend</p>
              <p className="text-green-400 text-xs mt-2">ROAS: {formatNumber(metrics.total_roas)}x</p>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MousePointer className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 ${getPerformanceColor(metrics.average_ctr, 2)}`}>
                  {getPerformanceIcon(metrics.average_ctr, 2)}
                  <span className="text-sm font-medium">{formatPercentage(metrics.average_ctr)}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {formatNumber(metrics.total_clicks)}
              </h3>
              <p className="text-gray-400 text-sm">Total Clicks</p>
              <p className="text-blue-400 text-xs mt-2">CTR: {formatPercentage(metrics.average_ctr)}</p>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 ${getPerformanceColor(metrics.average_conversion_rate, 3)}`}>
                  {getPerformanceIcon(metrics.average_conversion_rate, 3)}
                  <span className="text-sm font-medium">{formatPercentage(metrics.average_conversion_rate)}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {formatNumber(metrics.total_conversions)}
              </h3>
              <p className="text-gray-400 text-sm">Total Conversions</p>
              <p className="text-purple-400 text-xs mt-2">Conv. Rate: {formatPercentage(metrics.average_conversion_rate)}</p>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 ${getPerformanceColor(metrics.average_cpc, 2, true)}`}>
                  {getPerformanceIcon(metrics.average_cpc, 2, true)}
                  <span className="text-sm font-medium">{formatCurrency(metrics.average_cpc, selectedAccount?.currency_code)}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {formatNumber(metrics.total_impressions)}
              </h3>
              <p className="text-gray-400 text-sm">Total Impressions</p>
              <p className="text-orange-400 text-xs mt-2">Avg. CPC: {formatCurrency(metrics.average_cpc, selectedAccount?.currency_code)}</p>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Performance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {formatCurrency(metrics.cost_per_conversion, selectedAccount?.currency_code)}
                </div>
                <p className="text-gray-400">Cost per Conversion</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {formatCurrency(metrics.average_cpm, selectedAccount?.currency_code)}
                </div>
                <p className="text-gray-400">Average CPM</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {formatPercentage(metrics.average_conversion_rate)}
                </div>
                <p className="text-gray-400">Conversion Rate</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns View */}
      {activeView === 'campaigns' && (
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Campaign Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 py-3">Campaign</th>
                  <th className="text-right text-gray-400 py-3">Spend</th>
                  <th className="text-right text-gray-400 py-3">Impressions</th>
                  <th className="text-right text-gray-400 py-3">Clicks</th>
                  <th className="text-right text-gray-400 py-3">Conversions</th>
                  <th className="text-right text-gray-400 py-3">CTR</th>
                  <th className="text-right text-gray-400 py-3">CPC</th>
                  <th className="text-right text-gray-400 py-3">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-800">
                    <td className="py-3">
                      <div>
                        <div className="text-white font-medium">{campaign.name}</div>
                        <div className="text-gray-400 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            campaign.status === 'ENABLED' 
                              ? 'bg-green-900/20 text-green-400' 
                              : 'bg-yellow-900/20 text-yellow-400'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-right text-white py-3">
                      {formatCurrency(campaign.spent, selectedAccount?.currency_code)}
                    </td>
                    <td className="text-right text-white py-3">
                      {formatNumber(campaign.impressions)}
                    </td>
                    <td className="text-right text-white py-3">
                      {formatNumber(campaign.clicks)}
                    </td>
                    <td className="text-right text-white py-3">
                      {formatNumber(campaign.conversions)}
                    </td>
                    <td className="text-right text-white py-3">
                      {formatPercentage(campaign.ctr)}
                    </td>
                    <td className="text-right text-white py-3">
                      {formatCurrency(campaign.cpc, selectedAccount?.currency_code)}
                    </td>
                    <td className="text-right text-white py-3">
                      <span className={getPerformanceColor(campaign.roas, 2)}>
                        {formatNumber(campaign.roas)}x
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Other views would be implemented similarly */}
      {activeView === 'keywords' && (
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Keyword Performance</h3>
          <p className="text-gray-400">Keyword performance data will be loaded here...</p>
        </div>
      )}

      {activeView === 'adgroups' && (
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Ad Group Performance</h3>
          <p className="text-gray-400">Ad group performance data will be loaded here...</p>
        </div>
      )}

      {activeView === 'recommendations' && (
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">AI-Powered Recommendations</h3>
          <p className="text-gray-400">AI insights and recommendations will be generated here...</p>
        </div>
      )}
    </div>
  );
}
