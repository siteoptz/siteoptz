import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import ToolComparisonTable from '../../components/ToolComparisonTable';
import PricingCalculator from '../../components/PricingCalculator';
import FAQSection from '../../components/FAQSection';
import SEOHead from '../../components/SEOHead';
import { generateToolMeta, generateSoftwareApplicationSchema, buildCanonicalUrl } from '../../seo/meta-config.js';
import { ArrowLeft, ExternalLink, Star, Check, X } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface Tool {
  id: string;
  slug: string;
  name: string;
  logo: string;
  meta: {
    title: string;
    description: string;
  };
  schema: any;
  overview: {
    developer: string;
    release_year: number;
    description: string;
  };
  features: string[];
  pros: string[];
  cons: string[];
  pricing: {
    plan: string;
    price_per_month: number;
    features: string[];
  }[];
  benchmarks: {
    speed: number;
    accuracy: number;
    integration: number;
    ease_of_use: number;
    value: number;
  };
  related_tools: string[];
}

interface ToolPageProps {
  tool: Tool;
  relatedTools: Tool[];
  faqs: any[];
  allTools: Tool[];
}

export default function ToolPage({ tool, relatedTools, faqs, allTools }: ToolPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const renderStars = (score: number) => {
    const stars = Math.round(score / 2);
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-2 font-semibold">{score.toFixed(1)}/10</span>
      </div>
    );
  };

  const overallScore = tool.benchmarks ? (
    (tool.benchmarks.speed + 
     tool.benchmarks.accuracy + 
     tool.benchmarks.integration + 
     tool.benchmarks.ease_of_use + 
     tool.benchmarks.value) / 5
  ).toFixed(1) : '0.0';

  // Generate SEO meta data using our configuration system
  const toolMeta = generateToolMeta(tool);
  const structuredData = generateSoftwareApplicationSchema(tool);

  return (
    <>
      <SEOHead
        title={toolMeta?.title || tool.meta?.title}
        description={toolMeta?.description || tool.meta?.description}
        canonicalUrl={buildCanonicalUrl(`/tools/${tool.slug}`)}
        ogImage={tool.logo}
        schemaData={structuredData}
        keywords={toolMeta?.keywords || [`${tool.name}`, `${tool.name} review`, `${tool.name} pricing`, `${tool.name} features`, `${tool.name} alternatives`]}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/tools" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Tools</span>
              </Link>
              <div className="flex gap-4">
                <Link href="/tools/compare" className="text-blue-600 hover:text-blue-700 font-medium">
                  Compare Tools
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  {tool.logo && (
                    <img src={tool.logo} alt={tool.name} className="w-20 h-20 bg-white rounded-xl p-2" />
                  )}
                  <div>
                    <h1 className="text-4xl font-bold">{tool.name}</h1>
                    <p className="text-blue-100">by {tool.overview.developer}</p>
                  </div>
                </div>
                <p className="text-xl text-blue-100 mb-6">
                  {tool.overview.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Try {tool.name} Free
                  </button>
                  <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                    Watch Demo
                  </button>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">Overall Score</h3>
                <div className="text-5xl font-bold mb-4">{overallScore}/10</div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Speed</span>
                    {renderStars(tool.benchmarks?.speed || 0)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Accuracy</span>
                    {renderStars(tool.benchmarks?.accuracy || 0)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Integration</span>
                    {renderStars(tool.benchmarks?.integration || 0)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Ease of Use</span>
                    {renderStars(tool.benchmarks?.ease_of_use || 0)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Value</span>
                    {renderStars(tool.benchmarks?.value || 0)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Features Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tool.features?.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pros and Cons */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Pros</h3>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <ul className="space-y-3">
                    {tool.pros?.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Cons</h3>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <ul className="space-y-3">
                    {tool.cons?.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{tool.name} Pricing Plans</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {tool.pricing?.map((plan, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white rounded-xl shadow-lg border-2 ${
                    idx === 1 ? 'border-blue-500 transform scale-105' : 'border-gray-200'
                  }`}
                >
                  {idx === 1 && (
                    <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{plan.plan}</h3>
                    <div className="text-3xl font-bold mb-4">
                      {(() => {
                        // Check if this is actually enterprise/custom pricing vs truly free
                        const isEnterpriseOrCustom = plan.price_per_month === 0 && 
                          (plan.plan?.toLowerCase().includes('enterprise') || 
                           plan.plan?.toLowerCase().includes('custom') ||
                           plan.features?.some((f: string) => f.toLowerCase().includes('custom pricing')));
                        
                        const isTrulyFree = plan.price_per_month === 0 && 
                          plan.plan?.toLowerCase().includes('free');
                        
                        if (isEnterpriseOrCustom) {
                          return 'Custom';
                        } else if (isTrulyFree) {
                          return 'Free';
                        } else if (plan.price_per_month === 0) {
                          return 'Custom'; // Default for 0 price when not explicitly free
                        } else {
                          return `$${plan.price_per_month}`;
                        }
                      })()}
                      {plan.price_per_month > 0 && <span className="text-base font-normal text-gray-500">/month</span>}
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features?.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      )) || <li className="text-sm text-gray-500">Contact for details</li>}
                    </ul>
                    <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      idx === 1 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      Get Started
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Calculator */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Build Your AI Stack
            </h2>
            <PricingCalculator tools={[tool, ...relatedTools]} />
          </section>

          {/* Comparison with Related Tools */}
          {relatedTools.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Compare {tool.name} with Alternatives
              </h2>
              <ToolComparisonTable 
                tools={[tool, ...relatedTools]} 
                defaultSelected={[tool.id, relatedTools[0]?.id].filter(Boolean)}
              />
            </section>
          )}

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {tool.name} FAQs
            </h2>
            <FAQSection 
              faqs={faqs} 
              toolName={tool.name}
              showSearch={faqs.length > 5}
              maxInitialDisplay={5}
            />
          </section>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const aiToolsPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
  const tools = JSON.parse(fs.readFileSync(aiToolsPath, 'utf8'));
  
  const paths = tools.map((tool: Tool) => ({
    params: { slug: tool.slug }
  }));
  
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const aiToolsPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
  const faqPath = path.join(process.cwd(), 'public/data/faqData.json');
  
  const tools = JSON.parse(fs.readFileSync(aiToolsPath, 'utf8'));
  const allFaqs = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
  
  const tool = tools.find((t: Tool) => t.slug === params?.slug);
  
  if (!tool) {
    return {
      notFound: true
    };
  }
  
  // Get related tools
  const relatedTools = (tool.related_tools || [])
    .map((id: string) => tools.find((t: Tool) => t.id === id))
    .filter(Boolean)
    .slice(0, 3);
  
  // Get FAQs for this tool
  const faqs = allFaqs[tool.id] || [];
  
  return {
    props: {
      tool,
      relatedTools,
      faqs,
      allTools: tools
    },
    revalidate: 3600
  };
};