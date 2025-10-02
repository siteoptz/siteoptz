// pages/api/marketing-platforms/google-ads/accounts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGoogleAdsAccounts, validateGoogleAdsAccess } from '@/lib/google-ads-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { access_token } = req.query;

  if (!access_token) {
    return res.status(400).json({ error: 'Access token is required' });
  }

  try {
    console.log('🔍 API: Fetching Google Ads accounts...');
    
    // First validate the access token
    const validation = await validateGoogleAdsAccess(access_token as string);
    
    if (!validation.valid) {
      return res.status(401).json({ 
        error: 'Invalid access token or insufficient permissions',
        details: validation.error 
      });
    }

    // Fetch accounts
    const accounts = await fetchGoogleAdsAccounts(access_token as string);
    
    console.log(`✅ API: Successfully fetched ${accounts.length} accounts`);
    
    return res.status(200).json({
      success: true,
      accounts,
      accountCount: accounts.length,
      hasManagerAccess: validation.hasManagerAccess
    });

  } catch (error) {
    console.error('API Error fetching Google Ads accounts:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch accounts';
    
    return res.status(500).json({
      error: 'Failed to fetch Google Ads accounts',
      details: errorMessage
    });
  }
}