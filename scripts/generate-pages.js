const fs = require('fs');
const path = require('path');

// Load tools data
const toolsData = require('../data/tools.json');

// Utility function to create URL-friendly slugs
function createSlug(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Generate all possible comparison page combinations
function generateComparisonPages() {
  const tools = toolsData.ai_tools;
  const comparisons = [];
  
  console.log('📊 Generating comparison page combinations...');
  
  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      const toolA = tools[i];
      const toolB = tools[j];
      
      const slugA = createSlug(toolA.tool_name);
      const slugB = createSlug(toolB.tool_name);
      const comparisonSlug = `${slugA}-vs-${slugB}`;
      
      comparisons.push({
        toolA: toolA.tool_name,
        toolB: toolB.tool_name,
        slugA: slugA,
        slugB: slugB,
        comparisonSlug: comparisonSlug,
        url: `/compare/${comparisonSlug}`,
        title: `${toolA.tool_name} vs ${toolB.tool_name}`,
        metaTitle: `${toolA.tool_name} vs ${toolB.tool_name} — Features, Pricing, and Comparison [2025]`,
        metaDescription: `${toolA.tool_name} vs ${toolB.tool_name}: Compare features, pricing (${toolA.pricing.plans[0]?.price || 'Custom'} vs ${toolB.pricing.plans[0]?.price || 'Custom'}), and pros/cons. Expert analysis for 2025.`
      });
    }
  }
  
  console.log(`✅ Generated ${comparisons.length} comparison page combinations`);
  return comparisons;
}

// Generate single review pages
function generateReviewPages() {
  const tools = toolsData.ai_tools;
  const reviews = [];
  
  console.log('📝 Generating review pages...');
  
  tools.forEach(tool => {
    const slug = createSlug(tool.tool_name);
    
    reviews.push({
      toolName: tool.tool_name,
      slug: slug,
      url: `/reviews/${slug}`,
      title: `${tool.tool_name} Review`,
      metaTitle: `${tool.tool_name} Review — Features, Pricing, Pros & Cons [2025]`,
      metaDescription: `${tool.tool_name} review: Features, pricing (from ${tool.pricing.plans[0]?.price || 'Custom pricing'}), pros, cons, and alternatives. Expert analysis and user guide for 2025.`,
      category: tool.category || 'AI Tools',
      startingPrice: tool.pricing.plans[0]?.price || 'Custom',
      hasFreePlan: tool.pricing.plans.some(plan => plan.price.includes('$0')),
      featureCount: Object.keys(tool.features.core || {}).length + Object.keys(tool.features.advanced || {}).length,
      rating: tool.rating || 4.5
    });
  });
  
  console.log(`✅ Generated ${reviews.length} review pages`);
  return reviews;
}

// Generate sitemap entries
function generateSitemap(comparisons, reviews) {
  console.log('🗺️  Generating sitemap entries...');
  
  const baseUrl = 'https://siteoptz.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemapEntries = [];
  
  // Add comparison pages
  comparisons.forEach(comparison => {
    sitemapEntries.push({
      url: `${baseUrl}${comparison.url}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    });
  });
  
  // Add review pages
  reviews.forEach(review => {
    sitemapEntries.push({
      url: `${baseUrl}${review.url}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    });
  });
  
  console.log(`✅ Generated ${sitemapEntries.length} sitemap entries`);
  return sitemapEntries;
}

// Generate Next.js route files
function generateRouteFiles(comparisons, reviews) {
  console.log('🔧 Generating route configuration...');
  
  const routes = {
    comparisons: comparisons.map(comp => ({
      source: `/compare/${comp.comparisonSlug}`,
      destination: `/compare/[tool-a]-vs-[tool-b]`,
      params: {
        'tool-a': comp.slugA,
        'tool-b': comp.slugB
      }
    })),
    reviews: reviews.map(review => ({
      source: `/reviews/${review.slug}`,
      destination: `/reviews/[tool-name]`,
      params: {
        'tool-name': review.slug
      }
    }))
  };
  
  // Save route configuration
  fs.writeFileSync(
    path.join(__dirname, '../generated/routes.json'),
    JSON.stringify(routes, null, 2)
  );
  
  console.log('✅ Route configuration saved to generated/routes.json');
}

