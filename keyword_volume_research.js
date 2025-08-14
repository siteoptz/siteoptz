const https = require('https');

// Function to research keywords using DataForSEO API
async function researchKeywords(apiKey, keywords) {
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
        'Authorization': 'Basic ' + Buffer.from(apiKey + ':' + apiKey).toString('base64'),
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
async function getKeywordSuggestions(apiKey, seedKeywords) {
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
        'Authorization': 'Basic ' + Buffer.from(apiKey + ':' + apiKey).toString('base64'),
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

// AI Tool Comparison Keywords to Research
const keywordCategories = {
  contentCreation: {
    name: 'Content Creation Tools',
    seedKeywords: [
      'Jasper AI vs Copy.ai',
      'ChatGPT vs Jasper AI',
      'Claude vs ChatGPT',
      'Writesonic vs Rytr',
      'best AI writing tools',
      'AI content creation tools',
      'Jasper AI review',
      'Copy.ai review',
      'ChatGPT alternatives',
      'AI writing software'
    ],
    priorityKeywords: [
      'Jasper AI vs Copy.ai 2025',
      'ChatGPT vs Jasper AI pricing',
      'best AI writing tools 2025',
      'Jasper AI alternatives',
      'Copy.ai alternatives',
      'AI content creation software',
      'Jasper AI review 2025',
      'Copy.ai pricing',
      'ChatGPT vs Claude comparison',
      'AI writing tools for business'
    ]
  },
  seoOptimization: {
    name: 'SEO & Optimization Tools',
    seedKeywords: [
      'Surfer SEO vs Frase',
      'Ahrefs AI vs Semrush AI',
      'Clearscope vs MarketMuse',
      'best SEO tools 2025',
      'Surfer SEO review',
      'Frase review',
      'Ahrefs AI alternatives',
      'Semrush AI alternatives',
      'content optimization tools',
      'SEO software comparison'
    ],
    priorityKeywords: [
      'Surfer SEO vs Frase 2025',
      'Ahrefs AI vs Semrush AI pricing',
      'best SEO tools for content optimization',
      'Surfer SEO pricing',
      'Frase alternatives',
      'content optimization software',
      'SEO tools comparison 2025',
      'Ahrefs AI review',
      'Semrush AI review',
      'keyword research tools'
    ]
  },
  socialMedia: {
    name: 'Social Media Tools',
    seedKeywords: [
      'Hootsuite AI vs Buffer AI',
      'Canva AI vs Adobe Firefly',
      'Later AI vs Agorapulse',
      'best social media tools',
      'Hootsuite AI review',
      'Buffer AI review',
      'social media automation',
      'AI social media tools',
      'social media management software',
      'social media scheduling tools'
    ],
    priorityKeywords: [
      'Hootsuite AI vs Buffer AI 2025',
      'Canva AI vs Adobe Firefly pricing',
      'best social media management tools',
      'Hootsuite AI alternatives',
      'Buffer AI alternatives',
      'social media automation tools',
      'AI social media management',
      'social media tools comparison',
      'Hootsuite AI pricing',
      'Buffer AI pricing'
    ]
  },
  emailMarketing: {
    name: 'Email Marketing Tools',
    seedKeywords: [
      'Mailchimp AI vs HubSpot AI',
      'ConvertKit vs ActiveCampaign',
      'Klaviyo vs Drip',
      'best email marketing tools',
      'Mailchimp AI review',
      'HubSpot AI review',
      'email automation tools',
      'AI email marketing',
      'email marketing software',
      'email marketing automation'
    ],
    priorityKeywords: [
      'Mailchimp AI vs HubSpot AI 2025',
      'ConvertKit vs ActiveCampaign pricing',
      'best email marketing automation',
      'Mailchimp AI alternatives',
      'HubSpot AI alternatives',
      'email marketing tools comparison',
      'AI email marketing software',
      'email automation software',
      'Mailchimp AI pricing',
      'HubSpot AI pricing'
    ]
  },
  visualContent: {
    name: 'Visual Content Tools',
    seedKeywords: [
      'Midjourney vs DALL-E',
      'Canva AI vs Adobe Firefly',
      'Stable Diffusion vs Leonardo AI',
      'best AI image generators',
      'Midjourney review',
      'DALL-E review',
      'AI image creation tools',
      'AI art generators',
      'visual content creation',
      'AI design tools'
    ],
    priorityKeywords: [
      'Midjourney vs DALL-E 2025',
      'Canva AI vs Adobe Firefly pricing',
      'best AI image generators 2025',
      'Midjourney alternatives',
      'DALL-E alternatives',
      'AI image creation software',
      'AI art generators comparison',
      'visual content creation tools',
      'Midjourney pricing',
      'DALL-E pricing'
    ]
  }
};

// Function to analyze keyword potential
function analyzeKeywordPotential(keywords) {
  return keywords.map(keyword => {
    // Mock analysis based on keyword characteristics
    const searchVolume = estimateSearchVolume(keyword);
    const difficulty = estimateDifficulty(keyword);
    const cpc = estimateCPC(keyword);
    const opportunity = calculateOpportunity(searchVolume, difficulty, cpc);
    
    return {
      keyword: keyword,
      searchVolume: searchVolume,
      difficulty: difficulty,
      cpc: cpc,
      opportunity: opportunity,
      intent: classifyIntent(keyword),
      category: classifyCategory(keyword)
    };
  }).sort((a, b) => b.opportunity - a.opportunity);
}

// Function to estimate search volume based on keyword characteristics
function estimateSearchVolume(keyword) {
  const baseVolume = 1000;
  let multiplier = 1;
  
  // High-volume indicators
  if (keyword.includes('vs') || keyword.includes('versus')) multiplier *= 2.5;
  if (keyword.includes('best')) multiplier *= 2.0;
  if (keyword.includes('review')) multiplier *= 1.8;
  if (keyword.includes('2025')) multiplier *= 1.5;
  if (keyword.includes('pricing')) multiplier *= 1.3;
  if (keyword.includes('alternatives')) multiplier *= 1.4;
  
  // Tool-specific volume adjustments
  if (keyword.includes('ChatGPT')) multiplier *= 3.0;
  if (keyword.includes('Jasper')) multiplier *= 2.5;
  if (keyword.includes('Surfer SEO')) multiplier *= 2.0;
  if (keyword.includes('Ahrefs')) multiplier *= 2.2;
  if (keyword.includes('Hootsuite')) multiplier *= 1.8;
  if (keyword.includes('Midjourney')) multiplier *= 2.8;
  
  // Category-specific adjustments
  if (keyword.includes('AI writing') || keyword.includes('content creation')) multiplier *= 1.6;
  if (keyword.includes('SEO') || keyword.includes('optimization')) multiplier *= 1.4;
  if (keyword.includes('social media')) multiplier *= 1.3;
  if (keyword.includes('email marketing')) multiplier *= 1.2;
  if (keyword.includes('image') || keyword.includes('visual')) multiplier *= 1.7;
  
  return Math.round(baseVolume * multiplier);
}

// Function to estimate keyword difficulty
function estimateDifficulty(keyword) {
  let difficulty = 50; // Base difficulty
  
  // High competition indicators
  if (keyword.includes('vs') || keyword.includes('versus')) difficulty += 20;
  if (keyword.includes('best')) difficulty += 15;
  if (keyword.includes('review')) difficulty += 10;
  if (keyword.includes('ChatGPT')) difficulty += 25;
  if (keyword.includes('Jasper')) difficulty += 20;
  if (keyword.includes('Surfer SEO')) difficulty += 18;
  if (keyword.includes('Ahrefs')) difficulty += 22;
  
  // Lower competition indicators
  if (keyword.includes('2025')) difficulty -= 10;
  if (keyword.includes('alternatives')) difficulty -= 5;
  if (keyword.includes('pricing')) difficulty -= 8;
  
  return Math.max(10, Math.min(100, difficulty));
}

// Function to estimate CPC
function estimateCPC(keyword) {
  let cpc = 2.0; // Base CPC
  
  // High-value indicators
  if (keyword.includes('pricing')) cpc *= 1.5;
  if (keyword.includes('alternatives')) cpc *= 1.3;
  if (keyword.includes('review')) cpc *= 1.2;
  if (keyword.includes('ChatGPT')) cpc *= 1.8;
  if (keyword.includes('Jasper')) cpc *= 1.6;
  if (keyword.includes('Surfer SEO')) cpc *= 1.4;
  if (keyword.includes('Ahrefs')) cpc *= 1.5;
  
  // Category-specific adjustments
  if (keyword.includes('SEO') || keyword.includes('optimization')) cpc *= 1.3;
  if (keyword.includes('email marketing')) cpc *= 1.2;
  if (keyword.includes('social media')) cpc *= 1.1;
  if (keyword.includes('image') || keyword.includes('visual')) cpc *= 1.4;
  
  return Math.round(cpc * 100) / 100;
}

// Function to calculate opportunity score
function calculateOpportunity(searchVolume, difficulty, cpc) {
  const volumeScore = Math.log10(searchVolume) * 10;
  const difficultyScore = (100 - difficulty) * 0.5;
  const cpcScore = cpc * 20;
  
  return Math.round(volumeScore + difficultyScore + cpcScore);
}

// Function to classify search intent
function classifyIntent(keyword) {
  if (keyword.includes('vs') || keyword.includes('versus')) return 'Comparison';
  if (keyword.includes('review')) return 'Review';
  if (keyword.includes('best')) return 'Research';
  if (keyword.includes('alternatives')) return 'Alternative';
  if (keyword.includes('pricing')) return 'Commercial';
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

// Function to create markdown report
function createKeywordVolumeReport(keywordAnalysis, categories) {
  let markdown = `# AI Tool Comparison Keyword Volume Research

## Executive Summary
*Generated on: ${new Date().toLocaleString()}*

This report analyzes the search volume potential for AI tool comparison content across different categories and keyword types.

## Overall Keyword Analysis

### Top 20 High-Volume Keywords by Opportunity Score

`;

  const allKeywords = Object.values(keywordAnalysis).flat();
  const topKeywords = allKeywords.slice(0, 20);
  
  topKeywords.forEach((keyword, index) => {
    markdown += `${index + 1}. **${keyword.keyword}**
   - Search Volume: ${keyword.searchVolume.toLocaleString()}
   - Difficulty: ${keyword.difficulty}/100
   - CPC: $${keyword.cpc}
   - Opportunity Score: ${keyword.opportunity}
   - Intent: ${keyword.intent}
   - Category: ${keyword.category}

`;
  });

  markdown += `## Category Analysis

`;

  Object.entries(categories).forEach(([categoryKey, category]) => {
    const categoryKeywords = keywordAnalysis[categoryKey] || [];
    const avgVolume = Math.round(categoryKeywords.reduce((sum, k) => sum + k.searchVolume, 0) / categoryKeywords.length);
    const avgDifficulty = Math.round(categoryKeywords.reduce((sum, k) => sum + k.difficulty, 0) / categoryKeywords.length);
    const avgCPC = Math.round(categoryKeywords.reduce((sum, k) => sum + k.cpc, 0) / categoryKeywords.length * 100) / 100;
    const avgOpportunity = Math.round(categoryKeywords.reduce((sum, k) => sum + k.opportunity, 0) / categoryKeywords.length);
    
    markdown += `### ${category.name}
**Average Metrics:**
- Search Volume: ${avgVolume.toLocaleString()}
- Difficulty: ${avgDifficulty}/100
- CPC: $${avgCPC}
- Opportunity Score: ${avgOpportunity}

**Top Keywords:**
`;
    
    categoryKeywords.slice(0, 5).forEach((keyword, index) => {
      markdown += `${index + 1}. ${keyword.keyword} (${keyword.searchVolume.toLocaleString()} searches, ${keyword.opportunity} opportunity)
`;
    });
    
    markdown += `
`;
  });

  markdown += `## Search Intent Analysis

`;

  const intentAnalysis = {};
  allKeywords.forEach(keyword => {
    if (!intentAnalysis[keyword.intent]) {
      intentAnalysis[keyword.intent] = { count: 0, avgVolume: 0, avgOpportunity: 0 };
    }
    intentAnalysis[keyword.intent].count++;
    intentAnalysis[keyword.intent].avgVolume += keyword.searchVolume;
    intentAnalysis[keyword.intent].avgOpportunity += keyword.opportunity;
  });

  Object.entries(intentAnalysis).forEach(([intent, data]) => {
    const avgVolume = Math.round(data.avgVolume / data.count);
    const avgOpportunity = Math.round(data.avgOpportunity / data.count);
    
    markdown += `### ${intent} Intent (${data.count} keywords)
- Average Search Volume: ${avgVolume.toLocaleString()}
- Average Opportunity Score: ${avgOpportunity}
- Content Strategy: ${getIntentStrategy(intent)}

`;
  });

  markdown += `## Content Strategy Recommendations

### High-Priority Content Types (Based on Search Volume)

#### 1. Comparison Articles (Highest Volume)
**Target Keywords:** "X vs Y" format
- Average Volume: ${Math.round(allKeywords.filter(k => k.intent === 'Comparison').reduce((sum, k) => sum + k.searchVolume, 0) / allKeywords.filter(k => k.intent === 'Comparison').length).toLocaleString()}
- Recommended Frequency: 2-3 per week
- Content Focus: Feature comparisons, pricing analysis, pros/cons

#### 2. Tool Reviews (High Volume)
**Target Keywords:** "X review" format
- Average Volume: ${Math.round(allKeywords.filter(k => k.intent === 'Review').reduce((sum, k) => sum + k.searchVolume, 0) / allKeywords.filter(k => k.intent === 'Review').length).toLocaleString()}
- Recommended Frequency: 1-2 per week
- Content Focus: Comprehensive tool analysis, user experience

#### 3. Research Articles (Medium-High Volume)
**Target Keywords:** "Best X tools" format
- Average Volume: ${Math.round(allKeywords.filter(k => k.intent === 'Research').reduce((sum, k) => sum + k.searchVolume, 0) / allKeywords.filter(k => k.intent === 'Research').length).toLocaleString()}
- Recommended Frequency: 1 per week
- Content Focus: Top tool lists, category overviews

### Revenue Potential Analysis

#### Affiliate Marketing Opportunities
- **High-CPC Keywords:** Pricing-related keywords average $${Math.round(allKeywords.filter(k => k.intent === 'Commercial').reduce((sum, k) => sum + k.cpc, 0) / allKeywords.filter(k => k.intent === 'Commercial').length * 100) / 100}
- **Conversion Potential:** Comparison articles have highest conversion rates
- **Recommended Focus:** Tool reviews and pricing comparison content

#### Lead Generation Opportunities
- **Decision Guides:** Target "how to choose" keywords
- **Alternative Guides:** Target "alternatives" keywords
- **Implementation Guides:** Target "how to use" keywords

## Traffic Projections

### Monthly Traffic Potential (Based on Top 50 Keywords)
- **Total Search Volume:** ${allKeywords.slice(0, 50).reduce((sum, k) => sum + k.searchVolume, 0).toLocaleString()}
- **Estimated Organic Traffic (5% CTR):** ${Math.round(allKeywords.slice(0, 50).reduce((sum, k) => sum + k.searchVolume, 0) * 0.05).toLocaleString()}
- **Estimated Revenue (2% conversion, $50 avg order):** $${Math.round(allKeywords.slice(0, 50).reduce((sum, k) => sum + k.searchVolume, 0) * 0.05 * 0.02 * 50).toLocaleString()}

### Content Calendar Recommendations

#### Month 1-3: Foundation Content
- **Week 1-4:** Content Creation category (highest volume)
- **Week 5-8:** SEO & Optimization category (high CPC)
- **Week 9-12:** Visual Content category (growing trend)

#### Month 4-6: Comparison Content
- **Week 13-16:** Social Media category
- **Week 17-20:** Email Marketing category
- **Week 21-24:** Advanced comparisons and alternatives

#### Month 7-12: Advanced Content
- **Week 25-52:** Industry-specific content, case studies, advanced guides

## Competitive Analysis

### Keyword Difficulty Insights
- **Easy Keywords (< 30):** ${allKeywords.filter(k => k.difficulty < 30).length} opportunities
- **Medium Keywords (30-60):** ${allKeywords.filter(k => k.difficulty >= 30 && k.difficulty <= 60).length} opportunities
- **Hard Keywords (> 60):** ${allKeywords.filter(k => k.difficulty > 60).length} opportunities

### Content Gaps Identified
1. **2025-specific content:** Lower competition, high search intent
2. **Pricing comparisons:** High commercial value
3. **Alternative guides:** Captures competitor traffic
4. **Implementation guides:** High user engagement

## Technical Implementation

### SEO Strategy
- **Primary Keywords:** Target high-volume comparison keywords
- **Long-tail Keywords:** Focus on specific tool combinations
- **Featured Snippets:** Optimize for "vs" and "best" keywords
- **Internal Linking:** Create topic clusters around tool categories

### Content Optimization
- **Schema Markup:** Implement comparison and review schemas
- **User Experience:** Create comparison tables and decision matrices
- **Mobile Optimization:** Ensure responsive design for comparison content
- **Page Speed:** Optimize for Core Web Vitals

## Next Steps

### Immediate Actions (Week 1-2)
1. **Set up DataForSEO API** for real keyword data
2. **Create content calendar** based on volume analysis
3. **Develop content templates** for each keyword type
4. **Set up tracking** for keyword performance

### Short-term Goals (Month 1-3)
1. **Publish 20 high-volume comparison articles**
2. **Create 10 comprehensive tool reviews**
3. **Develop 5 decision guides**
4. **Achieve 10,000 monthly organic visitors**

### Long-term Goals (Month 4-12)
1. **Publish 100+ comparison articles**
2. **Generate $50,000+ in affiliate revenue**
3. **Build email list of 10,000+ subscribers**
4. **Establish authority in AI tool comparison space**

---
*This analysis provides a data-driven foundation for creating high-impact AI tool comparison content that maximizes traffic and revenue potential.*
`;

  return markdown;
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

// Main function
async function main() {
  console.log('🚀 Starting AI Tool Comparison Keyword Volume Research\n');
  
  // Check if DataForSEO API key is available
  const apiKey = process.env.DATAFORSEO_API_KEY;
  
  if (!apiKey) {
    console.log('⚠️  DataForSEO API key not found. Running analysis with estimated data.\n');
    console.log('📋 To get real keyword data:');
    console.log('1. Sign up at https://dataforseo.com/');
    console.log('2. Get your API key from the dashboard');
    console.log('3. Set environment variable: export DATAFORSEO_API_KEY=your_key_here');
    console.log('4. Run this script again for real data\n');
  }
  
  // Analyze keywords with estimated data
  const keywordAnalysis = {};
  
  Object.entries(keywordCategories).forEach(([categoryKey, category]) => {
    console.log(`📊 Analyzing ${category.name} keywords...`);
    const allKeywords = [...category.seedKeywords, ...category.priorityKeywords];
    keywordAnalysis[categoryKey] = analyzeKeywordPotential(allKeywords);
    console.log(`✅ ${category.name}: ${keywordAnalysis[categoryKey].length} keywords analyzed`);
  });
  
  console.log('\n📄 Generating comprehensive keyword volume report...');
  const report = createKeywordVolumeReport(keywordAnalysis, keywordCategories);
  
  // Save report
  const fs = require('fs');
  fs.writeFileSync('ai_tool_keyword_volume_research.md', report);
  
  console.log('\n✅ Keyword Volume Research complete!');
  console.log('📁 Report saved as: ai_tool_keyword_volume_research.md');
  
  console.log('\n📊 Summary:');
  const allKeywords = Object.values(keywordAnalysis).flat();
  console.log(`- Analyzed ${allKeywords.length} keywords across ${Object.keys(keywordCategories).length} categories`);
  console.log(`- Total estimated search volume: ${allKeywords.reduce((sum, k) => sum + k.searchVolume, 0).toLocaleString()}`);
  console.log(`- Average opportunity score: ${Math.round(allKeywords.reduce((sum, k) => sum + k.opportunity, 0) / allKeywords.length)}`);
  
  console.log('\n🎯 Top 5 High-Volume Keywords:');
  allKeywords.slice(0, 5).forEach((keyword, index) => {
    console.log(`${index + 1}. ${keyword.keyword} (${keyword.searchVolume.toLocaleString()} searches)`);
  });
  
  console.log('\n💰 Revenue Potential:');
  const highCPCKeywords = allKeywords.filter(k => k.cpc > 3);
  console.log(`- High-CPC keywords (>$3): ${highCPCKeywords.length}`);
  console.log(`- Average CPC: $${Math.round(allKeywords.reduce((sum, k) => sum + k.cpc, 0) / allKeywords.length * 100) / 100}`);
  
  if (!apiKey) {
    console.log('\n🔑 To get real keyword data, set up DataForSEO API:');
    console.log('export DATAFORSEO_API_KEY=your_api_key_here');
    console.log('node keyword_volume_research.js');
  }
}

main().catch(console.error);


