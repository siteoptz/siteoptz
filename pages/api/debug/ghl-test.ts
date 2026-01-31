import { NextApiRequest, NextApiResponse } from 'next';

// Helper function to test GHL contact search
async function testGHLSearch(email: string) {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      return { success: false, error: 'GHL credentials not configured' };
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

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = responseText;
    }

    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: responseData,
      headers: {
        'content-type': response.headers.get('content-type'),
        'x-ratelimit-remaining': response.headers.get('x-ratelimit-remaining'),
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    };
  }
}

// Helper function to test GHL contact creation
async function testGHLCreate(email: string, name: string, plan: string = 'free', isTrialUser: boolean = false) {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      return { success: false, error: 'GHL credentials not configured' };
    }

    // Determine tags and source based on signup type
    const tags = isTrialUser 
      ? [`siteoptz-trial-${plan}`, 'trial-user', 'oauth-signup']
      : [`siteoptz-plan-${plan}`, 'oauth-signup'];

    const requestBody = {
      locationId: process.env.GHL_LOCATION_ID,
      email,
      name,
      tags: tags,
      source: 'Google OAuth Test',
      customFields: {
        'signup_source': 'google_oauth_test',
        'signup_date': new Date().toISOString(),
        'is_trial_user': isTrialUser ? 'true' : 'false',
        'initial_plan': plan
      }
    };

    console.log('🔧 GHL Create Request:', {
      url: 'https://services.leadconnectorhq.com/contacts/',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY?.substring(0, 10)}...`,
        'Location-Id': process.env.GHL_LOCATION_ID
      },
      body: requestBody
    });

    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = responseText;
    }

    console.log('🔧 GHL Create Response:', {
      status: response.status,
      statusText: response.statusText,
      data: responseData
    });

    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: responseData,
      requestBody,
      headers: {
        'content-type': response.headers.get('content-type'),
        'x-ratelimit-remaining': response.headers.get('x-ratelimit-remaining'),
      }
    };
  } catch (error) {
    console.error('🔧 GHL Create Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    };
  }
}

// Test GHL API connection
async function testGHLConnection() {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      return { success: false, error: 'GHL credentials not configured' };
    }

    // Test with a simple endpoint that should always work
    const response = await fetch(
      `https://services.leadconnectorhq.com/contacts/?locationId=${process.env.GHL_LOCATION_ID}&limit=1`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
          'Version': '2021-07-28'
        }
      }
    );

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = responseText;
    }

    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: responseData,
      headers: {
        'content-type': response.headers.get('content-type'),
        'x-ratelimit-remaining': response.headers.get('x-ratelimit-remaining'),
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Security check
  const debugKey = req.query.debug;
  if (process.env.NODE_ENV !== 'development' && debugKey !== 'siteoptz-debug-2024') {
    return res.status(404).json({ error: 'Not found' });
  }

  const { action, email, name, plan, trial } = req.query;

  try {
    let result;

    switch (action) {
      case 'connection':
        result = await testGHLConnection();
        break;
        
      case 'search':
        if (!email) {
          return res.status(400).json({ error: 'Email parameter required for search' });
        }
        result = await testGHLSearch(email as string);
        break;
        
      case 'create':
        if (!email || !name) {
          return res.status(400).json({ error: 'Email and name parameters required for create' });
        }
        result = await testGHLCreate(
          email as string,
          name as string,
          (plan as string) || 'free',
          trial === 'true'
        );
        break;
        
      default:
        // Run all tests
        const connectionTest = await testGHLConnection();
        const searchTest = email ? await testGHLSearch(email as string) : null;
        
        result = {
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV,
          ghl_configured: !!(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID),
          api_key_length: process.env.GHL_API_KEY?.length || 0,
          location_id: process.env.GHL_LOCATION_ID,
          connection_test: connectionTest,
          search_test: searchTest,
          usage: {
            connection: 'GET /api/debug/ghl-test?action=connection',
            search: 'GET /api/debug/ghl-test?action=search&email=test@example.com',
            create: 'GET /api/debug/ghl-test?action=create&email=test@example.com&name=Test User&plan=free&trial=true'
          }
        };
    }

    res.status(200).json(result);
    
  } catch (error) {
    console.error('GHL Test API Error:', error);
    res.status(500).json({ 
      error: 'Test failed', 
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}