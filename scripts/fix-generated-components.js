#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Fix Generated Components Script
 * Fixes invalid component names in generated comparison pages
 */

function slugToPascalCase(slug) {
  return slug.split('-')
    .map(word => {
      // Handle words that start with numbers
      if (/^\d/.test(word)) {
        return 'Tool' + word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

function fixComponentFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath, '.tsx');
  
  // Extract tool names from filename
  const [tool1, tool2] = filename.split('-vs-');
  
  const correctComponent1 = slugToPascalCase(tool1);
  const correctComponent2 = slugToPascalCase(tool2);
  const correctComponentName = `${correctComponent1}Vs${correctComponent2}`;
  
  // Find the incorrect component name
  const componentNameRegex = /export default function ([^{(]+)\(/;
  const match = content.match(componentNameRegex);
  
  if (match) {
    const oldName = match[1].trim();
    
    // Replace the component name
    const fixedContent = content.replace(
      new RegExp(`export default function ${oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\(`),
      `export default function ${correctComponentName}(`
    );
    
    fs.writeFileSync(filePath, fixedContent);
    console.log(`✅ Fixed: ${filename}.tsx (${oldName} → ${correctComponentName})`);
  }
}

function main() {
  console.log('🔧 Fixing generated component names...');
  
  // Fix comparison pages
  const compareFiles = glob.sync('/Users/siteoptz/siteoptz/pages/compare/*.tsx');
  
  compareFiles.forEach(filePath => {
    try {
      if (!filePath.includes('index') && !filePath.includes('[')) {
        fixComponentFile(filePath);
      }
    } catch (error) {
      console.log(`⚠️  Failed to fix ${filePath}: ${error.message}`);
    }
  });
  
  console.log('✅ Component name fixes completed!');
}

main();