import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  BarChart3, 
  Target,
  Lightbulb,
  Award,
  Users,
  Zap
} from 'lucide-react';
import { industryContent, industries, industrySlugMap, IndustryContent } from '../../content/industryContent';

interface IndustryPageProps {
  industry: string;
  content: IndustryContent;
  slug: string;
}

export default function IndustryPage({ industry, content, slug }: IndustryPageProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${industry} AI Solutions`,
    "description": content.seo.description,
    "provider": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.ai"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Solutions",
      "itemListElement": content.businessCases.cases.map((useCase) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": useCase.title,
          "description": useCase.description
        }
      }))
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbData = {
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
        "name": "Industries",
        "item": "https://siteoptz.ai/industries"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": industry,
        "item": `https://siteoptz.ai/industries/${slug}`
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
        <meta name="keywords" content={content.seo.keywords.join(', ')} />
        <link rel="canonical" href={`https://siteoptz.ai/industries/${slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={content.seo.title} />
        <meta property="og:description" content={content.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://siteoptz.ai/industries/${slug}`} />
        <meta property="og:image" content={`https://siteoptz.ai/images/industries/${slug}-og.jpg`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content.seo.title} />
        <meta name="twitter:description" content={content.seo.description} />
        <meta name="twitter:image" content={`https://siteoptz.ai/images/industries/${slug}-twitter.jpg`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {content.hero.headline}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                {content.hero.subheadline}
              </p>
              <a
                href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {content.hero.ctaText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-black border border-gray-800 rounded-2xl p-8">
                <div className="mb-8">
                  {content.intro.content.split('\n\n').map((paragraph, index) => (
                    <p 
                      key={index} 
                      className="text-lg text-gray-300 leading-relaxed mb-6 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* AI Solutions We Recommend Section */}
                <div className="border-t border-gray-800 pt-8">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    AI Solutions We Recommend
                  </h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {content.toolCategories.map((category) => {
                      // Map category names to their correct URLs
                      const getCategoryUrl = (categoryName: string) => {
                        if (categoryName === 'Voice AI Tools') {
                          return '/tools?category=best-voice-ai-tools';
                        }
                        return `/tools?category=${categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                      };
                      
                      return (
                        <Link
                          key={category}
                          href={getCategoryUrl(category)}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          {category}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Cases Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              {content.businessCases.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.businessCases.cases.map((useCase, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-colors"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {useCase.title}
                    </h3>
                  </div>
                  <p className="text-gray-300">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Examples Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              {content.implementationExamples.title}
            </h2>
            <div className="space-y-8">
              {content.implementationExamples.examples.map((example, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-2xl p-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                        {example.company}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Challenge
                          </h4>
                          <p className="text-gray-300">
                            {example.problem}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Solution
                          </h4>
                          <p className="text-gray-300">
                            {example.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-800/30 rounded-xl p-6">
                        <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">
                          Results
                        </h4>
                        <p className="text-lg text-white font-medium">
                          {example.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              {content.benefits.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {content.benefits.items.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start"
                >
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
                  <p className="text-gray-300 text-lg">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {content.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Grow with AI in {industry}?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of organizations already using AI to drive innovation and growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Get a Free AI Growth Roadmap
                </a>
                <Link
                  href="/tools"
                  className="px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-colors"
                >
                  Explore AI Tools
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(industrySlugMap).map((industry) => ({
    params: { industry: industrySlugMap[industry] }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.industry as string;
  
  // Find the industry name from the slug
  const industryName = Object.keys(industrySlugMap).find(
    (key) => industrySlugMap[key] === slug
  );
  
  if (!industryName || !industryContent[slug]) {
    return { notFound: true };
  }

  return {
    props: {
      industry: industryName,
      content: industryContent[slug],
      slug
    }
  };
};