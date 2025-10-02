import { NextApiRequest, NextApiResponse } from 'next';
import { initializeGoogleAds, switchGoogleAdsAccount, getGoogleAdsCampaigns } from '@/lib/google-ads-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accessToken, refreshToken, customerId, dateRange = 'LAST_30_DAYS' } = req.body;

  if (!accessToken || !customerId) {
    return res.status(400).json({ error: 'Access token and customer ID are required' });
  }

  try {
    console.log(`🔍 API: Fetching campaigns for customer: ${customerId}`);
    
    // Initialize the Google Ads API with tokens
    await initializeGoogleAds(accessToken, refreshToken);
    
    // Switch to the specific customer account
    await switchGoogleAdsAccount(customerId);
    
    // Get campaign performance data
    const campaigns = await getGoogleAdsCampaigns(dateRange);
    
    console.log(`📊 API: Successfully loaded ${campaigns.length} campaigns for customer ${customerId}`);
    
    res.status(200).json({ 
      campaigns,
      customerId,
      dateRange,
      count: campaigns.length
    });

  } catch (error) {
    console.error('API: Error fetching campaign data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch campaign data';
    res.status(500).json({ error: errorMessage });
  }
}