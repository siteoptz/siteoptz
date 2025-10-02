import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const nextPublicClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  
  // Get the actual host from the request
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const actualBaseUrl = `${protocol}://${host}`;
  
  // Check what URL we're actually running on
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const debugInfo = {
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      isDevelopment,
      actualRequestUrl: actualBaseUrl,
      configuredBaseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    },
    credentials: {
      clientIdSet: !!clientId,
      clientId: clientId || 'NOT SET',
      clientSecretSet: !!clientSecret,
      clientSecretPreview: clientSecret ? `${clientSecret.substring(0, 15)}...` : 'NOT SET',
      nextPublicClientIdSet: !!nextPublicClientId,
      nextPublicClientId: nextPublicClientId || 'NOT SET',
      clientIdsMatch: clientId === nextPublicClientId,
    },
    redirectUris: {
      production: 'https://siteoptz.ai/api/marketing-platforms/google-ads/callback',
      localhost: 'http://localhost:3000/api/marketing-platforms/google-ads/callback',
      actualWillUse: `${actualBaseUrl}/api/marketing-platforms/google-ads/callback`,
    },
    oauthUrls: {
      generatedUrl: generateOAuthUrl(actualBaseUrl, clientId || ''),
      localhostUrl: generateOAuthUrl('http://localhost:3000', clientId || ''),
      productionUrl: generateOAuthUrl('https://siteoptz.ai', clientId || ''),
    },
    instructions: {
      step1: 'Ensure ALL these redirect URIs are added to your OAuth client in Google Cloud Console:',
      redirectUrisNeeded: [
        'http://localhost:3000/api/marketing-platforms/google-ads/callback',
        'https://siteoptz.ai/api/marketing-platforms/google-ads/callback',
        `${actualBaseUrl}/api/marketing-platforms/google-ads/callback`,
      ],
      step2: 'The OAuth URL being generated uses:',
      currentRedirectUri: `${actualBaseUrl}/api/marketing-platforms/google-ads/callback`,
      step3: 'If this redirect URI is not in Google Cloud Console, the auth will fail',
    }
  };
  
  res.status(200).json(debugInfo);
}

function generateOAuthUrl(baseUrl: string, clientId: string): string {
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
}