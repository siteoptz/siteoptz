#!/usr/bin/env node
/**
 * DataForSEO Lite - Budget-conscious keyword research
 * Uses minimal API calls to get maximum value
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
  timeout: 15000
});

// Priority keywords only (to save API credits)
const priorityKeywords = [
  // High-value tool searches
  "AI tools",
  "ChatGPT alternatives",
  "best AI tools 2024",
  "free AI tools",
  "AI writing tools",
  
  // Comparison keywords (high intent)
  "ChatGPT vs Claude",
  "Claude vs Gemini",
  "ChatGPT vs Gemini",
  
  // Category leaders
  "AI SEO tools",
  "AI marketing tools",
  "AI code generator",
  "AI image generator",
  
  // Commercial intent
  "AI tools for business",
  "enterprise AI tools",
  "AI automation tools"
];

async function checkBalance() {
  try {
    const response = await client.get("/appendix/user_data");
    if (response.data?.tasks?.[0]?.result?.[0]) {
      const balance = response.data.tasks[0].result[0].money?.balance || 0;
      return balance;
    }
  } catch (error) {
    console.error("Error checking balance:", error.message);
    return 0;
  }
}

async function getKeywordData(keywords) {
  try {
    console.log(`\n📊 Analyzing ${keywords.length} keywords...`);
    
    // Use Google Ads endpoint (more cost-effective)
    const response = await client.post(
      "/keywords_data/google_ads/search_volume/live",
      [{
        keywords: keywords,
        language_code: "en",
        location_code: 2840, // USA
        date_from: "2024-01-01"
      }]
    );
    
    if (response.data?.tasks?.[0]?.result?.[0]?.items) {
      return response.data.tasks[0].result[0].items;
    }
    
    return [];
  } catch (error) {
    console.error("API Error:", error.response?.data?.status_message || error.message);
    return [];
  }
}

async function getRelatedKeywords(seed, limit = 20) {
  try {
    console.log(`\n💡 Getting related keywords for: "${seed}"`);
    
    const response = await client.post(
      "/keywords_data/google/keyword_suggestions/live",
      [{
        keyword: seed,
        language_code: "en",
        location_code: 2840,
        limit: limit,
        include_seed_keyword: false
      }]
    );
    
    if (response.data?.tasks?.[0]?.result?.[0]?.items) {
      return response.data.tasks[0].result[0].items;
    }
    
    return [];
  } catch (error) {
    console.error("Error getting suggestions:", error.message);
    return [];
  }
}

async function main() {
  console.log("\n🚀 DataForSEO Lite - Keyword Research Tool");
  console.log("=".repeat(60));
  
  // Check balance first
  const balance = await checkBalance();
  console.log(`💰 Account balance: $${balance.toFixed(2)}`);
  
  if (balance < 0.10) {
    console.error("⚠️  Warning: Low account balance. Results may be limited.");
  }
  
  const results = {
    timestamp: new Date().toISOString(),
    balance: balance,
    keywords: [],
    suggestions: [],
    summary: {
      totalAnalyzed: 0,
      highVolume: [],
      lowCompetition: [],
      bestOpportunities: []
    }
  };
  
  // Get main keyword data
  const keywordData = await getKeywordData(priorityKeywords);
  
  if (keywordData.length > 0) {
    results.keywords = keywordData.map(item => ({
      keyword: item.keyword,
      volume: item.search_volume || 0,
      competition: item.competition || "N/A",
      competition_index: item.competition_index || 0,
      cpc: item.cpc || 0,
      low_bid: item.low_top_of_page_bid || 0,
      high_bid: item.high_top_of_page_bid || 0
    })).sort((a, b) => b.volume - a.volume);
    
    results.summary.totalAnalyzed = results.keywords.length;
    
    console.log(`\n✅ Analyzed ${results.keywords.length} keywords`);
    
    // Display top results
    console.log("\n🏆 TOP KEYWORDS BY SEARCH VOLUME:");
    console.log("-".repeat(40));
    
    results.keywords.slice(0, 10).forEach((kw, i) => {
      console.log(`${i + 1}. "${kw.keyword}"`);
      console.log(`   Volume: ${kw.volume.toLocaleString()} | Competition: ${kw.competition} | CPC: $${kw.cpc}`);
    });
  }
  
  // If we have budget left, get suggestions for top keyword
  if (balance > 0.20 && results.keywords.length > 0) {
    const topKeyword = results.keywords[0].keyword;
    const suggestions = await getRelatedKeywords(topKeyword, 15);
    
    if (suggestions.length > 0) {
      results.suggestions = suggestions.map(item => ({
        keyword: item.keyword,
        volume: item.keyword_info?.search_volume || 0
      })).filter(s => s.volume > 100);
      
      console.log(`\n💡 Found ${results.suggestions.length} related keywords`);
    }
  }
  
  // Identify opportunities
  results.summary.highVolume = results.keywords
    .filter(kw => kw.volume > 10000)
    .slice(0, 10);
  
  results.summary.lowCompetition = results.keywords
    .filter(kw => kw.competition_index < 30 && kw.volume > 500)
    .slice(0, 10);
  
  // Best opportunities (good volume + low competition)
  results.summary.bestOpportunities = results.keywords
    .filter(kw => kw.volume > 1000 && kw.competition_index < 50)
    .sort((a, b) => {
      const scoreA = a.volume / (a.competition_index + 1);
      const scoreB = b.volume / (b.competition_index + 1);
      return scoreB - scoreA;
    })
    .slice(0, 10);
  
  if (results.summary.bestOpportunities.length > 0) {
    console.log("\n🎯 BEST OPPORTUNITIES (Volume + Low Competition):");
    console.log("-".repeat(40));
    
    results.summary.bestOpportunities.slice(0, 5).forEach((kw, i) => {
      const score = Math.round(kw.volume / (kw.competition_index + 1));
      console.log(`${i + 1}. "${kw.keyword}"`);
      console.log(`   Volume: ${kw.volume.toLocaleString()} | Competition: ${kw.competition_index} | Score: ${score}`);
    });
  }
  
  // Save results
  const dataDir = path.join(__dirname, '..', 'data');
  await fs.mkdir(dataDir, { recursive: true });
  
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = path.join(dataDir, `keywords-lite-${timestamp}.json`);
  
  await fs.writeFile(filename, JSON.stringify(results, null, 2));
  
  // Create actionable CSV
  const csvData = createActionableCSV(results);
  const csvFilename = path.join(dataDir, `keywords-lite-${timestamp}.csv`);
  await fs.writeFile(csvFilename, csvData);
  
  // Final summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 FINAL SUMMARY");
  console.log("=".repeat(60));
  console.log(`✅ Keywords analyzed: ${results.summary.totalAnalyzed}`);
  console.log(`📈 High-volume keywords: ${results.summary.highVolume.length}`);
  console.log(`🎯 Low-competition keywords: ${results.summary.lowCompetition.length}`);
  console.log(`💎 Best opportunities: ${results.summary.bestOpportunities.length}`);
  console.log(`\n💾 Results saved to:`);
  console.log(`   JSON: ${filename}`);
  console.log(`   CSV: ${csvFilename}`);
  
  // Check remaining balance
  const finalBalance = await checkBalance();
  console.log(`\n💰 Remaining balance: $${finalBalance.toFixed(2)}`);
}

function createActionableCSV(results) {
  const headers = [
    "Keyword",
    "Search Volume", 
    "Competition",
    "Competition Index",
    "CPC",
    "Opportunity Score",
    "Action"
  ];
  
  const rows = results.keywords.map(kw => {
    const score = kw.volume / (kw.competition_index + 1);
    let action = "Monitor";
    
    if (score > 1000 && kw.volume > 5000) {
      action = "High Priority";
    } else if (score > 500 && kw.volume > 1000) {
      action = "Target";
    } else if (kw.competition_index < 30) {
      action = "Quick Win";
    }
    
    return [
      `"${kw.keyword}"`,
      kw.volume,
      `"${kw.competition}"`,
      kw.competition_index,
      kw.cpc.toFixed(2),
      Math.round(score),
      `"${action}"`
    ].join(",");
  });
  
  return [headers.join(","), ...rows].join("\n");
}

// Run the script
main().catch(error => {
  console.error("\n🚨 Fatal error:", error.message);
  process.exit(1);
});