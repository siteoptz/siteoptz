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
      "applicationCategory": "Paid Search",
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
        "name": "Paid Search",
        "item": "https://siteoptz.ai/tools/?category=Paid%20Search"
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
            "name": "What are the main alternatives to SpyFu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Popular alternatives to SpyFu include SEMrush, Ahrefs, Similarweb, and Google Ads. Each offers different strengths in competitive analysis, keyword research, and PPC intelligence."
            }
        }
    ]
  };

  return (
    <>
      <Head>
        <title>SpyFu Review, Pricing, Features & Alternatives [2025]</title>
        <meta name="description" content="Comprehensive review of SpyFu. Competitive intelligence tool for PPC and SEO analysis. Compare features, pricing, and alternatives." />
        <meta name="keywords" content="SpyFu, competitive intelligence, PPC analysis, SEO competitor research, keyword research, digital marketing" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SpyFu Review, Pricing, Features & Alternatives [2025]" />
        <meta property="og:description" content="Comprehensive review of SpyFu. Competitive intelligence tool for PPC and SEO analysis. Compare features, pricing, and alternatives." />
        <meta property="og:image" content="/images/tools/spyfu-logo.svg" />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SpyFu Review, Pricing, Features & Alternatives [2025]" />
        <meta name="twitter:description" content="Comprehensive review of SpyFu. Competitive intelligence tool for PPC and SEO analysis. Compare features, pricing, and alternatives." />
        <meta name="twitter:image" content="/images/tools/spyfu-logo.svg" />
        
        {/* Schema Markup */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        
        <link rel="canonical" href="https://siteoptz.ai/reviews/spyfu" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <ToolLogo toolName="SpyFu" size="xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SpyFu Review: Competitive Intelligence for PPC & SEO [2025]
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SpyFu is a powerful competitive intelligence tool that reveals your competitors' most profitable keywords, ad copy, and SEO strategies. With over 15 years of historical data, SpyFu helps businesses outsmart their competition and optimize their digital marketing campaigns for better ROI.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex">
            {(['overview', 'features', 'pricing', 'comparison'] as const).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`py-2 px-6 border-b-2 font-medium text-sm ${
                  activeSection === section
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Sections */}
        {activeSection === 'overview' && (
          <div className="prose max-w-none">
            <h2>What is SpyFu?</h2>
            <p>
              SpyFu is a comprehensive competitive intelligence platform that specializes in PPC and SEO competitor analysis. Founded in 2006, SpyFu has built one of the largest databases of search marketing intelligence, tracking billions of keywords and ad campaigns across Google Ads and organic search results.
            </p>
            
            <h3>Key Capabilities</h3>
            <ul>
              <li><strong>Competitor Keyword Research:</strong> Discover which keywords your competitors are bidding on and ranking for</li>
              <li><strong>Ad Copy Intelligence:</strong> See your competitors' most successful ad variations and copy strategies</li>
              <li><strong>Budget Insights:</strong> Get estimates of competitor ad spend and budget allocation</li>
              <li><strong>Historical Data:</strong> Access years of historical performance data for trend analysis</li>
              <li><strong>SEO Competitor Analysis:</strong> Track competitor organic rankings and backlink profiles</li>
            </ul>

            <h3>Who Should Use SpyFu?</h3>
            <p>
              SpyFu is ideal for digital marketing agencies, PPC managers, SEO professionals, and businesses looking to gain competitive intelligence in their market. It's particularly valuable for those managing Google Ads campaigns and needing data-driven insights to optimize their advertising strategy.
            </p>
          </div>
        )}

        {activeSection === 'features' && (
          <div className="prose max-w-none">
            <h2>SpyFu Features</h2>
            
            <h3>Competitor Keyword Research</h3>
            <p>
              SpyFu's keyword research capabilities allow you to see exactly which keywords your competitors are targeting in both paid and organic search. The platform provides search volume, CPC estimates, and competition levels for each keyword.
            </p>

            <h3>PPC Ad Intelligence</h3>
            <p>
              Analyze your competitors' Google Ads campaigns including ad copy variations, landing pages, and estimated budgets. SpyFu shows which ads have been running the longest, indicating successful campaigns.
            </p>

            <h3>Historical Performance Data</h3>
            <p>
              Access years of historical data to identify trends and seasonal patterns in your competitors' strategies. This historical perspective helps predict future moves and optimize timing for your campaigns.
            </p>

            <h3>SEO Competitor Analysis</h3>
            <p>
              Track competitors' organic keyword rankings, identify their most valuable organic keywords, and discover new content opportunities based on their SEO performance.
            </p>
          </div>
        )}

        {activeSection === 'pricing' && (
          <div className="prose max-w-none">
            <h2>SpyFu Pricing Plans</h2>
            
            <div className="grid md:grid-cols-2 gap-6 not-prose">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Basic Plan</h3>
                <div className="text-3xl font-bold mb-4">$39<span className="text-sm font-normal">/month</span></div>
                <ul className="space-y-2 mb-6">
                  <li>• 10,000 row search results</li>
                  <li>• 6 months data export</li>
                  <li>• 250 sales leads & domain contacts</li>
                  <li>• Basic competitor analysis</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-6 border-blue-500">
                <h3 className="text-xl font-semibold mb-4">Professional Plan</h3>
                <div className="text-3xl font-bold mb-4">$79<span className="text-sm font-normal">/month</span></div>
                <ul className="space-y-2 mb-6">
                  <li>• Unlimited search results</li>
                  <li>• Unlimited data export</li>
                  <li>• 500 sales leads & domain contacts</li>
                  <li>• API access</li>
                  <li>• Advanced reporting features</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'comparison' && (
          <div className="prose max-w-none">
            <h2>SpyFu vs Alternatives</h2>
            
            <h3>SpyFu vs SEMrush</h3>
            <p>
              While SEMrush offers broader digital marketing features, SpyFu specializes specifically in competitive intelligence with deeper historical data and more focused PPC insights.
            </p>

            <h3>SpyFu vs Ahrefs</h3>
            <p>
              Ahrefs excels in backlink analysis and SEO, while SpyFu provides superior PPC competitor intelligence and ad copy analysis.
            </p>

            <h3>SpyFu vs Similarweb</h3>
            <p>
              Similarweb offers broader website analytics, while SpyFu provides more granular keyword-level intelligence for search marketing.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Compare SpyFu with Other Paid Search Tools
            </h3>
            <p className="text-gray-600 mb-6">
              Explore detailed comparisons and find the best competitive intelligence tool for your needs.
            </p>
            <Link
              href="/tools/compare"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Compare Alternatives
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          {/* <FAQSection toolName="SpyFu" /> */}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      tool: {
        name: "SpyFu",
        category: "Paid Search",
        description: "Competitive intelligence tool for PPC and SEO analysis",
        website: "https://www.spyfu.com",
        rating: 4.3,
        slug: "spyfu"
      }
    }
  };
};