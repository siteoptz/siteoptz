import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Check, X, Star, Filter, Search } from 'lucide-react';

const ComparisonTable = ({ tools = [], maxSelection = 3, onToolSelect }) => {
  const [selectedTools, setSelectedTools] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'rating', direction: 'desc' });
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [comparisonMode, setComparisonMode] = useState(false);

  // Get unique categories
  const categories = ['all', ...new Set(aiToolsData.map(tool => tool.category))];

  // Filter and sort tools
  const filteredAndSortedTools = aiToolsData
    .filter(tool => {
      const matchesCategory = filterCategory === 'all' || tool.category === filterCategory;
      const matchesSearch = tool.tool_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const { key, direction } = sortConfig;
      let aValue = a[key];
      let bValue = b[key];

      // Handle nested objects
      if (key === 'pricing') {
        aValue = a.pricing.monthly;
        bValue = b.pricing.monthly;
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleToolSelect = (tool) => {
    if (onToolSelect) {
      onToolSelect(tool);
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const renderFeatureList = (features) => {
    if (!features || features.length === 0) return 'N/A';
    return (
      <ul className="text-sm text-gray-600 space-y-1">
        {features.slice(0, 3).map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {feature}
          </li>
        ))}
        {features.length > 3 && (
          <li className="text-blue-600 text-xs">+{features.length - 3} more</li>
        )}
      </ul>
    );
  };

  const renderPricing = (pricing) => {
    if (!pricing) return 'N/A';
    return (
      <div className="text-sm">
        <div className="font-semibold">${pricing.monthly}/mo</div>
        <div className="text-gray-500">${pricing.yearly}/yr</div>
      </div>
    );
  };

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return (
      <div className="flex items-center">
        <div className="flex mr-2">{stars}</div>
        <span className="text-sm font-semibold">{rating}</span>
      </div>
    );
  };

  const renderProsCons = (items, type) => {
    if (!items || items.length === 0) return 'N/A';
    const color = type === 'pros' ? 'green' : 'red';
    return (
      <ul className="text-sm space-y-1">
        {items.slice(0, 2).map((item, index) => (
          <li key={index} className={`flex items-center text-${color}-600`}>
            <span className={`w-2 h-2 bg-${color}-500 rounded-full mr-2`}></span>
            {item}
          </li>
        ))}
        {items.length > 2 && (
          <li className="text-blue-600 text-xs">+{items.length - 2} more</li>
        )}
      </ul>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Filters and Search */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tool
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('rating')}
              >
                Rating {getSortIcon('rating')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('pricing')}
              >
                Pricing {getSortIcon('pricing')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Core Features
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pros
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cons
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedTools.map((tool) => (
              <tr key={tool.tool_name} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img 
                        className="h-10 w-10 rounded-lg object-cover" 
                        src={tool.logo_url} 
                        alt={`${tool.tool_name} logo`}
                        onError={(e) => {
                          e.target.src = '/images/placeholder-logo.png';
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{tool.tool_name}</div>
                      <div className="text-sm text-gray-500">{tool.vendor}</div>
                      <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full inline-block mt-1">
                        {tool.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderRating(tool.rating)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderPricing(tool.pricing)}
                </td>
                <td className="px-6 py-4">
                  {renderFeatureList(tool.features.core)}
                </td>
                <td className="px-6 py-4">
                  {renderProsCons(tool.pros, 'pros')}
                </td>
                <td className="px-6 py-4">
                  {renderProsCons(tool.cons, 'cons')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleToolSelect(tool)}
                      className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                    >
                      Compare
                    </button>
                    <a
                      href={tool.affiliate_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                    >
                      Visit Site
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Showing {filteredAndSortedTools.length} of {aiToolsData.length} tools</span>
          <div className="flex gap-4">
            <span>Avg Rating: {(filteredAndSortedTools.reduce((sum, tool) => sum + tool.rating, 0) / filteredAndSortedTools.length).toFixed(1)}</span>
            <span>Avg Price: ${(filteredAndSortedTools.reduce((sum, tool) => sum + tool.pricing.monthly, 0) / filteredAndSortedTools.length).toFixed(0)}/mo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;


