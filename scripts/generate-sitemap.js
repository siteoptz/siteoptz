#!/usr/bin/env node

/**
 * Sitemap Generator for SiteOptz AI
 * Generates XML sitemaps for better SEO
 */

const fs = require('fs');
const path = require('path');

class SitemapGenerator {
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://siteoptz.ai';
    this.outputDir = path.join(process.cwd(), 'out');
    this.mainSitemapPath = path.join(this.outputDir, 'sitemap.xml');
    this.toolsSitemapPath = path.join(this.outputDir, 'sitemap-tools.xml');
    this.comparisonsSitemapPath = path.join(this.outputDir, 'sitemap-comparisons.xml');
    
    this.mainUrls = [];
    this.toolUrls = [];
    this.comparisonUrls = [];
    
    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async generateSitemap() {
    console.log('🗺️  Generating Enhanced Sitemaps...\n');
    
    try {
      // Add static pages to main sitemap
      this.addStaticPages();
      
      // Add dynamic tool pages to tools sitemap
      await this.addToolPages();
      
      // Add comparison pages to comparisons sitemap
      await this.addComparisonPages();
      
      // Generate main sitemap index
      const mainSitemapXml = this.generateMainSitemapIndex();
      fs.writeFileSync(this.mainSitemapPath, mainSitemapXml, 'utf8');
      
      // Generate tools sitemap
      const toolsSitemapXml = this.generateXML(this.toolUrls);
      fs.writeFileSync(this.toolsSitemapPath, toolsSitemapXml, 'utf8');
      
      // Generate comparisons sitemap
      const comparisonsSitemapXml = this.generateXML(this.comparisonUrls);
      fs.writeFileSync(this.comparisonsSitemapPath, comparisonsSitemapXml, 'utf8');
      
      console.log('✅ Enhanced sitemaps generated successfully!');
      console.log(`📄 Main sitemap: ${this.mainUrls.length} URLs`);
      console.log(`🔧 Tools sitemap: ${this.toolUrls.length} URLs`);
      console.log(`🔄 Comparisons sitemap: ${this.comparisonUrls.length} URLs`);
      console.log(`📊 Total URLs: ${this.mainUrls.length + this.toolUrls.length + this.comparisonUrls.length}`);
      
    } catch (error) {
      console.error('❌ Error generating sitemap:', error.message);
      process.exit(1);
    }
  }

  addStaticPages() {
    const staticPages = [
      { url: '/', priority: 1.0, changefreq: 'daily' },
      { url: '/tools', priority: 0.9, changefreq: 'daily' },
      { url: '/compare', priority: 0.9, changefreq: 'daily' },
      { url: '/comparisons', priority: 0.8, changefreq: 'weekly' },
      { url: '/about', priority: 0.5, changefreq: 'monthly' },
      { url: '/contact', priority: 0.5, changefreq: 'monthly' },
      { url: '/privacy', priority: 0.3, changefreq: 'yearly' },
      { url: '/terms', priority: 0.3, changefreq: 'yearly' }
    ];

    for (const page of staticPages) {
      this.addUrl(page.url, page.priority, page.changefreq, null, 'main');
    }

    console.log(`✅ Added ${staticPages.length} static pages`);
  }

  async addToolPages() {
    try {
      // Try both possible data paths
      const possiblePaths = [
        path.join(process.cwd(), 'public/data', 'aiToolsData.json'),
        path.join(process.cwd(), 'data', 'tool_data.json')
      ];
      
      let toolDataPath = null;
      for (const testPath of possiblePaths) {
        if (fs.existsSync(testPath)) {
          toolDataPath = testPath;
          break;
        }
      }
      
      if (!toolDataPath) {
        console.warn('⚠️  Tool data not found, skipping tool pages');
        return;
      }

      const toolData = JSON.parse(fs.readFileSync(toolDataPath, 'utf8'));
      
      for (const tool of toolData) {
        if (tool.slug) {
          this.addUrl(`/tools/${tool.slug}`, 0.8, 'weekly', tool.last_updated || tool.updated_at, 'tools');
        }
      }

      console.log(`✅ Added ${toolData.length} tool pages`);
      
    } catch (error) {
      console.warn('⚠️  Error reading tool data:', error.message);
    }
  }

