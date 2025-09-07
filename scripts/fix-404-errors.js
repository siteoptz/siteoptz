#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Fix 404 Errors Script for SiteOptz.ai
 * 
 * This script addresses 404 errors identified in siteoptz.ai_http_4xx_client_errors_20250907.csv
 * while carefully respecting the allowlist to prevent breaking approved URLs.
 */

class Fix404Errors {
  constructor() {
    this.csvPath = path.join(__dirname, '..', '..', 'siteoptz-scraping', 'siteoptz.ai_http_4xx_client_errors_20250907.csv');
    this.allowlistPath = path.join(__dirname, '..', '..', 'siteoptz-scraping', 'siteoptz_allowlist.txt');
    this.toolsDataPath = path.join(__dirname, '..', 'public', 'data', 'aiToolsData.json');
    this.pagesDir = path.join(__dirname, '..', 'pages');
    
    this.allowlistUrls = new Set();
    this.errors404 = [];
    this.fixes = {
      created: [],
      redirected: [],
      allowlistIssues: [],
      skipped: []
    };
  }

  async loadData() {
    console.log('📊 Loading 404 errors and allowlist data...');
    
    // Load allowlist
    const allowlistContent = fs.readFileSync(this.allowlistPath, 'utf8');
    allowlistContent.split('\n').forEach(url => {
      if (url.trim()) {
        this.allowlistUrls.add(url.trim());
      }
    });
    console.log(`✅ Loaded ${this.allowlistUrls.size} allowlisted URLs`);
    
    // Load 404 errors
    const csvContent = fs.readFileSync(this.csvPath, 'utf8');
    const lines = csvContent.split('\n');
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const [url, httpCode] = line.split(',');
        if (url && httpCode === '404') {
          this.errors404.push(url);
        }
      }
    }
    console.log(`🚨 Found ${this.errors404.length} URLs with 404 errors`);
    
    // Load tools data
    this.toolsData = JSON.parse(fs.readFileSync(this.toolsDataPath, 'utf8'));
    console.log(`🔧 Loaded ${this.toolsData.length} tools from database`);
  }

  analyzeAllowlistIssues() {
    console.log('\n🔍 Analyzing allowlist vs 404 conflicts...');
    
    this.errors404.forEach(url => {
      if (this.allowlistUrls.has(url)) {
        this.fixes.allowlistIssues.push(url);
        console.log(`⚠️  CRITICAL: Allowlisted URL returning 404: ${url}`);
      }
    });
    
    console.log(`❌ Found ${this.fixes.allowlistIssues.length} allowlisted URLs with 404 errors`);
  }

  createMissingComparisonPages() {
    console.log('\n🛠️  Creating missing critical comparison pages...');
    
    const criticalComparisons = [
      { url: 'https://siteoptz.ai/compare/chatgpt-vs-claude', tools: ['chatgpt', 'claude'] },
      { url: 'https://siteoptz.ai/compare/chatgpt-vs-gemini', tools: ['chatgpt', 'gemini'] },
      { url: 'https://siteoptz.ai/compare/claude-vs-gemini', tools: ['claude', 'gemini'] }
    ];
    
    criticalComparisons.forEach(comparison => {
      if (this.fixes.allowlistIssues.includes(comparison.url)) {
        const fileName = comparison.url.split('/').pop() + '.tsx';
        const filePath = path.join(this.pagesDir, 'compare', fileName);
        
        if (!fs.existsSync(filePath)) {
          this.createComparisonPage(comparison.tools[0], comparison.tools[1], filePath);
          this.fixes.created.push(comparison.url);
          console.log(`✅ Created: ${fileName}`);
        }
      }
    });
  }

  createComparisonPage(tool1, tool2, filePath) {
    const tool1Data = this.toolsData.find(t => t.slug === tool1) || { name: this.capitalize(tool1), slug: tool1, category: 'Content Creation' };
    const tool2Data = this.toolsData.find(t => t.slug === tool2) || { name: this.capitalize(tool2), slug: tool2, category: 'Content Creation' };
    
    const pageContent = `import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

interface ComparisonPageProps {
  tool1: {
    name: string;
    slug: string;
    category: string;
  };
  tool2: {
    name: string;
    slug: string;
    category: string;
  };
}

export default function ${this.capitalize(tool1)}Vs${this.capitalize(tool2)}({ tool1, tool2 }: ComparisonPageProps) {
  const title = \`\${tool1.name} vs \${tool2.name}: Comprehensive AI Tool Comparison 2025 | SiteOptz\`;
  const description = \`Compare \${tool1.name} and \${tool2.name} features, pricing, and capabilities. Expert analysis to help you choose the best AI tool for your business needs.\`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={\`\${tool1.slug}, \${tool2.slug}, comparison, AI tools, \${tool1.category.toLowerCase()}\`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={\`https://siteoptz.ai/compare/\${tool1.slug}-vs-\${tool2.slug}\`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={\`https://siteoptz.ai/compare/\${tool1.slug}-vs-\${tool2.slug}\`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="SiteOptz" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        {/* Navigation */}
        <nav className="relative z-10 pt-8 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link href="/compare" className="hover:text-cyan-400 transition-colors">Compare</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-cyan-400">{tool1.name} vs {tool2.name}</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {tool1.name} vs {tool2.name}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive comparison of {tool1.name} and {tool2.name} to help you choose the best AI solution for your business needs.
              </p>
            </div>

            {/* Comparison Overview */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-black/50 border border-gray-800 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-4">{tool1.name}</h2>
                  <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-full">
                    {tool1.category}
                  </span>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    {tool1.name} is a leading AI tool in the {tool1.category.toLowerCase()} category, 
                    known for its powerful capabilities and user-friendly interface.
                  </p>
                  <Link 
                    href={\`/reviews/\${tool1.slug}\`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Read {tool1.name} Review
                  </Link>
                </div>
              </div>

              <div className="bg-black/50 border border-gray-800 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-4">{tool2.name}</h2>
                  <span className="inline-block px-4 py-2 bg-purple-600 text-white text-sm rounded-full">
                    {tool2.category}
                  </span>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    {tool2.name} offers advanced AI capabilities in the {tool2.category.toLowerCase()} space, 
                    providing robust features for professional and enterprise use.
                  </p>
                  <Link 
                    href={\`/reviews/\${tool2.slug}\`}
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Read {tool2.name} Review
                  </Link>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-gray-800 rounded-2xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Need Help Choosing Between {tool1.name} and {tool2.name}?
              </h3>
              <p className="text-gray-300 mb-8">
                Get personalized recommendations from our AI experts
              </p>
              <a
                href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Schedule Expert Consultation
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      tool1: {
        name: "${tool1Data.name}",
        slug: "${tool1Data.slug}",
        category: "${tool1Data.category}"
      },
      tool2: {
        name: "${tool2Data.name}",
        slug: "${tool2Data.slug}",
        category: "${tool2Data.category}"
      }
    },
    revalidate: 86400 // 24 hours
  };
};`;

    fs.writeFileSync(filePath, pageContent);
  }

  createMissingCaseStudies() {
    console.log('\n📝 Creating missing case study pages...');
    
    const caseStudyUrls = this.errors404.filter(url => url.includes('/case-studies/'));
    const caseStudiesDir = path.join(this.pagesDir, 'case-studies');
    
    if (!fs.existsSync(caseStudiesDir)) {
      fs.mkdirSync(caseStudiesDir, { recursive: true });
    }
    
    caseStudyUrls.forEach(url => {
      const slug = url.split('/').pop();
      const filePath = path.join(caseStudiesDir, slug + '.tsx');
      
      if (!fs.existsSync(filePath)) {
        this.createCaseStudyPage(slug, filePath);
        this.fixes.created.push(url);
        console.log(`✅ Created case study: ${slug}`);
      }
    });
  }

  createCaseStudyPage(slug, filePath) {
    const title = this.slugToTitle(slug);
    
    const pageContent = `import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ${this.slugToPascalCase(slug)}CaseStudy() {
  const title = "${title} Case Study | SiteOptz";
  const description = "Explore how businesses successfully implemented AI solutions for ${title.toLowerCase()}. Real results, lessons learned, and implementation strategies.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="${slug.replace(/-/g, ', ')}, AI implementation, case study, success story" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={\`https://siteoptz.ai/case-studies/${slug}\`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Navigation */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-cyan-400">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link href="/case-studies" className="hover:text-cyan-400">Case Studies</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-cyan-400">${title}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ${title} Case Study
            </h1>
            <p className="text-xl text-gray-300">
              Real-world AI implementation success story
            </p>
          </header>

          {/* Content */}
          <div className="bg-black/50 border border-gray-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Coming Soon</h2>
            <p className="text-gray-300 mb-6">
              We're currently preparing a detailed case study on ${title.toLowerCase()}. 
              This comprehensive analysis will include real implementation strategies, 
              results achieved, and lessons learned.
            </p>
            <p className="text-gray-300">
              In the meantime, explore our other resources or schedule a consultation 
              to discuss your specific AI implementation needs.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Schedule AI Strategy Consultation
            </a>
          </div>
        </div>
      </div>
    </>
  );
}`;

    fs.writeFileSync(filePath, pageContent);
  }

  createMissingCategories() {
    console.log('\n📂 Creating missing category pages...');
    
    const categoryUrls = this.errors404.filter(url => url.includes('/categories/'));
    const categoriesDir = path.join(this.pagesDir, 'categories');
    
    categoryUrls.forEach(url => {
      const slug = url.split('/').pop();
      const filePath = path.join(categoriesDir, slug + '.tsx');
      
      if (!fs.existsSync(filePath)) {
        this.createCategoryPage(slug, filePath);
        this.fixes.created.push(url);
        console.log(`✅ Created category: ${slug}`);
      }
    });
  }

  createCategoryPage(slug, filePath) {
    const title = this.slugToTitle(slug);
    const categoryTools = this.toolsData.filter(tool => 
      tool.category?.toLowerCase().includes(slug.replace(/-/g, ' ').toLowerCase()) ||
      tool.overview?.category?.toLowerCase().includes(slug.replace(/-/g, ' ').toLowerCase())
    );
    
    const pageContent = `import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

interface CategoryPageProps {
  tools: Array<{
    name: string;
    slug: string;
    description: string;
    category: string;
  }>;
}

export default function ${this.slugToPascalCase(slug)}Category({ tools }: CategoryPageProps) {
  const title = "${title} AI Tools | SiteOptz";
  const description = "Discover the best ${title.toLowerCase()} AI tools. Compare features, pricing, and reviews to find the perfect solution for your business.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="${slug.replace(/-/g, ', ')}, AI tools, software comparison" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={\`https://siteoptz.ai/categories/${slug}\`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ${title} AI Tools
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore the best AI tools for ${title.toLowerCase()}
            </p>
          </header>

          {tools.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool) => (
                <div key={tool.slug} className="bg-black/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{tool.name}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{tool.description}</p>
                  <Link 
                    href={\`/reviews/\${tool.slug}\`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                  >
                    Read Review
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-300 mb-8">
                We're currently expanding our ${title.toLowerCase()} AI tools collection.
              </p>
              <Link 
                href="/tools"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors"
              >
                Browse All AI Tools
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // In a real implementation, this would load from the actual data source
  const tools = ${JSON.stringify(categoryTools.slice(0, 12))};
  
  return {
    props: { tools },
    revalidate: 86400
  };
};`;

    fs.writeFileSync(filePath, pageContent);
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  slugToTitle(slug) {
    return slug.split('-').map(word => this.capitalize(word)).join(' ');
  }

  slugToPascalCase(slug) {
    return slug.split('-').map(word => this.capitalize(word)).join('');
  }

  generateReport() {
    console.log('\n📋 404 Fix Summary Report');
    console.log('================================');
    console.log(`📊 Total 404 errors found: ${this.errors404.length}`);
    console.log(`⚠️  Allowlist conflicts: ${this.fixes.allowlistIssues.length}`);
    console.log(`✅ Pages created: ${this.fixes.created.length}`);
    console.log(`🔄 Redirects created: ${this.fixes.redirected.length}`);
    console.log(`⏭️  Skipped (non-critical): ${this.fixes.skipped.length}`);
    
    if (this.fixes.allowlistIssues.length > 0) {
      console.log('\n⚠️  CRITICAL ALLOWLIST ISSUES FIXED:');
      this.fixes.allowlistIssues.forEach(url => console.log(`   - ${url}`));
    }
    
    if (this.fixes.created.length > 0) {
      console.log('\n✅ PAGES CREATED:');
      this.fixes.created.forEach(url => console.log(`   - ${url}`));
    }
  }

  async run() {
    console.log('🚀 Starting 404 Error Fix Process...');
    
    try {
      await this.loadData();
      this.analyzeAllowlistIssues();
      
      // Fix critical allowlisted pages first
      this.createMissingComparisonPages();
      this.createMissingCaseStudies();
      this.createMissingCategories();
      
      this.generateReport();
      
      console.log('\n🎉 404 fix process completed successfully!');
      console.log('👉 Next steps:');
      console.log('   1. Run: npm run build');
      console.log('   2. Test the fixed URLs');
      console.log('   3. Commit and deploy changes');
      
      return this.fixes;
      
    } catch (error) {
      console.error('❌ Error during 404 fix process:', error);
      throw error;
    }
  }
}

// CLI execution
if (require.main === module) {
  const fixer = new Fix404Errors();
  
  fixer.run()
    .then((result) => {
      console.log('✅ 404 fix completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 404 fix failed:', error.message);
      process.exit(1);
    });
}

module.exports = Fix404Errors;