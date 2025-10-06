import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // This is for Yen Tran specifically
  if (email !== 'yentran.todaysvision@gmail.com') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    // Clear all caches for this user
    if (typeof (global as any).planCache !== 'undefined') {
      (global as any).planCache.delete(email);
      console.log('✅ Cleared plan cache for:', email);
    }
    
    if (typeof (global as any).ghlCache !== 'undefined') {
      (global as any).ghlCache.delete(email);
      console.log('✅ Cleared GHL cache for:', email);
    }

    // Update GoHighLevel contact directly
    if (process.env.ENABLE_GHL === 'true' && process.env.GOHIGHLEVEL_API_KEY) {
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
          
          // Update with Enterprise plan
          const updateData = {
            tags: ['plan-enterprise', 'enterprise-user', 'vip', 'billing-monthly'],
            customFields: [
              {
                key: 'plan',
                field_value: 'enterprise'
              },
              {
                key: 'subscription_plan',
                field_value: 'enterprise'
              },
              {
                key: 'billing_cycle', 
                field_value: 'monthly'
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
            return res.status(200).json({
              success: true,
              message: 'Successfully updated to Enterprise plan',
              contactId,
              plan: 'enterprise'
            });
          } else {
            const errorText = await updateResponse.text();
            console.error('Failed to update GoHighLevel:', errorText);
            return res.status(500).json({
              success: false,
              message: 'Failed to update GoHighLevel',
              error: errorText
            });
          }
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Caches cleared, please refresh the page'
    });

  } catch (error) {
    console.error('Error fixing user plan:', error);
    return res.status(500).json({
      error: 'Failed to fix plan',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}