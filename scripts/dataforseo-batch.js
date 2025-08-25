// dataforseo-batch.js
import axios from "axios";

const login = "antonio@siteoptz.com";
const password = "8215cb0ce338b385";

const client = axios.create({
  baseURL: "https://api.dataforseo.com/v3",
  auth: { username: login, password: password }
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

async function getKeywords(category) {
  try {
    const task = {
      keywords: [category],
      language_code: "en",
      location_code: 2840 // United States
    };

    const response = await client.post(
      "/keywords_data/google/search_volume/live",
      [task]
    );

    const results = response.data.tasks[0].result[0].items;

    return results
      .sort((a, b) => b.search_volume - a.search_volume)
      .slice(0, 10)
      .map(item => ({
        keyword: item.keyword,
        volume: item.search_volume,
        competition: item.competition,
        cpc: item.cpc
      }));
  } catch (err) {
    console.error(`❌ Error fetching for ${category}:`, err.response?.data || err.message);
    return [];
  }
}

async function runBatch() {
  console.log("🚀 Starting DataForSEO keyword research batch...\n");
  const allResults = {};
  let totalKeywords = 0;

  for (const category of categories) {
    console.log(`🔎 Fetching keywords for: ${category}`);
    const keywords = await getKeywords(category);
    allResults[category] = keywords;
    totalKeywords += keywords.length;
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Display results
  console.log("\n✅ Top 10 Keywords by Category:\n");
  console.log("=".repeat(80));
  
  for (const [category, keywords] of Object.entries(allResults)) {
    console.log(`\n📊 ${category}`);
    console.log("-".repeat(40));
    
    if (keywords.length === 0) {
      console.log("  No keywords found");
      continue;
    }
    
    keywords.forEach((kw, index) => {
      console.log(`  ${index + 1}. "${kw.keyword}"`);
      console.log(`     Volume: ${kw.volume.toLocaleString()} | Competition: ${kw.competition || 'N/A'} | CPC: $${kw.cpc || 0}`);
    });
  }
  
  console.log("\n" + "=".repeat(80));
  console.log(`📈 Total keywords collected: ${totalKeywords}`);
  
  // Save to file
  const fs = await import('fs').then(m => m.promises);
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `keyword-research-${timestamp}.json`;
  
  await fs.writeFile(
    `./data/${filename}`,
    JSON.stringify(allResults, null, 2)
  );
  
  console.log(`💾 Results saved to: data/${filename}`);
}

runBatch().catch(console.error);