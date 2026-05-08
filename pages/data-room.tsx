import Head from 'next/head';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Settings, Cloud, Plane } from 'lucide-react';
import { TestimonialsSection } from '../components/data-room/TestimonialsSection';
import { GrowthCharts } from '../components/data-room/GrowthCharts';
import { CallToAction } from '../components/data-room/CallToAction';

export default function DataRoom() {
  // Schema markup for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the SiteOptz.ai Data Room?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Data Room showcases verified results, testimonials, and growth metrics from businesses across industries using SiteOptz.ai."
        }
      },
      {
        "@type": "Question",
        "name": "Which industries has SiteOptz.ai helped?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our clients include companies in healthcare, engineering, aeronautics, finance, and SaaS who use SiteOptz.ai to accelerate growth."
        }
      },
      {
        "@type": "Question",
        "name": "How much growth can I expect with SiteOptz.ai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While results vary by industry and implementation, our clients typically see 40-60% growth in key metrics within the first 3-6 months."
        }
      },
      {
        "@type": "Question",
        "name": "Is the data in the Data Room verified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all metrics and testimonials are from verified SiteOptz.ai customers and represent actual results achieved using our platform."
        }
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SiteOptz.ai",
    "url": "https://siteoptz.ai",
    "logo": "https://siteoptz.ai/images/logo.png",
    "description": "AI-powered platform for business growth and automation",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "92",
      "bestRating": "5"
    }
  };

  return (
    <>
      <Head>
        <title>Data Room - Verified Results & Growth | SiteOptz.ai</title>
        <meta
          name="description"
          content="Explore real growth, revenue charts, and testimonials from companies scaling with SiteOptz.ai in healthcare, finance, engineering, and SaaS."
        />
        <meta
          name="keywords"
          content="SiteOptz.ai results, customer testimonials, growth metrics, revenue data, case studies, ROI calculator, business growth"
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Data Room - Verified Results & Growth | SiteOptz.ai" />
        <meta
          property="og:description"
          content="Explore real growth, revenue charts, and testimonials from companies scaling with SiteOptz.ai."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/data-room" />
        <meta property="og:image" content="https://siteoptz.ai/images/data-room-og.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Data Room - Verified Results & Growth | SiteOptz.ai" />
        <meta
          name="twitter:description"
          content="Explore real growth, revenue charts, and testimonials from companies scaling with SiteOptz.ai."
        />
        <meta name="twitter:image" content="https://siteoptz.ai/images/data-room-og.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://siteoptz.ai/data-room" />
        
        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <motion.section
          className="bg-gray-950 pt-20 pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 border border-gray-700 text-cyan-400">
                  Transparent Results
                </span>
              </motion.div>
              
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                SiteOptz.ai Data Room
              </motion.h1>
              
              <motion.p
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Verified testimonials, revenue charts, and growth metrics from businesses using SiteOptz.ai to accelerate their success.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-black border border-gray-800 rounded-lg shadow-md p-4">
                  <div className="text-3xl font-bold text-blue-400">499%</div>
                  <div className="text-sm text-gray-300">Revenue Growth</div>
                </div>
                <div className="bg-black border border-gray-800 rounded-lg shadow-md p-4">
                  <div className="text-3xl font-bold text-green-400">427%</div>
                  <div className="text-sm text-gray-300">Average ROI</div>
                </div>
                <div className="bg-black border border-gray-800 rounded-lg shadow-md p-4">
                  <div className="text-3xl font-bold text-purple-400">92</div>
                  <div className="text-sm text-gray-300">Happy Clients</div>
                </div>
                <div className="bg-black border border-gray-800 rounded-lg shadow-md p-4">
                  <div className="text-3xl font-bold text-orange-400">4.8</div>
                  <div className="text-sm text-gray-300">Customer Rating</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-20">
          {/* Growth Charts Section */}
          <GrowthCharts />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* Comprehensive Results Overview */}
          <motion.section 
            className="py-16 bg-gray-900/30 rounded-2xl border border-gray-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Verified Results Across All Client Engagements</h2>
                <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-8">
                  The SiteOptz Data Room provides complete transparency into the real results achieved by our clients 
                  across diverse industries and use cases. Every metric shown represents verified outcomes from actual 
                  business implementations of AI tools and strategies.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Performance Methodology</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Our data collection methodology ensures accuracy and reliability across all client engagements. 
                    We implement comprehensive tracking systems that measure both leading and lagging indicators, 
                    providing a complete picture of AI implementation success across different business functions.
                  </p>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Key performance indicators are established during the initial engagement phase and monitored 
                    continuously throughout implementation. This approach allows us to demonstrate clear causation 
                    between AI tool deployment and business outcomes, not just correlation.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Pre-implementation baseline measurement</li>
                    <li>• Weekly progress tracking and optimization</li>
                    <li>• Quarterly comprehensive performance reviews</li>
                    <li>• 12-month ROI validation and reporting</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Client Success Metrics</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Our 92 verified clients represent organizations ranging from Series A startups to Fortune 500 
                    enterprises. The average engagement duration is 18 months, during which we implement strategic AI 
                    solutions that deliver measurable business value within the first quarter.
                  </p>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    The 427% average ROI represents actual financial returns calculated using standardized methodologies 
                    that account for implementation costs, training expenses, and ongoing operational considerations. 
                    Revenue growth figures are validated through third-party financial reporting where applicable.
                  </p>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-4">
                    <h4 className="text-lg font-bold text-cyan-400 mb-3">Verification Standards</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Independent financial auditing for ROI claims</li>
                      <li>• Client-approved testimonials and case studies</li>
                      <li>• Third-party performance validation where possible</li>
                      <li>• Standardized measurement frameworks across industries</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Why Transparency Matters in AI Implementation</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  The AI industry is filled with inflated claims and unsubstantiated promises. Our Data Room represents 
                  a commitment to transparency and accountability that sets us apart. Every number displayed here can be 
                  verified through client references and supporting documentation.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  We believe that businesses deserve honest, data-driven insights when evaluating AI implementation 
                  partners. Our open-book approach demonstrates confidence in our methodologies and respect for the 
                  investment our clients make in AI transformation.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This level of transparency also enables prospective clients to set realistic expectations and 
                  understand the timeline and resources required for successful AI deployment. We focus on sustainable, 
                  long-term value creation rather than quick wins that don&apos;t scale.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Industry Breakdown */}
          <motion.section
            className="py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Industries We Serve
              </h2>
              <p className="text-lg text-gray-300">
                Trusted across diverse sectors for AI-driven growth
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { name: 'Healthcare', count: '23', icon: Heart },
                { name: 'Finance', count: '18', icon: TrendingUp },
                { name: 'Engineering', count: '15', icon: Settings },
                { name: 'SaaS', count: '21', icon: Cloud },
                { name: 'Aerospace', count: '15', icon: Plane },
              ].map((industry, index) => {
                const IconComponent = industry.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-black border border-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg hover:border-gray-600 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-cyan-400" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="font-semibold text-white mb-2">{industry.name}</div>
                    <div className="text-2xl font-bold text-cyan-400 mb-1">{industry.count}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">clients</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Call to Action */}
          <CallToAction />
        </div>
      </main>
    </>
  );
}