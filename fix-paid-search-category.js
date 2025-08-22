const fs = require('fs');

console.log('Fixing Paid Search category name mismatch...\n');

const toolsData = JSON.parse(fs.readFileSync('./public/data/aiToolsData.json', 'utf8'));

// Find all tools with "Paid Search" category and update to "Paid Search & PPC"
let updatedCount = 0;
const updatedTools = [];

toolsData.forEach((tool, index) => {
  if (tool.overview?.category === 'Paid Search') {
    console.log(`Updating tool: ${tool.name || tool.id}`);
    console.log(`  Old category: ${tool.overview.category}`);
    tool.overview.category = 'Paid Search & PPC';
    console.log(`  New category: ${tool.overview.category}`);
    updatedCount++;
    updatedTools.push(tool.name || tool.id);
  }
});

if (updatedCount > 0) {
  // Save the updated data
  fs.writeFileSync('./public/data/aiToolsData.json', JSON.stringify(toolsData, null, 2));
  console.log(`\n✅ Updated ${updatedCount} tools from "Paid Search" to "Paid Search & PPC"`);
  console.log('Updated tools:', updatedTools.join(', '));
} else {
  console.log('❌ No tools found with "Paid Search" category');
}

// Also check for any other category mismatches
console.log('\n=== Category Alignment Check ===');

// Load categories from config
const configContent = fs.readFileSync('./config/categories.ts', 'utf8');
const configCategories = configContent.match(/'([^']+)'/g)?.map(m => m.replace(/'/g, '')) || [];

// Get actual categories from tools
const actualCategories = [...new Set(toolsData.map(t => t.overview?.category).filter(c => c && c !== 'Other'))];

console.log('\nCategories in config:');
configCategories.forEach(cat => {
  const toolCount = toolsData.filter(t => t.overview?.category === cat).length;
  console.log(`  "${cat}": ${toolCount} tools`);
});

console.log('\nCategories in data not in config:');
actualCategories.forEach(cat => {
  if (!configCategories.includes(cat) && cat !== 'Other') {
    const toolCount = toolsData.filter(t => t.overview?.category === cat).length;
    console.log(`  "${cat}": ${toolCount} tools`);
  }
});