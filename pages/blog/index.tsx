import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight, ExternalLink, TrendingUp, Sparkles } from 'lucide-react';
import Layout from '../../components/Layout';

interface NewsArticle {
  title: string;
  url: string;
  excerpt: string;
  publishedAt: string;
  author?: string;
  source: string;
  tags: string[];
  content?: string;
  imageUrl?: string;
}

interface BlogProps {
  articles: NewsArticle[];
  lastUpdated: string;
  sources: string[];
}

export default function AINewsBlog({ articles, lastUpdated, sources }: BlogProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const featuredArticles = articles.slice(0, 3);
  const latestArticles = articles.slice(3, 12);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "AI News & Tools - SiteOptz Blog",
    "description": "Latest AI news, tool reviews, and industry insights. Stay updated with the newest artificial intelligence developments and technology trends.",
    "url": "https://siteoptz.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://siteoptz.com/logo.png"
      }
    },
    "blogPost": articles.slice(0, 10).map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.excerpt,
      "url": article.url,
      "datePublished": article.publishedAt,
      "author": {
        "@type": "Person",
        "name": article.author || "SiteOptz Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "SiteOptz"
      }
    }))
  };

  return (
    <Layout>
      <Head>
        <title>AI News & Updates - Latest Artificial Intelligence Insights | SiteOptz</title>
        <meta 
          name="description" 
          content="Stay updated with the latest AI news, tool reviews, and industry insights. Discover new artificial intelligence developments, product launches, and technology trends from top sources."
        />
        <meta name="keywords" content="AI news, artificial intelligence, AI tools, machine learning, technology news, AI updates, AI industry, AI trends, OpenAI, ChatGPT, Claude, Gemini" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="AI News & Updates - Latest Artificial Intelligence Insights | SiteOptz" />
        <meta property="og:description" content="Stay updated with the latest AI news, tool reviews, and industry insights from top sources." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.com/blog" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&auto=format&q=80" />
        <meta property="og:site_name" content="SiteOptz" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI News & Updates - Latest Artificial Intelligence Insights" />
        <meta name="twitter:description" content="Stay updated with the latest AI news, tool reviews, and industry insights from top sources." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&auto=format&q=80" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="SiteOptz" />
        <meta name="publisher" content="SiteOptz" />
        <link rel="canonical" href="https://siteoptz.com/blog" />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AI News & Industry Updates
              </h1>
              <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
                Stay ahead with the latest artificial intelligence news, tool reviews, and industry insights 
                from top sources including TechCrunch, VentureBeat, and The Verge.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-blue-200">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Updated {formatDate(lastUpdated)}</span>
                </div>
                <div className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span>{articles.length} Latest Articles</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* News Sources */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">News Sources</h2>
            <div className="flex flex-wrap gap-3">
              {sources.map((source, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                Featured Stories
              </h2>
              <div className="grid lg:grid-cols-3 gap-8">
                {featuredArticles.map((article, index) => (
                  <article 
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200"
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative">
                      {article.imageUrl ? (
                        <img 
                          src={article.imageUrl} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Sparkles className="w-12 h-12 text-white" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-full text-xs font-medium">
                          {article.source}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{getTimeAgo(article.publishedAt)}</span>
                        {article.tags.length > 0 && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="text-blue-600 font-medium">{article.tags[0]}</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                      >
                        Read Full Article
                        <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Latest Articles */}
          {latestArticles.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                Latest Updates
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestArticles.map((article, index) => (
                  <article 
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{getTimeAgo(article.publishedAt)}</span>
                      <span className="mx-2">•</span>
                      <span className="text-blue-600 font-medium">{article.source}</span>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center group"
                      >
                        Read
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* No Articles Message */}
          {articles.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Articles Available</h3>
              <p className="text-gray-600 mb-6">We&apos;re currently fetching the latest AI news. Please check back soon!</p>
              <Link href="/tools" className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Explore AI Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8 mt-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated with AI Insights</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Get the latest AI tool reviews, comparisons, and industry insights delivered to your inbox weekly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/tools"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
                >
                  Browse AI Tools
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link 
                  href="/compare"
                  className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                >
                  Compare Tools
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch AI news from our API
    const response = await fetch(`${process.env.NEXTJS_URL || 'http://localhost:3000'}/api/crawl-ai-news?limit=20`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch AI news');
    }

    const data = await response.json();
    
    return {
      props: {
        articles: data.articles || [],
        lastUpdated: new Date().toISOString(),
        sources: data.sources || ['TechCrunch AI', 'VentureBeat AI', 'AI News', 'The Verge AI']
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching AI news:', error);
    
    // Return fallback data if API fails
    return {
      props: {
        articles: [],
        lastUpdated: new Date().toISOString(),
        sources: ['TechCrunch AI', 'VentureBeat AI', 'AI News', 'The Verge AI']
      },
      revalidate: 3600
    };
  }
};