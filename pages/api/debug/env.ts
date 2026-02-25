// Debug endpoint to check environment variables
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

    console.log('🔍 Environment Variable Check for user:', session.user.email);
    
    const envCheck = {
      GOOGLE_ADS_DEVELOPER_TOKEN: {
        present: !!process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
        value: process.env.GOOGLE_ADS_DEVELOPER_TOKEN ? 'fD-KrR2G6Ja-PIrhIryrTQ...' : 'MISSING'
      },
      GOOGLE_CLIENT_ID: {
        present: !!process.env.GOOGLE_CLIENT_ID,
        value: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.substring(0, 10) + '...' : 'MISSING'
      },
      GOOGLE_CLIENT_SECRET: {
        present: !!process.env.GOOGLE_CLIENT_SECRET,
        value: process.env.GOOGLE_CLIENT_SECRET ? 'PRESENT' : 'MISSING'
      },
      NODE_ENV: process.env.NODE_ENV || 'undefined'
    };

    console.log('🔧 Environment variables:', envCheck);

    return res.status(200).json({
      success: true,
      user: session.user.email,
      environmentVariables: envCheck,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error checking environment:', error);
    return res.status(500).json({ 
      error: 'Failed to check environment',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}