  async addComparisonPages() {
    try {
      // Try both possible data paths
      const possiblePaths = [
        path.join(process.cwd(), 'public/data', 'aiToolsData.json'),
        path.join(process.cwd(), 'data', 'tool_data.json')
      ];
      
      let toolDataPath = null;
      for (const testPath of possiblePaths) {
        if (fs.existsSync(testPath)) {
          toolDataPath = testPath;
          break;
        }
      }
      
      if (!toolDataPath) {
        console.warn('⚠️  Tool data not found, skipping comparison pages');
        return;
      }

      const toolData = JSON.parse(fs.readFileSync(toolDataPath, 'utf8'));
      
      // Generate popular comparisons
      const popularComparisons = [
        ['chatgpt', 'claude'],
        ['chatgpt', 'gemini'],
        ['claude', 'gemini'],
        ['chatgpt', 'copilot'],
        ['claude', 'llama'],
        ['chatgpt', 'perplexity'],
        ['gemini', 'copilot'],
        ['claude', 'perplexity']
      ];

      let addedComparisons = 0;
      for (const [tool1, tool2] of popularComparisons) {
        const tool1Exists = toolData.some(t => t.slug === tool1);
        const tool2Exists = toolData.some(t => t.slug === tool2);
        
        if (tool1Exists && tool2Exists) {
          this.addUrl(`/compare/${tool1}-vs-${tool2}`, 0.7, 'weekly', null, 'comparisons');
          addedComparisons++;
        }
      }

      // Add /compare/index page
      this.addUrl('/compare', 0.8, 'daily', null, 'comparisons');

      console.log(`✅ Added ${addedComparisons + 1} comparison pages`);
      
    } catch (error) {
      console.warn('⚠️  Error generating comparison pages:', error.message);
    }
  }

  addUrl(path, priority = 0.5, changefreq = 'monthly', lastmod = null, sitemap = 'main') {
    const url = {
      loc: `${this.baseUrl}${path}`,
      lastmod: lastmod || new Date().toISOString().split('T')[0],
      changefreq,
      priority: priority.toFixed(1)
    };

    // Add to appropriate sitemap array
    switch (sitemap) {
      case 'tools':
        this.toolUrls.push(url);
        break;
      case 'comparisons':
        this.comparisonUrls.push(url);
        break;
      default:
        this.mainUrls.push(url);
    }
  }

  generateXML(urls) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const url of urls) {
      xml += '  <url>\n';
      xml += `    <loc>${this.escapeXml(url.loc)}</loc>\n`;
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;
      xml += '  </url>\n';
    }

    xml += '</urlset>\n';
    return xml;
  }

  generateMainSitemapIndex() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Main pages sitemap
    const mainSitemapXml = this.generateXML(this.mainUrls);
    fs.writeFileSync(path.join(this.outputDir, 'sitemap-main.xml'), mainSitemapXml, 'utf8');
    
    xml += '  <sitemap>\n';
    xml += `    <loc>${this.baseUrl}/sitemap-main.xml</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += '  </sitemap>\n';

    // Tools sitemap
    if (this.toolUrls.length > 0) {
      xml += '  <sitemap>\n';
      xml += `    <loc>${this.baseUrl}/sitemap-tools.xml</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += '  </sitemap>\n';
    }

    // Comparisons sitemap
    if (this.comparisonUrls.length > 0) {
      xml += '  <sitemap>\n';
      xml += `    <loc>${this.baseUrl}/sitemap-comparisons.xml</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += '  </sitemap>\n';
    }

    xml += '</sitemapindex>\n';
    return xml;
  }

  escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }

  // Generate robots.txt
  generateRobotsTxt() {
    const robotsPath = path.join(process.cwd(), 'out', 'robots.txt');
    const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${this.baseUrl}/sitemap.xml

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /scripts/

# Allow important pages
Allow: /tools/
Allow: /compare/
Allow: /comparisons/
`;

    fs.writeFileSync(robotsPath, robotsContent, 'utf8');
    console.log('✅ Generated robots.txt');
  }
}

// Run if called directly
if (require.main === module) {
  const generator = new SitemapGenerator();
  
  generator.generateSitemap()
    .then(() => {
      // Also generate robots.txt
      generator.generateRobotsTxt();
      console.log('\n🎉 SEO files generated successfully!');
    })
    .catch(error => {
      console.error('Fatal error:', error.message);
      process.exit(1);
    });
}

module.exports = SitemapGenerator;