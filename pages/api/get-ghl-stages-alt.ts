import { NextApiRequest, NextApiResponse } from 'next';

// Alternative method to get pipeline stages using different API endpoints
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('🔧 Fetching Pipeline Stages via Alternative API Methods...');

  if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
    return res.status(500).json({ 
      error: 'Missing GHL credentials'
    });
  }

  const results: any = {};

  try {
    // Method 1: Try to get all pipelines first
    console.log('🔧 Method 1: Fetching all pipelines...');
    
    const pipelinesResponse = await fetch(`https://services.leadconnectorhq.com/opportunities/pipelines`, {
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Location-Id': process.env.GHL_LOCATION_ID
      }
    });

    if (pipelinesResponse.ok) {
      const pipelinesData = await pipelinesResponse.json();
      console.log('✅ Successfully fetched all pipelines');
      
      results.method1_success = true;
      results.all_pipelines = pipelinesData.pipelines?.map((pipeline: any) => ({
        id: pipeline.id,
        name: pipeline.name,
        stages: pipeline.stages?.map((stage: any) => ({
          id: stage.id,
          name: stage.name,
          position: stage.position
        })) || []
      })) || [];

      // Find our specific pipelines
      const freePipeline = pipelinesData.pipelines?.find((p: any) => p.id === process.env.GHL_FREE_TRIAL_PIPELINE_ID);
      const starterPipeline = pipelinesData.pipelines?.find((p: any) => p.id === process.env.GHL_STARTER_TRIAL_PIPELINE_ID);

      results.target_pipelines = {
        free_trial: freePipeline ? {
          id: freePipeline.id,
          name: freePipeline.name,
          stages: freePipeline.stages?.map((stage: any) => ({
            id: stage.id,
            name: stage.name,
            position: stage.position
          })) || []
        } : { error: 'Free Trial pipeline not found in response' },
        
        starter_trial: starterPipeline ? {
          id: starterPipeline.id,
          name: starterPipeline.name,
          stages: starterPipeline.stages?.map((stage: any) => ({
            id: stage.id,
            name: stage.name,
            position: stage.position
          })) || []
        } : { error: 'Starter Trial pipeline not found in response' }
      };

    } else {
      const error1 = await pipelinesResponse.text();
      console.error('❌ Method 1 failed:', pipelinesResponse.status, error1);
      results.method1_error = {
        status: pipelinesResponse.status,
        error: error1
      };

      // Method 2: Try opportunities search to get pipeline info
      console.log('🔧 Method 2: Fetching via opportunities search...');
      
      const opportunitiesResponse = await fetch(`https://services.leadconnectorhq.com/opportunities/search?pipelineId=${process.env.GHL_FREE_TRIAL_PIPELINE_ID}&limit=1`, {
        headers: {
          'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
          'Version': '2021-07-28',
          'Location-Id': process.env.GHL_LOCATION_ID
        }
      });

      if (opportunitiesResponse.ok) {
        const oppData = await opportunitiesResponse.json();
        console.log('✅ Method 2: Got opportunities data');
        results.method2_success = true;
        results.opportunities_sample = oppData;
      } else {
        const error2 = await opportunitiesResponse.text();
        console.error('❌ Method 2 failed:', opportunitiesResponse.status, error2);
        results.method2_error = {
          status: opportunitiesResponse.status,
          error: error2
        };
      }

      // Method 3: Try creating a test opportunity to trigger pipeline validation
      console.log('🔧 Method 3: Testing pipeline access via opportunity creation...');
      
      try {
        // First create a test contact
        const testContact = await fetch('https://services.leadconnectorhq.com/contacts/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json',
            'Location-Id': process.env.GHL_LOCATION_ID
          },
          body: JSON.stringify({
            email: `test-stage-discovery-${Date.now()}@siteoptz.com`,
            name: 'Stage Discovery Test',
            tags: ['stage-discovery-test']
          })
        });

        if (testContact.ok) {
          const contactData = await testContact.json();
          results.test_contact_created = contactData.contact.id;
          
          // Try to create opportunity with a dummy stage ID to get validation error
          const testOpp = await fetch('https://services.leadconnectorhq.com/opportunities/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
              'Version': '2021-07-28',
              'Content-Type': 'application/json',
              'Location-Id': process.env.GHL_LOCATION_ID
            },
            body: JSON.stringify({
              contactId: contactData.contact.id,
              pipelineId: process.env.GHL_FREE_TRIAL_PIPELINE_ID,
              pipelineStageId: 'invalid-stage-id-to-trigger-error',
              title: 'Stage Discovery Test',
              monetaryValue: 0
            })
          });

          const oppResult = await testOpp.text();
          results.method3_opportunity_test = {
            status: testOpp.status,
            response: oppResult,
            note: 'This error response might contain valid stage IDs'
          };

          // Cleanup test contact
          await fetch(`https://services.leadconnectorhq.com/contacts/${contactData.contact.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
              'Version': '2021-07-28',
              'Location-Id': process.env.GHL_LOCATION_ID
            }
          });
          
        } else {
          results.method3_contact_error = await testContact.text();
        }
      } catch (error) {
        results.method3_error = error instanceof Error ? error.message : 'Unknown error';
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Alternative pipeline stage discovery completed',
      target_pipeline_ids: {
        free_trial: process.env.GHL_FREE_TRIAL_PIPELINE_ID,
        starter_trial: process.env.GHL_STARTER_TRIAL_PIPELINE_ID
      },
      results: results,
      instructions: {
        message: 'Check the results above for pipeline stage information',
        next_steps: [
          'If method1_success: true, look in target_pipelines for stage IDs',
          'If methods failed, you may need to update API token permissions',
          'Alternatively, get stage IDs manually from GoHighLevel dashboard'
        ]
      }
    });

  } catch (error) {
    console.error('❌ Error in stage discovery:', error);
    return res.status(500).json({
      error: 'Stage discovery failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      partial_results: results
    });
  }
}