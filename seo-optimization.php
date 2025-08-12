<?php
/**
 * SEO Optimization for AI Tool Comparison Pages
 * Advanced SEO features for SiteOptz.com
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Generate comprehensive meta tags for comparison pages
 */
function siteoptz_generate_comparison_meta() {
    global $post;
    
    if (!is_page_template('page-chatgpt-vs-jasper-ai.php') && !is_page('chatgpt-vs-jasper-ai-comparison-2025')) {
        return;
    }
    
    $meta_data = array(
        'title' => 'ChatGPT vs Jasper AI: Complete Comparison [2025] | SiteOptz',
        'description' => 'Compare ChatGPT vs Jasper AI pricing, features, and use cases. Expert analysis, real user experiences, and 2025 recommendations. Find your perfect AI writing tool.',
        'keywords' => 'ChatGPT vs Jasper AI, AI writing tools comparison, content creation software, Jasper AI review, ChatGPT pricing, best AI tools 2025',
        'canonical' => get_permalink(),
        'og_image' => get_template_directory_uri() . '/images/chatgpt-vs-jasper-comparison.jpg'
    );
    
    ?>
    <!-- Primary Meta Tags -->
    <title><?php echo esc_html($meta_data['title']); ?></title>
    <meta name="title" content="<?php echo esc_attr($meta_data['title']); ?>" />
    <meta name="description" content="<?php echo esc_attr($meta_data['description']); ?>" />
    <meta name="keywords" content="<?php echo esc_attr($meta_data['keywords']); ?>" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="<?php echo esc_url($meta_data['canonical']); ?>" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content="<?php echo esc_attr($meta_data['title']); ?>" />
    <meta property="og:description" content="<?php echo esc_attr($meta_data['description']); ?>" />
    <meta property="og:url" content="<?php echo esc_url($meta_data['canonical']); ?>" />
    <meta property="og:site_name" content="SiteOptz" />
    <meta property="og:image" content="<?php echo esc_url($meta_data['og_image']); ?>" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_US" />
    <meta property="article:author" content="SiteOptz Team" />
    <meta property="article:published_time" content="<?php echo get_the_date('c'); ?>" />
    <meta property="article:modified_time" content="<?php echo get_the_modified_date('c'); ?>" />
    <meta property="article:section" content="AI Tools" />
    <meta property="article:tag" content="ChatGPT" />
    <meta property="article:tag" content="Jasper AI" />
    <meta property="article:tag" content="AI Writing Tools" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?php echo esc_attr($meta_data['title']); ?>" />
    <meta name="twitter:description" content="<?php echo esc_attr($meta_data['description']); ?>" />
    <meta name="twitter:image" content="<?php echo esc_url($meta_data['og_image']); ?>" />
    <meta name="twitter:site" content="@siteoptz" />
    <meta name="twitter:creator" content="@siteoptz" />
    
    <!-- Additional SEO Meta -->
    <meta name="author" content="SiteOptz Team" />
    <meta name="publisher" content="SiteOptz" />
    <meta name="theme-color" content="#667eea" />
    <meta name="msapplication-TileColor" content="#667eea" />
    
    <!-- Schema.org JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "@id": "<?php echo esc_url($meta_data['canonical']); ?>#article",
                "headline": "<?php echo esc_js($meta_data['title']); ?>",
                "description": "<?php echo esc_js($meta_data['description']); ?>",
                "image": {
                    "@type": "ImageObject",
                    "url": "<?php echo esc_url($meta_data['og_image']); ?>",
                    "width": 1200,
                    "height": 630
                },
                "author": {
                    "@type": "Organization",
                    "name": "SiteOptz",
                    "url": "https://siteoptz.com"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "SiteOptz",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://siteoptz.com/logo.png",
                        "width": 300,
                        "height": 60
                    }
                },
                "datePublished": "<?php echo get_the_date('c'); ?>",
                "dateModified": "<?php echo get_the_modified_date('c'); ?>",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "<?php echo esc_url($meta_data['canonical']); ?>"
                },
                "about": [
                    {
                        "@type": "SoftwareApplication",
                        "name": "ChatGPT",
                        "applicationCategory": "AI Writing Tool",
                        "operatingSystem": "Web, iOS, Android",
                        "offers": {
                            "@type": "Offer",
                            "price": "20",
                            "priceCurrency": "USD",
                            "priceSpecification": {
                                "@type": "UnitPriceSpecification",
                                "price": "20",
                                "priceCurrency": "USD",
                                "billingDuration": "P1M"
                            }
                        }
                    },
                    {
                        "@type": "SoftwareApplication",
                        "name": "Jasper AI",
                        "applicationCategory": "AI Writing Tool",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "39",
                            "priceCurrency": "USD",
                            "priceSpecification": {
                                "@type": "UnitPriceSpecification",
                                "price": "39",
                                "priceCurrency": "USD",
                                "billingDuration": "P1M"
                            }
                        }
                    }
                ]
            },
            {
                "@type": "ComparisonTable",
                "@id": "<?php echo esc_url($meta_data['canonical']); ?>#comparison",
                "name": "ChatGPT vs Jasper AI Comparison Table",
                "about": [
                    {
                        "@type": "SoftwareApplication",
                        "name": "ChatGPT"
                    },
                    {
                        "@type": "SoftwareApplication",
                        "name": "Jasper AI"
                    }
                ]
            },
            {
                "@type": "WebPage",
                "@id": "<?php echo esc_url($meta_data['canonical']); ?>",
                "url": "<?php echo esc_url($meta_data['canonical']); ?>",
                "name": "<?php echo esc_js($meta_data['title']); ?>",
                "description": "<?php echo esc_js($meta_data['description']); ?>",
                "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://siteoptz.com"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "AI Tools",
                            "item": "https://siteoptz.com/ai-tools/"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": "Content Creation",
                            "item": "https://siteoptz.com/ai-tools/content-creation/"
                        },
                        {
                            "@type": "ListItem",
                            "position": 4,
                            "name": "ChatGPT vs Jasper AI"
                        }
                    ]
                }
            },
            {
                "@type": "Review",
                "@id": "<?php echo esc_url($meta_data['canonical']); ?>#review",
                "itemReviewed": [
                    {
                        "@type": "SoftwareApplication",
                        "name": "ChatGPT"
                    },
                    {
                        "@type": "SoftwareApplication",
                        "name": "Jasper AI"
                    }
                ],
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "4.5",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "author": {
                    "@type": "Organization",
                    "name": "SiteOptz"
                },
                "datePublished": "<?php echo get_the_date('c'); ?>",
                "reviewBody": "Comprehensive comparison of ChatGPT and Jasper AI covering pricing, features, use cases, and recommendations for 2025."
            }
        ]
    }
    </script>
    
    <!-- Performance and Core Web Vitals -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preload" href="<?php echo get_template_directory_uri(); ?>/css/ai-comparison-styles.css" as="style" />
    <link rel="preload" href="<?php echo get_template_directory_uri(); ?>/js/affiliate-tracking.js" as="script" />
    
    <!-- DNS Prefetch for external resources -->
    <link rel="dns-prefetch" href="//www.google-analytics.com" />
    <link rel="dns-prefetch" href="//jasper.ai" />
    <link rel="dns-prefetch" href="//openai.com" />
    
    <?php
}
add_action('wp_head', 'siteoptz_generate_comparison_meta', 1);

