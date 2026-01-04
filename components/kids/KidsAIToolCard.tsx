import React from 'react';
import Link from 'next/link';
import { KidsAITool } from '../../data/kidsAIToolsDatabase';
import SafetyBadge from './SafetyBadge';

interface KidsAIToolCardProps {
  tool: KidsAITool;
  userTier?: 'free' | 'parent-pro' | 'educator' | 'school';
  onViewDetails?: (tool: KidsAITool) => void;
  className?: string;
}

const KidsAIToolCard: React.FC<KidsAIToolCardProps> = ({ 
  tool, 
  userTier = 'free', 
  onViewDetails,
  className = ''
}) => {
  const isLocked = userTier === 'free' && tool.detailsRequiresPremium;
  
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(tool);
    } else {
      // Default behavior - could open modal or navigate to detail page
      console.log('View details for:', tool.name);
    }
  };

  const handleUpgradeClick = () => {
    window.open('/kids-ai/pricing', '_blank');
  };

  return (
    <div className={`
      kids-ai-tool-card bg-white border-2 border-gray-200 rounded-xl p-6 transition-all duration-300 
      hover:transform hover:-translate-y-1 hover:shadow-lg hover:border-blue-400 relative
      ${isLocked ? 'opacity-80' : ''}
      ${className}
    `}>
      {/* Safety Badge - Always visible */}
      {tool.coppaCompliant && (
        <div className="absolute top-4 right-4">
          <SafetyBadge type="coppa" />
        </div>
      )}
      
      {/* Tool Header */}
      <div className="tool-header mb-3">
        <h3 className="text-xl font-bold text-gray-900 mb-1 pr-20">
          {tool.name}
        </h3>
        <span className="text-sm text-gray-600">
          by {tool.provider}
        </span>
      </div>
      
      {/* Age Range Badge */}
      <div className="age-badge inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
        Ages {tool.ageRange.min}-{tool.ageRange.max}
      </div>
      
      {/* Metrics Grid */}
      <div className="tool-metrics grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-100 mb-4">
        <div className="metric text-center">
          <span className="block text-xs text-gray-500 mb-1">Educational Value</span>
          <span className="block text-lg font-bold text-blue-600">
            {tool.educationalValue}/10
          </span>
        </div>
        <div className="metric text-center">
          <span className="block text-xs text-gray-500 mb-1">Parent Rating</span>
          <span className="block text-lg font-bold text-blue-600">
            {tool.parentRating}/5 ⭐
          </span>
        </div>
        <div className="metric text-center">
          <span className="block text-xs text-gray-500 mb-1">Price</span>
          <span className="block text-sm font-bold text-blue-600">
            {tool.pricing}
          </span>
        </div>
      </div>
      
      {/* Description */}
      <p className="tool-description text-gray-600 text-sm leading-relaxed mb-4">
        {tool.description}
      </p>
      
      {/* Features/Tags */}
      <div className="tool-features flex flex-wrap gap-2 mb-4">
        {tool.features.slice(0, 3).map((feature, idx) => (
          <span 
            key={idx} 
            className="feature-tag bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
          >
            {feature}
          </span>
        ))}
        {tool.features.length > 3 && (
          <span className="text-xs text-gray-500 px-2 py-1">
            +{tool.features.length - 3} more
          </span>
        )}
      </div>
      
      {/* Safety Notes (if COPPA compliant) */}
      {tool.coppaCompliant && (
        <div className="safety-notes bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-xs text-green-700">
            <span className="font-semibold">✓ COPPA Compliant</span> • <span className="font-semibold">✓ Safety Certified</span>
          </p>
          <p className="text-xs text-green-600 mt-1">
            {tool.safetyNotes}
          </p>
        </div>
      )}
      
      {/* Review count */}
      <div className="text-xs text-gray-500 mb-4">
        Based on {tool.reviewCount.toLocaleString()} parent reviews
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-2">
        {isLocked ? (
          <>
            <button 
              onClick={handleUpgradeClick}
              className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Upgrade to View Details
            </button>
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Visit Site
            </a>
          </>
        ) : (
          <>
            <button 
              onClick={handleViewDetails}
              className="flex-1 bg-gray-100 text-blue-600 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              View Full Details →
            </button>
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Visit Tool
            </a>
          </>
        )}
      </div>
      
      {/* Lock Overlay for Free Users */}
      {isLocked && (
        <div className="absolute inset-0 bg-white bg-opacity-50 rounded-xl flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🔒</div>
            <p className="text-sm text-gray-600 font-medium">
              Upgrade to view full details
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KidsAIToolCard;