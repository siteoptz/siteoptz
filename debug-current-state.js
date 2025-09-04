#!/usr/bin/env node

const fs = require('fs');

console.log('🔍 Debugging current state of new tools...\n');

const data = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));
const newTools = data.slice(231);

console.log(`📊 Total tools: ${data.length} (${data.length - newTools.length} original + ${newTools.length} new)\n`);

console.log('🔍 Sample of new tools (first 10):');
newTools.slice(0, 10).forEach((tool, i) => {
  console.log(`${i+1}. ${tool.name}`);
  console.log(`   Category: ${tool.overview?.category || tool.category || 'NONE'}`);
  console.log(`   Pricing: ${tool.pricing ? tool.pricing.length + ' plans' : 'NONE'}`);
  console.log(`   First plan: ${tool.pricing?.[0]?.plan || 'NONE'} - $${tool.pricing?.[0]?.price_per_month || 'NONE'}`);
  console.log(`   Description: ${(tool.description || '').substring(0, 80)}...`);
  console.log(`   Features: ${tool.features ? tool.features.length + ' features' : 'NONE'}`);
  console.log('');
});

console.log('📊 Category distribution in new tools:');
const categoryCount = {};
newTools.forEach(tool => {
  const category = tool.overview?.category || tool.category || 'UNCATEGORIZED';
  categoryCount[category] = (categoryCount[category] || 0) + 1;
});

Object.entries(categoryCount)
  .sort(([,a], [,b]) => b - a)
  .forEach(([category, count]) => {
    console.log(`  • ${category}: ${count} tools`);
  });

console.log('\n🔍 Checking data structure consistency:');
let missingCategory = 0;
let missingPricing = 0;
let shortDescription = 0;
let missingFeatures = 0;

newTools.forEach(tool => {
  if (!tool.overview?.category && !tool.category) missingCategory++;
  if (!tool.pricing || tool.pricing.length === 0) missingPricing++;
  if (!tool.description || tool.description.length < 50) shortDescription++;
  if (!tool.features || tool.features.length === 0) missingFeatures++;
});

console.log(`  ❌ Missing category: ${missingCategory} tools`);
console.log(`  ❌ Missing pricing: ${missingPricing} tools`);
console.log(`  ❌ Short description: ${shortDescription} tools`);
console.log(`  ❌ Missing features: ${missingFeatures} tools`);