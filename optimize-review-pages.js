#!/usr/bin/env node

/**
 * Optimize review pages by removing heavy CSS animations and complex gradients
 * This improves page load speed and performance
 */

const fs = require('fs');
const path = require('path');

// Function to optimize a single review page file
function optimizeReviewPage(filePath) {
  console.log(`🔧 Optimizing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Replace heavy blur animations with simple background
  const blurAnimationPattern = /(<div className="absolute[^"]*(?:blur-3xl|animate-pulse)[^"]*"[^>]*><\/div>)/g;
  if (blurAnimationPattern.test(content)) {
    content = content.replace(
      /(<div className="absolute[^"]*)(blur-3xl|animate-pulse[^"]*)/g,
      (match, prefix, heavyClass) => {
        return prefix.replace(heavyClass, '');
      }
    );
    
    // Reduce opacity for better performance
    content = content.replace(/bg-(\w+)-500\/10/g, 'bg-$1-500/5');
    content = content.replace(/bg-(\w+)-500\/20/g, 'bg-$1-500/5');
    
    modified = true;
    console.log(`  ✅ Removed blur and pulse animations`);
  }
  
  // Replace complex linear gradients with simple background
  const complexGradientPattern = /bg-\[linear-gradient\([^\]]+\)\][^"]*bg-\[size:[^\]]+\]/g;
  if (complexGradientPattern.test(content)) {
    content = content.replace(complexGradientPattern, 'bg-gray-900/5');
    modified = true;
    console.log(`  ✅ Simplified complex gradients`);
  }
  
  // Remove delay animations
  content = content.replace(/\s+delay-\d+/g, '');
  
  if (modified) {
    // Write the optimized content
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ Optimized ${path.basename(filePath)}`);
    return true;
  } else {
    console.log(`  ⏭️  No optimizations needed for ${path.basename(filePath)}`);
    return false;
  }
}

// Main execution
async function main() {
  console.log('🚀 Optimizing Review Pages for Better Performance\n');
  
  // Find all static review page files
  const reviewsDir = path.join(__dirname, 'pages/reviews');
  const allFiles = fs.readdirSync(reviewsDir);
  const reviewFiles = allFiles
    .filter(file => file.endsWith('.tsx'))
    .filter(file => file !== '[toolName].tsx' && file !== 'index.tsx')
    .map(file => path.join(reviewsDir, file));
  
  console.log(`Found ${reviewFiles.length} static review pages to optimize:\n`);
  
  let optimized = 0;
  let skipped = 0;
  let failed = 0;
  
  for (const filePath of reviewFiles) {
    try {
      const wasOptimized = optimizeReviewPage(filePath);
      if (wasOptimized) {
        optimized++;
      } else {
        skipped++;
      }
    } catch (error) {
      console.log(`  ❌ Error optimizing ${filePath}: ${error.message}`);
      failed++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  ✅ Successfully optimized: ${optimized} files`);
  console.log(`  ⏭️  Skipped (no changes needed): ${skipped} files`);
  console.log(`  ❌ Failed to optimize: ${failed} files`);
  console.log(`\n🎯 Performance optimizations complete!`);
  console.log(`📈 Pages should now load faster with reduced CSS complexity.`);
  
  if (failed === 0) {
    console.log('✅ All review pages have been successfully optimized for performance.');
  }
}

main().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});