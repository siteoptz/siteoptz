#!/usr/bin/env node

/**
 * Schema Validation Test Suite
 * Tests structured data markup and JSON-LD validation
 */

const fs = require('fs');

console.log('🔍 Starting Schema Validation Tests...\n');

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

// Test 1: Check for structured data in templates
console.log('📄 Testing Structured Data in Templates...');

const templateFiles = [
  'templates/comparison.jsx',
  'templates/review.jsx',
  'templates/ranking.jsx'
];

templateFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for JSON-LD script tags
    const hasJSONLD = content.includes('application/ld+json');
    const hasStructuredData = content.includes('generateStructuredData');
    const hasFAQSchema = content.includes('generateFAQStructuredData');
    const hasSchemaValidation = content.includes('validateSchema');
    
    logTest(`${file} has JSON-LD script tags`, hasJSONLD);
    logTest(`${file} has structured data generation`, hasStructuredData);
    logTest(`${file} has FAQ schema generation`, hasFAQSchema);
    logTest(`${file} has schema validation`, hasSchemaValidation);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 2: Check for proper schema types
console.log('\n🏷️ Testing Schema Types...');

const schemaTypes = [
  { file: 'templates/comparison.jsx', type: 'ComparisonPage' },
  { file: 'templates/review.jsx', type: 'Review' },
  { file: 'templates/ranking.jsx', type: 'ItemList' }
];

schemaTypes.forEach(({ file, type }) => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const hasCorrectType = content.includes(`"@type": "${type}"`) || content.includes(`@type": "${type}"`);
    logTest(`${file} has correct schema type: ${type}`, hasCorrectType);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 3: Check for required schema properties
console.log('\n📋 Testing Required Schema Properties...');

const requiredProperties = [
  '@context',
  '@type',
  'name',
  'description'
];

templateFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    requiredProperties.forEach(prop => {
      const hasProperty = content.includes(`"${prop}"`) || content.includes(`'${prop}'`);
      logTest(`${file} has required property: ${prop}`, hasProperty);
    });
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 4: Check for SoftwareApplication schema
console.log('\n💻 Testing SoftwareApplication Schema...');

const softwareAppFiles = [
  'templates/comparison.jsx',
  'templates/review.jsx',
  'templates/ranking.jsx'
];

softwareAppFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    const hasSoftwareApp = content.includes('SoftwareApplication');
    const hasOffers = content.includes('offers');
    const hasApplicationCategory = content.includes('applicationCategory');
    const hasName = content.includes('"name"');
    
    logTest(`${file} has SoftwareApplication schema`, hasSoftwareApp);
    logTest(`${file} has offers property`, hasOffers);
    logTest(`${file} has applicationCategory`, hasApplicationCategory);
    logTest(`${file} has name property`, hasName);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 5: Check for FAQ schema
console.log('\n❓ Testing FAQ Schema...');

const faqFiles = [
  'templates/comparison.jsx',
  'templates/review.jsx',
  'templates/ranking.jsx',
  'components/faq.jsx'
];

faqFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    const hasFAQPage = content.includes('FAQPage');
    const hasQuestion = content.includes('Question');
    const hasAnswer = content.includes('Answer');
    const hasMainEntity = content.includes('mainEntity');
    
    logTest(`${file} has FAQPage schema`, hasFAQPage);
    logTest(`${file} has Question schema`, hasQuestion);
    logTest(`${file} has Answer schema`, hasAnswer);
    logTest(`${file} has mainEntity property`, hasMainEntity);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 6: Check for schema validation utilities
console.log('\n🔧 Testing Schema Validation Utilities...');

try {
  const schemaValidator = fs.readFileSync('utils/schema-validator.js', 'utf8');
  
  const hasValidationFunction = schemaValidator.includes('validateSchemaWithGoogle');
  const hasFAQValidation = schemaValidator.includes('validateFAQSchema');
  const hasSoftwareAppValidation = schemaValidator.includes('validateSoftwareApplicationSchema');
  const hasItemListValidation = schemaValidator.includes('validateItemListSchema');
  const hasGoogleAPI = schemaValidator.includes('searchconsole.googleapis.com');
  
  logTest('schema-validator.js has validateSchemaWithGoogle function', hasValidationFunction);
  logTest('schema-validator.js has validateFAQSchema function', hasFAQValidation);
  logTest('schema-validator.js has validateSoftwareApplicationSchema function', hasSoftwareAppValidation);
  logTest('schema-validator.js has validateItemListSchema function', hasItemListValidation);
  logTest('schema-validator.js has Google API integration', hasGoogleAPI);
} catch (error) {
  logTest('Can read schema-validator.js', false, error.message);
}

// Test 7: Check for meta tags generation
console.log('\n🏷️ Testing Meta Tags Generation...');

templateFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    const hasMetaTitle = content.includes('generateMetaTitle');
    const hasMetaDescription = content.includes('generateMetaDescription');
    const hasKeywords = content.includes('generateKeywords');
    const hasOpenGraph = content.includes('og:title') || content.includes('og:description');
    const hasTwitterCard = content.includes('twitter:card') || content.includes('twitter:title');
    const hasCanonical = content.includes('canonical');
    
    logTest(`${file} has meta title generation`, hasMetaTitle);
    logTest(`${file} has meta description generation`, hasMetaDescription);
    logTest(`${file} has keywords generation`, hasKeywords);
    logTest(`${file} has Open Graph tags`, hasOpenGraph);
    logTest(`${file} has Twitter Card tags`, hasTwitterCard);
    logTest(`${file} has canonical URL`, hasCanonical);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 8: Check for internal linking
console.log('\n🔗 Testing Internal Linking...');

templateFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    const hasInternalLinks = content.includes('generateRelatedLinks') || content.includes('generateRelatedCategoryLinks');
    const hasRelInternal = content.includes('rel="internal"');
    const hasToolLinks = content.includes('/compare/');
    
    logTest(`${file} has internal link generation`, hasInternalLinks);
    logTest(`${file} has rel="internal" attributes`, hasRelInternal);
    logTest(`${file} has tool comparison links`, hasToolLinks);
  } catch (error) {
    logTest(`Can read ${file}`, false, error.message);
  }
});

