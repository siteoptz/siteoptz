import { GetStaticProps } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import ToolComparisonTable from '../components/ToolComparisonTable';
import PricingCalculator from '../components/PricingCalculator';
import PricingCalculatorSimple from '../components/PricingCalculatorSimple';
import FAQSection from '../components/FAQSection';
import { 
  convertToSimplePricingFormat, 
  calculateOverallRating,
  getPriceRange,
  sortTools,
  filterTools
} from '../utils/dataAdapters';
import fs from 'fs';
import path from 'path';

interface DemoPageProps {
  tools: any[];
  faqs: any;
}

export default function DemoPage({ tools, faqs }: DemoPageProps) {
  const [calculatorMode, setCalculatorMode] = useState<'advanced' | 'simple'>('advanced');
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('rating');
  const [filterCategory, setFilterCategory] = useState<string>('');

  // Sort and filter tools
  const processedTools = sortTools(
    filterCategory ? filterTools(tools, { category: filterCategory }) : tools,
    sortBy
  );

  // Convert pricing for simple calculator
  const simplePricing = convertToSimplePricingFormat(selectedTool.pricing);

  // Get all FAQs for demo
  const allFaqs: any[] = Object.values(faqs).flat().slice(0, 10);

  const handleEmailSubmit = (email: string, data: any) => {
    console.log('Email captured:', email);
    console.log('Selected data:', data);
    // Here you would send to your API
  };

  return (
    <>
      <Head>
        <title>AI Tools Demo - Try Before You Buy | SiteOptz.ai</title>
        <meta 
          name="description" 
          content="Experience AI tools with interactive demos, pricing calculators, and feature comparisons. Test functionality and find the perfect solution for your needs." 
        />
        <meta name="keywords" content="AI tools demo, interactive pricing calculator, tool comparison, test AI tools" />
        <link rel="canonical" href="https://siteoptz.ai/demo" />
      </Head>

      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            AI Tools Components Demo
          </h1>
          <p className="text-xl text-blue-100">
            Interactive demonstration of all component variations
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Component Showcase Navigation */}
        <nav className="bg-white rounded-lg shadow-sm p-4 sticky top-0 z-10">
          <div className="flex flex-wrap gap-4">
            <a href="#comparison" className="text-blue-600 hover:text-blue-700 font-medium">
              Comparison Table
            </a>
            <a href="#pricing" className="text-blue-600 hover:text-blue-700 font-medium">
              Pricing Calculators
            </a>
            <a href="#faqs" className="text-blue-600 hover:text-blue-700 font-medium">
              FAQ Section
            </a>
            <a href="#stats" className="text-blue-600 hover:text-blue-700 font-medium">
              Tool Stats
            </a>
          </div>
        </nav>

        {/* Tools Stats Dashboard */}
        <section id="stats" className="space-y-6">
          <h2 className="text-3xl font-bold">Tools Overview</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">{tools.length}</div>
              <div className="text-gray-600">Total Tools</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600">
                {tools.filter(t => t.pricing.some((p: any) => p.price_per_month === 0)).length}
              </div>
              <div className="text-gray-600">Free Options</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-600">
                {Math.round(
                  tools.reduce((acc, tool) => acc + calculateOverallRating(tool.benchmarks), 0) / tools.length * 10
                ) / 10}
              </div>
              <div className="text-gray-600">Avg Rating</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-orange-600">
                {Object.keys(faqs).length * 5}
              </div>
              <div className="text-gray-600">Total FAQs</div>
            </div>
          </div>

          {/* Sorting and Filtering */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-4">Sort & Filter Tools</h3>
            <div className="flex flex-wrap gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="">All Categories</option>
                <option value="ai-assistant">AI Assistants</option>
                <option value="content-creation">Content Creation</option>
                <option value="image-generation">Image Generation</option>
                <option value="seo-tools">SEO Tools</option>
              </select>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Interactive Comparison Table
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Compare up to 4 tools side-by-side with dynamic selection
            </p>
          </div>
          <ToolComparisonTable 
            tools={processedTools}
            defaultSelected={['chatgpt', 'claude']}
          />
        </section>

        {/* Pricing Calculators */}
        <section id="pricing" className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Pricing Calculator Variations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Choose between advanced multi-tool calculator or simple single-tool calculator
            </p>
            
            {/* Calculator Mode Toggle */}
            <div className="inline-flex bg-gray-100 rounded-lg p-1 mb-8">
              <button
                onClick={() => setCalculatorMode('advanced')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  calculatorMode === 'advanced'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Advanced Calculator
              </button>
              <button
                onClick={() => setCalculatorMode('simple')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  calculatorMode === 'simple'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Simple Calculator
              </button>
            </div>
          </div>

          {calculatorMode === 'advanced' ? (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Advanced Multi-Tool Pricing Calculator
              </h3>
              <PricingCalculator 
                tools={processedTools}
                onEmailSubmit={handleEmailSubmit}
              />
            </div>
          ) : (
            <div className="max-w-lg mx-auto">
              <h3 className="text-xl font-semibold mb-4">
                Simple Single-Tool Pricing Calculator
              </h3>
              
              {/* Tool Selector for Simple Calculator */}
              <div className="mb-4">
                <select
                  value={selectedTool.id}
                  onChange={(e) => {
                    const tool = tools.find(t => t.id === e.target.value);
                    if (tool) setSelectedTool(tool);
                  }}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  {tools.map(tool => (
                    <option key={tool.id} value={tool.id}>
                      {tool.name} ({getPriceRange(tool.pricing)})
                    </option>
                  ))}
                </select>
              </div>
              
              <PricingCalculatorSimple
                plans={simplePricing}
                toolName={selectedTool.name}
                onSubmit={handleEmailSubmit}
              />
            </div>
          )}
        </section>

        {/* FAQ Section */}
        <section id="faqs" className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Expandable FAQ Section
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Searchable FAQs with expand/collapse functionality and schema markup
            </p>
          </div>
          <FAQSection 
            faqs={allFaqs}
            showSearch={true}
            maxInitialDisplay={5}
          />
        </section>

        {/* Tools Grid Preview */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Tools Grid</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {processedTools.slice(0, 6).map(tool => (
              <div key={tool.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  {tool.logo && (
                    <img src={tool.logo} alt={tool.name} className="w-12 h-12 object-contain" />
                  )}
                  <div className="text-2xl font-bold text-yellow-500">
                    {calculateOverallRating(tool.benchmarks)}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{tool.overview.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-green-600">
                    {getPriceRange(tool.pricing)}
                  </span>
                  <a 
                    href={`/tools/${tool.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Details →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Implementation Guide */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Implementation Guide</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">1. Data Structure</h3>
              <p className="text-gray-600 mb-2">
                Components work with the existing aiToolsData.json and faqData.json structure.
                Use the data adapters in /utils/dataAdapters.ts for format conversion.
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`// Example: Convert pricing format
import { convertToSimplePricingFormat } from '../utils/dataAdapters';

const simplePricing = convertToSimplePricingFormat(tool.pricing);`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">2. Component Usage</h3>
              <p className="text-gray-600 mb-2">
                All components are TypeScript-ready with full prop interfaces.
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`// Comparison Table
<ToolComparisonTable 
  tools={tools} 
  defaultSelected={['tool-id-1', 'tool-id-2']}
/>

// Simple Pricing Calculator
<PricingCalculatorSimple
  plans={plans}
  toolName="ChatGPT"
  onSubmit={(email, plan) => console.log(email, plan)}
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">3. Styling</h3>
              <p className="text-gray-600">
                All components use Tailwind CSS classes. Ensure Tailwind is configured in your project.
                Components are fully responsive and include hover/focus states.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">4. SEO Integration</h3>
              <p className="text-gray-600">
                FAQ component automatically generates JSON-LD schema markup.
                Use the SEOHead component for meta tags and Open Graph data.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const aiToolsPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
  const faqPath = path.join(process.cwd(), 'public/data/faqData.json');
  
  const tools = JSON.parse(fs.readFileSync(aiToolsPath, 'utf8'));
  const faqs = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
  
  return {
    props: {
      tools,
      faqs
    }
  };
};