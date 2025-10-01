const axios = require('axios');
const { GoogleAuth } = require('google-auth-library');

class PlatformIntegrations {
  constructor() {
    this.platforms = {
      google_ads: {
        name: 'Google Ads',
        baseUrl: 'https://googleads.googleapis.com/v14',
        authUrl: 'https://accounts.google.com/o/oauth2/auth',
        scope: 'https://www.googleapis.com/auth/adwords'
      },
      google_analytics: {
        name: 'Google Analytics',
        baseUrl: 'https://analyticsreporting.googleapis.com/v4',
        authUrl: 'https://accounts.google.com/o/oauth2/auth',
        scope: 'https://www.googleapis.com/auth/analytics.readonly'
      },
      meta_ads: {
        name: 'Meta Ads',
        baseUrl: 'https://graph.facebook.com/v18.0',
        authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
        scope: 'ads_read,ads_management'
      },
      tiktok_ads: {
        name: 'TikTok Ads',
        baseUrl: 'https://business-api.tiktok.com/open_api/v1.3',
        authUrl: 'https://ads.tiktok.com/marketing_api/auth',
        scope: 'user.info,campaign.list,adgroup.list,ad.list,reporting.list'
      }
    };
  }

  // Generate OAuth URL for platform connection
  generateAuthUrl(platform, userId, redirectUri) {
    const platformConfig = this.platforms[platform];
    if (!platformConfig) {
      throw new Error('Unsupported platform');
    }

    const clientId = process.env[`${platform.toUpperCase()}_CLIENT_ID`];
    const state = Buffer.from(JSON.stringify({ userId, platform })).toString('base64');

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: platformConfig.scope,
      response_type: 'code',
      state: state,
      access_type: 'offline'
    });

    return `${platformConfig.authUrl}?${params.toString()}`;
  }

  // Exchange authorization code for access token
  async exchangeCodeForToken(platform, code, redirectUri) {
    const platformConfig = this.platforms[platform];
    const clientId = process.env[`${platform.toUpperCase()}_CLIENT_ID`];
    const clientSecret = process.env[`${platform.toUpperCase()}_CLIENT_SECRET`];

    let tokenUrl = '';
    let tokenData = {};

    switch (platform) {
      case 'google_ads':
      case 'google_analytics':
        tokenUrl = 'https://oauth2.googleapis.com/token';
        tokenData = {
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri
        };
        break;
      case 'meta_ads':
        tokenUrl = 'https://graph.facebook.com/v18.0/oauth/access_token';
        tokenData = {
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          redirect_uri: redirectUri
        };
        break;
      case 'tiktok_ads':
        tokenUrl = 'https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/';
        tokenData = {
          app_id: clientId,
          secret: clientSecret,
          auth_code: code
        };
        break;
    }

    try {
      const response = await axios.post(tokenUrl, tokenData);
      return response.data;
    } catch (error) {
      throw new Error(`Token exchange failed: ${error.message}`);
    }
  }

  // Fetch campaign data from Google Ads
  async fetchGoogleAdsCampaigns(accessToken, customerId) {
    try {
      const response = await axios.post(
        `${this.platforms.google_ads.baseUrl}/customers/${customerId}/googleAds:searchStream`,
        {
          query: `
            SELECT 
              campaign.id,
              campaign.name,
              campaign.status,
              campaign.advertising_channel_type,
              metrics.impressions,
              metrics.clicks,
              metrics.conversions,
              metrics.cost_micros,
              metrics.conversions_value
            FROM campaign 
            WHERE segments.date DURING LAST_30_DAYS
          `
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
            'Content-Type': 'application/json'
          }
        }
      );

      return this.transformGoogleAdsData(response.data);
    } catch (error) {
      console.error('Google Ads fetch error:', error.response?.data || error.message);
      throw new Error('Failed to fetch Google Ads data');
    }
  }

  // Fetch campaign data from Meta Ads
  async fetchMetaAdsCampaigns(accessToken, adAccountId) {
    try {
      const response = await axios.get(
        `${this.platforms.meta_ads.baseUrl}/${adAccountId}/campaigns`,
        {
          params: {
            fields: 'id,name,status,objective,insights{impressions,clicks,actions,spend,actions}',
            time_range: JSON.stringify({
              since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              until: new Date().toISOString().split('T')[0]
            }),
            access_token: accessToken
          }
        }
      );

      return this.transformMetaAdsData(response.data.data);
    } catch (error) {
      console.error('Meta Ads fetch error:', error.response?.data || error.message);
      throw new Error('Failed to fetch Meta Ads data');
    }
  }

  // Fetch campaign data from TikTok Ads
  async fetchTikTokAdsCampaigns(accessToken, advertiserId) {
    try {
      const response = await axios.get(
        `${this.platforms.tiktok_ads.baseUrl}/campaign/get/`,
        {
          params: {
            advertiser_id: advertiserId,
            fields: JSON.stringify(['campaign_id', 'campaign_name', 'campaign_type', 'status'])
          },
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Get campaign insights
      const campaignIds = response.data.data.list.map(c => c.campaign_id);
      const insights = await this.fetchTikTokInsights(accessToken, advertiserId, campaignIds);

      return this.transformTikTokAdsData(response.data.data.list, insights);
    } catch (error) {
      console.error('TikTok Ads fetch error:', error.response?.data || error.message);
      throw new Error('Failed to fetch TikTok Ads data');
    }
  }

  // Fetch Google Analytics data
  async fetchGoogleAnalyticsData(accessToken, viewId) {
    try {
      const response = await axios.post(
        `${this.platforms.google_analytics.baseUrl}/reports:batchGet`,
        {
          reportRequests: [{
            viewId: viewId,
            dateRanges: [{
              startDate: '30daysAgo',
              endDate: 'today'
            }],
            metrics: [
              { expression: 'ga:sessions' },
              { expression: 'ga:users' },
              { expression: 'ga:pageviews' },
              { expression: 'ga:goalConversionsAll' },
              { expression: 'ga:goalValueAll' }
            ],
            dimensions: [
              { name: 'ga:source' },
              { name: 'ga:medium' },
              { name: 'ga:campaign' }
            ]
          }]
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return this.transformGoogleAnalyticsData(response.data.reports[0]);
    } catch (error) {
      console.error('Google Analytics fetch error:', error.response?.data || error.message);
      throw new Error('Failed to fetch Google Analytics data');
    }
  }

  // Transform Google Ads data to standard format
  transformGoogleAdsData(rawData) {
    return rawData.results?.map(result => ({
      campaignId: result.campaign.id,
      name: result.campaign.name,
      status: result.campaign.status,
      channel: 'Google Ads',
      type: result.campaign.advertisingChannelType,
      impressions: parseInt(result.metrics.impressions) || 0,
      clicks: parseInt(result.metrics.clicks) || 0,
      conversions: parseFloat(result.metrics.conversions) || 0,
      cost: (parseInt(result.metrics.costMicros) || 0) / 1000000,
      revenue: parseFloat(result.metrics.conversionsValue) || 0,
      date: new Date().toISOString().split('T')[0]
    })) || [];
  }

  // Transform Meta Ads data to standard format
  transformMetaAdsData(rawData) {
    return rawData.map(campaign => {
      const insights = campaign.insights?.data?.[0] || {};
      const conversions = insights.actions?.find(action => 
        action.action_type === 'purchase' || action.action_type === 'lead'
      )?.value || 0;

      return {
        campaignId: campaign.id,
        name: campaign.name,
        status: campaign.status,
        channel: 'Meta Ads',
        type: campaign.objective,
        impressions: parseInt(insights.impressions) || 0,
        clicks: parseInt(insights.clicks) || 0,
        conversions: parseFloat(conversions),
        cost: parseFloat(insights.spend) || 0,
        revenue: 0, // Meta doesn't provide revenue directly
        date: new Date().toISOString().split('T')[0]
      };
    });
  }

  // Transform TikTok Ads data to standard format
  transformTikTokAdsData(campaigns, insights) {
    return campaigns.map(campaign => {
      const campaignInsights = insights.find(i => i.campaign_id === campaign.campaign_id) || {};

      return {
        campaignId: campaign.campaign_id,
        name: campaign.campaign_name,
        status: campaign.status,
        channel: 'TikTok Ads',
        type: campaign.campaign_type,
        impressions: parseInt(campaignInsights.impressions) || 0,
        clicks: parseInt(campaignInsights.clicks) || 0,
        conversions: parseFloat(campaignInsights.conversions) || 0,
        cost: parseFloat(campaignInsights.spend) || 0,
        revenue: 0, // TikTok doesn't provide revenue directly
        date: new Date().toISOString().split('T')[0]
      };
    });
  }

  // Transform Google Analytics data to standard format
  transformGoogleAnalyticsData(report) {
    const rows = report.data?.rows || [];
    
    return rows.map(row => ({
      source: row.dimensions[0],
      medium: row.dimensions[1],
      campaign: row.dimensions[2],
      sessions: parseInt(row.metrics[0].values[0]) || 0,
      users: parseInt(row.metrics[0].values[1]) || 0,
      pageviews: parseInt(row.metrics[0].values[2]) || 0,
      conversions: parseFloat(row.metrics[0].values[3]) || 0,
      revenue: parseFloat(row.metrics[0].values[4]) || 0,
      date: new Date().toISOString().split('T')[0]
    }));
  }

  // Generate AI-powered insights and recommendations
  generateInsights(campaignData) {
    const insights = [];
    const recommendations = [];

    // Calculate overall metrics
    const totalSpend = campaignData.reduce((sum, c) => sum + c.cost, 0);
    const totalRevenue = campaignData.reduce((sum, c) => sum + c.revenue, 0);
    const totalConversions = campaignData.reduce((sum, c) => sum + c.conversions, 0);
    const overallROI = totalSpend > 0 ? ((totalRevenue - totalSpend) / totalSpend * 100) : 0;

    // Performance insights
    if (overallROI > 200) {
      insights.push({
        type: 'success',
        title: 'Excellent ROI Performance',
        message: `Your campaigns are generating ${overallROI.toFixed(1)}% ROI, significantly above industry average.`,
        impact: 'high'
      });
    } else if (overallROI < 50) {
      insights.push({
        type: 'warning',
        title: 'ROI Below Expectations',
        message: `Current ROI of ${overallROI.toFixed(1)}% is below optimal levels.`,
        impact: 'high'
      });
    }

    // Channel performance analysis
    const channelPerformance = this.analyzeChannelPerformance(campaignData);
    const bestChannel = channelPerformance.reduce((best, current) => 
      current.roi > best.roi ? current : best
    );

    if (bestChannel.roi > 100) {
      recommendations.push({
        type: 'optimization',
        title: 'Scale Top Performing Channel',
        message: `${bestChannel.channel} is delivering ${bestChannel.roi.toFixed(1)}% ROI. Consider increasing budget allocation.`,
        priority: 'high',
        expectedImpact: '+25-40% revenue increase'
      });
    }

    // Cost efficiency recommendations
    const highCostCampaigns = campaignData
      .filter(c => c.cost > 0 && c.conversions > 0)
      .map(c => ({ ...c, cpa: c.cost / c.conversions }))
      .filter(c => c.cpa > 50)
      .sort((a, b) => b.cpa - a.cpa);

    if (highCostCampaigns.length > 0) {
      recommendations.push({
        type: 'cost_optimization',
        title: 'Reduce High-Cost Campaigns',
        message: `${highCostCampaigns.length} campaigns have CPA above $50. Optimize targeting and creative.`,
        priority: 'medium',
        expectedImpact: '-20-30% acquisition costs'
      });
    }

    return { insights, recommendations };
  }

  analyzeChannelPerformance(campaignData) {
    const channelStats = {};

    campaignData.forEach(campaign => {
      if (!channelStats[campaign.channel]) {
        channelStats[campaign.channel] = {
          channel: campaign.channel,
          totalCost: 0,
          totalRevenue: 0,
          totalConversions: 0,
          campaignCount: 0
        };
      }

      channelStats[campaign.channel].totalCost += campaign.cost;
      channelStats[campaign.channel].totalRevenue += campaign.revenue;
      channelStats[campaign.channel].totalConversions += campaign.conversions;
      channelStats[campaign.channel].campaignCount += 1;
    });

    return Object.values(channelStats).map(stats => ({
      ...stats,
      roi: stats.totalCost > 0 ? ((stats.totalRevenue - stats.totalCost) / stats.totalCost * 100) : 0,
      roas: stats.totalCost > 0 ? (stats.totalRevenue / stats.totalCost) : 0,
      avgCpa: stats.totalConversions > 0 ? (stats.totalCost / stats.totalConversions) : 0
    }));
  }
}

module.exports = new PlatformIntegrations();