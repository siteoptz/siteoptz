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

const SemanticFooter: React.FC = () => {
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
    { name: 'AI Library', href: 'https://siteoptz.ai/tools/' },
    { name: 'Webinars', href: '/webinars' },
  ];

  const socialLinks = [
    { name: 'X', icon: Twitter, href: 'https://x.com/siteoptz', color: 'hover:text-gray-900' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/siteoptz', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/siteoptz', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@siteoptz1', color: 'hover:text-red-600' },
  ];

  return (
    <footer 
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mobile Layout */}
        <div className="block md:hidden space-y-6">
          {/* Logo + CTA + Social - Mobile */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-black rounded-lg p-2">
                  <Image
                    src="/images/logo-white.png"
                    alt="SiteOptz"
                    width={40}
                    height={40}
                    className="h-8 w-auto transition-transform group-hover:scale-105"
                  />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                SiteOptz
              </span>
            </Link>
            
            <p className="text-gray-400 text-sm">
              Empowering businesses with AI-powered tools comparison and insights to make smarter software decisions.
            </p>
            
            {/* Social Links - Mobile */}
            <nav aria-label="Social media links">
              <ul className="flex space-x-4">
                {socialLinks.map(({ name, icon: Icon, href, color }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-200 transform hover:scale-110 flex items-center justify-center ${color}`}
                      aria-label={`Visit our ${name} page`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Newsletter CTA - Mobile */}
            <section aria-labelledby="newsletter-mobile">
              <h2 id="newsletter-mobile" className="sr-only">Newsletter signup</h2>
              <button
                onClick={() => setShowEmailForm(!showEmailForm)}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                aria-expanded={showEmailForm}
                aria-controls="email-form-mobile"
              >
                Get AI Insights Weekly
              </button>
              {showEmailForm && (
                <div id="email-form-mobile" className="mt-4">
                  <EmailCaptureForm />
                </div>
              )}
            </section>
          </div>
          
          {/* Accordion Links - Mobile */}
          <nav aria-label="Footer navigation">
            {/* Solutions Section */}
            <section className="border-t border-gray-700 pt-4">
              <h3>
                <button
                  onClick={() => toggleAccordion('solutions')}
                  className="w-full flex items-center justify-between py-2 text-left"
                  aria-expanded={accordionStates.solutions}
                  aria-controls="solutions-links-mobile"
                >
                  <span className="text-base font-semibold text-gray-100">AI Solutions</span>
                  {accordionStates.solutions ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </h3>
              {accordionStates.solutions && (
                <ul id="solutions-links-mobile" className="mt-2 space-y-2 pb-4">
                  {solutionsLinks.map(({ name, href }) => (
                    <li key={name}>
                      <Link href={href} className="block py-1 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            
            {/* Industries Section */}
            <section className="border-t border-gray-700 pt-4">
              <h3>
                <button
                  onClick={() => toggleAccordion('industries')}
                  className="w-full flex items-center justify-between py-2 text-left"
                  aria-expanded={accordionStates.industries}
                  aria-controls="industries-links-mobile"
                >
                  <span className="text-base font-semibold text-gray-100">Industries</span>
                  {accordionStates.industries ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </h3>
              {accordionStates.industries && (
                <ul id="industries-links-mobile" className="mt-2 space-y-2 pb-4">
                  {industriesLinks.map(({ name, href }) => (
                    <li key={name}>
                      <Link href={href} className="block py-1 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            
            {/* Company Section */}
            <section className="border-t border-gray-700 pt-4">
              <h3>
                <button
                  onClick={() => toggleAccordion('company')}
                  className="w-full flex items-center justify-between py-2 text-left"
                  aria-expanded={accordionStates.company}
                  aria-controls="company-links-mobile"
                >
                  <span className="text-base font-semibold text-gray-100">Company</span>
                  {accordionStates.company ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </h3>
              {accordionStates.company && (
                <ul id="company-links-mobile" className="mt-2 space-y-2 pb-4">
                  {companyLinks.map(({ name, href }) => (
                    <li key={name}>
                      <Link href={href} className="block py-1 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            
            {/* Resources Section */}
            <section className="border-t border-gray-700 pt-4">
              <h3>
                <button
                  onClick={() => toggleAccordion('resources')}
                  className="w-full flex items-center justify-between py-2 text-left"
                  aria-expanded={accordionStates.resources}
                  aria-controls="resources-links-mobile"
                >
                  <span className="text-base font-semibold text-gray-100">Resources</span>
                  {accordionStates.resources ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </h3>
              {accordionStates.resources && (
                <ul id="resources-links-mobile" className="mt-2 space-y-2 pb-4">
                  {resourcesLinks.map(({ name, href }) => (
                    <li key={name}>
                      <Link href={href} className="block py-1 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </nav>
        </div>
        
        {/* Desktop Layout (using semantic HTML sections) */}
        <div className="hidden md:grid md:grid-cols-12 md:gap-8">
          {/* Logo + CTA Column */}
          <section className="col-span-4 space-y-6" aria-labelledby="footer-logo">
            <h2 id="footer-logo" className="sr-only">SiteOptz</h2>
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-black rounded-lg p-2">
                  <Image
                    src="/images/logo-white.png"
                    alt="SiteOptz"
                    width={48}
                    height={48}
                    className="h-10 w-auto lg:h-12 transition-transform group-hover:scale-105"
                  />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                SiteOptz
              </span>
            </Link>
            
            <p className="text-gray-400">
              Empowering businesses with AI-powered tools comparison and insights to make smarter software decisions.
            </p>
            
            {/* Newsletter Form */}
            <section aria-labelledby="newsletter-desktop">
              <h3 id="newsletter-desktop" className="text-lg font-semibold mb-3">Get AI Insights Weekly</h3>
              <EmailCaptureForm />
            </section>
            
            {/* Social Links */}
            <nav aria-label="Social media links">
              <ul className="flex space-x-4">
                {socialLinks.map(({ name, icon: Icon, href, color }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-200 transform hover:scale-110 flex items-center justify-center ${color}`}
                      aria-label={`Visit our ${name} page`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
          
          {/* Links Grid */}
          <nav className="col-span-8 grid grid-cols-4 gap-8" aria-label="Footer navigation">
            {/* Solutions */}
            <section>
              <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase mb-4">AI Solutions</h3>
              <ul className="space-y-3">
                {solutionsLinks.slice(0, 6).map(({ name, href }) => (
                  <li key={name}>
                    <Link href={href} className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            
            {/* More Solutions */}
            <section>
              <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase mb-4">More Solutions</h3>
              <ul className="space-y-3">
                {solutionsLinks.slice(6).map(({ name, href }) => (
                  <li key={name}>
                    <Link href={href} className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            
            {/* Industries */}
            <section>
              <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase mb-4">Industries</h3>
              <ul className="space-y-3">
                {industriesLinks.slice(0, 6).map(({ name, href }) => (
                  <li key={name}>
                    <Link href={href} className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            
            {/* Company & Resources */}
            <section>
              <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map(({ name, href }) => (
                  <li key={name}>
                    <Link href={href} className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase mb-4 mt-6">Resources</h3>
              <ul className="space-y-3">
                {resourcesLinks.map(({ name, href }) => (
                  <li key={name}>
                    <Link href={href} className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </nav>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} SiteOptz. All rights reserved.
            </p>
            
            <nav className="mt-4 md:mt-0" aria-label="Legal links">
              <ul className="flex justify-center md:justify-end space-x-6">
                <li>
                  <Link href="/privacy" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap.xml" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SemanticFooter;