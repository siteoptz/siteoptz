#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const FIRECRAWL_API_KEY = 'fc-6e7e6312953b47069452e67509d9f857';

// More AI tool directories to discover from
const SOURCES = [
  'https://theresanaiforthat.com/',
  'https://www.toolify.ai/',
  'https://aitools.fyi/',
  'https://www.aitoolhunt.com/',
  'https://www.futurepedia.io/'
];

async function scrapeWithFirecrawl(url) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({ url, formats: ['markdown'] });
    
    const options = {
      hostname: 'api.firecrawl.dev',
      port: 443,
      path: '/v1/scrape',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.write(postData);
    req.end();
  });
}

function extractTools(content, source) {
  const tools = [];
  
  // Look for tool names in headers and links
  const patterns = [
    /\[([A-Z][A-Za-z0-9\s\.]+)\]\((https?:\/\/[^\)]+)\)/g, // Links
    /^###?\s+([A-Z][A-Za-z0-9\s\.]+)$/gm, // Headers
    /<h[23]>([A-Z][A-Za-z0-9\s\.]+)<\/h[23]>/g // HTML headers
  ];
  
  const foundNames = new Set();
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const name = match[1].trim();
      const url = match[2] || null;
      
      // Filter out navigation and common terms
      const skipTerms = ['Home', 'About', 'Contact', 'Privacy', 'Terms', 'Blog', 'Login', 
                        'Sign', 'Register', 'Menu', 'Search', 'Categories', 'Tags', 
                        'Facebook', 'Twitter', 'LinkedIn', 'Instagram', 'YouTube'];
      
      if (name.length > 2 && 
          name.length < 30 && 
          !skipTerms.some(term => name.includes(term)) &&
          !foundNames.has(name.toLowerCase())) {
        
        foundNames.add(name.toLowerCase());
        
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        tools.push({
          id: slug,
          name: name,
          slug: slug,
          description: `${name} - AI-powered tool for enhanced productivity`,
          website: url || `https://${slug}.com`,
          logo: `/images/tools/${slug}-logo.svg`,
          category: 'AI Tools',
          features: [
            'AI-powered capabilities',
            'Streamlined workflow',
            'Productivity enhancement'
          ],
          pricing: [{ 
            plan: 'Visit website', 
            price_per_month: 0, 
            features: ['Check website for pricing'] 
          }],
          pros: ['Innovative AI features', 'User-friendly interface'],
          cons: ['Pricing varies', 'Learning curve'],
          rating: 4.2,
          benchmarks: {
            speed: 8,
            accuracy: 8,
            integration: 7,
            ease_of_use: 8,
            value: 7
          },
          meta: {
            title: `${name} Review - Features, Pricing & Alternatives [2025]`,
            description: `Comprehensive ${name} review. Compare features, pricing, and alternatives.`
          },
          overview: {
            developer: name, // Use tool name as developer initially
            release_year: 2024,
            description: `${name} - AI-powered tool for enhanced productivity`,
            category: 'AI Tools'
          }
        });
      }
    }
  });
  
  return tools;
}

async function discoverNewTools() {
  console.log('🚀 AI Tools Discovery - Finding New Tools\n');
  console.log('━'.repeat(50));
  
  const allNewTools = [];
  
  // Load existing tools
  const dataPath = path.join(process.cwd(), '../public/data/aiToolsData.json');
  let existingTools = [];
  
  if (fs.existsSync(dataPath)) {
    existingTools = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    console.log(`📊 Current database: ${existingTools.length} tools\n`);
  }
  
  const existingIds = new Set(existingTools.map(t => t.id));
  const existingNames = new Set(existingTools.map(t => t.name.toLowerCase()));
  
  // Try each source
  for (const source of SOURCES.slice(0, 2)) { // Just try first 2 sources for now
    console.log(`\n📡 Discovering from: ${source}`);
    
    try {
      const result = await scrapeWithFirecrawl(source);
      
      if (result && result.success && result.data) {
        const content = result.data.markdown || '';
        const tools = extractTools(content, source);
        
        // Filter out existing tools
        const newTools = tools.filter(tool => 
          !existingIds.has(tool.id) && 
          !existingNames.has(tool.name.toLowerCase())
        );
        
        console.log(`  ✓ Found ${tools.length} tools (${newTools.length} new)`);
        
        if (newTools.length > 0) {
          console.log('  🆕 New tools:');
          newTools.slice(0, 5).forEach(t => console.log(`     • ${t.name}`));
          if (newTools.length > 5) {
            console.log(`     ... and ${newTools.length - 5} more`);
          }
        }
        
        allNewTools.push(...newTools);
      } else {
        console.log(`  ✗ Failed to scrape`);
      }
      
      // Wait 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
    }
  }
  
  console.log('\n' + '━'.repeat(50));
  console.log('📊 Summary:');
  console.log(`  • Total new tools found: ${allNewTools.length}`);
  
  if (allNewTools.length > 0) {
    // Remove any remaining duplicates within new tools
    const uniqueNewTools = [];
    const seenIds = new Set();
    
    for (const tool of allNewTools) {
      if (!seenIds.has(tool.id)) {
        seenIds.add(tool.id);
        uniqueNewTools.push(tool);
      }
    }
    
    console.log(`  • Unique new tools: ${uniqueNewTools.length}`);
    
    // Save backup
    const backupPath = dataPath.replace('.json', `-backup-${Date.now()}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(existingTools, null, 2));
    console.log(`  • Backup saved: ${path.basename(backupPath)}`);
    
    // Add new tools
    const updatedData = [...existingTools, ...uniqueNewTools];
    fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2));
    
    console.log(`  • Database updated: ${updatedData.length} total tools`);
    console.log('\n✨ Successfully added new AI tools!');
    
    // List all new tools
    console.log('\n🆕 New tools added:');
    uniqueNewTools.forEach((tool, i) => {
      console.log(`${i + 1}. ${tool.name} - ${tool.description.substring(0, 50)}...`);
    });
    
  } else {
    console.log('\n✅ No new tools found (all tools already in database)');
  }
  
  console.log('━'.repeat(50));
}

discoverNewTools().catch(console.error);