#!/usr/bin/env node

const fs = require('fs');

console.log('🔄 Updating tool categories as requested...\n');

// Load current dataset
const data = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));
console.log(`📊 Total tools in dataset: ${data.length}`);

// Category mapping updates as requested
const categoryUpdates = {
  // Aggregators -> AI Automation
  'Aggregators': 'AI Automation',
  
  // Content Generation -> Content Creation
  'Content Generation': 'Content Creation',
  
  // Gaming -> Research & Education
  'Gaming': 'Research & Education',
  
  // Website Builder -> AI Website Builder
  'Website Builder': 'AI Website Builder',
  
  // Motion Capture -> Video Generation
  'Motion Capture': 'Video Generation',
  
  // Best Voice AI Tools -> Voice AI
  'Best Voice AI Tools': 'Voice AI'
};

let updatedCount = 0;
const updatedTools = [];

// Process each tool
for (const tool of data) {
  const currentCategory = tool.overview?.category;
  
  if (currentCategory && categoryUpdates[currentCategory]) {
    const newCategory = categoryUpdates[currentCategory];
    tool.overview.category = newCategory;
    
    console.log(`✅ Updated: "${tool.name}" from "${currentCategory}" to "${newCategory}"`);
    updatedTools.push({
      name: tool.name,
      from: currentCategory,
      to: newCategory
    });
    updatedCount++;
  }
}

console.log(`\n📊 Update Summary:`);
console.log(`✅ Tools updated: ${updatedCount}`);

if (updatedCount > 0) {
  // Group by category change
  const changeGroups = {};
  updatedTools.forEach(tool => {
    const changeKey = `${tool.from} → ${tool.to}`;
    if (!changeGroups[changeKey]) {
      changeGroups[changeKey] = [];
    }
    changeGroups[changeKey].push(tool.name);
  });
  
  console.log('\n📋 Changes by category:');
  Object.entries(changeGroups).forEach(([change, tools]) => {
    console.log(`\n🔄 ${change}:`);
    tools.forEach((toolName, i) => {
      console.log(`  ${i+1}. ${toolName}`);
    });
  });
  
  // Save updated dataset
  fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(data, null, 2));
  
  console.log(`\n💾 Dataset updated successfully!`);
  
  // Show final category distribution
  const categoryDistribution = {};
  data.forEach(tool => {
    const category = tool.overview?.category || 'Unknown';
    categoryDistribution[category] = (categoryDistribution[category] || 0) + 1;
  });
  
  console.log('\n📊 Updated category distribution:');
  Object.entries(categoryDistribution)
    .filter(([category]) => 
      category === 'AI Automation' || 
      category === 'Content Creation' ||
      category === 'Research & Education' ||
      category === 'AI Website Builder' ||
      category === 'Video Generation' ||
      category === 'Voice AI' ||
      // Show old categories too if they still exist
      category === 'Aggregators' ||
      category === 'Content Generation' ||
      category === 'Gaming' ||
      category === 'Website Builder' ||
      category === 'Motion Capture' ||
      category === 'Best Voice AI Tools'
    )
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`  • ${category}: ${count} tools`);
    });
    
} else {
  console.log('\n⚠️ No tools found matching the specified categories to update');
}

console.log('\n🎉 Category update completed!');