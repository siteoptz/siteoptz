import FirecrawlApp from '@mendable/firecrawl-js';
import fs from 'fs';
import path from 'path';

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY || 'fc-6e7e6312953b47069452e67509d9f857'
});

// Load existing tools for duplicate detection
function loadExistingTools() {
  try {
    const data = fs.readFileSync('public/data/aiToolsData.json', 'utf8');
    const tools = JSON.parse(data);
    
    const existingNames = new Set(tools.map(t => t.name?.toLowerCase()));
    const existingIds = new Set(tools.map(t => t.id));
    const existingSlugs = new Set(tools.map(t => t.slug));
    
    console.log(`📊 Loaded ${tools.length} existing tools for duplicate detection`);
    
    return { existingNames, existingIds, existingSlugs, allTools: tools };
  } catch (error) {
    console.warn('⚠️ Could not load existing tools, will proceed without duplicate detection');
    return { existingNames: new Set(), existingIds: new Set(), existingSlugs: new Set(), allTools: [] };
  }
}

// Fake tool detection patterns
const FAKE_TOOL_PATTERNS = {
  suspiciousNames: [
    /test/i, /demo/i, /example/i, /lorem/i, /ipsum/i, /placeholder/i,
    /sample/i, /fake/i, /dummy/i
  ],
  suspiciousDescriptions: [
    /lorem ipsum/i, /placeholder text/i, /test description/i, /coming soon/i,
    /under construction/i, /not available/i, /TBD/i, /to be determined/i
  ],
  invalidUrls: [
    /^#$/, /^javascript:/i, /^mailto:/i, /localhost/i, /127\.0\.0\.1/,
    /example\.com/i, /test\.com/i
  ]
};

