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

async function getPaidSearchKeywords() {
  try {
    console.log('Starting comprehensive keyword research for Paid Search & PPC category...\n');
    
    // 1. Get keyword ideas using multiple seed keywords
    const seedKeywords = [
      "AI PPC tools",
      "paid search automation",
      "AI Google Ads tools", 
      "PPC optimization software",
      "automated bid management"
    ];
    
    const allKeywordIdeas = [];
    
    for (const seed of seedKeywords) {
      console.log(`Fetching keyword ideas for: ${seed}`);
      
      const payload = [{
        "keyword": seed,
        "location_code": 2840, // United States
        "language_code": "en",
        "search_partners": false,
        "limit": 100,
        "include_adult_keywords": false
      }];
      
      try {
        const response = await client.post(
          '/keywords_data/google/keywords_for_keywords/live',
          payload
        );
        
        const items = response.data.tasks?.[0]?.result?.[0]?.items || [];
        allKeywordIdeas.push(...items);
        console.log(`  Found ${items.length} keyword ideas`);
      } catch (err) {
        console.log(`  Error fetching ideas for ${seed}`);
      }
    }
    
    // 2. Get search questions
    console.log('\nFetching search questions...');
    const questionsPayload = [{
      "keyword": "AI PPC tools",
      "location_code": 2840,
      "language_code": "en",
      "include_seed_keyword": true,
      "depth": 1
    }];
    
    try {
      const questionsResponse = await client.post(
        '/keywords_data/google/search_questions/live',
        questionsPayload
      );
      
      const questions = questionsResponse.data.tasks?.[0]?.result?.[0]?.items || [];
      console.log(`Found ${questions.length} related questions`);
    } catch (err) {
      console.log('Error fetching questions');
    }
    
    // 3. Get related searches
    console.log('\nFetching related searches...');
    const relatedPayload = [{
      "keyword": "best AI PPC tools",
      "location_code": 2840,
      "language_code": "en",
      "depth": 2
    }];
    
    try {
      const relatedResponse = await client.post(
        '/keywords_data/google/related_keywords/live',
        relatedPayload
      );
      
      const relatedItems = relatedResponse.data.tasks?.[0]?.result?.[0]?.items || [];
      console.log(`Found ${relatedItems.length} related keywords`);
    } catch (err) {
      console.log('Error fetching related searches');
    }
    
    // 4. Get SERP competitors for the main keyword
    console.log('\nAnalyzing SERP competitors...');
    const serpPayload = [{
      "keyword": "AI PPC tools",
      "location_code": 2840,
      "language_code": "en",
      "device": "desktop",
      "os": "windows",
      "depth": 10
    }];
    
    try {
      const serpResponse = await client.post(
        '/serp/google/organic/live/regular',
        serpPayload
      );
      
      const serpResults = serpResponse.data.tasks?.[0]?.result?.[0]?.items || [];
      const competitors = serpResults.slice(0, 5).map(item => ({
        domain: item.domain,
        title: item.title,
        url: item.url
      }));
      
      console.log('\nTOP SERP COMPETITORS:');
      console.log('---------------------');
      competitors.forEach((comp, i) => {
        console.log(`${i + 1}. ${comp.domain}`);
        console.log(`   Title: ${comp.title}`);
      });
    } catch (err) {
      console.log('Error fetching SERP data');
    }
    
    // 5. Get search volume data for specific keywords we want to target
    const targetKeywords = [
      "AI PPC tools",
      "best AI PPC tools",
      "AI Google Ads tools",
      "PPC automation software",
      "AI bid management tools",
      "automated PPC optimization",
      "AI Facebook Ads tools",
      "PPC AI platforms",
      "machine learning PPC",
      "AI advertising tools",
      "smart bidding tools",
      "PPC management software"
    ];

    const searchVolumePayload = [{
      "keywords": targetKeywords,
      "location_code": 2840,
      "language_code": "en"
    }];

    console.log('\nFetching search volume data...');
    try {
      const volumeResponse = await client.post(
        '/keywords_data/google_ads/search_volume/live',
        searchVolumePayload
      );

      const volumeData = volumeResponse.data.tasks?.[0]?.result || [];
      
      console.log('\n=== PRIMARY KEYWORD ANALYSIS ===\n');
      console.log('Primary Keyword: AI PPC tools');
      
      const primaryData = volumeData.find(k => k.keyword === "AI PPC tools");
      if (primaryData) {
        console.log(`Search Volume: ${primaryData.search_volume}`);
        console.log(`Competition: ${primaryData.competition}`);
        console.log(`CPC: $${primaryData.cpc}`);
      }

      console.log('\n=== TOP SECONDARY KEYWORDS ===\n');
      
      // Sort by search volume
      const sortedKeywords = volumeData
        .filter(kw => kw.search_volume > 50)
        .sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0));

      sortedKeywords.forEach((kw, index) => {
        console.log(`${index + 1}. ${kw.keyword}`);
        console.log(`   Volume: ${kw.search_volume} | Competition: ${kw.competition} | CPC: $${kw.cpc}`);
      });

      // Categorize keywords
      const categories = {
        highVolume: sortedKeywords.filter(k => k.search_volume >= 1000),
        mediumVolume: sortedKeywords.filter(k => k.search_volume >= 100 && k.search_volume < 1000),
        longTail: sortedKeywords.filter(k => k.keyword.split(' ').length >= 4),
        commercial: sortedKeywords.filter(k => 
          k.keyword.includes('price') || 
          k.keyword.includes('cost') || 
          k.keyword.includes('buy') ||
          k.keyword.includes('review') ||
          k.keyword.includes('best')
        )
      };

      console.log('\n=== CONTENT STRATEGY RECOMMENDATIONS ===');
      console.log('----------------------------------------');
      console.log('PRIMARY FOCUS: AI PPC tools');
      console.log('\nSECONDARY TARGETS:');
      console.log('1. Best AI PPC tools');
      console.log('2. AI Google Ads tools');
      console.log('3. PPC automation software');
      console.log('4. AI bid management tools');
      console.log('5. Automated PPC optimization');
      
      console.log('\nCONTENT CLUSTERS TO CREATE:');
      console.log('1. Tool Comparisons (high commercial intent)');
      console.log('2. Platform-specific guides (Google Ads, Facebook Ads)');
      console.log('3. Best/Top Lists (transactional intent)');
      console.log('4. Automation guides (informational intent)');
      console.log('5. Enterprise solutions (high-value targets)');

      // Save comprehensive results
      const results = {
        primary: primaryData || { keyword: 'AI PPC tools', search_volume: 0 },
        secondary: sortedKeywords.slice(0, 20),
        categories: categories,
        totalKeywordsAnalyzed: sortedKeywords.length,
        timestamp: new Date().toISOString()
      };
      
      writeFileSync(
        '/Users/siteoptz/siteoptz/data/paid-search-keywords.json',
        JSON.stringify(results, null, 2)
      );
      
      console.log('\n✅ Complete keyword research saved to data/paid-search-keywords.json');
      console.log(`📊 Total unique keywords analyzed: ${sortedKeywords.length}`);

    } catch (error) {
      console.log('Error fetching search volume data:', error.response?.data || error.message);
    }
    
  } catch (error) {
    console.error('Error in keyword research:', error.response?.data || error.message);
  }
}

// Run the comprehensive analysis
getPaidSearchKeywords();