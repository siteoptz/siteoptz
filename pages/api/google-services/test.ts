// pages/api/google-services/test.ts
// Simple test endpoint to verify Google Services dashboard functionality

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const accessToken = (session as any).accessToken;
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

    return res.status(200).json({
      success: true,
      user: session.user.email,
      hasAccessToken: !!accessToken,
      connectedServices,
      serviceStatus,
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