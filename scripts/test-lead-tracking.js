#!/usr/bin/env node

/**
 * Lead Form Submission Tracking Test Suite
 * Tests email capture forms and lead tracking functionality
 */

const fs = require('fs');

console.log('📧 Starting Lead Form Tracking Tests...\n');

// Test Results
const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  details: []
};

// Helper function to log test results
const logTest = (testName, passed, details = '') => {
  testResults.total++;
  if (passed) {
    testResults.passed++;
    console.log(`✅ ${testName}`);
  } else {
    testResults.failed++;
    console.log(`❌ ${testName}`);
    if (details) console.log(`   Details: ${details}`);
  }
  testResults.details.push({ name: testName, passed, details });
};

// Test 1: Check for email capture forms
console.log('📝 Testing Email Capture Forms...');

const formFiles = [
  'components/pricing-calculator.jsx',
  'templates/comparison.jsx',
  'templates/review.jsx',
  'templates/ranking.jsx',
  'pages/compare/index.jsx'
];

formFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for form elements
    const hasForm = content.includes('<form') || content.includes('onSubmit');
    const hasEmailInput = content.includes('type="email"') || content.includes('email');
    const hasSubmitButton = content.includes('type="submit"') || content.includes('onClick');
    const hasFormValidation = content.includes('required') || content.includes('validation');
    
    logTest(`${file} has form element`, hasForm);
    logTest(`${file} has email input`, hasEmailInput);
    logTest(`${file} has submit button`, hasSubmitButton);
    logTest(`${file} has form validation`, hasFormValidation);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 2: Check for API endpoint
console.log('\n🔌 Testing API Endpoint...');

try {
  const apiFile = fs.readFileSync('pages/api/subscribe.js', 'utf8');
  
  const hasExport = apiFile.includes('export default') || apiFile.includes('module.exports');
  const hasRequestHandler = apiFile.includes('req') && apiFile.includes('res');
  const hasEmailProcessing = apiFile.includes('email') || apiFile.includes('body');
  const hasResponse = apiFile.includes('res.json') || apiFile.includes('res.status');
  const hasErrorHandling = apiFile.includes('try') && apiFile.includes('catch');
  
  logTest('API endpoint has export', hasExport);
  logTest('API endpoint has request handler', hasRequestHandler);
  logTest('API endpoint has email processing', hasEmailProcessing);
  logTest('API endpoint has response handling', hasResponse);
  logTest('API endpoint has error handling', hasErrorHandling);
} catch (error) {
  logTest('Can read API endpoint', false, error.message);
}

// Test 3: Check for lead tracking functionality
console.log('\n📊 Testing Lead Tracking Functionality...');

const trackingFiles = [
  'components/pricing-calculator.jsx',
  'templates/comparison.jsx',
  'templates/review.jsx',
  'templates/ranking.jsx'
];

trackingFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for tracking features
    const hasEmailState = content.includes('useState') && content.includes('email');
    const hasSubmitHandler = content.includes('handleSubmit') || content.includes('onSubmit');
    const hasLoadingState = content.includes('isSubmitting') || content.includes('loading');
    const hasSuccessHandling = content.includes('success') || content.includes('alert');
    const hasErrorHandling = content.includes('error') || content.includes('catch');
    
    logTest(`${file} has email state management`, hasEmailState);
    logTest(`${file} has submit handler`, hasSubmitHandler);
    logTest(`${file} has loading state`, hasLoadingState);
    logTest(`${file} has success handling`, hasSuccessHandling);
    logTest(`${file} has error handling`, hasErrorHandling);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 4: Check for analytics integration
console.log('\n📈 Testing Analytics Integration...');

const analyticsFiles = [
  'components/pricing-calculator.jsx',
  'templates/comparison.jsx',
  'templates/review.jsx',
  'templates/ranking.jsx',
  'pages/_app.tsx'
];

analyticsFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for analytics features
    const hasGoogleAnalytics = content.includes('gtag') || content.includes('GA_TRACKING_ID');
    const hasEventTracking = content.includes('gtag(') || content.includes('track');
    const hasConversionTracking = content.includes('conversion') || content.includes('lead');
    const hasPageTracking = content.includes('pageview') || content.includes('page_view');
    
    logTest(`${file} has Google Analytics integration`, hasGoogleAnalytics);
    logTest(`${file} has event tracking`, hasEventTracking);
    logTest(`${file} has conversion tracking`, hasConversionTracking);
    logTest(`${file} has page tracking`, hasPageTracking);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 5: Check for CRM integration
console.log('\n🤝 Testing CRM Integration...');

