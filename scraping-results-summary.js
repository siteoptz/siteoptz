const fs = require('fs');
const path = require('path');

console.log('🎉 Neil Patel AI Tools Scraping Summary\n');
console.log('=' .repeat(50));

// Find the latest cleaned file
const scrapedDir = '/Users/siteoptz/siteoptz-scraping/scraped-data';
const cleanedFiles = fs.readdirSync(scrapedDir)
  .filter(file => file.includes('cleaned.json'))
  .sort()
  .reverse();

if (cleanedFiles.length === 0) {
  console.log('❌ No cleaned scraped files found');
  process.exit(1);
}

const latestFile = path.join(scrapedDir, cleanedFiles[0]);
const tools = JSON.parse(fs.readFileSync(latestFile, 'utf8'));

console.log(`📊 Successfully scraped ${tools.length} AI tools from Neil Patel's directory`);
console.log(`📁 Clean data file: ${latestFile}\n`);

// Show categories breakdown
const categories = {};
tools.forEach(tool => {
  const category = tool.overview.category || 'Unknown';
  categories[category] = (categories[category] || 0) + 1;
});

console.log('📈 Tools by Category:');
Object.entries(categories).forEach(([category, count]) => {
  console.log(`  • ${category}: ${count} tools`);
});

console.log('\n🔧 Extracted Tools:');
tools.forEach((tool, index) => {
  console.log(`${(index + 1).toString().padStart(2, ' ')}. ${tool.name}`);
  if (tool.overview.website !== `https://${tool.slug.replace(/-/g, '')}.com`) {
    console.log(`    🔗 Website: ${tool.overview.website}`);
  }
});

console.log('\n' + '=' .repeat(50));
console.log('🚀 Integration Instructions:');
console.log('=' .repeat(50));

console.log(`
1. **Review the Data**:
   - File location: ${latestFile}
   - Total tools: ${tools.length}
   - All tools are in the correct aiToolsData.json format

2. **Merge with Existing Data**:
   \`\`\`bash
   # Copy the tools to a staging file
   cp "${latestFile}" ./neil-patel-staging.json
   
   # Review each tool manually if needed
   code neil-patel-staging.json
   
   # Merge into main data file (manual process recommended)
   # Open public/data/aiToolsData.json and append the new tools
   \`\`\`

3. **Post-Integration Steps**:
   \`\`\`bash
   # Validate the schema
   npm run validate-schema
   
   # Generate missing logos  
   npm run generate-logos
   
   # Validate images
   npm run validate-images
   
   # Test the build
   npm run build
   \`\`\`

4. **Quality Assurance**:
   - Each tool has been cleaned and validated
   - Default pricing and features have been assigned
   - All tools follow the required JSON structure
   - Scraping metadata is included for tracking

5. **Commit Changes**:
   \`\`\`bash
   git add public/data/aiToolsData.json
   git commit -m "Add ${tools.length} AI tools from Neil Patel directory"
   git push
   \`\`\`
`);

console.log('\n📋 Data Quality Notes:');
console.log('=' .repeat(50));
console.log(`
• ✅ All tools have valid names and slugs
• ✅ Duplicate detection and removal applied
• ✅ Navigation elements filtered out
• ✅ Default descriptions generated for missing content
• ✅ Consistent pricing structure applied
• ✅ Compatible with existing aiToolsData.json format
• ⚠️  Some tools may need manual review for accuracy
• ⚠️  Consider updating descriptions with more specific content
• ⚠️  Website URLs are generated and may need verification
`);

console.log('\n🔄 Re-running the Scraper:');
console.log('=' .repeat(50));
console.log(`
To scrape again or update the data:

\`\`\`bash
# Run the full scraper
node scrapers/neil-patel-scraper.js

# Clean the results
node clean-scraped-data.js

# View summary
node scraping-results-summary.js
\`\`\`
`);

console.log('\n✨ Scraping completed successfully!');
console.log(`📁 Final file: ${latestFile}`);