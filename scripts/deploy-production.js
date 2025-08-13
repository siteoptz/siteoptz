#!/usr/bin/env node

/**
 * Production Deployment Script
 * Deploys the SiteOptz.ai AI tool comparison platform to production
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting Production Deployment for SiteOptz.ai...\n');

// Deployment configuration
const config = {
  projectName: 'siteoptz-ai-comparison',
  buildCommand: 'npm run build',
  testCommand: 'npm test',
  deployCommand: 'npm run deploy',
  monitoringUrls: [
    'https://siteoptz.ai/compare',
    'https://siteoptz.ai/compare/chatgpt',
    'https://siteoptz.ai/compare/jasper-ai',
    'https://siteoptz.ai/compare/claude'
  ]
};

// Helper function to run commands
const runCommand = (command, description) => {
  try {
    console.log(`🔄 ${description}...`);
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    console.log(`✅ ${description} completed successfully`);
    return { success: true, output: result };
  } catch (error) {
    console.log(`❌ ${description} failed: ${error.message}`);
    return { success: false, error: error.message };
  }
};

// Step 1: Run all tests
console.log('🧪 Step 1: Running Comprehensive Tests...\n');

const testResults = {
  integration: runCommand('node scripts/test-integration.js', 'Integration tests'),
  schema: runCommand('node scripts/test-schema.js', 'Schema validation tests'),
  mobile: runCommand('node scripts/test-mobile.js', 'Mobile responsiveness tests'),
  leadTracking: runCommand('node scripts/test-lead-tracking.js', 'Lead tracking tests')
};

// Check if all critical tests passed
const criticalTests = [testResults.integration, testResults.schema];
const allCriticalTestsPassed = criticalTests.every(test => test.success);

if (!allCriticalTestsPassed) {
  console.log('\n❌ Critical tests failed. Deployment aborted.');
  console.log('Please fix the failing tests before deploying to production.');
  process.exit(1);
}

console.log('\n✅ All critical tests passed. Proceeding with deployment...\n');

// Step 2: Build the application
console.log('🔨 Step 2: Building Application...\n');

const buildResult = runCommand(config.buildCommand, 'Production build');

if (!buildResult.success) {
  console.log('\n❌ Build failed. Deployment aborted.');
  process.exit(1);
}

console.log('\n✅ Build completed successfully.\n');

// Step 3: Run deployment
console.log('🚀 Step 3: Deploying to Production...\n');

const deployResult = runCommand(config.deployCommand, 'Production deployment');

if (!deployResult.success) {
  console.log('\n❌ Deployment failed.');
  process.exit(1);
}

console.log('\n✅ Deployment completed successfully!\n');

// Step 4: Post-deployment verification
console.log('🔍 Step 4: Post-Deployment Verification...\n');

// Check if key files exist
const keyFiles = [
  '.next',
  'package.json',
  'next.config.js',
  'data/tool_data.json',
  'data/faq_data.json'
];

keyFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file} ${exists ? 'exists' : 'missing'}`);
});

// Step 5: Generate deployment report
console.log('\n📊 Step 5: Generating Deployment Report...\n');

const deploymentReport = {
  timestamp: new Date().toISOString(),
  project: config.projectName,
  tests: {
    integration: testResults.integration.success,
    schema: testResults.schema.success,
    mobile: testResults.mobile.success,
    leadTracking: testResults.leadTracking.success
  },
  build: buildResult.success,
  deployment: deployResult.success,
  files: keyFiles.map(file => ({
    file,
    exists: fs.existsSync(file)
  }))
};

// Save deployment report
fs.writeFileSync('deployment-report.json', JSON.stringify(deploymentReport, null, 2));
console.log('✅ Deployment report saved to deployment-report.json');

// Step 6: Monitoring setup instructions
console.log('\n📈 Step 6: Monitoring Setup Instructions...\n');

console.log('🔍 Google Search Console Setup:');
console.log('1. Add your domain to Google Search Console');
console.log('2. Submit sitemap: https://siteoptz.ai/sitemap.xml');
console.log('3. Monitor for structured data errors');
console.log('4. Check for mobile usability issues');
console.log('5. Monitor search performance for new pages\n');

console.log('📊 Google Analytics Setup:');
console.log('1. Create a new property for SiteOptz.ai');
console.log('2. Add tracking code to _app.tsx');
console.log('3. Set up conversion goals for:');
console.log('   - Email subscriptions');
console.log('   - Tool comparison page views');
console.log('   - Pricing calculator usage');
console.log('4. Create custom reports for AI tool comparisons\n');

console.log('🔗 Internal Linking Monitoring:');
console.log('1. Check internal link structure');
console.log('2. Monitor for broken links');
console.log('3. Track user journey through comparison pages');
console.log('4. Analyze related tools click-through rates\n');

console.log('📱 Mobile Performance Monitoring:');
console.log('1. Use Google PageSpeed Insights');
console.log('2. Monitor Core Web Vitals');
console.log('3. Check mobile usability in Search Console');
console.log('4. Test responsive design across devices\n');

// Step 7: Success summary
console.log('\n🎉 Deployment Summary:');
console.log('=====================================');
console.log(`✅ Project: ${config.projectName}`);
console.log(`✅ Deployment Time: ${deploymentReport.timestamp}`);
console.log(`✅ Integration Tests: ${testResults.integration.success ? 'PASSED' : 'FAILED'}`);
console.log(`✅ Schema Validation: ${testResults.schema.success ? 'PASSED' : 'FAILED'}`);
console.log(`✅ Mobile Responsiveness: ${testResults.mobile.success ? 'PASSED' : 'FAILED'}`);
console.log(`✅ Lead Tracking: ${testResults.leadTracking.success ? 'PASSED' : 'FAILED'}`);
console.log(`✅ Build: ${buildResult.success ? 'SUCCESS' : 'FAILED'}`);
console.log(`✅ Deployment: ${deployResult.success ? 'SUCCESS' : 'FAILED'}`);
console.log('=====================================\n');

console.log('🚀 SiteOptz.ai AI Tool Comparison Platform is now LIVE!');
console.log('\n📋 Next Steps:');
console.log('1. Set up Google Search Console monitoring');
console.log('2. Configure Google Analytics tracking');
console.log('3. Monitor page performance and user engagement');
console.log('4. Track lead generation and conversion rates');
console.log('5. Monitor search rankings for AI tool keywords');
console.log('6. Set up alerts for any technical issues');
console.log('7. Plan content expansion based on performance data\n');

console.log('🎯 Key URLs to Monitor:');
config.monitoringUrls.forEach(url => {
  console.log(`   - ${url}`);
});

console.log('\n📞 Support:');
console.log('For technical issues, check the deployment logs and test results.');
console.log('For SEO performance, monitor Google Search Console and Analytics.');
console.log('For user experience, use Google PageSpeed Insights and Core Web Vitals.\n');

console.log('🎉 Deployment completed successfully!');
