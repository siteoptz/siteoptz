/**
 * GoHighLevel Configuration Validator
 * 
 * This script helps validate your GoHighLevel API configuration
 * and pipeline IDs to ensure trial users are properly added to pipelines.
 */

require('dotenv').config();

const requiredEnvVars = {
  // Basic GHL Config
  'GHL_API_KEY': 'GoHighLevel API Key',
  'GHL_LOCATION_ID': 'GoHighLevel Location ID',
  
  // Pipeline IDs
  'GHL_FREE_TRIAL_PIPELINE_ID': 'Free Trial Pipeline ID',
  'GHL_FREE_TRIAL_STAGE_ID': 'Free Trial Stage ID',
  'GHL_STARTER_TRIAL_PIPELINE_ID': 'Starter Trial Pipeline ID (optional)',
  'GHL_STARTER_TRIAL_STAGE_ID': 'Starter Trial Stage ID (optional)',
  'GHL_PRO_TRIAL_PIPELINE_ID': 'Pro Trial Pipeline ID (optional)',
  'GHL_PRO_TRIAL_STAGE_ID': 'Pro Trial Stage ID (optional)',
  
  // Workflow IDs (optional)
  'GHL_FREE_TRIAL_WORKFLOW_ID': 'Free Trial Workflow ID (optional)',
  'GHL_STARTER_TRIAL_WORKFLOW_ID': 'Starter Trial Workflow ID (optional)',
  'GHL_PRO_TRIAL_WORKFLOW_ID': 'Pro Trial Workflow ID (optional)',
  
  // OAuth Config
  'GOOGLE_CLIENT_ID': 'Google OAuth Client ID',
  'GOOGLE_CLIENT_SECRET': 'Google OAuth Client Secret',
  'NEXTAUTH_URL': 'NextAuth URL',
  'NEXTAUTH_SECRET': 'NextAuth Secret'
};

const requiredVars = [
  'GHL_API_KEY',
  'GHL_LOCATION_ID', 
  'GHL_FREE_TRIAL_PIPELINE_ID',
  'GHL_FREE_TRIAL_STAGE_ID',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET'
];

async function validateEnvironmentVariables() {
  console.log('🔍 Validating Environment Variables...\n');
  
  let hasErrors = false;
  
  // Check required variables
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (!value || value.trim() === '') {
      console.log(`❌ MISSING: ${varName} (${requiredEnvVars[varName]})`);
      hasErrors = true;
    } else {
      const maskedValue = varName.includes('SECRET') || varName.includes('KEY') 
        ? value.substring(0, 8) + '...' 
        : value;
      console.log(`✅ ${varName}: ${maskedValue}`);
    }
  });
  
  // Check optional variables
  console.log('\n🔍 Optional Variables:');
  Object.keys(requiredEnvVars).forEach(varName => {
    if (!requiredVars.includes(varName)) {
      const value = process.env[varName];
      if (value && value.trim() !== '') {
        console.log(`✅ ${varName}: ${value}`);
      } else {
        console.log(`⚠️  ${varName}: Not configured (${requiredEnvVars[varName]})`);
      }
    }
  });
  
  return !hasErrors;
}

