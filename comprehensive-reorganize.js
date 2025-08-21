#!/usr/bin/env node

/**
 * Comprehensive AI Tools Category Reorganization
 * Reorganize to match exact specified totals
 */

import fs from 'fs';
import path from 'path';

const TOOLS_FILE = 'public/data/aiToolsData.json';
const BACKUP_FILE = 'public/data/aiToolsData-comprehensive-backup.json';

// Target category totals (as specified by user)
const TARGET_CATEGORIES = {
  'Content Creation': 16,
  'Email Marketing': 3,
  'Code Generation': 7,
  'Productivity': 18,
  'AI Automation': 4,
  'Social Media': 8,
  'Paid Search & PPC': 5,
  'Voice': 10,  // "Best Voice AI Tools" → "Voice"
  'SEO & Optimization': 9,
  'Video Generation': 6,
  'Image Generation': 8,
  'Advertising & Marketing': 1,
  'Data Analysis': 6,
  'Branding & Design': 1,  // "Branding & design" → "Branding & Design"
  'Research & Education': 6
};

// Category mappings for renaming and consolidation
const CATEGORY_MAPPINGS = {
  'Best Voice AI Tools': 'Voice',
  'Branding & design': 'Branding & Design',
  'Automation Platform': 'AI Automation'  // merge into AI Automation
};

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

function analyzeCurrentState(tools) {
  const currentCategories = {};
  const toolsByCategory = {};
  
  tools.forEach(tool => {
    const category = tool.overview?.category || tool.category || 'Unknown';
    currentCategories[category] = (currentCategories[category] || 0) + 1;
    
    if (!toolsByCategory[category]) {
      toolsByCategory[category] = [];
    }
    toolsByCategory[category].push(tool);
  });
  
  console.log('\n📊 Current Category Distribution:');
  Object.entries(currentCategories)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
      const target = TARGET_CATEGORIES[category] || TARGET_CATEGORIES[CATEGORY_MAPPINGS[category]];
      const status = target ? (count === target ? '✅' : count < target ? '📈' : '📉') : '❓';
      console.log(`   ${status} ${category}: ${count} tools ${target ? `(target: ${target})` : ''}`);
    });
    
  return { currentCategories, toolsByCategory };
}

function suggestReorganization(toolsByCategory) {
  console.log('\n💡 Reorganization Strategy:');
  
  // Tools that need to find new homes to reach targets
  const surplus = {};
  const deficit = {};
  
  // Calculate surplus and deficit
  Object.entries(toolsByCategory).forEach(([category, tools]) => {
    const mappedCategory = CATEGORY_MAPPINGS[category] || category;
    const target = TARGET_CATEGORIES[mappedCategory];
    
    if (target) {
      const current = tools.length;
      if (current > target) {
        surplus[category] = current - target;
      } else if (current < target) {
        deficit[mappedCategory] = target - current;
      }
    }
  });
  
  console.log('\n📉 Categories with surplus:');
  Object.entries(surplus).forEach(([category, extra]) => {
    console.log(`   ${category}: ${extra} tools need reassignment`);
  });
  
  console.log('\n📈 Categories needing more tools:');
  Object.entries(deficit).forEach(([category, needed]) => {
    console.log(`   ${category}: needs ${needed} more tools`);
  });
  
  return { surplus, deficit };
}

