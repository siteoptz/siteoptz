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

async function getAIKeywordOpportunities() {
  try {
    console.log('Starting AI keyword opportunities research...\n');
    
    // 1. Primary AI-focused keywords
    const primaryAIKeywords = [
      "AI website optimization",
      "AI tools",
      "AI implementation", 
      "AI agents",
      "top AI solutions",
      "artificial intelligence tools",
      "AI software solutions",
      "AI automation tools",
      "business AI tools",
      "AI optimization tools"
    ];

    console.log('Fetching search volume for primary AI keywords...');
    const primaryPayload = [{
      "keywords": primaryAIKeywords,
      "location_code": 2840,
      "language_code": "en"
    }];

    const primaryResponse = await client.post(
      '/keywords_data/google_ads/search_volume/live',
      primaryPayload
    );

    const primaryData = primaryResponse.data.tasks?.[0]?.result || [];
    
    // 2. AI implementation and integration keywords
    const implementationKeywords = [
      "AI implementation strategy",
      "AI integration services", 
      "AI deployment solutions",
      "enterprise AI implementation",
      "AI adoption framework",
      "AI transformation tools",
      "AI workflow automation",
      "AI process optimization",
      "AI system integration",
      "AI implementation consulting"
    ];

    console.log('Fetching search volume for AI implementation keywords...');
    const implementationPayload = [{
      "keywords": implementationKeywords,
      "location_code": 2840,
      "language_code": "en"
    }];

    const implementationResponse = await client.post(
      '/keywords_data/google_ads/search_volume/live',
      implementationPayload
    );

    const implementationData = implementationResponse.data.tasks?.[0]?.result || [];

    // 3. AI agents and automation keywords
    const agentsKeywords = [
      "AI agents for business",
      "intelligent AI agents",
      "AI chatbot agents",
      "automated AI agents",
      "AI virtual agents",
      "conversational AI agents",
      "AI customer service agents",
      "AI sales agents",
      "AI support agents",
      "AI workflow agents"
    ];

    console.log('Fetching search volume for AI agents keywords...');
    const agentsPayload = [{
      "keywords": agentsKeywords,
      "location_code": 2840,
      "language_code": "en"
    }];

    const agentsResponse = await client.post(
      '/keywords_data/google_ads/search_volume/live',
      agentsPayload
    );

    const agentsData = agentsResponse.data.tasks?.[0]?.result || [];

    // 4. Commercial and comparison AI keywords
    const commercialKeywords = [
      "best AI tools 2025",
      "top AI platforms",
      "AI tools comparison",
      "enterprise AI solutions",
      "AI software comparison",
      "affordable AI tools",
      "AI tools for small business",
      "professional AI solutions",
      "AI tools pricing",
      "AI platform reviews"
    ];

    console.log('Fetching search volume for commercial AI keywords...');
    const commercialPayload = [{
      "keywords": commercialKeywords,
      "location_code": 2840,
      "language_code": "en"
    }];

    const commercialResponse = await client.post(
      '/keywords_data/google_ads/search_volume/live',
      commercialPayload
    );

    const commercialData = commercialResponse.data.tasks?.[0]?.result || [];

    // 5. Industry-specific AI optimization keywords
    const industryKeywords = [
      "AI website performance optimization",
      "AI SEO optimization",
      "AI content optimization",
      "AI marketing optimization",
      "AI conversion optimization", 
      "AI user experience optimization",
      "AI analytics optimization",
      "AI data optimization",
      "AI search optimization",
      "AI mobile optimization"
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
      ...primaryData.map(k => ({...k, category: 'primary-ai'})),
      ...implementationData.map(k => ({...k, category: 'implementation'})), 
      ...agentsData.map(k => ({...k, category: 'ai-agents'})),
      ...commercialData.map(k => ({...k, category: 'commercial'})),
      ...industryData.map(k => ({...k, category: 'optimization'}))
    ];

    // Sort by search volume
    const sortedKeywords = allKeywords
      .filter(kw => kw.search_volume > 5)
      .sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0));

    console.log('\n=== TOP AI KEYWORD OPPORTUNITIES ===\n');
    
    const topKeywords = sortedKeywords.slice(0, 25);
    topKeywords.forEach((kw, index) => {
      console.log(`${index + 1}. ${kw.keyword}`);
      console.log(`   Volume: ${kw.search_volume} | Competition: ${kw.competition} | CPC: $${kw.cpc} | Category: ${kw.category}`);
      console.log(`   Opportunity Score: ${calculateOpportunityScore(kw)}/100`);
      console.log('');
    });

    // Calculate opportunity scores and categorize
    const highOpportunity = sortedKeywords.filter(k => calculateOpportunityScore(k) >= 70);
    const mediumOpportunity = sortedKeywords.filter(k => calculateOpportunityScore(k) >= 40 && calculateOpportunityScore(k) < 70);
    const commercialIntent = sortedKeywords.filter(k => 
      k.keyword.includes('best') || 
      k.keyword.includes('top') ||
      k.keyword.includes('tools') ||
      k.keyword.includes('comparison') ||
      k.keyword.includes('solutions') ||
      k.keyword.includes('platform')
    );

    console.log('\n=== AI KEYWORD OPPORTUNITY ANALYSIS ===');
    console.log(`High Opportunity Keywords (70+ score): ${highOpportunity.length}`);
    console.log(`Medium Opportunity Keywords (40-69 score): ${mediumOpportunity.length}`);
    console.log(`Commercial Intent Keywords: ${commercialIntent.length}`);
    console.log(`Average CPC across AI keywords: $${(allKeywords.reduce((sum, k) => sum + (k.cpc || 0), 0) / allKeywords.length).toFixed(2)}`);

    // Find keyword gaps and opportunities
    const lowCompetitionHighVolume = sortedKeywords.filter(k => 
      k.search_volume >= 100 && 
      (k.competition === 'LOW' || k.competition === 'MEDIUM') &&
      k.cpc >= 1.0
    );

    console.log('\n=== IMMEDIATE OPPORTUNITIES ===');
    console.log('Low Competition + High Volume + Good CPC:');
    lowCompetitionHighVolume.slice(0, 10).forEach((kw, index) => {
      console.log(`${index + 1}. ${kw.keyword} (Vol: ${kw.search_volume}, Comp: ${kw.competition}, CPC: $${kw.cpc})`);
    });

    // Save comprehensive results
    const results = {
      aiKeywordOpportunities: {
        primary: primaryData.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0)),
        implementation: implementationData.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0)),
        agents: agentsData.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0)),
        commercial: commercialData.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0)),
        optimization: industryData.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0))
      },
      topOpportunities: topKeywords,
      opportunityCategories: {
        high: highOpportunity,
        medium: mediumOpportunity,
        commercial: commercialIntent,
        lowCompetitionGems: lowCompetitionHighVolume
      },
      contentRecommendations: {
        primaryTargets: [
          "AI tools",
          "AI implementation", 
          "AI website optimization",
          "best AI tools 2025",
          "AI automation tools"
        ],
        contentClusters: [
          "AI Tools Comparison and Reviews",
          "AI Implementation Strategies", 
          "AI Agents and Automation",
          "AI Website Optimization Techniques",
          "Enterprise AI Solutions"
        ],
        immediateOpportunities: lowCompetitionHighVolume.slice(0, 10).map(k => k.keyword)
      },
      marketInsights: {
        averageCPC: (allKeywords.reduce((sum, k) => sum + (k.cpc || 0), 0) / allKeywords.length).toFixed(2),
        totalSearchVolume: allKeywords.reduce((sum, k) => sum + (k.search_volume || 0), 0),
        competitionDistribution: {
          high: allKeywords.filter(k => k.competition === 'HIGH').length,
          medium: allKeywords.filter(k => k.competition === 'MEDIUM').length,
          low: allKeywords.filter(k => k.competition === 'LOW').length
        }
      },
      totalKeywordsAnalyzed: allKeywords.length,
      timestamp: new Date().toISOString()
    };
    
    writeFileSync(
      '/Users/siteoptz/siteoptz/data/ai-keyword-opportunities.json',
      JSON.stringify(results, null, 2)
    );
    
    console.log('\n✅ AI keyword opportunities research saved to data/ai-keyword-opportunities.json');
    console.log(`📊 Total keywords analyzed: ${allKeywords.length}`);
    console.log(`🎯 High opportunity targets: ${highOpportunity.length}`);
    console.log(`💎 Low competition gems: ${lowCompetitionHighVolume.length}`);
    console.log(`💰 Average CPC: $${results.marketInsights.averageCPC}`);

  } catch (error) {
    console.error('Error in AI keyword research:', error.response?.data || error.message);
  }
}

// Calculate opportunity score based on volume, competition, and CPC
function calculateOpportunityScore(keyword) {
  const volume = keyword.search_volume || 0;
  const cpc = keyword.cpc || 0;
  const competition = keyword.competition || 'HIGH';
  
  let score = 0;
  
  // Volume scoring (40% of total score)
  if (volume >= 1000) score += 40;
  else if (volume >= 500) score += 30;
  else if (volume >= 100) score += 20;
  else if (volume >= 50) score += 10;
  
  // CPC scoring (30% of total score) - higher CPC = more commercial value
  if (cpc >= 5) score += 30;
  else if (cpc >= 3) score += 25;
  else if (cpc >= 1) score += 20;
  else if (cpc >= 0.5) score += 10;
  
  // Competition scoring (30% of total score) - lower competition = higher score
  if (competition === 'LOW') score += 30;
  else if (competition === 'MEDIUM') score += 20;
  else if (competition === 'HIGH') score += 10;
  
  return Math.min(100, score);
}

// Run the AI keyword opportunities analysis
getAIKeywordOpportunities();