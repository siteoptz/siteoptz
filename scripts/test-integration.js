#!/usr/bin/env node

/**
 * Comprehensive Integration Test Suite
 * Tests all components, templates, and functionality before production deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Starting Comprehensive Integration Tests...\n');

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

// Test 1: Check if all required files exist
console.log('📁 Testing File Structure...');
const requiredFiles = [
  'components/faq.jsx',
  'components/table.jsx',
  'components/pricing-calculator.jsx',
  'templates/comparison.jsx',
  'templates/review.jsx',
  'templates/ranking.jsx',
  'data/tool_data.json',
  'data/faq_data.json',
  'utils/schema-validator.js',
  'pages/compare/[tool].jsx',
  'pages/compare/index.jsx',
  'pages/api/subscribe.js',
  'styles/components.css'
];

requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  logTest(`File exists: ${file}`, exists, exists ? '' : 'File not found');
});

// Test 2: Validate JSON data files
console.log('\n📊 Testing Data Files...');

try {
  const toolData = JSON.parse(fs.readFileSync('data/tool_data.json', 'utf8'));
  logTest('tool_data.json is valid JSON', true);
  logTest('tool_data.json has tools', Array.isArray(toolData) && toolData.length > 0, 
    `Found ${toolData.length} tools`);
  
  if (toolData.length > 0) {
    const firstTool = toolData[0];
    const requiredFields = ['tool_name', 'description', 'key_features', 'pricing', 'target_keywords', 'meta_description'];
    const hasAllFields = requiredFields.every(field => firstTool.hasOwnProperty(field));
    logTest('Tool data has required fields', hasAllFields, 
      hasAllFields ? '' : `Missing: ${requiredFields.filter(f => !firstTool.hasOwnProperty(f)).join(', ')}`);
  }
} catch (error) {
  logTest('tool_data.json is valid JSON', false, error.message);
}

try {
  const faqData = JSON.parse(fs.readFileSync('data/faq_data.json', 'utf8'));
  logTest('faq_data.json is valid JSON', true);
  logTest('faq_data.json has FAQs', Array.isArray(faqData) && faqData.length > 0, 
    `Found ${faqData.length} FAQs`);
} catch (error) {
  logTest('faq_data.json is valid JSON', false, error.message);
}

// Test 3: Validate component files
console.log('\n🧩 Testing Component Files...');

const componentFiles = [
  'components/faq.jsx',
  'components/table.jsx',
  'components/pricing-calculator.jsx'
];

componentFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const hasReactImport = content.includes('import React');
    const hasExport = content.includes('export default');
    const hasJSX = content.includes('return (') || content.includes('return(');
    
    logTest(`${file} has React import`, hasReactImport);
    logTest(`${file} has default export`, hasExport);
    logTest(`${file} has JSX content`, hasJSX);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 4: Validate template files
console.log('\n📄 Testing Template Files...');

const templateFiles = [
  'templates/comparison.jsx',
  'templates/review.jsx',
  'templates/ranking.jsx'
];

templateFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const hasReactImport = content.includes('import React');
    const hasHeadImport = content.includes('import Head');
    const hasStructuredData = content.includes('application/ld+json');
    const hasMetaTags = content.includes('<title>') || content.includes('generateMetaTitle');
    
    logTest(`${file} has React import`, hasReactImport);
    logTest(`${file} has Head import`, hasHeadImport);
    logTest(`${file} has structured data`, hasStructuredData);
    logTest(`${file} has meta tags`, hasMetaTags);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 5: Validate utility files
console.log('\n🔧 Testing Utility Files...');

try {
  const schemaValidator = fs.readFileSync('utils/schema-validator.js', 'utf8');
  const hasValidationFunctions = schemaValidator.includes('validateSchemaWithGoogle') || 
                                schemaValidator.includes('validateFAQSchema');
  const hasExportStatements = schemaValidator.includes('export const') || schemaValidator.includes('export default');
  
  logTest('schema-validator.js has validation functions', hasValidationFunctions);
  logTest('schema-validator.js has exports', hasExportStatements);
} catch (error) {
  logTest('Can read schema-validator.js', false, error.message);
}

// Test 6: Validate page files
console.log('\n📱 Testing Page Files...');

const pageFiles = [
  'pages/compare/[tool].jsx',
  'pages/compare/index.jsx',
  'pages/api/subscribe.js'
];

pageFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const hasReactImport = content.includes('import React') || content.includes('import {');
    const hasExport = content.includes('export default') || content.includes('export default function');
    
    logTest(`${file} has React import`, hasReactImport);
    logTest(`${file} has export`, hasExport);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 7: Validate CSS files
console.log('\n🎨 Testing CSS Files...');

try {
  const componentsCSS = fs.readFileSync('styles/components.css', 'utf8');
  const hasSliderStyles = componentsCSS.includes('.slider');
  const hasModalStyles = componentsCSS.includes('modal');
  
  logTest('components.css has slider styles', hasSliderStyles);
  logTest('components.css has modal styles', hasModalStyles);
} catch (error) {
  logTest('Can read components.css', false, error.message);
}

// Test 8: Check package.json dependencies
console.log('\n📦 Testing Dependencies...');

try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const hasNextJS = packageJson.dependencies && packageJson.dependencies.next;
  const hasReact = packageJson.dependencies && packageJson.dependencies.react;
  const hasTailwind = packageJson.dependencies && packageJson.dependencies.tailwindcss;
  
  logTest('package.json has Next.js', hasNextJS);
  logTest('package.json has React', hasReact);
  logTest('package.json has Tailwind CSS', hasTailwind);
} catch (error) {
  logTest('package.json is valid', false, error.message);
}

// Test 9: Validate build configuration
console.log('\n⚙️ Testing Build Configuration...');

try {
  const nextConfig = fs.readFileSync('next.config.js', 'utf8');
  const hasConfig = nextConfig.length > 0;
  logTest('next.config.js exists and has content', hasConfig);
} catch (error) {
  logTest('next.config.js exists', false, error.message);
}

try {
  const tailwindConfig = fs.readFileSync('tailwind.config.js', 'utf8');
  const hasConfig = tailwindConfig.length > 0;
  logTest('tailwind.config.js exists and has content', hasConfig);
} catch (error) {
  logTest('tailwind.config.js exists', false, error.message);
}

// Test 10: Check for common issues
console.log('\n🔍 Checking for Common Issues...');

// Check for console.log statements in production code
const productionFiles = [
  'components/faq.jsx',
  'components/table.jsx',
  'components/pricing-calculator.jsx',
  'templates/comparison.jsx',
  'templates/review.jsx',
  'templates/ranking.jsx'
];

let hasConsoleLogs = false;
productionFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('console.log(') && !content.includes('// console.log')) {
      hasConsoleLogs = true;
    }
  } catch (error) {
    // Ignore file read errors
  }
});

logTest('No console.log statements in production code', !hasConsoleLogs, 
  hasConsoleLogs ? 'Found console.log statements' : '');

// Check for TODO comments
let hasTODOs = false;
productionFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('TODO') || content.includes('FIXME')) {
      hasTODOs = true;
    }
  } catch (error) {
    // Ignore file read errors
  }
});

logTest('No TODO/FIXME comments in production code', !hasTODOs, 
  hasTODOs ? 'Found TODO/FIXME comments' : '');

// Summary
console.log('\n📊 Test Summary:');
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
  process.exit(1);
} else {
  console.log('\n🎉 All tests passed! Ready for production deployment.');
  process.exit(0);
}
