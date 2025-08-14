<?php
/**
 * SiteOptz.ai Premium Theme functions and definitions
 *
 * @package SiteOptz_Premium
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function siteoptz_premium_setup() {
    
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');
    
    // Let WordPress manage the document title
    add_theme_support('title-tag');
    
    // Enable support for Post Thumbnails on posts and pages
    add_theme_support('post-thumbnails');
    
    // Add support for custom logo
    add_theme_support('custom-logo', array(
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    
    // Force reset footer credit text 
    add_action('init', function() {
        set_theme_mod('footer_credit', 'Empowering businesses with AI tools comparison');
    });
    
    // Add support for custom header
    add_theme_support('custom-header', array(
        'default-image'      => '',
        'default-text-color' => '000',
        'width'              => 1920,
        'height'             => 1080,
        'flex-width'         => true,
        'flex-height'        => true,
    ));
    
    // Add support for custom background
    add_theme_support('custom-background', array(
        'default-color' => 'ffffff',
    ));
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => 'Primary Menu',
        'footer'  => 'Footer Menu',
    ));
    
    // Add support for HTML5 markup
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Add support for selective refresh for widgets
    add_theme_support('customize-selective-refresh-widgets');
    
    // Add support for Gutenberg wide and full alignments
    add_theme_support('align-wide');
    
    // Add support for responsive embeds
    add_theme_support('responsive-embeds');
    
    // Add support for editor color palette
    add_theme_support('editor-color-palette', array(
        array(
            'name'  => __('Primary', 'siteoptz-premium'),
            'slug'  => 'primary',
            'color' => '#3b82f6',
        ),
        array(
            'name'  => __('Secondary', 'siteoptz-premium'),
            'slug'  => 'secondary',
            'color' => '#10b981',
        ),
        array(
            'name'  => __('Accent', 'siteoptz-premium'),
            'slug'  => 'accent',
            'color' => '#f59e0b',
        ),
        array(
            'name'  => __('Dark Gray', 'siteoptz-premium'),
            'slug'  => 'dark-gray',
            'color' => '#374151',
        ),
        array(
            'name'  => __('Light Gray', 'siteoptz-premium'),
            'slug'  => 'light-gray',
            'color' => '#f3f4f6',
        ),
    ));
    
    // Register navigation menus
    register_nav_menus(array(
        'primary'        => __('Primary Menu', 'siteoptz-premium'),
        'footer-tools'   => __('Footer Tools Menu', 'siteoptz-premium'),
        'footer-resources' => __('Footer Resources Menu', 'siteoptz-premium'),
        'footer-company' => __('Footer Company Menu', 'siteoptz-premium'),
    ));
    
    // Set content width
    $GLOBALS['content_width'] = 1200;
}
add_action('after_setup_theme', 'siteoptz_premium_setup');

/**
 * Register AI Tools Custom Post Type
 */
function siteoptz_register_ai_tools() {
    $labels = array(
        'name'               => 'AI Tools',
        'singular_name'      => 'AI Tool',
        'menu_name'          => 'AI Tools',
        'name_admin_bar'     => 'AI Tool',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New AI Tool',
        'new_item'           => 'New AI Tool',
        'edit_item'          => 'Edit AI Tool',
        'view_item'          => 'View AI Tool',
        'all_items'          => 'All AI Tools',
        'search_items'       => 'Search AI Tools',
        'parent_item_colon'  => 'Parent AI Tools:',
        'not_found'          => 'No AI tools found.',
        'not_found_in_trash' => 'No AI tools found in Trash.'
    );

    $args = array(
        'labels'             => $labels,
        'description'        => 'AI Tools for comparison',
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'ai-tools'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'menu_icon'          => 'dashicons-admin-tools',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'show_in_rest'       => true,
    );

    register_post_type('ai_tool', $args);
    
    // Register AI Tool Categories
    register_taxonomy('ai_tool_category', 'ai_tool', array(
        'labels' => array(
            'name' => 'AI Categories',
            'singular_name' => 'AI Category',
        ),
        'public' => true,
        'hierarchical' => true,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'ai-category'),
    ));
}
add_action('init', 'siteoptz_register_ai_tools');
add_action('init', 'siteoptz_create_categories');

/**
 * Create WordPress categories for AI tools
 */
function siteoptz_create_categories() {
    // Don't run on every load - only when needed
    if (get_option('siteoptz_categories_created')) {
        return;
    }
    
    // Create main AI categories as WordPress categories
    $categories = array(
        'text-generation' => array(
            'name' => 'Text Generation',
            'description' => 'AI tools for writing, content creation, and text generation.'
        ),
        'image-creation' => array(
            'name' => 'Image Creation', 
            'description' => 'AI tools for image generation, editing, and visual content creation.'
        ),
        'code-generation' => array(
            'name' => 'Code Generation',
            'description' => 'AI tools for coding assistance, code generation, and development.'
        ),
        'voice-audio' => array(
            'name' => 'Voice & Audio',
            'description' => 'AI tools for voice synthesis, audio processing, and speech recognition.'
        ),
        'business-intelligence' => array(
            'name' => 'Business Intelligence',
            'description' => 'AI tools for data analysis, business insights, and reporting.'
        ),
        'automation' => array(
            'name' => 'Automation',
            'description' => 'AI tools for workflow automation and process optimization.'
        )
    );
    
    foreach ($categories as $slug => $cat_data) {
        // Check if category already exists
        $existing_cat = get_category_by_slug($slug);
        
        if (!$existing_cat) {
            $cat_id = wp_insert_category(array(
                'cat_name' => $cat_data['name'],
                'category_nicename' => $slug,
                'category_description' => $cat_data['description'],
            ));
            
            if (!is_wp_error($cat_id)) {
                // Create sample posts for each category
                siteoptz_create_sample_posts($cat_id, $slug, $cat_data['name']);
            }
        }
    }
    
    // Mark categories as created
    update_option('siteoptz_categories_created', true);
}

/**
 * Create sample posts for categories
 */
function siteoptz_create_sample_posts($category_id, $category_slug, $category_name) {
    $sample_posts = array(
        'text-generation' => array(
            array(
                'title' => 'Best AI Writing Tools for Content Creation in 2024',
                'content' => 'Discover the top AI writing tools that are revolutionizing content creation. From ChatGPT to Jasper AI, we compare features, pricing, and use cases to help you choose the perfect writing assistant for your needs.'
            ),
            array(
                'title' => 'How AI Writing Tools Are Transforming Marketing',
                'content' => 'Explore how AI writing tools are changing the marketing landscape. Learn about ROI improvements, productivity gains, and best practices for implementing AI writing solutions in your marketing strategy.'
            )
        ),
        'image-creation' => array(
            array(
                'title' => 'Midjourney vs DALL-E: Complete Comparison Guide', 
                'content' => 'Compare the two leading AI image generators side by side. We analyze features, pricing, image quality, and use cases to help you decide between Midjourney and DALL-E for your creative projects.'
            ),
            array(
                'title' => 'AI Image Generation for Business: A Complete Guide',
                'content' => 'Learn how businesses are using AI image generation tools to create marketing materials, product mockups, and visual content. Includes tips, best practices, and ROI considerations.'
            )
        ),
        'code-generation' => array(
            array(
                'title' => 'GitHub Copilot vs Competitors: Which AI Coding Assistant Wins?',
                'content' => 'In-depth comparison of GitHub Copilot, Tabnine, and CodeWhisperer. We test features, accuracy, and developer productivity to determine the best AI coding assistant for different programming languages.'
            ),
            array(
                'title' => 'How AI Code Generation is Changing Software Development',
                'content' => 'Explore the impact of AI coding assistants on software development. Learn about productivity improvements, code quality considerations, and how to integrate AI tools into your development workflow.'
            )
        )
    );
    
    if (isset($sample_posts[$category_slug])) {
        foreach ($sample_posts[$category_slug] as $post_data) {
            $post_id = wp_insert_post(array(
                'post_title' => $post_data['title'],
                'post_content' => $post_data['content'],
                'post_status' => 'publish',
                'post_type' => 'post',
                'post_category' => array($category_id),
                'post_author' => 1
            ));
        }
    }
}

/**
 * Add AI Tool Meta Boxes
 */
