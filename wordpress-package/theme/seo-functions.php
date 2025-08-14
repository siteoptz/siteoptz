<?php
/**
 * SEO Functions and Helpers
 *
 * @package SiteOptz_Premium
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dynamic metadata functions
 */

// Get category-specific descriptions
function siteoptz_get_category_description($category_slug) {
    $descriptions = array(
        'text-generation' => 'Discover the most powerful AI text generation tools for content creation, copywriting, and automated writing. Compare features, pricing, and capabilities of leading platforms like ChatGPT, Jasper AI, and Copy.ai.',
        'image-creation' => 'Explore top AI image creation tools for generating stunning visuals, artwork, and graphics. Compare Midjourney, DALL-E, Stable Diffusion, and other leading AI image generators.',
        'code-generation' => 'Find the best AI code generation tools to boost developer productivity. Compare GitHub Copilot, Tabnine, CodeWhisperer, and other AI coding assistants.',
        'voice-audio' => 'Discover AI voice and audio tools for speech synthesis, voice cloning, podcast editing, and audio enhancement. Compare the latest in AI audio technology.',
        'business-intelligence' => 'Explore AI business intelligence tools for data analysis, reporting, and insights. Compare leading platforms for automated analytics and business decision support.',
        'automation' => 'Find the best AI automation tools for workflow optimization, task automation, and process improvement. Compare solutions for business process automation.'
    );
    
    return isset($descriptions[$category_slug]) ? $descriptions[$category_slug] : 
           'Explore AI tools in this category with comprehensive reviews, comparisons, and expert analysis to help you choose the right solution.';
}

// Get category overview content
function siteoptz_get_category_overview($category_slug) {
    $overviews = array(
        'text-generation' => '
            <h3>What are AI Text Generation Tools?</h3>
            <p>AI text generation tools use advanced language models to create human-like text content. These tools can help with blog writing, marketing copy, creative writing, and business communications.</p>
            
            <h4>Key Benefits:</h4>
            <ul>
                <li><strong>Speed:</strong> Generate content 10x faster than manual writing</li>
                <li><strong>Consistency:</strong> Maintain brand voice across all content</li>
                <li><strong>Scalability:</strong> Produce large volumes of content efficiently</li>
                <li><strong>Creativity:</strong> Overcome writer\'s block with AI assistance</li>
            </ul>
            
            <h4>Popular Use Cases:</h4>
            <ul>
                <li>Blog posts and articles</li>
                <li>Marketing copy and ads</li>
                <li>Social media content</li>
                <li>Email campaigns</li>
                <li>Product descriptions</li>
            </ul>',
            
        'image-creation' => '
            <h3>AI Image Creation Revolution</h3>
            <p>AI image generation tools have transformed visual content creation, enabling anyone to produce professional-quality images, artwork, and graphics from simple text descriptions.</p>
            
            <h4>Key Capabilities:</h4>
            <ul>
                <li><strong>Text-to-Image:</strong> Create images from written descriptions</li>
                <li><strong>Style Transfer:</strong> Apply artistic styles to existing images</li>
                <li><strong>Image Editing:</strong> Modify and enhance photos with AI</li>
                <li><strong>Concept Art:</strong> Generate ideas and inspiration</li>
            </ul>
            
            <h4>Popular Applications:</h4>
            <ul>
                <li>Marketing visuals and ads</li>
                <li>Social media graphics</li>
                <li>Website illustrations</li>
                <li>Product mockups</li>
                <li>Creative artwork</li>
            </ul>',
            
        'code-generation' => '
            <h3>AI-Powered Code Generation</h3>
            <p>AI code generation tools assist developers by suggesting code completions, generating functions, and automating repetitive coding tasks, significantly boosting productivity.</p>
            
            <h4>Core Features:</h4>
            <ul>
                <li><strong>Code Completion:</strong> Intelligent auto-completion suggestions</li>
                <li><strong>Function Generation:</strong> Create entire functions from comments</li>
                <li><strong>Bug Detection:</strong> Identify and suggest fixes for issues</li>
                <li><strong>Documentation:</strong> Auto-generate code documentation</li>
            </ul>
            
            <h4>Development Benefits:</h4>
            <ul>
                <li>20-40% faster coding speed</li>
                <li>Reduced syntax errors</li>
                <li>Better code quality</li>
                <li>Learning new frameworks</li>
                <li>Consistent code patterns</li>
            </ul>'
    );
    
    return isset($overviews[$category_slug]) ? $overviews[$category_slug] : 
           '<p>This category contains powerful AI tools designed to enhance productivity and creativity in specific workflows.</p>';
}

