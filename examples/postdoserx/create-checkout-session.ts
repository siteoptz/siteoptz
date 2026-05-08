/**
 * POST /api/stripe/create-checkout-session
 * Copy to postdoserx: pages/api/stripe/create-checkout-session.ts
 *
 * Pre-authentication checkout: no NextAuth session required.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

type Body = {
  plan: string;
  billingCycle: 'monthly' | 'yearly';
  priceId?: string; // optional override
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const baseUrl = process.env.NEXTAUTH_URL || 'https://postdoserx.com';
  const { plan, billingCycle, priceId }: Body = req.body;

  if (!plan || !billingCycle) {
    return res.status(400).json({ error: 'plan and billingCycle are required' });
  }

  // Map plan → price ID (set env vars on postdoserx)
  const priceIdMap: Record<string, Record<string, string | undefined>> = {
    starter: {
      monthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID,
      yearly: process.env.STRIPE_STARTER_YEARLY_PRICE_ID,
    },
    pro: {
      monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
      yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
    },
  };

  const resolvedPriceId =
    priceId ||
    priceIdMap[plan]?.[billingCycle];

  if (!resolvedPriceId) {
    return res.status(400).json({ error: 'Invalid plan or price not configured' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: resolvedPriceId, quantity: 1 }],
      success_url: `${baseUrl}/auth/after-checkout?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing?canceled=1`,
      // Email is collected on the Checkout form and appears on checkout.session.completed
      metadata: {
        plan,
        billingCycle,
        source: 'postdoserx',
      },
      subscription_data: {
        metadata: {
          plan,
          billingCycle,
          source: 'postdoserx',
        },
      },
    });

    return res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Checkout failed';
    console.error(message);
    return res.status(500).json({ error: message });
  }
}
