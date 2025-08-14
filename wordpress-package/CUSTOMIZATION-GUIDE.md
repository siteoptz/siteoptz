# 🎨 SiteOptz.ai WordPress Package - Complete Customization Guide

## 📍 **Package Location**
```
/Users/siteoptz/siteoptz-scraping/wordpress-package/
```

## 🎯 **Overview**

This guide shows you how to customize every aspect of your SiteOptz.ai WordPress package to match your brand and requirements. The package is designed to be highly customizable while maintaining performance and accessibility standards.

---

## 🎨 **Visual Customization**

### **1. Brand Identity**

#### **Logo Customization**
```php
// In theme/functions.php
function siteoptz_custom_logo() {
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));
}
add_action('after_setup_theme', 'siteoptz_custom_logo');
```

#### **Color Scheme**
Edit `theme/style.css` CSS custom properties:
```css
:root {
    /* Primary Colors - Your Brand */
    --blue-50: #eff6ff;
    --blue-100: #dbeafe;
    --blue-200: #bfdbfe;
    --blue-300: #93c5fd;
    --blue-400: #60a5fa;
    --blue-500: #3b82f6;   /* Primary brand color */
    --blue-600: #2563eb;   /* Primary hover */
    --blue-700: #1d4ed8;
    --blue-800: #1e40af;
    --blue-900: #1e3a8a;
    
    /* Secondary Colors */
    --indigo-500: #6366f1;  /* Secondary brand color */
    --indigo-600: #4f46e5;  /* Secondary hover */
    
    /* Accent Colors */
    --amber-500: #f59e0b;   /* Warning/highlight */
    --green-600: #059669;   /* Success */
    --red-600: #dc2626;     /* Error */
}
```

#### **Typography**
```css
:root {
    /* Font Families */
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-serif: 'Georgia', serif;
    --font-mono: 'Fira Code', monospace;
    
    /* Font Weights */
    --font-light: 300;
    --font-normal: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;
    
    /* Font Sizes */
    --text-xs: 0.75rem;     /* 12px */
    --text-sm: 0.875rem;    /* 14px */
    --text-base: 1rem;      /* 16px */
    --text-lg: 1.125rem;    /* 18px */
    --text-xl: 1.25rem;     /* 20px */
    --text-2xl: 1.5rem;     /* 24px */
    --text-3xl: 1.875rem;   /* 30px */
    --text-4xl: 2.25rem;    /* 36px */
    --text-5xl: 3rem;       /* 48px */
}
```

### **2. Layout Customization**

#### **Container Widths**
```css
.container {
    max-width: 1200px;  /* Adjust site width */
    margin: 0 auto;
    padding: 0 var(--space-4);
}

/* Responsive breakpoints */
@media (max-width: 1200px) {
    .container { max-width: 960px; }
}

@media (max-width: 768px) {
    .container { max-width: 100%; }
}
```

#### **Spacing System**
```css
:root {
    /* Spacing Scale */
    --space-1: 0.25rem;   /* 4px */
    --space-2: 0.5rem;    /* 8px */
    --space-3: 0.75rem;   /* 12px */
    --space-4: 1rem;      /* 16px */
    --space-6: 1.5rem;    /* 24px */
    --space-8: 2rem;      /* 32px */
    --space-10: 2.5rem;   /* 40px */
    --space-12: 3rem;     /* 48px */
    --space-16: 4rem;     /* 64px */
    --space-20: 5rem;     /* 80px */
}
```

---

## 🧩 **Component Customization**

### **1. Hero Component**

#### **Basic Configuration**
```jsx
// In components/Hero.jsx
const customHeroConfig = {
    title: "Your Custom Title",
    subtitle: "Your custom subtitle here",
    ctaText: "Get Started",
    ctaUrl: "/your-cta-url",
    backgroundImage: "/path/to/your/hero-image.jpg",
    backgroundGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
};
```

