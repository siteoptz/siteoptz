import fs from 'fs';

// Remove specific tools from aiToolsData.json
function removeSpecificTools() {
  const toolsToRemove = ['AdCreative', 'Surfer', 'WellSaid'];
  
  try {
    const data = fs.readFileSync('public/data/aiToolsData.json', 'utf8');
    const tools = JSON.parse(data);
    
    console.log(`📊 Original tool count: ${tools.length}`);
    
    const filteredTools = tools.filter(tool => !toolsToRemove.includes(tool.name));
    
    console.log(`📊 After removal: ${filteredTools.length}`);
    console.log(`🗑️ Removed: ${tools.length - filteredTools.length} tools`);
    
    toolsToRemove.forEach(name => {
      const removed = tools.find(tool => tool.name === name);
      if (removed) {
        console.log(`   ✅ Removed: ${name}`);
      } else {
        console.log(`   ⚠️ Not found: ${name}`);
      }
    });
    
    fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(filteredTools, null, 2));
    console.log('\n✅ Successfully updated aiToolsData.json');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

removeSpecificTools();