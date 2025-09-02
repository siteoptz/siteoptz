#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Add multiple tools from Insidr.ai scraping
 */

const toolsToAdd = [
  {
    "id": "synthflow-ai",
    "name": "Synthflow AI",
    "slug": "synthflow-ai",
    "logo": "/images/tools/synthflow-ai-logo.svg",
    "meta": {
      "title": "Synthflow AI Review: No-Code Voice Assistant Builder [2025] | SiteOptz",
      "description": "Synthflow AI review. Build AI voice assistants without coding. Customer service automation, appointment scheduling & lead qualification. Features & pricing."
    },
    "overview": {
      "developer": "Synthflow Technologies",
      "release_year": 2023,
      "description": "Synthflow AI is a no-code platform for building intelligent voice assistants and phone automation systems. Create AI-powered customer service bots, appointment schedulers, and lead qualification systems with natural conversation flows and CRM integrations.",
      "category": "Voice AI",
      "website": "https://synthflow.ai"
    },
    "features": [
      "No-code voice assistant builder",
      "Natural language conversation flows",
      "Phone call automation and routing",
      "CRM and calendar integrations",
      "Real-time voice synthesis and recognition",
      "Multi-language support",
      "Custom voice training"
    ],
    "pros": [
      "Easy setup without technical expertise",
      "Natural-sounding conversations",
      "Comprehensive integration options",
      "24/7 automated customer service"
    ],
    "cons": [
      "Limited customization in basic plans",
      "Requires quality training data",
      "Voice quality depends on plan tier"
    ],
    "pricing": [
      {
        "plan": "Starter",
        "price_per_month": 29,
        "features": ["500 minutes per month", "Basic voice models", "Standard integrations"]
      },
      {
        "plan": "Professional",
        "price_per_month": 79,
        "features": ["2000 minutes per month", "Premium voices", "Advanced integrations", "Custom training"]
      },
      {
        "plan": "Enterprise",
        "price_per_month": 199,
        "features": ["Unlimited minutes", "Custom voice cloning", "Priority support", "White-label options"]
      }
    ],
    "benchmarks": {
      "speed": 8,
      "accuracy": 8,
      "integration": 9,
      "ease_of_use": 9,
      "value": 8
    },
    "rating": 4.4,
    "review_count": 320
  },
  {
    "id": "colossyan-creator",
    "name": "Colossyan Creator",
    "slug": "colossyan-creator",
    "logo": "/images/tools/colossyan-creator-logo.svg",
    "meta": {
      "title": "Colossyan Creator Review: AI Video Training Platform [2025] | SiteOptz",
      "description": "Colossyan Creator review. Create professional training videos with AI avatars. Corporate learning, education content & multilingual support. Pricing & features."
    },
    "overview": {
      "developer": "Colossyan Ltd",
      "release_year": 2021,
      "description": "Colossyan Creator is an AI video platform for creating professional training and educational videos with AI avatars. Features customizable synthetic actors, multilingual support, and automatic scene generation for corporate learning content.",
      "category": "Video Generation",
      "website": "https://colossyan.com"
    },
    "features": [
      "AI avatar video generation",
      "Customizable synthetic actors",
      "Multilingual voice synthesis",
      "Automatic scene generation",
      "Training content templates",
      "Interactive video elements",
      "Brand customization options"
    ],
    "pros": [
      "Professional quality AI avatars",
      "Excellent for training content",
      "Multi-language support",
      "Cost-effective vs traditional video production"
    ],
    "cons": [
      "Limited avatar customization in lower tiers",
      "Focused primarily on training/education use cases",
      "Subscription required for advanced features"
    ],
    "pricing": [
      {
        "plan": "Starter",
        "price_per_month": 19,
        "features": ["10 videos per month", "Basic avatars", "720p export"]
      },
      {
        "plan": "Pro",
        "price_per_month": 61,
        "features": ["Unlimited videos", "Premium avatars", "1080p export", "Custom branding"]
      },
      {
        "plan": "Enterprise",
        "price_per_month": "Custom",
        "features": ["Custom avatars", "API access", "Priority support", "Advanced analytics"]
      }
    ],
    "benchmarks": {
      "speed": 7,
      "accuracy": 8,
      "integration": 7,
      "ease_of_use": 8,
      "value": 8
    },
    "rating": 4.2,
    "review_count": 180
  },
  {
    "id": "elai-io",
    "name": "Elai.io",
    "slug": "elai-io", 
    "logo": "/images/tools/elai-io-logo.svg",
    "meta": {
      "title": "Elai.io Review: AI Avatar Video Generator [2025] | SiteOptz",
      "description": "Elai.io review. Create training & marketing videos with AI avatars. Text-to-video conversion, custom presenters & voice sync. Features & pricing compared."
    },
    "overview": {
      "developer": "Elai Technologies",
      "release_year": 2022,
      "description": "Elai.io is an AI video generation platform with customizable avatars for creating training and marketing videos. Transform text into engaging video content with lifelike AI presenters and automated voice synchronization.",
      "category": "Video Generation", 
      "website": "https://elai.io"
    },
    "features": [
      "AI avatar video generation",
      "Text-to-video conversion",
      "Custom AI presenter creation",
      "Automated voice synchronization",
      "Multi-language support",
      "Template library",
      "Brand kit integration"
    ],
    "pros": [
      "High-quality AI avatars",
      "Easy text-to-video workflow",
      "Professional video output",
      "Good template selection"
    ],
    "cons": [
      "Limited free tier",
      "Avatar customization requires higher plans",
      "Processing time for complex videos"
    ],
    "pricing": [
      {
        "plan": "Basic",
        "price_per_month": 23,
        "features": ["15 minutes per month", "Stock avatars", "720p export"]
      },
      {
        "plan": "Advanced",
        "price_per_month": 67,
        "features": ["50 minutes per month", "Custom avatars", "1080p export", "Voice cloning"]
      },
      {
        "plan": "Enterprise",
        "price_per_month": "Custom",
        "features": ["Unlimited minutes", "API access", "Priority support", "White-label"]
      }
    ],
    "benchmarks": {
      "speed": 7,
      "accuracy": 8,
      "integration": 8,
      "ease_of_use": 8,
      "value": 7
    },
    "rating": 4.1,
    "review_count": 95
  }
];

function addMultipleTools() {
  // Load existing tools
  const dataPath = path.join(__dirname, 'public/data/aiToolsData.json');
  let tools = [];
  
  if (fs.existsSync(dataPath)) {
    tools = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }

  const initialCount = tools.length;
  let addedCount = 0;

  // Check for duplicates and add new tools
  toolsToAdd.forEach(newTool => {
    // Check if tool already exists
    const exists = tools.some(existingTool => 
      existingTool.id === newTool.id || 
      existingTool.name.toLowerCase() === newTool.name.toLowerCase() ||
      existingTool.slug === newTool.slug
    );

    if (!exists) {
      tools.push(newTool);
      addedCount++;
      console.log(`✅ Added: ${newTool.name}`);
    } else {
      console.log(`⚠️  Skipped duplicate: ${newTool.name}`);
    }
  });

  // Save updated tools
  fs.writeFileSync(dataPath, JSON.stringify(tools, null, 2));
  
  console.log(`\n📊 Summary:`);
  console.log(`   Tools before: ${initialCount}`);
  console.log(`   Tools added: ${addedCount}`);
  console.log(`   Total tools: ${tools.length}`);
  console.log(`   Updated file: ${dataPath}`);
}

addMultipleTools();