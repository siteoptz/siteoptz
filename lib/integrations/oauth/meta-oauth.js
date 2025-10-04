// lib/integrations/oauth/meta-oauth.js
export class MetaOAuthProvider {
  constructor() {
    this.clientId = process.env.META_CLIENT_ID;
    this.clientSecret = process.env.META_CLIENT_SECRET;
    this.scopes = [
      'ads_management',
      'ads_read',
      'business_management',
      'pages_read_engagement',
      'pages_show_list',
      'instagram_basic',
      'instagram_manage_insights'
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
      state: state,
      display: 'popup'
    });

    return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
  }

  async exchangeCodeForTokens(code, state) {
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/meta/callback`;
    
    const response = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code: code,
        redirect_uri: redirectUri
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    const tokens = await response.json();
    
    if (tokens.error) {
      throw new Error(`Token exchange error: ${tokens.error.message || tokens.error}`);
    }

    // Exchange short-lived token for long-lived token
    const longLivedToken = await this.getLongLivedToken(tokens.access_token);

    return {
      access_token: longLivedToken.access_token,
      token_type: longLivedToken.token_type || 'bearer',
      expires_in: longLivedToken.expires_in,
      expires_at: Date.now() + (longLivedToken.expires_in * 1000)
    };
  }

  async getLongLivedToken(shortLivedToken) {
    const response = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'fb_exchange_token',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        fb_exchange_token: shortLivedToken
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Long-lived token exchange failed: ${error}`);
    }

    return await response.json();
  }

  async refreshAccessToken(accessToken) {
    // Meta tokens are long-lived (60 days) and don't have refresh tokens
    // Check if token is still valid and return it
    const isValid = await this.validateToken(accessToken);
    
    if (!isValid) {
      throw new Error('Token expired, re-authentication required');
    }

    return {
      access_token: accessToken,
      token_type: 'bearer',
      expires_in: 5184000, // 60 days
      expires_at: Date.now() + (5184000 * 1000)
    };
  }

  async getAccountInfo(accessToken) {
    // Get user profile
    const profileResponse = await fetch(`https://graph.facebook.com/v18.0/me?fields=id,name,email,picture&access_token=${accessToken}`);

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const profile = await profileResponse.json();

    // Get ad accounts
    const adAccounts = await this.getAdAccounts(accessToken);

    // Get pages
    const pages = await this.getPages(accessToken);

    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      picture: profile.picture?.data?.url,
      platform: 'meta',
      accounts: {
        ads: adAccounts,
        pages: pages
      }
    };
  }

  async getAdAccounts(accessToken) {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/me/adaccounts?fields=id,name,account_status,currency,timezone_name&access_token=${accessToken}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch ad accounts');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Failed to fetch Meta ad accounts:', error);
      return [];
    }
  }

  async getPages(accessToken) {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/me/accounts?fields=id,name,category,access_token&access_token=${accessToken}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch pages');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Failed to fetch Meta pages:', error);
      return [];
    }
  }

  async validateToken(accessToken) {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/me?access_token=${accessToken}`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async revokeToken(accessToken) {
    const response = await fetch(`https://graph.facebook.com/v18.0/me/permissions?access_token=${accessToken}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to revoke token');
    }

    return true;
  }
}