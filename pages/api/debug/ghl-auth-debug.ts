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

    const diagnostics: any = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      
      // Environment variable checks
      env_check: {
        api_key_exists: !!apiKey,
        api_key_length: apiKey?.length || 0,
        api_key_format: {
          starts_with: apiKey?.substring(0, 8) + '...',
          contains_hyphen: apiKey?.includes('-') || false,
          contains_underscore: apiKey?.includes('_') || false,
          is_uuid_format: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(apiKey || ''),
        },
        location_id_exists: !!locationId,
        location_id_value: locationId,
        location_id_length: locationId?.length || 0
      },

      // Test different API endpoints to isolate the issue
      api_tests: [] as any[]
    };

    if (!apiKey || !locationId) {
      diagnostics.api_tests.push({
        test: 'credentials_missing',
        result: 'skipped',
        reason: 'Missing API key or location ID'
      });
      return res.status(200).json(diagnostics);
    }

    // Test 1: Basic API connectivity without location
    try {
      const basicResponse = await fetch(
        'https://services.leadconnectorhq.com/contacts/search/duplicate?email=nonexistent@test.com',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Version': '2021-07-28'
          }
        }
      );

      const basicResponseText = await basicResponse.text();
      let basicData;
      try {
        basicData = JSON.parse(basicResponseText);
      } catch (e) {
        basicData = basicResponseText;
      }

      diagnostics.api_tests.push({
        test: 'basic_auth_without_location',
        status: basicResponse.status,
        success: basicResponse.ok,
        headers: {
          'content-type': basicResponse.headers.get('content-type'),
          'x-ratelimit-remaining': basicResponse.headers.get('x-ratelimit-remaining'),
        },
        response: basicData
      });
    } catch (error) {
      diagnostics.api_tests.push({
        test: 'basic_auth_without_location',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 2: With location ID in query params
    try {
      const locationResponse = await fetch(
        `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${locationId}&email=nonexistent@test.com`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Version': '2021-07-28'
          }
        }
      );

      const locationResponseText = await locationResponse.text();
      let locationData;
      try {
        locationData = JSON.parse(locationResponseText);
      } catch (e) {
        locationData = locationResponseText;
      }

      diagnostics.api_tests.push({
        test: 'auth_with_location_query',
        status: locationResponse.status,
        success: locationResponse.ok,
        headers: {
          'content-type': locationResponse.headers.get('content-type'),
          'x-ratelimit-remaining': locationResponse.headers.get('x-ratelimit-remaining'),
        },
        response: locationData
      });
    } catch (error) {
      diagnostics.api_tests.push({
        test: 'auth_with_location_query',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 3: List contacts with location
    try {
      const listResponse = await fetch(
        `https://services.leadconnectorhq.com/contacts/?locationId=${locationId}&limit=1`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Version': '2021-07-28'
          }
        }
      );

      const listResponseText = await listResponse.text();
      let listData;
      try {
        listData = JSON.parse(listResponseText);
      } catch (e) {
        listData = listResponseText;
      }

      diagnostics.api_tests.push({
        test: 'list_contacts_with_location',
        status: listResponse.status,
        success: listResponse.ok,
        headers: {
          'content-type': listResponse.headers.get('content-type'),
          'x-ratelimit-remaining': listResponse.headers.get('x-ratelimit-remaining'),
        },
        response: listData
      });
    } catch (error) {
      diagnostics.api_tests.push({
        test: 'list_contacts_with_location',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 4: Alternative API version
    try {
      const altVersionResponse = await fetch(
        `https://services.leadconnectorhq.com/contacts/?locationId=${locationId}&limit=1`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Version': '2021-04-15' // Try different version
          }
        }
      );

      const altVersionResponseText = await altVersionResponse.text();
      let altVersionData;
      try {
        altVersionData = JSON.parse(altVersionResponseText);
      } catch (e) {
        altVersionData = altVersionResponseText;
      }

      diagnostics.api_tests.push({
        test: 'alternative_api_version',
        status: altVersionResponse.status,
        success: altVersionResponse.ok,
        headers: {
          'content-type': altVersionResponse.headers.get('content-type'),
          'x-ratelimit-remaining': altVersionResponse.headers.get('x-ratelimit-remaining'),
        },
        response: altVersionData
      });
    } catch (error) {
      diagnostics.api_tests.push({
        test: 'alternative_api_version',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Analysis and recommendations
    const analysis = {
      likely_issues: [] as string[],
      recommendations: [] as string[]
    };

    const failedTests = diagnostics.api_tests.filter(test => !test.success);
    const allAuthErrors = diagnostics.api_tests.every(test => 
      test.status === 401 || (test.response && typeof test.response === 'object' && 
      test.response.message && test.response.message.includes('Invalid Private Integration token'))
    );

    if (allAuthErrors) {
      analysis.likely_issues.push('API key is completely invalid or not properly deployed');
      analysis.recommendations.push('Double-check the API key was copied correctly');
      analysis.recommendations.push('Verify the API key is for the correct GHL account');
      analysis.recommendations.push('Check if Vercel environment variables updated properly');
    }

    if (apiKey && apiKey.length < 20) {
      analysis.likely_issues.push('API key appears too short');
      analysis.recommendations.push('GHL API keys are typically longer - verify full key was copied');
    }

    if (apiKey && !apiKey.includes('-') && !apiKey.includes('_')) {
      analysis.likely_issues.push('API key format may be incorrect');
      analysis.recommendations.push('GHL API keys usually contain hyphens or underscores');
    }

    diagnostics.analysis = analysis;

    res.status(200).json(diagnostics);

  } catch (error) {
    console.error('GHL Auth Debug Error:', error);
    res.status(500).json({ 
      error: 'Debug failed', 
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}