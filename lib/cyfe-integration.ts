// lib/cyfe-integration.ts
// Cyfe.com Push API integration for white label dashboards with tiered access control

import { UserPlan } from '../utils/planAccessControl';

export interface CyfeConfig {
  apiKey: string;
  baseUrl: string;
  accountId?: string;
  dashboardId?: string;
}

export interface CyfeWidget {
  widget_id?: string;
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'gauge' | 'map';
  dataSource: string;
  refreshInterval: number;
  permissions: UserPlan[];
}

export interface CyfeDashboard {
  id: string;
  name: string;
  description: string;
  widgets: CyfeWidget[];
  requiredPlan: UserPlan;
  features: string[];
  embedUrl?: string;
}

export interface CyfeMetricData {
  value: number;
  label: string;
  timestamp?: string;
  previous_value?: number;
  change_percentage?: number;
}

export interface CyfeChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }>;
}

export interface CyfeTableData {
  headers: string[];
  rows: Array<Array<string | number>>;
}

const PLAN_HIERARCHY: Record<UserPlan, number> = {
  free: 0,
  starter: 1,
  pro: 2,
  enterprise: 3
};

export const DASHBOARD_REGISTRY: Record<string, CyfeDashboard> = {
  basic: {
    id: 'basic-metrics',
    name: 'Basic Analytics',
    description: 'Essential metrics and KPIs',
    requiredPlan: 'free',
    features: [
      'Website traffic overview',
      'Basic conversion tracking',
      'Top 5 performing pages',
      'Daily visitor counts'
    ],
    widgets: [
      {
        id: 'traffic-overview',
        title: 'Traffic Overview',
        type: 'metric',
        dataSource: 'google-analytics',
        refreshInterval: 3600,
        permissions: ['free', 'starter', 'pro', 'enterprise']
      },
      {
        id: 'daily-visitors',
        title: 'Daily Visitors',
        type: 'chart',
        dataSource: 'google-analytics',
        refreshInterval: 3600,
        permissions: ['free', 'starter', 'pro', 'enterprise']
      }
    ]
  },
  marketing: {
    id: 'marketing-roi',
    name: 'Marketing ROI Dashboard',
    description: 'Complete marketing performance tracking',
    requiredPlan: 'starter',
    features: [
      'Multi-channel attribution',
      'Campaign performance tracking',
      'ROI calculations',
      'A/B test results',
      'Conversion funnel analysis'
    ],
    widgets: [
      {
        id: 'roas-tracker',
        title: 'Return on Ad Spend',
        type: 'gauge',
        dataSource: 'google-ads',
        refreshInterval: 1800,
        permissions: ['starter', 'pro', 'enterprise']
      },
      {
        id: 'campaign-performance',
        title: 'Campaign Performance',
        type: 'table',
        dataSource: 'multi-channel',
        refreshInterval: 1800,
        permissions: ['starter', 'pro', 'enterprise']
      },
      {
        id: 'conversion-funnel',
        title: 'Conversion Funnel',
        type: 'chart',
        dataSource: 'analytics',
        refreshInterval: 3600,
        permissions: ['starter', 'pro', 'enterprise']
      }
    ]
  },
  advanced: {
    id: 'advanced-analytics',
    name: 'Advanced Analytics Suite',
    description: 'Comprehensive business intelligence dashboard',
    requiredPlan: 'pro',
    features: [
      'Real-time data streaming',
      'Custom metric builder',
      'Predictive analytics',
      'Cohort analysis',
      'Revenue attribution',
      'Customer lifetime value',
      'Churn prediction'
    ],
    widgets: [
      {
        id: 'revenue-attribution',
        title: 'Revenue Attribution',
        type: 'chart',
        dataSource: 'custom',
        refreshInterval: 900,
        permissions: ['pro', 'enterprise']
      },
      {
        id: 'predictive-analytics',
        title: 'Predictive Analytics',
        type: 'chart',
        dataSource: 'ml-model',
        refreshInterval: 3600,
        permissions: ['pro', 'enterprise']
      },
      {
        id: 'cohort-analysis',
        title: 'Cohort Analysis',
        type: 'table',
        dataSource: 'analytics',
        refreshInterval: 3600,
        permissions: ['pro', 'enterprise']
      },
      {
        id: 'customer-ltv',
        title: 'Customer Lifetime Value',
        type: 'metric',
        dataSource: 'crm',
        refreshInterval: 3600,
        permissions: ['pro', 'enterprise']
      }
    ]
  },
  executive: {
    id: 'executive-command',
    name: 'Executive Command Center',
    description: 'C-suite level insights and strategic overview',
    requiredPlan: 'enterprise',
    features: [
      'Company-wide KPI tracking',
      'Department performance comparison',
      'Market share analysis',
      'Competitor benchmarking',
      'Financial projections',
      'Risk assessment matrix',
      'Board-ready reporting',
      'Multi-brand consolidation'
    ],
    widgets: [
      {
        id: 'company-kpis',
        title: 'Company KPIs',
        type: 'metric',
        dataSource: 'bi-warehouse',
        refreshInterval: 900,
        permissions: ['enterprise']
      },
      {
        id: 'market-share',
        title: 'Market Share Analysis',
        type: 'chart',
        dataSource: 'market-data',
        refreshInterval: 86400,
        permissions: ['enterprise']
      },
      {
        id: 'competitor-benchmark',
        title: 'Competitor Benchmarking',
        type: 'table',
        dataSource: 'competitive-intel',
        refreshInterval: 86400,
        permissions: ['enterprise']
      },
      {
        id: 'financial-projections',
        title: 'Financial Projections',
        type: 'chart',
        dataSource: 'finance',
        refreshInterval: 3600,
        permissions: ['enterprise']
      },
      {
        id: 'risk-matrix',
        title: 'Risk Assessment',
        type: 'map',
        dataSource: 'risk-management',
        refreshInterval: 3600,
        permissions: ['enterprise']
      }
    ]
  },
  custom: {
    id: 'custom-white-label',
    name: 'Custom White-Label Dashboard',
    description: 'Fully customizable dashboard for Enterprise clients',
    requiredPlan: 'enterprise',
    features: [
      'Unlimited custom widgets',
      'API integration',
      'Custom branding',
      'Dedicated support',
      'SLA guarantee'
    ],
    widgets: []
  }
};

