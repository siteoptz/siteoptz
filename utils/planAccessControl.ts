import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import Stripe from 'stripe';

// Initialize Stripe
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

export type UserPlan = 'free' | 'starter' | 'pro' | 'enterprise';

export interface PlanVerification {
  hasAccess: boolean;
  userPlan: UserPlan;
  requestedPlan: UserPlan;
  redirectTo?: string;
}

/**
 * Get the user's actual plan from Stripe or GoHighLevel
 */
export async function getUserPlan(email: string): Promise<UserPlan> {
  let userPlan: UserPlan = 'free';
  
  console.log(`🔍 getUserPlan: Starting plan detection for ${email}`);
  
  // Check Stripe first (highest priority)
  if (stripe) {
    console.log(`🔍 Checking Stripe for ${email}...`);
    try {
      const customers = await stripe.customers.list({
        email: email,
        limit: 1
      });
      
      if (customers.data.length > 0) {
        console.log(`✅ Found Stripe customer for ${email}: ${customers.data[0].id}`);
        const subscriptions = await stripe.subscriptions.list({
          customer: customers.data[0].id,
          status: 'active',
          limit: 1
        });
        
        console.log(`🔍 Active subscriptions: ${subscriptions.data.length}`);
        
        if (subscriptions.data.length > 0) {
          const priceId = subscriptions.data[0].items.data[0].price.id;
          console.log(`🔍 Found price ID: ${priceId}`);
          console.log(`🔍 Environment price IDs:`, {
            starter_monthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID,
            starter_yearly: process.env.STRIPE_STARTER_YEARLY_PRICE_ID,
            pro_monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
            pro_yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
            enterprise_monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID,
            enterprise_yearly: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID,
          });
          
          // Map price IDs to plans
          if (priceId === process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID || 
              priceId === process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID) {
            userPlan = 'enterprise';
            console.log(`✅ Detected Enterprise plan from Stripe`);
          } else if (priceId === process.env.STRIPE_PRO_MONTHLY_PRICE_ID || 
                     priceId === process.env.STRIPE_PRO_YEARLY_PRICE_ID) {
            userPlan = 'pro';
            console.log(`✅ Detected Pro plan from Stripe`);
          } else if (priceId === process.env.STRIPE_STARTER_MONTHLY_PRICE_ID || 
                     priceId === process.env.STRIPE_STARTER_YEARLY_PRICE_ID) {
            userPlan = 'starter';
            console.log(`✅ Detected Starter plan from Stripe`);
          } else {
            console.log(`⚠️ Unknown Stripe price ID: ${priceId}`);
          }
        } else {
          console.log(`ℹ️ No active subscriptions for ${email}`);
        }
      } else {
        console.log(`ℹ️ No Stripe customer found for ${email}`);
      }
    } catch (error) {
      console.error('Error checking Stripe subscription:', error);
    }
  }
  
  // If still free, check GoHighLevel
  if (userPlan === 'free' && process.env.ENABLE_GHL === 'true') {
    console.log(`🔍 No Stripe plan found, checking GoHighLevel for ${email}...`);
    try {
      const { getContactByEmail } = await import('../pages/api/user/ghl-lookup');
      const ghlContact = await getContactByEmail(email);
      
      console.log(`🔍 GoHighLevel contact:`, JSON.stringify(ghlContact, null, 2));
      
      if (ghlContact.exists && ghlContact.plan && ghlContact.plan !== 'free') {
        userPlan = ghlContact.plan as UserPlan;
        console.log(`✅ Detected ${userPlan} plan from GoHighLevel`);
      } else {
        console.log(`ℹ️ No paid plan found in GoHighLevel for ${email}`);
      }
    } catch (error) {
      console.error('Error checking GoHighLevel:', error);
    }
  } else if (userPlan === 'free') {
    console.log(`ℹ️ GoHighLevel integration disabled, staying with free plan`);
  }
  
  console.log(`🎯 Final plan for ${email}: ${userPlan}`);
  return userPlan;
}

/**
 * Check if a user has access to a specific plan dashboard
 */
export function canAccessPlan(userPlan: UserPlan, requestedPlan: UserPlan): boolean {
  // Users can only access their own plan dashboard
  return userPlan === requestedPlan;
}

/**
 * Verify plan access for server-side props
 */
export async function verifyPlanAccess(
  context: GetServerSidePropsContext,
  requiredPlan: UserPlan
): Promise<PlanVerification> {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session?.user?.email) {
    return {
      hasAccess: false,
      userPlan: 'free',
      requestedPlan: requiredPlan,
      redirectTo: '/api/auth/signin'
    };
  }
  
  const userPlan = await getUserPlan(session.user.email);
  const hasAccess = canAccessPlan(userPlan, requiredPlan);
  
  return {
    hasAccess,
    userPlan,
    requestedPlan: requiredPlan,
    redirectTo: hasAccess ? undefined : `/dashboard/${userPlan}`
  };
}

/**
 * Higher-order function for protecting dashboard pages
 */
export function withPlanProtection(requiredPlan: UserPlan) {
  return async (context: GetServerSidePropsContext) => {
    const verification = await verifyPlanAccess(context, requiredPlan);
    
    if (!verification.hasAccess) {
      return {
        redirect: {
          destination: verification.redirectTo || '/dashboard',
          permanent: false,
        },
      };
    }
    
    const session = await getServerSession(context.req, context.res, authOptions);
    
    return {
      props: {
        userPlan: verification.userPlan,
      },
    };
  };
}