// Get category tools
function siteoptz_get_category_tools($category_slug, $limit = 6) {
    // Map category slugs to AI tool categories
    $category_mapping = array(
        'text-generation' => 'writing',
        'image-creation' => 'image-generation',
        'code-generation' => 'code-assistant',
        'voice-audio' => 'audio',
        'business-intelligence' => 'data-analysis',
        'automation' => 'automation'
    );
    
    $ai_category = isset($category_mapping[$category_slug]) ? $category_mapping[$category_slug] : $category_slug;
    
    $tools_query = new WP_Query(array(
        'post_type' => 'ai_tool',
        'posts_per_page' => $limit,
        'tax_query' => array(
            array(
                'taxonomy' => 'ai_tool_category',
                'field'    => 'slug',
                'terms'    => $ai_category,
            ),
        ),
        'meta_key' => '_ai_tool_rating',
        'orderby' => 'meta_value_num',
        'order' => 'DESC'
    ));
    
    if ($tools_query->have_posts()) {
        ob_start();
        while ($tools_query->have_posts()) {
            $tools_query->the_post();
            ?>
            <div class="tool-card" itemscope itemtype="https://schema.org/SoftwareApplication">
                <div class="tool-image">
                    <?php if (has_post_thumbnail()) : ?>
                        <?php the_post_thumbnail('medium', array('loading' => 'lazy', 'alt' => get_the_title())); ?>
                    <?php else : ?>
                        <div class="tool-placeholder"></div>
                    <?php endif; ?>
                </div>
                
                <div class="tool-content">
                    <h3 class="tool-title" itemprop="name">
                        <a href="<?php the_permalink(); ?>" itemprop="url"><?php the_title(); ?></a>
                    </h3>
                    
                    <div class="tool-excerpt" itemprop="description">
                        <?php echo wp_trim_words(get_the_excerpt(), 15); ?>
                    </div>
                    
                    <div class="tool-meta">
                        <span class="tool-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                            <span itemprop="price"><?php echo get_post_meta(get_the_ID(), '_ai_tool_price', true) ?: 'Free'; ?></span>
                        </span>
                        <span class="tool-rating" itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
                            <?php 
                            $rating = get_post_meta(get_the_ID(), '_ai_tool_rating', true);
                            if ($rating) {
                                for ($i = 1; $i <= 5; $i++) {
                                    echo $i <= floatval($rating) ? '★' : '☆';
                                }
                                echo ' <span itemprop="ratingValue">' . $rating . '</span>';
                                echo '<meta itemprop="bestRating" content="5">';
                                echo '<meta itemprop="worstRating" content="1">';
                            }
                            ?>
                        </span>
                    </div>
                    
                    <a href="<?php the_permalink(); ?>" class="tool-cta">Learn More →</a>
                </div>
            </div>
            <?php
        }
        wp_reset_postdata();
        return ob_get_clean();
    } else {
        return '<p>No tools found in this category yet. We\'re constantly adding new AI tools!</p>';
    }
}

// Get category comparison
function siteoptz_get_category_comparison($category_slug) {
    // Get top 3 tools for comparison
    $category_mapping = array(
        'text-generation' => 'writing',
        'image-creation' => 'image-generation',
        'code-generation' => 'code-assistant'
    );
    
    $ai_category = isset($category_mapping[$category_slug]) ? $category_mapping[$category_slug] : $category_slug;
    
    $tools_query = new WP_Query(array(
        'post_type' => 'ai_tool',
        'posts_per_page' => 3,
        'tax_query' => array(
            array(
                'taxonomy' => 'ai_tool_category',
                'field'    => 'slug',
                'terms'    => $ai_category,
            ),
        ),
        'meta_key' => '_ai_tool_rating',
        'orderby' => 'meta_value_num',
        'order' => 'DESC'
    ));
    
    if ($tools_query->have_posts()) {
        $tool_names = array();
        while ($tools_query->have_posts()) {
            $tools_query->the_post();
            $tool_names[] = get_the_title();
        }
        wp_reset_postdata();
        
        $tools_string = implode(',', $tool_names);
        return do_shortcode('[ai_comparison tools="' . $tools_string . '" features="price,rating,pros,cons"]');
    }
    
    return '<p>Comparison data will be available soon.</p>';
}