export class CyfeIntegration {
  private config: CyfeConfig;
  private userPlan: UserPlan;

  constructor(config: CyfeConfig, userPlan: UserPlan) {
    this.config = config;
    this.userPlan = userPlan;
  }

  canAccessDashboard(dashboardId: string): boolean {
    const dashboard = DASHBOARD_REGISTRY[dashboardId];
    if (!dashboard) return false;

    const userPlanLevel = PLAN_HIERARCHY[this.userPlan];
    const requiredPlanLevel = PLAN_HIERARCHY[dashboard.requiredPlan];

    return userPlanLevel >= requiredPlanLevel;
  }

  getAccessibleDashboards(): CyfeDashboard[] {
    const userPlanLevel = PLAN_HIERARCHY[this.userPlan];
    
    return Object.values(DASHBOARD_REGISTRY).filter(dashboard => {
      const requiredPlanLevel = PLAN_HIERARCHY[dashboard.requiredPlan];
      return userPlanLevel >= requiredPlanLevel;
    });
  }

  getAccessibleWidgets(dashboardId: string): CyfeWidget[] {
    const dashboard = DASHBOARD_REGISTRY[dashboardId];
    if (!dashboard || !this.canAccessDashboard(dashboardId)) {
      return [];
    }

    return dashboard.widgets.filter(widget => 
      widget.permissions.includes(this.userPlan)
    );
  }

  getDashboardFeatures(dashboardId: string): string[] {
    const dashboard = DASHBOARD_REGISTRY[dashboardId];
    return dashboard?.features || [];
  }

  getUpgradeRequirement(dashboardId: string): UserPlan | null {
    const dashboard = DASHBOARD_REGISTRY[dashboardId];
    if (!dashboard) return null;

    if (this.canAccessDashboard(dashboardId)) {
      return null;
    }

    return dashboard.requiredPlan;
  }

  generateEmbedUrl(dashboardId: string, options?: {
    theme?: 'light' | 'dark';
    height?: number;
    width?: number;
    refresh?: number;
  }): string | null {
    if (!this.canAccessDashboard(dashboardId)) {
      return null;
    }

    const dashboard = DASHBOARD_REGISTRY[dashboardId];
    const params = new URLSearchParams({
      api_key: this.config.apiKey,
      dashboard: dashboard.id,
      theme: options?.theme || 'dark',
      height: String(options?.height || 600),
      width: String(options?.width || 100),
      refresh: String(options?.refresh || 60)
    });

    return `${this.config.baseUrl}/embed?${params.toString()}`;
  }

