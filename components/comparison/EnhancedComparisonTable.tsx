import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';

interface Tool {
  tool_name: string;
  vendor: string;
  logo_url: string;
  description: string;
  features: {
    core: string[];
    advanced: string[];
    integrations: string[];
  };
  pros: string[];
  cons: string[];
  pricing: {
    monthly: number;
    yearly: number;
    enterprise: string;
    plans: {
      plan_name: string;
      price: string;
      features_included: string[];
    }[];
  };
  official_url: string;
  affiliate_link: string;
  rating: number;
  review_count: number;
  best_use_cases: string[];
  target_audience: string[];
  free_trial: boolean;
  demo_available: boolean;
  faq: {
    question: string;
    answer: string;
  }[];
}

interface FilterState {
  priceRange: [number, number];
  minRating: number;
  useCase: string;
  features: string[];
  hasFreeTrial: boolean | null;
}

interface EnhancedComparisonTableProps {
  allTools: Tool[];
  onRequestComparison: (selectedTools: Tool[]) => void;
}

// Use case categories for filtering
const USE_CASE_CATEGORIES = [
  'All',
  'Content Creation',
  'SEO & Optimization', 
  'Social Media',
  'Email Marketing',
  'Visual Content',
  'Code Generation',
  'Research & Analysis',
  'Marketing Automation',
  'Customer Support'
];

// Common features for filtering
const COMMON_FEATURES = [
  'API access',
  'Team collaboration',
  'Custom integrations',
  'Real-time updates',
  'Analytics',
  'Templates',
  'Multi-language support',
  'Mobile app',
  'Free trial',
  'Custom branding'
];