#### **Advanced Customization**
```jsx
// Custom Hero component
const CustomHero = ({ 
    title, 
    subtitle, 
    features = [],
    showVideo = false,
    videoUrl = "",
    customBackground = null 
}) => {
    return (
        <section className="hero-section" style={{
            background: customBackground || 'linear-gradient(135deg, var(--blue-600), var(--indigo-600))'
        }}>
            <div className="container">
                <div className="hero-content">
                    <h1 className="hero-title">{title}</h1>
                    <p className="hero-subtitle">{subtitle}</p>
                    
                    {features.length > 0 && (
                        <div className="hero-features">
                            {features.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <CheckCircle size={20} />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {showVideo && videoUrl && (
                        <div className="hero-video">
                            <video autoPlay muted loop>
                                <source src={videoUrl} type="video/mp4" />
                            </video>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
```

### **2. Comparison Table**

#### **Custom Columns**
```jsx
// Add custom columns to comparison table
const customColumns = [
    {
        key: 'name',
        label: 'Tool Name',
        sortable: true,
        width: '200px'
    },
    {
        key: 'pricing',
        label: 'Price/Month',
        sortable: true,
        render: (value) => `$${value}`
    },
    {
        key: 'features',
        label: 'Key Features',
        render: (features) => features.slice(0, 3).join(', ')
    },
    // Add your custom columns here
    {
        key: 'customField',
        label: 'Your Custom Field',
        sortable: false,
        render: (value) => `Custom: ${value}`
    }
];
```

#### **Custom Styling**
```css
/* Custom table styles */
.comparison-table {
    --table-border-color: #e5e7eb;
    --table-header-bg: #f9fafb;
    --table-row-hover: #f3f4f6;
    --table-accent-color: var(--blue-600);
}

.comparison-table th {
    background: var(--table-header-bg);
    color: var(--text-primary);
    font-weight: var(--font-semibold);
}

.comparison-table tr:hover {
    background: var(--table-row-hover);
}
```

### **3. Pricing Calculator**

#### **Custom Usage Metrics**
```jsx
const customUsageMetrics = [
    {
        key: 'apiCalls',
        label: 'API Calls per Month',
        min: 0,
        max: 100000,
        step: 1000,
        defaultValue: 10000,
        included: 5000,
        pricePerUnit: 0.001,
        description: 'Number of API requests per month'
    },
    {
        key: 'storage',
        label: 'Storage (GB)',
        min: 0,
        max: 1000,
        step: 10,
        defaultValue: 100,
        included: 50,
        pricePerUnit: 0.10,
        description: 'Data storage in gigabytes'
    },
    // Add your custom metrics
    {
        key: 'customMetric',
        label: 'Your Custom Metric',
        min: 0,
        max: 10000,
        step: 100,
        defaultValue: 1000,
        pricePerUnit: 0.05
    }
];
```

#### **Custom Plans**
```jsx
const customPlans = [
    {
        name: 'Starter',
        basePrice: 29,
        features: [
            '10,000 API calls included',
            '50GB storage',
            'Email support',
            'Basic analytics'
        ],
        popular: false
    },
    {
        name: 'Professional',
        basePrice: 99,
        features: [
            '100,000 API calls included',
            '500GB storage',
            'Priority support',
            'Advanced analytics',
            'Custom integrations'
        ],
        popular: true
    },
    // Add your custom plans
];
```

### **4. Lead Capture Forms**

#### **Custom Form Fields**
```jsx
const customFields = [
    'email',           // Required
    'name',           // Full name
    'company',        // Company name
    'phone',          // Phone number
    'role',           // Job role (select)
    'industry',       // Industry (select)
    'budget',         // Budget range (select)
    'timeline'        // Implementation timeline (select)
];

const customFieldConfig = {
    industry: {
        type: "select",
        label: "Industry",
        options: [
            "Technology",
            "Healthcare",
            "Finance",
            "Education",
            "E-commerce",
            "Manufacturing",
            "Other"
        ]
    },
    budget: {
        type: "select",
        label: "Monthly Budget",
        options: [
            "Under $1,000",
            "$1,000 - $5,000",
            "$5,000 - $10,000",
            "$10,000 - $50,000",
            "Over $50,000"
        ]
    }
};
```

#### **Custom Lead Types**
```jsx
const customLeadTypes = {
    newsletter: {
        title: "Stay Updated",
        description: "Get weekly AI insights",
        buttonText: "Subscribe",
        incentive: "Free weekly newsletter"
    },
    demo: {
        title: "Book a Demo",
        description: "See our platform in action",
        buttonText: "Schedule Demo",
        incentive: "30-minute personalized session"
    },
    trial: {
        title: "Start Free Trial",
        description: "Try all features for 14 days",
        buttonText: "Start Trial",
        incentive: "No credit card required"
    }
};
```

