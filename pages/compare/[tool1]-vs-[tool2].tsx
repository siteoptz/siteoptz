import React from 'react';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import SEOHead from '../../components/SEOHead';
import { generateComparisonSchema, generateFAQSchema, generateBreadcrumbSchema, generateCombinedSchema } from '../../utils/schemaUtils';
// Data will be fetched at build time from public/data/

interface ComparisonPageProps {
  tool1: any;
  tool2: any;
  faqs1: any[];
  faqs2: any[];
}

const ComparisonPage: React.FC<ComparisonPageProps> = ({ tool1, tool2, faqs1, faqs2 }) => {
  if (!tool1 || !tool2) return <div>Tools not found</div>;

  // Generate schema data
  const comparisonSchema = generateComparisonSchema(tool1, tool2);
  const combinedFaqs = [...(faqs1 || []).slice(0, 3), ...(faqs2 || []).slice(0, 3)];
  const faqSchema = generateFAQSchema(combinedFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://siteoptz.ai' },
    { name: 'AI Tools', url: 'https://siteoptz.ai/tools' },
    { name: 'Compare', url: 'https://siteoptz.ai/compare' },
    { name: `${tool1.name} vs ${tool2.name}`, url: `https://siteoptz.ai/compare/${tool1.slug}-vs-${tool2.slug}` }
  ]);
  
  const combinedSchema = generateCombinedSchema(comparisonSchema, faqSchema, breadcrumbSchema);

  // SEO metadata
  const title = `${tool1.name} vs ${tool2.name}: Complete Comparison [2025] | SiteOptz`;
  const description = `Compare ${tool1.name} and ${tool2.name} features, pricing, pros and cons. Expert analysis with benchmarks to help you choose the right AI tool for your needs.`;
  
  // Extract keywords for SEO
  const keywords: string[] = [
    `${tool1.name} vs ${tool2.name}`,
    `${tool1.name} comparison`,
    `${tool2.name} comparison`,
    `${tool1.name} alternative`,
    `${tool2.name} alternative`,
    'AI tool comparison',
    'AI software comparison',
    `${tool1.name} pricing`,
    `${tool2.name} pricing`,
    `best AI tool 2025`
  ];

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalUrl={`https://siteoptz.ai/compare/${tool1.slug}-vs-${tool2.slug}`}
        ogImage={`/images/comparisons/${tool1.slug}-vs-${tool2.slug}.png`}
        schemaData={combinedSchema}
        keywords={keywords}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-blue-600">AI Tools</Link>
          <span className="mx-2">/</span>
          <Link href="/compare" className="hover:text-blue-600">Compare</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{tool1.name} vs {tool2.name}</span>
        </nav>

        {/* Hero Section with SEO-optimized H1 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            {/* H1 with primary keywords naturally integrated */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {tool1.name} vs {tool2.name}: Complete Comparison Guide [2025]
            </h1>
            {/* First paragraph with keywords naturally integrated */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Choosing between {tool1.name} and {tool2.name}? Our comprehensive comparison analyzes 
              features, pricing, performance benchmarks, and user reviews to help you make the right 
              decision for your AI tool needs in 2025.
            </p>
          </div>

          {/* Tool Comparison Header */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <img src={tool1.logo} alt={`${tool1.name} logo`} className="w-16 h-16 mx-auto mb-4 rounded-lg" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{tool1.name}</h2>
              <p className="text-gray-600">{tool1.overview.description}</p>
              <div className="mt-4">
                <span className="text-2xl font-bold text-blue-600">
                  {tool1.pricing[1]?.price_per_month ? `$${tool1.pricing[1].price_per_month}/mo` : 'Free'}
                </span>
              </div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <img src={tool2.logo} alt={`${tool2.name} logo`} className="w-16 h-16 mx-auto mb-4 rounded-lg" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{tool2.name}</h2>
              <p className="text-gray-600">{tool2.overview.description}</p>
              <div className="mt-4">
                <span className="text-2xl font-bold text-green-600">
                  {tool2.pricing[1]?.price_per_month ? `$${tool2.pricing[1].price_per_month}/mo` : 'Free'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Benchmarks with H2 keyword optimization */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {tool1.name} vs {tool2.name}: Performance Benchmarks
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Metric</th>
                  <th className="text-center py-3 px-4">{tool1.name}</th>
                  <th className="text-center py-3 px-4">{tool2.name}</th>
                  <th className="text-center py-3 px-4">Winner</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(tool1.benchmarks).map((metric) => {
                  const score1 = tool1.benchmarks[metric];
                  const score2 = tool2.benchmarks[metric];
                  const winner = score1 > score2 ? tool1.name : score2 > score1 ? tool2.name : 'Tie';
                  
                  return (
                    <tr key={metric} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium capitalize">{metric.replace('_', ' ')}</td>
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
                      <td className="py-3 px-4 text-center font-semibold">
                        {winner === 'Tie' ? '🤝' : winner === tool1.name ? '🥇' : '🥈'} {winner}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature Comparison with H2 keyword optimization */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Feature Comparison: {tool1.name} vs {tool2.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">{tool1.name} Features</h3>
              <ul className="space-y-2">
                {tool1.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">{tool2.name} Features</h3>
              <ul className="space-y-2">
                {tool2.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pricing Comparison with H2 keyword optimization */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Pricing Comparison: {tool1.name} vs {tool2.name} Cost Analysis
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">{tool1.name} Pricing</h3>
              <div className="space-y-4">
                {tool1.pricing.map((plan: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{plan.plan}</h4>
                      <span className="text-lg font-bold text-blue-600">
                        {plan.price_per_month === 0 ? 'Free' : `$${plan.price_per_month}/mo`}
                      </span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {plan.features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">{tool2.name} Pricing</h3>
              <div className="space-y-4">
                {tool2.pricing.map((plan: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{plan.plan}</h4>
                      <span className="text-lg font-bold text-green-600">
                        {plan.price_per_month === 0 ? 'Free' : `$${plan.price_per_month}/mo`}
                      </span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {plan.features.map((feature: string, featureIndex: number) => (
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
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Pros and Cons: {tool1.name} vs {tool2.name}
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">{tool1.name}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">✅ Pros</h4>
                  <ul className="space-y-1 text-sm">
                    {tool1.pros.map((pro: string, index: number) => (
                      <li key={index} className="text-gray-700">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">❌ Cons</h4>
                  <ul className="space-y-1 text-sm">
                    {tool1.cons.map((con: string, index: number) => (
                      <li key={index} className="text-gray-700">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">{tool2.name}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">✅ Pros</h4>
                  <ul className="space-y-1 text-sm">
                    {tool2.pros.map((pro: string, index: number) => (
                      <li key={index} className="text-gray-700">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">❌ Cons</h4>
                  <ul className="space-y-1 text-sm">
                    {tool2.cons.map((con: string, index: number) => (
                      <li key={index} className="text-gray-700">• {con}</li>
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
              {combinedFaqs.map((faq: any, index: number) => (
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
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Choose {tool1.name} If:</h3>
              <ul className="space-y-2 text-gray-700">
                {tool1.pros.slice(0, 3).map((pro: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>You prioritize {pro.toLowerCase()}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href={`/tools/${tool1.slug}`}
                className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Learn More About {tool1.name}
              </Link>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold text-green-600 mb-3">Choose {tool2.name} If:</h3>
              <ul className="space-y-2 text-gray-700">
                {tool2.pros.slice(0, 3).map((pro: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>You prioritize {pro.toLowerCase()}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href={`/tools/${tool2.slug}`}
                className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Learn More About {tool2.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Import data from public directory at build time
  const fs = require('fs');
  const path = require('path');
  
  const aiToolsData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public/data/aiToolsData.json'), 'utf8')
  );

  const paths = [];
  
  // Generate all possible tool combinations
  for (let i = 0; i < aiToolsData.length; i++) {
    for (let j = i + 1; j < aiToolsData.length; j++) {
      paths.push({
        params: { 
          tool1: aiToolsData[i].slug,
          tool2: aiToolsData[j].slug
        },
      });
      // Also add reverse order
      paths.push({
        params: { 
          tool1: aiToolsData[j].slug,
          tool2: aiToolsData[i].slug
        },
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Import data from public directory at build time
  const fs = require('fs');
  const path = require('path');
  
  const aiToolsData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public/data/aiToolsData.json'), 'utf8')
  );
  
  const faqData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public/data/faqData.json'), 'utf8')
  );

  const tool1 = aiToolsData.find((t: any) => t.slug === params?.tool1);
  const tool2 = aiToolsData.find((t: any) => t.slug === params?.tool2);
  
  const faqs1 = tool1 ? faqData[tool1.id] || [] : [];
  const faqs2 = tool2 ? faqData[tool2.id] || [] : [];

  if (!tool1 || !tool2) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tool1,
      tool2,
      faqs1,
      faqs2,
    },
  };
};

export default ComparisonPage;