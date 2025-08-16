# 🚀 SiteOptz.ai AI Tools Orchestrator

A comprehensive system for scraping, processing, and automating AI tools data for SiteOptz.ai. This system uses Firecrawl to scrape AI tools from aitoolsdirectory.com and converts them into a fully optimized format for your website.

## 📋 Features

### 🔍 **Advanced Scraping**
- **Firecrawl Integration**: Uses Firecrawl API for reliable web scraping
- **Multi-Source Support**: Scrapes from aitoolsdirectory.com and other AI tool directories
- **Intelligent Data Extraction**: Extracts tools, pricing, ratings, features, and reviews
- **Duplicate Detection**: Automatically removes duplicate tools
- **Rate Limiting**: Respectful scraping with built-in delays

### 🧹 **Data Processing & Cleaning**
- **20 Main Categories**: Normalizes tools into 20 standardized AI categories
- **Top 50 Tools Per Category**: Filters to the best tools in each category
- **Data Validation**: Ensures data integrity and completeness
- **Feature Extraction**: Identifies and categorizes tool features
- **Pricing Normalization**: Standardizes pricing information

### 🎯 **SiteOptz.ai Format Conversion**
- **SEO Optimization**: Generates optimized meta tags, titles, and descriptions
- **Structured Data**: Creates JSON-LD schema markup for search engines
- **Social Media Tags**: Open Graph and Twitter Card optimization
- **Canonical URLs**: Proper URL structure for SEO
- **Breadcrumbs**: Navigation structure for better UX

### 📊 **Analytics & Insights**
- **Comprehensive Analytics**: Category distribution, pricing analysis, rating trends
- **Performance Metrics**: Update success rates, processing times, error tracking
- **Growth Analysis**: Tracks tool additions and market trends
- **Feature Analysis**: Identifies popular features and capabilities
- **Market Intelligence**: Provides strategic recommendations

### 🤖 **Automated Updates**
- **Daily Updates**: Light updates to check for new tools
- **Weekly Full Scrape**: Comprehensive data refresh
- **Monthly Analytics**: Detailed monthly reports and insights
- **Health Monitoring**: Continuous system health checks
- **Error Recovery**: Automatic error handling and recovery

## 🛠️ Installation

### Prerequisites
- Node.js 18.0.0 or higher
- Firecrawl API key

### Setup
```bash
# Clone or navigate to the project directory
cd wordpress-package

# Install dependencies
npm install

# Set your Firecrawl API key
export FIRECRAWL_API_KEY="your-firecrawl-api-key-here"

# Or add to your .env file
echo "FIRECRAWL_API_KEY=your-firecrawl-api-key-here" >> .env
```

## 🚀 Usage

### Quick Start
```bash
# Run complete pipeline (scrape + convert + export)
npm run pipeline

# Or use the orchestrator directly
node main-orchestrator.js pipeline
```

### Available Commands

#### **Core Operations**
```bash
# Complete pipeline (recommended)
npm run pipeline

# Scraping only
npm run scrape

# Conversion only (requires existing scraped data)
npm run convert

# Start automated scheduler
npm run scheduler

# Stop automated scheduler
npm run stop
```

#### **Analytics & Monitoring**
```bash
# Generate analytics report
npm run analytics

# Check system status
npm run status

# Validate data integrity
npm run validate

# Show help
npm run help
```

#### **Direct Script Execution**
```bash
# Firecrawl scraping only
npm run firecrawl-scrape

# SiteOptz conversion only
npm run siteoptz-convert

# Update scheduler only
npm run update-schedule
```

## 📁 Output Structure

### **Raw Data** (`data/`)
```
data/
├── tools.json              # All scraped tools
├── summary.json            # Summary statistics
├── insights.json           # Analytics insights
├── [category].json         # Tools by category
└── update-history.json     # Update tracking
```

### **SiteOptz.ai Format** (`data/siteoptz/`)
```
data/siteoptz/
├── tools.json              # Converted tools with SEO data
├── summary.json            # SiteOptz summary
├── [category].json         # Category pages with SEO
├── comparisons.json        # Tool comparison data
├── sitemap.json           # SEO sitemap
└── robots.txt             # SEO robots file
```

### **Analytics & Reports** (`data/analytics/`, `data/reports/`)
```
data/
├── analytics/
│   └── monthly/           # Monthly analytics reports
├── reports/
│   ├── weekly/            # Weekly update reports
│   └── analytics/         # Analytics reports
└── health/               # System health checks
```

## 🎯 AI Tool Categories

The system normalizes tools into 20 main categories:

