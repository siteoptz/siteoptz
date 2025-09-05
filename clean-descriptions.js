#!/usr/bin/env node

const fs = require('fs');

console.log('🧹 Cleaning up tool descriptions with markdown artifacts...\n');

// Load current data
const data = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));
console.log(`📊 Total tools to check: ${data.length}`);

let cleanedCount = 0;

// Function to clean description text
function cleanDescription(text) {
  if (!text || typeof text !== 'string') return text;
  
  let cleaned = text
    // Remove image markdown syntax: ![alt text](url)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '')
    
    // Remove standalone links in parentheses: (https://...)
    .replace(/\(https?:\/\/[^)]+\)/g, '')
    
    // Remove standalone links in parentheses: (http://...)  
    .replace(/\(http:\/\/[^)]+\)/g, '')
    
    // Remove markdown links that are just URLs: [text](url) -> text
    .replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, '$1')
    
    // Remove numbered link references like (0)](https://...) or (2)](https://...)
    .replace(/\(\d+\)\]\(https?:\/\/[^)]*\)/g, '')
    
    // Remove standalone URLs that aren't needed
    .replace(/\bhttps?:\/\/[^\s)]+/g, '')
    
    // Clean up extra whitespace and punctuation
    .replace(/\s+/g, ' ')
    .replace(/\s*,\s*,/g, ',')
    .replace(/\s*\.\s*\./g, '.')
    .replace(/\s+([,.!?])/g, '$1')
    .trim();
    
  return cleaned;
}

// Process each tool
for (const tool of data) {
  let toolCleaned = false;
  
  // Clean main description
  if (tool.description) {
    const original = tool.description;
    const cleaned = cleanDescription(original);
    if (cleaned !== original && cleaned.length > 0) {
      tool.description = cleaned;
      toolCleaned = true;
    }
  }
  
  // Clean overview description
  if (tool.overview?.description) {
    const original = tool.overview.description;
    const cleaned = cleanDescription(original);
    if (cleaned !== original && cleaned.length > 0) {
      tool.overview.description = cleaned;
      toolCleaned = true;
    }
  }
  
  // Clean meta description
  if (tool.meta?.description) {
    const original = tool.meta.description;
    const cleaned = cleanDescription(original);
    if (cleaned !== original && cleaned.length > 0) {
      tool.meta.description = cleaned;
      toolCleaned = true;
    }
  }
  
  // Clean features array
  if (Array.isArray(tool.features)) {
    tool.features = tool.features.map(feature => {
      const cleaned = cleanDescription(feature);
      if (cleaned !== feature && cleaned.length > 0) {
        toolCleaned = true;
        return cleaned;
      }
      return feature;
    }).filter(feature => feature && feature.length > 0);
  }
  
  // Clean pros array
  if (Array.isArray(tool.pros)) {
    tool.pros = tool.pros.map(pro => {
      const cleaned = cleanDescription(pro);
      if (cleaned !== pro && cleaned.length > 0) {
        toolCleaned = true;
        return cleaned;
      }
      return pro;
    }).filter(pro => pro && pro.length > 0);
  }
  
  // Clean cons array
  if (Array.isArray(tool.cons)) {
    tool.cons = tool.cons.map(con => {
      const cleaned = cleanDescription(con);
      if (cleaned !== con && cleaned.length > 0) {
        toolCleaned = true;
        return cleaned;
      }
      return con;
    }).filter(con => con && con.length > 0);
  }
  
  // Clean pricing descriptions
  if (Array.isArray(tool.pricing)) {
    for (const plan of tool.pricing) {
      if (plan.description) {
        const original = plan.description;
        const cleaned = cleanDescription(original);
        if (cleaned !== original && cleaned.length > 0) {
          plan.description = cleaned;
          toolCleaned = true;
        }
      }
      
      // Clean feature descriptions in pricing
      if (Array.isArray(plan.features)) {
        plan.features = plan.features.map(feature => {
          const cleaned = cleanDescription(feature);
          if (cleaned !== feature && cleaned.length > 0) {
            toolCleaned = true;
            return cleaned;
          }
          return feature;
        }).filter(feature => feature && feature.length > 0);
      }
    }
  }
  
  if (toolCleaned) {
    console.log(`🧽 Cleaned: ${tool.name}`);
    cleanedCount++;
  }
}

console.log(`\n📊 Cleanup results:`);
console.log(`✅ Tools cleaned: ${cleanedCount}`);
console.log(`📄 Tools unchanged: ${data.length - cleanedCount}`);

// Save cleaned data
fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(data, null, 2));

console.log(`\n✅ Description cleanup completed!`);
console.log(`🎉 Dataset is now free of markdown artifacts and broken links!`);