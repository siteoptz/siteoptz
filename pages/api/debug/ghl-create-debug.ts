import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Security check
  const debugKey = req.query.debug;
  if (process.env.NODE_ENV !== 'development' && debugKey !== 'siteoptz-debug-2024') {
    return res.status(404).json({ error: 'Not found' });
  }

  const { email = 'debug-test@example.com', name = 'Debug Test' } = req.query;

  try {
    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!apiKey || !locationId) {
      return res.status(400).json({ error: 'GHL not configured' });
    }

    const requestBody = {
      locationId: locationId,
      email: email,
      name: name,
      tags: ['debug-test', 'api-test'],
      source: 'Debug Test',
      customFields: {
        'test_field': 'debug_value'
      }
    };

    console.log('🔧 GHL Create Request Details:', {
      url: 'https://services.leadconnectorhq.com/contacts/',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.substring(0, 10)}...`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      },
      body: requestBody,
      body_json: JSON.stringify(requestBody)
    });

    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const responseText = await response.text();
    console.log('🔧 GHL Create Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'content-type': response.headers.get('content-type'),
        'x-ratelimit-remaining': response.headers.get('x-ratelimit-remaining')
      },
      body: responseText
    });

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = responseText;
    }

    const result = {
      timestamp: new Date().toISOString(),
      test_parameters: {
        email: email,
        name: name,
        api_key_length: apiKey.length,
        location_id: locationId
      },
      request: {
        url: 'https://services.leadconnectorhq.com/contacts/',
        method: 'POST',
        body: requestBody
      },
      response: {
        status: response.status,
        statusText: response.statusText,
        success: response.ok,
        headers: {
          'content-type': response.headers.get('content-type'),
          'x-ratelimit-remaining': response.headers.get('x-ratelimit-remaining')
        },
        data: responseData
      },
      analysis: {
        api_working: response.status !== 401,
        contact_created: response.ok && responseData?.contact?.id,
        error_type: !response.ok ? 'HTTP_ERROR' : null,
        recommendations: [] as string[]
      }
    };

    // Add specific recommendations based on the error
    if (response.status === 400) {
      result.analysis.recommendations.push('Bad request - check required fields and data format');
      result.analysis.recommendations.push('Verify locationId, email, and name are valid');
    } else if (response.status === 401) {
      result.analysis.recommendations.push('Unauthorized - API key invalid or expired');
    } else if (response.status === 403) {
      result.analysis.recommendations.push('Forbidden - API key lacks contacts.write permission');
    } else if (response.status === 422) {
      result.analysis.recommendations.push('Validation error - check field formats and requirements');
    } else if (!response.ok) {
      result.analysis.recommendations.push(`HTTP ${response.status} error - check GHL API documentation`);
    }

    res.status(200).json(result);

  } catch (error) {
    console.error('🔧 GHL Create Debug Error:', error);
    res.status(500).json({ 
      error: 'Debug test failed', 
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}