import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import Stripe from 'stripe';
import { STRIPE_SUCCESS_URL_PATH } from '@/lib/routing-config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

interface CheckoutRequest {
  priceId?: string;
  plan: string;
  billingCycle: 'monthly' | 'yearly';
  successUrl?: string;
  cancelUrl?: string;
  customerEmail?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('=== CREATE CHECKOUT SESSION API CALLED ===');
  console.log('API Version: 2.0 - Fixed TypeScript compilation');
  console.log('Method:', req.method);
  console.log('Body:', req.body);
  
  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get user session (optional for new subscriptions)
    const session = await getServerSession(req, res, authOptions);
    
    console.log('✅ Session retrieved:', !!session?.user);
    
    const { plan, billingCycle, successUrl, cancelUrl, customerEmail }: CheckoutRequest = req.body;
    
    console.log('📋 Request data:', { plan, billingCycle, hasCustomerEmail: !!customerEmail });
    
    // Validate required fields
    if (!plan) {
      console.log('❌ Missing plan');
      return res.status(400).json({ message: 'Plan is required' });
    }
    
    if (!billingCycle) {
      console.log('❌ Missing billing cycle');
      return res.status(400).json({ message: 'Billing cycle is required' });
    }
    
    // For logged-in users, we'll use the session email
    // For non-logged-in users, Stripe will collect the email during checkout
    const userEmail = session?.user?.email || customerEmail;
    console.log('📧 User email:', userEmail ? 'provided' : 'will be collected by Stripe');

    // Map plans to Stripe price IDs
    const priceIdMap = {
      starter: {
        monthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID,
        yearly: process.env.STRIPE_STARTER_YEARLY_PRICE_ID
      },
      pro: {
        monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
        yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID
      },
      enterprise: {
        monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID,
        yearly: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID
      }
    };

    const planPriceIds = priceIdMap[plan as keyof typeof priceIdMap];
    if (!planPriceIds) {
      console.log('❌ Invalid plan:', plan);
      return res.status(400).json({ message: 'Invalid plan selected' });
    }

    const selectedPriceId = planPriceIds[billingCycle];
    if (!selectedPriceId) {
      console.log('❌ Price ID not configured for plan:', plan, billingCycle);
      return res.status(400).json({ message: 'Price ID not configured for this plan' });
    }
    
    console.log('💰 Using price ID:', selectedPriceId);
    
    // Create Stripe checkout session with price ID
    const checkoutSessionParams: any = {
      line_items: [
        {
          price: selectedPriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.NEXTAUTH_URL}${STRIPE_SUCCESS_URL_PATH}`,
      cancel_url: cancelUrl || `${process.env.NEXTAUTH_URL}/upgrade?canceled=true`,
      metadata: {
        plan,
        billingCycle,
        ...(userEmail && { userId: userEmail }),
        isLoggedIn: !!session?.user,
      },
      subscription_data: {
        metadata: {
          plan,
          billingCycle,
          ...(userEmail && { userId: userEmail }),
          isLoggedIn: !!session?.user,
        },
      },
      automatic_tax: {
        enabled: true,
      },
      tax_id_collection: {
        enabled: true,
      },
      allow_promotion_codes: true,
    };

    if (userEmail) {
      checkoutSessionParams.customer_email = userEmail;
    }

    console.log('🚀 Creating Stripe checkout session...');
    const checkoutSession = await stripe.checkout.sessions.create(checkoutSessionParams);

    // Track checkout initiation
    console.log('✅ Stripe checkout session created:', {
      sessionId: checkoutSession.id,
      plan,
      billingCycle,
      priceId: selectedPriceId,
      ...(userEmail && { email: userEmail }),
      isLoggedIn: !!session?.user,
    });

    const response = {
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    };
    
    console.log('📤 Returning response:', response);
    res.status(200).json(response);

  } catch (error: any) {
    console.error('❌ Stripe checkout error:', error);
    const errorResponse = {
      message: 'Error creating checkout session',
      error: error.message,
      details: error.stack,
    };
    console.log('📤 Returning error response:', errorResponse);
    res.status(500).json(errorResponse);
  }
}