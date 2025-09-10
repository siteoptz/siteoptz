#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixCSVUrlFormat(inputFile, outputFile) {
  console.log(`🔧 Processing ${inputFile}...`);
  
  if (!fs.existsSync(inputFile)) {
    console.error(`❌ File not found: ${inputFile}`);
    return;
  }
  
  // Read the CSV content
  const content = fs.readFileSync(inputFile, 'utf8');
  const lines = content.trim().split('\n');
  
  console.log(`📊 Found ${lines.length} lines (including header)`);
  
  let fixedCount = 0;
  const fixedLines = [];
  
  lines.forEach((line, index) => {
    if (index === 0) {
      // Keep header as-is
      fixedLines.push(line);
      return;
    }
    
    // Check if line contains the old format
    if (line.includes('/compare/') && line.includes('-vs-')) {
      // Extract URL part and fix it
      const parts = line.split(',');
      const url = parts[0];
      
      // Convert from: https://siteoptz.ai/compare/tool1-vs-tool2
      // To: https://siteoptz.ai/compare/tool1/vs/tool2
      const fixedUrl = url.replace(/\/compare\/([^-]+)-vs-([^,\s]+)/, '/compare/$1/vs/$2');
      
      if (fixedUrl !== url) {
        parts[0] = fixedUrl;
        fixedLines.push(parts.join(','));
        fixedCount++;
        
        if (fixedCount <= 5) {
          console.log(`✅ Fixed: ${url} → ${fixedUrl}`);
        }
      } else {
        fixedLines.push(line);
      }
    } else {
      fixedLines.push(line);
    }
  });
  
  // Write the fixed content
  const fixedContent = fixedLines.join('\n');
  fs.writeFileSync(outputFile, fixedContent);
  
  console.log(`\n📈 Results:`);
  console.log(`✅ URLs fixed: ${fixedCount}`);
  console.log(`📝 Total lines: ${lines.length}`);
  console.log(`💾 Output saved to: ${outputFile}`);
  
  if (fixedCount > 5) {
    console.log(`\n🔍 Sample of fixed URLs (showing first 5):`);
    // Already shown above
  }
}

// If run directly with arguments
if (process.argv.length >= 3) {
  const inputFile = process.argv[2];
  const outputFile = process.argv[3] || inputFile.replace('.csv', '_fixed.csv');
  fixCSVUrlFormat(inputFile, outputFile);
} else {
  console.log('Usage: node fix-csv-url-format.js <input-file> [output-file]');
  console.log('Example: node fix-csv-url-format.js original.csv fixed.csv');
}

module.exports = { fixCSVUrlFormat };