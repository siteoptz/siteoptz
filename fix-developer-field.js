#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load the data
const dataPath = path.join(__dirname, 'public/data/aiToolsData.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('🔍 Checking for missing developer fields...\n');
console.log(`Total tools: ${data.length}`);

// Find tools missing developer field
let missingCount = 0;
let fixedCount = 0;

// Fix tools
const fixedData = data.map(tool => {
  // Ensure overview exists
  if (!tool.overview) {
    tool.overview = {};
    missingCount++;
  }
  
  // Ensure developer field exists
  if (!tool.overview.developer) {
    missingCount++;
    // Try to extract from name or use a default
    if (tool.name) {
      // For tools added from discovery, use "Unknown" or extract from name if possible
      tool.overview.developer = tool.developer || 'Unknown';
    } else {
      tool.overview.developer = 'Unknown';
    }
    fixedCount++;
  }
  
  // Ensure other required overview fields
  if (!tool.overview.release_year) {
    tool.overview.release_year = 2024;
  }
  
  if (!tool.overview.description) {
    tool.overview.description = tool.description || `${tool.name} - AI-powered tool`;
  }
  
  if (!tool.overview.category) {
    tool.overview.category = tool.category || 'AI Tools';
  }
  
  return tool;
});

console.log(`\n📊 Results:`);
console.log(`  • Tools missing developer: ${missingCount}`);
console.log(`  • Tools fixed: ${fixedCount}`);

// Save backup
const backupPath = dataPath.replace('.json', `-backup-${Date.now()}.json`);
fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
console.log(`\n💾 Backup saved: ${path.basename(backupPath)}`);

// Save fixed data
fs.writeFileSync(dataPath, JSON.stringify(fixedData, null, 2));
console.log(`✅ Database updated with developer field fixes`);

// Show sample of fixed tools
console.log('\n📋 Sample of fixed tools:');
fixedData.slice(0, 5).forEach(tool => {
  console.log(`  • ${tool.name}: developer = "${tool.overview.developer}"`);
});