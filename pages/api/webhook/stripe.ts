import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { sendWelcomeEmail, sendAdminNotificationEmail } from '../../../lib/gohighlevel-service';
import { handleUserAction, createUserDataFromStripeCustomer } from '../../../lib/user-management-service';
const SiteOptzGoHighLevel = require('../../../utils/siteoptz-gohighlevel');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// Handle Stripe customer upgrade using conditional logic
async function handleStripeUpgrade(customer: Stripe.Customer, plan: string, billingCycle: string) {
  try {
    console.log('=== STRIPE UPGRADE: Using Conditional Logic ===');
    console.log('Customer:', customer.email);
    console.log('Plan:', plan);
    console.log('Billing cycle:', billingCycle);

    // Create user data from Stripe customer
    const userData = createUserDataFromStripeCustomer(customer, plan, billingCycle);
    
    // Use conditional logic - this will check if user exists and handle accordingly
    const userActionResult = await handleUserAction(userData);
    
    console.log('Stripe upgrade processing result:', JSON.stringify(userActionResult, null, 2));
    
    if (userActionResult.success) {
      console.log(`✅ Stripe upgrade processed successfully - ${userActionResult.action} contact`);
      if (userActionResult.isNewUser) {
        console.log('🆕 New customer - welcome email sent');
      } else {
        console.log('👤 Existing customer - contact updated, no welcome email');
      }
      
      return {
        success: true,
        contactId: userActionResult.contactId,
        isNewUser: userActionResult.isNewUser,
        action: userActionResult.action,
        emailSent: userActionResult.emailSent,
        adminNotificationSent: userActionResult.adminNotificationSent
      };
    } else {
      console.error('❌ Failed to process Stripe upgrade:', userActionResult.error);
      return { success: false, error: userActionResult.error };
    }
  } catch (error) {
    console.error('Error in handleStripeUpgrade:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Legacy functions kept for backward compatibility but no longer used
// New conditional logic handles all email sending in handleStripeUpgrade()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('=== STRIPE WEBHOOK RECEIVED ===');
  console.log('Method:', req.method);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  
  if (req.method !== 'POST') {
    console.log('❌ Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;
  
  console.log('Webhook signature present:', !!sig);
  console.log('Buffer size:', buf.length);
  
  let event: Stripe.Event;

  try {
    // Check if webhook secret is configured
    if (!process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET.includes('placeholder')) {
      console.warn('⚠️ STRIPE_WEBHOOK_SECRET not configured - skipping signature verification (development only)');
      // For development: parse the event directly from the request body
      event = JSON.parse(buf.toString());
    } else {
      // Production: verify webhook signature
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
  } catch (err: any) {
    console.error('Webhook processing failed:', err.message);
    return res.status(400).json({ error: 'Webhook processing failed' });
  }

  try {
    console.log('=== PROCESSING STRIPE EVENT ===');
    console.log('Event Type:', event.type);
    console.log('Event ID:', event.id);
    console.log('Event Data:', JSON.stringify(event.data, null, 2));
    
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
            
            // Use conditional logic for upgrade processing
            const upgradeResult = await handleStripeUpgrade(customer, planInfo.plan, planInfo.cycle);
            console.log('Stripe upgrade result:', upgradeResult);
            
            console.log('=== STRIPE UPGRADE PROCESSING COMPLETED ===');
            if (upgradeResult.success) {
              if (upgradeResult.isNewUser) {
                console.log('🆕 New customer processed - welcome email sent');
              } else {
                console.log('🔄 Existing customer upgraded - contact updated, no welcome email');
              }
            } else {
              console.error('❌ Stripe upgrade processing failed:', upgradeResult.error);
            }
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
          
          // Use conditional logic for plan update processing
          const updateResult = await handleStripeUpgrade(customer, planInfo.plan, planInfo.cycle);
          console.log('Stripe plan update result:', updateResult);
          
          console.log('=== STRIPE PLAN UPDATE PROCESSING COMPLETED ===');
          if (updateResult.success) {
            if (updateResult.isNewUser) {
              console.log('🆕 New customer from plan update - welcome email sent');
            } else {
              console.log('🔄 Existing customer plan updated - contact updated, no welcome email');
            }
          } else {
            console.error('❌ Stripe plan update processing failed:', updateResult.error);
          }
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
        console.log(`⚠️ Unhandled webhook event type: ${event.type}`);
        console.log('Event details:', JSON.stringify(event.data.object, null, 2));
    }

    console.log('=== WEBHOOK PROCESSING COMPLETE ===');
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}