import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getComplianceProfile } from '@/lib/compliance-storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const profile = await getComplianceProfile(session.user.email);
      return res.status(200).json(profile);
    } catch (error) {
      console.error('Compliance profile fetch error:', error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to fetch profile',
      });
    }
  }

  if (req.method === 'PATCH') {
    // Placeholder: PATCH body not implemented in Chunk 1
    return res.status(501).json({ error: 'Not implemented' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
