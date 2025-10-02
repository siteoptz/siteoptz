import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getPlatformCredentials } from '@/lib/oauth-utils';
import { initializeGoogleAds, getGoogleAdsCampaigns } from '@/lib/google-ads-api';
import { getStoredGoogleAdsAccount } from '@/lib/google-ads-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { dateRange = 'LAST_30_DAYS' } = req.query;

  try {
    // Get stored Google Ads credentials
    const credentials = await getPlatformCredentials(session.user.email, 'google-ads');
    
    if (!credentials) {
      return res.status(400).json({ error: 'Google Ads not connected' });
    }

    // Get selected Google Ads account
    const accountConnection = getStoredGoogleAdsAccount(session.user.email);
    
    if (!accountConnection || !accountConnection.accountInfo) {
      return res.status(400).json({ error: 'No Google Ads account selected' });
    }

    // Initialize Google Ads API with selected account
    await initializeGoogleAds(
      credentials.access_token, 
      credentials.refresh_token, 
      accountConnection.accountInfo.customer_id
    );

    // Get campaign data
    const campaigns = await getGoogleAdsCampaigns(dateRange as string);

    console.log(`Retrieved ${campaigns.length} campaigns for user ${session.user.email}`);

    return res.status(200).json(campaigns);

  } catch (error) {
    console.error('Error fetching Google Ads campaigns:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch campaigns',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}