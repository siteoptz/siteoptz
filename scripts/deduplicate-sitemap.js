#!/usr/bin/env node

/**
 * Sitemap Deduplication Script
 * Removes duplicate URLs from XML sitemaps
 */

const fs = require('fs');
const path = require('path');

function deduplicateSitemap(sitemapPath) {
  if (!fs.existsSync(sitemapPath)) {
    console.log(`⚠️  File not found: ${sitemapPath}`);
    return;
  }

  console.log(`Processing: ${path.basename(sitemapPath)}`);
  
  const content = fs.readFileSync(sitemapPath, 'utf8');
  const lines = content.split('\n');
  
  const seenUrls = new Set();
  const filteredLines = [];
  let currentUrl = null;
  let currentUrlBlock = [];
  let duplicatesRemoved = 0;
  
  for (const line of lines) {
    // Check if this is a <url> opening tag
    if (line.trim() === '<url>') {
      currentUrlBlock = [line];
      currentUrl = null;
    } 
    // Check if this is a <loc> tag
    else if (line.includes('<loc>')) {
      const locMatch = line.match(/<loc>(.*?)<\/loc>/);
      if (locMatch) {
        currentUrl = locMatch[1];
      }
      currentUrlBlock.push(line);
    }
    // Check if this is a </url> closing tag
    else if (line.trim() === '</url>') {
      currentUrlBlock.push(line);
      
      if (currentUrl && seenUrls.has(currentUrl)) {
        // Skip this duplicate URL block
        duplicatesRemoved++;
        console.log(`  Removed duplicate: ${currentUrl}`);
      } else {
        // Add this URL block to filtered lines
        if (currentUrl) {
          seenUrls.add(currentUrl);
        }
        filteredLines.push(...currentUrlBlock);
      }
      
      currentUrlBlock = [];
      currentUrl = null;
    }
    // For all other lines (including those inside url blocks)
    else if (currentUrlBlock.length > 0) {
      currentUrlBlock.push(line);
    }
    // For lines outside url blocks (header, footer, etc.)
    else {
      filteredLines.push(line);
    }
  }
  
  if (duplicatesRemoved > 0) {
    const deduplicatedContent = filteredLines.join('\n');
    fs.writeFileSync(sitemapPath, deduplicatedContent, 'utf8');
    console.log(`✅ Removed ${duplicatesRemoved} duplicates from ${path.basename(sitemapPath)}`);
  } else {
    console.log(`✅ No duplicates found in ${path.basename(sitemapPath)}`);
  }
}

// Run deduplication on all sitemap files
const sitemapFiles = [
  '/Users/siteoptz/siteoptz/public/sitemap-tools.xml',
  '/Users/siteoptz/siteoptz/public/sitemap-comparisons.xml',
  '/Users/siteoptz/siteoptz/public/sitemap-main.xml'
];

console.log('🧹 Starting sitemap deduplication...\n');

for (const sitemapFile of sitemapFiles) {
  deduplicateSitemap(sitemapFile);
  console.log('');
}

console.log('🎉 Sitemap deduplication complete!');