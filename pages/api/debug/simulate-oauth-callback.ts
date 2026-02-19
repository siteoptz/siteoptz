import { NextApiRequest, NextApiResponse } from 'next';

// Import the same functions used in NextAuth
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

async function createGHLContact(email: string, name: string, plan: string = 'free', isTrialUser: boolean = false, qualifyingData?: any) {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.log('GHL credentials not configured - skipping contact creation');
      return { error: 'GHL credentials not configured' };
    }

    console.log('🔧 Creating GHL contact with data:', {
      email,
      name,
      plan,
      isTrialUser,
      hasQualifyingData: !!qualifyingData,
      qualifyingData
    });

    // Determine tags and source based on signup type
    const tags = isTrialUser 
      ? [`siteoptz-trial-${plan}`, 'trial-user', 'oauth-signup']
      : [`siteoptz-plan-${plan}`, 'oauth-signup'];

    // Add discovery-application tag if qualifying data exists
    if (qualifyingData) {
      tags.push('discovery-application', 'signup-form');
    }

    // Build custom fields from qualifying data
    const customFields: Array<{id: string, field_value: string}> = [];
    if (qualifyingData) {
      console.log('🔧 Building custom fields from qualifying data:', qualifyingData);
      
      const fieldMappings = [
        { key: 'business', value: qualifyingData.business, ids: ['clinic_website', 'business_website', 'website', 'Q1: Clinic Website (If any)'] },
        { key: 'bottlenecks', value: qualifyingData.bottlenecks, ids: ['bottlenecks', 'business_bottlenecks', 'Q2: What are the top 1–2 bottlenecks in your business right now where you believe AI could save you the most time or money?'] },
        { key: 'currentAIUsage', value: qualifyingData.currentAIUsage, ids: ['ai_usage', 'current_ai_usage', 'Q3: How are you currently using AI tools in your business today?'] },
        { key: 'priorityOutcome', value: qualifyingData.priorityOutcome, ids: ['priority_outcome', 'automation_priority', 'Q4: If SiteOptz.ai could fully automate one outcome for you over the next 90 days, which would you prioritize first?'] }
      ];
      
      fieldMappings.forEach(mapping => {
        if (mapping.value) {
          mapping.ids.forEach(id => {
            customFields.push({
              id: id,
              field_value: mapping.value
            });
          });
        }
      });
    }

    const contactData = {
      email,
      name,
      tags,
      source: 'Discovery Form + OAuth',
      customFields
    };

    console.log('📤 Sending to GHL:', JSON.stringify(contactData, null, 2));

    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Location-Id': process.env.GHL_LOCATION_ID
      },
      body: JSON.stringify(contactData)
    });

    const responseText = await response.text();
    console.log('📥 GHL response status:', response.status);
    console.log('📥 GHL response body:', responseText);

    if (!response.ok) {
      return {
        error: 'GHL API error',
        status: response.status,
        response: responseText
      };
    }

    const data = JSON.parse(responseText);
    console.log('✅ GHL contact created successfully:', data);
    return {
      success: true,
      contact: data.contact,
      sentData: contactData
    };

  } catch (error) {
    console.error('❌ Create GHL contact error:', error);
    return {
      error: 'Exception occurred',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  console.log('🔄 Simulating OAuth callback for:', email);

  try {
    // Simulate the exact same flow as NextAuth signIn callback
    const existingContact = await searchGHLContact(email);
    
    if (!existingContact) {
      console.log('🆕 New user via OAuth simulation:', email);
      
      // Try to retrieve stored form data (same as NextAuth)
      let formData = null;
      try {
        console.log('🔍 Checking for stored form data...');
        const baseUrl = process.env.NEXTAUTH_URL || `https://${req.headers.host}`;
        const formDataResponse = await fetch(`${baseUrl}/api/store-form-data?email=${encodeURIComponent(email)}`, {
          method: 'GET'
        });
        
        if (formDataResponse.ok) {
          const result = await formDataResponse.json();
          if (result.success && result.data) {
            formData = result.data;
            console.log('✅ Retrieved stored form data:', formData);
          } else {
            console.log('ℹ️ No form data found or invalid response');
          }
        } else {
          console.log('❌ Form data retrieval failed:', formDataResponse.status);
        }
      } catch (error) {
        console.error('❌ Error retrieving form data:', error);
      }
      
      // Create GHL contact with form data (if available)
      const newContact = await createGHLContact(
        email,
        formData?.name || name || 'User',
        'free',
        true,
        formData // This will include all the qualification answers
      );
      
      return res.status(200).json({
        success: true,
        simulation: 'oauth_callback',
        email: email,
        foundExisting: false,
        formDataRetrieved: !!formData,
        formData: formData,
        ghlResult: newContact,
        message: formData ? 'Form data found and sent to GHL' : 'No form data found, created basic GHL contact'
      });
    } else {
      console.log('✅ Existing user found in simulation:', email);
      return res.status(200).json({
        success: true,
        simulation: 'oauth_callback',
        email: email,
        foundExisting: true,
        existingContact: existingContact,
        message: 'Existing user - no new contact created'
      });
    }
    
  } catch (error) {
    console.error('❌ OAuth simulation error:', error);
    return res.status(500).json({ 
      error: 'OAuth simulation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}