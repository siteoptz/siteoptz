#!/usr/bin/env node
/**
 * Industry-Specific AI Keyword Research for SiteOptz
 * Comprehensive DataForSEO research for all 11 industry verticals
 * Focuses on AI-related keywords for each industry
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

// 11 Industries with their AI-focused seed keywords
const industries = {
  'healthcare-life-sciences': {
    name: 'Healthcare & Life Sciences',
    seedKeywords: [
      'healthcare AI',
      'AI in healthcare',
      'medical AI',
      'healthcare artificial intelligence',
      'AI medical diagnosis',
      'healthcare machine learning',
      'AI patient care',
      'medical AI tools',
      'healthcare automation AI',
      'AI clinical decision support',
      'predictive analytics healthcare',
      'AI drug discovery',
      'telemedicine AI',
      'radiology AI',
      'AI medical imaging'
    ]
  },
  'finance-banking': {
    name: 'Finance & Banking',
    seedKeywords: [
      'banking AI',
      'AI in finance',
      'financial AI',
      'fintech AI',
      'AI fraud detection',
      'banking artificial intelligence',
      'financial machine learning',
      'AI trading',
      'robo advisor',
      'AI risk management',
      'algorithmic trading',
      'AI credit scoring',
      'financial automation AI',
      'banking chatbot',
      'AI compliance finance'
    ]
  },
  'retail-ecommerce': {
    name: 'Retail & E-Commerce',
    seedKeywords: [
      'retail AI',
      'ecommerce AI',
      'AI in retail',
      'retail artificial intelligence',
      'AI personalization',
      'ecommerce automation',
      'AI recommendation engine',
      'retail machine learning',
      'AI inventory management',
      'dynamic pricing AI',
      'AI customer service',
      'retail analytics AI',
      'AI visual search',
      'chatbot ecommerce',
      'AI demand forecasting'
    ]
  },
  'manufacturing-supply-chain': {
    name: 'Manufacturing & Supply Chain',
    seedKeywords: [
      'manufacturing AI',
      'AI in manufacturing',
      'smart factory',
      'industrial AI',
      'manufacturing artificial intelligence',
      'AI predictive maintenance',
      'supply chain AI',
      'manufacturing automation',
      'AI quality control',
      'smart manufacturing',
      'AI production optimization',
      'factory automation AI',
      'supply chain optimization',
      'AI inventory management',
      'IoT manufacturing'
    ]
  },
  'transportation-logistics': {
    name: 'Transportation & Logistics',
    seedKeywords: [
      'logistics AI',
      'transportation AI',
      'AI in logistics',
      'fleet management AI',
      'AI route optimization',
      'logistics automation',
      'supply chain AI',
      'AI delivery optimization',
      'transportation artificial intelligence',
      'logistics machine learning',
      'AI freight management',
      'autonomous vehicles',
      'AI warehouse management',
      'logistics analytics',
      'AI demand planning'
    ]
  },
  'marketing-advertising-media': {
    name: 'Marketing, Advertising & Media',
    seedKeywords: [
      'marketing AI',
      'AI marketing',
      'advertising AI',
      'AI in marketing',
      'marketing automation AI',
      'AI content creation',
      'programmatic advertising',
      'AI copywriting',
      'marketing artificial intelligence',
      'AI personalization',
      'AI campaign optimization',
      'social media AI',
      'AI audience targeting',
      'marketing analytics AI',
      'AI influencer marketing'
    ]
  },
  'energy-utilities': {
    name: 'Energy & Utilities',
    seedKeywords: [
      'energy AI',
      'utilities AI',
      'AI in energy',
      'smart grid',
      'energy artificial intelligence',
      'AI energy optimization',
      'renewable energy AI',
      'utilities automation',
      'AI demand forecasting',
      'energy analytics',
      'AI grid management',
      'smart meter AI',
      'energy efficiency AI',
      'AI power generation',
      'utilities machine learning'
    ]
  },
  'education-edtech': {
    name: 'Education & EdTech',
    seedKeywords: [
      'education AI',
      'AI in education',
      'edtech AI',
      'AI tutoring',
      'educational artificial intelligence',
      'AI learning',
      'personalized learning AI',
      'AI assessment',
      'adaptive learning',
      'AI education tools',
      'learning analytics',
      'AI grading',
      'educational technology AI',
      'AI curriculum',
      'online learning AI'
    ]
  },
  'legal-compliance': {
    name: 'Legal & Compliance',
    seedKeywords: [
      'legal AI',
      'AI in law',
      'legal artificial intelligence',
      'AI contract review',
      'legal automation',
      'compliance AI',
      'AI legal research',
      'legal tech AI',
      'AI document review',
      'regulatory compliance AI',
      'AI legal analytics',
      'law firm AI',
      'AI due diligence',
      'legal discovery AI',
      'AI contract analysis'
    ]
  },
  'human-resources-recruiting': {
    name: 'Human Resources & Recruiting',
    seedKeywords: [
      'HR AI',
      'recruiting AI',
      'AI in HR',
      'recruitment artificial intelligence',
      'AI hiring',
      'HR automation',
      'AI talent acquisition',
      'people analytics',
      'AI resume screening',
      'HR machine learning',
      'AI employee engagement',
      'workforce analytics',
      'AI performance management',
      'recruiting automation',
      'AI candidate screening'
    ]
  },
  'aerospace-defense': {
    name: 'Aerospace & Defense',
    seedKeywords: [
      'aerospace AI',
      'defense AI',
      'AI in aerospace',
      'military AI',
      'aviation AI',
      'aerospace artificial intelligence',
      'defense technology AI',
      'AI predictive maintenance',
      'autonomous systems',
      'AI mission planning',
      'defense automation',
      'aerospace analytics',
      'AI surveillance',
      'military machine learning',
      'AI defense systems'
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

async function getKeywordSuggestions(keyword, limit = 100) {
  try {
    console.log(`    🔍 Getting suggestions for: "${keyword}"`);
    
    const response = await client.post(
      "/keywords_data/google/keyword_suggestions/live",
      [{
        keyword: keyword,
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
        source: keyword
      }));
    }
    
    console.log(`      ⚠️  No suggestions found for "${keyword}"`);
    return [];
    
  } catch (error) {
    console.error(`      ❌ Error for "${keyword}":`, error.response?.data?.status_message || error.message);
    return [];
  }
}

async function getSearchVolume(keywords) {
  try {
    console.log(`    📊 Getting search volumes for ${keywords.length} keywords...`);
    
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
      console.log(`      ✅ Got volume data for ${items.length} keywords`);
      
      return items.map(item => ({
        keyword: item.keyword,
        search_volume: item.search_volume || 0,
        cpc: item.cpc || 0,
        competition: item.competition || "N/A",
        competition_index: item.competition_index || 0,
        difficulty: item.keyword_difficulty || 0
      }));
    }
    
    return [];
    
  } catch (error) {
    console.error(`    ❌ Error getting search volumes:`, error.response?.data?.status_message || error.message);
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
    timestamp: new Date().toISOString(),
    summary: {
      totalKeywords: 0,
      primaryKeyword: null,
      secondaryKeywords: [],
      highVolumeKeywords: [],
      lowCompetitionKeywords: []
    }
  };
  
  // Process each seed keyword
  for (const seed of industryData.seedKeywords.slice(0, 8)) { // Limit to first 8 seeds to manage API costs
    const suggestions = await getKeywordSuggestions(seed, 75);
    results.keywords.push(...suggestions);
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  // Remove duplicates and sort by volume
  const uniqueKeywords = Array.from(
    new Map(results.keywords.map(k => [k.keyword.toLowerCase(), k])).values()
  );
  
  results.keywords = uniqueKeywords
    .filter(k => k.search_volume > 0)
    .sort((a, b) => b.search_volume - a.search_volume);
  
  // Get additional search volume data for top keywords without volume
  const keywordsNeedingVolume = uniqueKeywords
    .filter(k => k.search_volume === 0)
    .slice(0, 50)
    .map(k => k.keyword);
  
  if (keywordsNeedingVolume.length > 0) {
    const volumeData = await getSearchVolume(keywordsNeedingVolume);
    
    // Update keywords with volume data
    results.keywords = results.keywords.map(keyword => {
      const volumeMatch = volumeData.find(v => v.keyword.toLowerCase() === keyword.keyword.toLowerCase());
      if (volumeMatch && volumeMatch.search_volume > 0) {
        return {
          ...keyword,
          search_volume: volumeMatch.search_volume,
          cpc: volumeMatch.cpc,
          competition: volumeMatch.competition,
          competition_index: volumeMatch.competition_index,
          difficulty: volumeMatch.difficulty
        };
      }
      return keyword;
    });
    
    // Re-sort after updating volumes
    results.keywords = results.keywords
      .filter(k => k.search_volume > 0)
      .sort((a, b) => b.search_volume - a.search_volume);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Analyze and categorize keywords
  results.summary.totalKeywords = results.keywords.length;
  
  // Identify PRIMARY keyword (highest volume + most relevant)
  const primaryCandidates = results.keywords
    .filter(k => k.search_volume > 1000 && 
      (k.keyword.toLowerCase().includes('ai') || 
       k.keyword.toLowerCase().includes('artificial intelligence')))
    .slice(0, 5);
    
  results.summary.primaryKeyword = primaryCandidates[0] || results.keywords[0];
  
  // Mark primary keyword
  if (results.summary.primaryKeyword) {
    results.keywords = results.keywords.map(k => ({
      ...k,
      keyword_type: k.keyword === results.summary.primaryKeyword.keyword ? 'primary' : 'secondary'
    }));
  }
  
  // Get top 9 secondary keywords (excluding primary)
  results.summary.secondaryKeywords = results.keywords
    .filter(k => k.keyword !== results.summary.primaryKeyword?.keyword)
    .slice(0, 9)
    .map(k => ({...k, keyword_type: 'secondary'}));
  
  // High volume opportunities (>5000 searches)
  results.summary.highVolumeKeywords = results.keywords
    .filter(k => k.search_volume > 5000)
    .slice(0, 10);
  
  // Low competition opportunities
  results.summary.lowCompetitionKeywords = results.keywords
    .filter(k => k.competition_index < 40 && k.search_volume > 500)
    .sort((a, b) => {
      const scoreA = a.search_volume / Math.max(a.competition_index, 1);
      const scoreB = b.search_volume / Math.max(b.competition_index, 1);
      return scoreB - scoreA;
    })
    .slice(0, 10);
  
  // Display summary
  console.log(`  ✅ Processed ${results.summary.totalKeywords} keywords`);
  
  if (results.summary.primaryKeyword) {
    console.log(`  🎯 PRIMARY: "${results.summary.primaryKeyword.keyword}" (${results.summary.primaryKeyword.search_volume.toLocaleString()} searches)`);
  }
  
  console.log(`  📊 Top 3 Secondary Keywords:`);
  results.summary.secondaryKeywords.slice(0, 3).forEach((kw, i) => {
    console.log(`     ${i + 1}. "${kw.keyword}" (${kw.search_volume.toLocaleString()} searches)`);
  });
  
  return results;
}

async function main() {
  console.log("\n🚀 COMPREHENSIVE INDUSTRY AI KEYWORD RESEARCH");
  console.log("=".repeat(80));
  console.log("DataForSEO API - All 11 Industries");
  
  const startBalance = await checkBalance();
  console.log(`💰 Starting balance: $${startBalance.toFixed(2)}`);
  
  const masterResults = {
    timestamp: new Date().toISOString(),
    startBalance: startBalance,
    totalIndustries: Object.keys(industries).length,
    industries: {},
    summary: {
      totalKeywords: 0,
      industriesByVolume: [],
      topOpportunities: []
    }
  };
  
  // Process each industry
  for (const [slug, industryData] of Object.entries(industries)) {
    try {
      const industryResults = await processIndustry(slug, industryData);
      masterResults.industries[industryData.name] = {
        slug: slug,
        keywords: industryResults.keywords.slice(0, 10), // Top 10 per industry
        primaryKeyword: industryResults.summary.primaryKeyword,
        secondaryKeywords: industryResults.summary.secondaryKeywords,
        totalKeywords: industryResults.summary.totalKeywords
      };
      
      masterResults.summary.totalKeywords += industryResults.summary.totalKeywords;
      
      // Add brief pause between industries
      console.log(`  ⏳ Waiting 3 seconds before next industry...`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
    } catch (error) {
      console.error(`❌ Error processing ${industryData.name}:`, error.message);
      continue;
    }
  }
  
  // Compile cross-industry insights
  console.log("\n" + "=".repeat(80));
  console.log("📊 CROSS-INDUSTRY ANALYSIS");
  console.log("=".repeat(80));
  
  // Rank industries by keyword volume
  masterResults.summary.industriesByVolume = Object.entries(masterResults.industries)
    .map(([name, data]) => ({
      name: name,
      slug: data.slug,
      totalVolume: data.keywords.reduce((sum, k) => sum + k.search_volume, 0),
      avgVolume: Math.round(data.keywords.reduce((sum, k) => sum + k.search_volume, 0) / data.keywords.length),
      primaryKeyword: data.primaryKeyword
    }))
    .sort((a, b) => b.totalVolume - a.totalVolume);
  
  // Find cross-industry opportunities
  const allKeywords = [];
  Object.values(masterResults.industries).forEach(industry => {
    allKeywords.push(...industry.keywords.map(k => ({...k, industry: industry.slug})));
  });
  
  masterResults.summary.topOpportunities = allKeywords
    .filter(k => k.search_volume > 2000 && k.competition_index < 50)
    .sort((a, b) => {
      const scoreA = a.search_volume / Math.max(a.competition_index, 1);
      const scoreB = b.search_volume / Math.max(b.competition_index, 1);
      return scoreB - scoreA;
    })
    .slice(0, 20);
  
  // Display results
  console.log(`\n🏆 TOP 5 INDUSTRIES BY SEARCH VOLUME:`);
  console.log("-".repeat(50));
  
  masterResults.summary.industriesByVolume.slice(0, 5).forEach((industry, i) => {
    console.log(`${(i + 1).toString().padStart(2)}. ${industry.name}`);
    console.log(`    Total Volume: ${industry.totalVolume.toLocaleString()}`);
    console.log(`    Primary: "${industry.primaryKeyword?.keyword || 'N/A'}" (${(industry.primaryKeyword?.search_volume || 0).toLocaleString()})`);
  });
  
  console.log(`\n🎯 TOP 10 CROSS-INDUSTRY OPPORTUNITIES:`);
  console.log("-".repeat(50));
  
  masterResults.summary.topOpportunities.slice(0, 10).forEach((kw, i) => {
    const score = Math.round(kw.search_volume / Math.max(kw.competition_index, 1));
    console.log(`${(i + 1).toString().padStart(2)}. "${kw.keyword}" (${kw.industry})`);
    console.log(`    Volume: ${kw.search_volume.toLocaleString()} | Competition: ${kw.competition_index} | Score: ${score.toLocaleString()}`);
  });
  
  // Save comprehensive results
  const dataDir = path.join(__dirname, '..', 'data', 'keywords');
  await fs.mkdir(dataDir, { recursive: true });
  
  const timestamp = new Date().toISOString().split('T')[0];
  
  // Save master results
  const jsonFile = path.join(dataDir, `industry-ai-keywords-${timestamp}.json`);
  await fs.writeFile(jsonFile, JSON.stringify(masterResults, null, 2));
  
  // Create industry-specific CSV
  const csvContent = generateIndustryCSV(masterResults);
  const csvFile = path.join(dataDir, `industry-ai-keywords-${timestamp}.csv`);
  await fs.writeFile(csvFile, csvContent);
  
  // Create opportunities CSV
  const oppContent = generateOpportunitiesCSV(masterResults.summary.topOpportunities);
  const oppFile = path.join(dataDir, `industry-opportunities-${timestamp}.csv`);
  await fs.writeFile(oppFile, oppContent);
  
  // Final balance and cost
  const endBalance = await checkBalance();
  const cost = startBalance - endBalance;
  
  console.log("\n" + "=".repeat(80));
  console.log("💾 FILES SAVED:");
  console.log("-".repeat(40));
  console.log(`📄 Complete data: ${jsonFile}`);
  console.log(`📊 Industry keywords: ${csvFile}`);
  console.log(`🎯 Top opportunities: ${oppFile}`);
  console.log(`\n💰 API Cost: $${cost.toFixed(2)} | Remaining: $${endBalance.toFixed(2)}`);
  console.log(`📊 Total Keywords: ${masterResults.summary.totalKeywords.toLocaleString()}`);
  console.log("=".repeat(80));
  
  return masterResults;
}

function generateIndustryCSV(masterResults) {
  const headers = [
    "Industry",
    "Slug", 
    "Keyword",
    "Search Volume",
    "Competition",
    "Competition Index",
    "CPC",
    "Difficulty",
    "Keyword Type",
    "Priority Score"
  ];
  
  const rows = [];
  
  Object.entries(masterResults.industries).forEach(([industryName, data]) => {
    // Add primary keyword
    if (data.primaryKeyword) {
      const score = Math.round(data.primaryKeyword.search_volume / Math.max(data.primaryKeyword.competition_index, 1));
      rows.push([
        `"${industryName}"`,
        data.slug,
        `"${data.primaryKeyword.keyword}"`,
        data.primaryKeyword.search_volume,
        `"${data.primaryKeyword.competition}"`,
        data.primaryKeyword.competition_index,
        data.primaryKeyword.cpc.toFixed(2),
        data.primaryKeyword.difficulty,
        "primary",
        score
      ].join(","));
    }
    
    // Add secondary keywords
    data.secondaryKeywords.forEach(kw => {
      const score = Math.round(kw.search_volume / Math.max(kw.competition_index, 1));
      rows.push([
        `"${industryName}"`,
        data.slug,
        `"${kw.keyword}"`,
        kw.search_volume,
        `"${kw.competition}"`,
        kw.competition_index,
        kw.cpc.toFixed(2),
        kw.difficulty || 0,
        "secondary",
        score
      ].join(","));
    });
  });
  
  return [headers.join(","), ...rows].join("\n");
}

function generateOpportunitiesCSV(opportunities) {
  const headers = [
    "Keyword",
    "Industry",
    "Search Volume",
    "Competition Index",
    "CPC",
    "Difficulty",
    "Opportunity Score",
    "Recommended Action"
  ];
  
  const rows = opportunities.map(kw => {
    const score = Math.round(kw.search_volume / Math.max(kw.competition_index, 1));
    
    let action = "Create content";
    if (score > 2000) {
      action = "Priority target - high ROI";
    } else if (score > 1000) {
      action = "Medium priority - good opportunity";
    } else if (kw.search_volume > 10000) {
      action = "High volume - competitive but valuable";
    }
    
    return [
      `"${kw.keyword}"`,
      kw.industry,
      kw.search_volume,
      kw.competition_index,
      kw.cpc.toFixed(2),
      kw.difficulty || 0,
      score,
      `"${action}"`
    ].join(",");
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