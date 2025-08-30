#!/usr/bin/env node

/**
 * Sample SEO Optimization for 10 High-Priority Review Pages
 * 
 * This script runs the optimization on a small subset to demonstrate
 * the system and validate results before processing all 157 pages.
 */

import fs from 'fs';
import path from 'path';
import axios from 'axios';

// Configuration for sample run
const CONFIG = {
  dataforseo: {
    login: process.env.DATAFORSEO_LOGIN || "antonio@siteoptz.com",
    password: process.env.DATAFORSEO_PASSWORD || "8215cb0ce338b385",
    baseURL: "https://api.dataforseo.com/v3",
    location_code: 2840,
    language_code: "en"
  },
  sample_tools: [
    'chatgpt',
    'midjourney', 
    'claude',
    'cursor',
    'jasper-ai',
    'notion-ai',
    'rytr',
    'suno',
    'make',
    'n8n'
  ],
  output_dir: path.join(process.cwd(), 'seo-optimization', 'sample-output')
};

class SampleSEOOptimizer {
  constructor() {
    this.client = axios.create({
      baseURL: CONFIG.dataforseo.baseURL,
      auth: { 
        username: CONFIG.dataforseo.login, 
        password: CONFIG.dataforseo.password
      }
    });
    this.tools = [];
    this.results = {};
    this.totalCost = 0;
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(CONFIG.output_dir)) {
      fs.mkdirSync(CONFIG.output_dir, { recursive: true });
    }
  }

  async loadSampleTools() {
    try {
      const dataPath = path.join(process.cwd(), 'public', 'data', 'aiToolsData.json');
      const allTools = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      
      this.tools = allTools
        .filter(tool => CONFIG.sample_tools.includes(tool.slug))
        .map(tool => ({
          id: tool.id,
          name: tool.name,
          slug: tool.slug,
          category: tool.overview?.category || 'Other',
          description: tool.overview?.description || tool.meta?.description || '',
          website: tool.overview?.website || ''
        }));
      
      console.log(`📊 Loaded ${this.tools.length} sample tools for optimization`);
      return this.tools;
    } catch (error) {
      console.error('❌ Failed to load tools:', error.message);
      throw error;
    }
  }

  generateKeywordVariations(tool) {
    const toolName = tool.name.toLowerCase();
    return [
      `${toolName} review`,
      `${toolName} pricing`,
      `${toolName} features`,
      `${toolName} vs competitors`,
      `${toolName} alternatives`,
      `${toolName} tutorial`,
      `${toolName} use cases`,
      `how to use ${toolName}`,
      `${toolName} pros and cons`,
      `best ${toolName} alternative`
    ];
  }

  async getKeywordData(keywords) {
    try {
      const tasks = keywords.map(keyword => ({
        keyword,
        language_code: CONFIG.dataforseo.language_code,
        location_code: CONFIG.dataforseo.location_code
      }));

      const response = await this.client.post(
        '/keywords_data/google/search_volume/live',
        tasks
      );

      const results = [];
      for (let i = 0; i < response.data.tasks.length; i++) {
        const task = response.data.tasks[i];
        this.totalCost += task.cost || 0.01;

        if (task.status_code === 20000 && task.result?.[0]) {
          const result = task.result[0];
          results.push({
            keyword: keywords[i],
            search_volume: result.search_volume || 0,
            cpc: result.cpc || 0,
            competition: result.competition || 0,
            competition_level: result.competition_level || 'unknown'
          });
        } else {
          results.push({
            keyword: keywords[i],
            search_volume: 0,
            cpc: 0,
            competition: 0,
            competition_level: 'error'
          });
        }
      }

      return results.sort((a, b) => b.search_volume - a.search_volume);
    } catch (error) {
      console.error('❌ DataForSEO error:', error.response?.data || error.message);
      return keywords.map(keyword => ({
        keyword,
        search_volume: 0,
        cpc: 0,
        competition: 0,
        competition_level: 'error'
      }));
    }
  }

  generateSampleSEOContent(tool, primary, secondary) {
    return {
      meta_title: `${tool.name} Review: ${primary.keyword.replace(tool.name.toLowerCase(), '').replace('review', '').trim()} | SiteOptz`.substring(0, 60),
      meta_description: `${primary.keyword}. Compare ${tool.name} features, pricing & alternatives. Expert analysis & user guide for 2025.`,
      
      hero_section: `# ${primary.keyword.charAt(0).toUpperCase() + primary.keyword.slice(1)}

Discover everything you need to know about ${tool.name} in our comprehensive ${primary.keyword}. ${tool.description}

Our expert analysis covers key features, pricing, real-world use cases, and how ${tool.name} compares to alternatives in the ${tool.category} space.`,

      main_sections: [
        {
          heading: `## ${tool.name} Key Features & Capabilities`,
          keyword_target: secondary.find(k => k.keyword.includes('features'))?.keyword || 'features',
          content: `${tool.name} offers comprehensive features designed for ${tool.category} applications...`
        },
        {
          heading: `## ${tool.name} Pricing Plans & Value Analysis`, 
          keyword_target: secondary.find(k => k.keyword.includes('pricing'))?.keyword || 'pricing',
          content: `Understanding ${tool.name} pricing is crucial for budget planning...`
        }
      ],

      faq_section: [
        {
          question: `What is ${tool.name} and how does it work?`,
          answer: `${tool.name} is a ${tool.category} solution that ${tool.description}. It works by leveraging advanced technology to provide powerful capabilities.`
        },
        {
          question: `How much does ${tool.name} cost?`,
          answer: `${tool.name} offers multiple pricing tiers. Visit our detailed pricing analysis for current rates and value comparison.`
        },
        {
          question: `What are the best ${tool.name} alternatives?`,
          answer: `Popular ${tool.name} alternatives include other leading ${tool.category} tools. The best alternative depends on your specific requirements.`
        }
      ],

      schema_markup: {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "SoftwareApplication",
          "name": tool.name,
          "description": tool.description
        },
        "author": { "@type": "Organization", "name": "SiteOptz" },
        "reviewRating": { "@type": "Rating", "ratingValue": 4.5, "bestRating": 5 }
      }
    };
  }

  async runSampleOptimization() {
    console.log('🚀 Starting Sample SEO Optimization\n');
    
    await this.loadSampleTools();
    
    for (let i = 0; i < this.tools.length; i++) {
      const tool = this.tools[i];
      console.log(`🔍 [${i + 1}/${this.tools.length}] Processing: ${tool.name}`);
      
      try {
        const keywords = this.generateKeywordVariations(tool);
        const keywordData = await this.getKeywordData(keywords);
        
        const primary = keywordData[0];
        const secondary = keywordData.slice(1, 6);
        
        const seoContent = this.generateSampleSEOContent(tool, primary, secondary);
        
        this.results[tool.slug] = {
          tool,
          primary_keyword: primary,
          secondary_keywords: secondary,
          all_keywords: keywordData,
          seo_content: seoContent,
          total_volume: keywordData.reduce((sum, k) => sum + k.search_volume, 0)
        };
        
        console.log(`   ✅ Primary: "${primary.keyword}" (${primary.search_volume} vol)`);
        console.log(`   📝 Secondary: ${secondary.length} keywords`);
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`   ❌ Failed for ${tool.name}:`, error.message);
      }
    }
    
    return this.results;
  }

  async saveResults() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Save detailed results
    const resultsPath = path.join(CONFIG.output_dir, `sample-results-${timestamp}.json`);
    fs.writeFileSync(resultsPath, JSON.stringify({
      generated_at: new Date().toISOString(),
      total_tools: this.tools.length,
      total_cost: this.totalCost,
      results: this.results
    }, null, 2));
    
    // Save CSV summary
    const csvPath = path.join(CONFIG.output_dir, `sample-keywords-${timestamp}.csv`);
    const csvLines = ['Tool Name,Slug,Primary Keyword,Volume,CPC,Competition,Secondary Keywords Count,Total Volume'];
    
    for (const [slug, data] of Object.entries(this.results)) {
      const tool = data.tool;
      const primary = data.primary_keyword;
      
      csvLines.push([
        `"${tool.name}"`,
        slug,
        `"${primary.keyword}"`,
        primary.search_volume,
        primary.cpc.toFixed(2),
        `"${primary.competition_level}"`,
        data.secondary_keywords.length,
        data.total_volume
      ].join(','));
    }
    
    fs.writeFileSync(csvPath, csvLines.join('\n'));
    
    console.log(`\n💾 Results saved:`);
    console.log(`📊 Detailed: ${path.basename(resultsPath)}`);
    console.log(`📋 CSV: ${path.basename(csvPath)}`);
    
    return { resultsPath, csvPath };
  }

  generateSampleComponent(slug, data) {
    const tool = data.tool;
    const seo = data.seo_content;
    
    return `// Generated SEO-optimized component for ${tool.name}
import React from 'react';
import Head from 'next/head';
import ToolLogo from '../../components/ToolLogo';

export default function ${tool.name.replace(/[^a-zA-Z0-9]/g, '')}ReviewPage() {
  return (
    <>
      <Head>
        <title>${seo.meta_title}</title>
        <meta name="description" content="${seo.meta_description}" />
        <meta name="keywords" content="${data.primary_keyword.keyword}, ${data.secondary_keywords.map(k => k.keyword).slice(0, 3).join(', ')}" />
        <link rel="canonical" href="https://siteoptz.com/reviews/${slug}" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(${JSON.stringify(seo.schema_markup)}) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <main className="max-w-7xl mx-auto px-4 py-10">
          {/* Hero Section */}
          <section className="py-20">
            <div className="text-center mb-8">
              <ToolLogo toolName="${tool.name}" size="xl" />
              <h1 className="text-4xl font-bold text-white mt-6 mb-4">
                ${data.primary_keyword.keyword.charAt(0).toUpperCase() + data.primary_keyword.keyword.slice(1)}
              </h1>
            </div>
            
            <div className="prose prose-lg prose-invert max-w-none">
              ${seo.hero_section.split('\n').map(line => 
                line.startsWith('#') ? 
                  `<${line.startsWith('##') ? 'h2' : 'h1'} className="text-3xl font-bold text-white mb-6">${line.replace(/^#+\s/, '')}</${line.startsWith('##') ? 'h2' : 'h1'}>` :
                  line.trim() ? `<p className="text-gray-300 mb-4">${line}</p>` : ''
              ).join('\n')}
            </div>
          </section>

          {/* Main Content Sections */}
          ${seo.main_sections.map((section, index) => `
          <section className="py-16" id="section-${index}">
            <h2 className="text-3xl font-bold text-white mb-6">${section.heading.replace(/^#+\s/, '')}</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300">${section.content}</p>
            </div>
          </section>`).join('')}

          {/* FAQ Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              ${seo.faq_section.map((faq, index) => `
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">${faq.question}</h3>
                <p className="text-gray-300">${faq.answer}</p>
              </div>`).join('')}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}`;
  }

  async generateSampleComponents() {
    const componentsDir = path.join(CONFIG.output_dir, 'components');
    if (!fs.existsSync(componentsDir)) {
      fs.mkdirSync(componentsDir, { recursive: true });
    }
    
    console.log(`🔧 Generating sample components...`);
    
    for (const [slug, data] of Object.entries(this.results)) {
      const componentCode = this.generateSampleComponent(slug, data);
      const fileName = `${data.tool.name.replace(/[^a-zA-Z0-9]/g, '')}ReviewPage.tsx`;
      const filePath = path.join(componentsDir, fileName);
      
      fs.writeFileSync(filePath, componentCode);
      console.log(`   📄 Generated: ${fileName}`);
    }
    
    console.log(`✅ Sample components saved to: ${componentsDir}`);
  }

  printSampleSummary() {
    const totalTools = Object.keys(this.results).length;
    const totalVolume = Object.values(this.results).reduce((sum, data) => sum + data.total_volume, 0);
    const topTools = Object.values(this.results)
      .sort((a, b) => b.total_volume - a.total_volume)
      .slice(0, 5);

    console.log('\n' + '='.repeat(80));
    console.log('📊 SAMPLE SEO OPTIMIZATION RESULTS');
    console.log('='.repeat(80));
    console.log(`🔧 Tools processed: ${totalTools}`);
    console.log(`🎯 Total keyword volume: ${totalVolume.toLocaleString()} monthly searches`);
    console.log(`💰 API cost: $${this.totalCost.toFixed(2)}`);
    console.log(`📈 Average volume per tool: ${Math.round(totalVolume / totalTools).toLocaleString()}`);
    
    console.log('\n🏆 TOP 5 OPPORTUNITIES:');
    console.log('-'.repeat(60));
    topTools.forEach((data, index) => {
      console.log(`${index + 1}. ${data.tool.name.padEnd(15)} | ${data.total_volume.toString().padStart(6)} vol | "${data.primary_keyword.keyword}"`);
    });
    
    console.log('\n🚀 NEXT STEPS:');
    console.log('• Review sample components in seo-optimization/sample-output/components/');
    console.log('• Validate keyword data in CSV file');
    console.log('• Run full optimization with: node run-seo-optimization.js');
    console.log('• Test sample components before full deployment');
    
    console.log('='.repeat(80));
  }

  async run() {
    try {
      const results = await this.runSampleOptimization();
      const paths = await this.saveResults();
      await this.generateSampleComponents();
      this.printSampleSummary();
      return { results, paths };
    } catch (error) {
      console.error('❌ Sample optimization failed:', error.message);
      throw error;
    }
  }
}

// Run sample optimization
const optimizer = new SampleSEOOptimizer();
optimizer.run().catch(console.error);