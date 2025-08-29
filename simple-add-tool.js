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
    "id": "your-tool-id",
    "name": "Your Tool Name", 
    "slug": "your-tool-slug",
    "logo": "/images/tools/your-tool-logo.svg",
    "meta": {
      "title": "Your Tool Name Review, Pricing, Features & Alternatives [2025]",
      "description": "Comprehensive review of Your Tool Name. Description of what your tool does. Compare features, pricing, and alternatives."
    },
    "overview": {
      "developer": "Your Company",
      "release_year": 2024,
      "description": "Description of what your AI tool does",
      "category": "Content Creation"
    },
    "features": [
      "Feature 1",
      "Feature 2", 
      "Feature 3"
    ],
    "pros": [
      "Easy to use",
      "Good value for money",
      "Fast performance"
    ],
    "cons": [
      "Limited free plan",
      "No offline mode"
    ],
    "pricing": [
      {
        "plan": "Free",
        "price_per_month": 0,
        "features": ["Basic features", "Limited usage"]
      },
      {
        "plan": "Pro",
        "price_per_month": 29,
        "features": ["All features", "Unlimited usage", "Priority support"]
      },
      {
        "plan": "Enterprise", 
        "price_per_month": "Custom",
        "features": ["Custom features", "Dedicated support", "SLA"]
      }
    ],
    "benchmarks": {
      "speed": 8,
      "accuracy": 8,
      "integration": 7,
      "ease_of_use": 9,
      "value": 8
    },
    "rating": 4.5,
    "review_count": 1200
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