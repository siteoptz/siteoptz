// dataforseo-advanced.js
import axios from "axios";
import fs from "fs";
import path from "path";

// Configuration - move credentials to environment variables in production
const CONFIG = {
  login: process.env.DATAFORSEO_LOGIN || "antonio@siteoptz.com",
  password: process.env.DATAFORSEO_PASSWORD || "8215cb0ce338b385",
  baseURL: "https://api.dataforseo.com/v3",
  location_code: 2840, // United States
  language_code: "en",
  delay_ms: 1000 // Rate limiting delay
};

const client = axios.create({
  baseURL: CONFIG.baseURL,
  auth: { 
    username: CONFIG.login, 
    password: CONFIG.password
  },
  timeout: 30000
});

// Keyword categories for comprehensive research
const KEYWORD_CATEGORIES = {
  "AI Code Editors": [
    "cursor vs chatgpt",
    "cursor ide vs vscode",
    "best AI code editor 2025",
    "cursor editor review",
    "AI coding assistant comparison",
    "cursor vs github copilot",
    "AI code completion tools",
    "cursor ide pricing"
  ],
  "AI Tools Comparison": [
    "chatgpt vs claude coding",
    "best AI tools for developers",
    "AI programming assistant",
    "code generation tools",
    "AI developer tools 2025",
    "programming productivity tools",
    "AI code review tools",
    "automated coding tools"
  ],
  "SiteOptz Branded": [
    "siteoptz ai tools",
    "ai tools comparison site",
    "best ai tools directory",
    "ai software reviews",
    "ai tool comparison platform",
    "siteoptz reviews",
    "ai tools ratings",
    "compare ai software"
  ]
};

class DataForSEOClient {
  constructor() {
    this.results = [];
    this.totalCost = 0;
  }

  async getKeywordData(keyword) {
    try {
      console.log(`🔍 Analyzing: ${keyword}`);
      
      const task = {
        keyword: keyword,
        language_code: CONFIG.language_code,
        location_code: CONFIG.location_code,
        include_serp_info: true
      };

      const response = await client.post(
        "/keywords_data/google/search_volume/live",
        [task]
      );

      if (response.data.tasks[0].status_code === 20000) {
        const result = response.data.tasks[0].result[0];
        this.totalCost += response.data.tasks[0].cost || 0.01;
        
        return {
          keyword: keyword,
          search_volume: result.search_volume || 0,
          cpc: result.cpc || 0,
          competition: result.competition || 0,
          competition_level: result.competition_level || 'unknown',
          monthly_searches: result.monthly_searches || [],
          cost: response.data.tasks[0].cost || 0.01,
          timestamp: new Date().toISOString()
        };
      } else {
        console.error(`❌ API Error for "${keyword}":`, response.data.tasks[0].status_message);
        return this.createErrorResult(keyword, 'api_error');
      }
    } catch (err) {
      console.error(`❌ Request failed for "${keyword}":`, err.response?.data?.status_message || err.message);
      return this.createErrorResult(keyword, 'request_failed');
    }
  }

  createErrorResult(keyword, error_type) {
    return {
      keyword: keyword,
      search_volume: 0,
      cpc: 0,
      competition: 0,
      competition_level: error_type,
      monthly_searches: [],
      cost: 0,
      timestamp: new Date().toISOString()
    };
  }

  async getRelatedKeywords(seed_keyword, limit = 50) {
    try {
      console.log(`🌟 Getting related keywords for: ${seed_keyword}`);
      
      const task = {
        keyword: seed_keyword,
        language_code: CONFIG.language_code,
        location_code: CONFIG.location_code,
        limit: limit,
        include_serp_info: true
      };

      const response = await client.post(
        "/keywords_data/google/keywords_for_keywords/live",
        [task]
      );

      if (response.data.tasks[0].status_code === 20000) {
        const keywords = response.data.tasks[0].result[0].items || [];
        this.totalCost += response.data.tasks[0].cost || 0.01;
        
        return keywords
          .filter(item => item.search_volume > 10) // Filter low volume keywords
          .sort((a, b) => b.search_volume - a.search_volume)
          .slice(0, 10)
          .map(item => ({
            keyword: item.keyword,
            search_volume: item.search_volume,
            cpc: item.cpc || 0,
            competition: item.competition || 0,
            competition_level: item.competition_level || 'unknown'
          }));
      }
      
      return [];
    } catch (err) {
      console.error(`❌ Related keywords failed for "${seed_keyword}":`, err.message);
      return [];
    }
  }

