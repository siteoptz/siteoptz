import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Eye, Cookie, Mail, Server, Lock, Users, Globe } from 'lucide-react';

export default function Privacy() {
  const lastUpdated = 'January 15, 2025';

  const sections = [
    {
      title: 'Information We Collect',
      icon: Eye,
      content: `We collect information you provide directly to us and information we collect automatically when you use our services:

**Information You Provide:**
• Email addresses when subscribing to newsletters
• Name and company information for guide downloads
• Contact information when reaching out for support
• Feedback and survey responses

**Information Collected Automatically:**
• Website usage data and analytics
• IP addresses and general location data
• Browser type and device information
• Pages visited and time spent on site
• Referral sources and search terms`
    },
    {
      title: 'How We Use Your Information',
      icon: Server,
      content: `We use the information we collect to:

**Provide Our Services:**
• Deliver AI tool reviews and comparisons
• Send newsletters and updates to subscribers
• Provide customer support and respond to inquiries
• Improve our website and user experience

**Analytics and Improvement:**
• Analyze website traffic and user behavior
• Improve our content and recommendations
• Develop new features and services
• Conduct research and analytics

**Communications:**
• Send requested newsletters and updates
• Respond to customer service requests
• Send important service announcements
• Share relevant AI tool insights (if subscribed)`
    },
    {
      title: 'Information Sharing',
      icon: Users,
      content: `We do not sell your personal information. We may share information in these limited circumstances:

**Service Providers:**
• Email service providers for newsletter delivery
• Analytics services (Google Analytics, etc.)
• Hosting and infrastructure providers
• Customer support tools

**Legal Requirements:**
• When required by law or legal process
• To protect our rights and safety
• To investigate fraud or security issues
• In connection with business transfers

**With Your Consent:**
• When you explicitly agree to sharing
• For specific partnerships or collaborations`
    },
    {
      title: 'Cookies and Tracking',
      icon: Cookie,
      content: `We use cookies and similar technologies to improve your experience:

**Essential Cookies:**
• Session management and authentication
• Security and fraud prevention
• Basic website functionality

**Analytics Cookies:**
• Google Analytics for website statistics
• Performance monitoring and optimization
• User behavior analysis

**Marketing Cookies:**
• Social media integration
• Affiliate tracking (when applicable)
• Advertising measurement

You can control cookies through your browser settings. Disabling cookies may affect website functionality.`
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: `We implement various security measures to protect your information:

**Technical Safeguards:**
• SSL/TLS encryption for data transmission
• Secure hosting infrastructure
• Regular security updates and patches
• Access controls and authentication

**Organizational Measures:**
• Limited access to personal data
• Staff training on privacy practices
• Regular security assessments
• Incident response procedures

**Data Retention:**
• We retain data only as long as necessary
• Newsletter subscriptions until unsubscribed
• Analytics data according to service policies
• Support inquiries for reasonable periods`
    },
    {
      title: 'Your Rights and Choices',
      icon: Shield,
      content: `You have several rights regarding your personal information:

**Access and Control:**
• Request access to your personal data
• Correct inaccurate information
• Delete your data (subject to legal requirements)
• Export your data in portable formats

**Communication Preferences:**
• Unsubscribe from newsletters at any time
• Opt out of marketing communications
• Update your email preferences
• Choose notification frequency

**Browser Controls:**
• Disable cookies and tracking
• Use private/incognito browsing
• Install ad blockers or privacy extensions
• Configure browser privacy settings`
    },
    {
      title: 'Third-Party Services',
      icon: Globe,
      content: `Our website integrates with various third-party services:

**Analytics Services:**
• Google Analytics - website traffic analysis
• Privacy policy: https://policies.google.com/privacy

**Email Services:**
• SendGrid/Mailchimp - newsletter delivery
• Subject to their respective privacy policies

**Social Media:**
• Social sharing buttons and widgets
• May collect data according to their policies

**AI Tool Providers:**
• Affiliate links may track referrals
• Review their privacy policies independently

We recommend reviewing the privacy policies of any third-party services you interact with.`
    },
    {
      title: 'International Users',
      icon: Globe,
      content: `SiteOptz.ai is based in the United States, but we serve users globally:

**Data Transfers:**
• Data may be processed in the United States
• We ensure appropriate safeguards for international transfers
• EU users have specific rights under GDPR
• We comply with applicable international privacy laws

**Regional Compliance:**
• GDPR compliance for European users
• CCPA compliance for California residents
• Other regional privacy law compliance as applicable

**Contact for International Inquiries:**
For questions about international data transfers or regional privacy rights, contact us at privacy@siteoptz.ai.`
    },
    {
      title: 'Children\'s Privacy',
      icon: Shield,
      content: `SiteOptz.ai is not intended for children under 13 years of age:

**Age Restrictions:**
• We do not knowingly collect data from children under 13
• Our services are designed for business and professional use
• If we learn we have collected child data, we will delete it promptly

**Parental Rights:**
• Parents can request deletion of their child's data
• We will verify parental identity before taking action
• Contact us immediately if you believe we have child data

**Educational Use:**
• Educational institutions should review our terms before use
• Student data requires special handling and consent`
    },
    {
      title: 'Changes to This Policy',
      icon: Eye,
      content: `We may update this Privacy Policy periodically:

**Notification of Changes:**
• Material changes will be posted prominently on our website
• Email notification to subscribers for significant updates
• Previous versions will be archived for reference
• Effective date will be clearly indicated

**Your Continued Use:**
• Continued use after changes constitutes acceptance
• You may discontinue use if you disagree with changes
• Contact us with questions about policy updates

**Review Schedule:**
We review this policy annually and update it as needed to reflect changes in our practices or applicable laws.`
    },
    {
      title: 'Contact Information',
      icon: Mail,
      content: `For privacy-related questions or requests:

**Privacy Contact:**
Email: privacy@siteoptz.ai
Subject: Privacy Inquiry

**Data Protection Requests:**
• Access, correction, or deletion requests
• Questions about data processing
• Complaints about privacy practices
• Opt-out requests

**Response Time:**
We typically respond to privacy inquiries within 5 business days and fulfill data requests within 30 days, as required by applicable law.

**Mailing Address:**
SiteOptz.ai Privacy Team
San Francisco, CA`
    }
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy | SiteOptz.ai</title>
        <meta
          name="description"
          content="Privacy Policy for SiteOptz.ai. Learn how we collect, use, and protect your personal information when using our AI tool review platform."
        />
        <meta name="keywords" content="privacy policy, data protection, privacy, SiteOptz.ai, AI tools" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Privacy Policy | SiteOptz.ai" />
        <meta property="og:description" content="Privacy Policy for SiteOptz.ai AI tool review platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.siteoptz.ai/privacy" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy | SiteOptz.ai" />
        <meta name="twitter:description" content="Privacy Policy for SiteOptz.ai AI tool review platform." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.siteoptz.ai/privacy" />
        
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
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Privacy Policy
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Your privacy is important to us. Learn how we protect your data.
              </p>
              
              <div className="inline-flex items-center px-4 py-2 bg-gray-800 border border-gray-700 text-cyan-400 rounded-lg text-sm font-medium">
                <Eye className="w-4 h-4 mr-2" />
                Last updated: {lastUpdated}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Privacy Content */}
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
                Questions About Your Privacy?
              </h3>
              <p className="text-gray-300 mb-6">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:privacy@siteoptz.ai"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Privacy Team
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg font-semibold hover:bg-gray-700 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Contact Form
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}