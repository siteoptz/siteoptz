import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Test the OAuth flow configuration without actually triggering OAuth
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check NextAuth configuration
    const nextAuthConfig = {
      nextauth_url: process.env.NEXTAUTH_URL,
      nextauth_secret_exists: !!process.env.NEXTAUTH_SECRET,
      google_client_id_exists: !!process.env.GOOGLE_CLIENT_ID,
      google_client_secret_exists: !!process.env.GOOGLE_CLIENT_SECRET,
    };

    // Check if required environment variables are properly set
    const oauth_ready = !!(
      process.env.GOOGLE_CLIENT_ID && 
      process.env.GOOGLE_CLIENT_SECRET && 
      process.env.NEXTAUTH_URL && 
      process.env.NEXTAUTH_SECRET &&
      !process.env.GOOGLE_CLIENT_ID.includes('your-') &&
      !process.env.GOOGLE_CLIENT_SECRET.includes('your-')
    );

    // Test GHL API connection (without creating a contact)
    let ghl_status = 'not_configured';
    if (process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID) {
      try {
        // Test GHL API by checking a simple endpoint
        const response = await fetch(
          `https://services.leadconnectorhq.com/contacts/search/duplicate?email=test@example.com`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
              'Version': '2021-07-28',
              'Location-Id': process.env.GHL_LOCATION_ID
            }
          }
        );
        
        if (response.ok) {
          ghl_status = 'connected';
        } else if (response.status === 401) {
          ghl_status = 'unauthorized';
        } else if (response.status === 403) {
          ghl_status = 'forbidden';
        } else {
          ghl_status = 'error';
        }
      } catch (error) {
        ghl_status = 'connection_failed';
      }
    }

    const diagnostics = {
      timestamp: new Date().toISOString(),
      oauth_ready,
      nextauth_config,
      ghl_status,
      oauth_urls: {
        signin: `${process.env.NEXTAUTH_URL}/api/auth/signin/google`,
        callback: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
      },
      potential_issues: []
    };

    // Add potential issues
    if (!oauth_ready) {
      diagnostics.potential_issues.push('OAuth environment variables not properly configured');
    }
    
    if (ghl_status === 'unauthorized' || ghl_status === 'forbidden') {
      diagnostics.potential_issues.push('GHL API credentials have insufficient permissions');
    }

    if (ghl_status === 'connection_failed') {
      diagnostics.potential_issues.push('GHL API connection failed - may cause OAuth signin to fail');
    }

    res.status(200).json(diagnostics);
    
  } catch (error) {
    console.error('OAuth flow test error:', error);
    res.status(500).json({ 
      error: 'Test failed', 
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}