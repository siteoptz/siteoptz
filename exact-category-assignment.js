#!/usr/bin/env node

/**
 * Exact category assignment as specified by user
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';
const BACKUP_FILE = 'public/data/aiToolsData-exact-backup.json';

// Exact tool assignments as specified
const EXACT_CATEGORIES = {
  'Content Creation': [
    'ChatGPT', 'Suno', 'Gamma', 'Jasper AI', 'Copy.ai', 'Udio', 
    'Claude', 'Writesonic', 'GPT-4', 'Anthropic Claude', 'Cohere', 
    'Jasper', 'Character.AI', 'Rytr', 'Sudowrite', 'AirOps'
  ], // 16 tools
  
  'Productivity': [
    'Fathom', 'Guru', 'Kickresume', 'Clockwise', 'Microsoft Copilot', 
    'Trello Butler', 'Teal', 'Grammarly', 'Notion AI', 'Fyxer', 
    'Reclaim.ai', 'Shortwave', 'Google Search', 'Microsoft PowerPoint', 'Nyota'
  ], // 15 tools
  
  'Image Generation': [
    'Midjourney', 'Canva AI', 'Stable Diffusion', 'DALL-E', 
    'Leonardo.ai', 'Adobe Firefly', 'Replicate', 'Stable Diffusion Web'
  ], // 8 tools
  
  'Code Generation': [
    'Amazon CodeWhisperer', 'Replit Ghost', 'Cursor', 'GitHub Copilot', 
    'Tabnine', 'Hugging Face', 'Lovable'
  ], // 7 tools
  
  'Data Analysis': [
    'Gemini', 'ChatGPT Enterprise', 'Looker', 'Power BI', 
    'Tableau AI', 'Qlik Sense'
  ], // 6 tools
  
  'Research & Education': [
    'ChatPDF', 'Consensus', 'Elicit', 'Deep Research', 
    'Perplexity AI', 'scite.ai'
  ], // 6 tools
  
  'Video Generation': [
    'Veo', 'Lumen5', 'Pictory', 'Runway ML', 'Synthesia', 'Kapwing'
  ], // 6 tools
  
  'Voice': [
    'Murf AI', 'Resemble AI', 'Descript', 'Speechify', 'Replica Studios',
    'Murph AI', 'Play.ht', 'Synthesys', 'ElevenLabs', 'Wellsaid Labs'
  ], // 10 tools
  
  'AI Automation': [
    'n8n', 'Make', 'Zapier AI', 'Grok'
  ], // 4 tools
  
  'SEO & Optimization': [
    'Clearscope', 'Ahrefs AI', 'Morningscore', 'SE Ranking', 
    'Mangools', 'Frase', 'Serpstat', 'Surfer SEO', 'Semrush AI'
  ], // 9 tools
  
  'Email Marketing': [
    'HubSpot AI', 'Mailchimp AI', 'HubSpot Email Marketing Tools'
  ] // 3 tools
};

function assignCategories() {
  // Create backup
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  fs.writeFileSync(BACKUP_FILE, JSON.stringify(data, null, 2));
  console.log('✅ Created backup at:', BACKUP_FILE);
  
  console.log('\n🎯 Assigning exact categories as specified...\n');
  
  // Track assignments
  const assignedTools = new Set();
  let totalAssigned = 0;
  let notFoundTools = [];
  
  // Apply exact category assignments
  Object.entries(EXACT_CATEGORIES).forEach(([category, toolNames]) => {
    console.log(`\n📁 ${category} (${toolNames.length} tools):`);
    
    toolNames.forEach(toolName => {
      // Handle variations in naming
      const tool = data.find(t => 
        t.name === toolName || 
        t.name === toolName.replace('AI', '').trim() ||
        t.name === toolName.replace(' AI', '') ||
        t.name === toolName.replace('ai', 'AI') ||
        t.name.toLowerCase() === toolName.toLowerCase() ||
        // Special cases
        (toolName === 'Murf AI' && t.name === 'Murph AI') ||
        (toolName === 'Murph AI' && t.name === 'Murf AI') ||
        (toolName === 'ChatPDF' && t.name === 'ChatPDF') ||
        (toolName === 'Chat PDF' && t.name === 'ChatPDF') ||
        (toolName === 'Stable Diffussion' && t.name === 'Stable Diffusion') ||
        (toolName === 'Stable Difussion Web' && t.name === 'Stable Diffusion Web') ||
        (toolName === 'Amazon Code Whisperer' && t.name === 'Amazon CodeWhisperer') ||
        (toolName === 'Repli Ghost' && t.name === 'Replit Ghost') ||
        (toolName === 'Character.ai' && t.name === 'Character.AI') ||
        (toolName === 'Zapier' && t.name === 'Zapier AI') ||
        (toolName === 'Hubspot AI' && t.name === 'HubSpot AI') ||
        (toolName === 'Hubspot Email Marketing' && t.name === 'HubSpot Email Marketing Tools') ||
        (toolName === 'Synthesis' && t.name === 'Synthesys')
      );
      
      if (tool) {
        // Update category
        if (tool.overview) tool.overview.category = category;
        if (tool.category !== undefined) tool.category = category;
        if (tool.schema?.category) tool.schema.category = category;
        
        assignedTools.add(tool.name);
        totalAssigned++;
        console.log(`   ✅ ${tool.name}`);
      } else {
        notFoundTools.push({ name: toolName, category });
        console.log(`   ❌ Not found: ${toolName}`);
      }
    });
  });
  
  // Find unassigned tools
  const unassignedTools = data.filter(t => !assignedTools.has(t.name));
  
  if (unassignedTools.length > 0) {
    console.log('\n⚠️ Unassigned tools (not in specified lists):');
    unassignedTools.forEach(tool => {
      const currentCat = tool.overview?.category || tool.category || 'Unknown';
      console.log(`   • ${tool.name} (currently in: ${currentCat})`);
    });
  }
  
  if (notFoundTools.length > 0) {
    console.log('\n❌ Tools not found in database:');
    notFoundTools.forEach(({ name, category }) => {
      console.log(`   • ${name} (should be in ${category})`);
    });
  }
  
  // Save updated data
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  
  // Show final distribution
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
  
  // Verify counts match expected
  console.log('\n✅ Expected vs Actual:');
  Object.entries(EXACT_CATEGORIES).forEach(([category, tools]) => {
    const actual = counts[category] || 0;
    const expected = tools.length;
    const status = actual === expected ? '✅' : '⚠️';
    console.log(`   ${status} ${category}: ${actual}/${expected}`);
  });
  
  console.log(`\n📈 Total assigned: ${totalAssigned} tools`);
  console.log(`📊 Total in database: ${data.length} tools`);
}

assignCategories();