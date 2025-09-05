#!/usr/bin/env node

const fs = require('fs');

console.log('🔄 Adding B12 tools to main dataset with duplicate removal...\n');

// Load current main dataset
const mainData = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));
console.log(`📊 Current main dataset: ${mainData.length} tools`);

// Load filtered B12 tools
const b12Data = JSON.parse(fs.readFileSync('scraping/data/b12/filtered-tools.json', 'utf8'));
const b12Tools = b12Data.tools;
console.log(`📊 B12 filtered tools: ${b12Tools.length} tools`);

// Final quality filter for B12 tools
function isFinalLegitimate(tool) {
  const name = tool.name.toLowerCase().trim();
  
  // Remove obviously generic tools that slipped through
  const stillFakePatterns = [
    /find.*right.*ai.*tool/,
    /search.*filter.*ai.*tool/,
    /ai.*tool.*search/,
    /directory.*ai.*tool/,
    /browse.*ai.*tool/,
    /discover.*ai.*tool/,
    /explore.*ai.*tool/,
    /all.*categories/,
    /filter.*categories/,
    /search.*categories/
  ];
  
  if (stillFakePatterns.some(pattern => pattern.test(name))) {
    return false;
  }
  
  // Must have a clear, specific tool name
  if (name.split(' ').length > 6) return false;
  if (name.includes('for your') || name.includes('for you')) return false;
  if (name.includes('all-in-one') && name.split(' ').length <= 3) return false;
  
  return true;
}

// Apply final filter
const finalB12Tools = b12Tools.filter(tool => {
  const isLegit = isFinalLegitimate(tool);
  if (!isLegit) {
    console.log(`🗑️ Final filter removing: "${tool.name}"`);
  }
  return isLegit;
});

console.log(`✅ Final legitimate B12 tools: ${finalB12Tools.length}`);

// Create sets of existing tool names for duplicate detection
const existingNames = new Set(mainData.map(tool => tool.name.toLowerCase().trim()));
const existingSlugs = new Set(mainData.map(tool => tool.slug.toLowerCase().trim()));

console.log('\n🔍 Checking for duplicates...');

// Filter out duplicates
const uniqueB12Tools = finalB12Tools.filter(tool => {
  const name = tool.name.toLowerCase().trim();
  const slug = tool.slug.toLowerCase().trim();
  
  if (existingNames.has(name)) {
    console.log(`🔄 Duplicate name found: "${tool.name}" - skipping`);
    return false;
  }
  
  if (existingSlugs.has(slug)) {
    console.log(`🔄 Duplicate slug found: "${tool.slug}" - skipping`);
    return false;
  }
  
  // Also check for similar names (fuzzy matching)
  const similarName = Array.from(existingNames).find(existingName => {
    const similarity = calculateSimilarity(name, existingName);
    return similarity > 0.85; // 85% similarity threshold
  });
  
  if (similarName) {
    console.log(`🔄 Similar name found: "${tool.name}" ~ "${similarName}" - skipping`);
    return false;
  }
  
  console.log(`✅ Adding new tool: "${tool.name}"`);
  return true;
});

// Function to calculate string similarity
function calculateSimilarity(str1, str2) {
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return 1;
  
  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLen;
}

// Levenshtein distance function
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

console.log(`\n📊 Duplicate removal results:`);
console.log(`✅ Unique new tools to add: ${uniqueB12Tools.length}`);
console.log(`🔄 Duplicates removed: ${finalB12Tools.length - uniqueB12Tools.length}`);

if (uniqueB12Tools.length > 0) {
  // Show new tools being added
  console.log('\n📋 New tools being added:');
  uniqueB12Tools.forEach((tool, i) => {
    console.log(`  ${i+1}. ${tool.name} (${tool.overview.category})`);
  });
  
  // Show category distribution
  const categories = {};
  uniqueB12Tools.forEach(tool => {
    const cat = tool.overview.category;
    categories[cat] = (categories[cat] || 0) + 1;
  });
  
  console.log('\n📊 Category distribution of new tools:');
  Object.entries(categories)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`  • ${category}: ${count} tools`);
    });
  
  // Combine datasets
  const finalData = [...mainData, ...uniqueB12Tools];
  
  // Save updated dataset
  fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(finalData, null, 2));
  
  console.log(`\n✅ Successfully updated aiToolsData.json`);
  console.log(`📊 Final dataset size: ${finalData.length} tools`);
  console.log(`➕ Added: ${uniqueB12Tools.length} new legitimate AI tools from B12`);
  
} else {
  console.log('\n⚠️ No new unique tools to add - all were duplicates or filtered out');
}

console.log('\n🎉 B12 tools integration completed!');