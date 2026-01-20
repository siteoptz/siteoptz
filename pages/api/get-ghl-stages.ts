import { NextApiRequest, NextApiResponse } from 'next';

// Helper endpoint to get pipeline stages from GoHighLevel
// Access this at: /api/get-ghl-stages

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('🔧 Fetching GoHighLevel Pipeline Stages...');

  if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
    return res.status(500).json({ 
      error: 'Missing GHL credentials',
      hasApiKey: !!process.env.GHL_API_KEY,
      hasLocationId: !!process.env.GHL_LOCATION_ID
    });
  }

  try {
    const pipelines = {
      'Free Trial Pipeline': process.env.GHL_FREE_TRIAL_PIPELINE_ID,
      'Starter Trial Pipeline': process.env.GHL_STARTER_TRIAL_PIPELINE_ID,
      'Pro Trial Pipeline': process.env.GHL_PRO_TRIAL_PIPELINE_ID,
      '7-Day Trial Pipeline': process.env.GHL_7DAY_TRIAL_PIPELINE_ID
    };

    const results: any = {};

    for (const [name, pipelineId] of Object.entries(pipelines)) {
      if (!pipelineId) {
        results[name] = { error: 'Pipeline ID not configured' };
        continue;
      }

      console.log(`🔧 Fetching stages for ${name} (${pipelineId})...`);

      const response = await fetch(`https://services.leadconnectorhq.com/opportunities/pipelines/${pipelineId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
          'Version': '2021-07-28',
          'Location-Id': process.env.GHL_LOCATION_ID
        }
      });

      if (!response.ok) {
        const error = await response.text();
        console.error(`❌ Failed to fetch ${name}:`, response.status, error);
        results[name] = { 
          error: `Failed to fetch pipeline (${response.status})`,
          details: error,
          pipelineId
        };
        continue;
      }

      const data = await response.json();
      const pipeline = data.pipeline;
      
      if (!pipeline) {
        results[name] = { error: 'Pipeline not found in response', pipelineId };
        continue;
      }

      results[name] = {
        pipelineId: pipelineId,
        pipelineName: pipeline.name,
        stages: pipeline.stages?.map((stage: any) => ({
          id: stage.id,
          name: stage.name,
          position: stage.position
        })) || []
      };

      console.log(`✅ Found ${pipeline.stages?.length || 0} stages for ${name}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Pipeline stages fetched successfully',
      pipelines: results,
      instructions: {
        message: 'Copy the stage IDs below to your Vercel environment variables',
        envVars: {
          'GHL_FREE_TRIAL_STAGE_ID': 'Copy the ID of the stage where you want FREE trial users to start',
          'GHL_STARTER_TRIAL_STAGE_ID': 'Copy the ID of the stage where you want STARTER trial users to start', 
          'GHL_PRO_TRIAL_STAGE_ID': 'Copy the ID of the stage where you want PRO trial users to start',
          'GHL_7DAY_TRIAL_STAGE_ID': 'Copy the ID of the stage where you want 7-DAY trial users to start'
        }
      }
    });

  } catch (error) {
    console.error('❌ Error fetching pipeline stages:', error);
    return res.status(500).json({
      error: 'Failed to fetch pipeline stages',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}