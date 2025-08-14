import { useState, useMemo } from 'react';
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
}

interface ComparisonTableProps {
  toolA: Tool;
  toolB: Tool;
  showAllFeatures: boolean;
}

type SortField = 'feature' | 'toolA' | 'toolB' | 'winner';
type SortDirection = 'asc' | 'desc';

interface ComparisonRow {
  feature: string;
  toolA: string | boolean;
  toolB: string | boolean;
  winner: 'toolA' | 'toolB' | 'tie';
  category: string;
}

export default function ComparisonTable({ toolA, toolB, showAllFeatures }: ComparisonTableProps) {
  const [sortField, setSortField] = useState<SortField>('feature');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Generate comparison data
  const comparisonData = useMemo(() => {
    const rows: ComparisonRow[] = [];

    // Basic Info
    rows.push({
      feature: 'Starting Price',
      toolA: toolA.pricing.plans[0]?.price || 'Custom',
      toolB: toolB.pricing.plans[0]?.price || 'Custom',
      winner: determineWinner('pricing', toolA.pricing.plans[0]?.price, toolB.pricing.plans[0]?.price),
      category: 'pricing'
    });

    rows.push({
      feature: 'Free Plan Available',
      toolA: toolA.pricing.plans.some(plan => plan.price.includes('$0')),
      toolB: toolB.pricing.plans.some(plan => plan.price.includes('$0')),
      winner: 'tie',
      category: 'pricing'
    });

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
      const hasToolA = [...toolA.features.core, ...toolA.features.advanced, ...toolA.features.integrations].includes(feature);
      const hasToolB = [...toolB.features.core, ...toolB.features.advanced, ...toolB.features.integrations].includes(feature);
      
      rows.push({
        feature: feature,
        toolA: hasToolA,
        toolB: hasToolB,
        winner: hasToolA && hasToolB ? 'tie' : hasToolA ? 'toolA' : 'toolB',
        category: 'features'
      });
    });

    // Pros/Cons as features
    rows.push({
      feature: 'Number of Pros',
      toolA: toolA.pros.length.toString(),
      toolB: toolB.pros.length.toString(),
      winner: toolA.pros.length > toolB.pros.length ? 'toolA' : 
              toolB.pros.length > toolA.pros.length ? 'toolB' : 'tie',
      category: 'analysis'
    });

    rows.push({
      feature: 'Number of Cons',
      toolA: toolA.cons.length.toString(),
      toolB: toolB.cons.length.toString(),
      winner: toolA.cons.length < toolB.cons.length ? 'toolA' : 
              toolB.cons.length < toolA.cons.length ? 'toolB' : 'tie',
      category: 'analysis'
    });

    // Ratings
    rows.push({
      feature: 'User Rating',
      toolA: `${toolA.rating}/5 ⭐`,
      toolB: `${toolB.rating}/5 ⭐`,
      winner: toolA.rating > toolB.rating ? 'toolA' : 
              toolB.rating > toolA.rating ? 'toolB' : 'tie',
      category: 'reviews'
    });

    rows.push({
      feature: 'Number of Reviews',
      toolA: toolA.review_count.toLocaleString(),
      toolB: toolB.review_count.toLocaleString(),
      winner: toolA.review_count > toolB.review_count ? 'toolA' : 
              toolB.review_count > toolA.review_count ? 'toolB' : 'tie',
      category: 'reviews'
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

      // Convert boolean to string for comparison
      if (typeof aValue === 'boolean') aValue = aValue.toString();
      if (typeof bValue === 'boolean') bValue = bValue.toString();

      const comparison = aValue.toString().localeCompare(bValue.toString());
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortField, sortDirection]);

  function determineWinner(type: string, valueA: string | undefined, valueB: string | undefined): 'toolA' | 'toolB' | 'tie' {
    if (!valueA || !valueB) return 'tie';
    
    if (type === 'pricing') {
      const priceA = parseFloat(valueA.replace(/[^0-9.]/g, ''));
      const priceB = parseFloat(valueB.replace(/[^0-9.]/g, ''));
      
      if (isNaN(priceA) || isNaN(priceB)) return 'tie';
      return priceA < priceB ? 'toolA' : priceB < priceA ? 'toolB' : 'tie';
    }
    
    return 'tie';
  }

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }

  function renderCellValue(value: string | boolean, winner: 'toolA' | 'toolB' | 'tie', isToolA: boolean) {
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
    
    const isWinner = (winner === 'toolA' && isToolA) || (winner === 'toolB' && !isToolA);
    
    return (
      <div className={`flex items-center justify-center ${isWinner ? 'font-semibold text-green-700' : ''}`}>
        {value}
        {isWinner && (
          <svg className="w-4 h-4 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    );
  }

  function getSortIcon(field: SortField) {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
        </svg>
      );
    }

    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Summary Stats */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{sortedData.length}</div>
            <div className="text-sm text-gray-600">Features Compared</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {sortedData.filter(row => row.winner === 'toolA').length}
            </div>
            <div className="text-sm text-gray-600">{toolA.tool_name} Wins</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {sortedData.filter(row => row.winner === 'toolB').length}
            </div>
            <div className="text-sm text-gray-600">{toolB.tool_name} Wins</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('feature')}
              >
                <div className="flex items-center">
                  Feature
                  {getSortIcon('feature')}
                </div>
              </th>
              
              <th 
                className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('toolA')}
              >
                <div className="flex items-center justify-center">
                  <Image
                    src={toolA.logo_url}
                    alt={`${toolA.tool_name} feature comparison table logo`}
                    width={24}
                    height={24}
                    className="w-6 h-6 mr-2"
                  />
                  {toolA.tool_name}
                  {getSortIcon('toolA')}
                </div>
              </th>
              
              <th 
                className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('toolB')}
              >
                <div className="flex items-center justify-center">
                  <Image
                    src={toolB.logo_url}
                    alt={`${toolB.tool_name} feature comparison table logo`}
                    width={24}
                    height={24}
                    className="w-6 h-6 mr-2"
                  />
                  {toolB.tool_name}
                  {getSortIcon('toolB')}
                </div>
              </th>
              
              <th 
                className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('winner')}
              >
                <div className="flex items-center justify-center">
                  Winner
                  {getSortIcon('winner')}
                </div>
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.feature}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {renderCellValue(row.toolA, row.winner, true)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {renderCellValue(row.toolB, row.winner, false)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {row.winner === 'tie' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Tie
                    </span>
                  ) : row.winner === 'toolA' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {toolA.tool_name}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {toolB.tool_name}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!showAllFeatures && (
        <div className="bg-blue-50 px-6 py-4 border-t">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Showing only key differences. Toggle to &quot;All Features&quot; to see complete comparison.
          </p>
        </div>
      )}
    </div>
  );
}