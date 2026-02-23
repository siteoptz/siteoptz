// lib/google-services-client.ts  
// Unified Google Services client for storing and retrieving account connections
// Supports Google Ads, Search Console, Tag Manager, and Analytics

// Google Service Account Info interfaces
export interface GoogleAdsAccountInfo {
  customer_id: string;
  descriptive_name: string;
  currency_code: string;
  time_zone: string;
  manager: boolean;
  test_account: boolean;
  pay_per_conversion_eligibility_failure_reasons: string[];
}

export interface SearchConsoleAccountInfo {
  site_url: string;
  permission_level: 'siteFullUser' | 'siteOwner' | 'siteRestrictedUser' | 'siteUnverifiedUser';
}

export interface TagManagerAccountInfo {
  account_id: string;
  name: string;
  containers?: Array<{
    container_id: string;
    name: string;
    public_id: string;
  }>;
}

export interface AnalyticsAccountInfo {
  account_id: string;
  name: string;
  properties?: Array<{
    property_id: string;
    name: string;
  }>;
}

// Unified Google Services Connection Data
export interface GoogleServicesConnectionData {
  platform: 'google-ads' | 'search-console' | 'tag-manager' | 'analytics';
  accountId: string;
  accountInfo: GoogleAdsAccountInfo | SearchConsoleAccountInfo | TagManagerAccountInfo | AnalyticsAccountInfo;
  accessToken: string;
  refreshToken?: string;
  connectedAt: string;
  userId: string;
  expiresAt: number;
  scope: string; // Store granted scopes for the token
}

// Legacy interface for backward compatibility
export interface GoogleAdsConnectionData extends GoogleServicesConnectionData {
  platform: 'google-ads';
  accountInfo: GoogleAdsAccountInfo;
}

// In-memory storage for development (replace with database in production)
const googleServicesConnections = new Map<string, Map<string, GoogleServicesConnectionData>>();

// Get user's service connections map
function getUserConnections(userId: string): Map<string, GoogleServicesConnectionData> {
  if (!googleServicesConnections.has(userId)) {
    googleServicesConnections.set(userId, new Map());
  }
  return googleServicesConnections.get(userId)!;
}

// Store Google Service account connection
export function storeGoogleServiceConnection(userId: string, platform: string, connectionData: GoogleServicesConnectionData): void {
  try {
    const userConnections = getUserConnections(userId);
    userConnections.set(platform, connectionData);
    console.log(`Stored ${platform} connection for user: ${userId}`);
  } catch (error) {
    console.error(`Error storing ${platform} connection for user ${userId}:`, error);
  }
}

// Legacy function for backward compatibility
export function storeGoogleAdsAccount(userId: string, connectionData: GoogleAdsConnectionData): void {
  storeGoogleServiceConnection(userId, 'google-ads', connectionData);
}

// Retrieve stored Google Service connection
export function getStoredGoogleServiceConnection(userId: string, platform: string): GoogleServicesConnectionData | null {
  try {
    const userConnections = getUserConnections(userId);
    const connection = userConnections.get(platform);
    if (!connection) {
      return null;
    }

    // Check if connection is expired
    if (connection.expiresAt && connection.expiresAt <= Date.now()) {
      console.log(`${platform} connection expired for user: ${userId}`);
      userConnections.delete(platform);
      return null;
    }

    return connection;
  } catch (error) {
    console.error(`Error retrieving ${platform} connection for user ${userId}:`, error);
    return null;
  }
}

// Legacy function for backward compatibility
export function getStoredGoogleAdsAccount(userId: string): GoogleAdsConnectionData | null {
  return getStoredGoogleServiceConnection(userId, 'google-ads') as GoogleAdsConnectionData | null;
}

// Update Google Service connection
export function updateGoogleServiceConnection(userId: string, platform: string, updates: Partial<GoogleServicesConnectionData>): boolean {
  try {
    const userConnections = getUserConnections(userId);
    const existingConnection = userConnections.get(platform);
    if (!existingConnection) {
      console.error(`No existing ${platform} connection found for user: ${userId}`);
      return false;
    }

    const updatedConnection = { ...existingConnection, ...updates };
    userConnections.set(platform, updatedConnection);
    console.log(`Updated ${platform} connection for user: ${userId}`);
    return true;
  } catch (error) {
    console.error(`Error updating ${platform} connection for user ${userId}:`, error);
    return false;
  }
}

// Legacy function for backward compatibility  
export function updateGoogleAdsAccount(userId: string, updates: Partial<GoogleAdsConnectionData>): boolean {
  return updateGoogleServiceConnection(userId, 'google-ads', updates);
}

// Remove Google Service connection
export function removeGoogleServiceConnection(userId: string, platform: string): boolean {
  try {
    const userConnections = getUserConnections(userId);
    const deleted = userConnections.delete(platform);
    if (deleted) {
      console.log(`Removed ${platform} connection for user: ${userId}`);
    }
    return deleted;
  } catch (error) {
    console.error(`Error removing ${platform} connection for user ${userId}:`, error);
    return false;
  }
}

// Legacy function for backward compatibility
export function removeGoogleAdsAccount(userId: string): boolean {
  return removeGoogleServiceConnection(userId, 'google-ads');
}

