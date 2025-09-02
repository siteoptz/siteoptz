#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Add SEO component mappings for all 53 new tools from insidr.ai
 */

function toPascalCase(str) {
  return str.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
}

function generateSEOMappings() {
  // Load the new tools we added
  const newToolsPath = path.join(__dirname, 'new-tools-to-add.json');
  const newTools = JSON.parse(fs.readFileSync(newToolsPath, 'utf8'));

  console.log(`🔧 Generating SEO mappings for ${newTools.length} new tools...\n`);

  // Generate mappings for each new tool
  const newMappings = [];
  
  newTools.forEach(tool => {
    const slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const componentName = toPascalCase(slug) + 'ReviewPage';
    
    newMappings.push(`  '${slug}': () => import('../seo-optimization/production-components/${componentName}'),`);
    console.log(`✅ ${tool.name} → ${slug} → ${componentName}`);
  });

  // Read current seoComponentMapping.ts file
  const mappingPath = path.join(__dirname, 'utils/seoComponentMapping.ts');
  let mappingContent = fs.readFileSync(mappingPath, 'utf8');

  // Find the closing brace of the seoComponents object
  const lastMappingIndex = mappingContent.lastIndexOf("'zapier-ai': () => import('../seo-optimization/production-components/ZapierAiReviewPage'),");
  
  if (lastMappingIndex === -1) {
    console.error('❌ Could not find insertion point in seoComponentMapping.ts');
    return;
  }

  // Insert new mappings before the closing brace
  const insertPoint = mappingContent.indexOf('\n', lastMappingIndex) + 1;
  const newContent = 
    mappingContent.slice(0, insertPoint) + 
    newMappings.join('\n') + '\n' +
    mappingContent.slice(insertPoint);

  // Write updated file
  fs.writeFileSync(mappingPath, newContent);

  console.log(`\n🎉 Successfully added ${newMappings.length} SEO mappings!`);
  console.log(`📁 Updated: ${mappingPath}`);
  
  // Verify the mappings were added correctly
  const updatedContent = fs.readFileSync(mappingPath, 'utf8');
  const mappingCount = (updatedContent.match(/': \(\) => import\('/g) || []).length;
  
  console.log(`📊 Total SEO mappings now: ${mappingCount}`);
}

generateSEOMappings();