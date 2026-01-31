import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Security check
  const debugKey = req.query.debug;
  if (process.env.NODE_ENV !== 'development' && debugKey !== 'siteoptz-debug-2024') {
    return res.status(404).json({ error: 'Not found' });
  }

  try {
    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!apiKey || !locationId) {
      return res.status(200).json({ 
        error: 'Missing credentials',
        api_key_exists: !!apiKey,
        location_id_exists: !!locationId 
      });
    }

    // Test 1: Simple contacts list with minimal parameters
    console.log('🔧 Testing GHL API with:', {
      api_key_length: apiKey.length,
      location_id: locationId,
      api_key_start: apiKey.substring(0, 8) + '...'
    });

    const response = await fetch(
      `https://services.leadconnectorhq.com/contacts/?locationId=${locationId}&limit=1`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`, // Trim any whitespace
          'Version': '2021-07-28',
          'Content-Type': 'application/json'
        }
      }
    );

    const responseText = await response.text();
    console.log('🔧 GHL API Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'content-type': response.headers.get('content-type'),
        'x-ratelimit-remaining': response.headers.get('x-ratelimit-remaining')
      },
      body_preview: responseText.substring(0, 200)
    });

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = responseText;
    }

    // Test 2: If first test fails, try with different headers
    let alternativeTest = null;
    if (!response.ok) {
      try {
        const altResponse = await fetch(
          `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${locationId}&email=test@example.com`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${apiKey.trim()}`,
              'Version': '2021-07-28'
            }
          }
        );

        const altResponseText = await altResponse.text();
        let altData;
        try {
          altData = JSON.parse(altResponseText);
        } catch (e) {
          altData = altResponseText;
        }

        alternativeTest = {
          status: altResponse.status,
          success: altResponse.ok,
          response: altData
        };
      } catch (error) {
        alternativeTest = {
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }

    const result = {
      timestamp: new Date().toISOString(),
      api_key_info: {
        length: apiKey.length,
        starts_with: apiKey.substring(0, 8) + '...',
        ends_with: '...' + apiKey.substring(apiKey.length - 4),
        has_whitespace: apiKey !== apiKey.trim(),
        location_id: locationId
      },
      primary_test: {
        url: `https://services.leadconnectorhq.com/contacts/?locationId=${locationId}&limit=1`,
        method: 'GET',
        status: response.status,
        statusText: response.statusText,
        success: response.ok,
        headers: {
          'content-type': response.headers.get('content-type'),
          'x-ratelimit-remaining': response.headers.get('x-ratelimit-remaining')
        },
        response: responseData
      },
      alternative_test: alternativeTest,
      recommendations: [] as string[]
    };

    // Add recommendations based on results
    if (result.primary_test.status === 401) {
      result.recommendations.push('API key is invalid - regenerate in GHL dashboard');
      result.recommendations.push('Verify API key has contacts.readonly permission');
      result.recommendations.push('Check if API key is for correct GHL account');
    }

    if (result.api_key_info.has_whitespace) {
      result.recommendations.push('API key has leading/trailing whitespace - clean it up');
    }

    res.status(200).json(result);

  } catch (error) {
    console.error('🔧 GHL Simple Test Error:', error);
    res.status(500).json({ 
      error: 'Test failed', 
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}