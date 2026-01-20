import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface GHLContact {
  id: string;
  email: string;
  name?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

interface TrialSignupData {
  email: string;
  name: string;
  trialType: 'free' | 'starter' | 'pro' | '7-day';
  source: 'website' | 'google-oauth' | 'direct';
  userAgent?: string;
  referrer?: string;
}

// GoHighLevel API helper functions
async function createGHLContact(contactData: TrialSignupData): Promise<GHLContact | null> {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.log('GHL credentials not configured');
      return null;
    }

    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Location-Id': process.env.GHL_LOCATION_ID
      },
      body: JSON.stringify({
        email: contactData.email,
        name: contactData.name,
        tags: [
          `siteoptz-trial-${contactData.trialType}`,
          `source-${contactData.source}`,
          'trial-user'
        ],
        source: contactData.source,
        customFields: {
          'trial_type': contactData.trialType,
          'signup_source': contactData.source,
          'user_agent': contactData.userAgent || '',
          'referrer': contactData.referrer || '',
          'signup_date': new Date().toISOString()
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('GHL contact creation failed:', error);
      return null;
    }

    const data = await response.json();
    console.log('✅ Created GHL contact for trial:', contactData.email, 'Type:', contactData.trialType);
    return data.contact;
  } catch (error) {
    console.error('GHL contact creation error:', error);
    return null;
  }
}

async function addContactToPipeline(contactId: string, trialType: string): Promise<boolean> {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.log('GHL credentials not configured');
      return false;
    }

    // Different pipeline stages based on trial type
    const pipelineConfig = {
      'free': {
        pipelineId: process.env.GHL_FREE_TRIAL_PIPELINE_ID || 'default-free-pipeline',
        stageId: process.env.GHL_FREE_TRIAL_STAGE_ID || 'new-free-user'
      },
      'starter': {
        pipelineId: process.env.GHL_STARTER_TRIAL_PIPELINE_ID || 'default-starter-pipeline',
        stageId: process.env.GHL_STARTER_TRIAL_STAGE_ID || 'new-starter-trial'
      },
      'pro': {
        pipelineId: process.env.GHL_PRO_TRIAL_PIPELINE_ID || 'default-pro-pipeline',
        stageId: process.env.GHL_PRO_TRIAL_STAGE_ID || 'new-pro-trial'
      },
      '7-day': {
        pipelineId: process.env.GHL_7DAY_TRIAL_PIPELINE_ID || 'default-7day-pipeline',
        stageId: process.env.GHL_7DAY_TRIAL_STAGE_ID || 'new-7day-trial'
      }
    };

    const config = pipelineConfig[trialType as keyof typeof pipelineConfig];
    
    const response = await fetch('https://services.leadconnectorhq.com/opportunities/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Location-Id': process.env.GHL_LOCATION_ID
      },
      body: JSON.stringify({
        contactId: contactId,
        pipelineId: config.pipelineId,
        pipelineStageId: config.stageId,
        title: `SiteOptz ${trialType.toUpperCase()} Trial - ${new Date().toLocaleDateString()}`,
        monetaryValue: trialType === 'free' ? 0 : trialType === 'starter' ? 59 : 199,
        assignedTo: process.env.GHL_DEFAULT_ASSIGNEE_ID || '',
        source: 'Website Trial Signup'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('GHL pipeline addition failed:', error);
      return false;
    }

    const opportunity = await response.json();
    console.log('✅ Added contact to pipeline:', contactId, 'Pipeline:', config.pipelineId);
    return true;
  } catch (error) {
    console.error('GHL pipeline addition error:', error);
    return false;
  }
}

async function sendTrialWelcomeWorkflow(contactId: string, trialType: string): Promise<boolean> {
  try {
    if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
      console.log('GHL credentials not configured');
      return false;
    }

    // Different workflow triggers based on trial type
    const workflowConfig = {
      'free': process.env.GHL_FREE_TRIAL_WORKFLOW_ID || 'default-free-workflow',
      'starter': process.env.GHL_STARTER_TRIAL_WORKFLOW_ID || 'default-starter-workflow',  
      'pro': process.env.GHL_PRO_TRIAL_WORKFLOW_ID || 'default-pro-workflow',
      '7-day': process.env.GHL_7DAY_TRIAL_WORKFLOW_ID || 'default-7day-workflow'
    };

    const workflowId = workflowConfig[trialType as keyof typeof workflowConfig];

    const response = await fetch(`https://services.leadconnectorhq.com/workflows/${workflowId}/contact/${contactId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Location-Id': process.env.GHL_LOCATION_ID
      }
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('GHL workflow trigger failed:', error);
      return false;
    }

    console.log('✅ Triggered welcome workflow:', workflowId, 'for contact:', contactId);
    return true;
  } catch (error) {
    console.error('GHL workflow trigger error:', error);
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get session to verify user is authenticated
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized - user must be signed in' });
    }

    // Extract trial signup data from request
    const { trialType = 'free', source = 'website' }: {
      trialType?: 'free' | 'starter' | 'pro' | '7-day';
      source?: 'website' | 'google-oauth' | 'direct';
    } = req.body;

    // Get user info from session
    const email = session.user.email;
    const name = session.user.name || 'User';

    // Extract additional data from request headers
    const userAgent = req.headers['user-agent'] || '';
    const referer = req.headers.referer || req.headers.referrer;
    const referrer = Array.isArray(referer) ? referer[0] : (referer || '');

    const trialData: TrialSignupData = {
      email,
      name,
      trialType,
      source,
      userAgent,
      referrer
    };

    console.log('🔥 Processing trial signup:', email, 'Type:', trialType);

    // Step 1: Create or update contact in GoHighLevel
    const contact = await createGHLContact(trialData);
    
    if (!contact) {
      console.error('❌ Failed to create GHL contact');
      return res.status(500).json({ 
        error: 'Failed to create contact', 
        success: false 
      });
    }

    // Step 2: Add contact to appropriate pipeline
    const pipelineSuccess = await addContactToPipeline(contact.id, trialType);
    
    // Step 3: Trigger welcome workflow
    const workflowSuccess = await sendTrialWelcomeWorkflow(contact.id, trialType);

    // Track analytics event
    const analyticsData = {
      email: email,
      trial_type: trialType,
      source: source,
      ghl_contact_id: contact.id,
      pipeline_added: pipelineSuccess,
      workflow_triggered: workflowSuccess,
      timestamp: new Date().toISOString()
    };

    console.log('📊 Trial signup analytics:', analyticsData);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Trial signup processed successfully',
      data: {
        contactId: contact.id,
        trialType: trialType,
        pipelineAdded: pipelineSuccess,
        workflowTriggered: workflowSuccess
      }
    });

  } catch (error) {
    console.error('❌ Trial signup API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      success: false 
    });
  }
}