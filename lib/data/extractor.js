// lib/data/extractor.js
import { GoogleAdsExtractor } from '../integrations/google/ads-extractor';
import { GA4Extractor } from '../integrations/google/analytics-extractor';
import { GSCExtractor } from '../integrations/google/search-console-extractor';
import { MetaExtractor } from '../integrations/meta/ads-extractor';
import { TikTokExtractor } from '../integrations/tiktok/ads-extractor';
import { LinkedInExtractor } from '../integrations/linkedin/ads-extractor';

export class DataExtractor {
  constructor() {
    this.extractors = {
      google_ads: new GoogleAdsExtractor(),
      ga4: new GA4Extractor(),
      google_search_console: new GSCExtractor(),
      meta: new MetaExtractor(),
      tiktok: new TikTokExtractor(),
      linkedin: new LinkedInExtractor()
    };
    
    this.defaultMetrics = {
      google_ads: ['impressions', 'clicks', 'cost', 'conversions', 'conversion_value'],
      ga4: ['sessions', 'users', 'page_views', 'bounce_rate', 'session_duration'],
      google_search_console: ['clicks', 'impressions', 'ctr', 'position'],
      meta: ['impressions', 'clicks', 'spend', 'conversions', 'conversion_value'],
      tiktok: ['impressions', 'clicks', 'spend', 'conversions', 'conversion_rate'],
      linkedin: ['impressions', 'clicks', 'spend', 'conversions', 'ctr']
    };
  }

  async extractData(platform, accountId, dateRange, options = {}) {
    const extractor = this.extractors[platform];
    if (!extractor) {
      throw new Error(`No extractor found for platform: ${platform}`);
    }

    try {
      console.log(`Starting data extraction for ${platform} account ${accountId}`);
      
      const extractionConfig = {
        accountId,
        dateRange: this.normalizeDateRange(dateRange),
        metrics: options.metrics || this.defaultMetrics[platform],
        dimensions: options.dimensions || extractor.getDefaultDimensions(),
        filters: options.filters || {},
        maxRows: options.maxRows || 10000
      };

      const rawData = await extractor.extract(extractionConfig);
      const processedData = await this.processRawData(rawData, platform, extractionConfig);
      
      console.log(`Extracted ${processedData.length} data points for ${platform}`);
      return processedData;
    } catch (error) {
      console.error(`Data extraction failed for ${platform}:`, error);
      throw new Error(`Failed to extract data from ${platform}: ${error.message}`);
    }
  }

  async extractAllPlatforms(userId, dateRange, options = {}) {
    // Get all connected accounts for user
    const connectedAccounts = await this.getConnectedAccounts(userId);
    
    const extractionPromises = connectedAccounts.map(async (account) => {
      try {
        const data = await this.extractData(
          account.platform,
          account.account_id,
          dateRange,
          options[account.platform] || {}
        );
        
        return {
          platform: account.platform,
          accountId: account.account_id,
          accountName: account.account_name,
          data,
          success: true
        };
      } catch (error) {
        console.error(`Failed to extract data for ${account.platform}:`, error);
        return {
          platform: account.platform,
          accountId: account.account_id,
          accountName: account.account_name,
          data: [],
          success: false,
          error: error.message
        };
      }
    });

    const results = await Promise.allSettled(extractionPromises);
    
    return results.map(result => 
      result.status === 'fulfilled' ? result.value : {
        success: false,
        error: result.reason.message
      }
    );
  }

  async processRawData(rawData, platform, config) {
    if (!Array.isArray(rawData)) {
      rawData = [rawData];
    }

    return rawData.map(item => ({
      platform,
      account_id: config.accountId,
      date: this.normalizeDate(item.date),
      metrics: this.normalizeMetrics(item.metrics || item, platform),
      dimensions: this.normalizeDimensions(item.dimensions || {}, platform),
      extracted_at: new Date().toISOString(),
      raw_data: config.includeRawData ? item : undefined
    }));
  }

