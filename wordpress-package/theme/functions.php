<?php
/**
 * SiteOptz.ai Theme Functions
 * 
 * @package SiteOptz
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function siteoptz_theme_setup() {
    // Add theme support
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    add_theme_support('html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ]);

    // Register navigation menus
    register_nav_menus([
        'primary' => __('Primary Menu', 'siteoptz'),
        'footer' => __('Footer Menu', 'siteoptz'),
    ]);

    // Add image sizes
    add_image_size('tool-logo', 120, 60, true);
    add_image_size('comparison-thumb', 300, 200, true);
    add_image_size('hero-bg', 1920, 1080, true);
}
add_action('after_setup_theme', 'siteoptz_theme_setup');

/**
 * Enqueue Scripts and Styles
 */
function siteoptz_enqueue_assets() {
    $version = wp_get_theme()->get('Version');
    
    // Styles
    wp_enqueue_style('siteoptz-style', get_stylesheet_uri(), [], $version);
    wp_enqueue_style('inter-font', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    wp_enqueue_style('lucide-icons', 'https://unpkg.com/lucide@latest/dist/umd/lucide.css');
    
    // Scripts
    wp_enqueue_script('siteoptz-components', get_template_directory_uri() . '/assets/js/components.js', ['jquery'], $version, true);
    wp_enqueue_script('framer-motion', 'https://unpkg.com/framer-motion@latest/dist/framer-motion.umd.js', [], $version, true);
    
    // Localize script with AJAX data
    wp_localize_script('siteoptz-components', 'siteoptz_ajax', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('siteoptz_nonce'),
        'api_endpoint' => rest_url('siteoptz/v1/'),
    ]);
}
add_action('wp_enqueue_scripts', 'siteoptz_enqueue_assets');

/**
 * Register Widget Areas
 */
function siteoptz_register_sidebars() {
    register_sidebar([
        'name' => __('Footer Widgets', 'siteoptz'),
        'id' => 'footer-widgets',
        'description' => __('Widgets for the footer area', 'siteoptz'),
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ]);
}
add_action('widgets_init', 'siteoptz_register_sidebars');

/**
 * Custom Post Types
 */
function siteoptz_register_post_types() {
    // AI Tools Post Type
    register_post_type('tool', [
        'labels' => [
            'name' => 'AI Tools',
            'singular_name' => 'AI Tool',
            'add_new' => 'Add New Tool',
            'add_new_item' => 'Add New AI Tool',
            'edit_item' => 'Edit AI Tool',
            'new_item' => 'New AI Tool',
            'view_item' => 'View AI Tool',
            'search_items' => 'Search AI Tools',
            'not_found' => 'No AI Tools found',
        ],
        'public' => true,
        'has_archive' => true,
        'rewrite' => ['slug' => 'tools'],
        'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'menu_icon' => 'dashicons-admin-tools',
        'show_in_rest' => true,
    ]);

    // Comparisons Post Type
    register_post_type('comparison', [
        'labels' => [
            'name' => 'Comparisons',
            'singular_name' => 'Comparison',
            'add_new' => 'Add New Comparison',
            'edit_item' => 'Edit Comparison',
        ],
        'public' => true,
        'has_archive' => true,
        'rewrite' => ['slug' => 'comparisons'],
        'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'menu_icon' => 'dashicons-chart-bar',
        'show_in_rest' => true,
    ]);

    // Testimonials Post Type
    register_post_type('testimonial', [
        'labels' => [
            'name' => 'Testimonials',
            'singular_name' => 'Testimonial',
        ],
        'public' => false,
        'show_ui' => true,
        'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'menu_icon' => 'dashicons-format-quote',
    ]);
}
add_action('init', 'siteoptz_register_post_types');

/**
 * Custom Taxonomies
 */
