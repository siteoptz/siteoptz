import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import ToolLogo from '../../components/ToolLogo';
import FAQSection from '../../components/comparison/FAQSection';

interface SpyfuReviewPageProps {
  tool: {
    name: string;
    category: string;
    description: string;
    website: string;
    rating: number;
    slug: string;
  };
}

export default function SpyfuReviewPage({ tool }: SpyfuReviewPageProps) {
  const [activeSection, setActiveSection] = useState<'overview' | 'features' | 'pricing' | 'comparison'>('overview');

  // Schema markup for SEO
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": "SpyFu",
      "description": "Competitive intelligence tool for PPC and SEO analysis",
      "applicationCategory": "Paid Search & PPC",
      "url": "https://www.spyfu.com",
      "operatingSystem": "Web"
    },
    "author": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.ai"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": 4.3,
      "bestRating": 5,
      "worstRating": 1
    },
    "reviewBody": "Comprehensive SpyFu review covering features, pricing, and alternatives."
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
        "name": "Paid Search & PPC",
        "item": "https://siteoptz.ai/tools/?category=Paid%20Search%20%26%20PPC"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Reviews",
        "item": "https://siteoptz.ai/reviews"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "SpyFu Review",
        "item": "https://siteoptz.ai/reviews/spyfu"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is SpyFu and how does it work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "SpyFu is a competitive intelligence tool that provides insights into competitors' PPC and SEO strategies. It works by analyzing search engine data to reveal competitors' most profitable keywords, ad copy, and budget information, helping businesses optimize their digital marketing campaigns."
            }
        },
        {
            "@type": "Question",
            "name": "How much does SpyFu cost?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "SpyFu offers two main pricing plans: Basic at $39/month which includes 10,000 row search results and 6 months data export, and Professional at $79/month with unlimited search results, unlimited data export, and API access."
            }
        },
        {
            "@type": "Question",
            "name": "What are the best SpyFu alternatives?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Popular SpyFu alternatives include SEMrush, Ahrefs, Similarweb, and Google Ads Intelligence tools. Each offers different strengths in competitive analysis, keyword research, and PPC intelligence. The best alternative depends on your specific needs for competitor research and budget requirements."
            }
        },
        {
            "@type": "Question",
            "name": "Is SpyFu suitable for beginners?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "SpyFu is designed to be user-friendly and accessible for beginners in PPC and SEO. The platform provides clear data visualization and intuitive navigation, making competitive intelligence accessible even for those new to digital marketing. Training resources and customer support help new users get started effectively."
            }
        },
        {
            "@type": "Question",
            "name": "What kind of support does SpyFu provide?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "SpyFu offers comprehensive support including email assistance, live chat, phone support, and extensive documentation. The support team specializes in competitive intelligence and PPC optimization, helping users maximize their competitor research and campaign performance."
            }
        }
    ]
};

  return (
    <>
      <Head>
        {/* Primary SEO Tags */}
        <title>SpyFu Review: Competitive Intelligence for PPC & SEO | SiteOptz</title>
        <meta name="description" content="SpyFu review. Competitive intelligence tool for PPC and SEO analysis. Compare SpyFu features, pricing & alternatives. Expert analysis & user guide for 2025. Get started today!" />
        <meta name="keywords" content="spyfu review, spyfu pricing, spyfu features, spyfu vs competitors, spyfu alternatives" />
        <meta name="author" content="SiteOptz" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://siteoptz.ai/reviews/spyfu" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="SpyFu Review: Competitive Intelligence for PPC & SEO | SiteOptz" />
        <meta property="og:description" content="SpyFu review. Competitive intelligence tool for PPC and SEO analysis. Compare SpyFu features, pricing & alternatives. Expert analysis & user guide for 2025. Get started today!" />
        <meta property="og:url" content="https://siteoptz.ai/reviews/spyfu" />
        <meta property="og:site_name" content="SiteOptz" />
        <meta property="og:image" content="https://siteoptz.ai/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SpyFu Review: Competitive Intelligence for PPC & SEO | SiteOptz" />
        <meta name="twitter:description" content="SpyFu review. Competitive intelligence tool for PPC and SEO analysis. Compare SpyFu features, pricing & alternatives. Expert analysis & user guide for 2025. Get started today!" />
        <meta name="twitter:image" content="https://siteoptz.ai/og-image.png" />
        <meta name="twitter:creator" content="@siteoptz" />
        
        {/* Additional SEO Tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        {/* Breadcrumb Navigation */}
        <nav className="relative z-10 pt-8 pb-4" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link href="/tools/?category=Paid%20Search%20%26%20PPC" className="hover:text-cyan-400 transition-colors">Paid Search & PPC</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link href="/reviews" className="hover:text-cyan-400 transition-colors">Reviews</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-cyan-400" aria-current="page">SpyFu</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              
              {/* Tool Logo */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-800 rounded-2xl border border-gray-700">
                  <span className="text-2xl font-bold text-white">SF</span>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  SpyFu Review
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Competitive intelligence tool for PPC and SEO analysis. Discover competitors' most profitable keywords, ad strategies, and marketing insights.
              </p>

              {/* Rating */}
              <div className="flex items-center justify-center space-x-2 mb-8">
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <svg key={star} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-6 h-6 text-gray-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-white font-semibold">4.3/5</span>
                <span className="text-gray-400">(850 reviews)</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex justify-center mb-8">
                <Link
                  href="/compare"
                  className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-4 px-8 rounded-lg transition-all duration-200 text-center"
                >
                  Compare Alternatives
                </Link>
              </div>

              {/* Quick Overview */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-cyan-400 font-semibold mb-2">Category</h3>
                  <p className="text-white">Paid Search & PPC</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-cyan-400 font-semibold mb-2">Starting Price</h3>
                  <p className="text-white">$39/month</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-cyan-400 font-semibold mb-2">Best For</h3>
                  <p className="text-white">Competitive Intelligence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              <div className="mb-16" id="spyfu-key-features-capabilities">
                <h2 className="text-3xl font-bold text-white mb-8">
                  SpyFu Key Features & Capabilities
                </h2>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    SpyFu stands out as a comprehensive competitive intelligence platform that specializes in revealing your competitors' most profitable PPC and SEO strategies. With over 15 years of historical data, SpyFu provides unparalleled insights into competitor keyword performance, ad copy variations, and budget allocation strategies.
                  </p>
                  
                  <p className="text-gray-300 text-lg leading-relaxed">
                    The platform's core strength lies in its ability to track and analyze billions of keywords across Google Ads and organic search results, providing detailed competitor analysis that helps businesses make data-driven decisions about their digital marketing investments.
                  </p>
                </div>
                
                
              </div>
              <div className="mb-16" id="spyfu-pricing-plans-value-analysis">
                <h2 className="text-3xl font-bold text-white mb-8">
                  SpyFu Pricing Plans & Value Analysis
                </h2>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    SpyFu offers two straightforward pricing tiers designed to accommodate different business sizes and competitive intelligence needs. The Basic plan at $39/month provides essential competitor research capabilities, while the Professional plan at $79/month unlocks unlimited access and advanced features.
                  </p>
                  
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Both plans include access to SpyFu's extensive historical database and core competitive intelligence features, making it accessible for small businesses while providing the depth that enterprise users require for comprehensive market analysis.
                  </p>
                </div>
                
                
              </div>
              <div className="mb-16" id="real-world-spyfu-use-cases-applications">
                <h2 className="text-3xl font-bold text-white mb-8">
                  Real-World SpyFu Use Cases & Applications
                </h2>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Digital marketing agencies leverage SpyFu to conduct comprehensive competitive audits for their clients, identifying gaps in keyword coverage and discovering new opportunities for campaign expansion. PPC managers use the platform to optimize bid strategies by understanding competitor spending patterns and ad copy performance.
                  </p>
                  
                  <p className="text-gray-300 text-lg leading-relaxed">
                    SEO professionals rely on SpyFu's organic competitor analysis to identify content gaps and develop data-driven content strategies that capitalize on competitor weaknesses while building upon proven successful keywords and topics.
                  </p>
                </div>
                
                
              </div>
              <div className="mb-16" id="spyfu-pros-and-cons-honest-assessment">
                <h2 className="text-3xl font-bold text-white mb-8">
                  SpyFu Pros and Cons: Honest Assessment
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                    <h3 className="text-green-400 font-bold text-xl mb-4 flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Advantages
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>• Comprehensive competitor analysis</li>
                      <li>• Historical data going back years</li>
                      <li>• User-friendly interface</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                    <h3 className="text-red-400 font-bold text-xl mb-4 flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Limitations
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>• Limited international data</li>
                      <li>• Estimates may not be 100% accurate</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-white font-bold text-xl mb-4">Bottom Line</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    SpyFu excels as a competitive intelligence tool for businesses focused on Google Ads and SEO competitor analysis. While it may have limitations in international markets, its strength lies in providing actionable insights for US-based campaigns with extensive historical data that competitors like SEMrush and Ahrefs often lack in this depth.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-12 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started with SpyFu?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of professionals using SpyFu to streamline their paid search & ppc workflows.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.spyfu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Free Trial
                </a>
                <Link
                  href="/alternatives/spyfu"
                  className="border-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 font-bold py-4 px-8 rounded-lg transition-all duration-200"
                >
                  View Alternatives
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative z-10 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* <FAQSection toolName="SpyFu" /> */}
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      tool: {
        name: "SpyFu",
        category: "Paid Search & PPC",
        description: "Competitive intelligence tool for PPC and SEO analysis",
        website: "https://www.spyfu.com",
        rating: 4.3,
        slug: "spyfu"
      }
    }
  };
};