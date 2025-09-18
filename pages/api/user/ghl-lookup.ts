import { NextApiRequest, NextApiResponse } from 'next';

interface ContactLookupResult {
  exists: boolean;
  contactId?: string;
  name?: string;
  plan?: string;
  email?: string;
}

// Function to get contact details from GoHighLevel
export async function getContactByEmail(email: string): Promise<ContactLookupResult> {
  console.log('🔍 Looking up contact in GoHighLevel:', email);
  
  // Check if GoHighLevel integration is enabled
  const isGHLEnabled = process.env.ENABLE_GHL === 'true';
  if (!isGHLEnabled || !process.env.GOHIGHLEVEL_API_KEY || !process.env.GOHIGHLEVEL_LOCATION_ID) {
    console.log('⚠️ GoHighLevel integration disabled, cannot lookup contact');
    return { exists: false };
  }

  try {
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };
    
    if (process.env.GOHIGHLEVEL_LOCATION_ID) {
      headers['Location-Id'] = process.env.GOHIGHLEVEL_LOCATION_ID;
    }
    
    // Search for existing contact by email
    const searchResponse = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers
      }
    );

    console.log('📥 GoHighLevel search response status:', searchResponse.status);

    if (searchResponse.ok) {
      const searchResult = await searchResponse.json();
      console.log('📥 GoHighLevel search result:', JSON.stringify(searchResult, null, 2));
      
      // If contact exists, extract details
      if (searchResult.contact && searchResult.contact.id) {
        const contact = searchResult.contact;
        
        // Extract plan from tags or custom fields
        let plan = 'free'; // default
        
        // Check tags for plan information
        if (contact.tags && Array.isArray(contact.tags)) {
          const planTags = contact.tags.filter((tag: string) => 
            ['free', 'starter', 'pro', 'enterprise'].includes(tag.toLowerCase())
          );
          if (planTags.length > 0) {
            plan = planTags[0].toLowerCase();
          }
        }
        
        // Check custom fields for plan information
        if (contact.customFields && Array.isArray(contact.customFields)) {
          const planField = contact.customFields.find((field: any) => 
            field.key === 'plan' || field.key === 'subscription_plan'
          );
          if (planField && planField.value) {
            plan = planField.value.toLowerCase();
          }
        }
        
        console.log('✅ Contact found:', { 
          id: contact.id, 
          name: contact.name || contact.firstName, 
          plan 
        });
        
        return { 
          exists: true, 
          contactId: contact.id,
          name: contact.name || `${contact.firstName || ''} ${contact.lastName || ''}`.trim(),
          plan: plan,
          email: contact.email
        };
      }
    } else {
      console.log('❌ GoHighLevel search failed:', searchResponse.status, await searchResponse.text());
    }
    
    return { exists: false };
  } catch (error) {
    console.error('❌ Error searching for contact in GoHighLevel:', error);
    return { exists: false };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const result = await getContactByEmail(email);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in GHL lookup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}