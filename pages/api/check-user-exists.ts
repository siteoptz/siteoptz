import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    console.log('🔍 Checking if user exists in GHL:', email);

    const ghlApiKey = process.env.GHL_API_KEY;
    const ghlLocationId = process.env.GHL_LOCATION_ID;
    
    if (!ghlApiKey || !ghlLocationId) {
      console.log('⚠️ GHL credentials not configured - allowing signup');
      return res.status(200).json({
        exists: false,
        message: 'GHL not configured, allowing signup'
      });
    }

    // Search for existing contact in GHL
    const ghlResponse = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${ghlLocationId}&email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${ghlApiKey}`,
          'Version': '2021-07-28'
        }
      }
    );

    if (!ghlResponse.ok) {
      const errorText = await ghlResponse.text();
      console.error('❌ GHL search failed:', {
        status: ghlResponse.status,
        statusText: ghlResponse.statusText,
        error: errorText
      });
      
      // If GHL API fails, allow signup to proceed
      return res.status(200).json({
        exists: false,
        message: 'GHL check failed, allowing signup'
      });
    }

    const data = await ghlResponse.json();
    
    if (data.contact) {
      console.log('✅ Found existing GHL contact:', email);
      return res.status(200).json({
        exists: true,
        contact: {
          id: data.contact.id,
          email: data.contact.email,
          name: data.contact.name || 'User'
        },
        message: 'User already exists in our system'
      });
    }

    console.log('ℹ️ No existing GHL contact found for:', email);
    return res.status(200).json({
      exists: false,
      message: 'User does not exist, can proceed with signup'
    });

  } catch (error) {
    console.error('❌ Error checking user existence:', error);
    // On error, allow signup to proceed
    return res.status(200).json({
      exists: false,
      message: 'Error checking user, allowing signup'
    });
  }
}