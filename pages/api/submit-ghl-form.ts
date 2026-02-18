import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formId, name, email, phone, business, bottlenecks, currentAIUsage, priorityOutcome } = req.body;

    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.error('GHL credentials not configured');
      return res.status(500).json({ error: 'GHL credentials not configured' });
    }

    // Submit to GoHighLevel Contacts API
    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locationId: process.env.GHL_LOCATION_ID,
        email: email,
        name: name,
        phone: phone || '',
        tags: ['signup-form', 'discovery-application'],
        source: 'SiteOptz SignUp Form',
        customFields: [
          {
            id: 'business_name',
            field_value: business || ''
          },
          {
            id: 'bottlenecks',
            field_value: bottlenecks || ''
          },
          {
            id: 'ai_usage',
            field_value: currentAIUsage || ''
          },
          {
            id: 'priority_outcome',
            field_value: priorityOutcome || ''
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('GHL API error:', {
        status: response.status,
        statusText: response.statusText,
        error: error
      });
      return res.status(500).json({ 
        error: 'Failed to submit to GHL',
        details: error 
      });
    }

    const data = await response.json();
    console.log('Successfully submitted to GHL:', data);

    res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully to GHL',
      contact: data.contact 
    });

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}