#!/usr/bin/env node
/**
 * DataForSEO Final - Working Version with Correct Response Parsing
 * Now we know the API response format, let's get comprehensive data
 */

import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = axios.create({
  baseURL: "https://api.dataforseo.com/v3",
  auth: {
    username: "antonio@siteoptz.com",
    password: "8215cb0ce338b385"
  },
  timeout: 30000
});

// Comprehensive keyword list for SiteOptz
const keywordSets = {
  coreAITools: [
    "AI tools",
    "artificial intelligence tools",
    "best AI tools",
    "AI software",
    "AI platforms",
    "free AI tools",
    "AI tools 2024",
    "top AI tools",
    "AI applications",
    "machine learning tools"
  ],
  
  specificTools: [
    "ChatGPT",
    "Claude AI", 
    "Gemini AI",
    "GPT-4",
    "Copilot",
    "Perplexity AI",
    "Midjourney",
    "DALL-E",
    "Stable Diffusion",
    "Runway ML"
  ],
  
  comparisons: [
    "ChatGPT vs Claude",
    "ChatGPT vs Gemini",
    "Claude vs Gemini", 
    "ChatGPT vs Copilot",
    "GPT-4 vs Claude",
    "Midjourney vs DALL-E",
    "ChatGPT alternatives",
    "Claude alternatives",
    "AI tool comparison",
    "best ChatGPT alternative"
  ],
  
  categories: [
    "AI writing tools",
    "AI image generator",
    "AI code generator",
    "AI SEO tools", 
    "AI marketing tools",
    "AI automation tools",
    "AI chatbot tools",
    "AI video generator",
    "AI voice generator",
    "AI data analysis tools",
    "AI design tools",
    "AI productivity tools"
  ],
  
  business: [
    "AI for business",
    "enterprise AI tools",
    "AI for marketing",
    "AI for content creation",
    "AI for developers", 
    "AI for designers",
    "AI customer service",
    "AI sales tools",
    "AI analytics tools",
    "business automation AI"
  ],
  
  longTail: [
    "how to use AI tools",
    "AI tools review",
    "AI tools pricing",
    "AI tools features",
    "what are AI tools",
    "AI tools for beginners",
    "AI tools tutorial",
    "AI tools comparison 2024",
    "free vs paid AI tools",
    "AI tools for small business"
  ]
};

