import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { toolCategories, getCategoryUrl, getCategoryDisplayName } from '../config/categories';
import { industries, industrySlugMap } from '../content/industryContent';

const SemanticHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  
  // Mobile accordion states
  const [mobileAccordions, setMobileAccordions] = useState({
    categories: false,
    tools: false,
    industries: false,
    resources: false,
  });
  
  const toggleMobileAccordion = (section: keyof typeof mobileAccordions) => {
    setMobileAccordions(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Industry dropdown menu items
  const industryMenuItems = [
    { name: 'Healthcare AI Solutions', industry: 'Healthcare & Life Sciences' },
    { name: 'Finance & Banking AI', industry: 'Finance & Banking' },
    { name: 'Retail & E-Commerce AI', industry: 'Retail & E-Commerce' },
    { name: 'Manufacturing AI', industry: 'Manufacturing & Supply Chain' },
    { name: 'Transportation & Logistics AI', industry: 'Transportation & Logistics' },
    { name: 'Marketing & Media AI', industry: 'Marketing, Advertising & Media' },
    { name: 'Energy & Utilities AI', industry: 'Energy & Utilities' },
    { name: 'Education AI', industry: 'Education & EdTech' },
    { name: 'Legal AI', industry: 'Legal & Compliance' },
    { name: 'HR & Recruiting AI', industry: 'Human Resources & Recruiting' },
    { name: 'Aerospace & Defense AI', industry: 'Aerospace & Defense' }
  ];

  const navigation = [
    { 
      name: 'AI Category', 
      href: '/categories', 
      current: router.pathname.startsWith('/categories'),
      hasDropdown: true,
      isCategory: true
    },
    { 
      name: 'Tools', 
      href: '/tools', 
      current: router.pathname.startsWith('/tools'),
      hasDropdown: true
    },
    {
      name: 'Industries We Help',
      href: '/industries',
      current: router.pathname.startsWith('/industries'),
      hasDropdown: true,
      isIndustry: true
    },
    { name: 'Pricing Calculator', href: '/pricing', current: router.pathname === '/pricing' },
    { name: 'Data Room', href: '/data-room', current: router.pathname === '/data-room' },
    { 
      name: 'AI News', 
      href: '/blog', 
      current: router.pathname.startsWith('/blog'),
      hasDropdown: false
    },
    { name: 'Contact', href: '/contact', current: router.pathname === '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-gray-800/50' 
          : 'bg-black/90 backdrop-blur-md border-b border-gray-800/20'
      }`}
      role="banner"
      aria-label="Main navigation"
    >
      <nav 
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Primary navigation"
      >
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-3 group"
              aria-label="SiteOptz - Home"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-black rounded-lg p-2">
                  <Image
                    src="/images/logo-white.png"
                    alt="SiteOptz Logo"
                    width={40}
                    height={40}
                    className="h-8 w-auto lg:h-10 transition-transform group-hover:scale-105"
                  />
                </div>
              </div>
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent transition-all group-hover:from-cyan-400 group-hover:to-blue-400">
                SiteOptz
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-8" role="menubar">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center space-x-1 ${
                    item.current
                      ? 'text-cyan-400 bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  role="menuitem"
                  aria-current={item.current ? 'page' : undefined}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                </Link>
                
                {/* Dropdown menus - using semantic list structure */}
                {item.hasDropdown && item.isCategory && (
                  <nav
                    className="absolute top-full left-0 mt-2 w-64 bg-gray-900 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100"
                    role="menu"
                    aria-label="Category submenu"
                  >
                    <ul className="p-4 space-y-2">
                      {Object.values(toolCategories).map((category) => (
                        <li key={category} role="none">
                          <Link
                            href={getCategoryUrl(category)}
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
                            role="menuitem"
                          >
                            {getCategoryDisplayName(category)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="lg:hidden fixed inset-x-0 top-16 bg-black/95 backdrop-blur-md border-t border-gray-800/50 max-h-[calc(100vh-4rem)] overflow-y-auto"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-6 space-y-2">
              {navigation.map((item) => (
                <div key={item.name} className="space-y-2">
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => toggleMobileAccordion(item.isCategory ? 'categories' : item.isIndustry ? 'industries' : 'tools')}
                        className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                        aria-expanded={mobileAccordions[item.isCategory ? 'categories' : item.isIndustry ? 'industries' : 'tools']}
                        aria-controls={`mobile-${item.name.toLowerCase().replace(' ', '-')}-menu`}
                      >
                        <span>{item.name}</span>
                        {mobileAccordions[item.isCategory ? 'categories' : item.isIndustry ? 'industries' : 'tools'] ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                        }
                      </button>
                      {mobileAccordions[item.isCategory ? 'categories' : item.isIndustry ? 'industries' : 'tools'] && (
                        <ul 
                          id={`mobile-${item.name.toLowerCase().replace(' ', '-')}-menu`}
                          className="pl-4 space-y-2"
                        >
                          {item.isCategory && Object.values(toolCategories).map((category) => (
                            <li key={category}>
                              <Link
                                href={getCategoryUrl(category)}
                                className="block px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
                                onClick={closeMenu}
                              >
                                {getCategoryDisplayName(category)}
                              </Link>
                            </li>
                          ))}
                          {item.isIndustry && industryMenuItems.map((industry) => (
                            <li key={industry.industry}>
                              <Link
                                href={`/industries/${industrySlugMap[industry.industry]}`}
                                className="block px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
                                onClick={closeMenu}
                              >
                                {industry.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                        item.current
                          ? 'text-cyan-400 bg-white/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </nav>
    </header>
  );
};

export default SemanticHeader;