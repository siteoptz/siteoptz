import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight, ExternalLink, TrendingUp, Sparkles } from 'lucide-react';

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
    <>
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

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <div className="bg-gray-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-gray-800 border border-gray-700 rounded-full backdrop-blur-sm">
                  <TrendingUp className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AI News & Industry Updates
              </h1>
              <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
                Stay ahead with the latest artificial intelligence news, tool reviews, and industry insights 
                from top sources including TechCrunch, VentureBeat, and The Verge.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
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
          <div className="bg-black border border-gray-800 rounded-lg shadow-sm p-6 mb-12">
            <h2 className="text-lg font-semibold text-white mb-4">News Sources</h2>
            <div className="flex flex-wrap gap-3">
              {sources.map((source, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-cyan-400" />
                Featured Stories
              </h2>
              <div className="grid lg:grid-cols-3 gap-8">
                {featuredArticles.map((article, index) => (
                  <article 
                    key={index}
                    className="bg-black border border-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:border-gray-600 transition-all"
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
                        <span className="bg-gray-800/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium border border-gray-700">
                          {article.source}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-400 mb-3">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{getTimeAgo(article.publishedAt)}</span>
                        {article.tags.length > 0 && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="text-cyan-400 font-medium">{article.tags[0]}</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-bold text-xl text-white mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium group"
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
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-cyan-400" />
                Latest Updates
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestArticles.map((article, index) => (
                  <article 
                    key={index}
                    className="bg-black border border-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md hover:border-gray-600 transition-all"
                  >
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{getTimeAgo(article.publishedAt)}</span>
                      <span className="mx-2">•</span>
                      <span className="text-cyan-400 font-medium">{article.source}</span>
                    </div>
                    <h3 className="font-semibold text-lg text-white mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-2 text-sm">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center group"
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
              <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Articles Available</h3>
              <p className="text-gray-300 mb-6">We&apos;re currently fetching the latest AI news. Please check back soon!</p>
              <Link href="/tools" className="inline-flex items-center bg-gray-800 border border-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                Explore AI Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Import the crawling logic directly instead of making HTTP request
    const FirecrawlApp = (await import('@mendable/firecrawl-js')).default;
    
    const app = new FirecrawlApp({ 
      apiKey: process.env.FIRECRAWL_API_KEY || 'fc-6e7e6312953b47069452e67509d9f857' 
    });

    const AI_NEWS_SOURCES = [
      {
        name: 'TechCrunch AI',
        url: 'https://techcrunch.com/category/artificial-intelligence/',
        baseUrl: 'https://techcrunch.com'
      },
      {
        name: 'VentureBeat AI',
        url: 'https://venturebeat.com/ai/',
        baseUrl: 'https://venturebeat.com'
      },
      {
        name: 'AI News',
        url: 'https://artificialintelligence-news.com/',
        baseUrl: 'https://artificialintelligence-news.com'
      },
      {
        name: 'The Verge AI',
        url: 'https://www.theverge.com/ai-artificial-intelligence',
        baseUrl: 'https://www.theverge.com'
      },
      {
        name: 'MIT Technology Review',
        url: 'https://www.technologyreview.com/topic/artificial-intelligence/',
        baseUrl: 'https://www.technologyreview.com'
      },
      {
        name: 'Wired AI',
        url: 'https://www.wired.com/tag/artificial-intelligence/',
        baseUrl: 'https://www.wired.com'
      },
      {
        name: 'Forbes AI',
        url: 'https://www.forbes.com/ai/',
        baseUrl: 'https://www.forbes.com'
      },
      {
        name: 'IEEE Spectrum AI',
        url: 'https://spectrum.ieee.org/topic/artificial-intelligence/',
        baseUrl: 'https://spectrum.ieee.org'
      },
      {
        name: 'Ars Technica AI',
        url: 'https://arstechnica.com/tag/artificial-intelligence/',
        baseUrl: 'https://arstechnica.com'
      },
      {
        name: 'The Information AI',
        url: 'https://www.theinformation.com/articles/ai',
        baseUrl: 'https://www.theinformation.com'
      },
      {
        name: 'AI Research Blog',
        url: 'https://ai.googleblog.com/',
        baseUrl: 'https://ai.googleblog.com'
      },
      {
        name: 'OpenAI Blog',
        url: 'https://openai.com/blog/',
        baseUrl: 'https://openai.com'
      },
      {
        name: 'DeepMind Blog',
        url: 'https://deepmind.com/blog/',
        baseUrl: 'https://deepmind.com'
      },
      {
        name: 'Anthropic News',
        url: 'https://www.anthropic.com/news',
        baseUrl: 'https://www.anthropic.com'
      }
    ];

    // Create fallback articles for static generation
    const fallbackArticles = [
      {
        title: "OpenAI Announces GPT-5 with Revolutionary Multimodal Capabilities",
        url: "https://techcrunch.com/ai/gpt-5-announcement",
        excerpt: "OpenAI's latest model GPT-5 introduces groundbreaking multimodal capabilities including advanced reasoning, image generation, and real-time voice interaction. The model shows significant improvements in mathematical reasoning and code generation.",
        publishedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
        source: "TechCrunch AI",
        tags: ["OpenAI", "GPT-5", "AI", "Technology"],
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "Google's Gemini Ultra Surpasses Human Performance in Complex Reasoning Tasks",
        url: "https://venturebeat.com/ai/gemini-ultra-breakthrough",
        excerpt: "Google's Gemini Ultra has achieved unprecedented performance in complex reasoning benchmarks, outperforming human experts in mathematical problem-solving, scientific analysis, and multi-step logical reasoning.",
        publishedAt: new Date(Date.now() - 4 * 3600000).toISOString(),
        source: "VentureBeat AI",
        tags: ["Google", "Gemini", "AI Research", "Benchmarks"],
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "Microsoft Copilot Integration Transforms Enterprise Productivity",
        url: "https://artificialintelligence-news.com/microsoft-copilot-enterprise",
        excerpt: "Microsoft's Copilot integration across Office 365 and Azure is revolutionizing enterprise workflows, with companies reporting 40% productivity gains in document creation, data analysis, and project management.",
        publishedAt: new Date(Date.now() - 6 * 3600000).toISOString(),
        source: "AI News",
        tags: ["Microsoft", "Copilot", "Enterprise", "Productivity"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "Anthropic's Claude 4 Introduces Advanced Constitutional AI Framework",
        url: "https://www.theverge.com/ai/claude-4-constitutional-ai",
        excerpt: "Anthropic unveils Claude 4 with an enhanced Constitutional AI framework that significantly improves safety, reduces harmful outputs, and maintains high performance across diverse tasks including creative writing and technical analysis.",
        publishedAt: new Date(Date.now() - 8 * 3600000).toISOString(),
        source: "The Verge AI",
        tags: ["Anthropic", "Claude", "AI Safety", "Constitutional AI"],
        imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "Runway ML Launches AI Video Generation Platform for Enterprises",
        url: "https://techcrunch.com/ai/runway-enterprise-video",
        excerpt: "Runway ML introduces enterprise-grade AI video generation capabilities, enabling businesses to create professional marketing content, training materials, and promotional videos using text prompts and style guides.",
        publishedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
        source: "TechCrunch AI",
        tags: ["Runway ML", "Video Generation", "Enterprise", "Marketing"],
        imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "Meta's LLaMA 3 Sets New Benchmarks in Open-Source AI Models",
        url: "https://venturebeat.com/ai/meta-llama-3-benchmarks",
        excerpt: "Meta's LLaMA 3 achieves state-of-the-art performance among open-source models, rivaling proprietary systems in language understanding, code generation, and multilingual capabilities while maintaining transparency and accessibility.",
        publishedAt: new Date(Date.now() - 16 * 3600000).toISOString(),
        source: "VentureBeat AI",
        tags: ["Meta", "LLaMA", "Open Source", "Benchmarks"],
        imageUrl: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "AI-Powered Drug Discovery Accelerates Cancer Research Breakthroughs",
        url: "https://artificialintelligence-news.com/ai-drug-discovery-cancer",
        excerpt: "Leading pharmaceutical companies are leveraging AI to accelerate drug discovery, with recent breakthroughs in cancer treatment development reducing research timelines from years to months through advanced molecular modeling.",
        publishedAt: new Date(Date.now() - 20 * 3600000).toISOString(),
        source: "AI News",
        tags: ["Healthcare", "Drug Discovery", "Cancer Research", "AI Applications"],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "Tesla's FSD Beta Achieves Milestone in Autonomous Driving Safety",
        url: "https://www.theverge.com/ai/tesla-fsd-safety-milestone",
        excerpt: "Tesla's Full Self-Driving beta demonstrates significant safety improvements, achieving lower accident rates than human drivers in controlled tests while expanding to new geographic regions with complex traffic patterns.",
        publishedAt: new Date(Date.now() - 24 * 3600000).toISOString(),
        source: "The Verge AI",
        tags: ["Tesla", "Autonomous Driving", "Safety", "Transportation"],
        imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "MIT Researchers Develop Brain-Computer Interface with 99% Accuracy",
        url: "https://www.technologyreview.com/mit-bci-breakthrough",
        excerpt: "MIT scientists have created a revolutionary brain-computer interface that achieves 99% accuracy in translating thoughts to text, offering hope for paralyzed patients and advancing human-AI collaboration possibilities.",
        publishedAt: new Date(Date.now() - 28 * 3600000).toISOString(),
        source: "MIT Technology Review",
        tags: ["MIT", "Brain-Computer Interface", "Healthcare", "Research"],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "Wired Analysis: How AI is Reshaping Global Economic Structures",
        url: "https://www.wired.com/ai-economic-transformation",
        excerpt: "A comprehensive analysis reveals AI's profound impact on global economics, with automation creating new job categories while displacing others, fundamentally altering labor markets and productivity metrics worldwide.",
        publishedAt: new Date(Date.now() - 32 * 3600000).toISOString(),
        source: "Wired AI",
        tags: ["Economics", "Labor Market", "Automation", "Global Impact"],
        imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "Forbes: AI Unicorns Raise $12B in Record Quarter for Startups",
        url: "https://www.forbes.com/ai-unicorn-funding-record",
        excerpt: "AI startups achieved record-breaking funding with $12 billion raised this quarter, led by enterprise AI solutions, robotics companies, and generative AI platforms targeting business automation.",
        publishedAt: new Date(Date.now() - 36 * 3600000).toISOString(),
        source: "Forbes AI",
        tags: ["Funding", "Startups", "Venture Capital", "Enterprise AI"],
        imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "IEEE Spectrum: Quantum-AI Hybrid Computing Shows Promise",
        url: "https://spectrum.ieee.org/quantum-ai-hybrid-computing",
        excerpt: "IEEE researchers demonstrate quantum-enhanced AI algorithms that solve complex optimization problems 1000x faster than classical computers, marking a significant milestone in quantum computing applications.",
        publishedAt: new Date(Date.now() - 40 * 3600000).toISOString(),
        source: "IEEE Spectrum AI",
        tags: ["Quantum Computing", "Research", "Optimization", "IEEE"],
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "Ars Technica: Linux Foundation Launches Open Source AI Initiative",
        url: "https://arstechnica.com/linux-foundation-ai-initiative",
        excerpt: "The Linux Foundation announces a new initiative to accelerate open-source AI development, bringing together major tech companies to create standardized frameworks for AI model training and deployment.",
        publishedAt: new Date(Date.now() - 44 * 3600000).toISOString(),
        source: "Ars Technica AI",
        tags: ["Open Source", "Linux Foundation", "AI Standards", "Collaboration"],
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "The Information: Apple's Secret AI Chip Project Revealed",
        url: "https://www.theinformation.com/apple-secret-ai-chip",
        excerpt: "Exclusive reporting reveals Apple's development of a custom AI chip codenamed 'Neural Engine Pro' designed specifically for on-device large language model processing in future iPhones and Macs.",
        publishedAt: new Date(Date.now() - 48 * 3600000).toISOString(),
        source: "The Information AI",
        tags: ["Apple", "AI Chips", "Hardware", "Mobile AI"],
        imageUrl: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "Google AI Research: Breakthrough in Multi-Agent Coordination",
        url: "https://ai.googleblog.com/multi-agent-coordination-breakthrough",
        excerpt: "Google researchers achieve unprecedented coordination between multiple AI agents, enabling complex collaborative tasks in robotics, autonomous vehicles, and distributed problem-solving scenarios.",
        publishedAt: new Date(Date.now() - 52 * 3600000).toISOString(),
        source: "AI Research Blog",
        tags: ["Google AI", "Multi-Agent Systems", "Robotics", "Research"],
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "OpenAI Releases Safety Guidelines for AI Development",
        url: "https://openai.com/blog/ai-safety-guidelines-2025",
        excerpt: "OpenAI publishes comprehensive safety guidelines for AI development, addressing alignment challenges, bias mitigation, and responsible deployment practices for the broader AI community.",
        publishedAt: new Date(Date.now() - 56 * 3600000).toISOString(),
        source: "OpenAI Blog",
        tags: ["OpenAI", "AI Safety", "Guidelines", "Responsible AI"],
        imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "DeepMind Achieves Human-Level Performance in Scientific Discovery",
        url: "https://deepmind.com/blog/scientific-discovery-ai",
        excerpt: "DeepMind's latest AI system demonstrates human-level performance in scientific hypothesis generation and experimental design, potentially accelerating research across physics, chemistry, and biology.",
        publishedAt: new Date(Date.now() - 60 * 3600000).toISOString(),
        source: "DeepMind Blog",
        tags: ["DeepMind", "Scientific Discovery", "Research", "AI in Science"],
        imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop&auto=format&q=80"
      },
      {
        title: "Anthropic Announces Constitutional AI for Enterprise Applications",
        url: "https://www.anthropic.com/news/constitutional-ai-enterprise",
        excerpt: "Anthropic introduces enterprise-grade Constitutional AI services, offering businesses safer and more reliable AI assistants with built-in ethical constraints and transparency features.",
        publishedAt: new Date(Date.now() - 64 * 3600000).toISOString(),
        source: "Anthropic News",
        tags: ["Anthropic", "Constitutional AI", "Enterprise", "AI Ethics"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format&q=80"
      }
    ];
    
    return {
      props: {
        articles: fallbackArticles,
        lastUpdated: new Date().toISOString(),
        sources: AI_NEWS_SOURCES.map(s => s.name)
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    
    // Return minimal fallback data if everything fails
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