function isFakeTool(tool) {
  const reasons = [];
  
  if (!tool.name || tool.name.length < 2) {
    reasons.push('Name too short or missing');
  }
  
  for (const pattern of FAKE_TOOL_PATTERNS.suspiciousNames) {
    if (pattern.test(tool.name)) {
      reasons.push(`Suspicious name pattern: ${pattern}`);
    }
  }
  
  if (!tool.description || tool.description.length < 10) {
    reasons.push('Description too short or missing');
  }
  
  for (const pattern of FAKE_TOOL_PATTERNS.suspiciousDescriptions) {
    if (pattern.test(tool.description)) {
      reasons.push(`Suspicious description pattern: ${pattern}`);
    }
  }
  
  if (tool.url) {
    for (const pattern of FAKE_TOOL_PATTERNS.invalidUrls) {
      if (pattern.test(tool.url)) {
        reasons.push(`Invalid URL pattern: ${pattern}`);
      }
    }
  }
  
  const wrapperPatterns = [
    /^(Another |Yet Another |My |Simple |Basic |New )?(ChatGPT|GPT|Claude|Gemini|Copilot)/i
  ];
  
  for (const pattern of wrapperPatterns) {
    if (pattern.test(tool.name)) {
      reasons.push('Appears to be a generic wrapper for existing AI');
    }
  }
  
  return {
    isFake: reasons.length > 0,
    reasons
  };
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function convertToSiteOptzFormat(tool, category) {
  const slug = generateSlug(tool.name);
  const id = slug;
  
  let pricingPlans = [];
  if (tool.pricing) {
    if (tool.pricing.toLowerCase().includes('free')) {
      pricingPlans.push({
        plan: "Free",
        price_per_month: 0,
        features: tool.features || []
      });
    }
    if (tool.pricing.toLowerCase().includes('paid') || tool.pricing.toLowerCase().includes('premium')) {
      pricingPlans.push({
        plan: "Pro",
        price_per_month: 29,
        features: tool.features || []
      });
    }
    if (tool.pricing.toLowerCase().includes('freemium')) {
      pricingPlans = [
        {
          plan: "Free",
          price_per_month: 0,
          features: ["Limited features"]
        },
        {
          plan: "Pro",
          price_per_month: 29,
          features: tool.features || []
        }
      ];
    }
  }
  
  if (pricingPlans.length === 0) {
    pricingPlans = [
      {
        plan: "Free Trial",
        price_per_month: 0,
        features: ["Limited access"]
      }
    ];
  }
  
  return {
    id,
    name: tool.name,
    slug,
    description: tool.description || "",
    category: tool.category || category || "AI Tools",
    logo: `/images/tools/${slug}-logo.svg`,
    features: tool.features || [],
    pricing: pricingPlans,
    pros: [
      tool.description?.substring(0, 100) + "..."
    ],
    cons: ["Pricing details may vary"],
    rating: 4.0,
    benchmarks: {
      speed: 7,
      accuracy: 7,
      integration: 6,
      ease_of_use: 7,
      value: 7
    },
    website: tool.url || "",
    lastUpdated: new Date().toISOString(),
    source: "insidr-ai-multi-page"
  };
}

async function scrapePage(pageNum, existingData) {
  const url = `https://www.insidr.ai/ai-tools/page/${pageNum}/`;
  
  console.log(`\n📄 Scraping page ${pageNum}: ${url}`);
  
  try {
    const scrapeResult = await firecrawl.scrapeUrl(url, {
      formats: ['extract'],
      extract: {
        schema: {
          type: 'object',
          properties: {
            tools: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  category: { type: 'string' },
                  url: { type: 'string' },
                  pricing: { type: 'string' },
                  features: {
                    type: 'array',
                    items: { type: 'string' }
                  },
                  tags: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                }
              }
            },
            hasNextPage: { type: 'boolean' },
            totalToolsOnPage: { type: 'number' }
          }
        },
        systemPrompt: `Extract ALL AI tools from this Insidr.ai page ${pageNum}. For each tool, extract:
        - name: The exact tool name
        - description: Full description of what the tool does
        - category: The category (e.g., Writing, Social, Research, Design, etc.)
        - url: The direct link to the tool's page or website
        - pricing: Pricing model (Free, Paid, Freemium, etc.)
        - features: List of key features or capabilities
        - tags: Any tags or keywords associated with the tool
        
        Also indicate if there's a next page and total tools on this page.
        Be thorough and extract EVERY tool visible on the page.`
      },
      waitFor: 3000,
      timeout: 30000
    });
    
    if (scrapeResult.success && scrapeResult.extract?.tools) {
      const scrapedTools = scrapeResult.extract.tools;
      console.log(`   ✅ Found ${scrapedTools.length} tools on page ${pageNum}`);
      
      const newTools = [];
      const duplicates = [];
      const fakeTools = [];
      
      for (const tool of scrapedTools) {
        // Check for fake tools
        const fakeCheck = isFakeTool(tool);
        if (fakeCheck.isFake) {
          fakeTools.push({
            name: tool.name,
            reasons: fakeCheck.reasons
          });
          continue;
        }
        
        // Check for duplicates
        const toolNameLower = tool.name?.toLowerCase();
        if (existingData.existingNames.has(toolNameLower)) {
          duplicates.push(tool.name);
          continue;
        }
        
        // Convert to SiteOptz format
        const convertedTool = convertToSiteOptzFormat(tool, tool.category);
        
        // Double-check slug/id duplicates
        if (existingData.existingIds.has(convertedTool.id) || existingData.existingSlugs.has(convertedTool.slug)) {
          duplicates.push(tool.name);
          continue;
        }
        
        // Add to our tracking sets to prevent duplicates in later pages
        existingData.existingNames.add(toolNameLower);
        existingData.existingIds.add(convertedTool.id);
        existingData.existingSlugs.add(convertedTool.slug);
        
        newTools.push(convertedTool);
      }
      
      console.log(`   📊 Page ${pageNum}: ${newTools.length} new, ${duplicates.length} duplicates, ${fakeTools.length} fake`);
      
      return {
        success: true,
        pageNum,
        url,
        totalScraped: scrapedTools.length,
        newTools,
        duplicates,
        fakeTools
      };
      
    } else {
      console.log(`   ❌ Page ${pageNum}: Failed to extract tools`);
      return {
        success: false,
        pageNum,
        url,
        error: 'Extraction failed'
      };
    }
    
  } catch (error) {
    console.log(`   ❌ Page ${pageNum}: Error - ${error.message}`);
    return {
      success: false,
      pageNum,
      url,
      error: error.message
    };
  }
}

