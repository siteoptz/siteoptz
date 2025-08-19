import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', current: router.pathname === '/' },
    { 
      name: 'Tools', 
      href: '/tools', 
      current: router.pathname.startsWith('/tools'),
      hasDropdown: true,
      dropdownItems: [
        { name: 'All AI Tools', href: '/tools' },
        { name: 'AI Assistants', href: '/tools?category=ai-assistant' },
        { name: 'Content Creation', href: '/tools?category=content-creation' },
        { name: 'SEO Tools', href: '/tools?category=seo-tool' },
        { name: 'Image Generation', href: '/tools?category=image-generation' },
      ]
    },
    { name: 'Pricing Calculator', href: '/pricing', current: router.pathname === '/pricing' },
    { name: 'Data Room', href: '/data-room', current: router.pathname === '/data-room' },
    { 
      name: 'AI News', 
      href: '/blog', 
      current: router.pathname.startsWith('/blog'),
      hasDropdown: false
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMenuBackgroundClick = (e: React.MouseEvent) => {
    // Only close if clicking the background area (outside menu content)
    const target = e.target as HTMLElement;
    const isBackgroundClick = target.classList.contains('mobile-menu-scroll') || 
                              target.getAttribute('role') === 'dialog';
    
    if (isBackgroundClick) {
      closeMenu();
    }
  };

  const handleMenuBackgroundKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard events for accessibility
    if (e.key === 'Escape') {
      closeMenu();
    }
  };

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white/90 backdrop-blur-md border-b border-white/20'
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
                <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  SiteOptz
                </div>
                <div className="text-xs lg:text-sm text-gray-500 font-medium -mt-1">
                  AI Tools Expert
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
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                  }`}
                  onMouseEnter={() => item.hasDropdown && setIsToolsDropdownOpen(true)}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                {item.hasDropdown && item.dropdownItems && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200/50 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
                    onMouseLeave={() => setIsToolsDropdownOpen(false)}
                  >
                    {item.dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        {dropdownItem.name}
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
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-white border-t border-gray-200 shadow-xl z-50 overflow-y-auto">
            <div className="px-4 py-6 space-y-1">
              {/* Close button header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Navigation items */}
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      item.current
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          onClick={closeMenu}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* CTA Button */}
              <div className="pt-6 border-t border-gray-200 mt-6">
                <Link
                  href="/tools"
                  onClick={closeMenu}
                  className="block w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-center hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Explore Tools
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;