import { GetStaticProps } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { loadUnifiedToolsData } from '../../utils/unifiedDataAdapter';
import fs from 'fs';
import path from 'path';

interface Tool {
  tool_name: string;
  slug?: string;
  category: string;
  description: string;
  logo_url: string;
  rating: number;
  pricing: {
    monthly: number | string;
  };
}

interface ReviewsIndexProps {
  initialReviews: Tool[];
  totalCount: number;
  categories: string[];
}

export default function ReviewsIndex({ initialReviews, totalCount, categories }: ReviewsIndexProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Client-side data loading
  const loadReviews = async (page = 1, category = 'All', search = '') => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '30',
        ...(category !== 'All' && { category }),
        ...(search && { search })
      });
      
      const response = await fetch(`/api/reviews?${params}`);
      const data = await response.json();
      
      setReviews(data.reviews);
      setCurrentPage(data.pagination.currentPage);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
    setIsLoading(false);
  };

  // Group reviews by category for display
  const reviewsByCategory = reviews.reduce((acc: any, review: Tool) => {
    const category = review.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(review);
    return acc;
  }, {});

  // Sort categories
  const sortedCategories = Object.keys(reviewsByCategory).sort();

  return (
    <>
      <Head>
        <title>AI Tool Reviews - Expert Analysis & Comparisons | SiteOptz</title>
        <meta name="description" content="Comprehensive reviews of the best AI tools for business. Expert analysis, pricing comparisons, pros & cons, and user guides for 2025." />
        <meta name="keywords" content="AI tool reviews, AI software reviews, artificial intelligence tools, AI tool comparison, best AI tools" />
        <link rel="canonical" href="https://siteoptz.ai/reviews" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI Tool Reviews & Analysis
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Expert reviews and comprehensive analysis of the best AI tools for business. 
              Compare features, pricing, and performance to make informed decisions.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-black border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{totalCount}</div>
              <div className="text-gray-400">Tools Reviewed</div>
            </div>
            <div className="bg-black border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{categories.length}</div>
              <div className="text-gray-400">Categories</div>
            </div>
            <div className="bg-black border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">4.5+</div>
              <div className="text-gray-400">Avg Rating</div>
            </div>
            <div className="bg-black border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">2025</div>
              <div className="text-gray-400">Updated</div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            </div>
          )}

          {/* Tools by Category */}
          {!isLoading && sortedCategories.map(category => (
            <div key={category} className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">{category}</h2>
                <span className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {reviewsByCategory[category].length} tools
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviewsByCategory[category].map((tool: Tool) => {
                  const toolSlug = tool.slug || tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                  return (
                    <Link key={tool.tool_name} href={`/reviews/${toolSlug}`}>
                      <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-all cursor-pointer group">
                        <div className="flex items-start justify-between mb-4">
                          <img 
                            src={tool.logo_url} 
                            alt={`${tool.tool_name} logo`}
                            className="w-12 h-12 rounded-lg"
                          />
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-gray-300 text-sm">{tool.rating}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                          {tool.tool_name}
                        </h3>
                        
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {tool.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="text-cyan-400 font-semibold">
                            {typeof tool.pricing.monthly === 'number' && tool.pricing.monthly === 0 ? 'Free' :
                             typeof tool.pricing.monthly === 'number' ? `$${tool.pricing.monthly}/mo` :
                             tool.pricing.monthly || 'Custom'}
                          </div>
                          <span className="text-cyan-400 text-sm group-hover:translate-x-1 transition-transform">
                            Read Review →
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* CTA Section */}
          <div className="bg-black border border-gray-800 rounded-xl p-8 text-center mt-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Our AI experts can help you find the perfect tool for your specific needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                Book Your Free AI Strategy Session
              </a>
              <Link href="/tools" className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all">
                Browse All Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allTools = loadUnifiedToolsData(fs, path);
  
  // Load only first 20 tools for initial SSR
  const initialReviews = allTools
    .slice(0, 20)
    .map((tool: any) => ({
      tool_name: tool.name || tool.tool_name,
      slug: tool.slug,
      category: tool.overview?.category || tool.category,
      description: tool.overview?.description || tool.description,
      logo_url: tool.logo || `/images/tools/${tool.slug}-logo.svg`,
      rating: tool.rating || 4.5,
      pricing: { monthly: tool.pricing?.[0]?.price_per_month || 0 }
    }));
  
  // Get unique categories
  const categories = [...new Set(allTools.map((tool: any) => tool.overview?.category || tool.category).filter(Boolean))].sort();
  
  return {
    props: {
      initialReviews,
      totalCount: allTools.length,
      categories
    }
  };
};