import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Zap, 
  Mail, 
  MapPin, 
  Phone, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  ArrowRight,
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
      title: 'Popular Tools',
      links: [
        { name: 'ChatGPT', href: '/tools/chatgpt' },
        { name: 'Claude', href: '/tools/claude' },
        { name: 'Gemini', href: '/tools/gemini' },
        { name: 'Jasper AI', href: '/tools/jasper-ai' },
        { name: 'View All Tools', href: '/tools' },
      ]
    }
  ];


  const socialLinks = [
    { name: 'X', icon: Twitter, href: 'https://x.com/siteoptz', color: 'hover:text-gray-900' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/siteoptz', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/siteoptz', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@siteoptz1', color: 'hover:text-red-600' },
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
              <button 
                onClick={() => setShowEmailForm(true)}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
              >
                <Mail className="w-5 h-5" />
                <span>Subscribe to Newsletter</span>
                <ArrowRight className="w-5 h-5" />
              </button>
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
                <Image
                  src="/images/siteoptz-logo.png"
                  alt="SiteOptz AI Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                />
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
          compact={false}
          onClose={() => setShowEmailForm(false)}
          onSuccess={() => {
            // Track successful newsletter signup - but don't close modal immediately
            // Let the thank you message display first
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