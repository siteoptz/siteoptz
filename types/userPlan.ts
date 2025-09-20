export interface UserPlan {
  id: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  billingCycle: 'monthly' | 'yearly';
  startDate: Date;
  nextBilling?: Date;
  userName?: string;
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

export interface PlanConfig {
  name: string;
  price: number;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
}

export type PlanTier = 'free' | 'starter' | 'pro' | 'enterprise';