const { default: Firecrawl } = require('firecrawl');

async function scrapeAITools() {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  console.log('API Key length:', apiKey ? apiKey.length : 'undefined');
  console.log('API Key prefix:', apiKey ? apiKey.substring(0, 10) + '...' : 'undefined');
  
  if (!apiKey) {
    throw new Error('FIRECRAWL_API_KEY environment variable is required');
  }
  
  const firecrawl = new Firecrawl(apiKey);
  
  const tools = [];
  
  // Scrape Futurepedia
  try {
    console.log('Scraping Futurepedia...');
    const futurepediaData = await firecrawl.scrape({
      url: 'https://futurepedia.io/',
      options: {
        includeTags: ['.tool-card'],
        extractMetadata: true
      }
    });
    
    // Process Futurepedia data
    const processedTools = processFuturepediaData(futurepediaData);
    tools.push(...processedTools);
    
  } catch (error) {
    console.error('Error scraping Futurepedia:', error);
  }
  
  // Scrape There's An AI For That
  try {
    console.log('Scraping There\'s An AI For That...');
    const taaftData = await firecrawl.scrape({
      url: 'https://theresanaiforthat.com/',
      options: {
        includeTags: ['.ai-tool'],
        extractMetadata: true
      }
    });
    
    // Process TAAFT data
    const processedTools = processTAAFTData(taaftData);
    tools.push(...processedTools);
    
  } catch (error) {
    console.error('Error scraping TAAFT:', error);
  }
  
  return tools;
}

// Data processing functions
function processFuturepediaData(data) {
  return data.map(item => ({
    name: extractText(item, '.tool-name'),
    description: extractText(item, '.tool-description'),
    category: extractText(item, '.tool-category'),
    pricing: extractPricing(item, '.tool-pricing'),
    rating: extractRating(item, '.tool-rating'),
    website: extractLink(item, '.tool-website'),
    source: 'futurepedia.io'
  }));
}

function processTAAFTData(data) {
  return data.map(item => ({
    name: extractText(item, '.tool-title'),
    description: extractText(item, '.tool-desc'),
    category: extractText(item, '.tool-cat'),
    pricing: extractPricing(item, '.tool-price'),
    rating: extractRating(item, '.tool-rating'),
    website: extractLink(item, '.tool-link'),
    source: 'theresanaiforthat.com'
  }));
}

// Helper functions
function extractText(element, selector) {
  const el = element.querySelector(selector);
  return el ? el.textContent.trim() : '';
}

function extractPricing(element, selector) {
  const text = extractText(element, selector);
  const priceMatch = text.match(/\$(\d+(?:\.\d{2})?)/);
  return priceMatch ? parseFloat(priceMatch[1]) : null;
}

function extractRating(element, selector) {
  const text = extractText(element, selector);
  const ratingMatch = text.match(/(\d+(?:\.\d)?)\/5/);
  return ratingMatch ? parseFloat(ratingMatch[1]) : null;
}

function extractLink(element, selector) {
  const el = element.querySelector(selector);
  return el ? el.href : '';
}

module.exports = { scrapeAITools };
