import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { exchangeGoogleCodeForToken, storePlatformCredentials } from '@/lib/oauth-utils';
import { initializeGoogleAds, getGoogleAdsAccounts } from '@/lib/google-ads-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user || !session.user.email) {
    return res.redirect('/dashboard/pro?tab=platforms&error=unauthorized');
  }

  const { code, error, state } = req.query;

  console.log('Google Ads OAuth Callback:', {
    hasCode: !!code,
    hasError: !!error,
    state,
    user: session.user.email
  });

  if (error) {
    console.error('OAuth error:', error);
    return res.redirect('/dashboard/pro?tab=platforms&error=auth_failed');
  }

  if (!code) {
    console.error('No authorization code received');
    return res.redirect('/dashboard/pro?tab=platforms&error=no_code');
  }

  try {
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing-platforms/google-ads/callback`;
    console.log('Exchanging code for tokens...', { redirectUri });
    
    const tokens = await exchangeGoogleCodeForToken(code as string, redirectUri);
    console.log('Token exchange successful');

    // Store the credentials
    await storePlatformCredentials(session.user.email, 'google-ads', {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: Date.now() + (tokens.expires_in * 1000),
      scope: tokens.scope
    });

    // Initialize Google Ads API to check for MCC accounts
    try {
      await initializeGoogleAds(tokens.access_token, tokens.refresh_token);
      const accounts = await getGoogleAdsAccounts();
      
      console.log(`Found ${accounts.length} accessible accounts`);
      
      // If multiple accounts found, redirect to account selection
      if (accounts.length > 1) {
        // Store accounts temporarily for selection
        const accountData = {
          accounts: accounts,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at: Date.now() + (tokens.expires_in * 1000),
          scope: tokens.scope
        };
        
        // Store in session or temporary storage
        // For now, we'll pass the account data via URL parameters (in production, use secure session storage)
        const accountParam = encodeURIComponent(JSON.stringify(accounts));
        return res.redirect(`/dashboard/pro?tab=platforms&success=google_ads_connected&accounts=${accountParam}`);
      } else if (accounts.length === 1) {
        // Single account, auto-select it
        const account = accounts[0];
        await storePlatformCredentials(session.user.email, 'google-ads-account', {
          selected_account_id: account.customer_id,
          selected_account_name: account.descriptive_name,
          is_mcc: account.manager
        });
        
        return res.redirect('/dashboard/pro?tab=roi-dashboard&success=google_ads_connected&account_selected=true');
      } else {
        // No accounts found
        return res.redirect('/dashboard/pro?tab=platforms&error=no_accounts_found');
      }
    } catch (apiError) {
      console.error('Google Ads API initialization failed:', apiError);
      // Still store the OAuth tokens even if API initialization fails
      return res.redirect('/dashboard/pro?tab=platforms&success=google_ads_connected&warning=api_init_failed');
    }

  } catch (error) {
    console.error('Google Ads OAuth error:', error);
    return res.redirect('/dashboard/pro?tab=platforms&error=token_exchange_failed');
  }
}