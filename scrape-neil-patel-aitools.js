import FirecrawlApp from '@mendable/firecrawl-js';
import fs from 'fs';
import path from 'path';

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY || 'fc-6e7e6312953b47069452e67509d9f857'
});

async function scrapeNeilPatelAITools() {
  console.log('🚀 Starting to scrape Neil Patel AI Tools Directory...');
  
  try {
    const scrapeResult = await firecrawl.scrapeUrl('https://aitools.neilpatel.com/', {
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
                  }
                }
              }
            },
            categories: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        },
        systemPrompt: `Extract all AI tools from this Neil Patel AI tools directory page. For each tool, extract:
        - name: The tool's name
        - description: A brief description of what the tool does
        - category: The category it belongs to (e.g., Content Creation, SEO, Marketing, etc.)
        - url: The link to the tool if available
        - pricing: Any pricing information mentioned
        - features: Key features or capabilities
        
        Also extract all available categories of tools listed on the page.`
      }
    });

    if (scrapeResult.success) {
      console.log('✅ Successfully scraped Neil Patel AI Tools');
      
      // Save raw scraped data
      const outputDir = 'data/neil-patel';
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = path.join(outputDir, `neil-patel-aitools-${timestamp}.json`);
      
      fs.writeFileSync(filename, JSON.stringify(scrapeResult, null, 2));
      console.log(`📁 Saved raw data to: ${filename}`);
      
      // Extract and process tools
      if (scrapeResult.extract && scrapeResult.extract.tools) {
        const tools = scrapeResult.extract.tools;
        console.log(`📊 Found ${tools.length} tools`);
        
        // Save processed tools
        const processedFilename = path.join(outputDir, 'processed-tools.json');
        fs.writeFileSync(processedFilename, JSON.stringify(tools, null, 2));
        console.log(`📁 Saved processed tools to: ${processedFilename}`);
        
        // Display summary
        console.log('\n📈 Summary:');
        console.log(`   Total tools found: ${tools.length}`);
        
        if (scrapeResult.extract.categories) {
          console.log(`   Categories: ${scrapeResult.extract.categories.join(', ')}`);
        }
        
        // Show first 5 tools as sample
        console.log('\n📋 Sample tools (first 5):');
        tools.slice(0, 5).forEach((tool, index) => {
          console.log(`   ${index + 1}. ${tool.name} - ${tool.category || 'Uncategorized'}`);
        });
      }
    } else {
      console.error('❌ Failed to scrape the page');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Try alternative approach - scrape with markdown format
    console.log('\n🔄 Trying alternative approach with markdown format...');
    try {
      const markdownResult = await firecrawl.scrapeUrl('https://aitools.neilpatel.com/', {
        formats: ['markdown', 'html']
      });
      
      if (markdownResult.success) {
        console.log('✅ Successfully scraped in markdown format');
        
        const outputDir = 'data/neil-patel';
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        
        // Save markdown
        if (markdownResult.markdown) {
          const mdFilename = path.join(outputDir, `neil-patel-aitools-${timestamp}.md`);
          fs.writeFileSync(mdFilename, markdownResult.markdown);
          console.log(`📁 Saved markdown to: ${mdFilename}`);
        }
        
        // Save HTML for further processing
        if (markdownResult.html) {
          const htmlFilename = path.join(outputDir, `neil-patel-aitools-${timestamp}.html`);
          fs.writeFileSync(htmlFilename, markdownResult.html);
          console.log(`📁 Saved HTML to: ${htmlFilename}`);
        }
        
        console.log('\n✅ Data saved for manual extraction and processing');
      }
    } catch (altError) {
      console.error('❌ Alternative approach also failed:', altError.message);
    }
  }
}

// Run the scraper
scrapeNeilPatelAITools();