---

## 📊 **Data Customization**

### **1. Tools Database**

#### **Custom Tool Schema**
```json
{
    "tools": [
        {
            "id": "your-tool-id",
            "name": "Your Tool Name",
            "description": "Tool description",
            "category": "category-name",
            "pricing": {
                "free": true,
                "plans": [
                    {
                        "name": "Basic",
                        "price": 29,
                        "currency": "USD",
                        "billing": "monthly"
                    }
                ]
            },
            "features": [
                "Feature 1",
                "Feature 2",
                "Feature 3"
            ],
            "pros": [
                "Pro 1",
                "Pro 2"
            ],
            "cons": [
                "Con 1",
                "Con 2"
            ],
            "rating": 4.5,
            "reviewCount": 150,
            "website": "https://tool-website.com",
            "documentation": "https://docs.tool-website.com",
            "support": "https://support.tool-website.com",
            "customFields": {
                "apiAvailable": true,
                "integrations": ["zapier", "slack", "discord"],
                "languages": ["english", "spanish", "french"]
            }
        }
    ]
}
```

#### **Custom Categories**
```json
{
    "categories": [
        {
            "id": "text-generation",
            "name": "Text Generation",
            "description": "AI tools for generating written content",
            "icon": "type",
            "color": "#3b82f6"
        },
        {
            "id": "image-generation",
            "name": "Image Generation",
            "description": "AI tools for creating visual content",
            "icon": "image",
            "color": "#8b5cf6"
        },
        {
            "id": "your-custom-category",
            "name": "Your Category",
            "description": "Your custom category description",
            "icon": "star",
            "color": "#10b981"
        }
    ]
}
```

### **2. FAQ Content**

#### **Custom FAQ Structure**
```json
{
    "faqs": [
        {
            "id": "faq-1",
            "question": "What is your tool?",
            "answer": "Our tool is...",
            "category": "general",
            "tags": ["basics", "overview"],
            "lastUpdated": "2024-01-15",
            "relatedLinks": [
                {
                    "title": "Getting Started Guide",
                    "url": "/getting-started",
                    "external": false
                }
            ]
        }
    ],
    "categories": [
        "general",
        "pricing",
        "technical",
        "support"
    ]
}
```

---

## ⚙️ **Functionality Customization**

### **1. Search Configuration**

#### **Custom Search Parameters**
```php
// In theme/functions.php
function siteoptz_custom_search($query) {
    if (!is_admin() && $query->is_main_query() && $query->is_search()) {
        // Search in custom post types
        $query->set('post_type', array('post', 'page', 'ai_tool', 'comparison'));
        
        // Custom search fields
        $meta_query = array(
            'relation' => 'OR',
            array(
                'key'     => 'tool_category',
                'value'   => $query->get('s'),
                'compare' => 'LIKE'
            ),
            array(
                'key'     => 'tool_features',
                'value'   => $query->get('s'),
                'compare' => 'LIKE'
            )
        );
        $query->set('meta_query', $meta_query);
    }
}
add_action('pre_get_posts', 'siteoptz_custom_search');
```

#### **Search Filters**
```jsx
const customSearchFilters = {
    categories: [
        'text-generation',
        'image-generation',
        'code-generation',
        'data-analysis'
    ],
    priceRanges: [
        { label: 'Free', min: 0, max: 0 },
        { label: 'Under $50', min: 0, max: 50 },
        { label: '$50-$200', min: 50, max: 200 },
        { label: 'Over $200', min: 200, max: 9999 }
    ],
    features: [
        'API Available',
        'No-Code Interface',
        'Team Collaboration',
        'Custom Training'
    ]
};
```

### **2. Navigation Customization**

#### **Custom Menu Items**
```jsx
const customMenuItems = [
    {
        label: "Your Menu Item",
        url: "/your-page",
        icon: YourIcon,
        dropdown: [
            {
                label: "Submenu Item 1",
                url: "/submenu-1"
            },
            {
                label: "Submenu Item 2",
                url: "/submenu-2"
            }
        ]
    }
];
```

#### **Custom Navigation Behavior**
```jsx
const customNavigationConfig = {
    hideOnScroll: true,
    showProgress: true,
    searchable: true,
    stickyBreakpoint: 100, // px from top
    mobileBreakpoint: 768  // px width
};
```