function siteoptz_register_taxonomies() {
    // Tool Categories
    register_taxonomy('tool_category', 'tool', [
        'labels' => [
            'name' => 'Tool Categories',
            'singular_name' => 'Tool Category',
        ],
        'hierarchical' => true,
        'public' => true,
        'rewrite' => ['slug' => 'tool-category'],
        'show_in_rest' => true,
    ]);

    // Tool Features
    register_taxonomy('tool_feature', 'tool', [
        'labels' => [
            'name' => 'Tool Features',
            'singular_name' => 'Tool Feature',
        ],
        'hierarchical' => false,
        'public' => true,
        'rewrite' => ['slug' => 'feature'],
        'show_in_rest' => true,
    ]);
}
add_action('init', 'siteoptz_register_taxonomies');

/**
 * REST API Endpoints
 */
function siteoptz_register_api_routes() {
    register_rest_route('siteoptz/v1', '/tools', [
        'methods' => 'GET',
        'callback' => 'siteoptz_get_tools_data',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('siteoptz/v1', '/comparisons', [
        'methods' => 'GET',
        'callback' => 'siteoptz_get_comparisons_data',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('siteoptz/v1', '/quote', [
        'methods' => 'POST',
        'callback' => 'siteoptz_save_quote',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('siteoptz/v1', '/lead', [
        'methods' => 'POST',
        'callback' => 'siteoptz_capture_lead',
        'permission_callback' => '__return_true',
    ]);
}
add_action('rest_api_init', 'siteoptz_register_api_routes');

/**
 * Get Tools Data for API
 */
function siteoptz_get_tools_data($request) {
    $args = [
        'post_type' => 'tool',
        'posts_per_page' => -1,
        'post_status' => 'publish',
    ];

    $tools = get_posts($args);
    $tools_data = [];

    foreach ($tools as $tool) {
        $tools_data[] = [
            'id' => $tool->ID,
            'slug' => $tool->post_name,
            'name' => $tool->post_title,
            'description' => get_field('description', $tool->ID),
            'logo' => get_field('logo', $tool->ID),
            'pricing' => get_field('pricing', $tool->ID),
            'features' => get_field('features', $tool->ID),
            'pros' => get_field('pros', $tool->ID),
            'cons' => get_field('cons', $tool->ID),
            'rating' => get_field('rating', $tool->ID),
            'url' => get_permalink($tool->ID),
        ];
    }

    return new WP_REST_Response($tools_data, 200);
}

/**
 * Save Quote via API
 */
function siteoptz_save_quote($request) {
    $params = $request->get_json_params();
    
    // Validate required fields
    if (empty($params['email']) || empty($params['tool_name'])) {
        return new WP_Error('missing_fields', 'Email and tool name are required', ['status' => 400]);
    }

    // Generate quote ID
    $quote_id = wp_generate_password(8, false);
    
    // Calculate expiry (7 days)
    $expires_at = date('Y-m-d H:i:s', strtotime('+7 days'));
    
    // Save quote to database
    global $wpdb;
    $result = $wpdb->insert(
        $wpdb->prefix . 'siteoptz_quotes',
        [
            'quote_id' => $quote_id,
            'email' => sanitize_email($params['email']),
            'tool_name' => sanitize_text_field($params['tool_name']),
            'selected_plan' => sanitize_text_field($params['selected_plan']),
            'discount_code' => sanitize_text_field($params['discount_code']),
            'expires_at' => $expires_at,
            'created_at' => current_time('mysql'),
        ]
    );

    if ($result === false) {
        return new WP_Error('save_failed', 'Failed to save quote', ['status' => 500]);
    }

    // Generate deep link
    $deep_link = home_url("/pricing?quoteId={$quote_id}");
    
    // Send email (integrate with your email service)
    siteoptz_send_quote_email($params['email'], $params['tool_name'], $deep_link);

    return new WP_REST_Response([
        'success' => true,
        'quote_id' => $quote_id,
        'deep_link' => $deep_link,
    ], 200);
}

/**
 * Capture Lead via API
 */
function siteoptz_capture_lead($request) {
    $params = $request->get_json_params();
    
    if (empty($params['email'])) {
        return new WP_Error('missing_email', 'Email is required', ['status' => 400]);
    }

    // Save lead to database
    global $wpdb;
    $result = $wpdb->insert(
        $wpdb->prefix . 'siteoptz_leads',
        [
            'email' => sanitize_email($params['email']),
            'source' => sanitize_text_field($params['source'] ?? 'website'),
            'page_url' => esc_url_raw($params['page_url'] ?? ''),
            'user_agent' => sanitize_text_field($_SERVER['HTTP_USER_AGENT']),
            'ip_address' => sanitize_text_field($_SERVER['REMOTE_ADDR']),
            'created_at' => current_time('mysql'),
        ]
    );

    if ($result === false) {
        return new WP_Error('save_failed', 'Failed to save lead', ['status' => 500]);
    }

    return new WP_REST_Response(['success' => true], 200);
}

/**
 * Create Database Tables on Activation
 */
function siteoptz_create_tables() {
    global $wpdb;

    $charset_collate = $wpdb->get_charset_collate();

    // Quotes table
    $quotes_table = $wpdb->prefix . 'siteoptz_quotes';
    $quotes_sql = "CREATE TABLE $quotes_table (
        id int(11) NOT NULL AUTO_INCREMENT,
        quote_id varchar(20) NOT NULL,
        email varchar(255) NOT NULL,
        tool_name varchar(255) NOT NULL,
        selected_plan varchar(255) DEFAULT NULL,
        discount_code varchar(50) DEFAULT NULL,
        expires_at datetime NOT NULL,
        reminded tinyint(1) DEFAULT 0,
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY quote_id (quote_id),
        KEY email (email),
        KEY expires_at (expires_at)
    ) $charset_collate;";

    // Leads table
    $leads_table = $wpdb->prefix . 'siteoptz_leads';
    $leads_sql = "CREATE TABLE $leads_table (
        id int(11) NOT NULL AUTO_INCREMENT,
        email varchar(255) NOT NULL,
        source varchar(100) DEFAULT 'website',
        page_url text DEFAULT NULL,
        user_agent text DEFAULT NULL,
        ip_address varchar(45) DEFAULT NULL,
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY email (email),
        KEY source (source),
        KEY created_at (created_at)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($quotes_sql);
    dbDelta($leads_sql);
}
register_activation_hook(__FILE__, 'siteoptz_create_tables');

/**
 * Send Quote Email
 */
function siteoptz_send_quote_email($email, $tool_name, $deep_link) {
    $subject = "Your {$tool_name} Quote from SiteOptz.ai";
    
    $message = "
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
        <h2 style='color: #2563eb;'>Your AI Tool Quote</h2>
        <p>Thank you for your interest in <strong>{$tool_name}</strong>!</p>
        <p>Your personalized quote is ready to view:</p>
        <div style='text-align: center; margin: 30px 0;'>
            <a href='{$deep_link}' style='background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;'>
                View Your Quote
            </a>
        </div>
        <p style='color: #666; font-size: 14px;'>This quote expires in 7 days.</p>
        <hr style='margin: 30px 0; border: none; border-top: 1px solid #eee;'>
        <p style='color: #999; font-size: 12px; text-align: center;'>
            SiteOptz.ai - Your AI Tools Comparison Platform<br>
            <a href='" . home_url() . "'>Visit our website</a>
        </p>
    </div>";

    $headers = [
        'Content-Type: text/html; charset=UTF-8',
        'From: SiteOptz.ai <noreply@siteoptz.ai>',
    ];

    wp_mail($email, $subject, $message, $headers);
}

/**
 * Add Schema.org Structured Data
 */
function siteoptz_add_schema_markup() {
    if (is_singular('tool')) {
        global $post;
        $tool_data = [
            '@context' => 'https://schema.org',
            '@type' => 'SoftwareApplication',
            'name' => $post->post_title,
            'description' => get_field('description'),
            'applicationCategory' => 'AI Tool',
            'operatingSystem' => 'Web Browser',
            'offers' => [
                '@type' => 'Offer',
                'price' => get_field('starting_price'),
                'priceCurrency' => 'USD',
            ],
            'aggregateRating' => [
                '@type' => 'AggregateRating',
                'ratingValue' => get_field('rating'),
                'ratingCount' => get_field('review_count'),
            ],
        ];
        
        echo '<script type="application/ld+json">' . json_encode($tool_data, JSON_UNESCAPED_SLASHES) . '</script>';
    }
    
    if (is_page_template('comparison.php')) {
        // Add ProductComparison schema
        $comparison_schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Product',
            'name' => get_the_title(),
            'description' => get_the_excerpt(),
        ];
        
        echo '<script type="application/ld+json">' . json_encode($comparison_schema, JSON_UNESCAPED_SLASHES) . '</script>';
    }
}
add_action('wp_head', 'siteoptz_add_schema_markup');

/**
 * Custom Body Classes
 */
function siteoptz_body_classes($classes) {
    if (is_singular('tool')) {
        $classes[] = 'single-tool';
    }
    
    if (is_page_template('comparison.php')) {
        $classes[] = 'comparison-page';
    }
    
    if (is_page_template('pricing.php')) {
        $classes[] = 'pricing-page';
    }
    
    return $classes;
}
add_filter('body_class', 'siteoptz_body_classes');

/**
 * Breadcrumb Navigation
 */
function siteoptz_breadcrumbs() {
    if (is_front_page()) return;
    
    echo '<nav aria-label="Breadcrumb" class="breadcrumb">';
    echo '<ol class="breadcrumb-list">';
    echo '<li><a href="' . home_url() . '">Home</a></li>';
    
    if (is_singular('tool')) {
        echo '<li><a href="' . get_post_type_archive_link('tool') . '">Tools</a></li>';
        echo '<li aria-current="page">' . get_the_title() . '</li>';
    } elseif (is_singular('comparison')) {
        echo '<li><a href="' . get_post_type_archive_link('comparison') . '">Comparisons</a></li>';
        echo '<li aria-current="page">' . get_the_title() . '</li>';
    } elseif (is_page()) {
        echo '<li aria-current="page">' . get_the_title() . '</li>';
    }
    
    echo '</ol>';
    echo '</nav>';
}

/**
 * Theme Customizer
 */
function siteoptz_customize_register($wp_customize) {
    // Hero Section
    $wp_customize->add_section('siteoptz_hero', [
        'title' => 'Hero Section',
        'priority' => 30,
    ]);
    
    $wp_customize->add_setting('hero_title');
    $wp_customize->add_control('hero_title', [
        'label' => 'Hero Title',
        'section' => 'siteoptz_hero',
        'type' => 'text',
    ]);
    
    $wp_customize->add_setting('hero_subtitle');
    $wp_customize->add_control('hero_subtitle', [
        'label' => 'Hero Subtitle',
        'section' => 'siteoptz_hero',
        'type' => 'textarea',
    ]);
    
    // Trust Band
    $wp_customize->add_section('siteoptz_trust', [
        'title' => 'Trust Band',
        'priority' => 35,
    ]);
    
    $wp_customize->add_setting('trust_logos');
    $wp_customize->add_control('trust_logos', [
        'label' => 'Trust Band Logos (JSON)',
        'section' => 'siteoptz_trust',
        'type' => 'textarea',
    ]);
}
add_action('customize_register', 'siteoptz_customize_register');

/**
 * Admin Styles
 */
function siteoptz_admin_styles() {
    echo '<style>
        .post-type-tool .dashicons-admin-tools:before { color: #2563eb; }
        .post-type-comparison .dashicons-chart-bar:before { color: #16a34a; }
        .toplevel_page_siteoptz-dashboard .wp-menu-image img { width: 20px; }
    </style>';
}
add_action('admin_head', 'siteoptz_admin_styles');

/**
 * Performance Optimizations
 */
function siteoptz_optimize_performance() {
    // Remove unused WordPress features
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    
    // Preload critical resources
    echo '<link rel="preload" href="' . get_template_directory_uri() . '/assets/css/critical.css" as="style">';
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
}
add_action('wp_head', 'siteoptz_optimize_performance', 1);

/**
 * Security Headers
 */
function siteoptz_security_headers() {
    if (!is_admin()) {
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
    }
}
add_action('send_headers', 'siteoptz_security_headers');
?>