#!/usr/bin/env node
/**
 * Industry-Specific AI Keyword Research for SiteOptz - V2
 * Uses broader seed keywords and the keywords_for_keywords endpoint
 * Based on the working dataforseo-working.mjs pattern
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

// 11 Industries with broader, more searchable seed keywords
const industries = {
  'healthcare-life-sciences': {
    name: 'Healthcare & Life Sciences',
    seedKeywords: [
      'artificial intelligence healthcare',
      'AI medical',
      'healthcare technology',
      'medical artificial intelligence',
      'AI diagnosis',
      'healthcare automation',
      'medical AI'
    ]
  },
  'finance-banking': {
    name: 'Finance & Banking',
    seedKeywords: [
      'artificial intelligence finance',
      'AI banking',
      'fintech AI',
      'financial artificial intelligence',
      'AI trading',
      'banking automation',
      'finance technology'
    ]
  },
  'retail-ecommerce': {
    name: 'Retail & E-Commerce',
    seedKeywords: [
      'AI retail',
      'ecommerce artificial intelligence',
      'retail technology',
      'AI ecommerce',
      'retail automation',
      'artificial intelligence shopping',
      'AI personalization'
    ]
  },
  'manufacturing-supply-chain': {
    name: 'Manufacturing & Supply Chain',
    seedKeywords: [
      'smart factory',
      'AI manufacturing',
      'industrial automation',
      'smart manufacturing',
      'artificial intelligence manufacturing',
      'factory automation',
      'supply chain technology'
    ]
  },
  'transportation-logistics': {
    name: 'Transportation & Logistics',
    seedKeywords: [
      'AI logistics',
      'smart transportation',
      'logistics technology',
      'artificial intelligence logistics',
      'fleet management',
      'supply chain AI',
      'transportation automation'
    ]
  },
  'marketing-advertising-media': {
    name: 'Marketing, Advertising & Media',
    seedKeywords: [
      'AI marketing',
      'marketing automation',
      'artificial intelligence advertising',
      'programmatic advertising',
      'AI content',
      'marketing technology',
      'advertising technology'
    ]
  },
  'energy-utilities': {
    name: 'Energy & Utilities',
    seedKeywords: [
      'smart grid',
      'AI energy',
      'energy technology',
      'artificial intelligence energy',
      'smart energy',
      'renewable energy technology',
      'utilities automation'
    ]
  },
  'education-edtech': {
    name: 'Education & EdTech',
    seedKeywords: [
      'AI education',
      'educational technology',
      'AI learning',
      'artificial intelligence education',
      'edtech',
      'online learning',
      'education automation'
    ]
  },
  'legal-compliance': {
    name: 'Legal & Compliance',
    seedKeywords: [
      'legal technology',
      'AI legal',
      'legaltech',
      'artificial intelligence legal',
      'legal automation',
      'compliance technology',
      'legal software'
    ]
  },
  'human-resources-recruiting': {
    name: 'Human Resources & Recruiting',
    seedKeywords: [
      'HR technology',
      'AI recruiting',
      'recruitment technology',
      'artificial intelligence HR',
      'HR automation',
      'talent acquisition',
      'people analytics'
    ]
  },
  'aerospace-defense': {
    name: 'Aerospace & Defense',
    seedKeywords: [
      'aerospace technology',
      'defense technology',
      'AI aerospace',
      'artificial intelligence defense',
      'military technology',
      'aviation technology',
      'defense automation'
    ]
  }
};

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

async function getKeywordsForKeywords(seed, limit = 100) {
  try {
    console.log(`    🔍 Getting related keywords for: "${seed}"`);
    
    const response = await client.post(
      "/keywords_data/google/keywords_for_keywords/live", 
      [{
        keyword: seed,
        language_code: "en",
        location_code: 2840, // USA
        limit: limit,
        include_seed_keyword: true,
        sort_by: "search_volume",
        filters: [
          ["search_volume", ">", 100]
        ]
      }]
    );
    
    if (response.data.status_code === 20000 && response.data.tasks?.[0]?.result?.[0]?.items) {
      const items = response.data.tasks[0].result[0].items;
      console.log(`      ✅ Found ${items.length} related keywords`);
      
      return items.map(item => ({
        keyword: item.keyword,
        search_volume: item.search_volume || 0,
        cpc: item.cpc || 0,
        competition: item.competition || "N/A",
        competition_index: item.competition_index || 0,
        difficulty: item.keyword_difficulty || 0,
        source: seed
      }));
    }
    
    console.log(`      ⚠️  No keywords found for "${seed}"`);
    return [];
    
  } catch (error) {
    console.error(`      ❌ Error for "${seed}":`, error.response?.data?.status_message || error.message);
    return [];
  }
}

async function getKeywordSuggestions(seed, limit = 100) {
  try {
    console.log(`    💡 Getting suggestions for: "${seed}"`);
    
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
      console.log(`      ✅ Found ${items.length} suggestions`);
      
      return items.map(item => ({
        keyword: item.keyword,
        search_volume: item.keyword_info?.search_volume || 0,
        cpc: item.keyword_info?.cpc || 0,
        competition: item.keyword_info?.competition || "N/A",
        competition_index: item.keyword_info?.competition_index || 0,
        difficulty: item.keyword_info?.keyword_difficulty || 0,
        source: seed
      }));
    }
    
    console.log(`      ⚠️  No suggestions found for "${seed}"`);
    return [];
    
  } catch (error) {
    console.error(`      ❌ Error for "${seed}":`, error.response?.data?.status_message || error.message);
    return [];
  }
}

async function processIndustry(industrySlug, industryData) {
  console.log(`\n🏢 PROCESSING: ${industryData.name.toUpperCase()}`);
  console.log("=".repeat(60));
  
  const results = {
    slug: industrySlug,
    name: industryData.name,
    keywords: [],
    seedKeywords: industryData.seedKeywords,
    timestamp: new Date().toISOString()
  };
  
  // Try both methods for each seed keyword (limit to first 4 to manage API costs)
  for (const seed of industryData.seedKeywords.slice(0, 4)) {
    // Try keywords_for_keywords first (usually more reliable)
    const relatedKeywords = await getKeywordsForKeywords(seed, 50);
    if (relatedKeywords.length > 0) {
      results.keywords.push(...relatedKeywords);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Try keyword_suggestions as backup
    const suggestions = await getKeywordSuggestions(seed, 50);
    if (suggestions.length > 0) {
      results.keywords.push(...suggestions);
    }
    
    // Rate limiting between seeds
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Remove duplicates and filter for AI-related keywords
  const uniqueKeywords = Array.from(
    new Map(results.keywords.map(k => [k.keyword.toLowerCase(), k])).values()
  );
  
  // Filter for AI-related terms and sort by volume
  results.keywords = uniqueKeywords
    .filter(k => {
      const keyword = k.keyword.toLowerCase();
      return (
        (keyword.includes('ai') || 
         keyword.includes('artificial intelligence') || 
         keyword.includes('machine learning') || 
         keyword.includes('automation') ||
         keyword.includes('smart') ||
         keyword.includes('intelligent')) &&
        k.search_volume > 0
      );
    })
    .sort((a, b) => b.search_volume - a.search_volume)
    .slice(0, 15); // Top 15 AI-related keywords per industry
  
  // Analyze and categorize keywords
  const primaryCandidates = results.keywords
    .filter(k => k.search_volume > 500)
    .slice(0, 5);
    
  const primaryKeyword = primaryCandidates[0] || results.keywords[0];
  
  // Mark keywords as primary/secondary
  results.keywords = results.keywords.map((k, index) => ({
    ...k,
    keyword_type: index === 0 ? 'primary' : 'secondary'
  }));
  
  // Display summary
  console.log(`  ✅ Processed ${results.keywords.length} AI-related keywords`);
  
  if (primaryKeyword) {
    console.log(`  🎯 PRIMARY: "${primaryKeyword.keyword}" (${primaryKeyword.search_volume.toLocaleString()} searches)`);
  }
  
  console.log(`  📊 Top 3 Keywords:`);
  results.keywords.slice(0, 3).forEach((kw, i) => {
    console.log(`     ${i + 1}. "${kw.keyword}" (${kw.search_volume.toLocaleString()} searches)`);
  });
  
  return results;
}

async function main() {
  console.log("\n🚀 COMPREHENSIVE INDUSTRY AI KEYWORD RESEARCH - V2");
  console.log("=".repeat(80));
  console.log("DataForSEO API - All 11 Industries (Broader Keywords)");
  
  const startBalance = await checkBalance();
  console.log(`💰 Starting balance: $${startBalance.toFixed(2)}`);
  
  const masterResults = {
    timestamp: new Date().toISOString(),
    startBalance: startBalance,
    totalIndustries: Object.keys(industries).length,
    industries: {},
    summary: {
      totalKeywords: 0,
      allKeywords: [],
      topOpportunities: []
    }
  };
  
  // Process each industry
  for (const [slug, industryData] of Object.entries(industries)) {
    try {
      const industryResults = await processIndustry(slug, industryData);
      
      // Build the desired JSON structure
      masterResults.industries[industryData.name] = {
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
      
      masterResults.summary.totalKeywords += industryResults.keywords.length;
      masterResults.summary.allKeywords.push(...industryResults.keywords);
      
      // Add brief pause between industries
      console.log(`  ⏳ Waiting 3 seconds before next industry...`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
    } catch (error) {
      console.error(`❌ Error processing ${industryData.name}:`, error.message);
      continue;
    }
  }
  
  // Find top opportunities across all industries
  masterResults.summary.topOpportunities = masterResults.summary.allKeywords
    .filter(k => k.search_volume > 1000 && k.competition_index < 60)
    .sort((a, b) => {
      const scoreA = a.search_volume / Math.max(a.competition_index, 1);
      const scoreB = b.search_volume / Math.max(b.competition_index, 1);
      return scoreB - scoreA;
    })
    .slice(0, 25)
    .map(k => ({
      keyword: k.keyword,
      search_volume: k.search_volume,
      cpc: k.cpc,
      competition: k.competition,
      difficulty: k.difficulty,
      opportunity_score: Math.round(k.search_volume / Math.max(k.competition_index, 1))
    }));
  
  // Display results
  console.log("\n" + "=".repeat(80));
  console.log("📊 FINAL RESULTS");
  console.log("=".repeat(80));
  
  console.log(`\n🎯 TOP 10 OPPORTUNITIES ACROSS ALL INDUSTRIES:`);
  console.log("-".repeat(60));
  
  masterResults.summary.topOpportunities.slice(0, 10).forEach((kw, i) => {
    console.log(`${(i + 1).toString().padStart(2)}. "${kw.keyword}"`);
    console.log(`    Volume: ${kw.search_volume.toLocaleString()} | CPC: $${kw.cpc.toFixed(2)} | Score: ${kw.opportunity_score.toLocaleString()}`);
  });
  
  console.log(`\n🏆 INDUSTRIES WITH MOST KEYWORDS:`);
  console.log("-".repeat(40));
  
  Object.entries(masterResults.industries)
    .sort((a, b) => b[1].keywords.length - a[1].keywords.length)
    .slice(0, 5)
    .forEach(([name, data], i) => {
      const topKeyword = data.keywords[0];
      console.log(`${(i + 1).toString().padStart(2)}. ${name}: ${data.keywords.length} keywords`);
      if (topKeyword) {
        console.log(`    Top: "${topKeyword.keyword}" (${topKeyword.search_volume.toLocaleString()})`);
      }
    });
  
  // Save comprehensive results
  const dataDir = path.join(__dirname, '..', 'data', 'keywords');
  await fs.mkdir(dataDir, { recursive: true });
  
  const timestamp = new Date().toISOString().split('T')[0];
  
  // Save master results in the requested JSON format
  const jsonFile = path.join(dataDir, `industry-ai-keywords-comprehensive-${timestamp}.json`);
  await fs.writeFile(jsonFile, JSON.stringify(masterResults.industries, null, 2));
  
  // Save detailed analysis
  const detailedFile = path.join(dataDir, `industry-ai-analysis-${timestamp}.json`);
  await fs.writeFile(detailedFile, JSON.stringify(masterResults, null, 2));
  
  // Create CSV for easy analysis
  const csvContent = generateCSV(masterResults);
  const csvFile = path.join(dataDir, `industry-ai-keywords-${timestamp}.csv`);
  await fs.writeFile(csvFile, csvContent);
  
  // Final balance and cost
  const endBalance = await checkBalance();
  const cost = startBalance - endBalance;
  
  console.log("\n" + "=".repeat(80));
  console.log("💾 FILES SAVED:");
  console.log("-".repeat(40));
  console.log(`📄 Industry Keywords (JSON): ${jsonFile}`);
  console.log(`📊 Complete Analysis: ${detailedFile}`);
  console.log(`📋 CSV Export: ${csvFile}`);
  console.log(`\n💰 API Cost: $${cost.toFixed(2)} | Remaining: $${endBalance.toFixed(2)}`);
  console.log(`📊 Total Keywords: ${masterResults.summary.totalKeywords.toLocaleString()}`);
  console.log("=".repeat(80));
  
  return masterResults;
}

function generateCSV(masterResults) {
  const headers = [
    "Industry",
    "Slug",
    "Keyword", 
    "Search Volume",
    "CPC",
    "Competition",
    "Difficulty",
    "Keyword Type",
    "Opportunity Score"
  ];
  
  const rows = [];
  
  Object.entries(masterResults.industries).forEach(([industryName, data]) => {
    data.keywords.forEach(kw => {
      const score = Math.round(kw.search_volume / Math.max((kw.difficulty || 50), 1));
      rows.push([
        `"${industryName}"`,
        data.slug,
        `"${kw.keyword}"`,
        kw.search_volume,
        kw.cpc.toFixed(2),
        `"${kw.competition}"`,
        kw.difficulty || 0,
        kw.keyword_type,
        score
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