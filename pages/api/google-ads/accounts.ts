import { NextApiRequest, NextApiResponse } from 'next';
import { googleAdsService, GoogleAdsAccount, initializeGoogleAds, getGoogleAdsAccounts } from '@/lib/google-ads-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accessToken, refreshToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is required' });
  }

  try {
    console.log('🔍 API: Initializing Google Ads API with tokens...');
    
    // Initialize the Google Ads API with tokens
    await initializeGoogleAds(accessToken, refreshToken);
    
    console.log('🔍 API: Fetching accessible Google Ads accounts...');
    
    // Get all accessible accounts (including MCC accounts)
    const accounts = await getGoogleAdsAccounts();
    
    if (accounts.length === 0) {
      return res.status(404).json({ 
        error: 'No Google Ads accounts found. Please ensure you have access to Google Ads accounts.' 
      });
    }

    // Check if any accounts are manager accounts
    const hasManagerAccess = accounts.some(account => account.manager);

    console.log(`📊 API: Successfully loaded ${accounts.length} Google Ads accounts`);
    console.log(`📊 API: Manager access: ${hasManagerAccess}`);
    
    res.status(200).json({ 
      accounts,
      accountCount: accounts.length,
      hasManagerAccess
    });

  } catch (error) {
    console.error('API: Error fetching Google Ads accounts:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch Google Ads accounts';
    res.status(500).json({ error: errorMessage });
  }
}