// Get category FAQ
function siteoptz_get_category_faq($category_slug) {
    $faqs = array(
        'text-generation' => array(
            array(
                'question' => 'What are the best AI text generation tools for beginners?',
                'answer' => 'For beginners, we recommend starting with ChatGPT (free tier), Jasper AI (user-friendly interface), or Copy.ai (simple templates). These tools offer intuitive interfaces and don\'t require technical knowledge.'
            ),
            array(
                'question' => 'How much do AI text generation tools cost?',
                'answer' => 'Pricing varies widely. Free options include ChatGPT and Google Bard. Paid tools range from $20/month (ChatGPT Plus) to $125/month (Jasper AI business plans). Most offer free trials.'
            ),
            array(
                'question' => 'Can AI writing tools replace human writers?',
                'answer' => 'AI tools are best used as writing assistants rather than replacements. They excel at generating drafts, overcoming writer\'s block, and handling routine content, but human creativity and oversight remain essential for quality and authenticity.'
            )
        ),
        'image-creation' => array(
            array(
                'question' => 'Which AI image generator produces the most realistic results?',
                'answer' => 'DALL-E 3 and Midjourney are currently leading for photorealistic images. DALL-E 3 excels at following detailed prompts accurately, while Midjourney produces more artistic and stylized results.'
            ),
            array(
                'question' => 'Can I use AI-generated images for commercial purposes?',
                'answer' => 'It depends on the platform. Most paid plans include commercial usage rights, but always check the specific terms. Midjourney, DALL-E, and Stable Diffusion have different licensing terms for commercial use.'
            ),
            array(
                'question' => 'How do I write better prompts for AI image generation?',
                'answer' => 'Be specific about style, composition, lighting, and mood. Include artistic references, camera angles, and descriptive adjectives. Practice with different prompt structures and study successful examples from the community.'
            )
        )
    );
    
    if (!isset($faqs[$category_slug])) {
        return '<p>FAQ content coming soon for this category.</p>';
    }
    
    ob_start();
    foreach ($faqs[$category_slug] as $faq) {
        ?>
        <div class="faq-item" itemscope itemtype="https://schema.org/Question">
            <div class="faq-question" onclick="toggleFAQ(this)" itemprop="name">
                <h3><?php echo esc_html($faq['question']); ?></h3>
                <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer" itemscope itemtype="https://schema.org/Answer">
                <div itemprop="text">
                    <p><?php echo esc_html($faq['answer']); ?></p>
                </div>
            </div>
        </div>
        <?php
    }
    return ob_get_clean();
}

// Calculate reading time
function siteoptz_reading_time($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    $content = get_post_field('post_content', $post_id);
    $word_count = str_word_count(strip_tags($content));
    $reading_time = ceil($word_count / 200); // Average reading speed
    
    return max(1, $reading_time);
}

/**
 * Generate sitemaps
 */
function siteoptz_generate_sitemaps() {
    // Main sitemap
    $sitemap = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    
    // Homepage
    $sitemap .= '<url>' . "\n";
    $sitemap .= '<loc>' . home_url() . '</loc>' . "\n";
    $sitemap .= '<changefreq>daily</changefreq>' . "\n";
    $sitemap .= '<priority>1.0</priority>' . "\n";
    $sitemap .= '</url>' . "\n";
    
    // Main pages
    $main_pages = array(
        'ai-tools', 'comparisons', 'pricing', 'calculator', 'faq', 'about', 'community',
        'blog', 'case-studies', 'careers', 'press', 'partnerships', 'investors', 
        'help-center', 'documentation', 'status', 'security', 'feedback'
    );
    
    foreach ($main_pages as $page) {
        $sitemap .= '<url>' . "\n";
        $sitemap .= '<loc>' . home_url('/' . $page . '/') . '</loc>' . "\n";
        $sitemap .= '<changefreq>weekly</changefreq>' . "\n";
        $sitemap .= '<priority>0.8</priority>' . "\n";
        $sitemap .= '</url>' . "\n";
    }
    
    $sitemap .= '</urlset>';
    
    file_put_contents(ABSPATH . 'sitemap.xml', $sitemap);
    
    // AI Tools sitemap
    siteoptz_generate_tools_sitemap();
    
    // Blog sitemap
    siteoptz_generate_blog_sitemap();
    
    // Comparisons sitemap
    siteoptz_generate_comparisons_sitemap();
}

