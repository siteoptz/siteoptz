import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

interface CheckoutRequest {
  priceId?: string;
  plan: string;
  billingCycle: 'monthly' | 'yearly';
  successUrl?: string;
  cancelUrl?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get user session
    const session = await getSession({ req });
    
    if (!session?.user?.email) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { plan, billingCycle, successUrl, cancelUrl }: CheckoutRequest = req.body;

    // Define pricing based on plan and billing cycle
    const pricingMap = {
      starter: {
        monthly: { amount: 5900, priceId: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID },
        yearly: { amount: 49700, priceId: process.env.STRIPE_STARTER_YEARLY_PRICE_ID }
      },
      pro: {
        monthly: { amount: 19900, priceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID },
        yearly: { amount: 199700, priceId: process.env.STRIPE_PRO_YEARLY_PRICE_ID }
      },
      enterprise: {
        monthly: { amount: 49900, priceId: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID },
        yearly: { amount: 499700, priceId: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID }
      }
    };

    const planPricing = pricingMap[plan as keyof typeof pricingMap];
    if (!planPricing) {
      return res.status(400).json({ message: 'Invalid plan selected' });
    }

    const selectedPricing = planPricing[billingCycle];
    
    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `SiteOptz ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
              description: `AI Implementation ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan - ${billingCycle} billing`,
            },
            unit_amount: selectedPricing.amount,
            recurring: {
              interval: billingCycle === 'yearly' ? 'year' : 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.NEXTAUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXTAUTH_URL}/upgrade?canceled=true`,
      metadata: {
        plan,
        billingCycle,
        userId: session.user.email,
      },
      subscription_data: {
        metadata: {
          plan,
          billingCycle,
          userId: session.user.email,
        },
      },
      automatic_tax: {
        enabled: true,
      },
      tax_id_collection: {
        enabled: true,
      },
      allow_promotion_codes: true,
    });

    // Track checkout initiation
    console.log('Stripe checkout session created:', {
      sessionId: checkoutSession.id,
      plan,
      billingCycle,
      amount: selectedPricing.amount,
      email: session.user.email,
    });

    res.status(200).json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });

  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({
      message: 'Error creating checkout session',
      error: error.message,
    });
  }
}