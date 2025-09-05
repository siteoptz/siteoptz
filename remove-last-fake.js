#!/usr/bin/env node

const fs = require('fs');

// Load current data
const data = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));
console.log(`📊 Current total tools: ${data.length}`);

// Remove the last fake tool
const cleanData = data.filter(tool => tool.name !== "Your AI Journey  Starts Here");

console.log(`🗑️ Removed: "Your AI Journey  Starts Here"`);
console.log(`📊 Final tool count: ${cleanData.length}`);

// Save the completely cleaned data
fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(cleanData, null, 2));

console.log('✅ Dataset completely cleaned!');

// Show final legitimate new tools (after index 231)
const newTools = cleanData.slice(231);
if (newTools.length > 0) {
  console.log(`\n📋 Final legitimate new tools (${newTools.length}):`);
  newTools.forEach((tool, i) => {
    console.log(`  ${i+1}. ${tool.name} (${tool.overview?.category || 'Unknown'})`);
  });
} else {
  console.log('\n✅ Dataset restored to original 231 legitimate tools');
}