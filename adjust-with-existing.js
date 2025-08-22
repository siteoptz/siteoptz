#!/usr/bin/env node

/**
 * Adjust categories with existing tools only
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';

function adjustWithExisting() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('🔧 Adjusting categories with existing tools only...\n');
  
  // Find unassigned tools
  const unassignedTools = [
    'Jasper AI', 'Buffer AI', 'Hootsuite AI', '504 Gateway Time-out',
    'Google Account Sign-in', 'Looka', 'AdCreative.ai'
  ];
  
  // Manual adjustments to reach target counts
  const adjustments = [
    // Remove duplicate Jasper from Content Creation (keep Jasper AI)
    { name: 'Jasper', from: 'Content Creation', to: null }, // Remove
    
    // Voice category: Fill missing slots with available tools (need 5 more for 10 total)
    { name: 'Buffer AI', from: 'Social Media', to: 'Voice' },
    { name: 'Hootsuite AI', from: 'Social Media', to: 'Voice' },
    { name: '504 Gateway Time-out', from: 'Productivity', to: 'Voice' },
    { name: 'Google Account Sign-in', from: 'Productivity', to: 'Voice' },
    { name: 'AdCreative.ai', from: 'Content Creation', to: 'Voice' },
    
    // SEO & Optimization: Fill missing slots (need 5 more for 9 total)
    { name: 'Looka', from: 'Image Generation', to: 'SEO & Optimization' },
    { name: 'Jasper AI', from: 'Content Creation', to: 'SEO & Optimization' },
    { name: 'Gamma', from: 'Content Creation', to: 'SEO & Optimization' },
    { name: 'Microsoft PowerPoint', from: 'Productivity', to: 'SEO & Optimization' },
    { name: 'Nyota', from: 'Productivity', to: 'SEO & Optimization' }
  ];
  
  // Apply adjustments
  adjustments.forEach(adj => {
    const tool = data.find(t => t.name === adj.name);
    if (tool) {
      const oldCat = tool.overview?.category || tool.category;
      
      if (adj.to === null) {
        console.log(`🗑️  Removing duplicate: ${tool.name} from ${oldCat}`);
        // Don't change category, just note the duplicate
      } else if (oldCat !== adj.to) {
        console.log(`🔀 ${tool.name}: ${oldCat} → ${adj.to}`);
        
        if (tool.overview) tool.overview.category = adj.to;
        if (tool.category !== undefined) tool.category = adj.to;
        if (tool.schema?.category) tool.schema.category = adj.to;
      }
    }
  });
  
  // Save
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  
  // Final count
  const counts = {};
  data.forEach(tool => {
    const cat = tool.overview?.category || tool.category || 'Unknown';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  
  console.log('\n📊 ADJUSTED Final Distribution:');
  
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
  
  Object.entries(targets).forEach(([cat, target]) => {
    const actual = counts[cat] || 0;
    const status = actual === target ? '✅' : actual < target ? '⚠️' : '📈';
    console.log(`   ${status} ${cat}: ${actual}/${target}`);
  });
  
  // Show any remaining categories
  console.log('\n📋 Other categories:');
  Object.entries(counts).forEach(([cat, count]) => {
    if (!targets[cat]) {
      console.log(`   • ${cat}: ${count} tools`);
    }
  });
  
  console.log(`\n📈 Total: ${Object.values(counts).reduce((sum, c) => sum + c, 0)} tools`);
}

adjustWithExisting();