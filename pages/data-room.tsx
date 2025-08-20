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
    "url": "https://www.siteoptz.ai",
    "logo": "https://www.siteoptz.ai/images/logo.png",
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
        <meta property="og:url" content="https://www.siteoptz.ai/data-room" />
        <meta property="og:image" content="https://www.siteoptz.ai/images/data-room-og.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Data Room - Verified Results & Growth | SiteOptz.ai" />
        <meta
          name="twitter:description"
          content="Explore real growth, revenue charts, and testimonials from companies scaling with SiteOptz.ai."
        />
        <meta name="twitter:image" content="https://www.siteoptz.ai/images/data-room-og.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.siteoptz.ai/data-room" />
        
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

          {/* Industry Breakdown */}
          <motion.section
            className="py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Industries We Serve
              </h2>
              <p className="text-lg text-gray-600">
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
                    className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-slate-600" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="font-semibold text-gray-900 mb-2">{industry.name}</div>
                    <div className="text-2xl font-bold text-slate-700 mb-1">{industry.count}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">clients</div>
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