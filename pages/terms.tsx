import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Scale, Shield, Eye, Clock } from 'lucide-react';

export default function Terms() {
  const lastUpdated = 'January 15, 2025';

  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: Shield,
      content: `By accessing and using SiteOptz.ai ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service ("Terms") govern your use of our website, tools, and services.`
    },
    {
      title: 'Description of Service',
      icon: Eye,
      content: `SiteOptz.ai provides AI tool reviews, comparisons, recommendations, and related services. We offer:
      
• Comprehensive reviews and ratings of AI tools
• Side-by-side tool comparisons
• Pricing information and recommendations
• Industry insights and analysis
• Newsletter and content services`
    },
    {
      title: 'User Responsibilities',
      icon: Scale,
      content: `When using our Service, you agree to:

• Provide accurate information when creating accounts or subscribing
• Use the Service only for lawful purposes
• Not attempt to interfere with the Service's operation
• Not copy, distribute, or modify our content without permission
• Respect intellectual property rights
• Not engage in spam, harassment, or abusive behavior`
    },
    {
      title: 'Intellectual Property',
      icon: Shield,
      content: `All content on SiteOptz.ai, including reviews, comparisons, logos, and design elements, is protected by copyright and trademark laws. You may not:

• Reproduce or distribute our content without permission
• Use our trademarks or branding
• Create derivative works based on our content
• Scrape or systematically extract data from our website`
    },
    {
      title: 'Data and Privacy',
      icon: Eye,
      content: `Your privacy is important to us. Our data practices include:

• Collection of necessary information for service provision
• Use of cookies and analytics for website improvement
• Email communications for subscribed users
• No sale of personal data to third parties
• Compliance with applicable privacy laws

Please review our Privacy Policy for detailed information.`
    },
    {
      title: 'Service Availability',
      icon: Clock,
      content: `While we strive for continuous availability, we do not guarantee:

• Uninterrupted access to the Service
• Error-free operation
• Accuracy of all third-party information
• Availability of specific features

We reserve the right to modify, suspend, or discontinue any part of the Service with reasonable notice.`
    },
    {
      title: 'Disclaimers and Limitations',
      icon: Scale,
      content: `Important disclaimers:

• Our reviews and recommendations are opinions based on available information
• We may receive affiliate commissions from some tool providers
• Tool features and pricing may change without notice
• We are not responsible for third-party tool performance or policies
• Use of AI tools is at your own risk and discretion`
    },
    {
      title: 'Limitation of Liability',
      icon: Shield,
      content: `To the maximum extent permitted by law:

• SiteOptz.ai's liability is limited to the amount paid for our services
• We are not liable for indirect, incidental, or consequential damages
• We do not warrant the accuracy of third-party information
• You assume full responsibility for AI tool selection and implementation`
    },
    {
      title: 'Termination',
      icon: Clock,
      content: `Either party may terminate this agreement:

• You may stop using the Service at any time
• We may terminate accounts for Terms violations
• Termination does not affect obligations incurred prior to termination
• Surviving provisions include intellectual property and limitation of liability`
    },
    {
      title: 'Changes to Terms',
      icon: Eye,
      content: `We may update these Terms periodically:

• Changes will be posted on this page
• Significant changes will be communicated via email to subscribers
• Continued use after changes constitutes acceptance
• Previous versions will be archived for reference`
    },
    {
      title: 'Governing Law',
      icon: Scale,
      content: `These Terms are governed by:

• Laws of the State of California, United States
• Jurisdiction of California state and federal courts
• Dispute resolution through binding arbitration when applicable
• English language governs interpretation of these Terms`
    },
    {
      title: 'Contact Information',
      icon: Shield,
      content: `For questions about these Terms:

Email: legal@siteoptz.ai
Address: SiteOptz.ai Legal Department
San Francisco, CA

We typically respond to legal inquiries within 5 business days.`
    }
  ];

  return (
    <>
      <Head>
        <title>Terms of Service | SiteOptz.ai</title>
        <meta
          name="description"
          content="Terms of Service for SiteOptz.ai. Review our terms and conditions for using our AI tool reviews, comparisons, and services."
        />
        <meta name="keywords" content="terms of service, legal, terms and conditions, SiteOptz.ai, AI tools" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Terms of Service | SiteOptz.ai" />
        <meta property="og:description" content="Terms of Service for SiteOptz.ai AI tool review platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.siteoptz.ai/terms" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service | SiteOptz.ai" />
        <meta name="twitter:description" content="Terms of Service for SiteOptz.ai AI tool review platform." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.siteoptz.ai/terms" />
        
        {/* Robots - Allow indexing for transparency */}
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        {/* Hero Section */}
        <motion.section
          className="relative z-10 pt-20 pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Scale className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Terms of Service
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Please read these terms carefully before using our services
              </p>
              
              <div className="inline-flex items-center px-4 py-2 bg-gray-800 border border-gray-700 text-cyan-400 rounded-lg text-sm font-medium">
                <Clock className="w-4 h-4 mr-2" />
                Last updated: {lastUpdated}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Terms Content */}
        <section className="py-16 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {sections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-black rounded-lg shadow-sm border border-gray-800 p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-cyan-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-4">
                          {section.title}
                        </h2>
                        <div className="prose prose-gray max-w-none">
                          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {section.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact Section */}
            <motion.div
              className="mt-16 bg-black border border-gray-800 rounded-lg p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Questions About These Terms?
              </h3>
              <p className="text-gray-300 mb-6">
                If you have any questions about our Terms of Service, please don&apos;t hesitate to contact us.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}