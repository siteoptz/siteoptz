// lib/google-ads-client.ts
// Google Ads client for storing and retrieving account connections

export interface GoogleAdsAccountInfo {
  customer_id: string;
  descriptive_name: string;
  currency_code: string;
  time_zone: string;
  manager: boolean;
  test_account: boolean;
  pay_per_conversion_eligibility_failure_reasons: string[];
}

export interface GoogleAdsConnectionData {
  platform: string;
  accountId: string;
  accountInfo: GoogleAdsAccountInfo;
  accessToken: string;
  refreshToken?: string;
  connectedAt: string;
  userId: string;
  expiresAt: number;
}

// In-memory storage for development (replace with database in production)
const googleAdsConnections = new Map<string, GoogleAdsConnectionData>();

// Store Google Ads account connection
export function storeGoogleAdsAccount(userId: string, connectionData: GoogleAdsConnectionData): void {
  try {
    googleAdsConnections.set(userId, connectionData);
    console.log(`Stored Google Ads connection for user: ${userId}`);
  } catch (error) {
    console.error(`Error storing Google Ads connection for user ${userId}:`, error);
  }
}

// Retrieve stored Google Ads account connection
export function getStoredGoogleAdsAccount(userId: string): GoogleAdsConnectionData | null {
  try {
    const connection = googleAdsConnections.get(userId);
    if (!connection) {
      return null;
    }

    // Check if connection is expired
    if (connection.expiresAt && connection.expiresAt <= Date.now()) {
      console.log(`Google Ads connection expired for user: ${userId}`);
      googleAdsConnections.delete(userId);
      return null;
    }

    return connection;
  } catch (error) {
    console.error(`Error retrieving Google Ads connection for user ${userId}:`, error);
    return null;
  }
}

// Update Google Ads account connection
export function updateGoogleAdsAccount(userId: string, updates: Partial<GoogleAdsConnectionData>): boolean {
  try {
    const existingConnection = googleAdsConnections.get(userId);
    if (!existingConnection) {
      console.error(`No existing Google Ads connection found for user: ${userId}`);
      return false;
    }

    const updatedConnection = { ...existingConnection, ...updates };
    googleAdsConnections.set(userId, updatedConnection);
    console.log(`Updated Google Ads connection for user: ${userId}`);
    return true;
  } catch (error) {
    console.error(`Error updating Google Ads connection for user ${userId}:`, error);
    return false;
  }
}

// Remove Google Ads account connection
export function removeGoogleAdsAccount(userId: string): boolean {
  try {
    const deleted = googleAdsConnections.delete(userId);
    if (deleted) {
      console.log(`Removed Google Ads connection for user: ${userId}`);
    }
    return deleted;
  } catch (error) {
    console.error(`Error removing Google Ads connection for user ${userId}:`, error);
    return false;
  }
}

// Check if user has Google Ads connection
export function hasGoogleAdsConnection(userId: string): boolean {
  try {
    const connection = googleAdsConnections.get(userId);
    if (!connection) {
      return false;
    }

    // Check if connection is expired
    if (connection.expiresAt && connection.expiresAt <= Date.now()) {
      googleAdsConnections.delete(userId);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error checking Google Ads connection for user ${userId}:`, error);
    return false;
  }
}

// Get all stored connections (for admin purposes)
export function getAllGoogleAdsConnections(): Map<string, GoogleAdsConnectionData> {
  return new Map(googleAdsConnections);
}

// Clear expired connections
export function clearExpiredConnections(): number {
  let clearedCount = 0;
  const now = Date.now();

  for (const [userId, connection] of googleAdsConnections.entries()) {
    if (connection.expiresAt && connection.expiresAt <= now) {
      googleAdsConnections.delete(userId);
      clearedCount++;
    }
  }

  if (clearedCount > 0) {
    console.log(`Cleared ${clearedCount} expired Google Ads connections`);
  }

  return clearedCount;
}

// Refresh access token (placeholder for future implementation)
export async function refreshGoogleAdsToken(userId: string): Promise<boolean> {
  try {
    const connection = googleAdsConnections.get(userId);
    if (!connection || !connection.refreshToken) {
      console.error(`No refresh token available for user: ${userId}`);
      return false;
    }

    // TODO: Implement actual token refresh logic
    console.log(`Token refresh requested for user: ${userId}`);
    return true;
  } catch (error) {
    console.error(`Error refreshing Google Ads token for user ${userId}:`, error);
    return false;
  }
}

// Validate connection data
export function validateGoogleAdsConnection(connection: any): connection is GoogleAdsConnectionData {
  return (
    connection &&
    typeof connection.platform === 'string' &&
    typeof connection.accountId === 'string' &&
    connection.accountInfo &&
    typeof connection.accountInfo.customer_id === 'string' &&
    typeof connection.accessToken === 'string' &&
    typeof connection.userId === 'string' &&
    typeof connection.connectedAt === 'string' &&
    typeof connection.expiresAt === 'number'
  );
}

// Get connection status
export function getGoogleAdsConnectionStatus(userId: string): {
  isConnected: boolean;
  isExpired: boolean;
  accountInfo?: GoogleAdsAccountInfo;
  lastConnected?: string; // ISO string for JSON serialization
} {
  try {
    const connection = googleAdsConnections.get(userId);
    
    if (!connection) {
      return { isConnected: false, isExpired: false };
    }

    const isExpired = connection.expiresAt ? connection.expiresAt <= Date.now() : false;
    
    return {
      isConnected: !isExpired,
      isExpired,
      accountInfo: connection.accountInfo,
      lastConnected: connection.connectedAt
    };
  } catch (error) {
    console.error(`Error getting Google Ads connection status for user ${userId}:`, error);
    return { isConnected: false, isExpired: false };
  }
}