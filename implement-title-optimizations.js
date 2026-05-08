#!/usr/bin/env node

/**
 * Implementation script for title optimizations
 * Apply the optimized titles to actual page files
 */

const fs = require('fs');
const path = require('path');

// Critical title updates (highest impact)
const titleUpdates = {
  // Homepage - highest priority
  homepage: {
    original: 'SiteOptz - Fortune 500 AI Implementation Experts | $50M+ in Productivity Gains',
    optimized: 'SiteOptz - F500 AI Experts | $50M+ Gains',
    files: [
      'pages/_app.tsx',
      'components/SEO/MetaTags.tsx',
      'next-seo.config.js'
    ]
  },
  
  // Template patterns for dynamic pages
  templates: {
    comparison: {
      pattern: /(.+) vs (.+) 2025 - Complete Comparison & Review \| SiteOptz/g,
      replacement: '$1 vs $2 | SiteOptz',
      files: [
        'pages/compare/[tool1]/vs/[tool2].tsx',
        'utils/seoMetaGenerator.js'
      ]
    },
    
    caseStudy: {
      pattern: /(.+): (\d+)% (Faster|Better|Reduction) (.+) with AI (.+) \| AI Case Study \| SiteOptz/g,
      replacement: '$1: $2% ↑ $4 AI $5 | Case Study',
      files: [
        'pages/case-studies/[slug].tsx',
        'components/CaseStudy/CaseStudyTemplate.tsx'
      ]
    },
    
    review: {
      pattern: /(.+) Review — Features, Pricing, Pros & Cons \[2025\]/g,
      replacement: '$1 Review [2025]',
      files: [
        'pages/reviews/[tool].tsx',
        'utils/reviewSeoUtils.js'
      ]
    },
    
    podcast: {
      pattern: /(.+) \| AI & Automation Podcasts - SiteOptz\.ai/g,
      replacement: '$1',
      files: [
        'pages/podcasts/[slug].tsx',
        'components/Podcast/PodcastMeta.tsx'
      ]
    }
  }
};

function updateTitleInFile(filePath, pattern, replacement) {
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  File not found: ${filePath}`);
    return false;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    if (typeof pattern === 'string') {
      content = content.replace(new RegExp(pattern, 'g'), replacement);
    } else {
      content = content.replace(pattern, replacement);
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ Updated: ${path.basename(filePath)}`);
      return true;
    } else {
      console.log(`  ⏭️  No changes needed: ${path.basename(filePath)}`);
      return false;
    }
  } catch (error) {
    console.log(`  ❌ Error updating ${filePath}: ${error.message}`);
    return false;
  }
}

function implementTitleOptimizations() {
  console.log('🚀 Implementing Critical Title Optimizations\\n');
  
  const baseDir = process.cwd();
  let updatedFiles = 0;
  
  // 1. Update homepage title
  console.log('📝 Updating Homepage Title:');
  titleUpdates.homepage.files.forEach(file => {
    const filePath = path.join(baseDir, file);
    const updated = updateTitleInFile(
      filePath, 
      titleUpdates.homepage.original, 
      titleUpdates.homepage.optimized
    );
    if (updated) updatedFiles++;
  });
  
  console.log('\\n📝 Updating Template Patterns:');
  
  // 2. Update template patterns
  Object.entries(titleUpdates.templates).forEach(([templateName, config]) => {
    console.log(`\\n🔧 ${templateName.toUpperCase()} Templates:`);
    
    config.files.forEach(file => {
      const filePath = path.join(baseDir, file);
      const updated = updateTitleInFile(filePath, config.pattern, config.replacement);
      if (updated) updatedFiles++;
    });
  });
  
  // 3. Summary
  console.log(`\\n📊 IMPLEMENTATION SUMMARY:`);
  console.log(`  ✅ Files updated: ${updatedFiles}`);
  
  if (updatedFiles > 0) {
    console.log(`\\n🎯 Title optimization implementation complete!`);
    console.log(`📈 These changes will improve SEO compliance and search visibility.`);
    
    console.log(`\\n🔄 NEXT STEPS:`);
    console.log(`1. Test updated pages locally`);
    console.log(`2. Verify title display in browser tabs`);
    console.log(`3. Run npm run build to ensure no errors`);
    console.log(`4. Deploy to production`);
    console.log(`5. Monitor Google Search Console for improvements`);
  } else {
    console.log(`\\n💡 No direct file updates made. Title optimizations may need to be implemented in:`);
    console.log(`- Dynamic title generation functions`);
    console.log(`- SEO utility files`);
    console.log(`- Template component logic`);
    console.log(`\\nRefer to TITLE_OPTIMIZATION_SUMMARY.md for detailed implementation guidance.`);
  }
}

// Run if called directly
if (require.main === module) {
  implementTitleOptimizations();
}

module.exports = { implementTitleOptimizations };