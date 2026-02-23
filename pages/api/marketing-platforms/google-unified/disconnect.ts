// pages/api/marketing-platforms/google-unified/disconnect.ts  
// API endpoint to disconnect specific Google services

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { removeGoogleServiceConnection } from '../../../../lib/google-ads-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get user session
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { platform } = req.body;
    
    if (!platform) {
      return res.status(400).json({ error: 'Platform parameter required' });
    }

    const validPlatforms = ['google-ads', 'search-console', 'tag-manager', 'analytics'];
    if (!validPlatforms.includes(platform)) {
      return res.status(400).json({ 
        error: 'Invalid platform', 
        validPlatforms 
      });
    }

    const userId = session.user.email;
    const success = removeGoogleServiceConnection(userId, platform);
    
    if (!success) {
      return res.status(404).json({ 
        error: `No ${platform} connection found for user` 
      });
    }

    console.log(`✅ Disconnected ${platform} for user: ${userId.substring(0, 20)}...`);

    res.status(200).json({
      success: true,
      message: `Successfully disconnected ${platform}`,
      platform
    });

  } catch (error) {
    console.error('Error disconnecting Google service:', error);
    res.status(500).json({
      error: 'Failed to disconnect service',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}