function siteoptz_add_ai_tool_meta_boxes() {
    add_meta_box(
        'ai_tool_details',
        'AI Tool Details',
        'siteoptz_ai_tool_details_callback',
        'ai_tool',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'siteoptz_add_ai_tool_meta_boxes');

function siteoptz_ai_tool_details_callback($post) {
    wp_nonce_field('siteoptz_save_ai_tool_details', 'siteoptz_ai_tool_nonce');
    
    $price = get_post_meta($post->ID, '_ai_tool_price', true);
    $website = get_post_meta($post->ID, '_ai_tool_website', true);
    $rating = get_post_meta($post->ID, '_ai_tool_rating', true);
    $features = get_post_meta($post->ID, '_ai_tool_features', true);
    $pros = get_post_meta($post->ID, '_ai_tool_pros', true);
    $cons = get_post_meta($post->ID, '_ai_tool_cons', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="ai_tool_price">Price</label></th>';
    echo '<td><input type="text" id="ai_tool_price" name="ai_tool_price" value="' . esc_attr($price) . '" placeholder="e.g., Free, $9/mo, $99/year" /></td></tr>';
    
    echo '<tr><th><label for="ai_tool_website">Website URL</label></th>';
    echo '<td><input type="url" id="ai_tool_website" name="ai_tool_website" value="' . esc_attr($website) . '" /></td></tr>';
    
    echo '<tr><th><label for="ai_tool_rating">Rating (1-5)</label></th>';
    echo '<td><input type="number" id="ai_tool_rating" name="ai_tool_rating" value="' . esc_attr($rating) . '" min="1" max="5" step="0.1" /></td></tr>';
    
    echo '<tr><th><label for="ai_tool_features">Key Features</label></th>';
    echo '<td><textarea id="ai_tool_features" name="ai_tool_features" rows="3" cols="50">' . esc_textarea($features) . '</textarea></td></tr>';
    
    echo '<tr><th><label for="ai_tool_pros">Pros</label></th>';
    echo '<td><textarea id="ai_tool_pros" name="ai_tool_pros" rows="3" cols="50">' . esc_textarea($pros) . '</textarea></td></tr>';
    
    echo '<tr><th><label for="ai_tool_cons">Cons</label></th>';
    echo '<td><textarea id="ai_tool_cons" name="ai_tool_cons" rows="3" cols="50">' . esc_textarea($cons) . '</textarea></td></tr>';
    echo '</table>';
}

function siteoptz_save_ai_tool_details($post_id) {
    if (!isset($_POST['siteoptz_ai_tool_nonce']) || !wp_verify_nonce($_POST['siteoptz_ai_tool_nonce'], 'siteoptz_save_ai_tool_details')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = array('ai_tool_price', 'ai_tool_website', 'ai_tool_rating', 'ai_tool_features', 'ai_tool_pros', 'ai_tool_cons');
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post', 'siteoptz_save_ai_tool_details');

/**
 * Create Sample AI Tools Data
 */
function siteoptz_create_sample_data() {
    // Only run once
    if (get_option('siteoptz_sample_data_created')) {
        return;
    }
    
    $sample_tools = array(
        array(
            'title' => 'ChatGPT',
            'content' => 'ChatGPT is an AI-powered conversational agent that can help with writing, coding, analysis, and creative tasks.',
            'category' => 'Chatbots',
            'price' => 'Free / $20/mo',
            'website' => 'https://chat.openai.com',
            'rating' => '4.8',
            'features' => 'Natural conversation, Code generation, Writing assistance, Multiple languages',
            'pros' => 'Highly capable, Versatile, Good free tier, Regular updates',
            'cons' => 'Can be verbose, Limited real-time data, Rate limits on free tier'
        ),
        array(
            'title' => 'Midjourney',
            'content' => 'Midjourney is an AI image generation tool that creates stunning artwork from text descriptions.',
            'category' => 'Image Generation',
            'price' => '$10-60/mo',
            'website' => 'https://midjourney.com',
            'rating' => '4.7',
            'features' => 'Text-to-image, High quality output, Style variations, Community gallery',
            'pros' => 'Exceptional quality, Great community, Regular updates, Unique artistic style',
            'cons' => 'Discord-only interface, No free tier, Learning curve, Limited commercial rights'
        ),
        array(
            'title' => 'GitHub Copilot',
            'content' => 'GitHub Copilot is an AI programming assistant that suggests code and entire functions in real-time.',
            'category' => 'Code Assistant',
            'price' => '$10/mo',
            'website' => 'https://github.com/features/copilot',
            'rating' => '4.6',
            'features' => 'Code completion, Multiple languages, IDE integration, Context awareness',
            'pros' => 'Excellent code suggestions, Multiple IDE support, Time-saving, Learning from context',
            'cons' => 'Requires subscription, Occasional incorrect suggestions, Privacy concerns'
        ),
        array(
            'title' => 'Jasper AI',
            'content' => 'Jasper AI is a comprehensive writing assistant for marketing copy, blog posts, and creative content.',
            'category' => 'Writing',
            'price' => '$39-125/mo',
            'website' => 'https://jasper.ai',
            'rating' => '4.5',
            'features' => 'Marketing copy, Blog writing, Templates, Brand voice, SEO optimization',
            'pros' => 'Professional quality, Many templates, Brand consistency, SEO features',
            'cons' => 'Expensive, Learning curve, Credit limits, Generic output sometimes'
        ),
        array(
            'title' => 'Runway ML',
            'content' => 'Runway ML provides AI-powered video editing and generation tools for creators and filmmakers.',
            'category' => 'Video Creation',
            'price' => 'Free / $12-76/mo',
            'website' => 'https://runwayml.com',
            'rating' => '4.4',
            'features' => 'Video generation, AI editing, Green screen, Motion tracking, Style transfer',
            'pros' => 'Innovative features, Good free tier, Professional tools, Regular updates',
            'cons' => 'Resource intensive, Learning curve, Limited free credits, Rendering time'
        ),
        array(
            'title' => 'DataRobot',
            'content' => 'DataRobot is an enterprise AI platform for automated machine learning and data analysis.',
            'category' => 'Data Analysis',
            'price' => 'Enterprise pricing',
            'website' => 'https://datarobot.com',
            'rating' => '4.3',
            'features' => 'AutoML, Model deployment, Data prep, MLOps, Enterprise security',
            'pros' => 'Enterprise-grade, Comprehensive platform, Strong support, Automated workflows',
            'cons' => 'Very expensive, Complex setup, Overkill for small teams, Steep learning curve'
        )
    );
    
    foreach ($sample_tools as $tool_data) {
        // Create the post
        $post_id = wp_insert_post(array(
            'post_title' => $tool_data['title'],
            'post_content' => $tool_data['content'],
            'post_status' => 'publish',
            'post_type' => 'ai_tool',
            'post_excerpt' => wp_trim_words($tool_data['content'], 20)
        ));
        
        if ($post_id && !is_wp_error($post_id)) {
            // Add meta data
            update_post_meta($post_id, '_ai_tool_price', $tool_data['price']);
            update_post_meta($post_id, '_ai_tool_website', $tool_data['website']);
            update_post_meta($post_id, '_ai_tool_rating', $tool_data['rating']);
            update_post_meta($post_id, '_ai_tool_features', $tool_data['features']);
            update_post_meta($post_id, '_ai_tool_pros', $tool_data['pros']);
            update_post_meta($post_id, '_ai_tool_cons', $tool_data['cons']);
            
            // Assign category
            $term = get_term_by('name', $tool_data['category'], 'ai_tool_category');
            if (!$term) {
                $term = wp_insert_term($tool_data['category'], 'ai_tool_category');
                if (!is_wp_error($term)) {
                    $term_id = $term['term_id'];
                } else {
                    continue;
                }
            } else {
                $term_id = $term->term_id;
            }
            
            wp_set_post_terms($post_id, array($term_id), 'ai_tool_category');
        }
    }
    
    update_option('siteoptz_sample_data_created', true);
}
add_action('wp_loaded', 'siteoptz_create_sample_data');

/**
 * AI Tools Comparison Table Shortcode
 */
function siteoptz_comparison_table_shortcode($atts) {
    $atts = shortcode_atts(array(
        'tools' => '',
        'features' => 'price,rating,pros,cons'
    ), $atts);
    
    if (empty($atts['tools'])) {
        return '<p>Please specify AI tools to compare using the tools parameter.</p>';
    }
    
    $tool_names = array_map('trim', explode(',', $atts['tools']));
    $features = array_map('trim', explode(',', $atts['features']));
    
    $tools = array();
    foreach ($tool_names as $tool_name) {
        $tool_post = get_page_by_title($tool_name, OBJECT, 'ai_tool');
        if ($tool_post) {
            $tools[] = array(
                'id' => $tool_post->ID,
                'title' => $tool_post->post_title,
                'price' => get_post_meta($tool_post->ID, '_ai_tool_price', true),
                'rating' => get_post_meta($tool_post->ID, '_ai_tool_rating', true),
                'website' => get_post_meta($tool_post->ID, '_ai_tool_website', true),
                'features' => get_post_meta($tool_post->ID, '_ai_tool_features', true),
                'pros' => get_post_meta($tool_post->ID, '_ai_tool_pros', true),
                'cons' => get_post_meta($tool_post->ID, '_ai_tool_cons', true),
            );
        }
    }
    
    if (empty($tools)) {
        return '<p>No AI tools found with the specified names.</p>';
    }
    
    ob_start();
    ?>
    <div class="ai-comparison-table">
        <div class="comparison-header">
            <h3>AI Tools Comparison</h3>
            <p>Compare features, pricing, and ratings side by side</p>
        </div>
        
        <div class="comparison-grid">
            <div class="comparison-row header-row">
                <div class="comparison-cell feature-label">Tool</div>
                <?php foreach ($tools as $tool): ?>
                    <div class="comparison-cell tool-header">
                        <h4><?php echo esc_html($tool['title']); ?></h4>
                        <?php if ($tool['website']): ?>
                            <a href="<?php echo esc_url($tool['website']); ?>" target="_blank" class="tool-link">Visit Site</a>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
            
            <?php if (in_array('price', $features)): ?>
                <div class="comparison-row">
                    <div class="comparison-cell feature-label">Price</div>
                    <?php foreach ($tools as $tool): ?>
                        <div class="comparison-cell">
                            <span class="price-tag"><?php echo esc_html($tool['price'] ?: 'N/A'); ?></span>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            
            <?php if (in_array('rating', $features)): ?>
                <div class="comparison-row">
                    <div class="comparison-cell feature-label">Rating</div>
                    <?php foreach ($tools as $tool): ?>
                        <div class="comparison-cell">
                            <div class="rating-display">
                                <?php 
                                $rating = floatval($tool['rating']);
                                for ($i = 1; $i <= 5; $i++) {
                                    echo $i <= $rating ? '★' : '☆';
                                }
                                echo ' ' . $rating;
                                ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            
            <?php if (in_array('pros', $features)): ?>
                <div class="comparison-row">
                    <div class="comparison-cell feature-label">Pros</div>
                    <?php foreach ($tools as $tool): ?>
                        <div class="comparison-cell">
                            <ul class="pros-list">
                                <?php 
                                $pros = array_map('trim', explode(',', $tool['pros']));
                                foreach ($pros as $pro): 
                                    if (!empty($pro)):
                                ?>
                                    <li>✓ <?php echo esc_html($pro); ?></li>
                                <?php 
                                    endif;
                                endforeach; 
                                ?>
                            </ul>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            
            <?php if (in_array('cons', $features)): ?>
                <div class="comparison-row">
                    <div class="comparison-cell feature-label">Cons</div>
                    <?php foreach ($tools as $tool): ?>
                        <div class="comparison-cell">
                            <ul class="cons-list">
                                <?php 
                                $cons = array_map('trim', explode(',', $tool['cons']));
                                foreach ($cons as $con): 
                                    if (!empty($con)):
                                ?>
                                    <li>✗ <?php echo esc_html($con); ?></li>
                                <?php 
                                    endif;
                                endforeach; 
                                ?>
                            </ul>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
    
    <style>
    .ai-comparison-table {
        margin: 30px 0;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        overflow: hidden;
    }
    
    .comparison-header {
        padding: 25px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-align: center;
    }
    
    .comparison-header h3 {
        margin: 0 0 5px 0;
        font-size: 1.5rem;
    }
    
    .comparison-header p {
        margin: 0;
        opacity: 0.9;
    }
    
    .comparison-grid {
        display: flex;
        flex-direction: column;
    }
    
    .comparison-row {
        display: flex;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .comparison-row:last-child {
        border-bottom: none;
    }
    
    .header-row {
        background: #f8fafc;
    }
    
    .comparison-cell {
        flex: 1;
        padding: 20px;
        border-right: 1px solid #e2e8f0;
    }
    
    .comparison-cell:last-child {
        border-right: none;
    }
    
    .feature-label {
        background: #f1f5f9;
        font-weight: 600;
        color: #475569;
        flex: 0 0 150px;
    }
    
    .tool-header h4 {
        margin: 0 0 10px 0;
        color: #1a202c;
    }
    
    .tool-link {
        background: #667eea;
        color: white;
        padding: 5px 15px;
        border-radius: 5px;
        text-decoration: none;
        font-size: 0.9rem;
    }
    
    .tool-link:hover {
        background: #5a67d8;
    }
    
    .price-tag {
        background: #10b981;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-weight: 600;
    }
    
    .rating-display {
        color: #fbbf24;
        font-size: 1.1rem;
    }
    
    .pros-list li {
        color: #059669;
        margin: 5px 0;
    }
    
    .cons-list li {
        color: #dc2626;
        margin: 5px 0;
    }
    
    @media (max-width: 768px) {
        .comparison-grid {
            display: block;
        }
        
        .comparison-row {
            flex-direction: column;
        }
        
        .feature-label {
            flex: none;
            background: #667eea;
            color: white;
            text-align: center;
        }
    }
    </style>
    <?php
    return ob_get_clean();
}
add_shortcode('ai_comparison', 'siteoptz_comparison_table_shortcode');

/**
 * AI Tool Calculator Shortcode
 */
function siteoptz_calculator_shortcode($atts) {
    $atts = shortcode_atts(array(
        'type' => 'roi', // roi, cost, savings
        'title' => 'AI Tool ROI Calculator'
    ), $atts);
    
    ob_start();
    ?>
    <div class="ai-calculator" id="ai-calculator-<?php echo uniqid(); ?>">
        <div class="calculator-header">
            <h3><?php echo esc_html($atts['title']); ?></h3>
            <p>Calculate potential savings and ROI from AI tools</p>
        </div>
        
        <div class="calculator-form">
            <div class="input-group">
                <label for="current-hours">Current hours spent on task (per week)</label>
                <input type="number" id="current-hours" min="1" max="168" value="10">
            </div>
            
            <div class="input-group">
                <label for="hourly-rate">Your hourly rate ($)</label>
                <input type="number" id="hourly-rate" min="1" value="50">
            </div>
            
            <div class="input-group">
                <label for="efficiency-gain">Expected efficiency gain (%)</label>
                <input type="range" id="efficiency-gain" min="10" max="90" value="50">
                <span class="range-value">50%</span>
            </div>
            
            <div class="input-group">
                <label for="tool-cost">Monthly tool cost ($)</label>
                <input type="number" id="tool-cost" min="0" value="20">
            </div>
            
            <button type="button" class="calculate-btn" onclick="calculateROI(this)">Calculate ROI</button>
        </div>
        
        <div class="calculator-results" style="display: none;">
            <div class="result-cards">
                <div class="result-card">
                    <h4>Weekly Savings</h4>
                    <span class="result-value" id="weekly-savings">$0</span>
                </div>
                <div class="result-card">
                    <h4>Monthly Savings</h4>
                    <span class="result-value" id="monthly-savings">$0</span>
                </div>
                <div class="result-card">
                    <h4>Annual ROI</h4>
                    <span class="result-value" id="annual-roi">0%</span>
                </div>
                <div class="result-card">
                    <h4>Payback Period</h4>
                    <span class="result-value" id="payback-period">0 days</span>
                </div>
            </div>
            
            <div class="savings-chart">
                <h4>12-Month Projection</h4>
                <div class="chart-bars" id="savings-chart"></div>
            </div>
        </div>
    </div>
    
    <style>
    .ai-calculator {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        margin: 30px 0;
        overflow: hidden;
    }
    
    .calculator-header {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 25px;
        text-align: center;
    }
    
    .calculator-header h3 {
        margin: 0 0 5px 0;
        font-size: 1.5rem;
    }
    
    .calculator-header p {
        margin: 0;
        opacity: 0.9;
    }
    
    .calculator-form {
        padding: 30px;
    }
    
    .input-group {
        margin-bottom: 20px;
    }
    
    .input-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #374151;
    }
    
    .input-group input {
        width: 100%;
        padding: 12px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
    }
    
    .input-group input:focus {
        border-color: #10b981;
        outline: none;
    }
    
    .range-value {
        margin-left: 10px;
        font-weight: 600;
        color: #10b981;
    }
    
    .calculate-btn {
        width: 100%;
        background: #10b981;
        color: white;
        border: none;
        padding: 15px;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s;
    }
    
    .calculate-btn:hover {
        background: #059669;
    }
    
    .calculator-results {
        padding: 30px;
        background: #f9fafb;
        border-top: 1px solid #e5e7eb;
    }
    
    .result-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
    }
    
    .result-card {
        background: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    
    .result-card h4 {
        margin: 0 0 10px 0;
        color: #6b7280;
        font-size: 0.9rem;
    }
    
    .result-value {
        font-size: 2rem;
        font-weight: 800;
        color: #10b981;
    }
    
    .savings-chart {
        background: white;
        padding: 20px;
        border-radius: 8px;
    }
    
    .chart-bars {
        display: flex;
        align-items: end;
        height: 200px;
        gap: 5px;
        margin-top: 15px;
    }
    
    .chart-bar {
        flex: 1;
        background: linear-gradient(to top, #10b981, #34d399);
        border-radius: 3px;
        min-height: 20px;
        position: relative;
    }
    </style>
    
    <script>
    function calculateROI(button) {
        const calculator = button.closest('.ai-calculator');
        const currentHours = parseFloat(calculator.querySelector('#current-hours').value);
        const hourlyRate = parseFloat(calculator.querySelector('#hourly-rate').value);
        const efficiencyGain = parseFloat(calculator.querySelector('#efficiency-gain').value) / 100;
        const toolCost = parseFloat(calculator.querySelector('#tool-cost').value);
        
        // Update range display
        calculator.querySelector('.range-value').textContent = Math.round(efficiencyGain * 100) + '%';
        
        // Calculate savings
        const hoursSaved = currentHours * efficiencyGain;
        const weeklySavings = hoursSaved * hourlyRate;
        const monthlySavings = weeklySavings * 4.33 - toolCost;
        const annualSavings = monthlySavings * 12;
        const annualCost = toolCost * 12;
        const roi = ((annualSavings / annualCost) * 100);
        const paybackPeriod = Math.ceil((toolCost / (weeklySavings / 7)));
        
        // Update results
        calculator.querySelector('#weekly-savings').textContent = '$' + Math.round(weeklySavings);
        calculator.querySelector('#monthly-savings').textContent = '$' + Math.round(monthlySavings);
        calculator.querySelector('#annual-roi').textContent = Math.round(roi) + '%';
        calculator.querySelector('#payback-period').textContent = paybackPeriod + ' days';
        
        // Show results
        calculator.querySelector('.calculator-results').style.display = 'block';
        
        // Create chart
        createSavingsChart(calculator, monthlySavings);
    }
    
    function createSavingsChart(calculator, monthlySavings) {
        const chartContainer = calculator.querySelector('#savings-chart');
        chartContainer.innerHTML = '';
        
        for (let i = 1; i <= 12; i++) {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            const height = Math.max(20, (monthlySavings * i / 12) / (monthlySavings * 12) * 180);
            bar.style.height = height + 'px';
            chartContainer.appendChild(bar);
        }
    }
    
    // Range input live update
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('#efficiency-gain').forEach(range => {
            range.addEventListener('input', function() {
                this.parentNode.querySelector('.range-value').textContent = this.value + '%';
            });
        });
    });
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('ai_calculator', 'siteoptz_calculator_shortcode');

/**
 * FAQ Section Shortcode
 */
function siteoptz_faq_shortcode($atts) {
    $atts = shortcode_atts(array(
        'title' => 'Frequently Asked Questions',
        'category' => ''
    ), $atts);
    
    // Default FAQ data
    $faqs = array(
        array(
            'question' => 'What are AI tools and how can they help my business?',
            'answer' => 'AI tools are software applications that use artificial intelligence to automate tasks, analyze data, and enhance productivity. They can help businesses save time, reduce costs, improve accuracy, and scale operations efficiently.'
        ),
        array(
            'question' => 'How do I choose the right AI tool for my needs?',
            'answer' => 'Consider your specific use case, budget, integration requirements, and team size. Look at features, pricing, user reviews, and trial options. Our comparison tables can help you evaluate different tools side by side.'
        ),
        array(
            'question' => 'Are AI tools expensive?',
            'answer' => 'AI tool pricing varies widely. Many offer free tiers or trials, with paid plans ranging from $10-100+ per month. The ROI often justifies the cost through time savings and increased productivity.'
        ),
        array(
            'question' => 'Do I need technical skills to use AI tools?',
            'answer' => 'Most modern AI tools are designed for non-technical users with intuitive interfaces. However, some advanced features may require basic technical knowledge or training.'
        ),
        array(
            'question' => 'How secure are AI tools with my data?',
            'answer' => 'Reputable AI tools implement strong security measures including encryption, compliance certifications, and privacy controls. Always review privacy policies and security features before sharing sensitive data.'
        ),
        array(
            'question' => 'Can AI tools integrate with my existing software?',
            'answer' => 'Many AI tools offer integrations with popular software through APIs, webhooks, or built-in connectors. Check integration capabilities during your evaluation process.'
        ),
        array(
            'question' => 'What is the learning curve for AI tools?',
            'answer' => 'Learning curves vary by tool complexity. Simple tools can be mastered in hours, while advanced platforms may take weeks. Most providers offer tutorials, documentation, and support to help users get started.'
        ),
        array(
            'question' => 'How do I measure ROI from AI tools?',
            'answer' => 'Track metrics like time saved, cost reduction, productivity gains, and quality improvements. Use our ROI calculator to estimate potential returns before investing in AI tools.'
        )
    );
    
    ob_start();
    ?>
    <div class="faq-section">
        <div class="faq-header">
            <h3><?php echo esc_html($atts['title']); ?></h3>
            <p>Get answers to common questions about AI tools</p>
        </div>
        
        <div class="faq-container">
            <?php foreach ($faqs as $index => $faq): ?>
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h4><?php echo esc_html($faq['question']); ?></h4>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p><?php echo esc_html($faq['answer']); ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    
    <style>
    .faq-section {
        margin: 30px 0;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        overflow: hidden;
    }
    
    .faq-header {
        background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
        color: white;
        padding: 25px;
        text-align: center;
    }
    
    .faq-header h3 {
        margin: 0 0 5px 0;
        font-size: 1.5rem;
    }
    
    .faq-header p {
        margin: 0;
        opacity: 0.9;
    }
    
    .faq-container {
        padding: 20px;
    }
    
    .faq-item {
        border-bottom: 1px solid #e5e7eb;
        margin-bottom: 15px;
    }
    
    .faq-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
    
    .faq-question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        cursor: pointer;
        transition: color 0.3s;
    }
    
    .faq-question:hover {
        color: #7c3aed;
    }
    
    .faq-question h4 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    .faq-toggle {
        font-size: 1.5rem;
        font-weight: 300;
        color: #7c3aed;
        transition: transform 0.3s;
    }
    
    .faq-toggle.active {
        transform: rotate(45deg);
    }
    
    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
    }
    
    .faq-answer.active {
        max-height: 200px;
        padding-bottom: 20px;
    }
    
    .faq-answer p {
        margin: 0;
        color: #6b7280;
        line-height: 1.6;
    }
    </style>
    
    <script>
    function toggleFAQ(element) {
        const toggle = element.querySelector('.faq-toggle');
        const answer = element.nextElementSibling;
        const isActive = answer.classList.contains('active');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-answer.active').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.faq-toggle.active').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current FAQ
        if (!isActive) {
            answer.classList.add('active');
            toggle.classList.add('active');
        }
    }
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('ai_faq', 'siteoptz_faq_shortcode');

/**
 * AI Tools Grid Shortcode
 */
function siteoptz_tools_grid_shortcode($atts) {
    $atts = shortcode_atts(array(
        'category' => '',
        'count' => 6,
        'columns' => 3,
        'show_rating' => 'true',
        'show_price' => 'true'
    ), $atts);
    
    $args = array(
        'post_type' => 'ai_tool',
        'posts_per_page' => intval($atts['count']),
        'post_status' => 'publish'
    );
    
    if (!empty($atts['category'])) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'ai_tool_category',
                'field'    => 'slug',
                'terms'    => $atts['category']
            )
        );
    }
    
    $tools_query = new WP_Query($args);
    
    if (!$tools_query->have_posts()) {
        return '<p>No AI tools found.</p>';
    }
    
    ob_start();
    ?>
    <div class="tools-grid-container">
        <div class="tools-grid" style="grid-template-columns: repeat(<?php echo intval($atts['columns']); ?>, 1fr);">
            <?php while ($tools_query->have_posts()): $tools_query->the_post(); ?>
                <div class="tool-card">
                    <?php if (has_post_thumbnail()): ?>
                        <div class="tool-image">
                            <?php the_post_thumbnail('medium'); ?>
                        </div>
                    <?php else: ?>
                        <div class="tool-placeholder"></div>
                    <?php endif; ?>
                    
                    <div class="tool-content">
                        <h3 class="tool-title">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h3>
                        <div class="tool-excerpt">
                            <?php echo wp_trim_words(get_the_excerpt(), 15); ?>
                        </div>
                        
                        <div class="tool-meta">
                            <?php if ($atts['show_price'] === 'true'): ?>
                                <span class="tool-price">
                                    <?php echo esc_html(get_post_meta(get_the_ID(), '_ai_tool_price', true) ?: 'Free'); ?>
                                </span>
                            <?php endif; ?>
                            
                            <?php if ($atts['show_rating'] === 'true'): ?>
                                <span class="tool-rating">
                                    <?php 
                                    $rating = get_post_meta(get_the_ID(), '_ai_tool_rating', true);
                                    if ($rating) {
                                        for ($i = 1; $i <= 5; $i++) {
                                            echo $i <= floatval($rating) ? '★' : '☆';
                                        }
                                        echo ' ' . $rating;
                                    } else {
                                        echo '★★★★☆ 4.5';
                                    }
                                    ?>
                                </span>
                            <?php endif; ?>
                        </div>
                        
                        <a href="<?php the_permalink(); ?>" class="tool-cta">Learn More →</a>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
    </div>
    
    <style>
    .tools-grid-container {
        margin: 30px 0;
    }
    
    .tools-grid {
        display: grid;
        gap: 30px;
    }
    
    .tool-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        transition: all 0.3s;
    }
    
    .tool-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }
    
    .tool-image img,
    .tool-placeholder {
        width: 100%;
        height: 200px;
        object-fit: cover;
        background: linear-gradient(135deg, #667eea, #764ba2);
    }
    
    .tool-content {
        padding: 25px;
    }
    
    .tool-title {
        font-size: 1.25rem;
        margin-bottom: 10px;
    }
    
    .tool-title a {
        color: #1a202c;
        text-decoration: none;
    }
    
    .tool-title a:hover {
        color: #667eea;
    }
    
    .tool-excerpt {
        color: #718096;
        margin-bottom: 15px;
        line-height: 1.6;
    }
    
    .tool-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding-top: 15px;
        border-top: 1px solid #e2e8f0;
    }
    
    .tool-price {
        font-weight: 600;
        color: #667eea;
    }
    
    .tool-rating {
        color: #ffd700;
    }
    
    .tool-cta {
        display: inline-block;
        background: #667eea;
        color: white;
        padding: 10px 20px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        transition: background 0.3s;
    }
    
    .tool-cta:hover {
        background: #5a67d8;
    }
    
    @media (max-width: 768px) {
        .tools-grid {
            grid-template-columns: 1fr !important;
        }
    }
    </style>
    <?php
    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('ai_tools_grid', 'siteoptz_tools_grid_shortcode');

