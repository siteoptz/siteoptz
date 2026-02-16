export type UserPlan = 'free' | 'starter' | 'pro' | 'premium';

export interface User {
  id: string;
  email: string;
  plan: UserPlan;
  authenticated: boolean;
}

export interface PlanFeatures {
  comparisons: number | 'unlimited';
  tools: number | 'unlimited';
  support: 'community' | 'email' | 'priority';
  analytics: boolean;
  api: boolean;
}

export const PLAN_FEATURES: Record<UserPlan, PlanFeatures> = {
  free: {
    comparisons: 3,
    tools: 50,
    support: 'community',
    analytics: false,
    api: false
  },
  starter: {
    comparisons: 25,
    tools: 100,
    support: 'email',
    analytics: true,
    api: false
  },
  pro: {
    comparisons: 'unlimited',
    tools: 'unlimited',
    support: 'priority',
    analytics: true,
    api: true
  },
  premium: {
    comparisons: 'unlimited',
    tools: 'unlimited',
    support: 'priority',
    analytics: true,
    api: true
  }
};