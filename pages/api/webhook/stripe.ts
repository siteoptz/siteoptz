import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { sendWelcomeEmail, sendAdminNotificationEmail } from '../../../lib/gohighlevel-service';
const SiteOptzGoHighLevel = require('../../../utils/siteoptz-gohighlevel');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// GoHighLevel integration using SiteOptzGoHighLevel class
async function updateGoHighLevelContactForUpgrade(customer: Stripe.Customer, plan: string, billingCycle: string) {
  try {
    console.log('=== UPGRADE: GoHighLevel Integration ===');
    console.log('Customer:', customer.email);
    console.log('Plan:', plan);
    console.log('Billing cycle:', billingCycle);

    // Check if GoHighLevel integration is enabled
    const isGHLEnabled = process.env.ENABLE_GHL === 'true';
    console.log('🔍 GoHighLevel Environment Check:');
    console.log('- ENABLE_GHL:', process.env.ENABLE_GHL);
    console.log('- API Key present:', !!process.env.GOHIGHLEVEL_API_KEY);
    console.log('- Location ID present:', !!process.env.GOHIGHLEVEL_LOCATION_ID);
    console.log('- Is Enabled:', isGHLEnabled);
    
    if (!isGHLEnabled || !process.env.GOHIGHLEVEL_API_KEY || !process.env.GOHIGHLEVEL_LOCATION_ID) {
      console.log('⚠️ GoHighLevel integration disabled or credentials missing for upgrade');
      return { success: false, error: 'Integration disabled or credentials missing' };
    }

    // Initialize SiteOptzGoHighLevel class
    const gohighlevel = new SiteOptzGoHighLevel(
      process.env.GOHIGHLEVEL_API_KEY,
      process.env.GOHIGHLEVEL_LOCATION_ID
    );
    
    // Prepare subscriber data for the specific plan
    const subscriberData = {
      email: customer.email,
      firstName: customer.name?.split(' ')[0] || '',
      lastName: customer.name?.split(' ').slice(1).join(' ') || '',
      phone: customer.phone || '',
      source: `Stripe ${plan} Plan Upgrade`,
      company: customer.metadata?.company || '',
      companySize: customer.metadata?.company_size || '',
      aiToolsInterest: customer.metadata?.interests || '',
      billingCycle: billingCycle,
      stripeCustomerId: customer.id
    };

    console.log('Subscriber data:', JSON.stringify(subscriberData, null, 2));

    // Use the appropriate method based on the plan
    let result;
    switch (plan) {
      case 'starter':
        result = await gohighlevel.addStarterPlanSubscriber(subscriberData);
        break;
      case 'pro':
        result = await gohighlevel.addProPlanSubscriber(subscriberData);
        break;
      case 'enterprise':
        result = await gohighlevel.addEnterpriseSubscriber(subscriberData);
        break;
      default:
        console.log(`Unknown plan: ${plan}, using free trial method`);
        result = await gohighlevel.addFreeTrialSubscriber(subscriberData);
    }
    
    if (result.success) {
      console.log('✅ Successfully updated GoHighLevel contact for upgrade');
      console.log('Contact ID:', result.contact?.id);
      console.log('Pipeline:', result.pipeline);
      return { 
        success: true, 
        contactId: result.contact?.id,
        opportunityId: result.pipeline?.id
      };
    } else {
      console.error('❌ Failed to update GoHighLevel contact for upgrade');
      return { success: false };
    }
  } catch (error) {
    console.error('Error in GoHighLevel upgrade integration:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Send upgrade welcome email using GoHighLevel service
async function sendUpgradeWelcomeEmail(customer: Stripe.Customer, plan: string, billingCycle: string) {
  try {
    console.log('=== UPGRADE: Sending Welcome Email ===');
    console.log('Customer:', customer.email);
    console.log('Plan:', plan);

    const userData = {
      email: customer.email!,
      name: customer.name || 'Customer',
      provider: 'stripe',
      plan: plan,
      company: customer.metadata?.company || `${plan} Plan Customer`,
      companySize: customer.metadata?.company_size || 'Stripe upgrade - not collected',
      interests: customer.metadata?.interests || 'Stripe upgrade - not collected',
      billingCycle: billingCycle,
      isUpgrade: true
    };

    console.log('Attempting to send upgrade welcome email...');
    const welcomeResult = await sendWelcomeEmail(userData);
    console.log('Upgrade welcome email result:', JSON.stringify(welcomeResult, null, 2));
    
    if (welcomeResult.success) {
      console.log('✅ Upgrade welcome email sent to:', customer.email);
      return { success: true };
    } else {
      console.error('❌ Failed to send upgrade welcome email:', welcomeResult.error);
      return { success: false, error: welcomeResult.error };
    }
  } catch (error) {
    console.error('Error sending upgrade welcome email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Send upgrade admin notification using GoHighLevel service
async function sendUpgradeAdminNotification(customer: Stripe.Customer, plan: string, billingCycle: string) {
  try {
    console.log('=== UPGRADE: Sending Admin Notification ===');
    console.log('Customer:', customer.email);
    console.log('Plan:', plan);

    const userData = {
      email: customer.email!,
      name: customer.name || 'Customer',
      provider: 'stripe',
      plan: plan,
      company: customer.metadata?.company || `${plan} Plan Customer`,
      companySize: customer.metadata?.company_size || 'Stripe upgrade - not collected',
      interests: customer.metadata?.interests || 'Stripe upgrade - not collected',
      billingCycle: billingCycle,
      stripeCustomerId: customer.id,
      isUpgrade: true
    };

    console.log('Attempting to send upgrade admin notification...');
    const adminResult = await sendAdminNotificationEmail(userData);
    console.log('Upgrade admin notification result:', JSON.stringify(adminResult, null, 2));
    
    if (adminResult.success) {
      console.log('✅ Upgrade admin notification sent to info@siteoptz.ai');
      return { success: true };
    } else {
      console.error('❌ Failed to send upgrade admin notification:', adminResult.error);
      return { success: false, error: adminResult.error };
    }
  } catch (error) {
    console.error('Error sending upgrade admin notification:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;
  
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription') {
          console.log('Processing new subscription:', session.id);
          
          // Get customer details
          const customer = await stripe.customers.retrieve(session.customer as string) as Stripe.Customer;
          
          // Get subscription details
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          const priceId = subscription.items.data[0].price.id;
          
          // Map price ID to plan
          const priceIdToPlan: { [key: string]: { plan: string; cycle: string } } = {
            [process.env.STRIPE_STARTER_MONTHLY_PRICE_ID!]: { plan: 'starter', cycle: 'monthly' },
            [process.env.STRIPE_STARTER_YEARLY_PRICE_ID!]: { plan: 'starter', cycle: 'yearly' },
            [process.env.STRIPE_PRO_MONTHLY_PRICE_ID!]: { plan: 'pro', cycle: 'monthly' },
            [process.env.STRIPE_PRO_YEARLY_PRICE_ID!]: { plan: 'pro', cycle: 'yearly' },
            [process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!]: { plan: 'enterprise', cycle: 'monthly' },
            [process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID!]: { plan: 'enterprise', cycle: 'yearly' },
          };

          const planInfo = priceIdToPlan[priceId];
          
          if (planInfo && customer.email) {
            console.log('=== PROCESSING STRIPE UPGRADE ===');
            console.log('Customer Email:', customer.email);
            console.log('Plan:', planInfo.plan);
            console.log('Billing Cycle:', planInfo.cycle);
            
            // Update GoHighLevel contact with new plan tags
            const ghlResult = await updateGoHighLevelContactForUpgrade(customer, planInfo.plan, planInfo.cycle);
            console.log('GoHighLevel result:', ghlResult);
            
            // Send welcome email to customer for their new plan
            const welcomeResult = await sendUpgradeWelcomeEmail(customer, planInfo.plan, planInfo.cycle);
            console.log('Welcome email result:', welcomeResult);
            
            // Send admin notification about the upgrade
            const adminResult = await sendUpgradeAdminNotification(customer, planInfo.plan, planInfo.cycle);
            console.log('Admin notification result:', adminResult);
            
            console.log('=== STRIPE UPGRADE PROCESSING COMPLETED ===');
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', subscription.id);
        
        // Handle plan changes/upgrades for existing customers
        const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
        const priceId = subscription.items.data[0].price.id;
        
        // Map price ID to plan (same mapping as new subscriptions)
        const priceIdToPlan: { [key: string]: { plan: string; cycle: string } } = {
          [process.env.STRIPE_STARTER_MONTHLY_PRICE_ID!]: { plan: 'starter', cycle: 'monthly' },
          [process.env.STRIPE_STARTER_YEARLY_PRICE_ID!]: { plan: 'starter', cycle: 'yearly' },
          [process.env.STRIPE_PRO_MONTHLY_PRICE_ID!]: { plan: 'pro', cycle: 'monthly' },
          [process.env.STRIPE_PRO_YEARLY_PRICE_ID!]: { plan: 'pro', cycle: 'yearly' },
          [process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!]: { plan: 'enterprise', cycle: 'monthly' },
          [process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID!]: { plan: 'enterprise', cycle: 'yearly' },
        };

        const planInfo = priceIdToPlan[priceId];
        
        if (planInfo && customer.email) {
          console.log('=== PROCESSING STRIPE PLAN UPDATE ===');
          console.log('Customer Email:', customer.email);
          console.log('New Plan:', planInfo.plan);
          console.log('New Billing Cycle:', planInfo.cycle);
          
          // Update GoHighLevel contact with new plan tags
          const ghlResult = await updateGoHighLevelContactForUpgrade(customer, planInfo.plan, planInfo.cycle);
          console.log('GoHighLevel update result:', ghlResult);
          
          // Send welcome email for the new plan
          const welcomeResult = await sendUpgradeWelcomeEmail(customer, planInfo.plan, planInfo.cycle);
          console.log('Plan update welcome email result:', welcomeResult);
          
          // Send admin notification about the plan change
          const adminResult = await sendUpgradeAdminNotification(customer, planInfo.plan, planInfo.cycle);
          console.log('Plan update admin notification result:', adminResult);
          
          console.log('=== STRIPE PLAN UPDATE PROCESSING COMPLETED ===');
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription cancelled:', subscription.id);
        
        // Handle cancellation if needed
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}