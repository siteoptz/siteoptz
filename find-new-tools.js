const fs = require('fs');
const path = require('path');

/**
 * Find tools that exist in scraped data but not in main aiToolsData.json
 */

function findNewTools() {
  const scrapedDataDir = path.join(__dirname, 'data/siteoptz');
  const mainDataPath = path.join(__dirname, 'public/data/aiToolsData.json');
  
  // Load existing tools and create lookup sets
  const existingTools = JSON.parse(fs.readFileSync(mainDataPath, 'utf8'));
  const existingIds = new Set(existingTools.map(t => t.id.toLowerCase()));
  const existingNames = new Set(existingTools.map(t => t.name.toLowerCase()));
  
  console.log(`📋 Existing tools in database: ${existingTools.length}`);
  console.log(`🔍 Looking for new tools in scraped data...\n`);
  
  // Get all scraped files
  const files = fs.readdirSync(scrapedDataDir)
    .filter(f => f.startsWith('specific-') && f.endsWith('.json'));
  
  const newTools = [];
  const duplicates = [];
  
  files.forEach(filename => {
    const filePath = path.join(scrapedDataDir, filename);
    console.log(`📁 Checking ${filename}...`);
    
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      data.forEach(tool => {
        // Skip invalid tools
        if (tool.tool_name === '504 Gateway Time-out' || 
            tool.name === '504 Gateway Time-out' ||
            !tool.tool_name || 
            !tool.description ||
            tool.description.includes('504 Gateway Timeout') ||
            tool.tool_name.trim() === '') {
          return;
        }
        
        const toolName = tool.tool_name.toLowerCase();
        const toolId = (tool.id || tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')).toLowerCase();
        
        // Check if tool is already in database (by ID or name)
        if (existingIds.has(toolId) || existingNames.has(toolName)) {
          duplicates.push({
            name: tool.tool_name,
            id: toolId,
            source: filename
          });
          return;
        }
        
        // This is a new tool
        newTools.push({
          name: tool.tool_name,
          id: toolId,
          category: tool.category,
          description: tool.description.slice(0, 100) + '...',
          source: filename
        });
      });
      
    } catch (error) {
      console.error(`❌ Error reading ${filename}:`, error.message);
    }
  });
  
  console.log(`\n🆕 NEW TOOLS FOUND: ${newTools.length}`);
  console.log(`🔁 DUPLICATES SKIPPED: ${duplicates.length}\n`);
  
  if (newTools.length > 0) {
    console.log('📝 NEW TOOLS TO ADD:');
    newTools.forEach((tool, i) => {
      console.log(`${i + 1}. ${tool.name} (${tool.category || 'Unknown'}) - from ${tool.source}`);
    });
  }
  
  if (duplicates.length > 0) {
    console.log('\n🔄 DUPLICATES (already exist):');
    duplicates.slice(0, 10).forEach(tool => {
      console.log(`  • ${tool.name} - from ${tool.source}`);
    });
    if (duplicates.length > 10) {
      console.log(`  ... and ${duplicates.length - 10} more duplicates`);
    }
  }
  
  return { newTools, duplicates };
}

// Run analysis
if (require.main === module) {
  const result = findNewTools();
  console.log(`\n✅ Analysis complete: ${result.newTools.length} new tools ready to add`);
}

module.exports = { findNewTools };