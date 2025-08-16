const fs = require('fs');
const path = require('path');

class SiteOptzConverter {
  constructor() {
    this.convertedData = [];
    this.seoData = {};
    this.structuredData = {};
  }

  // Convert scraped data to SiteOptz.ai format
  convertToSiteOptzFormat(scrapedData) {
    console.log('🔄 Converting data to SiteOptz.ai format...');
    
    this.convertedData = scrapedData.tools.map(tool => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      category: tool.category,
      pricing: {
        price: tool.pricing.price,
        currency: tool.pricing.currency,
        text: tool.pricing.text,
        plans: this.generatePricingPlans(tool.pricing)
      },
      rating: tool.rating,
      reviewCount: tool.reviewCount,
      website: tool.website,
      source: tool.source,
      features: tool.features,
      pros: tool.pros,
      cons: tool.cons,
      lastUpdated: tool.lastUpdated,
      
      // SiteOptz.ai specific fields
      seo: this.generateSEOData(tool),
      structuredData: this.generateStructuredData(tool),
      metaTags: this.generateMetaTags(tool),
      socialTags: this.generateSocialTags(tool),
      canonicalUrl: this.generateCanonicalUrl(tool),
      breadcrumbs: this.generateBreadcrumbs(tool),
      relatedTools: [],
      comparisonData: this.generateComparisonData(tool)
    }));

    console.log(`✅ Converted ${this.convertedData.length} tools to SiteOptz.ai format`);
    return this.convertedData;
  }

  generatePricingPlans(pricing) {
    if (pricing.price === 0) {
      return [
        {
          name: 'Free',
          price: 0,
          currency: 'USD',
          features: ['Basic features', 'Limited usage'],
          popular: false
        }
      ];
    } else if (pricing.price) {
      return [
        {
          name: 'Pro',
          price: pricing.price,
          currency: 'USD',
          features: ['Full features', 'Unlimited usage', 'Priority support'],
          popular: true
        }
      ];
    } else {
      return [
        {
          name: 'Contact Sales',
          price: null,
          currency: 'USD',
          features: ['Custom pricing', 'Enterprise features'],
          popular: false
        }
      ];
    }
  }

  generateSEOData(tool) {
    const keywords = [
      tool.name,
      tool.category.replace('-', ' '),
      'AI tool',
      'artificial intelligence',
      ...tool.features,
      ...tool.pros
    ].join(', ');

    return {
      title: `${tool.name} - Best ${tool.category.replace('-', ' ')} AI Tool | SiteOptz.ai`,
      description: `${tool.description} Compare ${tool.name} with other ${tool.category.replace('-', ' ')} AI tools. Rating: ${tool.rating}/5, ${tool.reviewCount} reviews. ${tool.pricing.text}.`,
      keywords: keywords,
      slug: this.generateSlug(tool.name),
      h1: tool.name,
      h2: `${tool.name} - ${tool.category.replace('-', ' ')} AI Tool`,
      h3: `Features, Pricing, and Reviews of ${tool.name}`,
      canonicalUrl: this.generateCanonicalUrl(tool),
      robots: 'index, follow',
      language: 'en-US'
    };
  }

  generateStructuredData(tool) {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.description,
      url: tool.website,
      applicationCategory: `${tool.category.replace('-', ' ')} AI Tool`,
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: tool.pricing.price || 0,
        priceCurrency: tool.pricing.currency,
        availability: 'https://schema.org/InStock'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: tool.rating,
        ratingCount: tool.reviewCount,
        bestRating: 5,
        worstRating: 1
      },
      author: {
        '@type': 'Organization',
        name: tool.source,
        url: tool.website
      },
      datePublished: tool.lastUpdated,
      dateModified: tool.lastUpdated
    };
  }

  generateMetaTags(tool) {
    return {
      title: `${tool.name} - Best ${tool.category.replace('-', ' ')} AI Tool | SiteOptz.ai`,
      description: `${tool.description} Compare ${tool.name} with other ${tool.category.replace('-', ' ')} AI tools. Rating: ${tool.rating}/5, ${tool.reviewCount} reviews. ${tool.pricing.text}.`,
      keywords: `${tool.name}, ${tool.category.replace('-', ' ')}, AI tool, artificial intelligence, ${tool.features.join(', ')}`,
      author: 'SiteOptz.ai',
      viewport: 'width=device-width, initial-scale=1',
      charset: 'UTF-8',
      language: 'en-US',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      googlebot: 'index, follow',
      bingbot: 'index, follow'
    };
  }

  generateSocialTags(tool) {
    return {
      'og:title': `${tool.name} - Best ${tool.category.replace('-', ' ')} AI Tool`,
      'og:description': tool.description,
      'og:type': 'website',
      'og:url': this.generateCanonicalUrl(tool),
      'og:image': this.generateSocialImage(tool),
      'og:site_name': 'SiteOptz.ai',
      'og:locale': 'en_US',
      
      'twitter:card': 'summary_large_image',
      'twitter:title': `${tool.name} - Best ${tool.category.replace('-', ' ')} AI Tool`,
      'twitter:description': tool.description,
      'twitter:image': this.generateSocialImage(tool),
      'twitter:site': '@siteoptz',
      'twitter:creator': '@siteoptz'
    };
  }

  generateCanonicalUrl(tool) {
    const slug = this.generateSlug(tool.name);
    return `https://siteoptz.ai/tools/${slug}`;
  }

  generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  generateSocialImage(tool) {
    // Generate a social image URL (you can implement actual image generation)
    return `https://siteoptz.ai/api/og?title=${encodeURIComponent(tool.name)}&category=${encodeURIComponent(tool.category)}&rating=${tool.rating}`;
  }

  generateBreadcrumbs(tool) {
    return [
      { name: 'Home', url: 'https://siteoptz.ai' },
      { name: 'AI Tools', url: 'https://siteoptz.ai/tools' },
      { name: tool.category.replace('-', ' '), url: `https://siteoptz.ai/tools/category/${tool.category}` },
      { name: tool.name, url: this.generateCanonicalUrl(tool) }
    ];
  }

  generateComparisonData(tool) {
    return {
      category: tool.category,
      rating: tool.rating,
      price: tool.pricing.price,
      features: tool.features.length,
      pros: tool.pros.length,
      cons: tool.cons.length,
      reviewCount: tool.reviewCount,
      lastUpdated: tool.lastUpdated
    };
  }

  // Generate static pages for all tools
  generateStaticPages() {
    console.log('📄 Generating static pages...');
    
    const pages = {
      tools: this.convertedData,
      categories: this.generateCategoryPages(),
      comparisons: this.generateComparisonPages(),
      sitemap: this.generateSitemap(),
      robots: this.generateRobotsTxt()
    };

    return pages;
  }

  generateCategoryPages() {
    const categories = {};
    
    this.convertedData.forEach(tool => {
      if (!categories[tool.category]) {
        categories[tool.category] = [];
      }
      categories[tool.category].push(tool);
    });

    return Object.entries(categories).map(([category, tools]) => ({
      category,
      tools,
      seo: {
        title: `Best ${category.replace('-', ' ')} AI Tools | SiteOptz.ai`,
        description: `Discover the top ${category.replace('-', ' ')} AI tools. Compare features, pricing, and reviews. Find the perfect AI tool for your needs.`,
        keywords: `${category.replace('-', ' ')}, AI tools, artificial intelligence, comparison, reviews`,
        canonicalUrl: `https://siteoptz.ai/tools/category/${category}`,
        structuredData: this.generateCategoryStructuredData(category, tools)
      }
    }));
  }

  generateCategoryStructuredData(category, tools) {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${category.replace('-', ' ')} AI Tools`,
      description: `Top ${category.replace('-', ' ')} AI tools with reviews and comparisons`,
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: tool.name,
          url: tool.canonicalUrl,
          description: tool.description
        }
      }))
    };
  }

  generateComparisonPages() {
    const comparisons = [];
    const categories = {};
    
    this.convertedData.forEach(tool => {
      if (!categories[tool.category]) {
        categories[tool.category] = [];
      }
      categories[tool.category].push(tool);
    });

    // Generate comparison pages for each category
    Object.entries(categories).forEach(([category, tools]) => {
      if (tools.length >= 2) {
        // Generate pairwise comparisons
        for (let i = 0; i < tools.length - 1; i++) {
          for (let j = i + 1; j < tools.length; j++) {
            const tool1 = tools[i];
            const tool2 = tools[j];
            
            comparisons.push({
              id: `${tool1.id}-vs-${tool2.id}`,
              tool1,
              tool2,
              category,
              seo: {
                title: `${tool1.name} vs ${tool2.name} - ${category.replace('-', ' ')} AI Tools Comparison`,
                description: `Compare ${tool1.name} vs ${tool2.name}. Features, pricing, pros & cons, and user reviews. Find the best ${category.replace('-', ' ')} AI tool.`,
                keywords: `${tool1.name}, ${tool2.name}, comparison, ${category.replace('-', ' ')}, AI tools`,
                canonicalUrl: `https://siteoptz.ai/compare/${tool1.id}-vs-${tool2.id}`,
                structuredData: this.generateComparisonStructuredData(tool1, tool2)
              }
            });
          }
        }
      }
    });

    return comparisons;
  }

  generateComparisonStructuredData(tool1, tool2) {
    return {
      '@context': 'https://schema.org',
      '@type': 'ComparisonPage',
      name: `${tool1.name} vs ${tool2.name}`,
      description: `Comparison between ${tool1.name} and ${tool2.name}`,
      mainEntity: [
        {
          '@type': 'SoftwareApplication',
          name: tool1.name,
          description: tool1.description,
          url: tool1.website,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: tool1.rating,
            ratingCount: tool1.reviewCount
          }
        },
        {
          '@type': 'SoftwareApplication',
          name: tool2.name,
          description: tool2.description,
          url: tool2.website,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: tool2.rating,
            ratingCount: tool2.reviewCount
          }
        }
      ]
    };
  }

  generateSitemap() {
    const urls = [
      { url: 'https://siteoptz.ai', priority: 1.0, changefreq: 'daily' },
      { url: 'https://siteoptz.ai/tools', priority: 0.9, changefreq: 'daily' }
    ];

    // Add category pages
    const categories = [...new Set(this.convertedData.map(t => t.category))];
    categories.forEach(category => {
      urls.push({
        url: `https://siteoptz.ai/tools/category/${category}`,
        priority: 0.8,
        changefreq: 'weekly'
      });
    });

    // Add individual tool pages
    this.convertedData.forEach(tool => {
      urls.push({
        url: tool.canonicalUrl,
        priority: 0.7,
        changefreq: 'weekly',
        lastmod: tool.lastUpdated
      });
    });

    // Add comparison pages
    const comparisons = this.generateComparisonPages();
    comparisons.forEach(comp => {
      urls.push({
        url: comp.seo.canonicalUrl,
        priority: 0.6,
        changefreq: 'monthly'
      });
    });

    return urls;
  }

  generateRobotsTxt() {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://siteoptz.ai/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/`;
  }

  // Export data in SiteOptz.ai format
  exportSiteOptzData() {
    console.log('📁 Exporting SiteOptz.ai formatted data...');
    
    try {
      const dataDir = path.join(__dirname, 'data', 'siteoptz');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Export converted tools
      const toolsPath = path.join(dataDir, 'tools.json');
      fs.writeFileSync(toolsPath, JSON.stringify({
        tools: this.convertedData,
        total: this.convertedData.length,
        lastUpdated: new Date().toISOString()
      }, null, 2));

      // Export by category
      const categories = this.generateCategoryPages();
      categories.forEach(category => {
        const categoryPath = path.join(dataDir, `${category.category}.json`);
        fs.writeFileSync(categoryPath, JSON.stringify(category, null, 2));
      });

      // Export comparisons
      const comparisons = this.generateComparisonPages();
      const comparisonsPath = path.join(dataDir, 'comparisons.json');
      fs.writeFileSync(comparisonsPath, JSON.stringify({
        comparisons,
        total: comparisons.length,
        lastUpdated: new Date().toISOString()
      }, null, 2));

      // Export sitemap
      const sitemap = this.generateSitemap();
      const sitemapPath = path.join(dataDir, 'sitemap.json');
      fs.writeFileSync(sitemapPath, JSON.stringify({
        urls: sitemap,
        total: sitemap.length,
        lastUpdated: new Date().toISOString()
      }, null, 2));

      // Export robots.txt
      const robotsTxt = this.generateRobotsTxt();
      const robotsPath = path.join(dataDir, 'robots.txt');
      fs.writeFileSync(robotsPath, robotsTxt);

      // Export summary
      const summary = {
        totalTools: this.convertedData.length,
        totalCategories: categories.length,
        totalComparisons: comparisons.length,
        totalSitemapUrls: sitemap.length,
        categories: categories.map(c => c.category),
        lastUpdated: new Date().toISOString()
      };
      
      const summaryPath = path.join(dataDir, 'summary.json');
      fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

      console.log('✅ SiteOptz.ai data export completed!');
      console.log(`📊 Exported ${this.convertedData.length} tools`);
      console.log(`📂 Exported ${categories.length} categories`);
      console.log(`🔗 Exported ${comparisons.length} comparisons`);
      console.log(`🗺️ Exported ${sitemap.length} sitemap URLs`);

    } catch (error) {
      console.error('❌ Error exporting SiteOptz.ai data:', error);
    }
  }
}

// Main conversion function
async function convertToSiteOptzFormat() {
  try {
    console.log('🔄 Starting SiteOptz.ai conversion...');
    
    // Load scraped data
    const dataPath = path.join(__dirname, 'data', 'tools.json');
    if (!fs.existsSync(dataPath)) {
      console.error('❌ No scraped data found. Please run the scraper first.');
      return;
    }
    
    const scrapedData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // Convert to SiteOptz.ai format
    const converter = new SiteOptzConverter();
    const convertedData = converter.convertToSiteOptzFormat(scrapedData);
    
    // Export converted data
    converter.exportSiteOptzData();
    
    console.log('🎉 SiteOptz.ai conversion completed successfully!');
    
  } catch (error) {
    console.error('❌ Error in conversion:', error);
  }
}

// Export for use in other modules
module.exports = { SiteOptzConverter, convertToSiteOptzFormat };

// Run if called directly
if (require.main === module) {
  convertToSiteOptzFormat();
}