/**
 * Generate FAQ Schema for comparison page
 */
function siteoptz_add_faq_schema() {
    if (!is_page_template('page-chatgpt-vs-jasper-ai.php')) {
        return;
    }
    
    $faqs = array(
        array(
            'question' => 'Which is better, ChatGPT or Jasper AI?',
            'answer' => 'ChatGPT is better for general use, budget-conscious users, and versatile AI assistance at $20/month. Jasper AI is better for marketing teams, brand consistency, and specialized content creation at $39-99/month.'
        ),
        array(
            'question' => 'What is the price difference between ChatGPT and Jasper AI?',
            'answer' => 'ChatGPT Plus costs $20/month while Jasper AI starts at $39/month for the Starter plan and $99/month for Boss Mode. ChatGPT offers better value for volume, while Jasper AI provides specialized marketing features.'
        ),
        array(
            'question' => 'Can ChatGPT replace Jasper AI for content marketing?',
            'answer' => 'ChatGPT can handle basic content marketing tasks but lacks Jasper AI\'s specialized features like brand voice training, SEO optimization tools, and marketing-specific templates.'
        ),
        array(
            'question' => 'Does Jasper AI have better SEO features than ChatGPT?',
            'answer' => 'Yes, Jasper AI includes built-in SEO optimization with SurferSEO integration, keyword research, and content scoring. ChatGPT requires manual SEO optimization and external tools.'
        ),
        array(
            'question' => 'Which tool is better for beginners?',
            'answer' => 'ChatGPT is more beginner-friendly with its simple chat interface and lower learning curve. Jasper AI requires more setup and understanding of marketing concepts but provides more structured guidance.'
        )
    );
    
    ?>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            <?php foreach ($faqs as $index => $faq): ?>
            {
                "@type": "Question",
                "name": "<?php echo esc_js($faq['question']); ?>",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "<?php echo esc_js($faq['answer']); ?>"
                }
            }<?php echo ($index < count($faqs) - 1) ? ',' : ''; ?>
            <?php endforeach; ?>
        ]
    }
    </script>
    <?php
}
add_action('wp_head', 'siteoptz_add_faq_schema', 2);

