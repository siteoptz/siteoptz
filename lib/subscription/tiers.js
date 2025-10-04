// lib/subscription/tiers.js
export const SUBSCRIPTION_TIERS = {
  FREE: {
    name: 'Free',
    slug: 'free',
    price_monthly: 0,
    price_yearly: 0,
    limits: {
      max_accounts: 2,
      max_data_retention_days: 30,
      max_insights_per_month: 10,
      max_automation_rules: 0,
      max_api_calls_per_month: 1000,
      max_exports_per_month: 5,
      max_custom_reports: 0,
      max_team_members: 1
    },
    features: [
      'Basic dashboard',
      'Limited insights (10/month)',
      'Email support',
      'Data retention (30 days)',
      'Basic reporting',
      'Standard integrations'
    ],
    restrictions: [
      'No automation',
      'No custom branding',
      'No API access',
      'No priority support',
      'Limited data history'
    ],
    popular: false
  },
  
  PROFESSIONAL: {
    name: 'Professional',
    slug: 'professional',
    price_monthly: 99,
    price_yearly: 990, // 2 months free
    limits: {
      max_accounts: 10,
      max_data_retention_days: 90,
      max_insights_per_month: 100,
      max_automation_rules: 5,
      max_api_calls_per_month: 10000,
      max_exports_per_month: 50,
      max_custom_reports: 10,
      max_team_members: 3
    },
    features: [
      'Advanced dashboard',
      'Unlimited insights',
      'Basic automation (5 rules)',
      'Priority email support',
      'Custom reports (10)',
      'Data retention (90 days)',
      'Advanced analytics',
      'Slack integration',
      'Webhook support',
      'CSV/Excel exports'
    ],
    restrictions: [
      'Limited team members (3)',
      'No white-label branding',
      'No dedicated support',
      'Standard SLA'
    ],
    popular: true
  },
  
  ENTERPRISE: {
    name: 'Enterprise',
    slug: 'enterprise',
    price_monthly: 299,
    price_yearly: 2990, // 2 months free
    limits: {
      max_accounts: 50,
      max_data_retention_days: 365,
      max_insights_per_month: 1000,
      max_automation_rules: 25,
      max_api_calls_per_month: 100000,
      max_exports_per_month: 500,
      max_custom_reports: 100,
      max_team_members: 15
    },
    features: [
      'White-label dashboard',
      'Unlimited insights',
      'Advanced automation (25 rules)',
      'Custom integrations',
      'Dedicated account manager',
      'Phone + email support',
      'Priority support',
      'Custom branding',
      'API access',
      'SSO integration',
      'Advanced security',
      'Custom reports (100)',
      'Data retention (1 year)',
      'Real-time alerts',
      'Custom domains',
      'Team collaboration (15 members)',
      'Advanced permissions',
      'Audit logs',
      'SLA guarantee'
    ],
    restrictions: [],
    popular: false
  },

  AGENCY: {
    name: 'Agency',
    slug: 'agency',
    price_monthly: 599,
    price_yearly: 5990,
    limits: {
      max_accounts: 200,
      max_data_retention_days: 730, // 2 years
      max_insights_per_month: 5000,
      max_automation_rules: 100,
      max_api_calls_per_month: 500000,
      max_exports_per_month: 2000,
      max_custom_reports: 500,
      max_team_members: 50,
      max_client_accounts: 100
    },
    features: [
      'Multi-tenant white-label',
      'Client management',
      'Unlimited insights',
      'Advanced automation (100 rules)',
      'Custom integrations',
      'Dedicated success manager',
      '24/7 phone + email support',
      'Priority support',
      'Full white-label branding',
      'Advanced API access',
      'SSO integration',
      'Enterprise security',
      'Unlimited custom reports',
      'Extended data retention (2 years)',
      'Real-time alerts',
      'Custom domains',
      'Team collaboration (50 members)',
      'Advanced permissions',
      'Audit logs',
      'SLA guarantee',
      'Client billing integration',
      'Reseller program',
      'Training & onboarding'
    ],
    restrictions: [],
    popular: false
  }
};

