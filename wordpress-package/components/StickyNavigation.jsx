/**
 * Sticky Navigation Component - Persistent Navigation Bar
 * 
 * Smart navigation that shows/hides based on scroll direction.
 * Includes search, mobile menu, and progress indicator.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Home, 
  Settings, 
  Zap,
  BarChart3,
  HelpCircle,
  Mail
} from 'lucide-react';

const StickyNavigation = ({
  logo = { text: "SiteOptz.ai", url: "/" },
  menuItems = [],
  showSearch = true,
  showProgress = true,
  hideOnScroll = true,
  searchPlaceholder = "Search AI tools...",
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  // Default menu items if none provided
  const defaultMenuItems = [
    {
      label: "Home",
      url: "/",
      icon: Home
    },
    {
      label: "AI Tools",
      url: "/tools",
      icon: Zap,
      dropdown: [
        { label: "All Tools", url: "/tools" },
        { label: "ChatGPT", url: "/tools/chatgpt" },
        { label: "Claude", url: "/tools/claude" },
        { label: "Midjourney", url: "/tools/midjourney" }
      ]
    },
    {
      label: "Comparisons",
      url: "/comparisons",
      icon: BarChart3,
      dropdown: [
        { label: "Text Generation", url: "/comparisons/text" },
        { label: "Image Generation", url: "/comparisons/images" },
        { label: "Code Generation", url: "/comparisons/code" }
      ]
    },
    {
      label: "Pricing",
      url: "/pricing",
      icon: Settings
    },
    {
      label: "Help",
      url: "/help",
      icon: HelpCircle
    },
    {
      label: "Contact",
      url: "/contact",
      icon: Mail
    }
  ];

  const items = menuItems.length > 0 ? menuItems : defaultMenuItems;

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scroll progress
      if (showProgress) {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (currentScrollY / totalScroll) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
      
      // Update scrolled state
      setIsScrolled(currentScrollY > 20);
      
      // Hide/show navigation based on scroll direction
      if (hideOnScroll) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideOnScroll, showProgress]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
      
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`sticky-navigation ${isScrolled ? 'scrolled' : ''} ${className}`}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Progress Bar */}
        {showProgress && (
          <div className="scroll-progress">
            <motion.div
              className="progress-bar"
              style={{ width: `${scrollProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}

        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo">
            <a href={logo.url} className="logo-link">
              {logo.image ? (
                <img src={logo.image} alt={logo.text} className="logo-image" />
              ) : (
                <span className="logo-text">{logo.text}</span>
              )}
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="nav-menu desktop-menu">
            {items.map((item) => (
              <div
                key={item.label}
                className={`menu-item ${item.dropdown ? 'has-dropdown' : ''}`}
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.url}
                  className="menu-link"
                  onClick={(e) => {
                    if (item.dropdown) {
                      e.preventDefault();
                      setActiveDropdown(
                        activeDropdown === item.label ? null : item.label
                      );
                    }
                  }}
                >
                  {item.icon && <item.icon size={18} />}
                  <span>{item.label}</span>
                  {item.dropdown && (
                    <ChevronDown 
                      size={16} 
                      className={`dropdown-icon ${activeDropdown === item.label ? 'active' : ''}`}
                    />
                  )}
                </a>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.url}
                          className="dropdown-item"
                        >
                          {dropdownItem.icon && <dropdownItem.icon size={16} />}
                          <span>{dropdownItem.label}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Search & Mobile Controls */}
          <div className="nav-controls">
            {/* Search */}
            {showSearch && (
              <div className="search-container" ref={searchRef}>
                <button
                  className="search-toggle"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  aria-label="Toggle search"
                >
                  <Search size={20} />
                </button>

                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.form
                      className="search-form"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 300, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSearch}
                    >
                      <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        autoFocus
                      />
                      <button type="submit" className="search-submit">
                        <Search size={16} />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mobile-menu-content">
                {/* Mobile Search */}
                {showSearch && (
                  <form className="mobile-search" onSubmit={handleSearch}>
                    <div className="search-input-group">
                      <Search size={20} className="search-icon" />
                      <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mobile-search-input"
                      />
                    </div>
                  </form>
                )}

                {/* Mobile Menu Items */}
                <div className="mobile-menu-items">
                  {items.map((item) => (
                    <div key={item.label} className="mobile-menu-item">
                      <a
                        href={item.url}
                        className="mobile-menu-link"
                        onClick={() => !item.dropdown && setIsMobileMenuOpen(false)}
                      >
                        {item.icon && <item.icon size={20} />}
                        <span>{item.label}</span>
                        {item.dropdown && (
                          <ChevronDown size={16} className="mobile-dropdown-icon" />
                        )}
                      </a>

                      {/* Mobile Dropdown */}
                      {item.dropdown && (
                        <div className="mobile-dropdown">
                          {item.dropdown.map((dropdownItem) => (
                            <a
                              key={dropdownItem.label}
                              href={dropdownItem.url}
                              className="mobile-dropdown-item"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {dropdownItem.icon && <dropdownItem.icon size={16} />}
                              <span>{dropdownItem.label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Component Styles */}
      <style jsx>{`
        .sticky-navigation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid transparent;
          z-index: 1000;
          transition: var(--transition-base);
        }

        .sticky-navigation.scrolled {
          background: rgba(255, 255, 255, 0.98);
          border-bottom-color: var(--gray-200);
          box-shadow: var(--shadow-sm);
        }

        .scroll-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gray-200);
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--blue-600), var(--indigo-600));
          transition: width 0.1s ease;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-4) var(--space-6);
          max-width: 1200px;
          margin: 0 auto;
        }

        .nav-logo .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          font-size: var(--text-xl);
          font-weight: var(--font-bold);
          color: var(--text-primary);
        }

        .logo-image {
          height: 32px;
          width: auto;
        }

        .logo-text {
          background: linear-gradient(135deg, var(--blue-600), var(--indigo-600));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .desktop-menu {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .menu-item {
          position: relative;
        }

        .menu-link {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-4);
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-lg);
          transition: var(--transition-base);
          font-weight: var(--font-medium);
          white-space: nowrap;
        }

        .menu-link:hover {
          color: var(--text-primary);
          background: var(--gray-100);
        }

        .dropdown-icon {
          transition: var(--transition-base);
        }

        .dropdown-icon.active {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 200px;
          background: white;
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: var(--space-2);
          margin-top: var(--space-2);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3);
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-md);
          transition: var(--transition-base);
          font-size: var(--text-sm);
        }

        .dropdown-item:hover {
          color: var(--text-primary);
          background: var(--gray-50);
        }

        .nav-controls {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .search-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-toggle {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: var(--space-2);
          border-radius: var(--radius-md);
          transition: var(--transition-base);
        }

        .search-toggle:hover {
          color: var(--text-primary);
          background: var(--gray-100);
        }

        .search-form {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          background: white;
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }

        .search-input {
          width: 100%;
          padding: var(--space-3);
          border: none;
          outline: none;
          font-size: var(--text-sm);
        }

        .search-submit {
          background: var(--blue-600);
          color: white;
          border: none;
          padding: var(--space-3);
          cursor: pointer;
          transition: var(--transition-base);
        }

        .search-submit:hover {
          background: var(--blue-700);
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: var(--space-2);
          border-radius: var(--radius-md);
          transition: var(--transition-base);
        }

        .mobile-menu-toggle:hover {
          color: var(--text-primary);
          background: var(--gray-100);
        }

        .mobile-menu {
          overflow: hidden;
          border-top: 1px solid var(--gray-200);
          background: white;
        }

        .mobile-menu-content {
          padding: var(--space-4);
        }

        .mobile-search {
          margin-bottom: var(--space-4);
        }

        .search-input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: var(--space-3);
          color: var(--text-secondary);
        }

        .mobile-search-input {
          width: 100%;
          padding: var(--space-3) var(--space-3) var(--space-3) var(--space-10);
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-lg);
          font-size: var(--text-base);
        }

        .mobile-menu-items {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .mobile-menu-link {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4);
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-lg);
          transition: var(--transition-base);
          font-weight: var(--font-medium);
        }

        .mobile-menu-link:hover {
          color: var(--text-primary);
          background: var(--gray-50);
        }

        .mobile-dropdown {
          margin-left: var(--space-6);
          padding-left: var(--space-4);
          border-left: 2px solid var(--gray-200);
        }

        .mobile-dropdown-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3);
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-md);
          transition: var(--transition-base);
          font-size: var(--text-sm);
        }

        .mobile-dropdown-item:hover {
          color: var(--text-primary);
          background: var(--gray-50);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .desktop-menu {
            display: none;
          }

          .search-container {
            display: none;
          }

          .mobile-menu-toggle {
            display: block;
          }

          .nav-container {
            padding: var(--space-3) var(--space-4);
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .sticky-navigation {
            background: rgba(17, 24, 39, 0.95);
            border-bottom-color: var(--gray-700);
          }

          .sticky-navigation.scrolled {
            background: rgba(17, 24, 39, 0.98);
          }

          .dropdown-menu,
          .mobile-menu {
            background: var(--gray-800);
            border-color: var(--gray-700);
          }

          .search-form {
            background: var(--gray-800);
            border-color: var(--gray-600);
          }

          .mobile-search-input {
            background: var(--gray-800);
            border-color: var(--gray-600);
            color: var(--gray-100);
          }

          .menu-link:hover,
          .mobile-menu-link:hover {
            background: var(--gray-800);
          }

          .dropdown-item:hover,
          .mobile-dropdown-item:hover {
            background: var(--gray-700);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .sticky-navigation,
          .dropdown-icon,
          .progress-bar {
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

export default StickyNavigation;