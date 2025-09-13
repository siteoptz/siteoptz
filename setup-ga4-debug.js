// GA4 Debug Setup Script for SiteOptz.ai
// Run this script to set up GA4 debugging for your key events

const fs = require('fs');
const path = require('path');

console.log('🔍 Setting up GA4 Debug Mode for SiteOptz.ai...\n');

// 1. Update your GA4 Measurement ID
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 ID

// 2. Create debug configuration
const debugConfig = {
  GA4_MEASUREMENT_ID: GA4_MEASUREMENT_ID,
  DEBUG_MODE: true,
  EVENTS_TO_TEST: [
    'email_capture',
    'comparison_view',
    'calculator_usage',
    'affiliate_click',
    'faq_interaction',
    'funnel_step',
    'webinar_registration',
    'guide_download',
    'tool_selection',
    'feature_comparison',
    'cta_click',
    'page_engagement',
    'scroll_milestone',
    'user_journey_complete'
  ]
};

// 3. Create debug environment file
const debugEnvContent = `# GA4 Debug Configuration
GA4_MEASUREMENT_ID=${GA4_MEASUREMENT_ID}
GA4_DEBUG_MODE=true
GA4_DEBUG_VIEW=true

# Event Testing
TEST_EMAIL_CAPTURE=true
TEST_COMPARISON_VIEW=true
TEST_CALCULATOR_USAGE=true
TEST_AFFILIATE_CLICK=true
TEST_FAQ_INTERACTION=true
TEST_FUNNEL_STEP=true

# Debug Settings
CONSOLE_LOGGING=true
EVENT_VALIDATION=true
OFFLINE_STORAGE=true
`;

// 4. Create debug initialization script
const debugInitScript = `// GA4 Debug Initialization for SiteOptz.ai
// Add this to your main application entry point

import { initKeyEventsTracking } from './utils/key-events-tracker.js';

// Initialize with debug mode
const debugConfig = {
  GA4_ID: '${GA4_MEASUREMENT_ID}',
  debug_mode: true,
  console_logging: true,
  event_validation: true
};

// Initialize tracking
initKeyEventsTracking(debugConfig);

// Add debug mode indicator to page
if (typeof window !== 'undefined') {
  const debugIndicator = document.createElement('div');
  debugIndicator.id = 'ga4-debug-indicator';
  debugIndicator.style.cssText = \`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #ff6b6b;
    color: white;
    text-align: center;
    padding: 5px;
    font-size: 12px;
    z-index: 9999;
    font-family: monospace;
  \`;
  debugIndicator.textContent = '🔍 GA4 DEBUG MODE ACTIVE - Events are being tracked';
  document.body.appendChild(debugIndicator);
  
  console.log('🔍 GA4 Debug Mode Active');
  console.log('📊 Open GA4 DebugView to see events in real-time');
  console.log('🎯 Test your events using the test page: test-ga4-events.html');
}
`;

// 5. Create test runner script
const testRunnerScript = `// GA4 Events Test Runner
// Run this to test all your key events

import { 
  trackEmailCapture, 
  trackComparisonView, 
  trackCalculatorUsage,
  trackAffiliateClick,
  trackFAQInteraction,
  trackFunnelStep,
  trackWebinarRegistration,
  trackGuideDownload,
  trackToolSelection,
  trackFeatureComparison,
  trackCTAClick,
  trackPageEngagement,
  trackScrollMilestone,
  EnhancedUserJourney
} from './utils/key-events-tracker.js';

// Test all key events
export const runAllEventTests = async () => {
  console.log('🧪 Starting GA4 Events Test Suite...');
  
  const tests = [
    {
      name: 'Email Capture',
      fn: () => trackEmailCapture('test_runner', 'chatgpt', 'ai_tools', { test_mode: true })
    },
    {
      name: 'Comparison View',
      fn: () => trackComparisonView('chatgpt', 'jasper_ai', 'test_runner', { test_mode: true })
    },
    {
      name: 'Calculator Usage',
      fn: () => trackCalculatorUsage(['chatgpt', 'jasper_ai'], 5, 'medium', 150, { test_mode: true })
    },
    {
      name: 'Affiliate Click',
      fn: () => trackAffiliateClick('chatgpt', 'pricing', 'https://chat.openai.com/plus', 'test_runner', { test_mode: true })
    },
    {
      name: 'FAQ Interaction',
      fn: () => trackFAQInteraction('What is the difference between ChatGPT and Jasper AI?', 'chatgpt', { test_mode: true })
    },
    {
      name: 'Funnel Step',
      fn: () => trackFunnelStep('comparison_viewed', 'chatgpt', 'jasper_ai', { test_mode: true })
    },
    {
      name: 'Webinar Registration',
      fn: () => trackWebinarRegistration('AI Tools Masterclass 2025', 'test@example.com', { test_mode: true })
    },
    {
      name: 'Guide Download',
      fn: () => trackGuideDownload('AI_Tools_Guide_2025.pdf', 'test_runner', 'chatgpt_vs_jasper', { test_mode: true })
    },
    {
      name: 'Tool Selection',
      fn: () => trackToolSelection(['chatgpt', 'jasper_ai'], 5, 'medium', { test_mode: true })
    },
    {
      name: 'Feature Comparison',
      fn: () => trackFeatureComparison('pricing', 'chatgpt', 'jasper_ai', { test_mode: true })
    },
    {
      name: 'CTA Click',
      fn: () => trackCTAClick('chatgpt', 'pricing_button', 'https://chat.openai.com/plus', 'test_runner', { test_mode: true })
    },
    {
      name: 'Page Engagement',
      fn: () => trackPageEngagement('test_page', 30000, { test_mode: true })
    },
    {
      name: 'Scroll Milestone',
      fn: () => trackScrollMilestone('test_page', 50, { test_mode: true })
    }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      console.log(\`🧪 Testing: \${test.name}\`);
      const result = test.fn();
      
      if (result) {
        console.log(\`✅ \${test.name}: PASSED\`);
        passed++;
      } else {
        console.log(\`❌ \${test.name}: FAILED\`);
        failed++;
      }
    } catch (error) {
      console.error(\`❌ \${test.name}: ERROR - \${error.message}\`);
      failed++;
    }
    
    // Wait 100ms between tests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(\`\\n📊 Test Results: \${passed} passed, \${failed} failed\`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed! Your GA4 events are working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Check your GA4 DebugView for issues.');
  }
  
  return { passed, failed };
};

// Test user journey
export const testUserJourney = () => {
  console.log('🛤️ Testing User Journey...');
  
  const journey = new EnhancedUserJourney();
  
  // Simulate user journey
  journey.addStep('page_landed', { source: 'test_runner' });
  journey.addStep('comparison_viewed', { tool1: 'chatgpt', tool2: 'jasper_ai' });
  journey.addStep('calculator_used', { team_size: 5 });
  journey.addStep('email_captured', { source: 'test_runner' });
  journey.addStep('cta_clicked', { tool: 'chatgpt' });
  
  // Complete journey with conversion
  journey.complete(true, 25);
  
  console.log('✅ User Journey Test Complete');
  return journey.getSummary();
};

// Run tests if called directly
if (typeof window !== 'undefined') {
  window.runAllEventTests = runAllEventTests;
  window.testUserJourney = testUserJourney;
}
`;

