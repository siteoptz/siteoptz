const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to search for button patterns in files
function findButtonPatterns() {
  console.log('🔍 Analyzing button patterns across the codebase...\n');
  
  const patterns = [
    'Try .* Here',
    'Compare Alternatives',
    'Start Free Trial',
    'View Alternatives'
  ];
  
  const results = {
    files: new Set(),
    summary: {
      production_components: [],
      pages_reviews: [],
      pages_tools: [],
      components: [],
      other: []
    }
  };
  
  patterns.forEach(pattern => {
    try {
      // Use ripgrep to find all files with these patterns
      const command = `rg -l --type tsx --type jsx "${pattern}" .`;
      const output = execSync(command, { 
        encoding: 'utf8', 
        cwd: '/Users/siteoptz/siteoptz',
        stdio: ['pipe', 'pipe', 'ignore'] // Suppress stderr
      });
      
      const files = output.trim().split('\n').filter(f => f.length > 0);
      files.forEach(file => results.files.add(file));
    } catch (error) {
      // If ripgrep fails, continue with other patterns
      console.log(`Pattern "${pattern}" search completed`);
    }
  });
  
  // Categorize files
  Array.from(results.files).forEach(file => {
    if (file.includes('seo-optimization/production-components/')) {
      results.summary.production_components.push(file);
    } else if (file.includes('pages/reviews/')) {
      results.summary.pages_reviews.push(file);
    } else if (file.includes('pages/tools/')) {
      results.summary.pages_tools.push(file);
    } else if (file.includes('components/')) {
      results.summary.components.push(file);
    } else {
      results.summary.other.push(file);
    }
  });
  
  return results;
}

// Function to analyze specific patterns in a file
function analyzeFilePatterns(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const patterns = [
      { name: 'Try [tool] Here', regex: /Try.*?Here/g },
      { name: 'Compare Alternatives', regex: /Compare Alternatives/g },
      { name: 'Start Free Trial', regex: /Start Free Trial/g },
      { name: 'View Alternatives', regex: /View Alternatives/g }
    ];
    
    const foundPatterns = [];
    patterns.forEach(pattern => {
      const matches = content.match(pattern.regex);
      if (matches) {
        foundPatterns.push({
          pattern: pattern.name,
          count: matches.length,
          matches: matches
        });
      }
    });
    
    return foundPatterns;
  } catch (error) {
    return [];
  }
}

// Main analysis
const results = findButtonPatterns();

console.log('📊 COMPREHENSIVE ANALYSIS RESULTS\n');
console.log('=' .repeat(60));

console.log('\n🏭 PRODUCTION COMPONENTS (SEO-Optimized Review Pages):');
console.log(`   Total files: ${results.summary.production_components.length}`);
if (results.summary.production_components.length > 0) {
  console.log('   📝 These are the main review pages that need updates:');
  results.summary.production_components.slice(0, 5).forEach(file => {
    console.log(`   - ${path.basename(file)}`);
  });
  if (results.summary.production_components.length > 5) {
    console.log(`   - ... and ${results.summary.production_components.length - 5} more`);
  }
}

console.log('\n📄 PAGES/REVIEWS:');
console.log(`   Total files: ${results.summary.pages_reviews.length}`);
if (results.summary.pages_reviews.length > 0) {
  results.summary.pages_reviews.forEach(file => {
    console.log(`   - ${path.basename(file)}`);
  });
}

console.log('\n🛠️  PAGES/TOOLS:');
console.log(`   Total files: ${results.summary.pages_tools.length}`);
if (results.summary.pages_tools.length > 0) {
  results.summary.pages_tools.forEach(file => {
    console.log(`   - ${path.basename(file)}`);
  });
}

console.log('\n🧩 COMPONENTS:');
console.log(`   Total files: ${results.summary.components.length}`);
if (results.summary.components.length > 0) {
  results.summary.components.forEach(file => {
    console.log(`   - ${path.basename(file)}`);
  });
}

console.log('\n🔧 OTHER FILES:');
console.log(`   Total files: ${results.summary.other.length}`);
if (results.summary.other.length > 0) {
  results.summary.other.forEach(file => {
    console.log(`   - ${path.basename(file)}`);
  });
}

console.log('\n' + '=' .repeat(60));
console.log(`📈 TOTAL FILES TO UPDATE: ${results.files.size}`);

// Detailed pattern analysis for first few files
console.log('\n🔬 DETAILED PATTERN ANALYSIS (Sample Files):');
console.log('-' .repeat(60));

let samplesAnalyzed = 0;
for (const file of Array.from(results.files)) {
  if (samplesAnalyzed >= 3) break;
  
  console.log(`\n📁 ${path.basename(file)}:`);
  const patterns = analyzeFilePatterns(file);
  if (patterns.length > 0) {
    patterns.forEach(pattern => {
      console.log(`   ⚠️  ${pattern.pattern}: ${pattern.count} occurrence(s)`);
      pattern.matches.forEach(match => {
        console.log(`      - "${match}"`);
      });
    });
  } else {
    console.log('   ✅ No problematic patterns found in sample');
  }
  samplesAnalyzed++;
}

// Summary with recommendations
console.log('\n' + '=' .repeat(60));
console.log('🎯 RECOMMENDED UPDATE STRATEGY:');
console.log('=' .repeat(60));
console.log('\n1. 🏭 PRIORITY 1: Production Components');
console.log('   - These are the main SEO-optimized review pages');
console.log('   - Update all 130+ files in seo-optimization/production-components/');
console.log('   - These are actively used on the live site');

console.log('\n2. 🧩 PRIORITY 2: Shared Components');
console.log('   - Update components/HeroSection.jsx and related components');
console.log('   - These affect multiple pages when updated');

console.log('\n3. 📄 PRIORITY 3: Individual Pages');
console.log('   - Update pages/reviews/ and pages/tools/ if any found');

console.log('\n💡 CHANGES NEEDED:');
console.log('   ❌ Remove: "Try [tool] Here" buttons from hero sections');
console.log('   ❌ Remove: "Compare Alternatives" buttons from hero sections');
console.log('   🔄 Change: "Start Free Trial" → "Talk to an AI Expert" → /contact');
console.log('   ❌ Remove: "View Alternatives" buttons');

console.log('\n✅ KEEP:');
console.log('   ✓ "Get Started" buttons in pricing sections (these are fine)');
console.log('   ✓ "Contact Sales" buttons for enterprise plans');
console.log('   ✓ Links to tool websites (affiliate links)');

console.log('\n🚀 Files saved for detailed updates:');
console.log('   - all_files_with_buttons.json');
console.log('   - production_components_list.json');

// Save comprehensive results to files for further processing
fs.writeFileSync(
  '/Users/siteoptz/siteoptz/all_files_with_buttons.json', 
  JSON.stringify(Array.from(results.files), null, 2)
);

fs.writeFileSync(
  '/Users/siteoptz/siteoptz/production_components_list.json', 
  JSON.stringify(results.summary.production_components, null, 2)
);

fs.writeFileSync(
  '/Users/siteoptz/siteoptz/button_analysis_summary.json', 
  JSON.stringify(results.summary, null, 2)
);

console.log('\nAnalysis complete! 🎉\n');