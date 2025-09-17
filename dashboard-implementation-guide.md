# 🚀 Dashboard Implementation Guide

## 📋 Implementation Checklist

### Phase 1: Core Infrastructure

#### 1.1 User Plan Management System
```typescript
// types/userPlan.ts
export interface UserPlan {
  id: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  billingCycle: 'monthly' | 'yearly';
  startDate: Date;
  nextBilling?: Date;
  features: string[];
  limitations: string[];
  usage: {
    comparisons: number;
    consultations: number;
    teamMembers: number;
  };
  limits: {
    dailyComparisons: number;
    monthlyConsultations: number;
    maxTeamMembers: number;
  };
}

// hooks/useUserPlan.ts
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export const useUserPlan = () => {
  const { data: session } = useSession();
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchUserPlan();
    } else {
      setUserPlan(null);
      setLoading(false);
    }
  }, [session]);

  const fetchUserPlan = async () => {
    try {
      const response = await fetch('/api/user/plan');
      const plan = await response.json();
      setUserPlan(plan);
    } catch (error) {
      console.error('Failed to fetch user plan:', error);
      // Default to free plan
      setUserPlan(getDefaultFreePlan());
    } finally {
      setLoading(false);
    }
  };

  return { userPlan, loading, refetch: fetchUserPlan };
};

const getDefaultFreePlan = (): UserPlan => ({
  id: 'free',
  plan: 'free',
  status: 'active',
  billingCycle: 'monthly',
  startDate: new Date(),
  features: [
    'Daily AI tool spotlight',
    'Basic tool comparisons',
    'Community support',
    'Basic implementation guides'
  ],
  limitations: [
    'Limited to 3 comparisons/day',
    'No expert consultation',
    'Limited tool access',
    'No team features'
  ],
  usage: { comparisons: 0, consultations: 0, teamMembers: 1 },
  limits: { dailyComparisons: 3, monthlyConsultations: 0, maxTeamMembers: 1 }
});
```

#### 1.2 Feature Gating Component
```typescript
// components/FeatureGate.tsx
import React from 'react';
import { UserPlan } from '../types/userPlan';
import { UpgradePrompt } from './UpgradePrompt';

interface FeatureGateProps {
  userPlan: UserPlan | null;
  requiredPlan: 'free' | 'starter' | 'pro' | 'enterprise';
  children: React.ReactNode;
  fallback?: React.ReactNode;
  feature?: string;
}

const planHierarchy = ['free', 'starter', 'pro', 'enterprise'];

export const FeatureGate: React.FC<FeatureGateProps> = ({
  userPlan,
  requiredPlan,
  children,
  fallback,
  feature
}) => {
  if (!userPlan) {
    return <div>Please log in to access this feature.</div>;
  }

  const hasAccess = planHierarchy.indexOf(userPlan.plan) >= planHierarchy.indexOf(requiredPlan);
  
  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <UpgradePrompt
      currentPlan={userPlan.plan}
      requiredPlan={requiredPlan}
      feature={feature}
    />
  );
};
```

