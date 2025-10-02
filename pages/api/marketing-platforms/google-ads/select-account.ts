import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { storePlatformCredentials } from '@/lib/oauth-utils';
import { switchGoogleAdsAccount } from '@/lib/google-ads-api';
import { storeGoogleAdsAccount } from '@/lib/google-ads-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { accountId, accountName, isMcc } = req.body;

  if (!accountId) {
    return res.status(400).json({ error: 'Account ID is required' });
  }

  try {
    // Store the selected account information using Google Ads client
    const connectionData = {
      platform: 'google-ads',
      accountId: accountId,
      accountInfo: {
        customer_id: accountId,
        descriptive_name: accountName,
        manager: isMcc || false
      },
      connectedAt: new Date().toISOString(),
      userId: session.user.email,
      expiresAt: Date.now() + (3600 * 1000)
    };
    
    storeGoogleAdsAccount(session.user.email, connectionData);

    // Switch to the selected account in the Google Ads API
    await switchGoogleAdsAccount(accountId);

    console.log(`User ${session.user.email} selected Google Ads account: ${accountId} (${accountName})`);

    return res.status(200).json({ 
      success: true, 
      message: 'Account selected successfully',
      account: {
        id: accountId,
        name: accountName,
        is_mcc: isMcc
      }
    });

  } catch (error) {
    console.error('Error selecting Google Ads account:', error);
    return res.status(500).json({ 
      error: 'Failed to select account',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
