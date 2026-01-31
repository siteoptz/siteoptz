import { NextApiRequest, NextApiResponse } from 'next';

// Import the same functions from NextAuth for consistency
async function searchGHLContact(email: string) {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.log('GHL credentials not configured');
      return null;
    }

    const response = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${process.env.GHL_LOCATION_ID}&email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
          'Version': '2021-07-28'
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ GHL search failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        email: email
      });
      return null;
    }

    const data = await response.json();
    if (data.contact) {
      console.log('✅ Found existing GHL contact:', email);
      return data.contact;
    }

    console.log('ℹ️ No GHL contact found for:', email);
    return null;
  } catch (error) {
    console.error('GHL search error:', error);
    return null;
  }
}

async function createGHLContact(email: string, name: string, plan: string = 'free', isTrialUser: boolean = false) {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.log('GHL credentials not configured - skipping contact creation');
      return null;
    }

    // Determine tags and source based on signup type
    const tags = isTrialUser 
      ? [`siteoptz-trial-${plan}`, 'trial-user', 'oauth-signup']
      : [`siteoptz-plan-${plan}`, 'oauth-signup'];

    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locationId: process.env.GHL_LOCATION_ID,
        email,
        name,
        tags: tags,
        source: 'Manual Test',
      })
    });

    if (!response.ok) {
      const error = await response.text();
      const errorDetails = {
        status: response.status,
        statusText: response.statusText,
        error: error,
        email: email,
        requestBody: { email, name, tags, source: 'Manual Test' }
      };
      console.error('❌ GHL create contact failed:', errorDetails);
      return { error: errorDetails };
    }

    const data = await response.json();
    console.log('✅ Created new GHL contact:', email, 'Plan:', plan, 'Trial:', isTrialUser);
    return data.contact;
  } catch (error) {
    console.error('GHL create contact error:', error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, plan = 'free', trial = false, action } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const results: any = {
      timestamp: new Date().toISOString(),
      email: email,
      name: name || 'Test User',
      plan: plan,
      trial: trial,
      action: action,
      steps: []
    };

    // Step 1: Check environment variables
    results.steps.push({
      step: 'env_check',
      ghl_api_key_exists: !!process.env.GHL_API_KEY,
      ghl_location_id_exists: !!process.env.GHL_LOCATION_ID,
      ghl_location_id: process.env.GHL_LOCATION_ID,
      configured: !!(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID)
    });

    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      results.error = 'GHL not configured';
      return res.status(200).json(results);
    }

    // Step 2: Search for existing contact
    console.log('🔍 Searching for existing contact:', email);
    const existingContact = await searchGHLContact(email);
    results.steps.push({
      step: 'search_contact',
      found: !!existingContact,
      contact: existingContact ? {
        id: existingContact.id,
        email: existingContact.email,
        name: existingContact.name,
        tags: existingContact.tags
      } : null
    });

    if (action === 'search_only') {
      return res.status(200).json(results);
    }

    // Step 3: Create contact if not found (or if forced)
    let newContact = null;
    if (!existingContact || action === 'force_create') {
      console.log('🔨 Creating new contact:', email);
      newContact = await createGHLContact(
        email, 
        name || 'Test User', 
        plan, 
        trial
      );
      
      results.steps.push({
        step: 'create_contact',
        success: !!newContact && !newContact.error,
        contact: newContact && !newContact.error ? {
          id: newContact.id,
          email: newContact.email,
          name: newContact.name,
          tags: newContact.tags
        } : null,
        error: newContact?.error || null
      });
    } else {
      results.steps.push({
        step: 'create_contact',
        skipped: true,
        reason: 'Contact already exists'
      });
    }

    // Step 4: Final verification - search again
    console.log('🔍 Final verification search:', email);
    const finalContact = await searchGHLContact(email);
    results.steps.push({
      step: 'final_verification',
      found: !!finalContact,
      contact: finalContact ? {
        id: finalContact.id,
        email: finalContact.email,
        name: finalContact.name,
        tags: finalContact.tags
      } : null
    });

    results.success = !!finalContact;
    results.final_contact = finalContact;

    res.status(200).json(results);

  } catch (error) {
    console.error('Manual GHL test error:', error);
    res.status(500).json({ 
      error: 'Test failed', 
      message: error instanceof Error ? error.message : 'Unknown error',
      email: email
    });
  }
}