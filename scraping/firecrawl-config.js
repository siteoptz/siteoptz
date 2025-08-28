require('dotenv').config();

const firecrawlConfig = {
  apiKey: process.env.FIRECRAWL_API_KEY,
  options: {
    // Scraping options
    includeTags: ["div", "article", "section", "main"],
    excludeTags: ["script", "style", "nav", "footer", "header"],
    
    // Data extraction
    extractMetadata: true,
    extractLinks: true,
    extractImages: true,
    onlyMainContent: true,
    
    // Performance
    maxRequests: parseInt(process.env.MAX_REQUESTS) || 100,
    delay: parseInt(process.env.DELAY_MS) || 1000,
    concurrent: parseInt(process.env.CONCURRENT_REQUESTS) || 5,
    
    // Output
    outputFormat: "json",
    saveScreenshots: false,
    saveHtml: false,
    removeDuplicates: true
  }
};

// Site-specific selectors
const siteSelectors = {
  "futurepedia.io": {
    toolCards: ".tool-card, .ai-tool-card",
    toolName: ".tool-name, .tool-title, h3",
    toolDescription: ".tool-description, .tool-summary, .description",
    toolCategory: ".tool-category, .category-tag, .tag",
    toolPricing: ".tool-pricing, .price, .pricing-info",
    toolRating: ".tool-rating, .rating, .stars",
    toolWebsite: ".tool-link, .website-link, a[href*='visit']",
    toolFeatures: ".features, .feature-list",
    pagination: ".pagination, .load-more"
  },
  "theresanaiforthat.com": {
    toolCards: ".ai-tool, .tool-item, .listing",
    toolName: ".tool-title, .name, h2",
    toolDescription: ".tool-desc, .description, .summary",
    toolCategory: ".tool-cat, .category, .tag",
    toolPricing: ".tool-price, .pricing",
    toolRating: ".tool-rating, .rating",
    toolWebsite: ".tool-link, .external-link",
    toolFeatures: ".features, .capabilities",
    pagination: ".pagination, .next-page"
  },
  "aitoolhunt.com": {
    toolCards: ".tool-card, .product-item",
    toolName: ".product-name, h3",
    toolDescription: ".product-description",
    toolCategory: ".product-category",
    toolPricing: ".pricing-info",
    toolRating: ".rating-stars",
    toolWebsite: ".product-link",
    toolFeatures: ".feature-tags",
    pagination: ".pagination-container"
  },
  "producthunt.com": {
    toolCards: "[data-test='product-item'], .post-item",
    toolName: "[data-test='product-name'], .product-name",
    toolDescription: "[data-test='product-tagline'], .tagline",
    toolCategory: ".topic-tag, .category",
    toolPricing: ".pricing-tag",
    toolRating: "[data-test='vote-count'], .vote-count",
    toolWebsite: "[data-test='product-link']",
    toolFeatures: ".product-tags",
    pagination: ".load-more-button"
  }
};

// Category mappings
const categoryMappings = {
  // Text-related
  "text": "text-generation",
  "writing": "text-generation",
  "content": "text-generation",
  "copywriting": "text-generation",
  "text generation": "text-generation",
  "content generation": "text-generation",
  
  // Image-related
  "image": "image-generation",
  "art": "image-generation",
  "design": "image-generation",
  "graphics": "image-generation",
  "image generation": "image-generation",
  "ai art": "image-generation",
  
  // Video-related
  "video": "video-generation",
  "video editing": "video-generation",
  "video generation": "video-generation",
  "animation": "video-generation",
  
  // Audio-related
  "audio": "audio-generation",
  "voice": "audio-generation",
  "music": "audio-generation",
  "sound": "audio-generation",
  "speech": "audio-generation",
  "text-to-speech": "audio-generation",
  
  // Code-related
  "code": "code-generation",
  "coding": "code-generation",
  "programming": "code-generation",
  "development": "code-generation",
  "developer tools": "code-generation",
  
  // Data-related
  "data": "data-analysis",
  "analytics": "data-analysis",
  "data analysis": "data-analysis",
  "business intelligence": "data-analysis",
  
  // Chat-related
  "chatbot": "chatbots",
  "chat": "chatbots",
  "conversational ai": "chatbots",
  "assistant": "chatbots",
  
  // Other categories
  "automation": "automation",
  "productivity": "productivity",
  "marketing": "marketing",
  "seo": "seo-optimization",
  "social media": "social-media",
  "email": "email-marketing",
  "research": "research-education",
  "education": "research-education",
  "translation": "translation",
  "summarization": "summarization"
};

// Pricing patterns
const pricingPatterns = [
  /\$(\d+(?:\.\d{2})?)\s*(?:\/|per)?\s*(?:mo|month)/i,
  /(\d+(?:\.\d{2})?)\s*(?:USD|usd|\$)/i,
  /free/i,
  /freemium/i,
  /contact\s*(?:for|us)?\s*pricing/i,
  /custom\s*pricing/i,
  /enterprise/i
];

// Rating patterns
const ratingPatterns = [
  /(\d+(?:\.\d+)?)\s*(?:\/|out of)\s*5/i,
  /(\d+(?:\.\d+)?)\s*stars?/i,
  /rating:\s*(\d+(?:\.\d+)?)/i
];

module.exports = {
  firecrawlConfig,
  siteSelectors,
  categoryMappings,
  pricingPatterns,
  ratingPatterns
};