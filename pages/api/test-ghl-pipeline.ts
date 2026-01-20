import { NextApiRequest, NextApiResponse } from 'next';

// Test endpoint to validate GoHighLevel pipeline configuration
// Access this at: /api/test-ghl-pipeline

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('🔧 Testing GoHighLevel Pipeline Configuration...');

  // Check environment variables
  const envCheck = {
    hasApiKey: !!process.env.GHL_API_KEY,
    hasLocationId: !!process.env.GHL_LOCATION_ID,
    hasPipelineId: !!process.env.GHL_FREE_TRIAL_PIPELINE_ID,
    hasStageId: !!process.env.GHL_FREE_TRIAL_STAGE_ID,
  };

  console.log('🔧 Environment Variables Check:', envCheck);

  if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
    console.error('❌ Missing GHL credentials');
    return res.status(500).json({ 
      error: 'Missing GHL credentials',
      envCheck
    });
  }

  if (!process.env.GHL_FREE_TRIAL_PIPELINE_ID || !process.env.GHL_FREE_TRIAL_STAGE_ID) {
    console.error('❌ Missing pipeline configuration');
    return res.status(500).json({ 
      error: 'Missing pipeline configuration',
      envCheck,
      pipelineId: process.env.GHL_FREE_TRIAL_PIPELINE_ID || 'MISSING',
      stageId: process.env.GHL_FREE_TRIAL_STAGE_ID || 'MISSING'
    });
  }

  try {
    // Test 1: Validate API connection
    console.log('🔧 Testing GHL API connection...');
    const locationResponse = await fetch(`https://services.leadconnectorhq.com/locations/${process.env.GHL_LOCATION_ID}`, {
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28'
      }
    });

    if (!locationResponse.ok) {
      console.error('❌ GHL API connection failed:', locationResponse.status);
      const error = await locationResponse.text();
      return res.status(500).json({
        error: 'GHL API connection failed',
        status: locationResponse.status,
        details: error
      });
    }

    const locationData = await locationResponse.json();
    console.log('✅ GHL API connection successful');

    // Test 2: Validate pipeline exists
    console.log('🔧 Testing pipeline configuration...');
    const pipelineResponse = await fetch(`https://services.leadconnectorhq.com/opportunities/pipelines/${process.env.GHL_FREE_TRIAL_PIPELINE_ID}`, {
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Location-Id': process.env.GHL_LOCATION_ID
      }
    });

    if (!pipelineResponse.ok) {
      console.error('❌ Pipeline validation failed:', pipelineResponse.status);
      const error = await pipelineResponse.text();
      return res.status(500).json({
        error: 'Pipeline not found',
        pipelineId: process.env.GHL_FREE_TRIAL_PIPELINE_ID,
        status: pipelineResponse.status,
        details: error
      });
    }

    const pipelineData = await pipelineResponse.json();
    console.log('✅ Pipeline found:', pipelineData.pipeline?.name);

    // Check if stage exists
    const stages = pipelineData.pipeline?.stages || [];
    const targetStage = stages.find((s: any) => s.id === process.env.GHL_FREE_TRIAL_STAGE_ID);

    if (!targetStage) {
      console.error('❌ Stage not found in pipeline');
      return res.status(500).json({
        error: 'Stage not found',
        stageId: process.env.GHL_FREE_TRIAL_STAGE_ID,
        availableStages: stages.map((s: any) => ({ id: s.id, name: s.name }))
      });
    }

    console.log('✅ Stage found:', targetStage.name);

    // Test 3: Create a test contact (we'll delete it immediately)
    console.log('🔧 Testing contact creation...');
    const testEmail = `test-${Date.now()}@siteoptz-pipeline-test.com`;
    
    const contactResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Location-Id': process.env.GHL_LOCATION_ID
      },
      body: JSON.stringify({
        email: testEmail,
        name: 'Pipeline Test Contact',
        tags: ['pipeline-test']
      })
    });

    if (!contactResponse.ok) {
      console.error('❌ Contact creation failed:', contactResponse.status);
      const error = await contactResponse.text();
      return res.status(500).json({
        error: 'Contact creation failed',
        status: contactResponse.status,
        details: error
      });
    }

    const contactData = await contactResponse.json();
    const testContactId = contactData.contact.id;
    console.log('✅ Test contact created:', testContactId);

    // Test 4: Create opportunity in pipeline
    console.log('🔧 Testing opportunity creation...');
    const opportunityResponse = await fetch('https://services.leadconnectorhq.com/opportunities/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Location-Id': process.env.GHL_LOCATION_ID
      },
      body: JSON.stringify({
        contactId: testContactId,
        pipelineId: process.env.GHL_FREE_TRIAL_PIPELINE_ID,
        pipelineStageId: process.env.GHL_FREE_TRIAL_STAGE_ID,
        title: 'Pipeline Test Opportunity',
        monetaryValue: 0,
        source: 'Pipeline Configuration Test'
      })
    });

    let opportunityResult = null;
    if (opportunityResponse.ok) {
      opportunityResult = await opportunityResponse.json();
      console.log('✅ Opportunity created successfully:', opportunityResult.opportunity?.id);
    } else {
      console.error('❌ Opportunity creation failed:', opportunityResponse.status);
      const error = await opportunityResponse.text();
      // Don't fail the test here, still cleanup
      opportunityResult = { error: error, status: opportunityResponse.status };
    }

    // Cleanup: Delete test contact
    console.log('🔧 Cleaning up test contact...');
    await fetch(`https://services.leadconnectorhq.com/contacts/${testContactId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Location-Id': process.env.GHL_LOCATION_ID
      }
    });

    console.log('✅ Pipeline configuration test completed');

    return res.status(200).json({
      success: true,
      message: 'GoHighLevel pipeline configuration is working correctly',
      tests: {
        apiConnection: true,
        pipelineExists: true,
        stageExists: true,
        contactCreation: true,
        opportunityCreation: !opportunityResult.error
      },
      config: {
        locationName: locationData.location?.name,
        pipelineName: pipelineData.pipeline?.name,
        stageName: targetStage.name,
        pipelineId: process.env.GHL_FREE_TRIAL_PIPELINE_ID,
        stageId: process.env.GHL_FREE_TRIAL_STAGE_ID
      },
      opportunityTest: opportunityResult
    });

  } catch (error) {
    console.error('❌ Pipeline configuration test failed:', error);
    return res.status(500).json({
      error: 'Pipeline configuration test failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}