#!/usr/bin/env node
/**
 * DataForSEO Basic - Uses only basic endpoints that should work
 * Focuses on available endpoints for keyword research
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

// Target keywords for SiteOptz
const targetKeywords = [
  // Core AI tools keywords
  "AI tools",
  "artificial intelligence tools", 
  "ChatGPT",
  "Claude AI",
  "Gemini AI",
  "GPT-4",
  "best AI tools",
  "free AI tools",
  "AI software",
  "AI platforms",
  
  // Comparison keywords
  "ChatGPT vs Claude",
  "ChatGPT vs Gemini", 
  "Claude vs Gemini",
  "AI tool comparison",
  "ChatGPT alternatives",
  
  // Category keywords
  "AI writing tools",
  "AI image generator",
  "AI code generator", 
  "AI SEO tools",
  "AI marketing tools",
  "AI automation",
  "AI chatbot",
  "AI video generator",
  "AI voice generator",
  "AI data analysis",
  
  // Business/industry
  "AI for business",
  "enterprise AI tools",
  "AI for marketing",
  "AI for content creation",
  "AI for developers",
  "AI for designers",
  
  // Long-tail opportunities
  "how to use AI tools",
  "AI tools review",
  "AI tools pricing",
  "AI tools features",
  "top AI tools 2024"
];

async function checkEndpoints() {
  console.log("🔍 Checking available DataForSEO endpoints...\n");
  
  // Check what endpoints are available
  try {
    const response = await client.get("/appendix/locations");
    console.log("✅ Locations endpoint available");
  } catch (error) {
    console.log("❌ Locations endpoint:", error.response?.status);
  }
  
  try {
    const response = await client.get("/appendix/languages");
    console.log("✅ Languages endpoint available");
  } catch (error) {
    console.log("❌ Languages endpoint:", error.response?.status);
  }
  
  // Check Google Ads endpoints
  try {
    const response = await axios.post(
      "https://api.dataforseo.com/v3/keywords_data/google_ads/ad_traffic_by_keywords/live",
      [{
        keywords: ["AI tools"],
        language_code: "en",
        location_code: 2840,
        date_from: "2024-01-01",
        date_to: "2024-12-31"
      }], 
      {
        auth: {
          username: "antonio@siteoptz.com",
          password: "8215cb0ce338b385"
        },
        timeout: 10000
      }
    );
    console.log("✅ Google Ads endpoint available");
  } catch (error) {
    console.log("❌ Google Ads endpoint:", error.response?.status, error.response?.data?.status_message);
  }
  
  // Try the simplest working endpoint - search volume
  try {
    const response = await client.post(
      "/keywords_data/google_ads/search_volume/live",
      [{
        keywords: ["test"],
        language_code: "en",
        location_code: 2840
      }]
    );
    console.log("✅ Search volume endpoint available");
    return true;
  } catch (error) {
    console.log("❌ Search volume endpoint:", error.response?.status, error.response?.data?.status_message);
  }
  
  return false;
}

async function getSearchVolumeData(keywords, batchSize = 10) {
  const results = [];
  
  // Process in batches to avoid overwhelming the API
  for (let i = 0; i < keywords.length; i += batchSize) {
    const batch = keywords.slice(i, i + batchSize);
    
    try {
      console.log(`📊 Processing batch ${Math.floor(i/batchSize) + 1}: ${batch.join(', ')}...`);
      
      const response = await client.post(
        "/keywords_data/google_ads/search_volume/live",
        [{
          keywords: batch,
          language_code: "en", 
          location_code: 2840, // USA
          sort_by: "search_volume"
        }]
      );
      
      if (response.data.status_code === 20000) {
        console.log(`✅ API call successful`);
        
        if (response.data.tasks?.[0]?.result?.[0]?.items) {
          const items = response.data.tasks[0].result[0].items;
          console.log(`📈 Got data for ${items.length} keywords`);
          
          items.forEach(item => {
            results.push({
              keyword: item.keyword,
              volume: item.search_volume || 0,
              cpc: item.cpc || 0,
              competition: item.competition || "N/A",
              competition_index: item.competition_index || 0,
              monthly_searches: item.monthly_searches || []
            });
          });
        } else {
          console.log(`⚠️  No data items in response`);
        }
      } else {
        console.log(`❌ API error: ${response.data.status_message}`);
      }
      
    } catch (error) {
      console.error(`❌ Batch ${Math.floor(i/batchSize) + 1} failed:`, 
        error.response?.data?.status_message || error.message);
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  return results;
}

async function main() {
  console.log("\n🚀 DataForSEO Basic - Keyword Volume Research");
  console.log("=".repeat(70));
  
  // Check balance
  const userResponse = await client.get("/appendix/user_data");
  const balance = userResponse.data.tasks[0].result[0].money.balance;
  console.log(`💰 Account balance: $${balance.toFixed(2)}`);
  
  // Check what endpoints work
  const endpointsWork = await checkEndpoints();
  
  if (!endpointsWork) {
    console.log("\n⚠️  Unable to connect to keyword research endpoints.");
    console.log("This might be due to subscription limitations.");
    return;
  }
  
  console.log(`\n🎯 Researching ${targetKeywords.length} keywords...\n`);
  
  const startTime = Date.now();
  const keywordData = await getSearchVolumeData(targetKeywords, 8);
  const endTime = Date.now();
  
  // Sort by search volume
  keywordData.sort((a, b) => b.volume - a.volume);
  
  // Analyze the data
  const analysis = {
    timestamp: new Date().toISOString(),
    totalKeywords: keywordData.length,
    highVolume: keywordData.filter(k => k.volume > 10000),
    mediumVolume: keywordData.filter(k => k.volume >= 1000 && k.volume <= 10000),
    lowVolume: keywordData.filter(k => k.volume > 0 && k.volume < 1000),
    noVolume: keywordData.filter(k => k.volume === 0),
    lowCompetition: keywordData.filter(k => k.competition_index < 30 && k.volume > 500),
    opportunities: [],
    categories: {}
  };
  
  // Find opportunities (high volume, low competition)
  analysis.opportunities = keywordData
    .filter(k => k.volume > 1000 && k.competition_index < 50)
    .sort((a, b) => {
      const scoreA = a.volume / Math.max(a.competition_index, 1);
      const scoreB = b.volume / Math.max(b.competition_index, 1);
      return scoreB - scoreA;
    })
    .slice(0, 15);
  
  // Categorize keywords
  const categories = {
    'Core AI Tools': [],
    'Specific Tools': [],
    'Comparisons': [], 
    'Categories': [],
    'Business Use': [],
    'Long-tail': []
  };
  
  keywordData.forEach(kw => {
    const keyword = kw.keyword.toLowerCase();
    if (keyword.includes('vs ') || keyword.includes('comparison')) {
      categories['Comparisons'].push(kw);
    } else if (['chatgpt', 'claude', 'gemini', 'gpt-4'].some(tool => keyword.includes(tool))) {
      categories['Specific Tools'].push(kw);
    } else if (keyword.includes('business') || keyword.includes('enterprise') || keyword.includes('marketing')) {
      categories['Business Use'].push(kw);
    } else if (keyword.includes('how to') || keyword.includes('review') || keyword.includes('pricing')) {
      categories['Long-tail'].push(kw);
    } else if (keyword.includes('writing') || keyword.includes('image') || keyword.includes('code') || keyword.includes('seo')) {
      categories['Categories'].push(kw);
    } else {
      categories['Core AI Tools'].push(kw);
    }
  });
  
  analysis.categories = Object.fromEntries(
    Object.entries(categories).map(([cat, kws]) => [
      cat, 
      kws.sort((a, b) => b.volume - a.volume).slice(0, 8)
    ])
  );
  
  // Display results
  console.log("\n" + "=".repeat(70));
  console.log("📊 KEYWORD RESEARCH RESULTS");
  console.log("=".repeat(70));
  
  console.log(`\n✅ Keywords analyzed: ${analysis.totalKeywords}`);
  console.log(`🔥 High volume (>10K): ${analysis.highVolume.length}`);
  console.log(`📈 Medium volume (1K-10K): ${analysis.mediumVolume.length}`);
  console.log(`📊 Low volume (<1K): ${analysis.lowVolume.length}`);
  console.log(`🎯 Opportunities found: ${analysis.opportunities.length}`);
  console.log(`⏱️  Processing time: ${Math.round((endTime - startTime) / 1000)}s`);
  
  if (keywordData.length > 0) {
    console.log("\n🏆 TOP 15 KEYWORDS BY SEARCH VOLUME:");
    console.log("-".repeat(60));
    
    keywordData.slice(0, 15).forEach((kw, i) => {
      console.log(`${(i + 1).toString().padStart(2)}. "${kw.keyword}"`);
      console.log(`    Volume: ${kw.volume.toLocaleString().padStart(10)} | Comp: ${kw.competition_index.toString().padStart(2)} | CPC: $${kw.cpc.toFixed(2)}`);
    });
  }
  
  if (analysis.opportunities.length > 0) {
    console.log("\n🎯 TOP OPPORTUNITIES (High Volume + Low Competition):");
    console.log("-".repeat(60));
    
    analysis.opportunities.slice(0, 10).forEach((kw, i) => {
      const score = Math.round(kw.volume / Math.max(kw.competition_index, 1));
      console.log(`${(i + 1).toString().padStart(2)}. "${kw.keyword}"`);
      console.log(`    Volume: ${kw.volume.toLocaleString().padStart(10)} | Comp: ${kw.competition_index.toString().padStart(2)} | Score: ${score.toLocaleString()}`);
    });
  }
  
  // Show category breakdown
  console.log("\n📂 KEYWORDS BY CATEGORY:");
  console.log("-".repeat(50));
  
  Object.entries(analysis.categories).forEach(([category, keywords]) => {
    if (keywords.length > 0) {
      console.log(`\n${category} (${keywords.length} keywords):`);
      keywords.slice(0, 4).forEach(kw => {
        console.log(`  • "${kw.keyword}" (${kw.volume.toLocaleString()} searches/mo)`);
      });
    }
  });
  
  // Save results
  const dataDir = path.join(__dirname, '..', 'data', 'keywords');
  await fs.mkdir(dataDir, { recursive: true });
  
  const timestamp = new Date().toISOString().split('T')[0];
  
  // Save complete analysis
  const analysisFile = path.join(dataDir, `siteoptz-analysis-${timestamp}.json`);
  await fs.writeFile(analysisFile, JSON.stringify({
    ...analysis,
    rawData: keywordData
  }, null, 2));
  
  // Save actionable CSV
  const csvFile = path.join(dataDir, `siteoptz-keywords-${timestamp}.csv`);
  await fs.writeFile(csvFile, generateActionableCSV(keywordData));
  
  // Save opportunities CSV
  const oppFile = path.join(dataDir, `siteoptz-opportunities-${timestamp}.csv`);
  await fs.writeFile(oppFile, generateOpportunitiesCSV(analysis.opportunities));
  
  // Final balance
  const finalResponse = await client.get("/appendix/user_data");
  const finalBalance = finalResponse.data.tasks[0].result[0].money.balance;
  const cost = balance - finalBalance;
  
  console.log("\n" + "=".repeat(70));
  console.log("💾 RESULTS SAVED:");
  console.log("-".repeat(40));
  console.log(`📊 Complete analysis: ${analysisFile}`);
  console.log(`📋 All keywords CSV: ${csvFile}`);
  console.log(`🎯 Opportunities CSV: ${oppFile}`);
  console.log(`\n💰 Research cost: $${cost.toFixed(2)} | Remaining: $${finalBalance.toFixed(2)}`);
  console.log("=".repeat(70));
  
  return { analysis, keywordData };
}

function generateActionableCSV(keywords) {
  const headers = [
    "Keyword",
    "Monthly Volume",
    "Competition",
    "Competition Index",
    "CPC",
    "Priority",
    "Content Type",
    "Target Page",
    "Notes"
  ];
  
  const rows = keywords.map(kw => {
    const score = kw.volume / Math.max(kw.competition_index, 1);
    
    let priority = "Low";
    let contentType = "Blog Post";
    let targetPage = "Blog";
    let notes = "";
    
    if (score > 1000 && kw.volume > 5000) {
      priority = "High";
      contentType = "Pillar Page";
      targetPage = "Main Category";
      notes = "High-priority target";
    } else if (score > 500 && kw.volume > 2000) {
      priority = "Medium";
      contentType = "Guide/Tutorial";
      targetPage = "Resource Section";
      notes = "Good opportunity";
    } else if (kw.competition_index < 30 && kw.volume > 500) {
      priority = "Medium";
      contentType = "Quick Guide";
      targetPage = "Blog/Tools";
      notes = "Low competition win";
    }
    
    // Specific recommendations based on keyword type
    const keyword = kw.keyword.toLowerCase();
    if (keyword.includes('vs ')) {
      contentType = "Comparison Article";
      targetPage = "Compare Section";
    } else if (keyword.includes('best ')) {
      contentType = "Roundup/Review";
      targetPage = "Tools Page";
    } else if (keyword.includes('free ')) {
      contentType = "Free Tools List";
      targetPage = "Category Page";
    }
    
    return [
      `"${kw.keyword}"`,
      kw.volume,
      `"${kw.competition}"`,
      kw.competition_index,
      kw.cpc.toFixed(2),
      `"${priority}"`,
      `"${contentType}"`,
      `"${targetPage}"`,
      `"${notes}"`
    ].join(",");
  });
  
  return [headers.join(","), ...rows].join("\n");
}

function generateOpportunitiesCSV(opportunities) {
  const headers = [
    "Keyword",
    "Volume",
    "Competition",
    "CPC",
    "Opportunity Score",
    "Recommended Action",
    "Content Strategy",
    "Timeline"
  ];
  
  const rows = opportunities.map(kw => {
    const score = Math.round(kw.volume / Math.max(kw.competition_index, 1));
    
    let action = "Create Content";
    let strategy = "SEO-optimized blog post";
    let timeline = "2-4 weeks";
    
    if (score > 2000) {
      action = "Priority Target";
      strategy = "Comprehensive guide + supporting content";
      timeline = "1-2 weeks";
    } else if (kw.keyword.includes('vs ')) {
      strategy = "Detailed comparison with feature matrix";
      timeline = "1-2 weeks";
    }
    
    return [
      `"${kw.keyword}"`,
      kw.volume,
      kw.competition_index,
      kw.cpc.toFixed(2),
      score,
      `"${action}"`,
      `"${strategy}"`,
      `"${timeline}"`
    ].join(",");
  });
  
  return [headers.join(","), ...rows].join("\n");
}

// Run the research
main()
  .then(() => {
    console.log("\n✅ Keyword research completed successfully!");
    process.exit(0);
  })
  .catch(error => {
    console.error("\n🚨 Fatal error:", error.message);
    if (error.response?.data) {
      console.error("API Response:", JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  });