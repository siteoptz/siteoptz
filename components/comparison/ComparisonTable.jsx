import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ComparisonTable({ tools, selectedTools = [], onToolSelect, onCompareClick, showCompareButton = true }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    rating: 'all',
    freePlan: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedForComparison, setSelectedForComparison] = useState(new Set());

  // Sort function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort tools
  const filteredAndSortedTools = useMemo(() => {
    let filtered = tools.filter(tool => {
      // Search filter
      const matchesSearch = !searchTerm || 
        tool.toolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = filters.category === 'all' || tool.category === filters.category;

      // Price range filter
      const price = parseFloat(tool.pricing.price.replace(/[^0-9.]/g, '')) || 0;
      const matchesPriceRange = filters.priceRange === 'all' || 
        (filters.priceRange === 'free' && price === 0) ||
        (filters.priceRange === 'low' && price > 0 && price <= 20) ||
        (filters.priceRange === 'medium' && price > 20 && price <= 50) ||
        (filters.priceRange === 'high' && price > 50);

      // Rating filter
      const matchesRating = filters.rating === 'all' ||
        (filters.rating === '4+' && tool.rating >= 4) ||
        (filters.rating === '4.5+' && tool.rating >= 4.5);

      // Free plan filter
      const hasFree = tool.pricing.plans.some(plan => plan.price === '$0');
      const matchesFreePlan = filters.freePlan === 'all' ||
        (filters.freePlan === 'yes' && hasFree) ||
        (filters.freePlan === 'no' && !hasFree);

      return matchesSearch && matchesCategory && matchesPriceRange && matchesRating && matchesFreePlan;
    });

    // Sort
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Special sorting for nested values
        if (sortConfig.key === 'price') {
          aValue = parseFloat(a.pricing.price.replace(/[^0-9.]/g, '')) || 0;
          bValue = parseFloat(b.pricing.price.replace(/[^0-9.]/g, '')) || 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [tools, sortConfig, filters, searchTerm]);

  // Get unique categories
  const categories = [...new Set(tools.map(tool => tool.category))];

  // Handle tool selection for comparison
  const handleToolSelect = (toolName) => {
    const newSelected = new Set(selectedForComparison);
    if (newSelected.has(toolName)) {
      newSelected.delete(toolName);
    } else if (newSelected.size < 3) {
      newSelected.add(toolName);
    }
    setSelectedForComparison(newSelected);
    
    // Also call the external onToolSelect if provided
    if (onToolSelect) {
      const tool = tools.find(t => t.toolName === toolName);
      onToolSelect(tool);
    }
  };

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return (
      <svg className={`w-4 h-4 ${sortConfig.direction === 'asc' ? 'text-blue-600' : 'text-blue-600 transform rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  };

  const CheckIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  const XIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  const columns = [
    {
      key: 'toolName',
      header: 'Tool',
      cell: (tool) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Image 
              src={tool.logo_url} 
              alt={`${tool.toolName} logo`}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{tool.toolName}</div>
            <div className="text-sm text-gray-500">{tool.description.substring(0, 50)}...</div>
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full mt-1">
              {tool.category}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Starting Price',
      cell: (tool) => {
        const hasFree = tool.pricing.plans.some(plan => plan.price === '$0');
        return (
          <div className="text-sm">
            <div className="font-semibold">{tool.pricing.price}</div>
            <div className="text-gray-500 text-xs">
              {hasFree ? 'Free plan available' : 'Paid only'}
            </div>
          </div>
        );
      },
    },
    {
      key: 'features',
      header: 'Features',
      cell: (tool) => (
        <div className="text-sm text-gray-600">
          <div className="font-medium">{tool.features.length} features</div>
          <div className="text-xs text-gray-500 mt-1">
            {tool.features.slice(0, 3).join(', ')}
            {tool.features.length > 3 && ` +${tool.features.length - 3} more`}
          </div>
        </div>
      ),
    },
    {
      key: 'pros',
      header: 'Pros',
      cell: (tool) => (
        <div className="space-y-1">
          {tool.pros.slice(0, 2).map((pro, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{pro}</span>
            </div>
          ))}
          {tool.pros.length > 2 && (
            <div className="text-xs text-blue-600">
              +{tool.pros.length - 2} more
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'cons',
      header: 'Cons',
      cell: (tool) => (
        <div className="space-y-1">
          {tool.cons.slice(0, 2).map((con, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <XIcon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{con}</span>
            </div>
          ))}
          {tool.cons.length > 2 && (
            <div className="text-xs text-blue-600">
              +{tool.cons.length - 2} more
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      cell: (tool) => (
        <div className="text-sm">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span className="font-semibold">{tool.rating}</span>
          </div>
          <div className="text-gray-500 text-xs">
            ({tool.review_count?.toLocaleString()})
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (tool) => {
        const isSelected = selectedForComparison.has(tool.toolName);
        return (
          <div className="flex flex-col gap-2">
            {showCompareButton && (
              <button
                onClick={() => handleToolSelect(tool.toolName)}
                disabled={!isSelected && selectedForComparison.size >= 3}
                className={`w-full px-3 py-1 text-sm rounded-lg transition-colors ${
                  isSelected 
                    ? 'bg-blue-600 text-white' 
                    : selectedForComparison.size >= 3 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {isSelected ? 'Selected' : 'Compare'}
              </button>
            )}
            <Link
              href={`/reviews/${tool.toolName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
              className="w-full px-3 py-1 text-sm bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors inline-flex items-center justify-center gap-1"
            >
              View Review
            </Link>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-3 py-1 text-sm bg-green-50 text-green-700 border border-green-300 hover:bg-green-100 rounded-lg transition-colors inline-flex items-center justify-center gap-1"
            >
              Try Tool
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Filters and Search */}
      <div className="p-6 bg-gray-50 border-b">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Price Range Filter */}
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="low">$1-20</option>
              <option value="medium">$21-50</option>
              <option value="high">$50+</option>
            </select>

            {/* Rating Filter */}
            <select
              value={filters.rating}
              onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="4+">4+ Stars</option>
              <option value="4.5+">4.5+ Stars</option>
            </select>

            {/* Free Plan Filter */}
            <select
              value={filters.freePlan}
              onChange={(e) => setFilters(prev => ({ ...prev, freePlan: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Plans</option>
              <option value="yes">Has Free Plan</option>
              <option value="no">Paid Only</option>
            </select>
          </div>
        </div>

        {/* Selected Tools for Comparison */}
        {selectedForComparison.size > 0 && showCompareButton && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-blue-900">
                  Selected for comparison: {Array.from(selectedForComparison).join(', ')}
                </span>
                <span className="text-xs text-blue-700 block">
                  (Select up to 3 tools to compare)
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onCompareClick && onCompareClick(Array.from(selectedForComparison))}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded"
                >
                  Compare Now
                </button>
                <button
                  onClick={() => setSelectedForComparison(new Set())}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-medium py-2 px-4 rounded"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAndSortedTools.length} of {tools.length} AI tools
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort(column.key)}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>{column.header}</span>
                    {getSortIcon(column.key)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedTools.map((tool, index) => (
              <tr key={tool.toolName} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {column.cell(tool)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {filteredAndSortedTools.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.816-6.207-2.18C5.075 12.1 4.56 11.296 4.16 10.355m2.48 5.817A7.963 7.963 0 0012 21c2.34 0 4.5-.816 6.207-2.18" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Tools Found</h3>
          <p className="text-gray-600">
            No AI tools match your current filters. Try adjusting your search criteria.
          </p>
          <button
            onClick={() => {
              setFilters({
                category: 'all',
                priceRange: 'all',
                rating: 'all',
                freePlan: 'all'
              });
              setSearchTerm('');
            }}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-gray-50 rounded-b-xl p-4 border-t">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            Showing {filteredAndSortedTools.length} of {tools.length} tools
          </span>
          <div className="flex gap-4">
            <span>
              Avg Price: ${(filteredAndSortedTools.reduce((sum, tool) => {
                const price = parseFloat(tool.pricing.price.replace(/[^0-9.]/g, '')) || 0;
                return sum + price;
              }, 0) / Math.max(filteredAndSortedTools.length, 1)).toFixed(0)}/mo
            </span>
            <span>
              Avg Rating: {(filteredAndSortedTools.reduce((sum, tool) => sum + (tool.rating || 0), 0) / Math.max(filteredAndSortedTools.length, 1)).toFixed(1)}/5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
