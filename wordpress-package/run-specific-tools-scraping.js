#!/usr/bin/env node

const { scrapeSpecificAITools } = require('./scrape-specific-ai-tools');
const { mergeSpecificTools } = require('./merge-specific-tools');

async function runSpecificToolsScraping() {
  console.log('🚀 Starting specific AI tools scraping and merging process...\n');
  
  try {
    // Step 1: Scrape specific tools
    console.log('📋 Step 1: Scraping specific AI tools via Firecrawl...');
    const scrapedTools = await scrapeSpecificAITools();
    
    if (!scrapedTools || scrapedTools.length === 0) {
      console.error('❌ No tools were scraped. Please check your Firecrawl API key and try again.');
      return;
    }
    
    console.log(`✅ Successfully scraped ${scrapedTools.length} tools\n`);
    
    // Step 2: Merge with existing tools
    console.log('📋 Step 2: Merging with existing tools data...');
    const mergedData = mergeSpecificTools();
    
    if (!mergedData) {
      console.error('❌ Merge failed. Please ensure existing tools data exists.');
      return;
    }
    
    console.log(`✅ Successfully merged tools data\n`);
    
    // Step 3: Summary
    console.log('📋 Step 3: Process Summary');
    console.log('='.repeat(50));
    console.log(`🎯 Total tools in database: ${mergedData.total}`);
    console.log(`📂 Total categories: ${mergedData.categories.length}`);
    console.log(`🆕 New tools added: ${mergedData.metadata.newTools}`);
    console.log(`🔄 Duplicates skipped: ${mergedData.metadata.duplicatesSkipped}`);
    console.log(`📊 Average rating: ${(mergedData.tools.reduce((sum, tool) => sum + tool.rating, 0) / mergedData.total).toFixed(2)}`);
    console.log(`💰 Free tools: ${mergedData.tools.filter(tool => Math.min(...tool.pricing.map(p => p.price)) === 0).length}`);
    console.log(`💳 Paid tools: ${mergedData.tools.filter(tool => Math.min(...tool.pricing.map(p => p.price)) > 0).length}`);
    console.log('='.repeat(50));
    
    // Step 4: Category breakdown
    console.log('\n📋 Step 4: Category Breakdown');
    console.log('-'.repeat(30));
    mergedData.categories.forEach(category => {
      const categoryTools = mergedData.tools.filter(tool => tool.category === category);
      console.log(`${category}: ${categoryTools.length} tools`);
    });
    
    console.log('\n🎉 Process completed successfully!');
    console.log('📁 All data exported to data/siteoptz/');
    console.log('🚀 Ready for deployment to SiteOptz.ai');
    
  } catch (error) {
    console.error('❌ Process failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run if called directly
if (require.main === module) {
  runSpecificToolsScraping();
}

module.exports = { runSpecificToolsScraping };
