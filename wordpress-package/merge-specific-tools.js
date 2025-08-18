const fs = require('fs');
const path = require('path');

// Merge specific tools with existing tools
function mergeSpecificTools() {
  console.log('🔄 Merging specific AI tools with existing data...');
  
  const dataDir = path.join(__dirname, 'data', 'siteoptz');
  
  // Read existing tools
  const existingToolsPath = path.join(dataDir, 'tools.json');
  const specificToolsPath = path.join(dataDir, 'specific-tools.json');
  
  if (!fs.existsSync(existingToolsPath)) {
    console.error('❌ Existing tools.json not found. Please run the main generator first.');
    return;
  }
  
  if (!fs.existsSync(specificToolsPath)) {
    console.error('❌ Specific tools.json not found. Please run the scraper first.');
    return;
  }
  
  const existingData = JSON.parse(fs.readFileSync(existingToolsPath, 'utf8'));
  const specificData = JSON.parse(fs.readFileSync(specificToolsPath, 'utf8'));
  
  // Merge tools
  const existingTools = existingData.tools || [];
  const specificTools = specificData.tools || [];
  
  // Create a map of existing tool IDs to avoid duplicates
  const existingToolIds = new Set(existingTools.map(tool => tool.id));
  
  // Filter out any specific tools that already exist
  const newTools = specificTools.filter(tool => !existingToolIds.has(tool.id));
  
  // Merge the tools
  const mergedTools = [...existingTools, ...newTools];
  
  // Update categories
  const existingCategories = new Set(existingData.categories || []);
  const specificCategories = specificData.categories || [];
  
  specificCategories.forEach(category => {
    if (!existingCategories.has(category)) {
      existingCategories.add(category);
    }
  });
  
  const mergedCategories = Array.from(existingCategories);
  
  // Create merged data
  const mergedData = {
    tools: mergedTools,
    total: mergedTools.length,
    categories: mergedCategories,
    lastUpdated: new Date().toISOString(),
    metadata: {
      originalTools: existingTools.length,
      newTools: newTools.length,
      totalTools: mergedTools.length,
      originalCategories: existingData.categories?.length || 0,
      newCategories: specificCategories.length,
      totalCategories: mergedCategories.length
    }
  };
  
  // Write merged data
  fs.writeFileSync(
    path.join(dataDir, 'merged-tools.json'),
    JSON.stringify(mergedData, null, 2)
  );
  
  // Update the main tools.json file
  fs.writeFileSync(
    path.join(dataDir, 'tools.json'),
    JSON.stringify(mergedData, null, 2)
  );
  
  // Generate new summary
  const summary = {
    totalTools: mergedTools.length,
    categories: mergedCategories.map(category => ({
      name: category,
      count: mergedTools.filter(tool => tool.category === category).length
    })),
    averageRating: (mergedTools.reduce((sum, tool) => sum + tool.rating, 0) / mergedTools.length).toFixed(2),
    freeTools: mergedTools.filter(tool => Math.min(...tool.pricing.map(p => p.price)) === 0).length,
    paidTools: mergedTools.filter(tool => Math.min(...tool.pricing.map(p => p.price)) > 0).length,
    lastUpdated: new Date().toISOString(),
    mergeInfo: {
      originalTools: existingTools.length,
      newTools: newTools.length,
      duplicatesSkipped: specificTools.length - newTools.length
    }
  };
  
  fs.writeFileSync(
    path.join(dataDir, 'merged-summary.json'),
    JSON.stringify(summary, null, 2)
  );
  
  // Export category-specific files for merged data
  mergedCategories.forEach(category => {
    const categoryTools = mergedTools.filter(tool => tool.category === category);
    if (categoryTools.length > 0) {
      const categoryData = {
        category: category,
        tools: categoryTools,
        total: categoryTools.length,
        lastUpdated: new Date().toISOString()
      };
      
      fs.writeFileSync(
        path.join(dataDir, `merged-${category}.json`),
        JSON.stringify(categoryData, null, 2)
      );
    }
  });
  
  console.log(`✅ Merge completed successfully!`);
  console.log(`📊 Original tools: ${existingTools.length}`);
  console.log(`📊 New tools added: ${newTools.length}`);
  console.log(`📊 Total tools: ${mergedTools.length}`);
  console.log(`📊 Duplicates skipped: ${specificTools.length - newTools.length}`);
  console.log(`📂 Categories: ${mergedCategories.length}`);
  console.log(`📁 Data exported to data/siteoptz/merged-tools.json`);
  
  return mergedData;
}

// Run if called directly
if (require.main === module) {
  mergeSpecificTools();
}

module.exports = { mergeSpecificTools };
