// lib/integrations/oauth/google-oauth.js
export class GoogleOAuthProvider {
  constructor() {
    this.clientId = process.env.GOOGLE_CLIENT_ID;
    this.clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    this.scopes = [
      'https://www.googleapis.com/auth/adwords',
      'https://www.googleapis.com/auth/analytics.readonly',
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ];
  }

  getRequiredScopes() {
    return this.scopes;
  }

  async getAuthorizationUrl({ userId, state, redirectUri }) {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: redirectUri,
      scope: this.scopes.join(' '),
      response_type: 'code',
      state: state,
      access_type: 'offline',
      prompt: 'consent',
      include_granted_scopes: 'true'
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async exchangeCodeForTokens(code, state) {
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/google/callback`;
    
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    const tokens = await response.json();
    
    if (tokens.error) {
      throw new Error(`Token exchange error: ${tokens.error_description || tokens.error}`);
    }

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expires_in,
      token_type: tokens.token_type,
      scope: tokens.scope,
      expires_at: Date.now() + (tokens.expires_in * 1000)
    };
  }

  async refreshAccessToken(refreshToken) {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token refresh failed: ${error}`);
    }

    const tokens = await response.json();
    
    if (tokens.error) {
      throw new Error(`Token refresh error: ${tokens.error_description || tokens.error}`);
    }

    return {
      access_token: tokens.access_token,
      refresh_token: refreshToken, // Refresh token usually stays the same
      expires_in: tokens.expires_in,
      token_type: tokens.token_type,
      scope: tokens.scope,
      expires_at: Date.now() + (tokens.expires_in * 1000)
    };
  }

  async getAccountInfo(accessToken) {
    // Get user profile
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const profile = await profileResponse.json();

    // Get Google Ads accounts
    const adsAccounts = await this.getGoogleAdsAccounts(accessToken);

    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      platform: 'google',
      accounts: {
        ads: adsAccounts,
        analytics: [], // Will be populated separately
        search_console: [] // Will be populated separately
      }
    };
  }

  async getGoogleAdsAccounts(accessToken) {
    try {
      // This would require Google Ads API setup
      // For now, return empty array
      return [];
    } catch (error) {
      console.error('Failed to fetch Google Ads accounts:', error);
      return [];
    }
  }

  async revokeToken(accessToken) {
    const response = await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (!response.ok) {
      throw new Error('Failed to revoke token');
    }

    return true;
  }

  async validateToken(accessToken) {
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`);
    
    if (!response.ok) {
      return false;
    }

    const info = await response.json();
    return info.aud === this.clientId;
  }
}