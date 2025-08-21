#!/usr/bin/env node

/**
 * Reorganize AI Tools Categories
 * Move tools between categories as specified and remove empty categories
 */

import fs from 'fs';
import path from 'path';

const TOOLS_FILE = 'public/data/aiToolsData.json';
const BACKUP_FILE = 'public/data/aiToolsData-reorganize-backup.json';

// Category mappings
const CATEGORY_MOVES = {
  // Move 'AI Writing Assistant' and 'AI Content Strategy & Optimization' to 'Content Creation'
  'AI Writing Assistant': 'Content Creation',
  'AI Content Strategy & Optimization': 'Content Creation',
  
  // Move 'Marketing' to 'Email Marketing' (but check if it's actually email marketing related)
  'Marketing': 'Email Marketing',
  
  // Move 'App Development' to 'Code Generation'
  'App Development': 'Code Generation',
  
  // Move 'Server Management' to 'Productivity'
  'Server Management': 'Productivity'
};

// Specific tools to move to 'AI Automation' (regardless of current category)
const TOOLS_TO_AI_AUTOMATION = ['n8n', 'zapier-ai', 'grok'];

// New category name for automation tools
const AI_AUTOMATION_CATEGORY = 'AI Automation';

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

function reorganizeCategories(tools) {
  let moveCounts = {};
  let processedTools = 0;
  
  console.log('\n🔄 Starting category reorganization...');
  
  // Initialize move counters
  Object.values(CATEGORY_MOVES).forEach(targetCategory => {
    moveCounts[targetCategory] = 0;
  });
  moveCounts[AI_AUTOMATION_CATEGORY] = 0;
  
  const updatedTools = tools.map(tool => {
    processedTools++;
    
    // Get current category (prefer overview.category, fallback to category)
    const currentCategory = tool.overview?.category || tool.category;
    
    // Check if this tool should be moved to AI Automation
    if (TOOLS_TO_AI_AUTOMATION.includes(tool.slug) || TOOLS_TO_AI_AUTOMATION.includes(tool.id)) {
      if (currentCategory !== AI_AUTOMATION_CATEGORY) {
        console.log(`🔀 ${tool.name}: ${currentCategory} → ${AI_AUTOMATION_CATEGORY}`);
        moveCounts[AI_AUTOMATION_CATEGORY]++;
        
        // Update all category references
        const updatedTool = { ...tool };
        if (updatedTool.category !== undefined) {
          updatedTool.category = AI_AUTOMATION_CATEGORY;
        }
        
        // Update overview category if it exists
        if (updatedTool.overview?.category) {
          updatedTool.overview.category = AI_AUTOMATION_CATEGORY;
        }
        
        // Update schema category if it exists
        if (updatedTool.schema?.category) {
          updatedTool.schema.category = AI_AUTOMATION_CATEGORY;
        }
        
        // Update tags to reflect new category
        if (updatedTool.tags && currentCategory) {
          updatedTool.tags = updatedTool.tags.filter(tag => 
            !tag.includes(currentCategory.toLowerCase())
          );
          updatedTool.tags.unshift('ai automation');
        }
        
        return updatedTool;
      }
      return tool;
    }
    
    // Check if this tool's category should be moved according to CATEGORY_MOVES
    const targetCategory = CATEGORY_MOVES[currentCategory];
    if (targetCategory) {
      console.log(`🔀 ${tool.name}: ${currentCategory} → ${targetCategory}`);
      moveCounts[targetCategory]++;
      
      // Update all category references
      const updatedTool = { ...tool };
      if (updatedTool.category !== undefined) {
        updatedTool.category = targetCategory;
      }
      
      // Update overview category if it exists
      if (updatedTool.overview?.category) {
        updatedTool.overview.category = targetCategory;
      }
      
      // Update schema category if it exists
      if (updatedTool.schema?.category) {
        updatedTool.schema.category = targetCategory;
      }
      
      // Update tags to reflect new category
      if (updatedTool.tags && currentCategory) {
        updatedTool.tags = updatedTool.tags.filter(tag => 
          !tag.includes(currentCategory.toLowerCase())
        );
        updatedTool.tags.unshift(targetCategory.toLowerCase());
      }
      
      return updatedTool;
    }
    
    return tool;
  });
  
  console.log(`\n📊 Processed ${processedTools} tools`);
  console.log('\n📋 Move Summary:');
  Object.entries(moveCounts).forEach(([category, count]) => {
    if (count > 0) {
      console.log(`   ${category}: +${count} tools`);
    }
  });
  
  return updatedTools;
}

