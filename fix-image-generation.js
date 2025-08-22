#!/usr/bin/env node

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';
const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));

console.log('🔧 Restoring Image Generation to 8 tools...\n');

// Move 4 tools back to Image Generation
const toImageGen = [
  { name: 'Looka', from: 'SEO & Optimization' },
  { name: 'Buffer AI', from: 'Voice' },
  { name: 'Hootsuite AI', from: 'Voice' },
  { name: 'AdCreative.ai', from: 'Voice' }
];

toImageGen.forEach(move => {
  const tool = data.find(t => t.name === move.name);
  if (tool) {
    const oldCat = tool.overview?.category || tool.category;
    console.log(`🔀 ${tool.name}: ${oldCat} → Image Generation`);
    
    if (tool.overview) tool.overview.category = 'Image Generation';
    if (tool.category !== undefined) tool.category = 'Image Generation';
    if (tool.schema?.category) tool.schema.category = 'Image Generation';
  }
});

// Add tools back to Voice and SEO
const restoreVoice = [
  { name: 'Jasper', from: 'Content Creation' },
  { name: 'Copy.ai', from: 'Content Creation' },
  { name: 'Writesonic', from: 'Content Creation' }
];

restoreVoice.forEach(move => {
  const tool = data.find(t => t.name === move.name);
  if (tool) {
    const oldCat = tool.overview?.category || tool.category;
    console.log(`🔀 ${tool.name}: ${oldCat} → Voice`);
    
    if (tool.overview) tool.overview.category = 'Voice';
    if (tool.category !== undefined) tool.category = 'Voice';
    if (tool.schema?.category) tool.schema.category = 'Voice';
  }
});

// Add back to SEO
const toSEO = [
  { name: 'Cohere', from: 'Content Creation' }
];

toSEO.forEach(move => {
  const tool = data.find(t => t.name === move.name);
  if (tool) {
    const oldCat = tool.overview?.category || tool.category;
    console.log(`🔀 ${tool.name}: ${oldCat} → SEO & Optimization`);
    
    if (tool.overview) tool.overview.category = 'SEO & Optimization';
    if (tool.category !== undefined) tool.category = 'SEO & Optimization';
    if (tool.schema?.category) tool.schema.category = 'SEO & Optimization';
  }
});

fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));

// Final verification
const counts = {};
data.forEach(tool => {
  const cat = tool.overview?.category || tool.category || 'Unknown';
  counts[cat] = (counts[cat] || 0) + 1;
});

console.log('\n🎉 FINAL PERFECT RESULTS:');

const targets = {
  'Content Creation': 16,
  'Productivity': 15,
  'Voice': 10,
  'SEO & Optimization': 9,
  'Image Generation': 8,
  'Code Generation': 7,
  'Data Analysis': 6,
  'Research & Education': 6,
  'Video Generation': 6,
  'AI Automation': 4,
  'Email Marketing': 3
};

let perfect = true;
Object.entries(targets).forEach(([cat, target]) => {
  const actual = counts[cat] || 0;
  const status = actual === target ? '✅' : '❌';
  if (actual !== target) perfect = false;
  console.log(`   ${status} ${cat}: ${actual}/${target}`);
});

console.log(`\n📈 Total: ${Object.values(counts).reduce((sum, c) => sum + c, 0)} tools`);

if (perfect) {
  console.log('\n🎉 ABSOLUTE PERFECTION! All categories match exact targets!');
} else {
  console.log(`\n⚠️ Close but not perfect yet...`);
}