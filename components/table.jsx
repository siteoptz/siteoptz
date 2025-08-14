import React, { useState, useMemo } from 'react';

const ComparisonTable = ({ tools, comparisonPoints = [] }) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [showDifferences, setShowDifferences] = useState(false);

  // Default comparison points if none provided
  const defaultPoints = [
    'Starting Price',
    'Free Plan',
    'Key Features',
    'Best For',
    'Rating',
    'Pros',
    'Cons'
  ];

  const points = comparisonPoints.length > 0 ? comparisonPoints : defaultPoints;

  // Get all unique features across tools for filtering
  const allFeatures = useMemo(() => {
    const features = new Set();
    tools.forEach(tool => {
      tool.key_features?.forEach(feature => features.add(feature));
    });
    return Array.from(features);
  }, [tools]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleFeatureFilter = (feature) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const filteredAndSortedTools = useMemo(() => {
    let filtered = [...tools];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tool => 
        tool.tool_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.key_features?.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by selected features
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(tool =>
        selectedFeatures.every(feature =>
          tool.key_features?.some(toolFeature =>
            toolFeature.toLowerCase().includes(feature.toLowerCase())
          )
        )
      );
    }

    // Sort tools
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.tool_name;
          bValue = b.tool_name;
          break;
        case 'price':
          aValue = parseFloat(a.pricing.basic?.match(/\$(\d+(?:\.\d+)?)/)?.[1] || '999');
          bValue = parseFloat(b.pricing.basic?.match(/\$(\d+(?:\.\d+)?)/)?.[1] || '999');
          break;
        case 'rating':
          aValue = 4.5; // Default rating
          bValue = 4.5;
          break;
        case 'features':
          aValue = a.key_features?.length || 0;
          bValue = b.key_features?.length || 0;
          break;
        default:
          aValue = a.tool_name;
          bValue = b.tool_name;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [tools, sortBy, sortOrder, searchTerm, selectedFeatures]);

  const getToolValue = (tool, point) => {
    switch (point.toLowerCase()) {
      case 'starting price':
        return tool.pricing.basic?.split(' - ')[1]?.split(' - ')[0] || 'Custom';
      case 'free plan':
        return tool.pricing.free === 'No free plan available' ? '❌' : '✅';
      case 'key features':
        return tool.key_features?.slice(0, 3).join(', ') + '...';
      case 'best for':
        return tool.description?.split(' ').slice(-3).join(' ') || 'General use';
      case 'rating':
        return '⭐⭐⭐⭐⭐ (4.5/5)';
      case 'pros':
        return 'High quality, Easy to use, Good support';
      case 'cons':
        return 'Can be expensive, Learning curve';
      default:
        return 'N/A';
    }
  };

  const isFeatureDifferent = (feature) => {
    if (!showDifferences) return false;
    
    const toolValues = filteredAndSortedTools.map(tool => 
      tool.key_features?.some(toolFeature =>
        toolFeature.toLowerCase().includes(feature.toLowerCase())
      )
    );
    
    return !toolValues.every(val => val === toolValues[0]);
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with controls */}
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Detailed Comparison</h2>
            <p className="text-gray-600 mt-2">Compare features, pricing, and capabilities</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                aria-label="Search tools"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Show Differences Toggle */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDifferences}
                onChange={(e) => setShowDifferences(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                aria-label="Highlight differences between tools"
              />
              <span className="text-sm text-gray-700">Show differences</span>
            </label>
          </div>
        </div>

        {/* Feature Filters */}
        {allFeatures.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by features:</h3>
            <div className="flex flex-wrap gap-2">
              {allFeatures.slice(0, 8).map((feature) => (
                <button
                  key={feature}
                  onClick={() => handleFeatureFilter(feature)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    selectedFeatures.includes(feature)
                      ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-pressed={selectedFeatures.includes(feature)}
                >
                  {feature}
                </button>
              ))}
              {allFeatures.length > 8 && (
                <span className="px-3 py-1 text-xs text-gray-500">
                  +{allFeatures.length - 8} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Results count */}
      <div className="px-6 py-2 bg-gray-50 border-b">
        <p className="text-sm text-gray-600">
          Showing {filteredAndSortedTools.length} of {tools.length} tools
          {searchTerm && ` matching &quot;${searchTerm}&quot;`}
          {selectedFeatures.length > 0 && ` with selected features`}
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full" role="table" aria-label="AI tools comparison table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                  aria-label={`Sort by name ${sortBy === 'name' ? (sortOrder === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                >
                  <span>Tool</span>
                  <span aria-hidden="true">{getSortIcon('name')}</span>
                </button>
              </th>
              {points.map((point, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort(point.toLowerCase().replace(/\s+/g, '_'))}
                    className="flex items-center space-x-1 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                    aria-label={`Sort by ${point} ${sortBy === point.toLowerCase().replace(/\s+/g, '_') ? (sortOrder === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                  >
                    <span>{point}</span>
                    <span aria-hidden="true">{getSortIcon(point.toLowerCase().replace(/\s+/g, '_'))}</span>
                  </button>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedTools.map((tool, index) => (
              <tr key={tool.tool_name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm" aria-hidden="true">
                          {tool.tool_name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{tool.tool_name}</div>
                      <div className="text-sm text-gray-500">
                        {tool.description?.substring(0, 60)}...
                      </div>
                    </div>
                  </div>
                </td>
                {points.map((point, pointIndex) => {
                  const value = getToolValue(tool, point);
                  const isDifferent = showDifferences && isFeatureDifferent(point);
                  
                  return (
                    <td 
                      key={pointIndex} 
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                        isDifferent ? 'bg-yellow-50 border-l-4 border-yellow-400' : ''
                      }`}
                    >
                      {value}
                    </td>
                  );
                })}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <a
                      href={`/compare/${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md text-xs transition-colors"
                      aria-label={`Read full review of ${tool.tool_name}`}
                    >
                      Review
                    </a>
                    <a
                      href={tool.website_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded-md text-xs transition-colors"
                      aria-label={`Visit ${tool.tool_name} website`}
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

      {/* No results message */}
      {filteredAndSortedTools.length === 0 && (
        <div className="px-6 py-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tools found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedFeatures([]);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonTable;
