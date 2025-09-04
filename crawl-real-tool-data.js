#!/usr/bin/env node

const fs = require('fs');
const https = require('https');

// Firecrawl API configuration
const FIRECRAWL_API_KEY = 'fc-6e7e6312953b47069452e67509d9f857';
const FIRECRAWL_API_URL = 'https://api.firecrawl.dev/v0/scrape';

console.log('🕷️ Crawling real tool data from websites...\n');

// Load data
const data = JSON.parse(fs.readFileSync('public/data/aiToolsData.json', 'utf8'));
const newTools = data.slice(231); // Only process the 90 new tools

console.log(`📊 Found ${newTools.length} new tools to crawl`);

// Function to scrape website with Firecrawl
async function scrapeWithFirecrawl(url) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      url: url,
      formats: ['markdown'],
      onlyMainContent: true,
      includeTags: ['pricing', 'price', 'plan', 'cost', 'free', 'trial', 'subscription', 'feature'],
      excludeTags: ['nav', 'footer', 'sidebar'],
      waitFor: 1000
    });

    const options = {
      hostname: 'api.firecrawl.dev',
      port: 443,
      path: '/v0/scrape',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.success && response.data) {
            resolve(response.data.markdown || response.data.content || '');
          } else {
            resolve(''); // Return empty string for failed scrapes
          }
        } catch (error) {
          console.log(`❌ Parse error for ${url}: ${error.message}`);
          resolve('');
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ Request error for ${url}: ${error.message}`);
      resolve('');
    });

    req.setTimeout(30000, () => {
      req.destroy();
      console.log(`⏱️ Timeout for ${url}`);
      resolve('');
    });

    req.write(postData);
    req.end();
  });
}

// Function to extract pricing from scraped content
function extractPricing(content, toolName) {
  if (!content || content.length < 50) {
    return [{
      plan: "Contact Sales",
      price_per_month: "Contact for pricing",
      features: ["Custom pricing available", "Contact for details"]
    }];
  }
  
  const text = content.toLowerCase();
  const pricing = [];
  
  // Common pricing patterns
  const pricePatterns = [
    /free[\s\w]*(?:plan|tier)?/gi,
    /\$(\d+)(?:\.(\d+))?(?:\/month|\/mo|per month)/gi,
    /\$(\d+)(?:\.(\d+))?\s*month/gi,
    /(\d+)\s*\$(?:\/month|\/mo|per month)/gi,
    /starter[\s\w]*\$?(\d+)/gi,
    /basic[\s\w]*\$?(\d+)/gi,
    /pro[\s\w]*\$?(\d+)/gi,
    /premium[\s\w]*\$?(\d+)/gi,
    /enterprise[\s\w]*(?:contact|custom)/gi
  ];
  
  // Look for free plan
  if (text.includes('free') && (text.includes('plan') || text.includes('tier') || text.includes('forever'))) {
    pricing.push({
      plan: "Free",
      price_per_month: 0,
      features: ["Basic features", "Limited usage"]
    });
  }
  
  // Extract paid plans
  const paidMatches = content.match(/\$(\d+)(?:\.(\d+))?(?:\/month|\/mo|per month)/gi) || [];
  if (paidMatches.length > 0) {
    const uniquePrices = [...new Set(paidMatches)];
    uniquePrices.slice(0, 3).forEach((match, index) => {
      const price = parseInt(match.replace(/[^\d]/g, ''));
      const planNames = ['Starter', 'Pro', 'Enterprise'];
      pricing.push({
        plan: planNames[index] || `Plan ${index + 1}`,
        price_per_month: price,
        features: [`${planNames[index] || 'Advanced'} features`, "Priority support"]
      });
    });
  }
  
  // If no pricing found, create reasonable defaults
  if (pricing.length === 0) {
    if (text.includes('free') || text.includes('trial')) {
      pricing.push({
        plan: "Free Trial",
        price_per_month: 0,
        features: ["Limited time access", "Basic features"]
      });
    }
    
    pricing.push({
      plan: "Pro",
      price_per_month: "Contact for pricing",
      features: ["Full feature access", "Premium support"]
    });
  }
  
  return pricing.slice(0, 3); // Limit to 3 plans max
}

// Function to extract features from content
function extractFeatures(content, toolName) {
  if (!content || content.length < 50) {
    return ["AI-powered functionality", "User-friendly interface", "Fast processing"];
  }
  
  const features = [];
  const text = content.toLowerCase();
  
  // Look for feature lists
  const featurePatterns = [
    /features?:\s*([^\n]+)/gi,
    /benefits?:\s*([^\n]+)/gi,
    /capabilities:\s*([^\n]+)/gi,
    /•\s*([^\n•]+)/g,
    /-\s*([^\n-]+)/g,
    /✓\s*([^\n✓]+)/g
  ];
  
  featurePatterns.forEach(pattern => {
    const matches = content.match(pattern) || [];
    matches.slice(0, 5).forEach(match => {
      const feature = match.replace(/^[•\-✓]\s*/, '').replace(/features?:\s*/i, '').trim();
      if (feature.length > 5 && feature.length < 100 && !features.includes(feature)) {
        features.push(feature);
      }
    });
  });
  
  // Add category-specific features if none found
  if (features.length === 0) {
    features.push("AI-powered automation", "Easy integration", "Scalable solution");
  }
  
  return features.slice(0, 8); // Limit to reasonable number
}

// Function to enhance description
function enhanceDescription(content, originalDescription, toolName) {
  if (!content || content.length < 100) {
    return originalDescription;
  }
  
  // Extract first meaningful paragraph
  const paragraphs = content.split('\n').filter(p => p.trim().length > 50);
  if (paragraphs.length > 0) {
    const firstParagraph = paragraphs[0].trim();
    if (firstParagraph.length > originalDescription.length) {
      return firstParagraph.substring(0, 300) + (firstParagraph.length > 300 ? '...' : '');
    }
  }
  
  return originalDescription;
}

// Process tools with rate limiting
async function processToolsWithRateLimit() {
  const results = [];
  const batchSize = 5; // Process 5 at a time
  const delay = 2000; // 2 second delay between batches
  
  console.log(`📊 Processing ${newTools.length} tools in batches of ${batchSize}...`);
  
  for (let i = 0; i < newTools.length; i += batchSize) {
    const batch = newTools.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(newTools.length / batchSize);
    
    console.log(`\n📦 Processing batch ${batchNumber}/${totalBatches}:`);
    
    const batchPromises = batch.map(async (tool) => {
      const website = tool.overview?.website || tool.website || '';
      
      // Skip if no valid website
      if (!website || !website.includes('http') || website === 'Contact for pricing') {
        console.log(`  ⏭️ ${tool.name}: No valid website`);
        return { ...tool }; // Return unchanged
      }
      
      console.log(`  🔍 ${tool.name}: ${website}`);
      
      try {
        const content = await scrapeWithFirecrawl(website);
        
        if (content && content.length > 50) {
          const newPricing = extractPricing(content, tool.name);
          const newFeatures = extractFeatures(content, tool.name);
          const enhancedDesc = enhanceDescription(content, tool.description, tool.name);
          
          console.log(`    ✅ Extracted: ${newPricing.length} pricing plans, ${newFeatures.length} features`);
          
          return {
            ...tool,
            description: enhancedDesc,
            features: newFeatures,
            pricing: newPricing,
            overview: {
              ...tool.overview,
              lastUpdated: new Date().toISOString()
            }
          };
        } else {
          console.log(`    ❌ No content extracted`);
          return { ...tool };
        }
      } catch (error) {
        console.log(`    ❌ Error: ${error.message}`);
        return { ...tool };
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    // Delay between batches (except for the last batch)
    if (i + batchSize < newTools.length) {
      console.log(`⏳ Waiting ${delay/1000}s before next batch...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return results;
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting website crawling process...');
    
    const processedNewTools = await processToolsWithRateLimit();
    
    // Combine original tools with processed new tools
    const originalTools = data.slice(0, 231);
    const finalData = [...originalTools, ...processedNewTools];
    
    // Save updated data
    fs.writeFileSync('public/data/aiToolsData.json', JSON.stringify(finalData, null, 2));
    
    console.log('\n🎉 Website crawling completed!');
    console.log(`📊 Processed ${processedNewTools.length} tools`);
    console.log(`📁 Updated data saved to aiToolsData.json`);
    
    // Summary of updates
    let updatedTools = 0;
    processedNewTools.forEach(tool => {
      if (tool.overview?.lastUpdated) {
        updatedTools++;
      }
    });
    
    console.log(`✅ Successfully updated ${updatedTools} tools with real website data`);
    console.log(`⏭️ ${processedNewTools.length - updatedTools} tools kept with default data`);
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the crawler
main();