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

async function getIndustryAIKeywords() {
  try {
    console.log('Starting industry-specific AI keyword research...\n');
    
    // Healthcare AI Keywords
    const healthcareKeywords = [
      "AI in healthcare",
      "healthcare artificial intelligence",
      "medical AI tools",
      "AI medical diagnosis",
      "healthcare machine learning",
      "AI patient care",
      "medical artificial intelligence",
      "healthcare AI solutions", 
      "AI drug discovery",
      "AI radiology",
      "healthcare automation",
      "AI clinical decision support",
      "medical AI software",
      "AI hospital management",
      "healthcare AI implementation",
      "AI medical imaging",
      "AI electronic health records",
      "AI telemedicine",
      "AI healthcare analytics",
      "medical AI algorithms"
    ];

    // Manufacturing AI Keywords  
    const manufacturingKeywords = [
      "AI in manufacturing",
      "manufacturing artificial intelligence",
      "AI factory automation",
      "manufacturing AI solutions",
      "AI predictive maintenance",
      "smart manufacturing AI",
      "AI quality control",
      "manufacturing machine learning",
      "AI production optimization",
      "industrial AI tools",
      "AI supply chain management",
      "manufacturing AI software",
      "AI robotics manufacturing",
      "AI process automation",
      "manufacturing AI analytics",
      "AI inventory management",
      "smart factory AI",
      "AI manufacturing efficiency",
      "AI production planning",
      "manufacturing AI implementation"
    ];

    // Finance AI Keywords
    const financeKeywords = [
      "AI in finance",
      "financial artificial intelligence", 
      "AI financial services",
      "fintech AI solutions",
      "AI fraud detection",
      "AI algorithmic trading",
      "financial AI tools",
      "AI risk management",
      "AI banking solutions",
      "financial machine learning",
      "AI credit scoring",
      "AI financial planning",
      "robo advisor AI",
      "AI insurance solutions",
      "financial AI software",
      "AI investment management",
      "AI financial analytics",
      "AI compliance monitoring",
      "AI financial forecasting",
      "AI wealth management"
    ];

    const allKeywordSets = {
      healthcare: healthcareKeywords,
      manufacturing: manufacturingKeywords,
      finance: financeKeywords
    };

    const results = {};

    for (const [industry, keywords] of Object.entries(allKeywordSets)) {
      console.log(`Fetching search volume for ${industry} AI keywords...`);
      
      const payload = [{
        "keywords": keywords,
        "location_code": 2840, // United States
        "language_code": "en"
      }];

      const response = await client.post(
        '/keywords_data/google_ads/search_volume/live',
        payload
      );

      const data = response.data.tasks?.[0]?.result || [];
      
      // Sort by search volume and get top keywords
      const sortedKeywords = data
        .filter(item => item.search_volume !== null && item.search_volume > 100)
        .sort((a, b) => b.search_volume - a.search_volume)
        .slice(0, 15);

      results[industry] = {
        totalKeywords: keywords.length,
        validKeywords: sortedKeywords.length,
        topKeywords: sortedKeywords.map(item => ({
          keyword: item.keyword,
          searchVolume: item.search_volume,
          competition: item.competition_index,
          cpc: item.cpc
        }))
      };

      console.log(`✓ ${industry}: Found ${sortedKeywords.length} keywords with volume > 100`);
      
      // Add delay to respect API limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Get additional long-tail keywords for each industry
    console.log('\nFetching related keywords...');
    
    for (const [industry, keywordData] of Object.entries(results)) {
      if (keywordData.topKeywords.length > 0) {
        const topKeyword = keywordData.topKeywords[0].keyword;
        
        try {
          const relatedPayload = [{
            "keyword": topKeyword,
            "location_code": 2840,
            "language_code": "en",
            "include_serp_info": false,
            "limit": 50,
            "filters": [
              ["search_volume", ">=", 200],
              ["keyword_difficulty", "<=", 70]
            ],
            "order_by": ["search_volume,desc"]
          }];

          const relatedResponse = await client.post(
            '/keywords_data/google_ads/keywords_for_keywords/live',
            relatedPayload
          );

          const relatedData = relatedResponse.data.tasks?.[0]?.result || [];
          
          results[industry].relatedKeywords = relatedData
            .slice(0, 20)
            .map(item => ({
              keyword: item.keyword,
              searchVolume: item.search_volume,
              competition: item.competition_index,
              difficulty: item.keyword_difficulty
            }));

          console.log(`✓ ${industry}: Found ${relatedData.length} related keywords`);
          
        } catch (error) {
          console.log(`! Could not fetch related keywords for ${industry}`);
          results[industry].relatedKeywords = [];
        }
        
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }

    // Save results
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `industry-ai-keywords-${timestamp}.json`;
    
    writeFileSync(filename, JSON.stringify(results, null, 2));
    console.log(`\n✅ Results saved to ${filename}`);

    // Print summary
    console.log('\n📊 KEYWORD RESEARCH SUMMARY');
    console.log('================================');
    
    for (const [industry, data] of Object.entries(results)) {
      console.log(`\n${industry.toUpperCase()}:`);
      console.log(`• Top 5 keywords by volume:`);
      
      data.topKeywords.slice(0, 5).forEach((kw, i) => {
        console.log(`  ${i + 1}. "${kw.keyword}" - ${kw.searchVolume.toLocaleString()} searches/month`);
      });
      
      if (data.relatedKeywords && data.relatedKeywords.length > 0) {
        console.log(`• Top related keywords:`);
        data.relatedKeywords.slice(0, 3).forEach((kw, i) => {
          console.log(`  ${i + 1}. "${kw.keyword}" - ${kw.searchVolume.toLocaleString()} searches/month`);
        });
      }
    }

    return results;

  } catch (error) {
    console.error('Error in keyword research:', error.response?.data || error.message);
    throw error;
  }
}

// Run the research
getIndustryAIKeywords()
  .then(results => {
    console.log('\n🎉 Industry AI keyword research completed successfully!');
  })
  .catch(error => {
    console.error('❌ Research failed:', error.message);
    process.exit(1);
  });