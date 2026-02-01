import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Test checkout API called:', req.method, req.body);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { plan, billingCycle } = req.body;
    
    console.log('Test checkout request:', { plan, billingCycle });
    
    // Check environment variables
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const hasStripeKey = !!stripeSecretKey;
    
    res.status(200).json({
      success: true,
      received: { plan, billingCycle },
      environment: {
        hasStripeKey,
        stripeKeyLength: stripeSecretKey?.length || 0
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Test checkout error:', error);
    res.status(500).json({ 
      error: 'Test failed',
      message: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}