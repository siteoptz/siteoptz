const { scrapeAITools } = require('./scrape-ai-tools');
const { cleanAIToolsData } = require('./clean-ai-tools-data');
const { exportToolsData } = require('./export-tools-data');

async function main() {
  console.log('🚀 Starting AI Tools Scraping...');
  
  try {
    // Scrape all tools
    console.log('📊 Scraping AI tools from multiple sources...');
    const rawTools = await scrapeAITools();
    
    console.log(`📈 Found ${rawTools.length} raw tools`);
    
    // Clean and process data
    console.log('🧹 Cleaning and processing data...');
    const cleanTools = cleanAIToolsData(rawTools);
    
    console.log(`✅ Processed ${cleanTools.length} clean tools`);
    
    // Export data
    console.log('💾 Exporting data...');
    await exportToolsData(cleanTools);
    
    console.log('🎉 Scraping completed successfully!');
    
    // Print summary
    const categories = [...new Set(cleanTools.map(t => t.category))];
    console.log(`\n📊 Summary:`);
    console.log(`- Total tools: ${cleanTools.length}`);
    console.log(`- Categories: ${categories.length}`);
    console.log(`- Categories: ${categories.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error during scraping:', error);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main };
