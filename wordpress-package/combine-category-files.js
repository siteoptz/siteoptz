const fs = require('fs');
const path = require('path');

function combineCategoryFiles() {
  console.log('🔄 Combining category files into main tools.json...');
  
  const dataDir = path.join(__dirname, 'data', 'siteoptz');
  const allTools = [];
  
  // Get all category files
  const files = fs.readdirSync(dataDir);
  const categoryFiles = files.filter(file => file.endsWith('.json') && file !== 'tools.json' && file !== 'summary.json' && file !== 'comparisons.json' && file !== 'sitemap.json' && file !== 'robots.txt');
  
  console.log(`📁 Found ${categoryFiles.length} category files`);
  
  // Read each category file and extract tools
  categoryFiles.forEach(file => {
    try {
      const filePath = path.join(dataDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      if (data.tools && Array.isArray(data.tools)) {
        allTools.push(...data.tools);
        console.log(`✅ Added ${data.tools.length} tools from ${file}`);
      }
    } catch (error) {
      console.error(`❌ Error reading ${file}:`, error.message);
    }
  });
  
  // Create the combined tools.json file
  const toolsData = {
    tools: allTools,
    total: allTools.length,
    categories: [...new Set(allTools.map(tool => tool.category))],
    lastUpdated: new Date().toISOString()
  };
  
  // Write the combined file
  const toolsFilePath = path.join(dataDir, 'tools.json');
  fs.writeFileSync(toolsFilePath, JSON.stringify(toolsData, null, 2));
  
  console.log(`✅ Combined ${allTools.length} tools into tools.json`);
  console.log(`📊 Categories: ${toolsData.categories.join(', ')}`);
  
  return allTools;
}

if (require.main === module) {
  combineCategoryFiles();
}

module.exports = { combineCategoryFiles };
