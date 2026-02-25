// pages/api/google-services/test.ts
// Simple test endpoint to verify Google Services dashboard functionality

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getValidAccessToken } from '../../../lib/google-token-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const accessToken = await getValidAccessToken(req);
    const googleScope = (session as any).googleScope || '';
    
    console.log('🧪 Testing Google Services API access for user:', session.user.email);
    console.log('🔐 Available scopes:', googleScope);

    // Check which services are available
    const serviceStatus = {
      googleAds: {
        available: googleScope.includes('https://www.googleapis.com/auth/adwords'),
        scope: 'https://www.googleapis.com/auth/adwords'
      },
      searchConsole: {
        available: googleScope.includes('https://www.googleapis.com/auth/webmasters.readonly'),
        scope: 'https://www.googleapis.com/auth/webmasters.readonly'
      },
      tagManager: {
        available: googleScope.includes('https://www.googleapis.com/auth/tagmanager.readonly'),
        scope: 'https://www.googleapis.com/auth/tagmanager.readonly'
      },
      analytics: {
        available: googleScope.includes('https://www.googleapis.com/auth/analytics.readonly'),
        scope: 'https://www.googleapis.com/auth/analytics.readonly'
      }
    };

    const connectedServices = Object.entries(serviceStatus)
      .filter(([_, service]) => service.available)
      .map(([name, _]) => name);

    // Test actual API calls if access token is available
    const apiTests: any = {};
    
    if (accessToken) {
      console.log('🧪 Testing actual Google API calls...');
      
      // Test Google Ads API
      if (serviceStatus.googleAds.available) {
        try {
          const adsResponse = await fetch('https://googleads.googleapis.com/v14/customers:listAccessibleCustomers', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
              'Content-Type': 'application/json',
            },
          });

          apiTests.googleAds = {
            endpoint: 'customers:listAccessibleCustomers',
            status: adsResponse.status,
            success: adsResponse.ok,
            hasDevToken: !!process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
            devTokenValue: process.env.GOOGLE_ADS_DEVELOPER_TOKEN ? 'PRESENT' : 'MISSING'
          };

          if (adsResponse.ok) {
            const adsData = await adsResponse.json();
            apiTests.googleAds.customerCount = adsData.resourceNames?.length || 0;
            console.log('✅ Google Ads API success - customers found:', apiTests.googleAds.customerCount);
          } else {
            const adsError = await adsResponse.text();
            apiTests.googleAds.errorDetails = adsError;
            console.log('❌ Google Ads API error:', adsResponse.status, adsError);
          }
        } catch (error) {
          apiTests.googleAds = { error: error instanceof Error ? error.message : 'Unknown error' };
        }
      }

      // Test Analytics API
      if (serviceStatus.analytics.available) {
        try {
          const analyticsResponse = await fetch('https://analyticsadmin.googleapis.com/v1beta/accounts', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          apiTests.analytics = {
            endpoint: 'accounts',
            status: analyticsResponse.status,
            success: analyticsResponse.ok
          };

          if (analyticsResponse.ok) {
            const analyticsData = await analyticsResponse.json();
            apiTests.analytics.accountCount = analyticsData.accounts?.length || 0;
            console.log('✅ Analytics API success - accounts found:', apiTests.analytics.accountCount);
          } else {
            const analyticsError = await analyticsResponse.text();
            apiTests.analytics.errorDetails = analyticsError;
            console.log('❌ Analytics API error:', analyticsResponse.status, analyticsError);
          }
        } catch (error) {
          apiTests.analytics = { error: error instanceof Error ? error.message : 'Unknown error' };
        }
      }
    }

    return res.status(200).json({
      success: true,
      user: session.user.email,
      hasAccessToken: !!accessToken,
      connectedServices,
      serviceStatus,
      apiTests,
      totalConnected: connectedServices.length,
      message: `Successfully connected to ${connectedServices.length} Google service(s)`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in Google Services test endpoint:', error);
    return res.status(500).json({ 
      error: 'Failed to test Google Services access',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}