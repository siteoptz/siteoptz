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
    return <div className="text-center text-gray-600">Please log in to access this feature.</div>;
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