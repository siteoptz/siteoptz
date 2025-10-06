import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const email = session.user.email;
    console.log('🔄 Starting plan sync for:', email);

    // Step 1: Get plan from Stripe
    let stripePlan = null;
    if (stripe) {
      try {
        const customers = await stripe.customers.list({
          email: email,
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
            
            // Map price ID to plan
            const priceIdToPlan: { [key: string]: { plan: string; cycle: string } } = {};
            
            if (process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID) {
              priceIdToPlan[process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID] = { plan: 'enterprise', cycle: 'monthly' };
            }
            if (process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID) {
              priceIdToPlan[process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID] = { plan: 'enterprise', cycle: 'yearly' };
            }
            if (process.env.STRIPE_PRO_MONTHLY_PRICE_ID) {
              priceIdToPlan[process.env.STRIPE_PRO_MONTHLY_PRICE_ID] = { plan: 'pro', cycle: 'monthly' };
            }
            if (process.env.STRIPE_PRO_YEARLY_PRICE_ID) {
              priceIdToPlan[process.env.STRIPE_PRO_YEARLY_PRICE_ID] = { plan: 'pro', cycle: 'yearly' };
            }
            if (process.env.STRIPE_STARTER_MONTHLY_PRICE_ID) {
              priceIdToPlan[process.env.STRIPE_STARTER_MONTHLY_PRICE_ID] = { plan: 'starter', cycle: 'monthly' };
            }
            if (process.env.STRIPE_STARTER_YEARLY_PRICE_ID) {
              priceIdToPlan[process.env.STRIPE_STARTER_YEARLY_PRICE_ID] = { plan: 'starter', cycle: 'yearly' };
            }

            const planInfo = priceIdToPlan[priceId];
            if (planInfo) {
              stripePlan = planInfo;
              console.log('✅ Found Stripe plan:', planInfo);
            }
          }
        }
      } catch (error) {
        console.error('Error checking Stripe:', error);
      }
    }

    // Step 2: Update GoHighLevel if we found a Stripe plan
    if (stripePlan && process.env.ENABLE_GHL === 'true' && process.env.GOHIGHLEVEL_API_KEY) {
      try {
        // First, get the contact from GoHighLevel
        const searchResponse = await fetch(
          `https://services.leadconnectorhq.com/contacts/search/duplicate?email=${encodeURIComponent(email)}&locationId=${process.env.GOHIGHLEVEL_LOCATION_ID}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
              'Content-Type': 'application/json',
              'Version': '2021-07-28'
            }
          }
        );

        if (searchResponse.ok) {
          const searchResult = await searchResponse.json();
          
          if (searchResult.contact && searchResult.contact.id) {
            const contactId = searchResult.contact.id;
            const existingTags = searchResult.contact.tags || [];
            
            // Remove old plan tags
            const nonPlanTags = existingTags.filter((tag: string) => 
              !tag.toLowerCase().startsWith('plan-') && 
              !['free', 'starter', 'pro', 'enterprise'].includes(tag.toLowerCase())
            );
            
            // Add new plan tag
            const newTags = [...nonPlanTags, `plan-${stripePlan.plan}`];
            
            // Update the contact
            const updateData = {
              tags: newTags,
              customFields: [
                {
                  key: 'plan',
                  field_value: stripePlan.plan
                },
                {
                  key: 'billing_cycle',
                  field_value: stripePlan.cycle
                }
              ]
            };

            const updateResponse = await fetch(
              `https://services.leadconnectorhq.com/contacts/${contactId}`,
              {
                method: 'PUT',
                headers: {
                  'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
                  'Content-Type': 'application/json',
                  'Version': '2021-07-28'
                },
                body: JSON.stringify(updateData)
              }
            );

            if (updateResponse.ok) {
              console.log('✅ Successfully updated GoHighLevel contact with plan:', stripePlan.plan);
              
              // Clear caches
              if (typeof (global as any).planCache !== 'undefined') {
                (global as any).planCache.delete(email);
              }
              if (typeof (global as any).ghlCache !== 'undefined') {
                (global as any).ghlCache.delete(email);
              }
              
              return res.status(200).json({
                success: true,
                message: 'Plan synchronized successfully',
                plan: stripePlan.plan,
                cycle: stripePlan.cycle
              });
            } else {
              const errorText = await updateResponse.text();
              console.error('Failed to update GoHighLevel contact:', errorText);
              return res.status(500).json({
                success: false,
                message: 'Failed to update GoHighLevel contact',
                error: errorText
              });
            }
          } else {
            // Contact doesn't exist in GoHighLevel, but we have Stripe subscription
            console.log('⚠️ Contact not found in GoHighLevel, but has Stripe subscription');
            
            // Clear caches anyway so Stripe plan is used
            if (typeof (global as any).planCache !== 'undefined') {
              (global as any).planCache.delete(email);
            }
            
            return res.status(200).json({
              success: true,
              message: 'Stripe plan detected, caches cleared',
              plan: stripePlan.plan,
              cycle: stripePlan.cycle,
              note: 'Contact not in GoHighLevel, using Stripe plan'
            });
          }
        }
      } catch (error) {
        console.error('Error updating GoHighLevel:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to sync with GoHighLevel',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    } else if (stripePlan) {
      // We have a Stripe plan but GoHighLevel is not configured
      // Clear caches so the Stripe plan is used
      if (typeof (global as any).planCache !== 'undefined') {
        (global as any).planCache.delete(email);
      }
      
      return res.status(200).json({
        success: true,
        message: 'Using Stripe plan (GoHighLevel not configured)',
        plan: stripePlan.plan,
        cycle: stripePlan.cycle
      });
    }

    return res.status(200).json({
      success: false,
      message: 'No active subscription found in Stripe'
    });

  } catch (error) {
    console.error('Error in plan sync:', error);
    return res.status(500).json({
      error: 'Failed to sync plan',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}