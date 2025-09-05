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

async function getSEOKeywords() {
  try {
    // First, let's get keyword suggestions for our main topic
    const keywordSuggestionsPayload = [{
      "keyword": "AI SEO tools",
      "location_code": 2840, // United States
      "language_code": "en",
      "include_seed_keyword": true,
      "include_serp_info": true,
      "include_keyword_info": true
    }];

    console.log('Fetching keyword suggestions for AI SEO tools...');
    const suggestionsResponse = await client.post(
      '/keywords_data/google_ads/keywords_for_keywords/live',
      keywordSuggestionsPayload
    );

    const keywords = suggestionsResponse.data.tasks?.[0]?.result?.[0]?.items || [];
    
    // Sort by search volume and relevance
    const sortedKeywords = keywords
      .filter(kw => kw.keyword_info?.search_volume > 100)
      .sort((a, b) => {
        const volumeA = a.keyword_info?.search_volume || 0;
        const volumeB = b.keyword_info?.search_volume || 0;
        return volumeB - volumeA;
      });

    // Get related searches for content ideas
    const relatedSearchesPayload = [{
      "keyword": "best AI SEO tools 2025",
      "location_code": 2840,
      "language_code": "en",
      "depth": 2,
      "include_seed_keyword": false,
      "include_serp_info": true
    }];

    console.log('Fetching related searches...');
    const relatedResponse = await client.post(
      '/keywords_data/google_ads/keywords_for_keywords/live',
      relatedSearchesPayload
    );

    const relatedKeywords = relatedResponse.data.tasks?.[0]?.result?.[0]?.items || [];

    // Get search volume data for specific keywords we want to target
    const targetKeywords = [
      "AI SEO tools",
      "best AI SEO tools",
      "AI powered SEO software",
      "SEO AI tools comparison",
      "artificial intelligence SEO",
      "AI content optimization tools",
      "AI keyword research tools",
      "AI SEO audit tools",
      "machine learning SEO",
      "AI SEO automation",
      "AI SEO content writer",
      "AI technical SEO tools"
    ];

    const searchVolumePayload = [{
      "keywords": targetKeywords,
      "location_code": 2840,
      "language_code": "en"
    }];

    console.log('Fetching search volume data...');
    const volumeResponse = await client.post(
      '/keywords_data/google_ads/search_volume/live',
      searchVolumePayload
    );

    const volumeData = volumeResponse.data.tasks?.[0]?.result || [];

    // Format and display results
    console.log('\n=== PRIMARY KEYWORD ANALYSIS ===\n');
    console.log('Primary Keyword: AI SEO tools');
    
    const primaryData = volumeData.find(k => k.keyword === "AI SEO tools");
    if (primaryData) {
      console.log(`Search Volume: ${primaryData.search_volume}`);
      console.log(`Competition: ${primaryData.competition}`);
      console.log(`CPC: $${primaryData.cpc}`);
    }

    console.log('\n=== TOP SECONDARY KEYWORDS ===\n');
    
    // Select best secondary keywords based on volume and relevance
    const secondaryKeywords = sortedKeywords
      .slice(0, 10)
      .map(kw => ({
        keyword: kw.keyword,
        volume: kw.keyword_info?.search_volume,
        competition: kw.keyword_info?.competition,
        cpc: kw.keyword_info?.cpc
      }));

    secondaryKeywords.forEach((kw, index) => {
      console.log(`${index + 1}. ${kw.keyword}`);
      console.log(`   Volume: ${kw.volume} | Competition: ${kw.competition} | CPC: $${kw.cpc}`);
    });

    console.log('\n=== LONG-TAIL OPPORTUNITIES ===\n');
    
    const longTailKeywords = sortedKeywords
      .filter(kw => kw.keyword.split(' ').length >= 4)
      .slice(0, 15)
      .map(kw => ({
        keyword: kw.keyword,
        volume: kw.keyword_info?.search_volume,
        difficulty: kw.keyword_info?.competition
      }));

    longTailKeywords.forEach((kw, index) => {
      console.log(`${index + 1}. ${kw.keyword} (Vol: ${kw.volume})`);
    });

    console.log('\n=== CONTENT CLUSTER IDEAS ===\n');
    
    // Group keywords by intent/topic
    const clusters = {
      comparison: [],
      tools: [],
      howTo: [],
      best: [],
      free: [],
      enterprise: []
    };

    sortedKeywords.forEach(kw => {
      const keyword = kw.keyword.toLowerCase();
      if (keyword.includes('vs') || keyword.includes('compare') || keyword.includes('comparison')) {
        clusters.comparison.push(kw.keyword);
      } else if (keyword.includes('how to') || keyword.includes('guide')) {
        clusters.howTo.push(kw.keyword);
      } else if (keyword.includes('best') || keyword.includes('top')) {
        clusters.best.push(kw.keyword);
      } else if (keyword.includes('free')) {
        clusters.free.push(kw.keyword);
      } else if (keyword.includes('enterprise') || keyword.includes('business')) {
        clusters.enterprise.push(kw.keyword);
      } else if (keyword.includes('tool') || keyword.includes('software')) {
        clusters.tools.push(kw.keyword);
      }
    });

    Object.entries(clusters).forEach(([cluster, keywords]) => {
      if (keywords.length > 0) {
        console.log(`\n${cluster.toUpperCase()} Intent (${keywords.length} keywords):`);
        keywords.slice(0, 5).forEach(kw => console.log(`  - ${kw}`));
      }
    });

    console.log('\n=== RECOMMENDED KEYWORD STRATEGY ===\n');
    console.log('Primary Keyword: AI SEO tools');
    console.log('Secondary Keywords (Top 4):');
    console.log('  1. Best AI SEO tools 2025');
    console.log('  2. AI content optimization tools');
    console.log('  3. SEO automation software');
    console.log('  4. AI keyword research tools');
    
    console.log('\nLSI/Supporting Keywords:');
    console.log('  - machine learning SEO');
    console.log('  - artificial intelligence content optimization');
    console.log('  - automated SEO tools');
    console.log('  - AI-powered technical SEO');
    console.log('  - SEO AI comparison');

    // Save results to file for reference
    const results = {
      primary: primaryData,
      secondary: secondaryKeywords,
      longTail: longTailKeywords,
      clusters: clusters,
      timestamp: new Date().toISOString()
    };

    writeFileSync(
      '/Users/siteoptz/siteoptz/data/seo-category-keywords.json',
      JSON.stringify(results, null, 2)
    );

    console.log('\n✅ Results saved to data/seo-category-keywords.json');

  } catch (error) {
    console.error('Error fetching keywords:', error.response?.data || error.message);
  }
}

// Run the analysis
getSEOKeywords();