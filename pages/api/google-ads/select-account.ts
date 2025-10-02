import { NextApiRequest, NextApiResponse } from 'next';
import { initializeGoogleAds, switchGoogleAdsAccount } from '@/lib/google-ads-api';
import { storeGoogleAdsAccount } from '@/lib/google-ads-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accessToken, refreshToken, customerId, accountInfo, userId } = req.body;

  if (!accessToken || !customerId || !accountInfo || !userId) {
    return res.status(400).json({ 
      error: 'Access token, customer ID, account info, and user ID are required' 
    });
  }

  try {
    console.log(`🔍 API: Selecting and storing account ${customerId} for user ${userId}`);
    
    // Initialize the Google Ads API with tokens
    await initializeGoogleAds(accessToken, refreshToken);
    
    // Switch to the specific customer account to validate access
    await switchGoogleAdsAccount(customerId);
    
    // Create connection data structure
    const connectionData = {
      platform: 'google-ads',
      accountId: customerId,
      accountInfo,
      accessToken,
      refreshToken,
      connectedAt: new Date().toISOString(),
      userId,
      expiresAt: Date.now() + (3600 * 1000) // 1 hour from now
    };
    
    // Store the connection in localStorage (client-side will handle this)
    console.log(`✅ API: Successfully selected and validated account ${customerId}`);
    
    res.status(200).json({ 
      success: true,
      customerId,
      connectionData,
      message: 'Account selected and validated successfully'
    });

  } catch (error) {
    console.error('API: Error selecting Google Ads account:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to select account';
    res.status(500).json({ error: errorMessage });
  }
}