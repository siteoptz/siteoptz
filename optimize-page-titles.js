#!/usr/bin/env node

/**
 * Optimize page titles to be 70 characters or less for better SEO
 * This addresses Google's title tag length recommendations
 */

const fs = require('fs');
const path = require('path');

// Title optimization rules and patterns
const optimizationRules = {
  // Remove redundant phrases
  removePhrases: [
    '2025 - Complete Comparison & Review',
    'Complete Comparison & Review',
    '- Complete Comparison & Review',
    'Review — Features, Pricing, Pros & Cons [2025]',
    'Review 2025: Complete Feature Analysis & Pricing',
    '| AI Case Study | SiteOptz',
    '| SiteOptz',
    'AI & Automation Podcasts - SiteOptz.ai',
    '<!-- --> | AI & Automation Podcasts - SiteOptz.ai'
  ],
  
  // Shorten common phrases
  shortenPhrases: {
    'AI Implementation Experts': 'AI Experts',
    '$50M+ in Productivity Gains': '$50M+ Gains',
    'Fortune 500': 'F500',
    'AI-driven Revenue Growth Optimization': 'AI Revenue Growth',
    '6Sense - AI-driven Revenue Growth Optimization': '6Sense AI',
    'Easily Build AI Chatbots': 'AI Chatbot Builder',
    'Build AI Chatbots Effortlessly': 'AI Chatbot Platform',
    'Stunning Video Creation': 'Video Creator',
    'Revolutionizing Reports with AI': 'AI Reports',
    'AI Landing Page Builder': 'AI Page Builder',
    'Convenient AI Website Builder': 'AI Site Builder',
    'AI Research Assistant': 'AI Research',
    'Email Marketing Tools': 'Email Tools',
    'Text-to-Video -': 'Text2Video',
    'Video GPT - AI Video Maker': 'Video GPT',
    'Website Generator Meta AI': 'Meta AI Builder',
    'Weblium -': 'Weblium',
    'Unbounce -': 'Unbounce',
    'There -': 'There',
    'HubSpot': 'HubSpot',
    'Amazon CodeWhisperer': 'AWS CodeWhisperer',
    'Academic Assistant Pro': 'Academic Pro',
    'AI Actions by Zapier GPT': 'Zapier AI GPT'
  }
};

// Function to optimize a single title
function optimizeTitle(title, targetLength = 70) {
  let optimized = title;
  
  // Step 1: Remove redundant phrases
  optimizationRules.removePhrases.forEach(phrase => {
    optimized = optimized.replace(new RegExp(phrase, 'gi'), '');
  });
  
  // Step 2: Apply phrase shortenings
  Object.entries(optimizationRules.shortenPhrases).forEach(([long, short]) => {
    optimized = optimized.replace(new RegExp(long, 'gi'), short);
  });
  
  // Step 3: Clean up extra spaces and punctuation
  optimized = optimized
    .replace(/\s+/g, ' ')
    .replace(/\s*,\s*/g, ', ')
    .replace(/\s*\|\s*/g, ' | ')
    .replace(/\s*-\s*/g, ' - ')
    .trim()
    .replace(/,\s*$/, '') // Remove trailing comma
    .replace(/\|\s*$/, '') // Remove trailing pipe
    .replace(/-\s*$/, '') // Remove trailing dash
    .trim();
  
  // Step 4: If still too long, apply aggressive shortening
  if (optimized.length > targetLength) {
    // Remove "vs" and make more concise for comparison pages
    if (optimized.includes(' vs ')) {
      const parts = optimized.split(' vs ');
      if (parts.length === 2) {
        optimized = `${parts[0]} vs ${parts[1]}`.replace(/\s+/g, ' ').trim();
      }
    }
    
    // Further shortening for case studies
    if (optimized.includes('% ')) {
      optimized = optimized
        .replace('% Faster', '% ↑')
        .replace('% Better', '% ↑')
        .replace('% Reduction', '% ↓')
        .replace('% Annual Savings', '% Savings')
        .replace(' with AI', ' AI');
    }
    
    // Final truncation if needed (preserve important parts)
    if (optimized.length > targetLength) {
      const words = optimized.split(' ');
      let result = '';
      
      for (const word of words) {
        if ((result + word).length <= targetLength - 3) { // -3 for ellipsis
          result += (result ? ' ' : '') + word;
        } else {
          break;
        }
      }
      
      optimized = result.trim();
    }
  }
  
  return optimized.trim();
}