function analyzeCategories(tools) {
  const categoryStats = {};
  
  tools.forEach(tool => {
    const category = tool.overview?.category || tool.category || 'Unknown';
    categoryStats[category] = (categoryStats[category] || 0) + 1;
  });
  
  console.log('\n📊 Final Category Distribution:');
  Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count} tools`);
    });
  
  // Identify empty categories (though there shouldn't be any after this operation)
  const emptyCategories = Object.entries(categoryStats)
    .filter(([,count]) => count === 0)
    .map(([category]) => category);
    
  if (emptyCategories.length > 0) {
    console.log('\n⚠️ Empty categories found:', emptyCategories.join(', '));
  } else {
    console.log('\n✅ No empty categories found');
  }
  
  return categoryStats;
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

function validateChanges(originalTools, updatedTools) {
  console.log('\n🔍 Validating changes...');
  
  // Check tool count remains the same
  if (originalTools.length !== updatedTools.length) {
    console.error(`❌ Tool count mismatch: ${originalTools.length} → ${updatedTools.length}`);
    return false;
  }
  
  // Check all tools still have valid categories
  const invalidTools = updatedTools.filter(tool => {
    const category = tool.overview?.category || tool.category;
    return !category || category.trim() === '';
  });
  if (invalidTools.length > 0) {
    console.error(`❌ ${invalidTools.length} tools have invalid categories`);
    return false;
  }
  
  // Check for any tools that might have been lost
  const originalIds = new Set(originalTools.map(tool => tool.id));
  const updatedIds = new Set(updatedTools.map(tool => tool.id));
  
  const lostTools = [...originalIds].filter(id => !updatedIds.has(id));
  const addedTools = [...updatedIds].filter(id => !originalIds.has(id));
  
  if (lostTools.length > 0) {
    console.error(`❌ Lost tools: ${lostTools.join(', ')}`);
    return false;
  }
  
  if (addedTools.length > 0) {
    console.error(`❌ Unexpected new tools: ${addedTools.join(', ')}`);
    return false;
  }
  
  console.log('✅ All validation checks passed');
  return true;
}

async function main() {
  console.log('🚀 AI Tools Category Reorganization\n');
  
  // Create backup
  if (!createBackup()) {
    process.exit(1);
  }
  
  // Load data
  const originalTools = loadToolsData();
  if (!originalTools) {
    process.exit(1);
  }
  
  // Show original category distribution
  console.log('\n📊 Original Category Distribution:');
  const originalStats = {};
  originalTools.forEach(tool => {
    const category = tool.overview?.category || tool.category || 'Unknown';
    originalStats[category] = (originalStats[category] || 0) + 1;
  });
  Object.entries(originalStats)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count} tools`);
    });
  
  // Reorganize categories
  const updatedTools = reorganizeCategories(originalTools);
  
  // Validate changes
  if (!validateChanges(originalTools, updatedTools)) {
    console.error('\n❌ Validation failed. Not saving changes.');
    process.exit(1);
  }
  
  // Analyze final categories
  analyzeCategories(updatedTools);
  
  // Save updated data
  if (!saveUpdatedData(updatedTools)) {
    process.exit(1);
  }
  
  console.log('\n🎉 Category reorganization completed successfully!');
  console.log('\n💡 Summary of changes:');
  console.log('   • AI Writing Assistant → Content Creation');
  console.log('   • AI Content Strategy & Optimization → Content Creation');
  console.log('   • Marketing → Email Marketing');
  console.log('   • App Development → Code Generation');
  console.log('   • Server Management → Productivity');
  console.log('   • n8n, Zapier AI, Grok → AI Automation');
  console.log('\n📁 Backup saved to:', BACKUP_FILE);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;