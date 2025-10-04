// lib/integrations/oauth/tiktok-oauth.js
export class TikTokOAuthProvider {
  constructor() {
    this.clientId = process.env.TIKTOK_CLIENT_ID;
    this.clientSecret = process.env.TIKTOK_CLIENT_SECRET;
    this.scopes = [
      'user.info.basic',
      'business.get',
      'ad_account.get',
      'campaign.get',
      'adgroup.get',
      'ad.get',
      'reporting.get'
    ];
  }

  getRequiredScopes() {
    return this.scopes;
  }

  async getAuthorizationUrl({ userId, state, redirectUri }) {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: redirectUri,
      scope: this.scopes.join(','),
      response_type: 'code',
      state: state
    });

    return `https://business-api.tiktok.com/portal/auth?${params.toString()}`;
  }

  async exchangeCodeForTokens(code, state) {
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/tiktok/callback`;
    
    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        auth_code: code,
        redirect_uri: redirectUri
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    const result = await response.json();
    
    if (result.code !== 0) {
      throw new Error(`Token exchange error: ${result.message}`);
    }

    const tokens = result.data;

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.access_token_expire_in,
      refresh_expires_in: tokens.refresh_token_expire_in,
      token_type: 'bearer',
      scope: tokens.scope,
      expires_at: Date.now() + (tokens.access_token_expire_in * 1000),
      refresh_expires_at: Date.now() + (tokens.refresh_token_expire_in * 1000)
    };
  }

  async refreshAccessToken(refreshToken) {
    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/oauth2/refresh_token/', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: refreshToken
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token refresh failed: ${error}`);
    }

    const result = await response.json();
    
    if (result.code !== 0) {
      throw new Error(`Token refresh error: ${result.message}`);
    }

    const tokens = result.data;

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.access_token_expire_in,
      refresh_expires_in: tokens.refresh_token_expire_in,
      token_type: 'bearer',
      scope: tokens.scope,
      expires_at: Date.now() + (tokens.access_token_expire_in * 1000),
      refresh_expires_at: Date.now() + (tokens.refresh_token_expire_in * 1000)
    };
  }

  async getAccountInfo(accessToken) {
    // Get user info
    const userResponse = await fetch('https://business-api.tiktok.com/open_api/v1.3/user/info/', {
      method: 'GET',
      headers: { 
        'Access-Token': accessToken,
        'Content-Type': 'application/json'
      }
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userResult = await userResponse.json();
    
    if (userResult.code !== 0) {
      throw new Error(`Failed to fetch user info: ${userResult.message}`);
    }

    const userInfo = userResult.data;

    // Get advertiser accounts
    const advertisers = await this.getAdvertiserAccounts(accessToken);

    return {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.display_name,
      platform: 'tiktok',
      accounts: {
        advertisers: advertisers
      }
    };
  }

  async getAdvertiserAccounts(accessToken) {
    try {
      const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/oauth2/advertiser/get/', {
        method: 'GET',
        headers: { 
          'Access-Token': accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch advertiser accounts');
      }

      const result = await response.json();
      
      if (result.code !== 0) {
        throw new Error(`Failed to fetch advertiser accounts: ${result.message}`);
      }

      return result.data?.list || [];
    } catch (error) {
      console.error('Failed to fetch TikTok advertiser accounts:', error);
      return [];
    }
  }

  async validateToken(accessToken) {
    try {
      const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/user/info/', {
        method: 'GET',
        headers: { 
          'Access-Token': accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        return false;
      }

      const result = await response.json();
      return result.code === 0;
    } catch (error) {
      return false;
    }
  }

  async revokeToken(accessToken) {
    // TikTok doesn't have a specific revoke endpoint
    // Token will expire naturally
    return true;
  }
}