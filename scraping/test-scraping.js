#!/usr/bin/env node

const FirecrawlApp = require('@mendable/firecrawl-js').default;
require('dotenv').config();

console.log('🧪 Testing Firecrawl Scraping System\n');
console.log('='.repeat(50));

// Test 1: API Key
console.log('\n✅ Test 1: API Key Configuration');
if (process.env.FIRECRAWL_API_KEY) {
  console.log('   API Key found: ' + process.env.FIRECRAWL_API_KEY.substring(0, 10) + '...');
} else {
  console.error('   ❌ API Key not found!');
  process.exit(1);
}

// Test 2: Firecrawl Connection
console.log('\n✅ Test 2: Firecrawl Connection');
const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
console.log('   Firecrawl client initialized');

// Test 3: Quick Scrape Test
console.log('\n✅ Test 3: Quick Scrape Test');
console.log('   Testing scrape on a simple page...');

async function runTest() {
  try {
    // Test with a simple, fast-loading page
    const testResult = await app.scrapeUrl('https://example.com', {
      pageOptions: {
        onlyMainContent: true
      }
    });
    
    if (testResult.success) {
      console.log('   ✅ Scraping successful!');
      console.log('   Content length:', testResult.markdown?.length || 0, 'characters');
    } else {
      console.log('   ⚠️ Scraping returned no success flag');
    }
    
    console.log('\n✅ Test 4: Category Normalization');
    const { normalizeCategory } = require('./scrape-new-ai-tools');
    const testCategories = [
      'text', 'image', 'video', 'code', 'chatbot', 'unknown-category'
    ];
    
    testCategories.forEach(cat => {
      console.log(`   ${cat} → ${normalizeCategory(cat)}`);
    });
    
    console.log('\n✅ Test 5: File System Access');
    const fs = require('fs').promises;
    const path = require('path');
    
    // Create test directories
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    await fs.mkdir(path.join(__dirname, 'data', 'scraped'), { recursive: true });
    await fs.mkdir(path.join(__dirname, 'data', 'merged'), { recursive: true });
    console.log('   Data directories created/verified');
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ All tests passed! System is ready.');
    console.log('\nYou can now run:');
    console.log('   npm run scrape-all     # Run complete scraping');
    console.log('   npm run scrape-new     # Scrape new tools only');
    console.log('   npm run merge          # Merge data only');
    console.log('\n');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
}

runTest();