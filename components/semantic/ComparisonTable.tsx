import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, X, Info, ChevronUp, ChevronDown } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  slug: string;
  logo: string;
  features?: string[];
  pricing?: Array<{
    plan: string;
    price_per_month: number;
    features?: string[];
  }>;
  pros?: string[];
  cons?: string[];
  overview?: {
    description: string;
    category?: string;
    integrations?: string[];
  };
  schema?: {
    aggregateRating?: {
      ratingValue: number;
      reviewCount: number;
    };
  };
}

interface ComparisonTableProps {
  tools: Tool[];
  title?: string;
  showAllFeatures?: boolean;
}

/**
 * Semantic HTML Comparison Table Component
 * Uses proper table structure with caption, thead, tbody
 * Includes ARIA labels and proper scope attributes
 */
const SemanticComparisonTable: React.FC<ComparisonTableProps> = ({ 
  tools, 
  title = "Tool Comparison",
  showAllFeatures = false 
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Collect all unique features across tools
  const allFeatures = useMemo(() => {
    const featuresSet = new Set<string>();
    tools.forEach(tool => {
      tool.features?.forEach(feature => featuresSet.add(feature));
    });
    return Array.from(featuresSet);
  }, [tools]);

  // Collect all unique integrations
  const allIntegrations = useMemo(() => {
    const integrationsSet = new Set<string>();
    tools.forEach(tool => {
      tool.overview?.integrations?.forEach(integration => integrationsSet.add(integration));
    });
    return Array.from(integrationsSet);
  }, [tools]);

  if (tools.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No tools selected for comparison</p>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-lg shadow-lg overflow-hidden" aria-labelledby="comparison-table-title">
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
        <h2 id="comparison-table-title" className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-blue-100">Compare features, pricing, and capabilities side by side</p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full" role="table" aria-label="Tool comparison table">
          <caption className="sr-only">
            Detailed comparison of {tools.map(t => t.name).join(', ')}
          </caption>
          
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                Feature
              </th>
              {tools.map(tool => (
                <th key={tool.id} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                  <div className="flex flex-col items-center space-y-2">
                    <Image
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      width={40}
                      height={40}
                      className="rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/tools/placeholder-logo.svg';
                      }}
                    />
                    <span className="text-sm font-semibold text-gray-900">{tool.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {/* Basic Information Section */}
            <tr>
              <th 
                scope="row" 
                colSpan={tools.length + 1} 
                className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-50"
              >
                <button
                  onClick={() => toggleSection('basic')}
                  className="flex items-center justify-between w-full text-left"
                  aria-expanded={expandedSections.basic !== false}
                  aria-controls="basic-info-section"
                >
                  <span>Basic Information</span>
                  {expandedSections.basic === false ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </button>
              </th>
            </tr>
            
            {expandedSections.basic !== false && (
              <>
                {/* Description */}
                <tr id="basic-info-section">
                  <th scope="row" className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-white">
                    Description
                  </th>
                  {tools.map(tool => (
                    <td key={tool.id} className="px-6 py-4 text-sm text-gray-600 text-center">
                      {tool.overview?.description || 'No description available'}
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr>
                  <th scope="row" className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-white">
                    Category
                  </th>
                  {tools.map(tool => (
                    <td key={tool.id} className="px-6 py-4 text-sm text-center">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {tool.overview?.category || 'General'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <th scope="row" className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-white">
                    Rating
                  </th>
                  {tools.map(tool => (
                    <td key={tool.id} className="px-6 py-4 text-center">
                      {tool.schema?.aggregateRating ? (
                        <div>
                          <div className="text-lg font-bold text-gray-900">
                            {tool.schema.aggregateRating.ratingValue.toFixed(1)}
                          </div>
                          <div className="text-xs text-gray-500">
                            ({tool.schema.aggregateRating.reviewCount.toLocaleString()} reviews)
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">No ratings</span>
                      )}
                    </td>
                  ))}
                </tr>
              </>
            )}

            {/* Pricing Section */}
            <tr>
              <th 
                scope="row" 
                colSpan={tools.length + 1} 
                className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-50"
              >
                <button
                  onClick={() => toggleSection('pricing')}
                  className="flex items-center justify-between w-full text-left"
                  aria-expanded={expandedSections.pricing !== false}
                  aria-controls="pricing-section"
                >
                  <span>Pricing</span>
                  {expandedSections.pricing === false ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </button>
              </th>
            </tr>
            
            {expandedSections.pricing !== false && (
              <tr id="pricing-section">
                <th scope="row" className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-white">
                  Starting Price
                </th>
                {tools.map(tool => {
                  const lowestPrice = tool.pricing?.reduce((min, p) => 
                    p.price_per_month < min ? p.price_per_month : min, 
                    tool.pricing[0]?.price_per_month || 0
                  ) || 0;

                  return (
                    <td key={tool.id} className="px-6 py-4 text-center">
                      {lowestPrice === 0 ? (
                        <span className="text-green-600 font-semibold">Free</span>
                      ) : (
                        <div>
                          <span className="text-2xl font-bold text-gray-900">
                            ${lowestPrice}
                          </span>
                          <span className="text-gray-500">/month</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            )}

            {/* Features Section */}
            <tr>
              <th 
                scope="row" 
                colSpan={tools.length + 1} 
                className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-50"
              >
                <button
                  onClick={() => toggleSection('features')}
                  className="flex items-center justify-between w-full text-left"
                  aria-expanded={expandedSections.features !== false}
                  aria-controls="features-section"
                >
                  <span>Features</span>
                  {expandedSections.features === false ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </button>
              </th>
            </tr>
            
            {expandedSections.features !== false && (
              <>
                {(showAllFeatures ? allFeatures : allFeatures.slice(0, 10)).map((feature, index) => (
                  <tr key={`feature-${index}`} id={index === 0 ? "features-section" : undefined}>
                    <th scope="row" className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-white">
                      {feature}
                    </th>
                    {tools.map(tool => (
                      <td key={tool.id} className="px-6 py-4 text-center">
                        {tool.features?.includes(feature) ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" aria-label="Available" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" aria-label="Not available" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}

            {/* Pros and Cons Section */}
            <tr>
              <th 
                scope="row" 
                colSpan={tools.length + 1} 
                className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-50"
              >
                <button
                  onClick={() => toggleSection('proscons')}
                  className="flex items-center justify-between w-full text-left"
                  aria-expanded={expandedSections.proscons}
                  aria-controls="proscons-section"
                >
                  <span>Pros & Cons</span>
                  {expandedSections.proscons ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </th>
            </tr>
            
            {expandedSections.proscons && (
              <>
                <tr id="proscons-section">
                  <th scope="row" className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-white align-top">
                    Pros
                  </th>
                  {tools.map(tool => (
                    <td key={tool.id} className="px-6 py-4 text-sm">
                      <ul className="space-y-1">
                        {tool.pros?.slice(0, 3).map((pro, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">+</span>
                            <span className="text-gray-600">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                
                <tr>
                  <th scope="row" className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-white align-top">
                    Cons
                  </th>
                  {tools.map(tool => (
                    <td key={tool.id} className="px-6 py-4 text-sm">
                      <ul className="space-y-1">
                        {tool.cons?.slice(0, 3).map((con, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-500 mr-2">-</span>
                            <span className="text-gray-600">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </>
            )}

            {/* Actions */}
            <tr>
              <th scope="row" className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-white">
                Actions
              </th>
              {tools.map(tool => (
                <td key={tool.id} className="px-6 py-4 text-center">
                  <div className="space-y-2">
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Details
                    </Link>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SemanticComparisonTable;