  async runComprehensiveResearch() {
    console.log(`🚀 Starting comprehensive keyword research...\n`);
    
    const allResults = {};
    const relatedKeywords = {};

    // Process each category
    for (const [category, keywords] of Object.entries(KEYWORD_CATEGORIES)) {
      console.log(`\n📂 Processing category: ${category}`);
      console.log(`-`.repeat(50));
      
      allResults[category] = [];
      
      for (const keyword of keywords) {
        const result = await this.getKeywordData(keyword);
        allResults[category].push(result);
        
        // Get related keywords for high-volume terms
        if (result.search_volume > 100) {
          const related = await this.getRelatedKeywords(keyword, 20);
          if (related.length > 0) {
            relatedKeywords[keyword] = related;
          }
          await this.delay();
        }
        
        await this.delay();
      }
      
      // Sort by search volume
      allResults[category].sort((a, b) => b.search_volume - a.search_volume);
    }

    return { allResults, relatedKeywords };
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, CONFIG.delay_ms));
  }

  generateReport(allResults, relatedKeywords) {
    console.log("\n" + "=".repeat(80));
    console.log("📊 KEYWORD RESEARCH REPORT");
    console.log("=".repeat(80));

    const flatResults = [];
    let totalVolume = 0;

    for (const [category, results] of Object.entries(allResults)) {
      console.log(`\n📂 ${category.toUpperCase()}`);
      console.log("-".repeat(60));
      console.log("Rank | Keyword | Volume | CPC | Competition");
      console.log("-".repeat(60));
      
      results.forEach((result, index) => {
        if (result.search_volume > 0) {
          console.log(
            `${(index + 1).toString().padStart(2)} | ` +
            `${result.keyword.padEnd(30)} | ` +
            `${result.search_volume.toString().padStart(6)} | ` +
            `$${result.cpc.toFixed(2).padStart(5)} | ` +
            `${result.competition_level}`
          );
          totalVolume += result.search_volume;
          flatResults.push({ ...result, category });
        }
      });
    }

    // Top opportunities across all categories
    const topOpportunities = flatResults
      .filter(r => r.search_volume > 0)
      .sort((a, b) => {
        // Score based on volume and low competition
        const scoreA = a.search_volume * (1 - a.competition);
        const scoreB = b.search_volume * (1 - b.competition);
        return scoreB - scoreA;
      })
      .slice(0, 10);

    console.log(`\n🎯 TOP 10 OPPORTUNITIES (High Volume + Low Competition)`);
    console.log("-".repeat(70));
    topOpportunities.forEach((result, index) => {
      const score = Math.round(result.search_volume * (1 - result.competition));
      console.log(
        `${(index + 1).toString().padStart(2)} | ` +
        `${result.keyword.padEnd(35)} | ` +
        `Score: ${score.toString().padStart(5)} | ` +
        `${result.category}`
      );
    });

    // Related keywords summary
    if (Object.keys(relatedKeywords).length > 0) {
      console.log(`\n🌟 RELATED KEYWORDS DISCOVERED`);
      console.log("-".repeat(60));
      for (const [seed, related] of Object.entries(relatedKeywords)) {
        console.log(`\n"${seed}" related keywords (top 5):`);
        related.slice(0, 5).forEach((kw, i) => {
          console.log(`  ${i + 1}. ${kw.keyword} (${kw.search_volume} vol, $${kw.cpc.toFixed(2)} CPC)`);
        });
      }
    }

    console.log(`\n💰 RESEARCH SUMMARY`);
    console.log("-".repeat(40));
    console.log(`Total keywords analyzed: ${flatResults.length}`);
    console.log(`Keywords with volume > 0: ${flatResults.filter(r => r.search_volume > 0).length}`);
    console.log(`Total monthly search volume: ${totalVolume.toLocaleString()}`);
    console.log(`Average CPC: $${(flatResults.reduce((sum, r) => sum + r.cpc, 0) / flatResults.length).toFixed(2)}`);
    console.log(`Total API cost: $${this.totalCost.toFixed(4)}`);

    return { allResults, relatedKeywords, topOpportunities, summary: {
      totalKeywords: flatResults.length,
      totalVolume,
      averageCpc: flatResults.reduce((sum, r) => sum + r.cpc, 0) / flatResults.length,
      totalCost: this.totalCost
    }};
  }

  async saveResults(data) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `keyword-research-${timestamp}.json`;
    const filepath = path.join(process.cwd(), 'data', filename);
    
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    console.log(`\n💾 Results saved to: ${filename}`);
    
    return filepath;
  }
}

// Main execution
async function main() {
  const researcher = new DataForSEOClient();
  
  try {
    const { allResults, relatedKeywords } = await researcher.runComprehensiveResearch();
    const report = researcher.generateReport(allResults, relatedKeywords);
    const filepath = await researcher.saveResults({
      ...report,
      generated_at: new Date().toISOString(),
      config: {
        location: "United States",
        language: "English",
        total_cost: researcher.totalCost
      }
    });
    
    console.log(`\n✅ Keyword research complete! Check ${path.basename(filepath)} for detailed results.`);
    
  } catch (error) {
    console.error(`\n❌ Research failed:`, error.message);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default DataForSEOClient;