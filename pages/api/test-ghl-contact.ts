import { NextApiRequest, NextApiResponse } from 'next';

// GoHighLevel API configuration
const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_API_BASE = 'https://services.leadconnectorhq.com';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== Direct GHL Contact Test ===');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('API Key exists:', !!GHL_API_KEY);
    console.log('API Key length:', GHL_API_KEY.length);
    console.log('Location ID exists:', !!GHL_LOCATION_ID);
    console.log('Location ID:', GHL_LOCATION_ID);

    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      return res.status(400).json({
        error: 'Missing configuration',
        hasApiKey: !!GHL_API_KEY,
        hasLocationId: !!GHL_LOCATION_ID,
        apiKeyLength: GHL_API_KEY.length,
        locationId: GHL_LOCATION_ID
      });
    }

    const testContactData = {
      firstName: 'Verification',
      lastName: 'Test',
      email: `verification-${Date.now()}@siteoptz.ai`,
      phone: '',
      tags: [
        'New Lead',  // This triggers the 'New Lead Workflow'
        'API Verification Test',
        `Timestamp: ${new Date().toISOString()}`,
        'Environment: Production'
      ],
      customFields: [], // v2.0 API structure
      source: 'API Verification Test - SiteOptz',
    };

    console.log('Sending test contact to GoHighLevel:', JSON.stringify(testContactData, null, 2));

    const response = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-04-15',
        'Location-Id': GHL_LOCATION_ID,
      },
      body: JSON.stringify(testContactData),
    });

    console.log('GoHighLevel Response Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('Response Body:', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = { rawResponse: responseText };
    }

    if (response.ok) {
      console.log('✅ SUCCESS: Contact created in GoHighLevel');
      console.log('Contact ID:', responseData.contact?.id);
      console.log('================================');
      
      return res.status(200).json({
        success: true,
        message: 'Contact successfully created in GoHighLevel!',
        contactId: responseData.contact?.id,
        response: responseData,
        config: {
          hasApiKey: !!GHL_API_KEY,
          hasLocationId: !!GHL_LOCATION_ID,
          apiKeyLength: GHL_API_KEY.length
        }
      });
    } else {
      console.log('❌ FAILED: GoHighLevel API error');
      console.log('Error:', responseText);
      console.log('================================');
      
      return res.status(response.status).json({
        success: false,
        error: 'Failed to create contact in GoHighLevel',
        details: responseData,
        status: response.status,
        config: {
          hasApiKey: !!GHL_API_KEY,
          hasLocationId: !!GHL_LOCATION_ID,
          apiKeyLength: GHL_API_KEY.length
        }
      });
    }

  } catch (error) {
    console.error('Test contact creation error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      config: {
        hasApiKey: !!GHL_API_KEY,
        hasLocationId: !!GHL_LOCATION_ID,
        apiKeyLength: GHL_API_KEY.length
      }
    });
  }
}