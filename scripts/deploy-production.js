#!/usr/bin/env node

/**
 * Production Deployment Script for SiteOptz.ai AI Tools System
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting SiteOptz.ai AI Tools Production Deployment...\n');

// Configuration
const CONFIG = {
  dataDir: 'public/data',
  sitemapPath: 'public/sitemap.xml', 
  robotsPath: 'public/robots.txt',
  baseUrl: 'https://siteoptz.ai'
};

// Utility functions
const logStep = (message) => console.log(`📋 ${message}`);
const logSuccess = (message) => console.log(`✅ ${message}`);
const logError = (message) => console.error(`❌ ${message}`);

// Step 1: Validate data files
function validateDataFiles() {
  logStep('Validating data files...');
  
  try {
    const aiToolsPath = path.join(CONFIG.dataDir, 'aiToolsData.json');
    const faqPath = path.join(CONFIG.dataDir, 'faqData.json');
    
    if (!fs.existsSync(aiToolsPath)) {
      throw new Error('aiToolsData.json not found in public/data/');
    }
    
    if (!fs.existsSync(faqPath)) {
      throw new Error('faqData.json not found in public/data/');
    }
    
    const aiToolsData = JSON.parse(fs.readFileSync(aiToolsPath, 'utf8'));
    const faqData = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
    
    if (!Array.isArray(aiToolsData) || aiToolsData.length === 0) {
      throw new Error('Invalid aiToolsData.json format');
    }
    
    logSuccess(`Validated ${aiToolsData.length} AI tools and FAQ data`);
    return { aiToolsData, faqData };
  } catch (error) {
    logError(`Data validation failed: ${error.message}`);
    process.exit(1);
  }
}

// Step 2: Generate sitemap
function generateSitemap(aiToolsData) {
  logStep('Generating sitemap.xml...');
  
  try {
    const urls = [
      {
        url: `${CONFIG.baseUrl}/tools`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '1.0'
      }
    ];

    // Add individual tool pages
    aiToolsData.forEach(tool => {
      urls.push({
        url: `${CONFIG.baseUrl}/tools/${tool.slug}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8'
      });
    });

    // Add comparison pages
    const popularComparisons = [
      ['chatgpt', 'claude'],
      ['chatgpt', 'gemini'], 
      ['claude', 'gemini'],
      ['jasper-ai', 'copy-ai']
    ];

    popularComparisons.forEach(([tool1, tool2]) => {
      urls.push({
        url: `${CONFIG.baseUrl}/compare/${tool1}-vs-${tool2}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7'
      });
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(CONFIG.sitemapPath, sitemap);
    logSuccess(`Generated sitemap with ${urls.length} URLs`);
  } catch (error) {
    logError(`Sitemap generation failed: ${error.message}`);
  }
}

// Main deployment function
async function deploy() {
  try {
    const startTime = Date.now();
    
    const { aiToolsData } = validateDataFiles();
    generateSitemap(aiToolsData);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log(`\n🎉 Deployment preparation completed in ${duration}s!`);
    console.log(`\n📚 Manual Validation Required:`);
    
    console.log(`
🔍 SEO & Schema Validation:

1. Google Rich Results Test:
   🔗 https://search.google.com/test/rich-results
   Test URLs:
   • https://siteoptz.ai/tools/chatgpt
   • https://siteoptz.ai/compare/chatgpt-vs-claude

2. Mobile-Friendly Test:
   🔗 https://search.google.com/test/mobile-friendly

3. Page Speed Insights:
   🔗 https://pagespeed.web.dev/
   Target: Performance > 90, SEO > 95

4. Schema Validator:
   🔗 https://validator.schema.org/

Expected Results:
✅ Product schema for tools
✅ FAQ schema with Q&A
✅ Breadcrumb navigation
✅ Mobile responsive design
✅ Fast page load speeds
`);
    
  } catch (error) {
    logError(`Deployment failed: ${error.message}`);
  }
}

// Run deployment
deploy();
