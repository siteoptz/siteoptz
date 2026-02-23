// pages/api/marketing-platforms/google-unified/callback.ts
// Unified Google OAuth callback handler for Ads, Search Console, Tag Manager, and Analytics

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { exchangeGoogleCodeForToken } from '../../../../lib/oauth-utils';
import { storeSearchConsoleConnection, getSearchConsoleProperties } from '../../../../lib/google-search-console-client';
import { storeTagManagerConnection } from '../../../../lib/google-tag-manager-client';
import { storeGoogleServiceConnection } from '../../../../lib/google-ads-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get user session
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { code, error, state } = req.query;

    if (error) {
      console.error('OAuth error:', error);
      return res.redirect(`/dashboard/free?error=${encodeURIComponent(error as string)}`);
    }

    if (!code) {
      return res.status(400).json({ error: 'Authorization code not provided' });
    }

    // Verify state parameter
    if (state !== 'google_unified_auth_state') {
      return res.status(400).json({ error: 'Invalid state parameter' });
    }

    // Exchange authorization code for tokens
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? `http://localhost:${process.env.PORT || '3001'}`
      : process.env.NEXT_PUBLIC_BASE_URL || 'https://siteoptz.ai';
    
    const redirectUri = `${baseUrl}/api/marketing-platforms/google-unified/callback`;
    
    const tokenData = await exchangeGoogleCodeForToken(code as string, redirectUri);
    
    const userId = session.user.email;
    const { access_token, refresh_token, expires_in, scope } = tokenData;
    
    console.log('🔐 Unified Google OAuth Success:', {
      userId: userId.substring(0, 20) + '...',
      hasAccessToken: !!access_token,
      hasRefreshToken: !!refresh_token,
      expiresIn: expires_in,
      grantedScopes: scope?.split(' ') || []
    });

    // Parse granted scopes
    const grantedScopes = scope?.split(' ') || [];
    const connectedServices: string[] = [];

    // Handle Google Ads connection
    if (grantedScopes.includes('https://www.googleapis.com/auth/adwords')) {
      try {
        // Store basic Google Ads connection (will be populated with account info later)
        storeGoogleServiceConnection(userId, 'google-ads', {
          platform: 'google-ads',
          accountId: `google-ads-${userId}`, // Placeholder, will be updated when account is selected
          accountInfo: {
            customer_id: '',
            descriptive_name: 'Pending Account Selection',
            currency_code: '',
            time_zone: '',
            manager: false,
            test_account: false,
            pay_per_conversion_eligibility_failure_reasons: []
          },
          accessToken: access_token,
          refreshToken: refresh_token,
          connectedAt: new Date().toISOString(),
          userId,
          expiresAt: Date.now() + (expires_in * 1000),
          scope: scope
        });
        connectedServices.push('google-ads');
        console.log('✅ Google Ads connection stored');
      } catch (error) {
        console.error('❌ Error storing Google Ads connection:', error);
      }
    }

    // Handle Search Console connection
    if (grantedScopes.includes('https://www.googleapis.com/auth/webmasters.readonly')) {
      try {
        // Store Search Console connection and get properties
        const tempConnection = {
          platform: 'search-console' as const,
          accountId: `search-console-${userId}`,
          accountInfo: { site_url: '', permission_level: 'siteUnverifiedUser' as const },
          accessToken: access_token,
          refreshToken: refresh_token,
          connectedAt: new Date().toISOString(),
          userId,
          expiresAt: Date.now() + (expires_in * 1000),
          scope: scope
        };
        
        storeGoogleServiceConnection(userId, 'search-console', tempConnection);
        
        // Try to get properties to validate connection
        const properties = await getSearchConsoleProperties(userId);
        console.log('✅ Search Console connection stored, found properties:', properties.length);
        
        connectedServices.push('search-console');
      } catch (error) {
        console.error('❌ Error storing Search Console connection:', error);
      }
    }

    // Handle Tag Manager connection
    if (grantedScopes.includes('https://www.googleapis.com/auth/tagmanager.readonly')) {
      try {
        await storeTagManagerConnection(userId, access_token, refresh_token, expires_in, scope);
        connectedServices.push('tag-manager');
        console.log('✅ Tag Manager connection stored');
      } catch (error) {
        console.error('❌ Error storing Tag Manager connection:', error);
      }
    }

    // Handle Analytics connection (if included in scope)
    if (grantedScopes.includes('https://www.googleapis.com/auth/analytics.readonly')) {
      try {
        storeGoogleServiceConnection(userId, 'analytics', {
          platform: 'analytics',
          accountId: `analytics-${userId}`,
          accountInfo: { account_id: '', name: '', properties: [] },
          accessToken: access_token,
          refreshToken: refresh_token,
          connectedAt: new Date().toISOString(),
          userId,
          expiresAt: Date.now() + (expires_in * 1000),
          scope: scope
        });
        connectedServices.push('analytics');
        console.log('✅ Google Analytics connection stored');
      } catch (error) {
        console.error('❌ Error storing Analytics connection:', error);
      }
    }

    console.log('🎉 Connected Google services:', connectedServices);

    // Redirect back to dashboard with success message
    const successMessage = connectedServices.length > 0 
      ? `Successfully connected ${connectedServices.join(', ')}`
      : 'Connected to Google services';
    
    res.redirect(`/dashboard/free?success=${encodeURIComponent(successMessage)}&services=${connectedServices.join(',')}`);

  } catch (error) {
    console.error('❌ Unified Google OAuth callback error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown OAuth error';
    res.redirect(`/dashboard/free?error=${encodeURIComponent(errorMessage)}`);
  }
}