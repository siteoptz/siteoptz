#!/usr/bin/env node
// DataForSEO Keyword Research Tool
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// DataForSEO credentials (consider moving to .env)
const config = {
  login: "antonio@siteoptz.com",
  password: "8215cb0ce338b385",
  baseURL: "https://api.dataforseo.com/v3"
};

// Create axios client with auth
const client = axios.create({
  baseURL: config.baseURL,
  auth: {
    username: config.login,
    password: config.password
  },
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// Keywords to research
const keywordSets = {
  tools: [
    "AI tools",
    "ChatGPT alternatives",
    "Claude AI",
    "best AI tools 2024",
    "free AI tools",
    "AI writing tools",
    "AI image generator",
    "AI code generator",
    "AI voice generator",
    "AI video generator"
  ],
  categories: [
    "SEO tools",
    "social media AI tools",
    "AI marketing tools",
    "AI productivity tools",
    "AI data analysis tools",
    "AI content creation",
    "AI automation tools",
    "no code AI tools",
    "enterprise AI tools",
    "AI customer service tools"
  ],
  comparisons: [
    "ChatGPT vs Claude",
    "ChatGPT vs Gemini",
    "Claude vs Gemini",
    "ChatGPT vs Copilot",
    "Midjourney vs DALL-E",
    "Jasper vs Copy.ai",
    "Perplexity vs ChatGPT",
    "GitHub Copilot vs Cursor",
    "Synthesia vs HeyGen",
    "ElevenLabs vs Murf"
  ],
  industries: [
    "AI for healthcare",
    "AI for finance",
    "AI for education",
    "AI for legal",
    "AI for retail",
    "AI for manufacturing",
    "AI for real estate",
    "AI for HR",
    "AI for marketing agencies",
    "AI for small business"
  ]
};

// Test API connection
async function testConnection() {
  try {
    console.log("🔌 Testing DataForSEO connection...");
    const response = await client.get("/appendix/user_data");
    
    if (response.data.status_code === 20000) {
      const balance = response.data.tasks[0].result[0].money.balance;
      console.log(`✅ Connected! Account balance: $${balance}`);
      return true;
    } else {
      console.error("❌ Connection failed:", response.data.status_message);
      return false;
    }
  } catch (error) {
    console.error("❌ Connection error:", error.message);
    if (error.response?.status === 401) {
      console.error("🔐 Authentication failed. Please check your credentials.");
    }
    return false;
  }
}

// Get search volume for keywords
async function getSearchVolume(keywords, location = 2840) {
  try {
    const postData = [{
      keywords: keywords,
      language_code: "en",
      location_code: location,
      date_from: "2024-01-01"
    }];

    console.log(`📊 Fetching search volume for ${keywords.length} keywords...`);
    
    const response = await client.post(
      "/keywords_data/google_ads/search_volume/live",
      postData
    );

    if (response.data.status_code === 20000 && response.data.tasks?.[0]?.result?.[0]) {
      const results = response.data.tasks[0].result[0];
      return results.items || [];
    }
    
    console.warn("⚠️  No results returned");
    return [];
    
  } catch (error) {
    console.error("❌ Error fetching search volume:", error.response?.data || error.message);
    return [];
  }
}

// Get keyword suggestions
async function getKeywordSuggestions(seedKeyword, limit = 50) {
  try {
    const postData = [{
      keyword: seedKeyword,
      language_code: "en",
      location_code: 2840,
      limit: limit,
      include_seed_keyword: true,
      sort_by: "search_volume"
    }];

    console.log(`💡 Getting suggestions for: "${seedKeyword}"`);
    
    const response = await client.post(
      "/keywords_data/google/keywords_for_keywords/live",
      postData
    );

    if (response.data.status_code === 20000 && response.data.tasks?.[0]?.result?.[0]) {
      const results = response.data.tasks[0].result[0];
      return results.items || [];
    }
    
    return [];
    
  } catch (error) {
    console.error(`❌ Error getting suggestions for "${seedKeyword}":`, error.message);
    return [];
  }
}

// Main execution
async function main() {
  console.log("\n🚀 DataForSEO Keyword Research Tool");
  console.log("=" .repeat(60));
  
  // Test connection
  const connected = await testConnection();
  if (!connected) {
    console.error("\n⛔ Cannot proceed without valid connection");
    process.exit(1);
  }

  const allResults = {
    timestamp: new Date().toISOString(),
    summary: {
      totalKeywords: 0,
      categoriesProcessed: 0,
      topKeywords: [],
      lowCompetition: []
    },
    searchVolume: {},
    suggestions: {}
  };

  console.log("\n📈 ANALYZING SEARCH VOLUMES");
  console.log("-".repeat(40));

  // Process each keyword set
  for (const [category, keywords] of Object.entries(keywordSets)) {
    console.log(`\n🏷️  ${category.toUpperCase()}`);
    
    // Get search volumes in batches
    const volumeData = await getSearchVolume(keywords);
    
    if (volumeData.length > 0) {
      allResults.searchVolume[category] = volumeData
        .map(item => ({
          keyword: item.keyword,
          volume: item.search_volume || 0,
          competition: item.competition || "N/A",
          cpc: item.cpc || 0,
          trend: item.monthly_searches || []
        }))
        .sort((a, b) => b.volume - a.volume);
      
      allResults.summary.totalKeywords += volumeData.length;
      
      // Display top 3
      const top3 = allResults.searchVolume[category].slice(0, 3);
      top3.forEach((kw, i) => {
        console.log(`  ${i + 1}. "${kw.keyword}" - ${kw.volume.toLocaleString()} searches/mo`);
      });
    } else {
      console.log("  No data available");
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log("\n💡 GETTING KEYWORD SUGGESTIONS");
  console.log("-".repeat(40));

  // Get suggestions for top performing keywords
  const topSeeds = ["AI tools", "ChatGPT alternatives", "AI automation"];
  
  for (const seed of topSeeds) {
    const suggestions = await getKeywordSuggestions(seed, 30);
    
    if (suggestions.length > 0) {
      allResults.suggestions[seed] = suggestions
        .filter(item => item.search_volume > 100)
        .map(item => ({
          keyword: item.keyword,
          volume: item.search_volume || 0,
          competition: item.competition || "N/A",
          cpc: item.cpc || 0
        }))
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 20);
      
      console.log(`\n🌱 Related to "${seed}":`);
      const top3 = allResults.suggestions[seed].slice(0, 3);
      top3.forEach((kw, i) => {
        console.log(`  ${i + 1}. "${kw.keyword}" - ${kw.volume.toLocaleString()} searches/mo`);
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Compile summary
  const allKeywords = [];
  Object.values(allResults.searchVolume).forEach(list => allKeywords.push(...list));
  Object.values(allResults.suggestions).forEach(list => allKeywords.push(...list));
  
  allResults.summary.categoriesProcessed = Object.keys(keywordSets).length;
  allResults.summary.topKeywords = allKeywords
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 20);
  
  allResults.summary.lowCompetition = allKeywords
    .filter(kw => kw.competition === "LOW" || kw.competition === "MEDIUM")
    .filter(kw => kw.volume > 500)
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 20);

  // Display summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 SUMMARY");
  console.log("=".repeat(60));
  console.log(`✅ Total keywords analyzed: ${allResults.summary.totalKeywords}`);
  console.log(`🏆 High-volume keywords found: ${allResults.summary.topKeywords.length}`);
  console.log(`🎯 Low-competition opportunities: ${allResults.summary.lowCompetition.length}`);

  if (allResults.summary.topKeywords.length > 0) {
    console.log("\n🔥 TOP 5 KEYWORDS BY VOLUME:");
    allResults.summary.topKeywords.slice(0, 5).forEach((kw, i) => {
      console.log(`  ${i + 1}. "${kw.keyword}" - ${kw.volume.toLocaleString()} searches`);
    });
  }

  // Save results
  const dataDir = path.join(__dirname, '..', 'data', 'keywords');
  await fs.mkdir(dataDir, { recursive: true });
  
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = path.join(dataDir, `dataforseo-keywords-${timestamp}.json`);
  
  await fs.writeFile(filename, JSON.stringify(allResults, null, 2));
  console.log(`\n💾 Results saved to: ${filename}`);
  
  // Create CSV export
  const csvFilename = path.join(dataDir, `dataforseo-keywords-${timestamp}.csv`);
  const csv = createCSV(allKeywords);
  await fs.writeFile(csvFilename, csv);
  console.log(`📊 CSV saved to: ${csvFilename}`);
}

function createCSV(keywords) {
  const headers = ["Keyword", "Search Volume", "Competition", "CPC"].join(",");
  const rows = keywords.map(kw => 
    [
      `"${kw.keyword}"`,
      kw.volume,
      `"${kw.competition}"`,
      kw.cpc
    ].join(",")
  );
  return [headers, ...rows].join("\n");
}

// Run the script
main().catch(error => {
  console.error("\n🚨 Fatal error:", error.message);
  process.exit(1);
});