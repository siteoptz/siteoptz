import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

interface UpgradeRequest {
  plan: 'starter' | 'pro' | 'enterprise';
  billingCycle: 'monthly' | 'yearly';
  successUrl?: string;
  cancelUrl?: string;
  companyName?: string;
  companySize?: string;
  interests?: string;
}

interface UpgradeResponse {
  success: boolean;
  sessionId?: string;
  url?: string;
  message?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpgradeResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    // Get user session
    const session = await getServerSession(req, res, authOptions);
    
    console.log('Upgrade subscription - Session:', session?.user?.email);
    
    if (!session?.user?.email) {
      return res.status(401).json({ 
        success: false, 
        error: 'User not authenticated' 
      });
    }

    const { plan, billingCycle, successUrl, cancelUrl, companyName, companySize, interests }: UpgradeRequest = req.body;

    // Validate plan
    if (!plan || !['starter', 'pro', 'enterprise'].includes(plan)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid plan selected' 
      });
    }

    // Validate billing cycle
    if (!billingCycle || !['monthly', 'yearly'].includes(billingCycle)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid billing cycle' 
      });
    }

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

    const planPriceIds = priceIdMap[plan];
    if (!planPriceIds) {
      return res.status(400).json({ 
        success: false, 
        error: 'Plan configuration not found' 
      });
    }

    const selectedPriceId = planPriceIds[billingCycle];
    if (!selectedPriceId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Price ID not configured for this plan and billing cycle' 
      });
    }

    // Check if user already has an active subscription
    let customerId: string | null = null;
    
    try {
      // Search for existing customer by email
      const customers = await stripe.customers.list({
        email: session.user.email,
        limit: 1
      });

      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        
        // Check for existing subscriptions
        const subscriptions = await stripe.subscriptions.list({
          customer: customerId,
          status: 'active',
          limit: 1
        });

        if (subscriptions.data.length > 0) {
          const existingSubscription = subscriptions.data[0];
          const currentPriceId = existingSubscription.items.data[0].price.id;
          
          // If user is trying to upgrade to the same plan, return error
          if (currentPriceId === selectedPriceId) {
            return res.status(400).json({ 
              success: false, 
              error: 'You are already subscribed to this plan' 
            });
          }

          // Handle upgrade/downgrade logic
          if (plan === 'pro' && (currentPriceId === priceIdMap.starter.monthly || currentPriceId === priceIdMap.starter.yearly)) {
            // Upgrade from starter to pro
            console.log('Upgrading from starter to pro');
            
            // Update the subscription
            await stripe.subscriptions.update(existingSubscription.id, {
              items: [{
                id: existingSubscription.items.data[0].id,
                price: selectedPriceId,
              }],
              proration_behavior: 'create_prorations',
            });

            return res.status(200).json({
              success: true,
              message: 'Subscription upgraded successfully'
            });
          } else if (plan === 'starter' && (currentPriceId === priceIdMap.pro.monthly || currentPriceId === priceIdMap.pro.yearly)) {
            // Downgrade from pro to starter
            console.log('Downgrading from pro to starter');
            
            // Update the subscription
            await stripe.subscriptions.update(existingSubscription.id, {
              items: [{
                id: existingSubscription.items.data[0].id,
                price: selectedPriceId,
              }],
              proration_behavior: 'create_prorations',
            });

            return res.status(200).json({
              success: true,
              message: 'Subscription downgraded successfully'
            });
          }
        }
      }
    } catch (stripeError) {
      console.error('Stripe customer/subscription check error:', stripeError);
      // Continue with new subscription creation
    }

    // Create new subscription (for new customers or if no existing subscription found)
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email,
      line_items: [
        {
          price: selectedPriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.NEXTAUTH_URL}/dashboard?upgraded=true&plan=${plan}`,
      cancel_url: cancelUrl || `${process.env.NEXTAUTH_URL}/upgrade?canceled=true`,
      metadata: {
        plan,
        billingCycle,
        userId: session.user.email,
        upgradeType: 'new_subscription',
        company: companyName || '',
        company_size: companySize || '',
        interests: interests || ''
      },
      subscription_data: {
        metadata: {
          plan,
          billingCycle,
          userId: session.user.email,
          company: companyName || '',
          company_size: companySize || '',
          interests: interests || ''
        },
      },
      automatic_tax: {
        enabled: true,
      },
      tax_id_collection: {
        enabled: true,
      },
      allow_promotion_codes: true,
      customer_creation: 'always',
    });

    // Track upgrade initiation
    console.log('Stripe checkout session created for upgrade:', {
      sessionId: checkoutSession.id,
      plan,
      billingCycle,
      priceId: selectedPriceId,
      email: session.user.email,
    });

    res.status(200).json({
      success: true,
      sessionId: checkoutSession.id,
      url: checkoutSession.url || undefined,
    });

  } catch (error: any) {
    console.error('Upgrade subscription error:', error);
    res.status(500).json({
      success: false,
      error: 'Error processing upgrade request',
      message: error.message
    });
  }
}
