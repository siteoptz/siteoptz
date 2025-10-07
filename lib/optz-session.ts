import { getClientByEmail } from '../pages/api/clients/create';

export interface OptzSession {
  client: {
    id: string;
    email: string;
    username: string;
    companyName: string;
    plan: 'free' | 'starter' | 'pro' | 'enterprise';
    dashboardAccess: string[];
    isActive: boolean;
  };
  loginTime: string;
  expiresAt: string;
}

export interface DashboardAccess {
  basic: boolean;
  marketing: boolean;
  advanced: boolean;
  executive: boolean;
  custom: boolean;
}

/**
 * Get user session from browser storage
 */
export const getOptzSession = (): OptzSession | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const sessionData = sessionStorage.getItem('optz_session');
    if (!sessionData) return null;
    
    const session = JSON.parse(sessionData);
    
    // Check if session is expired
    if (new Date() > new Date(session.expiresAt || session.loginTime)) {
      sessionStorage.removeItem('optz_session');
      return null;
    }
    
    return session;
  } catch {
    return null;
  }
};

/**
 * Set user session in browser storage
 */
export const setOptzSession = (client: any): void => {
  if (typeof window === 'undefined') return;
  
  const session: OptzSession = {
    client: {
      id: client.id,
      email: client.email,
      username: client.username,
      companyName: client.companyName,
      plan: client.plan,
      dashboardAccess: client.dashboardAccess || [],
      isActive: client.isActive
    },
    loginTime: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString() // 8 hours
  };
  
  sessionStorage.setItem('optz_session', JSON.stringify(session));
};

/**
 * Clear user session
 */
export const clearOptzSession = (): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('optz_session');
};

/**
 * Get dashboard access permissions based on plan
 */
export const getDashboardAccess = (plan: string): DashboardAccess => {
  const accessMap: Record<string, DashboardAccess> = {
    free: {
      basic: true,
      marketing: false,
      advanced: false,
      executive: false,
      custom: false
    },
    starter: {
      basic: true,
      marketing: true,
      advanced: false,
      executive: false,
      custom: false
    },
    pro: {
      basic: true,
      marketing: true,
      advanced: true,
      executive: false,
      custom: false
    },
    enterprise: {
      basic: true,
      marketing: true,
      advanced: true,
      executive: true,
      custom: true
    }
  };
  
  return accessMap[plan] || accessMap.free;
};

/**
 * Get plan features and limits
 */
export const getPlanFeatures = (plan: string) => {
  const features = {
    free: {
      widgets: 5,
      refreshRate: '1 hour',
      dashboards: ['Basic Analytics'],
      features: [
        'Basic traffic analytics',
        'Simple conversion tracking',
        'Email support',
        '1 hour data refresh'
      ]
    },
    starter: {
      widgets: 15,
      refreshRate: '30 minutes',
      dashboards: ['Basic Analytics', 'Marketing ROI'],
      features: [
        'All Basic features',
        'Marketing ROI tracking',
        'Campaign performance analytics',
        'Attribution reporting',
        '30-minute data refresh',
        'Priority email support'
      ]
    },
    pro: {
      widgets: 50,
      refreshRate: '15 minutes',
      dashboards: ['Basic Analytics', 'Marketing ROI', 'Advanced Analytics'],
      features: [
        'All Starter features',
        'Predictive analytics',
        'Cohort analysis',
        'Customer LTV tracking',
        'Custom integrations',
        '15-minute data refresh',
        'Live chat support'
      ]
    },
    enterprise: {
      widgets: 'Unlimited',
      refreshRate: '5 minutes',
      dashboards: ['Basic Analytics', 'Marketing ROI', 'Advanced Analytics', 'Executive Command Center'],
      features: [
        'All Pro features',
        'Executive KPI dashboards',
        'White-label branding',
        'Custom domain support',
        'API access',
        '5-minute data refresh',
        'Dedicated account manager',
        'Custom development'
      ]
    }
  };
  
  return features[plan as keyof typeof features] || features.free;
};

/**
 * Check if user can access specific dashboard
 */
export const canAccessDashboard = (session: OptzSession | null, dashboardType: string): boolean => {
  if (!session || !session.client.isActive) return false;
  
  const access = getDashboardAccess(session.client.plan);
  
  switch (dashboardType) {
    case 'basic':
      return access.basic;
    case 'marketing':
      return access.marketing;
    case 'advanced':
      return access.advanced;
    case 'executive':
      return access.executive;
    case 'custom':
      return access.custom;
    default:
      return false;
  }
};

/**
 * Get upgrade URL for current plan
 */
export const getUpgradeUrl = (currentPlan: string): string => {
  const upgradeMap = {
    free: 'https://siteoptz.ai/upgrade?plan=starter',
    starter: 'https://siteoptz.ai/upgrade?plan=pro',
    pro: 'https://siteoptz.ai/upgrade?plan=enterprise',
    enterprise: 'https://siteoptz.ai/dashboard/enterprise'
  };
  
  return upgradeMap[currentPlan as keyof typeof upgradeMap] || 'https://siteoptz.ai/upgrade';
};