#!/usr/bin/env node

/**
 * Test script to scrape a single tool and validate the system works
 */

import { scrapeSingleTool } from './scrape-specific-ai-tools.js';

// Test with Gamma (a reliable website)
const testTool = {
  id: "gamma",
  name: "Gamma",
  url: "https://gamma.app",
  category: "Productivity",
  description: "AI-powered presentation and document creation platform",
  expectedPricing: { free: true, starting: 0, pro: 10 }
};

async function testSingleTool() {
  console.log('🧪 Testing single tool scraping...');
  console.log(`📋 Tool: ${testTool.name} (${testTool.url})\n`);
  
  try {
    const result = await scrapeSingleTool(testTool);
    
    console.log('✅ Scraping successful!');
    console.log('\n📊 Results:');
    console.log(`   - Name: ${result.tool_name}`);
    console.log(`   - Description: ${result.description.substring(0, 100)}...`);
    console.log(`   - Category: ${result.category}`);
    console.log(`   - Pricing plans: ${result.pricing?.length || 0}`);
    console.log(`   - Features: ${result.features?.core?.length || 0}`);
    console.log(`   - Pros: ${result.pros?.length || 0}`);
    console.log(`   - Cons: ${result.cons?.length || 0}`);
    console.log(`   - Rating: ${result.rating}/5`);
    console.log(`   - SEO Title: ${result.metaTags?.title}`);
    
    // Save test result
    const fs = await import('fs');
    const path = await import('path');
    
    const testDir = path.join(process.cwd(), 'data', 'siteoptz');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    
    const testFile = path.join(testDir, 'test-single-tool.json');
    fs.writeFileSync(testFile, JSON.stringify(result, null, 2));
    
    console.log(`\n💾 Test result saved to: ${testFile}`);
    console.log('\n🎉 Single tool test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testSingleTool();