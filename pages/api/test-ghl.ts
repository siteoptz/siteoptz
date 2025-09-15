import { NextApiRequest, NextApiResponse } from 'next';
const SiteOptzGoHighLevel = require('../../utils/siteoptz-gohighlevel');

interface TestResponse {
  success: boolean;
  environment: {
    nodeEnv: string;
    timestamp: string;
    apiKeyPresent: boolean;
    apiKeyLength: number;
    locationIdPresent: boolean;
    locationId: string | null;
    enableGhlPresent: boolean;
    enableGhlValue: string | null;
  };
  integration?: {
    classInitialized: boolean;
    testResult?: any;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TestResponse>
) {
  // Only allow GET requests for this test endpoint
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false,
      environment: {
        nodeEnv: process.env.NODE_ENV || 'unknown',
        timestamp: new Date().toISOString(),
        apiKeyPresent: false,
        apiKeyLength: 0,
        locationIdPresent: false,
        locationId: null,
        enableGhlPresent: false,
        enableGhlValue: null
      },
      error: 'Method not allowed. Use GET.'
    });
  }

  try {
    console.log('🔍 GoHighLevel Test API called');
    
    // Collect environment information
    const environment = {
      nodeEnv: process.env.NODE_ENV || 'unknown',
      timestamp: new Date().toISOString(),
      apiKeyPresent: !!process.env.GOHIGHLEVEL_API_KEY,
      apiKeyLength: process.env.GOHIGHLEVEL_API_KEY ? process.env.GOHIGHLEVEL_API_KEY.length : 0,
      locationIdPresent: !!process.env.GOHIGHLEVEL_LOCATION_ID,
      locationId: process.env.GOHIGHLEVEL_LOCATION_ID || null,
      enableGhlPresent: !!process.env.ENABLE_GHL,
      enableGhlValue: process.env.ENABLE_GHL || null
    };

    console.log('📊 Environment Info:', environment);

    // Try to initialize the GoHighLevel class
    let integration = {
      classInitialized: false
    };

    try {
      if (environment.apiKeyPresent && environment.locationIdPresent) {
        const gohighlevel = new SiteOptzGoHighLevel(
          process.env.GOHIGHLEVEL_API_KEY,
          process.env.GOHIGHLEVEL_LOCATION_ID
        );
        integration.classInitialized = true;
        console.log('✅ GoHighLevel class initialized successfully');
        
        // Test with minimal data
        try {
          const testData = {
            email: 'api-test@siteoptz.com',
            firstName: 'API',
            lastName: 'Test',
            source: 'production-test-endpoint',
            aiToolsInterest: 'testing',
            businessSize: 'small'
          };
          
          console.log('🧪 Testing addFreeTrialSubscriber...');
          const result = await gohighlevel.addFreeTrialSubscriber(testData);
          integration.testResult = {
            success: result.success,
            contactId: result.contact?.id,
            error: result.success ? null : 'Integration failed'
          };
          console.log('🧪 Test result:', integration.testResult);
        } catch (testError) {
          console.error('❌ Integration test failed:', testError);
          integration.testResult = {
            success: false,
            error: testError.message
          };
        }
      } else {
        console.log('❌ Cannot initialize GoHighLevel - missing credentials');
        integration.testResult = {
          success: false,
          error: 'Missing API credentials'
        };
      }
    } catch (initError) {
      console.error('❌ GoHighLevel class initialization failed:', initError);
      integration.testResult = {
        success: false,
        error: initError.message
      };
    }

    // Return comprehensive test results
    res.status(200).json({
      success: true,
      environment,
      integration
    });

  } catch (error) {
    console.error('❌ Test API error:', error);
    
    res.status(500).json({
      success: false,
      environment: {
        nodeEnv: process.env.NODE_ENV || 'unknown',
        timestamp: new Date().toISOString(),
        apiKeyPresent: !!process.env.GOHIGHLEVEL_API_KEY,
        apiKeyLength: process.env.GOHIGHLEVEL_API_KEY ? process.env.GOHIGHLEVEL_API_KEY.length : 0,
        locationIdPresent: !!process.env.GOHIGHLEVEL_LOCATION_ID,
        locationId: process.env.GOHIGHLEVEL_LOCATION_ID || null,
        enableGhlPresent: !!process.env.ENABLE_GHL,
        enableGhlValue: process.env.ENABLE_GHL || null
      },
      error: error.message
    });
  }
}

// Configuration for the API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};