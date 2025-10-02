// lib/oauth-utils.ts
// OAuth utility functions for Marketing ROI tool
// Updated to work with existing Google OAuth setup

// Get the Google Client ID from environment variables
const getGoogleClientId = () => {
  // Use environment variable - must be configured in .env.local
  // The client ID should be: 809428295933-mj14of35mgnfaq8un84u3487eac075ee.apps.googleusercontent.com
  return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || '';
};

// Get the base URL for redirects
const getBaseUrl = () => {
  // Check if we're in development mode
  if (typeof window !== 'undefined') {
    // Client-side: use window.location.origin
    return window.location.origin;
  }
  // Server-side: check NODE_ENV
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://siteoptz.ai';
};

export const generateGoogleAdsAuthUrl = () => {
  const clientId = getGoogleClientId();
  const baseUrl = getBaseUrl();
  
  if (!clientId) {
    console.error('Google Client ID not found in environment variables');
    return '#';
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${baseUrl}/api/marketing-platforms/google-ads/callback`,
    scope: 'https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/analytics.readonly',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    state: 'google_ads_auth_state'
  });
  
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

export const generateGoogleAnalyticsAuthUrl = () => {
  const clientId = getGoogleClientId();
  const baseUrl = getBaseUrl();
  
  if (!clientId) {
    console.error('Google Client ID not found in environment variables');
    return '#';
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${baseUrl}/api/marketing-platforms/google-analytics/callback`,
    scope: 'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/analytics.manage.users.readonly',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    state: 'google_analytics_auth_state'
  });
  
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

// Combined Google Auth URL for both Ads and Analytics
export const generateCombinedGoogleAuthUrl = () => {
  const clientId = getGoogleClientId();
  const baseUrl = getBaseUrl();
  
  if (!clientId) {
    console.error('Google Client ID not found in environment variables');
    return '#';
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${baseUrl}/api/marketing-platforms/google/callback`,
    scope: 'https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/analytics.manage.users.readonly',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    state: 'google_combined_auth_state'
  });
  
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

export const generateMetaAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_META_APP_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/meta/callback`,
    scope: 'ads_read,ads_management',
    response_type: 'code',
    state: 'meta_auth_state'
  });
  
  return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
};

export const generateTikTokAuthUrl = () => {
  const params = new URLSearchParams({
    client_key: process.env.NEXT_PUBLIC_TIKTOK_APP_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/tiktok/callback`,
    scope: 'user.info.basic,ad.promotion.read',
    response_type: 'code',
    state: 'tiktok_auth_state'
  });
  
  return `https://ads.tiktok.com/marketing_api/auth?${params.toString()}`;
};

export const generateLinkedInAuthUrl = () => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/linkedin/callback`,
    scope: 'r_ads,r_ads_reporting',
    state: 'linkedin_auth_state'
  });
  
  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
};

export const generateTwitterAuthUrl = () => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_TWITTER_API_KEY!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/twitter/callback`,
    scope: 'tweet.read,users.read,offline.access',
    state: 'twitter_auth_state',
    code_challenge: 'challenge',
    code_challenge_method: 'plain'
  });
  
  return `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
};

// Token exchange functions
export const exchangeGoogleCodeForToken = async (code: string, redirectUri: string) => {
  const clientId = getGoogleClientId();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '';
  
  // Log for debugging (remove in production)
  console.log('OAuth Token Exchange:', {
    clientId: clientId ? `${clientId.substring(0, 20)}...` : 'not set',
    hasSecret: !!clientSecret,
    redirectUri
  });
  
  if (!clientId) {
    throw new Error('Google OAuth Client ID not configured. Please check environment variables or oauth-utils.ts');
  }
  
  if (!clientSecret) {
    throw new Error('Google OAuth Client Secret not found in environment variables (GOOGLE_CLIENT_SECRET)');
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Token exchange failed:', error);
    throw new Error(`Token exchange failed: ${error}`);
  }

  const tokenData = await response.json();
  console.log('Token exchange successful, received tokens');
  return tokenData;
};

// Refresh Google access token
export const refreshGoogleToken = async (refreshToken: string) => {
  const clientId = getGoogleClientId();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '';
  
  console.log('OAuth Token Refresh:', {
    clientId: clientId ? `${clientId.substring(0, 20)}...` : 'not set',
    hasSecret: !!clientSecret
  });
  
  if (!clientId) {
    throw new Error('Google OAuth Client ID not configured. Please check environment variables or oauth-utils.ts');
  }
  
  if (!clientSecret) {
    throw new Error('Google OAuth Client Secret not found in environment variables (GOOGLE_CLIENT_SECRET)');
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Token refresh failed:', error);
    throw new Error(`Token refresh failed: ${error}`);
  }

  const tokenData = await response.json();
  console.log('Token refresh successful');
  return tokenData;
};

// Validate Google access token
export const validateGoogleToken = async (accessToken: string) => {
  const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
  
  if (!response.ok) {
    return false;
  }
  
  const tokenInfo = await response.json();
  return tokenInfo.expires_in > 0;
};

export const exchangeMetaCodeForToken = async (code: string) => {
  const response = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_META_APP_ID!,
      client_secret: process.env.META_APP_SECRET!,
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/meta/callback`,
    }),
  });

  return response.json();
};

