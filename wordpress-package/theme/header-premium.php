<?php
/**
 * The header for SiteOptz.ai Premium Theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @package SiteOptz_Premium
 * @version 1.0.0
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <?php if (is_front_page()) : ?>
        <title><?php echo esc_html(get_theme_mod('seo_title', 'SiteOptz.ai - AI Tools Comparison Platform | Find Your Perfect AI Solution')); ?></title>
        <meta name="description" content="<?php echo esc_attr(get_theme_mod('seo_description', 'Discover and compare 1000+ AI tools with data-driven insights, personalized recommendations, and real-time pricing. Find your perfect AI solution today.')); ?>">
        <meta name="keywords" content="<?php echo esc_attr(get_theme_mod('seo_keywords', 'AI tools comparison, artificial intelligence software, AI tool finder, best AI tools 2024, AI comparison platform')); ?>">
    <?php endif; ?>
    
    <meta name="author" content="SiteOptz.ai">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo esc_url(home_url('/')); ?>">
    <meta property="og:title" content="<?php echo esc_attr(get_theme_mod('og_title', 'SiteOptz.ai - AI Tools Comparison Platform')); ?>">
    <meta property="og:description" content="<?php echo esc_attr(get_theme_mod('og_description', 'Find your perfect AI tool with data-driven comparisons and personalized recommendations')); ?>">
    <meta property="og:image" content="<?php echo esc_url(get_theme_mod('og_image', get_template_directory_uri() . '/assets/og-image.jpg')); ?>">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="<?php echo esc_url(home_url('/')); ?>">
    <meta property="twitter:title" content="<?php echo esc_attr(get_theme_mod('twitter_title', 'SiteOptz.ai - AI Tools Comparison Platform')); ?>">
    <meta property="twitter:description" content="<?php echo esc_attr(get_theme_mod('twitter_description', 'Find your perfect AI tool with data-driven comparisons and personalized recommendations')); ?>">
    <meta property="twitter:image" content="<?php echo esc_url(get_theme_mod('twitter_image', get_template_directory_uri() . '/assets/twitter-image.jpg')); ?>">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "<?php bloginfo('name'); ?>",
      "url": "<?php echo esc_url(home_url('/')); ?>",
      "description": "<?php bloginfo('description'); ?>",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "<?php echo esc_url(home_url('/')); ?>?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
    </script>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Favicon -->
    <?php if (has_site_icon()) : ?>
        <link rel="icon" href="<?php echo esc_url(get_site_icon_url(32)); ?>" sizes="32x32">
        <link rel="icon" href="<?php echo esc_url(get_site_icon_url(192)); ?>" sizes="192x192">
        <link rel="apple-touch-icon" href="<?php echo esc_url(get_site_icon_url(180)); ?>">
    <?php endif; ?>
    
    <?php wp_head(); ?>
    
    <!-- Custom CSS from Customizer -->
    <style>
        <?php echo get_theme_mod('custom_css', ''); ?>
    </style>
</head>

<body <?php body_class(); ?>>
    
    <?php wp_body_open(); ?>
    
    <!-- Skip Links for Accessibility -->
    <a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e('Skip to content', 'siteoptz-premium'); ?></a>
    
    <div id="page" class="site">
        
        <!-- Modern Horizontal Header -->
        <header id="masthead" class="modern-header" role="banner">
            <div class="header-container">
                
                <!-- Logo Section -->
                <div class="header-brand">
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="brand-logo">
                        <div class="logo-icon">🤖</div>
                        <span class="brand-text">SiteOptz<span class="brand-accent">.ai</span></span>
                    </a>
                </div>

                <!-- Main Navigation Menu -->
                <nav class="header-nav" role="navigation" aria-label="Main Navigation">
                    <ul class="nav-menu">
                        <li class="nav-item has-dropdown">
                            <a href="#" class="nav-link">
                                <span class="link-text">AI Tools</span>
                                <span class="dropdown-icon">⌄</span>
                            </a>
                            <div class="mega-dropdown">
                                <div class="dropdown-content">
                                    <div class="dropdown-section">
                                        <h4>Browse Tools</h4>
                                        <ul>
                                            <li><a href="<?php echo esc_url(home_url('/ai-tools/')); ?>">All AI Tools</a></li>
                                            <li><a href="<?php echo esc_url(home_url('/category/text-generation/')); ?>">Text Generation</a></li>
                                            <li><a href="<?php echo esc_url(home_url('/category/image-creation/')); ?>">Image Creation</a></li>
                                            <li><a href="<?php echo esc_url(home_url('/category/code-generation/')); ?>">Code Generation</a></li>
                                        </ul>
                                    </div>
                                    <div class="dropdown-section">
                                        <h4>Categories</h4>
                                        <ul>
                                            <li><a href="<?php echo esc_url(home_url('/category/voice-audio/')); ?>">Voice & Audio</a></li>
                                            <li><a href="<?php echo esc_url(home_url('/category/business-intelligence/')); ?>">Business Intelligence</a></li>
                                            <li><a href="<?php echo esc_url(home_url('/category/automation/')); ?>">Automation</a></li>
                                        </ul>
                                    </div>
                                    <div class="dropdown-section featured">
                                        <h4>Featured</h4>
                                        <div class="featured-tool">
                                            <span class="tool-name">ChatGPT vs Claude</span>
                                            <span class="tool-desc">Compare top AI assistants</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li class="nav-item has-dropdown">
                            <a href="#" class="nav-link">
                                <span class="link-text">Resources</span>
                                <span class="dropdown-icon">⌄</span>
                            </a>
                            <div class="dropdown-menu">
                                <ul>
                                    <li><a href="<?php echo esc_url(home_url('/comparisons/')); ?>">Tool Comparisons</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/calculator/')); ?>">ROI Calculator</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/blog/')); ?>">Blog & Guides</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/case-studies/')); ?>">Case Studies</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/faq/')); ?>">FAQ</a></li>
                                </ul>
                            </div>
                        </li>

                        <li class="nav-item">
                            <a href="<?php echo esc_url(home_url('/pricing/')); ?>" class="nav-link">
                                <span class="link-text">Pricing</span>
                            </a>
                        </li>

                        <li class="nav-item has-dropdown">
                            <a href="#" class="nav-link">
                                <span class="link-text">Company</span>
                                <span class="dropdown-icon">⌄</span>
                            </a>
                            <div class="dropdown-menu">
                                <ul>
                                    <li><a href="<?php echo esc_url(home_url('/about/')); ?>">About Us</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/careers/')); ?>">Careers</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/press/')); ?>">Press</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/partnerships/')); ?>">Partnerships</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/investors/')); ?>">Investors</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>

                <!-- Right Side Actions -->
                <div class="header-actions">
                    <div class="search-container">
                        <button class="search-toggle" aria-label="Search">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </button>
                        <div class="search-overlay">
                            <div class="search-box">
                                <input type="text" placeholder="Search AI tools..." class="search-input">
                                <button class="search-submit">Search</button>
                            </div>
                        </div>
                    </div>

                    <div class="user-actions">
                        <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="support-link">Support</a>
                        <a href="#" class="cta-primary">Get Started Free</a>
                    </div>

                    <!-- Mobile Menu Toggle -->
                    <button class="mobile-menu-toggle" aria-label="Menu">
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div class="mobile-menu">
                <div class="mobile-menu-content">
                    <div class="mobile-search">
                        <input type="text" placeholder="Search AI tools..." class="mobile-search-input">
                    </div>
                    
                    <ul class="mobile-nav-menu">
                        <li><a href="<?php echo esc_url(home_url('/ai-tools/')); ?>">All AI Tools</a></li>
                        <li><a href="<?php echo esc_url(home_url('/category/text-generation/')); ?>">Text Generation</a></li>
                        <li><a href="<?php echo esc_url(home_url('/category/image-creation/')); ?>">Image Creation</a></li>
                        <li><a href="<?php echo esc_url(home_url('/comparisons/')); ?>">Comparisons</a></li>
                        <li><a href="<?php echo esc_url(home_url('/calculator/')); ?>">ROI Calculator</a></li>
                        <li><a href="<?php echo esc_url(home_url('/pricing/')); ?>">Pricing</a></li>
                        <li><a href="<?php echo esc_url(home_url('/blog/')); ?>">Blog</a></li>
                        <li><a href="<?php echo esc_url(home_url('/about/')); ?>">About</a></li>
                        <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">Contact</a></li>
                    </ul>
                    
                    <div class="mobile-cta">
                        <a href="#" class="mobile-cta-button">Get Started Free</a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Modern Header Styles -->
        <style>
            .modern-header {
                position: sticky;
                top: 0;
                z-index: 1000;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
                width: 100%;
                box-sizing: border-box;
            }

            .header-container {
                max-width: 1400px;
                margin: 0 auto;
                padding: 0 2rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 70px;
                width: 100%;
                box-sizing: border-box;
                overflow-x: hidden;
            }

            .header-brand {
                flex-shrink: 0;
            }

            .brand-logo {
                display: flex;
                align-items: center;
                gap: 12px;
                text-decoration: none;
                color: #1a202c;
                font-weight: 800;
                font-size: 1.5rem;
                transition: all 0.3s ease;
            }

            .brand-logo:hover {
                transform: scale(1.05);
            }

            .logo-icon {
                font-size: 2rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .brand-text {
                color: #1a202c;
                letter-spacing: -0.5px;
            }

            .brand-accent {
                color: #667eea;
            }

            .header-nav {
                flex: 1;
                display: flex;
                justify-content: center;
            }

            .nav-menu {
                display: flex;
                list-style: none;
                margin: 0;
                padding: 0;
                gap: 2rem;
            }

            .nav-item {
                position: relative;
            }

            .nav-link {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 12px 0;
                color: #4a5568;
                text-decoration: none;
                font-weight: 500;
                font-size: 0.95rem;
                transition: all 0.3s ease;
                position: relative;
            }

            .nav-link:hover {
                color: #667eea;
            }

            .nav-link::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 2px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                transition: width 0.3s ease;
            }

            .nav-link:hover::after {
                width: 100%;
            }

            .dropdown-icon {
                font-size: 0.8rem;
                transition: transform 0.3s ease;
            }

            .has-dropdown:hover .dropdown-icon {
                transform: rotate(180deg);
            }

            .mega-dropdown {
                position: absolute;
                top: 100%;
                left: 0;
                min-width: 600px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: all 0.3s ease;
                z-index: 1000;
                border: 1px solid rgba(0, 0, 0, 0.1);
            }

            .dropdown-menu {
                position: absolute;
                top: 100%;
                left: 0;
                min-width: 200px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: all 0.3s ease;
                z-index: 1000;
                border: 1px solid rgba(0, 0, 0, 0.1);
            }

            .has-dropdown:hover .mega-dropdown,
            .has-dropdown:hover .dropdown-menu {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .dropdown-content {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 2rem;
                padding: 2rem;
            }

            .dropdown-section h4 {
                font-size: 0.875rem;
                font-weight: 600;
                color: #667eea;
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .dropdown-section ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .dropdown-section li {
                margin-bottom: 8px;
            }

            .dropdown-section a {
                color: #4a5568;
                text-decoration: none;
                font-size: 0.9rem;
                transition: color 0.3s ease;
                display: block;
                padding: 4px 0;
            }

            .dropdown-section a:hover {
                color: #667eea;
            }

            .featured {
                background: linear-gradient(135deg, #f8fafc, #e2e8f0);
                border-radius: 8px;
                padding: 1rem;
            }

            .featured-tool {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .tool-name {
                font-weight: 600;
                color: #1a202c;
                font-size: 0.9rem;
            }

            .tool-desc {
                color: #64748b;
                font-size: 0.8rem;
            }

            .dropdown-menu ul {
                list-style: none;
                margin: 0;
                padding: 1rem 0;
            }

            .dropdown-menu li {
                margin: 0;
            }

            .dropdown-menu a {
                display: block;
                padding: 8px 1.5rem;
                color: #4a5568;
                text-decoration: none;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }

            .dropdown-menu a:hover {
                background: #f8fafc;
                color: #667eea;
            }

            .header-actions {
                display: flex;
                align-items: center;
                gap: 1rem;
                flex-shrink: 0;
            }

            .search-container {
                position: relative;
            }

            .search-toggle {
                background: none;
                border: none;
                padding: 8px;
                color: #4a5568;
                cursor: pointer;
                border-radius: 6px;
                transition: all 0.3s ease;
            }

            .search-toggle:hover {
                background: #f8fafc;
                color: #667eea;
            }

            .search-overlay {
                position: absolute;
                top: 100%;
                right: 0;
                width: 300px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: all 0.3s ease;
                z-index: 1000;
                border: 1px solid rgba(0, 0, 0, 0.1);
                padding: 1rem;
            }

            .search-container:hover .search-overlay {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .search-box {
                display: flex;
                gap: 8px;
            }

            .search-input {
                flex: 1;
                padding: 8px 12px;
                border: 2px solid #e2e8f0;
                border-radius: 6px;
                font-size: 0.9rem;
                outline: none;
                transition: border-color 0.3s ease;
            }

            .search-input:focus {
                border-color: #667eea;
            }

            .search-submit {
                background: #667eea;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 0.9rem;
                cursor: pointer;
                transition: background 0.3s ease;
            }

            .search-submit:hover {
                background: #5a67d8;
            }

            .user-actions {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .support-link {
                color: #4a5568;
                text-decoration: none;
                font-weight: 500;
                padding: 8px 12px;
                border-radius: 6px;
                transition: all 0.3s ease;
            }

            .support-link:hover {
                background: #f8fafc;
                color: #667eea;
            }

            .cta-primary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                border: none;
                cursor: pointer;
            }

            .cta-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
            }

            .mobile-menu-toggle {
                display: none;
                flex-direction: column;
                gap: 4px;
                background: none;
                border: none;
                padding: 8px;
                cursor: pointer;
            }

            .hamburger-line {
                width: 20px;
                height: 2px;
                background: #4a5568;
                border-radius: 1px;
                transition: all 0.3s ease;
            }
            
            .mobile-menu-toggle.active .hamburger-line:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active .hamburger-line:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active .hamburger-line:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }

            .mobile-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border-top: 1px solid rgba(0, 0, 0, 0.1);
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
                z-index: 999;
            }
            
            .mobile-menu.open {
                max-height: 500px;
            }

            .mobile-menu-content {
                padding: 2rem;
            }

            .mobile-search {
                margin-bottom: 2rem;
            }

            .mobile-search-input {
                width: 100%;
                padding: 12px;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 1rem;
                outline: none;
            }

            .mobile-nav-menu {
                list-style: none;
                margin: 0;
                padding: 0;
                margin-bottom: 2rem;
            }

            .mobile-nav-menu li {
                margin-bottom: 1rem;
            }

            .mobile-nav-menu a {
                display: block;
                color: #4a5568;
                text-decoration: none;
                font-weight: 500;
                padding: 12px 0;
                border-bottom: 1px solid #e2e8f0;
                transition: color 0.3s ease;
            }

            .mobile-nav-menu a:hover {
                color: #667eea;
            }

            .mobile-cta-button {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                display: inline-block;
                width: 100%;
                text-align: center;
                transition: all 0.3s ease;
            }

            .mobile-cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
            }

            @media (max-width: 768px) {
                .header-nav,
                .user-actions {
                    display: none;
                }

                .mobile-menu-toggle {
                    display: flex;
                }

                .mobile-menu {
                    display: block;
                }

                .header-container {
                    padding: 0 1rem;
                }
                
                .brand-logo {
                    font-size: 1.25rem;
                }
                
                .logo-icon {
                    font-size: 1.5rem;
                }

                .nav-menu {
                    flex-direction: column;
                    gap: 0;
                }

                .mega-dropdown,
                .dropdown-menu {
                    position: static;
                    opacity: 1;
                    visibility: visible;
                    transform: none;
                    box-shadow: none;
                    border: none;
                    background: transparent;
                }

                .dropdown-content {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                    padding: 1rem 0;
                }
            }
        </style>
        
        <!-- Mobile Menu JavaScript -->
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Header JavaScript loaded');
            
            // Simple mobile menu toggle
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            console.log('Mobile toggle:', mobileToggle);
            console.log('Mobile menu:', mobileMenu);
            
            if (mobileToggle && mobileMenu) {
                mobileToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Mobile menu clicked');
                    
                    if (mobileMenu.classList.contains('open')) {
                        mobileMenu.classList.remove('open');
                        mobileToggle.classList.remove('active');
                        console.log('Mobile menu closed');
                    } else {
                        mobileMenu.classList.add('open');
                        mobileToggle.classList.add('active');
                        console.log('Mobile menu opened');
                    }
                });
                
                // Close menu when clicking menu items
                const menuLinks = mobileMenu.querySelectorAll('a');
                menuLinks.forEach(function(link) {
                    link.addEventListener('click', function() {
                        mobileMenu.classList.remove('open');
                        mobileToggle.classList.remove('active');
                        console.log('Mobile menu closed via link');
                    });
                });
                
                // Close on window resize
                window.addEventListener('resize', function() {
                    if (window.innerWidth > 768) {
                        mobileMenu.classList.remove('open');
                        mobileToggle.classList.remove('active');
                    }
                });
            } else {
                console.log('Mobile menu elements not found');
            }
        });
        </script>
        
        <!-- Main Content Wrapper -->
        <div id="content" class="site-content">