// 6. Create GA4 DebugView instructions
const debugViewInstructions = `# GA4 DebugView Setup Instructions

## Step 1: Access DebugView
1. Go to your GA4 property
2. Navigate to **Configure** → **DebugView**
3. You should see real-time events

## Step 2: Enable Debug Mode
Add this to your URL: \`?debug_mode=true\`

Or add this to your code:
\`\`\`javascript
gtag('config', '${GA4_MEASUREMENT_ID}', {
  debug_mode: true
});
\`\`\`

## Step 3: Test Your Events
1. Open \`test-ga4-events.html\` in your browser
2. Click the test buttons
3. Watch events appear in GA4 DebugView

## Step 4: Verify Event Structure
Each event should have:
- Event name (e.g., \`email_capture\`)
- Event parameters (e.g., \`source\`, \`tool\`, \`category\`)
- Timestamp
- Session ID

## Step 5: Check for Issues
- Events not appearing: Check console for errors
- Missing parameters: Verify event data structure
- Timing issues: Events should appear within 1-2 seconds

## Step 6: Production Testing
1. Remove debug mode
2. Test in production environment
3. Verify events appear in GA4 reports
4. Check conversion tracking

## Troubleshooting
- **Events not showing**: Check GA4 ID and debug mode
- **Wrong parameters**: Verify event data structure
- **Session issues**: Check session ID generation
- **Performance issues**: Monitor event frequency
`;

// Write files
try {
  // Create debug environment file
  fs.writeFileSync(path.join(__dirname, '.env.debug'), debugEnvContent);
  console.log('✅ Created .env.debug file');
  
  // Create debug initialization script
  fs.writeFileSync(path.join(__dirname, 'debug-init.js'), debugInitScript);
  console.log('✅ Created debug-init.js file');
  
  // Create test runner script
  fs.writeFileSync(path.join(__dirname, 'test-runner.js'), testRunnerScript);
  console.log('✅ Created test-runner.js file');
  
  // Create debug view instructions
  fs.writeFileSync(path.join(__dirname, 'GA4_DEBUG_INSTRUCTIONS.md'), debugViewInstructions);
  console.log('✅ Created GA4_DEBUG_INSTRUCTIONS.md file');
  
  console.log('\n🎯 Setup Complete!');
  console.log('\n📋 Next Steps:');
  console.log('1. Replace G-XXXXXXXXXX with your actual GA4 Measurement ID');
  console.log('2. Open test-ga4-events.html in your browser');
  console.log('3. Open GA4 DebugView in your GA4 property');
  console.log('4. Click test buttons and watch events appear');
  console.log('5. Verify all events are tracking correctly');
  console.log('\n🔍 DebugView URL: https://analytics.google.com/analytics/web/#/p[YOUR_PROPERTY_ID]/debugview');
  console.log('\n📚 Read GA4_DEBUG_INSTRUCTIONS.md for detailed setup instructions');
  
} catch (error) {
  console.error('❌ Error setting up GA4 debug:', error.message);
}
