const fs = require('fs');
const path = require('path');

async function exportToolsData(tools, category = 'all') {
  // Create data directory if it doesn't exist
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Export all tools
  const allToolsPath = path.join(dataDir, 'tools.json');
  fs.writeFileSync(allToolsPath, JSON.stringify({
    tools: tools,
    total: tools.length,
    lastUpdated: new Date().toISOString()
  }, null, 2));
  
  // Export by category
  const toolsByCategory = tools.reduce((acc, tool) => {
    const category = tool.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
  }, {});
  
  for (const [category, categoryTools] of Object.entries(toolsByCategory)) {
    const categoryPath = path.join(dataDir, `${category}.json`);
    fs.writeFileSync(categoryPath, JSON.stringify({
      category: category,
      tools: categoryTools,
      total: categoryTools.length,
      lastUpdated: new Date().toISOString()
    }, null, 2));
  }
  
  // Export summary
  const summaryPath = path.join(dataDir, 'summary.json');
  const summary = {
    totalTools: tools.length,
    categories: Object.keys(toolsByCategory),
    toolsPerCategory: Object.fromEntries(
      Object.entries(toolsByCategory).map(([cat, tools]) => [cat, tools.length])
    ),
    sources: [...new Set(tools.map(t => t.source))],
    lastUpdated: new Date().toISOString()
  };
  
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  
  console.log(`Exported ${tools.length} tools to data/ directory`);
  console.log(`Categories: ${summary.categories.join(', ')}`);
}

module.exports = { exportToolsData };
