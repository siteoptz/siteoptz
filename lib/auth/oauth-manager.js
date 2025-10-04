// lib/auth/oauth-manager.js
import { GoogleOAuthProvider } from '../integrations/oauth/google-oauth';
import { MetaOAuthProvider } from '../integrations/oauth/meta-oauth';
import { TikTokOAuthProvider } from '../integrations/oauth/tiktok-oauth';
import { LinkedInOAuthProvider } from '../integrations/oauth/linkedin-oauth';

export class OAuthManager {
  constructor() {
    this.providers = {
      google: new GoogleOAuthProvider(),
      meta: new MetaOAuthProvider(),
      tiktok: new TikTokOAuthProvider(),
      linkedin: new LinkedInOAuthProvider()
    };
  }

  async initiateOAuth(platform, userId) {
    const provider = this.providers[platform];
    if (!provider) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    const state = this.generateState(userId, platform);
    const authUrl = await provider.getAuthorizationUrl({
      userId,
      state,
      scopes: provider.getRequiredScopes(),
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/${platform}/callback`
    });

    // Store state for verification
    await this.storeState(state, { userId, platform, timestamp: Date.now() });

    return { authUrl, state };
  }

  async handleCallback(platform, code, state, userId) {
    const provider = this.providers[platform];
    if (!provider) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    // Verify state
    const storedState = await this.verifyState(state);
    if (!storedState || storedState.platform !== platform) {
      throw new Error('Invalid state parameter');
    }

    try {
      // Exchange code for tokens
      const tokens = await provider.exchangeCodeForTokens(code, state);
      
      // Get account information
      const accountInfo = await provider.getAccountInfo(tokens.access_token);
      
      // Store tokens and account info securely
      const accountId = await this.storeAccountConnection({
        userId: userId || storedState.userId,
        platform,
        accountInfo,
        tokens: this.encryptTokens(tokens)
      });
      
      // Fetch initial data
      await this.scheduleInitialDataFetch(platform, accountId);
      
      return { 
        success: true, 
        accountId,
        accountInfo: {
          name: accountInfo.name,
          id: accountInfo.id,
          platform
        }
      };
    } catch (error) {
      console.error(`OAuth callback error for ${platform}:`, error);
      throw new Error(`Failed to complete OAuth flow: ${error.message}`);
    }
  }

  async refreshTokens(accountId) {
    const account = await this.getAccountConnection(accountId);
    if (!account) {
      throw new Error('Account not found');
    }

    const provider = this.providers[account.platform];
    if (!provider) {
      throw new Error(`Unsupported platform: ${account.platform}`);
    }

    try {
      const decryptedTokens = this.decryptTokens(account.tokens);
      const newTokens = await provider.refreshAccessToken(decryptedTokens.refresh_token);
      
      // Update stored tokens
      await this.updateAccountTokens(accountId, this.encryptTokens(newTokens));
      
      return newTokens;
    } catch (error) {
      console.error(`Token refresh error for account ${accountId}:`, error);
      throw error;
    }
  }

  async disconnectAccount(accountId, userId) {
    const account = await this.getAccountConnection(accountId);
    if (!account || account.userId !== userId) {
      throw new Error('Account not found or unauthorized');
    }

    const provider = this.providers[account.platform];
    if (provider && provider.revokeToken) {
      try {
        const decryptedTokens = this.decryptTokens(account.tokens);
        await provider.revokeToken(decryptedTokens.access_token);
      } catch (error) {
        console.error('Failed to revoke token:', error);
        // Continue with disconnection even if revocation fails
      }
    }

    await this.removeAccountConnection(accountId);
    return { success: true };
  }

  async getConnectedAccounts(userId) {
    return await this.getUserAccountConnections(userId);
  }

  generateState(userId, platform) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return Buffer.from(JSON.stringify({ userId, platform, timestamp, random })).toString('base64');
  }

  async storeState(state, data) {
    // In production, store in Redis with TTL
    // For now, store in memory or database with expiration
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    // Implementation depends on your storage choice
  }

  async verifyState(state) {
    try {
      const decoded = JSON.parse(Buffer.from(state, 'base64').toString());
      const now = Date.now();
      
      // Check if state is not older than 10 minutes
      if (now - decoded.timestamp > 10 * 60 * 1000) {
        throw new Error('State expired');
      }
      
      return decoded;
    } catch (error) {
      throw new Error('Invalid state');
    }
  }

  encryptTokens(tokens) {
    // Use encryption service to encrypt sensitive tokens
    const EncryptionService = require('../security/encryption').EncryptionService;
    const encryption = new EncryptionService();
    return encryption.encrypt(JSON.stringify(tokens));
  }

  decryptTokens(encryptedTokens) {
    const EncryptionService = require('../security/encryption').EncryptionService;
    const encryption = new EncryptionService();
    return JSON.parse(encryption.decrypt(encryptedTokens));
  }

  async storeAccountConnection(data) {
    // Implementation depends on your database choice
    // Return the created account ID
  }

  async getAccountConnection(accountId) {
    // Implementation depends on your database choice
  }

  async updateAccountTokens(accountId, encryptedTokens) {
    // Implementation depends on your database choice
  }

  async removeAccountConnection(accountId) {
    // Implementation depends on your database choice
  }

  async getUserAccountConnections(userId) {
    // Implementation depends on your database choice
  }

  async scheduleInitialDataFetch(platform, accountId) {
    // Schedule background job to fetch initial data
    // This could use a job queue like Bull/Redis
    console.log(`Scheduling initial data fetch for ${platform} account ${accountId}`);
  }
}

export default OAuthManager;