#### 1.3 Upgrade Prompt Component
```typescript
// components/UpgradePrompt.tsx
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
      <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-gray-500 mb-4">
          <config.icon className="w-12 h-12 mx-auto mb-2" />
          <h3 className="font-semibold">This feature requires {config.name} plan</h3>
          <p className="text-sm">Upgrade to unlock {feature || 'this feature'}</p>
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
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <div className="text-center">
        <div className={`w-16 h-16 bg-${config.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
          <config.icon className={`w-8 h-8 text-${config.color}-600`} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Unlock {feature || `${config.name} Features`}
        </h3>
        <p className="text-gray-600 mb-4">
          Upgrade to {config.name} plan to access this feature and many more
        </p>
        <div className="space-y-2 mb-6">
          {config.benefits.slice(0, 3).map((benefit, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              {benefit}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <span className="text-3xl font-bold text-gray-900">${config.price}</span>
          <span className="text-gray-600">/year</span>
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
```

### Phase 2: Dashboard Components

#### 2.1 Dashboard Header
```typescript
// components/dashboard/DashboardHeader.tsx
import React from 'react';
import { UserPlan } from '../../types/userPlan';
import { Badge, Calendar, Users, Zap } from 'lucide-react';

interface DashboardHeaderProps {
  userPlan: UserPlan;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userPlan }) => {
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'bg-gray-100 text-gray-800';
      case 'starter': return 'bg-blue-100 text-blue-800';
      case 'pro': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'free': return <Zap className="w-4 h-4" />;
      case 'starter': return <Zap className="w-4 h-4" />;
      case 'pro': return <Users className="w-4 h-4" />;
      case 'enterprise': return <Users className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your AI implementation
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="flex items-center space-x-2">
              {getPlanIcon(userPlan.plan)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPlanColor(userPlan.plan)}`}>
                {userPlan.plan.charAt(0).toUpperCase() + userPlan.plan.slice(1)} Plan
              </span>
            </div>
            {userPlan.nextBilling && (
              <p className="text-xs text-gray-500 mt-1">
                Renews {userPlan.nextBilling.toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
```

#### 2.2 Usage Meter Component
```typescript
// components/dashboard/UsageMeter.tsx
import React from 'react';
import { UserPlan } from '../../types/userPlan';

interface UsageMeterProps {
  userPlan: UserPlan;
  type: 'comparisons' | 'consultations' | 'teamMembers';
}

export const UsageMeter: React.FC<UsageMeterProps> = ({ userPlan, type }) => {
  const config = {
    comparisons: {
      label: 'Daily Comparisons',
      used: userPlan.usage.comparisons,
      limit: userPlan.limits.dailyComparisons,
      color: 'blue'
    },
    consultations: {
      label: 'Monthly Consultations',
      used: userPlan.usage.consultations,
      limit: userPlan.limits.monthlyConsultations,
      color: 'purple'
    },
    teamMembers: {
      label: 'Team Members',
      used: userPlan.usage.teamMembers,
      limit: userPlan.limits.maxTeamMembers,
      color: 'green'
    }
  };

  const { label, used, limit, color } = config[type];
  const percentage = limit > 0 ? (used / limit) * 100 : 0;
  const isNearLimit = percentage >= 80;
  const isAtLimit = percentage >= 100;

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">
          {used}/{limit === 0 ? '∞' : limit}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${
            isAtLimit ? 'bg-red-500' : isNearLimit ? 'bg-yellow-500' : `bg-${color}-500`
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {isNearLimit && (
        <p className="text-xs text-yellow-600 mt-1">
          {isAtLimit ? 'Limit reached' : 'Approaching limit'}
        </p>
      )}
    </div>
  );
};
```

#### 2.3 Free Plan Dashboard
```typescript
// components/dashboard/FreePlanDashboard.tsx
import React from 'react';
import { UserPlan } from '../../types/userPlan';
import { FeatureGate } from '../FeatureGate';
import { UsageMeter } from './UsageMeter';
import { UpgradePrompt } from '../UpgradePrompt';
import { Search, BookOpen, Users, TrendingUp } from 'lucide-react';

interface FreePlanDashboardProps {
  userPlan: UserPlan;
}

export const FreePlanDashboard: React.FC<FreePlanDashboardProps> = ({ userPlan }) => {
  return (
    <div className="p-6 space-y-6">
      {/* Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UsageMeter userPlan={userPlan} type="comparisons" />
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Implementation Guides</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Community Support</p>
              <p className="text-2xl font-bold text-gray-900">Active</p>
            </div>
            <Users className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Daily AI Tool Spotlight */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Today's AI Tool Spotlight</h2>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            Free Feature
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ChatGPT for Business</h3>
            <p className="text-gray-600 mb-4">
              Discover how ChatGPT can transform your customer service and content creation workflows.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Customer service automation
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Content generation
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Data analysis
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Get Full Analysis</h4>
            <p className="text-sm text-gray-600 mb-4">
              Unlock detailed implementation guides, ROI calculations, and expert recommendations.
            </p>
            <UpgradePrompt
              currentPlan="free"
              requiredPlan="starter"
              feature="detailed tool analysis"
              variant="inline"
            />
          </div>
        </div>
      </div>

      {/* Limited Tool Comparisons */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">AI Tool Comparisons</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {userPlan.usage.comparisons}/{userPlan.limits.dailyComparisons} used today
            </span>
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(userPlan.usage.comparisons / userPlan.limits.dailyComparisons) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <FeatureGate
          userPlan={userPlan}
          requiredPlan="free"
          feature="basic tool comparisons"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search AI tools..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Compare
              </button>
            </div>
            
            {userPlan.usage.comparisons >= userPlan.limits.dailyComparisons && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-yellow-800">Daily limit reached</h4>
                    <p className="text-sm text-yellow-700">
                      You've used all your daily comparisons. Upgrade to Starter for unlimited access.
                    </p>
                  </div>
                  <UpgradePrompt
                    currentPlan="free"
                    requiredPlan="starter"
                    feature="unlimited comparisons"
                    variant="banner"
                  />
                </div>
              </div>
            )}
          </div>
        </FeatureGate>
      </div>

      {/* Basic Implementation Guides */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Implementation Guides</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Getting Started with AI</h3>
            <p className="text-sm text-gray-600 mb-3">
              A beginner's guide to implementing AI in your business.
            </p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Read Guide →
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">AI Tool Selection</h3>
            <p className="text-sm text-gray-600 mb-3">
              How to choose the right AI tools for your needs.
            </p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Read Guide →
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">ROI Measurement</h3>
            <p className="text-sm text-gray-600 mb-3">
              Track and measure the return on your AI investments.
            </p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Read Guide →
            </button>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-900">Want more guides?</h4>
              <p className="text-sm text-blue-700">
                Get access to 50+ detailed implementation guides with Starter plan.
              </p>
            </div>
            <UpgradePrompt
              currentPlan="free"
              requiredPlan="starter"
              feature="50+ implementation guides"
              variant="banner"
            />
          </div>
        </div>
      </div>

      {/* Upgrade Prompts */}
      <div className="grid md:grid-cols-2 gap-6">
        <UpgradePrompt
          currentPlan="free"
          requiredPlan="starter"
          feature="unlimited AI tool comparisons"
        />
        <UpgradePrompt
          currentPlan="free"
          requiredPlan="starter"
          feature="advanced analytics and ROI tracking"
        />
      </div>
    </div>
  );
};
```

### Phase 3: API Endpoints

#### 3.1 User Plan API
```typescript
// pages/api/user/plan.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // In a real implementation, you would fetch this from your database
    // For now, we'll return a mock user plan
    const userPlan = {
      id: session.user.id,
      plan: 'free', // This would come from your database
      status: 'active',
      billingCycle: 'monthly',
      startDate: new Date(),
      features: [
        'Daily AI tool spotlight',
        'Basic tool comparisons',
        'Community support',
        'Basic implementation guides'
      ],
      limitations: [
        'Limited to 3 comparisons/day',
        'No expert consultation',
        'Limited tool access',
        'No team features'
      ],
      usage: {
        comparisons: 1, // This would come from your database
        consultations: 0,
        teamMembers: 1
      },
      limits: {
        dailyComparisons: 3,
        monthlyConsultations: 0,
        maxTeamMembers: 1
      }
    };

    res.status(200).json(userPlan);
  } catch (error) {
    console.error('Error fetching user plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

#### 3.2 Usage Tracking API
```typescript
// pages/api/user/usage.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { type, increment = 1 } = req.body;

    // In a real implementation, you would update the database
    // For now, we'll just return success
    console.log(`User ${session.user.id} used ${type} (increment: ${increment})`);

    // Track usage analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'feature_used', {
        event_category: 'dashboard',
        event_label: type,
        value: increment
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error tracking usage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

### Phase 4: Main Dashboard Page

#### 4.1 Dashboard Page
```typescript
// pages/dashboard.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { useUserPlan } from '../hooks/useUserPlan';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { FreePlanDashboard } from '../components/dashboard/FreePlanDashboard';
import { StarterPlanDashboard } from '../components/dashboard/StarterPlanDashboard';
import { ProPlanDashboard } from '../components/dashboard/ProPlanDashboard';
import { EnterprisePlanDashboard } from '../components/dashboard/EnterprisePlanDashboard';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function Dashboard() {
  const { userPlan, loading } = useUserPlan();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!userPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h1>
          <p className="text-gray-600">You need to be logged in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  const renderDashboardContent = () => {
    switch (userPlan.plan) {
      case 'free':
        return <FreePlanDashboard userPlan={userPlan} />;
      case 'starter':
        return <StarterPlanDashboard userPlan={userPlan} />;
      case 'pro':
        return <ProPlanDashboard userPlan={userPlan} />;
      case 'enterprise':
        return <EnterprisePlanDashboard userPlan={userPlan} />;
      default:
        return <FreePlanDashboard userPlan={userPlan} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userPlan={userPlan} />
      <main>
        {renderDashboardContent()}
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/#login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
```

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] Set up user plan database schema
- [ ] Configure Stripe webhooks for plan changes
- [ ] Set up analytics tracking
- [ ] Test all plan transitions
- [ ] Verify feature gating works correctly

### Post-deployment
- [ ] Monitor user engagement metrics
- [ ] Track upgrade conversion rates
- [ ] A/B test upgrade prompts
- [ ] Collect user feedback
- [ ] Optimize based on usage data

This implementation provides a solid foundation for a tiered dashboard system that encourages upgrades while delivering value to users at every plan level.