// Check if user has Google Service connection
export function hasGoogleServiceConnection(userId: string, platform: string): boolean {
  try {
    const userConnections = getUserConnections(userId);
    const connection = userConnections.get(platform);
    if (!connection) {
      return false;
    }

    // Check if connection is expired
    if (connection.expiresAt && connection.expiresAt <= Date.now()) {
      userConnections.delete(platform);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error checking ${platform} connection for user ${userId}:`, error);
    return false;
  }
}

// Legacy function for backward compatibility
export function hasGoogleAdsConnection(userId: string): boolean {
  return hasGoogleServiceConnection(userId, 'google-ads');
}

// Get all connected Google services for a user
export function getUserGoogleServices(userId: string): string[] {
  try {
    const userConnections = getUserConnections(userId);
    const connectedServices: string[] = [];
    
    for (const [platform, connection] of userConnections.entries()) {
      // Check if connection is not expired
      if (!connection.expiresAt || connection.expiresAt > Date.now()) {
        connectedServices.push(platform);
      }
    }
    
    return connectedServices;
  } catch (error) {
    console.error(`Error getting connected Google services for user ${userId}:`, error);
    return [];
  }
}

// Get all stored connections (for admin purposes)
export function getAllGoogleServicesConnections(): Map<string, Map<string, GoogleServicesConnectionData>> {
  return new Map(googleServicesConnections);
}

// Legacy function for backward compatibility 
export function getAllGoogleAdsConnections(): Map<string, GoogleAdsConnectionData> {
  const adsConnections = new Map<string, GoogleAdsConnectionData>();
  for (const [userId, userConnections] of googleServicesConnections.entries()) {
    const adsConnection = userConnections.get('google-ads');
    if (adsConnection && adsConnection.platform === 'google-ads') {
      adsConnections.set(userId, adsConnection as GoogleAdsConnectionData);
    }
  }
  return adsConnections;
}

// Clear expired connections for all Google services
export function clearExpiredConnections(): number {
  let clearedCount = 0;
  const now = Date.now();

  for (const [userId, userConnections] of googleServicesConnections.entries()) {
    for (const [platform, connection] of userConnections.entries()) {
      if (connection.expiresAt && connection.expiresAt <= now) {
        userConnections.delete(platform);
        clearedCount++;
      }
    }
    // Clean up empty user connection maps
    if (userConnections.size === 0) {
      googleServicesConnections.delete(userId);
    }
  }

  if (clearedCount > 0) {
    console.log(`Cleared ${clearedCount} expired Google service connections`);
  }

  return clearedCount;
}

// Refresh access token for any Google service
export async function refreshGoogleServiceToken(userId: string, platform: string): Promise<boolean> {
  try {
    const userConnections = getUserConnections(userId);
    const connection = userConnections.get(platform);
    if (!connection || !connection.refreshToken) {
      console.error(`No refresh token available for ${platform} user: ${userId}`);
      return false;
    }

    // TODO: Implement actual token refresh logic using oauth-utils
    console.log(`Token refresh requested for ${platform} user: ${userId}`);
    return true;
  } catch (error) {
    console.error(`Error refreshing ${platform} token for user ${userId}:`, error);
    return false;
  }
}

// Legacy function for backward compatibility
export async function refreshGoogleAdsToken(userId: string): Promise<boolean> {
  return refreshGoogleServiceToken(userId, 'google-ads');
}

// Validate Google Services connection data
export function validateGoogleServiceConnection(connection: any): connection is GoogleServicesConnectionData {
  return (
    connection &&
    typeof connection.platform === 'string' &&
    ['google-ads', 'search-console', 'tag-manager', 'analytics'].includes(connection.platform) &&
    typeof connection.accountId === 'string' &&
    connection.accountInfo &&
    typeof connection.accessToken === 'string' &&
    typeof connection.userId === 'string' &&
    typeof connection.connectedAt === 'string' &&
    typeof connection.expiresAt === 'number' &&
    typeof connection.scope === 'string'
  );
}

// Legacy function for backward compatibility
export function validateGoogleAdsConnection(connection: any): connection is GoogleAdsConnectionData {
  return (
    validateGoogleServiceConnection(connection) &&
    connection.platform === 'google-ads' &&
    connection.accountInfo &&
    'customer_id' in connection.accountInfo &&
    typeof (connection.accountInfo as GoogleAdsAccountInfo).customer_id === 'string'
  );
}

// Get connection status for any Google service
export function getGoogleServiceConnectionStatus(userId: string, platform: string): {
  isConnected: boolean;
  isExpired: boolean;
  accountInfo?: GoogleAdsAccountInfo | SearchConsoleAccountInfo | TagManagerAccountInfo | AnalyticsAccountInfo;
  lastConnected?: string; // ISO string for JSON serialization
  scope?: string;
} {
  try {
    const userConnections = getUserConnections(userId);
    const connection = userConnections.get(platform);
    
    if (!connection) {
      return { isConnected: false, isExpired: false };
    }

    const isExpired = connection.expiresAt ? connection.expiresAt <= Date.now() : false;
    
    return {
      isConnected: !isExpired,
      isExpired,
      accountInfo: connection.accountInfo,
      lastConnected: connection.connectedAt,
      scope: connection.scope
    };
  } catch (error) {
    console.error(`Error getting ${platform} connection status for user ${userId}:`, error);
    return { isConnected: false, isExpired: false };
  }
}

// Legacy function for backward compatibility
export function getGoogleAdsConnectionStatus(userId: string): {
  isConnected: boolean;
  isExpired: boolean;
  accountInfo?: GoogleAdsAccountInfo;
  lastConnected?: string; // ISO string for JSON serialization
} {
  const status = getGoogleServiceConnectionStatus(userId, 'google-ads');
  return {
    isConnected: status.isConnected,
    isExpired: status.isExpired,
    accountInfo: status.accountInfo as GoogleAdsAccountInfo | undefined,
    lastConnected: status.lastConnected
  };
}