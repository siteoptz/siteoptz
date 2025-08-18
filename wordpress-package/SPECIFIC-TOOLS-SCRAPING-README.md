# Specific AI Tools Scraping for SiteOptz.ai

This project scrapes specific AI tools using Firecrawl API and merges them with existing SiteOptz.ai data.

## 🎯 **Tools to be Scraped**

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

## 🚀 **Quick Start**

### **1. Set up Firecrawl API Key**

```bash
# Set your Firecrawl API key
export FIRECRAWL_API_KEY="your-firecrawl-api-key-here"
```

### **2. Run the Complete Process**

```bash
# Run the entire scraping and merging process
node run-specific-tools-scraping.js
```

### **3. Individual Scripts (Optional)**

```bash
# Scrape specific tools only
node scrape-specific-ai-tools.js

# Merge with existing data only
node merge-specific-tools.js
```

## 📁 **Output Files**

After running the scripts, you'll get:

- **`data/siteoptz/specific-tools.json`** - Newly scraped tools
- **`data/siteoptz/merged-tools.json`** - Combined tools (existing + new)
- **`data/siteoptz/tools.json`** - Updated main tools file
- **`data/siteoptz/merged-summary.json`** - Summary of merged data
- **`data/siteoptz/specific-[category].json`** - Category-specific files
- **`data/siteoptz/merged-[category].json`** - Merged category files

## 🔧 **Data Structure**

Each tool follows this structure:

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
  "seo": { /* SEO metadata */ },
  "structuredData": { /* JSON-LD schema */ },
  "metaTags": { /* Meta tags */ },
  "socialTags": { /* Social media tags */ },
  "canonicalUrl": "https://siteoptz.ai/tools/tool-id",
  "breadcrumbs": [ /* Navigation breadcrumbs */ ],
  "comparisonData": { /* Comparison metrics */ }
}
```

## 🛠️ **Features**

### **Automatic Data Extraction**
- Uses Firecrawl's LLM extraction to get accurate tool information
- Extracts pricing, features, pros/cons, ratings, and reviews
- Handles errors gracefully with fallback data

### **SEO Optimization**
- Generates complete SEO metadata for each tool
- Creates structured data (JSON-LD) for search engines
- Optimizes social media tags for sharing

### **Duplicate Prevention**
- Checks for existing tools before adding new ones
- Prevents duplicate entries in the database
- Maintains data integrity

### **Category Management**
- Organizes tools into logical categories
- Creates category-specific JSON files
- Maintains category consistency

## 📊 **Expected Results**

After running the script, you should see:

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

📋 Step 4: Category Breakdown
------------------------------
ai-assistants: 4 tools
video-generation: 4 tools
meeting-assistants: 2 tools
automation: 2 tools
research: 2 tools
writing: 4 tools
search-engines: 1 tools
graphic-design: 1 tools
app-builders: 1 tools
knowledge-management: 1 tools
email: 3 tools
scheduling: 2 tools
presentations: 2 tools
resume-builders: 2 tools
voice-generation: 1 tools
music-generation: 2 tools
marketing: 2 tools

🎉 Process completed successfully!
📁 All data exported to data/siteoptz/
🚀 Ready for deployment to SiteOptz.ai
```

## 🔍 **Troubleshooting**

### **Firecrawl API Issues**
```bash
# Check if API key is set
echo $FIRECRAWL_API_KEY

# Test API connection
curl -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"url":"https://example.com"}' \
     https://api.firecrawl.dev/scrape
```

### **Data Issues**
```bash
# Check if existing data exists
ls -la data/siteoptz/tools.json

# Validate JSON structure
node -e "console.log(JSON.parse(require('fs').readFileSync('data/siteoptz/tools.json')))"
```

## 🚀 **Deployment**

After successful scraping:

1. **Commit changes to Git:**
   ```bash
   git add .
   git commit -m "Add specific AI tools via Firecrawl scraping"
   git push
   ```

2. **Deploy to Vercel:**
   ```bash
   npx vercel --prod
   ```

## 📝 **Notes**

- The script includes a 2-second delay between requests to be respectful to websites
- Fallback data is provided if scraping fails for any tool
- All tools are automatically categorized and SEO-optimized
- The merged data maintains compatibility with existing SiteOptz.ai frontend

## 🤝 **Support**

If you encounter issues:

1. Check your Firecrawl API key is valid
2. Ensure you have existing tools data to merge with
3. Verify all required Node.js dependencies are installed
4. Check the console output for specific error messages
