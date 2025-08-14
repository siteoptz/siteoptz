#!/usr/bin/env node

/**
 * Automated Tool Addition Script for SiteOptz.ai
 * 
 * This script handles:
 * - Adding new AI tools to the system
 * - Merging data into existing JSON files
 * - Validating data structure
 * - Triggering rebuild and deployment
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const CONFIG = {
  aiToolsPath: path.join(__dirname, '../public/data/aiToolsData.json'),
  faqPath: path.join(__dirname, '../public/data/faqData.json'),
  backupDir: path.join(__dirname, '../backups'),
  logFile: path.join(__dirname, '../automation.log')
};

// Utility functions
const log = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(CONFIG.logFile, logMessage + '\n');
};

const createBackup = (filePath) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = path.basename(filePath);
  const backupPath = path.join(CONFIG.backupDir, `${fileName}.${timestamp}.backup`);
  
  if (!fs.existsSync(CONFIG.backupDir)) {
    fs.mkdirSync(CONFIG.backupDir, { recursive: true });
  }
  
  fs.copyFileSync(filePath, backupPath);
  log(`Backup created: ${backupPath}`);
  return backupPath;
};

// Validation functions
const validateToolData = (toolData) => {
  const requiredFields = [
    'id', 'slug', 'name', 'logo', 'meta', 'schema', 
    'overview', 'features', 'pros', 'cons', 'pricing', 
    'benchmarks', 'related_tools'
  ];
  
  const errors = [];
  
  // Check required fields
  requiredFields.forEach(field => {
    if (!toolData[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Validate meta structure
  if (toolData.meta) {
    if (!toolData.meta.title || !toolData.meta.description) {
      errors.push('Meta must have title and description');
    }
  }
  
  // Validate pricing structure
  if (toolData.pricing && Array.isArray(toolData.pricing)) {
    toolData.pricing.forEach((plan, index) => {
      if (!plan.plan || typeof plan.price_per_month !== 'number' || !plan.features) {
        errors.push(`Invalid pricing plan at index ${index}`);
      }
    });
  }
  
  // Validate benchmarks
  if (toolData.benchmarks) {
    const benchmarkKeys = ['speed', 'accuracy', 'integration', 'ease_of_use', 'value'];
    benchmarkKeys.forEach(key => {
      if (typeof toolData.benchmarks[key] !== 'number' || 
          toolData.benchmarks[key] < 1 || 
          toolData.benchmarks[key] > 10) {
        errors.push(`Invalid benchmark value for ${key}: must be between 1 and 10`);
      }
    });
  }
  
  return errors;
};

const validateFAQData = (faqData) => {
  const errors = [];
  
  if (!Array.isArray(faqData) || faqData.length === 0) {
    errors.push('FAQ data must be a non-empty array');
    return errors;
  }
  
  faqData.forEach((faq, index) => {
    if (!faq.question || !faq.answer || !faq.schema) {
      errors.push(`Invalid FAQ entry at index ${index}: missing required fields`);
    }
    
    if (faq.schema && (!faq.schema['@type'] || !faq.schema.name || !faq.schema.acceptedAnswer)) {
      errors.push(`Invalid FAQ schema at index ${index}`);
    }
  });
  
  return errors;
};

// Data generation functions
const generateToolData = (input) => {
  const slug = input.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const id = slug;
  
  return {
    id,
    name: input.name,
    slug,
    logo: `/images/tools/${slug}-logo.png`,
    meta: {
      title: `${input.name} Review, Pricing, Features & Alternatives [2025]`,
      description: `Compare ${input.name} to other AI tools. See pricing, features, and performance benchmarks. Expert analysis with real user feedback.`
    },
    schema: {
      "@type": "Product",
      "name": input.name,
      "image": `/images/tools/${slug}-logo.png`,
      "description": input.description,
      "brand": input.developer
    },
    overview: {
      developer: input.developer,
      release_year: input.releaseYear,
      description: input.description
    },
    features: input.features,
    pros: input.pros,
    cons: input.cons,
    pricing: input.pricing.map(plan => ({
      plan: plan.name,
      price_per_month: plan.price,
      features: plan.features
    })),
    benchmarks: input.benchmarks,
    related_tools: input.relatedTools
  };
};

const generateFAQData = (toolData) => {
  return [
    {
      question: `What is ${toolData.name}?`,
      answer: `${toolData.name} is ${toolData.overview.description}`,
      schema: {
        "@type": "Question",
        "name": `What is ${toolData.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${toolData.name} is ${toolData.overview.description}`
        }
      }
    },
    {
      question: `How much does ${toolData.name} cost?`,
      answer: `${toolData.name} offers ${toolData.pricing.length} pricing plans starting from ${toolData.pricing[0].price_per_month === 0 ? 'free' : `$${toolData.pricing[0].price_per_month}/month`}.`,
      schema: {
        "@type": "Question",
        "name": `How much does ${toolData.name} cost?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${toolData.name} offers ${toolData.pricing.length} pricing plans starting from ${toolData.pricing[0].price_per_month === 0 ? 'free' : `$${toolData.pricing[0].price_per_month}/month`}.`
        }
      }
    },
    {
      question: `What are the main features of ${toolData.name}?`,
      answer: `${toolData.name} offers ${toolData.features.slice(0, 5).join(', ')}, and more.`,
      schema: {
        "@type": "Question",
        "name": `What are the main features of ${toolData.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${toolData.name} offers ${toolData.features.slice(0, 5).join(', ')}, and more.`
        }
      }
    },
    {
      question: `Is ${toolData.name} worth it?`,
      answer: `${toolData.name} offers ${toolData.pros[0].toLowerCase()} and ${toolData.pros[1].toLowerCase()}. However, it has ${toolData.cons[0].toLowerCase()}. Consider your specific needs when evaluating.`,
      schema: {
        "@type": "Question",
        "name": `Is ${toolData.name} worth it?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${toolData.name} offers ${toolData.pros[0].toLowerCase()} and ${toolData.pros[1].toLowerCase()}. However, it has ${toolData.cons[0].toLowerCase()}. Consider your specific needs when evaluating.`
        }
      }
    },
    {
      question: `Does ${toolData.name} offer a free trial?`,
      answer: toolData.pricing[0].price_per_month === 0 
        ? `Yes, ${toolData.name} offers a free tier with ${toolData.pricing[0].features[0]}.`
        : `Check ${toolData.name}'s official website for current trial offers and promotions.`,
      schema: {
        "@type": "Question",
        "name": `Does ${toolData.name} offer a free trial?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": toolData.pricing[0].price_per_month === 0 
            ? `Yes, ${toolData.name} offers a free tier with ${toolData.pricing[0].features[0]}.`
            : `Check ${toolData.name}'s official website for current trial offers and promotions.`
        }
      }
    }
  ];
};

// Main functions
const addTool = async (toolData, faqData) => {
  try {
    log('Starting tool addition process...');
    
    // Validate tool data
    const toolErrors = validateToolData(toolData);
    if (toolErrors.length > 0) {
      throw new Error(`Tool validation failed:\n${toolErrors.join('\n')}`);
    }
    
    // Validate FAQ data
    const faqErrors = validateFAQData(faqData);
    if (faqErrors.length > 0) {
      throw new Error(`FAQ validation failed:\n${faqErrors.join('\n')}`);
    }
    
    // Create backups
    createBackup(CONFIG.aiToolsPath);
    createBackup(CONFIG.faqPath);
    
    // Load existing data
    const existingTools = JSON.parse(fs.readFileSync(CONFIG.aiToolsPath, 'utf8'));
    const existingFAQs = JSON.parse(fs.readFileSync(CONFIG.faqPath, 'utf8'));
    
    // Check for duplicates
    const existingTool = existingTools.find(t => t.id === toolData.id);
    if (existingTool) {
      log(`Tool ${toolData.id} already exists. Updating...`);
      const index = existingTools.findIndex(t => t.id === toolData.id);
      existingTools[index] = toolData;
    } else {
      log(`Adding new tool: ${toolData.id}`);
      existingTools.push(toolData);
    }
    
    // Update FAQ data
    existingFAQs[toolData.id] = faqData;
    
    // Sort tools alphabetically
    existingTools.sort((a, b) => a.name.localeCompare(b.name));
    
    // Save updated data
    fs.writeFileSync(CONFIG.aiToolsPath, JSON.stringify(existingTools, null, 2));
    fs.writeFileSync(CONFIG.faqPath, JSON.stringify(existingFAQs, null, 2));
    
    log(`Successfully added/updated tool: ${toolData.name}`);
    
    // Generate URLs for testing
    const urls = [
      `https://siteoptz.ai/tools/${toolData.slug}`,
      ...toolData.related_tools.map(related => 
        `https://siteoptz.ai/compare/${toolData.slug}-vs-${related}`
      )
    ];
    
    log('Generated URLs for testing:');
    urls.forEach(url => log(`  - ${url}`));
    
    return {
      success: true,
      toolId: toolData.id,
      urls
    };
    
  } catch (error) {
    log(`Error adding tool: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
};

// CLI Interface
const runCLI = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));
  
  console.log('\n🤖 SiteOptz AI Tool Addition System\n');
  console.log('Choose an option:');
  console.log('1. Add tool from JSON file');
  console.log('2. Add tool interactively');
  console.log('3. Validate existing data');
  console.log('4. Exit\n');
  
  const choice = await question('Enter your choice (1-4): ');
  
  switch (choice) {
    case '1':
      const filePath = await question('Enter path to tool JSON file: ');
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const toolData = data.tool || data;
        const faqData = data.faqs || generateFAQData(toolData);
        const result = await addTool(toolData, faqData);
        console.log(result.success ? '✅ Tool added successfully!' : `❌ Failed: ${result.error}`);
      } catch (error) {
        console.error(`❌ Error reading file: ${error.message}`);
      }
      break;
      
    case '2':
      console.log('\n📝 Enter tool information:\n');
      
      const input = {
        name: await question('Tool Name: '),
        developer: await question('Developer: '),
        description: await question('Description: '),
        releaseYear: parseInt(await question('Release Year: ')),
        features: (await question('Features (comma-separated): ')).split(',').map(f => f.trim()),
        pros: (await question('Pros (comma-separated): ')).split(',').map(p => p.trim()),
        cons: (await question('Cons (comma-separated): ')).split(',').map(c => c.trim()),
        pricing: [],
        benchmarks: {},
        relatedTools: (await question('Related Tools (comma-separated): ')).split(',').map(t => t.trim())
      };
      
      // Get pricing plans
      const planCount = parseInt(await question('Number of pricing plans: '));
      for (let i = 0; i < planCount; i++) {
        console.log(`\nPlan ${i + 1}:`);
        input.pricing.push({
          name: await question('  Plan Name: '),
          price: parseFloat(await question('  Price per month: ')),
          features: (await question('  Features (comma-separated): ')).split(',').map(f => f.trim())
        });
      }
      
      // Get benchmarks
      console.log('\nBenchmarks (1-10):');
      input.benchmarks = {
        speed: parseFloat(await question('  Speed: ')),
        accuracy: parseFloat(await question('  Accuracy: ')),
        integration: parseFloat(await question('  Integration: ')),
        ease_of_use: parseFloat(await question('  Ease of Use: ')),
        value: parseFloat(await question('  Value: '))
      };
      
      const toolData = generateToolData(input);
      const faqData = generateFAQData(toolData);
      
      const result = await addTool(toolData, faqData);
      console.log(result.success ? '✅ Tool added successfully!' : `❌ Failed: ${result.error}`);
      break;
      
    case '3':
      console.log('\n🔍 Validating existing data...\n');
      try {
        const tools = JSON.parse(fs.readFileSync(CONFIG.aiToolsPath, 'utf8'));
        const faqs = JSON.parse(fs.readFileSync(CONFIG.faqPath, 'utf8'));
        
        let hasErrors = false;
        tools.forEach(tool => {
          const errors = validateToolData(tool);
          if (errors.length > 0) {
            console.log(`❌ ${tool.name}: ${errors.join(', ')}`);
            hasErrors = true;
          }
        });
        
        if (!hasErrors) {
          console.log(`✅ All ${tools.length} tools validated successfully!`);
        }
      } catch (error) {
        console.error(`❌ Validation error: ${error.message}`);
      }
      break;
      
    case '4':
      console.log('👋 Goodbye!');
      rl.close();
      return;
      
    default:
      console.log('❌ Invalid choice');
  }
  
  rl.close();
  
  // Ask if user wants to trigger deployment
  const deployRl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  deployRl.question('\n🚀 Trigger deployment? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      console.log('Triggering deployment...');
      require('child_process').execSync('npm run build && npm run deploy', { stdio: 'inherit' });
    }
    deployRl.close();
  });
};

// Export for programmatic use
module.exports = {
  addTool,
  validateToolData,
  validateFAQData,
  generateToolData,
  generateFAQData
};

// Run CLI if executed directly
if (require.main === module) {
  runCLI();
}