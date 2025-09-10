const fs = require('fs');
const path = require('path');

// Priority review pages that need to be generated
const reviewPages = [
  { slug: 'planable', name: 'Planable', category: 'Social Media' },
  { slug: 'gpt-4', name: 'GPT-4', category: 'AI Automation' },
  { slug: 'midjourney-v6', name: 'Midjourney v6', category: 'Image Generation' },
  { slug: 'otter-ai', name: 'Otter.ai', category: 'Productivity' },
  { slug: 'gemini-2-5', name: 'Google Gemini 2.5', category: 'AI Automation' },
  { slug: 'character-ai', name: 'Character.AI', category: 'AI Automation' },
  { slug: 'hugging-face', name: 'Hugging Face', category: 'AI Automation' },
  { slug: 'replicate', name: 'Replicate', category: 'AI Automation' }
];

// High-priority comparison pages
const comparisonPages = [
  { tool1: 'chatgpt', tool2: 'perplexity-ai' },
  { tool1: 'jasper-ai', tool2: 'writesonic' },
  { tool1: 'midjourney', tool2: 'chatgpt' },
  { tool1: 'midjourney', tool2: 'dall-e' },
  { tool1: 'copy-ai', tool2: 'writesonic' },
  { tool1: 'loomly', tool2: 'socialpilot' },
  { tool1: 'loomly', tool2: 'buffer' },
  { tool1: 'loomly', tool2: 'hootsuite' },
  { tool1: 'contentstudio', tool2: 'buffer' },
  { tool1: 'contentstudio', tool2: 'hootsuite' }
];

// Generate review page template
function generateReviewPage(tool) {
  return `import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ToolLogo from '../components/ToolLogo';

export default function ${tool.name.replace(/[^a-zA-Z0-9]/g, '')}Review() {
  return (
    <>
      <Head>
        <title>${tool.name} Review: Features, Pricing & Alternatives | SiteOptz</title>
        <meta 
          name="description" 
          content="Comprehensive ${tool.name} review covering features, pricing, pros, cons, and alternatives. Get expert insights on this ${tool.category.toLowerCase()} tool."
        />
        <meta property="og:title" content="${tool.name} Review | SiteOptz" />
        <meta property="og:description" content="Expert review of ${tool.name} - features, pricing, pros & cons" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://siteoptz.ai/reviews/${tool.slug}" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-6">
              <ToolLogo toolName="${tool.name}" size="lg" className="mr-4" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  ${tool.name} Review
                </h1>
                <p className="text-gray-600">${tool.category} Tool</p>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
            <p className="text-gray-700 mb-6">
              ${tool.name} is a powerful ${tool.category.toLowerCase()} tool that helps businesses optimize their workflows 
              and improve productivity. This comprehensive review covers all the key features, pricing, and alternatives.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Intuitive user interface
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Advanced automation capabilities
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Integration with popular tools
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Real-time analytics and reporting
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Pricing</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Free Plan</div>
                    <div className="text-sm text-gray-600">Basic features included</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-gray-900">Pro Plan</div>
                    <div className="text-sm text-gray-600">Advanced features and priority support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-4">Pros</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">+</span>
                    Easy to use and set up
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">+</span>
                    Excellent customer support
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">+</span>
                    Regular updates and improvements
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-4">Cons</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">-</span>
                    Limited customization options
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">-</span>
                    Can be expensive for small teams
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Optimize Your ${tool.category}?</h3>
            <p className="mb-6 text-blue-100">
              Get expert guidance on implementing ${tool.name} and other ${tool.category.toLowerCase()} tools for your business.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Your Free AI Assessment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}`;
}

// Generate comparison page template  
function generateComparisonPage(tool1, tool2) {
  const title1 = tool1.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const title2 = tool2.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return `import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ToolLogo from '../../components/ToolLogo';

export default function ${title1.replace(/[^a-zA-Z0-9]/g, '')}Vs${title2.replace(/[^a-zA-Z0-9]/g, '')}Comparison() {
  return (
    <>
      <Head>
        <title>${title1} vs ${title2}: Complete Comparison | SiteOptz</title>
        <meta 
          name="description" 
          content="Compare ${title1} vs ${title2}. Feature-by-feature analysis, pricing comparison, and expert recommendations to help you choose the right tool."
        />
        <meta property="og:title" content="${title1} vs ${title2} Comparison | SiteOptz" />
        <meta property="og:description" content="Detailed comparison of ${title1} and ${title2} features, pricing, and capabilities" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://siteoptz.ai/compare/${tool1}-vs-${tool2}" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
              ${title1} vs ${title2}
            </h1>
            
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="text-center">
                <ToolLogo toolName="${title1}" size="xl" className="mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900">${title1}</h2>
              </div>
              
              <div className="text-2xl font-bold text-gray-400">VS</div>
              
              <div className="text-center">
                <ToolLogo toolName="${title2}" size="xl" className="mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900">${title2}</h2>
              </div>
            </div>
            
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              Comprehensive comparison of ${title1} and ${title2} to help you make the right choice for your business needs.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6 bg-gray-50 border-b">
              <h3 className="text-2xl font-bold text-gray-900">Feature Comparison</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ${title1}
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ${title2}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Ease of Use
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-green-500">★★★★☆</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-green-500">★★★★★</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Feature Set
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-green-500">★★★★★</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-green-500">★★★★☆</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Pricing
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-green-500">★★★☆☆</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-green-500">★★★★☆</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Support
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-green-500">★★★★☆</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-green-500">★★★★☆</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Verdict */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Verdict</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Choose ${title1} if:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    You need advanced features and customization
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    You have a larger budget for premium tools
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    You require enterprise-level capabilities
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Choose ${title2} if:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    You prioritize ease of use and quick setup
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    You&apos;re looking for better value for money
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    You need a solution that scales with growth
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
            <p className="mb-6 text-blue-100">
              Get personalized recommendations based on your specific business needs and requirements.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Schedule a Meeting With an AI Specialist
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}`;
}

// Generate pages
function generatePages() {
  console.log('Generating high-priority missing pages...\n');

  // Create review pages
  console.log('Creating review pages...');
  reviewPages.forEach(tool => {
    const filePath = path.join(__dirname, 'pages', 'reviews', `${tool.slug}.tsx`);
    const content = generateReviewPage(tool);
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✓ Created ${filePath}`);
  });

  // Create comparison pages
  console.log('\nCreating comparison pages...');
  comparisonPages.forEach(({ tool1, tool2 }) => {
    const filePath = path.join(__dirname, 'pages', 'compare', `${tool1}-vs-${tool2}.tsx`);
    const content = generateComparisonPage(tool1, tool2);
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✓ Created ${filePath}`);
  });

  console.log(`\n✅ Generated ${reviewPages.length} review pages`);
  console.log(`✅ Generated ${comparisonPages.length} comparison pages`);
  console.log(`📊 Total pages created: ${reviewPages.length + comparisonPages.length}`);
}

generatePages();