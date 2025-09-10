#!/usr/bin/env node

const fs = require('fs');

function analyze404Tools() {
  console.log('🔍 Analyzing tools in 404 CSV...');
  
  // Load valid tools from our data
  const aiToolsData = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));
  const validSlugs = new Set(aiToolsData.map(tool => tool.slug));
  
  // Read the CSV file
  const csvContent = fs.readFileSync('siteoptz.ai_http_4xx_client_errors_20250910.csv', 'utf8');
  const lines = csvContent.trim().split('\n');
  
  const toolsInCSV = new Set();
  const invalidTools = new Set();
  
  // Extract all tools from CSV
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const [url] = line.split(',');
    
    const compareMatch = url.match(/\/compare\/(.+)/);
    if (!compareMatch) continue;
    
    const comparison = compareMatch[1];
    const vsMatch = comparison.match(/^(.+)-vs-(.+)$/);
    if (!vsMatch) continue;
    
    const [, tool1, tool2] = vsMatch;
    
    toolsInCSV.add(tool1);
    toolsInCSV.add(tool2);
    
    if (!validSlugs.has(tool1)) {
      invalidTools.add(tool1);
    }
    if (!validSlugs.has(tool2)) {
      invalidTools.add(tool2);
    }
  }
  
  console.log(`📊 Found ${toolsInCSV.size} unique tools in CSV`);
  console.log(`✅ Valid tools in data: ${validSlugs.size}`);
  console.log(`❌ Invalid tools in CSV: ${invalidTools.size}`);
  
  if (invalidTools.size > 0) {
    console.log('\n❌ Invalid tools that should be removed:');
    Array.from(invalidTools).sort().forEach(tool => {
      console.log(`  - ${tool}`);
    });
  } else {
    console.log('\n✅ All tools in the CSV are valid!');
  }
}

// Run the analysis
analyze404Tools();