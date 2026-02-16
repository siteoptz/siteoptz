// components/dashboard/InsightPanel.jsx
import React, { useState } from 'react';
import { 
  TrendingUpIcon, 
  TrendingDownIcon, 
  ExclamationTriangleIcon, 
  LightBulbIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function InsightPanel({ insights, loading }) {
  const [dismissedInsights, setDismissedInsights] = useState(new Set());

  const handleImplement = async (insightId) => {
    try {
      const response = await fetch('/api/insights/implement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ insightId })
      });
      
      if (response.ok) {
        // Show success notification
        console.log('Insight implemented successfully');
      }
    } catch (error) {
      console.error('Failed to implement insight:', error);
    }
  };

  const handleDismiss = (insightId) => {
    setDismissedInsights(prev => new Set([...prev, insightId]));
  };

  const filteredInsights = insights.filter(insight => !dismissedInsights.has(insight.id));

  if (loading) {
    return (
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">AI Insights</h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-gray-800 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const getInsightIcon = (type) => {
    switch (type) {
      case 'optimization':
        return TrendingUpIcon;
      case 'performance':
        return TrendingDownIcon;
      case 'risk':
        return ExclamationTriangleIcon;
      case 'opportunity':
        return LightBulbIcon;
      default:
        return LightBulbIcon;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'optimization':
        return 'text-green-400';
      case 'performance':
        return 'text-red-400';
      case 'risk':
        return 'text-yellow-400';
      case 'opportunity':
        return 'text-blue-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">AI Insights</h3>
        <button className="text-cyan-400 hover:text-cyan-300 text-sm">
          View All
        </button>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredInsights.length === 0 ? (
          <div className="text-center py-8">
            <LightBulbIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">No insights available</p>
            <button className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm">
              Generate New Insights
            </button>
          </div>
        ) : (
          filteredInsights.map(insight => {
            const Icon = getInsightIcon(insight.type);
            const iconColor = getInsightColor(insight.type);
            
            return (
              <div key={insight.id} className="border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
                    <span className="font-medium text-sm text-white">{insight.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                      {Math.round((insight.confidence_score || 0.8) * 100)}% confidence
                    </span>
                    <button
                      onClick={() => handleDismiss(insight.id)}
                      className="text-gray-500 hover:text-gray-400"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                  {insight.description}
                </p>
                
                {insight.impact_score && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Expected Impact</span>
                      <span>{insight.impact_score}/10</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                        style={{ width: `${(insight.impact_score / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {insight.actionable && (
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleImplement(insight.id)}
                      className="flex items-center space-x-1 text-xs bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      <CheckIcon className="w-3 h-3" />
                      <span>Implement</span>
                    </button>
                    <button className="text-xs bg-gray-800 text-gray-300 px-3 py-2 rounded hover:bg-gray-700 transition-colors">
                      View Details
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}