// lib/integrations/oauth/linkedin-oauth.js
export class LinkedInOAuthProvider {
  constructor() {
    this.clientId = process.env.LINKEDIN_CLIENT_ID;
    this.clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    this.scopes = [
      'r_ads',
      'r_ads_reporting',
      'r_organization_social',
      'rw_ads',
      'r_basicprofile',
      'r_emailaddress'
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
      state: state
    });

    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  }

  async exchangeCodeForTokens(code, state) {
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/linkedin/callback`;
    
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
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
      token_type: tokens.token_type || 'bearer',
      scope: tokens.scope,
      expires_at: Date.now() + (tokens.expires_in * 1000)
    };
  }

  async refreshAccessToken(refreshToken) {
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
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
      refresh_token: refreshToken,
      expires_in: tokens.expires_in,
      token_type: tokens.token_type || 'bearer',
      scope: tokens.scope,
      expires_at: Date.now() + (tokens.expires_in * 1000)
    };
  }

  async getAccountInfo(accessToken) {
    // Get user profile
    const profileResponse = await fetch('https://api.linkedin.com/v2/people/~:(id,firstName,lastName,emailAddress,profilePicture(displayImage~:playableStreams))', {
      headers: { 
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const profile = await profileResponse.json();

    // Get ad accounts
    const adAccounts = await this.getAdAccounts(accessToken);

    // Get organizations
    const organizations = await this.getOrganizations(accessToken);

    return {
      id: profile.id,
      email: profile.emailAddress,
      name: `${profile.firstName?.localized?.en_US || ''} ${profile.lastName?.localized?.en_US || ''}`.trim(),
      picture: profile.profilePicture?.displayImage?.elements?.[0]?.identifiers?.[0]?.identifier,
      platform: 'linkedin',
      accounts: {
        ads: adAccounts,
        organizations: organizations
      }
    };
  }

  async getAdAccounts(accessToken) {
    try {
      const response = await fetch('https://api.linkedin.com/v2/adAccountsV2?q=search', {
        headers: { 
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch ad accounts');
      }

      const data = await response.json();
      return data.elements || [];
    } catch (error) {
      console.error('Failed to fetch LinkedIn ad accounts:', error);
      return [];
    }
  }

  async getOrganizations(accessToken) {
    try {
      const response = await fetch('https://api.linkedin.com/v2/organizationalEntityAcls?q=roleAssignee', {
        headers: { 
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch organizations');
      }

      const data = await response.json();
      return data.elements || [];
    } catch (error) {
      console.error('Failed to fetch LinkedIn organizations:', error);
      return [];
    }
  }

  async validateToken(accessToken) {
    try {
      const response = await fetch('https://api.linkedin.com/v2/people/~', {
        headers: { 
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async revokeToken(accessToken) {
    // LinkedIn doesn't have a specific revoke endpoint
    // The token will expire based on its lifetime
    return true;
  }
}