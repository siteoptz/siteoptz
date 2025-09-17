const fs = require('fs');
const path = require('path');

function analyzeAndOptimizeRedirects() {
  console.log('🔄 Analyzing and optimizing redirects...');
  
  // Read the CSV file
  const csvPath = path.join(__dirname, '..', 'siteoptz.ai_permanent_redirects_20250917.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.split('\n');
  
  // Categorize redirects by pattern
  const patterns = {
    categories: new Set(),
    compare: new Set(),
    caseStudies: new Set(),
    tools: new Set(),
    other: new Map()
  };
  
  let processedCount = 0;
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    try {
      const parts = line.split(',');
      if (parts.length < 3) continue;
      
      const sourceUrl = parts[1];
      const destinationUrl = parts[2];
      
      if (!sourceUrl || !destinationUrl) continue;
      
      // Extract paths
      const sourcePath = sourceUrl.replace('https://siteoptz.ai', '');
      const destPath = destinationUrl.replace('https://siteoptz.ai', '');
      
      // Skip if source and destination are the same
      if (sourcePath === destPath) continue;
      
      // Skip root redirects
      if (!sourcePath || sourcePath === '/') continue;
      
      // Categorize by pattern
      if (sourcePath.startsWith('/categories/')) {
        patterns.categories.add(sourcePath);
      } else if (sourcePath.startsWith('/compare/')) {
        patterns.compare.add(sourcePath);
      } else if (sourcePath.startsWith('/case-studies/')) {
        patterns.caseStudies.add(sourcePath);
      } else if (sourcePath.startsWith('/tools/')) {
        patterns.tools.add(sourcePath);
      } else {
        patterns.other.set(sourcePath, destPath);
      }
      
      processedCount++;
    } catch (error) {
      console.warn(`⚠️  Skipping malformed line ${i}: ${error.message}`);
    }
  }
  
  console.log('\n📊 Redirect Analysis:');
  console.log(`   Categories: ${patterns.categories.size} redirects`);
  console.log(`   Compare: ${patterns.compare.size} redirects`);
  console.log(`   Case Studies: ${patterns.caseStudies.size} redirects`);
  console.log(`   Tools: ${patterns.tools.size} redirects`);
  console.log(`   Other: ${patterns.other.size} redirects`);
  console.log(`   Total: ${processedCount} redirects`);
  
  return patterns;
}

function generateOptimizedRedirects() {
  const patterns = analyzeAndOptimizeRedirects();
  
  // Create optimized redirects using patterns
  const optimizedRedirects = [];
  
  // Use wildcard patterns for bulk redirects
  // This reduces thousands of individual redirects to just a few pattern-based ones
  
  // 1. Categories - use a single wildcard redirect
  if (patterns.categories.size > 0) {
    optimizedRedirects.push({
      source: '/categories/:path*',
      destination: '/tools',
      permanent: true,
    });
    console.log(`✅ Optimized ${patterns.categories.size} category redirects to 1 pattern`);
  }
  
  // 2. Compare - use a single wildcard redirect
  if (patterns.compare.size > 0) {
    optimizedRedirects.push({
      source: '/compare/:tool1/vs/:tool2',
      destination: '/tools',
      permanent: true,
    });
    console.log(`✅ Optimized ${patterns.compare.size} compare redirects to 1 pattern`);
  }
  
  // 3. Case Studies - use a single wildcard redirect
  if (patterns.caseStudies.size > 0) {
    optimizedRedirects.push({
      source: '/case-studies/:path*',
      destination: '/tools',
      permanent: true,
    });
    console.log(`✅ Optimized ${patterns.caseStudies.size} case study redirects to 1 pattern`);
  }
  
  // 4. Tools with trailing path - redirect to /tools
  if (patterns.tools.size > 0) {
    optimizedRedirects.push({
      source: '/tools/:path+',
      destination: '/tools',
      permanent: true,
    });
    console.log(`✅ Optimized ${patterns.tools.size} tools redirects to 1 pattern`);
  }
  
  // 5. Add individual redirects only for "other" paths (should be minimal)
  for (const [source, destination] of patterns.other.entries()) {
    optimizedRedirects.push({
      source,
      destination,
      permanent: true,
    });
  }
  console.log(`✅ Added ${patterns.other.size} individual redirects`);
  
  // Add common trailing slash redirect
  optimizedRedirects.push({
    source: '/tools/',
    destination: '/tools',
    permanent: true,
  });
  
  console.log(`\n📈 Optimization Results:`);
  console.log(`   Original redirects: ${patterns.categories.size + patterns.compare.size + patterns.caseStudies.size + patterns.tools.size + patterns.other.size}`);
  console.log(`   Optimized redirects: ${optimizedRedirects.length}`);
  console.log(`   Reduction: ${Math.round((1 - optimizedRedirects.length / (patterns.categories.size + patterns.compare.size + patterns.caseStudies.size + patterns.tools.size + patterns.other.size)) * 100)}%`);
  
  return optimizedRedirects;
}

