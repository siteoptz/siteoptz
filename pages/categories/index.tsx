import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Category {
  name: string;
  slug: string;
  count: number;
  description?: string;
  icon?: string;
}

interface CategoriesPageProps {
  categories: Category[];
  totalTools: number;
}

const categoryDescriptions: Record<string, { description: string; icon: string }> = {
  'content-creation': {
    description: 'AI tools for writing, copywriting, and content generation',
    icon: '✍️'
  },
  'visual-content': {
    description: 'Image generation, editing, and design tools powered by AI',
    icon: '🎨'
  },
  'development': {
    description: 'Code generation, debugging, and development assistance',
    icon: '💻'
  },
  'seo-optimization': {
    description: 'Search engine optimization and content optimization tools',
    icon: '🔍'
  },
  'social-media': {
    description: 'Social media management, scheduling, and content creation',
    icon: '📱'
  },
  'email-marketing': {
    description: 'Email automation, personalization, and campaign management',
    icon: '📧'
  },
  'audio': {
    description: 'Voice synthesis, transcription, and audio editing tools',
    icon: '🎵'
  },
  'video': {
    description: 'Video generation, editing, and enhancement tools',
    icon: '🎬'
  },
  'analytics': {
    description: 'Data analysis, visualization, and business intelligence',
    icon: '📊'
  },
  'research': {
    description: 'Academic research, data gathering, and analysis tools',
    icon: '🔬'
  },
  'productivity': {
    description: 'Workflow automation and productivity enhancement tools',
    icon: '⚡'
  }
};

export default function CategoriesPage({ categories, totalTools }: CategoriesPageProps) {
  // Enhance categories with descriptions and icons
  const enhancedCategories = categories.map(cat => ({
    ...cat,
    description: categoryDescriptions[cat.slug]?.description || `Explore ${cat.count} AI tools for ${cat.name.toLowerCase()}`,
    icon: categoryDescriptions[cat.slug]?.icon || '🤖'
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Tool Categories",
    "description": "Browse AI tools by category. Find the perfect AI solution for your needs.",
    "url": "https://siteoptz.ai/categories",
    "numberOfItems": totalTools,
    "hasPart": categories.map(cat => ({
      "@type": "CollectionPage",
      "name": `${cat.name} AI Tools`,
      "url": `https://siteoptz.ai/categories/${cat.slug}`,
      "numberOfItems": cat.count
    }))
  };

  return (
    <>
      <Head>
        <title>AI Tool Categories - Browse {totalTools} Tools by Category | SiteOptz</title>
        <meta 
          name="description" 
          content={`Explore ${totalTools} AI tools organized by category. Find content creation, image generation, development, SEO, and more AI solutions.`}
        />
        <meta 
          name="keywords" 
          content="AI tools categories, AI software directory, AI tools by type, artificial intelligence tools"
        />
        
        <meta property="og:title" content="AI Tool Categories - Browse by Type" />
        <meta property="og:description" content={`Explore ${totalTools} AI tools organized by category.`} />
        <meta property="og:url" content="https://siteoptz.ai/categories" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        
        <link rel="canonical" href="https://siteoptz.ai/categories" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Browse AI Tools by Category
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Discover {totalTools} AI tools organized into {categories.length} categories. 
                Find the perfect AI solution for your specific needs.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl font-bold text-white">{totalTools}</div>
                  <div className="text-sm text-blue-100">Total Tools</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl font-bold text-white">{categories.length}</div>
                  <div className="text-sm text-blue-100">Categories</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl font-bold text-white">4.5</div>
                  <div className="text-sm text-blue-100">Avg Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enhancedCategories.map((category, index) => (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={`/categories/${category.slug}`}>
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border p-6 cursor-pointer group">
                      {/* Icon and Title */}
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{category.icon}</span>
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {category.name}
                          </h2>
                          <p className="text-sm text-gray-500">{category.count} tools</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4">
                        {category.description}
                      </p>

                      {/* View Category Link */}
                      <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                        Browse {category.name} Tools
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Popular Tools Across Categories
              </h2>
              <p className="text-lg text-gray-600">
                Discover the most popular AI tools from each category
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/reviews/chatgpt" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                <span className="text-sm text-gray-600">Content Creation</span>
                <div className="font-semibold text-gray-900 mt-1">ChatGPT</div>
              </Link>
              <Link href="/reviews/midjourney" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                <span className="text-sm text-gray-600">Visual Content</span>
                <div className="font-semibold text-gray-900 mt-1">Midjourney</div>
              </Link>
              <Link href="/reviews/github-copilot" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                <span className="text-sm text-gray-600">Development</span>
                <div className="font-semibold text-gray-900 mt-1">GitHub Copilot</div>
              </Link>
              <Link href="/reviews/surfer-seo" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                <span className="text-sm text-gray-600">SEO & Optimization</span>
                <div className="font-semibold text-gray-900 mt-1">Surfer SEO</div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help Choosing the Right AI Tool?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our experts can help you find the perfect AI solution for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Expert Advice
              </Link>
              <Link
                href="/tools"
                className="inline-block px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                View All Tools
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fs = require('fs');
  const path = require('path');
  
  const summaryData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data/summary.json'), 'utf8')
  );

  return {
    props: {
      categories: summaryData.categories,
      totalTools: summaryData.total_tools
    }
  };
};