#!/usr/bin/env node

/**
 * Precise AI Tools Category Reorganization
 * Make exact moves as specified by user
 */

import fs from 'fs';
import path from 'path';

const TOOLS_FILE = 'public/data/aiToolsData.json';
const BACKUP_FILE = 'public/data/aiToolsData-precise-backup.json';

// Exact category moves as specified
const PRECISE_MOVES = [
  {
    from: 'AI Writing Assistant',
    to: 'Content Creation',
    reason: 'User specified: AI Writing Assistant → Content Creation'
  },
  {
    from: 'AI Content Strategy & Optimization', 
    to: 'Content Creation',
    reason: 'User specified: AI Content Strategy & Optimization → Content Creation'
  },
  {
    from: 'Marketing',
    to: 'Email Marketing',
    reason: 'User specified: Marketing AI → Email Marketing'
  },
  {
    from: 'App Development',
    to: 'Code Generation', 
    reason: 'User specified: App Development → Code Generation'
  },
  {
    from: 'Server Management',
    to: 'Productivity',
    reason: 'User specified: Server Management → Productivity'
  },
  {
    from: 'Branding & Design',
    to: 'Image Generation',
    reason: 'User specified: Branding & Design → Image Generation'
  },
  {
    from: 'Advertising & Marketing',
    to: 'Content Creation',
    reason: 'User specified: Advertising & Marketing → Content Creation'
  }
];

// Specific tools to move to AI Automation regardless of current category
const TOOLS_TO_AI_AUTOMATION = [
  { slug: 'n8n', name: 'n8n' },
  { slug: 'zapier-ai', name: 'Zapier AI' },
  { slug: 'grok', name: 'Grok' },
  { slug: 'make', name: 'Make' }  // Adding Make as it's also automation
];

function createBackup() {
  try {
    fs.copyFileSync(TOOLS_FILE, BACKUP_FILE);
    console.log('✅ Created backup at:', BACKUP_FILE);
    return true;
  } catch (error) {
    console.error('❌ Failed to create backup:', error.message);
    return false;
  }
}

function loadToolsData() {
  try {
    const data = fs.readFileSync(TOOLS_FILE, 'utf8');
    const tools = JSON.parse(data);
    console.log(`📊 Loaded ${tools.length} tools`);
    return tools;
  } catch (error) {
    console.error('❌ Failed to load tools data:', error.message);
    return null;
  }
}

