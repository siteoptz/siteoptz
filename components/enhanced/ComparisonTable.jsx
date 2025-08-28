import React, { useState, useMemo } from 'react';
import { loadUnifiedToolsData } from '../../utils/unifiedDataAdapter';

const ComparisonTable = ({ tools = [], selectedTools = [], onToolSelect, showAllFeatures = false }) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedForComparison, setSelectedForComparison] = useState(selectedTools || []);

  // Handle sorting
  const sortedTools = useMemo(() => {
    return [...tools].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle pricing sort
      if (sortBy === 'pricing') {
        aValue = a.pricing?.[0]?.price_per_month || 0;
        bValue = b.pricing?.[0]?.price_per_month || 0;
      }

      // Handle rating sort 
      if (sortBy === 'rating') {
        aValue = a.schema?.aggregateRating?.ratingValue || 0;
        bValue = b.schema?.aggregateRating?.ratingValue || 0;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [tools, sortBy, sortOrder]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleToolSelection = (tool) => {
    const isSelected = selectedForComparison.find(t => t.id === tool.id);
    let newSelection;

    if (isSelected) {
      newSelection = selectedForComparison.filter(t => t.id !== tool.id);
    } else if (selectedForComparison.length < 3) {
      newSelection = [...selectedForComparison, tool];
    } else {
      // Replace the first tool if we have 3 already
      newSelection = [selectedForComparison[1], selectedForComparison[2], tool];
    }

    setSelectedForComparison(newSelection);
    if (onToolSelect) {
      onToolSelect(newSelection);
    }
  };

  const formatPrice = (tool) => {
    const pricing = tool.pricing?.[0];
    if (!pricing) return 'Contact for pricing';
    
    if (pricing.price_per_month === 0) return 'Free';
    return `$${pricing.price_per_month}/month`;
  };

  const getFeatureCount = (tool) => {
    return (tool.features?.length || 0) + (tool.overview?.integrations?.length || 0);
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  if (!tools || tools.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500">No tools available for comparison</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Tools Comparison</h2>
        <p className="text-gray-600 mb-4">
          Compare features, pricing, and ratings. Select up to 3 tools for side-by-side comparison.
        </p>
        
        {selectedForComparison.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium text-gray-700">Selected for comparison:</span>
            {selectedForComparison.map(tool => (
              <span
                key={tool.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {tool.name}
                <button
                  onClick={() => handleToolSelection(tool)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                Tool <SortIcon column="name" />
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('pricing')}
              >
                Pricing <SortIcon column="pricing" />
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('rating')}
              >
                Rating <SortIcon column="rating" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Features
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedTools.map((tool, index) => {
              const isSelected = selectedForComparison.find(t => t.id === tool.id);
              return (
                <tr key={tool.id} className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={!!isSelected}
                      onChange={() => handleToolSelection(tool)}
                      disabled={!isSelected && selectedForComparison.length >= 3}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        className="h-10 w-10 rounded-lg object-contain" 
                        src={tool.logo || '/images/tools/placeholder-logo.svg'} 
                        alt={`${tool.name} logo`}
                        onError={(e) => {
                          e.target.src = '/images/tools/placeholder-logo.svg';
                        }}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{tool.name}</div>
                        <div className="text-sm text-gray-500">{tool.overview?.developer}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatPrice(tool)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 mr-1">
                        {tool.schema?.aggregateRating?.ratingValue || 'N/A'}
                      </span>
                      {tool.schema?.aggregateRating?.ratingValue && (
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i}>
                              {i < Math.floor(tool.schema.aggregateRating.ratingValue) ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {showAllFeatures ? (
                        <ul className="list-disc list-inside space-y-1">
                          {(tool.features || []).slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="text-xs">{feature}</li>
                          ))}
                          {tool.features && tool.features.length > 3 && (
                            <li className="text-xs text-gray-500">+{tool.features.length - 3} more</li>
                          )}
                        </ul>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {getFeatureCount(tool)} features
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {tool.overview?.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a
                      href={tool.affiliate_link || tool.overview?.website || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Visit Site
                    </a>
                    <a
                      href={`/tools/${tool.slug}`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Details
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedForComparison.length >= 2 && (
        <div className="px-6 py-4 bg-gray-50 border-t">
          <button
            onClick={() => {
              // Navigate to detailed comparison page
              const toolSlugs = selectedForComparison.map(t => t.slug).join('-vs-');
              window.location.href = `/compare/${toolSlugs}`;
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Compare Selected Tools ({selectedForComparison.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default ComparisonTable;