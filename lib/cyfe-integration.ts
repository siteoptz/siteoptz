// lib/cyfe-integration.ts
// Cyfe.com Push API integration for white label dashboards

export interface CyfeConfig {
  apiKey: string;
  baseUrl: string;
}

export interface CyfeWidget {
  widget_id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'gauge';
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

export class CyfeIntegration {
  private config: CyfeConfig;

  constructor(config: CyfeConfig) {
    this.config = config;
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
  baseUrl: process.env.CYFE_BASE_URL || 'https://api.cyfe.com'
});

// Predefined widget configurations for common marketing metrics
export const MARKETING_WIDGETS = {
  TOTAL_SPEND: {
    title: 'Total Ad Spend',
    type: 'metric' as const,
  },
  ROAS: {
    title: 'Return on Ad Spend',
    type: 'gauge' as const,
  },
  CLICKS_CHART: {
    title: 'Clicks Over Time',
    type: 'chart' as const,
  },
  CAMPAIGN_PERFORMANCE: {
    title: 'Campaign Performance',
    type: 'table' as const,
  },
  CONVERSION_RATE: {
    title: 'Conversion Rate',
    type: 'metric' as const,
  },
  COST_PER_CLICK: {
    title: 'Cost Per Click',
    type: 'metric' as const,
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