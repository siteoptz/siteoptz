const https = require('https');

// DataForSEO API credentials
const DATAFORSEO_USERNAME = 'antonio@siteoptz.com';
const DATAFORSEO_PASSWORD = '8215cb0ce338b385';

// Function to research keywords using DataForSEO API
async function researchKeywords(keywords) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      keywords: keywords,
      location_code: 2840, // United States
      language_code: "en",
      search_partners: false,
      include_serp_info: true,
      include_subdomains: true
    });

    const options = {
      hostname: 'api.dataforseo.com',
      port: 443,
      path: '/v3/keywords_data/google/keyword_suggestions',
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(DATAFORSEO_USERNAME + ':' + DATAFORSEO_PASSWORD).toString('base64'),
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Function to get keyword suggestions
async function getKeywordSuggestions(seedKeywords) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      keywords: seedKeywords,
      location_code: 2840, // United States
      language_code: "en",
      search_partners: false,
      include_serp_info: true,
      include_subdomains: true
    });

    const options = {
      hostname: 'api.dataforseo.com',
      port: 443,
      path: '/v3/keywords_data/google/keyword_suggestions',
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(DATAFORSEO_USERNAME + ':' + DATAFORSEO_PASSWORD).toString('base64'),
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Priority AI Tool Comparison Keywords to Research
const priorityKeywords = [
  // High-Volume Comparison Keywords
  'ChatGPT vs Jasper AI',
  'Surfer SEO vs Frase',
  'Hootsuite AI vs Buffer AI',
  'Midjourney vs DALL-E',
  'Ahrefs AI vs Semrush AI',
  
  // Review Keywords
  'Jasper AI review',
  'Surfer SEO review',
  'ChatGPT alternatives',
  'Jasper AI alternatives',
  'best AI writing tools',
  
  // Pricing Keywords
  'Jasper AI pricing',
  'Surfer SEO pricing',
  'ChatGPT pricing',
  'AI writing tools cost',
  'SEO software pricing',
  
  // 2025 Specific Keywords
  'ChatGPT vs Jasper AI 2025',
  'best AI writing tools 2025',
  'Jasper AI review 2025',
  'Surfer SEO review 2025',
  'AI tools 2025'
];

// Function to analyze keyword data from DataForSEO
function analyzeKeywordData(apiResponse) {
  const keywords = [];
  
  if (apiResponse && apiResponse.tasks && apiResponse.tasks[0] && apiResponse.tasks[0].result) {
    apiResponse.tasks[0].result.forEach(item => {
      if (item.items) {
        item.items.forEach(keywordData => {
          const keyword = {
            keyword: keywordData.keyword,
            searchVolume: keywordData.search_volume || 0,
            difficulty: keywordData.keyword_difficulty || 50,
            cpc: keywordData.cpc || 0,
            competition: keywordData.competition || 0,
            relatedKeywords: keywordData.related_keywords || [],
            serpFeatures: keywordData.serp_features || []
          };
          
          // Calculate opportunity score
          const volumeScore = Math.log10(Math.max(keyword.searchVolume, 1)) * 10;
          const difficultyScore = (100 - keyword.difficulty) * 0.5;
          const cpcScore = keyword.cpc * 20;
          keyword.opportunity = Math.round(volumeScore + difficultyScore + cpcScore);
          
          // Classify intent
          keyword.intent = classifyIntent(keyword.keyword);
          keyword.category = classifyCategory(keyword.keyword);
          
          keywords.push(keyword);
        });
      }
    });
  }
  
  return keywords.sort((a, b) => b.opportunity - a.opportunity);
}

// Function to classify search intent
function classifyIntent(keyword) {
  if (keyword.includes('vs') || keyword.includes('versus')) return 'Comparison';
  if (keyword.includes('review')) return 'Review';
  if (keyword.includes('best')) return 'Research';
  if (keyword.includes('alternatives')) return 'Alternative';
  if (keyword.includes('pricing') || keyword.includes('cost')) return 'Commercial';
  if (keyword.includes('how to') || keyword.includes('guide')) return 'How-to';
  return 'Informational';
}

// Function to classify keyword category
function classifyCategory(keyword) {
  if (keyword.includes('writing') || keyword.includes('content') || keyword.includes('Jasper') || keyword.includes('Copy.ai')) return 'Content Creation';
  if (keyword.includes('SEO') || keyword.includes('Surfer') || keyword.includes('Frase') || keyword.includes('Ahrefs')) return 'SEO & Optimization';
  if (keyword.includes('social') || keyword.includes('Hootsuite') || keyword.includes('Buffer')) return 'Social Media';
  if (keyword.includes('email') || keyword.includes('Mailchimp') || keyword.includes('HubSpot')) return 'Email Marketing';
  if (keyword.includes('image') || keyword.includes('visual') || keyword.includes('Midjourney') || keyword.includes('DALL-E')) return 'Visual Content';
  return 'General';
}

// Function to get intent strategy
function getIntentStrategy(intent) {
  const strategies = {
    'Comparison': 'Create detailed comparison tables, feature analysis, and side-by-side evaluations',
    'Review': 'Provide comprehensive tool analysis, user experience, and real-world testing',
    'Research': 'Create curated lists, category overviews, and decision frameworks',
    'Alternative': 'Focus on tool alternatives, migration guides, and feature comparisons',
    'Commercial': 'Include pricing tables, ROI analysis, and purchase recommendations',
    'How-to': 'Provide step-by-step guides, tutorials, and implementation tips',
    'Informational': 'Create educational content, definitions, and concept explanations'
  };
  return strategies[intent] || 'General informational content';
}

// Function to create markdown report
function createRealKeywordReport(keywordAnalysis) {
  let markdown = `# Real DataForSEO Keyword Research Results

## Executive Summary
*Generated on: ${new Date().toLocaleString()}*
*Data Source: DataForSEO API*

This report contains real keyword research data from DataForSEO API for AI tool comparison content strategy.

## Top 20 High-Volume Keywords by Opportunity Score

`;

  const topKeywords = keywordAnalysis.slice(0, 20);
  
  topKeywords.forEach((keyword, index) => {
    markdown += `${index + 1}. **${keyword.keyword}**
   - Search Volume: ${keyword.searchVolume.toLocaleString()}
   - Difficulty: ${keyword.difficulty}/100
   - CPC: $${keyword.cpc}
   - Competition: ${keyword.competition}
   - Opportunity Score: ${keyword.opportunity}
   - Intent: ${keyword.intent}
   - Category: ${keyword.category}

`;
  });

  markdown += `## Category Analysis

`;

  const categories = {};
  keywordAnalysis.forEach(keyword => {
    if (!categories[keyword.category]) {
      categories[keyword.category] = { keywords: [], totalVolume: 0, avgDifficulty: 0, avgCPC: 0 };
    }
    categories[keyword.category].keywords.push(keyword);
    categories[keyword.category].totalVolume += keyword.searchVolume;
    categories[keyword.category].avgDifficulty += keyword.difficulty;
    categories[keyword.category].avgCPC += keyword.cpc;
  });

  Object.entries(categories).forEach(([category, data]) => {
    const avgDifficulty = Math.round(data.avgDifficulty / data.keywords.length);
    const avgCPC = Math.round(data.avgCPC / data.keywords.length * 100) / 100;
    
    markdown += `### ${category}
**Total Search Volume:** ${data.totalVolume.toLocaleString()}
**Average Difficulty:** ${avgDifficulty}/100
**Average CPC:** $${avgCPC}
**Number of Keywords:** ${data.keywords.length}

**Top Keywords:**
`;
    
    data.keywords.slice(0, 5).forEach((keyword, index) => {
      markdown += `${index + 1}. ${keyword.keyword} (${keyword.searchVolume.toLocaleString()} searches, ${keyword.opportunity} opportunity)
`;
    });
    
    markdown += `
`;
  });

  markdown += `## Search Intent Analysis

`;

  const intentAnalysis = {};
  keywordAnalysis.forEach(keyword => {
    if (!intentAnalysis[keyword.intent]) {
      intentAnalysis[keyword.intent] = { count: 0, totalVolume: 0, avgCPC: 0 };
    }
    intentAnalysis[keyword.intent].count++;
    intentAnalysis[keyword.intent].totalVolume += keyword.searchVolume;
    intentAnalysis[keyword.intent].avgCPC += keyword.cpc;
  });

  Object.entries(intentAnalysis).forEach(([intent, data]) => {
    const avgCPC = Math.round(data.avgCPC / data.count * 100) / 100;
    
    markdown += `### ${intent} Intent (${data.count} keywords)
- Total Search Volume: ${data.totalVolume.toLocaleString()}
- Average CPC: $${avgCPC}
- Content Strategy: ${getIntentStrategy(intent)}

`;
  });

  markdown += `## Revenue Potential Analysis

### High-CPC Keywords (>$3)
`;

  const highCPCKeywords = keywordAnalysis.filter(k => k.cpc > 3).slice(0, 10);
  highCPCKeywords.forEach((keyword, index) => {
    markdown += `${index + 1}. **${keyword.keyword}** - $${keyword.cpc} CPC (${keyword.searchVolume.toLocaleString()} searches)
`;
  });

  markdown += `
### Traffic Projections
- **Total Search Volume:** ${keywordAnalysis.reduce((sum, k) => sum + k.searchVolume, 0).toLocaleString()}
- **Estimated Organic Traffic (5% CTR):** ${Math.round(keywordAnalysis.reduce((sum, k) => sum + k.searchVolume, 0) * 0.05).toLocaleString()}
- **Estimated Revenue (2% conversion, $50 avg):** $${Math.round(keywordAnalysis.reduce((sum, k) => sum + k.searchVolume, 0) * 0.05 * 0.02 * 50).toLocaleString()}

## Content Strategy Recommendations

### Immediate Action Items (Week 1-2)
`;

  const immediateKeywords = keywordAnalysis.filter(k => k.searchVolume > 1000 && k.difficulty < 60).slice(0, 10);
  immediateKeywords.forEach((keyword, index) => {
    markdown += `${index + 1}. **${keyword.keyword}** (${keyword.searchVolume.toLocaleString()} searches, ${keyword.difficulty} difficulty)
`;
  });

  markdown += `
### Content Calendar (Month 1-3)
- **Week 1-2:** Create content for top 5 high-volume keywords
- **Week 3-4:** Focus on medium-difficulty, high-CPC keywords
- **Week 5-8:** Expand to category-specific content
- **Week 9-12:** Create comprehensive comparison guides

## Technical Insights

### SERP Features Analysis
`;

  const serpFeatures = {};
  keywordAnalysis.forEach(keyword => {
    keyword.serpFeatures.forEach(feature => {
      if (!serpFeatures[feature]) serpFeatures[feature] = 0;
      serpFeatures[feature]++;
    });
  });

  Object.entries(serpFeatures).forEach(([feature, count]) => {
    markdown += `- **${feature}:** ${count} keywords
`;
  });

  markdown += `
### Competition Analysis
- **Low Competition (< 30):** ${keywordAnalysis.filter(k => k.competition < 30).length} keywords
- **Medium Competition (30-60):** ${keywordAnalysis.filter(k => k.competition >= 30 && k.competition <= 60).length} keywords
- **High Competition (> 60):** ${keywordAnalysis.filter(k => k.competition > 60).length} keywords

---
*This report provides real keyword data from DataForSEO API to guide your AI tool comparison content strategy.*
`;

  return markdown;
}

// Main function
async function main() {
  console.log('🚀 Starting Real DataForSEO Keyword Research\n');
  console.log('📊 Using DataForSEO API with provided credentials\n');
  
  try {
    console.log('🔍 Researching priority keywords...');
    const keywordData = await researchKeywords(priorityKeywords);
    
    console.log('📊 Analyzing keyword data...');
    const keywordAnalysis = analyzeKeywordData(keywordData);
    
    console.log('📄 Generating comprehensive report...');
    const report = createRealKeywordReport(keywordAnalysis);
    
    // Save report
    const fs = require('fs');
    fs.writeFileSync('real_dataforseo_keyword_research.md', report);
    
    console.log('\n✅ Real DataForSEO Keyword Research complete!');
    console.log('📁 Report saved as: real_dataforseo_keyword_research.md');
    
    console.log('\n📊 Summary:');
    console.log(`- Researched ${priorityKeywords.length} priority keywords`);
    console.log(`- Found ${keywordAnalysis.length} keyword variations`);
    console.log(`- Total search volume: ${keywordAnalysis.reduce((sum, k) => sum + k.searchVolume, 0).toLocaleString()}`);
    console.log(`- Average CPC: $${Math.round(keywordAnalysis.reduce((sum, k) => sum + k.cpc, 0) / keywordAnalysis.length * 100) / 100}`);
    
    console.log('\n🎯 Top 5 High-Volume Keywords:');
    keywordAnalysis.slice(0, 5).forEach((keyword, index) => {
      console.log(`${index + 1}. ${keyword.keyword} (${keyword.searchVolume.toLocaleString()} searches, $${keyword.cpc} CPC)`);
    });
    
    console.log('\n💰 Revenue Potential:');
    const highCPCKeywords = keywordAnalysis.filter(k => k.cpc > 3);
    console.log(`- High-CPC keywords (>$3): ${highCPCKeywords.length}`);
    console.log(`- Total high-CPC value: $${Math.round(highCPCKeywords.reduce((sum, k) => sum + k.cpc, 0) * 100) / 100}`);
    
  } catch (error) {
    console.error('❌ Error during keyword research:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check if DataForSEO credentials are correct');
    console.log('2. Verify API quota and limits');
    console.log('3. Check network connection');
    console.log('4. Review API response for error details');
  }
}

main().catch(console.error);