function siteoptz_generate_tools_sitemap() {
    $sitemap = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    
    $tools = get_posts(array(
        'post_type' => 'ai_tool',
        'posts_per_page' => -1,
        'post_status' => 'publish'
    ));
    
    foreach ($tools as $tool) {
        $sitemap .= '<url>' . "\n";
        $sitemap .= '<loc>' . get_permalink($tool->ID) . '</loc>' . "\n";
        $sitemap .= '<lastmod>' . date('Y-m-d', strtotime($tool->post_modified)) . '</lastmod>' . "\n";
        $sitemap .= '<changefreq>monthly</changefreq>' . "\n";
        $sitemap .= '<priority>0.7</priority>' . "\n";
        $sitemap .= '</url>' . "\n";
    }
    
    $sitemap .= '</urlset>';
    
    file_put_contents(ABSPATH . 'sitemap-tools.xml', $sitemap);
}

function siteoptz_generate_blog_sitemap() {
    $sitemap = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    
    $posts = get_posts(array(
        'post_type' => 'post',
        'posts_per_page' => -1,
        'post_status' => 'publish'
    ));
    
    foreach ($posts as $post) {
        $sitemap .= '<url>' . "\n";
        $sitemap .= '<loc>' . get_permalink($post->ID) . '</loc>' . "\n";
        $sitemap .= '<lastmod>' . date('Y-m-d', strtotime($post->post_modified)) . '</lastmod>' . "\n";
        $sitemap .= '<changefreq>monthly</changefreq>' . "\n";
        $sitemap .= '<priority>0.6</priority>' . "\n";
        $sitemap .= '</url>' . "\n";
    }
    
    $sitemap .= '</urlset>';
    
    file_put_contents(ABSPATH . 'sitemap-blogs.xml', $sitemap);
}

function siteoptz_generate_comparisons_sitemap() {
    $sitemap = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    
    // Add comparison pages
    $comparison_pages = array(
        'ai-writing-tools-comparison',
        'ai-image-generators-comparison',
        'ai-code-assistants-comparison',
        'chatgpt-vs-claude-comparison',
        'midjourney-vs-dalle-comparison'
    );
    
    foreach ($comparison_pages as $page) {
        $sitemap .= '<url>' . "\n";
        $sitemap .= '<loc>' . home_url('/comparisons/' . $page . '/') . '</loc>' . "\n";
        $sitemap .= '<changefreq>weekly</changefreq>' . "\n";
        $sitemap .= '<priority>0.7</priority>' . "\n";
        $sitemap .= '</url>' . "\n";
    }
    
    $sitemap .= '</urlset>';
    
    file_put_contents(ABSPATH . 'sitemap-comparisons.xml', $sitemap);
}

/**
 * Generate robots.txt
 */
function siteoptz_generate_robots_txt() {
    $robots_content = "User-agent: *\n";
    $robots_content .= "Allow: /\n";
    $robots_content .= "Disallow: /wp-admin/\n";
    $robots_content .= "Disallow: /wp-includes/\n";
    $robots_content .= "Disallow: /wp-content/plugins/\n";
    $robots_content .= "Disallow: /wp-content/themes/\n";
    $robots_content .= "Disallow: /staging/\n";
    $robots_content .= "Disallow: /test/\n";
    $robots_content .= "Disallow: /dev/\n";
    $robots_content .= "Disallow: /?s=\n";
    $robots_content .= "Disallow: /search\n";
    $robots_content .= "\n";
    $robots_content .= "Sitemap: " . home_url('/sitemap.xml') . "\n";
    $robots_content .= "Sitemap: " . home_url('/sitemap-tools.xml') . "\n";
    $robots_content .= "Sitemap: " . home_url('/sitemap-blogs.xml') . "\n";
    $robots_content .= "Sitemap: " . home_url('/sitemap-comparisons.xml') . "\n";
    $robots_content .= "Sitemap: " . home_url('/sitemap-programmatic.xml') . "\n";
    
    file_put_contents(ABSPATH . 'robots.txt', $robots_content);
}

