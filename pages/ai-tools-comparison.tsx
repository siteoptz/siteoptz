import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import ToolComparisonTable from '../components/ToolComparisonTable';
import PricingCalculator from '../components/PricingCalculator';
import FAQSection from '../components/FAQSection';
import { Zap, Calculator, HelpCircle, Star, TrendingUp } from 'lucide-react';
import fs from 'fs';
import path from 'path';

interface Tool {
  id: string;
  slug: string;
  name: string;
  logo: string;
  meta: {
    title: string;
    description: string;
  };
  schema: any;
  overview: {
    developer: string;
    release_year: number;
    description: string;
  };
  features: string[];
  pros: string[];
  cons: string[];
  pricing: {
    plan: string;
    price_per_month: number;
    features: string[];
  }[];
  benchmarks: {
    speed: number;
    accuracy: number;
    integration: number;
    ease_of_use: number;
    value: number;
  };
  related_tools: string[];
}

interface FAQ {
  question: string;
  answer: string;
  schema?: {
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  };
}

interface AIToolsPageProps {
  tools: Tool[];
  faqs: { [key: string]: FAQ[] };
}

export default function AIToolsComparison({ tools, faqs }: AIToolsPageProps) {
  const [emailCaptured, setEmailCaptured] = useState<string | null>(null);

  // Combine all FAQs for the page
  const allFaqs: FAQ[] = Object.values(faqs).flat();

  // Calculate page statistics
  const stats = {
    totalTools: tools.length,
    freeTools: tools.filter(t => t.pricing.some(p => p.price_per_month === 0)).length,
    averageRating: (
      tools.reduce((sum, tool) => {
        const avg = (
          tool.benchmarks.speed + 
          tool.benchmarks.accuracy + 
          tool.benchmarks.integration + 
          tool.benchmarks.ease_of_use + 
          tool.benchmarks.value
        ) / 5;
        return sum + avg;
      }, 0) / tools.length
    ).toFixed(1),
    totalFaqs: allFaqs.length
  };

  // Handle email submissions
  const handleEmailSubmit = (email: string, data?: any) => {
    console.log('Email captured:', email);
    setEmailCaptured(email);
    
    // Send to your backend API
    fetch('/api/capture-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        source: 'ai-tools-comparison',
        data,
        timestamp: new Date().toISOString()
      })
    }).catch(console.error);

    // Optional: Track with analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'email_capture', {
        event_category: 'engagement',
        event_label: 'pricing_calculator'
      });
    }
  };

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.slice(0, 20).map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Generate Breadcrumb Schema
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
        "name": "AI Tools",
        "item": "https://siteoptz.ai/ai-tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "AI Tools Comparison",
        "item": "https://siteoptz.ai/ai-tools-comparison"
      }
    ]
  };

  // Generate Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SiteOptz",
    "url": "https://siteoptz.ai",
    "logo": "https://siteoptz.ai/logo.png",
    "sameAs": [
      "https://twitter.com/siteoptz",
      "https://linkedin.com/company/siteoptz"
    ]
  };

  return (
    <>
      {/* SEO Head with Meta Tags and Schema */}
      <Head>
        {/* Primary Meta Tags */}
        <title>AI Tools Comparison 2025: ChatGPT vs Claude vs Gemini | SiteOptz</title>
        <meta 
          name="description" 
          content="Compare the best AI tools of 2025. Interactive pricing calculator, feature comparison, and expert reviews. Find the perfect AI tool for your needs." 
        />
        <meta name="keywords" content="AI tools comparison, ChatGPT vs Claude, AI pricing calculator, best AI tools 2025, AI tool reviews" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://siteoptz.ai/ai-tools-comparison" />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI Tools Comparison 2025: ChatGPT vs Claude vs Gemini" />
        <meta property="og:description" content="Compare the best AI tools of 2025. Interactive pricing calculator, feature comparison, and expert reviews." />
        <meta property="og:image" content="https://siteoptz.ai/images/ai-tools-comparison-og.jpg" />
        <meta property="og:url" content="https://siteoptz.ai/ai-tools-comparison" />
        <meta property="og:site_name" content="SiteOptz" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Tools Comparison 2025: ChatGPT vs Claude vs Gemini" />
        <meta name="twitter:description" content="Compare the best AI tools of 2025. Interactive pricing calculator and expert reviews." />
        <meta name="twitter:image" content="https://siteoptz.ai/images/ai-tools-comparison-twitter.jpg" />
        
        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="SiteOptz" />
        <meta name="publisher" content="SiteOptz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Compare the Best <span className="text-yellow-300">AI Tools</span> of 2025
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                Interactive comparison table, real-time pricing calculator, and expert reviews. 
                Find the perfect AI tool for your needs in minutes.
              </p>
              
              {/* Hero Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                  <div className="text-3xl font-bold">{stats.totalTools}</div>
                  <div className="text-blue-100">AI Tools</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                  <div className="text-3xl font-bold">{stats.freeTools}</div>
                  <div className="text-blue-100">Free Options</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                  <div className="text-3xl font-bold">{stats.averageRating}</div>
                  <div className="text-blue-100">Avg Rating</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                  <div className="text-3xl font-bold">{stats.totalFaqs}</div>
                  <div className="text-blue-100">FAQs Answered</div>
                </div>
              </div>
              
              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#comparison"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Start Comparing
                </a>
                <a 
                  href="#calculator"
                  className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate Pricing
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Quick Navigation */}
          <nav className="bg-white rounded-lg shadow-sm p-4 mt-8 mb-12 sticky top-0 z-10">
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="#comparison" 
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <Zap className="w-4 h-4" />
                Comparison Table
              </a>
              <a 
                href="#calculator" 
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <Calculator className="w-4 h-4" />
                Pricing Calculator
              </a>
              <a 
                href="#faqs" 
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                FAQs
              </a>
            </div>
          </nav>

          {/* Interactive Comparison Section */}
          <section id="comparison" className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Interactive AI Tools Comparison
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                Compare features, pricing, benchmarks, and performance across the top AI tools. 
                Select up to 4 tools for detailed side-by-side analysis.
              </p>
              
              {/* Comparison Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Performance Ratings</h3>
                  <p className="text-sm text-gray-600">
                    See speed, accuracy, and ease of use ratings for each tool
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <Calculator className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Pricing Breakdown</h3>
                  <p className="text-sm text-gray-600">
                    Compare pricing plans and features across different tiers
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Pros & Cons</h3>
                  <p className="text-sm text-gray-600">
                    Detailed advantages and limitations for informed decisions
                  </p>
                </div>
              </div>
            </div>
            
            <ToolComparisonTable 
              tools={tools}
              defaultSelected={['chatgpt', 'claude', 'gemini']}
            />
          </section>

          {/* Pricing Calculator Section */}
          <section id="calculator" className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                AI Tools Pricing Calculator
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                Calculate your total monthly and annual investment across multiple AI tools. 
                Configure plans, add team members, and get personalized recommendations.
              </p>
              
              {/* Calculator Benefits */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12 border border-blue-200">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Why Use Our Calculator?</h3>
                    <ul className="text-left space-y-2 text-gray-700">
                      <li>✅ Compare multiple tools at once</li>
                      <li>✅ Factor in team size and usage</li>
                      <li>✅ See annual vs monthly savings</li>
                      <li>✅ Get personalized recommendations</li>
                      <li>✅ Export results for budgeting</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Calculator className="w-12 h-12 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Save an average of <strong>15-20%</strong> with annual billing
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <PricingCalculator 
              tools={tools}
              onEmailSubmit={handleEmailSubmit}
            />
            
            {/* Success Message */}
            {emailCaptured && (
              <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-green-600 font-semibold mb-2">
                  ✅ Thank you for your interest!
                </div>
                <p className="text-green-700">
                  We've sent pricing details to <strong>{emailCaptured}</strong>. 
                  Check your inbox for exclusive offers and recommendations.
                </p>
              </div>
            )}
          </section>

          {/* FAQ Section */}
          <section id="faqs" className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get answers to the most common questions about AI tools, pricing, features, and more.
              </p>
            </div>
            
            <FAQSection 
              faqs={allFaqs}
              showSearch={true}
              maxInitialDisplay={8}
            />
          </section>

          {/* Bottom CTA Section */}
          <section className="py-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Choose Your AI Tools?
              </h2>
              <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                Get personalized recommendations based on your specific needs, budget, and team size.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Get Free Consultation
                </button>
                <button className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Download Comparison Guide
                </button>
              </div>
              
              <p className="text-sm text-blue-200">
                🔒 No spam, just helpful AI tool insights and exclusive deals
              </p>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

// Static Props - Load data at build time
export const getStaticProps: GetStaticProps = async () => {
  try {
    // Load tools data
    const aiToolsPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
    const tools = JSON.parse(fs.readFileSync(aiToolsPath, 'utf8'));
    
    // Load FAQ data
    const faqPath = path.join(process.cwd(), 'public/data/faqData.json');
    const faqs = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
    
    return {
      props: {
        tools,
        faqs
      },
      // Revalidate every hour (3600 seconds)
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error loading data:', error);
    
    return {
      props: {
        tools: [],
        faqs: {}
      },
      revalidate: 60 // Retry in 1 minute if there's an error
    };
  }
};