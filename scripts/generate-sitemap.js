#!/usr/bin/env node

/**
 * Sitemap Generator for SiteOptz AI
 * Generates XML sitemaps for better SEO
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class SitemapGenerator {
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://siteoptz.ai';
    this.outputPath = path.join(process.cwd(), 'out', 'sitemap.xml');
    this.urls = [];
    
    // Ensure output directory exists
    const outputDir = path.dirname(this.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  }

  async generateSitemap() {
    console.log(chalk.blue.bold('🗺️  Generating Sitemap...\n'));
    
    try {
      // Add static pages
      this.addStaticPages();
      
      // Add dynamic tool pages
      await this.addToolPages();
      
      // Add comparison pages
      await this.addComparisonPages();
      
      // Generate XML
      const xml = this.generateXML();
      
      // Write to file
      fs.writeFileSync(this.outputPath, xml, 'utf8');
      
      console.log(chalk.green('✅ Sitemap generated successfully!'));
      console.log(chalk.blue(`📄 Generated ${this.urls.length} URLs`));
      console.log(chalk.blue(`💾 Saved to: ${this.outputPath}`));
      
    } catch (error) {
      console.error(chalk.red('❌ Error generating sitemap:'), error.message);
      process.exit(1);
    }
  }

  addStaticPages() {
    const staticPages = [
      { url: '/', priority: 1.0, changefreq: 'daily' },
      { url: '/tools', priority: 0.9, changefreq: 'daily' },
      { url: '/comparisons', priority: 0.8, changefreq: 'weekly' },
      { url: '/about', priority: 0.5, changefreq: 'monthly' },
      { url: '/contact', priority: 0.5, changefreq: 'monthly' },
      { url: '/privacy', priority: 0.3, changefreq: 'yearly' },
      { url: '/terms', priority: 0.3, changefreq: 'yearly' }
    ];

    for (const page of staticPages) {
      this.addUrl(page.url, page.priority, page.changefreq);
    }

    console.log(chalk.green(`✅ Added ${staticPages.length} static pages`));
  }

  async addToolPages() {
    try {
      const toolDataPath = path.join(process.cwd(), 'data', 'tool_data.json');
      
      if (!fs.existsSync(toolDataPath)) {
        console.log(chalk.yellow('⚠️  Tool data not found, skipping tool pages'));
        return;
      }

      const toolData = JSON.parse(fs.readFileSync(toolDataPath, 'utf8'));
      
      for (const tool of toolData) {
        this.addUrl(`/tools/${tool.slug}`, 0.8, 'weekly', tool.last_updated);
      }

      console.log(chalk.green(`✅ Added ${toolData.length} tool pages`));
      
    } catch (error) {
      console.log(chalk.yellow('⚠️  Error reading tool data:', error.message));
    }
  }

  async addComparisonPages() {
    try {
      const toolDataPath = path.join(process.cwd(), 'data', 'tool_data.json');
      
      if (!fs.existsSync(toolDataPath)) {
        console.log(chalk.yellow('⚠️  Tool data not found, skipping comparison pages'));
        return;
      }

      const toolData = JSON.parse(fs.readFileSync(toolDataPath, 'utf8'));
      const comparisonCount = Math.min(toolData.length, 10); // Limit comparisons
      
      // Generate popular comparisons
      const popularComparisons = [
        ['chatgpt', 'claude'],
        ['chatgpt', 'gemini'],
        ['claude', 'gemini'],
        ['chatgpt', 'copilot'],
        ['claude', 'llama']
      ];

      for (const [tool1, tool2] of popularComparisons) {
        const tool1Exists = toolData.some(t => t.slug === tool1);
        const tool2Exists = toolData.some(t => t.slug === tool2);
        
        if (tool1Exists && tool2Exists) {
          this.addUrl(`/compare/${tool1}-vs-${tool2}`, 0.7, 'weekly');
        }
      }

      console.log(chalk.green(`✅ Added ${popularComparisons.length} comparison pages`));
      
    } catch (error) {
      console.log(chalk.yellow('⚠️  Error generating comparison pages:', error.message));
    }
  }

  addUrl(path, priority = 0.5, changefreq = 'monthly', lastmod = null) {
    const url = {
      loc: `${this.baseUrl}${path}`,
      lastmod: lastmod || new Date().toISOString().split('T')[0],
      changefreq,
      priority: priority.toFixed(1)
    };

    this.urls.push(url);
  }

  generateXML() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const url of this.urls) {
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
    console.log(chalk.green('✅ Generated robots.txt'));
  }
}

// Run if called directly
if (require.main === module) {
  const generator = new SitemapGenerator();
  
  generator.generateSitemap()
    .then(() => {
      // Also generate robots.txt
      generator.generateRobotsTxt();
      console.log(chalk.blue('\n🎉 SEO files generated successfully!'));
    })
    .catch(error => {
      console.error(chalk.red('Fatal error:'), error.message);
      process.exit(1);
    });
}

module.exports = SitemapGenerator;