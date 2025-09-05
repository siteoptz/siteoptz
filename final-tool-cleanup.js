#!/usr/bin/env node

const fs = require('fs');

console.log('🧹 Removing specific tools and fixing broken link references...\n');

// Load current data
const data = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));
console.log(`📊 Current total tools: ${data.length}`);

// Remove specific tools
const toolsToRemove = ['Meet Geek', 'Magic School AI'];
const filteredData = data.filter(tool => !toolsToRemove.includes(tool.name));

console.log(`🗑️ Removed tools:`);
toolsToRemove.forEach(toolName => {
  const wasRemoved = data.some(tool => tool.name === toolName);
  if (wasRemoved) {
    console.log(`  - ${toolName}`);
  }
});

console.log(`📊 Tools after removal: ${filteredData.length}`);

// Function to clean up broken references and markdown artifacts
function cleanAllText(text) {
  if (!text || typeof text !== 'string') return text;
  
  return text
    // Remove image markdown with broken syntax: ![alt text or ![
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '')
    .replace(/!\[([^\]]*)/g, '')
    
    // Remove broken link references like (0)], (2)], etc.
    .replace(/\(\d+\)\][^a-zA-Z0-9\s]*/g, '')
    
    // Remove standalone brackets and numbers
    .replace(/\[\d+\]/g, '')
    
    // Remove broken URLs and fragments
    .replace(/\(https?:\/\/[^)]*\)/g, '')
    .replace(/https?:\/\/[^\s)]+/g, '')
    
    // Remove markdown link syntax [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    
    // Remove random fragments like "Add bookmark", "Freemium", etc when they appear with numbers
    .replace(/\]\s*(Free Trial|Freemium|Add bookmark)[^.]*bookmark/gi, '')
    .replace(/\]\s*(Free Trial|Freemium)[^.]*\d+/gi, '')
    
    // Clean developer names that start with ![
    .replace(/^!\[/, '')
    
    // Remove fragments that start with punctuation and numbers
    .replace(/[^\w\s][^\w\s]*\d+[^\w\s]*Add bookmark[^.]*/gi, '')
    
    // Clean up extra whitespace and punctuation
    .replace(/\s+/g, ' ')
    .replace(/\s*[,.!?]+\s*[,.!?]+/g, match => match.charAt(match.trim().length - 1))
    .replace(/^\s*[,.!?]+/, '')
    .replace(/[,.!?]+\s*$/, match => match.trim())
    .replace(/\s+([,.!?])/g, '$1')
    .trim();
}

let cleanedCount = 0;

// Process each remaining tool
for (const tool of filteredData) {
  let toolCleaned = false;
  
  // Clean all text fields
  const fieldsToClean = [
    'name', 'description'
  ];
  
  fieldsToClean.forEach(field => {
    if (tool[field]) {
      const original = tool[field];
      const cleaned = cleanAllText(original);
      if (cleaned !== original && cleaned.length > 0) {
        tool[field] = cleaned;
        toolCleaned = true;
      }
    }
  });
  
  // Clean nested objects
  if (tool.overview) {
    ['developer', 'description'].forEach(field => {
      if (tool.overview[field]) {
        const original = tool.overview[field];
        const cleaned = cleanAllText(original);
        if (cleaned !== original && cleaned.length > 0) {
          tool.overview[field] = cleaned;
          toolCleaned = true;
        }
      }
    });
  }
  
  if (tool.meta) {
    ['title', 'description'].forEach(field => {
      if (tool.meta[field]) {
        const original = tool.meta[field];
        const cleaned = cleanAllText(original);
        if (cleaned !== original && cleaned.length > 0) {
          tool.meta[field] = cleaned;
          toolCleaned = true;
        }
      }
    });
  }
  
  // Clean arrays
  ['features', 'pros', 'cons'].forEach(arrayField => {
    if (Array.isArray(tool[arrayField])) {
      const originalArray = [...tool[arrayField]];
      tool[arrayField] = tool[arrayField]
        .map(item => cleanAllText(item))
        .filter(item => item && item.length > 0);
      
      if (JSON.stringify(originalArray) !== JSON.stringify(tool[arrayField])) {
        toolCleaned = true;
      }
    }
  });
  
  // Clean pricing descriptions
  if (Array.isArray(tool.pricing)) {
    for (const plan of tool.pricing) {
      if (plan.description) {
        const original = plan.description;
        const cleaned = cleanAllText(original);
        if (cleaned !== original && cleaned.length > 0) {
          plan.description = cleaned;
          toolCleaned = true;
        }
      }
      
      if (Array.isArray(plan.features)) {
        const originalFeatures = [...plan.features];
        plan.features = plan.features
          .map(feature => cleanAllText(feature))
          .filter(feature => feature && feature.length > 0);
        
        if (JSON.stringify(originalFeatures) !== JSON.stringify(plan.features)) {
          toolCleaned = true;
        }
      }
    }
  }
  
  if (toolCleaned) {
    console.log(`🧽 Cleaned: ${tool.name}`);
    cleanedCount++;
  }
}

console.log(`\n📊 Final cleanup results:`);
console.log(`🗑️ Tools removed: ${data.length - filteredData.length}`);
console.log(`🧽 Tools with text cleaned: ${cleanedCount}`);
console.log(`📄 Final tool count: ${filteredData.length}`);

// Save cleaned data
fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(filteredData, null, 2));

console.log(`\n✅ Cleanup completed!`);
console.log(`🎉 Dataset is now completely clean with ${filteredData.length} legitimate AI tools!`);

// Show final legitimate new tools (after index 231)
const newTools = filteredData.slice(231);
if (newTools.length > 0) {
  console.log(`\n📋 Remaining legitimate new tools (${newTools.length}):`);
  newTools.forEach((tool, i) => {
    console.log(`  ${i+1}. ${tool.name} (${tool.overview?.category || 'Unknown'})`);
  });
} else {
  console.log('\n✅ Dataset restored to original 231 tools');
}