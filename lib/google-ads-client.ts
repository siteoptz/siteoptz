// lib/google-ads-client.ts
// Client-safe Google Ads utilities (no server-side dependencies)

export interface GoogleAdsAccount {
  customer_id: string;
  descriptive_name: string;
  currency_code: string;
  time_zone: string;
  manager: boolean;
  test_account: boolean;
  pay_per_conversion_eligibility_failure_reasons: string[];
}

export interface GoogleAdsManagerAccount {
  customer_id: string;
  descriptive_name: string;
  currency_code: string;
  time_zone: string;
  manager: boolean;
  test_account: boolean;
  child_accounts: GoogleAdsAccount[];
}

export interface GoogleAdsConnection {
  platform: string;
  accountId: string;
  accountInfo: {
    customer_id: string;
    descriptive_name: string;
    currency_code: string;
    time_zone: string;
    manager: boolean;
    test_account: boolean;
  };
  accessToken: string;
  refreshToken?: string;
  connectedAt: string;
  userId: string;
  expiresAt: number;
}

// Client-safe function to get stored Google Ads account from localStorage
export const getStoredGoogleAdsAccount = (userId: string): GoogleAdsConnection | null => {
  // This function can safely run on client-side
  if (typeof window === 'undefined') {
    // Server-side: return null (this should be handled via API calls)
    return null;
  }
  
  try {
    const key = `google_ads_connection_${userId}`;
    const stored = localStorage.getItem(key);
    
    if (!stored) {
      return null;
    }

    const connection = JSON.parse(stored) as GoogleAdsConnection;
    
    // Check if connection is expired
    if (connection.expiresAt && connection.expiresAt <= Date.now()) {
      localStorage.removeItem(key);
      return null;
    }

    return connection;
  } catch (error) {
    console.error(`Error getting stored Google Ads account for user ${userId}:`, error);
    return null;
  }
};

// Client-safe function to store Google Ads account in localStorage
export const storeGoogleAdsAccount = (userId: string, connection: GoogleAdsConnection): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const key = `google_ads_connection_${userId}`;
    localStorage.setItem(key, JSON.stringify(connection));
    return true;
  } catch (error) {
    console.error(`Error storing Google Ads account for user ${userId}:`, error);
    return false;
  }
};

// Client-safe function to remove Google Ads account from localStorage
export const removeStoredGoogleAdsAccount = (userId: string): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const key = `google_ads_connection_${userId}`;
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing Google Ads account for user ${userId}:`, error);
    return false;
  }
};

// Check if user has a Google Ads account connected
export const hasGoogleAdsConnection = (userId: string): boolean => {
  const connection = getStoredGoogleAdsAccount(userId);
  return connection !== null;
};

// Get Google Ads account info for display (matches dashboard component expectations)
export const getGoogleAdsAccountInfo = (userId: string): {
  connected: boolean;
  accountInfo?: {
    customer_id: string;
    descriptive_name: string;
    currency_code: string;
    time_zone: string;
    manager: boolean;
    test_account: boolean;
  };
  accountId?: string;
  expiresAt?: number;
  loading?: boolean;
} => {
  const connection = getStoredGoogleAdsAccount(userId);
  
  if (!connection) {
    return { connected: false, loading: false };
  }
  
  return {
    connected: true,
    accountInfo: connection.accountInfo,
    accountId: connection.accountInfo.customer_id,
    expiresAt: connection.expiresAt,
    loading: false
  };
};