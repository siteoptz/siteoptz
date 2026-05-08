/**
 * POST /api/stripe/webhook
 * Copy to postdoserx: pages/api/stripe/webhook.ts
 *
 * IMPORTANT: Disable body parsing for this route in Next.js config if needed,
 * or use raw body verification as Stripe docs require.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { setPendingPlanFromCheckout } from './pending-plan-store';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

async function buffer(req: NextApiRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).json({ error: 'Missing signature or webhook secret' });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await buffer(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Invalid signature';
    console.error('Webhook signature verification failed:', msg);
    return res.status(400).send(`Webhook Error: ${msg}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const email =
      session.customer_details?.email ||
      session.customer_email ||
      null;

    const plan = session.metadata?.plan as string | undefined;

    if (email && plan) {
      // PRODUCTION: write to DB instead of in-memory store
      setPendingPlanFromCheckout(email, {
        plan,
        billingCycle: session.metadata?.billingCycle,
        stripeSessionId: session.id,
        stripeCustomerId: session.customer?.toString(),
        stripeSubscriptionId: session.subscription?.toString(),
      });
      console.log('[postdoserx] Pending plan stored for', email, plan);
    } else {
      console.warn('[postdoserx] checkout.session.completed missing email or plan metadata');
    }
  }

  return res.status(200).json({ received: true });
}
