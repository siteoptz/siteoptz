import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getPlatformCredentials } from '@/lib/oauth-utils';
import { initializeGoogleAds, getGoogleAdsCampaigns, getGoogleAdsMetrics } from '@/lib/google-ads-api';
import { getStoredGoogleAdsAccount } from '@/lib/google-ads-client';
import { analyzeAccount, generateSmartRecommendations } from '@/lib/ai-recommendations';

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

    // Get campaign data and metrics
    const [campaigns, metrics] = await Promise.all([
      getGoogleAdsCampaigns(dateRange as string),
      getGoogleAdsMetrics(dateRange as string)
    ]);

    // Generate AI recommendations
    const accountAnalysis = analyzeAccount(campaigns, metrics);
    const smartRecommendations = generateSmartRecommendations(campaigns, metrics);

    const recommendations = {
      account_analysis: accountAnalysis,
      smart_recommendations: smartRecommendations,
      generated_at: new Date().toISOString(),
      data_period: dateRange,
      total_campaigns: campaigns.length,
      total_recommendations: smartRecommendations.length
    };

    console.log(`Generated ${smartRecommendations.length} recommendations for user ${session.user.email}`);

    return res.status(200).json(recommendations);

  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    return res.status(500).json({ 
      error: 'Failed to generate recommendations',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