/**
 * Enqueue scripts and styles
 */
function siteoptz_premium_scripts() {
    
    // Main theme stylesheet
    wp_enqueue_style('siteoptz-premium-style', get_template_directory_uri() . '/style-premium.css', array(), '1.0.0');
    
    // Google Fonts
    wp_enqueue_style('siteoptz-premium-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap', array(), null);
    
    // Font Awesome
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0');
    
    // Main theme JavaScript
    wp_enqueue_script('siteoptz-premium-script', get_template_directory_uri() . '/js/premium-theme.js', array('jquery'), '1.0.0', true);
    
    // Localize script for AJAX
    wp_localize_script('siteoptz-premium-script', 'siteoptz_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('siteoptz_nonce'),
    ));
    
    // Comment reply script
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'siteoptz_premium_scripts');

/**
 * Register widget areas
 */
function siteoptz_premium_widgets_init() {
    
    // Main sidebar
    register_sidebar(array(
        'name'          => __('Main Sidebar', 'siteoptz-premium'),
        'id'            => 'sidebar-main',
        'description'   => __('Add widgets here to appear in your sidebar.', 'siteoptz-premium'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
    
    // Footer widget areas
    for ($i = 1; $i <= 4; $i++) {
        register_sidebar(array(
            'name'          => sprintf(__('Footer Column %d', 'siteoptz-premium'), $i),
            'id'            => 'footer-' . $i,
            'description'   => sprintf(__('Add widgets here to appear in footer column %d.', 'siteoptz-premium'), $i),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '<h4 class="widget-title">',
            'after_title'   => '</h4>',
        ));
    }
}
add_action('widgets_init', 'siteoptz_premium_widgets_init');

/**
 * Customizer additions
 */
function siteoptz_premium_customize_register($wp_customize) {
    
    // Hero Section
    $wp_customize->add_section('hero_section', array(
        'title'    => __('Hero Section', 'siteoptz-premium'),
        'priority' => 30,
    ));
    
    // Hero Badge Text
    $wp_customize->add_setting('hero_badge_text', array(
        'default'           => 'Trusted by 50,000+ Users',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hero_badge_text', array(
        'label'   => __('Hero Badge Text', 'siteoptz-premium'),
        'section' => 'hero_section',
        'type'    => 'text',
    ));
    
    // Hero Title
    $wp_customize->add_setting('hero_title', array(
        'default'           => 'Find Your Perfect<br><span class="gradient-text">AI Tool</span>',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hero_title', array(
        'label'   => __('Hero Title', 'siteoptz-premium'),
        'section' => 'hero_section',
        'type'    => 'textarea',
    ));
    
    // Hero Description
    $wp_customize->add_setting('hero_description', array(
        'default'           => 'Compare 1000+ AI tools with data-driven insights, real-time pricing, and personalized recommendations. Make informed decisions for your business.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    $wp_customize->add_control('hero_description', array(
        'label'   => __('Hero Description', 'siteoptz-premium'),
        'section' => 'hero_section',
        'type'    => 'textarea',
    ));
    
    // Hero Primary CTA
    $wp_customize->add_setting('hero_primary_cta_text', array(
        'default'           => 'Explore AI Tools',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hero_primary_cta_text', array(
        'label'   => __('Primary CTA Text', 'siteoptz-premium'),
        'section' => 'hero_section',
        'type'    => 'text',
    ));
    
    $wp_customize->add_setting('hero_primary_cta_url', array(
        'default'           => '#tools',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control('hero_primary_cta_url', array(
        'label'   => __('Primary CTA URL', 'siteoptz-premium'),
        'section' => 'hero_section',
        'type'    => 'url',
    ));
    
    // Hero Secondary CTA
    $wp_customize->add_setting('hero_secondary_cta_text', array(
        'default'           => 'Watch Demo',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hero_secondary_cta_text', array(
        'label'   => __('Secondary CTA Text', 'siteoptz-premium'),
        'section' => 'hero_section',
        'type'    => 'text',
    ));
    
    $wp_customize->add_setting('hero_secondary_cta_url', array(
        'default'           => '#demo',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control('hero_secondary_cta_url', array(
        'label'   => __('Secondary CTA URL', 'siteoptz-premium'),
        'section' => 'hero_section',
        'type'    => 'url',
    ));
    
    // Hero Stats
    $wp_customize->add_setting('show_hero_stats', array(
        'default'           => true,
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('show_hero_stats', array(
        'label'   => __('Show Hero Stats', 'siteoptz-premium'),
        'section' => 'hero_section',
        'type'    => 'checkbox',
    ));
    
    // Hero Stats Settings
    for ($i = 1; $i <= 4; $i++) {
        $wp_customize->add_setting("stat_{$i}_number", array(
            'default'           => ($i == 1) ? '1000+' : (($i == 2) ? '50K+' : (($i == 3) ? '24/7' : '99.9%')),
            'sanitize_callback' => 'sanitize_text_field',
        ));
        $wp_customize->add_control("stat_{$i}_number", array(
            'label'   => sprintf(__('Stat %d Number', 'siteoptz-premium'), $i),
            'section' => 'hero_section',
            'type'    => 'text',
        ));
        
        $wp_customize->add_setting("stat_{$i}_label", array(
            'default'           => ($i == 1) ? 'AI Tools' : (($i == 2) ? 'Happy Users' : (($i == 3) ? 'Support' : 'Uptime')),
            'sanitize_callback' => 'sanitize_text_field',
        ));
        $wp_customize->add_control("stat_{$i}_label", array(
            'label'   => sprintf(__('Stat %d Label', 'siteoptz-premium'), $i),
            'section' => 'hero_section',
            'type'    => 'text',
        ));
    }
    
    // Header Section
    $wp_customize->add_section('header_section', array(
        'title'    => __('Header Options', 'siteoptz-premium'),
        'priority' => 25,
    ));
    
    // Header CTA
    $wp_customize->add_setting('show_header_cta', array(
        'default'           => true,
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('show_header_cta', array(
        'label'   => __('Show Header CTA Button', 'siteoptz-premium'),
        'section' => 'header_section',
        'type'    => 'checkbox',
    ));
    
    $wp_customize->add_setting('header_cta_text', array(
        'default'           => 'Get Started',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('header_cta_text', array(
        'label'   => __('Header CTA Text', 'siteoptz-premium'),
        'section' => 'header_section',
        'type'    => 'text',
    ));
    
    $wp_customize->add_setting('header_cta_url', array(
        'default'           => '#get-started',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control('header_cta_url', array(
        'label'   => __('Header CTA URL', 'siteoptz-premium'),
        'section' => 'header_section',
        'type'    => 'url',
    ));
    
    // Social Media Section
    $wp_customize->add_section('social_media', array(
        'title'    => __('Social Media', 'siteoptz-premium'),
        'priority' => 40,
    ));
    
    $social_platforms = array(
        'twitter'  => 'Twitter',
        'linkedin' => 'LinkedIn',
        'github'   => 'GitHub',
        'discord'  => 'Discord',
        'youtube'  => 'YouTube',
        'facebook' => 'Facebook',
    );
    
    foreach ($social_platforms as $platform => $label) {
        $wp_customize->add_setting("social_{$platform}", array(
            'default'           => '#',
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control("social_{$platform}", array(
            'label'   => sprintf(__('%s URL', 'siteoptz-premium'), $label),
            'section' => 'social_media',
            'type'    => 'url',
        ));
    }
    
    // SEO Section
    $wp_customize->add_section('seo_settings', array(
        'title'    => __('SEO Settings', 'siteoptz-premium'),
        'priority' => 50,
    ));
    
    // SEO Title
    $wp_customize->add_setting('seo_title', array(
        'default'           => 'SiteOptz.ai - AI Tools Comparison Platform | Find Your Perfect AI Solution',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('seo_title', array(
        'label'   => __('SEO Title', 'siteoptz-premium'),
        'section' => 'seo_settings',
        'type'    => 'text',
    ));
    
    // SEO Description
    $wp_customize->add_setting('seo_description', array(
        'default'           => 'Discover and compare 1000+ AI tools with data-driven insights, personalized recommendations, and real-time pricing. Find your perfect AI solution today.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    $wp_customize->add_control('seo_description', array(
        'label'   => __('SEO Description', 'siteoptz-premium'),
        'section' => 'seo_settings',
        'type'    => 'textarea',
    ));
    
    // Google Analytics
    $wp_customize->add_setting('google_analytics_id', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('google_analytics_id', array(
        'label'       => __('Google Analytics ID', 'siteoptz-premium'),
        'description' => __('Enter your Google Analytics tracking ID (e.g., G-XXXXXXXXXX)', 'siteoptz-premium'),
        'section'     => 'seo_settings',
        'type'        => 'text',
    ));
    
    // Footer Section
    $wp_customize->add_section('footer_section', array(
        'title'    => __('Footer Options', 'siteoptz-premium'),
        'priority' => 60,
    ));
    
    // Footer Company Info
    $wp_customize->add_setting('footer_company_title', array(
        'default'           => 'SiteOptz.ai',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('footer_company_title', array(
        'label'   => __('Footer Company Title', 'siteoptz-premium'),
        'section' => 'footer_section',
        'type'    => 'text',
    ));
    
    $wp_customize->add_setting('footer_company_description', array(
        'default'           => 'The most comprehensive AI tools comparison platform. Make informed decisions with data-driven insights.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    $wp_customize->add_control('footer_company_description', array(
        'label'   => __('Footer Company Description', 'siteoptz-premium'),
        'section' => 'footer_section',
        'type'    => 'textarea',
    ));
    
    // Footer Copyright
    $wp_customize->add_setting('footer_copyright', array(
        'default'           => '© 2024 SiteOptz.ai. All rights reserved.',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('footer_copyright', array(
        'label'   => __('Footer Copyright Text', 'siteoptz-premium'),
        'section' => 'footer_section',
        'type'    => 'text',
    ));
    
    $wp_customize->add_setting('footer_credit', array(
        'default'           => 'Empowering businesses with AI tools comparison',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('footer_credit', array(
        'label'   => __('Footer Credit Text', 'siteoptz-premium'),
        'section' => 'footer_section',
        'type'    => 'text',
    ));
    
    // Custom CSS
    $wp_customize->add_setting('custom_css', array(
        'default'           => '',
        'sanitize_callback' => 'wp_strip_all_tags',
    ));
    $wp_customize->add_control('custom_css', array(
        'label'       => __('Custom CSS', 'siteoptz-premium'),
        'description' => __('Add custom CSS code here', 'siteoptz-premium'),
        'section'     => 'footer_section',
        'type'        => 'textarea',
    ));
}
add_action('customize_register', 'siteoptz_premium_customize_register');

/**
 * Shortcode: Hero Section
 */
function siteoptz_hero_shortcode($atts) {
    $atts = shortcode_atts(array(
        'title'       => 'Discover the Best AI Tools for Your Needs',
        'description' => 'Compare features, pricing, and performance across 1000+ AI tools',
        'cta_text'    => 'Start Comparing',
        'cta_url'     => '/tools',
    ), $atts);
    
    ob_start();
    ?>
    <div class="siteoptz-hero">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title"><?php echo esc_html($atts['title']); ?></h1>
                <p class="hero-description"><?php echo esc_html($atts['description']); ?></p>
                <div class="hero-actions">
                    <a href="<?php echo esc_url($atts['cta_url']); ?>" class="hero-button-primary">
                        <?php echo esc_html($atts['cta_text']); ?>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('siteoptz_hero', 'siteoptz_hero_shortcode');

/**
 * Shortcode: Tools Grid
 */
function siteoptz_tools_grid_shortcode($atts) {
    $atts = shortcode_atts(array(
        'categories'    => 'all',
        'per_page'      => '6',
        'show_filters'  => 'false',
    ), $atts);
    
    ob_start();
    ?>
    <div class="siteoptz-tools-grid">
        <?php
        // Sample AI categories data
        $ai_categories = array(
            array(
                'icon'        => 'fas fa-brain',
                'title'       => 'Text Generation',
                'description' => 'Advanced AI models for content creation, copywriting, and natural language processing.',
                'features'    => array('Content creation tools', 'Copywriting assistants', 'Language translation', 'Grammar checking')
            ),
            array(
                'icon'        => 'fas fa-image',
                'title'       => 'Image Generation',
                'description' => 'Creative AI tools for generating, editing, and enhancing visual content and artwork.',
                'features'    => array('AI art generators', 'Photo editing tools', 'Logo creators', 'Background removers')
            ),
            array(
                'icon'        => 'fas fa-code',
                'title'       => 'Code Generation',
                'description' => 'Powerful AI coding assistants for software development, debugging, and code optimization.',
                'features'    => array('Code completion', 'Bug detection', 'Code review', 'Documentation')
            ),
            array(
                'icon'        => 'fas fa-chart-line',
                'title'       => 'Business Intelligence',
                'description' => 'Data analysis and business intelligence tools powered by artificial intelligence.',
                'features'    => array('Data analytics', 'Predictive modeling', 'Report generation', 'Market insights')
            ),
            array(
                'icon'        => 'fas fa-microphone',
                'title'       => 'Voice & Audio',
                'description' => 'AI-powered audio processing tools for speech, music, and sound generation.',
                'features'    => array('Speech-to-text', 'Voice synthesis', 'Music generation', 'Audio enhancement')
            ),
            array(
                'icon'        => 'fas fa-comments',
                'title'       => 'Chatbots & Virtual Assistants',
                'description' => 'Conversational AI tools for customer service, support, and virtual assistance.',
                'features'    => array('Customer support', 'Lead generation', 'Personal assistants', 'Multi-language support')
            ),
        );
        
        $limit = (int) $atts['per_page'];
        $categories_to_show = array_slice($ai_categories, 0, $limit);
        
        foreach ($categories_to_show as $category) :
        ?>
            <div class="tool-card">
                <div class="tool-icon">
                    <i class="<?php echo esc_attr($category['icon']); ?>"></i>
                </div>
                <h3 class="tool-title"><?php echo esc_html($category['title']); ?></h3>
                <p class="tool-description"><?php echo esc_html($category['description']); ?></p>
                <ul class="tool-features">
                    <?php foreach ($category['features'] as $feature) : ?>
                        <li class="tool-feature"><?php echo esc_html($feature); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endforeach; ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('siteoptz_tools_grid', 'siteoptz_tools_grid_shortcode');

/**
 * Shortcode: Comparison Table
 */
function siteoptz_comparison_table_shortcode($atts) {
    $atts = shortcode_atts(array(
        'tools'    => 'chatgpt,claude,midjourney',
        'columns'  => 'name,pricing,rating,features',
        'sortable' => 'true',
    ), $atts);
    
    ob_start();
    ?>
    <div class="siteoptz-comparison-table">
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Tool</th>
                    <th>Category</th>
                    <th>Pricing</th>
                    <th>Rating</th>
                    <th>Key Features</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="tool-name">
                            <img src="https://via.placeholder.com/40x40/3b82f6/ffffff?text=GPT" alt="ChatGPT" class="tool-logo">
                            <div class="tool-info">
                                <h4>ChatGPT</h4>
                                <span class="tool-category">OpenAI</span>
                            </div>
                        </div>
                    </td>
                    <td>Text Generation</td>
                    <td><span class="pricing-badge">$20/mo</span></td>
                    <td>
                        <div class="rating-stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            4.8
                        </div>
                    </td>
                    <td>Conversational AI, Code Generation, Creative Writing</td>
                    <td>
                        <a href="#" class="header-cta">Compare</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="tool-name">
                            <img src="https://via.placeholder.com/40x40/7c3aed/ffffff?text=MJ" alt="Midjourney" class="tool-logo">
                            <div class="tool-info">
                                <h4>Midjourney</h4>
                                <span class="tool-category">Midjourney Inc.</span>
                            </div>
                        </div>
                    </td>
                    <td>Image Generation</td>
                    <td><span class="pricing-badge">$10/mo</span></td>
                    <td>
                        <div class="rating-stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            4.6
                        </div>
                    </td>
                    <td>AI Art Generation, High-Quality Images, Creative Styles</td>
                    <td>
                        <a href="#" class="header-cta">Compare</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="tool-name">
                            <img src="https://via.placeholder.com/40x40/059669/ffffff?text=CL" alt="Claude" class="tool-logo">
                            <div class="tool-info">
                                <h4>Claude</h4>
                                <span class="tool-category">Anthropic</span>
                            </div>
                        </div>
                    </td>
                    <td>Text Generation</td>
                    <td><span class="pricing-badge">$20/mo</span></td>
                    <td>
                        <div class="rating-stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            4.7
                        </div>
                    </td>
                    <td>Long Context, Safety Focused, Document Analysis</td>
                    <td>
                        <a href="#" class="header-cta">Compare</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('siteoptz_comparison_table', 'siteoptz_comparison_table_shortcode');

/**
 * Shortcode: Pricing Calculator
 */
function siteoptz_calculator_shortcode($atts) {
    $atts = shortcode_atts(array(
        'tool_id'              => '1',
        'show_email_capture'   => 'true',
        'show_discount_codes'  => 'true',
    ), $atts);
    
    ob_start();
    ?>
    <div class="calculator-container">
        <form class="calculator-form">
            <div class="form-group">
                <label class="form-label">Select AI Tool Category</label>
                <select class="form-select">
                    <option>Text Generation (e.g., ChatGPT, Claude)</option>
                    <option>Image Generation (e.g., Midjourney, DALL-E)</option>
                    <option>Code Generation (e.g., GitHub Copilot)</option>
                    <option>Voice & Audio Tools</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">Expected Monthly Usage</label>
                <input type="range" class="range-slider" min="0" max="100000" value="10000">
                <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.875rem; color: var(--neutral-500);">
                    <span>0 requests</span>
                    <span id="usage-value">10,000 requests</span>
                    <span>100k+ requests</span>
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-label">Team Size</label>
                <select class="form-select">
                    <option>Individual (1 user)</option>
                    <option>Small Team (2-10 users)</option>
                    <option>Medium Team (11-50 users)</option>
                    <option>Large Team (50+ users)</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">Billing Preference</label>
                <select class="form-select">
                    <option>Monthly Billing</option>
                    <option>Annual Billing (Save 20%)</option>
                </select>
            </div>
        </form>
        
        <div class="calculator-result">
            <div class="result-price">$89</div>
            <div class="result-period">per month</div>
            <p>Based on your requirements, here's your estimated monthly cost across top AI tools.</p>
            <a href="#get-quote" class="hero-button-secondary">Get Detailed Quote</a>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('siteoptz_calculator', 'siteoptz_calculator_shortcode');

/**
 * Shortcode: Trust Band
 */
function siteoptz_trust_band_shortcode($atts) {
    $atts = shortcode_atts(array(
        'type'  => 'logos',
        'title' => 'Trusted by Industry Leaders',
    ), $atts);
    
    ob_start();
    ?>
    <div class="trust-grid">
        <div class="trust-item">
            <img src="https://via.placeholder.com/120x40/666666/ffffff?text=TechCrunch" alt="TechCrunch" class="trust-logo">
        </div>
        <div class="trust-item">
            <img src="https://via.placeholder.com/120x40/666666/ffffff?text=Forbes" alt="Forbes" class="trust-logo">
        </div>
        <div class="trust-item">
            <img src="https://via.placeholder.com/120x40/666666/ffffff?text=Wired" alt="Wired" class="trust-logo">
        </div>
        <div class="trust-item">
            <img src="https://via.placeholder.com/120x40/666666/ffffff?text=VentureBeat" alt="VentureBeat" class="trust-logo">
        </div>
        <div class="trust-item">
            <img src="https://via.placeholder.com/120x40/666666/ffffff?text=ProductHunt" alt="Product Hunt" class="trust-logo">
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('siteoptz_trust_band', 'siteoptz_trust_band_shortcode');

/**
 * Add editor styles
 */
function siteoptz_premium_add_editor_styles() {
    add_editor_style('style-premium.css');
}
add_action('admin_init', 'siteoptz_premium_add_editor_styles');

/**
 * Custom excerpt length
 */
function siteoptz_premium_excerpt_length($length) {
    return 30;
}
add_filter('excerpt_length', 'siteoptz_premium_excerpt_length');

/**
 * Custom excerpt more
 */
function siteoptz_premium_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'siteoptz_premium_excerpt_more');

/**
 * Add theme support for Gutenberg
 */
function siteoptz_premium_gutenberg_support() {
    // Add support for editor styles
    add_theme_support('editor-styles');
    
    // Add support for full and wide align images
    add_theme_support('align-wide');
    
    // Add support for responsive embeds
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'siteoptz_premium_gutenberg_support');

/**
 * Enqueue Gutenberg block editor styles
 */
function siteoptz_premium_block_editor_styles() {
    wp_enqueue_style('siteoptz-premium-block-editor-styles', get_template_directory_uri() . '/block-editor-style.css', array(), '1.0.0');
}
add_action('enqueue_block_editor_assets', 'siteoptz_premium_block_editor_styles');

/**
 * Add custom body classes
 */
function siteoptz_premium_body_classes($classes) {
    // Add class for the current page template
    if (is_page_template()) {
        $classes[] = 'page-template-' . sanitize_html_class(get_page_template_slug());
    }
    
    // Add class for front page
    if (is_front_page()) {
        $classes[] = 'front-page';
    }
    
    // Add class for blog page
    if (is_home()) {
        $classes[] = 'blog-page';
    }
    
    return $classes;
}
add_filter('body_class', 'siteoptz_premium_body_classes');

/**
 * Security enhancements
 */
function siteoptz_premium_security() {
    // Remove WordPress version from head
    remove_action('wp_head', 'wp_generator');
    
    // Remove WordPress version from RSS feeds
    add_filter('the_generator', '__return_empty_string');
    
    // Hide login errors
    add_filter('login_errors', function() {
        return 'Something is wrong!';
    });
}
add_action('init', 'siteoptz_premium_security');

/**
 * Performance optimizations
 */
function siteoptz_premium_performance() {
    // Remove emoji scripts
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('admin_print_styles', 'print_emoji_styles');
    
    // Remove block library CSS on non-Gutenberg pages
    if (!is_admin() && !is_customize_preview()) {
        add_action('wp_enqueue_scripts', function() {
            if (!has_blocks()) {
                wp_dequeue_style('wp-block-library');
                wp_dequeue_style('wp-block-library-theme');
            }
        }, 100);
    }
}
add_action('init', 'siteoptz_premium_performance');

/**
 * Theme activation
 */
function siteoptz_premium_after_switch_theme() {
    // Flush rewrite rules
    flush_rewrite_rules();
    
    // Set default customizer values
    set_theme_mod('hero_title', 'Find Your Perfect<br><span class="gradient-text">AI Tool</span>');
    set_theme_mod('hero_description', 'Compare 1000+ AI tools with data-driven insights, real-time pricing, and personalized recommendations. Make informed decisions for your business.');
}
add_action('after_switch_theme', 'siteoptz_premium_after_switch_theme');

/**
 * Load theme textdomain
 */
function siteoptz_premium_load_textdomain() {
    load_theme_textdomain('siteoptz-premium', get_template_directory() . '/languages');
}
add_action('after_setup_theme', 'siteoptz_premium_load_textdomain');

/**
 * Add inline styles for customizer live preview
 */
function siteoptz_premium_customize_css() {
    ?>
    <style type="text/css">
        <?php echo get_theme_mod('custom_css', ''); ?>
    </style>
    <?php
}
add_action('wp_head', 'siteoptz_premium_customize_css');

/**
 * Category page helper functions
 */
function siteoptz_get_category_description($category_slug) {
    $descriptions = array(
        'text-generation' => 'Discover powerful AI tools for content creation, copywriting, and text generation. From blog posts to marketing copy, find the perfect AI writing assistant.',
        'image-creation' => 'Explore AI-powered image generation and editing tools. Create stunning visuals, artwork, and graphics with artificial intelligence.',
        'code-generation' => 'AI coding assistants and automated programming tools. Speed up development with AI-powered code completion and generation.',
        'voice-audio' => 'AI tools for voice synthesis, audio processing, and speech recognition. Transform text to speech and enhance audio content.',
        'business-intelligence' => 'AI-powered analytics, data insights, and business intelligence tools. Make data-driven decisions with artificial intelligence.',
        'automation' => 'Workflow automation and AI-powered process optimization tools. Streamline your business operations with intelligent automation.'
    );
    
    return isset($descriptions[$category_slug]) ? $descriptions[$category_slug] : 'Explore the latest AI tools in this category.';
}

function siteoptz_get_category_overview($category_slug) {
    $overviews = array(
        'text-generation' => '<p>Text generation AI tools are revolutionizing content creation across industries. These powerful platforms use advanced natural language processing to help businesses, marketers, and content creators produce high-quality written content at scale.</p><p>From blog posts and social media content to technical documentation and marketing copy, AI writing tools can significantly reduce the time and effort required to create compelling text while maintaining quality and consistency.</p>',
        'image-creation' => '<p>AI image generation tools are transforming the creative landscape, enabling anyone to create stunning visuals without traditional design skills. These platforms use advanced machine learning models to generate, edit, and enhance images based on text descriptions or existing images.</p><p>Whether you need marketing visuals, concept art, or product mockups, AI image tools offer unprecedented creative possibilities for businesses and individuals alike.</p>',
        'code-generation' => '<p>AI-powered coding tools are accelerating software development by automating routine programming tasks and providing intelligent code suggestions. These tools help developers write better code faster, reduce bugs, and learn new programming languages and frameworks.</p><p>From auto-completion and code review to full application generation, AI coding assistants are becoming essential tools for modern development teams.</p>',
        'voice-audio' => '<p>Voice and audio AI tools are transforming how we create and interact with audio content. These technologies enable realistic voice synthesis, advanced audio editing, and sophisticated speech recognition capabilities.</p><p>Perfect for podcasters, content creators, and businesses looking to add voice interfaces or enhance their audio content with artificial intelligence.</p>',
        'business-intelligence' => '<p>AI-powered business intelligence tools are revolutionizing how organizations analyze data and make decisions. These platforms combine traditional BI capabilities with machine learning to provide deeper insights and predictive analytics.</p><p>From automated reporting to predictive modeling, AI BI tools help businesses uncover patterns, forecast trends, and make data-driven decisions with greater confidence.</p>',
        'automation' => '<p>AI automation tools are streamlining business processes and reducing manual work across organizations. These platforms use artificial intelligence to automate complex workflows, make intelligent decisions, and optimize operations.</p><p>Whether automating customer service, marketing campaigns, or data processing, AI automation tools help businesses improve efficiency and reduce operational costs.</p>'
    );
    
    return isset($overviews[$category_slug]) ? $overviews[$category_slug] : '<p>This category contains cutting-edge AI tools designed to enhance productivity and capabilities.</p>';
}

function siteoptz_get_category_tools($category_slug, $limit = 6) {
    $tools = array(
        'text-generation' => array(
            array('name' => 'ChatGPT', 'description' => 'Advanced conversational AI for content creation', 'rating' => '4.8'),
            array('name' => 'Claude', 'description' => 'AI assistant for writing and analysis', 'rating' => '4.7'),
            array('name' => 'Jasper', 'description' => 'AI copywriting and content marketing platform', 'rating' => '4.6'),
            array('name' => 'Copy.ai', 'description' => 'AI-powered marketing copy generator', 'rating' => '4.5'),
            array('name' => 'Writesonic', 'description' => 'AI writing assistant for businesses', 'rating' => '4.4'),
            array('name' => 'Grammarly', 'description' => 'AI writing assistant and grammar checker', 'rating' => '4.6')
        ),
        'image-creation' => array(
            array('name' => 'DALL-E 3', 'description' => 'Advanced AI image generation from OpenAI', 'rating' => '4.8'),
            array('name' => 'Midjourney', 'description' => 'AI art generation platform', 'rating' => '4.7'),
            array('name' => 'Stable Diffusion', 'description' => 'Open-source AI image generation', 'rating' => '4.6'),
            array('name' => 'Canva AI', 'description' => 'AI-powered design and image creation', 'rating' => '4.5'),
            array('name' => 'Adobe Firefly', 'description' => 'Creative AI for designers', 'rating' => '4.6'),
            array('name' => 'Leonardo AI', 'description' => 'AI art generation for professionals', 'rating' => '4.5')
        )
    );
    
    $category_tools = isset($tools[$category_slug]) ? $tools[$category_slug] : array();
    $limited_tools = array_slice($category_tools, 0, $limit);
    
    $output = '';
    foreach ($limited_tools as $tool) {
        $output .= '<div class="tool-card">';
        $output .= '<h4>' . esc_html($tool['name']) . '</h4>';
        $output .= '<p>' . esc_html($tool['description']) . '</p>';
        $output .= '<div class="tool-rating">★ ' . esc_html($tool['rating']) . '</div>';
        $output .= '<a href="#" class="tool-link">Learn More →</a>';
        $output .= '</div>';
    }
    
    return $output ?: '<p>Tools coming soon for this category.</p>';
}

function siteoptz_get_category_comparison($category_slug) {
    return '<div class="comparison-preview">
        <div class="comparison-table">
            <h4>Quick Comparison</h4>
            <p>Compare the top 3 tools in this category side by side.</p>
            <div class="comparison-placeholder" style="background: #f8fafc; padding: 40px; border-radius: 8px; text-align: center; color: #64748b;">
                <p>📊 Detailed comparison table coming soon</p>
                <p>Compare features, pricing, and ratings</p>
            </div>
        </div>
    </div>';
}

function siteoptz_get_category_faq($category_slug) {
    $faqs = array(
        'text-generation' => array(
            array('q' => 'What are the best AI writing tools for beginners?', 'a' => 'For beginners, we recommend starting with ChatGPT or Jasper, which offer user-friendly interfaces and comprehensive documentation.'),
            array('q' => 'How much do AI text generation tools cost?', 'a' => 'Pricing varies from free tiers to enterprise plans ranging from $10-100+ per month, depending on usage and features.'),
            array('q' => 'Can AI writing tools replace human writers?', 'a' => 'AI tools are best used as assistants to enhance human creativity and productivity, not as complete replacements.')
        ),
        'image-creation' => array(
            array('q' => 'What is the best AI image generator?', 'a' => 'DALL-E 3 and Midjourney are currently leading options, each with unique strengths for different use cases.'),
            array('q' => 'Are AI-generated images copyright-free?', 'a' => 'Most platforms grant commercial usage rights, but always check the specific terms of service for each tool.'),
            array('q' => 'How can I improve AI image generation quality?', 'a' => 'Use detailed prompts, specify styles and quality settings, and iterate with different variations to get better results.')
        )
    );
    
    $category_faqs = isset($faqs[$category_slug]) ? $faqs[$category_slug] : array(
        array('q' => 'How do I choose the right AI tool?', 'a' => 'Consider your specific use case, budget, and technical requirements when selecting AI tools.'),
        array('q' => 'Are these tools suitable for businesses?', 'a' => 'Yes, most AI tools offer business plans with additional features, security, and support.'),
        array('q' => 'How often are new tools added?', 'a' => 'We continuously monitor the AI landscape and add new tools weekly to keep our database current.')
    );
    
    $output = '<div class="faq-list">';
    foreach ($category_faqs as $faq) {
        $output .= '<div class="faq-item">';
        $output .= '<h4 class="faq-question">' . esc_html($faq['q']) . '</h4>';
        $output .= '<div class="faq-answer"><p>' . esc_html($faq['a']) . '</p></div>';
        $output .= '</div>';
    }
    $output .= '</div>';
    
    return $output;
}

function siteoptz_reading_time() {
    $content = get_post_field('post_content', get_the_ID());
    $word_count = str_word_count(strip_tags($content));
    $reading_time = ceil($word_count / 200); // Average reading speed: 200 words per minute
    return $reading_time;
}

// End of functions.php