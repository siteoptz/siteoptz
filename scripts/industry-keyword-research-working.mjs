#!/usr/bin/env node
/**
 * Industry-Specific AI Keyword Research for SiteOptz - Working Version
 * Uses the proven Google Ads endpoint that actually returns data
 * Based on the successful dataforseo-lite.mjs pattern
 */

import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// DataForSEO API client
const client = axios.create({
  baseURL: "https://api.dataforseo.com/v3",
  auth: {
    username: "antonio@siteoptz.com", 
    password: "8215cb0ce338b385"
  },
  timeout: 30000
});

// 11 Industries with proven keywords that actually exist in search data
const industries = {
  'healthcare-life-sciences': {
    name: 'Healthcare & Life Sciences',
    seedKeywords: [
      'artificial intelligence',
      'AI tools',
      'machine learning',
      'healthcare software',
      'medical technology',
      'AI healthcare',
      'healthcare AI',
      'medical AI'
    ]
  },
  'finance-banking': {
    name: 'Finance & Banking',
    seedKeywords: [
      'fintech',
      'AI finance',
      'banking technology',
      'artificial intelligence',
      'financial software',
      'robo advisor',
      'AI banking',
      'financial AI'
    ]
  },
  'retail-ecommerce': {
    name: 'Retail & E-Commerce',
    seedKeywords: [
      'ecommerce tools',
      'AI retail',
      'retail technology',
      'artificial intelligence',
      'ecommerce software',
      'retail AI',
      'AI ecommerce',
      'shopping AI'
    ]
  },
  'manufacturing-supply-chain': {
    name: 'Manufacturing & Supply Chain',
    seedKeywords: [
      'smart factory',
      'AI manufacturing',
      'industrial automation',
      'artificial intelligence',
      'manufacturing software',
      'factory automation',
      'smart manufacturing',
      'AI industrial'
    ]
  },
  'transportation-logistics': {
    name: 'Transportation & Logistics',
    seedKeywords: [
      'logistics software',
      'AI logistics',
      'fleet management',
      'artificial intelligence',
      'transportation technology',
      'supply chain AI',
      'smart logistics',
      'AI transportation'
    ]
  },
  'marketing-advertising-media': {
    name: 'Marketing, Advertising & Media',
    seedKeywords: [
      'AI marketing',
      'marketing automation',
      'artificial intelligence',
      'marketing tools',
      'AI advertising',
      'martech',
      'advertising AI',
      'marketing AI tools'
    ]
  },
  'energy-utilities': {
    name: 'Energy & Utilities',
    seedKeywords: [
      'smart grid',
      'AI energy',
      'energy management',
      'artificial intelligence',
      'renewable energy',
      'smart energy',
      'energy AI',
      'utilities AI'
    ]
  },
  'education-edtech': {
    name: 'Education & EdTech',
    seedKeywords: [
      'AI education',
      'educational technology',
      'edtech',
      'artificial intelligence',
      'online learning',
      'AI learning',
      'education AI',
      'learning AI'
    ]
  },
  'legal-compliance': {
    name: 'Legal & Compliance',
    seedKeywords: [
      'legal technology',
      'AI legal',
      'legaltech',
      'artificial intelligence',
      'legal software',
      'legal AI',
      'AI law',
      'compliance AI'
    ]
  },
  'human-resources-recruiting': {
    name: 'Human Resources & Recruiting',
    seedKeywords: [
      'HR technology',
      'AI recruiting',
      'recruitment software',
      'artificial intelligence',
      'HR software',
      'AI HR',
      'recruiting AI',
      'talent AI'
    ]
  },
  'aerospace-defense': {
    name: 'Aerospace & Defense',
    seedKeywords: [
      'aerospace technology',
      'defense technology',
      'AI aerospace',
      'artificial intelligence',
      'military technology',
      'defense AI',
      'aviation AI',
      'aerospace AI'
    ]
  }
};

async function checkBalance() {
  try {
    const response = await client.get("/appendix/user_data");
    if (response.data?.tasks?.[0]?.result?.[0]) {
      const balance = response.data.tasks[0].result[0].money?.balance || 0;
      return balance;
    }
    return 0;
  } catch (error) {
    console.error("Error checking balance:", error.message);
    return 0;
  }
}

async function getKeywordData(keywords, industryName) {
  try {
    console.log(`    📊 Analyzing ${keywords.length} keywords for ${industryName}...`);
    
    // Use Google Ads endpoint (proven to work)
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
      const items = response.data.tasks[0].result[0].items;
      console.log(`      ✅ Got data for ${items.length} keywords`);
      return items;
    }
    
    console.log(`      ⚠️  No data returned for ${industryName}`);
    return [];
  } catch (error) {
    console.error(`      ❌ API Error for ${industryName}:`, error.response?.data?.status_message || error.message);
    return [];
  }
}