export const FEATURE_FLAGS = {
  // Dashboard Features
  BASIC_DASHBOARD: ['free', 'professional', 'enterprise', 'agency'],
  ADVANCED_DASHBOARD: ['professional', 'enterprise', 'agency'],
  WHITE_LABEL_DASHBOARD: ['enterprise', 'agency'],
  MULTI_TENANT_DASHBOARD: ['agency'],
  
  // Insights & AI
  LIMITED_INSIGHTS: ['free'],
  UNLIMITED_INSIGHTS: ['professional', 'enterprise', 'agency'],
  ADVANCED_AI_INSIGHTS: ['enterprise', 'agency'],
  COMPETITIVE_INSIGHTS: ['enterprise', 'agency'],
  
  // Automation
  NO_AUTOMATION: ['free'],
  BASIC_AUTOMATION: ['professional'],
  ADVANCED_AUTOMATION: ['enterprise', 'agency'],
  CUSTOM_AUTOMATION: ['agency'],
  
  // Integrations
  STANDARD_INTEGRATIONS: ['free', 'professional', 'enterprise', 'agency'],
  PREMIUM_INTEGRATIONS: ['professional', 'enterprise', 'agency'],
  CUSTOM_INTEGRATIONS: ['enterprise', 'agency'],
  
  // Support
  EMAIL_SUPPORT: ['free', 'professional', 'enterprise', 'agency'],
  PRIORITY_SUPPORT: ['professional', 'enterprise', 'agency'],
  PHONE_SUPPORT: ['enterprise', 'agency'],
  DEDICATED_SUPPORT: ['enterprise', 'agency'],
  
  // API & Webhooks
  NO_API_ACCESS: ['free'],
  BASIC_API_ACCESS: ['professional'],
  FULL_API_ACCESS: ['enterprise', 'agency'],
  WEBHOOKS: ['professional', 'enterprise', 'agency'],
  
  // Branding
  NO_BRANDING: ['free', 'professional'],
  CUSTOM_BRANDING: ['enterprise', 'agency'],
  WHITE_LABEL_BRANDING: ['enterprise', 'agency'],
  
  // Team & Collaboration
  SINGLE_USER: ['free'],
  SMALL_TEAM: ['professional'],
  LARGE_TEAM: ['enterprise'],
  ENTERPRISE_TEAM: ['agency'],
  
  // Security & Compliance
  BASIC_SECURITY: ['free', 'professional'],
  ADVANCED_SECURITY: ['enterprise', 'agency'],
  SSO_INTEGRATION: ['enterprise', 'agency'],
  AUDIT_LOGS: ['enterprise', 'agency'],
  
  // Reporting & Export
  BASIC_REPORTS: ['free'],
  CUSTOM_REPORTS: ['professional', 'enterprise', 'agency'],
  UNLIMITED_REPORTS: ['agency'],
  ADVANCED_EXPORTS: ['professional', 'enterprise', 'agency'],
  
  // Client Management (Agency-specific)
  CLIENT_MANAGEMENT: ['agency'],
  CLIENT_BILLING: ['agency'],
  RESELLER_PROGRAM: ['agency']
};

export class SubscriptionManager {
  static getTierBySlug(slug) {
    return Object.values(SUBSCRIPTION_TIERS).find(tier => tier.slug === slug);
  }

  static hasFeature(userTier, feature) {
    const allowedTiers = FEATURE_FLAGS[feature];
    return allowedTiers && allowedTiers.includes(userTier);
  }

  static getLimit(userTier, limitType) {
    const tier = this.getTierBySlug(userTier);
    return tier ? tier.limits[limitType] : 0;
  }

  static canUpgrade(currentTier, targetTier) {
    const tiers = ['free', 'professional', 'enterprise', 'agency'];
    const currentIndex = tiers.indexOf(currentTier);
    const targetIndex = tiers.indexOf(targetTier);
    
    return targetIndex > currentIndex;
  }

  static getUpgradePath(currentTier) {
    const tiers = ['free', 'professional', 'enterprise', 'agency'];
    const currentIndex = tiers.indexOf(currentTier);
    
    if (currentIndex === -1 || currentIndex === tiers.length - 1) {
      return [];
    }
    
    return tiers.slice(currentIndex + 1).map(slug => this.getTierBySlug(slug));
  }

  static calculateSavings(tier, isYearly) {
    if (!isYearly || !tier.price_yearly || tier.price_monthly === 0) {
      return 0;
    }
    
    const yearlyFromMonthly = tier.price_monthly * 12;
    const savings = yearlyFromMonthly - tier.price_yearly;
    const percentage = Math.round((savings / yearlyFromMonthly) * 100);
    
    return {
      amount: savings,
      percentage,
      yearlyFromMonthly,
      yearlyPrice: tier.price_yearly
    };
  }

  static getRecommendedTier(usage) {
    const {
      accountCount = 0,
      monthlyInsights = 0,
      automationRules = 0,
      apiCalls = 0,
      teamMembers = 1,
      needsWhiteLabel = false,
      needsAPI = false,
      isAgency = false
    } = usage;

    // Agency tier for agencies
    if (isAgency || accountCount > 50) {
      return SUBSCRIPTION_TIERS.AGENCY;
    }

    // Enterprise tier for advanced needs
    if (needsWhiteLabel || accountCount > 10 || monthlyInsights > 100 || 
        automationRules > 5 || teamMembers > 3) {
      return SUBSCRIPTION_TIERS.ENTERPRISE;
    }

    // Professional tier for moderate usage
    if (accountCount > 2 || monthlyInsights > 10 || automationRules > 0 || 
        needsAPI || teamMembers > 1) {
      return SUBSCRIPTION_TIERS.PROFESSIONAL;
    }

    // Free tier for basic usage
    return SUBSCRIPTION_TIERS.FREE;
  }

  static formatPrice(price, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  }

  static getTrialPeriod(tier) {
    const trialDays = {
      'free': 0,
      'professional': 14,
      'enterprise': 30,
      'agency': 30
    };
    
    return trialDays[tier] || 0;
  }

  static isTrialEligible(userTier, targetTier) {
    // Can only trial higher tiers
    return this.canUpgrade(userTier, targetTier);
  }

  static getUsageWarningThresholds() {
    return {
      warning: 0.8, // 80% of limit
      critical: 0.95, // 95% of limit
      blocked: 1.0 // 100% of limit
    };
  }

  static checkUsageStatus(current, limit) {
    if (limit === null || limit === undefined) {
      return { status: 'unlimited', percentage: 0 };
    }

    const percentage = current / limit;
    const thresholds = this.getUsageWarningThresholds();

    if (percentage >= thresholds.blocked) {
      return { status: 'blocked', percentage };
    } else if (percentage >= thresholds.critical) {
      return { status: 'critical', percentage };
    } else if (percentage >= thresholds.warning) {
      return { status: 'warning', percentage };
    } else {
      return { status: 'normal', percentage };
    }
  }
}

export default SubscriptionManager;