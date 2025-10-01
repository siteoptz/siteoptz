import React, { useState, useEffect } from 'react';
import {
  Brain,
  Lightbulb,
  Target,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  Eye,
  MousePointer,
  RefreshCw,
  Filter,
  Download,
  Share2,
  Play,
  Pause,
  Settings,
  Shield
} from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'optimization' | 'warning' | 'opportunity' | 'success' | 'prediction';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: {
    metric: string;
    current: number;
    potential: number;
    unit: string;
  };
  confidence: number;
  timeframe: string;
  action: {
    title: string;
    description: string;
    steps: string[];
    effort: 'low' | 'medium' | 'high';
    cost: 'free' | 'low' | 'medium' | 'high';
  };
  tags: string[];
  createdAt: string;
  expiresAt?: string;
  status: 'new' | 'reviewed' | 'implemented' | 'dismissed';
}

interface CampaignPerformance {
  id: string;
  name: string;
  platform: string;
  metrics: {
    spend: number;
    revenue: number;
    roi: number;
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
    cpa: number;
  };
  trends: {
    roi: 'up' | 'down' | 'stable';
    spend: 'up' | 'down' | 'stable';
    conversions: 'up' | 'down' | 'stable';
  };
}

const mockInsights: AIInsight[] = [
  {
    id: '1',
    type: 'optimization',
    priority: 'high',
    title: 'Increase TikTok Budget by 40%',
    description: 'TikTok campaigns are showing exceptional ROI (3.2x vs 2.1x average). Current budget constraints are limiting growth potential. Scaling up could capture more high-value traffic.',
    impact: {
      metric: 'Monthly Revenue',
      current: 4200,
      potential: 5880,
      unit: 'USD'
    },
    confidence: 94,
    timeframe: 'Next 2 weeks',
    action: {
      title: 'Scale TikTok Campaign Budget',
      description: 'Gradually increase TikTok ad spend to capture more high-performing traffic',
      steps: [
        'Increase daily budget by 20%',
        'Monitor performance for 3 days',
        'Scale successful ad sets by 40%',
        'Pause underperforming creatives',
        'A/B test new audience segments'
      ],
      effort: 'low',
      cost: 'medium'
    },
    tags: ['budget-optimization', 'tiktok', 'roi-improvement'],
    createdAt: '2024-01-15T10:30:00Z',
    status: 'new'
  },
  {
    id: '2',
    type: 'warning',
    priority: 'high',
    title: 'High CPA Alert: Brand Awareness Campaign',
    description: 'Brand Awareness campaign CPA ($42.86) is 35% above target ($32). This is impacting overall profitability and should be addressed immediately.',
    impact: {
      metric: 'Cost Per Acquisition',
      current: 42.86,
      potential: 32.00,
      unit: 'USD'
    },
    confidence: 87,
    timeframe: 'Immediate',
    action: {
      title: 'Optimize Campaign Targeting',
      description: 'Refine audience targeting and creative to improve conversion efficiency',
      steps: [
        'Review audience demographics and interests',
        'Test new creative variations',
        'Adjust bid strategy to target value',
        'Implement conversion tracking improvements',
        'Consider audience exclusions'
      ],
      effort: 'medium',
      cost: 'free'
    },
    tags: ['cpa-optimization', 'brand-awareness', 'cost-reduction'],
    createdAt: '2024-01-15T09:15:00Z',
    status: 'new'
  },
  {
    id: '3',
    type: 'opportunity',
    priority: 'medium',
    title: 'New Keyword Opportunities Identified',
    description: 'Discovered 15 high-value keywords with low competition that could improve Google Ads performance. These keywords show strong search volume and commercial intent.',
    impact: {
      metric: 'Monthly Revenue',
      current: 15680,
      potential: 16480,
      unit: 'USD'
    },
    confidence: 76,
    timeframe: 'Next 4 weeks',
    action: {
      title: 'Expand Keyword Portfolio',
      description: 'Add new high-value keywords to existing campaigns',
      steps: [
        'Research keyword search volumes',
        'Create new ad groups for keyword themes',
        'Develop keyword-specific ad copy',
        'Set appropriate bid strategies',
        'Monitor performance and adjust bids'
      ],
      effort: 'medium',
      cost: 'low'
    },
    tags: ['keyword-expansion', 'google-ads', 'growth-opportunity'],
    createdAt: '2024-01-15T08:45:00Z',
    status: 'reviewed'
  },
  {
    id: '4',
    type: 'success',
    priority: 'medium',
    title: 'Summer Sale Campaign Exceeding Targets',
    description: 'Summer Sale campaign is performing 45% above target ROI. Consider scaling this campaign structure to other seasonal promotions.',
    impact: {
      metric: 'ROI',
      current: 2.89,
      potential: 3.50,
      unit: 'x'
    },
    confidence: 92,
    timeframe: 'Next 6 weeks',
    action: {
      title: 'Scale Successful Campaign Structure',
      description: 'Apply winning campaign elements to new seasonal campaigns',
      steps: [
        'Document successful campaign elements',
        'Create campaign templates',
        'Identify next seasonal opportunity',
        'Launch similar campaign structure',
        'Monitor and optimize new campaigns'
      ],
      effort: 'high',
      cost: 'high'
    },
    tags: ['campaign-scaling', 'seasonal-marketing', 'success-replication'],
    createdAt: '2024-01-15T07:30:00Z',
    status: 'implemented'
  },
  {
    id: '5',
    type: 'prediction',
    priority: 'low',
    title: 'Q1 Performance Forecast',
    description: 'Based on current trends, Q1 2024 is projected to show 23% revenue growth. However, increased competition in your primary keywords may impact performance.',
    impact: {
      metric: 'Q1 Revenue',
      current: 45600,
      potential: 56088,
      unit: 'USD'
    },
    confidence: 68,
    timeframe: 'Next 3 months',
    action: {
      title: 'Prepare for Q1 Challenges',
      description: 'Develop strategies to maintain growth despite increased competition',
      steps: [
        'Analyze competitor keyword strategies',
        'Diversify traffic sources',
        'Improve conversion rates',
        'Test new platforms',
        'Optimize existing campaigns'
      ],
      effort: 'high',
      cost: 'medium'
    },
    tags: ['forecasting', 'competitive-analysis', 'growth-planning'],
    createdAt: '2024-01-15T06:00:00Z',
    status: 'reviewed'
  }
];

