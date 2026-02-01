import { NextApiRequest, NextApiResponse } from 'next';

// Temporarily simplify to test the endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('create-checkout-session called:', req.method, req.body);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { plan, billingCycle } = req.body;
    
    // Return a test response to verify the endpoint works
    res.status(200).json({
      success: true,
      message: 'Checkout endpoint working',
      received: { plan, billingCycle },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      message: 'Error in checkout endpoint',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}