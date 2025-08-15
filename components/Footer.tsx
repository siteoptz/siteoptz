import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Mail, 
  MapPin, 
  Phone, 
  Twitter, 
  Github, 
  Linkedin, 
  Youtube,
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react';
import EmailCaptureForm from './EmailCaptureForm';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [showEmailForm, setShowEmailForm] = useState(false);

  const footerSections = [
    {
      title: 'AI Tools',
      links: [
        { name: 'All AI Tools', href: '/tools' },
        { name: 'AI Assistants', href: '/tools?category=ai-assistant' },
        { name: 'Content Creation', href: '/tools?category=content-creation' },
        { name: 'SEO Tools', href: '/tools?category=seo-tool' },
        { name: 'Image Generation', href: '/tools?category=image-generation' },
      ]
    },
    {
      title: 'Compare',
      links: [
        { name: 'Tool Comparison', href: '/compare' },
        { name: 'ChatGPT vs Claude', href: '/compare/chatgpt/vs/claude' },
        { name: 'ChatGPT vs Gemini', href: '/compare/chatgpt/vs/gemini' },
        { name: 'Claude vs Gemini', href: '/compare/claude/vs/gemini' },
        { name: 'Pricing Calculator', href: '/pricing' },
      ]
    },
    {
      title: 'Reviews',
      links: [
        { name: 'ChatGPT Review', href: '/reviews/chatgpt' },
        { name: 'Claude Review', href: '/reviews/claude' },
        { name: 'Gemini Review', href: '/reviews/gemini' },
        { name: 'Jasper AI Review', href: '/reviews/jasper-ai' },
        { name: 'All Reviews', href: '/tools' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'AI News', href: '/blog' },
        { name: 'How-to Guides', href: '/guides' },
        { name: 'Tool Directory', href: '/tools' },
        { name: 'Best Practices', href: '/best-practices' },
        { name: 'AI Trends', href: '/trends' },
      ]
    }
  ];

  const popularTools = [
    { name: 'ChatGPT', href: '/tools/chatgpt', rating: '9.2' },
    { name: 'Claude', href: '/tools/claude', rating: '9.0' },
    { name: 'Gemini', href: '/tools/gemini', rating: '8.7' },
    { name: 'Jasper AI', href: '/tools/jasper-ai', rating: '8.8' },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-900' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Stay Ahead with AI Insights
              </h3>
              <p className="text-gray-300 text-lg">
                Get the latest AI tool reviews, comparisons, and exclusive insights delivered to your inbox weekly.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    onFocus={() => setShowEmailForm(true)}
                    readOnly
                  />
                </div>
                <button 
                  onClick={() => setShowEmailForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-400">
                Join 50,000+ AI enthusiasts. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SiteOptz
                </div>
                <div className="text-sm text-gray-400 font-medium -mt-1">
                  AI Tools Expert
                </div>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted guide to the best AI tools. We review, compare, and recommend the top artificial intelligence 
              solutions to help you work smarter and faster.
            </p>
            
            {/* Popular Tools Quick Links */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Popular Tools</h4>
              <div className="space-y-2">
                {popularTools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <span className="text-gray-300 group-hover:text-white text-sm">{tool.name}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-400">{tool.rating}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`p-2 bg-gray-800 rounded-lg text-gray-400 ${social.color} hover:bg-gray-700 transition-all duration-200 hover:scale-110`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-2 group"
                    >
                      <span>{link.name}</span>
                      {link.name.includes('vs') && (
                        <TrendingUp className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>&copy; {currentYear} SiteOptz. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      {showEmailForm && (
        <EmailCaptureForm
          source="footer_newsletter"
          showModal={true}
          onClose={() => setShowEmailForm(false)}
          onSuccess={() => {
            setShowEmailForm(false);
            // Track successful newsletter signup
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'newsletter_signup', {
                event_category: 'engagement',
                event_label: 'footer',
                value: 1
              });
            }
          }}
        />
      )}
    </footer>
  );
};

export default Footer;