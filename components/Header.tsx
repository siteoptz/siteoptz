import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { toolCategories, getCategoryUrl, getCategoryDisplayName } from '../config/categories';
import { industries, industrySlugMap } from '../content/industryContent';

const Header: React.FC = () => {
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

  // Industry dropdown menu items with shortened names
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
      name: 'AI Categories', 
      href: '/categories', 
      current: router.pathname.startsWith('/categories'),
      hasDropdown: true,
      isCategory: true
    },
    { 
      name: 'All Tools', 
      href: '/tools', 
      current: router.pathname.startsWith('/tools'),
      hasDropdown: false
    },
    {
      name: 'Industries We Help',
      href: '/industries',
      current: router.pathname.startsWith('/industries'),
      hasDropdown: true,
      isIndustry: true
    },
    { name: 'Pricing Calculator', href: '/pricing', current: router.pathname === '/pricing', hasDropdown: false },
    { name: 'Blog', href: '/blog', current: router.pathname.startsWith('/blog'), hasDropdown: false },
    { name: 'Data Room', href: '/data-room', current: router.pathname === '/data-room', hasDropdown: false },
    { name: 'Contact', href: '/contact', current: router.pathname === '/contact', hasDropdown: false },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Body scroll prevention disabled to fix button clicking issues
  // The mobile menu now allows page scrolling when open


  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-gray-800/50' 
          : 'bg-black/90 backdrop-blur-md border-b border-gray-800/20'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/images/siteoptz-logo.png"
                  alt="SiteOptz AI Logo"
                  width={48}
                  height={48}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  SiteOptz
                </div>
                <div className="text-xs lg:text-sm text-gray-400 font-medium -mt-1">
                  Turning AI Into ROI
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                    item.current
                      ? 'bg-gray-800 text-white shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                
                {/* Dropdown Menu - AI Category */}
                {item.hasDropdown && item.isCategory && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-72 bg-black rounded-xl shadow-xl border border-gray-800/50 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
                  >
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-800/50 mb-2">
                      Browse by Category
                    </div>
                    {toolCategories.map((category) => (
                      <Link
                        key={category}
                        href={`/categories/${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors border-l-2 border-transparent hover:border-cyan-400"
                      >
                        <div className="flex items-center justify-between">
                          <span>{getCategoryDisplayName(category)}</span>
                          <span className="text-xs text-gray-500">→</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                
                
                {/* Dropdown Menu - Industries */}
                {item.hasDropdown && item.isIndustry && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-72 bg-black rounded-xl shadow-xl border border-gray-800/50 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
                  >
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-800/50 mb-2">
                      Browse by Industry
                    </div>
                    {industryMenuItems.map((item) => (
                      <Link
                        key={item.industry}
                        href={`/industries/${industrySlugMap[item.industry]}`}
                        className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors border-l-2 border-transparent hover:border-cyan-400"
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.name}</span>
                          <span className="text-xs text-gray-500">→</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/tools"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Tools
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div style={{
            position: 'fixed',
            top: '80px',
            left: 0,
            right: 0,
            height: 'calc(100vh - 80px)',
            backgroundColor: '#000000',
            background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
            zIndex: 1000,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.8)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Menu</h3>
              <button onClick={closeMenu} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>✕</button>
            </div>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px', 
              height: '100%',
              overflow: 'auto',
              paddingBottom: '40px'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  color: '#06b6d4', 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>AI Categories</div>
                {toolCategories.map((category) => (
                  <Link 
                    key={category}
                    href={`/categories/${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                    onClick={closeMenu} 
                    style={{ 
                      color: 'white', 
                      textDecoration: 'none', 
                      fontSize: '16px', 
                      padding: '12px 16px', 
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.2s ease',
                      display: 'block',
                      marginLeft: '8px'
                    }}
                  >
                    {getCategoryDisplayName(category)}
                  </Link>
                ))}
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  color: '#06b6d4', 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Industries We Help</div>
                {industryMenuItems.map((item) => (
                  <Link 
                    key={item.industry}
                    href={`/industries/${industrySlugMap[item.industry]}`}
                    onClick={closeMenu} 
                    style={{ 
                      color: 'white', 
                      textDecoration: 'none', 
                      fontSize: '16px', 
                      padding: '12px 16px', 
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.2s ease',
                      display: 'block',
                      marginLeft: '8px'
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <Link href="/tools" onClick={closeMenu} style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '18px', 
                padding: '16px 0', 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease',
                display: 'block'
              }}>All Tools</Link>
              <Link href="/pricing" onClick={closeMenu} style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '18px', 
                padding: '16px 0', 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease',
                display: 'block'
              }}>Pricing</Link>
              <Link href="/blog" onClick={closeMenu} style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '18px', 
                padding: '16px 0', 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease',
                display: 'block'
              }}>Blog</Link>
              <Link href="/data-room" onClick={closeMenu} style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '18px', 
                padding: '16px 0', 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease',
                display: 'block'
              }}>Data Room</Link>
              <Link href="/contact" onClick={closeMenu} style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '18px', 
                padding: '16px 0', 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease',
                display: 'block'
              }}>Contact</Link>
              
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <Link href="/tools" onClick={closeMenu} style={{ 
                  display: 'block', 
                  width: '100%', 
                  padding: '16px', 
                  background: 'linear-gradient(to right, #06b6d4, #2563eb)', 
                  color: 'white', 
                  textDecoration: 'none', 
                  borderRadius: '8px', 
                  textAlign: 'center', 
                  fontWeight: '600',
                  fontSize: '16px'
                }}>Explore Tools</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;