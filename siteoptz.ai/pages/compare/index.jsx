import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import aiToolsData from '../../data/aiToolsData.json';
import SEOHead from '../../components/SEOHead';
import HeroSection from '../../components/comparison/HeroSection';
import { TryNowButton } from '../../components/CTAButton';

/**
 * Main AI tools comparison page
 * Lists all available tools and allows users to select tools for comparison
 */
export default function ComparePage({ tools }) {
  const [selectedTools, setSelectedTools] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Get unique categories
  const categories = ['all', ...new Set(tools.map(tool => tool.category))];

  // Filter and sort tools
  const filteredTools = tools
    .filter(tool => filterCategory === 'all' || tool.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return (a.pricing.startingPrice || 0) - (b.pricing.startingPrice || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  // Handle tool selection for comparison
  const toggleToolSelection = (tool) => {
    setSelectedTools(prev => {
      const isSelected = prev.find(t => t.id === tool.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tool.id);
      }
      if (prev.length < 3) {
        return [...prev, tool];
      }
      return prev;
    });
  };

  // Generate comparison URL
  const getComparisonUrl = () => {
    if (selectedTools.length === 2) {
      return `/compare/${selectedTools[0].id}-vs-${selectedTools[1].id}`;
    }
    return null;
  };

  return (
    <>
      <SEOHead
        title="AI Tool Comparison Hub - Compare Features, Pricing & Reviews | SiteOptz"
        description="Compare the best AI tools side-by-side. Analyze features, pricing, reviews, and capabilities of ChatGPT, Claude, Gemini, and more. Find the perfect AI solution for your needs."
        keywords="AI tool comparison, ChatGPT vs Claude, AI software review, artificial intelligence tools, AI platform comparison, best AI tools 2024"
        canonical="https://siteoptz.ai/compare"
        schemas={{
          webpage: {
            "@type": "WebPage",
            "name": "AI Tool Comparison Hub",
            "description": "Compare the best AI tools side-by-side with detailed feature analysis, pricing comparisons, and user reviews.",
            "url": "https://siteoptz.ai/compare"
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://siteoptz.ai"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "AI Tool Comparison",
                "item": "https://siteoptz.ai/compare"
              }
            ]
          }
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AI Tool Comparison Hub
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Compare features, pricing, and capabilities of the best AI tools
              </p>
              <div className="max-w-2xl mx-auto">
                <p className="text-lg text-blue-100">
                  Select up to 3 tools below to create a detailed side-by-side comparison.
                  Get pricing calculators, feature matrices, and expert recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Summary */}
        {selectedTools.length > 0 && (
          <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <span className="text-sm font-medium text-gray-700">
                    Selected for comparison ({selectedTools.length}/3):
                  </span>
                  <div className="flex items-center space-x-2">
                    {selectedTools.map(tool => (
                      <div key={tool.id} className="flex items-center bg-blue-100 rounded-lg px-3 py-1">
                        <Image
                          src={tool.logo}
                          alt={tool.name}
                          width={20}
                          height={20}
                          className="w-5 h-5 mr-2"
                        />
                        <span className="text-sm font-medium text-blue-900">{tool.name}</span>
                        <button
                          onClick={() => toggleToolSelection(tool)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedTools([])}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Clear All
                  </button>
                  {selectedTools.length >= 2 && (
                    <Link
                      href={getComparisonUrl()}
                      className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Compare Tools
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Sorting */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <label className="text-sm font-medium text-gray-700">Category:</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="price">Lowest Price</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isSelected={selectedTools.some(t => t.id === tool.id)}
                onSelect={toggleToolSelection}
                canSelect={selectedTools.length < 3 || selectedTools.some(t => t.id === tool.id)}
              />
            ))}
          </div>
        </div>

        {/* Popular Comparisons */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Popular Comparisons
              </h2>
              <p className="text-lg text-gray-600">
                Quick access to the most requested AI tool comparisons
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ComparisonCard
                title="ChatGPT vs Claude"
                description="Compare OpenAI's flagship model with Anthropic's advanced AI assistant"
                tools={['ChatGPT', 'Claude']}
                href="/compare/chatgpt-vs-claude"
              />
              <ComparisonCard
                title="ChatGPT vs Gemini"
                description="OpenAI vs Google's latest AI models in detailed comparison"
                tools={['ChatGPT', 'Gemini']}
                href="/compare/chatgpt-vs-gemini"
              />
              <ComparisonCard
                title="Claude vs Gemini"
                description="Anthropic's Claude compared with Google's Gemini AI"
                tools={['Claude', 'Gemini']}
                href="/compare/claude-vs-gemini"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Individual tool card component
 */
function ToolCard({ tool, isSelected, onSelect, canSelect }) {
  const formatPrice = (price, hasFreeTier) => {
    if (hasFreeTier && (!price || price === 0)) return 'Free';
    if (!price || price === 0) return 'Free';
    return `$${price}/month`;
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-200 hover:shadow-xl ${
      isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
    } ${!canSelect ? 'opacity-50' : ''}`}>
      {/* Selection Checkbox */}
      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => onSelect(tool)}
            disabled={!canSelect}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              isSelected
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white border-gray-300 hover:border-blue-400'
            } ${!canSelect ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {isSelected && (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Tool Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-50 rounded-lg p-2 mr-4">
              <Image
                src={tool.logo}
                alt={`${tool.name} logo`}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
              <p className="text-sm text-gray-500">{tool.vendor}</p>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="ml-1 text-sm font-medium text-gray-900">{tool.rating}</span>
            </div>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-600">{tool.reviewCount?.toLocaleString()} reviews</span>
          </div>
          
          {/* Pricing */}
          <div className="mb-4">
            <div className="text-2xl font-bold text-blue-600">
              {formatPrice(tool.pricing.startingPrice, tool.pricing.freeTier)}
            </div>
            <p className="text-sm text-gray-500">Starting price</p>
          </div>
          
          {/* Key Features */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-900 mb-2">Key Features:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              {tool.features.core.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-1">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Actions */}
          <div className="space-y-2">
            <TryNowButton
              tool={tool}
              size="small"
              fullWidth
              variant="primary"
            />
            <Link
              href={`/compare/${tool.id}`}
              className="w-full text-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors block"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Popular comparison card component
 */
function ComparisonCard({ title, description, tools, href }) {
  return (
    <Link href={href} className="block">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {tools.map((toolName, index) => (
              <span key={index} className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700">
                {toolName}
              </span>
            ))}
          </div>
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export async function getStaticProps() {
  return {
    props: {
      tools: aiToolsData.tools
    }
  };
}