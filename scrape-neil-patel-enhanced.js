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
    
    // Create lookup maps for efficient duplicate detection
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
    /test/i,
    /demo/i,
    /example/i,
    /lorem/i,
    /ipsum/i,
    /placeholder/i,
    /sample/i,
    /fake/i,
    /dummy/i
  ],
  
  suspiciousDescriptions: [
    /lorem ipsum/i,
    /placeholder text/i,
    /test description/i,
    /coming soon/i,
    /under construction/i,
    /not available/i,
    /TBD/i,
    /to be determined/i
  ],
  
  invalidUrls: [
    /^#$/,
    /^javascript:/i,
    /^mailto:/i,
    /localhost/i,
    /127\.0\.0\.1/,
    /example\.com/i,
    /test\.com/i
  ]
};

// Check if a tool is likely fake or invalid
function isFakeTool(tool) {
  const reasons = [];
  
  // Check name
  if (!tool.name || tool.name.length < 2) {
    reasons.push('Name too short or missing');
  }
  
  for (const pattern of FAKE_TOOL_PATTERNS.suspiciousNames) {
    if (pattern.test(tool.name)) {
      reasons.push(`Suspicious name pattern: ${pattern}`);
    }
  }
  
  // Check description
  if (!tool.description || tool.description.length < 10) {
    reasons.push('Description too short or missing');
  }
  
  for (const pattern of FAKE_TOOL_PATTERNS.suspiciousDescriptions) {
    if (pattern.test(tool.description)) {
      reasons.push(`Suspicious description pattern: ${pattern}`);
    }
  }
  
  // Check URL
  if (tool.url) {
    for (const pattern of FAKE_TOOL_PATTERNS.invalidUrls) {
      if (pattern.test(tool.url)) {
        reasons.push(`Invalid URL pattern: ${pattern}`);
      }
    }
  }
  
  // Check if it's just a wrapper for a well-known tool
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

// Generate slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Convert scraped tool to SiteOptz format
function convertToSiteOptzFormat(tool, category) {
  const slug = generateSlug(tool.name);
  const id = slug;
  
  // Parse pricing info
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
        price_per_month: 29, // Default price, update if specific price is found
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
  
  // If no pricing plans detected, default to freemium
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
    rating: 4.0, // Default rating
    benchmarks: {
      speed: 7,
      accuracy: 7,
      integration: 6,
      ease_of_use: 7,
      value: 7
    },
    website: tool.url || "",
    lastUpdated: new Date().toISOString(),
    source: "neil-patel-aitools"
  };
}