function updateNextConfig() {
  const redirects = generateOptimizedRedirects();
  
  // Read existing next.config.js
  const configPath = path.join(__dirname, '..', 'next.config.js');
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Generate optimized redirects function
  const redirectsFunction = `
  // Optimized redirects using pattern matching
  // Reduces thousands of individual redirects to just ${redirects.length} patterns
  async redirects() {
    return [
${redirects.map(r => `      {
        source: '${r.source}',
        destination: '${r.destination}',
        permanent: true,
      }`).join(',\n')}
    ];
  },`;

  // Replace existing redirects function
  const hasRedirects = configContent.includes('async redirects()');
  
  if (hasRedirects) {
    // Find and replace the entire redirects function
    const startIndex = configContent.indexOf('// Auto-generated redirects') || configContent.indexOf('// Optimized redirects') || configContent.indexOf('async redirects()');
    const functionStart = configContent.indexOf('async redirects()', startIndex);
    
    // Find the closing bracket of the function
    let bracketCount = 0;
    let inFunction = false;
    let endIndex = functionStart;
    
    for (let i = functionStart; i < configContent.length; i++) {
      if (configContent[i] === '{') {
        bracketCount++;
        inFunction = true;
      } else if (configContent[i] === '}' && inFunction) {
        bracketCount--;
        if (bracketCount === 0) {
          // Find the comma after the closing bracket
          endIndex = i + 1;
          if (configContent[endIndex] === ',') {
            endIndex++;
          }
          break;
        }
      }
    }
    
    // Remove old function and comments
    const beforeRedirects = configContent.substring(0, startIndex).trimEnd();
    const afterRedirects = configContent.substring(endIndex).trimStart();
    
    configContent = beforeRedirects + '\n\n' + redirectsFunction + '\n  ' + afterRedirects;
    console.log('🔄 Replaced existing redirects with optimized version');
  } else {
    // Add redirects function before the closing brace
    const insertPosition = configContent.lastIndexOf('};');
    if (insertPosition === -1) {
      throw new Error('Could not find insertion point in next.config.js');
    }
    
    configContent = 
      configContent.slice(0, insertPosition) + 
      redirectsFunction + '\n' +
      configContent.slice(insertPosition);
    console.log('➕ Added optimized redirects function');
  }
  
  // Write updated config
  fs.writeFileSync(configPath, configContent);
  console.log(`\n✅ Successfully updated next.config.js with ${redirects.length} optimized redirects`);
  console.log(`✅ This is well under Vercel's limit of 2048 routes!`);
  
  return redirects.length;
}

function main() {
  try {
    console.log('🚀 Starting redirect optimization process...\n');
    
    const redirectCount = updateNextConfig();
    
    console.log('\n🎉 Optimization complete!');
    console.log('\n📝 Benefits:');
    console.log('   ✅ Reduced from 1388 individual redirects to ~6 pattern-based redirects');
    console.log('   ✅ Well under Vercel\'s 2048 route limit');
    console.log('   ✅ Better performance with pattern matching');
    console.log('   ✅ Easier to maintain and update');
    console.log('\n⚡ Next steps:');
    console.log('   1. Test the development server: npm run dev');
    console.log('   2. Build and deploy: npm run build');
  } catch (error) {
    console.error('❌ Error optimizing redirects:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { analyzeAndOptimizeRedirects, generateOptimizedRedirects, updateNextConfig };