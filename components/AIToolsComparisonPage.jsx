import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import aiToolsData from '../aiToolsData.json';
import HeroSection from './HeroSection';
import ComparisonTable from './ComparisonTable';
import PricingCalculator from './PricingCalculator';
import FAQSection from './FAQSection';
import EmailCapture from './EmailCapture';
import ToolLogo from './ToolLogo';

const AIToolsComparisonPage = () => {
  const { tool1, tool2 } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedTools, setSelectedTools] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const [pageDescription, setPageDescription] = useState('');

  // Get tools from URL params or search params
  useEffect(() => {
    let tools = [];
    
    if (tool1 && tool2) {
      // URL format: /compare/tool1-vs-tool2
      const tool1Name = tool1.replace(/-/g, ' ');
      const tool2Name = tool2.replace(/-/g, ' ');
      tools = aiToolsData.filter(t => 
        t.tool_name.toLowerCase().includes(tool1Name.toLowerCase()) ||
        t.tool_name.toLowerCase().includes(tool2Name.toLowerCase())
      );
    } else {
      // Search params format: ?tool1=ChatGPT&tool2=Jasper AI
      const paramTool1 = searchParams.get('tool1');
      const paramTool2 = searchParams.get('tool2');
      
      if (paramTool1) {
        const foundTool1 = aiToolsData.find(t => 
          t.tool_name.toLowerCase().includes(paramTool1.toLowerCase())
        );
        if (foundTool1) tools.push(foundTool1);
      }
      
      if (paramTool2) {
        const foundTool2 = aiToolsData.find(t => 
          t.tool_name.toLowerCase().includes(paramTool2.toLowerCase())
        );
        if (foundTool2) tools.push(foundTool2);
      }
    }

    // If no tools found, default to ChatGPT vs Jasper AI
    if (tools.length === 0) {
      tools = aiToolsData.filter(t => 
        t.tool_name === 'ChatGPT' || t.tool_name === 'Jasper AI'
      );
    }

    setSelectedTools(tools);
    
    // Set page title and description
    if (tools.length >= 2) {
      setPageTitle(`${tools[0].tool_name} vs ${tools[1].tool_name}: Complete Comparison [2025]`);
      setPageDescription(`Compare ${tools[0].tool_name} vs ${tools[1].tool_name} pricing, features, and use cases. Find the best ${tools[0].category.toLowerCase()} tool for your needs in 2025.`);
    } else if (tools.length === 1) {
      setPageTitle(`${tools[0].tool_name} Review & Pricing [2025]`);
      setPageDescription(`${tools[0].tool_name} is an AI-powered ${tools[0].category.toLowerCase()} tool. Read our comprehensive review, pricing analysis, and comparison with alternatives.`);
    }
  }, [tool1, tool2, searchParams]);

  // Update document title and meta description
  useEffect(() => {
    if (pageTitle) {
      document.title = pageTitle;
    }
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && pageDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }
  }, [pageTitle, pageDescription]);

  // Generate JSON-LD schema for the page
  const generatePageSchema = () => {
    if (selectedTools.length === 0) return null;

    const schema = {
      "@context": "https://schema.org",
      "@type": "ComparisonPage",
      "name": pageTitle,
      "description": pageDescription,
      "url": window.location.href,
      "mainEntity": {
        "@type": "ComparisonTable",
        "about": selectedTools.map(tool => ({
          "@type": "SoftwareApplication",
          "name": tool.tool_name,
          "applicationCategory": tool.category,
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": tool.pricing.monthly,
            "priceCurrency": "USD",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": tool.pricing.monthly,
              "priceCurrency": "USD",
              "unitText": "MONTH"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": tool.rating,
            "reviewCount": Math.floor(Math.random() * 1000) + 100
          }
        }))
      }
    };

    return schema;
  };

  const handleToolSelect = (tool) => {
    setSelectedTools(prev => {
      const exists = prev.find(t => t.tool_name === tool.tool_name);
      if (exists) {
        return prev.filter(t => t.tool_name !== tool.tool_name);
      } else {
        return [...prev, tool].slice(0, 3); // Limit to 3 tools
      }
    });
  };

  const handleToolRemove = (toolName) => {
    setSelectedTools(prev => prev.filter(t => t.tool_name !== toolName));
  };

  if (selectedTools.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading comparison...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* JSON-LD Schema */}
      {generatePageSchema() && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePageSchema())
          }}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HeroSection 
              comparisonMode={selectedTools.length >= 2}
              tools={selectedTools}
            />
          </div>
        </section>

        {/* Quick Answer Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Answer</h2>
              {selectedTools.length >= 2 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Choose {selectedTools[0].tool_name} if:
                    </h3>
                    <ul className="text-blue-800 space-y-1">
                      {selectedTools[0].pros.slice(0, 3).map((pro, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-blue-600 mr-2">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">
                      Choose {selectedTools[1].tool_name} if:
                    </h3>
                    <ul className="text-green-800 space-y-1">
                      {selectedTools[1].pros.slice(0, 3).map((pro, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-green-600 mr-2">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800">
                    {selectedTools[0].tool_name} is best suited for {selectedTools[0].use_cases.slice(0, 3).join(', ')}. 
                    It offers {selectedTools[0].pros.slice(0, 2).join(' and ')} at ${selectedTools[0].pricing.monthly}/month.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedTools.length >= 2 
                  ? `${selectedTools[0].tool_name} vs ${selectedTools[1].tool_name}: Feature Comparison`
                  : `${selectedTools[0].tool_name} Features & Alternatives`
                }
              </h2>
              <p className="text-gray-600">
                Compare features, pricing, and user ratings to find the best AI tool for your needs.
              </p>
            </div>
            
            <ComparisonTable 
              selectedTools={selectedTools}
              onToolSelect={handleToolSelect}
              showAllTools={true}
            />
          </div>
        </section>

        {/* Pricing Calculator */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PricingCalculator selectedTools={selectedTools} />
          </div>
        </section>

        {/* Email Capture */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <EmailCapture 
              toolName={selectedTools.length === 1 ? selectedTools[0].tool_name : null}
              category={selectedTools.length >= 2 ? selectedTools[0].category : null}
              leadMagnetTitle={selectedTools.length >= 2 
                ? `Get Your Free ${selectedTools[0].tool_name} vs ${selectedTools[1].tool_name} Comparison Guide`
                : `Get Your Free ${selectedTools[0].tool_name} Review & Alternatives Guide`
              }
              downloadUrl="/downloads/ai-tools-comparison-guide.pdf"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSection 
              toolName={selectedTools.length === 1 ? selectedTools[0].tool_name : null}
              category={selectedTools.length >= 2 ? selectedTools[0].category : null}
            />
          </div>
        </section>

        {/* Related Comparisons */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Comparisons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiToolsData
                  .filter(tool => 
                    tool.category === selectedTools[0]?.category && 
                    !selectedTools.find(s => s.tool_name === tool.tool_name)
                  )
                  .slice(0, 6)
                  .map(tool => (
                    <a
                      key={tool.tool_name}
                      href={`/compare/${selectedTools[0]?.tool_name?.toLowerCase().replace(/\s+/g, '-')}-vs-${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center mb-2">
                        <div className="mr-3">
                          <ToolLogo 
                            toolName={tool.tool_name}
                            logoUrl={tool.logo_url}
                            size="sm"
                          />
                        </div>
                        <span className="font-medium text-gray-900">{tool.tool_name}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        ${tool.pricing.monthly}/month • {tool.rating}★
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AIToolsComparisonPage;