async function getKeywordSuggestions(seed, limit = 25) {
  try {
    console.log(`    💡 Getting suggestions for: "${seed}"`);
    
    const response = await client.post(
      "/keywords_data/google/keyword_suggestions/live",
      [{
        keyword: seed,
        language_code: "en",
        location_code: 2840,
        limit: limit,
        include_seed_keyword: false,
        sort_by: "search_volume"
      }]
    );
    
    if (response.data?.tasks?.[0]?.result?.[0]?.items) {
      const items = response.data.tasks[0].result[0].items;
      console.log(`      ✅ Found ${items.length} suggestions`);
      return items.map(item => ({
        keyword: item.keyword,
        volume: item.keyword_info?.search_volume || 0
      })).filter(k => k.volume > 100);
    }
    
    return [];
  } catch (error) {
    console.error(`      ❌ Suggestions error for "${seed}":`, error.message);
    return [];
  }
}

async function processIndustry(industrySlug, industryData) {
  console.log(`\n🏢 PROCESSING: ${industryData.name.toUpperCase()}`);
  console.log("=".repeat(60));
  
  const results = {
    slug: industrySlug,
    name: industryData.name,
    keywords: []
  };
  
  // Get keyword data for all seed keywords at once
  const keywordData = await getKeywordData(industryData.seedKeywords, industryData.name);
  
  if (keywordData.length > 0) {
    // Process and filter keywords
    const processedKeywords = keywordData
      .map(item => ({
        keyword: item.keyword,
        search_volume: item.search_volume || 0,
        cpc: item.cpc || 0,
        competition: item.competition || "N/A",
        competition_index: item.competition_index || 0,
        difficulty: 50 // Default difficulty
      }))
      .filter(k => k.search_volume > 0)
      .sort((a, b) => b.search_volume - a.search_volume);
    
    results.keywords = processedKeywords;
    
    // If we have budget and got results, try to get suggestions for top AI-related keyword
    const aiKeyword = processedKeywords.find(k => 
      k.keyword.toLowerCase().includes('ai') || 
      k.keyword.toLowerCase().includes('artificial intelligence')
    );
    
    if (aiKeyword && results.keywords.length < 10) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const suggestions = await getKeywordSuggestions(aiKeyword.keyword, 15);
      
      // Add relevant suggestions
      suggestions.forEach(suggestion => {
        if (!results.keywords.find(k => k.keyword.toLowerCase() === suggestion.keyword.toLowerCase())) {
          results.keywords.push({
            ...suggestion,
            cpc: 0,
            competition: "N/A",
            competition_index: 0,
            difficulty: 50,
            search_volume: suggestion.volume
          });
        }
      });
    }
    
    // Re-sort and limit to top keywords
    results.keywords = results.keywords
      .sort((a, b) => b.search_volume - a.search_volume)
      .slice(0, 10);
    
    // Mark primary and secondary keywords
    results.keywords = results.keywords.map((k, index) => ({
      ...k,
      keyword_type: index === 0 ? 'primary' : 'secondary'
    }));
  }
  
  // Display results
  console.log(`  ✅ Found ${results.keywords.length} keywords with search volume`);
  
  if (results.keywords.length > 0) {
    const primary = results.keywords[0];
    console.log(`  🎯 PRIMARY: "${primary.keyword}" (${primary.search_volume.toLocaleString()} searches)`);
    
    console.log(`  📊 Top Keywords:`);
    results.keywords.slice(0, 3).forEach((kw, i) => {
      console.log(`     ${i + 1}. "${kw.keyword}" (${kw.search_volume.toLocaleString()} searches)`);
    });
  }
  
  return results;
}

