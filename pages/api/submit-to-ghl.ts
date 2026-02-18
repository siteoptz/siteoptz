import { NextApiRequest, NextApiResponse } from 'next';

interface QualifyingData {
  email: string;
  name: string;
  phone?: string;
  business?: string;
  bottlenecks?: string;
  currentAIUsage?: string;
  priorityOutcome?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const qualifyingData: QualifyingData = req.body;
    
    console.log('🚀 Direct GHL submission for:', qualifyingData.email);
    
    // Validate required fields
    if (!qualifyingData.email || !qualifyingData.name) {
      return res.status(400).json({ 
        error: 'Missing required fields: email and name' 
      });
    }

    const ghlApiKey = process.env.GHL_API_KEY;
    const ghlLocationId = process.env.GHL_LOCATION_ID;
    
    if (!ghlApiKey || !ghlLocationId) {
      console.log('⚠️  GHL credentials missing - simulating submission');
      return res.status(200).json({
        success: true,
        message: 'GHL submission simulated (credentials not configured)',
        contact: {
          email: qualifyingData.email,
          name: qualifyingData.name,
          submitted_at: new Date().toISOString()
        }
      });
    }

    // Submit directly to GHL as a new contact
    const ghlResponse = await fetch(`https://rest.gohighlevel.com/v1/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ghlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: ghlLocationId,
        email: qualifyingData.email,
        name: qualifyingData.name,
        phone: qualifyingData.phone || '',
        customField: {
          'business_name': qualifyingData.business || '',
          'bottlenecks': qualifyingData.bottlenecks || '',
          'current_ai_usage': qualifyingData.currentAIUsage || '',
          'priority_outcome': qualifyingData.priorityOutcome || '',
          'lead_source': 'SiteOptz Qualifying Form',
          'submission_date': new Date().toISOString()
        },
        tags: ['SiteOptz Lead', 'Qualifying Form', 'AI Consultation']
      })
    });

    if (ghlResponse.ok) {
      const contact = await ghlResponse.json();
      console.log('✅ Successfully submitted to GHL:', contact.id);
      
      return res.status(200).json({
        success: true,
        message: 'Successfully submitted to GHL',
        contact: {
          id: contact.id,
          email: qualifyingData.email,
          name: qualifyingData.name
        }
      });
    } else {
      const errorText = await ghlResponse.text();
      console.error('❌ GHL submission failed:', errorText);
      
      return res.status(500).json({
        success: false,
        error: 'Failed to submit to GHL',
        details: errorText
      });
    }

  } catch (error) {
    console.error('❌ Error submitting to GHL:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}