async function getSearchVolumeForSet(keywords, setName) {
  const results = [];
  const batchSize = 6; // Smaller batches for reliability
  
  console.log(`\n📊 ${setName.toUpperCase()}: Processing ${keywords.length} keywords`);
  console.log("-".repeat(60));
  
  for (let i = 0; i < keywords.length; i += batchSize) {
    const batch = keywords.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(keywords.length / batchSize);
    
    try {
      console.log(`  Batch ${batchNum}/${totalBatches}: ${batch.join(', ')}`);
      
      const response = await client.post(
        "/keywords_data/google_ads/search_volume/live",
        [{
          keywords: batch,
          language_code: "en",
          location_code: 2840
        }]
      );
      
      if (response.data.status_code === 20000 && response.data.tasks?.[0]?.result) {
        const batchResults = response.data.tasks[0].result;
        
        batchResults.forEach(result => {
          results.push({
            keyword: result.keyword,
            volume: result.search_volume || 0,
            competition: result.competition || "N/A",
            competition_index: result.competition_index || 0,
            cpc: result.cpc || 0,
            low_bid: result.low_top_of_page_bid || 0,
            high_bid: result.high_top_of_page_bid || 0,
            monthly_searches: result.monthly_searches || [],
            category: setName,
            spell: result.spell || result.keyword
          });
        });
        
        console.log(`    ✅ Got ${batchResults.length} results`);
        
        // Show immediate results for this batch
        batchResults.forEach(result => {
          if (result.search_volume > 0) {
            console.log(`      "${result.keyword}": ${result.search_volume.toLocaleString()} searches/mo`);
          }
        });
      }
      
    } catch (error) {
      console.error(`    ❌ Batch ${batchNum} failed:`, error.response?.data?.status_message || error.message);
    }
    
    // Rate limiting between batches
    if (i + batchSize < keywords.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log(`  📈 Total results for ${setName}: ${results.length} keywords`);
  return results;
}

async function main() {
  console.log("\n🚀 DataForSEO Final - Comprehensive Keyword Research");
  console.log("=".repeat(80));
  
  // Check starting balance
  const userResponse = await client.get("/appendix/user_data");
  const startBalance = userResponse.data.tasks[0].result[0].money.balance;
  console.log(`💰 Starting balance: $${startBalance.toFixed(2)}`);
  
  const startTime = Date.now();
  const allResults = [];
  const resultsByCategory = {};
  
  // Process each keyword set
  for (const [setName, keywords] of Object.entries(keywordSets)) {
    const results = await getSearchVolumeForSet(keywords, setName);
    allResults.push(...results);
    resultsByCategory[setName] = results.sort((a, b) => b.volume - a.volume);
    
    console.log(`  🏆 Top keyword: "${results[0]?.keyword}" (${results[0]?.volume?.toLocaleString() || 0} searches)`);
  }
  
  // Sort all results by volume
  allResults.sort((a, b) => b.volume - a.volume);
  
  // Analysis
  const analysis = {
    timestamp: new Date().toISOString(),
    totalKeywords: allResults.length,
    keywordsWithData: allResults.filter(k => k.volume > 0).length,
    categories: Object.keys(keywordSets).length,
    
    // Volume categories
    ultraHighVolume: allResults.filter(k => k.volume > 50000000), // 50M+
    veryHighVolume: allResults.filter(k => k.volume > 10000000),  // 10M+
    highVolume: allResults.filter(k => k.volume > 1000000),       // 1M+
    mediumVolume: allResults.filter(k => k.volume >= 100000),     // 100K+
    lowVolume: allResults.filter(k => k.volume > 0 && k.volume < 100000),
    
    // Competition analysis
    lowCompetition: allResults.filter(k => k.competition_index < 30 && k.volume > 10000),
    mediumCompetition: allResults.filter(k => k.competition_index >= 30 && k.competition_index < 70),
    highCompetition: allResults.filter(k => k.competition_index >= 70),
    
    // Opportunities (high volume + low competition)
    goldMine: allResults.filter(k => k.volume > 1000000 && k.competition_index < 30),
    opportunities: allResults.filter(k => k.volume > 100000 && k.competition_index < 50),
    quickWins: allResults.filter(k => k.volume > 10000 && k.competition_index < 25),
    
    // By category
    categoryAnalysis: {}
  };
  
  // Analyze each category
  Object.entries(resultsByCategory).forEach(([category, results]) => {
    const withVolume = results.filter(k => k.volume > 0);
    analysis.categoryAnalysis[category] = {
      totalKeywords: results.length,
      keywordsWithVolume: withVolume.length,
      averageVolume: withVolume.length > 0 ? Math.round(withVolume.reduce((sum, k) => sum + k.volume, 0) / withVolume.length) : 0,
      topKeyword: withVolume[0] || null,
      opportunities: results.filter(k => k.volume > 50000 && k.competition_index < 50).length
    };
  });
  
  const endTime = Date.now();
  const processingTime = Math.round((endTime - startTime) / 1000);
  
  // Display comprehensive results
  console.log("\n" + "=".repeat(80));
  console.log("🎯 COMPREHENSIVE KEYWORD ANALYSIS RESULTS");
  console.log("=".repeat(80));
  
  console.log(`\n📊 OVERVIEW:`);
  console.log(`  Total keywords researched: ${analysis.totalKeywords}`);
  console.log(`  Keywords with search data: ${analysis.keywordsWithData}`);
  console.log(`  Processing time: ${processingTime} seconds`);
  
  console.log(`\n🔥 VOLUME BREAKDOWN:`);
  console.log(`  Ultra High Volume (50M+): ${analysis.ultraHighVolume.length}`);
  console.log(`  Very High Volume (10M+): ${analysis.veryHighVolume.length}`);  
  console.log(`  High Volume (1M+): ${analysis.highVolume.length}`);
  console.log(`  Medium Volume (100K+): ${analysis.mediumVolume.length}`);
  console.log(`  Low Volume (<100K): ${analysis.lowVolume.length}`);
  
  console.log(`\n🎯 OPPORTUNITY ANALYSIS:`);
  console.log(`  Gold Mine (1M+ vol, low comp): ${analysis.goldMine.length}`);
  console.log(`  Great Opportunities (100K+ vol, medium comp): ${analysis.opportunities.length}`);
  console.log(`  Quick Wins (10K+ vol, low comp): ${analysis.quickWins.length}`);
  
  if (analysis.ultraHighVolume.length > 0) {
    console.log(`\n🚀 ULTRA HIGH VOLUME KEYWORDS (50M+ searches):`);
    analysis.ultraHighVolume.slice(0, 10).forEach((kw, i) => {
      console.log(`  ${i + 1}. "${kw.keyword}" - ${kw.volume.toLocaleString()} searches (Comp: ${kw.competition_index})`);
    });
  }
  
  if (analysis.goldMine.length > 0) {
    console.log(`\n💎 GOLD MINE OPPORTUNITIES (High Volume + Low Competition):`);
    analysis.goldMine.slice(0, 8).forEach((kw, i) => {
      const score = Math.round(kw.volume / Math.max(kw.competition_index, 1));
      console.log(`  ${i + 1}. "${kw.keyword}"`);
      console.log(`      Volume: ${kw.volume.toLocaleString()} | Competition: ${kw.competition_index} | CPC: $${kw.cpc} | Score: ${score.toLocaleString()}`);
    });
  }
  
  // Category winners
  console.log(`\n🏆 CATEGORY CHAMPIONS:`);
  Object.entries(analysis.categoryAnalysis).forEach(([category, data]) => {
    if (data.topKeyword) {
      console.log(`  ${category.charAt(0).toUpperCase() + category.slice(1)}: "${data.topKeyword.keyword}" (${data.topKeyword.volume.toLocaleString()} searches)`);
    }
  });
  
  // Detailed category breakdown
  console.log(`\n📂 DETAILED CATEGORY ANALYSIS:`);
  Object.entries(analysis.categoryAnalysis).forEach(([category, data]) => {
    console.log(`\n  ${category.toUpperCase()}:`);
    console.log(`    Keywords analyzed: ${data.totalKeywords}`);
    console.log(`    With search volume: ${data.keywordsWithVolume}`);
    console.log(`    Average volume: ${data.averageVolume.toLocaleString()}`);
    console.log(`    Opportunities: ${data.opportunities}`);
    
    if (resultsByCategory[category]) {
      const topResults = resultsByCategory[category].filter(k => k.volume > 0).slice(0, 3);
      topResults.forEach((kw, i) => {
        console.log(`      ${i + 1}. "${kw.keyword}" - ${kw.volume.toLocaleString()} (${kw.competition})`);
      });
    }
  });
  
  // Save comprehensive results
  const dataDir = path.join(__dirname, '..', 'data', 'keywords');
  await fs.mkdir(dataDir, { recursive: true });
  
  const timestamp = new Date().toISOString().split('T')[0];
  
  // Save complete dataset
  const completeData = {
    analysis,
    resultsByCategory,
    allResults: allResults.slice(0, 500), // Top 500 to keep file size reasonable
    processingTime,
    apiCost: 0 // Will be calculated below
  };
  
  const dataFile = path.join(dataDir, `siteoptz-complete-${timestamp}.json`);
  await fs.writeFile(dataFile, JSON.stringify(completeData, null, 2));
  
  // Generate master CSV with all data
  const masterCSV = generateMasterCSV(allResults);
  const masterFile = path.join(dataDir, `siteoptz-master-${timestamp}.csv`);
  await fs.writeFile(masterFile, masterCSV);
  
  // Generate opportunities-focused CSV
  const opportunitiesData = [
    ...analysis.goldMine,
    ...analysis.opportunities.filter(k => !analysis.goldMine.includes(k)),
    ...analysis.quickWins.filter(k => !analysis.opportunities.includes(k) && !analysis.goldMine.includes(k))
  ].slice(0, 100);
  
  const opportunitiesCSV = generateOpportunitiesCSV(opportunitiesData);
  const oppFile = path.join(dataDir, `siteoptz-opportunities-${timestamp}.csv`);
  await fs.writeFile(oppFile, opportunitiesCSV);
  
  // Generate content strategy CSV
  const strategyCSV = generateContentStrategyCSV(allResults.slice(0, 50));
  const strategyFile = path.join(dataDir, `siteoptz-content-strategy-${timestamp}.csv`);
  await fs.writeFile(strategyFile, strategyCSV);
  
  // Check final balance and cost
  const finalResponse = await client.get("/appendix/user_data");
  const finalBalance = finalResponse.data.tasks[0].result[0].money.balance;
  const totalCost = startBalance - finalBalance;
  completeData.apiCost = totalCost;
  
  // Update the JSON file with cost
  await fs.writeFile(dataFile, JSON.stringify(completeData, null, 2));
  
  console.log("\n" + "=".repeat(80));
  console.log("💾 COMPREHENSIVE REPORTS GENERATED:");
  console.log("-".repeat(50));
  console.log(`📊 Complete Dataset: ${dataFile}`);
  console.log(`📋 Master Keywords: ${masterFile}`);
  console.log(`🎯 Top Opportunities: ${oppFile}`); 
  console.log(`📝 Content Strategy: ${strategyFile}`);
  
  console.log(`\n💰 RESEARCH INVESTMENT:`);
  console.log(`  API Cost: $${totalCost.toFixed(2)}`);
  console.log(`  Remaining Balance: $${finalBalance.toFixed(2)}`);
  console.log(`  Cost per keyword: $${(totalCost / analysis.totalKeywords).toFixed(4)}`);
  
  console.log("\n" + "=".repeat(80));
  console.log("✅ COMPREHENSIVE KEYWORD RESEARCH COMPLETED!");
  console.log("=".repeat(80));
  
  return completeData;
}

function generateMasterCSV(keywords) {
  const headers = [
    "Keyword", "Monthly Volume", "Competition", "Competition Index", 
    "CPC", "Low Bid", "High Bid", "Category", "Priority Level", 
    "Opportunity Score", "Action Recommended"
  ];
  
  const rows = keywords.map(kw => {
    const score = kw.volume / Math.max(kw.competition_index, 1);
    
    let priority = "Low";
    let action = "Monitor";
    
    if (score > 50000 && kw.volume > 1000000) {
      priority = "Critical";
      action = "Immediate Action Required";
    } else if (score > 10000 && kw.volume > 500000) {
      priority = "High";  
      action = "Priority Target";
    } else if (score > 2000 && kw.volume > 100000) {
      priority = "Medium";
      action = "Plan Content";
    } else if (kw.competition_index < 30 && kw.volume > 10000) {
      priority = "Medium";
      action = "Quick Win Opportunity";
    }
    
    return [
      `"${kw.keyword}"`,
      kw.volume,
      `"${kw.competition}"`,
      kw.competition_index,
      kw.cpc.toFixed(2),
      kw.low_bid.toFixed(2),
      kw.high_bid.toFixed(2),
      `"${kw.category}"`,
      `"${priority}"`,
      Math.round(score),
      `"${action}"`
    ].join(",");
  });
  
  return [headers.join(","), ...rows].join("\n");
}

function generateOpportunitiesCSV(opportunities) {
  const headers = [
    "Keyword", "Volume", "Competition", "CPC", "Opportunity Score",
    "Difficulty", "Content Type", "Target Pages", "Timeline", "ROI Potential"
  ];
  
  const rows = opportunities.map(kw => {
    const score = Math.round(kw.volume / Math.max(kw.competition_index, 1));
    
    let difficulty = "Medium";
    let contentType = "Blog Post";
    let timeline = "4-6 weeks";
    let roiPotential = "Medium";
    
    if (kw.competition_index < 20) {
      difficulty = "Easy";
      timeline = "2-3 weeks";
      roiPotential = "High";
    } else if (kw.competition_index > 60) {
      difficulty = "Hard";
      timeline = "8-12 weeks";
      roiPotential = "Medium-Low";
    }
    
    if (kw.keyword.includes('vs ')) {
      contentType = "Comparison Guide";
    } else if (kw.keyword.includes('best ')) {
      contentType = "Roundup Article";
    } else if (kw.keyword.includes('how to')) {
      contentType = "Tutorial Guide";
    }
    
    return [
      `"${kw.keyword}"`,
      kw.volume,
      kw.competition_index,
      kw.cpc.toFixed(2),
      score,
      `"${difficulty}"`,
      `"${contentType}"`,
      `"Tools page, Blog, Category"`,
      `"${timeline}"`,
      `"${roiPotential}"`
    ].join(",");
  });
  
  return [headers.join(","), ...rows].join("\n");
}

function generateContentStrategyCSV(topKeywords) {
  const headers = [
    "Keyword", "Volume", "Content Title", "Content Type", "Target URL",
    "Meta Description", "H1 Suggestion", "Internal Links", "Competition Analysis"
  ];
  
  const rows = topKeywords.map(kw => {
    let title = `${kw.keyword} - Complete Guide 2024`;
    let contentType = "Pillar Page";
    let targetUrl = `/tools/${kw.keyword.toLowerCase().replace(/\s+/g, '-')}`;
    let metaDesc = `Discover the best ${kw.keyword.toLowerCase()} with our comprehensive guide. Compare features, pricing, and reviews.`;
    let h1 = `Best ${kw.keyword} - Complete Guide & Reviews`;
    let internalLinks = "Tools page, Related categories, Comparison pages";
    let competitionAnalysis = kw.competition_index < 30 ? "Low competition - quick wins possible" : "Medium-high competition - need comprehensive content";
    
    if (kw.keyword.includes('vs ')) {
      contentType = "Comparison Page";
      targetUrl = `/compare/${kw.keyword.toLowerCase().replace(/\s+vs\s+/g, '-vs-')}`;
      title = `${kw.keyword} - Detailed Comparison 2024`;
      h1 = `${kw.keyword} - Which is Better?`;
    }
    
    return [
      `"${kw.keyword}"`,
      kw.volume,
      `"${title}"`,
      `"${contentType}"`,
      `"${targetUrl}"`,
      `"${metaDesc}"`,
      `"${h1}"`,
      `"${internalLinks}"`,
      `"${competitionAnalysis}"`
    ].join(",");
  });
  
  return [headers.join(","), ...rows].join("\n");
}

// Execute the comprehensive research
main()
  .then((results) => {
    console.log(`\n🎉 Research completed! Found ${results.allResults.length} keywords with data.`);
    process.exit(0);
  })
  .catch(error => {
    console.error("\n🚨 Fatal error:", error.message);
    process.exit(1);
  });