# Claude AI Implementation Instructions: Specific AI Tools Scraping for SiteOptz.ai

## 🎯 **Project Overview**

You are tasked with implementing a comprehensive AI tools scraping system for SiteOptz.ai that will scrape 32 specific AI tools using Firecrawl API and integrate them into the existing SiteOptz.ai platform.

## 📋 **Required Tools to Scrape**

### **AI Assistants**
- **Grok** (https://grok.x.ai)
- **Gemini** (https://gemini.google.com)

### **Video Generation**
- **Google Veo** (https://veo.google.com)
- **OpusClip** (https://opus.pro)

### **Meeting Assistants**
- **Fathom** (https://fathom.ai)
- **Nyota** (https://nyota.ai)

### **Automation**
- **n8n** (https://n8n.io)
- **Manus** (https://manus.ai)

### **Research**
- **Deep Research** (https://deepresearch.ai)
- **NotebookLM** (https://notebooklm.google.com)

### **Writing**
- **Rytr** (https://rytr.me)
- **Sudowrite** (https://sudowrite.com)

### **Search Engines**
- **Google AI Mode** (https://google.com)

### **Graphic Design**
- **Looka** (https://looka.com)

### **App Builders & Coding**
- **Lovable** (https://lovable.ai)

### **Knowledge Management**
- **Guru** (https://getguru.com)

### **Email**
- **Hubspot Email Writer** (https://hubspot.com)
- **Fyxer** (https://fyxer.ai)
- **Shortwave** (https://shortwave.com)

### **Scheduling**
- **Reclaim** (https://reclaim.ai)
- **Clockwise** (https://clockwise.com)

### **Presentations**
- **Gamma** (https://gamma.app)
- **Copilot for PowerPoint** (https://microsoft.com)

### **Resume Builders**
- **Teal** (https://tealhq.com)
- **Kickresume** (https://kickresume.com)

### **Voice Generation**
- **Murf** (https://murf.ai)

### **Music Generation**
- **Suno** (https://suno.ai)
- **Udio** (https://udio.com)

### **Marketing**
- **AdCreative** (https://adcreative.ai)
- **AirOps** (https://airops.com)

## 🏗️ **Implementation Requirements**

### **1. Data Structure Requirements**

Each tool must follow this exact structure:

```json
{
  "id": "source-tool-name",
  "name": "Tool Name",
  "description": "AI-powered tool description",
  "category": "category-name",
  "pricing": [
    {
      "price": 0,
      "billing_period": "month",
      "plan": "Free"
    },
    {
      "price": 20,
      "billing_period": "month",
      "plan": "Pro"
    }
  ],
  "rating": 4.5,
  "reviewCount": 1000,
  "website": "https://tool-website.com",
  "source": "tool-source",
  "features": ["feature1", "feature2"],
  "pros": ["pro1", "pro2"],
  "cons": ["con1", "con2"],
  "lastUpdated": "2025-01-16T20:00:00.000Z",
  "seo": {
    "title": "Tool Name - Best category AI Tool | SiteOptz.ai",
    "description": "Tool description with SEO optimization",
    "keywords": "tool, category, AI, artificial intelligence",
    "slug": "tool-id",
    "h1": "Tool Name",
    "h2": "Tool Name - category AI Tool",
    "h3": "Features, Pricing, and Reviews of Tool Name",
    "canonicalUrl": "https://siteoptz.ai/tools/tool-id",
    "robots": "index, follow",
    "language": "en-US"
  },
  "structuredData": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Tool Name",
    "description": "Tool description",
    "url": "https://tool-website.com",
    "applicationCategory": "category AI Tool",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": 0,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.5,
      "ratingCount": 1000,
      "bestRating": 5,
      "worstRating": 1
    },
    "author": {
      "@type": "Organization",
      "name": "tool-source",
      "url": "https://tool-website.com"
    },
    "datePublished": "2025-01-16T20:00:00.000Z",
    "dateModified": "2025-01-16T20:00:00.000Z"
  },
  "metaTags": {
    "title": "Tool Name - Best category AI Tool | SiteOptz.ai",
    "description": "SEO optimized description",
    "keywords": "tool, category, AI tool, artificial intelligence",
    "author": "SiteOptz.ai",
    "viewport": "width=device-width, initial-scale=1",
    "charset": "UTF-8",
    "language": "en-US",
    "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "googlebot": "index, follow",
    "bingbot": "index, follow"
  },
  "socialTags": {
    "og:title": "Tool Name - Best category AI Tool",
    "og:description": "Tool description with rating",
    "og:type": "website",
    "og:url": "https://siteoptz.ai/tools/tool-id",
    "og:image": "https://siteoptz.ai/images/og-default.jpg",
    "og:site_name": "SiteOptz.ai",
    "og:locale": "en_US",
    "twitter:card": "summary_large_image",
    "twitter:title": "Tool Name - Best category AI Tool",
    "twitter:description": "Tool description with rating",
    "twitter:image": "https://siteoptz.ai/images/twitter-default.jpg",
    "twitter:site": "@siteoptz",
    "twitter:creator": "@siteoptz"
  },
  "canonicalUrl": "https://siteoptz.ai/tools/tool-id",
  "breadcrumbs": [
    { "name": "Home", "url": "https://siteoptz.ai" },
    { "name": "Tools", "url": "https://siteoptz.ai/tools" },
    { "name": "category", "url": "https://siteoptz.ai/tools/category/category" },
    { "name": "Tool Name", "url": "https://siteoptz.ai/tools/tool-id" }
  ],
  "comparisonData": {
    "category": "category",
    "rating": 4.5,
    "price": 0,
    "features": 5,
    "pros": 3,
    "cons": 2,
    "reviewCount": 1000,
    "lastUpdated": "2025-01-16T20:00:00.000Z"
  }
}
```

### **2. Firecrawl Integration Requirements**

- Use Firecrawl API for web scraping
- Implement LLM extraction for accurate data
- Handle API errors gracefully with fallback data
- Include 2-second delays between requests
- Extract: description, pricing, features, pros/cons, ratings, reviews

### **3. File Structure Requirements**

Create these files in the project:

```
project-root/
├── scrape-specific-ai-tools.js
├── merge-specific-tools.js
├── run-specific-tools-scraping.js
├── SPECIFIC-TOOLS-SCRAPING-README.md
└── data/
    └── siteoptz/
        ├── specific-tools.json
        ├── merged-tools.json
        ├── tools.json (updated)
        ├── merged-summary.json
        ├── specific-[category].json
        └── merged-[category].json
```

### **4. Script Requirements**

#### **scrape-specific-ai-tools.js**
- Define SPECIFIC_AI_TOOLS object with all 32 tools
- Implement Firecrawl API integration
- Extract tool data using LLM extraction
- Generate SEO, structured data, meta tags, social tags
- Export to JSON files
- Handle errors with fallback data

#### **merge-specific-tools.js**
- Read existing tools.json
- Read specific-tools.json
- Merge data while preventing duplicates
- Update categories
- Generate summary statistics
- Export merged data

#### **run-specific-tools-scraping.js**
- Orchestrate the entire process
- Run scraping first
- Run merging second
- Provide detailed progress output
- Handle errors gracefully

### **5. Data Processing Requirements**

- **Pricing**: Must be array format (not object)
- **Categories**: Use kebab-case (e.g., "ai-assistants", "video-generation")
- **IDs**: Format as "source-tool-name" (lowercase, hyphens)
- **SEO**: Complete metadata for search optimization
- **Structured Data**: JSON-LD schema for search engines
- **Social Tags**: Open Graph and Twitter Card tags

### **6. Error Handling Requirements**

- Graceful handling of Firecrawl API failures
- Fallback data for failed scrapes
- Validation of data structure
- Logging of all errors and successes
- Continue processing even if individual tools fail

### **7. Performance Requirements**

- 2-second delays between API requests
- Efficient data processing
- Memory-conscious operations
- Progress indicators for long operations

## 🚀 **Implementation Steps**

### **Step 1: Create the Scraper**
1. Create `scrape-specific-ai-tools.js`
2. Define SPECIFIC_AI_TOOLS object with all 32 tools
3. Implement Firecrawl API integration
4. Add data extraction and processing
5. Add SEO and structured data generation
6. Add error handling and fallback data

### **Step 2: Create the Merger**
1. Create `merge-specific-tools.js`
2. Implement data reading and validation
3. Add duplicate prevention logic
4. Add category management
5. Add summary generation
6. Add file export functionality

### **Step 3: Create the Orchestrator**
1. Create `run-specific-tools-scraping.js`
2. Implement process orchestration
3. Add progress reporting
4. Add error handling
5. Add summary output

### **Step 4: Create Documentation**
1. Create `SPECIFIC-TOOLS-SCRAPING-README.md`
2. Document all features and usage
3. Add troubleshooting guide
4. Add deployment instructions

## 🔧 **Technical Specifications**

### **Environment Variables**
```bash
FIRECRAWL_API_KEY=your-firecrawl-api-key-here
```

### **Dependencies**
```json
{
  "dependencies": {
    "node-fetch": "^3.3.0"
  }
}
```

### **Node.js Version**
- Minimum: Node.js 18.0.0
- Recommended: Node.js 20.0.0+

### **API Endpoints**
- Firecrawl API: https://api.firecrawl.dev/scrape
- Method: POST
- Headers: Authorization, Content-Type
- Body: URL, pageOptions, extractorOptions

## 📊 **Expected Output**

After successful implementation:

```
🚀 Starting specific AI tools scraping and merging process...

📋 Step 1: Scraping specific AI tools via Firecrawl...
✅ Successfully scraped 32 tools

📋 Step 2: Merging with existing tools data...
✅ Successfully merged tools data

📋 Step 3: Process Summary
==================================================
🎯 Total tools in database: 56
📂 Total categories: 20
🆕 New tools added: 32
🔄 Duplicates skipped: 0
📊 Average rating: 4.4
💰 Free tools: 25
💳 Paid tools: 31
==================================================

🎉 Process completed successfully!
📁 All data exported to data/siteoptz/
🚀 Ready for deployment to SiteOptz.ai
```

## 🎯 **Success Criteria**

1. **All 32 tools** successfully scraped and processed
2. **Data structure** matches existing SiteOptz.ai format
3. **SEO optimization** complete for all tools
4. **Structured data** generated for search engines
5. **No duplicates** in final dataset
6. **Error handling** robust and graceful
7. **Documentation** complete and clear
8. **Ready for deployment** to Vercel

## 🚨 **Important Notes**

- **Pricing must be array format** (not object) for frontend compatibility
- **All tools must have complete data** (description, features, pros/cons)
- **SEO metadata must be comprehensive** for search optimization
- **Error handling must be robust** to prevent process failures
- **Data validation** must ensure structure consistency
- **Performance** must be optimized for production use

## 📝 **Implementation Checklist**

- [ ] Create scrape-specific-ai-tools.js with all 32 tools
- [ ] Implement Firecrawl API integration
- [ ] Add LLM extraction for accurate data
- [ ] Generate SEO metadata for all tools
- [ ] Create structured data (JSON-LD) for all tools
- [ ] Implement error handling and fallback data
- [ ] Create merge-specific-tools.js
- [ ] Add duplicate prevention logic
- [ ] Create run-specific-tools-scraping.js orchestrator
- [ ] Add comprehensive documentation
- [ ] Test with sample data
- [ ] Validate data structure compatibility
- [ ] Ensure production readiness

## 🎉 **Final Deliverables**

1. **scrape-specific-ai-tools.js** - Complete scraper for 32 tools
2. **merge-specific-tools.js** - Data merger with duplicate prevention
3. **run-specific-tools-scraping.js** - Process orchestrator
4. **SPECIFIC-TOOLS-SCRAPING-README.md** - Complete documentation
5. **Sample data files** - Demonstrating correct structure
6. **Error handling** - Robust and production-ready
7. **SEO optimization** - Complete for all tools
8. **Deployment ready** - Compatible with SiteOptz.ai frontend

Follow these instructions precisely to create a production-ready AI tools scraping system for SiteOptz.ai.
