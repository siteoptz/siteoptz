import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight, CheckCircle } from 'lucide-react';

interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    slug: string;
    logo: string;
    overview: {
      description: string;
      category?: string;
    };
    features?: string[];
    pricing?: Array<{
      plan: string;
      price_per_month: number;
    }>;
    schema?: {
      aggregateRating?: {
        ratingValue: number;
        reviewCount: number;
      };
    };
  };
  featured?: boolean;
}

/**
 * Semantic HTML Tool Card Component
 * Uses article element for self-contained content
 * Includes proper heading hierarchy and ARIA labels
 */
const SemanticToolCard: React.FC<ToolCardProps> = ({ tool, featured = false }) => {
  const rating = tool.schema?.aggregateRating?.ratingValue || 0;
  const reviewCount = tool.schema?.aggregateRating?.reviewCount || 0;
  const lowestPrice = tool.pricing?.reduce((min, p) => 
    p.price_per_month < min ? p.price_per_month : min, 
    tool.pricing[0]?.price_per_month || 0
  ) || 0;

  return (
    <article 
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${
        featured ? 'ring-2 ring-blue-500' : ''
      }`}
      aria-label={`${tool.name} tool card`}
    >
      {featured && (
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold text-center py-1">
          FEATURED
        </div>
      )}
      
      <div className="p-6">
        {/* Tool Header with Logo and Name */}
        <header className="flex items-start space-x-4 mb-4">
          <figure className="flex-shrink-0">
            <Image
              src={tool.logo}
              alt={`${tool.name} logo`}
              width={48}
              height={48}
              className="rounded-lg object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/tools/placeholder-logo.svg';
              }}
            />
          </figure>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">
              <Link 
                href={`/tools/${tool.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {tool.name}
              </Link>
            </h3>
            
            {tool.overview.category && (
              <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {tool.overview.category}
              </span>
            )}
          </div>
        </header>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tool.overview.description}
        </p>

        {/* Rating Section */}
        {rating > 0 && (
          <div className="flex items-center mb-4" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.floor(rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {rating.toFixed(1)} ({reviewCount.toLocaleString()} reviews)
            </span>
          </div>
        )}

        {/* Features List */}
        {tool.features && tool.features.length > 0 && (
          <section aria-labelledby={`${tool.id}-features`}>
            <h4 id={`${tool.id}-features`} className="sr-only">Key Features</h4>
            <ul className="space-y-2 mb-4">
              {tool.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Pricing Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            {lowestPrice === 0 ? (
              <span className="text-green-600 font-semibold">Free</span>
            ) : (
              <div>
                <span className="text-gray-500 text-sm">From</span>
                <span className="text-lg font-bold text-gray-900 ml-1">
                  ${lowestPrice}/mo
                </span>
              </div>
            )}
          </div>
          
          <Link
            href={`/tools/${tool.slug}`}
            className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label={`View details for ${tool.name}`}
          >
            View Details
            <ArrowRight className="ml-1 w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SemanticToolCard;