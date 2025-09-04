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
  TrendingUp,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import EmailCaptureForm from './EmailCaptureForm';
import { getCategoryUrl } from '../config/categories';
import { industries, industrySlugMap } from '../content/industryContent';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [showEmailForm, setShowEmailForm] = useState(false);
  
  // Mobile accordion states
  const [accordionStates, setAccordionStates] = useState({
    solutions: false,
    industries: false,
    company: false,
    resources: false,
  });
  
  const toggleAccordion = (section: keyof typeof accordionStates) => {
    setAccordionStates(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const solutionsLinks = [
    { name: 'SEO & Optimization', href: getCategoryUrl('SEO & Optimization') },
    { name: 'Social Media', href: getCategoryUrl('Social Media') },
    { name: 'Paid Search', href: getCategoryUrl('Paid Search & PPC') },
    { name: 'Voice AI', href: getCategoryUrl('Best Voice AI Tools') },
    { name: 'Code Generation', href: getCategoryUrl('Code Generation') },
    { name: 'Content Creation', href: getCategoryUrl('Content Creation') },
    { name: 'Data Analysis', href: getCategoryUrl('Data Analysis') },
    { name: 'Image Generation', href: getCategoryUrl('Image Generation') },
    { name: 'Research', href: getCategoryUrl('Research & Education') },
    { name: 'Productivity', href: getCategoryUrl('Productivity') },
    { name: 'Email Marketing', href: getCategoryUrl('Email Marketing') },
    { name: 'Video Generation', href: getCategoryUrl('Video Generation') },
  ];

  const industriesLinks = [
    { name: 'Healthcare', href: `/industries/${industrySlugMap['Healthcare & Life Sciences']}` },
    { name: 'Finance', href: `/industries/${industrySlugMap['Finance & Banking']}` },
    { name: 'Retail', href: `/industries/${industrySlugMap['Retail & E-Commerce']}` },
    { name: 'Manufacturing', href: `/industries/${industrySlugMap['Manufacturing & Supply Chain']}` },
    { name: 'Transport', href: `/industries/${industrySlugMap['Transportation & Logistics']}` },
    { name: 'Marketing', href: `/industries/${industrySlugMap['Marketing, Advertising & Media']}` },
    { name: 'Energy', href: `/industries/${industrySlugMap['Energy & Utilities']}` },
    { name: 'Education', href: `/industries/${industrySlugMap['Education & EdTech']}` },
    { name: 'Legal', href: `/industries/${industrySlugMap['Legal & Compliance']}` },
    { name: 'HR', href: `/industries/${industrySlugMap['Human Resources & Recruiting']}` },
    { name: 'Aerospace', href: `/industries/${industrySlugMap['Aerospace & Defense']}` },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  const resourcesLinks = [
    { name: 'Resources', href: '/resources' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'AI Library', href: 'https://www.siteoptz.ai/tools/' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'Developers', href: '/docs/api' },
  ];


  const socialLinks = [
    { name: 'X', icon: Twitter, href: 'https://x.com/siteoptz', color: 'hover:text-gray-900' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/siteoptz', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/siteoptz', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@siteoptz1', color: 'hover:text-red-600' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mobile Layout */}
        <div className="block md:hidden space-y-6">
          {/* Logo + CTA + Social - Mobile */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
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
                  Turning AI Into ROI
                </div>
              </div>
            </Link>

            <a 
              href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>Get Started</span>
            </a>

            <div className="flex space-x-3 justify-center">
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

          {/* Mobile Accordion Sections */}
          {/* Solutions Accordion */}
          <div className="border-t border-gray-700 pt-4">
            <button
              onClick={() => toggleAccordion('solutions')}
              className="flex items-center justify-between w-full py-3 text-left"
            >
              <h3 className="text-lg font-semibold text-white">Solutions</h3>
              {accordionStates.solutions ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {accordionStates.solutions && (
              <div className="pb-4">
                <ul className="space-y-2 pl-4">
                  {solutionsLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Industries Accordion */}
          <div className="border-t border-gray-700 pt-4">
            <button
              onClick={() => toggleAccordion('industries')}
              className="flex items-center justify-between w-full py-3 text-left"
            >
              <h3 className="text-lg font-semibold text-white">Industries</h3>
              {accordionStates.industries ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {accordionStates.industries && (
              <div className="pb-4">
                <ul className="space-y-2 pl-4">
                  {industriesLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Company Accordion */}
          <div className="border-t border-gray-700 pt-4">
            <button
              onClick={() => toggleAccordion('company')}
              className="flex items-center justify-between w-full py-3 text-left"
            >
              <h3 className="text-lg font-semibold text-white">Company</h3>
              {accordionStates.company ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {accordionStates.company && (
              <div className="pb-4">
                <ul className="space-y-2 pl-4">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Resources Accordion */}
          <div className="border-t border-gray-700 pt-4">
            <button
              onClick={() => toggleAccordion('resources')}
              className="flex items-center justify-between w-full py-3 text-left"
            >
              <h3 className="text-lg font-semibold text-white">Resources</h3>
              {accordionStates.resources ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {accordionStates.resources && (
              <div className="pb-4">
                <ul className="space-y-2 pl-4">
                  {resourcesLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {/* Left Column - Logo + Tagline + CTA + Social */}
          <div className="space-y-6">
            {/* Logo and Tagline */}
            <Link href="/" className="flex items-center space-x-3 group">
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
                  Turning AI Into ROI
                </div>
              </div>
            </Link>

            {/* Get Started CTA Button */}
            <a 
              href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>Get Started</span>
            </a>

            {/* Social Icons */}
            <div>
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

          {/* Solutions Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Solutions</h3>
            <ul className="space-y-2">
              {solutionsLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Industries</h3>
            <ul className="space-y-2">
              {industriesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Company and Resources */}
          <div className="space-y-8">
            {/* Company Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                {resourcesLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              <p>&copy; {currentYear} SiteOptz.ai</p>
              <p>All rights reserved</p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      {showEmailForm && (
        <EmailCaptureForm
          source="footer_cta"
          showModal={true}
          compact={false}
          onClose={() => setShowEmailForm(false)}
          onSuccess={() => {
            // Track successful signup
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'get_started_footer', {
                event_category: 'engagement',
                event_label: 'footer_cta',
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