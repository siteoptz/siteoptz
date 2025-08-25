// dataforseo-batch.mjs - ES Module version
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const login = "antonio@siteoptz.com";
const password = "8215cb0ce338b385";

const client = axios.create({
  baseURL: "https://api.dataforseo.com/v3",
  auth: { username: login, password: password },
  headers: {
    'Content-Type': 'application/json'
  }
});

// Categories you want to pull keywords for
const categories = [
  "SEO & Optimization",
  "Social Media",
  "Paid Search & PPC", 
  "Voice AI",
  "Code Generation",
  "Content Creation",
  "Data Analysis",
  "Image Generation",
  "Research & Education",
  "Productivity",
  "Email Marketing",
  "Video Generation"
];

// Industry-specific keywords to research
const industryKeywords = [
  "AI tools for healthcare",
  "AI tools for finance",
  "AI tools for retail",
  "AI tools for manufacturing",
  "AI tools for education",
  "AI tools for legal",
  "AI tools for marketing",
  "AI tools for HR"
];

// Tool comparison keywords
const comparisonKeywords = [
  "ChatGPT vs Claude",
  "ChatGPT vs Gemini",
  "Claude vs Gemini",
  "best AI tools 2024",
  "AI tool comparison",
  "free AI tools",
  "enterprise AI tools",
  "AI automation tools"
];

async function getKeywords(keyword, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const task = [{
        keywords: [keyword],
        language_code: "en",
        location_code: 2840, // United States
        sort_by: "search_volume"
      }];

      const response = await client.post(
        "/keywords_data/google_ads/search_volume/live",
        task
      );

      if (response.data.status_message === "Ok" && 
          response.data.tasks && 
          response.data.tasks[0] && 
          response.data.tasks[0].result) {
        
        const items = response.data.tasks[0].result[0]?.items || [];
        
        return items
          .filter(item => item.search_volume > 0)
          .sort((a, b) => b.search_volume - a.search_volume)
          .slice(0, 10)
          .map(item => ({
            keyword: item.keyword,
            volume: item.search_volume || 0,
            competition: item.competition || "N/A",
            competition_index: item.competition_index || 0,
            cpc: item.cpc || 0,
            low_bid: item.low_top_of_page_bid || 0,
            high_bid: item.high_top_of_page_bid || 0
          }));
      }
      
      console.warn(`⚠️  No data returned for "${keyword}"`);
      return [];
      
    } catch (err) {
      if (attempt === retries) {
        console.error(`❌ Error fetching "${keyword}" after ${retries} attempts:`, 
          err.response?.data?.status_message || err.message);
        return [];
      }
      console.log(`⏳ Retrying ${keyword} (attempt ${attempt}/${retries})...`);
      await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
    }
  }
  return [];
}

async function getRelatedKeywords(seedKeyword) {
  try {
    const task = [{
      keyword: seedKeyword,
      language_code: "en", 
      location_code: 2840,
      include_seed_keyword: true,
      limit: 20
    }];

    const response = await client.post(
      "/keywords_data/google_ads/keywords_for_keywords/live",
      task
    );

    if (response.data.status_message === "Ok" && 
        response.data.tasks && 
        response.data.tasks[0] && 
        response.data.tasks[0].result) {
      
      const items = response.data.tasks[0].result[0]?.items || [];
      
      return items
        .filter(item => item.search_volume > 100)
        .sort((a, b) => b.search_volume - a.search_volume)
        .slice(0, 15)
        .map(item => ({
          keyword: item.keyword,
          volume: item.search_volume || 0,
          competition: item.competition || "N/A",
          cpc: item.cpc || 0
        }));
    }
    
    return [];
    
  } catch (err) {
    console.error(`❌ Error fetching related keywords for "${seedKeyword}":`, 
      err.response?.data?.status_message || err.message);
    return [];
  }
}

