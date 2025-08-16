import Head from 'next/head';
import { motion } from 'framer-motion';
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
      "ratingValue": "4.9",
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

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <motion.section
          className="bg-gradient-to-b from-white to-gray-50 pt-20 pb-16"
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
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Transparent Results
                </span>
              </motion.div>
              
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                SiteOptz.ai Data Room
              </motion.h1>
              
              <motion.p
                className="text-xl text-gray-600 max-w-3xl mx-auto"
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
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="text-3xl font-bold text-blue-600">271%</div>
                  <div className="text-sm text-gray-600">Revenue Growth</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="text-3xl font-bold text-green-600">513%</div>
                  <div className="text-sm text-gray-600">Average ROI</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="text-3xl font-bold text-purple-600">92</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="text-3xl font-bold text-orange-600">4.9</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
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
                { name: 'Healthcare', count: '23', icon: '🏥' },
                { name: 'Finance', count: '18', icon: '💰' },
                { name: 'Engineering', count: '15', icon: '⚙️' },
                { name: 'SaaS', count: '21', icon: '☁️' },
                { name: 'Aerospace', count: '15', icon: '✈️' },
              ].map((industry, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="text-3xl mb-2">{industry.icon}</div>
                  <div className="font-semibold text-gray-900">{industry.name}</div>
                  <div className="text-2xl font-bold text-blue-600 mt-2">{industry.count}</div>
                  <div className="text-xs text-gray-500">clients</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <CallToAction />
        </div>
      </main>
    </>
  );
}