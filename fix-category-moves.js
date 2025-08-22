#!/usr/bin/env node

/**
 * Move tools to correct categories and remove duplicate Voice AI category
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';

function fixCategoryMoves() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('🔄 Moving tools to correct categories...\n');
  
  // Create backup
  const backupFile = 'public/data/aiToolsData-category-moves-backup.json';
  fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
  console.log(`📋 Backup created: ${backupFile}\n`);
  
  // Define the specific moves
  const moves = [
    { tool: 'Character.AI', to: 'Image Generation' },
    { tool: 'Stable Diffusion Web', to: 'Image Generation' },
    { tool: 'Jasper', to: 'Content Creation' },
    { tool: 'Cohere', to: 'Content Creation' },
    { tool: 'Writesonic', to: 'Content Creation' },
    { tool: 'Copy.ai', to: 'Content Creation' },
    { tool: 'Shortwave', to: 'Email Marketing' },
    { tool: 'Microsoft PowerPoint', to: 'Productivity' },
    { tool: 'Writesonic', to: 'SEO & Optimization' }, // Note: This is a duplicate - Writesonic appears twice
    { tool: 'Replicate', to: 'Code Generation' }
  ];
  
  console.log('🎯 Processing tool moves:');
  
  let movesCompleted = 0;
  let conflicts = [];
  
  // Handle the Writesonic conflict first - user specified it should go to both Content Creation and SEO & Optimization
  // Let's clarify by moving it to SEO & Optimization as that's the last instruction
  const writesonic = data.find(t => t.name === 'Writesonic');
  if (writesonic) {
    const oldCat = writesonic.overview?.category || writesonic.category;
    console.log(`🔀 Writesonic: ${oldCat} → SEO & Optimization (final destination)`);
    
    if (writesonic.overview) writesonic.overview.category = 'SEO & Optimization';
    if (writesonic.category !== undefined) writesonic.category = 'SEO & Optimization';
    if (writesonic.schema?.category) writesonic.schema.category = 'SEO & Optimization';
    movesCompleted++;
  }
  
  // Process other moves (excluding the duplicate Writesonic entries)
  const uniqueMoves = moves.filter(move => 
    !(move.tool === 'Writesonic' && (move.to === 'Content Creation' || move.to === 'SEO & Optimization'))
  );
  
  uniqueMoves.forEach(move => {
    if (move.tool === 'Writesonic') return; // Already handled
    
    const tool = data.find(t => t.name === move.tool);
    
    if (tool) {
      const oldCat = tool.overview?.category || tool.category || 'Unknown';
      console.log(`🔀 ${tool.name}: ${oldCat} → ${move.to}`);
      
      // Update category
      if (tool.overview) tool.overview.category = move.to;
      if (tool.category !== undefined) tool.category = move.to;
      if (tool.schema?.category) tool.schema.category = move.to;
      
      movesCompleted++;
    } else {
      console.log(`❌ Tool not found: ${move.tool}`);
    }
  });
  
  console.log(`\n✅ Completed ${movesCompleted} tool moves\n`);
  
  // Now check for duplicate Voice categories and remove the smaller one
  console.log('🔍 Checking for duplicate Voice categories...');
  
  const voiceTools = data.filter(tool => {
    const cat = tool.overview?.category || tool.category;
    return cat === 'Voice' || cat === 'Voice AI' || cat === 'Best Voice AI Tools';
  });
  
  console.log(`Found ${voiceTools.length} tools in Voice-related categories:`);
  
  // Group by exact category name
  const voiceGroups = {};
  voiceTools.forEach(tool => {
    const cat = tool.overview?.category || tool.category;
    if (!voiceGroups[cat]) voiceGroups[cat] = [];
    voiceGroups[cat].push(tool);
  });
  
  console.log('Voice category groups:');
  Object.entries(voiceGroups).forEach(([cat, tools]) => {
    console.log(`   ${cat}: ${tools.length} tools - ${tools.map(t => t.name).join(', ')}`);
  });
  
  // Normalize all voice tools to just 'Voice' category
  console.log('\n🔧 Normalizing all voice tools to "Voice" category:');
  voiceTools.forEach(tool => {
    const oldCat = tool.overview?.category || tool.category;
    if (oldCat !== 'Voice') {
      console.log(`   🔀 ${tool.name}: ${oldCat} → Voice`);
      
      if (tool.overview) tool.overview.category = 'Voice';
      if (tool.category !== undefined) tool.category = 'Voice';
      if (tool.schema?.category) tool.schema.category = 'Voice';
    }
  });
  
  // Save updated data
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  
  // Final verification
  const finalCounts = {};
  data.forEach(tool => {
    const cat = tool.overview?.category || tool.category || 'Unassigned';
    finalCounts[cat] = (finalCounts[cat] || 0) + 1;
  });
  
  console.log('\n📊 FINAL CATEGORY DISTRIBUTION:');
  Object.entries(finalCounts)
    .sort(([,a], [,b]) => b - a)
    .forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} tools`);
    });
  
  console.log(`\n📈 Total tools: ${Object.values(finalCounts).reduce((sum, c) => sum + c, 0)}`);
  console.log('\n🎉 Category moves and Voice deduplication completed!');
}

fixCategoryMoves();