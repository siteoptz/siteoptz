import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // In a real implementation, you would fetch this from your database
    // For now, we'll return a mock user plan based on session data
    // You can modify the plan here for testing different dashboard experiences
    const userPlan = {
      id: session.user.email || 'user',
      plan: 'free', // Change this to 'starter', 'pro', or 'enterprise' for testing
      status: 'active',
      billingCycle: 'monthly',
      startDate: new Date().toISOString(),
      features: [
        'Daily AI tool spotlight',
        'Basic tool comparisons',
        'Community support',
        'Basic implementation guides'
      ],
      limitations: [
        'Limited to 3 comparisons/day',
        'No expert consultation',
        'Limited tool access',
        'No team features'
      ],
      usage: {
        comparisons: Math.floor(Math.random() * 3), // Random for demo
        consultations: 0,
        teamMembers: 1
      },
      limits: {
        dailyComparisons: 3,
        monthlyConsultations: 0,
        maxTeamMembers: 1
      }
    };

    res.status(200).json(userPlan);
  } catch (error) {
    console.error('Error fetching user plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}