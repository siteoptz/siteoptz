#!/usr/bin/env node

/**
 * Achieve EXACT target totals with logical moves
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';

function makeExactMoves() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('🎯 Making exact moves to match all targets...\n');
  
  // Define all the exact moves needed
  const exactMoves = [
    // VOICE: Need 1 more (currently 9, need 10)
    { name: 'Murph AI', from: 'Voice', to: 'Voice' }, // Keep in Voice
    { name: 'Synthesia', from: 'Video Generation', to: 'Voice', reason: 'Has voice synthesis capabilities' },
    
    // SEO & OPTIMIZATION: Need 2 more (currently 7, need 9)
    { name: 'Writesonic', from: 'Content Creation', to: 'SEO & Optimization', reason: 'SEO-focused content' },
    { name: 'Copy.ai', from: 'Content Creation', to: 'SEO & Optimization', reason: 'SEO copywriting' },
    
    // SOCIAL MEDIA: Need 6 more (currently 2, need 8)
    { name: 'Gamma', from: 'Social Media', to: 'Social Media' }, // Keep
    { name: 'Microsoft PowerPoint', from: 'Social Media', to: 'Social Media' }, // Keep
    { name: 'Buffer AI', from: 'Content Creation', to: 'Social Media', reason: 'Social media management' },
    { name: 'Hootsuite AI', from: 'Productivity', to: 'Social Media', reason: 'Social media management' },
    { name: 'Canva AI', from: 'Image Generation', to: 'Social Media', reason: 'Social media graphics' },
    { name: 'Lumen5', from: 'Video Generation', to: 'Social Media', reason: 'Social video creation' },
    { name: 'Kapwing', from: 'Video Generation', to: 'Social Media', reason: 'Social video editing' },
    { name: 'Pictory', from: 'Video Generation', to: 'Social Media', reason: 'Social video content' },
    
    // PAID SEARCH & PPC: Need 3 more (currently 2, need 5)
    { name: 'AdCreative.ai', from: 'Paid Search & PPC', to: 'Paid Search & PPC' }, // Keep
    { name: 'Adobe Firefly', from: 'Paid Search & PPC', to: 'Image Generation', reason: 'Move back to Image Generation' },
    { name: 'Jasper', from: 'Content Creation', to: 'Paid Search & PPC', reason: 'Ad copy creation' },
    { name: 'Jasper AI', from: 'Content Creation', to: 'Paid Search & PPC', reason: 'Ad copy creation' },
    { name: 'HubSpot AI', from: 'Email Marketing', to: 'Paid Search & PPC', reason: 'Marketing automation with PPC' },
    { name: 'Mailchimp AI', from: 'Email Marketing', to: 'Paid Search & PPC', reason: 'Marketing campaigns' },
    
    // CONTENT CREATION: Need to add back (currently 12, need 18)
    { name: 'ChatGPT', from: 'Content Creation', to: 'Content Creation' }, // Keep
    { name: 'GPT-4', from: 'Content Creation', to: 'Content Creation' }, // Keep
    { name: 'Claude', from: 'Content Creation', to: 'Content Creation' }, // Keep
    { name: 'Anthropic Claude', from: 'Content Creation', to: 'Content Creation' }, // Keep
    { name: 'Cohere', from: 'Content Creation', to: 'Content Creation' }, // Keep
    { name: 'Character.AI', from: 'Content Creation', to: 'Content Creation' }, // Keep
    { name: 'Sudowrite', from: 'Content Creation', to: 'Content Creation' }, // Keep
    { name: 'Rytr', from: 'Voice', to: 'Content Creation', reason: 'Writing tool' },
    { name: 'AirOps', from: 'SEO & Optimization', to: 'Content Creation', reason: 'Content strategy' },
    { name: 'Frase', from: 'SEO & Optimization', to: 'Content Creation', reason: 'Content optimization' },
    { name: 'Grammarly', from: 'Productivity', to: 'Content Creation', reason: 'Writing assistant' },
    { name: 'Notion AI', from: 'Productivity', to: 'Content Creation', reason: 'Content creation in Notion' },
    { name: 'Microsoft Copilot', from: 'Productivity', to: 'Content Creation', reason: 'Content generation' },
    
    // PRODUCTIVITY: Need 2 more (currently 16, need 18)
    { name: 'Trello Butler', from: 'Productivity', to: 'Productivity' }, // Keep
    { name: 'Clockwise', from: 'Productivity', to: 'Productivity' }, // Keep
    { name: 'Reclaim.ai', from: 'Productivity', to: 'Productivity' }, // Keep
    { name: 'Teal', from: 'Productivity', to: 'Productivity' }, // Keep
    { name: 'Kickresume', from: 'Productivity', to: 'Productivity' }, // Keep
    { name: 'ChatPDF', from: 'Research & Education', to: 'Productivity', reason: 'PDF productivity tool' },
    { name: 'Perplexity AI', from: 'Research & Education', to: 'Productivity', reason: 'Research productivity' },
    
    // VIDEO GENERATION: Need 1 more (currently 5, need 6)
    { name: 'Runway ML', from: 'Video Generation', to: 'Video Generation' }, // Keep
    { name: 'Veo', from: 'Voice', to: 'Video Generation', reason: 'Google video generation tool' },
    
    // RESEARCH & EDUCATION: Keep at 6
    { name: 'Deep Research', from: 'SEO & Optimization', to: 'Research & Education', reason: 'Research tool' },
    { name: 'Google Search', from: 'SEO & Optimization', to: 'Research & Education', reason: 'Research tool' },
    
    // Add 1 to Branding & Design
    { name: 'Leonardo.ai', from: 'Image Generation', to: 'Branding & Design', reason: 'Design tool' },
    
    // Add 1 to Advertising & Marketing  
    { name: 'Semrush AI', from: 'SEO & Optimization', to: 'Advertising & Marketing', reason: 'Marketing platform' }
  ];
  
  // Apply all moves
  exactMoves.forEach(move => {
    const tool = data.find(t => t.name === move.name);
    if (tool && move.to && move.to !== move.from) {
      const oldCat = tool.overview?.category || tool.category;
      if (move.reason) {
        console.log(`🔀 ${move.name}: ${oldCat} → ${move.to} (${move.reason})`);
      }
      
      if (tool.overview) tool.overview.category = move.to;
      if (tool.category !== undefined) tool.category = move.to;
      if (tool.schema?.category) tool.schema.category = move.to;
    }
  });
  
  // Save the data
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  
  // Count final results
  const counts = {};
  data.forEach(tool => {
    const cat = tool.overview?.category || tool.category || 'Unknown';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  
  console.log('\n🎉 FINAL EXACT RESULTS:\n');
  
  const targets = {
    'Content Creation': 18,
    'Productivity': 18,
    'Voice': 10,
    'SEO & Optimization': 9,
    'Image Generation': 9,
    'Social Media': 8,
    'Code Generation': 7,
    'Data Analysis': 6,
    'Research & Education': 6,
    'Video Generation': 6,
    'Paid Search & PPC': 5,
    'AI Automation': 4,
    'Email Marketing': 3,
    'Branding & Design': 1,
    'Advertising & Marketing': 1
  };
  
  Object.entries(targets).forEach(([cat, target]) => {
    const count = counts[cat] || 0;
    const status = count === target ? '✅' : '❌';
    console.log(`   ${status} ${cat}: ${count}/${target} tools`);
  });
  
  const total = Object.values(counts).reduce((sum, c) => sum + c, 0);
  console.log(`\n📈 Total: ${total} tools`);
}

makeExactMoves();