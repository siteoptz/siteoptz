#!/usr/bin/env node
/**
 * DataForSEO Debug - Check actual API responses
 */

import axios from "axios";

const client = axios.create({
  baseURL: "https://api.dataforseo.com/v3",
  auth: {
    username: "antonio@siteoptz.com",
    password: "8215cb0ce338b385"
  },
  timeout: 15000
});

async function debugSingleKeyword() {
  try {
    console.log("🔍 Testing with single keyword 'ChatGPT'...\n");
    
    const response = await client.post(
      "/keywords_data/google_ads/search_volume/live",
      [{
        keywords: ["ChatGPT"],
        language_code: "en",
        location_code: 2840
      }]
    );
    
    console.log("API Response Status Code:", response.data.status_code);
    console.log("API Response Status Message:", response.data.status_message);
    
    if (response.data.tasks) {
      console.log("\n📊 Tasks Array Length:", response.data.tasks.length);
      
      response.data.tasks.forEach((task, i) => {
        console.log(`\nTask ${i}:`);
        console.log("  Status Code:", task.status_code);
        console.log("  Status Message:", task.status_message);
        
        if (task.result) {
          console.log("  Result Array Length:", task.result.length);
          
          task.result.forEach((result, j) => {
            console.log(`\n  Result ${j}:`);
            console.log("    Keyword:", result.keyword);
            console.log("    Items:", result.items ? result.items.length : 'null');
            
            if (result.items && result.items.length > 0) {
              console.log("    Sample item:");
              console.log("      Keyword:", result.items[0].keyword);
              console.log("      Search Volume:", result.items[0].search_volume);
              console.log("      Competition:", result.items[0].competition);
              console.log("      CPC:", result.items[0].cpc);
            }
          });
        }
      });
    }
    
    // Let's also try the raw response
    console.log("\n🔧 Full Raw Response:");
    console.log(JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.response?.data) {
      console.error("Error Response:", JSON.stringify(error.response.data, null, 2));
    }
  }
}

async function tryDifferentEndpoint() {
  try {
    console.log("\n🔄 Trying different endpoint...\n");
    
    // Try keyword ideas endpoint
    const response = await client.post(
      "/keywords_data/google_ads/keywords_for_keywords/live",
      [{
        keyword: "ChatGPT",
        language_code: "en",
        location_code: 2840,
        limit: 5
      }]
    );
    
    console.log("Keywords for Keywords Response:");
    console.log(JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.error("❌ Keywords endpoint error:", error.response?.data || error.message);
  }
}

async function checkLocationCodes() {
  try {
    console.log("\n🌍 Checking location codes...\n");
    
    const response = await client.get("/appendix/locations");
    console.log("Locations available:", response.data?.tasks?.[0]?.result ? "Yes" : "No");
    
  } catch (error) {
    console.log("❌ Locations not accessible:", error.response?.status);
  }
}

async function main() {
  console.log("🐛 DataForSEO Debug Session");
  console.log("=".repeat(50));
  
  await debugSingleKeyword();
  await tryDifferentEndpoint();
  await checkLocationCodes();
  
  console.log("\n" + "=".repeat(50));
  console.log("Debug session complete!");
}

main().catch(console.error);