export const exchangeTikTokCodeForToken = async (code: string) => {
  const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: process.env.NEXT_PUBLIC_TIKTOK_APP_ID!,
      secret: process.env.TIKTOK_APP_SECRET!,
      auth_code: code,
    }),
  });

  return response.json();
};

export const exchangeLinkedInCodeForToken = async (code: string) => {
  const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/linkedin/callback`,
      client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  });

  return response.json();
};

export const exchangeTwitterCodeForToken = async (code: string) => {
  const response = await fetch('https://api.twitter.com/2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(
        `${process.env.NEXT_PUBLIC_TWITTER_API_KEY}:${process.env.TWITTER_API_SECRET}`
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/twitter/callback`,
      code_verifier: 'challenge',
    }),
  });

  return response.json();
};

// Platform connection management functions
export interface PlatformCredentials {
  access_token: string;
  refresh_token?: string;
  expires_at: number;
  scope: string;
  platform: string;
  user_id: string;
}

// Platform connection status check
export const checkPlatformConnection = async (platform: string, userId: string): Promise<{
  connected: boolean;
  expiresAt: number | null;
  scope: string | null;
  needsRefresh: boolean;
}> => {
  try {
    // In a real implementation, this would check your database
    // For now, return a mock response
    const credentials = await getPlatformCredentials(userId, platform);
    
    if (!credentials) {
      return {
        connected: false,
        expiresAt: null,
        scope: null,
        needsRefresh: false
      };
    }

    const now = Date.now();
    const isExpired = credentials.expires_at <= now;
    const needsRefresh = credentials.expires_at <= (now + 5 * 60 * 1000); // Refresh if expires in 5 minutes

    return {
      connected: !isExpired,
      expiresAt: credentials.expires_at,
      scope: credentials.scope,
      needsRefresh
    };
  } catch (error) {
    console.error(`Error checking ${platform} connection for user ${userId}:`, error);
    return {
      connected: false,
      expiresAt: null,
      scope: null,
      needsRefresh: false
    };
  }
};

// Store platform credentials (implement based on your database)
export const storePlatformCredentials = async (
  userId: string,
  platform: string,
  credentials: Omit<PlatformCredentials, 'platform' | 'user_id'>
): Promise<boolean> => {
  try {
    // In a real implementation, this would store encrypted credentials in your database
    // For now, we'll use localStorage as a temporary solution
    
    const platformCredentials: PlatformCredentials = {
      ...credentials,
      platform,
      user_id: userId
    };

    // Store in localStorage (replace with database storage in production)
    const key = `platform_credentials_${userId}_${platform}`;
    localStorage.setItem(key, JSON.stringify(platformCredentials));
    
    console.log(`Stored ${platform} credentials for user ${userId}`);
    return true;
  } catch (error) {
    console.error(`Error storing ${platform} credentials for user ${userId}:`, error);
    return false;
  }
};

// Get platform credentials (implement based on your database)
export const getPlatformCredentials = async (userId: string, platform: string): Promise<PlatformCredentials | null> => {
  try {
    // In a real implementation, this would retrieve and decrypt credentials from your database
    // For now, we'll use localStorage as a temporary solution
    
    const key = `platform_credentials_${userId}_${platform}`;
    const stored = localStorage.getItem(key);
    
    if (!stored) {
      return null;
    }

    const credentials = JSON.parse(stored) as PlatformCredentials;
    
    // Check if token is expired
    if (credentials.expires_at <= Date.now()) {
      // Try to refresh the token if we have a refresh token
      if (credentials.refresh_token && (platform === 'google-ads' || platform === 'google-analytics')) {
        try {
          const newTokens = await refreshGoogleToken(credentials.refresh_token);
          const updatedCredentials = {
            ...credentials,
            access_token: newTokens.access_token,
            expires_at: Date.now() + (newTokens.expires_in * 1000),
            refresh_token: newTokens.refresh_token || credentials.refresh_token
          };
          
          await storePlatformCredentials(userId, platform, updatedCredentials);
          return updatedCredentials;
        } catch (error) {
          console.error(`Failed to refresh ${platform} token:`, error);
          return null;
        }
      }
      
      return null;
    }

    return credentials;
  } catch (error) {
    console.error(`Error getting ${platform} credentials for user ${userId}:`, error);
    return null;
  }
};

// Remove platform credentials
export const removePlatformCredentials = async (userId: string, platform: string): Promise<boolean> => {
  try {
    // In a real implementation, this would remove credentials from your database
    // For now, we'll use localStorage as a temporary solution
    
    const key = `platform_credentials_${userId}_${platform}`;
    localStorage.removeItem(key);
    
    console.log(`Removed ${platform} credentials for user ${userId}`);
    return true;
  } catch (error) {
    console.error(`Error removing ${platform} credentials for user ${userId}:`, error);
    return false;
  }
};

// Get all connected platforms for a user
export const getUserConnectedPlatforms = async (userId: string): Promise<string[]> => {
  try {
    const platforms = ['google-ads', 'google-analytics', 'meta', 'tiktok', 'linkedin', 'twitter'];
    const connectedPlatforms: string[] = [];

    for (const platform of platforms) {
      const connection = await checkPlatformConnection(platform, userId);
      if (connection.connected) {
        connectedPlatforms.push(platform);
      }
    }

    return connectedPlatforms;
  } catch (error) {
    console.error(`Error getting connected platforms for user ${userId}:`, error);
    return [];
  }
};
