const fs = require('fs');
const path = require('path');

// The tools that were updated and need anchor link fixes
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
  console.log('🔧 Fixing broken anchor links in Quick Overview sections...\n');
  
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
      let modified = false;
      
      // Check if the anchor links are using generic IDs that need to be updated
      if (content.includes('href="#features"') && !content.includes('id="features"')) {
        // This component has the wrong anchor structure - let's find what IDs actually exist
        const featureMatch = content.match(/id="([^"]*features[^"]*)"/i);
        const pricingMatch = content.match(/id="([^"]*pricing[^"]*)"/i);
        const useCaseMatch = content.match(/id="([^"]*use[^"]*)"/i);
        const prosConsMatch = content.match(/id="([^"]*pros[^"]*)"/i);
        
        if (featureMatch) {
          content = content.replace(/href="#features"/g, `href="#${featureMatch[1]}"`);
          modified = true;
        }
        if (pricingMatch) {
          content = content.replace(/href="#pricing"/g, `href="#${pricingMatch[1]}"`);
          modified = true;
        }
        if (useCaseMatch) {
          content = content.replace(/href="#use-cases"/g, `href="#${useCaseMatch[1]}"`);
          modified = true;
        }
        if (prosConsMatch) {
          content = content.replace(/href="#pros-cons"/g, `href="#${prosConsMatch[1]}"`);
          modified = true;
        }
      }
      
      // Alternative approach - standardize the section IDs to match the href links
      if (content.includes('href="#features"')) {
        // Replace specific IDs with standard ones
        content = content.replace(/id="[^"]*features[^"]*"/gi, 'id="features"');
        content = content.replace(/id="[^"]*pricing[^"]*"/gi, 'id="pricing"');
        content = content.replace(/id="[^"]*use[^"]*"/gi, 'id="use-cases"');
        content = content.replace(/id="[^"]*pros[^"]*"/gi, 'id="pros-cons"');
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Fixed anchor links in ${componentName}`);
        successful++;
      } else {
        console.log(`ℹ️ No anchor link issues found in ${componentName}`);
        successful++;
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${toolSlug}:`, error.message);
      failed++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`✅ Successfully processed: ${successful} components`);
  console.log(`❌ Failed to process: ${failed} components`);
  console.log(`📁 Total processed: ${updatedTools.length} tools`);
}

if (require.main === module) {
  fixAnchorLinks();
}

module.exports = { fixAnchorLinks };