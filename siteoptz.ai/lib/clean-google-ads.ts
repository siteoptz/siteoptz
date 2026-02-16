export interface CleanGoogleAdsData {
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpm: number;
  conversionRate: number;
  roas: number;
  campaigns: {
    id: string;
    name: string;
    status: string;
    impressions: number;
    clicks: number;
    cost: number;
    conversions: number;
  }[];
  keywords: {
    keyword: string;
    impressions: number;
    clicks: number;
    cost: number;
    ctr: number;
    cpc: number;
    avgPosition: number;
  }[];
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export interface CleanGoogleAdsConnection {
  isConnected: boolean;
  accountId?: string;
  accountName?: string;
  lastSync?: string;
  error?: string;
}

export interface MarketingMetrics {
  totalSpend: number;
  totalRevenue: number;
  roi: number;
  roas: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  conversionRate: number;
}

// Utility functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toFixed(0);
};

export const formatPercentage = (percentage: number): string => {
  return percentage.toFixed(2) + '%';
};

export const getPerformanceColor = (value: number, threshold: number = 0): string => {
  if (value > threshold) {
    return 'text-green-500';
  } else if (value < threshold) {
    return 'text-red-500';
  }
  return 'text-gray-500';
};

export const getPerformanceIcon = (value: number, threshold: number = 0): '↑' | '↓' | '→' => {
  if (value > threshold) {
    return '↑';
  } else if (value < threshold) {
    return '↓';
  }
  return '→';
};