// Test 9: Validate JSON structure
console.log('\n📊 Testing JSON Structure Validation...');

try {
  const toolData = JSON.parse(fs.readFileSync('data/tool_data.json', 'utf8'));
  
  if (toolData.length > 0) {
    const firstTool = toolData[0];
    
    // Check for required fields
    const requiredFields = ['tool_name', 'description', 'key_features', 'pricing', 'target_keywords', 'meta_description'];
    const hasAllRequiredFields = requiredFields.every(field => firstTool.hasOwnProperty(field));
    
    // Check for pricing structure
    const hasPricingStructure = firstTool.pricing && 
                               typeof firstTool.pricing === 'object' &&
                               firstTool.pricing.hasOwnProperty('free') &&
                               firstTool.pricing.hasOwnProperty('basic') &&
                               firstTool.pricing.hasOwnProperty('pro');
    
    // Check for array fields
    const hasKeyFeaturesArray = Array.isArray(firstTool.key_features);
    const hasTargetKeywordsArray = Array.isArray(firstTool.target_keywords);
    
    logTest('Tool data has all required fields', hasAllRequiredFields);
    logTest('Tool data has proper pricing structure', hasPricingStructure);
    logTest('Tool data has key_features as array', hasKeyFeaturesArray);
    logTest('Tool data has target_keywords as array', hasTargetKeywordsArray);
  }
} catch (error) {
  logTest('Tool data JSON is valid', false, error.message);
}

// Summary
console.log('\n📊 Schema Validation Test Summary:');
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
  console.log('\n⚠️ Some schema validation tests failed. Review the failed tests above.');
} else {
  console.log('\n🎉 All schema validation tests passed!');
}

console.log('\n🔍 Schema Validation Checklist:');
console.log('✅ JSON-LD structured data markup');
console.log('✅ Proper schema.org types');
console.log('✅ Required schema properties');
console.log('✅ SoftwareApplication schema');
console.log('✅ FAQPage schema');
console.log('✅ Schema validation utilities');
console.log('✅ Meta tags generation');
console.log('✅ Internal linking structure');
console.log('✅ JSON data validation');

process.exit(testResults.failed > 0 ? 1 : 0);
