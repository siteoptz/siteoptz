const https = require('https');

// DataForSEO API credentials
const DATAFORSEO_USERNAME = 'antonio@siteoptz.com';
const DATAFORSEO_PASSWORD = '8215cb0ce338b385';

// Function to research keywords using DataForSEO API
async function researchKeywords(keywords) {
  return new Promise((resolve, reject) => {
    // DataForSEO expects an array of tasks
    const data = JSON.stringify({
      tasks: [
        {
          keywords: keywords,
          location_code: 2840, // United States
          language_code: "en",
          search_partners: false,
          include_serp_info: true,
          include_subdomains: true
        }
      ]
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
  
  console.log('🔍 Analyzing API response...');
  console.log('Response structure:', JSON.stringify(apiResponse, null, 2).substring(0, 500));
  
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
function createRealKeywordReport(keywordAnalysis, apiResponse) {
  let markdown = `# Real DataForSEO Keyword Research Results

## Executive Summary
*Generated on: ${new Date().toLocaleString()}*
*Data Source: DataForSEO API*

This report contains real keyword research data from DataForSEO API for AI tool comparison content strategy.

## API Response Summary
- **Status Code:** ${apiResponse.status_code}
- **Status Message:** ${apiResponse.status_message}
- **Tasks Count:** ${apiResponse.tasks_count}
- **Tasks Error:** ${apiResponse.tasks_error}
- **Cost:** ${apiResponse.cost}

## Keyword Analysis Results

`;

  if (keywordAnalysis.length === 0) {
    markdown += `### No Keyword Data Available
The API response did not contain keyword data. This could be due to:
- API quota limitations
- Invalid request format
- No data available for the requested keywords
- Authentication issues

**API Response Details:**
\`\`\`json
${JSON.stringify(apiResponse, null, 2)}
\`\`\`

## Recommended Next Steps
1. **Check API Quota:** Verify your DataForSEO account has sufficient credits
2. **Review Keywords:** Ensure keywords are valid and searchable
3. **Test with Different Keywords:** Try simpler, more common keywords
4. **Contact Support:** If issues persist, contact DataForSEO support

## Alternative Approach
Since real data is not available, we can use the estimated keyword analysis from our previous research:

### Estimated Keyword Performance
- **Total Keywords:** 100 across 5 categories
- **Total Estimated Volume:** 329,060 monthly searches
- **Average CPC:** $2.73
- **High-CPC Keywords:** 17 (>$3)

### Top Priority Keywords (Estimated)
1. **ChatGPT vs Jasper AI pricing** - 24,375 searches
2. **ChatGPT vs Jasper AI** - 18,750 searches
3. **ChatGPT alternatives** - 4,200 searches
4. **Jasper AI alternatives** - 3,500 searches
5. **Jasper AI review 2025** - 6,750 searches

---
*This report shows the attempt to get real DataForSEO data and provides fallback estimated data for content strategy planning.*
`;
  } else {
    markdown += `### Top 20 High-Volume Keywords by Opportunity Score

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
  }

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
    const report = createRealKeywordReport(keywordAnalysis, keywordData);
    
    // Save report
    const fs = require('fs');
    fs.writeFileSync('real_dataforseo_keyword_research.md', report);
    
    console.log('\n✅ Real DataForSEO Keyword Research complete!');
    console.log('📁 Report saved as: real_dataforseo_keyword_research.md');
    
    console.log('\n📊 Summary:');
    console.log(`- Researched ${priorityKeywords.length} priority keywords`);
    console.log(`- Found ${keywordAnalysis.length} keyword variations`);
    
    if (keywordAnalysis.length > 0) {
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
    } else {
      console.log('- No keyword data available from API');
      console.log('- Using estimated data for content strategy');
    }
    
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



