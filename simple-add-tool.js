#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Ultra-simple tool addition script
 * Just adds a new tool to the existing aiToolsData.json
 */

function addSimpleTool() {
  // Example tool - modify this object to add your tool
  const newTool = {
    "id": "google-ads",
    "name": "Google Ads",
    "slug": "google-ads",
    "logo": "/images/tools/google-ads-logo.svg",
    "meta": {
      "title": "Google Ads Review, Pricing, Features & Alternatives [2025]",
      "description": "Comprehensive review of Google Ads. World's largest PPC advertising platform. Compare features, pricing, and alternatives."
    },
    "overview": {
      "developer": "Google",
      "release_year": 2000,
      "description": "Google Ads is the world's largest pay-per-click advertising platform, allowing businesses to create and manage ads across Google Search, Display Network, YouTube, and other Google properties.",
      "category": "Paid Search & PPC"
    },
    "features": [
      "Search Network advertising with keyword targeting",
      "Display Network campaigns across millions of websites",
      "YouTube video advertising and remarketing",
      "Smart Bidding with machine learning optimization",
      "Conversion tracking and attribution modeling"
    ],
    "pros": [
      "Largest search advertising reach",
      "Advanced targeting and automation",
      "Comprehensive campaign types"
    ],
    "cons": [
      "Complex interface for beginners",
      "Can be expensive without optimization"
    ],
    "pricing": [
      {
        "plan": "Pay-per-click",
        "price_per_month": "Variable",
        "features": ["Pay only when someone clicks your ad", "Set daily budgets and bid limits", "No minimum spend requirements"]
      },
      {
        "plan": "Smart Campaigns",
        "price_per_month": "Variable",
        "features": ["Automated ad management", "Machine learning optimization", "Simplified setup process"]
      }
    ],
    "benchmarks": {
      "speed": 9,
      "accuracy": 9,
      "integration": 10,
      "ease_of_use": 7,
      "value": 8
    },
    "rating": 4.5,
    "review_count": 12500
  };

  // Load existing tools
  const dataPath = path.join(__dirname, 'public/data/aiToolsData.json');
  let tools = [];
  
  if (fs.existsSync(dataPath)) {
    tools = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } else {
    console.log('Creating new aiToolsData.json file...');
  }
  
  // Check if tool already exists
  const existingTool = tools.find(t => t.id === newTool.id);
  if (existingTool) {
    console.log(`❌ Tool with ID '${newTool.id}' already exists. Change the ID to add a new tool.`);
    return;
  }
  
  // Add the new tool
  tools.push(newTool);
  
  // Save back to file
  fs.writeFileSync(dataPath, JSON.stringify(tools, null, 2));
  
  console.log(`✅ Added new tool: ${newTool.name}`);
  console.log(`📁 Total tools: ${tools.length}`);
  console.log(`📄 File: ${dataPath}`);
  console.log(`\n🚀 To add your own tool, edit the 'newTool' object in this script and run: node simple-add-tool.js`);
}

// Instructions
function showInstructions() {
  console.log(`
📖 Simple Tool Addition Instructions:

1. Edit the 'newTool' object in this file (simple-add-tool.js)
2. Change the following fields:
   - id: unique identifier (lowercase, hyphens only)
   - name: display name of the tool
   - slug: URL-friendly version of name  
   - description: what the tool does
   - features: array of key features
   - pricing: array of pricing plans
   - pros/cons: advantages and limitations
   
3. Run: node simple-add-tool.js
4. Commit and push changes

That's it! No complex scraping or data normalization needed.
  `);
}

// Run based on command line args
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  showInstructions();
} else {
  addSimpleTool();
}