async function testGHLConnection() {
  console.log('\n🔍 Testing GoHighLevel API Connection...\n');
  
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  
  if (!apiKey || !locationId) {
    console.log('❌ Cannot test connection - missing API key or location ID');
    return false;
  }
  
  try {
    // Test basic connection by fetching location info
    const response = await fetch(`https://services.leadconnectorhq.com/locations/${locationId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ GoHighLevel API Connection: SUCCESS');
      console.log(`📍 Location: ${data.location?.name || 'Unknown'}`);
      return true;
    } else {
      console.log('❌ GoHighLevel API Connection: FAILED');
      console.log(`   Status: ${response.status} ${response.statusText}`);
      const error = await response.text();
      console.log(`   Error: ${error}`);
      return false;
    }
  } catch (error) {
    console.log('❌ GoHighLevel API Connection: ERROR');
    console.log(`   ${error.message}`);
    return false;
  }
}

async function validatePipelines() {
  console.log('\n🔍 Validating Pipeline Configuration...\n');
  
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  const freePipelineId = process.env.GHL_FREE_TRIAL_PIPELINE_ID;
  const freeStageId = process.env.GHL_FREE_TRIAL_STAGE_ID;
  
  if (!apiKey || !locationId || !freePipelineId || !freeStageId) {
    console.log('❌ Cannot validate pipelines - missing configuration');
    return false;
  }
  
  try {
    // Test pipeline exists
    const response = await fetch(`https://services.leadconnectorhq.com/opportunities/pipelines/${freePipelineId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
        'Location-Id': locationId
      }
    });
    
    if (response.ok) {
      const pipeline = await response.json();
      console.log('✅ Free Trial Pipeline: FOUND');
      console.log(`   Pipeline: ${pipeline.pipeline?.name || 'Unknown'}`);
      
      // Check if stage exists in this pipeline
      const stages = pipeline.pipeline?.stages || [];
      const stage = stages.find(s => s.id === freeStageId);
      
      if (stage) {
        console.log('✅ Free Trial Stage: FOUND');
        console.log(`   Stage: ${stage.name}`);
        return true;
      } else {
        console.log('❌ Free Trial Stage: NOT FOUND');
        console.log(`   Available stages: ${stages.map(s => `${s.name} (${s.id})`).join(', ')}`);
        return false;
      }
    } else {
      console.log('❌ Free Trial Pipeline: NOT FOUND');
      console.log(`   Status: ${response.status} ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Pipeline Validation: ERROR');
    console.log(`   ${error.message}`);
    return false;
  }
}

async function createTestOpportunity() {
  console.log('\n🔍 Testing Opportunity Creation...\n');
  
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  const pipelineId = process.env.GHL_FREE_TRIAL_PIPELINE_ID;
  const stageId = process.env.GHL_FREE_TRIAL_STAGE_ID;
  
  if (!apiKey || !locationId || !pipelineId || !stageId) {
    console.log('❌ Cannot test opportunity creation - missing configuration');
    return false;
  }
  
  try {
    // First, create a test contact
    const contactResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Location-Id': locationId
      },
      body: JSON.stringify({
        email: `test-${Date.now()}@siteoptz-test.com`,
        name: 'Test User - Pipeline Validation',
        tags: ['test-contact', 'pipeline-validation']
      })
    });
    
    if (!contactResponse.ok) {
      console.log('❌ Failed to create test contact');
      return false;
    }
    
    const contact = await contactResponse.json();
    const contactId = contact.contact.id;
    console.log(`✅ Created test contact: ${contactId}`);
    
    // Now try to create opportunity
    const opportunityResponse = await fetch('https://services.leadconnectorhq.com/opportunities/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Location-Id': locationId
      },
      body: JSON.stringify({
        contactId: contactId,
        pipelineId: pipelineId,
        pipelineStageId: stageId,
        title: 'Test Free Trial - Pipeline Validation',
        monetaryValue: 0,
        source: 'Pipeline Validation Script'
      })
    });
    
    if (opportunityResponse.ok) {
      const opportunity = await opportunityResponse.json();
      console.log('✅ Test Opportunity Creation: SUCCESS');
      console.log(`   Opportunity ID: ${opportunity.opportunity?.id}`);
      
      // Clean up - delete test contact
      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Version': '2021-07-28',
          'Location-Id': locationId
        }
      });
      console.log('✅ Cleaned up test contact');
      
      return true;
    } else {
      console.log('❌ Test Opportunity Creation: FAILED');
      const error = await opportunityResponse.text();
      console.log(`   Error: ${error}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Opportunity Creation Test: ERROR');
    console.log(`   ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 GoHighLevel Configuration Validator\n');
  console.log('=' .repeat(50));
  
  const envValid = await validateEnvironmentVariables();
  
  if (!envValid) {
    console.log('\n❌ Environment variables validation failed!');
    console.log('Please configure the missing variables in your Vercel dashboard.');
    process.exit(1);
  }
  
  const connectionValid = await testGHLConnection();
  if (!connectionValid) {
    console.log('\n❌ GoHighLevel API connection failed!');
    process.exit(1);
  }
  
  const pipelinesValid = await validatePipelines();
  if (!pipelinesValid) {
    console.log('\n❌ Pipeline validation failed!');
    process.exit(1);
  }
  
  const opportunityTest = await createTestOpportunity();
  if (!opportunityTest) {
    console.log('\n❌ Opportunity creation test failed!');
    process.exit(1);
  }
  
  console.log('\n🎉 All validations passed!');
  console.log('Your GoHighLevel configuration is working correctly.');
  console.log('Trial users should now be added to the Free Trial pipeline.');
}

if (require.main === module) {
  main().catch(console.error);
}