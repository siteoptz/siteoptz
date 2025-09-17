import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// GoHighLevel API functions
async function createGoHighLevelContact(customer: Stripe.Customer, plan: string, billingCycle: string) {
  try {
    const contactData = {
      firstName: customer.name?.split(' ')[0] || '',
      lastName: customer.name?.split(' ').slice(1).join(' ') || '',
      email: customer.email,
      phone: customer.phone || '',
      companyName: customer.metadata?.company || '',
      tags: [`plan-${plan}`, `billing-${billingCycle}`, 'siteoptz-customer'],
      customFields: {
        subscription_plan: plan,
        billing_cycle: billingCycle,
        company_size: customer.metadata?.company_size || '',
        interests: customer.metadata?.interests || '',
        stripe_customer_id: customer.id
      }
    };

    const response = await fetch(`https://services.leadconnectorhq.com/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify(contactData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('GoHighLevel contact created:', result.contact?.id);
      return result.contact;
    } else {
      console.error('Failed to create GoHighLevel contact:', await response.text());
    }
  } catch (error) {
    console.error('Error creating GoHighLevel contact:', error);
  }
}

// Email notification functions
async function sendWelcomeEmail(customer: Stripe.Customer, plan: string, billingCycle: string) {
  try {
    const planDetails = {
      starter: {
        features: [
          'Up to 10 AI tool comparisons per day',
          'Access to 50+ premium AI tools',
          'Basic implementation guides',
          'Email support',
          'Team collaboration (up to 3 members)'
        ]
      },
      pro: {
        features: [
          'Unlimited AI tool comparisons',
          'Access to all premium AI tools',
          'Priority support',
          'Custom implementation guides',
          'Advanced team collaboration (up to 10 members)',
          'Advanced analytics'
        ]
      },
      enterprise: {
        features: [
          'Everything in Pro',
          'Unlimited team members',
          'White-label options',
          'Dedicated account manager',
          'Custom integrations',
          'Advanced analytics & reporting'
        ]
      }
    };

    const features = planDetails[plan as keyof typeof planDetails]?.features || [];

    const emailData = {
      to: customer.email,
      subject: `Welcome to SiteOptz ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan! 🚀`,
      html: `
        <h2>Welcome to SiteOptz, ${customer.name || 'there'}!</h2>
        
        <p>Thank you for upgrading to our <strong>${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan</strong> (${billingCycle} billing).</p>
        
        <h3>Here's what you now have access to:</h3>
        <ul>
          ${features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <h3>Getting Started:</h3>
        <ol>
          <li>Visit your <a href="${process.env.NEXTAUTH_URL}/dashboard">dashboard</a> to explore your new features</li>
          <li>Check out our <a href="${process.env.NEXTAUTH_URL}/tools">AI tools directory</a></li>
          <li>Need help? Contact us at info@siteoptz.ai</li>
        </ol>
        
        <p>We're excited to help you leverage AI to grow your business!</p>
        
        <p>Best regards,<br>The SiteOptz Team</p>
      `
    };

    // Send email using your existing email service
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      console.log('Welcome email sent to:', customer.email);
    } else {
      console.error('Failed to send welcome email:', await response.text());
    }
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
}

async function sendAlertEmail(customer: Stripe.Customer, plan: string, billingCycle: string) {
  try {
    const emailData = {
      to: 'info@siteoptz.ai',
      subject: `💳 PAID UPGRADE: ${customer.email} → ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .upgrade-highlight { background: #28a745; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .info-box { background: white; padding: 15px; border-left: 4px solid #28a745; margin: 15px 0; }
            .label { font-weight: bold; color: #666; }
            .plan-badge { display: inline-block; background: #007bff; color: white; padding: 5px 12px; border-radius: 20px; font-size: 14px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 CUSTOMER UPGRADE! 💳</h1>
              <p style="font-size: 18px; margin: 0;">New Paid Subscription</p>
            </div>
            
            <div class="content">
              <div class="upgrade-highlight">
                <h2 style="margin: 0;">💰 ${customer.email}</h2>
                <p style="margin: 5px 0; font-size: 18px;">Upgraded to <span class="plan-badge">${plan.toUpperCase()} PLAN</span></p>
                <p style="margin: 0; font-size: 16px;">${billingCycle} billing</p>
              </div>
              
              <h3>📋 Customer Details:</h3>
              <div class="info-box">
                <p><span class="label">Name:</span> ${customer.name || 'Not provided'}</p>
                <p><span class="label">Email:</span> ${customer.email}</p>
                <p><span class="label">Phone:</span> ${customer.phone || 'Not provided'}</p>
                <p><span class="label">Stripe Customer ID:</span> ${customer.id}</p>
              </div>
              
              <h3>🏢 Business Information:</h3>
              <div class="info-box">
                <p><span class="label">Company:</span> ${customer.metadata?.company || 'Not provided'}</p>
                <p><span class="label">Company Size:</span> ${customer.metadata?.company_size || 'Not provided'}</p>
                <p><span class="label">AI Tool Interests:</span> ${customer.metadata?.interests || 'Not provided'}</p>
              </div>
              
              <h3>✅ Actions Completed:</h3>
              <ul>
                <li>✅ Payment processed successfully</li>
                <li>✅ Customer upgraded to ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan</li>
                <li>✅ Added to GoHighLevel CRM with plan tags</li>
                <li>✅ Welcome email sent to customer</li>
              </ul>
              
              <div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0; color: #0066cc;">💡 Recommended Next Steps:</h4>
                <ul style="margin-bottom: 0;">
                  <li>📞 <strong>Follow up personally</strong> within 24 hours to welcome them</li>
                  <li>📧 <strong>Send onboarding sequence</strong> to maximize feature adoption</li>
                  <li>📊 <strong>Add to ${plan} customer segment</strong> in your CRM</li>
                  <li>🎯 <strong>Schedule check-in</strong> at 7, 30, and 90 days</li>
                </ul>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      console.log('Alert email sent to info@siteoptz.ai');
    } else {
      console.error('Failed to send alert email:', await response.text());
    }
  } catch (error) {
    console.error('Error sending alert email:', error);
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
            // Create GoHighLevel contact
            await createGoHighLevelContact(customer, planInfo.plan, planInfo.cycle);
            
            // Send welcome email to customer
            await sendWelcomeEmail(customer, planInfo.plan, planInfo.cycle);
            
            // Send alert email to admin
            await sendAlertEmail(customer, planInfo.plan, planInfo.cycle);
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', subscription.id);
        
        // Handle plan changes if needed
        const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
        const priceId = subscription.items.data[0].price.id;
        
        // You could add logic here to update GoHighLevel contact with new plan info
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