  normalizeMetrics(metrics, platform) {
    const normalized = {};
    
    // Platform-specific metric normalization
    switch (platform) {
      case 'google_ads':
        normalized.impressions = parseFloat(metrics.impressions || metrics.Impressions || 0);
        normalized.clicks = parseFloat(metrics.clicks || metrics.Clicks || 0);
        normalized.cost = parseFloat(metrics.cost || metrics.Cost || 0) / 1000000; // Google Ads returns micros
        normalized.conversions = parseFloat(metrics.conversions || metrics.Conversions || 0);
        normalized.conversion_value = parseFloat(metrics.conversion_value || metrics.ConversionValue || 0) / 1000000;
        break;
        
      case 'meta':
        normalized.impressions = parseFloat(metrics.impressions || 0);
        normalized.clicks = parseFloat(metrics.clicks || 0);
        normalized.spend = parseFloat(metrics.spend || 0);
        normalized.conversions = parseFloat(metrics.conversions || 0);
        normalized.conversion_value = parseFloat(metrics.conversion_value || 0);
        break;
        
      case 'tiktok':
        normalized.impressions = parseFloat(metrics.impressions || 0);
        normalized.clicks = parseFloat(metrics.clicks || 0);
        normalized.spend = parseFloat(metrics.spend || 0);
        normalized.conversions = parseFloat(metrics.conversions || 0);
        normalized.conversion_rate = parseFloat(metrics.conversion_rate || 0);
        break;
        
      case 'linkedin':
        normalized.impressions = parseFloat(metrics.impressions || 0);
        normalized.clicks = parseFloat(metrics.clicks || 0);
        normalized.spend = parseFloat(metrics.costInLocalCurrency || metrics.spend || 0);
        normalized.conversions = parseFloat(metrics.conversions || 0);
        normalized.ctr = parseFloat(metrics.ctr || 0);
        break;
        
      case 'ga4':
        normalized.sessions = parseFloat(metrics.sessions || 0);
        normalized.users = parseFloat(metrics.users || 0);
        normalized.page_views = parseFloat(metrics.pageviews || metrics.page_views || 0);
        normalized.bounce_rate = parseFloat(metrics.bounceRate || metrics.bounce_rate || 0);
        normalized.session_duration = parseFloat(metrics.avgSessionDuration || metrics.session_duration || 0);
        break;
        
      case 'google_search_console':
        normalized.clicks = parseFloat(metrics.clicks || 0);
        normalized.impressions = parseFloat(metrics.impressions || 0);
        normalized.ctr = parseFloat(metrics.ctr || 0);
        normalized.position = parseFloat(metrics.position || 0);
        break;
        
      default:
        // Generic normalization
        for (const [key, value] of Object.entries(metrics)) {
          normalized[key] = isNaN(parseFloat(value)) ? value : parseFloat(value);
        }
    }

    // Calculate derived metrics
    if (normalized.clicks && normalized.impressions) {
      normalized.ctr = normalized.ctr || (normalized.clicks / normalized.impressions) * 100;
    }
    
    if (normalized.cost && normalized.clicks) {
      normalized.cpc = normalized.cost / normalized.clicks;
    }
    
    if (normalized.cost && normalized.conversions) {
      normalized.cost_per_conversion = normalized.cost / normalized.conversions;
    }
    
    if (normalized.conversion_value && normalized.cost) {
      normalized.roas = normalized.conversion_value / normalized.cost;
    }

    return normalized;
  }

  normalizeDimensions(dimensions, platform) {
    const normalized = {};
    
    // Common dimension normalizations
    if (dimensions.campaign_name || dimensions.campaignName) {
      normalized.campaign_name = dimensions.campaign_name || dimensions.campaignName;
    }
    
    if (dimensions.ad_group_name || dimensions.adgroupName) {
      normalized.ad_group_name = dimensions.ad_group_name || dimensions.adgroupName;
    }
    
    if (dimensions.keyword || dimensions.query) {
      normalized.keyword = dimensions.keyword || dimensions.query;
    }
    
    if (dimensions.device || dimensions.deviceType) {
      normalized.device = dimensions.device || dimensions.deviceType;
    }
    
    // Platform-specific dimension handling
    switch (platform) {
      case 'google_ads':
        if (dimensions.AdNetworkType) normalized.network = dimensions.AdNetworkType;
        if (dimensions.Device) normalized.device = dimensions.Device;
        break;
        
      case 'meta':
        if (dimensions.platform_position) normalized.placement = dimensions.platform_position;
        if (dimensions.age) normalized.age_range = dimensions.age;
        if (dimensions.gender) normalized.gender = dimensions.gender;
        break;
        
      case 'ga4':
        if (dimensions.source) normalized.traffic_source = dimensions.source;
        if (dimensions.medium) normalized.traffic_medium = dimensions.medium;
        if (dimensions.pagePath) normalized.page_path = dimensions.pagePath;
        break;
    }
    
    return normalized;
  }

  normalizeDateRange(dateRange) {
    if (typeof dateRange === 'string') {
      // Handle preset ranges
      const presets = {
        'today': { start: new Date(), end: new Date() },
        'yesterday': this.getYesterday(),
        'last_7_days': this.getLastNDays(7),
        'last_30_days': this.getLastNDays(30),
        'last_90_days': this.getLastNDays(90),
        'this_month': this.getThisMonth(),
        'last_month': this.getLastMonth()
      };
      
      return presets[dateRange] || this.getLastNDays(7);
    }
    
    return {
      start: new Date(dateRange.start),
      end: new Date(dateRange.end)
    };
  }

  normalizeDate(date) {
    if (!date) return new Date().toISOString().split('T')[0];
    
    if (typeof date === 'string') {
      // Handle various date formats
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return date; // Already in YYYY-MM-DD format
      }
      return new Date(date).toISOString().split('T')[0];
    }
    
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    
    return new Date().toISOString().split('T')[0];
  }

  getYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return { start: yesterday, end: yesterday };
  }

  getLastNDays(n) {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - n);
    return { start, end };
  }

  getThisMonth() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return { start, end: now };
  }

  getLastMonth() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 0);
    return { start, end };
  }

  async getConnectedAccounts(userId) {
    // This would query your database for connected accounts
    // For now, return empty array
    return [];
  }
}

export default DataExtractor;