// pages/api/marketing-platforms/google-ads/connect.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { storeSelectedGoogleAdsAccount, GoogleAdsAccount } from '@/lib/google-ads-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the user session
  const session = await getServerSession(req, res, authOptions);
  
  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized - no session found' });
  }

  const { accountId, accountInfo, accessToken, refreshToken } = req.body;

  if (!accountId || !accountInfo || !accessToken) {
    return res.status(400).json({ 
      error: 'Missing required fields: accountId, accountInfo, accessToken' 
    });
  }

  try {
    console.log('🔗 API: Connecting Google Ads account for user:', session.user.email);
    console.log('- Account ID:', accountId);
    console.log('- Account Name:', accountInfo.name);
    
    // Store the account connection
    const success = await storeSelectedGoogleAdsAccount(
      session.user.email,
      accountId,
      accountInfo as GoogleAdsAccount,
      accessToken,
      refreshToken
    );

    if (!success) {
      throw new Error('Failed to store account connection');
    }

    console.log('✅ API: Successfully connected Google Ads account');

    return res.status(200).json({
      success: true,
      message: 'Google Ads account connected successfully',
      accountId,
      accountName: accountInfo.name
    });

  } catch (error) {
    console.error('API Error connecting Google Ads account:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to connect account';
    
    return res.status(500).json({
      success: false,
      error: 'Failed to connect Google Ads account',
      details: errorMessage
    });
  }
}