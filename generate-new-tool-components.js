#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting component generation for new AI tools...\n');

function toPascalCase(str) {
  return str.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
}

function generateProductionComponent(tool) {
  const className = `${toPascalCase(tool.slug)}ReviewPage`;
  
  return `import React from 'react';
import Head from 'next/head';

interface ${className}Props {}

const ${className}: React.FC<${className}Props> = () => {
  return (
    <>
      <Head>
        <title>${tool.meta?.title || `${tool.name} Review [2025] | SiteOptz`}</title>
        <meta 
          name="description" 
          content="${tool.meta?.description || `${tool.name} review. ${tool.overview?.description?.substring(0, 140)}... Features, pricing & alternatives.`}" 
        />
        <meta property="og:title" content="${tool.meta?.title || `${tool.name} Review [2025] | SiteOptz`}" />
        <meta property="og:description" content="${tool.meta?.description || `${tool.name} review and alternatives comparison.`}" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={\`https://siteoptz.ai/reviews/${tool.slug}\`} />
        
        {/* Schema markup for review */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Review",
              "itemReviewed": {
                "@type": "SoftwareApplication",
                "name": "${tool.name}",
                "applicationCategory": "${tool.overview?.category || 'AI Software'}",
                "operatingSystem": "Web",
                "description": "${(tool.overview?.description || '').replace(/"/g, '\\"')}"
              },
              "author": {
                "@type": "Organization",
                "name": "SiteOptz"
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": ${tool.rating || 4.5},
                "bestRating": 5,
                "worstRating": 1
              },
              "datePublished": "2025-09-02"
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <div className="relative py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              ${tool.name} Review: ${tool.overview?.category || 'AI Tool'} Analysis [2025]
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              ${tool.overview?.description || `Comprehensive review of ${tool.name}, covering features, pricing, pros & cons.`}
            </p>
            
            {/* Quick Overview */}
            <div className="bg-gray-900 rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Overview</h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Navigation</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li><a href="#features" className="hover:text-blue-400 transition-colors">→ Key Features</a></li>
                    <li><a href="#pricing" className="hover:text-blue-400 transition-colors">→ Pricing Plans</a></li>
                    <li><a href="#use-cases" className="hover:text-blue-400 transition-colors">→ Use Cases</a></li>
                    <li><a href="#pros-cons" className="hover:text-blue-400 transition-colors">→ Pros & Cons</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Key Info</h3>
                  <div className="space-y-2 text-gray-300">
                    <p><strong>Category:</strong> ${tool.overview?.category || 'AI Tool'}</p>
                    <p><strong>Developer:</strong> ${tool.overview?.developer || tool.name}</p>
                    <p><strong>Rating:</strong> ${tool.rating || 4.5}/5 (${tool.review_count || 150} reviews)</p>
                    <p><strong>Website:</strong> <a href="${tool.overview?.website || '#'}" className="text-blue-400 hover:text-blue-300">${tool.overview?.website || 'Official Site'}</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="mb-16" id="features">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            ${tool.name} Key Features & Capabilities
          </h2>
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              ${(tool.features || []).map((feature, index) => `
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  ${feature}
                </h3>
                <p className="text-gray-300">
                  Advanced ${feature.toLowerCase()} capabilities designed for professional use.
                </p>
              </div>`).join('')}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-16" id="pricing">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            ${tool.name} Pricing Plans
          </h2>
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-${(tool.pricing || []).length} gap-8">
              ${(tool.pricing || []).map(plan => `
              <div className="bg-gray-900 rounded-xl p-8 border-2 border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4">${plan.plan}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-blue-400">
                    ${typeof plan.price_per_month === 'number' ? '$' + plan.price_per_month : plan.price_per_month}
                  </span>
                  ${typeof plan.price_per_month === 'number' ? '<span className="text-gray-400">/month</span>' : ''}
                </div>
                <ul className="space-y-3 text-gray-300">
                  ${(plan.features || []).map(feature => `
                  <li className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    ${feature}
                  </li>`).join('')}
                </ul>
              </div>`).join('')}
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mb-16" id="use-cases">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            ${tool.name} Use Cases & Applications
          </h2>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gray-900 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Primary Use Cases</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• ${tool.overview?.category || 'AI'} automation and optimization</li>
                    <li>• Professional workflow enhancement</li>
                    <li>• Content creation and management</li>
                    <li>• Business process automation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Target Users</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• Marketing professionals</li>
                    <li>• Content creators</li>
                    <li>• Business owners</li>
                    <li>• Agencies and teams</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pros & Cons Section */}
        <div className="mb-16" id="pros-cons">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            ${tool.name} Pros & Cons
          </h2>
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-900/20 rounded-xl p-8 border border-green-500/30">
                <h3 className="text-xl font-semibold text-green-400 mb-6">✅ Pros</h3>
                <ul className="space-y-3 text-gray-300">
                  ${(tool.pros || []).map(pro => `<li>• ${pro}</li>`).join('')}
                </ul>
              </div>
              <div className="bg-red-900/20 rounded-xl p-8 border border-red-500/30">
                <h3 className="text-xl font-semibold text-red-400 mb-6">❌ Cons</h3>
                <ul className="space-y-3 text-gray-300">
                  ${(tool.cons || []).map(con => `<li>• ${con}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Benchmarks */}
        ${tool.benchmarks ? `
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            ${tool.name} Performance Benchmarks
          </h2>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gray-900 rounded-xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                ${Object.entries(tool.benchmarks).map(([metric, score]) => `
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">${score}/10</div>
                  <div className="text-gray-300 capitalize">${metric.replace('_', ' ')}</div>
                </div>`).join('')}
              </div>
            </div>
          </div>
        </div>` : ''}

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  What is ${tool.name} best used for?
                </h3>
                <p className="text-gray-300">
                  ${tool.name} is primarily designed for ${tool.overview?.category?.toLowerCase() || 'AI-powered'} tasks, offering ${(tool.features || []).slice(0, 2).join(' and ').toLowerCase()} capabilities.
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  How much does ${tool.name} cost?
                </h3>
                <p className="text-gray-300">
                  ${tool.name} offers ${(tool.pricing || []).length} pricing plans starting from ${(tool.pricing || [])[0]?.price_per_month === 0 ? 'free' : '$' + (tool.pricing || [])[0]?.price_per_month + '/month'}.
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  Is ${tool.name} suitable for beginners?
                </h3>
                <p className="text-gray-300">
                  ${tool.name} is designed with user-friendliness in mind, making it accessible for both beginners and advanced users in the ${tool.overview?.category?.toLowerCase() || 'AI'} space.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Try ${tool.name}?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            ${tool.overview?.description?.split('.')[0] || `Experience the power of ${tool.name} for your ${tool.overview?.category?.toLowerCase() || 'AI'} needs`}.
          </p>
          <a 
            href="${tool.overview?.website || '#'}"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
          >
            Visit ${tool.name} →
          </a>
        </div>
      </div>
    </>
  );
};

