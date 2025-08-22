#!/usr/bin/env node

/**
 * Exact reorganization of AI tools according to user specifications
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';

function exactReorganization() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('🎯 Starting exact reorganization according to specifications...\n');
  
  // Create backup
  const backupFile = 'public/data/aiToolsData-exact-reorganization-backup.json';
  fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
  console.log(`📋 Backup created: ${backupFile}\n`);
  
  // Exact category assignments
  const EXACT_CATEGORIES = {
    'Content Creation': [
      'ChatGPT', 'Suno', 'Gamma', 'Jasper AI', 'Copy.ai', 'Udio', 'Claude', 
      'Writesonic', 'GPT-4', 'Anthropic Claude', 'Cohere', 'Character.ai', 
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
      'Amazon Code Whisperer', 'Repli Ghost', 'Cursor', 'GitHub Copilot', 
      'Tabnine', 'Hugging Face', 'Lovable'
    ],
    'Data Analysis': [
      'Gemini', 'ChatGPT Enterprise', 'Looker', 'Power BI', 'Tableau AI', 'Qlik Sense'
    ],
    'Research & Education': [
      'Chat PDF', 'Consensus', 'Elicit', 'Deep Research', 'Perplexity AI', 'scite.ai'
    ],
    'Video Generation': [
      'Veo', 'Lumen5', 'Pictory', 'Runway ML', 'Synthesia', 'Kapwing'
    ],
    'Voice': [
      'Murf AI', 'Resemble AI', 'Descript', 'Speechify', 'Replica Studios', 
      'Play.ht', 'Synthesis', 'ElevenLabs', 'Wellsaid Labs'
    ],
    'AI Automation': [
      'N8N', 'Make', 'Zapier AI', 'Grok'
    ],
    'SEO & Optimization': [
      'Clearscope', 'Ahrefs AI', 'Morningscore', 'SE Ranking', 'Mangools', 
      'Frase', 'Serpstat', 'Surfer SEO', 'Semrush AI'
    ],
    'Email Marketing': [
      'Hubspot AI', 'Mailchimp AI', 'Hubspot Email Marketing'
    ],
    'Social Media': [
      'Planable', 'Loomly', 'Sendible', 'SociaPilot', 'Social Champ', 
      'Buffer AI', 'Content Studio', 'Hootsuite AI'
    ]
  };
  
  // Tools to delete
  const TOOLS_TO_DELETE = [
    '504 Gateway Time-out',
    'Google Account Sign-in'
  ];
  
  console.log('🗑️ Deleting specified tools...');
  let originalLength = data.length;
  
  // Delete specified tools
  TOOLS_TO_DELETE.forEach(toolName => {
    const index = data.findIndex(t => 
      t.name === toolName || 
      t.name.includes('504') ||
      t.name.includes('Google Account') ||
      t.description?.includes('504 Gateway Timeout') ||
      t.description?.includes('Sign in to your Google Account')
    );
    
    if (index !== -1) {
      console.log(`❌ Deleted: ${data[index].name}`);
      data.splice(index, 1);
    } else {
      console.log(`⚠️ Not found for deletion: ${toolName}`);
    }
  });
  
  console.log(`📊 Deleted ${originalLength - data.length} tools\n`);
  
  // Track assignments and conflicts
  let assignedCount = 0;
  let notFoundCount = 0;
  let conflicts = [];
  
  console.log('🎯 Assigning tools to exact categories...\n');
  
  // Process each category
  Object.entries(EXACT_CATEGORIES).forEach(([categoryName, toolNames]) => {
    console.log(`📂 ${categoryName}:`);
    
    toolNames.forEach(toolName => {
      // Find tool with flexible matching
      const tool = data.find(t => 
        t.name === toolName ||
        t.name.toLowerCase() === toolName.toLowerCase() ||
        // Handle variations
        (toolName === 'ChatGPT' && (t.name === 'ChatGPT Plus' || t.name.includes('ChatGPT'))) ||
        (toolName === 'Jasper AI' && (t.name === 'Jasper' || t.name === 'jasper')) ||
        (toolName === 'Copy.ai' && t.name === 'Copy.ai') ||
        (toolName === 'Writesonic' && t.name === 'Writesonic') ||
        (toolName === 'Claude' && (t.name === 'Anthropic Claude' || t.name.includes('Claude'))) ||
        (toolName === 'Anthropic Claude' && (t.name === 'Claude' || t.name.includes('Anthropic'))) ||
        (toolName === 'Gamma' && t.name === 'Gamma') ||
        (toolName === 'Microsoft Copilot' && t.name === 'Microsoft Copilot') ||
        (toolName === 'Grammarly' && t.name === 'Grammarly') ||
        (toolName === 'Notion AI' && t.name === 'Notion AI') ||
        (toolName === 'Canva AI' && t.name === 'Canva AI') ||
        (toolName === 'Leonardo.ai' && t.name === 'Leonardo.ai') ||
        (toolName === 'Adobe Firefly' && t.name === 'Adobe Firefly') ||
        (toolName === 'GitHub Copilot' && t.name === 'GitHub Copilot') ||
        (toolName === 'Hugging Face' && t.name === 'Hugging Face') ||
        (toolName === 'ChatGPT Enterprise' && t.name === 'ChatGPT Enterprise') ||
        (toolName === 'Power BI' && t.name === 'Power BI') ||
        (toolName === 'Tableau AI' && t.name === 'Tableau AI') ||
        (toolName === 'Qlik Sense' && t.name === 'Qlik Sense') ||
        (toolName === 'Chat PDF' && t.name === 'ChatPDF') ||
        (toolName === 'Perplexity AI' && t.name === 'Perplexity AI') ||
        (toolName === 'scite.ai' && t.name === 'scite.ai') ||
        (toolName === 'Lumen5' && t.name === 'Lumen5') ||
        (toolName === 'Runway ML' && t.name === 'Runway ML') ||
        (toolName === 'Murf AI' && t.name === 'Murf AI') ||
        (toolName === 'Play.ht' && t.name === 'Play.ht') ||
        (toolName === 'ElevenLabs' && t.name === 'ElevenLabs') ||
        (toolName === 'Wellsaid Labs' && t.name === 'Wellsaid Labs') ||
        (toolName === 'Zapier AI' && t.name === 'Zapier AI') ||
        (toolName === 'Ahrefs AI' && t.name === 'Ahrefs AI') ||
        (toolName === 'Buffer AI' && t.name === 'Buffer AI') ||
        (toolName === 'Hootsuite AI' && t.name === 'Hootsuite AI') ||
        (toolName === 'Hubspot AI' && t.name === 'HubSpot AI') ||
        (toolName === 'Mailchimp AI' && t.name === 'Mailchimp AI') ||
        (toolName === 'Hubspot Email Marketing' && t.name === 'HubSpot Email Marketing Tools') ||
        (toolName === 'SociaPilot' && t.name === 'Social Pilot') ||
        (toolName === 'Social Champ' && t.name === 'SocialChamp') ||
        (toolName === 'Content Studio' && t.name === 'ContentStudio')
      );
      
      if (tool) {
        const oldCategory = tool.overview?.category || tool.category || 'Unknown';
        
        // Check for conflicts (tool already assigned in this run)
        if (tool._assigned) {
          conflicts.push({
            tool: tool.name,
            previousCategory: tool._assignedTo,
            newCategory: categoryName
          });
          console.log(`⚠️ CONFLICT: ${tool.name} already assigned to ${tool._assignedTo}`);
          return;
        }
        
        console.log(`   ✅ ${tool.name}: ${oldCategory} → ${categoryName}`);
        
        // Update category
        if (tool.overview) tool.overview.category = categoryName;
        if (tool.category !== undefined) tool.category = categoryName;
        if (tool.schema?.category) tool.schema.category = categoryName;
        
        // Mark as assigned
        tool._assigned = true;
        tool._assignedTo = categoryName;
        
        assignedCount++;
      } else {
        console.log(`   ❌ NOT FOUND: ${toolName}`);
        notFoundCount++;
      }
    });
    
    console.log('');
  });
  
  // Clean up assignment markers
  data.forEach(tool => {
    delete tool._assigned;
    delete tool._assignedTo;
  });
  
  // Save updated data
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  
  // Generate final report
  console.log('📊 REORGANIZATION SUMMARY:');
  console.log(`   ✅ Tools assigned: ${assignedCount}`);
  console.log(`   ❌ Tools not found: ${notFoundCount}`);
  console.log(`   ⚠️ Conflicts: ${conflicts.length}`);
  console.log(`   🗑️ Tools deleted: ${originalLength - data.length}`);
  console.log(`   📈 Total tools remaining: ${data.length}\n`);
  
  if (conflicts.length > 0) {
    console.log('⚠️ CONFLICTS DETECTED:');
    conflicts.forEach(conflict => {
      console.log(`   • ${conflict.tool}: ${conflict.previousCategory} vs ${conflict.newCategory}`);
    });
    console.log('');
  }
  
  // Verify final categories
  const finalCounts = {};
  data.forEach(tool => {
    const cat = tool.overview?.category || tool.category || 'Unknown';
    finalCounts[cat] = (finalCounts[cat] || 0) + 1;
  });
  
  console.log('🎯 FINAL CATEGORY DISTRIBUTION:');
  Object.entries(EXACT_CATEGORIES).forEach(([cat, tools]) => {
    const actual = finalCounts[cat] || 0;
    const expected = tools.length;
    const status = actual === expected ? '✅' : '⚠️';
    console.log(`   ${status} ${cat}: ${actual}/${expected}`);
  });
  
  // Show any unassigned tools
  const assignedCategories = Object.keys(EXACT_CATEGORIES);
  const unassignedTools = data.filter(tool => {
    const cat = tool.overview?.category || tool.category;
    return !assignedCategories.includes(cat);
  });
  
  if (unassignedTools.length > 0) {
    console.log(`\n⚠️ UNASSIGNED TOOLS (${unassignedTools.length}):`);
    unassignedTools.forEach(tool => {
      console.log(`   • ${tool.name} (${tool.overview?.category || tool.category || 'Unknown'})`);
    });
  }
  
  console.log('\n🎉 Exact reorganization completed!');
}

exactReorganization();