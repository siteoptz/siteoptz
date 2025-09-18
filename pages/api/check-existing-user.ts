import { NextApiRequest, NextApiResponse } from 'next';

interface ApiResponse {
  success: boolean;
  exists: boolean;
  contactId?: string;
  userDetails?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      exists: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { email } = req.query;
    
    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        exists: false,
        error: 'Email is required'
      });
    }

    console.log('🔍 Checking if user exists for OAuth pre-validation:', email);

    // Check if GoHighLevel integration is enabled and properly configured
    const isGHLEnabled = process.env.ENABLE_GHL === 'true';
    const hasAPIKey = process.env.GOHIGHLEVEL_API_KEY;
    const hasLocationId = process.env.GOHIGHLEVEL_LOCATION_ID;
    
    if (!isGHLEnabled || !hasAPIKey || !hasLocationId) {
      console.log('⚠️ GoHighLevel integration disabled or not configured - returning no existing user');
      console.log('- ENABLE_GHL:', isGHLEnabled);
      console.log('- Has API Key:', !!hasAPIKey);
      console.log('- Has Location ID:', !!hasLocationId);
      return res.status(200).json({
        success: true,
        exists: false
      });
    }

    // Search for existing contact
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };
    
    if (process.env.GOHIGHLEVEL_LOCATION_ID) {
      headers['Location-Id'] = process.env.GOHIGHLEVEL_LOCATION_ID;
    }
    
    const searchResponse = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers
      }
    );

    if (searchResponse.ok) {
      const searchResult = await searchResponse.json();
      console.log('📊 GoHighLevel search result:', JSON.stringify(searchResult, null, 2));
      
      if (searchResult.contact && searchResult.contact.id) {
        console.log('✅ Existing user found in GoHighLevel:', searchResult.contact.id);
        return res.status(200).json({
          success: true,
          exists: true,
          contactId: searchResult.contact.id,
          userDetails: {
            name: searchResult.contact.name || searchResult.contact.firstName || 'User',
            email: searchResult.contact.email,
            id: searchResult.contact.id
          }
        });
      } else {
        console.log('ℹ️ No existing user found for:', email);
        return res.status(200).json({
          success: true,
          exists: false
        });
      }
    } else {
      const error = await searchResponse.text();
      console.error('❌ Failed to search for existing user. Status:', searchResponse.status);
      console.error('❌ Error response:', error);
      return res.status(500).json({
        success: false,
        exists: false,
        error: 'Failed to check existing user'
      });
    }
  } catch (error) {
    console.error('💥 Error checking existing user:', error);
    return res.status(500).json({
      success: false,
      exists: false,
      error: 'Internal server error'
    });
  }
}