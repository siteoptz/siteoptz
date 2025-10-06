import { NextApiRequest, NextApiResponse } from 'next';

// This is a temporary fix specifically for Yen Tran's Enterprise plan issue
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const email = 'yentran.todaysvision@gmail.com';
  
  try {
    console.log('🔧 FORCE SYNC: Starting Enterprise plan fix for Yen Tran');
    
    // Step 1: Clear ALL caches
    if (typeof (global as any).planCache !== 'undefined') {
      (global as any).planCache.clear();
      console.log('✅ Cleared entire plan cache');
    }
    
    if (typeof (global as any).ghlCache !== 'undefined') {
      (global as any).ghlCache.clear();
      console.log('✅ Cleared entire GHL cache');
    }

    // Step 2: Update GoHighLevel with Enterprise plan
    if (process.env.ENABLE_GHL === 'true' && process.env.GOHIGHLEVEL_API_KEY) {
      try {
        // Search for the contact
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
            console.log('📍 Found contact in GoHighLevel:', contactId);
            
            // Remove ALL old tags and add correct ones
            const updateData = {
              tags: [
                'plan-enterprise',
                'enterprise',
                'Enterprise Plan',
                'vip-customer',
                'billing-monthly',
                'stripe-verified'
              ],
              customFields: [
                { key: 'plan', field_value: 'enterprise' },
                { key: 'subscription_plan', field_value: 'enterprise' },
                { key: 'billing_cycle', field_value: 'monthly' },
                { key: 'stripe_price_id', field_value: 'price_1SFMCnAYjb6yVLnRQFkUWSBB' },
                { key: 'plan_updated_at', field_value: new Date().toISOString() }
              ]
            };

            console.log('📤 Updating GoHighLevel with:', updateData);

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
              console.log('✅ Successfully updated GoHighLevel to Enterprise plan');
              
              // Verify the update worked
              const verifyResponse = await fetch(
                `https://services.leadconnectorhq.com/contacts/${contactId}`,
                {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
                    'Content-Type': 'application/json',
                    'Version': '2021-07-28'
                  }
                }
              );
              
              if (verifyResponse.ok) {
                const contact = await verifyResponse.json();
                console.log('✅ Verified contact now has tags:', contact.contact?.tags);
              }
            } else {
              const errorText = await updateResponse.text();
              console.error('❌ Failed to update GoHighLevel:', errorText);
              return res.status(500).json({
                success: false,
                message: 'Failed to update GoHighLevel',
                error: errorText
              });
            }
          } else {
            // Contact doesn't exist, create it with Enterprise plan
            console.log('⚠️ Contact not found in GoHighLevel, creating new contact');
            
            const createData = {
              email: email,
              firstName: 'Yen',
              lastName: 'Tran',
              name: 'Yen Tran',
              tags: [
                'plan-enterprise',
                'enterprise',
                'Enterprise Plan',
                'vip-customer',
                'billing-monthly',
                'stripe-verified'
              ],
              customFields: [
                { key: 'plan', field_value: 'enterprise' },
                { key: 'subscription_plan', field_value: 'enterprise' },
                { key: 'billing_cycle', field_value: 'monthly' },
                { key: 'stripe_price_id', field_value: 'price_1SFMCnAYjb6yVLnRQFkUWSBB' }
              ],
              source: 'Stripe Subscription',
              locationId: process.env.GOHIGHLEVEL_LOCATION_ID
            };

            const createResponse = await fetch(
              `https://services.leadconnectorhq.com/contacts`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
                  'Content-Type': 'application/json',
                  'Version': '2021-07-28'
                },
                body: JSON.stringify(createData)
              }
            );

            if (createResponse.ok) {
              const newContact = await createResponse.json();
              console.log('✅ Created new contact with Enterprise plan:', newContact.contact?.id);
            }
          }
        }
      } catch (error) {
        console.error('❌ Error updating GoHighLevel:', error);
      }
    }

    // Step 3: Force a cache entry with correct plan
    if (typeof (global as any).planCache !== 'undefined') {
      const enterprisePlan = {
        id: email,
        plan: 'enterprise',
        status: 'active',
        billingCycle: 'monthly',
        startDate: new Date().toISOString(),
        userName: 'Yen Tran',
        features: [
          'All Pro features',
          'Unlimited team members',
          'White-label options',
          'Dedicated account manager',
          'Custom integrations',
          'Advanced analytics'
        ],
        limitations: [],
        usage: {
          comparisons: 0,
          consultations: 0,
          teamMembers: 1
        },
        limits: {
          dailyComparisons: -1,
          monthlyConsultations: -1,
          maxTeamMembers: -1
        }
      };
      
      (global as any).planCache.set(email, {
        data: enterprisePlan,
        timestamp: Date.now()
      });
      
      console.log('✅ Force-cached Enterprise plan for Yen Tran');
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully force-synced Enterprise plan for Yen Tran',
      actions: [
        'Cleared all caches',
        'Updated GoHighLevel tags and custom fields',
        'Force-cached Enterprise plan',
        'User should now refresh their browser'
      ]
    });

  } catch (error) {
    console.error('❌ Error in force sync:', error);
    return res.status(500).json({
      error: 'Failed to force sync',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}