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

async function getAIAutomationKeywords() {
  try {
    console.log('Starting comprehensive AI automation keyword research...\n');
    
    // 1. Primary AI automation keywords
    const primaryKeywords = [
      "AI automation tools",
      "business process automation", 
      "AI workflow automation",
      "artificial intelligence automation",
      "automated AI solutions",
      "AI automation software",
      "intelligent automation",
      "AI process automation",
      "robotic process automation",
      "AI automation platform"
    ];

    console.log('Fetching search volume for primary AI automation keywords...');
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
    
    // 2. Business automation keywords
    const businessKeywords = [
      "AI customer service automation",
      "marketing automation AI",
      "AI sales automation",
      "HR automation tools",
      "AI email automation", 
      "automated customer support",
      "AI chatbot automation",
      "lead generation automation",
      "AI content automation",
      "social media automation AI"
    ];

    console.log('Fetching search volume for business automation keywords...');
    const businessPayload = [{
      "keywords": businessKeywords,
      "location_code": 2840,
      "language_code": "en"
    }];

    const businessResponse = await client.post(
      '/keywords_data/google_ads/search_volume/live',
      businessPayload
    );

    const businessData = businessResponse.data.tasks?.[0]?.result || [];

    // 3. Technical automation keywords
    const technicalKeywords = [
      "API automation tools",
      "AI machine learning automation",
      "automated data processing",
      "AI workflow management",
      "intelligent document processing",
      "AI task automation",
      "automated testing AI",
      "AI integration platforms",
      "no-code automation AI",
      "AI automation frameworks"
    ];

    console.log('Fetching search volume for technical automation keywords...');
    const technicalPayload = [{
      "keywords": technicalKeywords,
      "location_code": 2840,
      "language_code": "en"
    }];

    const technicalResponse = await client.post(
      '/keywords_data/google_ads/search_volume/live',
      technicalPayload
    );

    const technicalData = technicalResponse.data.tasks?.[0]?.result || [];

    // 4. Industry-specific and commercial keywords
    const industryKeywords = [
      "best AI automation tools",
      "AI automation for small business",
      "enterprise AI automation",
      "AI automation solutions",
      "automated AI workflows",
      "AI automation companies",
      "AI automation services",
      "intelligent automation software",
      "AI powered automation",
      "business intelligence automation"
    ];

    console.log('Fetching search volume for industry-specific keywords...');
    const industryPayload = [{
      "keywords": industryKeywords,
      "location_code": 2840,
      "language_code": "en"
    }];

    const industryResponse = await client.post(
      '/keywords_data/google_ads/search_volume/live',
      industryPayload
    );

    const industryData = industryResponse.data.tasks?.[0]?.result || [];

    // Combine and analyze all data
    const allKeywords = [
      ...primaryData.map(k => ({...k, category: 'primary'})),
      ...businessData.map(k => ({...k, category: 'business'})), 
      ...technicalData.map(k => ({...k, category: 'technical'})),
      ...industryData.map(k => ({...k, category: 'industry'}))
    ];

    // Sort by search volume
    const sortedKeywords = allKeywords
      .filter(kw => kw.search_volume > 10)
      .sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0));

    console.log('\n=== TOP AI AUTOMATION KEYWORDS ===\n');
    
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
      k.keyword.includes('solutions') ||
      k.keyword.includes('services')
    );

    console.log('\n=== AI AUTOMATION CONTENT STRATEGY ===');
    console.log(`High Volume Keywords (1000+): ${highVolume.length}`);
    console.log(`Medium Volume Keywords (100-999): ${mediumVolume.length}`);
    console.log(`Commercial Intent Keywords: ${commercial.length}`);

    // Save comprehensive results
    const results = {
      contentKeywords: {
        primary: primaryData.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0)),
        business: businessData.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0)),
        technical: technicalData.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0)),
        industry: industryData.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0))
      },
      topKeywordsForContent: topKeywords,
      categories: {
        highVolume: highVolume,
        mediumVolume: mediumVolume,
        commercial: commercial
      },
      contentRecommendations: {
        primaryFocus: "AI automation tools",
        secondaryTargets: [
          "business process automation",
          "AI workflow automation", 
          "intelligent automation software",
          "AI automation platform",
          "automated AI solutions"
        ],
        contentClusters: [
          "Business process automation with AI",
          "Customer service automation solutions",
          "Marketing and sales automation",
          "Technical workflow automation",
          "Enterprise vs SMB automation tools"
        ]
      },
      totalKeywordsAnalyzed: allKeywords.length,
      timestamp: new Date().toISOString()
    };
    
    writeFileSync(
      '/Users/siteoptz/siteoptz/data/ai-automation-keywords.json',
      JSON.stringify(results, null, 2)
    );
    
    console.log('\n✅ AI automation keyword research saved to data/ai-automation-keywords.json');
    console.log(`📊 Total keywords analyzed: ${allKeywords.length}`);
    console.log(`🎯 High-volume targets: ${highVolume.length}`);
    console.log(`💼 Commercial intent keywords: ${commercial.length}`);

  } catch (error) {
    console.error('Error in AI automation keyword research:', error.response?.data || error.message);
  }
}

// Run the comprehensive analysis
getAIAutomationKeywords();