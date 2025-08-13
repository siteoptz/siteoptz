import { useState, useMemo } from 'react';
import Image from 'next/image';

/**
 * Interactive sortable comparison table component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Comparison table component
 */
export default function ComparisonTable({ 
  toolA, 
  toolB, 
  showAllFeatures = true,
  className = '' 
}) {
  const [sortField, setSortField] = useState('feature');
  const [sortDirection, setSortDirection] = useState('asc');

  // Generate comparison data
  const comparisonData = useMemo(() => {
    const rows = [];

    // Basic Information
    rows.push(
      {
        feature: 'Vendor',
        toolA: toolA.vendor,
        toolB: toolB.vendor,
        winner: 'tie',
        category: 'basic'
      },
      {
        feature: 'Category',
        toolA: toolA.category,
        toolB: toolB.category,
        winner: 'tie',
        category: 'basic'
      },
      {
        feature: 'Starting Price',
        toolA: formatPrice(toolA.pricing.startingPrice, toolA.pricing.freeTier),
        toolB: formatPrice(toolB.pricing.startingPrice, toolB.pricing.freeTier),
        winner: determineWinner('pricing', toolA.pricing.startingPrice, toolB.pricing.startingPrice),
        category: 'pricing'
      },
      {
        feature: 'Free Tier Available',
        toolA: toolA.pricing.freeTier,
        toolB: toolB.pricing.freeTier,
        winner: toolA.pricing.freeTier === toolB.pricing.freeTier ? 'tie' : 
                toolA.pricing.freeTier ? 'toolA' : 'toolB',
        category: 'pricing'
      },
      {
        feature: 'User Rating',
        toolA: `${toolA.rating}/5 ⭐`,
        toolB: `${toolB.rating}/5 ⭐`,
        winner: determineWinner('rating', toolA.rating, toolB.rating),
        category: 'reviews'
      },
      {
        feature: 'Review Count',
        toolA: toolA.reviewCount?.toLocaleString() || 'N/A',
        toolB: toolB.reviewCount?.toLocaleString() || 'N/A',
        winner: determineWinner('reviewCount', toolA.reviewCount, toolB.reviewCount),
        category: 'reviews'
      }
    );

    // Features comparison
    const allFeatures = Array.from(new Set([
      ...toolA.features.core,
      ...toolA.features.advanced,
      ...toolA.features.integrations,
      ...toolB.features.core,
      ...toolB.features.advanced,
      ...toolB.features.integrations
    ]));
    
    allFeatures.forEach(feature => {
      const hasToolA = [...toolA.features.core, ...toolA.features.advanced, ...toolA.features.integrations]
        .some(f => f.toLowerCase() === feature.toLowerCase());
      const hasToolB = [...toolB.features.core, ...toolB.features.advanced, ...toolB.features.integrations]
        .some(f => f.toLowerCase() === feature.toLowerCase());
      
      rows.push({
        feature: feature,
        toolA: hasToolA,
        toolB: hasToolB,
        winner: hasToolA && hasToolB ? 'tie' : hasToolA ? 'toolA' : hasToolB ? 'toolB' : 'tie',
        category: 'features'
      });
    });

    // Use cases comparison
    const allUseCases = Array.from(new Set([...toolA.useCases, ...toolB.useCases]));
    allUseCases.forEach(useCase => {
      const hasToolA = toolA.useCases.includes(useCase);
      const hasToolB = toolB.useCases.includes(useCase);
      
      rows.push({
        feature: `Use Case: ${useCase}`,
        toolA: hasToolA,
        toolB: hasToolB,
        winner: hasToolA && hasToolB ? 'tie' : hasToolA ? 'toolA' : hasToolB ? 'toolB' : 'tie',
        category: 'usecases'
      });
    });

    // Target audience comparison
    const allAudiences = Array.from(new Set([...toolA.targetAudience, ...toolB.targetAudience]));
    allAudiences.forEach(audience => {
      const hasToolA = toolA.targetAudience.includes(audience);
      const hasToolB = toolB.targetAudience.includes(audience);
      
      rows.push({
        feature: `Target: ${audience}`,
        toolA: hasToolA,
        toolB: hasToolB,
        winner: hasToolA && hasToolB ? 'tie' : hasToolA ? 'toolA' : hasToolB ? 'toolB' : 'tie',
        category: 'audience'
      });
    });

    return rows;
  }, [toolA, toolB]);

  // Filter data based on showAllFeatures
  const filteredData = useMemo(() => {
    if (showAllFeatures) {
      return comparisonData;
    }
    
    // Show only key differences (where tools differ)
    return comparisonData.filter(row => row.winner !== 'tie');
  }, [comparisonData, showAllFeatures]);

  // Sort data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle boolean values
      if (typeof aValue === 'boolean') aValue = aValue.toString();
      if (typeof bValue === 'boolean') bValue = bValue.toString();

      const comparison = aValue.toString().localeCompare(bValue.toString());
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortField, sortDirection]);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get category stats
  const categoryStats = useMemo(() => {
    const stats = {
      toolA: { wins: 0, features: 0 },
      toolB: { wins: 0, features: 0 },
      ties: 0
    };

    sortedData.forEach(row => {
      if (row.winner === 'toolA') stats.toolA.wins++;
      else if (row.winner === 'toolB') stats.toolB.wins++;
      else stats.ties++;

      if (row.category === 'features') {
        if (row.toolA === true) stats.toolA.features++;
        if (row.toolB === true) stats.toolB.features++;
      }
    });

    return stats;
  }, [sortedData]);

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Summary Stats */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{sortedData.length}</div>
            <div className="text-sm text-gray-600">Items Compared</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{categoryStats.toolA.wins}</div>
            <div className="text-sm text-gray-600">{toolA.name} Wins</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{categoryStats.toolB.wins}</div>
            <div className="text-sm text-gray-600">{toolB.name} Wins</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-600">{categoryStats.ties}</div>
            <div className="text-sm text-gray-600">Ties</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('feature')}
              >
                <div className="flex items-center">
                  Feature
                  <SortIcon field="feature" currentField={sortField} direction={sortDirection} />
                </div>
              </th>
              
              <th 
                className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('toolA')}
              >
                <div className="flex items-center justify-center">
                  <Image
                    src={toolA.logo}
                    alt={`${toolA.name} feature comparison table logo`}
                    width={24}
                    height={24}
                    className="w-6 h-6 mr-2"
                  />
                  {toolA.name}
                  <SortIcon field="toolA" currentField={sortField} direction={sortDirection} />
                </div>
              </th>
              
              <th 
                className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('toolB')}
              >
                <div className="flex items-center justify-center">
                  <Image
                    src={toolB.logo}
                    alt={`${toolB.name} feature comparison table logo`}
                    width={24}
                    height={24}
                    className="w-6 h-6 mr-2"
                  />
                  {toolB.name}
                  <SortIcon field="toolB" currentField={sortField} direction={sortDirection} />
                </div>
              </th>
              
              <th 
                className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('winner')}
              >
                <div className="flex items-center justify-center">
                  Winner
                  <SortIcon field="winner" currentField={sortField} direction={sortDirection} />
                </div>
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">{row.feature}</span>
                    <CategoryBadge category={row.category} />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <CellValue value={row.toolA} winner={row.winner} isWinner={row.winner === 'toolA'} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <CellValue value={row.toolB} winner={row.winner} isWinner={row.winner === 'toolB'} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <WinnerBadge winner={row.winner} toolA={toolA.name} toolB={toolB.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      {!showAllFeatures && (
        <div className="bg-blue-50 px-6 py-4 border-t">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Showing only key differences. Toggle to "All Features" to see complete comparison.
          </p>
        </div>
      )}
    </div>
  );
}

