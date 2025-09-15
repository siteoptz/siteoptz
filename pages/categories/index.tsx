import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { toolCategories } from '../../config/categories';
import { loadUnifiedToolsData } from '../../utils/unifiedDataAdapter';
import fs from 'fs';
import path from 'path';

interface CategoryData {
  name: string;
  slug: string;
  toolCount: number;
  description: string;
  icon: string;
}

interface Tool {
  id: string;
  slug: string;
  name: string;
  logo: string;
  category: string;
  overview: {
    description: string;
  };
  rating: number;
  features: string[];
  pricing: Array<{
    plan: string;
    price_per_month: number;
  }>;
}

interface CategoriesPageProps {
  categories: CategoryData[];
  totalTools: number;
  featuredTools: Tool[];
}


export const getStaticProps: GetStaticProps = async () => {
  // Load tools directly from aiToolsData.json
  const allTools = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data/aiToolsData.json'), 'utf8'));
  
  // Create category data with tool counts
  const categoriesWithData = toolCategories.map(categoryName => {
    const toolsInCategory = allTools.filter((tool: any) => 
      tool.overview?.category === categoryName
    );
    
    return {
      name: categoryName,
      slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      toolCount: toolsInCategory.length,
      description: `Explore ${categoryName} AI tools`,
      icon: categoryName
    };
  });

  // Sort by tool count (descending)
  categoriesWithData.sort((a, b) => b.toolCount - a.toolCount);

  // Transform tools for the top-rated section
  const featuredTools = allTools.map((tool: any) => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    logo: tool.logo,
    category: tool.overview?.category || 'AI Tool',
    overview: {
      description: tool.overview?.description || ''
    },
    rating: tool.rating || 4.5,
    features: tool.features || [],
    pricing: tool.pricing || []
  }));

  return {
    props: {
      categories: categoriesWithData,
      totalTools: allTools.length,
      featuredTools
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default function CategoriesPage({ categories, totalTools, featuredTools }: CategoriesPageProps) {

  return (
    <>
      <Head>
        <title>AI Tool Categories | Browse by Category | SiteOptz</title>
        <meta name="description" content="Explore AI tools organized by category. Find the perfect AI solution for content creation, voice generation, SEO, development, and more." />
        <meta name="keywords" content="ai tool categories, ai software categories, content creation ai, voice ai tools, seo ai tools, development ai" />
        <link rel="canonical" href="https://siteoptz.ai/categories" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Tool Categories | SiteOptz" />
        <meta property="og:description" content="Browse {totalTools} AI tools across {categories.length} categories" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/categories" />
        
        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "AI Tool Categories",
              "description": `Browse ${totalTools} AI tools across ${categories.length} categories`,
              "url": "https://siteoptz.ai/categories",
              "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": categories.length,
                "itemListElement": categories.map((category, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "url": `https://siteoptz.ai/categories/${category.slug}`,
                  "name": category.name,
                  "description": category.description
                }))
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                AI Tool Categories
              </h1>
              <p className="text-2xl font-semibold text-cyan-400 mb-6">
                Turning AI Into ROI
              </p>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Browse {totalTools} AI tools across {categories.length} categories. 
                Find the perfect AI solution for your specific needs.
              </p>
            </div>


            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">{categories.length}</div>
                <div className="text-gray-300">Categories</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{totalTools}</div>
                <div className="text-gray-300">Total Tools</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {Math.round(totalTools / categories.length)}
                </div>
                <div className="text-gray-300">Avg Tools/Category</div>
              </div>
            </div>

            {/* Top-Rated AI Tools Section */}
            {(() => {
              // Group tools by category
              const toolsByCategory = featuredTools.reduce((acc: any, tool: Tool) => {
                const category = tool.category || 'Other';
                if (!acc[category]) acc[category] = [];
                acc[category].push(tool);
                return acc;
              }, {});

              return (
                <div className="mb-16">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">
                      Top-Rated AI Tools
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                      Discover all {featuredTools.length} AI tools across 13+ categories, used by millions of professionals worldwide.
                    </p>
                  </div>

                  {Object.entries(toolsByCategory).map(([category, tools]: [string, any]) => (
                    <div key={category} className="mb-16">
                      <div className="flex items-center mb-8">
                        <h3 className="text-2xl font-bold text-white">{category.startsWith('Best') ? category : `Best ${category} AI Tools`}</h3>
                        <span className="ml-3 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                          {tools.length} tools
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {tools.slice(0, 4).map((tool: any) => (
                          <div key={tool.id} className="bg-black border border-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:border-gray-600 p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-lg border border-gray-700 flex items-center justify-center bg-gray-900">
                                {tool.logo ? (
                                  <img 
                                    src={tool.logo} 
                                    alt={`${tool.name} logo`}
                                    className="w-8 h-8 object-contain"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                      if (fallback) fallback.style.display = 'block';
                                    }}
                                  />
                                ) : null}
                                <span 
                                  className="text-xs font-bold text-gray-400"
                                  style={{ display: tool.logo ? 'none' : 'block' }}
                                >
                                  {tool.name.charAt(0)}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-lg font-semibold text-white truncate">{tool.name}</h4>
                                <div className="flex items-center gap-1">
                                  <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                  </svg>
                                  <span className="text-xs font-medium text-gray-400">
                                    {tool.rating}/5
                                  </span>
                                </div>
                              </div>
                            </div>

                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                              {tool.overview?.description}
                            </p>

                            <div className="flex items-center justify-between mb-4">
                              <div className="text-sm font-bold text-white">
                                {(() => {
                                  const plan = tool.pricing?.[0];
                                  if (!plan) return 'Free';
                                  
                                  if (plan.price_per_month === 0) {
                                    return 'Free';
                                  } else {
                                    return `$${plan.price_per_month}/mo`;
                                  }
                                })()}
                              </div>
                              <span className="px-2 py-1 bg-gray-900 text-gray-300 text-xs rounded-full border border-gray-700">
                                {tool.features?.length || 0} features
                              </span>
                            </div>

                            <Link 
                              href={`/reviews/${tool.slug}`}
                              className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                              View Details
                            </Link>
                          </div>
                        ))}
                      </div>
                      
                      {tools.length > 4 && (
                        <div className="text-center mt-8">
                          <Link 
                            href={`/tools/?category=${encodeURIComponent(category)}`}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            See All {tools.length} {category.endsWith('Tools') || category.endsWith('tools') ? category : `${category} Tools`}
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="text-center mt-12">
                    <Link 
                      href="/tools"
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Explore All {featuredTools.length} Tools
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })()}

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Can&apos;t find what you&apos;re looking for?
                </h2>
                <p className="text-gray-300 mb-6">
                  Browse all {totalTools} AI tools or use our comparison tool to find the perfect match
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/tools"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Browse All Tools
                  </Link>
                  <Link
                    href="/compare"
                    className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transform hover:scale-105 transition-all duration-200 border border-gray-600"
                  >
                    Compare Tools
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}