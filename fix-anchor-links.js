const fs = require('fs');
const path = require('path');

// The 46 tools that were updated (37 + 9)
const updatedTools = [
  // Original 37 minimal tools
  'adsdog', 'alliai', 'arcwise', 'auraticai', 'branchbob', 'carboncopy', 'clay',
  'contentforge', 'creatify', 'dropship', 'dubvid', 'echofox', 'enterprisedna',
  'fliki', 'gigasheet', 'gunbot', 'heygen', 'kenji', 'ocoya', 'salesblink',
  'salesflow', 'sitekick', 'submagic', 'superluminal', 'taplio', 'taxgpt',
  'tradesanta', 'veeroll',
  // Final 9 orphaned tools  
  'apollo-io', 'cosmos-ai', 'headshot-generator', 'interview-study', 
  'media-io', 'nando-ai', 'octopus-crm', 'predis-ai', 'seamless-ai'
];

// Convert slug to component name
function getComponentName(slug) {
  if (slug === '10web') return 'TenWebReviewPage';
  
  return slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('') + 'ReviewPage';
}

function fixAnchorLinks() {
  console.log('🔧 Fixing anchor links in Quick Overview sections...\n');
  
  let successful = 0;
  let failed = 0;
  
  for (const toolSlug of updatedTools) {
    const componentName = getComponentName(toolSlug);
    const filePath = `./seo-optimization/production-components/${componentName}.tsx`;
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ Component not found: ${filePath}`);
      failed++;
      continue;
    }
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Check if file needs anchor link fixes
      if (content.includes('href="#features"') && content.includes('id="features"')) {
        console.log(`✅ Anchor links already correct in ${componentName}`);
        successful++;
        continue;
      }
      
      // This shouldn't happen since the anchor links should already be correct
      // But if there are issues, we can add fixes here
      console.log(`ℹ️ Checking ${componentName} for anchor link issues...`);
      
      // Verify all required sections exist
      const hasFeatures = content.includes('id="features"');
      const hasPricing = content.includes('id="pricing"');
      const hasUseCases = content.includes('id="use-cases"');
      const hasProsCons = content.includes('id="pros-cons"');
      const hasFaq = content.includes('id="faq"');
      
      if (hasFeatures && hasPricing && hasUseCases && hasProsCons && hasFaq) {
        console.log(`✅ All anchor targets present in ${componentName}`);
        successful++;
      } else {
        console.log(`❌ Missing anchor targets in ${componentName}:`);
        console.log(`  - features: ${hasFeatures}`);
        console.log(`  - pricing: ${hasPricing}`);
        console.log(`  - use-cases: ${hasUseCases}`);
        console.log(`  - pros-cons: ${hasProsCons}`);
        console.log(`  - faq: ${hasFaq}`);
        failed++;
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${toolSlug}:`, error.message);
      failed++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`✅ Components with correct anchors: ${successful}`);
  console.log(`❌ Components with issues: ${failed}`);
  console.log(`📁 Total processed: ${updatedTools.length} tools`);
}

if (require.main === module) {
  fixAnchorLinks().catch ? fixAnchorLinks().catch(console.error) : fixAnchorLinks();
}

module.exports = { fixAnchorLinks };