---

## 🔌 **Integration Customization**

### **1. Email Marketing**

#### **Mailchimp Integration**
```php
// In theme/functions.php
function siteoptz_mailchimp_subscribe($email, $list_id) {
    $api_key = 'your-mailchimp-api-key';
    $server = 'us1'; // Your server prefix
    
    $url = "https://{$server}.api.mailchimp.com/3.0/lists/{$list_id}/members";
    
    $data = array(
        'email_address' => $email,
        'status' => 'subscribed'
    );
    
    $response = wp_remote_post($url, array(
        'headers' => array(
            'Authorization' => 'Basic ' . base64_encode('user:' . $api_key),
            'Content-Type' => 'application/json'
        ),
        'body' => json_encode($data)
    ));
    
    return $response;
}
```

#### **ConvertKit Integration**
```php
function siteoptz_convertkit_subscribe($email, $form_id) {
    $api_key = 'your-convertkit-api-key';
    $url = "https://api.convertkit.com/v3/forms/{$form_id}/subscribe";
    
    $data = array(
        'api_key' => $api_key,
        'email' => $email
    );
    
    return wp_remote_post($url, array(
        'body' => $data
    ));
}
```

### **2. Analytics Integration**

#### **Google Analytics 4**
```php
// Add to theme/header.php
function siteoptz_ga4_tracking() {
    $ga_id = 'G-XXXXXXXXXX'; // Your GA4 ID
    ?>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo $ga_id; ?>"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '<?php echo $ga_id; ?>');
    </script>
    <?php
}
add_action('wp_head', 'siteoptz_ga4_tracking');
```

#### **Custom Event Tracking**
```javascript
// Track component interactions
function trackComponentEvent(componentName, action, value = null) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'Component Interaction',
            event_label: componentName,
            value: value
        });
    }
}

// Usage examples
trackComponentEvent('PricingCalculator', 'plan_selected', 'professional');
trackComponentEvent('ComparisonTable', 'tool_compared', 'chatgpt-vs-claude');
trackComponentEvent('LeadCapture', 'form_submitted', 'newsletter');
```

### **3. Payment Integration**

#### **Stripe Integration**
```php
// Basic Stripe setup
function siteoptz_stripe_payment($amount, $currency = 'usd') {
    require_once 'stripe-php/init.php';
    
    \Stripe\Stripe::setApiKey('sk_test_...');
    
    $intent = \Stripe\PaymentIntent::create([
        'amount' => $amount * 100, // Amount in cents
        'currency' => $currency,
        'metadata' => [
            'site' => 'siteoptz'
        ]
    ]);
    
    return $intent;
}
```

---

## 🎛️ **Advanced Customization**

### **1. Custom Post Types**

#### **AI Tools Post Type**
```php
// In theme/functions.php
function siteoptz_register_ai_tools() {
    register_post_type('ai_tool', array(
        'labels' => array(
            'name' => 'AI Tools',
            'singular_name' => 'AI Tool'
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-admin-tools'
    ));
}
add_action('init', 'siteoptz_register_ai_tools');
```

#### **Custom Meta Fields**
```php
function siteoptz_add_tool_meta_boxes() {
    add_meta_box(
        'tool-details',
        'Tool Details',
        'siteoptz_tool_meta_callback',
        'ai_tool'
    );
}
add_action('add_meta_boxes', 'siteoptz_add_tool_meta_boxes');

function siteoptz_tool_meta_callback($post) {
    $pricing = get_post_meta($post->ID, '_tool_pricing', true);
    $features = get_post_meta($post->ID, '_tool_features', true);
    $rating = get_post_meta($post->ID, '_tool_rating', true);
    ?>
    <table class="form-table">
        <tr>
            <th><label for="tool_pricing">Pricing</label></th>
            <td><input type="text" id="tool_pricing" name="tool_pricing" value="<?php echo $pricing; ?>" /></td>
        </tr>
        <tr>
            <th><label for="tool_features">Features</label></th>
            <td><textarea id="tool_features" name="tool_features"><?php echo $features; ?></textarea></td>
        </tr>
        <tr>
            <th><label for="tool_rating">Rating</label></th>
            <td><input type="number" id="tool_rating" name="tool_rating" value="<?php echo $rating; ?>" min="1" max="5" step="0.1" /></td>
        </tr>
    </table>
    <?php
}
```

