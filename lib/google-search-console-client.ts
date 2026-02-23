// lib/google-search-console-client.ts
// Google Search Console API client

import { makeAuthenticatedRequest } from './oauth-utils';
import { SearchConsoleAccountInfo, storeGoogleServiceConnection, getStoredGoogleServiceConnection } from './google-ads-client';

export interface SearchConsoleProperty {
  siteUrl: string;
  permissionLevel: 'siteFullUser' | 'siteOwner' | 'siteRestrictedUser' | 'siteUnverifiedUser';
}

export interface SearchConsoleData {
  query: string;
  page: string;
  country: string;
  device: string;
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

// Get user's Search Console properties
export async function getSearchConsoleProperties(userId: string): Promise<SearchConsoleProperty[]> {
  try {
    const connection = getStoredGoogleServiceConnection(userId, 'search-console');
    if (!connection) {
      throw new Error('No Search Console connection found');
    }

    const response = await makeAuthenticatedRequest(
      'https://www.googleapis.com/webmasters/v3/sites',
      { method: 'GET' },
      connection.accessToken
    );

    if (!response.ok) {
      throw new Error(`Search Console API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.siteEntry?.map((site: any) => ({
      siteUrl: site.siteUrl,
      permissionLevel: site.permissionLevel
    })) || [];

  } catch (error) {
    console.error('Error fetching Search Console properties:', error);
    return [];
  }
}

// Get Search Console performance data
export async function getSearchConsoleData(
  userId: string, 
  siteUrl: string, 
  startDate: string, 
  endDate: string,
  dimensions: string[] = ['query'],
  rowLimit: number = 1000
): Promise<SearchConsoleData[]> {
  try {
    const connection = getStoredGoogleServiceConnection(userId, 'search-console');
    if (!connection) {
      throw new Error('No Search Console connection found');
    }

    const requestBody = {
      startDate,
      endDate,
      dimensions,
      rowLimit,
      startRow: 0
    };

    const response = await makeAuthenticatedRequest(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        body: JSON.stringify(requestBody)
      },
      connection.accessToken
    );

    if (!response.ok) {
      throw new Error(`Search Console API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.rows?.map((row: any) => ({
      query: row.keys?.[0] || '',
      page: row.keys?.[1] || '',
      country: row.keys?.[2] || '',
      device: row.keys?.[3] || '',
      date: row.keys?.[4] || '',
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0
    })) || [];

  } catch (error) {
    console.error('Error fetching Search Console data:', error);
    return [];
  }
}

// Store Search Console connection
export function storeSearchConsoleConnection(
  userId: string,
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
  scope: string,
  properties: SearchConsoleProperty[]
): void {
  const expiresAt = Date.now() + (expiresIn * 1000);
  
  // Use the first property as the primary account info, or create a default
  const primaryProperty = properties[0] || { siteUrl: '', permissionLevel: 'siteUnverifiedUser' as const };
  
  const accountInfo: SearchConsoleAccountInfo = {
    site_url: primaryProperty.siteUrl,
    permission_level: primaryProperty.permissionLevel
  };

  storeGoogleServiceConnection(userId, 'search-console', {
    platform: 'search-console',
    accountId: primaryProperty.siteUrl || `search-console-${userId}`,
    accountInfo,
    accessToken,
    refreshToken,
    connectedAt: new Date().toISOString(),
    userId,
    expiresAt,
    scope
  });
}

// Validate Search Console connection by testing API access
export async function validateSearchConsoleConnection(userId: string): Promise<boolean> {
  try {
    const properties = await getSearchConsoleProperties(userId);
    return properties.length > 0;
  } catch (error) {
    console.error('Search Console connection validation failed:', error);
    return false;
  }
}