function intelligentReorganization(tools, toolsByCategory) {
  console.log('\n🔄 Starting intelligent reorganization...');
  
  let updatedTools = [...tools];
  let moveCount = 0;
  
  // Step 1: Apply direct category mappings (renames)
  updatedTools = updatedTools.map(tool => {
    const currentCategory = tool.overview?.category || tool.category;
    const newCategory = CATEGORY_MAPPINGS[currentCategory];
    
    if (newCategory && newCategory !== currentCategory) {
      console.log(`🏷️  Rename: ${tool.name} from "${currentCategory}" to "${newCategory}"`);
      const updatedTool = { ...tool };
      
      if (updatedTool.category !== undefined) {
        updatedTool.category = newCategory;
      }
      if (updatedTool.overview?.category) {
        updatedTool.overview.category = newCategory;
      }
      if (updatedTool.schema?.category) {
        updatedTool.schema.category = newCategory;
      }
      
      moveCount++;
      return updatedTool;
    }
    
    return tool;
  });
  
  // Step 2: Strategic moves based on tool characteristics
  const strategicMoves = [
    // Move social media tools to Social Media category
    {
      condition: (tool) => {
        const name = tool.name.toLowerCase();
        const desc = (tool.description || '').toLowerCase();
        return name.includes('social') || desc.includes('social media') || 
               name.includes('hootsuite') || name.includes('buffer') ||
               desc.includes('social posts') || desc.includes('social content');
      },
      targetCategory: 'Social Media',
      reason: 'Social media functionality'
    },
    
    // Move PPC/advertising tools to Paid Search & PPC
    {
      condition: (tool) => {
        const name = tool.name.toLowerCase();
        const desc = (tool.description || '').toLowerCase();
        return name.includes('adwords') || name.includes('ppc') || 
               name.includes('ads') || desc.includes('paid search') ||
               desc.includes('advertising') || desc.includes('ad creative');
      },
      targetCategory: 'Paid Search & PPC',
      reason: 'PPC/advertising functionality'
    },
    
    // Move more SEO tools to SEO & Optimization
    {
      condition: (tool) => {
        const name = tool.name.toLowerCase();
        const desc = (tool.description || '').toLowerCase();
        return name.includes('seo') || name.includes('semrush') || 
               name.includes('ahrefs') || desc.includes('search engine') ||
               desc.includes('keyword') || desc.includes('optimization') ||
               name.includes('frase') || name.includes('surfer');
      },
      targetCategory: 'SEO & Optimization',
      reason: 'SEO functionality'
    },
    
    // Move productivity tools that are currently misclassified
    {
      condition: (tool) => {
        const name = tool.name.toLowerCase();
        const desc = (tool.description || '').toLowerCase();
        const currentCat = tool.overview?.category || tool.category;
        return (currentCat !== 'Productivity') && 
               (name.includes('productivity') || name.includes('task') || 
                name.includes('workflow') || name.includes('calendar') ||
                name.includes('note') || name.includes('organization'));
      },
      targetCategory: 'Productivity',
      reason: 'Productivity functionality'
    }
  ];
  
  // Apply strategic moves
  strategicMoves.forEach(move => {
    const currentCounts = getCurrentCounts(updatedTools);
    const currentTarget = currentCounts[move.targetCategory] || 0;
    const targetLimit = TARGET_CATEGORIES[move.targetCategory] || 999;
    
    if (currentTarget < targetLimit) {
      const toolsToMove = updatedTools.filter(tool => {
        const currentCategory = tool.overview?.category || tool.category;
        return currentCategory !== move.targetCategory && move.condition(tool);
      });
      
      const spacesAvailable = targetLimit - currentTarget;
      const toolsToMoveNow = toolsToMove.slice(0, spacesAvailable);
      
      toolsToMoveNow.forEach(tool => {
        const oldCategory = tool.overview?.category || tool.category;
        console.log(`🎯 Strategic move: ${tool.name} from "${oldCategory}" to "${move.targetCategory}" (${move.reason})`);
        
        // Update the tool
        const toolIndex = updatedTools.findIndex(t => t.id === tool.id);
        if (toolIndex !== -1) {
          updatedTools[toolIndex] = { ...updatedTools[toolIndex] };
          if (updatedTools[toolIndex].category !== undefined) {
            updatedTools[toolIndex].category = move.targetCategory;
          }
          if (updatedTools[toolIndex].overview?.category) {
            updatedTools[toolIndex].overview.category = move.targetCategory;
          }
          if (updatedTools[toolIndex].schema?.category) {
            updatedTools[toolIndex].schema.category = move.targetCategory;
          }
          moveCount++;
        }
      });
    }
  });
  
  console.log(`\n📊 Made ${moveCount} category changes`);
  return updatedTools;
}

function getCurrentCounts(tools) {
  const counts = {};
  tools.forEach(tool => {
    const category = tool.overview?.category || tool.category || 'Unknown';
    counts[category] = (counts[category] || 0) + 1;
  });
  return counts;
}

function validateAndAnalyze(updatedTools) {
  const finalCounts = getCurrentCounts(updatedTools);
  
  console.log('\n📊 Final Category Distribution:');
  Object.entries(TARGET_CATEGORIES)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, target]) => {
      const actual = finalCounts[category] || 0;
      const status = actual === target ? '✅' : actual < target ? '📈' : '📉';
      const diff = actual - target;
      const diffStr = diff > 0 ? ` (+${diff})` : diff < 0 ? ` (${diff})` : '';
      console.log(`   ${status} ${category}: ${actual}/${target}${diffStr}`);
    });
  
  // Show categories not in target list
  Object.entries(finalCounts).forEach(([category, count]) => {
    if (!TARGET_CATEGORIES[category]) {
      console.log(`   ❓ ${category}: ${count} tools (not in target list)`);
    }
  });
  
  const totalTools = Object.values(finalCounts).reduce((sum, count) => sum + count, 0);
  console.log(`\n📈 Total tools: ${totalTools}`);
  
  return finalCounts;
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
  console.log('🚀 Comprehensive AI Tools Category Reorganization\n');
  
  // Create backup
  if (!createBackup()) {
    process.exit(1);
  }
  
  // Load data
  const tools = loadToolsData();
  if (!tools) {
    process.exit(1);
  }
  
  // Analyze current state
  const { currentCategories, toolsByCategory } = analyzeCurrentState(tools);
  
  // Suggest reorganization strategy
  const { surplus, deficit } = suggestReorganization(toolsByCategory);
  
  // Perform intelligent reorganization
  const updatedTools = intelligentReorganization(tools, toolsByCategory);
  
  // Validate and analyze results
  validateAndAnalyze(updatedTools);
  
  // Save updated data
  if (!saveUpdatedData(updatedTools)) {
    process.exit(1);
  }
  
  console.log('\n🎉 Comprehensive reorganization completed!');
  console.log('📁 Backup saved to:', BACKUP_FILE);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;