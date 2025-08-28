# 🤖 SiteOptz AI Tools Scraper

Automated AI tools scraping and data management system using Firecrawl for SiteOptz.ai.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd scraping
npm install
```

### 2. Configure API Key
The `.env` file is already configured with your Firecrawl API key.

### 3. Run the Complete Process
```bash
npm run scrape-all
```

Or run individual scripts:
```bash
# Scrape new tools only
node scrape-new-ai-tools.js

# Merge with existing data only
node merge-tools-data.js

# Run complete pipeline
node run-ai-tools-scraping.js
```

## 📁 Output Structure

```
scraping/
├── data/
│   ├── scraped/          # Raw scraped data
│   │   └── new-ai-tools.json
│   ├── merged/           # Merged and processed data
│   │   ├── all-tools.json
│   │   └── categories/   # Category-specific files
│   ├── analytics/        # Analytics and insights
│   │   └── latest-analytics.json
│   └── reports/          # Scraping reports
│       └── report-*.json
```

## 🔧 Features

### Automatic Features
- **Duplicate Detection**: Prevents duplicate entries by checking ID, name, and website
- **Category Management**: Automatically normalizes and organizes tools into categories
- **SEO Metadata**: Generates complete SEO tags for each tool
- **Data Merging**: Intelligently merges new data with existing tools
- **Analytics**: Generates comprehensive analytics and insights

### Supported Categories
- `text-generation` - AI writing and content tools
- `image-generation` - AI art and design tools
- `video-generation` - AI video creation tools
- `audio-generation` - Audio and sound tools
- `voice-ai` - Voice synthesis and TTS tools
- `code-generation` - AI coding assistants
- `data-analysis` - Data analytics tools
- `chatbots` - Conversational AI
- `ai-assistants` - General AI assistants
- `automation` - Workflow automation
- `productivity` - Productivity tools
- `marketing` - Marketing tools
- `seo-optimization` - SEO tools
- `social-media` - Social media tools
- And many more...

## 📊 Data Schema

Each tool follows this structure:
```json
{
  "id": "tool-slug",
  "name": "Tool Name",
  "slug": "tool-slug",
  "description": "Tool description",
  "category": "category-name",
  "pricing": {
    "free": false,
    "freemium": true,
    "startingPrice": 10,
    "plans": []
  },
  "features": ["feature1", "feature2"],
  "tags": ["tag1", "tag2"],
  "rating": 4.5,
  "reviewCount": 1000,
  "website": "https://tool-website.com",
  "source": "scraping-source",
  "lastScraped": "2025-01-16T00:00:00Z",
  "meta": { /* SEO metadata */ },
  "structuredData": { /* JSON-LD */ }
}
```

## 🛠️ Configuration

Edit `.env` file to adjust settings:
```env
FIRECRAWL_API_KEY=your-api-key
MAX_REQUESTS=100          # Max requests per source
DELAY_MS=2000            # Delay between requests
CONCURRENT_REQUESTS=3     # Concurrent scraping jobs
```

## 📈 Analytics

After scraping, view analytics at:
- `data/analytics/latest-analytics.json` - Latest analytics
- `data/reports/report-*.json` - Detailed reports

Analytics include:
- Total tools and categories
- Pricing distribution
- Top-rated tools
- Feature trends
- Category breakdown
- Growth metrics

## 🔄 Scheduled Updates

To run daily updates, add to crontab:
```bash
# Run daily at 2 AM
0 2 * * * cd /path/to/siteoptz/scraping && node run-ai-tools-scraping.js
```

## 🚨 Troubleshooting

### Common Issues

1. **API Key Error**
   - Check `.env` file has correct API key
   - Ensure key has sufficient credits

2. **No Tools Scraped**
   - Check internet connection
   - Verify source websites are accessible
   - Check Firecrawl service status

3. **Duplicate Tools**
   - System automatically handles duplicates
   - Check `data/reports/` for duplicate statistics

## 📝 Manual Tool Addition

To manually add tools, create a JSON file:
```json
{
  "tools": [
    {
      "name": "New Tool",
      "description": "Tool description",
      "category": "text-generation",
      "website": "https://newtool.com"
    }
  ]
}
```

Then merge it:
```bash
node merge-tools-data.js path/to/manual-tools.json
```

## 🔗 Integration

The scraped data automatically updates:
- `/public/data/aiToolsData.json` - Main website data
- Category-specific files for filtering
- SEO metadata for all pages

## 📞 Support

For issues or questions:
- Check logs in `data/reports/`
- Review error messages in console
- Contact: support@siteoptz.ai

## 📜 License

MIT License - SiteOptz 2025