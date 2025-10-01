// Deployment Verification Script
// This script verifies that the Marketing ROI tool is properly deployed

const https = require('https');

async function verifyDeployment() {
  console.log('🚀 Verifying Marketing ROI Tool Deployment...\n');
  
  try {
    // Check if the pro dashboard is accessible
    console.log('1. Checking Pro Dashboard accessibility...');
    const response = await fetch('https://siteoptz.ai/dashboard/pro');
    
    if (response.ok) {
      console.log('✅ Pro Dashboard is accessible');
      
      // Check if the new tabs are present in the HTML
      const html = await response.text();
      
      if (html.includes('roi-dashboard')) {
        console.log('✅ ROI Dashboard tab found');
      } else {
        console.log('❌ ROI Dashboard tab not found');
      }
      
      if (html.includes('platforms')) {
        console.log('✅ Platforms tab found');
      } else {
        console.log('❌ Platforms tab not found');
      }
      
      if (html.includes('ai-insights')) {
        console.log('✅ AI Insights tab found');
      } else {
        console.log('❌ AI Insights tab not found');
      }
      
    } else {
      console.log('❌ Pro Dashboard not accessible:', response.status);
    }
    
    console.log('\n🎉 Deployment verification complete!');
    console.log('\n📋 Next Steps:');
    console.log('1. Visit https://siteoptz.ai/dashboard/pro');
    console.log('2. Look for the new tabs: ROI Dashboard, Platforms, AI Insights');
    console.log('3. Click on each tab to test the functionality');
    console.log('4. Try connecting platforms in the Platforms tab');
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

// Run verification
verifyDeployment();
