#!/usr/bin/env node

const fs = require('fs');

/**
 * Extract source URLs from vercel.json redirects
 */

function extractUrlsFromVercelJson(vercelJsonPath, outputPath) {
  try {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
    
    if (!vercelConfig.redirects || !Array.isArray(vercelConfig.redirects)) {
      throw new Error('No redirects found in vercel.json');
    }
    
    const urls = vercelConfig.redirects
      .filter(redirect => redirect.source && redirect.destination) // Only redirects with both source and destination
      .map(redirect => redirect.source);
    
    // Write to file
    fs.writeFileSync(outputPath, urls.join('\n'));
    
    console.log(`Extracted ${urls.length} URLs from ${vercelJsonPath}`);
    console.log(`Saved to: ${outputPath}`);
    
    return urls;
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const vercelJsonPath = args[0] || 'vercel.json';
  const outputPath = args[1] || 'vercel-redirect-urls.txt';
  
  if (!fs.existsSync(vercelJsonPath)) {
    console.error(`Error: File ${vercelJsonPath} not found`);
    process.exit(1);
  }
  
  extractUrlsFromVercelJson(vercelJsonPath, outputPath);
}

if (require.main === module) {
  main();
}

module.exports = extractUrlsFromVercelJson;
