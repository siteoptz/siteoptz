import fs from "fs";
import path from "path";
import { useState, useEffect } from "react";
import SEOHead from "../../components/SEOHead";
import { getPageConfig, buildCanonicalUrl } from "../../seo/meta-config.js";
import PricingCalculator from "../../components/tools/PricingCalculator";
import FAQSection from "../../components/FAQ/FAQSection";

export async function getStaticProps() {
  const toolsPath = path.join(process.cwd(), "data", "ai-tools.json");
  const faqPath = path.join(process.cwd(), "data", "faq-data.json");

  const toolsData = JSON.parse(fs.readFileSync(toolsPath, "utf-8"));
  const faqData = JSON.parse(fs.readFileSync(faqPath, "utf-8"));

  return {
    props: {
      tools: toolsData.ai_tools || toolsData,
      faqs: faqData.general_faqs || faqData,
    },
  };
}

export default function ToolsPage({ tools, faqs }: { tools: any[], faqs: any }) {
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const pageConfig = getPageConfig('tools');

  // Load saved selection from localStorage
  useEffect(() => {
    const savedToolName = localStorage.getItem("selectedTool");
    if (savedToolName) {
      const savedTool = tools.find((t) => t.toolName === savedToolName);
      if (savedTool) setSelectedTool(savedTool);
    }
  }, [tools]);

  // Save selection when user changes
  const handleToolChange = (toolName: string) => {
    const tool = tools.find((t: any) => t.toolName === toolName);
    setSelectedTool(tool);
    localStorage.setItem("selectedTool", toolName);
  };

  // Generate structured data for the tools directory
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageConfig.title,
    "description": pageConfig.description,
    "url": buildCanonicalUrl('/tools'),
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": tools.length,
      "itemListElement": tools.map((tool, index) => ({
        "@type": "SoftwareApplication",
        "position": index + 1,
        "name": tool.toolName,
        "description": tool.description,
        "url": `${buildCanonicalUrl('/tools')}/${tool.toolName.toLowerCase().replace(/\s+/g, '-')}`
      }))
    }
  };

  return (
    <>
      <SEOHead
        title={pageConfig.title}
        description={pageConfig.description}
        keywords={pageConfig.keywords}
        canonicalUrl={buildCanonicalUrl('/tools')}
        schemaData={structuredData}
      />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <section>
          <h1 className="text-3xl font-bold mb-6">AI Tools Comparison</h1>

          {/* Tool Selector */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Select Tool:</label>
            <select
              value={selectedTool?.toolName || ''}
              onChange={(e) => handleToolChange(e.target.value)}
              className="border rounded px-3 py-2"
            >
              {tools.map((tool) => (
                <option key={tool.toolName} value={tool.toolName}>
                  {tool.toolName}
                </option>
              ))}
            </select>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool: any, index: number) => (
              <div 
                key={tool.toolName} 
                className={`border rounded-lg p-6 transition-all hover:shadow-lg cursor-pointer ${
                  selectedTool?.toolName === tool.toolName ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => handleToolChange(tool.toolName)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToolChange(tool.toolName);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={selectedTool?.toolName === tool.toolName}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={tool.logo_url} 
                    alt={`${tool.toolName} logo`}
                    className="w-12 h-12 object-contain mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{tool.toolName}</h3>
                    <p className="text-gray-600 text-sm">{tool.vendor}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-2 line-clamp-3">
                  {tool.description}
                </p>
                
                <div className="mb-4">
                  <a 
                    href={`/reviews/${tool.toolName.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                  >
                    Read full review →
                  </a>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold text-blue-600">{tool.pricing.price}</span>
                    <span className="text-gray-500 text-sm ml-1">/{tool.pricing.tier}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-sm font-medium">{tool.rating}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {tool.features.slice(0, 3).map((feature: string, idx: number) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {tool.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{tool.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Pricing Calculator for {selectedTool?.toolName}</h2>
          <PricingCalculator
            tool={selectedTool}
            onEmailCapture={(data: any) => {
              console.log('Email captured:', data);
              // Handle email capture success
            }}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <FAQSection 
            faqs={faqs} 
            description="Find answers to common questions about AI tools, pricing, and features."
          />
        </section>
      </main>
    </>
  );
}

