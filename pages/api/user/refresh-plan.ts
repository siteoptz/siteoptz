import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Allow both GET and POST methods
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Clear all caches
    const email = session.user.email;
    let clearedCaches = [];

    // Clear plan cache
    if (typeof (global as any).planCache !== 'undefined') {
      (global as any).planCache.delete(email);
      clearedCaches.push('plan');
    }
    
    // Clear GoHighLevel cache
    if (typeof (global as any).ghlCache !== 'undefined') {
      (global as any).ghlCache.delete(email);
      clearedCaches.push('ghl');
    }

    console.log('🔄 Refreshed plan caches for:', email);
    console.log('🔄 Cleared caches:', clearedCaches);

    // Now fetch fresh plan data
    const planResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/user/plan`, {
      headers: {
        cookie: req.headers.cookie || '',
      },
    });

    if (planResponse.ok) {
      const freshPlan = await planResponse.json();
      return res.status(200).json({ 
        success: true, 
        message: 'Plan refreshed successfully',
        clearedCaches,
        plan: freshPlan
      });
    } else {
      return res.status(200).json({ 
        success: true, 
        message: 'Caches cleared, but could not fetch fresh plan',
        clearedCaches
      });
    }
  } catch (error) {
    console.error('Error refreshing plan:', error);
    return res.status(500).json({ 
      error: 'Failed to refresh plan',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}