import { NextApiRequest, NextApiResponse } from 'next';
import { exchangeGoogleCodeForToken } from '@/lib/oauth-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, state, error } = req.query;

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error);
    return res.redirect(`/dashboard/pro?error=${encodeURIComponent(error as string)}&platform=google-ads`);
  }

  // Verify state parameter to prevent CSRF attacks
  if (state !== 'google_ads_auth_state') {
    console.error('Invalid state parameter');
    return res.redirect('/dashboard/pro?error=invalid_state&platform=google-ads');
  }

  if (!code) {
    console.error('No authorization code received');
    return res.redirect('/dashboard/pro?error=no_code&platform=google-ads');
  }

  try {
    // Log configuration for debugging
    console.log('OAuth Callback Debug Info:');
    console.log('- Authorization code received:', code ? 'Yes' : 'No');
    console.log('- Code length:', (code as string)?.length);
    
    // Exchange authorization code for tokens
    // Use the appropriate base URL based on environment
    const isDevelopment = process.env.NODE_ENV === 'development';
    const baseUrl = isDevelopment ? 'http://localhost:3000' : (process.env.NEXT_PUBLIC_BASE_URL || 'https://siteoptz.ai');
    const redirectUri = `${baseUrl}/api/marketing-platforms/google-ads/callback`;
    
    console.log('- Redirect URI being used:', redirectUri);
    console.log('- Client ID configured:', process.env.GOOGLE_CLIENT_ID ? 'Yes' : 'No');
    console.log('- Client Secret configured:', process.env.GOOGLE_CLIENT_SECRET ? 'Yes' : 'No');
    
    const tokenData = await exchangeGoogleCodeForToken(code as string, redirectUri);

    // Store tokens securely (in production, encrypt and store in database)
    // For now, we'll store in a session or cookie
    // In production, you should:
    // 1. Get the user session
    // 2. Store tokens in database associated with user
    // 3. Encrypt sensitive data
    
    console.log('Successfully exchanged code for tokens');
    console.log('Access token received:', tokenData.access_token ? 'Yes' : 'No');
    console.log('Refresh token received:', tokenData.refresh_token ? 'Yes' : 'No');
    console.log('Token expires in:', tokenData.expires_in, 'seconds');

    // Get user information from Google
    if (tokenData.access_token) {
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`
          }
        });
        
        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();
          console.log('Connected Google account:', userInfo.email);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }

    // Redirect back to dashboard with success
    return res.redirect('/dashboard/pro?success=true&platform=google-ads&connected=true');
    
  } catch (error) {
    console.error('Token exchange error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Token exchange failed';
    return res.redirect(`/dashboard/pro?error=${encodeURIComponent(errorMessage)}&platform=google-ads`);
  }
}