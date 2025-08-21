#!/usr/bin/env node

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';
const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));

// Move Make to AI Automation
const make = data.find(t => t.name === 'Make');
if (make) {
  const oldCat = make.overview?.category || make.category;
  console.log(`🔀 Make: ${oldCat} → AI Automation`);
  
  if (make.overview) make.overview.category = 'AI Automation';
  if (make.category !== undefined) make.category = 'AI Automation';
  if (make.schema?.category) make.schema.category = 'AI Automation';
}

fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));

// Show final AI Automation category
const aiAutomationTools = data.filter(t => 
  (t.overview?.category || t.category) === 'AI Automation'
).map(t => t.name);

console.log('\n✅ AI Automation category now has 4 tools:');
aiAutomationTools.forEach(name => console.log(`   • ${name}`));

// Final distribution
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