import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

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
    console.log('🍔 Toggle clicked! Current state:', isMenuOpen);
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    console.log('🍔 New state will be:', newState);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };


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

        {/* Mobile Navigation Menu - ALWAYS VISIBLE DEBUG */}
        <div 
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'red',
            zIndex: 9999,
            overflowY: 'auto',
            display: 'block',
            border: '5px solid lime'
          }}
          className="lg:hidden"
        >
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            background: 'yellow', 
            padding: '10px', 
            color: 'black', 
            fontSize: '20px', 
            fontWeight: 'bold' 
          }}>
            🍔 ALWAYS VISIBLE TEST - State: {isMenuOpen ? 'OPEN' : 'CLOSED'}
          </div>
          
          <div style={{ 
            marginTop: '60px',
            padding: '24px',
            background: 'blue',
            minHeight: '200px',
            border: '3px solid yellow',
            color: 'white',
            fontSize: '24px'
          }}>
            <h1 style={{ color: 'white', fontSize: '30px', marginBottom: '20px' }}>🔥 FORCED CONTENT TEST</h1>
            <p style={{ color: 'yellow', fontSize: '20px', marginBottom: '10px' }}>This text should ALWAYS be visible</p>
            <p style={{ color: 'white', fontSize: '18px', marginBottom: '10px' }}>Menu state: {isMenuOpen ? 'OPEN' : 'CLOSED'}</p>
            <div style={{ background: 'green', padding: '15px', margin: '10px 0', color: 'white' }}>GREEN BOX TEST</div>
              <div style={{ background: 'orange', padding: '20px', margin: '20px 0', color: 'black' }}>
                <h2>📱 NAVIGATION LINKS</h2>
              </div>
              
              <div style={{ background: 'purple', padding: '20px', margin: '20px 0', color: 'white' }}>
                <div style={{ background: 'yellow', color: 'black', padding: '15px', margin: '10px 0', fontSize: '18px', fontWeight: 'bold' }}>🏠 HOME LINK</div>
                <div style={{ background: 'yellow', color: 'black', padding: '15px', margin: '10px 0', fontSize: '18px', fontWeight: 'bold' }}>🛠️ TOOLS LINK</div>
                <div style={{ background: 'yellow', color: 'black', padding: '15px', margin: '10px 0', fontSize: '18px', fontWeight: 'bold' }}>💰 PRICING LINK</div>
                <div style={{ background: 'yellow', color: 'black', padding: '15px', margin: '10px 0', fontSize: '18px', fontWeight: 'bold' }}>📰 BLOG LINK</div>
              </div>
              
              <div style={{ background: 'cyan', padding: '20px', color: 'black', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
                🚀 BIG BUTTON AREA
              </div>
            
            <div style={{ background: 'magenta', padding: '30px', color: 'white', fontSize: '20px' }}>
              🎉 BOTTOM TEST SECTION
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;