// Function to process the CSV data
function processTitleOptimization() {
  console.log('📊 Optimizing Page Titles for SEO Compliance\\n');
  
  const csvPath = '/Users/siteoptz/Downloads/siteoptz.ai_title_element_is_too_long_20260508.csv';
  
  if (!fs.existsSync(csvPath)) {
    console.log(`❌ CSV file not found: ${csvPath}`);
    return;
  }
  
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.split('\n').filter(line => line.trim());
  
  // Skip header
  const dataLines = lines.slice(1).filter(line => line.trim());
  
  console.log(`🔍 Found ${dataLines.length} pages with long titles`);
  console.log(`📝 First data line: ${dataLines[0]}\\n`);
  
  const optimizedTitles = [];
  const summary = {
    homepage: [],
    caseStudies: [],
    comparisons: [],
    reviews: [],
    podcasts: [],
    other: []
  };
  
  dataLines.forEach(line => {
    // Handle both quoted and unquoted titles
    let url, title;
    
    if (line.includes('","')) {
      // Quoted format: URL,"Title",Date
      const parts = line.split('","');
      if (parts.length >= 2) {
        url = parts[0].replace(/^"/, '').trim();
        title = parts[1].replace(/".*$/, '').trim();
      }
    } else {
      // Unquoted format: URL,Title,Date
      const firstComma = line.indexOf(',');
      const lastComma = line.lastIndexOf(',');
      
      if (firstComma === -1 || lastComma === -1 || firstComma === lastComma) return;
      
      url = line.substring(0, firstComma).trim();
      title = line.substring(firstComma + 1, lastComma).trim();
    }
    
    if (!title || title === 'Title' || !url || !url.startsWith('https://')) return;
    
    const originalLength = title.length;
    const optimized = optimizeTitle(title);
    const newLength = optimized.length;
    const saved = originalLength - newLength;
    
    const result = {
      url,
      original: title,
      optimized,
      originalLength,
      newLength,
      saved,
      isValid: newLength <= 70
    };
    
    optimizedTitles.push(result);
    
    // Categorize for summary
    if (url.includes('/case-studies/')) {
      summary.caseStudies.push(result);
    } else if (url.includes('/compare/')) {
      summary.comparisons.push(result);
    } else if (url.includes('/reviews/')) {
      summary.reviews.push(result);
    } else if (url.includes('/podcasts/')) {
      summary.podcasts.push(result);
    } else if (url === 'https://siteoptz.ai' || url === 'https://siteoptz.ai/') {
      summary.homepage.push(result);
    } else {
      summary.other.push(result);
    }
  });
  
  // Display results by category
  console.log('🎯 OPTIMIZATION RESULTS:\\n');
  
  Object.entries(summary).forEach(([category, items]) => {
    if (items.length > 0) {
      console.log(`📁 ${category.toUpperCase()} (${items.length} pages):`);
      items.forEach(item => {
        const status = item.isValid ? '✅' : '⚠️';
        console.log(`  ${status} ${item.newLength}/${item.originalLength} chars (-${item.saved})`);
        console.log(`     Original: ${item.original}`);
        console.log(`     Optimized: ${item.optimized}\\n`);
      });
    }
  });
  
  // Generate summary statistics
  const validCount = optimizedTitles.filter(t => t.isValid).length;
  const totalSaved = optimizedTitles.reduce((sum, t) => sum + t.saved, 0);
  const avgSaved = Math.round(totalSaved / optimizedTitles.length);
  
  console.log('📈 OPTIMIZATION SUMMARY:');
  console.log(`  ✅ Successfully optimized: ${validCount}/${optimizedTitles.length} pages`);
  console.log(`  💾 Average characters saved: ${avgSaved}`);
  console.log(`  🎯 Total character reduction: ${totalSaved}\\n`);
  
  // Save optimized titles to file
  const outputPath = path.join(__dirname, 'optimized-titles-output.json');
  const output = {
    generatedAt: new Date().toISOString(),
    totalPages: optimizedTitles.length,
    validCount,
    summary: summary,
    optimizations: optimizedTitles
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`💾 Detailed results saved to: ${outputPath}`);
  
  // Generate implementation recommendations
  console.log('\\n🔧 IMPLEMENTATION RECOMMENDATIONS:\\n');
  
  if (summary.homepage.length > 0) {
    console.log('1. **Homepage Title**: Update in main layout/meta tags');
    summary.homepage.forEach(item => {
      console.log(`   New title: "${item.optimized}"`);
    });
  }
  
  if (summary.caseStudies.length > 0) {
    console.log('\\n2. **Case Studies**: Update in case study page templates');
    console.log('   - Consider updating the case study title generation logic');
    console.log('   - Focus on key metrics and outcomes');
  }
  
  if (summary.comparisons.length > 0) {
    console.log('\\n3. **Comparison Pages**: Update comparison page title template');
    console.log('   - Shorten tool names where possible');
    console.log('   - Remove redundant "2025 - Complete Comparison" text');
  }
  
  if (summary.reviews.length > 0) {
    console.log('\\n4. **Review Pages**: Update review page title template');
    console.log('   - Simplify "Features, Pricing, Pros & Cons [2025]" format');
    console.log('   - Focus on tool name and year');
  }
  
  if (summary.podcasts.length > 0) {
    console.log('\\n5. **Podcast Pages**: Update podcast title template');
    console.log('   - Remove "AI & Automation Podcasts - SiteOptz.ai" suffix');
    console.log('   - Keep core topic and make more concise');
  }
  
  return optimizedTitles;
}

// Main execution
if (require.main === module) {
  processTitleOptimization();
}

module.exports = { optimizeTitle, processTitleOptimization };