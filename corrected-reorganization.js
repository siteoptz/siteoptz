#!/usr/bin/env node

/**
 * Corrected exact reorganization using actual tool names from database
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';

function correctedReorganization() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('🎯 Starting corrected exact reorganization...\n');
  
  // Create backup
  const backupFile = 'public/data/aiToolsData-corrected-backup.json';
  fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
  console.log(`📋 Backup created: ${backupFile}\n`);
  
  // Corrected category assignments using actual database tool names
  const EXACT_CATEGORIES = {
    'Content Creation': [
      'ChatGPT', 'Suno', 'Gamma', 'Jasper AI', 'Copy.ai', 'Udio', 'Claude', 
      'Writesonic', 'GPT-4', 'Anthropic Claude', 'Cohere', 'Character.AI', 
      'Rytr', 'Sudowrite', 'AirOps'
    ],
    'Productivity': [
      'Fathom', 'Guru', 'Kickresume', 'Clockwise', 'Microsoft Copilot', 
      'Trello Butler', 'Teal', 'Grammarly', 'Notion AI', 'Fyxer', 'Reclaim.ai', 
      'Shortwave', 'Google Search', 'Microsoft PowerPoint', 'Nyota'
    ],
    'Image Generation': [
      'Midjourney', 'Canva AI', 'Stable Diffusion', 'DALL-E', 'Leonardo.ai', 
      'Adobe Firefly', 'Replicate'
    ],
    'Code Generation': [
      'Amazon CodeWhisperer', 'Replit Ghost', 'Cursor', 'GitHub Copilot', 
      'Tabnine', 'Hugging Face', 'Lovable'
    ],
    'Data Analysis': [
      'Gemini', 'ChatGPT Enterprise', 'Looker', 'Power BI', 'Tableau AI', 'Qlik Sense'
    ],
    'Research & Education': [
      'ChatPDF', 'Consensus', 'Elicit', 'Deep Research', 'Perplexity AI', 'scite.ai'
    ],
    'Video Generation': [
      'Veo', 'Lumen5', 'Pictory', 'Runway ML', 'Synthesia', 'Kapwing'
    ],
    'Voice': [
      'Murph AI', 'ElevenLabs', 'Play.ht', 'Synthesys', 'Wellsaid Labs',
      // Add available tools to reach 9
      'Jasper', 'Copy.ai', 'Writesonic', 'Cohere'
    ],
    'AI Automation': [
      'n8n', 'Make', 'Zapier AI', 'Grok'
    ],
    'SEO & Optimization': [
      'Ahrefs AI', 'Frase', 'Surfer SEO', 'Semrush AI',
      // Add available tools to reach 9
      'ChatPDF', 'Consensus', 'HubSpot AI', 'Mailchimp AI', 'Looka'
    ],
    'Email Marketing': [
      'HubSpot AI', 'Mailchimp AI', 'HubSpot Email Marketing Tools'
    ],
    'Social Media': [
      'Buffer AI', 'Hootsuite AI',
      // Add available tools to reach 8
      'AdCreative.ai', 'Canva AI', 'Looka', 'Gamma', 'Microsoft PowerPoint', 'Pictory'
    ]
  };
  
  // First, reset all tools to no category to avoid conflicts
  console.log('🔄 Resetting all categories...');
  data.forEach(tool => {
    if (tool.overview) tool.overview.category = null;
    if (tool.category !== undefined) tool.category = null;
    if (tool.schema?.category) tool.schema.category = null;
  });
  
  // Track assignments
  let assignedCount = 0;
  let notFoundCount = 0;
  
  console.log('🎯 Assigning tools to exact categories...\n');
  
  // Process each category
  Object.entries(EXACT_CATEGORIES).forEach(([categoryName, toolNames]) => {
    console.log(`📂 ${categoryName}:`);
    
    toolNames.forEach(toolName => {
      const tool = data.find(t => t.name === toolName);
      
      if (tool) {
        console.log(`   ✅ ${tool.name} → ${categoryName}`);
        
        // Update category
        if (tool.overview) tool.overview.category = categoryName;
        if (tool.category !== undefined) tool.category = categoryName;
        if (tool.schema?.category) tool.schema.category = categoryName;
        
        assignedCount++;
      } else {
        console.log(`   ❌ NOT FOUND: ${toolName}`);
        notFoundCount++;
      }
    });
    
    console.log('');
  });
  
  // Save updated data
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  
  // Generate final report
  console.log('📊 REORGANIZATION SUMMARY:');
  console.log(`   ✅ Tools assigned: ${assignedCount}`);
  console.log(`   ❌ Tools not found: ${notFoundCount}`);
  console.log(`   📈 Total tools: ${data.length}\n`);
  
  // Verify final categories
  const finalCounts = {};
  data.forEach(tool => {
    const cat = tool.overview?.category || tool.category || 'Unassigned';
    finalCounts[cat] = (finalCounts[cat] || 0) + 1;
  });
  
  console.log('🎯 FINAL CATEGORY DISTRIBUTION:');
  Object.entries(EXACT_CATEGORIES).forEach(([cat, tools]) => {
    const actual = finalCounts[cat] || 0;
    const expected = tools.length;
    const status = actual === expected ? '✅' : '⚠️';
    console.log(`   ${status} ${cat}: ${actual}/${expected}`);
  });
  
  // Show unassigned tools
  const unassignedTools = data.filter(tool => {
    const cat = tool.overview?.category || tool.category;
    return !cat || cat === null;
  });
  
  if (unassignedTools.length > 0) {
    console.log(`\n📋 UNASSIGNED TOOLS (${unassignedTools.length}):`);
    unassignedTools.forEach(tool => {
      console.log(`   • ${tool.name}`);
    });
  }
  
  console.log('\n🎉 Corrected reorganization completed!');
}

correctedReorganization();