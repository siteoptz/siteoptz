// lib/google-ads-api.ts
// Google Ads API integration with MCC support

// Dynamic import to prevent client-side compilation issues  
let GoogleAdsApi: any = null;
let Customer: any = null;

// Initialize Google Ads API only on server-side
const initGoogleAdsLibrary = async () => {
  if (typeof window === 'undefined' && !GoogleAdsApi) {
    try {
      const googleAdsModule = await import('google-ads-api');
      GoogleAdsApi = googleAdsModule.GoogleAdsApi;
      Customer = googleAdsModule.Customer;
      console.log('Google Ads API library loaded successfully');
    } catch (error) {
      console.error('Failed to load Google Ads API:', error);
      throw error;
    }
  }
};

export interface GoogleAdsAccount {
  customer_id: string;
  descriptive_name: string;
  currency_code: string;
  time_zone: string;
  manager: boolean;
  test_account: boolean;
  pay_per_conversion_eligibility_failure_reasons: string[];
}

export interface GoogleAdsCampaign {
  id: string;
  name: string;
  status: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cost_per_conversion: number;
  conversion_rate: number;
  ctr: number;
  cpc: number;
  cpm: number;
  roas: number;
}

export interface GoogleAdsMetrics {
  total_spend: number;
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  average_cpc: number;
  average_cpm: number;
  average_ctr: number;
  average_conversion_rate: number;
  total_roas: number;
  cost_per_conversion: number;
}

class GoogleAdsService {
  private client: any = null;
  private customer: any = null;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private developerToken: string;
  private loginCustomerId: string | null = null;

  constructor() {
    this.developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '';
    this.loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || null;
  }

  // Initialize the Google Ads API client
  async initialize(accessToken: string, refreshToken?: string, customerId?: string) {
    try {
      // Ensure we're on server-side and library is loaded
      await initGoogleAdsLibrary();
      
      if (!GoogleAdsApi) {
        throw new Error('Google Ads API library not available');
      }
      
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      
      this.client = new GoogleAdsApi({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        developer_token: this.developerToken,
      });

      // Set the customer ID (either provided or from environment)
      const targetCustomerId = customerId || this.loginCustomerId;
      
      if (targetCustomerId) {
        this.customer = this.client.Customer({
          customer_id: targetCustomerId,
          login_customer_id: this.loginCustomerId,
          refresh_token: refreshToken,
        });
      }

      console.log('Google Ads API initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize Google Ads API:', error);
      throw error;
    }
  }

  // Get all accessible accounts (including MCC accounts)
  async getAccessibleAccounts(): Promise<GoogleAdsAccount[]> {
    if (!this.client) {
      throw new Error('Google Ads API not initialized');
    }

    try {
      const customer = this.client.Customer({
        customer_id: this.loginCustomerId || '0', // Use 0 for root account
        login_customer_id: this.loginCustomerId,
        refresh_token: this.refreshToken,
      });

      const query = `
        SELECT 
          customer_client.id,
          customer_client.descriptive_name,
          customer_client.currency_code,
          customer_client.time_zone,
          customer_client.manager,
          customer_client.test_account,
          customer_client.pay_per_conversion_eligibility_failure_reasons
        FROM customer_client
        WHERE customer_client.status = 'ENABLED'
      `;

      const response = await customer.query(query);
      
      const accounts: GoogleAdsAccount[] = response.map((row: any) => ({
        customer_id: row.customer_client.id.toString(),
        descriptive_name: row.customer_client.descriptive_name,
        currency_code: row.customer_client.currency_code,
        time_zone: row.customer_client.time_zone,
        manager: row.customer_client.manager,
        test_account: row.customer_client.test_account,
        pay_per_conversion_eligibility_failure_reasons: row.customer_client.pay_per_conversion_eligibility_failure_reasons || []
      }));

      console.log(`Found ${accounts.length} accessible accounts`);
      return accounts;
    } catch (error) {
      console.error('Failed to get accessible accounts:', error);
      throw error;
    }
  }

  // Switch to a specific customer account
  async switchToCustomer(customerId: string) {
    if (!this.client) {
      throw new Error('Google Ads API not initialized');
    }

    try {
      // Ensure library is loaded
      await initGoogleAdsLibrary();
      
      this.customer = this.client.Customer({
        customer_id: customerId,
        login_customer_id: this.loginCustomerId,
        refresh_token: this.refreshToken,
      });

      console.log(`Switched to customer account: ${customerId}`);
      return true;
    } catch (error) {
      console.error(`Failed to switch to customer ${customerId}:`, error);
      throw error;
    }
  }

