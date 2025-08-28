const FirecrawlApp = require('@mendable/firecrawl-js').default;
const { convertToSiteOptzFormat, normalizeCategoryForSiteOptz } = require('./siteoptz-data-adapter');
require('dotenv').config();

// Initialize Firecrawl
const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

// Simple extraction schema for demo
const demoExtractionSchema = {
  type: 'object',
  properties: {
    tools: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'AI tool name' },
          description: { type: 'string', description: 'Tool description' },
          category: { type: 'string', description: 'Tool category' },
          website: { type: 'string', description: 'Tool website URL' },
          pricing: {
            type: 'object',
            properties: {
              hasFree: { type: 'boolean' },
              startingPrice: { type: 'number' }
            }
          }
        },
        required: ['name', 'description']
      }
    }
  },
  required: ['tools']
};

// Demo AI tool source
const demoSource = {
  url: 'https://www.futuretools.io/',
  name: 'futuretools-demo'
};

async function demonstrateNewTools() {
  console.log('🔍 Demonstrating new AI tools discovery...\n');
  
  try {
    console.log(`📊 Testing scrape from ${demoSource.url}...`);
    
    // Try simpler scraping approach
    const scrapeResult = await app.scrapeUrl(demoSource.url, {
      formats: [{
        type: "json",
        prompt: "Find the first 5 AI tools listed on this page. Extract their names, short descriptions, and categories. Ignore navigation and focus on the main tool listings.",
        schema: demoExtractionSchema
      }],
      onlyMainContent: true
    });
    
    console.log('📋 Raw API response status:', scrapeResult.success);
    
    let tools = [];
    
    // Check multiple possible response formats
    if (scrapeResult.success && scrapeResult.formats?.[0]?.tools) {
      tools = scrapeResult.formats[0].tools;
    } else if (scrapeResult.llm_extraction?.tools) {
      tools = scrapeResult.llm_extraction.tools;
    } else if (scrapeResult.extract?.tools) {
      tools = scrapeResult.extract.tools;
    }
    
    if (tools.length > 0) {
      console.log(`\n✅ Successfully found ${tools.length} AI tools!\n`);
      
      console.log('🔧 Converting to SiteOptz.ai format...\n');
      
      // Convert each tool to SiteOptz format
      const siteOptzTools = [];
      
      for (const [index, tool] of tools.entries()) {
        try {
          // Add minimal required fields
          const enrichedTool = {
            name: tool.name,
            description: tool.description || `${tool.name} is an AI-powered tool.`,
            category: tool.category || 'productivity',
            website: tool.website || '',
            pricing: tool.pricing || { hasFree: true, startingPrice: 0 },
            features: [`${tool.name} functionality`, 'AI-powered features', 'User-friendly interface'],
            source: 'demo'
          };
          
          const siteOptzTool = convertToSiteOptzFormat(enrichedTool);
          siteOptzTools.push(siteOptzTool);
          
          console.log(`📌 Tool ${index + 1}: ${tool.name}`);
          console.log(`   📝 Description: ${tool.description?.substring(0, 100)}...`);
          console.log(`   🏷️  Category: ${normalizeCategoryForSiteOptz(tool.category)} (${tool.category})`);
          console.log(`   🌐 Website: ${tool.website || 'N/A'}`);
          console.log(`   ✅ SiteOptz ID: ${siteOptzTool.id}`);
          console.log('');
          
        } catch (error) {
          console.log(`❌ Error converting ${tool.name}: ${error.message}`);
        }
      }
      
      console.log(`🎉 Successfully converted ${siteOptzTools.length} tools to SiteOptz.ai format!`);
      console.log('\n📊 Categories found:');
      const categories = [...new Set(siteOptzTools.map(t => t.overview.category))];
      categories.forEach(cat => console.log(`   - ${cat}`));
      
      console.log('\n💡 These tools would be added to your SiteOptz.ai database with:');
      console.log('   ✅ Automatic categorization');
      console.log('   ✅ SEO-optimized metadata');
      console.log('   ✅ Structured data schema');
      console.log('   ✅ Frontend compatibility');
      console.log('   ✅ Duplicate detection');
      
    } else {
      console.log('⚠️ No tools extracted. API response:');
      console.log(JSON.stringify(scrapeResult, null, 2).substring(0, 1000));
    }
    
  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    
    // Try basic scraping without extraction
    console.log('\n🔄 Trying basic content scraping...');
    try {
      const basicResult = await app.scrapeUrl(demoSource.url, {
        onlyMainContent: true
      });
      
      if (basicResult.success) {
        console.log('✅ Basic scraping successful!');
        console.log('📄 Content preview:', basicResult.markdown?.substring(0, 500) + '...');
        
        // Look for tool patterns in the content
        const content = basicResult.markdown || '';
        const toolMatches = content.match(/([A-Z][a-zA-Z0-9\s]{2,30})[\s\-]+([A-Z][a-zA-Z\s]{10,100})/g) || [];
        
        if (toolMatches.length > 0) {
          console.log(`\n🔍 Found ${toolMatches.length} potential AI tools in content:`);
          toolMatches.slice(0, 5).forEach((match, i) => {
            console.log(`   ${i + 1}. ${match.substring(0, 60)}...`);
          });
        }
      }
    } catch (basicError) {
      console.error('❌ Basic scraping also failed:', basicError.message);
    }
  }
}

// Run the demo
demonstrateNewTools().catch(console.error);