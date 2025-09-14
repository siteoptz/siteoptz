import { GetStaticProps } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search, Grid, TrendingUp, Zap, Brain, Image, Code, Mic, BarChart, Users } from 'lucide-react';
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

interface CategoriesPageProps {
  categories: CategoryData[];
  totalTools: number;
}

// Icon mapping for categories
const categoryIcons: { [key: string]: any } = {
  'AI Automation': Zap,
  'AI Website Builder': Code,
  'Chat': Users,
  'Code Generation': Code,
  'Content Creation': Brain,
  'Data Analysis': BarChart,
  'E-commerce': TrendingUp,
  'Education & Research': Search,
  'Email Marketing': Users,
  'Finance AI': BarChart,
  'Image Generation': Image,
  'Lead Generation': Users,
  'Marketing': TrendingUp,
  'Music & Audio': Mic,
  'Paid Search & PPC': TrendingUp,
  'Productivity': Zap,
  'Research & Education': Search,
  'Sales': TrendingUp,
  'SEO & Optimization': TrendingUp,
  'Self-Improvement': Brain,
  'Social Media': Users,
  'Translation': Search,
  'UX & Design': Grid,
  'Video Generation': Image,
  'Voice AI': Mic,
};

// Category descriptions - matching the actual category names from config
const categoryDescriptions: { [key: string]: string } = {
  'AI Automation': 'Streamline workflows and automate repetitive tasks with AI',
  'AI Website Builder': 'Create professional websites using AI-driven design tools',
  'Chat': 'AI chatbots and conversational AI platforms',
  'Code Generation': 'AI coding assistants and automated code generation tools',
  'Content Creation': 'AI-powered tools for generating articles, blog posts, and creative content',
  'Data Analysis': 'Analyze data patterns and generate insights with AI',
  'E-commerce': 'AI solutions for online stores and digital commerce platforms',
  'Education & Research': 'AI tools for academic research, learning, and knowledge discovery',
  'Email Marketing': 'Automate and optimize email campaigns with AI',
  'Finance AI': 'AI tools for financial analysis, trading, and accounting',
  'Image Generation': 'Create stunning visuals with AI-powered image generators',
  'Lead Generation': 'AI-powered tools for identifying and nurturing prospects',
  'Marketing': 'AI-driven marketing tools and campaign optimization',
  'Music & Audio': 'AI tools for music generation, audio editing, and sound design',
  'Paid Search & PPC': 'Optimize your paid advertising campaigns with AI',
  'Productivity': 'Boost efficiency with AI-powered productivity tools',
  'Research & Education': 'AI tools for research, learning, and educational content',
  'Sales': 'AI-powered sales tools and customer relationship management',
  'SEO & Optimization': 'Tools to improve search rankings and optimize website performance',
  'Self-Improvement': 'AI tools for personal development and skill enhancement',
  'Social Media': 'Automate and optimize your social media presence',
  'Translation': 'Translate content across languages with advanced AI models',
  'UX & Design': 'AI-powered user experience design and optimization tools',
  'Video Generation': 'Create and edit videos using AI technology',
  'Voice AI': 'Advanced voice recognition, text-to-speech, and audio generation'
};

export const getStaticProps: GetStaticProps = async () => {
  // Load tools directly from aiToolsData.json
  const allTools = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data/aiToolsData.json'), 'utf8'));
  
  // Create category data with tool counts
  const categoriesWithData = toolCategories.map(categoryName => {
    const toolsInCategory = allTools.filter(tool => 
      tool.overview?.category === categoryName
    );
    
    return {
      name: categoryName,
      slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      toolCount: toolsInCategory.length,
      description: categoryDescriptions[categoryName] || `Explore ${categoryName} AI tools`,
      icon: categoryName
    };
  });

  // Sort by tool count (descending)
  categoriesWithData.sort((a, b) => b.toolCount - a.toolCount);

  return {
    props: {
      categories: categoriesWithData,
      totalTools: allTools.length
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default function CategoriesPage({ categories, totalTools }: CategoriesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 placeholder-gray-400"
                />
              </div>
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

            {/* Categories Grid */}
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12 bg-black rounded-lg border border-gray-800">
                <div className="text-gray-500 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No categories found</h3>
                <p className="text-gray-400">
                  No categories match your search for &ldquo;{searchQuery}&rdquo;
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => {
                  const IconComponent = categoryIcons[category.name] || Grid;
                  
                  return (
                    <Link
                      key={category.slug}
                      href={`/categories/${category.slug}`}
                      className="group bg-black border border-gray-800 rounded-lg p-6 hover:border-cyan-400 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/20"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg group-hover:from-cyan-900 group-hover:to-blue-900 transition-colors">
                          <IconComponent className="w-6 h-6 text-cyan-400" />
                        </div>
                        <span className="px-3 py-1 bg-gray-800 text-cyan-400 text-sm rounded-full">
                          {category.toolCount} tools
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {category.name}
                      </h3>
                      
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {category.description}
                      </p>
                      
                      <div className="mt-4 flex items-center text-cyan-400 text-sm font-medium">
                        Browse tools
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

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