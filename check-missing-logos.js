const fs = require('fs');
const path = require('path');

console.log('Checking for missing logos...\n');

// Load tools data
const toolsData = JSON.parse(fs.readFileSync('./public/data/aiToolsData.json', 'utf8'));

// Get list of existing logo files
const logoDir = './public/images/tools';
const logoFiles = fs.readdirSync(logoDir).filter(file => file.endsWith('.svg') || file.endsWith('.png'));
const logoSet = new Set(logoFiles);

// Check each tool
let missingLogos = [];
let foundLogos = [];

toolsData.forEach(tool => {
  const toolName = tool.name;
  const expectedLogoName = `${toolName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-logo.svg`;
  const expectedLogoNamePng = `${toolName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-logo.png`;
  
  // Check if logo exists (either SVG or PNG)
  if (logoSet.has(expectedLogoName) || logoSet.has(expectedLogoNamePng)) {
    foundLogos.push({
      name: toolName,
      logoFile: logoSet.has(expectedLogoName) ? expectedLogoName : expectedLogoNamePng,
      hasLogo: tool.logo || 'none specified'
    });
  } else {
    missingLogos.push({
      name: toolName,
      expectedLogo: expectedLogoName,
      hasLogo: tool.logo || 'none specified',
      category: tool.overview?.category || 'unknown'
    });
  }
});

console.log(`=== SUMMARY ===`);
console.log(`Total tools: ${toolsData.length}`);
console.log(`Tools with logos: ${foundLogos.length}`);
console.log(`Tools missing logos: ${missingLogos.length}\n`);

if (missingLogos.length > 0) {
  console.log(`=== MISSING LOGOS ===`);
  missingLogos.forEach(tool => {
    console.log(`❌ ${tool.name} (${tool.category})`);
    console.log(`   Expected: ${tool.expectedLogo}`);
    console.log(`   Has logo field: ${tool.hasLogo}`);
    console.log('');
  });
}

console.log(`=== AVAILABLE PLACEHOLDER FILES ===`);
logoFiles.filter(f => f.includes('placeholder')).forEach(file => {
  console.log(`📄 ${file}`);
});