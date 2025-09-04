#!/usr/bin/env node

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));

console.log('🔍 Analyzing tool data quality...\n');

// Check website patterns
const websitePatterns = {};
const newTools = data.slice(231); // All new tools

newTools.forEach(tool => {
  const website = tool.overview?.website || tool.website || 'No website';
  const domain = website.includes('://') ? website.split('/')[2] : website;
  websitePatterns[domain] = (websitePatterns[domain] || 0) + 1;
});

console.log('📊 Website domain patterns:');
Object.entries(websitePatterns)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 10)
  .forEach(([domain, count]) => {
    console.log(`  • ${domain}: ${count} tools`);
  });

console.log('\n🔍 Tools with real websites:');
const realTools = newTools.filter(tool => {
  const website = tool.overview?.website || tool.website || '';
  return !website.includes('theresanaiforthat.com') && 
         !website.includes('favicon') && 
         !website.includes('media.') &&
         website.includes('http') &&
         !website.endsWith('.png') &&
         !website.endsWith('.svg');
}).slice(0, 15);

realTools.forEach(tool => {
  console.log(`  • ${tool.name}: ${tool.overview?.website || tool.website}`);
});

const totalRealTools = newTools.filter(tool => {
  const website = tool.overview?.website || tool.website || '';
  return !website.includes('theresanaiforthat.com') && 
         !website.includes('favicon') && 
         !website.includes('media.') &&
         website.includes('http') &&
         !website.endsWith('.png') &&
         !website.endsWith('.svg');
}).length;

console.log(`\nTotal tools with real websites: ${totalRealTools}/${newTools.length}`);

// Check categories
console.log('\n📊 Category distribution in new tools:');
const categoryCount = {};
newTools.forEach(tool => {
  const category = tool.overview?.category || tool.category || 'Unknown';
  categoryCount[category] = (categoryCount[category] || 0) + 1;
});

Object.entries(categoryCount)
  .sort(([,a], [,b]) => b - a)
  .forEach(([category, count]) => {
    console.log(`  • ${category}: ${count} tools`);
  });

// Identify scraping artifacts (navigation elements, not real tools)
console.log('\n🗑️ Likely scraping artifacts (not real tools):');
const artifacts = newTools.filter(tool => {
  const name = tool.name.toLowerCase();
  return name.includes('login') ||
         name.includes('home') ||
         name.includes('menu') ||
         name.includes('search') ||
         name.includes('profile picture') ||
         name.includes('view all') ||
         name === 'new' ||
         name === 'popular' ||
         name === 'trending' ||
         name === 'more' ||
         name === 'apps' ||
         name === 'deals' ||
         name === 'tasks' ||
         name === 'for you' ||
         name.includes('background');
}).slice(0, 15);

artifacts.forEach(tool => {
  console.log(`  • ${tool.name}`);
});

console.log(`\nTotal likely artifacts: ${newTools.filter(tool => {
  const name = tool.name.toLowerCase();
  return name.includes('login') ||
         name.includes('home') ||
         name.includes('menu') ||
         name.includes('search') ||
         name.includes('profile picture') ||
         name.includes('view all') ||
         name === 'new' ||
         name === 'popular' ||
         name === 'trending' ||
         name === 'more' ||
         name === 'apps' ||
         name === 'deals' ||
         name === 'tasks' ||
         name === 'for you' ||
         name.includes('background');
}).length}/${newTools.length}`);