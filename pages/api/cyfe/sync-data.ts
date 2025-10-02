// pages/api/cyfe/sync-data.ts
// API endpoint to sync Google Ads data to Cyfe dashboard

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { CyfeIntegration, getDefaultCyfeConfig, syncGoogleAdsDataToCyfe } from '@/lib/cyfe-integration';

interface SyncDataRequest {
  dashboardData: {
    totalSpend: number;
    roas: number;
    clicks: number;
    conversions: number;
    costPerClick: number;
    conversionRate: number;
    campaigns: Array<{
      name: string;
      spent: number;
      clicks: number;
      roas: number;
      status: string;
    }>;
  };
  userEmail: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session || !session.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { dashboardData, userEmail }: SyncDataRequest = req.body;

    if (!dashboardData || !userEmail) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    // Initialize Cyfe integration
    const cyfeConfig = getDefaultCyfeConfig();
    
    if (!cyfeConfig.apiKey) {
      return res.status(500).json({ 
        error: 'Cyfe API key not configured. Please set CYFE_API_KEY environment variable.' 
      });
    }

    const cyfe = new CyfeIntegration(cyfeConfig);

    // Example widget mapping - in production, these would be stored per user
    const widgetMapping = {
      TOTAL_SPEND: process.env.CYFE_TOTAL_SPEND_WIDGET_ID || 'demo-total-spend',
      ROAS: process.env.CYFE_ROAS_WIDGET_ID || 'demo-roas',
      CLICKS_CHART: process.env.CYFE_CLICKS_CHART_WIDGET_ID || 'demo-clicks-chart',
      CAMPAIGN_PERFORMANCE: process.env.CYFE_CAMPAIGN_TABLE_WIDGET_ID || 'demo-campaign-table',
      CONVERSION_RATE: process.env.CYFE_CONVERSION_RATE_WIDGET_ID || 'demo-conversion-rate',
      COST_PER_CLICK: process.env.CYFE_CPC_WIDGET_ID || 'demo-cpc'
    };

    // Transform dashboard data to Google Ads format for compatibility with syncGoogleAdsDataToCyfe
    const googleAdsData = {
      metrics: {
        total_spend: dashboardData.totalSpend,
        total_roas: dashboardData.roas,
        total_clicks: dashboardData.clicks,
        total_conversions: dashboardData.conversions,
        cost_per_click: dashboardData.costPerClick,
        conversion_rate: dashboardData.conversionRate
      },
      campaigns: dashboardData.campaigns
    };

    // Sync data to Cyfe
    const syncResults = await syncGoogleAdsDataToCyfe(cyfe, googleAdsData, widgetMapping);

    // Additional individual metrics
    const additionalSyncs = [];

    // Sync conversion rate
    if (widgetMapping.CONVERSION_RATE) {
      try {
        const conversionResult = await cyfe.pushMetricData(widgetMapping.CONVERSION_RATE, {
          value: dashboardData.conversionRate,
          label: 'Conversion Rate (%)',
          timestamp: new Date().toISOString()
        });
        additionalSyncs.push({ widget: 'CONVERSION_RATE', result: conversionResult });
      } catch (error) {
        console.error('Error syncing conversion rate:', error);
      }
    }

    // Sync cost per click
    if (widgetMapping.COST_PER_CLICK) {
      try {
        const cpcResult = await cyfe.pushMetricData(widgetMapping.COST_PER_CLICK, {
          value: dashboardData.costPerClick,
          label: 'Cost Per Click ($)',
          timestamp: new Date().toISOString()
        });
        additionalSyncs.push({ widget: 'COST_PER_CLICK', result: cpcResult });
      } catch (error) {
        console.error('Error syncing cost per click:', error);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Data successfully synced to Cyfe dashboard',
      syncResults,
      additionalSyncs,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error syncing data to Cyfe:', error);
    return res.status(500).json({
      error: 'Failed to sync data to Cyfe',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}