async function runBatch() {
  console.log("🚀 Starting DataForSEO keyword research batch...\n");
  console.log("=" .repeat(80));
  
  const results = {
    categories: {},
    industries: {},
    comparisons: {},
    related: {},
    summary: {
      totalKeywords: 0,
      highVolumeKeywords: [],
      lowCompetitionKeywords: [],
      timestamp: new Date().toISOString()
    }
  };

  // 1. Category Keywords
  console.log("\n📂 FETCHING CATEGORY KEYWORDS\n");
  for (const category of categories) {
    process.stdout.write(`  🔎 ${category}...`);
    const keywords = await getKeywords(category);
    results.categories[category] = keywords;
    results.summary.totalKeywords += keywords.length;
    console.log(` ✓ (${keywords.length} keywords)`);
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  // 2. Industry Keywords
  console.log("\n🏢 FETCHING INDUSTRY KEYWORDS\n");
  for (const keyword of industryKeywords) {
    process.stdout.write(`  🔎 ${keyword}...`);
    const keywords = await getKeywords(keyword);
    results.industries[keyword] = keywords;
    results.summary.totalKeywords += keywords.length;
    console.log(` ✓ (${keywords.length} keywords)`);
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  // 3. Comparison Keywords
  console.log("\n⚖️  FETCHING COMPARISON KEYWORDS\n");
  for (const keyword of comparisonKeywords) {
    process.stdout.write(`  🔎 ${keyword}...`);
    const keywords = await getKeywords(keyword);
    results.comparisons[keyword] = keywords;
    results.summary.totalKeywords += keywords.length;
    console.log(` ✓ (${keywords.length} keywords)`);
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  // 4. Get related keywords for top performers
  console.log("\n🔗 FETCHING RELATED KEYWORDS FOR TOP TERMS\n");
  const topSeeds = ["AI tools", "ChatGPT alternatives", "AI automation"];
  for (const seed of topSeeds) {
    process.stdout.write(`  🔎 Related to "${seed}"...`);
    const related = await getRelatedKeywords(seed);
    results.related[seed] = related;
    results.summary.totalKeywords += related.length;
    console.log(` ✓ (${related.length} keywords)`);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Compile summary statistics
  const allKeywords = [];
  Object.values(results.categories).forEach(kwList => allKeywords.push(...kwList));
  Object.values(results.industries).forEach(kwList => allKeywords.push(...kwList));
  Object.values(results.comparisons).forEach(kwList => allKeywords.push(...kwList));
  Object.values(results.related).forEach(kwList => allKeywords.push(...kwList));

  // Find high volume keywords
  results.summary.highVolumeKeywords = allKeywords
    .filter(kw => kw.volume > 10000)
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 20);

  // Find low competition keywords
  results.summary.lowCompetitionKeywords = allKeywords
    .filter(kw => kw.competition_index < 30 && kw.volume > 500)
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 20);

  // Display results
  console.log("\n" + "=".repeat(80));
  console.log("📊 KEYWORD RESEARCH RESULTS");
  console.log("=".repeat(80));
  
  console.log(`\n✅ Total keywords collected: ${results.summary.totalKeywords}`);
  console.log(`📈 High volume keywords found: ${results.summary.highVolumeKeywords.length}`);
  console.log(`🎯 Low competition opportunities: ${results.summary.lowCompetitionKeywords.length}`);

  // Display top keywords by category
  console.log("\n🏆 TOP KEYWORDS BY CATEGORY:");
  console.log("-".repeat(40));
  
  for (const [category, keywords] of Object.entries(results.categories)) {
    if (keywords.length > 0) {
      const topKeyword = keywords[0];
      console.log(`  ${category}: "${topKeyword.keyword}" (${topKeyword.volume.toLocaleString()} searches)`);
    }
  }

  // Display high-value opportunities
  console.log("\n💎 HIGH-VALUE OPPORTUNITIES (High Volume + Low Competition):");
  console.log("-".repeat(40));
  
  const opportunities = allKeywords
    .filter(kw => kw.volume > 1000 && kw.competition_index < 50)
    .sort((a, b) => (b.volume / (b.competition_index + 1)) - (a.volume / (a.competition_index + 1)))
    .slice(0, 10);
  
  opportunities.forEach((kw, i) => {
    console.log(`  ${i + 1}. "${kw.keyword}"`);
    console.log(`     Volume: ${kw.volume.toLocaleString()} | Competition: ${kw.competition_index || 'Low'} | CPC: $${kw.cpc}`);
  });

  // Save results
  const timestamp = new Date().toISOString().split('T')[0];
  const dataDir = path.join(__dirname, '..', 'data');
  
  // Ensure data directory exists
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
  
  // Save detailed results
  const detailedFilename = path.join(dataDir, `keyword-research-detailed-${timestamp}.json`);
  await fs.writeFile(detailedFilename, JSON.stringify(results, null, 2));
  
  // Save CSV for easy analysis
  const csvFilename = path.join(dataDir, `keyword-research-${timestamp}.csv`);
  const csvContent = generateCSV(allKeywords);
  await fs.writeFile(csvFilename, csvContent);
  
  console.log("\n" + "=".repeat(80));
  console.log("💾 FILES SAVED:");
  console.log(`  📄 JSON: ${detailedFilename}`);
  console.log(`  📊 CSV: ${csvFilename}`);
  console.log("=".repeat(80));
}

function generateCSV(keywords) {
  const headers = "Keyword,Search Volume,Competition,Competition Index,CPC,Low Bid,High Bid\n";
  const rows = keywords.map(kw => 
    `"${kw.keyword}",${kw.volume},"${kw.competition}",${kw.competition_index || 0},${kw.cpc || 0},${kw.low_bid || 0},${kw.high_bid || 0}`
  ).join("\n");
  return headers + rows;
}

// Run the script
runBatch().catch(err => {
  console.error("\n🚨 Fatal error:", err);
  process.exit(1);
});