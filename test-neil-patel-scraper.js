const NeilPatelScraper = require('./scrapers/neil-patel-scraper');

async function testScraper() {
  console.log('🧪 Testing Neil Patel scraper...');
  
  const scraper = new NeilPatelScraper();
  
  try {
    // Test with a small subset first
    console.log('📋 Testing page discovery...');
    const pages = await scraper.discoverPages();
    console.log(`✅ Discovered ${pages.length} pages`);
    
    if (pages.length > 0) {
      console.log('🔍 Sample pages:');
      pages.slice(0, 5).forEach((page, index) => {
        console.log(`  ${index + 1}. ${page}`);
      });
    }
    
    // Test scraping just the main page
    console.log('\n🧪 Testing tool extraction from main page...');
    const mainPageData = await scraper.makeRequest(scraper.targetSite);
    
    if (mainPageData) {
      const tools = scraper.extractToolsFromContent(mainPageData, scraper.targetSite);
      console.log(`✅ Extracted ${tools.length} tools from main page`);
      
      if (tools.length > 0) {
        console.log('\n📊 Sample extracted tool:');
        console.log(JSON.stringify(tools[0], null, 2));
      }
    }
    
    console.log('\n🎉 Test completed successfully!');
    console.log('💡 To run full scraping, use: node scrapers/neil-patel-scraper.js');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

if (require.main === module) {
  testScraper();
}

module.exports = testScraper;