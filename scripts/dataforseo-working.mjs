#!/usr/bin/env node
/**
 * DataForSEO Working Version - Uses proven endpoints
 * Focuses on Google keyword suggestions which typically work better
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

// Core seed keywords for SiteOptz
const seedKeywords = [
  "AI tools",
  "ChatGPT alternatives", 
  "best AI tools",
  "AI writing tools",
  "AI automation tools",
  "AI SEO tools",
  "ChatGPT vs Claude",
  "free AI tools"
];

async function checkBalance() {
  try {
    const response = await client.get("/appendix/user_data");
    const balance = response.data.tasks[0].result[0].money.balance;
    return balance;
  } catch (error) {
    console.error("Error checking balance:", error.message);
    return 0;
  }
}

async function getKeywordSuggestions(seed, limit = 100) {
  try {
    console.log(`\n🔍 Getting suggestions for: "${seed}"`);
    
    const response = await client.post(
      "/keywords_data/google/keyword_suggestions/live",
      [{
        keyword: seed,
        language_code: "en",
        location_code: 2840, // USA
        limit: limit,
        include_seed_keyword: true,
        sort_by: "search_volume"
      }]
    );
    
    if (response.data.status_code === 20000 && response.data.tasks?.[0]?.result?.[0]?.items) {
      const items = response.data.tasks[0].result[0].items;
      console.log(`  ✅ Found ${items.length} related keywords`);
      
      return items.map(item => ({
        keyword: item.keyword,
        volume: item.keyword_info?.search_volume || 0,
        cpc: item.keyword_info?.cpc || 0,
        competition: item.keyword_info?.competition || "N/A",
        competition_index: item.keyword_info?.competition_index || 0,
        source: seed
      }));
    }
    
    console.log(`  ⚠️  No suggestions found for "${seed}"`);
    return [];
    
  } catch (error) {
    console.error(`  ❌ Error for "${seed}":`, error.response?.data?.status_message || error.message);
    return [];
  }
}

async function getKeywordsForKeywords(seed, limit = 50) {
  try {
    console.log(`\n💡 Getting related keywords for: "${seed}"`);
    
    const response = await client.post(
      "/keywords_data/google/keywords_for_keywords/live", 
      [{
        keyword: seed,
        language_code: "en",
        location_code: 2840,
        limit: limit,
        include_seed_keyword: false,
        sort_by: "search_volume",
        filters: [
          ["search_volume", ">", 100]
        ]
      }]
    );
    
    if (response.data.status_code === 20000 && response.data.tasks?.[0]?.result?.[0]?.items) {
      const items = response.data.tasks[0].result[0].items;
      console.log(`  ✅ Found ${items.length} related keywords`);
      
      return items.map(item => ({
        keyword: item.keyword,
        volume: item.search_volume || 0,
        cpc: item.cpc || 0,
        competition: item.competition || "N/A",
        competition_index: item.competition_index || 0,
        source: `related_to_${seed}`
      }));
    }
    
    console.log(`  ⚠️  No related keywords found for "${seed}"`);
    return [];
    
  } catch (error) {
    console.error(`  ❌ Error for "${seed}":`, error.response?.data?.status_message || error.message);
    return [];
  }
}

async function getSearchVolume(keywords) {
  try {
    console.log(`\n📊 Getting search volumes for ${keywords.length} keywords...`);
    
    const response = await client.post(
      "/keywords_data/google/search_volume/live",
      [{
        keywords: keywords,
        language_code: "en",
        location_code: 2840,
        sort_by: "search_volume"
      }]
    );
    
    if (response.data.status_code === 20000 && response.data.tasks?.[0]?.result?.[0]?.items) {
      const items = response.data.tasks[0].result[0].items;
      console.log(`  ✅ Got search volume data for ${items.length} keywords`);
      
      return items.map(item => ({
        keyword: item.keyword,
        volume: item.search_volume || 0,
        cpc: item.cpc || 0,
        competition: item.competition || "N/A",
        competition_index: item.competition_index || 0
      }));
    }
    
    console.log(`  ⚠️  No search volume data returned`);
    return [];
    
  } catch (error) {
    console.error(`  ❌ Error getting search volumes:`, error.response?.data?.status_message || error.message);
    return [];
  }
}

async function main() {
  console.log("\n🚀 DataForSEO Working Version - Keyword Research");
  console.log("=".repeat(70));
  
  const startBalance = await checkBalance();
  console.log(`💰 Starting balance: $${startBalance.toFixed(2)}`);
  
  const results = {
    timestamp: new Date().toISOString(),
    startBalance: startBalance,
    seedKeywords: seedKeywords,
    allKeywords: [],
    suggestions: {},
    related: {},
    summary: {
      totalKeywords: 0,
      uniqueKeywords: 0,
      topKeywords: [],
      opportunities: [],
      categories: {}
    }
  };
  
  console.log("\n🌱 GETTING KEYWORD SUGGESTIONS");
  console.log("=".repeat(50));
  
  // Get suggestions for each seed keyword
  for (const seed of seedKeywords) {
    const suggestions = await getKeywordSuggestions(seed, 50);
    if (suggestions.length > 0) {
      results.suggestions[seed] = suggestions;
      results.allKeywords.push(...suggestions);
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log("\n🔗 GETTING RELATED KEYWORDS");
  console.log("=".repeat(50));
  
  // Get related keywords for top performers
  const topSeeds = ["AI tools", "ChatGPT alternatives", "best AI tools"];
  
  for (const seed of topSeeds) {
    const related = await getKeywordsForKeywords(seed, 30);
    if (related.length > 0) {
      results.related[seed] = related;
      results.allKeywords.push(...related);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Remove duplicates and sort
  const uniqueKeywords = Array.from(
    new Map(results.allKeywords.map(k => [k.keyword.toLowerCase(), k])).values()
  );
  
  results.allKeywords = uniqueKeywords.sort((a, b) => b.volume - a.volume);
  results.summary.totalKeywords = results.allKeywords.length;
  results.summary.uniqueKeywords = uniqueKeywords.length;
  
  // Analyze results
  results.summary.topKeywords = results.allKeywords
    .filter(k => k.volume > 0)
    .slice(0, 20);
  
  // Find high-opportunity keywords (good volume + low competition)
  results.summary.opportunities = results.allKeywords
    .filter(k => k.volume > 1000 && k.competition_index < 50)
    .sort((a, b) => {
      const scoreA = a.volume / Math.max(a.competition_index, 1);
      const scoreB = b.volume / Math.max(b.competition_index, 1);
      return scoreB - scoreA;
    })
    .slice(0, 15);
  
  // Categorize keywords
  const categories = {
    'AI Tools General': [],
    'Comparisons': [],
    'Specific Tools': [],
    'Use Cases': [],
    'Free/Paid': []
  };
  
  results.allKeywords.forEach(kw => {
    const keyword = kw.keyword.toLowerCase();
    if (keyword.includes('vs ') || keyword.includes('versus') || keyword.includes('compared')) {
      categories['Comparisons'].push(kw);
    } else if (keyword.includes('free') || keyword.includes('paid') || keyword.includes('pricing')) {
      categories['Free/Paid'].push(kw);
    } else if (keyword.includes('chatgpt') || keyword.includes('claude') || keyword.includes('gemini')) {
      categories['Specific Tools'].push(kw);
    } else if (keyword.includes('for ') || keyword.includes('automation') || keyword.includes('writing')) {
      categories['Use Cases'].push(kw);
    } else {
      categories['AI Tools General'].push(kw);
    }
  });
  
  results.summary.categories = Object.fromEntries(
    Object.entries(categories).map(([cat, keywords]) => [
      cat, 
      keywords.sort((a, b) => b.volume - a.volume).slice(0, 10)
    ])
  );
  
  // Display results
  console.log("\n" + "=".repeat(70));
  console.log("📊 KEYWORD RESEARCH RESULTS");
  console.log("=".repeat(70));
  
  console.log(`\n✅ Total keywords collected: ${results.summary.totalKeywords}`);
  console.log(`🔍 Unique keywords: ${results.summary.uniqueKeywords}`);
  console.log(`🏆 Keywords with volume data: ${results.summary.topKeywords.length}`);
  console.log(`🎯 High-opportunity keywords: ${results.summary.opportunities.length}`);
  
  if (results.summary.topKeywords.length > 0) {
    console.log("\n🏆 TOP 10 KEYWORDS BY SEARCH VOLUME:");
    console.log("-".repeat(50));
    
    results.summary.topKeywords.slice(0, 10).forEach((kw, i) => {
      console.log(`${(i + 1).toString().padStart(2)}. "${kw.keyword}"`);
      console.log(`    Volume: ${kw.volume.toLocaleString().padStart(8)} | Competition: ${kw.competition_index.toString().padStart(2)} | CPC: $${kw.cpc.toFixed(2)}`);
    });
  }
  
  if (results.summary.opportunities.length > 0) {
    console.log("\n🎯 TOP OPPORTUNITIES (High Volume + Low Competition):");
    console.log("-".repeat(50));
    
    results.summary.opportunities.slice(0, 8).forEach((kw, i) => {
      const score = Math.round(kw.volume / Math.max(kw.competition_index, 1));
      console.log(`${(i + 1).toString().padStart(2)}. "${kw.keyword}"`);
      console.log(`    Volume: ${kw.volume.toLocaleString().padStart(8)} | Competition: ${kw.competition_index.toString().padStart(2)} | Score: ${score.toLocaleString()}`);
    });
  }
  
  // Show category breakdown
  console.log("\n📂 KEYWORDS BY CATEGORY:");
  console.log("-".repeat(40));
  
  Object.entries(results.summary.categories).forEach(([category, keywords]) => {
    if (keywords.length > 0) {
      console.log(`\n${category}: ${keywords.length} keywords`);
      keywords.slice(0, 3).forEach(kw => {
        console.log(`  • "${kw.keyword}" (${kw.volume.toLocaleString()} searches)`);
      });
    }
  });
  
  // Save comprehensive results
  const dataDir = path.join(__dirname, '..', 'data', 'keywords');
  await fs.mkdir(dataDir, { recursive: true });
  
  const timestamp = new Date().toISOString().split('T')[0];
  const jsonFile = path.join(dataDir, `siteoptz-keywords-${timestamp}.json`);
  
  await fs.writeFile(jsonFile, JSON.stringify(results, null, 2));
  
  // Create actionable CSV
  const csvContent = generateCSV(results.allKeywords);
  const csvFile = path.join(dataDir, `siteoptz-keywords-${timestamp}.csv`);
  
  await fs.writeFile(csvFile, csvContent);
  
  // Create opportunities CSV
  const opportunitiesCSV = generateOpportunitiesCSV(results.summary.opportunities);
  const oppFile = path.join(dataDir, `siteoptz-opportunities-${timestamp}.csv`);
  
  await fs.writeFile(oppFile, opportunitiesCSV);
  
  // Final balance check
  const endBalance = await checkBalance();
  const cost = startBalance - endBalance;
  
  console.log("\n" + "=".repeat(70));
  console.log("💾 FILES SAVED:");
  console.log("-".repeat(40));
  console.log(`📄 Complete data: ${jsonFile}`);
  console.log(`📊 All keywords: ${csvFile}`);
  console.log(`🎯 Opportunities: ${oppFile}`);
  console.log(`\n💰 API Cost: $${cost.toFixed(2)} | Remaining: $${endBalance.toFixed(2)}`);
  console.log("=".repeat(70));
  
  return results;
}

function generateCSV(keywords) {
  const headers = [
    "Keyword",
    "Search Volume",
    "Competition",
    "Competition Index", 
    "CPC",
    "Source",
    "Priority",
    "Action"
  ];
  
  const rows = keywords.map(kw => {
    // Calculate priority score
    const score = kw.volume / Math.max(kw.competition_index, 1);
    
    let priority = "Low";
    let action = "Monitor";
    
    if (score > 1000 && kw.volume > 5000) {
      priority = "High";
      action = "Target Immediately";
    } else if (score > 500 && kw.volume > 2000) {
      priority = "Medium";
      action = "Plan Content";
    } else if (kw.competition_index < 30 && kw.volume > 500) {
      priority = "Medium";
      action = "Quick Win";
    }
    
    return [
      `"${kw.keyword}"`,
      kw.volume,
      `"${kw.competition}"`,
      kw.competition_index,
      kw.cpc.toFixed(2),
      `"${kw.source || 'unknown'}"`,
      `"${priority}"`,
      `"${action}"`
    ].join(",");
  });
  
  return [headers.join(","), ...rows].join("\n");
}

function generateOpportunitiesCSV(opportunities) {
  const headers = [
    "Keyword",
    "Search Volume",
    "Competition Index",
    "CPC",
    "Opportunity Score",
    "Content Ideas",
    "Target Pages"
  ];
  
  const rows = opportunities.map(kw => {
    const score = Math.round(kw.volume / Math.max(kw.competition_index, 1));
    
    let contentIdeas = "Blog post, Tool comparison";
    let targetPages = "Blog, Tools page";
    
    if (kw.keyword.includes('vs ')) {
      contentIdeas = "Comparison article, Feature matrix";
      targetPages = "Compare page, Blog";
    } else if (kw.keyword.includes('free')) {
      contentIdeas = "Free tools roundup, Pricing guide";
      targetPages = "Tools category, Pricing";
    } else if (kw.keyword.includes('best')) {
      contentIdeas = "Best tools list, Reviews";
      targetPages = "Tools page, Categories";
    }
    
    return [
      `"${kw.keyword}"`,
      kw.volume,
      kw.competition_index,
      kw.cpc.toFixed(2),
      score,
      `"${contentIdeas}"`,
      `"${targetPages}"`
    ].join(",");
  });
  
  return [headers.join(","), ...rows].join("\n");
}

// Run the script
main()
  .then(() => {
    console.log("\n✅ Keyword research completed successfully!");
    process.exit(0);
  })
  .catch(error => {
    console.error("\n🚨 Fatal error:", error.message);
    process.exit(1);
  });