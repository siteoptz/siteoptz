#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { convertToSiteOptzFormat, validateSiteOptzTool, normalizeCategoryForSiteOptz } = require('./siteoptz-data-adapter');
const { findDuplicates, calculateSimilarity } = require('./duplicate-detector');
require('dotenv').config();

console.log('🧪 Testing Enhanced AI Tools Scraping System\n');
console.log('='.repeat(60));

// Test data
const mockScrapedTool = {
  name: 'TestAI Assistant',
  description: 'AI-powered virtual assistant for productivity and automation tasks',
  category: 'productivity',
  website: 'https://testai.com',
  rating: 4.5,
  reviewCount: 1250,
  features: ['Natural language processing', 'Task automation', 'Calendar integration'],
  pricing: {
    free: false,
    startingPrice: 15,
    model: 'freemium'
  },
  tags: ['ai assistant', 'productivity', 'automation']
};

const mockExistingTool = {
  id: 'existing-ai-tool',
  name: 'Existing AI Tool',
  slug: 'existing-ai-tool',
  overview: {
    category: 'Productivity',
    description: 'An existing AI productivity tool',
    website: 'https://existing.com'
  },
  features: ['AI features', 'Productivity tools'],
  pricing: [{ plan: 'Pro', price_per_month: 20 }],
  meta: { title: 'Existing Tool Review' }
};