// Helper Components

function SortIcon({ field, currentField, direction }) {
  if (currentField !== field) {
    return (
      <svg className="w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
      </svg>
    );
  }

  return direction === 'asc' ? (
    <svg className="w-4 h-4 ml-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className="w-4 h-4 ml-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

function CategoryBadge({ category }) {
  const categoryColors = {
    basic: 'bg-gray-100 text-gray-800',
    pricing: 'bg-green-100 text-green-800',
    features: 'bg-blue-100 text-blue-800',
    reviews: 'bg-yellow-100 text-yellow-800',
    usecases: 'bg-purple-100 text-purple-800',
    audience: 'bg-pink-100 text-pink-800'
  };

  return (
    <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${categoryColors[category] || categoryColors.basic}`}>
      {category}
    </span>
  );
}

function CellValue({ value, winner, isWinner }) {
  if (typeof value === 'boolean') {
    return (
      <div className="flex justify-center">
        {value ? (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    );
  }
  
  return (
    <div className={`flex items-center justify-center ${isWinner ? 'font-semibold text-green-700' : ''}`}>
      {value}
      {isWinner && winner !== 'tie' && (
        <svg className="w-4 h-4 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  );
}

function WinnerBadge({ winner, toolA, toolB }) {
  if (winner === 'tie') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Tie
      </span>
    );
  }
  
  if (winner === 'toolA') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {toolA}
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
      {toolB}
    </span>
  );
}

// Helper Functions

function formatPrice(price, hasFreeTier) {
  if (hasFreeTier && (!price || price === 0)) {
    return 'Free';
  }
  if (!price || price === 0) {
    return 'Free';
  }
  if (typeof price === 'string') {
    return price;
  }
  return `$${price}/month`;
}

function determineWinner(type, valueA, valueB) {
  if (valueA === valueB) return 'tie';
  
  switch (type) {
    case 'pricing':
      // Lower price wins (but 0 only wins if both aren't free)
      if (valueA === 0 && valueB === 0) return 'tie';
      if (valueA === 0) return 'toolA';
      if (valueB === 0) return 'toolB';
      return valueA < valueB ? 'toolA' : 'toolB';
    
    case 'rating':
    case 'reviewCount':
      // Higher value wins
      return valueA > valueB ? 'toolA' : 'toolB';
    
    default:
      return 'tie';
  }
}