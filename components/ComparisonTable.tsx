import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Check, X, Star, Filter, Search } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  category?: string;
  overview?: {
    category?: string;
    description?: string;
    developer?: string;
  };
  features: string[] | { core?: string[]; advanced?: string[]; integrations?: string[] };
  pricing: Array<{
    plan: string;
    price_per_month: number | string;
    features?: string[];
  }>;
  rating?: number;
  free_trial?: boolean;
  pros?: string[];
  cons?: string[];
  benchmarks?: {
    speed?: number;
    accuracy?: number;
    integration?: number;
    ease_of_use?: number;
    value?: number;
  };
}

interface ComparisonTableProps {
  tools?: Tool[];
  maxSelection?: number;
  onToolSelect?: (tools: Tool[]) => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ 
  tools = [], 
  maxSelection = 3, 
  onToolSelect 
}) => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState({ key: 'rating', direction: 'desc' });
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [comparisonMode, setComparisonMode] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(tools.map(t => t.overview?.category || t.category || 'Other'))];
    return cats;
  }, [tools]);

  // Filter and sort tools
  const processedTools = useMemo(() => {
    let filtered = tools;

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(t => 
        (t.overview?.category || t.category || 'Other') === filterCategory
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.overview?.description || t.description || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    const sorted = [...filtered].sort((a, b) => {
      let aValue: any = a[sortConfig.key as keyof Tool];
      let bValue: any = b[sortConfig.key as keyof Tool];

      // Handle nested values
      if (sortConfig.key === 'price') {
        aValue = a.pricing?.[0]?.price_per_month || 0;
        bValue = b.pricing?.[0]?.price_per_month || 0;
        // Handle "Custom" pricing
        if (aValue === 'Custom') aValue = 999999;
        if (bValue === 'Custom') bValue = 999999;
      }

      if (sortConfig.key === 'features') {
        aValue = Array.isArray(a.features) ? a.features.length : 
                 (a.features as any)?.core?.length || 0;
        bValue = Array.isArray(b.features) ? b.features.length : 
                 (b.features as any)?.core?.length || 0;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [tools, filterCategory, searchTerm, sortConfig]);

  // Handle sorting
  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle tool selection for comparison
  const toggleToolSelection = (toolId: string) => {
    setSelectedTools(prev => {
      if (prev.includes(toolId)) {
        return prev.filter(id => id !== toolId);
      }
      if (prev.length >= maxSelection) {
        alert(`You can only compare up to ${maxSelection} tools at once`);
        return prev;
      }
      return [...prev, toolId];
    });
  };

  // Get selected tool objects
  const selectedToolObjects = useMemo(() => {
    return selectedTools.map(id => tools.find(t => t.id === id)).filter(Boolean) as Tool[];
  }, [selectedTools, tools]);

  // Format price display
  const formatPrice = (pricing: Tool['pricing']) => {
    if (!pricing || !Array.isArray(pricing) || pricing.length === 0) return 'N/A';
    const firstPlan = pricing[0];
    const price = firstPlan.price_per_month;
    
    if (price === 0) return 'Free';
    if (price === 'Custom' || typeof price === 'string') return price;
    if (typeof price === 'number') {
      return price < 1 ? `$${price}/use` : `$${price}/mo`;
    }
    return 'N/A';
  };

  // Render star rating
  const renderRating = (rating?: number) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalf = (rating || 0) % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalf) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-200 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return (
      <div className="flex items-center gap-1">
        {stars} 
        <span className="text-sm text-gray-600 ml-1">{rating?.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Comparison Mode Toggle */}
          <button
            onClick={() => setComparisonMode(!comparisonMode)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              comparisonMode 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {comparisonMode ? 'Exit Comparison' : 'Compare Tools'}
          </button>
        </div>

        {/* Selected Tools for Comparison */}
        {comparisonMode && selectedTools.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-blue-900">
                  Selected for comparison: 
                </span>
                <span className="ml-2 text-blue-700">
                  {selectedToolObjects.map(t => t.name).join(', ')}
                </span>
              </div>
              {selectedTools.length >= 2 && (
                <button
                  onClick={() => onToolSelect && onToolSelect(selectedToolObjects)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Compare Now
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {comparisonMode && (
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Select
                  </span>
                </th>
              )}
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tool
                </span>
              </th>
              <th 
                className="px-6 py-3 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                  {sortConfig.key === 'price' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('rating')}
              >
                <div className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                  {sortConfig.key === 'rating' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('features')}
              >
                <div className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Features
                  {sortConfig.key === 'features' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Free Trial
                </span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {processedTools.map((tool) => (
              <tr 
                key={tool.id} 
                className={`hover:bg-gray-50 transition-colors ${
                  selectedTools.includes(tool.id) ? 'bg-blue-50' : ''
                }`}
              >
                {comparisonMode && (
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedTools.includes(tool.id)}
                      onChange={() => toggleToolSelection(tool.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                )}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {tool.logo && (
                      <img 
                        src={tool.logo} 
                        alt={`${tool.name} logo`}
                        className="w-10 h-10 rounded-lg mr-3 object-contain"
                        onError={(e: any) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{tool.name}</div>
                      <div className="text-sm text-gray-500">
                        {(tool.overview?.description || tool.description || '').slice(0, 50)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                    {formatPrice(tool.pricing)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {renderRating(tool.rating)}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">
                    {Array.isArray(tool.features) 
                      ? tool.features.length 
                      : ((tool.features as any)?.core?.length || 0)} features
                  </span>
                </td>
                <td className="px-6 py-4">
                  {tool.free_trial || (tool.pricing && tool.pricing[0]?.price_per_month === 0) ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    {tool.overview?.category || tool.category || 'Other'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results Summary */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        Showing {processedTools.length} of {tools.length} tools
      </div>
    </div>
  );
};

export default ComparisonTable;