// Initialize SEO functions
add_action('init', 'siteoptz_generate_sitemaps');
add_action('init', 'siteoptz_generate_robots_txt');
add_action('init', 'siteoptz_create_programmatic_pages');

/**
 * Add structured data to head
 */
function siteoptz_add_organization_schema() {
    if (is_front_page()) {
        $schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => 'SiteOptz.ai',
            'url' => home_url(),
            'description' => 'The leading platform for discovering, comparing, and choosing the best AI tools for your business needs.',
            'foundingDate' => '2024',
            'founder' => array(
                '@type' => 'Person',
                'name' => 'SiteOptz Team'
            ),
            'sameAs' => array(
                'https://twitter.com/siteoptz',
                'https://linkedin.com/company/siteoptz'
            ),
            'potentialAction' => array(
                '@type' => 'SearchAction',
                'target' => array(
                    '@type' => 'EntryPoint',
                    'urlTemplate' => home_url('/?s={search_term_string}')
                ),
                'query-input' => 'required name=search_term_string'
            )
        );
        
        echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
    }
}
add_action('wp_head', 'siteoptz_add_organization_schema');

/**
 * Add website schema with sitelinks search box
 */
function siteoptz_add_website_schema() {
    if (is_front_page()) {
        $schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'name' => 'SiteOptz.ai',
            'url' => home_url(),
            'potentialAction' => array(
                '@type' => 'SearchAction',
                'target' => array(
                    '@type' => 'EntryPoint',
                    'urlTemplate' => home_url('/?s={search_term_string}')
                ),
                'query-input' => 'required name=search_term_string'
            )
        );
        
        echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
    }
}
add_action('wp_head', 'siteoptz_add_website_schema');

/**
 * Create programmatic SEO pages
 */
function siteoptz_create_programmatic_pages() {
    // Priority keywords for programmatic pages
    $priority_keywords = array(
        'ai-tool-guide' => array(
            'title' => 'Complete AI Tool Guide - Everything You Need to Know | SiteOptz.ai',
            'description' => 'Comprehensive guide to AI tools including selection criteria, implementation strategies, and best practices for businesses.',
            'content' => 'ai_tools_comprehensive_guide'
        ),
        'comparison-charts' => array(
            'title' => 'AI Tool Comparison Charts - Side-by-Side Analysis | SiteOptz.ai', 
            'description' => 'Interactive comparison charts for AI tools across categories. Compare features, pricing, and capabilities easily.',
            'content' => 'ai_tools_comparison_charts'
        ),
        'pricing-calculator' => array(
            'title' => 'AI Tool Pricing Calculator - Calculate Costs & ROI | SiteOptz.ai',
            'description' => 'Calculate total cost of ownership and ROI for AI tools. Compare pricing plans and find the best value.',
            'content' => 'ai_tools_pricing_calculator'
        ),
        'api-documentation' => array(
            'title' => 'API Documentation - SiteOptz.ai Developer Resources | REST API',
            'description' => 'Complete API documentation for developers. Access our AI tools database, comparison features, and integration guides.',
            'content' => 'api_documentation_content'
        )
    );
    
    foreach ($priority_keywords as $slug => $page_data) {
        siteoptz_create_seo_page($slug, $page_data);
    }
}

/**
 * Create individual SEO page
 */
function siteoptz_create_seo_page($slug, $page_data) {
    // Check if page already exists
    $existing_page = get_page_by_path($slug);
    if ($existing_page) {
        return; // Page already exists
    }
    
    // Generate content based on type
    $content = siteoptz_generate_page_content($page_data['content'], $slug);
    
    // Create page
    $page_args = array(
        'post_title' => $page_data['title'],
        'post_content' => $content,
        'post_status' => 'publish',
        'post_type' => 'page',
        'post_name' => $slug,
        'meta_input' => array(
            '_seo_title' => $page_data['title'],
            '_seo_description' => $page_data['description'],
            '_seo_canonical' => home_url('/' . $slug . '/'),
            '_programmatic_page' => true
        )
    );
    
    wp_insert_post($page_args);
}

/**
 * Generate content for SEO pages
 */
