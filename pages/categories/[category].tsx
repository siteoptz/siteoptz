import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Tool {
  tool_name: string;
  vendor: string;
  description: string;
  logo_url?: string;
  rating?: number;
  pricing: {
    monthly?: number;
    yearly?: number;
    enterprise?: string;
  };
  free_trial?: boolean;
  category: string;
}

interface CategoryPageProps {
  category: string;
  categorySlug: string;
  tools: Tool[];
  totalCount: number;
}

export default function CategoryPage({ category, categorySlug, tools, totalCount }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'price'>('rating');
  const [filterFree, setFilterFree] = useState(false);

  // Sort tools based on selected criteria
  const sortedTools = [...tools].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.tool_name.localeCompare(b.tool_name);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'price':
        return (a.pricing.monthly || 999) - (b.pricing.monthly || 999);
      default:
        return 0;
    }
  });

  // Filter for free trials if selected
  const displayTools = filterFree 
    ? sortedTools.filter(t => t.free_trial)
    : sortedTools;

  // SEO schemas
  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category} AI Tools`,
    "description": `Comprehensive directory of ${category.toLowerCase()} AI tools. Compare features, pricing, and reviews.`,
    "url": `https://siteoptz.ai/categories/${categorySlug}`,
    "numberOfItems": totalCount,
    "hasPart": tools.map(tool => ({
      "@type": "SoftwareApplication",
      "name": tool.tool_name,
      "applicationCategory": category,
      "description": tool.description
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://siteoptz.ai"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Categories",
        "item": "https://siteoptz.ai/categories"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category,
        "item": `https://siteoptz.ai/categories/${categorySlug}`
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{category} AI Tools - Best {totalCount} {category} Tools in 2025 | SiteOptz</title>
        <meta 
          name="description" 
          content={`Discover the best ${totalCount} ${category.toLowerCase()} AI tools for 2025. Compare features, pricing, pros & cons. Find the perfect ${category.toLowerCase()} solution for your needs.`}
        />
        <meta 
          name="keywords" 
          content={`${category} AI tools, best ${category.toLowerCase()} tools 2025, AI ${category.toLowerCase()} software, ${category.toLowerCase()} automation`}
        />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${category} AI Tools - Best ${totalCount} Tools for 2025`} />
        <meta property="og:description" content={`Comprehensive directory of ${category.toLowerCase()} AI tools. Compare features and find the perfect solution.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://siteoptz.ai/categories/${categorySlug}`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        
        <link rel="canonical" href={`https://siteoptz.ai/categories/${categorySlug}`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-blue-100 text-sm">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><span className="mx-2">/</span></li>
                <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
                <li><span className="mx-2">/</span></li>
                <li className="text-white">{category}</li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {category} AI Tools
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Discover and compare the best {totalCount} {category.toLowerCase()} AI tools for 2025. 
                Find the perfect solution for your needs with detailed reviews, pricing, and comparisons.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl font-bold text-white">{totalCount}</div>
                  <div className="text-sm text-blue-100">Total Tools</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl font-bold text-white">
                    {tools.filter(t => t.free_trial).length}
                  </div>
                  <div className="text-sm text-blue-100">Free Trials</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl font-bold text-white">4.5</div>
                  <div className="text-sm text-blue-100">Avg Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters and Sorting */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filterFree}
                    onChange={(e) => setFilterFree(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <span className="text-gray-700">Free Trial Available</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="border rounded-lg px-3 py-2"
                >
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayTools.map((tool, index) => (
                <motion.div
                  key={tool.tool_name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border"
                >
                  <div className="p-6">
                    {/* Tool Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        {tool.logo_url && (
                          <img
                            src={tool.logo_url}
                            alt={`${tool.tool_name} logo`}
                            className="w-12 h-12 object-contain mr-3"
                            onError={(e) => {
                              e.currentTarget.src = '/images/tools/placeholder-logo.svg';
                            }}
                          />
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900">{tool.tool_name}</h3>
                          <p className="text-sm text-gray-500">{tool.vendor}</p>
                        </div>
                      </div>
                      {tool.free_trial && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Free Trial
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {tool.description}
                    </p>

                    {/* Rating and Price */}
                    <div className="flex items-center justify-between mb-4">
                      {tool.rating && (
                        <div className="flex items-center">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(tool.rating!) ? 'fill-current' : 'fill-gray-300'}`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-sm text-gray-600">{tool.rating}</span>
                        </div>
                      )}
                      <div className="text-right">
                        <div className="text-sm text-gray-500">From</div>
                        <div className="font-semibold text-gray-900">
                          {tool.pricing.monthly 
                            ? `$${tool.pricing.monthly}/mo`
                            : 'Custom'}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/reviews/${tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                        className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        View Review
                      </Link>
                      <Link
                        href={`/tools/${tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                        className="flex-1 text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Can't Find the Right {category} Tool?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our AI experts can help you choose the perfect {category.toLowerCase()} solution for your specific needs.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Personalized Recommendations
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fs = require('fs');
  const path = require('path');
  
  const summaryData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data/summary.json'), 'utf8')
  );
  
  const paths = summaryData.categories.map((cat: any) => ({
    params: { category: cat.slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fs = require('fs');
  const path = require('path');
  
  const categorySlug = params?.category as string;
  const summaryData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data/summary.json'), 'utf8')
  );
  
  const categoryInfo = summaryData.categories.find((cat: any) => cat.slug === categorySlug);
  
  if (!categoryInfo) {
    return { notFound: true };
  }
  
  const categoryData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', `category-${categorySlug}.json`), 'utf8')
  );

  return {
    props: {
      category: categoryInfo.name,
      categorySlug: categorySlug,
      tools: categoryData.tools,
      totalCount: categoryData.tool_count
    }
  };
};