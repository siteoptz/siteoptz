// lib/oauth-utils.ts
// OAuth utility functions for Marketing ROI tool
// Enhanced with comprehensive error handling and debugging

// Enhanced environment variable detection with debugging
const getGoogleClientId = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || '';
  
  if (typeof window === 'undefined') {
    // Server-side: log available environment variables for debugging
    console.log('🔑 OAuth Debug - Environment variables check:', {
      hasNextPublicClientId: !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      hasServerClientId: !!process.env.GOOGLE_CLIENT_ID,
      nodeEnv: process.env.NODE_ENV,
      clientIdPrefix: clientId ? clientId.substring(0, 20) + '...' : 'not found'
    });
  }
  
  if (!clientId) {
    console.error('❌ Google Client ID not found in environment variables');
    console.error('Please ensure NEXT_PUBLIC_GOOGLE_CLIENT_ID or GOOGLE_CLIENT_ID is set');
  }
  
  return clientId;
};

// Enhanced URL construction with validation
const getBaseUrl = () => {
  let baseUrl: string;
  
  if (typeof window !== 'undefined') {
    // Client-side: use window.location.origin
    baseUrl = window.location.origin;
    console.log('🌐 Client-side base URL detected:', baseUrl);
  } else {
    // Server-side: check environment
    if (process.env.NODE_ENV === 'development') {
      // Use port 3001 for development
      const port = process.env.PORT || '3001';
      baseUrl = `http://localhost:${port}`;
    } else {
      baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://siteoptz.ai';
    }
    console.log('🌐 Server-side base URL determined:', baseUrl, {
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT,
      hasNextPublicBaseUrl: !!process.env.NEXT_PUBLIC_BASE_URL
    });
  }
  
  // Validate URL format
  try {
    new URL(baseUrl);
  } catch (error) {
    console.error('❌ Invalid base URL format:', baseUrl);
    throw new Error(`Invalid base URL: ${baseUrl}`);
  }
  
  return baseUrl;
};

// Enhanced error logging for OAuth debugging
const logOAuthDebugInfo = (context: string, data: any) => {
  console.log(`🔐 OAuth Debug [${context}]:`, {
    timestamp: new Date().toISOString(),
    ...data
  });
};

export const generateGoogleAdsAuthUrl = () => {
  try {
    const clientId = getGoogleClientId();
    const baseUrl = getBaseUrl();
    
    logOAuthDebugInfo('generateGoogleAdsAuthUrl', {
      clientId: clientId ? `${clientId.substring(0, 20)}...` : 'not set',
      baseUrl,
      environment: process.env.NODE_ENV,
      hasClientId: !!clientId
    });
    
    if (!clientId) {
      const errorMsg = 'Google Client ID not found in environment variables';
      console.error('❌', errorMsg);
      throw new Error(errorMsg);
    }

    const redirectUri = `${baseUrl}/api/marketing-platforms/google-ads/callback`;
    
    // Validate redirect URI
    try {
      new URL(redirectUri);
    } catch (error) {
      throw new Error(`Invalid redirect URI: ${redirectUri}`);
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/tagmanager.readonly https://www.googleapis.com/auth/analytics.readonly',
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
      state: 'google_ads_auth_state',
      include_granted_scopes: 'true'
    });
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    
    logOAuthDebugInfo('generateGoogleAdsAuthUrl - Success', {
      authUrlLength: authUrl.length,
      redirectUri,
      hasRequiredParams: !!(clientId && redirectUri)
    });
    
    return authUrl;
  } catch (error) {
    console.error('❌ Error generating Google Ads Auth URL:', error);
    logOAuthDebugInfo('generateGoogleAdsAuthUrl - Error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return '#'; // Safe fallback
  }
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

// Combined Google Auth URL for both Ads and Analytics (legacy)
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
    scope: 'https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/tagmanager.readonly https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/analytics.manage.users.readonly',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    state: 'google_combined_auth_state'
  });
  
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

