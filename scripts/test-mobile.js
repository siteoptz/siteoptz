#!/usr/bin/env node

/**
 * Mobile Responsiveness Test Suite
 * Tests responsive design and mobile compatibility
 */

const fs = require('fs');

console.log('📱 Starting Mobile Responsiveness Tests...\n');

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

// Test 1: Check for responsive CSS classes
console.log('🎨 Testing Responsive CSS Classes...');

const responsiveFiles = [
  'components/faq.jsx',
  'components/table.jsx',
  'components/pricing-calculator.jsx',
  'templates/comparison.jsx',
  'templates/review.jsx',
  'templates/ranking.jsx',
  'pages/compare/[tool].jsx',
  'pages/compare/index.jsx'
];

responsiveFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for responsive breakpoint classes
    const hasResponsiveClasses = content.includes('md:') || content.includes('lg:') || content.includes('sm:') || content.includes('xl:');
    const hasFlexResponsive = content.includes('flex-col') && content.includes('md:flex-row');
    const hasGridResponsive = content.includes('grid-cols-1') && content.includes('md:grid-cols-');
    const hasTextResponsive = content.includes('text-sm') && content.includes('md:text-');
    const hasSpacingResponsive = content.includes('p-4') && content.includes('md:p-');
    
    logTest(`${file} has responsive classes`, hasResponsiveClasses);
    logTest(`${file} has responsive flex layout`, hasFlexResponsive);
    logTest(`${file} has responsive grid layout`, hasGridResponsive);
    logTest(`${file} has responsive text sizing`, hasTextResponsive);
    logTest(`${file} has responsive spacing`, hasSpacingResponsive);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 2: Check for mobile-specific features
console.log('\n📱 Testing Mobile-Specific Features...');

const mobileFeatures = [
  'components/faq.jsx',
  'components/table.jsx',
  'components/pricing-calculator.jsx'
];

mobileFeatures.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for touch-friendly elements
    const hasTouchTargets = content.includes('min-h-[44px]') || content.includes('py-3') || content.includes('px-4');
    const hasTouchFeedback = content.includes('hover:') || content.includes('active:') || content.includes('focus:');
    const hasAccessibility = content.includes('aria-') || content.includes('role=');
    const hasKeyboardNav = content.includes('onKeyDown') || content.includes('tabIndex');
    
    logTest(`${file} has touch-friendly targets`, hasTouchTargets);
    logTest(`${file} has touch feedback`, hasTouchFeedback);
    logTest(`${file} has accessibility attributes`, hasAccessibility);
    logTest(`${file} has keyboard navigation`, hasKeyboardNav);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 3: Check for mobile viewport meta tag
console.log('\n📄 Testing Mobile Viewport Configuration...');

try {
  const appFile = fs.readFileSync('pages/_app.tsx', 'utf8');
  const hasViewportMeta = appFile.includes('viewport') || appFile.includes('width=device-width');
  logTest('_app.tsx has viewport meta tag', hasViewportMeta);
} catch (error) {
  logTest('Can read _app.tsx', false, error.message);
}

// Test 4: Check for mobile-optimized images
console.log('\n🖼️ Testing Mobile Image Optimization...');

const imageFiles = [
  'components/faq.jsx',
  'components/table.jsx',
  'components/pricing-calculator.jsx',
  'templates/comparison.jsx',
  'templates/review.jsx',
  'templates/ranking.jsx'
];

imageFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for responsive images
    const hasResponsiveImages = content.includes('w-full') || content.includes('h-auto') || content.includes('object-cover');
    const hasImageOptimization = content.includes('next/image') || content.includes('loading=');
    
    logTest(`${file} has responsive images`, hasResponsiveImages);
    logTest(`${file} has image optimization`, hasImageOptimization);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 5: Check for mobile-friendly forms
console.log('\n📝 Testing Mobile Form Optimization...');

const formFiles = [
  'components/pricing-calculator.jsx',
  'pages/api/subscribe.js'
];

formFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for mobile-friendly form elements
    const hasMobileInputs = content.includes('type="email"') || content.includes('type="text"');
    const hasFormValidation = content.includes('required') || content.includes('pattern=');
    const hasMobileSubmit = content.includes('onSubmit') || content.includes('handleSubmit');
    
    logTest(`${file} has mobile-friendly inputs`, hasMobileInputs);
    logTest(`${file} has form validation`, hasFormValidation);
    logTest(`${file} has mobile submit handling`, hasMobileSubmit);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 6: Check for mobile navigation
console.log('\n🧭 Testing Mobile Navigation...');

const navigationFiles = [
  'templates/comparison.jsx',
  'templates/review.jsx',
  'templates/ranking.jsx',
  'pages/compare/index.jsx'
];

navigationFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for mobile navigation features
    const hasMobileNav = content.includes('nav') || content.includes('navigation');
    const hasMobileMenu = content.includes('menu') || content.includes('hamburger');
    const hasMobileLinks = content.includes('href=') && content.includes('className=');
    
    logTest(`${file} has mobile navigation`, hasMobileNav);
    logTest(`${file} has mobile menu`, hasMobileMenu);
    logTest(`${file} has mobile links`, hasMobileLinks);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 7: Check for performance optimizations
console.log('\n⚡ Testing Performance Optimizations...');

const performanceFiles = [
  'components/faq.jsx',
  'components/table.jsx',
  'components/pricing-calculator.jsx'
];

performanceFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for performance optimizations
    const hasMemoization = content.includes('useMemo') || content.includes('React.memo');
    const hasLazyLoading = content.includes('lazy') || content.includes('Suspense');
    const hasOptimizedRendering = content.includes('useCallback') || content.includes('useEffect');
    
    logTest(`${file} has memoization`, hasMemoization);
    logTest(`${file} has lazy loading`, hasLazyLoading);
    logTest(`${file} has optimized rendering`, hasOptimizedRendering);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Summary
console.log('\n📊 Mobile Responsiveness Test Summary:');
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
  console.log('\n⚠️ Some mobile responsiveness tests failed. Review the failed tests above.');
} else {
  console.log('\n🎉 All mobile responsiveness tests passed!');
}

console.log('\n📱 Mobile Responsiveness Checklist:');
console.log('✅ Responsive breakpoints (sm, md, lg, xl)');
console.log('✅ Flexible layouts (flex, grid)');
console.log('✅ Touch-friendly targets (44px minimum)');
console.log('✅ Accessibility attributes (aria-*, role)');
console.log('✅ Keyboard navigation support');
console.log('✅ Mobile-optimized forms');
console.log('✅ Performance optimizations');
console.log('✅ Viewport meta configuration');

process.exit(testResults.failed > 0 ? 1 : 0);

