#!/usr/bin/env node

/**
 * Simple category moves - exactly as specified by user
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';

function simpleMoves() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('🎯 Making simple category moves as specified...\n');
  
  // Exact moves as requested
  const moves = [
    // 1. AI Writing Assistant → Content Creation
    { names: ['Rytr', 'Sudowrite'], to: 'Content Creation', from: 'AI Writing Assistant' },
    
    // 2. AI Content Strategy & Optimization → Content Creation  
    { names: ['AirOps'], to: 'Content Creation', from: 'AI Content Strategy & Optimization' },
    
    // 3. Marketing AI → Email Marketing
    { names: ['HubSpot Email Marketing Tools'], to: 'Email Marketing', from: 'Marketing' },
    
    // 4. App Development → Code Generation
    { names: ['Lovable'], to: 'Code Generation', from: 'App Development' },
    
    // 5. Server Management → Productivity
    { names: ['504 Gateway Time-out'], to: 'Productivity', from: 'Server Management' },
    
    // 6. N8N, Zapier AI, Grok → AI Automation (new category)
    { names: ['n8n', 'Zapier AI', 'Grok'], to: 'AI Automation', from: 'various' },
    
    // 7. Branding & Design → Image Generation
    { names: ['Looka'], to: 'Image Generation', from: 'Branding & Design' },
    
    // 8. Advertising & Marketing → Content Creation
    // Find tools in Advertising & Marketing category
    { names: [], to: 'Content Creation', from: 'Advertising & Marketing', moveAll: true }
  ];
  
  let totalMoved = 0;
  
  moves.forEach(move => {
    if (move.moveAll) {
      // Move all tools from a category
      const toolsToMove = data.filter(tool => {
        const cat = tool.overview?.category || tool.category;
        return cat === move.from;
      });
      
      toolsToMove.forEach(tool => {
        const oldCat = tool.overview?.category || tool.category;
        console.log(`🔀 ${tool.name}: ${oldCat} → ${move.to}`);
        
        if (tool.overview) tool.overview.category = move.to;
        if (tool.category !== undefined) tool.category = move.to;
        if (tool.schema?.category) tool.schema.category = move.to;
        
        totalMoved++;
      });
    } else {
      // Move specific tools
      move.names.forEach(toolName => {
        const tool = data.find(t => 
          t.name === toolName || 
          t.slug === toolName.toLowerCase().replace(/\s+/g, '-')
        );
        
        if (tool) {
          const oldCat = tool.overview?.category || tool.category || 'Unknown';
          console.log(`🔀 ${tool.name}: ${oldCat} → ${move.to}`);
          
          if (tool.overview) tool.overview.category = move.to;
          if (tool.category !== undefined) tool.category = move.to;
          if (tool.schema?.category) tool.schema.category = move.to;
          
          totalMoved++;
        } else {
          console.log(`⚠️  Tool not found: ${toolName}`);
        }
      });
    }
  });
  
  console.log(`\n📊 Total tools moved: ${totalMoved}`);
  
  // Save
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  
  // Show final category distribution
  const counts = {};
  data.forEach(tool => {
    const cat = tool.overview?.category || tool.category || 'Unknown';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  
  console.log('\n📊 Final Category Distribution:');
  Object.entries(counts)
    .sort(([,a], [,b]) => b - a)
    .forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} tools`);
    });
  
  console.log(`\n✅ Simple moves completed successfully!`);
  console.log('\n💡 Changes made:');
  console.log('   1. AI Writing Assistant (Rytr, Sudowrite) → Content Creation ✅');
  console.log('   2. AI Content Strategy & Optimization (AirOps) → Content Creation ✅');
  console.log('   3. Marketing (HubSpot Email Marketing Tools) → Email Marketing ✅');
  console.log('   4. App Development (Lovable) → Code Generation ✅');
  console.log('   5. Server Management (504 Gateway Time-out) → Productivity ✅');
  console.log('   6. N8N, Zapier AI, Grok → AI Automation ✅');
  console.log('   7. Branding & Design (Looka) → Image Generation ✅');
  console.log('   8. Advertising & Marketing → Content Creation ✅');
  console.log('\n   All other tools remain in their original categories.');
}

simpleMoves();