export default function AIInsightsEngine() {
  const [insights, setInsights] = useState<AIInsight[]>(mockInsights);
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'optimization' | 'warning' | 'opportunity' | 'success' | 'prediction'>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateNewInsights = async () => {
    setIsGenerating(true);
    // Simulate Claude AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  const analyzePerformance = async () => {
    setIsAnalyzing(true);
    // Simulate real-time analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
  };

  const updateInsightStatus = (insightId: string, status: AIInsight['status']) => {
    setInsights(prev => prev.map(insight => 
      insight.id === insightId ? { ...insight, status } : insight
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <Target className="w-5 h-5 text-blue-400" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'opportunity': return <Lightbulb className="w-5 h-5 text-green-400" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'prediction': return <Brain className="w-5 h-5 text-purple-400" />;
      default: return <Brain className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'bg-blue-900/20 border-blue-500/30';
      case 'warning': return 'bg-yellow-900/20 border-yellow-500/30';
      case 'opportunity': return 'bg-green-900/20 border-green-500/30';
      case 'success': return 'bg-emerald-900/20 border-emerald-500/30';
      case 'prediction': return 'bg-purple-900/20 border-purple-500/30';
      default: return 'bg-gray-900/20 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-900/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-900/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-900/20 text-gray-400 border-gray-500/30';
    }
  };

  const getEffortIcon = (effort: string) => {
    switch (effort) {
      case 'low': return <Zap className="w-4 h-4 text-green-400" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'high': return <Settings className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredInsights = insights.filter(insight => {
    const priorityMatch = filter === 'all' || insight.priority === filter;
    const typeMatch = typeFilter === 'all' || insight.type === typeFilter;
    return priorityMatch && typeMatch;
  });

  const stats = {
    total: insights.length,
    high: insights.filter(i => i.priority === 'high').length,
    new: insights.filter(i => i.status === 'new').length,
    implemented: insights.filter(i => i.status === 'implemented').length,
    potentialGain: insights.reduce((sum, i) => sum + (i.impact.potential - i.impact.current), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Brain className="w-7 h-7 text-purple-400 mr-3" />
            AI Insights Engine
          </h2>
          <p className="text-gray-400 mt-1">
            Claude AI analyzes your marketing data to provide actionable recommendations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={analyzePerformance}
            disabled={isAnalyzing}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            <Brain className={`w-4 h-4 mr-2 ${isAnalyzing ? 'animate-pulse' : ''}`} />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Now'}
          </button>
          <button
            onClick={generateNewInsights}
            disabled={isGenerating}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate Insights'}
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-900/20 rounded-lg">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-purple-400 text-sm font-medium">+{stats.new} new</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{stats.total}</h3>
          <p className="text-gray-400 text-sm">Total Insights</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-900/20 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <span className="text-red-400 text-sm font-medium">Urgent</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{stats.high}</h3>
          <p className="text-gray-400 text-sm">High Priority</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-900/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+{stats.implemented}</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{stats.implemented}</h3>
          <p className="text-gray-400 text-sm">Implemented</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-900/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-blue-400 text-sm font-medium">Potential</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">${stats.potentialGain.toLocaleString()}</h3>
          <p className="text-gray-400 text-sm">Potential Gain</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm">Priority:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="optimization">Optimization</option>
            <option value="warning">Warning</option>
            <option value="opportunity">Opportunity</option>
            <option value="success">Success</option>
            <option value="prediction">Prediction</option>
          </select>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInsights.map((insight) => (
          <div key={insight.id} className={`border rounded-xl p-6 ${getTypeColor(insight.type)}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getTypeIcon(insight.type)}
                <div>
                  <h3 className="text-white font-semibold">{insight.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(insight.priority)}`}>
                      {insight.priority} priority
                    </span>
                    <span className="text-gray-400 text-xs">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedInsight(insight)}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-gray-300 text-sm mb-4">{insight.description}</p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Impact on {insight.impact.metric}:</span>
                <span className="text-green-400 font-semibold">
                  +{((insight.impact.potential - insight.impact.current) / insight.impact.current * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Timeframe:</span>
                <span className="text-white text-sm">{insight.timeframe}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Implementation:</span>
                <div className="flex items-center gap-1">
                  {getEffortIcon(insight.action.effort)}
                  <span className="text-white text-sm capitalize">{insight.action.effort} effort</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateInsightStatus(insight.id, 'implemented')}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Implement
              </button>
              <button
                onClick={() => updateInsightStatus(insight.id, 'dismissed')}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all text-sm"
              >
                <Pause className="w-4 h-4 mr-2" />
                Dismiss
              </button>
              <button
                onClick={() => setSelectedInsight(insight)}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Insight Detail Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTypeIcon(selectedInsight.type)}
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedInsight.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(selectedInsight.priority)}`}>
                        {selectedInsight.priority} priority
                      </span>
                      <span className="text-gray-400 text-sm">
                        {selectedInsight.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-white font-semibold mb-3">Analysis</h4>
                <p className="text-gray-300">{selectedInsight.description}</p>
              </div>

              {/* Impact */}
              <div>
                <h4 className="text-white font-semibold mb-3">Potential Impact</h4>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">{selectedInsight.impact.metric}</span>
                    <span className="text-green-400 font-semibold">
                      +{((selectedInsight.impact.potential - selectedInsight.impact.current) / selectedInsight.impact.current * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      Current: ${selectedInsight.impact.current.toLocaleString()} {selectedInsight.impact.unit}
                    </span>
                    <span className="text-white">
                      Potential: ${selectedInsight.impact.potential.toLocaleString()} {selectedInsight.impact.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Plan */}
              <div>
                <h4 className="text-white font-semibold mb-3">Recommended Action</h4>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <h5 className="text-blue-400 font-medium mb-2">{selectedInsight.action.title}</h5>
                  <p className="text-gray-300 text-sm mb-4">{selectedInsight.action.description}</p>
                  
                  <div className="space-y-2">
                    <h6 className="text-white font-medium">Implementation Steps:</h6>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                      {selectedInsight.action.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      {getEffortIcon(selectedInsight.action.effort)}
                      <span className="text-gray-300 capitalize">{selectedInsight.action.effort} effort</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 capitalize">{selectedInsight.action.cost} cost</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{selectedInsight.timeframe}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-white font-semibold mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedInsight.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                <button
                  onClick={() => {
                    updateInsightStatus(selectedInsight.id, 'implemented');
                    setSelectedInsight(null);
                  }}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Implement Recommendation
                </button>
                <button
                  onClick={() => {
                    updateInsightStatus(selectedInsight.id, 'reviewed');
                    setSelectedInsight(null);
                  }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Mark as Reviewed
                </button>
                <button
                  onClick={() => {
                    updateInsightStatus(selectedInsight.id, 'dismissed');
                    setSelectedInsight(null);
                  }}
                  className="flex items-center px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all ml-auto"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Status */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Brain className="w-6 h-6 text-purple-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-purple-400 font-semibold mb-2">Claude AI Analysis Engine</h4>
            <p className="text-gray-300 text-sm mb-3">
              Our AI continuously analyzes your marketing data to identify optimization opportunities, 
              predict trends, and provide actionable recommendations. Insights are generated based on 
              real-time performance data and industry benchmarks.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Brain className="w-3 h-3" />
                Claude 3.5 Sonnet
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                Updated hourly
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Privacy-first analysis
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
