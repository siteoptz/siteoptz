#!/usr/bin/env node

const fs = require('fs');

console.log('🔄 Fixing remaining 4 tools in Best Voice AI Tools category...\n');

// Load current dataset
const data = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));
console.log(`📊 Total tools in dataset: ${data.length}`);

// Specific tools to update
const toolsToUpdate = ['Speechify', 'Resemble-ai', 'descript', 'replica'];

let updatedCount = 0;
const updatedTools = [];

// Process each tool
for (const tool of data) {
  const toolName = tool.name?.toLowerCase();
  const currentCategory = tool.overview?.category;
  
  // Check if this tool matches one of our target tools and is in the wrong category
  const isTargetTool = toolsToUpdate.some(targetName => 
    toolName === targetName.toLowerCase() || 
    toolName?.includes(targetName.toLowerCase()) ||
    targetName.toLowerCase().includes(toolName)
  );
  
  if (isTargetTool && currentCategory === 'Best Voice AI Tools') {
    tool.overview.category = 'Voice AI';
    
    console.log(`✅ Updated: "${tool.name}" from "Best Voice AI Tools" to "Voice AI"`);
    updatedTools.push({
      name: tool.name,
      from: currentCategory,
      to: 'Voice AI'
    });
    updatedCount++;
  }
}

console.log(`\n📊 Update Summary:`);
console.log(`✅ Tools updated: ${updatedCount}`);

if (updatedCount > 0) {
  console.log('\n📋 Updated tools:');
  updatedTools.forEach((tool, i) => {
    console.log(`  ${i+1}. ${tool.name}: ${tool.from} → ${tool.to}`);
  });
  
  // Save updated dataset
  fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(data, null, 2));
  
  console.log(`\n💾 Dataset updated successfully!`);
  
  // Check final counts
  const bestVoiceCount = data.filter(tool => tool.overview?.category === 'Best Voice AI Tools').length;
  const voiceAiCount = data.filter(tool => tool.overview?.category === 'Voice AI').length;
  
  console.log('\n📊 Final Voice AI category counts:');
  console.log(`  • Voice AI: ${voiceAiCount} tools`);
  console.log(`  • Best Voice AI Tools: ${bestVoiceCount} tools (should be 0)`);
    
} else {
  console.log('\n⚠️ No matching tools found to update');
  
  // Show what tools are actually in Best Voice AI Tools category
  const remainingTools = data.filter(tool => tool.overview?.category === 'Best Voice AI Tools');
  console.log(`\n🔍 Current tools in "Best Voice AI Tools" category (${remainingTools.length}):`);
  remainingTools.forEach((tool, i) => {
    console.log(`  ${i+1}. "${tool.name}" (id: ${tool.id})`);
  });
}

console.log('\n🎉 Tool update completed!');