#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Ultra-simple tool addition script
 * Just adds a new tool to the existing aiToolsData.json
 */

function addSimpleTool() {
  // New tool from Insidr.ai scraping
  const newTool = {
    "id": "tugan-ai",
    "name": "Tugan AI",
    "slug": "tugan-ai",
    "logo": "/images/tools/tugan-ai-logo.svg",
    "meta": {
      "title": "Tugan AI Review: Content Transformation Tool [2025] | SiteOptz",
      "description": "Comprehensive Tugan AI review. Transform existing content into marketing materials, emails & social posts. Features, pricing & alternatives compared."
    },
    "overview": {
      "developer": "Tugan AI Inc.",
      "release_year": 2023,
      "description": "Tugan AI is an AI-powered content transformation tool that converts existing content into original marketing material, emails, and social media posts. Features instant repurposing, multiple format generation, and brand voice adaptation for efficient content marketing workflows.",
      "category": "Content Creation",
      "website": "https://tugan.ai"
    },
    "features": [
      "Instant content repurposing from any source material",
      "Multiple format generation (emails, social posts, articles)",
      "Brand voice adaptation and tone consistency",
      "Automatic content optimization for different platforms",
      "Bulk content transformation capabilities"
    ],
    "pros": [
      "Saves significant time on content creation",
      "Maintains brand voice across formats",
      "Easy-to-use interface with one-click generation"
    ],
    "cons": [
      "Requires quality source content for best results",
      "Limited customization options in lower tiers"
    ],
    "pricing": [
      {
        "plan": "Free",
        "price_per_month": 0,
        "features": ["3 content transformations per month", "Basic templates", "Email support"]
      },
      {
        "plan": "Starter",
        "price_per_month": 29,
        "features": ["50 content transformations per month", "All templates", "Priority support", "Brand voice training"]
      },
      {
        "plan": "Pro",
        "price_per_month": 79,
        "features": ["Unlimited transformations", "Custom templates", "API access", "Team collaboration", "Advanced analytics"]
      }
    ],
    "benchmarks": {
      "speed": 8,
      "accuracy": 8,
      "integration": 7,
      "ease_of_use": 9,
      "value": 8
    },
    "rating": 4.3,
    "review_count": 850
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