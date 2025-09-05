import axios from 'axios';
import { writeFileSync } from 'fs';

const login = 'antonio@siteoptz.com';
const password = '8215cb0ce338b385';

const client = axios.create({
  baseURL: 'https://api.dataforseo.com/v3',
  auth: { username: login, password: password },
  headers: {
    'Content-Type': 'application/json'
  }
});

async function getComprehensiveSEOKeywords() {
  try {
    console.log('Starting comprehensive SEO keyword research for content creation...\n');
    
    // 1. High-volume primary keywords for SEO
    const primaryKeywords = [
      "SEO tools",
      "search engine optimization",
      "AI SEO tools", 
      "best SEO tools",
      "SEO software",
      "keyword research tools",
      "SEO analysis tools",
      "organic search optimization",
      "website SEO tools",
      "enterprise SEO tools"
    ];

    console.log('Fetching search volume for primary SEO keywords...');
    const primaryPayload = [{
      "keywords": primaryKeywords,
      "location_code": 2840,
      "language_code": "en"
    }];

    const primaryResponse = await client.post(
      '/keywords_data/google_ads/search_volume/live',
      primaryPayload
    );

    const primaryData = primaryResponse.data.tasks?.[0]?.result || [];
    
    // 2. Secondary high-intent keywords
    const secondaryKeywords = [
      "SEO optimization software",
      "search engine marketing tools", 
      "SERP analysis tools",
      "backlink analysis tools",
      "technical SEO tools",
      "local SEO tools",
      "SEO audit tools",
      "content optimization tools",
      "rank tracking tools",
      "competitor SEO analysis"
    ];

    console.log('Fetching search volume for secondary keywords...');
    const secondaryPayload = [{
      "keywords": secondaryKeywords,
      "location_code": 2840,
      "language_code": "en"
    }];

    const secondaryResponse = await client.post(
      '/keywords_data/google_ads/search_volume/live',
      secondaryPayload
    );

    const secondaryData = secondaryResponse.data.tasks?.[0]?.result || [];

    // 3. Long-tail and commercial intent keywords
    const longTailKeywords = [
      "best AI SEO tools 2025",
      "free SEO analysis tools",
      "SEO tools for small business", 
      "enterprise SEO software solutions",
      "automated SEO optimization tools",
      "SEO tools comparison",
      "affordable SEO software",
      "professional SEO tools",
      "SEO tools for agencies",
      "white label SEO tools"
    ];

    console.log('Fetching search volume for long-tail keywords...');
    const longTailPayload = [{
      "keywords": longTailKeywords,
      "location_code": 2840,
      "language_code": "en"
    }];

    const longTailResponse = await client.post(
      '/keywords_data/google_ads/search_volume/live',
      longTailPayload
    );

    const longTailData = longTailResponse.data.tasks?.[0]?.result || [];

    // 4. Industry and feature-specific keywords
    const featureKeywords = [
      "keyword research software",
      "SERP tracking tools",
      "website audit tools", 
      "link building tools",
      "schema markup tools",
      "page speed optimization tools",
      "mobile SEO tools",
      "voice search optimization",
      "video SEO tools",
      "e-commerce SEO tools"
    ];

    console.log('Fetching search volume for feature-specific keywords...');
    const featurePayload = [{
      "keywords": featureKeywords,
      "location_code": 2840,
      "language_code": "en"
    }];

    const featureResponse = await client.post(
      '/keywords_data/google_ads/search_volume/live',
      featurePayload
    );

    const featureData = featureResponse.data.tasks?.[0]?.result || [];

    // Combine and analyze all data
    const allKeywords = [
      ...primaryData.map(k => ({...k, category: 'primary'})),
      ...secondaryData.map(k => ({...k, category: 'secondary'})), 
      ...longTailData.map(k => ({...k, category: 'long-tail'})),
      ...featureData.map(k => ({...k, category: 'feature'}))
    ];

    // Sort by search volume
    const sortedKeywords = allKeywords
      .filter(kw => kw.search_volume > 10)
      .sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0));

    console.log('\n=== TOP SEO KEYWORDS FOR CONTENT ===\n');
    
    const topKeywords = sortedKeywords.slice(0, 20);
    topKeywords.forEach((kw, index) => {
      console.log(`${index + 1}. ${kw.keyword}`);
      console.log(`   Volume: ${kw.search_volume} | Competition: ${kw.competition} | CPC: $${kw.cpc} | Category: ${kw.category}`);
    });

    // Categorize by search volume for content strategy
    const highVolume = sortedKeywords.filter(k => k.search_volume >= 1000);
    const mediumVolume = sortedKeywords.filter(k => k.search_volume >= 100 && k.search_volume < 1000);
    const commercial = sortedKeywords.filter(k => 
      k.keyword.includes('best') || 
      k.keyword.includes('tools') ||
      k.keyword.includes('software') ||
      k.keyword.includes('comparison')
    );

    console.log('\n=== CONTENT STRATEGY INSIGHTS ===');
    console.log(`High Volume Keywords (1000+): ${highVolume.length}`);
    console.log(`Medium Volume Keywords (100-999): ${mediumVolume.length}`);
    console.log(`Commercial Intent Keywords: ${commercial.length}`);

    // Save comprehensive results
    const results = {
      contentKeywords: {
        primary: primaryData.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0)),
        secondary: secondaryData.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0)),
        longTail: longTailData.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0)),
        features: featureData.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0))
      },
      topKeywordsForContent: topKeywords,
      categories: {
        highVolume: highVolume,
        mediumVolume: mediumVolume,
        commercial: commercial
      },
      contentRecommendations: {
        primaryFocus: "AI SEO tools",
        secondaryTargets: [
          "best SEO tools 2025",
          "SEO optimization software", 
          "search engine optimization tools",
          "keyword research tools",
          "SEO analysis tools"
        ],
        contentClusters: [
          "AI-powered SEO automation",
          "Enterprise vs small business SEO tools",
          "Technical SEO optimization",
          "Content optimization and keyword research",
          "SERP analysis and competitor research"
        ]
      },
      totalKeywordsAnalyzed: allKeywords.length,
      timestamp: new Date().toISOString()
    };
    
    writeFileSync(
      '/Users/siteoptz/siteoptz/data/seo-comprehensive-keywords.json',
      JSON.stringify(results, null, 2)
    );
    
    console.log('\n✅ Comprehensive SEO keyword research saved to data/seo-comprehensive-keywords.json');
    console.log(`📊 Total keywords analyzed: ${allKeywords.length}`);
    console.log(`🎯 High-volume targets: ${highVolume.length}`);
    console.log(`💼 Commercial intent keywords: ${commercial.length}`);

  } catch (error) {
    console.error('Error in SEO keyword research:', error.response?.data || error.message);
  }
}

// Run the comprehensive analysis
getComprehensiveSEOKeywords();