### **2. Custom Shortcodes**

#### **Component Shortcodes**
```php
// Comparison table shortcode
function siteoptz_comparison_table_shortcode($atts) {
    $atts = shortcode_atts(array(
        'tools' => '',
        'columns' => 'name,pricing,rating',
        'sortable' => 'true'
    ), $atts);
    
    // Return the component HTML
    return '<div id="comparison-table" data-tools="' . esc_attr($atts['tools']) . '" data-columns="' . esc_attr($atts['columns']) . '"></div>';
}
add_shortcode('comparison_table', 'siteoptz_comparison_table_shortcode');

// Pricing calculator shortcode
function siteoptz_pricing_calculator_shortcode($atts) {
    $atts = shortcode_atts(array(
        'tool' => '',
        'plans' => '',
        'show_email_capture' => 'true'
    ), $atts);
    
    return '<div id="pricing-calculator" data-tool="' . esc_attr($atts['tool']) . '" data-plans="' . esc_attr($atts['plans']) . '"></div>';
}
add_shortcode('pricing_calculator', 'siteoptz_pricing_calculator_shortcode');
```

### **3. Custom API Endpoints**

#### **Tools API**
```php
function siteoptz_register_tools_api() {
    register_rest_route('siteoptz/v1', '/tools', array(
        'methods' => 'GET',
        'callback' => 'siteoptz_get_tools',
        'permission_callback' => '__return_true'
    ));
    
    register_rest_route('siteoptz/v1', '/tools/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'siteoptz_get_tool',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'siteoptz_register_tools_api');

function siteoptz_get_tools($request) {
    $args = array(
        'post_type' => 'ai_tool',
        'posts_per_page' => $request->get_param('per_page') ?: 10,
        'meta_query' => array()
    );
    
    // Add filters
    if ($category = $request->get_param('category')) {
        $args['meta_query'][] = array(
            'key' => '_tool_category',
            'value' => $category
        );
    }
    
    $tools = get_posts($args);
    $data = array();
    
    foreach ($tools as $tool) {
        $data[] = array(
            'id' => $tool->ID,
            'name' => $tool->post_title,
            'description' => $tool->post_excerpt,
            'pricing' => get_post_meta($tool->ID, '_tool_pricing', true),
            'rating' => get_post_meta($tool->ID, '_tool_rating', true),
            'features' => explode(',', get_post_meta($tool->ID, '_tool_features', true))
        );
    }
    
    return new WP_REST_Response($data, 200);
}
```

---

## 🔧 **Performance Customization**

### **1. Caching Configuration**

#### **Object Cache**
```php
// In wp-config.php
define('WP_CACHE', true);
define('CACHE_EXPIRATION', 3600); // 1 hour

// In theme/functions.php
function siteoptz_cache_tools_data() {
    $cache_key = 'siteoptz_tools_data';
    $tools_data = wp_cache_get($cache_key);
    
    if (false === $tools_data) {
        // Generate tools data
        $tools_data = get_tools_from_database();
        wp_cache_set($cache_key, $tools_data, '', CACHE_EXPIRATION);
    }
    
    return $tools_data;
}
```

#### **Page Caching**
```php
function siteoptz_page_cache_headers() {
    if (!is_user_logged_in()) {
        header('Cache-Control: public, max-age=3600');
        header('Expires: ' . gmdate('D, d M Y H:i:s', time() + 3600) . ' GMT');
    }
}
add_action('template_redirect', 'siteoptz_page_cache_headers');
```

### **2. Asset Optimization**

#### **CSS/JS Minification**
```php
function siteoptz_optimize_assets() {
    if (!is_admin()) {
        // Remove unnecessary WordPress assets
        wp_dequeue_style('wp-block-library');
        wp_dequeue_style('wp-block-library-theme');
        
        // Minify and combine CSS
        wp_enqueue_style('siteoptz-combined', get_template_directory_uri() . '/css/combined.min.css');
        
        // Defer non-critical JS
        wp_enqueue_script('siteoptz-components', get_template_directory_uri() . '/js/components.min.js', array(), '1.0', true);
    }
}
add_action('wp_enqueue_scripts', 'siteoptz_optimize_assets');
```

