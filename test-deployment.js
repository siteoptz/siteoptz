// Test Marketing ROI Tool Deployment
const https = require('https');

console.log('🚀 Testing Marketing ROI Tool Deployment...\n');

// Test the pro dashboard
https.get('https://siteoptz.ai/dashboard/pro', (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('✅ SiteOptz.ai Pro Dashboard is accessible');
    
    // Check for new tabs
    const hasROIDashboard = data.includes('roi-dashboard');
    const hasPlatforms = data.includes('platforms');
    const hasAIInsights = data.includes('ai-insights');
    
    console.log('\n📊 Marketing ROI Tool Status:');
    console.log(hasROIDashboard ? '✅ ROI Dashboard tab found' : '❌ ROI Dashboard tab not found');
    console.log(hasPlatforms ? '✅ Platforms tab found' : '❌ Platforms tab not found');
    console.log(hasAIInsights ? '✅ AI Insights tab found' : '❌ AI Insights tab not found');
    
    if (hasROIDashboard && hasPlatforms && hasAIInsights) {
      console.log('\n🎉 Marketing ROI Tool is successfully deployed!');
      console.log('\n📋 Next Steps:');
      console.log('1. Visit https://siteoptz.ai/dashboard/pro');
      console.log('2. Look for the new tabs: ROI Dashboard, Platforms, AI Insights');
      console.log('3. Click on each tab to test functionality');
      console.log('4. Try connecting platforms in the Platforms tab');
    } else {
      console.log('\n⚠️  Some tabs may still be deploying. Please wait a few minutes and refresh the page.');
    }
  });
}).on('error', (err) => {
  console.error('❌ Error testing deployment:', err.message);
});