// Unified Google Services Auth URL for Ads, Search Console, Tag Manager, and Analytics
export const generateUnifiedGoogleServicesAuthUrl = () => {
  try {
    const clientId = getGoogleClientId();
    const baseUrl = getBaseUrl();
    
    logOAuthDebugInfo('generateUnifiedGoogleServicesAuthUrl', {
      clientId: clientId ? `${clientId.substring(0, 20)}...` : 'not set',
      baseUrl,
      environment: process.env.NODE_ENV,
      hasClientId: !!clientId
    });
    
    if (!clientId) {
      const errorMsg = 'Google Client ID not found in environment variables';
      console.error('❌', errorMsg);
      throw new Error(errorMsg);
    }

    const redirectUri = `${baseUrl}/api/marketing-platforms/google-unified/callback`;
    
    // Validate redirect URI
    try {
      new URL(redirectUri);
    } catch (error) {
      throw new Error(`Invalid redirect URI: ${redirectUri}`);
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/tagmanager.readonly https://www.googleapis.com/auth/analytics.readonly',
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
      state: 'google_unified_auth_state',
      include_granted_scopes: 'true'
    });
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    
    logOAuthDebugInfo('generateUnifiedGoogleServicesAuthUrl - Success', {
      authUrlLength: authUrl.length,
      redirectUri,
      hasRequiredParams: !!(clientId && redirectUri)
    });
    
    return authUrl;
  } catch (error) {
    console.error('❌ Error generating Unified Google Services Auth URL:', error);
    logOAuthDebugInfo('generateUnifiedGoogleServicesAuthUrl - Error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return '#'; // Safe fallback
  }
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

// Enhanced token exchange with comprehensive error handling
export const exchangeGoogleCodeForToken = async (code: string, redirectUri: string) => {
  try {
    const clientId = getGoogleClientId();
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '';
    
    logOAuthDebugInfo('exchangeGoogleCodeForToken - Start', {
      clientId: clientId ? `${clientId.substring(0, 20)}...` : 'not set',
      hasSecret: !!clientSecret,
      redirectUri,
      codeLength: code?.length || 0,
      environment: process.env.NODE_ENV
    });
    
    // Validate inputs
    if (!code) {
      throw new Error('Authorization code is required');
    }
    
    if (!clientId) {
      throw new Error('Google OAuth Client ID not configured. Please check environment variables');
    }
    
    if (!clientSecret) {
      throw new Error('Google OAuth Client Secret not found in environment variables (GOOGLE_CLIENT_SECRET)');
    }

    // Validate redirect URI format
    try {
      new URL(redirectUri);
    } catch (error) {
      throw new Error(`Invalid redirect URI format: ${redirectUri}`);
    }

    const tokenEndpoint = 'https://oauth2.googleapis.com/token';
    const requestBody = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    });

    logOAuthDebugInfo('exchangeGoogleCodeForToken - Making Request', {
      endpoint: tokenEndpoint,
      bodyParams: Object.fromEntries(requestBody.entries()),
      requestSize: requestBody.toString().length
    });

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'SiteOptz-OAuth/1.0'
      },
      body: requestBody,
    });

    logOAuthDebugInfo('exchangeGoogleCodeForToken - Response', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      const errorText = await response.text();
      
      logOAuthDebugInfo('exchangeGoogleCodeForToken - Error Response', {
        status: response.status,
        errorText,
        clientIdUsed: clientId.substring(0, 20) + '...',
        redirectUriUsed: redirectUri
      });
      
      let errorMessage = 'Token exchange failed';
      let errorDetails = '';
      
      try {
        const errorData = JSON.parse(errorText);
        const errorCode = errorData.error;
        
        switch (errorCode) {
          case 'invalid_client':
            errorMessage = 'Invalid OAuth credentials. Please check Google Cloud Console configuration.';
            errorDetails = 'The client ID or secret is incorrect or not properly configured.';
            break;
          case 'invalid_grant':
            errorMessage = 'Invalid or expired authorization code.';
            errorDetails = 'The authorization code has expired or is invalid. Please restart the OAuth flow.';
            break;
          case 'redirect_uri_mismatch':
            errorMessage = 'Redirect URI mismatch. Please check Google Cloud Console settings.';
            errorDetails = `Expected URI: ${redirectUri}. Verify this URL is configured in Google Cloud Console.`;
            break;
          case 'unauthorized_client':
            errorMessage = 'OAuth client not authorized for this grant type.';
            errorDetails = 'Check that the OAuth client is configured for web applications.';
            break;
          default:
            errorMessage = errorData.error_description || errorData.error || 'Unknown OAuth error';
            errorDetails = errorText;
        }
      } catch (parseError) {
        errorMessage = `HTTP ${response.status}: ${errorText}`;
        errorDetails = errorText;
      }
      
      const fullError = new Error(errorMessage);
      (fullError as any).details = errorDetails;
      (fullError as any).status = response.status;
      throw fullError;
    }

    const tokenData = await response.json();
    
    logOAuthDebugInfo('exchangeGoogleCodeForToken - Success', {
      hasAccessToken: !!tokenData.access_token,
      hasRefreshToken: !!tokenData.refresh_token,
      expiresIn: tokenData.expires_in,
      tokenType: tokenData.token_type,
      scope: tokenData.scope
    });
    
    // Validate token response
    if (!tokenData.access_token) {
      throw new Error('No access token received from Google OAuth');
    }
    
    return tokenData;
  } catch (error) {
    logOAuthDebugInfo('exchangeGoogleCodeForToken - Fatal Error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
};

// Enhanced refresh token function with comprehensive error handling
export const refreshGoogleToken = async (refreshToken: string) => {
  try {
    const clientId = getGoogleClientId();
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '';
    
    logOAuthDebugInfo('refreshGoogleToken - Start', {
      clientId: clientId ? `${clientId.substring(0, 20)}...` : 'not set',
      hasSecret: !!clientSecret,
      hasRefreshToken: !!refreshToken,
      refreshTokenLength: refreshToken?.length || 0
    });
    
    // Validate inputs
    if (!refreshToken) {
      throw new Error('Refresh token is required');
    }
    
    if (!clientId) {
      throw new Error('Google OAuth Client ID not configured. Please check environment variables');
    }
    
    if (!clientSecret) {
      throw new Error('Google OAuth Client Secret not found in environment variables (GOOGLE_CLIENT_SECRET)');
    }

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'SiteOptz-OAuth/1.0'
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    logOAuthDebugInfo('refreshGoogleToken - Response', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      const errorText = await response.text();
      
      logOAuthDebugInfo('refreshGoogleToken - Error', {
        status: response.status,
        errorText
      });
      
      let errorMessage = 'Token refresh failed';
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error === 'invalid_grant') {
          errorMessage = 'Refresh token is invalid or expired. Please re-authenticate.';
        } else if (errorData.error === 'invalid_client') {
          errorMessage = 'Invalid OAuth client credentials.';
        } else {
          errorMessage = errorData.error_description || errorData.error || errorText;
        }
      } catch (parseError) {
        errorMessage = `HTTP ${response.status}: ${errorText}`;
      }
      
      throw new Error(errorMessage);
    }

    const tokenData = await response.json();
    
    logOAuthDebugInfo('refreshGoogleToken - Success', {
      hasAccessToken: !!tokenData.access_token,
      hasNewRefreshToken: !!tokenData.refresh_token,
      expiresIn: tokenData.expires_in
    });
    
    if (!tokenData.access_token) {
      throw new Error('No access token received from refresh');
    }
    
    return tokenData;
  } catch (error) {
    logOAuthDebugInfo('refreshGoogleToken - Fatal Error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
};

// Enhanced token validation with detailed error handling
export const validateGoogleToken = async (accessToken: string) => {
  try {
    logOAuthDebugInfo('validateGoogleToken - Start', {
      hasAccessToken: !!accessToken,
      tokenLength: accessToken?.length || 0
    });
    
    if (!accessToken) {
      throw new Error('Access token is required for validation');
    }
    
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`, {
      headers: {
        'User-Agent': 'SiteOptz-OAuth/1.0'
      }
    });
    
    logOAuthDebugInfo('validateGoogleToken - Response', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });
    
    if (!response.ok) {
      logOAuthDebugInfo('validateGoogleToken - Invalid', {
        status: response.status,
        reason: 'HTTP response not ok'
      });
      return false;
    }
    
    const tokenInfo = await response.json();
    const isValid = tokenInfo.expires_in > 0;
    
    logOAuthDebugInfo('validateGoogleToken - Result', {
      isValid,
      expiresIn: tokenInfo.expires_in,
      audience: tokenInfo.aud,
      scope: tokenInfo.scope
    });
    
    return isValid;
  } catch (error) {
    logOAuthDebugInfo('validateGoogleToken - Error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return false;
  }
};

// Utility function to make authenticated API requests with proper error handling
export const makeAuthenticatedRequest = async (
  url: string, 
  options: RequestInit = {}, 
  accessToken?: string
): Promise<Response> => {
  try {
    logOAuthDebugInfo('makeAuthenticatedRequest - Start', {
      url,
      method: options.method || 'GET',
      hasAccessToken: !!accessToken,
      hasBody: !!options.body
    });
    
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'SiteOptz-OAuth/1.0',
      ...(options.headers || {}),
      ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
    };
    
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    logOAuthDebugInfo('makeAuthenticatedRequest - Response', {
      url,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      contentType: response.headers.get('content-type')
    });
    
    return response;
  } catch (error) {
    logOAuthDebugInfo('makeAuthenticatedRequest - Error', {
      url,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
};

// Helper function to check if URL endpoints exist (for debugging 404s)
export const checkEndpointAvailability = async (baseUrl: string): Promise<{
  available: boolean;
  checkedEndpoints: { [key: string]: boolean };
  errors: string[];
}> => {
  const endpoints = [
    '/api/google-ads/validate',
    '/api/google-ads/accounts',
    '/api/google-ads/store-account',
    '/api/marketing-platforms/google-ads/callback',
    '/api/marketing-platforms/google-ads/accounts'
  ];
  
  const result = {
    available: true,
    checkedEndpoints: {} as { [key: string]: boolean },
    errors: [] as string[]
  };
  
  logOAuthDebugInfo('checkEndpointAvailability - Start', {
    baseUrl,
    endpointsToCheck: endpoints.length
  });
  
  for (const endpoint of endpoints) {
    try {
      const url = `${baseUrl}${endpoint}`;
      const response = await fetch(url, { 
        method: 'HEAD',
        headers: { 'User-Agent': 'SiteOptz-OAuth/1.0' }
      });
      
      // For API routes, 405 (Method Not Allowed) means the endpoint exists
      const exists = response.status !== 404;
      result.checkedEndpoints[endpoint] = exists;
      
      if (!exists) {
        result.available = false;
        result.errors.push(`Endpoint not found: ${endpoint}`);
      }
      
      logOAuthDebugInfo('checkEndpointAvailability - Endpoint Check', {
        endpoint,
        status: response.status,
        exists
      });
      
    } catch (error) {
      result.checkedEndpoints[endpoint] = false;
      result.available = false;
      const errorMsg = `Error checking ${endpoint}: ${error instanceof Error ? error.message : 'Unknown error'}`;
      result.errors.push(errorMsg);
      
      logOAuthDebugInfo('checkEndpointAvailability - Endpoint Error', {
        endpoint,
        error: errorMsg
      });
    }
  }
  
  logOAuthDebugInfo('checkEndpointAvailability - Complete', {
    overallAvailable: result.available,
    errorCount: result.errors.length,
    availableEndpoints: Object.entries(result.checkedEndpoints).filter(([_, available]) => available).length
  });
  
  return result;
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
  accounts?: any[]; // For storing Google Ads accounts during selection process
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
