import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan, billingCycle } = req.body;

  try {
    // Check environment variables
    const envCheck = {
      hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
      stripeSecretLength: process.env.STRIPE_SECRET_KEY?.length || 0,
      hasStarterMonthly: !!process.env.STRIPE_STARTER_MONTHLY_PRICE_ID,
      hasStarterYearly: !!process.env.STRIPE_STARTER_YEARLY_PRICE_ID,
      hasProMonthly: !!process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
      hasProYearly: !!process.env.STRIPE_PRO_YEARLY_PRICE_ID,
      nodeEnv: process.env.NODE_ENV
    };

    // Test price ID mapping
    const priceIdMap = {
      starter: {
        monthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID,
        yearly: process.env.STRIPE_STARTER_YEARLY_PRICE_ID
      },
      pro: {
        monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
        yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID
      }
    };

    const selectedPlan = priceIdMap[plan as keyof typeof priceIdMap];
    const selectedPriceId = selectedPlan?.[billingCycle as keyof typeof selectedPlan];

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      received: { plan, billingCycle },
      environment: envCheck,
      priceMapping: {
        planExists: !!selectedPlan,
        priceIdFound: !!selectedPriceId,
        priceId: selectedPriceId ? `${selectedPriceId.substring(0, 10)}...` : 'NOT_FOUND'
      }
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Debug failed', 
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}