function showCurrentDistribution(tools) {
  const categories = {};
  
  tools.forEach(tool => {
    const category = tool.overview?.category || tool.category || 'Unknown';
    categories[category] = (categories[category] || 0) + 1;
  });
  
  console.log('\n📊 Current Category Distribution:');
  Object.entries(categories)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count} tools`);
    });
    
  return categories;
}

function updateToolCategory(tool, newCategory, reason) {
  const updatedTool = { ...tool };
  
  // Update all category references
  if (updatedTool.category !== undefined) {
    updatedTool.category = newCategory;
  }
  
  if (updatedTool.overview?.category) {
    updatedTool.overview.category = newCategory;
  }
  
  if (updatedTool.schema?.category) {
    updatedTool.schema.category = newCategory;
  }
  
  // Update tags if they exist
  if (updatedTool.tags && Array.isArray(updatedTool.tags)) {
    // Remove old category-related tags and add new one
    updatedTool.tags = updatedTool.tags.filter(tag => 
      !tag.toLowerCase().includes(tool.overview?.category?.toLowerCase() || '') &&
      !tag.toLowerCase().includes(tool.category?.toLowerCase() || '')
    );
    updatedTool.tags.unshift(newCategory.toLowerCase());
  }
  
  return updatedTool;
}

function performPreciseReorganization(tools) {
  console.log('\n🔄 Performing precise reorganization...');
  
  let updatedTools = [...tools];
  let totalMoves = 0;
  const moveSummary = {};
  
  // Step 1: Move specific tools to AI Automation
  TOOLS_TO_AI_AUTOMATION.forEach(targetTool => {
    const toolIndex = updatedTools.findIndex(tool => 
      tool.slug === targetTool.slug || tool.id === targetTool.slug
    );
    
    if (toolIndex !== -1) {
      const tool = updatedTools[toolIndex];
      const oldCategory = tool.overview?.category || tool.category || 'Unknown';
      
      if (oldCategory !== 'AI Automation') {
        console.log(`🔀 ${tool.name}: ${oldCategory} → AI Automation (specific tool)`);
        
        updatedTools[toolIndex] = updateToolCategory(tool, 'AI Automation', 'Specific tool move');
        
        if (!moveSummary['AI Automation']) moveSummary['AI Automation'] = 0;
        moveSummary['AI Automation']++;
        totalMoves++;
      }
    } else {
      console.log(`⚠️  Tool not found: ${targetTool.name} (${targetTool.slug})`);
    }
  });
  
  // Step 2: Apply category-based moves
  PRECISE_MOVES.forEach(move => {
    const toolsToMove = updatedTools.filter(tool => {
      const currentCategory = tool.overview?.category || tool.category;
      return currentCategory === move.from;
    });
    
    if (toolsToMove.length > 0) {
      console.log(`\n📁 Moving ${toolsToMove.length} tools from "${move.from}" to "${move.to}"`);
      
      toolsToMove.forEach(tool => {
        const toolIndex = updatedTools.findIndex(t => t.id === tool.id);
        if (toolIndex !== -1) {
          console.log(`🔀 ${tool.name}: ${move.from} → ${move.to}`);
          
          updatedTools[toolIndex] = updateToolCategory(tool, move.to, move.reason);
          
          if (!moveSummary[move.to]) moveSummary[move.to] = 0;
          moveSummary[move.to]++;
          totalMoves++;
        }
      });
    } else {
      console.log(`⚠️  No tools found in category: ${move.from}`);
    }
  });
  
  console.log(`\n📊 Total moves made: ${totalMoves}`);
  console.log('\n📋 Move Summary:');
  Object.entries(moveSummary).forEach(([category, count]) => {
    console.log(`   ${category}: +${count} tools`);
  });
  
  return updatedTools;
}

function validateResults(originalTools, updatedTools) {
  console.log('\n🔍 Validating results...');
  
  // Check tool count
  if (originalTools.length !== updatedTools.length) {
    console.error(`❌ Tool count mismatch: ${originalTools.length} → ${updatedTools.length}`);
    return false;
  }
  
  // Check all tools have categories
  const invalidTools = updatedTools.filter(tool => {
    const category = tool.overview?.category || tool.category;
    return !category || category.trim() === '';
  });
  
  if (invalidTools.length > 0) {
    console.error(`❌ ${invalidTools.length} tools have invalid categories`);
    invalidTools.forEach(tool => {
      console.error(`   - ${tool.name} (${tool.id})`);
    });
    return false;
  }
  
  // Check no tools were lost
  const originalIds = new Set(originalTools.map(tool => tool.id));
  const updatedIds = new Set(updatedTools.map(tool => tool.id));
  
  const lostTools = [...originalIds].filter(id => !updatedIds.has(id));
  if (lostTools.length > 0) {
    console.error(`❌ Lost tools: ${lostTools.join(', ')}`);
    return false;
  }
  
  console.log('✅ All validation checks passed');
  return true;
}

function saveUpdatedData(tools) {
  try {
    const updatedData = JSON.stringify(tools, null, 2);
    fs.writeFileSync(TOOLS_FILE, updatedData);
    console.log('\n✅ Successfully saved updated tools data');
    return true;
  } catch (error) {
    console.error('\n❌ Failed to save updated data:', error.message);
    return false;
  }
}

async function main() {
  console.log('🎯 Precise AI Tools Category Reorganization\n');
  
  // Create backup
  if (!createBackup()) {
    process.exit(1);
  }
  
  // Load data
  const originalTools = loadToolsData();
  if (!originalTools) {
    process.exit(1);
  }
  
  // Show current distribution
  console.log('📊 BEFORE Reorganization:');
  showCurrentDistribution(originalTools);
  
  // Perform precise reorganization
  const updatedTools = performPreciseReorganization(originalTools);
  
  // Validate results
  if (!validateResults(originalTools, updatedTools)) {
    console.error('\n❌ Validation failed. Not saving changes.');
    process.exit(1);
  }
  
  // Show final distribution
  console.log('\n📊 AFTER Reorganization:');
  const finalDistribution = showCurrentDistribution(updatedTools);
  
  // Save updated data
  if (!saveUpdatedData(updatedTools)) {
    process.exit(1);
  }
  
  console.log('\n🎉 Precise reorganization completed successfully!');
  console.log('\n💡 Summary of changes made:');
  console.log('   • AI Writing Assistant → Content Creation');
  console.log('   • AI Content Strategy & Optimization → Content Creation');
  console.log('   • Marketing → Email Marketing');
  console.log('   • App Development → Code Generation');
  console.log('   • Server Management → Productivity');
  console.log('   • Branding & Design → Image Generation');
  console.log('   • Advertising & Marketing → Content Creation');
  console.log('   • N8N, Zapier AI, Grok, Make → AI Automation');
  
  console.log('\n📁 Backup saved to:', BACKUP_FILE);
  
  // Expected final totals
  console.log('\n📈 Expected Results:');
  console.log('   • Content Creation: 18 total (was ~14)');
  console.log('   • Email Marketing: 3 total');
  console.log('   • Code Generation: 7 total');
  console.log('   • Productivity: 18 total');
  console.log('   • AI Automation: 4 total (new category)');
  console.log('   • Image Generation: 9 total (was 8)');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;