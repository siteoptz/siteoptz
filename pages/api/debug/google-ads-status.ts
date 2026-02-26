// Debug endpoint to check Google Ads API status in production
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getValidAccessToken } from '../../lib/google-token-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    console.log('🔍 Google Ads API Status Check for:', session.user.email);

    const accessToken = await getValidAccessToken(req);
    
    const debugInfo = {
      user: session.user.email,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      
      // Token status
      tokenStatus: {
        hasAccessToken: !!accessToken,
        accessTokenLength: accessToken ? accessToken.length : 0,
        hasDevToken: !!process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
        devTokenValue: process.env.GOOGLE_ADS_DEVELOPER_TOKEN ? 
          process.env.GOOGLE_ADS_DEVELOPER_TOKEN.substring(0, 10) + '...' : 'MISSING'
      },

      // OAuth session details
      sessionInfo: {
        hasRefreshToken: !!(session as any).refreshToken,
        scopes: (session as any).googleScope || 'No scopes',
        expiresAt: (session as any).expiresAt || 'Unknown'
      }
    };

    console.log('🔧 Debug info:', debugInfo);

    // Test a simple Google Ads API call
    let apiTestResult = null;
    if (accessToken && process.env.GOOGLE_ADS_DEVELOPER_TOKEN) {
      console.log('🧪 Testing Google Ads API call...');
      
      try {
        const testResponse = await fetch('https://googleads.googleapis.com/v14/customers:listAccessibleCustomers', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
            'Content-Type': 'application/json',
          },
        });

        const responseText = await testResponse.text();
        
        apiTestResult = {
          status: testResponse.status,
          statusText: testResponse.statusText,
          success: testResponse.ok,
          responsePreview: responseText.substring(0, 500) + (responseText.length > 500 ? '...' : ''),
          headers: Object.fromEntries(testResponse.headers.entries())
        };

        console.log('🧪 API Test Result:', apiTestResult);

      } catch (apiError) {
        console.error('🧪 API Test Failed:', apiError);
        apiTestResult = {
          error: apiError instanceof Error ? apiError.message : 'Unknown API error'
        };
      }
    }

    return res.status(200).json({
      success: true,
      debug: debugInfo,
      apiTest: apiTestResult
    });

  } catch (error) {
    console.error('Error in Google Ads status check:', error);
    return res.status(500).json({ 
      error: 'Failed to check Google Ads status',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}