import fs from "fs";
import path from "path";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SEOHead from "../../components/SEOHead";
import { getPageConfig, buildCanonicalUrl } from "../../seo/meta-config.js";
import PricingCalculator from "../../components/tools/PricingCalculator";
import FAQSection from "../../components/FAQ/FAQSection";
import { loadUnifiedToolsData, getAllCategories, getToolsByCategory, searchTools } from "../../utils/unifiedDataAdapter.js";
import { getCategoryDisplayName } from "../../config/categories";
import ToolLogo from "../../components/ToolLogo";

export async function getStaticProps() {
  const faqPath = path.join(process.cwd(), "data", "faq-data.json");
  
  // Load unified tools data from both old and new datasets
  const allTools = loadUnifiedToolsData(fs, path);
  
  // Get actual categories from the data
  const actualCategories = getAllCategories(allTools);
  
  let faqData = [];
  if (fs.existsSync(faqPath)) {
    const rawFaqData = JSON.parse(fs.readFileSync(faqPath, "utf-8"));
    faqData = rawFaqData.general_faqs || rawFaqData;
  }

  return {
    props: {
      tools: allTools,
      categories: actualCategories, // Use actual categories from data
      faqs: faqData,
    },
  };
}

export default function ToolsPage({ tools, categories, faqs }: { tools: any[], categories: string[], faqs: any }) {
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState(tools);
  const pageConfig = getPageConfig('tools');
  const router = useRouter();

  // Load saved selection from localStorage
  useEffect(() => {
    const savedToolName = localStorage.getItem("selectedTool");
    if (savedToolName) {
      const savedTool = tools.find((t) => t.toolName === savedToolName || t.tool_name === savedToolName);
      if (savedTool) setSelectedTool(savedTool);
    }
  }, [tools]);

  // Handle category from URL query parameter
  useEffect(() => {
    if (router.isReady && router.query.category) {
      const categoryFromUrl = decodeURIComponent(router.query.category as string);
      if (categoryFromUrl !== selectedCategory) {
        setSelectedCategory(categoryFromUrl);
      }
    }
  }, [router.isReady, router.query.category]);

  // Filter tools based on category and search
  useEffect(() => {
    let filtered = tools;
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = getToolsByCategory(filtered, selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchTools(filtered, searchQuery);
    }
    
    setFilteredTools(filtered);
    
    // Update selected tool if current one is not in filtered results
    if (filtered.length > 0 && selectedTool && !filtered.find(t => t.tool_name === selectedTool?.tool_name)) {
      setSelectedTool(filtered[0]);
    }
  }, [selectedCategory, searchQuery, tools]);

  // Redirect to review page when user changes selection in dropdown
  const handleToolChange = (toolName: string) => {
    // Find the tool to get its slug
    const tool = filteredTools.find(t => (t.tool_name || t.toolName) === toolName);
    const toolSlug = tool?.slug || toolName.toLowerCase().replace(/\s+/g, '-');
    // Redirect to the review page
    router.push(`/reviews/${toolSlug}`);
  };

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    // Update URL to reflect the category change
    if (category === 'All') {
      // Remove category parameter when "All" is selected
      router.push('/tools/', undefined, { shallow: true });
    } else {
      // Add/update category parameter
      router.push(`/tools/?category=${encodeURIComponent(category)}`, undefined, { shallow: true });
    }
  };

  // Handle search input change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Generate structured data for the tools directory
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${pageConfig.title} - ${tools.length} AI Tools Directory`,
    "description": `Comprehensive directory of ${tools.length} AI tools across ${categories.length} categories including ${categories.slice(0, 3).join(', ')} and more.`,
    "url": buildCanonicalUrl('/tools'),
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredTools.length,
      "itemListElement": filteredTools.map((tool, index) => {
        const toolName = tool.tool_name || tool.toolName;
        return {
          "@type": "SoftwareApplication",
          "position": index + 1,
          "name": toolName,
          "description": tool.description,
          "applicationCategory": tool.category,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": tool.rating,
            "ratingCount": tool.search_volume || 100
          },
          "offers": {
            "@type": "Offer",
            "price": tool.pricing?.monthly === 'Free' ? 0 : tool.pricing?.monthly || 0,
            "priceCurrency": "USD"
          },
          "url": buildCanonicalUrl(`/reviews/${tool.slug || toolName.toLowerCase().replace(/\s+/g, '-')}`)
        };
      })
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

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        <main className="max-w-6xl mx-auto px-4 py-10 space-y-12 relative z-10">
        <section>
          <h1 className="text-3xl font-bold mb-6 text-white">AI Tools Directory</h1>
          <p className="text-gray-300 mb-8">Discover and compare {tools.length} AI tools across {categories.length} categories</p>

          {/* Search and Filters */}
          <div className="bg-black border border-gray-800 p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Search Tools:</label>
                <input
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
              </div>
              
              {/* Category Filter */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Filter by Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All">All Categories ({tools.length})</option>
                  {categories.map((category) => {
                    const count = getToolsByCategory(tools, category).length;
                    return (
                      <option key={category} value={category}>
                        {getCategoryDisplayName(category)} ({count})
                      </option>
                    );
                  })}
                </select>
              </div>
              
              {/* Quick Tool Selector */}
              <div>
                <label className="block mb-2 font-medium text-gray-300">Jump to Tool:</label>
                <select
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      handleToolChange(e.target.value);
                    }
                  }}
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a tool...</option>
                  {filteredTools.map((tool) => (
                    <option key={tool.tool_name} value={tool.tool_name}>
                      {tool.tool_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-400">
              Showing {filteredTools.length} of {tools.length} tools
              {selectedCategory !== 'All' && ` in ${getCategoryDisplayName(selectedCategory)}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-black rounded-lg border border-gray-800">
                <div className="text-gray-500 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
                <p className="text-gray-400">
                  {searchQuery 
                    ? `No tools match your search for "${searchQuery}"` 
                    : `No tools found in ${getCategoryDisplayName(selectedCategory)} category`
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredTools.map((tool: any, index: number) => {
                const toolName = tool.tool_name || tool.toolName;
                const features = tool.features?.core || tool.features || [];
                
                return (
                  <div 
                    key={toolName} 
                    className={`bg-black border rounded-lg p-6 transition-all hover:border-gray-600 cursor-pointer ${
                      selectedTool?.tool_name === toolName ? 'border-white ring-1 ring-gray-500' : 'border-gray-800 hover:border-gray-700'
                    }`}
                    onClick={() => handleToolChange(toolName)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleToolChange(toolName);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selectedTool?.tool_name === toolName}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="mr-4">
                          <ToolLogo 
                            toolName={toolName}
                            logoUrl={tool.logo_url || tool.logo}
                            size="md"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{toolName}</h3>
                          <p className="text-gray-400 text-sm">{tool.vendor}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700">
                        {tool.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {tool.description}
                    </p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-lg font-bold text-white">
                          {(() => {
                            // Prioritize monthly pricing over generic price field
                            let price;
                            if (tool.pricing?.monthly !== undefined) {
                              if (tool.pricing.monthly === 0 || tool.pricing.monthly === 'Free') {
                                price = 'Free';
                              } else if (tool.pricing.monthly === 'Custom') {
                                price = 'Custom';
                              } else if (typeof tool.pricing.monthly === 'number' && tool.pricing.monthly > 0) {
                                price = `$${tool.pricing.monthly}/month`;
                              } else {
                                price = 'Custom';
                              }
                            } else {
                              price = tool.pricing?.price || 'Custom';
                            }
                            // Remove any "Contact for pricing" text and replace with "Custom"
                            return typeof price === 'string' && price.toLowerCase().includes('contact for pricing') ? 'Custom' : price;
                          })()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-sm font-medium text-gray-300">{tool.rating}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <a 
                        href={`/reviews/${tool.slug || toolName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                        className="text-gray-400 hover:text-white text-sm font-medium inline-flex items-center transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Read full review →
                      </a>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-800">
                      <div className="flex flex-wrap gap-2">
                        {features.slice(0, 3).map((feature: string, idx: number) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-gray-900 text-gray-300 text-xs rounded border border-gray-700"
                          >
                            {feature}
                          </span>
                        ))}
                        {features.length > 3 && (
                          <span className="px-3 py-1 bg-gray-900 text-gray-300 text-xs rounded border border-gray-700">
                            +{features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section>
          <FAQSection 
            faqs={faqs}
          />
        </section>
      </main>
      </div>
    </>
  );
}

