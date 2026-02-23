// pages/api/marketing-platforms/google-unified/status.ts
// API endpoint to check the status of Google services connections

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { getGoogleServiceConnectionStatus } from '../../../../lib/google-ads-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get user session
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = session.user.email;
    const services = ['google-ads', 'search-console', 'tag-manager', 'analytics'];
    
    const serviceStatuses = await Promise.all(
      services.map(async (platform) => {
        try {
          const status = getGoogleServiceConnectionStatus(userId, platform);
          return {
            platform,
            isConnected: status.isConnected,
            isExpired: status.isExpired,
            lastConnected: status.lastConnected,
            accountInfo: status.accountInfo,
            scope: status.scope
          };
        } catch (error) {
          console.error(`Error checking ${platform} status:`, error);
          return {
            platform,
            isConnected: false,
            isExpired: false,
            lastConnected: null,
            accountInfo: null,
            scope: null
          };
        }
      })
    );

    const connectedServices = serviceStatuses.filter(service => service.isConnected);
    
    res.status(200).json({
      success: true,
      services: serviceStatuses,
      connectedCount: connectedServices.length,
      totalServices: services.length,
      connectedServices: connectedServices.map(s => s.platform)
    });

  } catch (error) {
    console.error('Error checking Google services status:', error);
    res.status(500).json({
      error: 'Failed to check service status',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}