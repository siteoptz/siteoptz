import { NextApiRequest, NextApiResponse } from 'next';

// GoHighLevel API configuration
const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_API_BASE = 'https://services.leadconnectorhq.com';

interface DebugResponse {
  timestamp: string;
  environment: 'development' | 'production';
  ghlConfig: {
    enabled: boolean;
    enabledRaw: string | undefined;
    hasApiKey: boolean;
    apiKeyLength: number;
    hasLocationId: boolean;
    locationId: string;
    apiBase: string;
  };
  connectionTest?: {
    success: boolean;
    status?: number;
    error?: string;
    locationName?: string;
  };
  testContactCreation?: {
    success: boolean;
    status?: number;
    contactId?: string;
    error?: string;
    response?: any;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DebugResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV as any,
      ghlConfig: {
        enabled: process.env.ENABLE_GHL === 'true',
        enabledRaw: process.env.ENABLE_GHL,
        hasApiKey: false,
        apiKeyLength: 0,
        hasLocationId: false,
        locationId: '',
        apiBase: GHL_API_BASE
      }
    });
  }

  const debugResponse: DebugResponse = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV as any,
    ghlConfig: {
      enabled: process.env.ENABLE_GHL === 'true',
      enabledRaw: process.env.ENABLE_GHL,
      hasApiKey: !!GHL_API_KEY,
      apiKeyLength: GHL_API_KEY.length,
      hasLocationId: !!GHL_LOCATION_ID,
      locationId: GHL_LOCATION_ID,
      apiBase: GHL_API_BASE
    }
  };

  // Test 1: Check API connection by getting location info
  try {
    console.log('Testing GoHighLevel connection...');
    
    const locationResponse = await fetch(`${GHL_API_BASE}/locations/${GHL_LOCATION_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-04-15',
      },
    });

    debugResponse.connectionTest = {
      success: locationResponse.ok,
      status: locationResponse.status
    };

    if (locationResponse.ok) {
      const locationData = await locationResponse.json();
      debugResponse.connectionTest.locationName = locationData.name;
      console.log('✅ GoHighLevel connection successful');
    } else {
      const errorText = await locationResponse.text();
      debugResponse.connectionTest.error = errorText;
      console.error('❌ GoHighLevel connection failed:', errorText);
    }
  } catch (error) {
    debugResponse.connectionTest = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    console.error('❌ GoHighLevel connection error:', error);
  }

  // Test 2: Try to create a test contact
  if (debugResponse.connectionTest?.success) {
    try {
      console.log('Testing contact creation...');
      
      const testContactData = {
        firstName: 'Debug',
        lastName: 'Test',
        email: `debug-test-${Date.now()}@example.com`,
        phone: '',
        tags: ['New Lead', 'Debug Test', 'API Validation', `Timestamp: ${new Date().toISOString()}`],
        customFields: [], // Updated to v2.0 API structure
        source: 'Debug Test - SiteOptz API',
        locationId: GHL_LOCATION_ID,
      };

      const contactResponse = await fetch(`${GHL_API_BASE}/contacts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-04-15',
        },
        body: JSON.stringify(testContactData),
      });

      debugResponse.testContactCreation = {
        success: contactResponse.ok,
        status: contactResponse.status
      };

      const responseText = await contactResponse.text();
      
      if (contactResponse.ok) {
        try {
          const contactData = JSON.parse(responseText);
          debugResponse.testContactCreation.contactId = contactData.contact?.id;
          debugResponse.testContactCreation.response = contactData;
          console.log('✅ Test contact created successfully:', contactData.contact?.id);
        } catch (e) {
          debugResponse.testContactCreation.response = responseText;
          console.log('✅ Contact creation succeeded, raw response:', responseText);
        }
      } else {
        debugResponse.testContactCreation.error = responseText;
        console.error('❌ Contact creation failed:', responseText);
      }
    } catch (error) {
      debugResponse.testContactCreation = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      console.error('❌ Contact creation error:', error);
    }
  }

  // Log the complete debug info
  console.log('=== GoHighLevel Debug Report ===');
  console.log(JSON.stringify(debugResponse, null, 2));
  console.log('===============================');

  return res.status(200).json(debugResponse);
}