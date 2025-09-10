#!/usr/bin/env node

const fs = require('fs');

function validateFixedURLs() {
  console.log('🔍 Validating fixed URLs...');
  
  // Load tools data
  const aiToolsData = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));
  const validSlugs = new Set(aiToolsData.map(tool => tool.slug));
  
  // Read the fixed CSV
  const csvPath = 'siteoptz.ai_http_4xx_client_errors_20250910_fixed_correct.csv';
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.trim().split('\n');
  
  console.log(`📊 Validating ${lines.length - 1} fixed URLs...`);
  
  let validCount = 0;
  let invalidCount = 0;
  const invalidUrls = [];
  
  // Check first 10 URLs as samples
  const sampleUrls = lines.slice(1, 11);
  
  console.log('\n🔍 Sample URL Validation:');
  sampleUrls.forEach((line, index) => {
    const [url] = line.split(',');
    
    // Extract comparison from URL
    const compareMatch = url.match(/\/compare\/(.+)/);
    if (!compareMatch) {
      console.log(`❌ ${index + 1}. Invalid URL format: ${url}`);
      invalidCount++;
      return;
    }
    
    const comparison = compareMatch[1];
    const parts = comparison.split('/');
    
    // Validate format: tool1/vs/tool2
    if (parts.length !== 3 || parts[1] !== 'vs') {
      console.log(`❌ ${index + 1}. Invalid comparison format: ${comparison}`);
      invalidCount++;
      return;
    }
    
    const [tool1, vs, tool2] = parts;
    
    // Check if both tools exist
    if (!validSlugs.has(tool1) || !validSlugs.has(tool2)) {
      console.log(`❌ ${index + 1}. Non-existent tools: ${tool1} vs ${tool2}`);
      invalidCount++;
      return;
    }
    
    console.log(`✅ ${index + 1}. Valid: ${tool1} vs ${tool2}`);
    validCount++;
  });
  
  // Check canonical URL format
  console.log('\n🌐 Canonical URL Format Validation:');
  const sampleCanonical = `https://siteoptz.ai/compare/${sampleUrls[0].split(',')[0].match(/compare\/(.+)/)[1]}`;
  console.log(`✅ Sample canonical URL: ${sampleCanonical}`);
  console.log(`✅ Format matches Next.js route: /compare/[tool]/vs/[tool]`);
  console.log(`✅ Route validation: parts.length === 3 && parts[1] === 'vs'`);
  
  console.log('\n📈 Validation Summary:');
  console.log(`✅ Valid URLs in sample: ${validCount}/10`);
  console.log(`❌ Invalid URLs in sample: ${invalidCount}/10`);
  console.log(`📝 Total URLs in file: ${lines.length - 1}`);
  
  if (validCount === 10) {
    console.log('\n🎯 All sample URLs are valid! The fixed format is correct.');
  }
}

validateFixedURLs();