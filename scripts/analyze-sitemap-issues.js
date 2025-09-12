#!/usr/bin/env node

/**
 * Sitemap Issues Analyzer
 * Analyzes redirecting URLs and provides correct canonical destinations
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing sitemap URL issues...\n');

// Load CSV data
const csvPath = path.join(process.cwd(), 'siteoptz.ai_wrong_pages_found_in_sitemap_20250912.csv');
const csvData = fs.readFileSync(csvPath, 'utf8');
const lines = csvData.split('\n').filter(line => line.trim());
const issues = [];

// Parse CSV
lines.slice(1).forEach(line => {
  if (line.trim()) {
    const [sitemapUrl, linkUrl, issueType] = line.split(',');
    if (linkUrl && issueType) {
      issues.push({
        url: linkUrl.trim(),
        issue: issueType.trim()
      });
    }
  }
});

console.log(`📊 Found ${issues.length} sitemap URL issues\n`);

// Analyze patterns and provide correct URLs
const corrections = [];

issues.forEach(issue => {
  const url = issue.url.replace('https://siteoptz.ai', '');
  let correctUrl = null;
  let explanation = '';

  if (url.startsWith('/categories/')) {
    // Category redirects: /categories/xyz -> /tools?category=xyz
    const category = url.replace('/categories/', '');
    correctUrl = `/tools?category=${category}`;
    explanation = `Category pages redirect to tools page with category filter`;
  } 
  else if (url.startsWith('/tools/') && url.includes('roi')) {
    // ROI calculator redirects: /tools/xyz-roi-calculator -> /tools/xyz-roi
    const toolName = url.replace('/tools/', '');
    if (toolName.endsWith('-calculator')) {
      correctUrl = `/tools/${toolName.replace('-calculator', '')}`;
      explanation = `ROI calculator URLs redirect to remove '-calculator' suffix`;
    } else {
      correctUrl = `/tools/${toolName}`;
      explanation = `ROI tool URL (likely correct already)`;
    }
  }
  else if (url.startsWith('/analysis/')) {
    // Analysis redirects: /analysis/xyz -> /compare/xyz (maybe?)
    const analysisPath = url.replace('/analysis/', '');
    if (analysisPath.includes('-vs-')) {
      // Convert analysis comparison to compare format
      const parts = analysisPath.split('-vs-');
      if (parts.length === 2) {
        correctUrl = `/compare/${parts[0]}/vs/${parts[1]}`;
        explanation = `Analysis comparison redirects to compare page format`;
      }
    }
  }
  else if (url === '/blog') {
    // Blog non-canonical: /blog -> /blog/ or different URL?
    correctUrl = `/blog/`;
    explanation = `Blog URL may need trailing slash or redirect to different URL`;
  }

  corrections.push({
    original: issue.url,
    originalPath: url,
    issue: issue.issue,
    suggested: correctUrl ? `https://siteoptz.ai${correctUrl}` : 'NEEDS_INVESTIGATION',
    suggestedPath: correctUrl,
    explanation: explanation || 'Manual investigation needed'
  });
});

// Group by issue type
const byIssueType = {};
corrections.forEach(correction => {
  if (!byIssueType[correction.issue]) {
    byIssueType[correction.issue] = [];
  }
  byIssueType[correction.issue].push(correction);
});

// Display results
console.log('🚨 SITEMAP URL CORRECTIONS NEEDED:\n');
console.log('=' .repeat(80));

Object.keys(byIssueType).forEach(issueType => {
  const items = byIssueType[issueType];
  console.log(`\n📋 ${issueType.toUpperCase()} (${items.length} URLs):`);
  console.log('-'.repeat(40));
  
  items.forEach((item, index) => {
    console.log(`${index + 1}. WRONG: ${item.originalPath}`);
    console.log(`   CORRECT: ${item.suggestedPath || 'INVESTIGATE'}`);
    console.log(`   REASON: ${item.explanation}`);
    console.log('');
  });
});

// Summary with final canonical URLs
console.log('\n' + '='.repeat(80));
console.log('📝 FINAL CANONICAL URLS FOR SITEMAP:');
console.log('='.repeat(80));

const finalUrls = new Set();
corrections.forEach(correction => {
  if (correction.suggestedPath && correction.suggestedPath !== 'NEEDS_INVESTIGATION') {
    finalUrls.add(correction.suggestedPath);
  }
});

Array.from(finalUrls).sort().forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});

// Save report
const reportPath = path.join(process.cwd(), 'sitemap-corrections-report.json');
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalIssues: issues.length,
    byIssueType: Object.keys(byIssueType).reduce((acc, type) => {
      acc[type] = byIssueType[type].length;
      return acc;
    }, {}),
    correctedUrls: Array.from(finalUrls).length
  },
  corrections: corrections,
  finalCanonicalUrls: Array.from(finalUrls).sort()
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log(`\n📄 Detailed report saved: ${reportPath}`);

// Recommendations
console.log(`\n💡 RECOMMENDATIONS:`);
console.log(`   1. Update sitemap generator to use correct URLs`);
console.log(`   2. Remove redirecting URLs from sitemap`);
console.log(`   3. Add only canonical 200-status URLs`);
console.log(`   4. Test URLs before including in sitemap`);
console.log(`   5. Monitor for new redirect patterns`);

console.log('='.repeat(80));