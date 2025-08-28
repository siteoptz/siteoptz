#!/usr/bin/env node

const { scrapeNewAITools } = require('./scrape-new-ai-tools');
const { mergeToolsData } = require('./merge-tools-data');
const { generateAnalytics } = require('./generate-analytics');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

// ASCII art banner
const banner = `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     🤖 SiteOptz AI Tools Scraper & Merger 🤖             ║
║     Powered by Firecrawl                                 ║
║                                                           ║
╔═══════════════════════════════════════════════════════════╝
`;

// Check for API key
function checkApiKey() {
  if (!process.env.FIRECRAWL_API_KEY) {
    console.error('❌ Error: FIRECRAWL_API_KEY not found in environment variables');
    console.log('\n📝 Please set your Firecrawl API key:');
    console.log('   export FIRECRAWL_API_KEY="your-api-key-here"');
    console.log('   or create a .env file with FIRECRAWL_API_KEY=your-api-key');
    process.exit(1);
  }
  console.log('✅ Firecrawl API key found');
}

// Generate summary report
async function generateSummaryReport(result) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTools: result.mergedTools.length,
      newToolsAdded: result.stats.added,
      toolsUpdated: result.stats.updated,
      duplicatesSkipped: result.stats.skipped
    },
    categories: {},
    topRatedTools: [],
    freeTools: [],
    paidTools: [],
    sources: {}
  };
  
  // Analyze by category
  for (const [category, tools] of Object.entries(result.categories)) {
    report.categories[category] = {
      count: tools.length,
      avgRating: tools.reduce((sum, t) => sum + (t.rating || 0), 0) / tools.length || 0,
      freeTools: tools.filter(t => t.pricing?.free).length,
      paidTools: tools.filter(t => !t.pricing?.free).length
    };
  }
  
  // Top rated tools
  report.topRatedTools = result.mergedTools
    .filter(t => t.rating)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 10)
    .map(t => ({
      name: t.name,
      category: t.category,
      rating: t.rating,
      reviewCount: t.reviewCount
    }));
  
  // Free vs Paid breakdown
  report.freeTools = result.mergedTools.filter(t => t.pricing?.free).map(t => t.name);
  report.paidTools = result.mergedTools.filter(t => !t.pricing?.free).map(t => t.name);
  
  // Source breakdown
  result.mergedTools.forEach(tool => {
    const source = tool.source || 'unknown';
    report.sources[source] = (report.sources[source] || 0) + 1;
  });
  
  // Save report
  const reportPath = path.join(__dirname, 'data', 'reports', `report-${Date.now()}.json`);
  await fs.mkdir(path.join(__dirname, 'data', 'reports'), { recursive: true });
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  
  return report;
}

// Display results
function displayResults(report) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 SCRAPING & MERGE SUMMARY');
  console.log('='.repeat(60));
  
  console.log('\n🎯 Overall Statistics:');
  console.log(`  Total tools in database: ${report.summary.totalTools}`);
  console.log(`  New tools added: ${report.summary.newToolsAdded}`);
  console.log(`  Tools updated: ${report.summary.toolsUpdated}`);
  console.log(`  Duplicates skipped: ${report.summary.duplicatesSkipped}`);
  
  console.log('\n📂 Categories (${Object.keys(report.categories).length} total):');
  const sortedCategories = Object.entries(report.categories)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);
  
  sortedCategories.forEach(([category, data]) => {
    console.log(`  ${category}: ${data.count} tools (${data.freeTools} free, ${data.paidTools} paid)`);
  });
  
  console.log('\n⭐ Top 5 Rated Tools:');
  report.topRatedTools.slice(0, 5).forEach((tool, index) => {
    console.log(`  ${index + 1}. ${tool.name} (${tool.category}) - ${tool.rating}/5 ⭐`);
  });
  
  console.log('\n📊 Pricing Breakdown:');
  console.log(`  Free tools: ${report.freeTools.length}`);
  console.log(`  Paid tools: ${report.paidTools.length}`);
  console.log(`  Ratio: ${((report.freeTools.length / report.summary.totalTools) * 100).toFixed(1)}% free`);
  
  console.log('\n🌐 Data Sources:');
  Object.entries(report.sources).forEach(([source, count]) => {
    console.log(`  ${source}: ${count} tools`);
  });
  
  console.log('\n' + '='.repeat(60));
}

// Clean up old data files
async function cleanupOldData() {
  console.log('\n🧹 Cleaning up old data files...');
  
  const dataDir = path.join(__dirname, 'data');
  const reportsDir = path.join(dataDir, 'reports');
  
  try {
    // Keep only the last 10 reports
    const reports = await fs.readdir(reportsDir);
    if (reports.length > 10) {
      const sortedReports = reports.sort();
      const toDelete = sortedReports.slice(0, sortedReports.length - 10);
      
      for (const report of toDelete) {
        await fs.unlink(path.join(reportsDir, report));
      }
      
      console.log(`  ✅ Deleted ${toDelete.length} old reports`);
    }
  } catch (error) {
    // Reports directory might not exist yet
  }
}

// Main execution function
async function main() {
  console.clear();
  console.log(banner);
  
  try {
    // Step 1: Check API key
    console.log('📋 Step 1: Checking configuration...');
    checkApiKey();
    
    // Step 2: Scrape new AI tools
    console.log('\n📋 Step 2: Scraping new AI tools via Firecrawl...');
    const scrapedTools = await scrapeNewAITools();
    console.log(`✅ Successfully scraped ${scrapedTools.length} tools`);
    
    // Step 3: Merge with existing data
    console.log('\n📋 Step 3: Merging with existing tools data...');
    const mergeResult = await mergeToolsData(scrapedTools);
    console.log('✅ Successfully merged tools data');
    
    // Step 4: Generate analytics and report
    console.log('\n📋 Step 4: Generating analytics report...');
    const report = await generateSummaryReport(mergeResult);
    console.log('✅ Report generated successfully');
    
    // Step 5: Display results
    displayResults(report);
    
    // Step 6: Cleanup old data
    await cleanupOldData();
    
    // Success message
    console.log('\n🎉 Process completed successfully!');
    console.log('📁 All data exported to scraping/data/');
    console.log('🚀 Website data updated at public/data/aiToolsData.json');
    console.log('✨ Ready for deployment to SiteOptz.ai\n');
    
    // Export paths for reference
    console.log('📂 Output Files:');
    console.log('  - Scraped tools: scraping/data/scraped/new-ai-tools.json');
    console.log('  - Merged data: scraping/data/merged/all-tools.json');
    console.log('  - Category files: scraping/data/merged/categories/*.json');
    console.log('  - Website data: public/data/aiToolsData.json');
    console.log('  - Report: scraping/data/reports/report-*.json\n');
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\n⚠️ Process interrupted by user');
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error('\n❌ Uncaught exception:', error);
  process.exit(1);
});

// Run the main function
if (require.main === module) {
  main();
}

module.exports = { main };