async function main() {
  console.log("\n🚀 COMPREHENSIVE INDUSTRY AI KEYWORD RESEARCH - WORKING VERSION");
  console.log("=".repeat(80));
  console.log("DataForSEO Google Ads API - All 11 Industries");
  
  const startBalance = await checkBalance();
  console.log(`💰 Starting balance: $${startBalance.toFixed(2)}`);
  
  if (startBalance < 0.50) {
    console.error("⚠️  Warning: Low account balance. Results may be limited.");
  }
  
  const masterResults = {
    timestamp: new Date().toISOString(),
    startBalance: startBalance
  };
  
  // Process each industry
  for (const [slug, industryData] of Object.entries(industries)) {
    try {
      const industryResults = await processIndustry(slug, industryData);
      
      // Build the desired JSON structure
      masterResults[industryData.name] = {
        slug: slug,
        keywords: industryResults.keywords.map(k => ({
          keyword: k.keyword,
          search_volume: k.search_volume,
          cpc: k.cpc,
          competition: k.competition,
          difficulty: k.difficulty,
          keyword_type: k.keyword_type
        }))
      };
      
      // Rate limiting between industries
      console.log(`  ⏳ Waiting 2 seconds before next industry...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Error processing ${industryData.name}:`, error.message);
      
      // Add empty structure if error
      masterResults[industryData.name] = {
        slug: slug,
        keywords: []
      };
      
      continue;
    }
  }
  
  // Calculate summary statistics
  let totalKeywords = 0;
  const industryStats = [];
  const allKeywords = [];
  
  Object.entries(masterResults).forEach(([name, data]) => {
    if (data.keywords) {
      totalKeywords += data.keywords.length;
      industryStats.push({
        name: name,
        count: data.keywords.length,
        topVolume: data.keywords[0]?.search_volume || 0,
        topKeyword: data.keywords[0]?.keyword || 'N/A'
      });
      allKeywords.push(...data.keywords.map(k => ({...k, industry: name})));
    }
  });
  
  // Sort industries by keyword count
  industryStats.sort((a, b) => b.count - a.count);
  
  // Find top opportunities across all industries
  const topOpportunities = allKeywords
    .filter(k => k.search_volume > 1000)
    .sort((a, b) => b.search_volume - a.search_volume)
    .slice(0, 20);
  
  // Display results
  console.log("\n" + "=".repeat(80));
  console.log("📊 FINAL RESULTS");
  console.log("=".repeat(80));
  
  console.log(`\n🎯 TOP 10 KEYWORDS ACROSS ALL INDUSTRIES:`);
  console.log("-".repeat(60));
  
  topOpportunities.slice(0, 10).forEach((kw, i) => {
    console.log(`${(i + 1).toString().padStart(2)}. "${kw.keyword}" (${kw.industry})`);
    console.log(`    Volume: ${kw.search_volume.toLocaleString()} | CPC: $${kw.cpc.toFixed(2)}`);
  });
  
  console.log(`\n🏆 INDUSTRIES BY KEYWORD COUNT:`);
  console.log("-".repeat(40));
  
  industryStats.slice(0, 5).forEach((industry, i) => {
    console.log(`${(i + 1).toString().padStart(2)}. ${industry.name}: ${industry.count} keywords`);
    console.log(`    Top: "${industry.topKeyword}" (${industry.topVolume.toLocaleString()})`);
  });
  
  // Save comprehensive results
  const dataDir = path.join(__dirname, '..', 'data', 'keywords');
  await fs.mkdir(dataDir, { recursive: true });
  
  const timestamp = new Date().toISOString().split('T')[0];
  
  // Save in the requested JSON format (without metadata)
  const cleanResults = {};
  Object.entries(masterResults).forEach(([key, value]) => {
    if (key !== 'timestamp' && key !== 'startBalance') {
      cleanResults[key] = value;
    }
  });
  
  const jsonFile = path.join(dataDir, `industry-ai-keywords-final-${timestamp}.json`);
  await fs.writeFile(jsonFile, JSON.stringify(cleanResults, null, 2));
  
  // Save detailed analysis with metadata
  const detailedFile = path.join(dataDir, `industry-ai-analysis-detailed-${timestamp}.json`);
  await fs.writeFile(detailedFile, JSON.stringify({
    ...masterResults,
    summary: {
      totalKeywords,
      industryStats,
      topOpportunities
    }
  }, null, 2));
  
  // Create CSV for easy analysis
  const csvContent = generateCSV(cleanResults);
  const csvFile = path.join(dataDir, `industry-ai-keywords-final-${timestamp}.csv`);
  await fs.writeFile(csvFile, csvContent);
  
  // Final balance and cost
  const endBalance = await checkBalance();
  const cost = startBalance - endBalance;
  
  console.log("\n" + "=".repeat(80));
  console.log("💾 FILES SAVED:");
  console.log("-".repeat(40));
  console.log(`📄 Industry Keywords (Clean JSON): ${jsonFile}`);
  console.log(`📊 Detailed Analysis: ${detailedFile}`);
  console.log(`📋 CSV Export: ${csvFile}`);
  console.log(`\n💰 API Cost: $${cost.toFixed(2)} | Remaining: $${endBalance.toFixed(2)}`);
  console.log(`📊 Total Keywords: ${totalKeywords.toLocaleString()}`);
  console.log("=".repeat(80));
  
  return cleanResults;
}

function generateCSV(results) {
  const headers = [
    "Industry",
    "Slug",
    "Keyword", 
    "Search Volume",
    "CPC",
    "Competition",
    "Difficulty",
    "Keyword Type"
  ];
  
  const rows = [];
  
  Object.entries(results).forEach(([industryName, data]) => {
    data.keywords.forEach(kw => {
      rows.push([
        `"${industryName}"`,
        data.slug,
        `"${kw.keyword}"`,
        kw.search_volume,
        kw.cpc.toFixed(2),
        `"${kw.competition}"`,
        kw.difficulty || 0,
        kw.keyword_type
      ].join(","));
    });
  });
  
  return [headers.join(","), ...rows].join("\n");
}

// Run the script
main()
  .then(() => {
    console.log("\n✅ Industry keyword research completed successfully!");
    process.exit(0);
  })
  .catch(error => {
    console.error("\n🚨 Fatal error:", error.message);
    console.error(error.stack);
    process.exit(1);
  });