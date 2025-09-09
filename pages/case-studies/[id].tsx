import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { 
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Clock,
  Users,
  Building2,
  CheckCircle,
  Target,
  Zap,
  Quote,
  BarChart3,
  Award,
  Calendar,
  DollarSign
} from 'lucide-react';
import { caseStudiesData, CaseStudy } from '../../content/caseStudiesData';

interface CaseStudyPageProps {
  caseStudy: CaseStudy;
  relatedStudies: CaseStudy[];
}

export default function CaseStudyPage({ caseStudy, relatedStudies }: CaseStudyPageProps) {
  // Generate breadcrumb structured data
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
        "name": "Case Studies",
        "item": "https://siteoptz.ai/case-studies"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": caseStudy.company,
        "item": `https://siteoptz.ai/case-studies/${caseStudy.id}`
      }
    ]
  };

  // Generate case study structured data
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": caseStudy.title,
    "description": caseStudy.challenge,
    "author": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SiteOptz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://siteoptz.ai/images/siteoptz-logo.png"
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://siteoptz.ai/case-studies/${caseStudy.id}`
    },
    "articleBody": `${caseStudy.challenge} ${caseStudy.solution} ${caseStudy.businessImpact}`,
    "about": {
      "@type": "Thing",
      "name": `AI Implementation in ${caseStudy.industry}`
    },
    "mentions": caseStudy.tools.map(tool => ({
      "@type": "Thing",
      "name": tool,
      "description": `AI tool used in this implementation: ${tool}`
    }))
  };

  // Generate FAQ structured data from key takeaways
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What was the main challenge ${caseStudy.company} faced?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": caseStudy.challenge
        }
      },
      {
        "@type": "Question",
        "name": `What AI solution was implemented for ${caseStudy.company}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": caseStudy.solution
        }
      },
      {
        "@type": "Question",
        "name": `What were the business results of the AI implementation?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": caseStudy.businessImpact
        }
      },
      {
        "@type": "Question",
        "name": `How long did the implementation take?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The complete implementation took ${caseStudy.timeline}, broken down into ${caseStudy.implementation.length} phases.`
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{`${caseStudy.title} | AI Case Study | SiteOptz`}</title>
        <meta 
          name="description" 
          content={`${caseStudy.company} case study: ${caseStudy.challenge.substring(0, 150)}... Results: ${caseStudy.results[0].improvement}. Learn how AI transformed their ${caseStudy.industry} operations.`}
        />
        <meta 
          name="keywords" 
          content={`${caseStudy.company} AI case study, ${caseStudy.industry} AI implementation, ${caseStudy.tools.join(', ')}, AI ROI case study, ${caseStudy.industry.toLowerCase()} automation`}
        />
        <link rel="canonical" href={`https://siteoptz.ai/case-studies/${caseStudy.id}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${caseStudy.title} - AI Success Story`} />
        <meta property="og:description" content={`See how ${caseStudy.company} achieved ${caseStudy.results[0].improvement} with AI implementation. Real results, detailed methodology.`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://siteoptz.ai/case-studies/${caseStudy.id}`} />
        <meta property="og:image" content={`https://siteoptz.ai/images/case-studies/${caseStudy.id}.jpg`} />
        <meta property="article:author" content="SiteOptz" />
        <meta property="article:published_time" content="2024-01-01" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@siteoptz" />
        <meta name="twitter:title" content={caseStudy.title} />
        <meta name="twitter:description" content={`${caseStudy.company} achieved ${caseStudy.results[0].improvement} with AI. Learn how.`} />
        <meta name="twitter:image" content={`https://siteoptz.ai/images/case-studies/${caseStudy.id}.jpg`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/case-studies" className="hover:text-white transition-colors">
              Case Studies
            </Link>
            <span>/</span>
            <span className="text-white">{caseStudy.company}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 lg:p-12 border border-gray-800">
              {/* Company Info Bar */}
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>{caseStudy.company}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Target className="w-4 h-4 text-cyan-400" />
                  <span>{caseStudy.industry}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>{caseStudy.companySize}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>{caseStudy.timeline}</span>
                </div>
              </div>

              {/* Title and Summary */}
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                {caseStudy.title}
              </h1>

              {/* Key Results Preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {caseStudy.results.slice(0, 4).map((result, index) => (
                  <div key={index} className="bg-black/30 rounded-lg p-4 border border-gray-700">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {result.improvement}
                    </div>
                    <div className="text-sm text-gray-300">
                      {result.metric}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">The Challenge</h2>
              </div>
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <p className="text-lg text-gray-300 leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Solution</h2>
              </div>
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  {caseStudy.solution}
                </p>
                
                {/* Technologies Used */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-4">Technologies Implemented</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.tools.map((tool, index) => (
                      <span key={index} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Implementation Timeline
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {caseStudy.implementation.map((phase, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-6">
                      <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      {index < caseStudy.implementation.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-700 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 bg-black border border-gray-800 rounded-xl p-6 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-white">{phase.phase}</h3>
                        <span className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm">
                          {phase.duration}
                        </span>
                      </div>
                      <p className="text-gray-300">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Measurable Results
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Quantifiable improvements achieved through AI implementation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-xl p-6 hover:border-green-400 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">{result.metric}</h3>
                    <BarChart3 className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Before:</span>
                      <span className="text-gray-300 font-medium">{result.before}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">After:</span>
                      <span className="text-cyan-400 font-medium">{result.after}</span>
                    </div>
                    <div className="pt-3 border-t border-gray-800">
                      <div className="text-2xl font-bold text-green-400 text-center">
                        {result.improvement}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 lg:p-12 border border-cyan-400/30">
              <Quote className="w-12 h-12 text-cyan-400 mb-6" />
              <blockquote className="text-xl lg:text-2xl text-white italic leading-relaxed mb-8">
                &ldquo;{caseStudy.testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center">
                <div>
                  <div className="text-cyan-400 font-semibold text-lg">
                    {caseStudy.testimonial.author}
                  </div>
                  <div className="text-gray-300">
                    {caseStudy.testimonial.position}, {caseStudy.testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Impact Section */}
        <section className="py-16 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Business Impact</h2>
                <div className="bg-black border border-gray-800 rounded-xl p-8">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {caseStudy.businessImpact}
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Future Outlook</h2>
                <div className="bg-black border border-gray-800 rounded-xl p-8">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {caseStudy.futureOutlook}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Key Takeaways
            </h2>
            <div className="bg-black border border-gray-800 rounded-xl p-8">
              <ul className="space-y-4">
                {caseStudy.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Related Case Studies */}
        <section className="py-16 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Related Case Studies
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedStudies.map((study, index) => (
                <Link
                  key={index}
                  href={`/case-studies/${study.id}`}
                  className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-all hover:transform hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                      {study.industry}
                    </span>
                    <span className="text-gray-400 text-xs">{study.timeline}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {study.company}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {study.challenge.substring(0, 100)}...
                  </p>
                  <div className="text-green-400 font-semibold">
                    {study.results[0].improvement}
                  </div>
                  <div className="text-cyan-400 text-sm mt-4 flex items-center">
                    Read Case Study
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Achieve Similar Results?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Let&apos;s discuss how AI can transform your {caseStudy.industry.toLowerCase()} operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Schedule Consultation
                </Link>
                <Link
                  href="/case-studies"
                  className="px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-colors"
                >
                  View More Case Studies
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
  const paths = caseStudiesData.map(study => ({
    params: { id: study.id }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const caseStudy = caseStudiesData.find(study => study.id === params?.id);

  if (!caseStudy) {
    return {
      notFound: true
    };
  }

  // Get related case studies from the same industry
  const relatedStudies = caseStudiesData
    .filter(study => study.industry === caseStudy.industry && study.id !== caseStudy.id)
    .slice(0, 3);

  // If not enough from same industry, fill with others
  if (relatedStudies.length < 3) {
    const additionalStudies = caseStudiesData
      .filter(study => study.id !== caseStudy.id && !relatedStudies.includes(study))
      .slice(0, 3 - relatedStudies.length);
    relatedStudies.push(...additionalStudies);
  }

  return {
    props: {
      caseStudy,
      relatedStudies
    }
  };
};