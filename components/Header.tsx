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
    console.log('Toggle clicked, current state:', isMenuOpen);
    setIsMenuOpen(prev => !prev);
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

  // Temporarily disabled to prevent page locking
  // useEffect(() => {
  //   if (isMenuOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'unset';
  //   }
  //   return () => {
  //     document.body.style.overflow = 'unset';
  //   };
  // }, [isMenuOpen]);

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

        {/* Mobile Navigation Menu - Debug State: {isMenuOpen ? 'OPEN' : 'CLOSED'} */}
        {isMenuOpen === true && (
          <div 
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom right, #0f172a, #1e3a8a, #312e81)',
              zIndex: 9999,
              overflowY: 'auto',
              display: 'block'
            }}
            className="lg:hidden"
          >
            <div style={{ padding: '24px' }}>
              {/* Close button header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Navigation</h3>
                <button
                  onClick={closeMenu}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    color: '#9ca3af',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Navigation items */}
              <div style={{ marginBottom: '32px' }}>
                {navigation.map((item) => (
                  <div key={item.name} style={{ marginBottom: '8px' }}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      style={{
                        display: 'block',
                        padding: '16px 24px',
                        borderRadius: '12px',
                        fontSize: '18px',
                        fontWeight: '500',
                        color: item.current ? 'white' : '#d1d5db',
                        backgroundColor: item.current ? '#2563eb' : 'transparent',
                        textDecoration: 'none'
                      }}
                    >
                      {item.name}
                    </Link>
                    {item.hasDropdown && item.dropdownItems && (
                      <div style={{ marginLeft: '24px', marginTop: '8px' }}>
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            onClick={closeMenu}
                            style={{
                              display: 'block',
                              padding: '8px 16px',
                              color: '#9ca3af',
                              fontSize: '14px',
                              textDecoration: 'none'
                            }}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* CTA Button */}
              <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <Link
                  href="/tools"
                  onClick={closeMenu}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '16px 24px',
                    background: 'linear-gradient(to right, #06b6d4, #2563eb)',
                    color: 'white',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontSize: '16px'
                  }}
                >
                  🚀 Explore Tools
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