  // Get campaign performance data
  async getCampaignPerformance(dateRange: string = 'LAST_30_DAYS'): Promise<GoogleAdsCampaign[]> {
    if (!this.customer) {
      throw new Error('No customer account selected');
    }

    try {
      const query = `
        SELECT 
          campaign.id,
          campaign.name,
          campaign.status,
          campaign_budget.amount_micros,
          metrics.cost_micros,
          metrics.impressions,
          metrics.clicks,
          metrics.conversions,
          metrics.cost_per_conversion,
          metrics.conversions_from_interactions_rate,
          metrics.ctr,
          metrics.average_cpc,
          metrics.average_cpm,
          metrics.value_per_conversion,
          metrics.conversions_value
        FROM campaign
        WHERE segments.date DURING ${dateRange}
        AND campaign.status IN ('ENABLED', 'PAUSED')
        ORDER BY metrics.cost_micros DESC
      `;

      const response = await this.customer.query(query);
      
      const campaigns: GoogleAdsCampaign[] = response.map((row: any) => {
        const budget = row.campaign_budget?.amount_micros ? row.campaign_budget.amount_micros / 1000000 : 0;
        const spent = row.metrics?.cost_micros ? row.metrics.cost_micros / 1000000 : 0;
        const conversions = row.metrics?.conversions || 0;
        const conversionsValue = row.metrics?.conversions_value || 0;
        
        return {
          id: row.campaign.id.toString(),
          name: row.campaign.name,
          status: row.campaign.status,
          budget,
          spent,
          impressions: row.metrics?.impressions || 0,
          clicks: row.metrics?.clicks || 0,
          conversions,
          cost_per_conversion: row.metrics?.cost_per_conversion ? row.metrics.cost_per_conversion / 1000000 : 0,
          conversion_rate: row.metrics?.conversions_from_interactions_rate || 0,
          ctr: row.metrics?.ctr || 0,
          cpc: row.metrics?.average_cpc ? row.metrics.average_cpc / 1000000 : 0,
          cpm: row.metrics?.average_cpm ? row.metrics.average_cpm / 1000000 : 0,
          roas: conversionsValue > 0 ? conversionsValue / spent : 0
        };
      });

      console.log(`Retrieved ${campaigns.length} campaigns`);
      return campaigns;
    } catch (error) {
      console.error('Failed to get campaign performance:', error);
      throw error;
    }
  }

  // Get overall account metrics
  async getAccountMetrics(dateRange: string = 'LAST_30_DAYS'): Promise<GoogleAdsMetrics> {
    if (!this.customer) {
      throw new Error('No customer account selected');
    }

    try {
      const query = `
        SELECT 
          metrics.cost_micros,
          metrics.impressions,
          metrics.clicks,
          metrics.conversions,
          metrics.average_cpc,
          metrics.average_cpm,
          metrics.ctr,
          metrics.conversions_from_interactions_rate,
          metrics.value_per_conversion,
          metrics.conversions_value
        FROM campaign
        WHERE segments.date DURING ${dateRange}
        AND campaign.status IN ('ENABLED', 'PAUSED')
      `;

      const response = await this.customer.query(query);
      
      // Aggregate metrics across all campaigns
      const metrics = response.reduce((acc: any, row: any) => {
        acc.total_spend += row.metrics?.cost_micros ? row.metrics.cost_micros / 1000000 : 0;
        acc.total_impressions += row.metrics?.impressions || 0;
        acc.total_clicks += row.metrics?.clicks || 0;
        acc.total_conversions += row.metrics?.conversions || 0;
        acc.total_conversions_value += row.metrics?.conversions_value || 0;
        return acc;
      }, {
        total_spend: 0,
        total_impressions: 0,
        total_clicks: 0,
        total_conversions: 0,
        total_conversions_value: 0
      });

      const result: GoogleAdsMetrics = {
        total_spend: metrics.total_spend,
        total_impressions: metrics.total_impressions,
        total_clicks: metrics.total_clicks,
        total_conversions: metrics.total_conversions,
        average_cpc: metrics.total_clicks > 0 ? metrics.total_spend / metrics.total_clicks : 0,
        average_cpm: metrics.total_impressions > 0 ? (metrics.total_spend / metrics.total_impressions) * 1000 : 0,
        average_ctr: metrics.total_impressions > 0 ? (metrics.total_clicks / metrics.total_impressions) * 100 : 0,
        average_conversion_rate: metrics.total_clicks > 0 ? (metrics.total_conversions / metrics.total_clicks) * 100 : 0,
        total_roas: metrics.total_spend > 0 ? metrics.total_conversions_value / metrics.total_spend : 0,
        cost_per_conversion: metrics.total_conversions > 0 ? metrics.total_spend / metrics.total_conversions : 0
      };

      console.log('Retrieved account metrics:', result);
      return result;
    } catch (error) {
      console.error('Failed to get account metrics:', error);
      throw error;
    }
  }

