#!/usr/bin/env node

/**
 * Final moves to reach exact user-specified targets
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';

function makeTargetMoves() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('🎯 Making final moves to reach exact targets...');
  
  // Moves to reach exact targets
  const finalMoves = [
    // Need Content Creation: 18 (currently 15, +3 needed)
    { name: 'Gamma', to: 'Content Creation', reason: 'Presentation/content creation tool' },
    { name: 'AdCreative.ai', to: 'Content Creation', reason: 'Creative content generation' },
    { name: 'Buffer AI', to: 'Content Creation', reason: 'Content creation and scheduling' },
    
    // Need Productivity: 18 (currently 17, +1 needed)  
    { name: 'Hootsuite AI', to: 'Productivity', reason: 'Social media productivity tool' }
  ];
  
  finalMoves.forEach(move => {
    const tool = data.find(t => t.name === move.name);
    if (tool) {
      const oldCategory = tool.overview?.category || tool.category;
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
    }
  });
  
  // Show final result
  const categories = {};
  data.forEach(tool => {
    const category = tool.overview?.category || tool.category || 'Unknown';
    categories[category] = (categories[category] || 0) + 1;
  });
  
  console.log('\n🎉 FINAL RESULTS:');
  [
    'Content Creation',
    'Productivity', 
    'Email Marketing',
    'Code Generation',
    'AI Automation',
    'Image Generation'
  ].forEach(cat => {
    const count = categories[cat] || 0;
    console.log(`   ✅ ${cat}: ${count} tools`);
  });
  
  console.log('\n📊 All Categories:');
  Object.entries(categories)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count} tools`);
    });
  
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  console.log('\n✅ Reached target totals!');
}

makeTargetMoves();