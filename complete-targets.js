#!/usr/bin/env node

/**
 * Complete the reorganization to match ALL specified targets
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';
const BACKUP_FILE = 'public/data/aiToolsData-complete-backup.json';

// ALL target totals as specified
const TARGETS = {
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

function createBackup() {
  fs.copyFileSync(TOOLS_FILE, BACKUP_FILE);
  console.log('✅ Created backup at:', BACKUP_FILE);
}

function getCurrentCounts(data) {
  const counts = {};
  data.forEach(tool => {
    const category = tool.overview?.category || tool.category || 'Unknown';
    counts[category] = (counts[category] || 0) + 1;
  });
  return counts;
}

function findToolsToMove(data, fromCategory, toCategory, needed) {
  // Find tools that could logically move from one category to another
  return data.filter(tool => {
    const currentCat = tool.overview?.category || tool.category;
    if (currentCat !== fromCategory) return false;
    
    const name = (tool.name || '').toLowerCase();
    const desc = (tool.description || '').toLowerCase();
    
    // Logic for different category moves
    if (toCategory === 'Social Media') {
      return name.includes('social') || desc.includes('social') || 
             name.includes('tweet') || name.includes('post') ||
             desc.includes('engagement') || desc.includes('sharing');
    }
    if (toCategory === 'Voice') {
      return name.includes('voice') || name.includes('audio') || 
             desc.includes('voice') || desc.includes('speech') ||
             desc.includes('audio') || desc.includes('sound');
    }
    if (toCategory === 'SEO & Optimization') {
      return name.includes('seo') || name.includes('search') ||
             desc.includes('seo') || desc.includes('optimization') ||
             desc.includes('ranking') || desc.includes('keywords');
    }
    if (toCategory === 'Paid Search & PPC') {
      return name.includes('ad') || name.includes('ppc') ||
             desc.includes('advertising') || desc.includes('paid') ||
             desc.includes('campaign') || desc.includes('ads');
    }
    
    return true; // Default: could potentially move
  }).slice(0, needed);
}

function makeStrategicMoves() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('🎯 Adjusting categories to match exact targets...\n');
  
  const current = getCurrentCounts(data);
  const moves = [];
  
  // Show what needs adjustment
  console.log('📊 Adjustments needed:');
  Object.entries(TARGETS).forEach(([category, target]) => {
    const currentCount = current[category] || 0;
    const diff = target - currentCount;
    if (diff !== 0) {
      console.log(`   ${category}: ${currentCount} → ${target} (${diff > 0 ? '+' : ''}${diff})`);
    }
  });
  
  console.log('\n🔄 Making strategic moves...\n');
  
  // Need more Voice tools (currently 5, need 10)
  // Move some audio/voice related tools from other categories
  const voiceNeeded = 5;
  const voiceCandidates = data.filter(tool => {
    const cat = tool.overview?.category || tool.category;
    const name = (tool.name || '').toLowerCase();
    const desc = (tool.description || '').toLowerCase();
    return cat !== 'Voice' && (
      name.includes('audio') || name.includes('sound') || 
      name.includes('music') || name.includes('speech') ||
      desc.includes('audio') || desc.includes('voice generation') ||
      desc.includes('text to speech') || desc.includes('sound')
    );
  }).slice(0, voiceNeeded);
  
  voiceCandidates.forEach(tool => {
    const oldCat = tool.overview?.category || tool.category;
    console.log(`🔀 ${tool.name}: ${oldCat} → Voice`);
    if (tool.overview) tool.overview.category = 'Voice';
    if (tool.category !== undefined) tool.category = 'Voice';
    if (tool.schema?.category) tool.schema.category = 'Voice';
  });
  
  // Need more SEO tools (currently 4, need 9)
  const seoNeeded = 5;
  const seoCandidates = data.filter(tool => {
    const cat = tool.overview?.category || tool.category;
    const name = (tool.name || '').toLowerCase();
    const desc = (tool.description || '').toLowerCase();
    return cat !== 'SEO & Optimization' && cat !== 'Voice' && (
      name.includes('content') && desc.includes('optimi') ||
      name.includes('search') || name.includes('rank') ||
      desc.includes('seo') || desc.includes('search engine') ||
      desc.includes('keyword') || desc.includes('visibility')
    );
  }).slice(0, seoNeeded);
  
  seoCandidates.forEach(tool => {
    const oldCat = tool.overview?.category || tool.category;
    console.log(`🔀 ${tool.name}: ${oldCat} → SEO & Optimization`);
    if (tool.overview) tool.overview.category = 'SEO & Optimization';
    if (tool.category !== undefined) tool.category = 'SEO & Optimization';
    if (tool.schema?.category) tool.schema.category = 'SEO & Optimization';
  });
  
  // Need more Social Media tools (currently 0, need 8)
  const socialNeeded = 8;
  const socialCandidates = data.filter(tool => {
    const cat = tool.overview?.category || tool.category;
    const name = (tool.name || '').toLowerCase();
    const desc = (tool.description || '').toLowerCase();
    return cat !== 'Social Media' && cat !== 'Voice' && cat !== 'SEO & Optimization' && (
      name.includes('social') || name.includes('post') || 
      name.includes('share') || name.includes('engage') ||
      desc.includes('social media') || desc.includes('social network') ||
      desc.includes('posts') || desc.includes('sharing') ||
      desc.includes('engagement') || desc.includes('viral')
    );
  }).slice(0, socialNeeded);
  
  socialCandidates.forEach(tool => {
    const oldCat = tool.overview?.category || tool.category;
    console.log(`🔀 ${tool.name}: ${oldCat} → Social Media`);
    if (tool.overview) tool.overview.category = 'Social Media';
    if (tool.category !== undefined) tool.category = 'Social Media';
    if (tool.schema?.category) tool.schema.category = 'Social Media';
  });
  
  // Need Paid Search & PPC (currently 0, need 5)
  const ppcNeeded = 5;
  const ppcCandidates = data.filter(tool => {
    const cat = tool.overview?.category || tool.category;
    const name = (tool.name || '').toLowerCase();
    const desc = (tool.description || '').toLowerCase();
    return cat !== 'Paid Search & PPC' && cat !== 'Voice' && 
           cat !== 'SEO & Optimization' && cat !== 'Social Media' && (
      name.includes('ad') || name.includes('campaign') ||
      desc.includes('advertising') || desc.includes('paid') ||
      desc.includes('ppc') || desc.includes('ads') ||
      desc.includes('campaign')
    );
  }).slice(0, ppcNeeded);
  
  ppcCandidates.forEach(tool => {
    const oldCat = tool.overview?.category || tool.category;
    console.log(`🔀 ${tool.name}: ${oldCat} → Paid Search & PPC`);
    if (tool.overview) tool.overview.category = 'Paid Search & PPC';
    if (tool.category !== undefined) tool.category = 'Paid Search & PPC';
    if (tool.schema?.category) tool.schema.category = 'Paid Search & PPC';
  });
  
  // Create Advertising & Marketing and Branding & Design categories with 1 tool each
  // Find suitable tools from overpopulated categories
  
  // Save the data
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  
  // Show final results
  const final = getCurrentCounts(data);
  console.log('\n📊 FINAL RESULTS:\n');
  
  const targetCategories = Object.keys(TARGETS).sort((a, b) => TARGETS[b] - TARGETS[a]);
  targetCategories.forEach(cat => {
    const count = final[cat] || 0;
    const target = TARGETS[cat];
    const status = count === target ? '✅' : count < target ? '⚠️' : '📈';
    console.log(`   ${status} ${cat}: ${count}/${target} tools`);
  });
  
  // Show any categories not in targets
  console.log('\n📋 Other categories:');
  Object.entries(final).forEach(([cat, count]) => {
    if (!TARGETS[cat]) {
      console.log(`   ❓ ${cat}: ${count} tools`);
    }
  });
  
  const totalTools = Object.values(final).reduce((sum, count) => sum + count, 0);
  console.log(`\n📈 Total tools: ${totalTools}`);
}

createBackup();
makeStrategicMoves();