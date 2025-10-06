import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import Stripe from 'stripe';
import { getContactByEmail } from './ghl-lookup';

// Initialize Stripe only if the secret key is available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  try {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil',
    });
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
    stripe = null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const diagnostic = {
      user: {
        email: session.user.email,
        name: session.user.name
      },
      environment: {
        hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
        hasGHLKey: !!process.env.GOHIGHLEVEL_API_KEY,
        hasGHLLocation: !!process.env.GOHIGHLEVEL_LOCATION_ID,
        isGHLEnabled: process.env.ENABLE_GHL === 'true',
        priceIds: {
          starterMonthly: !!process.env.STRIPE_STARTER_MONTHLY_PRICE_ID,
          starterYearly: !!process.env.STRIPE_STARTER_YEARLY_PRICE_ID,
          proMonthly: !!process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
          proYearly: !!process.env.STRIPE_PRO_YEARLY_PRICE_ID,
          enterpriseMonthly: !!process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID,
          enterpriseYearly: !!process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID
        },
        actualEnterpriseIds: {
          monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID || 'NOT SET',
          yearly: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID || 'NOT SET'
        }
      },
      goHighLevel: null as any,
      stripe: null as any,
      detectedPlan: 'unknown',
      finalPlan: 'unknown'
    };

    // Check GoHighLevel
    try {
      const ghlContact = await getContactByEmail(session.user.email!);
      diagnostic.goHighLevel = {
        exists: ghlContact.exists,
        contactId: ghlContact.contactId,
        plan: ghlContact.plan,
        name: ghlContact.name
      };
      if (ghlContact.plan) {
        diagnostic.detectedPlan = ghlContact.plan;
      }
    } catch (error) {
      diagnostic.goHighLevel = {
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }

    // Check Stripe
    if (stripe) {
      try {
        const customers = await stripe.customers.list({
          email: session.user.email!,
          limit: 1
        });

        if (customers.data.length > 0) {
          const customer = customers.data[0];
          const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            status: 'active',
            limit: 1
          });

          if (subscriptions.data.length > 0) {
            const subscription = subscriptions.data[0];
            const priceId = subscription.items.data[0].price.id;
            
            diagnostic.stripe = {
              customerId: customer.id,
              subscriptionId: subscription.id,
              priceId: priceId,
              status: subscription.status,
              metadata: subscription.metadata
            };

            // Check which plan this price ID corresponds to
            const priceIdMap: { [key: string]: string } = {};
            if (process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID) {
              priceIdMap[process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID] = 'enterprise-monthly';
            }
            if (process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID) {
              priceIdMap[process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID] = 'enterprise-yearly';
            }
            if (process.env.STRIPE_PRO_MONTHLY_PRICE_ID) {
              priceIdMap[process.env.STRIPE_PRO_MONTHLY_PRICE_ID] = 'pro-monthly';
            }
            if (process.env.STRIPE_PRO_YEARLY_PRICE_ID) {
              priceIdMap[process.env.STRIPE_PRO_YEARLY_PRICE_ID] = 'pro-yearly';
            }
            if (process.env.STRIPE_STARTER_MONTHLY_PRICE_ID) {
              priceIdMap[process.env.STRIPE_STARTER_MONTHLY_PRICE_ID] = 'starter-monthly';
            }
            if (process.env.STRIPE_STARTER_YEARLY_PRICE_ID) {
              priceIdMap[process.env.STRIPE_STARTER_YEARLY_PRICE_ID] = 'starter-yearly';
            }

            const detectedPlan = priceIdMap[priceId];
            if (detectedPlan) {
              diagnostic.stripe.detectedPlan = detectedPlan;
              const planName = detectedPlan.split('-')[0];
              diagnostic.finalPlan = planName;
            } else {
              diagnostic.stripe.detectedPlan = 'UNKNOWN - Price ID not mapped';
              diagnostic.stripe.unmappedPriceId = priceId;
            }
          } else {
            diagnostic.stripe = {
              customerId: customer.id,
              message: 'No active subscriptions'
            };
          }
        } else {
          diagnostic.stripe = {
            message: 'No customer found in Stripe'
          };
        }
      } catch (error) {
        diagnostic.stripe = {
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    } else {
      diagnostic.stripe = {
        error: 'Stripe not initialized - missing API key'
      };
    }

    return res.status(200).json(diagnostic);
  } catch (error) {
    console.error('Error in plan diagnostic:', error);
    return res.status(500).json({ 
      error: 'Failed to run diagnostic',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}