// Generate SEO metadata
function generateSEOData(comparisons, reviews) {
  console.log('🔍 Generating SEO metadata...');
  
  const seoData = {
    comparisons: {},
    reviews: {},
    generated: new Date().toISOString(),
    total_pages: comparisons.length + reviews.length
  };
  
  // Add comparison SEO data
  comparisons.forEach(comp => {
    seoData.comparisons[comp.comparisonSlug] = {
      title: comp.metaTitle,
      description: comp.metaDescription,
      keywords: `${comp.toolA} vs ${comp.toolB}, ${comp.toolA} comparison, ${comp.toolB} comparison, ${comp.toolA} alternative, ${comp.toolB} alternative, AI tools comparison 2025`,
      canonical: `https://siteoptz.com/compare/${comp.comparisonSlug}`,
      ogType: 'article',
      structuredData: {
        '@type': 'Article',
        headline: comp.metaTitle,
        description: comp.metaDescription,
        author: 'SiteOptz',
        datePublished: '2025-01-15',
        dateModified: new Date().toISOString().split('T')[0]
      }
    };
  });
  
  // Add review SEO data
  reviews.forEach(review => {
    seoData.reviews[review.slug] = {
      title: review.metaTitle,
      description: review.metaDescription,
      keywords: `${review.toolName} review, ${review.toolName} features, ${review.toolName} pricing, ${review.toolName} pros and cons, ${review.toolName} alternatives, AI tools 2025`,
      canonical: `https://siteoptz.com/reviews/${review.slug}`,
      ogType: 'article',
      structuredData: {
        '@type': 'Review',
        itemReviewed: {
          '@type': 'SoftwareApplication',
          name: review.toolName
        },
        author: 'SiteOptz',
        datePublished: '2025-01-15',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5
        }
      }
    };
  });
  
  // Save SEO data
  fs.writeFileSync(
    path.join(__dirname, '../generated/seo-data.json'),
    JSON.stringify(seoData, null, 2)
  );
  
  console.log('✅ SEO metadata saved to generated/seo-data.json');
}

// Generate analytics tracking data
function generateAnalyticsData(comparisons, reviews) {
  console.log('📈 Generating analytics tracking data...');
  
  const analyticsData = {
    page_groups: {
      comparisons: {
        pages: comparisons.length,
        url_pattern: '/compare/[tool-a]-vs-[tool-b]',
        tracking_events: ['page_view', 'tool_click', 'affiliate_click', 'email_capture']
      },
      reviews: {
        pages: reviews.length,
        url_pattern: '/reviews/[tool-name]',
        tracking_events: ['page_view', 'tool_click', 'affiliate_click', 'tab_change']
      }
    },
    conversion_funnels: {
      comparison_to_trial: [
        'comparison_page_view',
        'tool_cta_click',
        'affiliate_site_visit',
        'trial_signup'
      ],
      review_to_trial: [
        'review_page_view',
        'pricing_tab_view',
        'trial_cta_click',
        'trial_signup'
      ]
    },
    generated: new Date().toISOString()
  };
  
  // Save analytics data
  fs.writeFileSync(
    path.join(__dirname, '../generated/analytics-config.json'),
    JSON.stringify(analyticsData, null, 2)
  );
  
  console.log('✅ Analytics configuration saved to generated/analytics-config.json');
}

// Main function
function main() {
  console.log('🚀 Starting page generation process...\n');
  
  // Create generated directory if it doesn't exist
  const generatedDir = path.join(__dirname, '../generated');
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }
  
  // Generate all page data
  const comparisons = generateComparisonPages();
  const reviews = generateReviewPages();
  const sitemapEntries = generateSitemap(comparisons, reviews);
  
  // Save comprehensive data file
  const allData = {
    metadata: {
      generated: new Date().toISOString(),
      total_comparisons: comparisons.length,
      total_reviews: reviews.length,
      total_pages: comparisons.length + reviews.length,
      tools_count: toolsData.ai_tools.length
    },
    comparisons,
    reviews,
    sitemap: sitemapEntries
  };
  
  fs.writeFileSync(
    path.join(generatedDir, 'all-pages.json'),
    JSON.stringify(allData, null, 2)
  );
  
  console.log('✅ Complete page data saved to generated/all-pages.json\n');
  
  // Generate additional files
  generateRouteFiles(comparisons, reviews);
  generateSEOData(comparisons, reviews);
  generateAnalyticsData(comparisons, reviews);
  
  // Summary
  console.log('📊 GENERATION SUMMARY:');
  console.log(`   📄 Total Pages: ${comparisons.length + reviews.length}`);
  console.log(`   ⚖️  Comparison Pages: ${comparisons.length}`);
  console.log(`   📝 Review Pages: ${reviews.length}`);
  console.log(`   🔧 Tools Analyzed: ${toolsData.ai_tools.length}`);
  console.log(`   🗺️  Sitemap Entries: ${sitemapEntries.length}`);
  console.log('\n✅ Page generation completed successfully!');
  
  // Show some example URLs
  console.log('\n🔗 Example URLs Generated:');
  console.log('   Comparisons:');
  comparisons.slice(0, 3).forEach(comp => {
    console.log(`     • ${comp.url}`);
  });
  console.log('   Reviews:');
  reviews.slice(0, 3).forEach(review => {
    console.log(`     • ${review.url}`);
  });
  
  console.log('\n🎯 Next Steps:');
  console.log('   1. Run: npm run build (to generate static pages)');
  console.log('   2. Test: npm run start (to test generated pages)');
  console.log('   3. Deploy: Upload to your hosting platform');
  console.log('   4. Monitor: Check Google Search Console for indexing');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  generateComparisonPages,
  generateReviewPages,
  generateSitemap,
  generateSEOData
};