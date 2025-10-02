import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getPlatformCredentials } from '@/lib/oauth-utils';
import { initializeGoogleAds, getGoogleAdsAccounts } from '@/lib/google-ads-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Get stored Google Ads credentials
    const credentials = await getPlatformCredentials(session.user.email, 'google-ads');
    
    if (!credentials) {
      return res.status(400).json({ error: 'Google Ads not connected' });
    }

    // Initialize Google Ads API
    await initializeGoogleAds(credentials.access_token, credentials.refresh_token);

    // Get accessible accounts
    const accounts = await getGoogleAdsAccounts();

    console.log(`Retrieved ${accounts.length} accounts for user ${session.user.email}`);

    return res.status(200).json(accounts);

  } catch (error) {
    console.error('Error fetching Google Ads accounts:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch accounts',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}