async function runTests() {
  let passedTests = 0;
  let totalTests = 0;
  
  console.log('\n✅ Test 1: Category Normalization');
  totalTests++;
  try {
    const testCategories = {
      'text': 'Content Creation',
      'image': 'Image Generation',
      'voice': 'Best Voice AI Tools',
      'code': 'Code Generation',
      'productivity': 'Productivity',
      'unknown-category': 'other'
    };
    
    let categoryTestsPassed = 0;
    for (const [input, expected] of Object.entries(testCategories)) {
      const result = normalizeCategoryForSiteOptz(input);
      if (result === expected) {
        console.log(`   ✅ "${input}" → "${result}"`);
        categoryTestsPassed++;
      } else {
        console.log(`   ❌ "${input}" → "${result}" (expected: "${expected}")`);
      }
    }
    
    if (categoryTestsPassed === Object.keys(testCategories).length) {
      console.log('   🎉 All category mappings working correctly!');
      passedTests++;
    }
  } catch (error) {
    console.log(`   ❌ Category test failed: ${error.message}`);
  }
  
  console.log('\n✅ Test 2: SiteOptz.ai Format Conversion');
  totalTests++;
  try {
    const convertedTool = convertToSiteOptzFormat(mockScrapedTool);
    
    const requiredFields = ['id', 'name', 'slug', 'overview', 'features', 'pricing', 'meta', 'schema'];
    const missingFields = requiredFields.filter(field => !convertedTool[field]);
    
    if (missingFields.length === 0) {
      console.log('   ✅ All required fields present');
      console.log(`   ✅ Tool ID: ${convertedTool.id}`);
      console.log(`   ✅ Category: ${convertedTool.overview.category}`);
      console.log(`   ✅ SEO Title: ${convertedTool.meta.title}`);
      console.log(`   ✅ Structured Data: ${convertedTool.schema['@type']}`);
      passedTests++;
    } else {
      console.log(`   ❌ Missing fields: ${missingFields.join(', ')}`);
    }
  } catch (error) {
    console.log(`   ❌ Conversion test failed: ${error.message}`);
  }
  
  console.log('\n✅ Test 3: Data Validation');
  totalTests++;
  try {
    const convertedTool = convertToSiteOptzFormat(mockScrapedTool);
    const validation = validateSiteOptzTool(convertedTool);
    
    if (validation.valid) {
      console.log('   ✅ Tool validation passed');
      if (validation.warnings.length > 0) {
        console.log(`   ⚠️ Warnings: ${validation.warnings.join(', ')}`);
      }
      passedTests++;
    } else {
      console.log(`   ❌ Validation failed: ${validation.errors.join(', ')}`);
    }
  } catch (error) {
    console.log(`   ❌ Validation test failed: ${error.message}`);
  }
  
  console.log('\n✅ Test 4: Duplicate Detection');
  totalTests++;
  try {
    const testTools = [
      { name: 'ChatGPT', website: 'https://chat.openai.com' },
      { name: 'Chat GPT', website: 'https://openai.com/chatgpt' },
      { name: 'Completely Different Tool', website: 'https://different.com' }
    ];
    
    const duplicates = findDuplicates(testTools[0], [testTools[1], testTools[2]]);
    
    if (duplicates.definite.length > 0 || duplicates.possible.length > 0) {
      console.log('   ✅ Duplicate detection working');
      console.log(`   📊 Definite duplicates: ${duplicates.definite.length}`);
      console.log(`   📊 Possible duplicates: ${duplicates.possible.length}`);
      passedTests++;
    } else {
      console.log('   ⚠️ No duplicates detected (may be too strict)');
    }
  } catch (error) {
    console.log(`   ❌ Duplicate detection test failed: ${error.message}`);
  }
  
  console.log('\n✅ Test 5: String Similarity');
  totalTests++;
  try {
    const testCases = [
      { str1: 'ChatGPT', str2: 'Chat GPT', expected: 0.8 },
      { str1: 'OpenAI', str2: 'OpenAI', expected: 1.0 },
      { str1: 'Completely Different', str2: 'Totally Unrelated', expected: 0.3 }
    ];
    
    let similarityTestsPassed = 0;
    for (const test of testCases) {
      const similarity = calculateSimilarity(test.str1, test.str2);
      const passed = test.expected === 1.0 ? similarity === 1.0 : 
                    similarity >= test.expected - 0.2 && similarity <= test.expected + 0.2;
      
      if (passed) {
        console.log(`   ✅ "${test.str1}" vs "${test.str2}": ${(similarity * 100).toFixed(1)}%`);
        similarityTestsPassed++;
      } else {
        console.log(`   ❌ "${test.str1}" vs "${test.str2}": ${(similarity * 100).toFixed(1)}% (expected ~${(test.expected * 100).toFixed(1)}%)`);
      }
    }
    
    if (similarityTestsPassed === testCases.length) {
      passedTests++;
    }
  } catch (error) {
    console.log(`   ❌ Similarity test failed: ${error.message}`);
  }
  
  console.log('\n✅ Test 6: SEO Metadata Generation');
  totalTests++;
  try {
    const convertedTool = convertToSiteOptzFormat(mockScrapedTool);
    const seo = convertedTool.meta;
    
    const seoChecks = [
      { name: 'Title exists', pass: !!seo.title },
      { name: 'Description exists', pass: !!seo.description },
      { name: 'Description length OK', pass: seo.description && seo.description.length <= 160 },
      { name: 'Keywords exist', pass: !!seo.keywords },
      { name: 'OpenGraph data', pass: !!seo.openGraph?.title },
      { name: 'Twitter data', pass: !!seo.twitter?.title }
    ];
    
    const passedSeoChecks = seoChecks.filter(check => check.pass).length;
    
    seoChecks.forEach(check => {
      console.log(`   ${check.pass ? '✅' : '❌'} ${check.name}`);
    });
    
    if (passedSeoChecks === seoChecks.length) {
      console.log('   🎉 All SEO checks passed!');
      passedTests++;
    } else {
      console.log(`   ⚠️ ${passedSeoChecks}/${seoChecks.length} SEO checks passed`);
    }
  } catch (error) {
    console.log(`   ❌ SEO test failed: ${error.message}`);
  }
  
  console.log('\n✅ Test 7: Frontend Compatibility');
  totalTests++;
  try {
    const convertedTool = convertToSiteOptzFormat(mockScrapedTool);
    
    // Check frontend-required fields
    const frontendChecks = [
      { name: 'Has overview.category', pass: !!convertedTool.overview?.category },
      { name: 'Has overview.description', pass: !!convertedTool.overview?.description },
      { name: 'Has overview.website', pass: !!convertedTool.overview?.website },
      { name: 'Pricing is array', pass: Array.isArray(convertedTool.pricing) },
      { name: 'Features is array', pass: Array.isArray(convertedTool.features) },
      { name: 'Tags is array', pass: Array.isArray(convertedTool.tags) },
      { name: 'Has slug', pass: !!convertedTool.slug },
      { name: 'Has logo path', pass: !!convertedTool.logo }
    ];
    
    const passedFrontendChecks = frontendChecks.filter(check => check.pass).length;
    
    frontendChecks.forEach(check => {
      console.log(`   ${check.pass ? '✅' : '❌'} ${check.name}`);
    });
    
    if (passedFrontendChecks === frontendChecks.length) {
      console.log('   🎉 Frontend compatibility confirmed!');
      passedTests++;
    } else {
      console.log(`   ⚠️ ${passedFrontendChecks}/${frontendChecks.length} frontend checks passed`);
    }
  } catch (error) {
    console.log(`   ❌ Frontend compatibility test failed: ${error.message}`);
  }
  
  console.log('\n✅ Test 8: File System Access');
  totalTests++;
  try {
    // Test data directory creation
    const testDir = path.join(__dirname, 'data', 'test');
    await fs.mkdir(testDir, { recursive: true });
    
    // Test file write/read
    const testData = { test: true, timestamp: new Date().toISOString() };
    const testFile = path.join(testDir, 'test.json');
    await fs.writeFile(testFile, JSON.stringify(testData, null, 2));
    
    const readData = JSON.parse(await fs.readFile(testFile, 'utf8'));
    
    if (readData.test === true) {
      console.log('   ✅ File operations working');
      passedTests++;
    } else {
      console.log('   ❌ File read/write failed');
    }
    
    // Cleanup
    await fs.unlink(testFile);
  } catch (error) {
    console.log(`   ❌ File system test failed: ${error.message}`);
  }
  
  // Final Results
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('='.repeat(60));
  console.log(`Tests passed: ${passedTests}/${totalTests}`);
  console.log(`Success rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('✅ Enhanced scraping system is fully operational');
    console.log('✅ SEO optimization enabled');
    console.log('✅ Advanced duplicate detection active');
    console.log('✅ SiteOptz.ai frontend compatibility confirmed');
    console.log('\n🚀 Ready to scrape and enhance AI tools database!');
  } else {
    console.log(`\n⚠️ ${totalTests - passedTests} test(s) failed. Please review the issues above.`);
  }
  
  console.log('\n💡 Next Steps:');
  console.log('1. Run: npm run scrape-all (complete pipeline)');
  console.log('2. Or: npm run scrape-new (scrape only)');
  console.log('3. Or: npm run merge (merge data only)');
  console.log('');
}

// Run the tests
runTests().catch(error => {
  console.error('❌ Test suite failed:', error);
  process.exit(1);
});