/**
 * Add internal linking suggestions
 */
function siteoptz_get_internal_links() {
    return array(
        'ai-tools' => array(
            'url' => '/ai-tools/',
            'title' => 'Best AI Tools for Business',
            'anchor' => 'comprehensive AI tools guide'
        ),
        'content-creation' => array(
            'url' => '/ai-tools/content-creation/',
            'title' => 'AI Content Creation Tools',
            'anchor' => 'AI content creation tools'
        ),
        'seo-tools' => array(
            'url' => '/ai-tools/seo/',
            'title' => 'AI SEO Tools Comparison',
            'anchor' => 'AI SEO optimization tools'
        ),
        'marketing-automation' => array(
            'url' => '/ai-tools/marketing-automation/',
            'title' => 'AI Marketing Automation',
            'anchor' => 'marketing automation solutions'
        )
    );
}

/**
 * Optimize images for Core Web Vitals
 */
function siteoptz_optimize_images() {
    if (!is_page_template('page-chatgpt-vs-jasper-ai.php')) {
        return;
    }
    
    // Add lazy loading and WebP support
    add_filter('wp_get_attachment_image_attributes', function($attr) {
        $attr['loading'] = 'lazy';
        $attr['decoding'] = 'async';
        return $attr;
    });
    
    // Preload critical images
    ?>
    <link rel="preload" as="image" href="<?php echo get_template_directory_uri(); ?>/images/chatgpt-logo.webp" />
    <link rel="preload" as="image" href="<?php echo get_template_directory_uri(); ?>/images/jasper-ai-logo.webp" />
    <?php
}
add_action('wp_head', 'siteoptz_optimize_images', 3);

/**
 * Add hreflang for international SEO (if applicable)
 */
function siteoptz_add_hreflang() {
    if (!is_page_template('page-chatgpt-vs-jasper-ai.php')) {
        return;
    }
    
    $current_url = get_permalink();
    
    ?>
    <link rel="alternate" hreflang="en" href="<?php echo esc_url($current_url); ?>" />
    <link rel="alternate" hreflang="en-us" href="<?php echo esc_url($current_url); ?>" />
    <link rel="alternate" hreflang="x-default" href="<?php echo esc_url($current_url); ?>" />
    <?php
}
add_action('wp_head', 'siteoptz_add_hreflang', 4);

/**
 * Generate XML sitemap entry for comparison pages
 */
function siteoptz_add_to_sitemap($sitemap_entries) {
    $comparison_pages = get_posts(array(
        'post_type' => 'page',
        'meta_query' => array(
            array(
                'key' => '_wp_page_template',
                'value' => 'page-chatgpt-vs-jasper-ai.php'
            )
        ),
        'posts_per_page' => -1
    ));
    
    foreach ($comparison_pages as $page) {
        $sitemap_entries[] = array(
            'loc' => get_permalink($page->ID),
            'lastmod' => get_the_modified_date('c', $page->ID),
            'changefreq' => 'monthly',
            'priority' => '0.8'
        );
    }
    
    return $sitemap_entries;
}
add_filter('siteoptz_sitemap_entries', 'siteoptz_add_to_sitemap');

