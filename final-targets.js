#!/usr/bin/env node

/**
 * Final adjustments to reach exact target numbers
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';

function finalTargets() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('🎯 Final adjustments to reach exact targets...\n');
  
  // Need to add 2 to Content Creation (currently 14, need 16)
  // Need to add 2 to Productivity (currently 13, need 15)
  
  const finalMoves = [
    // Move 2 tools from SEO & Optimization to Content Creation
    { name: 'Gamma', from: 'SEO & Optimization', to: 'Content Creation' },
    { name: 'Jasper AI', from: 'SEO & Optimization', to: 'Content Creation' },
    
    // Move 2 tools from SEO & Optimization to Productivity  
    { name: 'Microsoft PowerPoint', from: 'SEO & Optimization', to: 'Productivity' },
    { name: 'Nyota', from: 'SEO & Optimization', to: 'Productivity' },
    
    // Add back 4 tools to SEO & Optimization to maintain 9 total
    { name: 'HubSpot AI', from: 'Email Marketing', to: 'SEO & Optimization' },
    { name: 'Mailchimp AI', from: 'Email Marketing', to: 'SEO & Optimization' },
    { name: 'ChatPDF', from: 'Research & Education', to: 'SEO & Optimization' },
    { name: 'Consensus', from: 'Research & Education', to: 'SEO & Optimization' },
    
    // Restore Email Marketing to 3 tools
    { name: 'Fyxer', from: 'Productivity', to: 'Email Marketing' },
    { name: 'Shortwave', from: 'Productivity', to: 'Email Marketing' },
    
    // Restore Research & Education to 6 tools
    { name: 'Grammarly', from: 'Productivity', to: 'Research & Education' },
    { name: 'Notion AI', from: 'Productivity', to: 'Research & Education' }
  ];
  
  // Apply moves
  finalMoves.forEach(move => {
    const tool = data.find(t => t.name === move.name);
    if (tool) {
      const oldCat = tool.overview?.category || tool.category;
      console.log(`🔀 ${tool.name}: ${oldCat} → ${move.to}`);
      
      if (tool.overview) tool.overview.category = move.to;
      if (tool.category !== undefined) tool.category = move.to;
      if (tool.schema?.category) tool.schema.category = move.to;
    }
  });
  
  // Save
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  
  // Final verification
  const counts = {};
  data.forEach(tool => {
    const cat = tool.overview?.category || tool.category || 'Unknown';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  
  console.log('\n🎉 FINAL TARGET RESULTS:');
  
  const targets = {
    'Content Creation': 16,
    'Productivity': 15,
    'Voice': 10,
    'SEO & Optimization': 9,
    'Image Generation': 8,
    'Code Generation': 7,
    'Data Analysis': 6,
    'Research & Education': 6,
    'Video Generation': 6,
    'AI Automation': 4,
    'Email Marketing': 3
  };
  
  let allMatch = true;
  Object.entries(targets).forEach(([cat, target]) => {
    const actual = counts[cat] || 0;
    const status = actual === target ? '✅' : '❌';
    if (actual !== target) allMatch = false;
    console.log(`   ${status} ${cat}: ${actual}/${target}`);
  });
  
  console.log(`\n📈 Total: ${Object.values(counts).reduce((sum, c) => sum + c, 0)} tools`);
  
  if (allMatch) {
    console.log('\n🎉 SUCCESS! All categories match exact targets!');
  } else {
    console.log('\n⚠️ Some adjustments still needed');
  }
}

finalTargets();