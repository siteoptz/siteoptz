const fs = require('fs');
const path = require('path');

/**
 * Extract the 28 newly scraped tools and add them to aiToolsData.json
 */

function extractScrapedTools() {
  const scrapedDataDir = path.join(__dirname, 'data/siteoptz');
  const mainDataPath = path.join(__dirname, 'public/data/aiToolsData.json');
  
  // Load existing tools
  let existingTools = [];
  if (fs.existsSync(mainDataPath)) {
    existingTools = JSON.parse(fs.readFileSync(mainDataPath, 'utf8'));
  }
  
  const existingIds = new Set(existingTools.map(t => t.id));
  
  // Categories to extract from
  const categoryFiles = [
    'specific-automation.json',
    'specific-marketing.json', 
    'specific-email.json',
    'specific-ai-assistants.json',
    'specific-video-generation.json',
    'specific-meeting-assistants.json',
    'specific-research.json',
    'specific-writing.json',
    'specific-graphic-design.json',
    'specific-music-generation.json',
    'specific-presentations.json',
    'specific-scheduling.json'
  ];
  
  const newTools = [];
  
  categoryFiles.forEach(filename => {
    const filePath = path.join(scrapedDataDir, filename);
    if (!fs.existsSync(filePath)) return;
    
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Filter out invalid tools and convert valid ones
      data.forEach(tool => {
        // Skip tools with errors or invalid data
        if (tool.tool_name === '504 Gateway Time-out' || 
            tool.name === '504 Gateway Time-out' ||
            !tool.tool_name || 
            !tool.description ||
            tool.description.includes('504 Gateway Timeout') ||
            existingIds.has(tool.id)) {
          return;
        }
        
        // Convert scraped format to aiToolsData format
        const convertedTool = {
          id: tool.id || tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name: tool.tool_name || tool.name,
          slug: tool.slug || tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          logo: tool.logo_url || tool.logo || `/images/tools/${tool.id || tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-logo.svg`,
          
          meta: {
            title: `${tool.tool_name} Review, Pricing, Features & Alternatives [2025]`,
            description: `Comprehensive review of ${tool.tool_name}. ${tool.description.slice(0, 150)}... Compare features, pricing, and alternatives.`,
            keywords: `${tool.tool_name.toLowerCase()}, ${tool.tool_name.toLowerCase()} review, ${tool.tool_name.toLowerCase()} pricing, ${tool.tool_name.toLowerCase()} alternatives`,
            canonical: `https://siteoptz.ai/tools/${tool.slug || tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
          },
          
          overview: {
            developer: tool.vendor || tool.tool_name,
            release_year: 2024,
            category: mapCategory(tool.category),
            description: tool.description,
            website: tool.official_url || tool.affiliate_link || tool.website || '#',
            use_cases: tool.useCases || tool.use_cases || [],
            integrations: Array.isArray(tool.features?.integrations) ? tool.features.integrations : 
                         Array.isArray(tool.features?.advanced) ? tool.features.advanced.slice(0, 10) : []
          },
          
          features: Array.isArray(tool.features?.core) ? tool.features.core :
                   Array.isArray(tool.features) ? tool.features : [],
          
          pros: Array.isArray(tool.pros) ? tool.pros : [
            "Feature-rich platform",
            "Good documentation", 
            "Active community"
          ],
          
          cons: Array.isArray(tool.cons) ? tool.cons : [
            "Learning curve for beginners",
            "Setup complexity"
          ],
          
          pricing: Array.isArray(tool.pricing) ? tool.pricing.map(p => ({
            plan: p.plan || p.name || 'Standard',
            price_per_month: p.price === 'Custom' ? 'Custom' : 
                           typeof p.price === 'string' && p.price.includes('$') ? 
                           parseInt(p.price.replace(/[$,]/g, '')) || 0 :
                           typeof p.price === 'number' ? p.price : 0,
            features: Array.isArray(p.features) ? p.features : []
          })) : [{
            plan: 'Standard',
            price_per_month: 29,
            features: ['Basic features']
          }],
          
          rating: tool.rating || 4.0,
          review_count: tool.reviewCount || 100,
          
          benchmarks: {
            speed: 8,
            accuracy: 8,
            integration: 8,
            ease_of_use: 7,
            value: 8
          },
          
          search_volume: tool.search_volume || 1000,
          cpc: tool.cpc || 2.50,
          affiliate_link: tool.affiliate_link || tool.official_url || '#',
          free_trial: tool.free_trial || (tool.pricing && tool.pricing[0]?.price === 0)
        };
        
        newTools.push(convertedTool);
        console.log(`✅ Converted: ${convertedTool.name}`);
      });
      
    } catch (error) {
      console.error(`Error processing ${filename}:`, error.message);
    }
  });
  
  console.log(`\n📊 Extracted ${newTools.length} new tools from scraped data`);
  
  // Add to existing tools
  const allTools = [...existingTools, ...newTools];
  
  // Remove duplicates and sort
  const uniqueTools = allTools.filter((tool, index, arr) => 
    arr.findIndex(t => t.id === tool.id) === index
  );
  
  uniqueTools.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  
  // Save back to main file
  fs.writeFileSync(mainDataPath, JSON.stringify(uniqueTools, null, 2));
  
  console.log(`\n✅ Updated aiToolsData.json with ${newTools.length} new tools`);
  console.log(`📁 Total tools: ${uniqueTools.length}`);
  console.log(`📄 File: ${mainDataPath}`);
  
  return {
    newTools: newTools.length,
    totalTools: uniqueTools.length,
    addedTools: newTools.map(t => ({ id: t.id, name: t.name, category: t.overview.category }))
  };
}

// Category mapping
function mapCategory(category) {
  const categoryMap = {
    'Workflow Automation': 'Automation',
    'Marketing Automation': 'Marketing', 
    'Email Marketing': 'Email Marketing',
    'AI Assistants': 'AI Assistants',
    'Video Generation': 'Video Generation',
    'Meeting Tools': 'Productivity',
    'Research Tools': 'Research',
    'Writing Tools': 'Content Creation',
    'Graphic Design': 'Visual Content',
    'Music Generation': 'Audio Generation',
    'Presentation Tools': 'Productivity',
    'Scheduling Tools': 'Productivity'
  };
  
  return categoryMap[category] || category || 'Other';
}

// Run if called directly
if (require.main === module) {
  try {
    const result = extractScrapedTools();
    console.log('\n📋 Summary:');
    result.addedTools.forEach(tool => {
      console.log(`  • ${tool.name} (${tool.category})`);
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

module.exports = { extractScrapedTools };