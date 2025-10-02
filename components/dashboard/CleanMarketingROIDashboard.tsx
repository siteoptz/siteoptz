import React from 'react';
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
import { CleanGoogleAdsData, CleanGoogleAdsConnection } from '@/lib/clean-google-ads';
import { formatCurrency, formatNumber, formatPercentage, getPerformanceColor, getPerformanceIcon } from '@/lib/clean-google-ads';

// Simple date formatter - no hydration issues
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Just show date, no time
  } catch {
    return 'Recently updated';
  }
}

interface CleanMarketingROIDashboardProps {
  googleAdsData: CleanGoogleAdsData | null;
  googleAdsConnection: CleanGoogleAdsConnection;
  dateRange: string;
  onDateRangeChange?: (dateRange: string) => void;
  onRefresh?: () => void;
}

export default function CleanMarketingROIDashboard({
  googleAdsData,
  googleAdsConnection,
  dateRange,
  onDateRangeChange,
  onRefresh
}: CleanMarketingROIDashboardProps) {
  const dateRangeOptions = [
    { value: 'TODAY', label: 'Today' },
    { value: 'YESTERDAY', label: 'Yesterday' },
    { value: 'LAST_7_DAYS', label: 'Last 7 days' },
    { value: 'LAST_30_DAYS', label: 'Last 30 days' },
    { value: 'LAST_90_DAYS', label: 'Last 90 days' }
  ];

  if (!googleAdsConnection.isConnected) {
    return (
      <div className="space-y-6">
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <div>
              <h3 className="text-lg font-semibold text-red-400">Google Ads Not Connected</h3>
              <p className="text-red-300">Please connect your Google Ads account to view ROI data.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!googleAdsData) {
    return (
      <div className="space-y-6">
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-yellow-400" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-400">Loading Data</h3>
              <p className="text-yellow-300">Fetching Google Ads data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { campaigns, metrics } = googleAdsData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Marketing ROI Dashboard</h2>
          <p className="text-gray-400">Google Ads performance and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange?.(e.target.value)}
            className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white"
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          )}
        </div>
      </div>

      {/* Account Info */}
      {googleAdsConnection.selectedAccount && (
        <div className="bg-black border border-gray-800 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">{googleAdsConnection.selectedAccount.descriptive_name}</h3>
              <p className="text-gray-400 text-sm">ID: {googleAdsConnection.selectedAccount.customer_id}</p>
            </div>
            <div className="ml-auto">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-900/20 text-green-400 border border-green-500/30">
                Connected
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center space-x-1 ${getPerformanceColor(metrics.total_roas, 2)}`}>
              {getPerformanceIcon(metrics.total_roas, 2) === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{formatNumber(metrics.total_roas)}x</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {formatCurrency(metrics.total_spend)}
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
              {getPerformanceIcon(metrics.average_ctr, 2) === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
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
              {getPerformanceIcon(metrics.average_conversion_rate, 3) === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
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
              {getPerformanceIcon(metrics.average_cpc, 2, true) === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{formatCurrency(metrics.average_cpc)}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {formatNumber(metrics.total_impressions)}
          </h3>
          <p className="text-gray-400 text-sm">Total Impressions</p>
          <p className="text-orange-400 text-xs mt-2">Avg. CPC: {formatCurrency(metrics.average_cpc)}</p>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-black border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">
              {formatCurrency(metrics.cost_per_conversion)}
            </div>
            <p className="text-gray-400">Cost per Conversion</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">
              {formatCurrency(metrics.average_cpm)}
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

      {/* Campaign Performance Table */}
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
                    {formatCurrency(campaign.spent)}
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
                    {formatCurrency(campaign.cpc)}
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

      {/* Last Updated */}
      <div className="text-center text-gray-400 text-sm">
        Last updated: {formatDate(googleAdsData.lastUpdated)}
      </div>
    </div>
  );
}
