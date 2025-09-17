import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check Stripe for user's actual subscription status
    let actualPlan = 'free';
    let billingCycle = 'monthly';
    let subscriptionStatus = 'active';

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
          const priceIdToPlan: { [key: string]: { plan: string; cycle: string } } = {
            [process.env.STRIPE_STARTER_MONTHLY_PRICE_ID!]: { plan: 'starter', cycle: 'monthly' },
            [process.env.STRIPE_STARTER_YEARLY_PRICE_ID!]: { plan: 'starter', cycle: 'yearly' },
            [process.env.STRIPE_PRO_MONTHLY_PRICE_ID!]: { plan: 'pro', cycle: 'monthly' },
            [process.env.STRIPE_PRO_YEARLY_PRICE_ID!]: { plan: 'pro', cycle: 'yearly' },
            [process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!]: { plan: 'enterprise', cycle: 'monthly' },
            [process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID!]: { plan: 'enterprise', cycle: 'yearly' },
          };

          const planInfo = priceIdToPlan[priceId];
          if (planInfo) {
            actualPlan = planInfo.plan;
            billingCycle = planInfo.cycle;
          }

          subscriptionStatus = subscription.status;
        }
      }
    } catch (stripeError) {
      console.error('Error checking Stripe subscription:', stripeError);
      // Fall back to free plan if Stripe check fails
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
      features: config.features,
      limitations: config.limitations,
      usage: {
        comparisons: Math.floor(Math.random() * (config.limits.dailyComparisons === -1 ? 20 : config.limits.dailyComparisons)),
        consultations: 0,
        teamMembers: 1
      },
      limits: config.limits
    };

    res.status(200).json(userPlan);
  } catch (error) {
    console.error('Error fetching user plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}