#### **Image Optimization**
```php
function siteoptz_optimize_images($sizes) {
    // Add custom image sizes
    $sizes['tool-thumbnail'] = array(
        'width' => 300,
        'height' => 200,
        'crop' => true
    );
    
    $sizes['hero-image'] = array(
        'width' => 1200,
        'height' => 600,
        'crop' => true
    );
    
    return $sizes;
}
add_filter('intermediate_image_sizes_advanced', 'siteoptz_optimize_images');

// Enable WebP support
function siteoptz_webp_support($mimes) {
    $mimes['webp'] = 'image/webp';
    return $mimes;
}
add_filter('upload_mimes', 'siteoptz_webp_support');
```

---

## 📱 **Mobile Customization**

### **1. Responsive Breakpoints**
```css
/* Custom breakpoints */
:root {
    --breakpoint-sm: 640px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
    --breakpoint-xl: 1280px;
    --breakpoint-2xl: 1536px;
}

/* Mobile-first responsive design */
@media (max-width: 640px) {
    .comparison-table {
        display: block;
        overflow-x: auto;
    }
    
    .pricing-calculator {
        padding: var(--space-4);
    }
    
    .hero-title {
        font-size: var(--text-2xl);
    }
}
```

### **2. Touch Interactions**
```css
/* Improve touch targets */
.mobile-menu-toggle,
.search-toggle,
.cta-button {
    min-height: 44px;
    min-width: 44px;
}

/* Touch-friendly hover effects */
@media (hover: none) and (pointer: coarse) {
    .menu-link:hover {
        background: var(--gray-100);
    }
    
    .comparison-item:hover {
        transform: none;
    }
}
```

---

## 🔍 **SEO Customization**

### **1. Schema Markup**
```php
function siteoptz_custom_schema() {
    if (is_singular('ai_tool')) {
        global $post;
        
        $schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'SoftwareApplication',
            'name' => get_the_title(),
            'description' => get_the_excerpt(),
            'applicationCategory' => 'BusinessApplication',
            'operatingSystem' => 'Web',
            'aggregateRating' => array(
                '@type' => 'AggregateRating',
                'ratingValue' => get_post_meta($post->ID, '_tool_rating', true),
                'reviewCount' => get_post_meta($post->ID, '_review_count', true)
            )
        );
        
        echo '<script type="application/ld+json">' . json_encode($schema) . '</script>';
    }
}
add_action('wp_head', 'siteoptz_custom_schema');
```

### **2. Meta Tags**
```php
function siteoptz_custom_meta_tags() {
    if (is_singular('ai_tool')) {
        $tool_image = get_the_post_thumbnail_url(get_the_ID(), 'large');
        $tool_description = get_the_excerpt();
        ?>
        <meta property="og:type" content="article">
        <meta property="og:title" content="<?php the_title(); ?> - AI Tool Review">
        <meta property="og:description" content="<?php echo esc_attr($tool_description); ?>">
        <meta property="og:image" content="<?php echo esc_url($tool_image); ?>">
        <meta property="og:url" content="<?php the_permalink(); ?>">
        
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="<?php the_title(); ?> - AI Tool Review">
        <meta name="twitter:description" content="<?php echo esc_attr($tool_description); ?>">
        <meta name="twitter:image" content="<?php echo esc_url($tool_image); ?>">
        <?php
    }
}
add_action('wp_head', 'siteoptz_custom_meta_tags');
```

---

## 📚 **Documentation & Support**

### **Component Documentation**
- Each component includes inline documentation
- TypeScript definitions available for better IDE support
- Storybook documentation can be added for component demos

### **Testing Your Customizations**
```bash
# Test responsive design
npm run test:responsive

# Check accessibility
npm run test:a11y

# Validate markup
npm run validate:html

# Test performance
npm run test:performance
```

### **Getting Help**
- Check `docs/troubleshooting.md` for common issues
- Review component source code for advanced customization
- Use browser dev tools to inspect and modify styles
- Test changes in a staging environment first

---

**🎨 Your SiteOptz.ai package is now fully customizable!**

This guide covers all major customization options. Remember to:
- Test changes in a staging environment
- Keep backups of your customizations
- Follow WordPress coding standards
- Maintain accessibility compliance
- Monitor performance after changes