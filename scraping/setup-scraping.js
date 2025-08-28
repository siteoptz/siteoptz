#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

console.log('🔧 Setting up SiteOptz AI Tools Scraping System\n');
console.log('='.repeat(60));

async function setup() {
  try {
    // Create necessary directories
    console.log('\n📁 Creating directory structure...');
    const directories = [
      'data',
      'data/scraped',
      'data/merged',
      'data/merged/categories',
      'data/analytics',
      'data/reports'
    ];
    
    for (const dir of directories) {
      const dirPath = path.join(__dirname, dir);
      await fs.mkdir(dirPath, { recursive: true });
      console.log(`   ✅ ${dir}/`);
    }
    
    // Check for .env file
    console.log('\n🔑 Checking configuration...');
    const envPath = path.join(__dirname, '.env');
    try {
      await fs.access(envPath);
      console.log('   ✅ .env file found');
      
      // Read and validate .env
      const envContent = await fs.readFile(envPath, 'utf8');
      if (envContent.includes('FIRECRAWL_API_KEY')) {
        console.log('   ✅ API key configured');
      } else {
        console.log('   ⚠️ API key not found in .env');
      }
    } catch {
      console.log('   ⚠️ .env file not found');
      console.log('   Creating .env.example for reference...');
      
      const exampleContent = `# Firecrawl API Configuration
FIRECRAWL_API_KEY=your-api-key-here

# Scraping Configuration
MAX_REQUESTS=100
DELAY_MS=2000
CONCURRENT_REQUESTS=3

# Data Output
OUTPUT_DIR=./data
WEBSITE_DATA_PATH=../public/data/aiToolsData.json`;
      
      await fs.writeFile(path.join(__dirname, '.env.example'), exampleContent);
      console.log('   ✅ Created .env.example');
    }
    
    // Check dependencies
    console.log('\n📦 Checking dependencies...');
    try {
      require('@mendable/firecrawl-js');
      console.log('   ✅ Firecrawl package installed');
    } catch {
      console.log('   ⚠️ Firecrawl not installed. Run: npm install');
    }
    
    try {
      require('dotenv');
      console.log('   ✅ Dotenv package installed');
    } catch {
      console.log('   ⚠️ Dotenv not installed. Run: npm install');
    }
    
    // Test category normalization
    console.log('\n🏷️ Testing category normalization...');
    const { normalizeCategory } = require('./scrape-new-ai-tools');
    const testCases = [
      { input: 'text', expected: 'text-generation' },
      { input: 'image', expected: 'image-generation' },
      { input: 'code', expected: 'code-generation' },
      { input: 'chatbot', expected: 'chatbots' },
      { input: 'voice', expected: 'voice-ai' }
    ];
    
    let passed = 0;
    testCases.forEach(test => {
      const result = normalizeCategory(test.input);
      if (result === test.expected) {
        console.log(`   ✅ "${test.input}" → "${result}"`);
        passed++;
      } else {
        console.log(`   ❌ "${test.input}" → "${result}" (expected: "${test.expected}")`);
      }
    });
    
    console.log(`   ${passed}/${testCases.length} tests passed`);
    
    // Check for existing data
    console.log('\n📊 Checking existing data...');
    const dataPath = path.join(__dirname, '../public/data/aiToolsData.json');
    try {
      const data = await fs.readFile(dataPath, 'utf8');
      const tools = JSON.parse(data);
      const toolCount = Array.isArray(tools) ? tools.length : 0;
      console.log(`   ✅ Found ${toolCount} existing tools`);
      
      if (toolCount > 0) {
        // Analyze existing categories
        const categories = new Set(tools.map(t => t.category).filter(Boolean));
        console.log(`   📂 ${categories.size} categories found`);
      }
    } catch {
      console.log('   ℹ️ No existing tools data found (will create new)');
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ Setup complete!\n');
    
    console.log('📝 Next Steps:');
    console.log('1. Get your Firecrawl API key from: https://firecrawl.dev');
    console.log('2. Add it to your .env file: FIRECRAWL_API_KEY=your-key');
    console.log('3. Run the scraper: npm run scrape-all');
    console.log('\n💡 Available Commands:');
    console.log('   npm run scrape-all    - Run complete scraping pipeline');
    console.log('   npm run scrape-new    - Scrape new tools only');
    console.log('   npm run merge         - Merge scraped data with existing');
    console.log('   npm run analytics     - Generate analytics report');
    console.log('   npm run clean         - Clean up data directories');
    console.log('\n');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

setup();