1. **Text Generation** - Writing, content creation, chatbots
2. **Image Generation** - Art, graphics, photo editing
3. **Code Generation** - Programming, development tools
4. **Video Generation** - Video editing, animation
5. **Audio Generation** - Voice, music, sound processing
6. **Social Media** - Social media management and content
7. **Productivity** - Workflow, automation, collaboration
8. **Data Analysis** - Analytics, business intelligence
9. **Research & Education** - Academic, learning tools
10. **Marketing** - Advertising, SEO, campaigns
11. **Design** - UI/UX, graphic design, branding
12. **Business** - CRM, sales, operations
13. **Healthcare** - Medical, fitness, wellness
14. **Finance** - Accounting, investment, trading
15. **Education** - E-learning, training, courses
16. **Entertainment** - Media, streaming, creative
17. **Gaming** - Game development, VR/AR
18. **Automation** - RPA, workflow automation
19. **Security** - Cybersecurity, privacy
20. **Development** - Web, mobile, API development

## 🔧 Configuration

### Environment Variables
```bash
FIRECRAWL_API_KEY=your-api-key-here
NODE_ENV=production
```

### Customization Options

#### **Category Mapping**
Edit `firecrawl-scraper.js` to customize category mapping:
```javascript
const CATEGORY_MAPPING = {
  'writing': 'text-generation',
  'art': 'image-generation',
  // Add your custom mappings
};
```

#### **Scraping Sources**
Modify the sources array in `firecrawl-scraper.js`:
```javascript
const sources = [
  {
    name: 'AI Tools Directory',
    url: 'https://aitoolsdirectory.com/',
    // Add more sources
  }
];
```

#### **Update Schedule**
Customize the cron schedule in `update-scheduler.js`:
```javascript
// Daily update at 2 AM
cron.schedule('0 2 * * *', () => {
  // Your custom schedule
});
```

## 📊 Data Format

### **Tool Object Structure**
```json
{
  "id": "unique-tool-id",
  "name": "Tool Name",
  "description": "Tool description",
  "category": "text-generation",
  "pricing": {
    "price": 20,
    "currency": "USD",
    "text": "$20/month",
    "plans": [...]
  },
  "rating": 4.5,
  "reviewCount": 1500,
  "website": "https://tool-website.com",
  "source": "aitoolsdirectory.com",
  "features": ["feature1", "feature2"],
  "pros": ["Pro 1", "Pro 2"],
  "cons": ["Con 1", "Con 2"],
  "lastUpdated": "2025-08-15T18:57:18.190Z",
  "seo": {
    "title": "SEO optimized title",
    "description": "SEO description",
    "keywords": "seo, keywords",
    "canonicalUrl": "https://siteoptz.ai/tools/tool-name"
  },
  "structuredData": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    // JSON-LD schema
  }
}
```

## 🔍 SEO Features

### **Meta Tags**
- Dynamic title generation based on tool names
- SEO-optimized descriptions with keywords
- Proper canonical URLs
- Open Graph tags for social sharing
- Twitter Card optimization

### **Structured Data**
- JSON-LD schema for SoftwareApplication
- AggregateRating schema for reviews
- Organization schema for vendor information
- ComparisonPage schema for tool comparisons

### **Performance**
- Static generation for all tool pages
- Image optimization with Next.js Image
- Lazy loading for comparison tables
- Minimal JavaScript bundle size

## 📈 Analytics & Insights

### **Generated Reports**
- **Weekly Reports**: Tool additions, top performers, recommendations
- **Monthly Analytics**: Comprehensive market analysis
- **Performance Metrics**: Update success rates, processing times
- **Growth Trends**: Market maturity assessment
- **Strategic Recommendations**: Business insights

### **Key Metrics**
- Total tools processed
- Category distribution
- Pricing analysis
- Rating trends
- Feature popularity
- Source analysis
- Growth patterns

## 🚀 Deployment

### **Local Development**
```bash
# Install dependencies
npm install

# Set API key
export FIRECRAWL_API_KEY="your-key"

# Run pipeline
npm run pipeline
```

### **Production Deployment**
```bash
# Install dependencies
npm install --production

# Set environment variables
export FIRECRAWL_API_KEY="your-key"
export NODE_ENV=production

# Start automated scheduler
npm run scheduler
```

### **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
CMD ["npm", "run", "scheduler"]
```

## 🔧 Troubleshooting

### **Common Issues**

#### **API Key Issues**
```bash
# Check if API key is set
echo $FIRECRAWL_API_KEY

# Set API key if missing
export FIRECRAWL_API_KEY="your-key"
```

#### **Data Integrity Issues**
```bash
# Validate data integrity
npm run validate

# Check system status
npm run status
```

#### **Scraping Errors**
```bash
# Check Firecrawl API status
curl -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
     https://api.firecrawl.dev/status

# Run scraping with debug info
DEBUG=* npm run scrape
```

### **Logs & Monitoring**
- Check `data/health/` for system health logs
- Review `data/update-history.json` for update history
- Monitor console output for real-time status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Check the troubleshooting section
- Review the logs in `data/health/`
- Run `npm run status` for system diagnostics
- Run `npm run validate` for data integrity checks

## 🔄 Version History

- **v1.0.0**: Initial release with comprehensive scraping and conversion
- Features: Firecrawl integration, SEO optimization, automated updates, analytics

---

**Built with ❤️ for SiteOptz.ai**
