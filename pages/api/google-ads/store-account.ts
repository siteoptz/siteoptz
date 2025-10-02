import { NextApiRequest, NextApiResponse } from 'next';

export interface GoogleAdsAccount {
  id: string;
  name: string;
  descriptiveName: string;
  currencyCode: string;
  timeZone: string;
  testAccount: boolean;
  manager: boolean;
  canManageClients: boolean;
  customerId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, accountId, accountInfo, accessToken, refreshToken } = req.body;

  if (!userId || !accountId || !accountInfo) {
    return res.status(400).json({ error: 'Missing required fields: userId, accountId, accountInfo' });
  }

  try {
    console.log('🔗 API: Storing Google Ads account for user:', userId);
    console.log('🔗 API: Selected account:', accountId, accountInfo.name);
    
    // In a real implementation, this would store in your database
    // For now, return success and let the client handle localStorage storage
    
    const connectionData = {
      platform: 'google-ads',
      accountId: accountId,
      accountInfo: accountInfo,
      accessToken: accessToken,
      refreshToken: refreshToken,
      connectedAt: new Date().toISOString(),
      userId: userId,
      expiresAt: Date.now() + (3600 * 1000) // 1 hour default expiry
    };
    
    console.log('✅ API: Successfully prepared Google Ads account connection data');
    
    res.status(200).json({ 
      success: true, 
      connectionData,
      message: `Google Ads account ${accountInfo.name} connected successfully`
    });

  } catch (error) {
    console.error('API: Error storing Google Ads account:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to store account connection';
    res.status(500).json({ error: errorMessage });
  }
}