async function scrapeNeilPatelTools(pageUrl = 'https://aitools.neilpatel.com/ai_tools/') {
  console.log('🚀 Enhanced Neil Patel AI Tools Scraper Starting...');
  console.log(`📍 Scraping URL: ${pageUrl}\n`);
  
  const { existingNames, existingIds, existingSlugs, allTools } = loadExistingTools();
  
  try {
    // First, try to scrape with extraction
    console.log('🔍 Attempting structured extraction...');
    const scrapeResult = await firecrawl.scrapeUrl(pageUrl, {
      formats: ['extract', 'markdown'],
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
            categories: {
              type: 'array',
              items: { type: 'string' }
            },
            totalTools: { type: 'number' },
            pageInfo: {
              type: 'object',
              properties: {
                hasNextPage: { type: 'boolean' },
                nextPageUrl: { type: 'string' }
              }
            }
          }
        },
        systemPrompt: `Extract ALL AI tools from this Neil Patel AI tools directory page. For each tool, extract:
        - name: The exact tool name
        - description: Full description of what the tool does
        - category: The category (e.g., Writing, Social, Research, Design, etc.)
        - url: The direct link to the tool's page or website
        - pricing: Pricing model (Free, Paid, Freemium, etc.)
        - features: List of key features or capabilities
        - tags: Any tags or keywords associated with the tool
        
        Also extract:
        - All available categories
        - Total number of tools if mentioned
        - Pagination info (if there are more pages)
        
        Be thorough and extract EVERY tool visible on the page.`
      },
      waitFor: 5000, // Wait for dynamic content to load
      timeout: 30000
    });
    
    if (scrapeResult.success && scrapeResult.extract?.tools) {
      const scrapedTools = scrapeResult.extract.tools;
      console.log(`✅ Successfully extracted ${scrapedTools.length} tools\n`);
      
      // Process and filter tools
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
        if (existingNames.has(toolNameLower)) {
          duplicates.push(tool.name);
          continue;
        }
        
        // Convert to SiteOptz format
        const convertedTool = convertToSiteOptzFormat(tool, tool.category);
        
        // Double-check slug/id duplicates
        if (existingIds.has(convertedTool.id) || existingSlugs.has(convertedTool.slug)) {
          duplicates.push(tool.name);
          continue;
        }
        
        newTools.push(convertedTool);
      }
      
      // Save results
      const outputDir = 'data/neil-patel';
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      
      // Save new tools
      if (newTools.length > 0) {
        const newToolsFile = path.join(outputDir, `new-tools-${timestamp}.json`);
        fs.writeFileSync(newToolsFile, JSON.stringify(newTools, null, 2));
        console.log(`📁 Saved ${newTools.length} new tools to: ${newToolsFile}`);
      }
      
      // Save analysis report
      const report = {
        timestamp: new Date().toISOString(),
        sourceUrl: pageUrl,
        statistics: {
          totalScraped: scrapedTools.length,
          newTools: newTools.length,
          duplicates: duplicates.length,
          fakeTools: fakeTools.length,
          existingToolsCount: allTools.length
        },
        duplicateNames: duplicates,
        fakeToolsDetected: fakeTools,
        categories: scrapeResult.extract.categories || [],
        newToolsSample: newTools.slice(0, 5)
      };
      
      const reportFile = path.join(outputDir, `scraping-report-${timestamp}.json`);
      fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
      
      // Display summary
      console.log('\n📊 SCRAPING SUMMARY');
      console.log('═══════════════════════════════════');
      console.log(`📥 Total tools scraped: ${scrapedTools.length}`);
      console.log(`✅ New unique tools: ${newTools.length}`);
      console.log(`🔄 Duplicates found: ${duplicates.length}`);
      console.log(`🚫 Fake/Invalid tools: ${fakeTools.length}`);
      console.log(`📚 Existing tools in database: ${allTools.length}`);
      
      if (newTools.length > 0) {
        console.log('\n✨ Sample of new tools found:');
        newTools.slice(0, 5).forEach((tool, i) => {
          console.log(`   ${i + 1}. ${tool.name} (${tool.category}) - ${tool.pricing[0]?.plan}`);
        });
      }
      
      if (fakeTools.length > 0) {
        console.log('\n⚠️ Fake/Invalid tools detected:');
        fakeTools.slice(0, 3).forEach(fake => {
          console.log(`   - ${fake.name}: ${fake.reasons[0]}`);
        });
      }
      
      console.log(`\n📄 Full report saved to: ${reportFile}`);
      
      return {
        success: true,
        newTools,
        report
      };
      
    } else {
      console.error('❌ Failed to extract tools from the page');
      return {
        success: false,
        error: 'Extraction failed'
      };
    }
    
  } catch (error) {
    console.error('❌ Scraping error:', error.message);
    
    // Fallback: try to parse from previously saved data
    console.log('\n🔄 Attempting to use previously scraped data...');
    
    try {
      const existingData = fs.readFileSync('data/neil-patel/processed-tools.json', 'utf8');
      const existingTools = JSON.parse(existingData);
      
      console.log(`📂 Found ${existingTools.length} tools in previous scrape`);
      
      // Process existing tools
      const newTools = [];
      const duplicates = [];
      
      for (const tool of existingTools) {
        const toolNameLower = tool.name?.toLowerCase();
        if (!existingNames.has(toolNameLower)) {
          const convertedTool = convertToSiteOptzFormat(tool, tool.category);
          if (!existingIds.has(convertedTool.id) && !existingSlugs.has(convertedTool.slug)) {
            newTools.push(convertedTool);
          } else {
            duplicates.push(tool.name);
          }
        } else {
          duplicates.push(tool.name);
        }
      }
      
      console.log(`✅ Found ${newTools.length} new unique tools from previous data`);
      
      return {
        success: true,
        newTools,
        fromCache: true
      };
      
    } catch (fallbackError) {
      console.error('❌ Fallback also failed:', fallbackError.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Export for use in other scripts
export { scrapeNeilPatelTools, convertToSiteOptzFormat, isFakeTool };

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const url = process.argv[2] || 'https://aitools.neilpatel.com/ai_tools/';
  scrapeNeilPatelTools(url).then(result => {
    if (result.success) {
      console.log('\n✅ Scraping completed successfully!');
      console.log('📝 Next steps:');
      console.log('   1. Review the new tools in data/neil-patel/new-tools-*.json');
      console.log('   2. Run: node add-neil-patel-tools.js to add them to aiToolsData.json');
      console.log('   3. Validate with: npm run validate-images && npm run validate-schema');
    } else {
      console.log('\n❌ Scraping failed. Check the error messages above.');
    }
  });
}