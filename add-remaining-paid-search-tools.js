#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Add remaining 8 Paid Search & PPC tools using data-only approach
 * Following the successful pattern from commit a093dea that added 25 tools seamlessly
 */

function addRemainingPaidSearchTools() {
  const remainingTools = [
    {
      "id": "tapclicks",
      "name": "TapClicks",
      "slug": "tapclicks",
      "logo": "/images/tools/tapclicks-logo.svg",
      "description": "Marketing operations platform for campaign management and performance reporting",
      "overview": {
        "developer": "TapClicks",
        "release_year": 2012,
        "description": "TapClicks is a comprehensive marketing operations platform that streamlines campaign management, performance reporting, and workflow automation for digital marketing agencies and teams.",
        "category": "Paid Search & PPC"
      },
      "features": [
        "Unified campaign management dashboard",
        "Automated performance reporting",
        "Multi-platform analytics integration",
        "Client reporting and white-label solutions",
        "Workflow automation and approval processes"
      ],
      "pros": [
        "Comprehensive agency features",
        "Strong automation capabilities",
        "White-label reporting options"
      ],
      "cons": [
        "Complex setup process",
        "Higher pricing for smaller teams"
      ],
      "pricing": [
        {
          "tier": "Professional",
          "price_per_month": 185,
          "features": ["Campaign management", "Basic reporting", "API access", "Email support"]
        },
        {
          "tier": "Enterprise",
          "price_per_month": "Custom",
          "features": ["Advanced automation", "Custom reporting", "White-label options", "Dedicated support"]
        }
      ],
      "benchmarks": {
        "speed": 8,
        "accuracy": 8,
        "integration": 9,
        "ease_of_use": 7,
        "value": 7
      },
      "rating": 4.2,
      "review_count": 320,
      "category": "Paid Search & PPC"
    },
    {
      "id": "optimizely",
      "name": "Optimizely",
      "slug": "optimizely", 
      "logo": "/images/tools/optimizely-logo.svg",
      "description": "Digital experience optimization platform for A/B testing and personalization",
      "overview": {
        "developer": "Optimizely",
        "release_year": 2010,
        "description": "Optimizely is a leading digital experience optimization platform that enables businesses to run A/B tests, personalize content, and optimize conversion rates across web and mobile applications.",
        "category": "Paid Search & PPC"
      },
      "features": [
        "A/B testing and multivariate testing",
        "Real-time personalization engine",
        "Feature flag management",
        "Advanced audience targeting",
        "Statistical significance analysis"
      ],
      "pros": [
        "Enterprise-grade testing platform",
        "Advanced statistical analysis",
        "Comprehensive personalization features"
      ],
      "cons": [
        "Complex implementation process",
        "High pricing for smaller businesses"
      ],
      "pricing": [
        {
          "tier": "Starter",
          "price_per_month": 50,
          "features": ["Basic A/B testing", "Simple targeting", "Standard support"]
        },
        {
          "tier": "Professional",
          "price_per_month": 275,
          "features": ["Advanced testing", "Personalization", "API access", "Priority support"]
        }
      ],
      "benchmarks": {
        "speed": 8,
        "accuracy": 9,
        "integration": 8,
        "ease_of_use": 6,
        "value": 7
      },
      "rating": 4.3,
      "review_count": 650,
      "category": "Paid Search & PPC"
    },
    {
      "id": "reportgarden",
      "name": "ReportGarden",
      "slug": "reportgarden",
      "logo": "/images/tools/reportgarden-logo.svg", 
      "description": "Automated marketing reporting and campaign management platform for agencies",
      "overview": {
        "developer": "ReportGarden",
        "release_year": 2010,
        "description": "ReportGarden is an automated marketing reporting platform that helps agencies create professional client reports and manage PPC campaigns across multiple platforms.",
        "category": "Paid Search & PPC"
      },
      "features": [
        "Automated report generation",
        "Multi-platform campaign management",
        "Client dashboard and portal",
        "White-label reporting solutions",
        "Performance tracking and analytics"
      ],
      "pros": [
        "Comprehensive agency features",
        "Strong automation capabilities", 
        "Professional reporting templates"
      ],
      "cons": [
        "Learning curve for new users",
        "Limited customization options"
      ],
      "pricing": [
        {
          "tier": "Starter",
          "price_per_month": 9,
          "features": ["Basic reporting", "5 clients", "Standard templates", "Email support"]
        },
        {
          "tier": "Professional",
          "price_per_month": 29,
          "features": ["Advanced features", "Unlimited clients", "Custom branding", "Priority support"]
        }
      ],
      "benchmarks": {
        "speed": 8,
        "accuracy": 8,
        "integration": 8,
        "ease_of_use": 7,
        "value": 8
      },
      "rating": 4.1,
      "review_count": 420,
      "category": "Paid Search & PPC"
    },
    {
      "id": "adbeat",
      "name": "Adbeat",
      "slug": "adbeat",
      "logo": "/images/tools/adbeat-logo.svg",
      "description": "Display advertising intelligence and competitive analysis platform",
      "overview": {
        "developer": "Adbeat",
        "release_year": 2011,
        "description": "Adbeat is a display advertising intelligence platform that provides competitive insights and market analysis for digital advertising campaigns across multiple networks.",
        "category": "Paid Search & PPC"
      },
      "features": [
        "Display ad intelligence and monitoring",
        "Competitive advertising analysis",
        "Ad creative tracking and history",
        "Publisher network insights",
        "Market trend analysis"
      ],
      "pros": [
        "Comprehensive display ad intelligence",
        "Historical advertising data",
        "Market trend insights"
      ],
      "cons": [
        "Focused primarily on display ads",
        "Limited search advertising data"
      ],
      "pricing": [
        {
          "tier": "Starter",
          "price_per_month": 249,
          "features": ["Basic ad intelligence", "Limited searches", "Standard reports", "Email support"]
        },
        {
          "tier": "Professional",
          "price_per_month": 449,
          "features": ["Full ad intelligence", "Unlimited searches", "Advanced analytics", "Priority support"]
        }
      ],
      "benchmarks": {
        "speed": 8,
        "accuracy": 8,
        "integration": 7,
        "ease_of_use": 7,
        "value": 7
      },
      "rating": 4.0,
      "review_count": 180,
      "category": "Paid Search & PPC"
    },
    {
      "id": "trueclicks",
      "name": "TrueClicks",
      "slug": "trueclicks",
      "logo": "/images/tools/trueclicks-logo.svg",
      "description": "Click fraud protection and invalid traffic detection for PPC campaigns",
      "overview": {
        "developer": "TrueClicks",
        "release_year": 2015,
        "description": "TrueClicks is a click fraud protection platform that uses machine learning algorithms to detect and prevent invalid traffic in PPC campaigns.",
        "category": "Paid Search & PPC"
      },
      "features": [
        "Real-time fraud detection",
        "Invalid traffic blocking",
        "Bot detection algorithms", 
        "Comprehensive fraud analytics",
        "Custom rule creation"
      ],
      "pros": [
        "Advanced fraud detection technology",
        "Real-time traffic protection",
        "Comprehensive analytics"
      ],
      "cons": [
        "Specialized focus on fraud protection only",
        "Additional cost layer for campaigns"
      ],
      "pricing": [
        {
          "tier": "Starter",
          "price_per_month": 99,
          "features": ["Basic fraud detection", "Real-time monitoring", "Standard reporting", "Email support"]
        },
        {
          "tier": "Professional",
          "price_per_month": 299,
          "features": ["Advanced detection", "Custom rules", "Detailed analytics", "Priority support"]
        }
      ],
      "benchmarks": {
        "speed": 8,
        "accuracy": 9,
        "integration": 8,
        "ease_of_use": 7,
        "value": 8
      },
      "rating": 4.4,
      "review_count": 180,
      "category": "Paid Search & PPC"
    },
    {
      "id": "similarweb",
      "name": "Similarweb",
      "slug": "similarweb",
      "logo": "/images/tools/similarweb-logo.svg",
      "description": "Digital market intelligence and website analytics platform",
      "overview": {
        "developer": "Similarweb Ltd",
        "release_year": 2007,
        "description": "Similarweb is a digital market intelligence platform that provides website analytics, competitive insights, and market research data.",
        "category": "Paid Search & PPC"
      },
      "features": [
        "Website traffic analysis",
        "Competitive benchmarking",
        "Market research capabilities",
        "PPC advertising intelligence",
        "Audience insights and demographics"
      ],
      "pros": [
        "Comprehensive market intelligence",
        "Extensive global database",
        "Professional analytics"
      ],
      "cons": [
        "Higher pricing for comprehensive features",
        "Complex interface requiring training"
      ],
      "pricing": [
        {
          "tier": "Starter",
          "price_per_month": 199,
          "features": ["Basic website analysis", "Limited competitive data", "Standard support"]
        },
        {
          "tier": "Professional",
          "price_per_month": 399,
          "features": ["Advanced analytics", "Full competitive intelligence", "Priority support"]
        }
      ],
      "benchmarks": {
        "speed": 8,
        "accuracy": 8,
        "integration": 8,
        "ease_of_use": 7,
        "value": 7
      },
      "rating": 4.2,
      "review_count": 1800,
      "category": "Paid Search & PPC"
    },
    {
      "id": "unbounce",
      "name": "Unbounce",
      "slug": "unbounce",
      "logo": "/images/tools/unbounce-logo.svg",
      "description": "Landing page builder and conversion optimization platform for PPC campaigns",
      "overview": {
        "developer": "Unbounce Marketing Solutions Inc",
        "release_year": 2009,
        "description": "Unbounce is a leading landing page builder and conversion optimization platform that helps businesses create high-converting landing pages for their PPC campaigns without requiring technical expertise.",
        "category": "Paid Search & PPC"
      },
      "features": [
        "Drag-and-drop landing page builder",
        "A/B testing and optimization tools",
        "Conversion tracking and analytics",
        "Dynamic text replacement",
        "Mobile-responsive templates"
      ],
      "pros": [
        "User-friendly page builder",
        "Strong A/B testing capabilities",
        "Comprehensive template library"
      ],
      "cons": [
        "Higher pricing for advanced features",
        "Limited design flexibility"
      ],
      "pricing": [
        {
          "tier": "Launch",
          "price_per_month": 99,
          "features": ["Landing page builder", "Basic A/B testing", "Standard templates", "Email support"]
        },
        {
          "tier": "Optimize",
          "price_per_month": 145,
          "features": ["Advanced features", "Dynamic text replacement", "Premium templates", "Priority support"]
        }
      ],
      "benchmarks": {
        "speed": 8,
        "accuracy": 8,
        "integration": 8,
        "ease_of_use": 9,
        "value": 7
      },
      "rating": 4.4,
      "review_count": 1250,
      "category": "Paid Search & PPC"
    },
    {
      "id": "wordstream",
      "name": "WordStream",
      "slug": "wordstream",
      "logo": "/images/tools/wordstream-logo.svg",
      "description": "PPC management platform with automated optimization and performance insights",
      "overview": {
        "developer": "WordStream Inc",
        "release_year": 2007,
        "description": "WordStream is a PPC management platform that provides automated optimization, performance insights, and campaign management tools for Google Ads and Microsoft Ads.",
        "category": "Paid Search & PPC"
      },
      "features": [
        "Automated PPC optimization",
        "Performance monitoring and alerts",
        "Keyword research and management",
        "Ad copy testing and optimization",
        "Landing page analysis"
      ],
      "pros": [
        "User-friendly automation features",
        "Comprehensive PPC insights",
        "Educational resources and support"
      ],
      "cons": [
        "Limited to Google and Microsoft Ads",
        "Pricing can be high for small businesses"
      ],
      "pricing": [
        {
          "tier": "Starter",
          "price_per_month": 264,
          "features": ["Basic optimization", "Performance monitoring", "Standard support"]
        },
        {
          "tier": "Professional",
          "price_per_month": 512,
          "features": ["Advanced features", "Custom reporting", "Priority support"]
        }
      ],
      "benchmarks": {
        "speed": 8,
        "accuracy": 8,
        "integration": 8,
        "ease_of_use": 8,
        "value": 7
      },
      "rating": 4.2,
      "review_count": 890,
      "category": "Paid Search & PPC"
    }
  ];

  // Load existing tools
  const dataPath = path.join(__dirname, 'public/data/aiToolsData.json');
  let tools = [];
  
  if (fs.existsSync(dataPath)) {
    tools = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } else {
    console.log('Creating new aiToolsData.json file...');
  }
  
  let addedCount = 0;
  let skippedCount = 0;
  
  // Add each tool if it doesn't exist
  remainingTools.forEach(newTool => {
    const existingTool = tools.find(t => t.id === newTool.id || t.name === newTool.name);
    if (existingTool) {
      console.log(`⏭️  Tool '${newTool.name}' already exists. Skipping.`);
      skippedCount++;
    } else {
      tools.push(newTool);
      console.log(`✅ Added: ${newTool.name}`);
      addedCount++;
    }
  });
  
  // Save back to file
  fs.writeFileSync(dataPath, JSON.stringify(tools, null, 2));
  
  console.log(`\n🎉 Data-Only Addition Complete!`);
  console.log(`➕ Added: ${addedCount} tools`);
  console.log(`⏭️  Skipped: ${skippedCount} tools (already exist)`);
  console.log(`📁 Total tools: ${tools.length}`);
  console.log(`📄 File: ${dataPath}`);
  console.log(`\n🚀 Following successful pattern from commit a093dea`);
  console.log(`✨ No SEO components created - avoiding build errors`);
}

// Run the function
addRemainingPaidSearchTools();