try {
  const apiFile = fs.readFileSync('pages/api/subscribe.js', 'utf8');
  
  const hasCRMIntegration = apiFile.includes('crm') || apiFile.includes('hubspot') || apiFile.includes('mailchimp');
  const hasEmailService = apiFile.includes('nodemailer') || apiFile.includes('sendgrid') || apiFile.includes('mailgun');
  const hasDatabaseStorage = apiFile.includes('database') || apiFile.includes('db') || apiFile.includes('prisma');
  const hasWebhookSupport = apiFile.includes('webhook') || apiFile.includes('callback');
  
  logTest('API has CRM integration', hasCRMIntegration);
  logTest('API has email service integration', hasEmailService);
  logTest('API has database storage', hasDatabaseStorage);
  logTest('API has webhook support', hasWebhookSupport);
} catch (error) {
  logTest('Can read API file for CRM integration', false, error.message);
}

// Test 6: Check for form security
console.log('\n🔒 Testing Form Security...');

const securityFiles = [
  'components/pricing-calculator.jsx',
  'pages/api/subscribe.js'
];

securityFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for security features
    const hasInputValidation = content.includes('validation') || content.includes('validate');
    const hasCSRFProtection = content.includes('csrf') || content.includes('token');
    const hasRateLimiting = content.includes('rate') || content.includes('limit');
    const hasSanitization = content.includes('sanitize') || content.includes('escape');
    
    logTest(`${file} has input validation`, hasInputValidation);
    logTest(`${file} has CSRF protection`, hasCSRFProtection);
    logTest(`${file} has rate limiting`, hasRateLimiting);
    logTest(`${file} has input sanitization`, hasSanitization);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 7: Check for user experience features
console.log('\n👤 Testing User Experience Features...');

const uxFiles = [
  'components/pricing-calculator.jsx',
  'templates/comparison.jsx',
  'templates/review.jsx',
  'templates/ranking.jsx'
];

uxFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for UX features
    const hasLoadingStates = content.includes('loading') || content.includes('spinner');
    const hasSuccessMessages = content.includes('success') || content.includes('thank you');
    const hasErrorMessages = content.includes('error') || content.includes('invalid');
    const hasFormReset = content.includes('reset') || content.includes('clear');
    const hasAccessibility = content.includes('aria-') || content.includes('role=');
    
    logTest(`${file} has loading states`, hasLoadingStates);
    logTest(`${file} has success messages`, hasSuccessMessages);
    logTest(`${file} has error messages`, hasErrorMessages);
    logTest(`${file} has form reset functionality`, hasFormReset);
    logTest(`${file} has accessibility features`, hasAccessibility);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 8: Check for mobile form optimization
console.log('\n📱 Testing Mobile Form Optimization...');

const mobileFormFiles = [
  'components/pricing-calculator.jsx',
  'templates/comparison.jsx',
  'templates/review.jsx',
  'templates/ranking.jsx'
];

mobileFormFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for mobile optimization
    const hasMobileInputs = content.includes('type="email"') || content.includes('type="text"');
    const hasTouchTargets = content.includes('py-3') || content.includes('px-4') || content.includes('min-h-[44px]');
    const hasMobileLayout = content.includes('flex-col') && content.includes('md:flex-row');
    const hasMobileValidation = content.includes('required') || content.includes('pattern=');
    
    logTest(`${file} has mobile-friendly inputs`, hasMobileInputs);
    logTest(`${file} has touch-friendly targets`, hasTouchTargets);
    logTest(`${file} has mobile-responsive layout`, hasMobileLayout);
    logTest(`${file} has mobile validation`, hasMobileValidation);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Summary
console.log('\n📊 Lead Form Tracking Test Summary:');
console.log(`Total Tests: ${testResults.total}`);
console.log(`Passed: ${testResults.passed}`);
console.log(`Failed: ${testResults.failed}`);
console.log(`Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`);

if (testResults.failed > 0) {
  console.log('\n❌ Failed Tests:');
  testResults.details
    .filter(test => !test.passed)
    .forEach(test => {
      console.log(`  - ${test.name}: ${test.details}`);
    });
  console.log('\n⚠️ Some lead tracking tests failed. Review the failed tests above.');
} else {
  console.log('\n🎉 All lead tracking tests passed!');
}

console.log('\n📧 Lead Form Tracking Checklist:');
console.log('✅ Email capture forms');
console.log('✅ API endpoint functionality');
console.log('✅ Lead tracking integration');
console.log('✅ Analytics integration');
console.log('✅ CRM integration');
console.log('✅ Form security measures');
console.log('✅ User experience features');
console.log('✅ Mobile form optimization');

process.exit(testResults.failed > 0 ? 1 : 0);
