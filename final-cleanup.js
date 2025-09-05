#!/usr/bin/env node

const fs = require('fs');

console.log('🧽 Final cleanup of remaining fake tools...\n');

// Load current data
const data = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));
console.log(`📊 Current total tools: ${data.length}`);

// Additional fake patterns that slipped through
const finalFakePatterns = [
  'skip to content',
  'choose your path', 
  'as seen in',
  'your ai journey starts here',
  'from beginner to ai expert',
  'text to image', // Generic description, not tool name
  'image generators', // Generic category
  'code assistant', // Generic description
  'text to speech', // Generic description
  'social media', // Generic category
  'design generators', // Generic category
  'generative code', // Generic description
  'generative art', // Generic description
  'image analysis', // Generic description
  'text-to-image', // Generic description
  'text-to-speech' // Generic description
];

// Function to check if tool should be removed in final cleanup
function isFinalFakeTool(tool) {
  const name = tool.name.toLowerCase().trim();
  
  // Check against additional fake patterns
  if (finalFakePatterns.some(pattern => name.includes(pattern))) {
    return true;
  }
  
  // Additional checks for remaining generic terms
  if (name.match(/^(text|image|video|code|social|design|generative)\s+(to\s+)?(image|video|text|speech|code|media|generators?|art|analysis)$/i)) {
    return true;
  }
  
  // Remove very generic single/double word tools that are categories
  if (name.match(/^(text|image|video|code|social|design|art|media|generators?|analysis)$/i)) {
    return true;
  }
  
  return false;
}

// Clean the data
const cleanedData = data.filter(tool => {
  const shouldRemove = isFinalFakeTool(tool);
  if (shouldRemove) {
    console.log(`🗑️ Final removal: "${tool.name}"`);
  }
  return !shouldRemove;
});

console.log(`\n📊 Final cleanup results:`);
console.log(`✅ Tools kept: ${cleanedData.length}`);
console.log(`🗑️ Additional fake tools removed: ${data.length - cleanedData.length}`);

// Save final cleaned data
fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(cleanedData, null, 2));

console.log(`\n✅ Final cleanup completed!`);
console.log(`📊 Final dataset: ${cleanedData.length} legitimate AI tools`);

// Show remaining new tools (after index 231)
const newTools = cleanedData.slice(231);
if (newTools.length > 0) {
  console.log(`\n📋 Remaining legitimate new tools (${newTools.length}):`);
  newTools.forEach((tool, i) => {
    console.log(`  ${i+1}. ${tool.name} (${tool.overview?.category || 'Unknown'})`);
  });
} else {
  console.log('\n✅ All fake tools removed - dataset restored to original 231 legitimate tools');
}

console.log('\n🎉 Dataset is now completely clean!');