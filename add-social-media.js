#!/usr/bin/env node

/**
 * Add Social Media category with specified 8 tools
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';

function addSocialMedia() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('📱 Adding Social Media category with 8 specified tools...\n');
  
  // The 8 tools specified for Social Media
  const socialMediaTools = [
    'Planable', 'Loomly', 'Sendible', 'SociaPilot', 'Social Champ',
    'Buffer AI', 'Content Studio', 'Hootsuite AI'
  ];
  
  let foundCount = 0;
  let notFoundTools = [];
  
  // Assign each tool to Social Media category
  socialMediaTools.forEach(toolName => {
    // Handle variations in naming
    const tool = data.find(t => 
      t.name === toolName ||
      t.name.toLowerCase() === toolName.toLowerCase() ||
      // Special cases
      (toolName === 'SociaPilot' && t.name === 'Social Pilot') ||
      (toolName === 'Social Champ' && t.name === 'SocialChamp') ||
      (toolName === 'Content Studio' && t.name === 'ContentStudio')
    );
    
    if (tool) {
      const oldCat = tool.overview?.category || tool.category || 'Unknown';
      console.log(`🔀 ${tool.name}: ${oldCat} → Social Media`);
      
      // Update category
      if (tool.overview) tool.overview.category = 'Social Media';
      if (tool.category !== undefined) tool.category = 'Social Media';
      if (tool.schema?.category) tool.schema.category = 'Social Media';
      
      foundCount++;
    } else {
      notFoundTools.push(toolName);
      console.log(`❌ Not found: ${toolName}`);
    }
  });
  
  console.log(`\n📊 Found ${foundCount} out of 8 Social Media tools`);
  
  if (notFoundTools.length > 0) {
    console.log(`\n⚠️ Tools not found in database:`);
    notFoundTools.forEach(tool => console.log(`   • ${tool}`));
    console.log(`\nNote: These tools may need to be added to the database first.`);
  }
  
  // Save
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  
  // Show updated counts
  const counts = {};
  data.forEach(tool => {
    const cat = tool.overview?.category || tool.category || 'Unknown';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  
  console.log('\n📊 Updated Category Distribution:');
  Object.entries(counts)
    .sort(([,a], [,b]) => b - a)
    .forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} tools`);
    });
  
  // Show final targets including Social Media
  console.log('\n🎯 Target Status (including Social Media):');
  
  const targets = {
    'Content Creation': 16,
    'Productivity': 15,
    'Voice': 10,
    'SEO & Optimization': 9,
    'Image Generation': 8,
    'Social Media': 8, // New target
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
  
  const totalTools = Object.values(counts).reduce((sum, c) => sum + c, 0);
  console.log(`\n📈 Total tools: ${totalTools}`);
  
  if (foundCount === 8) {
    console.log('\n🎉 Successfully added all 8 Social Media tools!');
  } else {
    console.log(`\n⚠️ Added ${foundCount}/8 Social Media tools (${8 - foundCount} not found in database)`);
  }
}

addSocialMedia();