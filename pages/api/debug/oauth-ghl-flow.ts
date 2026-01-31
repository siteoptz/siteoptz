import { NextApiRequest, NextApiResponse } from 'next';

// Import the same functions used in NextAuth callback
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
        source: 'OAuth Flow Test',
        customFields: {
          'signup_source': 'oauth_flow_test',
          'signup_date': new Date().toISOString(),
          'is_trial_user': isTrialUser ? 'true' : 'false',
          'initial_plan': plan
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ GHL create contact failed:', {
        status: response.status,
        statusText: response.statusText,
        error: error,
        email: email,
        requestBody: { email, name, tags, source: 'OAuth Flow Test' }
      });
      return null;
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
  // Security check
  const debugKey = req.query.debug;
  if (process.env.NODE_ENV !== 'development' && debugKey !== 'siteoptz-debug-2024') {
    return res.status(404).json({ error: 'Not found' });
  }

  const { email, name, plan = 'free', trial = 'true' } = req.query;

  if (!email || !name) {
    return res.status(400).json({ 
      error: 'Missing parameters', 
      usage: '/api/debug/oauth-ghl-flow?email=test@example.com&name=Test User&debug=siteoptz-debug-2024'
    });
  }

  try {
    const results: any = {
      timestamp: new Date().toISOString(),
      test_parameters: {
        email: email as string,
        name: name as string,
        plan: plan as string,
        trial: trial === 'true'
      },
      oauth_flow_simulation: []
    };

    console.log('🔥 OAuth Flow Simulation for:', email);

    // Step 1: Search for existing contact (like OAuth callback does)
    console.log('🔍 Step 1: Searching for existing contact...');
    const existingContact = await searchGHLContact(email as string);
    
    results.oauth_flow_simulation.push({
      step: 1,
      action: 'search_existing_contact',
      email: email,
      found: !!existingContact,
      contact: existingContact ? {
        id: existingContact.id,
        email: existingContact.email,
        name: existingContact.name,
        tags: existingContact.tags
      } : null
    });

    // Step 2: Create contact if not found (like OAuth callback does)
    let newContact = null;
    if (!existingContact) {
      console.log('🆕 Step 2: Creating new contact...');
      newContact = await createGHLContact(
        email as string,
        name as string,
        plan as string,
        trial === 'true'
      );
      
      results.oauth_flow_simulation.push({
        step: 2,
        action: 'create_new_contact',
        email: email,
        success: !!newContact,
        contact: newContact ? {
          id: newContact.id,
          email: newContact.email,
          name: newContact.name,
          tags: newContact.tags
        } : null,
        error: !newContact ? 'Contact creation failed' : null
      });
    } else {
      results.oauth_flow_simulation.push({
        step: 2,
        action: 'create_new_contact',
        skipped: true,
        reason: 'Contact already exists'
      });
    }

    // Step 3: Verify final result
    console.log('🔍 Step 3: Final verification search...');
    const finalContact = await searchGHLContact(email as string);
    
    results.oauth_flow_simulation.push({
      step: 3,
      action: 'final_verification',
      email: email,
      contact_exists: !!finalContact,
      contact: finalContact ? {
        id: finalContact.id,
        email: finalContact.email,
        name: finalContact.name,
        tags: finalContact.tags
      } : null
    });

    // Summary
    results.summary = {
      oauth_flow_would_succeed: !!finalContact,
      contact_created_or_found: !!finalContact,
      ghl_integration_working: !!finalContact,
      next_steps: []
    };

    if (!finalContact) {
      results.summary.next_steps.push('Contact creation failed - check GHL API permissions');
      results.summary.next_steps.push('Verify API key has contacts.write scope');
      results.summary.next_steps.push('Check Vercel function logs for detailed errors');
    } else {
      results.summary.next_steps.push('OAuth flow should work correctly');
      results.summary.next_steps.push('Test actual OAuth sign-up to verify end-to-end');
    }

    res.status(200).json(results);

  } catch (error) {
    console.error('OAuth flow test error:', error);
    res.status(500).json({ 
      error: 'Test failed', 
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}