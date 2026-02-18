// Debug endpoint to test OAuth integration flow
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, action } = req.query;
  
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email parameter required' });
  }

  try {
    let result = {};
    
    if (action === 'store' || !action) {
      // Test storing qualifying data
      console.log('🔧 Testing data storage...');
      const storeResponse = await fetch('http://localhost:3000/api/qualifying-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: 'Debug Test User',
          phone: '+1234567890',
          business: 'Debug Test Clinic',
          bottlenecks: 'Lead Generation and Qualification',
          currentAIUsage: 'Experimenting personally with AI tools',
          priorityOutcome: 'More qualified leads'
        })
      });
      
      if (storeResponse.ok) {
        const storeData = await storeResponse.json();
        result = { ...result, store: { success: true, key: storeData.key } };
      } else {
        result = { ...result, store: { success: false, error: await storeResponse.text() } };
      }
    }
    
    if (action === 'retrieve' || !action) {
      // Test retrieving qualifying data
      console.log('🔍 Testing data retrieval...');
      const retrieveResponse = await fetch(`http://localhost:3000/api/qualifying-data?email=${encodeURIComponent(email)}`);
      
      if (retrieveResponse.ok) {
        const retrieveData = await retrieveResponse.json();
        result = { ...result, retrieve: { success: true, found: !!retrieveData.data, data: retrieveData.data } };
      } else {
        result = { ...result, retrieve: { success: false, error: await retrieveResponse.text() } };
      }
    }
    
    // Test GHL environment
    result = { 
      ...result, 
      environment: {
        hasGHLApiKey: !!process.env.GHL_API_KEY,
        hasGHLLocationId: !!process.env.GHL_LOCATION_ID,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        nodeEnv: process.env.NODE_ENV
      }
    };

    res.status(200).json({
      email,
      timestamp: new Date().toISOString(),
      tests: result,
      instructions: {
        store: 'Use ?action=store to test data storage',
        retrieve: 'Use ?action=retrieve to test data retrieval', 
        both: 'Use no action parameter to test both'
      }
    });
    
  } catch (error) {
    console.error('❌ Debug error:', error);
    res.status(500).json({ 
      error: 'Debug test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Usage examples:
// GET /api/debug-oauth-integration?email=debug@test.com
// GET /api/debug-oauth-integration?email=debug@test.com&action=store
// GET /api/debug-oauth-integration?email=debug@test.com&action=retrieve