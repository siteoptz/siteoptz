import { NextApiRequest, NextApiResponse } from 'next';
import { generateGoogleAdsAuthUrl } from '../../lib/oauth-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Generate the OAuth URL that would be used
  const authUrl = generateGoogleAdsAuthUrl();
  
  // Parse the URL to extract components
  const url = new URL(authUrl);
  const params = Object.fromEntries(url.searchParams);
  
  const result = {
    timestamp: new Date().toISOString(),
    generatedAuthUrl: authUrl,
    components: {
      baseUrl: `${url.protocol}//${url.host}${url.pathname}`,
      clientId: params.client_id,
      redirectUri: params.redirect_uri,
      scope: params.scope,
      responseType: params.response_type,
      accessType: params.access_type,
      prompt: params.prompt,
      state: params.state
    },
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      windowOrigin: req.headers.host ? `http://${req.headers.host}` : 'unknown'
    },
    instructions: {
      message: 'The redirect_uri shown above MUST be added to Google Cloud Console',
      exactUri: params.redirect_uri,
      steps: [
        '1. Go to https://console.cloud.google.com/apis/credentials',
        '2. Find OAuth client: 809428295933-mj14of35mgnfaq8un84u3487eac075ee',
        '3. Click to edit it',
        '4. In "Authorized redirect URIs", add this EXACT URI:',
        `   ${params.redirect_uri}`,
        '5. Save the changes',
        '6. Wait a few minutes for changes to propagate',
        '7. Try OAuth login again'
      ]
    }
  };

  res.status(200).json(result);
}