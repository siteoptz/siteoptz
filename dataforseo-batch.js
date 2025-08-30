// dataforseo-batch.js
import axios from "axios";

// DataForSEO credentials - these should be in environment variables for security
const login = "antonio@siteoptz.com";
const password = "8215cb0ce338b385";

const client = axios.create({
  baseURL: "https://api.dataforseo.com/v3",
  auth: { 
    username: login, 
    password: password
  }
});

// Keywords/categories you want to pull search volume for
const categories = [
  "cursor vs chatgpt",
  "AI code editor comparison",
  "best AI coding assistant",
  "cursor ide review",
  "chatgpt for coding",
  "AI programming tools",
  "code completion tools",
  "developer AI assistant",
  "AI code generator",
  "programming productivity tools"
];

async function getKeywords(keyword) {
  try {
    console.log(`🔍 Processing: ${keyword}`);
    
    const task = {
      keyword: keyword,
      language_code: "en",
      location_code: 2840, // United States
      include_serp_info: true
    };

    const response = await client.post(
      "/keywords_data/google/search_volume/live",
      [task]
    );

    if (response.data.tasks[0].status_code === 20000) {
      const result = response.data.tasks[0].result[0];
      
      return {
        keyword: keyword,
        search_volume: result.search_volume || 0,
        cpc: result.cpc || 0,
        competition: result.competition || 0,
        competition_level: result.competition_level || 'unknown'
      };
    } else {
      console.error(`❌ API Error for ${keyword}:`, response.data.tasks[0].status_message);
      return {
        keyword: keyword,
        search_volume: 0,
        cpc: 0,
        competition: 0,
        competition_level: 'error'
      };
    }
  } catch (err) {
    console.error(`❌ Error fetching for ${keyword}:`, err.response?.data?.status_message || err.message);
    return {
      keyword: keyword,
      search_volume: 0,
      cpc: 0,
      competition: 0,
      competition_level: 'error'
    };
  }
}

async function runBatch() {
  console.log(`🚀 Starting keyword research for ${categories.length} terms...\n`);
  
  const allResults = [];

  for (const keyword of categories) {
    const result = await getKeywords(keyword);
    allResults.push(result);
    
    // Add delay to respect API rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Sort by search volume (highest first)
  allResults.sort((a, b) => b.search_volume - a.search_volume);

  console.log("\n✅ Keyword Research Results:\n");
  console.log("Rank | Keyword | Volume | CPC | Competition");
  console.log("-".repeat(60));
  
  allResults.forEach((result, index) => {
    console.log(
      `${(index + 1).toString().padStart(2)} | ` +
      `${result.keyword.padEnd(25)} | ` +
      `${result.search_volume.toString().padStart(6)} | ` +
      `$${result.cpc.toString().padStart(4)} | ` +
      `${result.competition_level}`
    );
  });

  console.log("\n📊 Summary:");
  console.log(`Total keywords analyzed: ${allResults.length}`);
  console.log(`Keywords with search volume > 0: ${allResults.filter(r => r.search_volume > 0).length}`);
  console.log(`Total search volume: ${allResults.reduce((sum, r) => sum + r.search_volume, 0)}`);
  console.log(`Average CPC: $${(allResults.reduce((sum, r) => sum + r.cpc, 0) / allResults.length).toFixed(2)}`);

  return allResults;
}

// Run the batch process
runBatch().catch(console.error);