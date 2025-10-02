// lib/server-side-auth.ts
// Clean server-side authentication and data fetching utilities

import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export interface UserPlan {
  id: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'cancelled';
  billingCycle: 'monthly' | 'yearly';
  startDate: string; // ISO string for JSON serialization
  userName: string;
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

export interface CleanDashboardProps {
  session: any;
  userPlan: UserPlan;
  isAuthenticated: boolean;
}

// Get user plan from server-side (no external API calls to avoid infinite loops)
export async function getUserPlanServerSide(userEmail: string): Promise<UserPlan> {
  try {
    // REMOVED: GoHighLevel API call that was causing infinite loops
    // The GoHighLevel integration should be moved to client-side or a separate API route
    // to avoid blocking server-side rendering and causing redirect loops
    
    // Simple server-side logic without external API calls
    let plan: UserPlan['plan'] = 'pro'; // Default to pro for this dashboard
    let userName = userEmail.split('@')[0] || 'User';
    
    // Simple email-based plan detection (can be enhanced later)
    if (userEmail.includes('enterprise')) {
      plan = 'enterprise';
    } else if (userEmail.includes('starter')) {
      plan = 'starter';
    } else if (userEmail.includes('free')) {
      plan = 'free';
    } else {
      plan = 'pro'; // Default for dashboard access
    }

    // Return appropriate plan based on email analysis
    switch (plan) {
      case 'enterprise':
        return getEnterprisePlan(userEmail, userName);
      case 'pro':
        return getProPlan(userEmail, userName);
      case 'starter':
        return getStarterPlan(userEmail, userName);
      default:
        return getFreePlan(userEmail, userName);
    }
  } catch (error) {
    console.error('Error fetching user plan server-side:', error);
    // Fallback to pro plan to ensure dashboard access
    return getProPlan(userEmail, userEmail.split('@')[0] || 'User');
  }
}

// Server-side authentication wrapper for dashboard pages
export async function getCleanDashboardProps(
  context: GetServerSidePropsContext,
  requiredPlan?: 'free' | 'starter' | 'pro' | 'enterprise'
): Promise<{ props: CleanDashboardProps } | { redirect: any }> {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user?.email) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const userPlan = await getUserPlanServerSide(session.user.email);

  // Check plan requirements
  if (requiredPlan && !hasRequiredPlan(userPlan, requiredPlan)) {
    return {
      redirect: {
        destination: '/upgrade',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      userPlan,
      isAuthenticated: true,
    },
  };
}

// Helper function to check if user has required plan
function hasRequiredPlan(userPlan: UserPlan, requiredPlan: string): boolean {
  const planHierarchy = ['free', 'starter', 'pro', 'enterprise'];
  const userPlanIndex = planHierarchy.indexOf(userPlan.plan);
  const requiredPlanIndex = planHierarchy.indexOf(requiredPlan);
  
  return userPlanIndex >= requiredPlanIndex;
}

// Plan definitions
function getFreePlan(userEmail: string, userName?: string): UserPlan {
  return {
    id: 'free',
    plan: 'free',
    status: 'active',
    billingCycle: 'monthly',
    startDate: new Date().toISOString(),
    userName: userName || userEmail.split('@')[0] || 'User',
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
  };
}

function getStarterPlan(userEmail: string, userName?: string): UserPlan {
  return {
    id: 'starter',
    plan: 'starter',
    status: 'active',
    billingCycle: 'monthly',
    startDate: new Date().toISOString(),
    userName: userName || userEmail.split('@')[0] || 'User',
    features: [
      'Up to 10 comparisons/day',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
      'Team collaboration'
    ],
    limitations: [
      'Limited to 10 comparisons/day',
      'No white-label options',
      'Limited API access'
    ],
    usage: { comparisons: 0, consultations: 0, teamMembers: 3 },
    limits: { dailyComparisons: 10, monthlyConsultations: 2, maxTeamMembers: 3 }
  };
}

function getProPlan(userEmail: string, userName?: string): UserPlan {
  return {
    id: 'pro',
    plan: 'pro',
    status: 'active',
    billingCycle: 'monthly',
    startDate: new Date().toISOString(),
    userName: userName || userEmail.split('@')[0] || 'User',
    features: [
      'Unlimited comparisons',
      'Advanced analytics',
      'Expert consultations',
      'Custom integrations',
      'Team collaboration',
      'Marketing ROI dashboard',
      'Google Ads integration',
      'AI insights'
    ],
    limitations: [
      'No white-label options',
      'Limited custom branding'
    ],
    usage: { comparisons: 0, consultations: 0, teamMembers: 10 },
    limits: { dailyComparisons: -1, monthlyConsultations: 5, maxTeamMembers: 10 }
  };
}

function getEnterprisePlan(userEmail: string, userName?: string): UserPlan {
  return {
    id: 'enterprise',
    plan: 'enterprise',
    status: 'active',
    billingCycle: 'yearly',
    startDate: new Date().toISOString(),
    userName: userName || userEmail.split('@')[0] || 'User',
    features: [
      'Everything in Pro',
      'White-label options',
      'Custom branding',
      'Dedicated support',
      'Custom integrations',
      'Advanced analytics',
      'Team management',
      'API access',
      'Custom reporting'
    ],
    limitations: [],
    usage: { comparisons: 0, consultations: 0, teamMembers: 50 },
    limits: { dailyComparisons: -1, monthlyConsultations: -1, maxTeamMembers: 50 }
  };
}

// Helper function to get plan display name
export function getPlanDisplayName(plan: string): string {
  switch (plan) {
    case 'free': return 'Free';
    case 'starter': return 'Starter';
    case 'pro': return 'Pro';
    case 'enterprise': return 'Enterprise';
    default: return 'Unknown';
  }
}

// Helper function to get plan color
export function getPlanColor(plan: string): string {
  switch (plan) {
    case 'free': return 'text-gray-400';
    case 'starter': return 'text-blue-400';
    case 'pro': return 'text-purple-400';
    case 'enterprise': return 'text-green-400';
    default: return 'text-gray-400';
  }
}

// Helper function to check if feature is available
export function hasFeature(userPlan: UserPlan, feature: string): boolean {
  return userPlan.features.includes(feature);
}

// Helper function to check usage limits
export function isWithinLimits(userPlan: UserPlan, usageType: keyof UserPlan['usage']): boolean {
  const limit = userPlan.limits[usageType === 'comparisons' ? 'dailyComparisons' : 
                               usageType === 'consultations' ? 'monthlyConsultations' : 
                               'maxTeamMembers'];
  
  // -1 means unlimited
  if (limit === -1) return true;
  
  return userPlan.usage[usageType] < limit;
}
