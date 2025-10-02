// lib/clean-google-ads.ts
// Clean Google Ads integration without infinite loops

import { GoogleAdsAccount, GoogleAdsCampaign, GoogleAdsMetrics } from './google-ads-api';

export interface CleanGoogleAdsConnection {
  isConnected: boolean;
  selectedAccount?: GoogleAdsAccount;
  availableAccounts: GoogleAdsAccount[];
  lastSync?: string; // ISO string for JSON serialization
  error?: string;
}

export interface CleanGoogleAdsData {
  campaigns: GoogleAdsCampaign[];
  metrics: GoogleAdsMetrics;
  lastUpdated: string; // ISO string for JSON serialization
  dateRange: string;
}

// Server-side Google Ads data fetching (no client-side API calls)
export async function getGoogleAdsDataServerSide(
  userEmail: string,
  dateRange: string = 'LAST_30_DAYS'
): Promise<CleanGoogleAdsData | null> {
  try {
    // In a real implementation, this would:
    // 1. Check if user has Google Ads connected
    // 2. Get stored credentials from database
    // 3. Fetch data from Google Ads API
    // 4. Return the data
    
    // For now, return mock data
    return getMockGoogleAdsData(dateRange);
  } catch (error) {
    console.error('Error fetching Google Ads data:', error);
    return null;
  }
}

// Server-side Google Ads connection check
export async function getGoogleAdsConnectionServerSide(userEmail: string): Promise<CleanGoogleAdsConnection> {
  try {
    // In a real implementation, this would check the database for stored connections
    // For now, return mock connection status
    return getMockGoogleAdsConnection();
  } catch (error) {
    console.error('Error checking Google Ads connection:', error);
    return {
      isConnected: false,
      availableAccounts: [],
      error: 'Failed to check connection'
    };
  }
}

// Mock data for development (replace with real API calls)
function getMockGoogleAdsData(dateRange: string): CleanGoogleAdsData {
  return {
    campaigns: [
      {
        id: '123456789',
        name: 'Brand Awareness Campaign',
        status: 'ENABLED',
        budget: 1000,
        spent: 850,
        impressions: 125000,
        clicks: 3200,
        conversions: 45,
        cost_per_conversion: 18.89,
        conversion_rate: 1.41,
        ctr: 2.56,
        cpc: 0.27,
        cpm: 6.8,
        roas: 3.2
      },
      {
        id: '123456790',
        name: 'Conversion Campaign',
        status: 'ENABLED',
        budget: 2000,
        spent: 1650,
        impressions: 89000,
        clicks: 2100,
        conversions: 78,
        cost_per_conversion: 21.15,
        conversion_rate: 3.71,
        ctr: 2.36,
        cpc: 0.79,
        cpm: 18.5,
        roas: 2.8
      },
      {
        id: '123456791',
        name: 'Retargeting Campaign',
        status: 'PAUSED',
        budget: 500,
        spent: 320,
        impressions: 45000,
        clicks: 1800,
        conversions: 32,
        cost_per_conversion: 10.0,
        conversion_rate: 1.78,
        ctr: 4.0,
        cpc: 0.18,
        cpm: 7.1,
        roas: 4.5
      }
    ],
    metrics: {
      total_spend: 2820,
      total_impressions: 259000,
      total_clicks: 7100,
      total_conversions: 155,
      average_cpc: 0.40,
      average_cpm: 10.9,
      average_ctr: 2.74,
      average_conversion_rate: 2.18,
      total_roas: 3.1,
      cost_per_conversion: 18.19
    },
    lastUpdated: new Date().toISOString(),
    dateRange
  };
}

function getMockGoogleAdsConnection(): CleanGoogleAdsConnection {
  return {
    isConnected: true,
    selectedAccount: {
      customer_id: '1234567890',
      descriptive_name: 'My Business Account',
      currency_code: 'USD',
      time_zone: 'America/New_York',
      manager: false,
      test_account: false,
      pay_per_conversion_eligibility_failure_reasons: []
    },
    availableAccounts: [
      {
        customer_id: '1234567890',
        descriptive_name: 'My Business Account',
        currency_code: 'USD',
        time_zone: 'America/New_York',
        manager: false,
        test_account: false,
        pay_per_conversion_eligibility_failure_reasons: []
      },
      {
        customer_id: '9876543210',
        descriptive_name: 'Client Account 1',
        currency_code: 'USD',
        time_zone: 'America/Los_Angeles',
        manager: false,
        test_account: false,
        pay_per_conversion_eligibility_failure_reasons: []
      }
    ],
    lastSync: new Date().toISOString()
  };
}

// Helper functions for data formatting
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(2)}%`;
}

export function getPerformanceColor(value: number, threshold: number, reverse: boolean = false): string {
  const isGood = reverse ? value < threshold : value > threshold;
  return isGood ? 'text-green-400' : 'text-red-400';
}

export function getPerformanceIcon(value: number, threshold: number, reverse: boolean = false): 'up' | 'down' {
  const isGood = reverse ? value < threshold : value > threshold;
  return isGood ? 'up' : 'down';
}

// Data validation helpers
export function isValidGoogleAdsData(data: any): data is CleanGoogleAdsData {
  return (
    data &&
    Array.isArray(data.campaigns) &&
    data.metrics &&
    typeof data.metrics.total_spend === 'number' &&
    data.lastUpdated instanceof Date
  );
}

export function isValidGoogleAdsConnection(connection: any): connection is CleanGoogleAdsConnection {
  return (
    connection &&
    typeof connection.isConnected === 'boolean' &&
    Array.isArray(connection.availableAccounts)
  );
}