async function scrapeAllPages(startPage = 2, endPage = 42, testMode = false) {
  console.log('🚀 Starting Multi-Page Insidr.ai Scraper');
  console.log(`📍 Scraping pages ${startPage} to ${endPage}`);
  
  if (testMode) {
    console.log('🧪 Running in TEST MODE (limited pages)');
    endPage = Math.min(startPage + 2, endPage); // Only scrape 3 pages in test mode
  }
  
  const existingData = loadExistingTools();
  const results = [];
  const allNewTools = [];
  const allStats = {
    totalPages: 0,
    successfulPages: 0,
    failedPages: 0,
    totalToolsScraped: 0,
    totalNewTools: 0,
    totalDuplicates: 0,
    totalFakeTools: 0
  };
  
  // Create output directory
  const outputDir = 'data/insidr-multi-page';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Process pages in batches to avoid overwhelming the API
  const batchSize = 3;
  for (let batchStart = startPage; batchStart <= endPage; batchStart += batchSize) {
    const batchEnd = Math.min(batchStart + batchSize - 1, endPage);
    console.log(`\n🔄 Processing batch: pages ${batchStart}-${batchEnd}`);
    
    const batchPromises = [];
    for (let pageNum = batchStart; pageNum <= batchEnd; pageNum++) {
      batchPromises.push(scrapePage(pageNum, existingData));
    }
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    // Process batch results
    for (const result of batchResults) {
      allStats.totalPages++;
      
      if (result.success) {
        allStats.successfulPages++;
        allStats.totalToolsScraped += result.totalScraped;
        allStats.totalNewTools += result.newTools.length;
        allStats.totalDuplicates += result.duplicates.length;
        allStats.totalFakeTools += result.fakeTools.length;
        
        allNewTools.push(...result.newTools);
      } else {
        allStats.failedPages++;
      }
    }
    
    // Rate limiting between batches
    if (batchEnd < endPage) {
      console.log(`   ⏳ Waiting 5 seconds before next batch...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  // Save results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  // Save all new tools
  if (allNewTools.length > 0) {
    const newToolsFile = path.join(outputDir, `all-new-tools-${timestamp}.json`);
    fs.writeFileSync(newToolsFile, JSON.stringify(allNewTools, null, 2));
    console.log(`\n📁 Saved ${allNewTools.length} new tools to: ${newToolsFile}`);
  }
  
  // Save detailed results
  const detailedResults = {
    timestamp: new Date().toISOString(),
    scrapeRange: `pages ${startPage}-${endPage}`,
    testMode,
    statistics: allStats,
    pageResults: results.map(r => ({
      pageNum: r.pageNum,
      url: r.url,
      success: r.success,
      toolsFound: r.success ? r.totalScraped : 0,
      newTools: r.success ? r.newTools.length : 0,
      duplicates: r.success ? r.duplicates.length : 0,
      fakeTools: r.success ? r.fakeTools.length : 0,
      error: r.error || null
    })),
    sampleNewTools: allNewTools.slice(0, 10).map(t => ({
      name: t.name,
      category: t.category,
      id: t.id
    }))
  };
  
  const reportFile = path.join(outputDir, `scraping-report-${timestamp}.json`);
  fs.writeFileSync(reportFile, JSON.stringify(detailedResults, null, 2));
  
  // Display final summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 MULTI-PAGE SCRAPING SUMMARY');
  console.log('='.repeat(60));
  console.log(`📄 Pages processed: ${allStats.totalPages}`);
  console.log(`✅ Successful pages: ${allStats.successfulPages}`);
  console.log(`❌ Failed pages: ${allStats.failedPages}`);
  console.log(`📥 Total tools scraped: ${allStats.totalToolsScraped}`);
  console.log(`✨ New unique tools: ${allStats.totalNewTools}`);
  console.log(`🔄 Duplicates found: ${allStats.totalDuplicates}`);
  console.log(`🚫 Fake tools filtered: ${allStats.totalFakeTools}`);
  console.log(`📚 Existing tools in database: ${existingData.allTools.length}`);
  
  if (allNewTools.length > 0) {
    console.log('\n✨ Sample of new tools found:');
    allNewTools.slice(0, 10).forEach((tool, i) => {
      console.log(`   ${i + 1}. ${tool.name} (${tool.category})`);
    });
    
    if (allNewTools.length > 10) {
      console.log(`   ... and ${allNewTools.length - 10} more tools`);
    }
  }
  
  console.log(`\n📄 Full report saved to: ${reportFile}`);
  console.log('='.repeat(60));
  
  return {
    success: true,
    allNewTools,
    statistics: allStats,
    detailedResults
  };
}

// Export for use in other scripts
export { scrapeAllPages };

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const args = process.argv.slice(2);
  const testMode = args.includes('--test');
  const startPage = parseInt(args.find(arg => arg.startsWith('--start='))?.split('=')[1]) || 2;
  const endPage = parseInt(args.find(arg => arg.startsWith('--end='))?.split('=')[1]) || 42;
  
  scrapeAllPages(startPage, endPage, testMode).then(result => {
    if (result.success) {
      console.log('\n✅ Multi-page scraping completed successfully!');
      console.log('📝 Next steps:');
      console.log('   1. Review the new tools in data/insidr-multi-page/all-new-tools-*.json');
      console.log('   2. Run: node add-insidr-tools.js to add them to aiToolsData.json');
      console.log('   3. Validate with: npm run validate-images && npm run validate-schema');
    } else {
      console.log('\n❌ Multi-page scraping failed. Check the error messages above.');
    }
  }).catch(error => {
    console.error('\n💥 Fatal error:', error.message);
  });
}