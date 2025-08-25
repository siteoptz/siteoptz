#!/usr/bin/env node
// Simple DataForSEO connection test
import axios from "axios";

const credentials = {
  username: "antonio@siteoptz.com",
  password: "8215cb0ce338b385"
};

console.log("🔌 Testing DataForSEO API connection...\n");

// Test 1: Basic authentication
async function testAuth() {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://api.dataforseo.com/v3/appendix/user_data',
      auth: credentials,
      timeout: 10000
    });
    
    console.log("✅ Authentication successful!");
    console.log("Response status:", response.status);
    
    if (response.data?.tasks?.[0]?.result?.[0]) {
      const userData = response.data.tasks[0].result[0];
      console.log("\n📊 Account Information:");
      console.log("  Email:", userData.login);
      console.log("  Balance: $" + userData.money?.balance);
      console.log("  Currency:", userData.money?.currency);
      return true;
    }
  } catch (error) {
    console.error("❌ Authentication failed!");
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Message:", error.response.data?.status_message || error.response.statusText);
    }
    return false;
  }
}

// Test 2: Simple keyword search
async function testKeywordSearch() {
  try {
    console.log("\n🔍 Testing keyword search...");
    
    const response = await axios({
      method: 'POST',
      url: 'https://api.dataforseo.com/v3/keywords_data/google/search_volume/live',
      auth: credentials,
      headers: {
        'Content-Type': 'application/json'
      },
      data: [{
        keywords: ["AI tools"],
        language_code: "en",
        location_code: 2840
      }],
      timeout: 15000
    });
    
    if (response.data?.tasks?.[0]?.result?.[0]) {
      console.log("✅ Keyword search successful!");
      const result = response.data.tasks[0].result[0];
      console.log("  Keywords processed:", result.items?.length || 0);
      
      if (result.items?.[0]) {
        const firstKeyword = result.items[0];
        console.log("\n📈 Sample result:");
        console.log("  Keyword:", firstKeyword.keyword);
        console.log("  Search Volume:", firstKeyword.search_volume);
        console.log("  Competition:", firstKeyword.competition);
        console.log("  CPC: $" + firstKeyword.cpc);
      }
      return true;
    }
  } catch (error) {
    console.error("❌ Keyword search failed!");
    console.error("Error:", error.message);
    if (error.response?.data) {
      console.error("API Response:", JSON.stringify(error.response.data, null, 2));
    }
    return false;
  }
}

// Run tests
async function runTests() {
  console.log("DataForSEO API Test");
  console.log("=".repeat(50));
  
  const authSuccess = await testAuth();
  
  if (authSuccess) {
    await testKeywordSearch();
  }
  
  console.log("\n" + "=".repeat(50));
  console.log("Test complete!");
}

runTests().catch(console.error);