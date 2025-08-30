#!/usr/bin/env node

/**
 * React Component Generator for SEO-Optimized Review Pages
 * 
 * This script generates optimized React components for each review page
 * using the keyword research and content data from the optimizer.
 */

import fs from 'fs';
import path from 'path';

class ReactComponentGenerator {
  constructor(contentDataPath) {
    this.contentData = this.loadContentData(contentDataPath);
    this.outputDir = path.join(process.cwd(), 'seo-optimization', 'components');
    this.ensureDirectories();
  }

  loadContentData(filePath) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return data.content_results || {};
    } catch (error) {
      console.error('❌ Failed to load content data:', error.message);
      throw error;
    }
  }

  ensureDirectories() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  generateReviewPageComponent(slug, data) {
    const tool = data.tool_info;
    const seoContent = data.seo_content;
    const primary = data.primary_keyword;
    
    const componentName = this.toPascalCase(slug) + 'ReviewPage';
    
    return `import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import ToolLogo from '../../components/ToolLogo';
import FAQSection from '../../components/comparison/FAQSection';

interface ${componentName}Props {
  tool: any;
}

export default function ${componentName}({ tool }: ${componentName}Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing' | 'pros-cons'>('overview');

  const schemaData = ${JSON.stringify(seoContent.schema_markup, null, 4)};

  const faqSchemaData = ${JSON.stringify(seoContent.content.faq_section.schema, null, 4)};

  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>${seoContent.seo_meta.title}</title>
        <meta name="description" content="${seoContent.seo_meta.description}" />
        <meta name="keywords" content="${seoContent.seo_meta.keywords}" />
        <meta name="author" content="SiteOptz" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Open Graph */}
        <meta property="og:title" content="${seoContent.seo_meta.title}" />
        <meta property="og:description" content="${seoContent.seo_meta.description}" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://siteoptz.com/reviews/${slug}" />
        <meta property="og:site_name" content="SiteOptz" />
        <meta property="og:image" content="${seoContent.images.hero_image.src}" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${seoContent.seo_meta.title}" />
        <meta name="twitter:description" content="${seoContent.seo_meta.description}" />
        <meta name="twitter:image" content="${seoContent.images.hero_image.src}" />
        
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
        />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://siteoptz.com/reviews/${slug}" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        {/* Hero Section - SEO Optimized */}
        <section className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                <li><span className="mx-2">/</span></li>
                <li><Link href="${seoContent.content.internal_links.category_page}" className="hover:text-cyan-400 transition-colors">${tool.category}</Link></li>
                <li><span className="mx-2">/</span></li>
                <li><Link href="/reviews" className="hover:text-cyan-400 transition-colors">Reviews</Link></li>
                <li><span className="mx-2">/</span></li>
                <li className="text-cyan-400" aria-current="page">${tool.name} Review</li>
              </ol>
            </nav>

            <div className="flex flex-col lg:flex-row items-center">
              {/* Hero Content */}
              <div className="lg:w-2/3 lg:pr-12 mb-8 lg:mb-0">
                <div className="flex items-center mb-6">
                  <div className="mr-6">
                    <ToolLogo 
                      toolName="${tool.name}"
                      logoUrl="${seoContent.images.hero_image.src}"
                      size="xl"
                    />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      ${primary.keyword.charAt(0).toUpperCase() + primary.keyword.slice(1)}
                    </h1>
                    {tool.rating && (
                      <div className="flex items-center mb-4">
                        <div className="flex items-center mr-3">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={\`w-5 h-5 \${i < Math.floor(tool.rating) ? 'text-yellow-400' : 'text-gray-300'}\`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-blue-100 text-sm">
                          {tool.rating}/5 (Expert Review)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* SEO-Optimized Hero Text */}
                <div className="prose prose-lg prose-invert max-w-none mb-8">
                  <div className="text-xl text-blue-100 leading-relaxed">
                    ${this.formatHeroContent(seoContent.content.hero_section)}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-bold py-3 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                  >
                    Try ${tool.name} Free
                  </a>
                  <Link
                    href="${seoContent.content.internal_links.comparison_pages[0]}"
                    className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-3 px-8 rounded-lg transition-all duration-200 text-center"
                  >
                    Compare Alternatives
                  </Link>
                </div>
              </div>

              {/* Quick Stats Sidebar */}
              <div className="lg:w-1/3">
                <div className="bg-black border border-gray-800 backdrop-blur-md rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Quick Overview</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <Link href="${seoContent.content.internal_links.category_page}" className="text-cyan-400 hover:underline">
                        ${tool.category}
                      </Link>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Best For:</span>
                      <span className="text-white font-semibold">${tool.category} Teams</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Starting Price:</span>
                      <span className="text-white font-semibold">See Pricing</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Free Trial:</span>
                      <span className="text-white font-semibold">Available</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">Quick Links</h3>
                    <div className="space-y-2">
                      <Link href="#features" className="block text-cyan-400 hover:underline text-sm">
                        → Features Overview
                      </Link>
                      <Link href="#pricing" className="block text-cyan-400 hover:underline text-sm">
                        → Pricing Details
                      </Link>
                      <Link href="#alternatives" className="block text-cyan-400 hover:underline text-sm">
                        → Compare Alternatives
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-black border-b border-gray-800 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'features', label: 'Features' },
                { key: 'pricing', label: 'Pricing' },
                { key: 'pros-cons', label: 'Pros & Cons' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={\`py-4 px-2 border-b-2 font-medium text-sm transition-colors \${
                    activeTab === tab.key
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                  }\`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* Main Content Sections */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* SEO-Optimized Content Sections */}
            ${this.generateContentSectionsJSX(seoContent.content.main_sections)}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 relative z-10" id="faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">${seoContent.content.faq_section.title.replace('##', '')}</h2>
              <p className="text-lg text-gray-300">Common questions about ${tool.name}</p>
            </div>
            
            <FAQSection faqs={${JSON.stringify(seoContent.content.faq_section.faqs)}} />
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-16 relative z-10 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Explore Related ${tool.category} Tools</h2>
              <p className="text-lg text-gray-300">Compare ${tool.name} with other leading solutions</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="${seoContent.content.internal_links.category_page}" className="group">
                <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400">
                    All ${tool.category} Tools
                  </h3>
                  <p className="text-gray-300">Browse our complete directory of ${tool.category} solutions</p>
                </div>
              </Link>
              
              <Link href="${seoContent.content.internal_links.comparison_pages[0]}" className="group">
                <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400">
                    Compare with ChatGPT
                  </h3>
                  <p className="text-gray-300">Side-by-side comparison of features and pricing</p>
                </div>
              </Link>
              
              <Link href="${seoContent.content.internal_links.pricing_calculator}" className="group">
                <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400">
                    Pricing Calculator
                  </h3>
                  <p className="text-gray-300">Find the most cost-effective solution for your needs</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 bg-black border border-gray-800 rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Try ${tool.name}?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get started with ${tool.name} today and see why it's trusted by ${tool.category} professionals.
            </p>
            <div className="flex justify-center">
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      tool: {
        name: "${tool.name}",
        category: "${tool.category}",
        description: "${tool.description}",
        website: "${tool.website}",
        rating: 4.5
      }
    },
    revalidate: 86400 // 24 hours
  };
}`;
  }

  formatHeroContent(content) {
    return content
      .replace(/\n\n/g, '</p><p className="mb-4">')
      .replace(/^# /, '')
      .replace(/\n/g, ' ');
  }

  generateContentSectionsJSX(sections) {
    return sections.map((section, index) => `
            <div className="mb-16" id="section-${index}">
              <${section.heading.startsWith('##') ? 'h2' : 'h3'} className="text-3xl font-bold text-white mb-6">
                ${section.heading.replace(/^#+\s/, '')}
              </${section.heading.startsWith('##') ? 'h2' : 'h3'}>
              <div className="prose prose-lg prose-invert max-w-none">
                ${this.formatContentToJSX(section.content)}
              </div>
            </div>`).join('');
  }

  formatContentToJSX(content) {
    return content
      .replace(/###\s+(.+)/g, '<h3 className="text-xl font-semibold text-cyan-400 mb-4">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong className="text-white">$1</strong>')
      .replace(/- (.+)/g, '<li className="text-gray-300 mb-2">$1</li>')
      .replace(/\n\n/g, '</p><p className="text-gray-300 mb-4">');
  }

  toPascalCase(str) {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  async generateAllComponents() {
    console.log(`🔧 Generating React components for ${Object.keys(this.contentData).length} tools...`);
    
    const generatedComponents = [];
    
    for (const [slug, data] of Object.entries(this.contentData)) {
      try {
        console.log(`📄 Generating: ${data.tool_info.name}`);
        
        const componentCode = this.generateReviewPageComponent(slug, data);
        const fileName = `${this.toPascalCase(slug)}ReviewPage.tsx`;
        const filePath = path.join(this.outputDir, fileName);
        
        fs.writeFileSync(filePath, componentCode);
        
        generatedComponents.push({
          slug,
          tool_name: data.tool_info.name,
          component_name: this.toPascalCase(slug) + 'ReviewPage',
          file_path: fileName,
          primary_keyword: data.primary_keyword.keyword,
          generated_at: new Date().toISOString()
        });
        
        console.log(`   ✅ Saved: ${fileName}`);
      } catch (error) {
        console.error(`   ❌ Failed for ${slug}:`, error.message);
      }
    }
    
    // Save generation summary
    const summaryPath = path.join(this.outputDir, 'generation-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify({
      generated_at: new Date().toISOString(),
      total_components: generatedComponents.length,
      components: generatedComponents
    }, null, 2));
    
    console.log(`\n✅ Generated ${generatedComponents.length} React components`);
    console.log(`📂 Components saved to: ${this.outputDir}`);
    
    return generatedComponents;
  }
}

export default ReactComponentGenerator;

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const contentDataPath = process.argv[2];
  if (!contentDataPath) {
    console.error('❌ Please provide content data file path');
    console.log('Usage: node react-component-generator.js <content-data.json>');
    process.exit(1);
  }
  
  const generator = new ReactComponentGenerator(contentDataPath);
  generator.generateAllComponents().catch(console.error);
}