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
      
      // Add ROI calculator pages to tools sitemap
      this.addROICalculatorPages();
      
      // Add comparison pages to comparisons sitemap
      await this.addComparisonPages();
      
      // Add podcast pages to main sitemap
      this.addPodcastPages();
      
      // Add guide and report pages to main sitemap
      this.addResourcePages();
      
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
      // Core pages
      { url: '/', priority: 1.0, changefreq: 'daily' },
      { url: '/tools', priority: 0.9, changefreq: 'daily' },
      { url: '/compare', priority: 0.9, changefreq: 'daily' },
      { url: '/comparisons', priority: 0.8, changefreq: 'weekly' },
      
      // New resource pages
      { url: '/resources', priority: 0.8, changefreq: 'weekly' },
      { url: '/podcasts', priority: 0.8, changefreq: 'weekly' },
      { url: '/webinars', priority: 0.8, changefreq: 'weekly' },
      { url: '/blog', priority: 0.7, changefreq: 'weekly' },
      { url: '/case-studies', priority: 0.7, changefreq: 'monthly' },
      { url: '/ai-library', priority: 0.6, changefreq: 'monthly' },
      
      // Tools and features
      { url: '/pricing', priority: 0.7, changefreq: 'monthly' },
      { url: '/data-room', priority: 0.6, changefreq: 'monthly' },
      { url: '/demo', priority: 0.6, changefreq: 'monthly' },
      { url: '/reviews', priority: 0.6, changefreq: 'weekly' },
      { url: '/compare-tools', priority: 0.7, changefreq: 'weekly' },
      
      // Company pages
      { url: '/about', priority: 0.5, changefreq: 'monthly' },
      { url: '/contact', priority: 0.5, changefreq: 'monthly' },
      { url: '/testimonials', priority: 0.5, changefreq: 'monthly' },
      { url: '/careers', priority: 0.4, changefreq: 'monthly' },
      
      // Legal pages
      { url: '/privacy', priority: 0.3, changefreq: 'yearly' },
      { url: '/terms', priority: 0.3, changefreq: 'yearly' }
    ];

    // Add category pages
    const categories = [
      'ai-automation',
      'best-voice-ai-tools',
      'code-generation',
      'content-creation',
      'data-analysis',
      'email-marketing',
      'image-generation',
      'paid-search-ppc',
      'productivity',
      'research-education',
      'seo-optimization',
      'social-media',
      'ux',
      'video-generation',
      'website-builder'
    ];

    categories.forEach(category => {
      staticPages.push({
        url: `/categories/${category}`,
        priority: 0.9,
        changefreq: 'weekly'
      });
    });

    // Add industry pages
    const industries = [
      'healthcare-life-sciences',
      'finance-banking',
      'retail-e-commerce',
      'manufacturing-supply-chain',
      'transportation-logistics',
      'marketing-advertising-media',
      'energy-utilities',
      'education-edtech',
      'legal-compliance',
      'human-resources-recruiting',
      'aerospace-defense'
    ];

    industries.forEach(industry => {
      staticPages.push({
        url: `/industries/${industry}`,
        priority: 0.8,
        changefreq: 'monthly'
      });
    });

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
      
      // Load slug redirects to avoid adding 404 URLs
      let slugRedirects = {};
      try {
        const redirectPath = path.join(process.cwd(), 'scripts', 'slug-redirects.json');
        if (fs.existsSync(redirectPath)) {
          slugRedirects = JSON.parse(fs.readFileSync(redirectPath, 'utf8'));
        }
      } catch (error) {
        console.warn('⚠️  Could not load slug redirects');
      }
      
      // Get list of existing review page files
      const reviewsDir = path.join(process.cwd(), 'pages', 'reviews');
      let existingReviewFiles = new Set();
      
      if (fs.existsSync(reviewsDir)) {
        const reviewFiles = fs.readdirSync(reviewsDir);
        reviewFiles.forEach(file => {
          if (file.endsWith('.tsx') && file !== 'index.tsx' && file !== '[toolName].tsx') {
            // Remove .tsx extension to get slug
            const slug = file.replace('.tsx', '');
            existingReviewFiles.add(slug);
          }
        });
      }
      
      let toolPagesAdded = 0;
      let skippedPages = 0;
      const validSlugs = new Set();
      
      for (const tool of toolData) {
        if (tool.slug) {
          // Only add review URLs if the corresponding page file exists
          if (existingReviewFiles.has(tool.slug)) {
            this.addUrl(`/reviews/${tool.slug}`, 0.8, 'weekly', tool.last_updated || tool.updated_at, 'tools');
            validSlugs.add(tool.slug);
            toolPagesAdded += 1;
          } else {
            skippedPages += 1;
          }
        }
      }

      console.log(`✅ Added ${toolPagesAdded} review pages with existing files`);
      if (skippedPages > 0) {
        console.log(`📝 Skipped ${skippedPages} tools without review page files`);
      }
      if (Object.keys(slugRedirects).length > 0) {
        console.log(`📝 Note: ${Object.keys(slugRedirects).length} slug redirects identified for cleanup`);
      }
      
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

  addROICalculatorPages() {
    const roiCalculators = [
      'ai-roi-calculator',
      'marketing-roi-calculator', 
      'chatbot-roi-calculator',
      'content-roi-calculator',
      'sales-ai-roi',
      'healthcare-ai-roi',
      'manufacturing-roi-calculator',
      'recruitment-roi-calculator',
      'security-roi-calculator',
      'no-code-ai-roi',
      'enterprise-ai-calculator',
      'conversion-roi-calculator',
      'ai-cost-calculator'
    ];

    roiCalculators.forEach(calculator => {
      this.addUrl(`/tools/${calculator}`, 0.7, 'monthly', null, 'tools');
    });

    console.log(`✅ Added ${roiCalculators.length} ROI calculator pages`);
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

  addPodcastPages() {
    // Add individual podcast episode pages based on our podcast data
    const podcastEpisodes = [
      'ai-automation-revolution-2024',
      'chatgpt-enterprise-workflows', 
      'no-code-ai-tools-revolution',
      'claude-vs-gpt-enterprise-comparison',
      'ai-customer-service-automation',
      'marketing-automation-ai-tools',
      'ai-data-analytics-transformation',
      'ai-sales-process-automation',
      'ai-content-creation-tools-2024',
      'ai-cybersecurity-automation',
      'ai-healthcare-workflow-automation',
      'ai-financial-trading-automation',
      'ai-hr-recruitment-automation',
      'ai-manufacturing-industry-40',
      'ai-ecommerce-personalization'
    ];

    let addedPodcasts = 0;
    podcastEpisodes.forEach(episodeSlug => {
      this.addUrl(`/podcasts/${episodeSlug}`, 0.7, 'monthly', null, 'main');
      addedPodcasts++;
    });

    console.log(`✅ Added ${addedPodcasts} podcast episode pages`);
  }

  addResourcePages() {
    // Add guide pages
    const guides = [
      'ai-chatbot-implementation',
      'ai-content-generation',
      'ai-data-analysis',
      'gpt4-turbo-business'
    ];

    guides.forEach(guide => {
      this.addUrl(`/guides/${guide}`, 0.7, 'monthly', null, 'main');
    });

    // Add report pages  
    const reports = [
      'ai-healthcare-2024',
      'fintech-ai-2024',
      'manufacturing-ai-2024',
      'q4-2024-ai-market'
    ];

    reports.forEach(report => {
      this.addUrl(`/reports/${report}`, 0.7, 'monthly', null, 'main');
    });

    // Add analysis pages
    const analyses = [
      'claude3-vs-gpt4'
    ];

    analyses.forEach(analysis => {
      this.addUrl(`/analysis/${analysis}`, 0.7, 'monthly', null, 'main');
    });

    // Add video pages
    const videos = [
      'claude-ai-business-setup',
      'ai-tools-comparison',
      'ai-integration-masterclass'
    ];

    videos.forEach(video => {
      this.addUrl(`/videos/${video}`, 0.6, 'monthly', null, 'main');
    });

    console.log(`✅ Added ${guides.length} guides, ${reports.length} reports, ${analyses.length} analyses, and ${videos.length} videos`);
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