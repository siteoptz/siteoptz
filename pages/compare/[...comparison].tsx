import React from 'react';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import SEOHead from '../../components/SEOHead';
import { generateComparisonMeta, generateFAQSchema, generateBreadcrumbSchema, buildCanonicalUrl } from '../../seo/meta-config.js';
// Data will be fetched at build time from public/data/

interface ComparisonPageProps {
  tool1: any;
  tool2: any;
  faqs1: any[];
  faqs2: any[];
}

const ComparisonPage: React.FC<ComparisonPageProps> = ({ tool1, tool2, faqs1, faqs2 }) => {
  if (!tool1 || !tool2) return <div>Tools not found</div>;

  // Generate SEO metadata using our configuration system
  const comparisonMeta = generateComparisonMeta(tool1, tool2);
  const combinedFaqs = [...(faqs1 || []).slice(0, 3), ...(faqs2 || []).slice(0, 3)];
  const faqSchema = generateFAQSchema(combinedFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'AI Tools', url: buildCanonicalUrl('/tools') },
    { name: 'Compare', url: buildCanonicalUrl('/compare') },
    { name: `${tool1.name} vs ${tool2.name}`, url: buildCanonicalUrl(`/compare/${tool1.slug}/vs/${tool2.slug}`) }
  ]);
  
  // Combine all schemas
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      faqSchema,
      breadcrumbSchema,
      {
        "@type": "WebPage",
        "name": comparisonMeta?.title,
        "description": comparisonMeta?.description,
        "url": buildCanonicalUrl(`/compare/${tool1.slug}/vs/${tool2.slug}`)
      }
    ].filter(Boolean)
  };

  return (
    <>
      <SEOHead
        title={comparisonMeta?.title || `${tool1.name} vs ${tool2.name}: Complete Comparison [2025] | SiteOptz`}
        description={comparisonMeta?.description || `Compare ${tool1.name} and ${tool2.name} features, pricing, pros and cons. Expert analysis with benchmarks to help you choose the right AI tool for your needs.`}
        canonicalUrl={buildCanonicalUrl(`/compare/${tool1.slug}/vs/${tool2.slug}`)}
        ogImage={`/images/comparisons/${tool1.slug}-vs-${tool2.slug}.png`}
        schemaData={combinedSchema}
        keywords={comparisonMeta?.keywords || [`${tool1.name} vs ${tool2.name}`, `${tool1.name} comparison`, `${tool2.name} comparison`, 'AI tool comparison']}
      />
      
      <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-cyan-400">Home</Link>
          <span className="mx-2 text-gray-600">/</span>
          <Link href="/tools" className="hover:text-cyan-400">AI Tools</Link>
          <span className="mx-2 text-gray-600">/</span>
          <Link href="/compare" className="hover:text-cyan-400">Compare</Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-white">{tool1.name} vs {tool2.name}</span>
        </nav>

        {/* Hero Section with SEO-optimized H1 */}
        <div className="bg-black border border-gray-800 rounded-lg shadow-2xl p-8 mb-8">
          <div className="text-center mb-8">
            {/* H1 with primary keywords naturally integrated */}
            <h1 className="text-4xl font-bold text-white mb-4">
              {tool1.name} vs {tool2.name}: Complete Comparison Guide [2025]
            </h1>
            {/* First paragraph with keywords naturally integrated */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Choosing between {tool1.name} and {tool2.name}? Our comprehensive comparison analyzes 
              features, pricing, performance benchmarks, and user reviews to help you make the right 
              decision for your AI tool needs in 2025.
            </p>
          </div>

          {/* Tool Comparison Header */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <img src={tool1.logo} alt={`${tool1.name} logo`} className="w-16 h-16 mx-auto mb-4 rounded-lg" />
              <h2 className="text-2xl font-bold text-white mb-2">{tool1.name}</h2>
              <p className="text-gray-300">{tool1.overview?.description || tool1.description || ''}</p>
              <div className="mt-4">
                <span className="text-2xl font-bold text-cyan-400">
                  {tool1.pricing?.[0]?.price_per_month === 'Custom' ? 'Custom' :
                   tool1.pricing?.[0]?.price_per_month === 0 ? 'Free' :
                   tool1.pricing?.[0]?.price_per_month ? `$${tool1.pricing[0].price_per_month}/mo` : 'Custom'}
                </span>
              </div>
            </div>
            <div className="text-center p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <img src={tool2.logo} alt={`${tool2.name} logo`} className="w-16 h-16 mx-auto mb-4 rounded-lg" />
              <h2 className="text-2xl font-bold text-white mb-2">{tool2.name}</h2>
              <p className="text-gray-300">{tool2.overview?.description || tool2.description || ''}</p>
              <div className="mt-4">
                <span className="text-2xl font-bold text-cyan-400">
                  {tool2.pricing?.[0]?.price_per_month === 'Custom' ? 'Custom' :
                   tool2.pricing?.[0]?.price_per_month === 0 ? 'Free' :
                   tool2.pricing?.[0]?.price_per_month ? `$${tool2.pricing[0].price_per_month}/mo` : 'Custom'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Benchmarks with H2 keyword optimization */}
        {tool1.benchmarks && tool2.benchmarks && (
        <div className="bg-black border border-gray-800 rounded-lg shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {tool1.name} vs {tool2.name}: Performance Benchmarks
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-300">Metric</th>
                  <th className="text-center py-3 px-4 text-gray-300">{tool1.name}</th>
                  <th className="text-center py-3 px-4 text-gray-300">{tool2.name}</th>
                  <th className="text-center py-3 px-4 text-gray-300">Winner</th>
                </tr>
              </thead>
              <tbody>
                {tool1.benchmarks && tool2.benchmarks && Object.keys(tool1.benchmarks).map((metric) => {
                  const score1 = tool1.benchmarks?.[metric] || 0;
                  const score2 = tool2.benchmarks?.[metric] || 0;
                  const winner = score1 > score2 ? tool1.name : score2 > score1 ? tool2.name : 'Tie';
                  
                  return (
                    <tr key={metric} className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium capitalize text-gray-300">{metric.replace('_', ' ')}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-white ${score1 >= 8 ? 'bg-green-500' : score1 >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}>
                          {score1}/10
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-white ${score2 >= 8 ? 'bg-green-500' : score2 >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}>
                          {score2}/10
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-semibold text-white">
                        {winner === 'Tie' ? '🤝' : winner === tool1.name ? '🥇' : '🥈'} {winner}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Feature Comparison with H2 keyword optimization */}
        <div className="bg-black border border-gray-800 rounded-lg shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Feature Comparison: {tool1.name} vs {tool2.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">{tool1.name} Features</h3>
              <ul className="space-y-2">
                {(tool1.features || []).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">{tool2.name} Features</h3>
              <ul className="space-y-2">
                {(tool2.features || []).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pricing Comparison with H2 keyword optimization */}
        <div className="bg-black border border-gray-800 rounded-lg shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Pricing Comparison: {tool1.name} vs {tool2.name} Cost Analysis
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">{tool1.name} Pricing</h3>
              <div className="space-y-4">
                {(tool1.pricing || []).map((plan: any, index: number) => (
                  <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-white">{plan.tier || plan.plan}</h4>
                      <span className="text-lg font-bold text-cyan-400">
                        {plan.price_per_month === 'Custom' ? 'Custom' :
                         plan.price_per_month === 0 ? 'Free' : 
                         `$${plan.price_per_month}/mo`}
                      </span>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {(plan.features || []).map((feature: string, featureIndex: number) => (
                        <li key={featureIndex}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">{tool2.name} Pricing</h3>
              <div className="space-y-4">
                {(tool2.pricing || []).map((plan: any, index: number) => (
                  <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-white">{plan.tier || plan.plan}</h4>
                      <span className="text-lg font-bold text-cyan-400">
                        {plan.price_per_month === 'Custom' ? 'Custom' :
                         plan.price_per_month === 0 ? 'Free' : 
                         `$${plan.price_per_month}/mo`}
                      </span>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {(plan.features || []).map((feature: string, featureIndex: number) => (
                        <li key={featureIndex}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pros and Cons Comparison with H2 keyword optimization */}
        <div className="bg-black border border-gray-800 rounded-lg shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Pros and Cons: {tool1.name} vs {tool2.name}
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">{tool1.name}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">✅ Pros</h4>
                  <ul className="space-y-1 text-sm">
                    {(tool1.pros || []).map((pro: string, index: number) => (
                      <li key={index} className="text-gray-300">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">❌ Cons</h4>
                  <ul className="space-y-1 text-sm">
                    {(tool1.cons || []).map((con: string, index: number) => (
                      <li key={index} className="text-gray-300">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">{tool2.name}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">✅ Pros</h4>
                  <ul className="space-y-1 text-sm">
                    {(tool2.pros || []).map((pro: string, index: number) => (
                      <li key={index} className="text-gray-300">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">❌ Cons</h4>
                  <ul className="space-y-1 text-sm">
                    {(tool2.cons || []).map((con: string, index: number) => (
                      <li key={index} className="text-gray-300">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section with schema */}
        {combinedFaqs && combinedFaqs.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions: {tool1.name} vs {tool2.name}
            </h2>
            <div className="space-y-6">
              {(combinedFaqs || []).map((faq: any, index: number) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final Recommendation with H2 keyword optimization */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Final Verdict: {tool1.name} vs {tool2.name} - Which Should You Choose?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">Choose {tool1.name} If:</h3>
              <ul className="space-y-2 text-gray-300">
                {(tool1.pros || []).slice(0, 3).map((pro: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>You prioritize {pro.toLowerCase()}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href={`/tools/${tool1.slug}`}
                className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Learn More About {tool1.name}
              </Link>
            </div>
            <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">Choose {tool2.name} If:</h3>
              <ul className="space-y-2 text-gray-300">
                {(tool2.pros || []).slice(0, 3).map((pro: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span>You prioritize {pro.toLowerCase()}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href={`/tools/${tool2.slug}`}
                className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Learn More About {tool2.name}
              </Link>
            </div>
          </div>
        </div>

        {/* Still Have Questions Section */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg shadow-lg p-8 mt-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our AI experts can help you choose between {tool1.name} and {tool2.name} based on your specific needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Get Expert Advice
              </Link>
              
              <Link
                href="/tools"
                className="inline-flex items-center justify-center px-8 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 hover:text-white transition-all border border-gray-600"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Browse All Tools
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-400">Tools Reviewed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-400">Users Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.8/5</div>
                <div className="text-sm text-gray-400">Expert Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const fs = require('fs');
    const path = require('path');
    const { loadUnifiedToolsData } = require('../../utils/unifiedDataAdapter');
    
    // Load all tools from unified adapter
    const unifiedTools = loadUnifiedToolsData(fs, path);
    
    // Also load old format for slugs
    const dataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
    let aiToolsData = [];
    if (fs.existsSync(dataPath)) {
      aiToolsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }
    
    // Create slug mapping for all tools
    const toolSlugs = new Map();
    
    // Add slugs from old data
    aiToolsData.forEach((tool: any) => {
      if (tool?.slug && tool?.name) {
        toolSlugs.set(tool.name, tool.slug);
      }
    });
    
    // Add slugs from unified tools (using tool_name)
    unifiedTools.forEach((tool: any) => {
      if (!toolSlugs.has(tool.tool_name)) {
        const slug = tool.slug || tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        toolSlugs.set(tool.tool_name, slug);
      }
    });

    const paths = [];
    const slugArray = Array.from(toolSlugs.values());
    
    // Generate tool comparison combinations
    for (let i = 0; i < slugArray.length; i++) {
      for (let j = i + 1; j < slugArray.length; j++) {
        const slug1 = slugArray[i];
        const slug2 = slugArray[j];
        
        // Ensure both slugs are valid
        if (slug1 && slug2 && 
            typeof slug1 === 'string' && typeof slug2 === 'string' &&
            slug1.trim() !== '' && slug2.trim() !== '') {
          
          // Add both orderings for each pair with catch-all format
          paths.push({
            params: { 
              comparison: [slug1, 'vs', slug2]
            }
          });
          
          paths.push({
            params: { 
              comparison: [slug2, 'vs', slug1]
            }
          });
        }
      }
    }

    console.log(`Generated ${paths.length} comparison paths`);
    
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const { loadUnifiedToolsData } = require('../../utils/unifiedDataAdapter');
    
    // Extract tool slugs from comparison array parameter
    const comparison = params?.comparison;
    if (!Array.isArray(comparison) || comparison.length !== 3 || comparison[1] !== 'vs') {
      return {
        notFound: true,
      };
    }
    
    const tool1Slug = comparison[0];
    const tool2Slug = comparison[2];
    
    // Load all tools using unified adapter
    const unifiedTools = loadUnifiedToolsData(fs, path);
    
    // Also load old format data for compatibility
    const aiToolsData = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'public/data/aiToolsData.json'), 'utf8')
    );
    
    const faqData = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'public/data/faqData.json'), 'utf8')
    );

    // First try to find in old data format
    let tool1 = aiToolsData.find((t: any) => t.slug === tool1Slug);
    let tool2 = aiToolsData.find((t: any) => t.slug === tool2Slug);
    
    // If not found in old data, look in unified tools
    if (!tool1) {
      const unifiedTool1 = unifiedTools.find((t: any) => 
        t.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') === tool1Slug ||
        t.slug === tool1Slug
      );
      
      if (unifiedTool1) {
        // Convert unified format to old format for compatibility
        tool1 = {
          id: unifiedTool1.id || tool1Slug,
          name: unifiedTool1.tool_name,
          slug: tool1Slug,
          logo: unifiedTool1.logo_url,
          description: unifiedTool1.description,
          overview: {
            description: unifiedTool1.description,
            category: unifiedTool1.category,
            developer: unifiedTool1.vendor,
            website: unifiedTool1.official_url || unifiedTool1.affiliate_link,
            integrations: unifiedTool1.features?.integrations || [],
            use_cases: unifiedTool1.use_cases || []
          },
          features: unifiedTool1.features?.core || [],
          pricing: [
            { tier: 'Starter', price_per_month: unifiedTool1.pricing?.monthly === 'Free' || unifiedTool1.pricing?.monthly === 0 ? 0 : 
                                              typeof unifiedTool1.pricing?.monthly === 'number' ? unifiedTool1.pricing.monthly :
                                              unifiedTool1.pricing?.monthly === 'Custom' ? 'Custom' : 0, features: [] },
            { tier: 'Professional', price_per_month: typeof unifiedTool1.pricing?.yearly === 'number' && unifiedTool1.pricing.yearly > 0 ? 
                                                    Math.round(unifiedTool1.pricing.yearly / 12) :
                                                    unifiedTool1.pricing?.yearly === 'Custom' ? 'Custom' : 0, features: [] },
            { tier: 'Enterprise', price_per_month: unifiedTool1.pricing?.enterprise === 'Custom' ? 'Custom' : 
                                                  typeof unifiedTool1.pricing?.enterprise === 'number' ? unifiedTool1.pricing.enterprise : 'Custom', features: [] }
          ],
          pros: unifiedTool1.pros || [],
          cons: unifiedTool1.cons || [],
          benchmarks: {
            speed: 8,
            accuracy: 8,
            integration: 7,
            ease_of_use: 8,
            value: 7
          },
          affiliate_link: unifiedTool1.affiliate_link
        };
      }
    }
    
    if (!tool2) {
      const unifiedTool2 = unifiedTools.find((t: any) => 
        t.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') === tool2Slug ||
        t.slug === tool2Slug
      );
      
      if (unifiedTool2) {
        // Convert unified format to old format for compatibility
        tool2 = {
          id: unifiedTool2.id || tool2Slug,
          name: unifiedTool2.tool_name,
          slug: tool2Slug,
          logo: unifiedTool2.logo_url,
          description: unifiedTool2.description,
          overview: {
            description: unifiedTool2.description,
            category: unifiedTool2.category,
            developer: unifiedTool2.vendor,
            website: unifiedTool2.official_url || unifiedTool2.affiliate_link,
            integrations: unifiedTool2.features?.integrations || [],
            use_cases: unifiedTool2.use_cases || []
          },
          features: unifiedTool2.features?.core || [],
          pricing: [
            { tier: 'Starter', price_per_month: unifiedTool2.pricing?.monthly === 'Free' || unifiedTool2.pricing?.monthly === 0 ? 0 : 
                                              typeof unifiedTool2.pricing?.monthly === 'number' ? unifiedTool2.pricing.monthly :
                                              unifiedTool2.pricing?.monthly === 'Custom' ? 'Custom' : 0, features: [] },
            { tier: 'Professional', price_per_month: typeof unifiedTool2.pricing?.yearly === 'number' && unifiedTool2.pricing.yearly > 0 ? 
                                                    Math.round(unifiedTool2.pricing.yearly / 12) :
                                                    unifiedTool2.pricing?.yearly === 'Custom' ? 'Custom' : 0, features: [] },
            { tier: 'Enterprise', price_per_month: unifiedTool2.pricing?.enterprise === 'Custom' ? 'Custom' : 
                                                  typeof unifiedTool2.pricing?.enterprise === 'number' ? unifiedTool2.pricing.enterprise : 'Custom', features: [] }
          ],
          pros: unifiedTool2.pros || [],
          cons: unifiedTool2.cons || [],
          benchmarks: {
            speed: 7,
            accuracy: 8,
            integration: 7,
            ease_of_use: 7,
            value: 8
          },
          affiliate_link: unifiedTool2.affiliate_link
        };
      }
    }
    
    if (!tool1 || !tool2) {
      return {
        notFound: true,
      };
    }
    
    const faqs1 = tool1 ? faqData[tool1.id] || [] : [];
    const faqs2 = tool2 ? faqData[tool2.id] || [] : [];

    return {
      props: {
        tool1,
        tool2,
        faqs1,
        faqs2,
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
};

export default ComparisonPage;