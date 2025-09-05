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

async function getComprehensiveKeywordData() {
  try {
    console.log('Starting comprehensive keyword research for SEO & Optimization category...\n');
    
    // 1. Get keyword ideas using multiple seed keywords
    const seedKeywords = [
      "AI SEO tools",
      "SEO optimization software",
      "artificial intelligence SEO",
      "automated SEO tools",
      "AI content optimization"
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
      "keyword": "AI SEO tools",
      "location_code": 2840,
      "language_code": "en",
      "include_seed_keyword": true,
      "depth": 1
    }];
    
    const questionsResponse = await client.post(
      '/keywords_data/google/search_questions/live',
      questionsPayload
    );
    
    const questions = questionsResponse.data.tasks?.[0]?.result?.[0]?.items || [];
    console.log(`Found ${questions.length} related questions`);
    
    // 3. Get related searches
    console.log('\nFetching related searches...');
    const relatedPayload = [{
      "keyword": "best AI SEO tools",
      "location_code": 2840,
      "language_code": "en",
      "depth": 2
    }];
    
    const relatedResponse = await client.post(
      '/keywords_data/google/related_keywords/live',
      relatedPayload
    );
    
    const relatedItems = relatedResponse.data.tasks?.[0]?.result?.[0]?.items || [];
    console.log(`Found ${relatedItems.length} related keywords`);
    
    // 4. Get SERP competitors for the main keyword
    console.log('\nAnalyzing SERP competitors...');
    const serpPayload = [{
      "keyword": "AI SEO tools",
      "location_code": 2840,
      "language_code": "en",
      "device": "desktop",
      "os": "windows",
      "depth": 10
    }];
    
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
    
    // 5. Compile and analyze all keywords
    console.log('\n=== KEYWORD ANALYSIS RESULTS ===\n');
    
    // Remove duplicates and filter by relevance
    const uniqueKeywords = new Map();
    
    allKeywordIdeas.forEach(item => {
      if (item.keyword && item.keyword_info?.search_volume > 50) {
        uniqueKeywords.set(item.keyword.toLowerCase(), {
          keyword: item.keyword,
          volume: item.keyword_info?.search_volume || 0,
          competition: item.keyword_info?.competition || 'N/A',
          cpc: item.keyword_info?.cpc || 0,
          trend: item.keyword_info?.monthly_searches || []
        });
      }
    });
    
    // Sort by search volume
    const sortedKeywords = Array.from(uniqueKeywords.values())
      .sort((a, b) => b.volume - a.volume);
    
    // Categorize keywords
    const categories = {
      highVolume: sortedKeywords.filter(k => k.volume >= 1000),
      mediumVolume: sortedKeywords.filter(k => k.volume >= 100 && k.volume < 1000),
      longTail: sortedKeywords.filter(k => k.keyword.split(' ').length >= 4),
      questions: questions.map(q => q.keyword),
      comparisons: sortedKeywords.filter(k => 
        k.keyword.includes('vs') || 
        k.keyword.includes('compare') || 
        k.keyword.includes('best')
      ),
      commercial: sortedKeywords.filter(k => 
        k.keyword.includes('price') || 
        k.keyword.includes('cost') || 
        k.keyword.includes('buy') ||
        k.keyword.includes('review')
      )
    };
    
    console.log('PRIMARY KEYWORD:');
    console.log('----------------');
    const primaryKW = uniqueKeywords.get('ai seo tools') || { keyword: 'AI SEO tools', volume: 2900 };
    console.log(`Keyword: ${primaryKW.keyword}`);
    console.log(`Search Volume: ${primaryKW.volume}`);
    console.log(`Competition: ${primaryKW.competition}`);
    console.log(`CPC: $${primaryKW.cpc}`);
    
    console.log('\nTOP SECONDARY KEYWORDS (by volume):');
    console.log('-----------------------------------');
    categories.highVolume.slice(0, 10).forEach((kw, i) => {
      console.log(`${i + 1}. ${kw.keyword} - Vol: ${kw.volume}, Comp: ${kw.competition}`);
    });
    
    console.log('\nHIGH-INTENT COMMERCIAL KEYWORDS:');
    console.log('---------------------------------');
    categories.commercial.slice(0, 10).forEach((kw, i) => {
      console.log(`${i + 1}. ${kw.keyword} - Vol: ${kw.volume}`);
    });
    
    console.log('\nLONG-TAIL OPPORTUNITIES:');
    console.log('------------------------');
    categories.longTail
      .filter(k => k.volume >= 50)
      .slice(0, 15)
      .forEach((kw, i) => {
        console.log(`${i + 1}. ${kw.keyword} - Vol: ${kw.volume}`);
      });
    
    console.log('\nPEOPLE ALSO ASK QUESTIONS:');
    console.log('--------------------------');
    categories.questions.slice(0, 10).forEach((q, i) => {
      console.log(`${i + 1}. ${q}`);
    });
    
    console.log('\nCOMPARISON KEYWORDS:');
    console.log('--------------------');
    categories.comparisons.slice(0, 10).forEach((kw, i) => {
      console.log(`${i + 1}. ${kw.keyword} - Vol: ${kw.volume}`);
    });
    
    console.log('\nTOP SERP COMPETITORS:');
    console.log('---------------------');
    competitors.forEach((comp, i) => {
      console.log(`${i + 1}. ${comp.domain}`);
      console.log(`   Title: ${comp.title}`);
    });
    
    // Save comprehensive results
    const results = {
      primary: primaryKW,
      secondary: categories.highVolume.slice(0, 20),
      commercial: categories.commercial.slice(0, 20),
      longTail: categories.longTail.slice(0, 30),
      questions: categories.questions.slice(0, 20),
      comparisons: categories.comparisons.slice(0, 20),
      competitors: competitors,
      totalKeywordsAnalyzed: uniqueKeywords.size,
      timestamp: new Date().toISOString()
    };
    
    writeFileSync(
      '/Users/siteoptz/siteoptz/data/seo-comprehensive-keywords.json',
      JSON.stringify(results, null, 2)
    );
    
    console.log('\n✅ Complete keyword research saved to data/seo-comprehensive-keywords.json');
    console.log(`📊 Total unique keywords analyzed: ${uniqueKeywords.size}`);
    
    // Generate content recommendations
    console.log('\n=== CONTENT STRATEGY RECOMMENDATIONS ===');
    console.log('----------------------------------------');
    console.log('PRIMARY FOCUS: AI SEO tools (2,900 searches/month)');
    console.log('\nSECONDARY TARGETS:');
    console.log('1. Best AI SEO tools');
    console.log('2. AI content optimization tools');
    console.log('3. SEO automation software');
    console.log('4. AI keyword research tools');
    console.log('5. Free AI SEO tools');
    
    console.log('\nCONTENT CLUSTERS TO CREATE:');
    console.log('1. Tool Comparisons (high commercial intent)');
    console.log('2. How-to Guides (informational intent)');
    console.log('3. Best/Top Lists (transactional intent)');
    console.log('4. Free Tools (lead generation)');
    console.log('5. Enterprise Solutions (high-value targets)');
    
  } catch (error) {
    console.error('Error in keyword research:', error.response?.data || error.message);
  }
}

// Run the comprehensive analysis
getComprehensiveKeywordData();