#!/usr/bin/env node

/**
 * Final adjustments to reach exact target totals
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';
const BACKUP_FILE = 'public/data/aiToolsData-final-backup.json';

function createBackup() {
  fs.copyFileSync(TOOLS_FILE, BACKUP_FILE);
  console.log('✅ Created backup');
}

function loadAndUpdate() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('🔄 Making final adjustments...');
  
  // Specific moves to reach target totals
  const moves = [
    // Move Rytr from Social Media back to Content Creation
    { name: 'Rytr', to: 'Content Creation', reason: 'Content creation tool' },
    // Move one more tool to reach Productivity: 18
    { name: 'Reclaim AI', to: 'Productivity', reason: 'Productivity/calendar tool' },
  ];
  
  let moveCount = 0;
  
  moves.forEach(move => {
    const tool = data.find(t => t.name === move.name);
    if (tool) {
      const oldCategory = tool.overview?.category || tool.category;
      if (oldCategory !== move.to) {
        console.log(`🔀 ${move.name}: ${oldCategory} → ${move.to} (${move.reason})`);
        
        if (tool.category !== undefined) {
          tool.category = move.to;
        }
        if (tool.overview?.category) {
          tool.overview.category = move.to;
        }
        if (tool.schema?.category) {
          tool.schema.category = move.to;
        }
        
        moveCount++;
      }
    }
  });
  
  console.log(`📊 Made ${moveCount} adjustments`);
  
  // Show final distribution
  const categories = {};
  data.forEach(tool => {
    const category = tool.overview?.category || tool.category || 'Unknown';
    categories[category] = (categories[category] || 0) + 1;
  });
  
  console.log('\n📊 Final Distribution:');
  Object.entries(categories)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count} tools`);
    });
  
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  console.log('\n✅ Final adjustments complete!');
}

createBackup();
loadAndUpdate();