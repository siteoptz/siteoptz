import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

// Import the cache from the plan module
let planCache: Map<string, any>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Dynamic import to get the cache
    const planModule = await import('./plan');
    
    // Clear cache for the current user
    const cacheKey = session.user.email;
    
    // Access the cache through the module if exported, or clear all caches
    if (typeof (global as any).planCache !== 'undefined') {
      (global as any).planCache.delete(cacheKey);
      console.log('✅ Cleared plan cache for:', session.user.email);
    }
    
    // Also clear GoHighLevel cache if it exists
    if (typeof (global as any).ghlCache !== 'undefined') {
      (global as any).ghlCache.delete(session.user.email);
      console.log('✅ Cleared GHL cache for:', session.user.email);
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Plan cache cleared successfully',
      email: session.user.email
    });
  } catch (error) {
    console.error('Error clearing plan cache:', error);
    return res.status(500).json({ 
      error: 'Failed to clear cache',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}