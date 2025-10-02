import { NextApiRequest, NextApiResponse } from 'next';
import { initializeGoogleAds, getGoogleAdsAccounts } from '@/lib/google-ads-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accessToken, refreshToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is required' });
  }

  try {
    console.log('🔍 API: Validating Google Ads access...');
    
    // Initialize the Google Ads API with tokens
    await initializeGoogleAds(accessToken, refreshToken);
    
    // Try to get accessible accounts to validate access
    const accounts = await getGoogleAdsAccounts();
    
    const accountCount = accounts.length;
    const hasManagerAccess = accounts.some(account => account.manager);

    console.log(`✅ API: Access validated. Found ${accountCount} accounts. Manager access: ${hasManagerAccess}`);
    
    res.status(200).json({
      valid: true,
      accountCount,
      hasManagerAccess
    });

  } catch (error) {
    console.error('API: Error validating Google Ads access:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(200).json({
      valid: false,
      accountCount: 0,
      hasManagerAccess: false,
      error: errorMessage
    });
  }
}