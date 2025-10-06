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

// Simple in-memory cache with TTL
export const planCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5000; // 5 seconds cache - reduced to prevent stale data

// Make cache accessible globally for clearing
if (typeof (global as any).planCache === 'undefined') {
  (global as any).planCache = planCache;
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

    // Check cache first
    const cacheKey = session.user.email;
    const cached = planCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
      console.log('📋 Using cached plan data for:', session.user.email);
      console.log('📋 Cached plan:', cached.data.plan);
      return res.status(200).json(cached.data);
    }

    // Check GoHighLevel first for user's plan information
    let actualPlan = 'free';
    let billingCycle = 'monthly';
    let subscriptionStatus = 'active';
    let userName = session.user.name || 'User';

    // First, check GoHighLevel for plan information
    try {
      console.log('🔍 Fetching user plan for:', session.user.email);
      console.log('🔍 Session user name:', session.user.name);
      const ghlContact = await getContactByEmail(session.user.email!);
      console.log('📋 GHL Contact lookup result:', JSON.stringify(ghlContact, null, 2));
      if (ghlContact.exists) {
        if (ghlContact.plan) {
          actualPlan = ghlContact.plan;
          console.log('✅ Plan found in GoHighLevel:', actualPlan);
        }
        if (ghlContact.name) {
          userName = ghlContact.name;
          console.log('✅ User name found in GoHighLevel:', userName);
        } else {
          console.log('⚠️ No name found in GoHighLevel contact, using session name:', session.user.name);
        }
      } else {
        console.log('⚠️ User not found in GoHighLevel, using session name:', session.user.name);
      }
    } catch (ghlError) {
      console.error('Error checking GoHighLevel for plan:', ghlError);
    }

    // Then, check Stripe for subscription status (overrides GHL if active subscription exists)
    if (stripe) {
      try {
        // Search for existing customer by email
        const customers = await stripe.customers.list({
          email: session.user.email!,
          limit: 1
        });

      if (customers.data.length > 0) {
        const customerId = customers.data[0].id;
        
        // Get active subscriptions
        const subscriptions = await stripe.subscriptions.list({
          customer: customerId,
          status: 'active',
          limit: 1
        });

        if (subscriptions.data.length > 0) {
          const subscription = subscriptions.data[0];
          const priceId = subscription.items.data[0].price.id;
          
          // Map price IDs to plan names
          const priceIdToPlan: { [key: string]: { plan: string; cycle: string } } = {};
          
          // Safely add price IDs only if environment variables exist
          if (process.env.STRIPE_STARTER_MONTHLY_PRICE_ID) {
            priceIdToPlan[process.env.STRIPE_STARTER_MONTHLY_PRICE_ID] = { plan: 'starter', cycle: 'monthly' };
          }
          if (process.env.STRIPE_STARTER_YEARLY_PRICE_ID) {
            priceIdToPlan[process.env.STRIPE_STARTER_YEARLY_PRICE_ID] = { plan: 'starter', cycle: 'yearly' };
          }
          if (process.env.STRIPE_PRO_MONTHLY_PRICE_ID) {
            priceIdToPlan[process.env.STRIPE_PRO_MONTHLY_PRICE_ID] = { plan: 'pro', cycle: 'monthly' };
          }
          if (process.env.STRIPE_PRO_YEARLY_PRICE_ID) {
            priceIdToPlan[process.env.STRIPE_PRO_YEARLY_PRICE_ID] = { plan: 'pro', cycle: 'yearly' };
          }
          if (process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID) {
            priceIdToPlan[process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID] = { plan: 'enterprise', cycle: 'monthly' };
          }
          if (process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID) {
            priceIdToPlan[process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID] = { plan: 'enterprise', cycle: 'yearly' };
          }

          console.log('🔍 Stripe Price ID:', priceId);
          console.log('🔍 Available price mappings:', Object.keys(priceIdToPlan));
          
          const planInfo = priceIdToPlan[priceId];
          if (planInfo) {
            actualPlan = planInfo.plan;
            billingCycle = planInfo.cycle;
            console.log('✅ Plan overridden by active Stripe subscription:', actualPlan);
          } else {
            console.log('⚠️ Price ID not found in mapping:', priceId);
            console.log('⚠️ Enterprise price IDs:', {
              monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID,
              yearly: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID
            });
          }

          subscriptionStatus = subscription.status;
        }
      }
      } catch (stripeError) {
        console.error('Error checking Stripe subscription:', stripeError);
        // Fall back to free plan if Stripe check fails
      }
    } else {
      console.log('⚠️ Stripe not available - missing STRIPE_SECRET_KEY environment variable');
    }

    // Get plan-specific configuration
    const planConfigs = {
      free: {
        features: [
          'Daily AI tool spotlight',
          'Basic tool comparisons', 
          'Community support',
          'Basic implementation guides'
        ],
        limitations: [
          'Limited to 3 comparisons/day',
          'No expert consultation',
          'Limited tool access',
          'No team features'
        ],
        limits: {
          dailyComparisons: 3,
          monthlyConsultations: 0,
          maxTeamMembers: 1
        }
      },
      starter: {
        features: [
          'All Free features',
          'Up to 10 comparisons/day',
          'Basic implementation guides',
          'Email support',
          'Access to 50+ AI tools'
        ],
        limitations: [
          'Limited team features',
          'No priority support',
          'No custom integrations'
        ],
        limits: {
          dailyComparisons: 10,
          monthlyConsultations: 1,
          maxTeamMembers: 3
        }
      },
      pro: {
        features: [
          'All Starter features',
          'Unlimited comparisons',
          'Priority support',
          'Custom implementation guides',
          'Access to all AI tools',
          'Team collaboration features'
        ],
        limitations: [
          'Limited to 10 team members',
          'No white-label options'
        ],
        limits: {
          dailyComparisons: -1, // Unlimited
          monthlyConsultations: 4,
          maxTeamMembers: 10
        }
      },
      enterprise: {
        features: [
          'All Pro features',
          'Unlimited team members',
          'White-label options',
          'Dedicated account manager',
          'Custom integrations',
          'Advanced analytics'
        ],
        limitations: [],
        limits: {
          dailyComparisons: -1, // Unlimited
          monthlyConsultations: -1, // Unlimited
          maxTeamMembers: -1 // Unlimited
        }
      }
    };

    const config = planConfigs[actualPlan as keyof typeof planConfigs] || planConfigs.free;

    const userPlan = {
      id: session.user.email || 'user',
      plan: actualPlan,
      status: subscriptionStatus,
      billingCycle,
      startDate: new Date().toISOString(),
      userName: userName,
      features: config.features,
      limitations: config.limitations,
      usage: {
        comparisons: Math.floor(Math.random() * (config.limits.dailyComparisons === -1 ? 20 : config.limits.dailyComparisons)),
        consultations: 0,
        teamMembers: 1
      },
      limits: config.limits
    };

    // Cache the response
    planCache.set(cacheKey, {
      data: userPlan,
      timestamp: Date.now()
    });

    res.status(200).json(userPlan);
  } catch (error) {
    console.error('Error fetching user plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}