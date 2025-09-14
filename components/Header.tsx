import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, ChevronDown, ChevronUp, User, LogOut } from 'lucide-react';
import { toolCategories, getCategoryUrl, getCategoryDisplayName } from '../config/categories';
import { industries, industrySlugMap } from '../content/industryContent';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

// Accordion category structure for AI Categories dropdown
const accordionCategories = [
  {
    name: 'Content & Creativity',
    subcategories: [
      { name: 'Content Creation', value: 'Content Creation' },
      { name: 'Image Generation', value: 'Image Generation' },
      { name: 'Video Generation', value: 'Video Generation' },
      { name: 'Writing', value: 'Writing' }
    ]
  },
  {
    name: 'Voice & Communication',
    subcategories: [
      { name: 'Voice AI', value: 'Voice AI' },
      { name: 'Best Voice AI Tools', value: 'Best Voice AI Tools' },
      { name: 'AI Translator', value: 'AI Translator' }
    ]
  },
  {
    name: 'Marketing & Growth',
    subcategories: [
      { name: 'SEO & Optimization', value: 'SEO & Optimization' },
      { name: 'Paid Search & PPC', value: 'Paid Search & PPC' },
      { name: 'Social Media', value: 'Social Media' },
      { name: 'Email Marketing', value: 'Email Marketing' },
      { name: 'Lead Generation', value: 'Lead Generation' }
    ]
  },
  {
    name: 'Business & Analytics',
    subcategories: [
      { name: 'Data Analysis', value: 'Data Analysis' },
      { name: 'Finance AI', value: 'Finance AI' },
      { name: 'AI For Business', value: 'AI For Business' },
      { name: 'E-commerce', value: 'E-commerce' }
    ]
  },
  {
    name: 'Development & Automation',
    subcategories: [
      { name: 'Code Generation', value: 'Code Generation' },
      { name: 'AI Automation', value: 'AI Automation' },
      { name: 'AI Website Builder', value: 'AI Website Builder' },
      { name: 'Website Builder', value: 'Website Builder' },
      { name: 'UX', value: 'UX' }
    ]
  },
  {
    name: 'Education & Personal',
    subcategories: [
      { name: 'AI Education', value: 'AI Education' },
      { name: 'Research & Education', value: 'Research & Education' },
      { name: 'Health AI', value: 'Health AI' },
      { name: 'Productivity', value: 'Productivity' }
    ]
  }
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  
  // Modal state management
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // Desktop category accordion states
  const [desktopCategoryAccordions, setDesktopCategoryAccordions] = useState<Record<string, boolean>>({});
  
  // Mobile accordion states
  const [mobileAccordions, setMobileAccordions] = useState({
    categories: false,
    tools: false,
    industries: false,
    resources: false,
  });
  
  // Desktop category accordion states
  const [mobileCategoryAccordions, setMobileCategoryAccordions] = useState<Record<string, boolean>>({});
  
  const toggleMobileAccordion = (section: keyof typeof mobileAccordions) => {
    console.log(`Toggling ${section} accordion. Current state:`, mobileAccordions[section]);
    setMobileAccordions(prev => {
      const newState = {
        ...prev,
        [section]: !prev[section]
      };
      console.log('New accordion states:', newState);
      return newState;
    });
  };
  
  const toggleDesktopCategoryAccordion = (categoryName: string) => {
    setDesktopCategoryAccordions(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };
  
  const toggleMobileCategoryAccordion = (categoryName: string) => {
    setMobileCategoryAccordions(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
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
    { name: 'Why Us', href: '/why-us', current: router.pathname === '/why-us', hasDropdown: false },
    { name: 'Contact', href: '/contact', current: router.pathname === '/contact', hasDropdown: false },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    // Reset accordion states when menu closes
    setMobileAccordions({
      categories: false,
      tools: false,
      industries: false,
      resources: false,
    });
    // Reset mobile category accordions
    setMobileCategoryAccordions({});
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserDropdown) {
        setShowUserDropdown(false);
      }
    };

    if (showUserDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserDropdown]);


  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
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
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 ${
                    item.current
                      ? 'bg-gray-800 text-white shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
                {/* Dropdowns temporarily disabled for debugging */}
              </div>
            ))}
          </div>

          {/* Authentication CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-medium text-sm hover:bg-gray-700 transition-all duration-200"
                >
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="max-w-24 truncate">{session.user?.name || session.user?.email}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 text-gray-300 hover:text-white font-medium text-sm transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </button>
              </>
            )}
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
              <div style={{ marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                  onClick={() => {
                    console.log('Categories accordion clicked');
                    toggleMobileAccordion('categories');
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    color: '#06b6d4',
                    fontSize: '16px',
                    fontWeight: '600',
                    padding: '12px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  AI Categories
                  <ChevronDown 
                    style={{ 
                      width: '16px', 
                      height: '16px',
                      transform: mobileAccordions.categories ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }} 
                  />
                </button>
                {mobileAccordions.categories && (
                  <div style={{ paddingBottom: '12px' }}>
                    {accordionCategories.map((mainCategory) => (
                      <div key={mainCategory.name} style={{ marginBottom: '8px' }}>
                        <button
                          onClick={() => toggleMobileCategoryAccordion(mainCategory.name)}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: 'none',
                            border: 'none',
                            color: '#22d3ee',
                            fontSize: '14px',
                            fontWeight: '600',
                            padding: '8px 16px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            cursor: 'pointer',
                            WebkitTapHighlightColor: 'transparent',
                            marginLeft: '8px'
                          }}
                        >
                          {mainCategory.name}
                          <ChevronDown 
                            style={{ 
                              width: '14px', 
                              height: '14px',
                              transform: mobileCategoryAccordions[mainCategory.name] ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s ease'
                            }} 
                          />
                        </button>
                        {mobileCategoryAccordions[mainCategory.name] && (
                          <div style={{ marginLeft: '16px' }}>
                            {mainCategory.subcategories.map((subcategory) => (
                              <Link 
                                key={subcategory.value}
                                href={getCategoryUrl(subcategory.value)} 
                                onClick={closeMenu} 
                                style={{ 
                                  color: '#d1d5db', 
                                  textDecoration: 'none', 
                                  fontSize: '15px', 
                                  padding: '8px 16px', 
                                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                                  transition: 'all 0.2s ease',
                                  display: 'block',
                                  marginLeft: '8px',
                                  borderLeft: '2px solid transparent'
                                }}
                              >
                                {subcategory.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                  onClick={() => {
                    console.log('Industries accordion clicked');
                    toggleMobileAccordion('industries');
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    color: '#06b6d4',
                    fontSize: '16px',
                    fontWeight: '600',
                    padding: '12px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  Industries We Help
                  <ChevronDown 
                    style={{ 
                      width: '16px', 
                      height: '16px',
                      transform: mobileAccordions.industries ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }} 
                  />
                </button>
                {mobileAccordions.industries && (
                  <div style={{ paddingBottom: '12px' }}>
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
                )}
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
              <Link href="/why-us" onClick={closeMenu} style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '18px', 
                padding: '16px 0', 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease',
                display: 'block'
              }}>Why Us</Link>
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
                {session ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Link href="/dashboard" onClick={closeMenu} style={{ 
                      display: 'block', 
                      width: '100%', 
                      padding: '16px', 
                      background: 'rgba(255,255,255,0.1)', 
                      color: 'white',
                      textAlign: 'center',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '16px',
                      textDecoration: 'none'
                    }}>Dashboard</Link>
                    <button
                      onClick={() => {
                        closeMenu();
                        signOut({ callbackUrl: '/' });
                      }}
                      style={{ 
                        display: 'block', 
                        width: '100%', 
                        padding: '16px', 
                        background: 'rgba(239, 68, 68, 0.8)', 
                        color: 'white',
                        textAlign: 'center',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '16px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >Sign Out</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button
                      onClick={() => {
                        closeMenu();
                        setIsLoginModalOpen(true);
                      }}
                      style={{ 
                        display: 'block', 
                        width: '100%', 
                        padding: '16px', 
                        background: 'rgba(255,255,255,0.1)', 
                        color: 'white',
                        textAlign: 'center',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '16px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >Log In</button>
                    <button
                      onClick={() => {
                        closeMenu();
                        setIsRegisterModalOpen(true);
                      }}
                      style={{ 
                        display: 'block', 
                        width: '100%', 
                        padding: '16px', 
                        background: 'linear-gradient(to right, #06b6d4, #2563eb)', 
                        color: 'white',
                        textAlign: 'center',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '16px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >Get Started</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onOpenRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        planName="Free Plan - AI Tool Discovery"
        onOpenLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </header>
  );
};

export default Header;