export default function EnhancedComparisonTable({ allTools, onRequestComparison }: EnhancedComparisonTableProps) {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 200],
    minRating: 0,
    useCase: 'All',
    features: [],
    hasFreeTrial: null
  });
  const [showFilters, setShowFilters] = useState(false);

  // Extract price from string (e.g., "$19/month" -> 19)
  const extractPrice = useCallback((priceString: string): number => {
    if (priceString.includes('$0') || priceString.toLowerCase().includes('free')) {
      return 0;
    }
    const match = priceString.match(/\$(\d+(?:\.\d{2})?)/);
    return match ? parseFloat(match[1]) : 999;
  }, []);

  // Filter tools based on current filter state
  const filteredTools = useMemo(() => {
    return allTools.filter(tool => {
      const basePrice = extractPrice(tool.pricing.plans[0]?.price || '$999');
      
      // Price range filter
      if (basePrice < filters.priceRange[0] || basePrice > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (tool.rating < filters.minRating) {
        return false;
      }

      // Use case filter
      if (filters.useCase !== 'All') {
        const toolCategory = categorizeByUseCase(tool);
        if (toolCategory !== filters.useCase) {
          return false;
        }
      }

      // Features filter
      if (filters.features.length > 0) {
        const allToolFeatures = [
          ...tool.features.core,
          ...tool.features.advanced,
          ...tool.features.integrations
        ].map(f => f.toLowerCase());
        
        const hasRequiredFeatures = filters.features.every(requiredFeature =>
          allToolFeatures.some(toolFeature => 
            toolFeature.includes(requiredFeature.toLowerCase())
          )
        );
        
        if (!hasRequiredFeatures) {
          return false;
        }
      }

      // Free trial filter
      if (filters.hasFreeTrial !== null) {
        if (filters.hasFreeTrial && !tool.free_trial) {
          return false;
        }
        if (!filters.hasFreeTrial && tool.free_trial) {
          return false;
        }
      }

      return true;
    });
  }, [allTools, filters, extractPrice]);

  // Categorize tools by primary use case
  const categorizeByUseCase = useCallback((tool: Tool): string => {
    const name = tool.tool_name.toLowerCase();
    const description = tool.description.toLowerCase();
    const features = [...tool.features.core, ...tool.features.advanced].join(' ').toLowerCase();
    
    if (name.includes('seo') || description.includes('seo') || features.includes('seo')) {
      return 'SEO & Optimization';
    }
    if (name.includes('midjourney') || description.includes('image') || features.includes('image')) {
      return 'Visual Content';
    }
    if (name.includes('copilot') || description.includes('code') || features.includes('code')) {
      return 'Code Generation';
    }
    if (description.includes('content') || features.includes('writing')) {
      return 'Content Creation';
    }
    if (description.includes('social') || features.includes('social')) {
      return 'Social Media';
    }
    if (description.includes('email') || features.includes('email')) {
      return 'Email Marketing';
    }
    if (description.includes('search') || description.includes('research')) {
      return 'Research & Analysis';
    }
    if (description.includes('automation') || features.includes('automation')) {
      return 'Marketing Automation';
    }
    if (description.includes('support') || features.includes('support')) {
      return 'Customer Support';
    }
    return 'Content Creation'; // Default
  }, []);

  // Handle tool selection for comparison
  const handleToolSelect = useCallback((tool: Tool) => {
    setSelectedTools(prev => {
      const isSelected = prev.some(t => t.tool_name === tool.tool_name);
      
      if (isSelected) {
        return prev.filter(t => t.tool_name !== tool.tool_name);
      } else if (prev.length < 3) {
        return [...prev, tool];
      } else {
        // Replace oldest selection if at limit
        return [prev[1], prev[2], tool];
      }
    });
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: [0, 200],
      minRating: 0,
      useCase: 'All',
      features: [],
      hasFreeTrial: null
    });
  }, []);

  // Handle feature filter toggle
  const toggleFeatureFilter = useCallback((feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg border p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Compare AI Tools</h2>
          <p className="text-gray-600">
            Select 2-3 tools to compare side-by-side. {filteredTools.length} of {allTools.length} tools shown.
          </p>
        </div>
        
        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mt-4 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
          </svg>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range ($/month)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [0, parseInt(e.target.value)]
                  }))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 min-w-[60px]">
                  $0-${filters.priceRange[1]}
                </span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.minRating}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    minRating: parseFloat(e.target.value)
                  }))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 min-w-[40px]">
                  {filters.minRating}+
                </span>
              </div>
            </div>

            {/* Use Case Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Use Case
              </label>
              <select
                value={filters.useCase}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  useCase: e.target.value
                }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {USE_CASE_CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Free Trial Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Free Trial
              </label>
              <select
                value={filters.hasFreeTrial === null ? 'all' : filters.hasFreeTrial ? 'yes' : 'no'}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  hasFreeTrial: e.target.value === 'all' ? null : e.target.value === 'yes'
                }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Tools</option>
                <option value="yes">Free Trial Available</option>
                <option value="no">No Free Trial</option>
              </select>
            </div>
          </div>

          {/* Feature Filters */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Required Features
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_FEATURES.map(feature => (
                <button
                  key={feature}
                  onClick={() => toggleFeatureFilter(feature)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.features.includes(feature)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

      {/* Selected Tools Bar */}
      {selectedTools.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                Selected for Comparison ({selectedTools.length}/3)
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedTools.map(tool => (
                  <div
                    key={tool.tool_name}
                    className="bg-white px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    <span className="mr-2">{tool.tool_name}</span>
                    <button
                      onClick={() => handleToolSelect(tool)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {selectedTools.length >= 2 && (
              <button
                onClick={() => onRequestComparison(selectedTools)}
                className="mt-3 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
              >
                Request Full Comparison
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => {
          const basePrice = extractPrice(tool.pricing.plans[0]?.price || '$999');
          const isSelected = selectedTools.some(t => t.tool_name === tool.tool_name);
          const useCase = categorizeByUseCase(tool);
          
          return (
            <div
              key={tool.tool_name}
              className={`border rounded-lg p-6 transition-all cursor-pointer ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => handleToolSelect(tool)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToolSelect(tool);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Select ${tool.tool_name}`}
            >
              {/* Tool Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-sm mr-3">
                    <Image
                      src={tool.logo_url}
                      alt={`${tool.tool_name} AI comparison logo - ${tool.vendor} features and pricing analysis`}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{tool.tool_name}</h3>
                    <p className="text-sm text-gray-500">{tool.vendor}</p>
                  </div>
                </div>
                
                {/* Selection Indicator */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Tool Info */}
              <div className="space-y-3">
                {/* Use Case */}
                <div>
                  <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                    {useCase}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>

                {/* Key Metrics */}
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-medium text-gray-900">
                      {basePrice === 0 ? 'Free' : basePrice === 999 ? 'Custom' : `$${basePrice}/mo`}
                    </span>
                    {tool.free_trial && (
                      <span className="ml-2 text-green-600 text-xs">Free Trial</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    <span className="font-medium">{tool.rating}</span>
                    <span className="text-gray-500 ml-1">({tool.review_count.toLocaleString()})</span>
                  </div>
                </div>

                {/* Top Features */}
                <div>
                  <div className="flex flex-wrap gap-1">
                    {tool.features.core.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.4a7.962 7.962 0 01-5-1.891m0 0V15a2 2 0 012-2h6a2 2 0 012 2v3.309z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tools match your filters</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filter criteria to see more results.</p>
          <button
            onClick={resetFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}