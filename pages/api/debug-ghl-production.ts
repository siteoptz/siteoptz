import { NextApiRequest, NextApiResponse } from 'next';

// Production diagnostic endpoint to check GoHighLevel integration
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Security check
  const debugSecret = req.query.secret;
  const isDev = process.env.NODE_ENV === 'development';
  const isAuthorized = debugSecret === 'debug123' || isDev;
  
  if (!isAuthorized) {
    return res.status(403).json({ error: 'Unauthorized - add ?secret=debug123' });
  }

  const diagnostic = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    
    // Environment variables check
    envVars: {
      ENABLE_GHL: process.env.ENABLE_GHL,
      HAS_API_KEY: !!process.env.GOHIGHLEVEL_API_KEY,
      HAS_LOCATION_ID: !!process.env.GOHIGHLEVEL_LOCATION_ID,
      API_KEY_PREVIEW: process.env.GOHIGHLEVEL_API_KEY ? 
        process.env.GOHIGHLEVEL_API_KEY.substring(0, 10) + '...' : 'Not set',
      LOCATION_ID_PREVIEW: process.env.GOHIGHLEVEL_LOCATION_ID || 'Not set'
    },
    
    // Integration status
    integrationStatus: {
      isGHLEnabled: process.env.ENABLE_GHL === 'true',
      hasRequiredVars: !!(process.env.GOHIGHLEVEL_API_KEY && process.env.GOHIGHLEVEL_LOCATION_ID)
    }
  };

  // Test GoHighLevel API connectivity
  if (process.env.GOHIGHLEVEL_API_KEY && process.env.GOHIGHLEVEL_LOCATION_ID) {
    try {
      const testResponse = await fetch(
        `https://services.leadconnectorhq.com/contacts/search/duplicate?email=test@example.com&locationId=${process.env.GOHIGHLEVEL_LOCATION_ID}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
            'Content-Type': 'application/json',
            'Version': '2021-07-28'
          }
        }
      );

      diagnostic.apiTest = {
        status: testResponse.status,
        statusText: testResponse.statusText,
        success: testResponse.ok
      };

      if (!testResponse.ok) {
        const errorText = await testResponse.text();
        diagnostic.apiTest.error = errorText;
      }
    } catch (error) {
      diagnostic.apiTest = {
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false
      };
    }
  } else {
    diagnostic.apiTest = {
      error: 'Missing API credentials',
      success: false
    };
  }

  return res.status(200).json(diagnostic);
}