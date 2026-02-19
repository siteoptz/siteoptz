import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, action } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  console.log('🔍 DEBUG: Testing form data flow for:', email);

  try {
    if (action === 'test_storage') {
      // Test storing form data
      const testFormData = {
        name: 'Test User',
        email: email,
        phone: '555-1234',
        business: 'Test Business',
        bottlenecks: 'Lead Generation and Qualification',
        currentAIUsage: 'Experimenting personally with AI tools',
        priorityOutcome: 'More qualified leads'
      };

      console.log('📦 Storing test form data...');
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
      const storeResponse = await fetch(`${baseUrl}/api/store-form-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testFormData)
      });

      const storeResult = await storeResponse.json();
      console.log('✅ Store result:', storeResult);

      return res.status(200).json({
        success: true,
        action: 'test_storage',
        storeResult: storeResult
      });
    }

    if (action === 'test_retrieval') {
      // Test retrieving form data
      console.log('🔍 Retrieving form data for:', email);
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
      const retrieveResponse = await fetch(`${baseUrl}/api/store-form-data?email=${encodeURIComponent(email)}`, {
        method: 'GET'
      });

      const retrieveResult = await retrieveResponse.json();
      console.log('📤 Retrieve result:', retrieveResult);

      return res.status(200).json({
        success: true,
        action: 'test_retrieval',
        retrieveResult: retrieveResult
      });
    }

    if (action === 'test_ghl_creation') {
      // Test GHL contact creation with form data
      console.log('🏗️ Testing GHL contact creation...');
      
      // First retrieve form data
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
      const retrieveResponse = await fetch(`${baseUrl}/api/store-form-data?email=${encodeURIComponent(email)}`, {
        method: 'GET'
      });

      let formData = null;
      if (retrieveResponse.ok) {
        const result = await retrieveResponse.json();
        if (result.success && result.data) {
          formData = result.data;
          console.log('✅ Retrieved form data for GHL test:', formData);
        }
      }

      // Test GHL contact creation directly
      const testGHLResult = await testCreateGHLContact(
        email,
        formData?.name || 'Test User',
        'free',
        true,
        formData
      );

      return res.status(200).json({
        success: true,
        action: 'test_ghl_creation',
        formData: formData,
        ghlResult: testGHLResult
      });
    }

    return res.status(400).json({ error: 'Invalid action' });

  } catch (error) {
    console.error('❌ Debug flow error:', error);
    return res.status(500).json({ 
      error: 'Debug flow failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Test version of createGHLContact function
async function testCreateGHLContact(email: string, name: string, plan: string = 'free', isTrialUser: boolean = false, qualifyingData?: any) {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.log('GHL credentials not configured - skipping contact creation');
      return { error: 'GHL credentials not configured' };
    }

    console.log('🔧 Testing GHL contact creation with data:', {
      email,
      name,
      plan,
      isTrialUser,
      hasQualifyingData: !!qualifyingData,
      qualifyingData
    });

    // Determine tags and source based on signup type
    const tags = isTrialUser 
      ? [`siteoptz-trial-${plan}`, 'trial-user', 'oauth-signup']
      : [`siteoptz-plan-${plan}`, 'oauth-signup'];

    // Add discovery-application tag if qualifying data exists
    if (qualifyingData) {
      tags.push('discovery-application', 'signup-form');
    }

    // Build custom fields from qualifying data
    const customFields: Array<{id: string, field_value: string}> = [];
    if (qualifyingData) {
      console.log('🔧 Building custom fields from qualifying data:', qualifyingData);
      
      const fieldMappings = [
        { key: 'business', value: qualifyingData.business, ids: ['clinic_website', 'business_website'] },
        { key: 'bottlenecks', value: qualifyingData.bottlenecks, ids: ['bottlenecks', 'business_bottlenecks'] },
        { key: 'currentAIUsage', value: qualifyingData.currentAIUsage, ids: ['ai_usage', 'current_ai_usage'] },
        { key: 'priorityOutcome', value: qualifyingData.priorityOutcome, ids: ['priority_outcome', 'automation_priority'] }
      ];
      
      fieldMappings.forEach(mapping => {
        if (mapping.value) {
          mapping.ids.forEach(id => {
            customFields.push({
              id: id,
              field_value: mapping.value
            });
          });
        }
      });
    }

    const contactData = {
      email,
      name,
      tags,
      source: 'Discovery Form + OAuth',
      customFields
    };

    console.log('📤 Sending to GHL:', JSON.stringify(contactData, null, 2));

    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Location-Id': process.env.GHL_LOCATION_ID
      },
      body: JSON.stringify(contactData)
    });

    const responseText = await response.text();
    console.log('📥 GHL response status:', response.status);
    console.log('📥 GHL response body:', responseText);

    if (!response.ok) {
      return {
        error: 'GHL API error',
        status: response.status,
        response: responseText
      };
    }

    const data = JSON.parse(responseText);
    console.log('✅ GHL contact created successfully:', data);
    return {
      success: true,
      contact: data.contact,
      sentData: contactData
    };

  } catch (error) {
    console.error('❌ Test GHL create contact error:', error);
    return {
      error: 'Exception occurred',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}