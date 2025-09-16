import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

interface PlanStatus {
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'canceled' | 'past_due' | 'trialing';
  billingCycle: 'monthly' | 'yearly' | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  trialEnd: string | null;
  priceId: string | null;
  customerId: string | null;
}

interface PlanStatusResponse {
  success: boolean;
  planStatus?: PlanStatus;
  error?: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlanStatusResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    // Get user session
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ 
        success: false, 
        error: 'User not authenticated' 
      });
    }

    // Search for customer in Stripe
    const customers = await stripe.customers.list({
      email: session.user.email,
      limit: 1
    });

    if (customers.data.length === 0) {
      // No customer found, user is on free plan
      return res.status(200).json({
        success: true,
        planStatus: {
          plan: 'free',
          status: 'active',
          billingCycle: null,
          currentPeriodStart: null,
          currentPeriodEnd: null,
          cancelAtPeriodEnd: false,
          trialEnd: null,
          priceId: null,
          customerId: null
        }
      });
    }

    const customer = customers.data[0];

    // Get active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'all',
      limit: 1
    });

    if (subscriptions.data.length === 0) {
      // Customer exists but no active subscription
      return res.status(200).json({
        success: true,
        planStatus: {
          plan: 'free',
          status: 'inactive',
          billingCycle: null,
          currentPeriodStart: null,
          currentPeriodEnd: null,
          cancelAtPeriodEnd: false,
          trialEnd: null,
          priceId: null,
          customerId: customer.id
        }
      });
    }

    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0].price.id;

    // Determine plan based on price ID
    let plan: 'free' | 'starter' | 'pro' | 'enterprise' = 'free';
    let billingCycle: 'monthly' | 'yearly' | null = null;

    if (priceId === process.env.STRIPE_STARTER_MONTHLY_PRICE_ID) {
      plan = 'starter';
      billingCycle = 'monthly';
    } else if (priceId === process.env.STRIPE_STARTER_YEARLY_PRICE_ID) {
      plan = 'starter';
      billingCycle = 'yearly';
    } else if (priceId === process.env.STRIPE_PRO_MONTHLY_PRICE_ID) {
      plan = 'pro';
      billingCycle = 'monthly';
    } else if (priceId === process.env.STRIPE_PRO_YEARLY_PRICE_ID) {
      plan = 'pro';
      billingCycle = 'yearly';
    } else if (priceId === process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID) {
      plan = 'enterprise';
      billingCycle = 'monthly';
    } else if (priceId === process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID) {
      plan = 'enterprise';
      billingCycle = 'yearly';
    }

    const planStatus: PlanStatus = {
      plan,
      status: subscription.status as any,
      billingCycle,
      currentPeriodStart: new Date((subscription as any).current_period_start * 1000).toISOString(),
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000).toISOString(),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
      priceId,
      customerId: customer.id
    };

    res.status(200).json({
      success: true,
      planStatus
    });

  } catch (error: any) {
    console.error('Plan status error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching plan status',
      message: error.message
    });
  }
}