function siteoptz_generate_page_content($content_type, $slug) {
    switch ($content_type) {
        case 'ai_tools_comprehensive_guide':
            return '
                <div class="seo-page-content">
                    <h1>Complete AI Tool Guide</h1>
                    
                    <div class="guide-intro">
                        <p>Welcome to the most comprehensive guide to AI tools available today. Whether you\'re a business owner, developer, marketer, or creative professional, this guide will help you navigate the complex landscape of artificial intelligence tools.</p>
                    </div>
                    
                    <div class="guide-toc">
                        <h2>Table of Contents</h2>
                        <ul>
                            <li><a href="#getting-started">Getting Started with AI Tools</a></li>
                            <li><a href="#categories">AI Tool Categories</a></li>
                            <li><a href="#selection-criteria">Selection Criteria</a></li>
                            <li><a href="#implementation">Implementation Guide</a></li>
                            <li><a href="#roi-measurement">Measuring ROI</a></li>
                            <li><a href="#future-trends">Future Trends</a></li>
                        </ul>
                    </div>
                    
                    <section id="getting-started">
                        <h2>Getting Started with AI Tools</h2>
                        <p>The AI tools landscape can be overwhelming with hundreds of options available. Start by identifying your specific needs:</p>
                        <ul>
                            <li><strong>Content Creation:</strong> Writing, image generation, video creation</li>
                            <li><strong>Business Operations:</strong> Customer service, data analysis, automation</li>
                            <li><strong>Development:</strong> Code generation, testing, debugging</li>
                            <li><strong>Marketing:</strong> SEO, social media, advertising optimization</li>
                        </ul>
                    </section>
                    
                    <section id="categories">
                        <h2>AI Tool Categories</h2>
                        [ai_tools_grid count="12" columns="4"]
                    </section>
                    
                    <section id="selection-criteria">
                        <h2>How to Choose the Right AI Tool</h2>
                        <div class="criteria-grid">
                            <div class="criterion">
                                <h3>🎯 Purpose Alignment</h3>
                                <p>Ensure the tool matches your specific use case and workflow requirements.</p>
                            </div>
                            <div class="criterion">
                                <h3>💰 Cost Effectiveness</h3>
                                <p>Consider total cost of ownership including training, integration, and ongoing fees.</p>
                            </div>
                            <div class="criterion">
                                <h3>🔧 Ease of Use</h3>
                                <p>Evaluate learning curve and user interface design for your team.</p>
                            </div>
                            <div class="criterion">
                                <h3>🔗 Integration Capabilities</h3>
                                <p>Check compatibility with your existing tools and systems.</p>
                            </div>
                        </div>
                    </section>
                    
                    <section id="implementation">
                        <h2>Implementation Best Practices</h2>
                        <ol>
                            <li><strong>Start Small:</strong> Begin with a pilot project to test effectiveness</li>
                            <li><strong>Train Your Team:</strong> Invest in proper training and onboarding</li>
                            <li><strong>Monitor Performance:</strong> Track metrics and adjust as needed</li>
                            <li><strong>Scale Gradually:</strong> Expand usage based on proven results</li>
                        </ol>
                    </section>
                    
                    <section id="roi-measurement">
                        <h2>Measuring AI Tool ROI</h2>
                        [ai_calculator]
                        <p>Use our ROI calculator above to estimate potential returns from AI tool implementation.</p>
                    </section>
                    
                    <div class="cta-section">
                        <h2>Ready to Find Your Perfect AI Tool?</h2>
                        <p>Browse our comprehensive database of AI tools with detailed comparisons and reviews.</p>
                        <a href="/ai-tools/" class="cta-button">Explore AI Tools</a>
                    </div>
                </div>';
                
        case 'ai_tools_comparison_charts':
            return '
                <div class="seo-page-content">
                    <h1>AI Tool Comparison Charts</h1>
                    
                    <div class="comparison-intro">
                        <p>Compare AI tools side-by-side with our interactive comparison charts. Find the best tools for your specific needs with detailed feature analysis.</p>
                    </div>
                    
                    <div class="comparison-categories">
                        <h2>Compare by Category</h2>
                        
                        <div class="category-comparisons">
                            <div class="comparison-section">
                                <h3>🤖 AI Writing Tools Comparison</h3>
                                [ai_comparison tools="ChatGPT,Claude,Jasper AI,Copy.ai" features="price,rating,features,pros,cons"]
                            </div>
                            
                            <div class="comparison-section">
                                <h3>🎨 AI Image Generators Comparison</h3>
                                [ai_comparison tools="Midjourney,DALL-E,Stable Diffusion" features="price,rating,features,pros,cons"]
                            </div>
                            
                            <div class="comparison-section">
                                <h3>💻 AI Code Assistants Comparison</h3>
                                [ai_comparison tools="GitHub Copilot,Tabnine,CodeWhisperer" features="price,rating,features,pros,cons"]
                            </div>
                        </div>
                    </div>
                    
                    <div class="custom-comparison">
                        <h2>Create Custom Comparison</h2>
                        <p>Select any AI tools from our database to create your own comparison chart:</p>
                        <div class="comparison-builder">
                            <p><em>Interactive comparison builder would go here</em></p>
                            <a href="/comparisons/" class="cta-button">Use Comparison Tool</a>
                        </div>
                    </div>
                </div>';
                
        case 'ai_tools_pricing_calculator':
            return '
                <div class="seo-page-content">
                    <h1>AI Tool Pricing Calculator</h1>
                    
                    <div class="calculator-intro">
                        <p>Calculate the total cost of ownership and ROI for AI tools. Compare pricing plans and find the best value for your budget.</p>
                    </div>
                    
                    <div class="pricing-calculator">
                        [ai_calculator]
                    </div>
                    
                    <div class="pricing-analysis">
                        <h2>Pricing Model Analysis</h2>
                        
                        <div class="pricing-models">
                            <div class="model">
                                <h3>Free Tier</h3>
                                <p>Great for testing and small-scale usage. Usually includes basic features with usage limits.</p>
                                <ul>
                                    <li>Limited monthly usage</li>
                                    <li>Basic features only</li>
                                    <li>Community support</li>
                                    <li>No commercial usage rights</li>
                                </ul>
                            </div>
                            
                            <div class="model">
                                <h3>Subscription Plans</h3>
                                <p>Monthly or annual subscriptions with different feature tiers and usage allowances.</p>
                                <ul>
                                    <li>Predictable monthly costs</li>
                                    <li>Scalable usage limits</li>
                                    <li>Priority support</li>
                                    <li>Commercial usage included</li>
                                </ul>
                            </div>
                            
                            <div class="model">
                                <h3>Pay-Per-Use</h3>
                                <p>Pay only for what you use. Ideal for variable or seasonal usage patterns.</p>
                                <ul>
                                    <li>No monthly commitment</li>
                                    <li>Cost scales with usage</li>
                                    <li>Great for testing</li>
                                    <li>Can be expensive at scale</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cost-optimization">
                        <h2>Cost Optimization Tips</h2>
                        <ol>
                            <li><strong>Start with Free Tiers:</strong> Test tools before committing to paid plans</li>
                            <li><strong>Annual vs Monthly:</strong> Annual plans often offer 20-30% savings</li>
                            <li><strong>Team vs Individual:</strong> Team plans may offer better per-user pricing</li>
                            <li><strong>Usage Monitoring:</strong> Track usage to avoid overage charges</li>
                            <li><strong>Feature Assessment:</strong> Only pay for features you actually need</li>
                        </ol>
                    </div>
                </div>';
                
        case 'api_documentation_content':
            return '
                <div class="seo-page-content">
                    <h1>API Documentation</h1>
                    
                    <div class="api-intro">
                        <p>Access our comprehensive API to integrate SiteOptz.ai data and features into your applications. Get real-time access to AI tool information, comparisons, and recommendations.</p>
                    </div>
                    
                    <div class="api-overview">
                        <h2>API Overview</h2>
                        <div class="api-features">
                            <div class="feature">
                                <h3>🗄️ Tools Database API</h3>
                                <p>Access our complete database of 500+ AI tools with detailed metadata</p>
                            </div>
                            <div class="feature">
                                <h3>⚖️ Comparison API</h3>
                                <p>Generate tool comparisons programmatically with customizable criteria</p>
                            </div>
                            <div class="feature">
                                <h3>🎯 Recommendation API</h3>
                                <p>Get AI-powered tool recommendations based on user requirements</p>
                            </div>
                            <div class="feature">
                                <h3>📊 Analytics API</h3>
                                <p>Access market trends, pricing data, and popularity metrics</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="api-endpoints">
                        <h2>API Endpoints</h2>
                        
                        <div class="endpoint">
                            <h3>GET /api/tools</h3>
                            <p>Retrieve a list of AI tools with optional filtering and pagination.</p>
                            <div class="code-example">
                                <code>
                                curl -H "Authorization: Bearer YOUR_API_KEY" \\<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;https://api.siteoptz.ai/v1/tools?category=writing&limit=10
                                </code>
                            </div>
                        </div>
                        
                        <div class="endpoint">
                            <h3>GET /api/tools/{id}</h3>
                            <p>Get detailed information about a specific AI tool.</p>
                            <div class="code-example">
                                <code>
                                curl -H "Authorization: Bearer YOUR_API_KEY" \\<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;https://api.siteoptz.ai/v1/tools/chatgpt
                                </code>
                            </div>
                        </div>
                        
                        <div class="endpoint">
                            <h3>POST /api/compare</h3>
                            <p>Generate a comparison between multiple AI tools.</p>
                            <div class="code-example">
                                <code>
                                curl -X POST -H "Authorization: Bearer YOUR_API_KEY" \\<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;-H "Content-Type: application/json" \\<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;-d \'{"tools": ["chatgpt", "claude"], "features": ["price", "rating"]}\' \\<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;https://api.siteoptz.ai/v1/compare
                                </code>
                            </div>
                        </div>
                    </div>
                    
                    <div class="authentication">
                        <h2>Authentication</h2>
                        <p>All API requests require authentication using an API key. Include your API key in the Authorization header:</p>
                        <div class="code-example">
                            <code>Authorization: Bearer YOUR_API_KEY</code>
                        </div>
                        <p><a href="/contact/">Contact us</a> to request an API key for your application.</p>
                    </div>
                    
                    <div class="rate-limits">
                        <h2>Rate Limits</h2>
                        <ul>
                            <li><strong>Free Tier:</strong> 1,000 requests per month</li>
                            <li><strong>Pro Tier:</strong> 10,000 requests per month</li>
                            <li><strong>Enterprise:</strong> Custom limits available</li>
                        </ul>
                    </div>
                    
                    <div class="api-cta">
                        <h2>Ready to Get Started?</h2>
                        <p>Contact our team to get your API key and start integrating SiteOptz.ai data into your applications.</p>
                        <a href="/contact/" class="cta-button">Request API Access</a>
                    </div>
                </div>';
                
        default:
            return '<p>Content coming soon for this page.</p>';
    }
}

