const fs = require('fs');
const path = require('path');

/**
 * Analyze all scraped data files to find valid tools
 */

function analyzeScrapedData() {
  const scrapedDataDir = path.join(__dirname, 'data/siteoptz');
  
  // Get all specific-*.json files
  const files = fs.readdirSync(scrapedDataDir)
    .filter(f => f.startsWith('specific-') && f.endsWith('.json'));
  
  console.log(`Found ${files.length} scraped data files:\n`);
  
  let totalValidTools = 0;
  const allValidTools = [];
  
  files.forEach(filename => {
    const filePath = path.join(scrapedDataDir, filename);
    console.log(`=== ${filename} ===`);
    
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Filter valid tools
      const validTools = data.filter(tool => {
        return tool.tool_name !== '504 Gateway Time-out' &&
               tool.name !== '504 Gateway Time-out' &&
               tool.tool_name &&
               tool.description &&
               !tool.description.includes('504 Gateway Timeout') &&
               tool.tool_name.trim() !== '';
      });
      
      console.log(`Valid tools: ${validTools.length}`);
      
      if (validTools.length > 0) {
        validTools.slice(0, 5).forEach(tool => {
          console.log(`  - ${tool.tool_name}`);
        });
        
        if (validTools.length > 5) {
          console.log(`  ... and ${validTools.length - 5} more`);
        }
        
        allValidTools.push(...validTools);
        totalValidTools += validTools.length;
      }
      
    } catch (error) {
      console.log(`Error reading file: ${error.message}`);
    }
    
    console.log('');
  });
  
  console.log(`\n📊 SUMMARY:`);
  console.log(`Total valid tools found: ${totalValidTools}`);
  console.log(`Files processed: ${files.length}`);
  
  // Remove duplicates and show unique tools
  const uniqueTools = [];
  const seenIds = new Set();
  
  allValidTools.forEach(tool => {
    const id = tool.id || tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!seenIds.has(id)) {
      seenIds.add(id);
      uniqueTools.push({
        id,
        name: tool.tool_name,
        category: tool.category,
        description: tool.description.slice(0, 100) + '...'
      });
    }
  });
  
  console.log(`\nUnique tools (after deduplication): ${uniqueTools.length}`);
  
  // Group by category
  const categories = {};
  uniqueTools.forEach(tool => {
    const category = tool.category || 'Other';
    if (!categories[category]) categories[category] = [];
    categories[category].push(tool);
  });
  
  console.log(`\n📋 BY CATEGORY:`);
  Object.keys(categories).sort().forEach(category => {
    console.log(`\n${category} (${categories[category].length} tools):`);
    categories[category].slice(0, 3).forEach(tool => {
      console.log(`  • ${tool.name}`);
    });
    if (categories[category].length > 3) {
      console.log(`  ... and ${categories[category].length - 3} more`);
    }
  });
  
  return {
    totalValid: totalValidTools,
    uniqueCount: uniqueTools.length,
    categories: Object.keys(categories).length,
    tools: uniqueTools
  };
}

// Run analysis
if (require.main === module) {
  analyzeScrapedData();
}