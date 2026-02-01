import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan, billingCycle } = req.body;

  if (!plan) {
    return res.status(400).json({ error: 'Plan is required' });
  }

  try {
    const results = {
      timestamp: new Date().toISOString(),
      plan: plan,
      billingCycle: billingCycle || 'yearly',
      message: 'Stripe test endpoint working',
      environment: process.env.NODE_ENV
    };

    res.status(200).json(results);

  } catch (error) {
    console.error('Stripe test error:', error);
    res.status(500).json({ 
      error: 'Test failed', 
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}