export default ${className};`;
}

// Load all tools and find which ones need components
const dataPath = path.join(__dirname, 'public/data/aiToolsData.json');
const allTools = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const outputDir = path.join(__dirname, 'seo-optimization', 'production-components');
const existingComponents = new Set();

// Get existing component files
if (fs.existsSync(outputDir)) {
  fs.readdirSync(outputDir).forEach(file => {
    if (file.endsWith('.tsx')) {
      existingComponents.add(file);
    }
  });
}

// Find tools that don't have components
const toolsNeedingComponents = allTools.filter(tool => {
  const expectedFileName = `${toPascalCase(tool.slug)}ReviewPage.tsx`;
  return !existingComponents.has(expectedFileName);
});

console.log(`📊 Analysis:`);
console.log(`   Total tools: ${allTools.length}`);
console.log(`   Existing components: ${existingComponents.size}`);
console.log(`   Tools needing components: ${toolsNeedingComponents.length}\n`);

let successCount = 0;
let errorCount = 0;

// Generate components for tools that need them
toolsNeedingComponents.forEach((tool, index) => {
  try {
    const fileName = `${toPascalCase(tool.slug)}ReviewPage.tsx`;
    const componentCode = generateProductionComponent(tool);
    const filePath = path.join(outputDir, fileName);
    
    fs.writeFileSync(filePath, componentCode);
    successCount++;
    
    // Show progress every 50 components
    if ((index + 1) % 50 === 0 || index === toolsNeedingComponents.length - 1) {
      const progress = Math.round((index + 1) / toolsNeedingComponents.length * 100);
      console.log(`📄 Progress: ${index + 1}/${toolsNeedingComponents.length} (${progress}%)`);
    }
  } catch (error) {
    errorCount++;
    console.log(`❌ Error generating ${tool.name}: ${error.message}`);
  }
});

console.log(`\n🎉 Generation Summary:`);
console.log(`   ✅ Successfully generated: ${successCount} components`);
console.log(`   ❌ Errors: ${errorCount}`);
console.log(`   📁 Total components now: ${existingComponents.size + successCount}`);
console.log(`   📂 Components saved to: ${outputDir}\n`);

if (successCount > 0) {
  console.log(`🚀 Next steps:`);
  console.log(`   1. Build and test: npm run build`);
  console.log(`   2. Commit changes: git add . && git commit -m "Generate production components for ${successCount} new AI tools"`);
  console.log(`   3. Deploy to production`);
}