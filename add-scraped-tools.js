#!/usr/bin/env node

const fs = require('fs');

console.log('🔄 Adding cleaned scraped tools to main dataset...\n');

// Load scraped data
const scrapedData = JSON.parse(fs.readFileSync('/Users/siteoptz/siteoptz/scraping/data/scraped/real-ai-tools.json', 'utf8'));
const mainData = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));

console.log(`📊 Original scraped tools: ${scrapedData.tools.length}`);
console.log(`📊 Current main dataset: ${mainData.length}`);

// Filter and clean scraped tools
const validTools = scrapedData.tools.filter(tool => {
  const name = tool.name.toLowerCase();
  
  // Filter out invalid/generic names
  if (name.length < 3 || name.length > 40) return false;
  if (name.includes('everything your business needs')) return false;
  if (name.includes('all in one place')) return false;
  if (name.includes('directory')) return false;
  if (name.includes('browse')) return false;
  if (name.includes('explore')) return false;
  if (name.includes('discover')) return false;
  if (name.includes('view all')) return false;
  if (name.includes('best tools')) return false;
  if (name.includes('top tools')) return false;
  if (name.includes('ai tools')) return false;
  if (name === 'new' || name === 'popular' || name === 'trending') return false;
  if (name.includes('login') || name.includes('sign up')) return false;
  if (tool.name.split(' ').length > 6) return false; // Too many words
  
  return true;
});

console.log(`✅ Valid tools after filtering: ${validTools.length}`);

// Clean up tool names and ensure quality
const cleanedTools = validTools.map(tool => ({
  ...tool,
  name: tool.name.trim().replace(/^[^\w]*/, '').replace(/[^\w]*$/, ''),
  id: tool.id.replace(/[^a-z0-9\-]/g, '').substring(0, 50),
  slug: tool.slug.replace(/[^a-z0-9\-]/g, '').substring(0, 50)
}));

// Remove potential duplicates with existing tools
const existingNames = new Set(mainData.map(t => t.name.toLowerCase()));
const newTools = cleanedTools.filter(tool => 
  !existingNames.has(tool.name.toLowerCase())
);

console.log(`🔍 Removed ${cleanedTools.length - newTools.length} potential duplicates`);
console.log(`➕ New unique tools to add: ${newTools.length}`);

// Show sample of tools being added
console.log('\n📋 Sample of tools being added:');
newTools.slice(0, 15).forEach((tool, i) => {
  console.log(`  ${i+1}. ${tool.name} (${tool.overview.category})`);
});

// Show category breakdown
const categories = {};
newTools.forEach(tool => {
  const cat = tool.overview.category;
  categories[cat] = (categories[cat] || 0) + 1;
});

console.log('\n📊 New tools by category:');
Object.entries(categories)
  .sort(([,a], [,b]) => b - a)
  .forEach(([category, count]) => {
    console.log(`  • ${category}: ${count} tools`);
  });

// Add to main dataset
const finalData = [...mainData, ...newTools];
fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(finalData, null, 2));

console.log(`\n✅ Successfully updated aiToolsData.json`);
console.log(`📊 Final dataset size: ${finalData.length} tools`);
console.log(`➕ Added: ${newTools.length} new legitimate AI tools`);
console.log('\n🎉 Scraped tools integration completed!');