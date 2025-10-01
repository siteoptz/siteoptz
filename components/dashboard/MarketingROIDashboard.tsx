import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Zap,
  RefreshCw,
  Settings,
  Plus,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Eye,
  MousePointer,
  Filter,
  Download,
  Share2,
  Brain,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';

interface PlatformConnection {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  campaigns: number;
  spend: number;
  revenue: number;
  roi: number;
}

interface CampaignData {
  id: string;
  name: string;
  platform: string;
  status: 'active' | 'paused' | 'completed';
  spend: number;
  revenue: number;
  roi: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpa: number;
  trend: 'up' | 'down' | 'stable';
}

interface AIInsight {
  id: string;
  type: 'optimization' | 'warning' | 'opportunity' | 'success';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action: string;
  potentialGain: string;
}

export default function MarketingROIDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [platforms, setPlatforms] = useState<PlatformConnection[]>([
    {
      id: 'google-ads',
      name: 'Google Ads',
      status: 'connected',
      lastSync: '2 minutes ago',
      campaigns: 12,
      spend: 15420,
      revenue: 38950,
      roi: 2.52
    },
    {
      id: 'meta',
      name: 'Meta Ads',
      status: 'connected',
      lastSync: '5 minutes ago',
      campaigns: 8,
      spend: 8950,
      revenue: 22100,
      roi: 2.47
    },
    {
      id: 'tiktok',
      name: 'TikTok Ads',
      status: 'connected',
      lastSync: '1 minute ago',
      campaigns: 5,
      spend: 3200,
      revenue: 8900,
      roi: 2.78
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      status: 'connected',
      lastSync: '3 minutes ago',
      campaigns: 0,
      spend: 0,
      revenue: 0,
      roi: 0
    }
  ]);

  const [campaigns, setCampaigns] = useState<CampaignData[]>([
    {
      id: '1',
      name: 'Summer Sale 2024',
      platform: 'Google Ads',
      status: 'active',
      spend: 5420,
      revenue: 15680,
      roi: 2.89,
      impressions: 125000,
      clicks: 3200,
      conversions: 156,
      ctr: 2.56,
      cpc: 1.69,
      cpa: 34.74,
      trend: 'up'
    },
    {
      id: '2',
      name: 'Brand Awareness Q4',
      platform: 'Meta Ads',
      status: 'active',
      spend: 3200,
      revenue: 8900,
      roi: 2.78,
      impressions: 89000,
      clicks: 2100,
      conversions: 89,
      ctr: 2.36,
      cpc: 1.52,
      cpa: 35.96,
      trend: 'up'
    },
    {
      id: '3',
      name: 'TikTok Gen Z Campaign',
      platform: 'TikTok Ads',
      status: 'active',
      spend: 1800,
      revenue: 4200,
      roi: 2.33,
      impressions: 45000,
      clicks: 1200,
      conversions: 42,
      ctr: 2.67,
      cpc: 1.50,
      cpa: 42.86,
      trend: 'down'
    }
  ]);

  const [aiInsights, setAiInsights] = useState<AIInsight[]>([
    {
      id: '1',
      type: 'optimization',
      title: 'Increase TikTok Budget',
      description: 'TikTok campaigns are showing strong engagement. Consider increasing budget by 30% to capitalize on current performance.',
      impact: 'high',
      action: 'Increase TikTok budget by 30%',
      potentialGain: '+$1,200 monthly revenue'
    },
    {
      id: '2',
      type: 'opportunity',
      title: 'New Keyword Opportunity',
      description: 'Identified 15 high-value keywords with low competition that could improve Google Ads performance.',
      impact: 'medium',
      action: 'Add new keywords to Google Ads',
      potentialGain: '+$800 monthly revenue'
    },
    {
      id: '3',
      type: 'warning',
      title: 'High CPA on Brand Campaign',
      description: 'Brand Awareness campaign CPA is 35% above target. Consider adjusting targeting or creative.',
      impact: 'medium',
      action: 'Optimize targeting parameters',
      potentialGain: 'Reduce CPA by 25%'
    },
    {
      id: '4',
      type: 'success',
      title: 'ROI Target Exceeded',
      description: 'Summer Sale campaign is performing 45% above target ROI. Consider scaling similar campaigns.',
      impact: 'high',
      action: 'Scale successful campaign structure',
      potentialGain: '+$3,000 monthly revenue'
    }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // Calculate totals
  const totalSpend = campaigns.reduce((sum, campaign) => sum + campaign.spend, 0);
  const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0);
  const overallROI = totalSpend > 0 ? ((totalRevenue - totalSpend) / totalSpend * 100).toFixed(1) : '0.0';
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'disconnected': return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
      case 'error': return 'text-red-400 bg-red-900/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="w-4 h-4 text-green-400" />;
      case 'down': return <ArrowDownRight className="w-4 h-4 text-red-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <Target className="w-5 h-5 text-blue-400" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'opportunity': return <Lightbulb className="w-5 h-5 text-green-400" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      default: return <Brain className="w-5 h-5 text-purple-400" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'bg-blue-900/20 border-blue-500/30';
      case 'warning': return 'bg-yellow-900/20 border-yellow-500/30';
      case 'opportunity': return 'bg-green-900/20 border-green-500/30';
      case 'success': return 'bg-emerald-900/20 border-emerald-500/30';
      default: return 'bg-purple-900/20 border-purple-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <BarChart3 className="w-7 h-7 text-purple-400 mr-3" />
            Marketing ROI Dashboard
          </h2>
          <p className="text-gray-400 mt-1">
            Real-time marketing performance tracking with AI-powered insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
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
          <h3 className="text-2xl font-bold text-white mb-1">${totalRevenue.toLocaleString()}</h3>
          <p className="text-gray-400 text-sm">Total Revenue</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-900/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-blue-400 text-sm font-medium">+{overallROI}%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{overallROI}%</h3>
          <p className="text-gray-400 text-sm">Overall ROI</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-900/20 rounded-lg">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-purple-400 text-sm font-medium">+8.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{totalConversions}</h3>
          <p className="text-gray-400 text-sm">Total Conversions</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-900/20 rounded-lg">
              <Users className="w-6 h-6 text-yellow-400" />
            </div>
            <span className="text-yellow-400 text-sm font-medium">+15.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">${(totalSpend / campaigns.length).toFixed(0)}</h3>
          <p className="text-gray-400 text-sm">Avg. Spend per Campaign</p>
        </div>
      </div>

      {/* Platform Connections */}
      <div className="bg-black border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Platform Connections</h3>
          <button className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all">
            <Plus className="w-4 h-4 mr-2" />
            Connect Platform
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((platform) => (
            <div key={platform.id} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{platform.name}</h4>
                <div className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(platform.status)}`}>
                  {platform.status}
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Campaigns:</span>
                  <span className="text-white">{platform.campaigns}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Spend:</span>
                  <span className="text-white">${platform.spend.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ROI:</span>
                  <span className="text-green-400">{platform.roi.toFixed(2)}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Sync:</span>
                  <span className="text-gray-300">{platform.lastSync}</span>
                </div>
              </div>
              
              <button className="w-full mt-3 px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all text-sm">
                <Settings className="w-4 h-4 mr-2 inline" />
                Configure
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'campaigns', label: 'Campaigns', icon: Target },
            { id: 'insights', label: 'AI Insights', icon: Brain },
            { id: 'analytics', label: 'Analytics', icon: PieChart }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? 'border-purple-400 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Trend</h3>
            <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <LineChart className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400">Performance chart would go here</p>
              </div>
            </div>
          </div>

          {/* Top Campaigns */}
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Top Performing Campaigns</h3>
            <div className="space-y-4">
              {campaigns.slice(0, 3).map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center">
                    {getTrendIcon(campaign.trend)}
                    <div className="ml-3">
                      <h4 className="text-white font-medium">{campaign.name}</h4>
                      <p className="text-gray-400 text-sm">{campaign.platform}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">{campaign.roi.toFixed(2)}x ROI</p>
                    <p className="text-gray-400 text-sm">${campaign.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">All Campaigns</h3>
            <div className="flex items-center gap-3">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Platforms</option>
                <option value="google-ads">Google Ads</option>
                <option value="meta">Meta Ads</option>
                <option value="tiktok">TikTok Ads</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Campaign</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Platform</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Spend</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Revenue</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">ROI</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Conversions</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-800/50 hover:bg-gray-900/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {getTrendIcon(campaign.trend)}
                        <span className="ml-2 text-white font-medium">{campaign.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{campaign.platform}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        campaign.status === 'active' 
                          ? 'bg-green-900/20 text-green-400 border border-green-500/30'
                          : campaign.status === 'paused'
                          ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-gray-900/20 text-gray-400 border border-gray-500/30'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-white">${campaign.spend.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-white">${campaign.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-green-400 font-semibold">{campaign.roi.toFixed(2)}x</td>
                    <td className="py-3 px-4 text-right text-white">{campaign.conversions}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-purple-400 hover:text-purple-300 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-bold text-white">AI-Powered Insights</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Claude AI analyzes your marketing data to provide actionable recommendations for optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiInsights.map((insight) => (
              <div key={insight.id} className={`border rounded-xl p-6 ${getInsightColor(insight.type)}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{insight.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        insight.impact === 'high' ? 'bg-red-900/20 text-red-400' :
                        insight.impact === 'medium' ? 'bg-yellow-900/20 text-yellow-400' :
                        'bg-green-900/20 text-green-400'
                      }`}>
                        {insight.impact} impact
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 text-sm font-medium">{insight.potentialGain}</span>
                      <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                        {insight.action} →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-black border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">ROI Analysis</h3>
            <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400">Detailed ROI analysis chart</p>
              </div>
            </div>
          </div>

          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Platform Performance</h3>
            <div className="space-y-4">
              {platforms.map((platform) => (
                <div key={platform.id} className="flex items-center justify-between">
                  <span className="text-gray-300">{platform.name}</span>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">{platform.roi.toFixed(2)}x</p>
                    <p className="text-gray-400 text-xs">${platform.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
