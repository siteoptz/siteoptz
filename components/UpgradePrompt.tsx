import React from 'react';
import { useUpgradeFlow } from '../hooks/useUpgradeFlow';
import { ArrowRight, Crown, Zap, Shield } from 'lucide-react';

interface UpgradePromptProps {
  currentPlan: string;
  requiredPlan: string;
  feature?: string;
  variant?: 'card' | 'banner' | 'inline';
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  currentPlan,
  requiredPlan,
  feature,
  variant = 'card'
}) => {
  const { initiateUpgrade } = useUpgradeFlow();

  const planConfig = {
    starter: {
      name: 'Starter',
      price: 497,
      icon: <Zap className="w-5 h-5" />,
      color: 'blue',
      benefits: [
        'Unlimited AI tool comparisons',
        'Advanced filtering & search',
        'Implementation roadmaps',
        'ROI tracking dashboard'
      ]
    },
    pro: {
      name: 'Pro',
      price: 1997,
      icon: <Crown className="w-5 h-5" />,
      color: 'purple',
      benefits: [
        '1-on-1 expert consultations',
        'Team collaboration tools',
        'API access',
        'White-label reports'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      price: 4997,
      icon: <Shield className="w-5 h-5" />,
      color: 'amber',
      benefits: [
        'Unlimited consultations',
        'Dedicated success manager',
        'Custom integrations',
        'On-site workshops'
      ]
    }
  };

  const config = planConfig[requiredPlan as keyof typeof planConfig];

  const handleUpgrade = async () => {
    try {
      await initiateUpgrade(requiredPlan as 'starter' | 'pro', 'yearly');
    } catch (error) {
      console.error('Upgrade failed:', error);
    }
  };

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Unlock {feature || `${config.name} features`}</h3>
            <p className="text-sm opacity-90">Upgrade to {config.name} to access this feature</p>
          </div>
          <button
            onClick={handleUpgrade}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="text-center p-6 border-2 border-dashed border-gray-600 rounded-lg bg-gray-800/30">
        <div className="text-gray-300 mb-4">
          <div className="flex justify-center mb-2">{config.icon}</div>
          <h3 className="font-semibold mt-2 text-white">This feature requires {config.name} plan</h3>
          <p className="text-sm text-gray-300">Upgrade to unlock {feature || 'this feature'}</p>
        </div>
        <button
          onClick={handleUpgrade}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Upgrade to {config.name}
        </button>
      </div>
    );
  }

  // Default card variant
  return (
    <div className="bg-black border border-gray-800 rounded-xl p-6 shadow-lg">
      <div className="text-center">
        <div className={`w-16 h-16 bg-${config.color}-500/20 border border-${config.color}-500/30 rounded-full flex items-center justify-center mx-auto mb-4`}>
          <div className={`text-${config.color}-400`}>
            {config.icon}
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Unlock {feature || `${config.name} Features`}
        </h3>
        <p className="text-gray-300 mb-4">
          Upgrade to {config.name} plan to access this feature and many more
        </p>
        <div className="space-y-2 mb-6">
          {config.benefits.slice(0, 3).map((benefit, index) => (
            <div key={index} className="flex items-center text-sm text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              {benefit}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <span className="text-3xl font-bold text-white">${config.price}</span>
          <span className="text-gray-400">/year</span>
        </div>
        <button
          onClick={handleUpgrade}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center"
        >
          Upgrade to {config.name}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};