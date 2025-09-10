#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fix404CSVFormat() {
  console.log('📋 Fixing CSV file URL formats from [tool]-vs-[tool] to [tool]/vs/[tool]...');
  
  // Load valid tools from our data
  const aiToolsData = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));
  const validSlugs = new Set(aiToolsData.map(tool => tool.slug));
  
  console.log(`✅ Found ${validSlugs.size} valid tool slugs`);
  
  // Read the CSV file
  const csvPath = 'siteoptz.ai_http_4xx_client_errors_20250910 (2).csv';
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.trim().split('\n');
  
  console.log(`📊 Processing ${lines.length - 1} error URLs...`);
  
  // Process header
  const header = lines[0];
  const fixedLines = [header];
  
  let removedCount = 0;
  let fixedCount = 0;
  let invalidFormatCount = 0;
  
  // Process each URL
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const [url, httpCode, discovered] = line.split(',');
    
    // Extract comparison from URL
    const compareMatch = url.match(/\/compare\/(.+)/);
    if (!compareMatch) {
      console.log(`⚠️  Skipping non-compare URL: ${url}`);
      invalidFormatCount++;
      continue;
    }
    
    const comparison = compareMatch[1];
    
    // Parse tool1-vs-tool2 format
    const vsMatch = comparison.match(/^(.+)-vs-(.+)$/);
    if (!vsMatch) {
      console.log(`⚠️  Skipping invalid comparison format: ${comparison}`);
      invalidFormatCount++;
      continue;
    }
    
    const [, tool1, tool2] = vsMatch;
    
    // Check if both tools exist in our data
    if (!validSlugs.has(tool1) || !validSlugs.has(tool2)) {
      console.log(`❌ Removing non-existent tools: ${tool1} vs ${tool2}`);
      removedCount++;
      continue;
    }
    
    // Convert to correct format: /compare/tool1/vs/tool2
    const newUrl = `https://siteoptz.ai/compare/${tool1}/vs/${tool2}`;
    const newLine = `${newUrl},${httpCode},${discovered}`;
    
    fixedLines.push(newLine);
    fixedCount++;
  }
  
  // Write the fixed CSV
  const outputPath = 'siteoptz.ai_http_4xx_client_errors_20250910_fixed_correct.csv';
  const fixedContent = fixedLines.join('\n');
  fs.writeFileSync(outputPath, fixedContent);
  
  console.log('\n📈 Processing Results:');
  console.log(`✅ Fixed URLs: ${fixedCount}`);
  console.log(`❌ Removed non-existent tools: ${removedCount}`);
  console.log(`⚠️  Invalid format URLs: ${invalidFormatCount}`);
  console.log(`📝 Total remaining URLs: ${fixedLines.length - 1}`);
  console.log(`💾 Saved to: ${outputPath}`);
  
  // Show sample fixed URLs
  console.log('\n🔍 Sample fixed URLs:');
  fixedLines.slice(1, 6).forEach(line => {
    const url = line.split(',')[0];
    console.log(`  ${url}`);
  });
  
  return {
    fixed: fixedCount,
    removed: removedCount,
    invalid: invalidFormatCount,
    outputFile: outputPath
  };
}

// Run the fix
const results = fix404CSVFormat();
console.log(`\n🎯 Task completed! Fixed ${results.fixed} URLs to correct format.`);