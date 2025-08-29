const fs = require('fs');
const path = require('path');

/**
 * Simple tool addition script
 * Usage: node add-tool.js
 * Then follow the prompts or edit this file to add your tool data
 */

function addTool(toolData) {
  const dataPath = path.join(__dirname, 'public/data/aiToolsData.json');
  
  // Load existing tools
  let tools = [];
  if (fs.existsSync(dataPath)) {
    tools = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }
  
  // Validate required fields
  const required = ['id', 'name', 'slug', 'description', 'features', 'pricing'];
  for (const field of required) {
    if (!toolData[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  
  // Check for duplicate ID
  if (tools.find(t => t.id === toolData.id)) {
    throw new Error(`Tool with ID '${toolData.id}' already exists`);
  }
  
  // Add default values for missing optional fields
  const tool = {
    id: toolData.id,
    name: toolData.name,
    slug: toolData.slug,
    description: toolData.description,
    logo: toolData.logo || `/images/tools/${toolData.id}-logo.svg`,
    category: toolData.category || 'Other',
    website: toolData.website || '#',
    features: toolData.features,
    pricing: toolData.pricing,
    pros: toolData.pros || [],
    cons: toolData.cons || [],
    rating: toolData.rating || 4.0,
    review_count: toolData.review_count || 100,
    benchmarks: toolData.benchmarks || {
      speed: 7,
      accuracy: 7,
      integration: 7,
      ease_of_use: 7,
      value: 7
    },
    meta: {
      title: `${toolData.name} Review, Pricing, Features & Alternatives [2025]`,
      description: `Comprehensive review of ${toolData.name}. ${toolData.description} Compare features, pricing, and alternatives.`,
      keywords: `${toolData.name.toLowerCase()}, ${toolData.name.toLowerCase()} review, ${toolData.name.toLowerCase()} pricing, ${toolData.name.toLowerCase()} alternatives`,
      canonical: `https://siteoptz.ai/tools/${toolData.slug}`
    },
    overview: {
      developer: toolData.developer || toolData.name,
      release_year: toolData.release_year || 2024,
      description: toolData.description
    }
  };
  
  // Add the new tool
  tools.push(tool);
  
  // Write back to file
  fs.writeFileSync(dataPath, JSON.stringify(tools, null, 2));
  
  console.log(`✅ Added tool: ${tool.name} (${tool.id})`);
  console.log(`📁 Updated: ${dataPath}`);
  
  return tool;
}

// Example usage - uncomment and modify to add a tool:
/*
const newTool = {
  id: "example-tool",
  name: "Example Tool", 
  slug: "example-tool",
  description: "An example AI tool for demonstration",
  website: "https://example.com",
  category: "Content Creation",
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  pricing: [
    {
      plan: "Free",
      price_per_month: 0,
      features: ["Basic features"]
    },
    {
      plan: "Pro",
      price_per_month: 29,
      features: ["All features", "Priority support"]
    }
  ],
  pros: ["Easy to use", "Good value"],
  cons: ["Limited free plan"],
  rating: 4.2,
  review_count: 500
};

addTool(newTool);
*/

module.exports = { addTool };