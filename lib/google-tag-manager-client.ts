// lib/google-tag-manager-client.ts
// Google Tag Manager API client

import { makeAuthenticatedRequest } from './oauth-utils';
import { TagManagerAccountInfo, storeGoogleServiceConnection, getStoredGoogleServiceConnection } from './google-ads-client';

export interface TagManagerAccount {
  accountId: string;
  name: string;
  shareData?: boolean;
  fingerprint?: string;
  tagManagerUrl?: string;
}

export interface TagManagerContainer {
  containerId: string;
  name: string;
  publicId: string;
  usageContext: string[];
  fingerprint?: string;
  tagManagerUrl?: string;
}

export interface TagManagerTag {
  tagId: string;
  name: string;
  type: string;
  liveOnly?: boolean;
  parameter?: Array<{
    key: string;
    value: string;
  }>;
}

// Get user's Tag Manager accounts
export async function getTagManagerAccounts(userId: string): Promise<TagManagerAccount[]> {
  try {
    const connection = getStoredGoogleServiceConnection(userId, 'tag-manager');
    if (!connection) {
      throw new Error('No Tag Manager connection found');
    }

    const response = await makeAuthenticatedRequest(
      'https://www.googleapis.com/tagmanager/v2/accounts',
      { method: 'GET' },
      connection.accessToken
    );

    if (!response.ok) {
      throw new Error(`Tag Manager API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.account?.map((account: any) => ({
      accountId: account.accountId,
      name: account.name,
      shareData: account.shareData,
      fingerprint: account.fingerprint,
      tagManagerUrl: account.tagManagerUrl
    })) || [];

  } catch (error) {
    console.error('Error fetching Tag Manager accounts:', error);
    return [];
  }
}

// Get containers for a specific Tag Manager account
export async function getTagManagerContainers(userId: string, accountId: string): Promise<TagManagerContainer[]> {
  try {
    const connection = getStoredGoogleServiceConnection(userId, 'tag-manager');
    if (!connection) {
      throw new Error('No Tag Manager connection found');
    }

    const response = await makeAuthenticatedRequest(
      `https://www.googleapis.com/tagmanager/v2/accounts/${accountId}/containers`,
      { method: 'GET' },
      connection.accessToken
    );

    if (!response.ok) {
      throw new Error(`Tag Manager API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.container?.map((container: any) => ({
      containerId: container.containerId,
      name: container.name,
      publicId: container.publicId,
      usageContext: container.usageContext || [],
      fingerprint: container.fingerprint,
      tagManagerUrl: container.tagManagerUrl
    })) || [];

  } catch (error) {
    console.error('Error fetching Tag Manager containers:', error);
    return [];
  }
}

// Get tags for a specific container
export async function getTagManagerTags(
  userId: string, 
  accountId: string, 
  containerId: string
): Promise<TagManagerTag[]> {
  try {
    const connection = getStoredGoogleServiceConnection(userId, 'tag-manager');
    if (!connection) {
      throw new Error('No Tag Manager connection found');
    }

    const response = await makeAuthenticatedRequest(
      `https://www.googleapis.com/tagmanager/v2/accounts/${accountId}/containers/${containerId}/workspaces/1/tags`,
      { method: 'GET' },
      connection.accessToken
    );

    if (!response.ok) {
      throw new Error(`Tag Manager API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.tag?.map((tag: any) => ({
      tagId: tag.tagId,
      name: tag.name,
      type: tag.type,
      liveOnly: tag.liveOnly,
      parameter: tag.parameter
    })) || [];

  } catch (error) {
    console.error('Error fetching Tag Manager tags:', error);
    return [];
  }
}

// Store Tag Manager connection
export async function storeTagManagerConnection(
  userId: string,
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
  scope: string
): Promise<void> {
  try {
    const expiresAt = Date.now() + (expiresIn * 1000);
    
    // Fetch accounts to get account info
    const tempConnection = {
      platform: 'tag-manager' as const,
      accountId: `temp-${userId}`,
      accountInfo: { account_id: '', name: '', containers: [] },
      accessToken,
      refreshToken,
      connectedAt: new Date().toISOString(),
      userId,
      expiresAt,
      scope
    };
    
    // Temporarily store to make API calls
    storeGoogleServiceConnection(userId, 'tag-manager', tempConnection);
    
    const accounts = await getTagManagerAccounts(userId);
    const primaryAccount = accounts[0];
    
    if (!primaryAccount) {
      throw new Error('No Tag Manager accounts found');
    }
    
    // Get containers for the primary account
    const containers = await getTagManagerContainers(userId, primaryAccount.accountId);
    
    const accountInfo: TagManagerAccountInfo = {
      account_id: primaryAccount.accountId,
      name: primaryAccount.name,
      containers: containers.map(container => ({
        container_id: container.containerId,
        name: container.name,
        public_id: container.publicId
      }))
    };

    // Store the final connection with proper account info
    storeGoogleServiceConnection(userId, 'tag-manager', {
      platform: 'tag-manager',
      accountId: primaryAccount.accountId,
      accountInfo,
      accessToken,
      refreshToken,
      connectedAt: new Date().toISOString(),
      userId,
      expiresAt,
      scope
    });
    
  } catch (error) {
    console.error('Error storing Tag Manager connection:', error);
    throw error;
  }
}

// Validate Tag Manager connection by testing API access
export async function validateTagManagerConnection(userId: string): Promise<boolean> {
  try {
    const accounts = await getTagManagerAccounts(userId);
    return accounts.length > 0;
  } catch (error) {
    console.error('Tag Manager connection validation failed:', error);
    return false;
  }
}