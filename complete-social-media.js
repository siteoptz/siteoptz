#!/usr/bin/env node

/**
 * Complete Social Media category to 8 tools using existing database tools
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';

function completeSocialMedia() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('📱 Completing Social Media category to 8 tools using existing tools...\n');
  
  // We have Buffer AI and Hootsuite AI (2 tools)
  // Need 6 more tools that could logically be social media related
  
  const additionalSocialMediaTools = [
    'Gamma',           // Presentation tool for social content
    'Canva AI',        // Social media graphics
    'Looka',           // Brand/logo design for social
    'AdCreative.ai',   // Social media ad creation
    'Microsoft PowerPoint', // Presentations for social sharing
    'Pictory'          // Video content for social media
  ];
  
  console.log('Moving these tools to Social Media:');
  console.log('   • Buffer AI (already moved)');
  console.log('   • Hootsuite AI (already moved)');
  
  additionalSocialMediaTools.forEach(toolName => {
    const tool = data.find(t => t.name === toolName);
    if (tool) {
      const oldCat = tool.overview?.category || tool.category || 'Unknown';
      console.log(`🔀 ${tool.name}: ${oldCat} → Social Media`);
      
      // Update category
      if (tool.overview) tool.overview.category = 'Social Media';
      if (tool.category !== undefined) tool.category = 'Social Media';
      if (tool.schema?.category) tool.schema.category = 'Social Media';
    }
  });
  
  // Save
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  
  // Verify Social Media category
  const socialMediaTools = data.filter(t => 
    (t.overview?.category || t.category) === 'Social Media'
  );
  
  console.log(`\n✅ Social Media category now has ${socialMediaTools.length} tools:`);
  socialMediaTools.forEach(tool => {
    console.log(`   • ${tool.name}`);
  });
  
  // Show updated category counts
  const counts = {};
  data.forEach(tool => {
    const cat = tool.overview?.category || tool.category || 'Unknown';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  
  console.log('\n📊 Final Category Distribution:');
  
  const targets = {
    'Content Creation': 16,
    'Productivity': 15,
    'Voice': 10,
    'SEO & Optimization': 9,
    'Image Generation': 8,
    'Social Media': 8,
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
  
  if (socialMediaTools.length === 8) {
    console.log('\n🎉 Successfully created Social Media category with 8 tools!');
  }
}

completeSocialMedia();