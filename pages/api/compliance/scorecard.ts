import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getScorecardData } from '@/lib/compliance-storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const data = await getScorecardData(session.user.email);
    return res.status(200).json({
      hasScorecard: data !== null,
      score: data?.score ?? null,
      band: data?.band ?? null,
      completedAt: data?.completedAt ?? null,
    });
  } catch (error) {
    console.error('Compliance scorecard fetch error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch scorecard data',
    });
  }
}
