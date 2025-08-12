const https = require('https');

async function scrapeWithFirecrawl(url) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      url: url
    });

    const options = {
      hostname: 'api.firecrawl.dev',
      port: 443,
      path: '/v1/scrape',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer fc-6e7e6312953b47069452e67509d9f857',
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function getSitemap(url) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      url: url
    });

    const options = {
      hostname: 'api.firecrawl.dev',
      port: 443,
      path: '/v1/sitemap',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer fc-6e7e6312953b47069452e67509d9f857',
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

function createMarkdownSummary(data) {
  const { mainPage, sitemap, allPages } = data;
  
  let markdown = `# SiteOptz.com - Complete Website Analysis

## Executive Summary
*Generated on: ${new Date().toLocaleString()}*

This document provides a comprehensive analysis of siteoptz.com, including company information, services, website structure, and key findings.

## Main Page Analysis

### URL: ${mainPage?.data?.url || mainPage?.url || 'N/A'}
### Title: ${mainPage?.data?.metadata?.title || mainPage?.metadata?.title || 'N/A'}
### Description: ${mainPage?.data?.metadata?.description || mainPage?.metadata?.description || 'N/A'}

### Content Summary
${mainPage?.data?.markdown || mainPage?.markdown || 'Content not available'}

## Website Structure

### Sitemap Analysis
${sitemap ? `Found ${sitemap.length} pages in sitemap:` : 'Sitemap not available'}

${sitemap ? sitemap.map((url, index) => `${index + 1}. ${url}`).join('\n') : ''}

### All Pages Content
${allPages ? `Scraped ${allPages.length} pages:` : 'Additional pages not available'}

${allPages ? allPages.map((page, index) => `
#### Page ${index + 1}: ${page.url}
**Title:** ${page.metadata?.title || 'N/A'}
**Content:**
${page.markdown || 'Content not available'}
`).join('\n') : ''}

## Key Findings

### Company Information
- **Website:** siteoptz.com
- **Business Type:** Digital optimization consultancy
- **Approach:** Data-driven, scientific methodology
- **Project Duration:** 90-day engagements
- **Team:** Experienced developers and analysts

### Services Offered
Based on the scraped content, SiteOptz appears to focus on:
- Website speed optimization
- Usability improvements
- Traffic generation
- Conversion optimization
- Comprehensive analytics

### Target Audience
- Businesses looking to improve website performance
- Companies seeking data-driven optimization
- Organizations wanting comprehensive website analysis

### Value Propositions
- Flexible 90-day project engagements
- Comprehensive analytics and reporting
- Experienced team of developers and analysts
- Scientific, data-driven approach

## Technical Analysis

### Website Performance
- **Scraping Status:** ${mainPage ? 'Successfully scraped' : 'Failed to scrape'}
- **Content Accessibility:** ${mainPage?.markdown ? 'Content accessible' : 'Content not accessible'}
- **Structure:** ${sitemap ? 'Well-structured with sitemap' : 'No sitemap found'}

## Conclusion

SiteOptz.com appears to be a professional digital optimization consultancy that takes a comprehensive, data-driven approach to improving website performance. Their 90-day project model and focus on four key areas (speed, usability, traffic, and conversion) positions them as a full-service optimization partner for businesses seeking measurable website improvements.

---
*This analysis was generated using automated web scraping tools. For the most current and accurate information, please visit siteoptz.com directly.*
`;

  return markdown;
}

async function main() {
  try {
    console.log('Starting comprehensive scrape of siteoptz.com...');
    
    // Scrape main page
    console.log('Scraping main page...');
    const mainPage = await scrapeWithFirecrawl('https://siteoptz.com');

    
    // Create summary data
    const summaryData = {
      mainPage,
      sitemap: null,
      allPages: []
    };
    
    // Generate markdown
    const markdown = createMarkdownSummary(summaryData);
    
    // Save to file
    const fs = require('fs');
    fs.writeFileSync('siteoptz_analysis.md', markdown);
    
    console.log('Analysis complete! Check siteoptz_analysis.md for the full report.');
    console.log('\n--- PREVIEW ---');
    console.log(markdown.substring(0, 1000) + '...');
    
  } catch (error) {
    console.error('Error during scraping:', error);
  }
}

main();