  /**
   * Push Google Ads data to Cyfe dashboard
   */
  async pushGoogleAdsData(widgetId: string, data: any) {
    return this.pushDataToCyfe(widgetId, this.transformGoogleAdsData(data));
  }

  /**
   * Push metric data to Cyfe widget
   */
  async pushMetricData(widgetId: string, data: CyfeMetricData) {
    return this.pushDataToCyfe(widgetId, data);
  }

  /**
   * Push chart data to Cyfe widget
   */
  async pushChartData(widgetId: string, data: CyfeChartData) {
    return this.pushDataToCyfe(widgetId, data);
  }

  /**
   * Push table data to Cyfe widget
   */
  async pushTableData(widgetId: string, data: CyfeTableData) {
    return this.pushDataToCyfe(widgetId, data);
  }

  /**
   * Core function to push data to Cyfe
   */
  private async pushDataToCyfe(widgetId: string, data: any) {
    try {
      const response = await fetch(`${this.config.baseUrl}/widgets/push`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          widget_id: widgetId,
          data: data,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Cyfe API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error pushing data to Cyfe:', error);
      throw error;
    }
  }

  /**
   * Transform Google Ads data for Cyfe consumption
   */
  private transformGoogleAdsData(googleAdsData: any): CyfeMetricData | CyfeChartData | CyfeTableData {
    if (!googleAdsData || !googleAdsData.metrics) {
      throw new Error('Invalid Google Ads data provided');
    }

    const { metrics, campaigns } = googleAdsData;

    // Example transformation - can be customized based on widget type
    return {
      value: metrics.total_spend,
      label: 'Total Ad Spend',
      timestamp: new Date().toISOString(),
      previous_value: metrics.total_spend * 0.9, // Mock previous value
      change_percentage: 10 // Mock change percentage
    };
  }

  /**
   * Get available widgets for the account
   */
  async getWidgets() {
    try {
      const response = await fetch(`${this.config.baseUrl}/widgets`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Cyfe API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching Cyfe widgets:', error);
      throw error;
    }
  }

  /**
   * Create a new widget in Cyfe
   */
  async createWidget(widget: Omit<CyfeWidget, 'widget_id'>) {
    try {
      const response = await fetch(`${this.config.baseUrl}/widgets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(widget)
      });

      if (!response.ok) {
        throw new Error(`Cyfe API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating Cyfe widget:', error);
      throw error;
    }
  }
}

// Default Cyfe configuration
export const getDefaultCyfeConfig = (): CyfeConfig => ({
  apiKey: process.env.CYFE_API_KEY || '',
  baseUrl: process.env.CYFE_BASE_URL || 'https://api.cyfe.com',
  accountId: process.env.CYFE_ACCOUNT_ID,
  dashboardId: process.env.CYFE_DASHBOARD_ID
});

export function getCyfeIntegration(userPlan: UserPlan): CyfeIntegration {
  const config = getDefaultCyfeConfig();
  return new CyfeIntegration(config, userPlan);
}

export function getPlanDashboardLimits(plan: UserPlan): {
  maxDashboards: number;
  maxWidgets: number;
  refreshRate: number;
  customIntegrations: boolean;
  whiteLabel: boolean;
  apiAccess: boolean;
} {
  switch (plan) {
    case 'free':
      return {
        maxDashboards: 1,
        maxWidgets: 5,
        refreshRate: 3600,
        customIntegrations: false,
        whiteLabel: false,
        apiAccess: false
      };
    case 'starter':
      return {
        maxDashboards: 3,
        maxWidgets: 15,
        refreshRate: 1800,
        customIntegrations: false,
        whiteLabel: false,
        apiAccess: true
      };
    case 'pro':
      return {
        maxDashboards: 10,
        maxWidgets: 50,
        refreshRate: 900,
        customIntegrations: true,
        whiteLabel: false,
        apiAccess: true
      };
    case 'enterprise':
      return {
        maxDashboards: -1,
        maxWidgets: -1,
        refreshRate: 300,
        customIntegrations: true,
        whiteLabel: true,
        apiAccess: true
      };
  }
}

// Predefined widget configurations for common marketing metrics
export const MARKETING_WIDGETS = {
  TOTAL_SPEND: {
    id: 'total-spend',
    title: 'Total Ad Spend',
    type: 'metric' as const,
    dataSource: 'google-ads',
    refreshInterval: 3600,
    permissions: ['starter', 'pro', 'enterprise'] as UserPlan[]
  },
  ROAS: {
    id: 'roas',
    title: 'Return on Ad Spend',
    type: 'gauge' as const,
    dataSource: 'google-ads',
    refreshInterval: 3600,
    permissions: ['starter', 'pro', 'enterprise'] as UserPlan[]
  },
  CLICKS_CHART: {
    id: 'clicks-chart',
    title: 'Clicks Over Time',
    type: 'chart' as const,
    dataSource: 'google-ads',
    refreshInterval: 3600,
    permissions: ['starter', 'pro', 'enterprise'] as UserPlan[]
  },
  CAMPAIGN_PERFORMANCE: {
    id: 'campaign-performance',
    title: 'Campaign Performance',
    type: 'table' as const,
    dataSource: 'multi-channel',
    refreshInterval: 1800,
    permissions: ['starter', 'pro', 'enterprise'] as UserPlan[]
  },
  CONVERSION_RATE: {
    id: 'conversion-rate',
    title: 'Conversion Rate',
    type: 'metric' as const,
    dataSource: 'analytics',
    refreshInterval: 3600,
    permissions: ['starter', 'pro', 'enterprise'] as UserPlan[]
  },
  COST_PER_CLICK: {
    id: 'cost-per-click',
    title: 'Cost Per Click',
    type: 'metric' as const,
    dataSource: 'google-ads',
    refreshInterval: 3600,
    permissions: ['starter', 'pro', 'enterprise'] as UserPlan[]
  }
};

// Helper function to create a complete dashboard
export async function createMarketingDashboard(cyfe: CyfeIntegration) {
  const widgets = [];
  
  for (const [key, config] of Object.entries(MARKETING_WIDGETS)) {
    try {
      const widget = await cyfe.createWidget(config);
      widgets.push({ key, widget });
    } catch (error) {
      console.error(`Failed to create widget ${key}:`, error);
    }
  }
  
  return widgets;
}

// Helper function to sync Google Ads data to all relevant widgets
export async function syncGoogleAdsDataToCyfe(
  cyfe: CyfeIntegration, 
  googleAdsData: any, 
  widgetMapping: Record<string, string>
) {
  const results = [];
  
  try {
    // Push total spend
    if (widgetMapping.TOTAL_SPEND) {
      const result = await cyfe.pushMetricData(widgetMapping.TOTAL_SPEND, {
        value: googleAdsData.metrics.total_spend,
        label: 'Total Spend',
        timestamp: new Date().toISOString()
      });
      results.push({ widget: 'TOTAL_SPEND', result });
    }

    // Push ROAS
    if (widgetMapping.ROAS) {
      const result = await cyfe.pushMetricData(widgetMapping.ROAS, {
        value: googleAdsData.metrics.total_roas,
        label: 'ROAS',
        timestamp: new Date().toISOString()
      });
      results.push({ widget: 'ROAS', result });
    }

    // Push campaign performance table
    if (widgetMapping.CAMPAIGN_PERFORMANCE && googleAdsData.campaigns) {
      const tableData: CyfeTableData = {
        headers: ['Campaign', 'Spend', 'Clicks', 'ROAS', 'Status'],
        rows: googleAdsData.campaigns.map((campaign: any) => [
          campaign.name,
          `$${campaign.spent.toLocaleString()}`,
          campaign.clicks.toLocaleString(),
          `${campaign.roas.toFixed(2)}x`,
          campaign.status
        ])
      };
      
      const result = await cyfe.pushTableData(widgetMapping.CAMPAIGN_PERFORMANCE, tableData);
      results.push({ widget: 'CAMPAIGN_PERFORMANCE', result });
    }

    // Push clicks chart (example with mock historical data)
    if (widgetMapping.CLICKS_CHART) {
      const chartData: CyfeChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Total Clicks',
          data: [
            googleAdsData.metrics.total_clicks * 0.7,
            googleAdsData.metrics.total_clicks * 0.8,
            googleAdsData.metrics.total_clicks * 0.9,
            googleAdsData.metrics.total_clicks
          ],
          backgroundColor: '#3B82F6',
          borderColor: '#1D4ED8'
        }]
      };
      
      const result = await cyfe.pushChartData(widgetMapping.CLICKS_CHART, chartData);
      results.push({ widget: 'CLICKS_CHART', result });
    }

  } catch (error) {
    console.error('Error syncing data to Cyfe:', error);
    throw error;
  }
  
  return results;
}