  // Get keyword performance data
  async getKeywordPerformance(dateRange: string = 'LAST_30_DAYS'): Promise<any[]> {
    if (!this.customer) {
      throw new Error('No customer account selected');
    }

    try {
      const query = `
        SELECT 
          ad_group_criterion.keyword.text,
          ad_group_criterion.keyword.match_type,
          ad_group.name,
          campaign.name,
          metrics.cost_micros,
          metrics.impressions,
          metrics.clicks,
          metrics.conversions,
          metrics.ctr,
          metrics.average_cpc,
          metrics.conversions_from_interactions_rate
        FROM keyword_view
        WHERE segments.date DURING ${dateRange}
        AND ad_group_criterion.status = 'ENABLED'
        ORDER BY metrics.cost_micros DESC
        LIMIT 100
      `;

      const response = await this.customer.query(query);
      
      const keywords = response.map((row: any) => ({
        keyword: row.ad_group_criterion.keyword.text,
        match_type: row.ad_group_criterion.keyword.match_type,
        ad_group: row.ad_group.name,
        campaign: row.campaign.name,
        cost: row.metrics?.cost_micros ? row.metrics.cost_micros / 1000000 : 0,
        impressions: row.metrics?.impressions || 0,
        clicks: row.metrics?.clicks || 0,
        conversions: row.metrics?.conversions || 0,
        ctr: row.metrics?.ctr || 0,
        cpc: row.metrics?.average_cpc ? row.metrics.average_cpc / 1000000 : 0,
        conversion_rate: row.metrics?.conversions_from_interactions_rate || 0
      }));

      console.log(`Retrieved ${keywords.length} keywords`);
      return keywords;
    } catch (error) {
      console.error('Failed to get keyword performance:', error);
      throw error;
    }
  }

  // Get ad group performance data
  async getAdGroupPerformance(dateRange: string = 'LAST_30_DAYS'): Promise<any[]> {
    if (!this.customer) {
      throw new Error('No customer account selected');
    }

    try {
      const query = `
        SELECT 
          ad_group.id,
          ad_group.name,
          campaign.name,
          metrics.cost_micros,
          metrics.impressions,
          metrics.clicks,
          metrics.conversions,
          metrics.ctr,
          metrics.average_cpc,
          metrics.conversions_from_interactions_rate
        FROM ad_group
        WHERE segments.date DURING ${dateRange}
        AND ad_group.status = 'ENABLED'
        ORDER BY metrics.cost_micros DESC
      `;

      const response = await this.customer.query(query);
      
      const adGroups = response.map((row: any) => ({
        id: row.ad_group.id.toString(),
        name: row.ad_group.name,
        campaign: row.campaign.name,
        cost: row.metrics?.cost_micros ? row.metrics.cost_micros / 1000000 : 0,
        impressions: row.metrics?.impressions || 0,
        clicks: row.metrics?.clicks || 0,
        conversions: row.metrics?.conversions || 0,
        ctr: row.metrics?.ctr || 0,
        cpc: row.metrics?.average_cpc ? row.metrics.average_cpc / 1000000 : 0,
        conversion_rate: row.metrics?.conversions_from_interactions_rate || 0
      }));

      console.log(`Retrieved ${adGroups.length} ad groups`);
      return adGroups;
    } catch (error) {
      console.error('Failed to get ad group performance:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const googleAdsService = new GoogleAdsService();

// Helper functions for API integration
export const initializeGoogleAds = async (accessToken: string, refreshToken?: string, customerId?: string) => {
  return await googleAdsService.initialize(accessToken, refreshToken, customerId);
};

export const getGoogleAdsAccounts = async (): Promise<GoogleAdsAccount[]> => {
  return await googleAdsService.getAccessibleAccounts();
};

export const switchGoogleAdsAccount = async (customerId: string) => {
  return await googleAdsService.switchToCustomer(customerId);
};

export const getGoogleAdsCampaigns = async (dateRange?: string): Promise<GoogleAdsCampaign[]> => {
  return await googleAdsService.getCampaignPerformance(dateRange);
};

export const getGoogleAdsMetrics = async (dateRange?: string): Promise<GoogleAdsMetrics> => {
  return await googleAdsService.getAccountMetrics(dateRange);
};

export const getGoogleAdsKeywords = async (dateRange?: string) => {
  return await googleAdsService.getKeywordPerformance(dateRange);
};

export const getGoogleAdsAdGroups = async (dateRange?: string) => {
  return await googleAdsService.getAdGroupPerformance(dateRange);
};