/**
 * Add programmatic pages to sitemap
 */
function siteoptz_generate_programmatic_sitemap() {
    $sitemap = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    
    // Add programmatic pages
    $programmatic_pages = array(
        'ai-tool-guide',
        'comparison-charts', 
        'pricing-calculator',
        'api-documentation'
    );
    
    foreach ($programmatic_pages as $page) {
        $sitemap .= '<url>' . "\n";
        $sitemap .= '<loc>' . home_url('/' . $page . '/') . '</loc>' . "\n";
        $sitemap .= '<changefreq>weekly</changefreq>' . "\n";
        $sitemap .= '<priority>0.8</priority>' . "\n";
        $sitemap .= '</url>' . "\n";
    }
    
    $sitemap .= '</urlset>';
    
    file_put_contents(ABSPATH . 'sitemap-programmatic.xml', $sitemap);
}

// Add programmatic sitemap generation
add_action('init', 'siteoptz_generate_programmatic_sitemap');

/**
 * Internal linking optimization
 */
function siteoptz_add_internal_links($content) {
    // Define internal linking opportunities
    $link_patterns = array(
        '/\bAI tools?\b/i' => '<a href="' . home_url('/ai-tools/') . '">AI tools</a>',
        '/\bcompare AI tools?\b/i' => '<a href="' . home_url('/comparisons/') . '">compare AI tools</a>',
        '/\bROI calculator\b/i' => '<a href="' . home_url('/calculator/') . '">ROI calculator</a>',
        '/\bpricing guide\b/i' => '<a href="' . home_url('/pricing/') . '">pricing guide</a>',
        '/\bcase studies?\b/i' => '<a href="' . home_url('/case-studies/') . '">case studies</a>'
    );
    
    foreach ($link_patterns as $pattern => $replacement) {
        $content = preg_replace($pattern, $replacement, $content, 1); // Only replace first occurrence
    }
    
    return $content;
}

add_filter('the_content', 'siteoptz_add_internal_links');
?>