/**
 * Optimize for featured snippets
 */
function siteoptz_featured_snippet_optimization() {
    if (!is_page_template('page-chatgpt-vs-jasper-ai.php')) {
        return;
    }
    
    // Add structured content for featured snippets
    ?>
    <div style="display: none;" class="featured-snippet-content">
        <h3>ChatGPT vs Jasper AI Quick Comparison</h3>
        <ul>
            <li><strong>ChatGPT:</strong> $20/month, general AI assistant, excellent for versatile content creation</li>
            <li><strong>Jasper AI:</strong> $39-99/month, marketing-focused, superior for brand consistency and SEO</li>
            <li><strong>Best for individuals:</strong> ChatGPT due to lower cost and versatility</li>
            <li><strong>Best for businesses:</strong> Jasper AI due to advanced marketing features</li>
        </ul>
    </div>
    <?php
}
add_action('wp_footer', 'siteoptz_featured_snippet_optimization');

/**
 * Add performance monitoring
 */
function siteoptz_performance_monitoring() {
    if (!is_page_template('page-chatgpt-vs-jasper-ai.php')) {
        return;
    }
    
    ?>
    <script>
    // Core Web Vitals monitoring
    function measureCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                    // Send to analytics
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'core_web_vitals', {
                            metric: 'LCP',
                            value: Math.round(entry.startTime)
                        });
                    }
                }
            }
        }).observe({entryTypes: ['largest-contentful-paint']});
        
        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (entry.entryType === 'first-input') {
                    console.log('FID:', entry.processingStart - entry.startTime);
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'core_web_vitals', {
                            metric: 'FID',
                            value: Math.round(entry.processingStart - entry.startTime)
                        });
                    }
                }
            }
        }).observe({entryTypes: ['first-input']});
        
        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            console.log('CLS:', clsValue);
            if (typeof gtag !== 'undefined') {
                gtag('event', 'core_web_vitals', {
                    metric: 'CLS',
                    value: Math.round(clsValue * 1000)
                });
            }
        }).observe({entryTypes: ['layout-shift']});
    }
    
    // Initialize monitoring when page loads
    if (document.readyState === 'complete') {
        measureCoreWebVitals();
    } else {
        window.addEventListener('load', measureCoreWebVitals);
    }
    </script>
    <?php
}
add_action('wp_footer', 'siteoptz_performance_monitoring');

/**
 * Content freshness indicator
 */
function siteoptz_add_freshness_indicator() {
    if (!is_page_template('page-chatgpt-vs-jasper-ai.php')) {
        return;
    }
    
    $last_updated = get_the_modified_date('F j, Y');
    
    ?>
    <div class="content-freshness" style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>✅ Updated for 2025:</strong> This comparison was last updated on <?php echo esc_html($last_updated); ?> with current pricing and features.</p>
    </div>
    <?php
}
add_action('the_content', 'siteoptz_add_freshness_indicator');

/**
 * Competitor analysis tracking
 */
function siteoptz_track_competitor_analysis() {
    // Track key competitor pages for comparison
    $competitors = array(
        'hubspot.com',
        'neil-patel.com',
        'backlinko.com',
        'semrush.com'
    );
    
    // Log when users arrive from competitor sites
    $referrer = $_SERVER['HTTP_REFERER'] ?? '';
    
    foreach ($competitors as $competitor) {
        if (strpos($referrer, $competitor) !== false) {
            // Track competitor referral
            if (function_exists('track_custom_event')) {
                track_custom_event('competitor_referral', array(
                    'competitor' => $competitor,
                    'page' => 'chatgpt-vs-jasper-comparison',
                    'timestamp' => time()
                ));
            }
            break;
        }
    }
}
add_action('template_redirect', 'siteoptz_track_competitor_analysis');
?>