#!/usr/bin/env node

const fs = require('fs');
const glob = require('glob');

/**
 * Fix Component Naming Errors Script
 * Fixes parsing errors in generated components with invalid naming
 */

function fixComponentName(componentName) {
  return componentName
    .replace(/[^a-zA-Z0-9]/g, '') // Remove all special characters
    .replace(/^(\d)/, 'Tool$1') // Add 'Tool' prefix if starts with number
    .replace(/(\d+)/g, match => match) // Keep numbers but ensure they're valid
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function fixComponentFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const filename = path.basename(filePath, '.tsx');
    
    // Extract current component name
    const componentNameMatch = content.match(/export default function ([^(]+)\(/);
    if (!componentNameMatch) {
      console.log(`⚠️  Could not find component function in ${filePath}`);
      return false;
    }
    
    const currentName = componentNameMatch[1];
    const fixedName = fixComponentName(currentName);
    
    if (currentName !== fixedName) {
      const fixedContent = content.replace(
        new RegExp(`export default function ${currentName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\(`, 'g'),
        `export default function ${fixedName}(`
      );
      
      fs.writeFileSync(filePath, fixedContent);
      console.log(`✅ Fixed: ${filename} (${currentName} → ${fixedName})`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.log(`⚠️  Error fixing ${filePath}: ${error.message}`);
    return false;
  }
}

function main() {
  console.log('🔧 Fixing component naming errors...');
  
  const problematicFiles = [
    'pages/case-studies/ai-customer-service.tsx',
    'pages/case-studies/ai-cybersecurity.tsx', 
    'pages/case-studies/fortune-500-chatgpt.tsx',
    'pages/case-studies/manufacturing-ai.tsx',
    'pages/case-studies/marketing-ai-success.tsx',
    'pages/case-studies/no-code-ai-wins.tsx',
    'pages/case-studies/predictive-analytics.tsx',
    'pages/case-studies/sales-ai.tsx',
    'pages/case-studies/smart-manufacturing.tsx'
  ];
  
  let fixedCount = 0;
  
  problematicFiles.forEach(relativePath => {
    const fullPath = `/Users/siteoptz/siteoptz/${relativePath}`;
    if (fs.existsSync(fullPath)) {
      if (fixComponentFile(fullPath)) {
        fixedCount++;
      }
    }
  });
  
  // Also check for additional files that might have similar issues
  const allFiles = glob.sync('/Users/siteoptz/siteoptz/pages/**/*.tsx');
  
  allFiles.forEach(filePath => {
    if (!problematicFiles.some(p => filePath.includes(p))) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const componentMatch = content.match(/export default function ([^(]+)\(/);
        if (componentMatch) {
          const componentName = componentMatch[1];
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
            if (fixComponentFile(filePath)) {
              fixedCount++;
            }
          }
        }
      } catch (error) {
        // Skip files with errors
      }
    }
  });
  
  console.log(`\n✅ Component naming fix complete!`);
  console.log(`📊 Fixed ${fixedCount} component naming issues`);
}

if (require.main === module) {
  main();
}

module.exports = { main };