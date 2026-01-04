import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, ChevronDown, ChevronUp, User, LogOut, Bell, Settings, CreditCard, Zap } from 'lucide-react';
import { toolCategories, getCategoryUrl, getCategoryDisplayName } from '../config/categories';
import { industries, industrySlugMap } from '../content/industryContent';
// Modals removed from Header to prevent navigation stalling

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
  // Modal states removed to prevent navigation stalling
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  // Simple session state management with timeout
  const [hasSessionTimeout, setHasSessionTimeout] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isAuthenticated = status === 'authenticated' && !!session?.user;
  const isLoading = isMounted && status === 'loading' && !hasSessionTimeout;
  
  // Default to 'free' plan for header navigation - specific plan logic handled server-side
  const plan = 'free';
  const isUnauthenticated = status === 'unauthenticated';
  
  // Desktop category accordion states
  const [desktopCategoryAccordions, setDesktopCategoryAccordions] = useState<Record<string, boolean>>({});
  
  // Mobile accordion states (simplified)
  const [mobileAccordions, setMobileAccordions] = useState({
    categories: false,
    tools: false,
    industries: false,
    kidsAI: false,
    resources: false,
  });
  
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

  // Kids AI dropdown menu items
  const kidsAIMenuItems = [
    { name: 'Safe AI Tools Directory', href: '/kids-ai' },
    { name: 'Pricing Plans', href: '/kids-ai/pricing' },
    { name: 'Safety Guide', href: '/kids-ai/safety' }
  ];

  const navigation = [
    { 
      name: 'Top AI Tools', 
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
      name: 'Kids AI', 
      href: '/kids-ai', 
      current: router.pathname.startsWith('/kids'),
      hasDropdown: true,
      isKidsAI: true
    },
    { 
      name: 'Community', 
      href: '/community', 
      current: router.pathname === '/community', 
      hasDropdown: false,
      external: false
    },
    { 
      name: 'Pricing', 
      href: '/upgrade', 
      current: router.pathname === '/upgrade', 
      hasDropdown: false 
    },
    {
      name: 'Industries We Help',
      href: '/industries',
      current: router.pathname.startsWith('/industries'),
      hasDropdown: true,
      isIndustry: true
    },
    { name: 'Contact', href: '/contact', current: router.pathname === '/contact', hasDropdown: false },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    // Reset accordion states when menu closes (simplified)
    setMobileAccordions({
      categories: false,
      tools: false,
      industries: false,
      kidsAI: false,
      resources: false,
    });
  };

  // Handle component mount to avoid SSR hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Session timeout to prevent infinite loading
  useEffect(() => {
    if (status === 'loading') {
      const timer = setTimeout(() => {
        setHasSessionTimeout(true);
      }, 1000); // 1 second timeout

      return () => clearTimeout(timer);
    } else {
      setHasSessionTimeout(false);
    }
  }, [status]);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside the dropdown area
      if (showUserDropdown && !target.closest('.user-dropdown-container')) {
        setShowUserDropdown(false);
      }
    };

    if (showUserDropdown) {
      // Add a small delay to prevent immediate closure
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
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
              <div key={item.name} className={item.hasDropdown ? 'relative group' : ''}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 ${
                      item.current
                        ? 'bg-gray-800 text-white shadow-sm'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span>{item.name}</span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 ${
                      item.current
                        ? 'bg-gray-800 text-white shadow-sm'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                )}
                
                {/* Kids AI Dropdown */}
                {item.isKidsAI && item.hasDropdown && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {kidsAIMenuItems.map((subItem, idx) => (
                      <Link
                        key={idx}
                        href={subItem.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium">{subItem.name}</div>
                      </Link>
                    ))}
                  </div>
                )}
                
                {/* Categories Dropdown (existing logic) */}
                {item.isCategory && item.hasDropdown && (
                  <div className="absolute left-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="grid grid-cols-1 gap-1">
                      {accordionCategories.map((category) => (
                        <div key={category.name} className="p-2">
                          <button
                            onClick={() => toggleDesktopCategoryAccordion(category.name)}
                            className="w-full text-left px-2 py-1 font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            {category.name}
                          </button>
                          {desktopCategoryAccordions[category.name] && (
                            <div className="ml-4 mt-1 space-y-1">
                              {category.subcategories.map((subcategory) => (
                                <Link
                                  key={subcategory.value}
                                  href={getCategoryUrl(subcategory.value)}
                                  className="block px-2 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded transition-colors"
                                >
                                  {getCategoryDisplayName(subcategory.value)}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Industries Dropdown (existing logic) */}
                {item.isIndustry && item.hasDropdown && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {industryMenuItems.map((industryItem, idx) => (
                      <Link
                        key={idx}
                        href={`/industries/${industrySlugMap[industryItem.industry] || industryItem.industry.toLowerCase().replace(/ & | /g, '-').replace(/[^a-z0-9-]/g, '')}`}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium">{industryItem.name}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Authentication CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <div className="animate-pulse bg-gray-300 h-8 w-16 rounded"></div>
                <div className="animate-pulse bg-gray-300 h-8 w-24 rounded"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="relative user-dropdown-container">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-medium text-sm hover:bg-gray-700 transition-all duration-200"
                >
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="max-w-24 truncate">{session?.user?.name || session?.user?.email}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Signed in as</div>
                      <div className="font-medium text-gray-900 truncate">
                        {session?.user?.name || session?.user?.email}
                      </div>
                      <div className="text-xs text-blue-600 font-medium mt-1">
                        {(session?.user as any)?.plan === 'enterprise' ? 'Enterprise Plan' :
                         (session?.user as any)?.plan === 'pro' ? 'Pro Plan' :
                         (session?.user as any)?.plan === 'starter' ? 'Starter Plan' : 'Free Plan'}
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link href={`/dashboard/${(session?.user as any)?.plan || 'free'}`} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        <User className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>
                      
                      <Link href={`/dashboard/${plan}/notifications`} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        <Bell className="w-4 h-4 mr-3" />
                        Notifications
                      </Link>
                      
                      <Link href="/upgrade" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        <Zap className="w-4 h-4 mr-3" />
                        Upgrade
                      </Link>
                      
                      <Link href={`/dashboard/${plan}/settings`} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        <Settings className="w-4 h-4 mr-3" />
                        Account Settings
                      </Link>
                      
                      <Link href={`/dashboard/${plan}/billing`} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        <CreditCard className="w-4 h-4 mr-3" />
                        Billing & Subscription
                      </Link>
                      
                      {/* Separator */}
                      <div className="border-t border-gray-100 my-1"></div>
                      
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </a>
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
              {/* Main Navigation Items - Matching Desktop Simple Links */}
              <Link href="/categories" onClick={closeMenu} style={{ 
                color: router.pathname.startsWith('/categories') ? '#06b6d4' : 'white',
                backgroundColor: router.pathname.startsWith('/categories') ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                textDecoration: 'none', 
                fontSize: '18px', 
                padding: '16px', 
                borderRadius: '8px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease',
                display: 'block',
                fontWeight: '600'
              }}>Top AI Tools</Link>
              
              <Link href="/tools" onClick={closeMenu} style={{ 
                color: router.pathname.startsWith('/tools') ? '#06b6d4' : 'white',
                backgroundColor: router.pathname.startsWith('/tools') ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                textDecoration: 'none', 
                fontSize: '18px', 
                padding: '16px', 
                borderRadius: '8px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease',
                display: 'block',
                fontWeight: '600'
              }}>All Tools</Link>
              
              {/* Kids AI Section with Accordion */}
              <div style={{ 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}>
                <button 
                  onClick={() => toggleMobileAccordion('kidsAI')} 
                  style={{ 
                    width: '100%',
                    textAlign: 'left',
                    color: router.pathname.startsWith('/kids') ? '#06b6d4' : 'white',
                    backgroundColor: router.pathname.startsWith('/kids') ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                    border: 'none',
                    fontSize: '18px', 
                    padding: '16px', 
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Kids AI
                  {mobileAccordions.kidsAI ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {mobileAccordions.kidsAI && (
                  <div style={{ paddingLeft: '16px', paddingBottom: '8px' }}>
                    {kidsAIMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={closeMenu}
                        style={{
                          color: router.pathname === item.href ? '#06b6d4' : '#d1d5db',
                          textDecoration: 'none',
                          fontSize: '16px',
                          padding: '12px 16px',
                          borderRadius: '6px',
                          transition: 'all 0.2s ease',
                          display: 'block',
                          fontWeight: '500',
                          marginBottom: '4px'
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Link href="/community" onClick={closeMenu} style={{ 
                color: router.pathname === '/community' ? '#06b6d4' : 'white',
                backgroundColor: router.pathname === '/community' ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                textDecoration: 'none', 
                fontSize: '18px', 
                padding: '16px', 
                borderRadius: '8px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease',
                display: 'block',
                fontWeight: '600'
              }}>Community</Link>
              
              <Link href="/upgrade" onClick={closeMenu} style={{ 
                color: router.pathname === '/upgrade' ? '#06b6d4' : 'white',
                backgroundColor: router.pathname === '/upgrade' ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                textDecoration: 'none', 
                fontSize: '18px', 
                padding: '16px', 
                borderRadius: '8px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease',
                display: 'block',
                fontWeight: '600'
              }}>Pricing</Link>
              
              <Link href="/industries" onClick={closeMenu} style={{ 
                color: router.pathname.startsWith('/industries') ? '#06b6d4' : 'white',
                backgroundColor: router.pathname.startsWith('/industries') ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                textDecoration: 'none', 
                fontSize: '18px', 
                padding: '16px', 
                borderRadius: '8px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease',
                display: 'block',
                fontWeight: '600'
              }}>Industries We Help</Link>
              
              <Link href="/contact" onClick={closeMenu} style={{ 
                color: router.pathname === '/contact' ? '#06b6d4' : 'white',
                backgroundColor: router.pathname === '/contact' ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                textDecoration: 'none', 
                fontSize: '18px', 
                padding: '16px', 
                borderRadius: '8px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease',
                display: 'block',
                fontWeight: '600'
              }}>Contact</Link>
              
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                {isLoading ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ height: '48px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', animation: 'pulse 2s infinite' }}></div>
                    <div style={{ height: '48px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', animation: 'pulse 2s infinite' }}></div>
                  </div>
                ) : isAuthenticated ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* User Info Header */}
                    <div style={{ 
                      padding: '16px', 
                      background: 'rgba(255,255,255,0.05)', 
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginBottom: '4px' }}>
                        Signed in as
                      </div>
                      <div style={{ color: 'white', fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>
                        {session?.user?.name || session?.user?.email}
                      </div>
                      <div style={{ color: '#60a5fa', fontSize: '12px', fontWeight: '500' }}>
                        {(session?.user as any)?.plan === 'enterprise' ? 'Enterprise Plan' :
                         (session?.user as any)?.plan === 'pro' ? 'Pro Plan' :
                         (session?.user as any)?.plan === 'starter' ? 'Starter Plan' : 'Free Plan'}
                      </div>
                    </div>

                    {/* Menu Items */}
                    <Link href={`/dashboard/${(session?.user as any)?.plan || 'free'}`} onClick={closeMenu} style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px', 
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '16px',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s',
                      background: 'rgba(255,255,255,0.05)'
                    }}>
                      <User style={{ width: '16px', height: '16px' }} />
                      Dashboard
                    </Link>
                    
                    <Link href={`/dashboard/${plan}/notifications`} onClick={closeMenu} style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px', 
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '16px',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s',
                      background: 'rgba(255,255,255,0.05)'
                    }}>
                      <Bell style={{ width: '16px', height: '16px' }} />
                      Notifications
                    </Link>
                    
                    <Link href="/upgrade" onClick={closeMenu} style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px', 
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '16px',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s',
                      background: 'rgba(255,255,255,0.05)'
                    }}>
                      <Zap style={{ width: '16px', height: '16px' }} />
                      Upgrade
                    </Link>
                    
                    <Link href={`/dashboard/${plan}/settings`} onClick={closeMenu} style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px', 
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '16px',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s',
                      background: 'rgba(255,255,255,0.05)'
                    }}>
                      <Settings style={{ width: '16px', height: '16px' }} />
                      Account Settings
                    </Link>
                    
                    <Link href={`/dashboard/${plan}/billing`} onClick={closeMenu} style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px', 
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '16px',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s',
                      background: 'rgba(255,255,255,0.05)'
                    }}>
                      <CreditCard style={{ width: '16px', height: '16px' }} />
                      Billing & Subscription
                    </Link>
                    
                    {/* Separator */}
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }}></div>
                    
                    <button
                      onClick={() => {
                        closeMenu();
                        signOut({ callbackUrl: '/' });
                      }}
                      style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        width: '100%', 
                        padding: '12px 16px', 
                        background: 'rgba(239, 68, 68, 0.8)', 
                        color: 'white',
                        borderRadius: '6px',
                        fontWeight: '600',
                        fontSize: '16px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <LogOut style={{ width: '16px', height: '16px' }} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <a
                      href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
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
                        textDecoration: 'none'
                      }}
                    >Get Started</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Modals removed from Header - they are now on the why-us page */}
    </header>
  );
};

export default Header;