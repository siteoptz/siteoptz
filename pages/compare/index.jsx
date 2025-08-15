import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { Search, Filter, Grid, List, Star, DollarSign, Zap } from 'lucide-react';
import { generateMetaTitle, generateMetaDescription, generateOpenGraphTags } from '../../utils/seoUtils';

export default function CompareIndex({ aiToolsData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

  // Get unique categories from tools data
  const categories = useMemo(() => {
    const cats = new Set(aiToolsData.map(tool => tool.category));
    return ['all', ...Array.from(cats).sort()];
  }, [aiToolsData]);

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let filtered = aiToolsData.filter(tool => {
      const description = tool.overview?.description || tool.description || '';
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort tools
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        // For now, use a default rating since we don't have ratings in new structure
        // Keep original order for now
        break;
      case 'price':
        const getStartingPrice = (tool) => {
          const pricing = tool.pricing || tool.pricingPlans || [];
          const paidPlan = pricing.find(plan => (plan.monthlyPrice || plan.price_per_month) > 0);
          return paidPlan ? (paidPlan.monthlyPrice || paidPlan.price_per_month) : 0;
        };
        filtered.sort((a, b) => getStartingPrice(a) - getStartingPrice(b));
        break;
      case 'popularity':
        // For now, sort by name since we don't have popularity metrics
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [aiToolsData, searchTerm, selectedCategory, sortBy]);

  const metaTitle = generateMetaTitle(null, null, 'category');
  const metaDescription = generateMetaDescription(null, null, 'category');
  const ogTags = generateOpenGraphTags(null, null, 'category');

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content="AI tools comparison, artificial intelligence software, AI tool reviews, best AI tools 2025" />
        
        {/* Open Graph Tags */}
        {Object.entries(ogTags).map(([key, value]) => (
          <meta key={key} property={key} content={value} />
        ))}
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SiteOptz" />
        <link rel="canonical" href="https://siteoptz.ai/compare" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Hero Section */}
        <section className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                AI Tools Comparison
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Compare the best AI tools for content creation, SEO, social media, and more. 
                Expert reviews, pricing analysis, and feature comparisons to help you choose the right tool.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search AI tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 text-lg w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="bg-white border-b sticky top-0 z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filter:</span>
                </div>
                
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>

                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                  <option value="price">Price</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredTools.length} of {aiToolsData.length} AI tools
            </div>
          </div>
        </section>

        {/* Tools Grid/List */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} viewMode={viewMode} />
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Help Choosing the Right AI Tool?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Download our comprehensive AI tools comparison guide and get expert recommendations.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Download Free Guide
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

function ToolCard({ tool, viewMode }) {
  const pricing = tool.pricing || {};
  const startingPrice = pricing.monthly === 'Free' ? 0 : (pricing.monthly === 'Custom' ? 'Custom' : pricing.monthly || 0);
  const hasFreeTrial = pricing.monthly === 'Free' || tool.free_trial;
  const toolSlug = tool.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
  const overallRating = tool.rating || 4.5;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="p-6">
          <div className="flex items-center gap-6">
            {/* Tool Logo */}
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <img 
                src={tool.logo} 
                alt={`${tool.name} logo`}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  console.log('Logo failed to load for', tool.name, '- path:', tool.logo);
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.innerHTML = `<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-sm">${tool.name.charAt(0)}</div>`;
                }}
              />
            </div>

            {/* Tool Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{(tool.overview?.description || tool.description || '').substring(0, 100)}...</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {startingPrice === 'Custom' ? (
                      <span>Custom</span>
                    ) : startingPrice === 0 ? (
                      <span>Free</span>
                    ) : (
                      <>
                        ${startingPrice}
                        <span className="text-sm font-normal text-gray-500">/month</span>
                      </>
                    )}
                  </div>
                  {hasFreeTrial && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Free Trial
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{overallRating}/5</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>{(tool.features || []).length} features</span>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{tool.category}</span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {(tool.overview?.description || tool.description || '').substring(0, 150)}...
              </p>

              <div className="flex justify-center">
                <a 
                  href={`/reviews/${toolSlug}`}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow h-full">
      <div className="pb-4 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <img 
              src={tool.logo} 
              alt={`${tool.name} logo`}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                console.log('Logo failed to load for', tool.name, '- path:', tool.logo);
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = `<div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-xs">${tool.name.charAt(0)}</div>`;
              }}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
            <p className="text-gray-600 text-sm">{(tool.overview?.description || tool.description || '').substring(0, 50)}...</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{overallRating}/5</span>
          </div>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{tool.category}</span>
        </div>
      </div>

      <div className="pt-0 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              {startingPrice === 'Custom' ? (
                <span>Custom</span>
              ) : startingPrice === 0 ? (
                <span>Free</span>
              ) : (
                <>
                  ${startingPrice}
                  <span className="text-sm font-normal text-gray-500">/month</span>
                </>
              )}
            </div>
            {hasFreeTrial && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Free Trial</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Zap className="w-4 h-4 text-blue-500" />
            <span>{(tool.features || []).length} features</span>
          </div>

          <p className="text-gray-600 text-sm line-clamp-3">
            {(tool.overview?.description || tool.description || '').substring(0, 120)}...
          </p>

                    <div className="flex justify-center pt-2">
            <a
              href={`/reviews/${toolSlug}`}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  const { loadUnifiedToolsData } = require('../../utils/unifiedDataAdapter');
  
  try {
    // Load unified tools data
    const unifiedTools = loadUnifiedToolsData(fs, path);
    
    // Transform data to match the expected format for compare page
    const aiToolsData = unifiedTools.map(tool => ({
      name: tool.tool_name || tool.toolName,
      category: tool.category,
      description: tool.description || '',
      overview: { description: tool.description || '' },
      features: tool.features?.core || tool.features || [],
      pricing: tool.pricing,
      pricingPlans: [
        {
          plan: 'Monthly',
          price_per_month: tool.pricing?.monthly === 'Free' ? 0 : tool.pricing?.monthly || 0,
          monthlyPrice: tool.pricing?.monthly === 'Free' ? 0 : tool.pricing?.monthly || 0
        }
      ],
      logo: tool.logo_url || tool.logo,
      rating: tool.rating || 4.5,
      affiliate_link: tool.affiliate_link || '#',
      search_volume: tool.search_volume || 1000
    }));
    
    return {
      props: {
        aiToolsData,
      },
    };
  } catch (error) {
    console.error('Error loading AI tools data:', error);
    return {
      props: {
        aiToolsData: [],
      },
    };
  }
}
