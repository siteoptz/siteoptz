<?php
/**
 * The template for displaying AI Tool Category archives
 *
 * @package SiteOptz_Premium
 */

get_header('premium');

$current_term = get_queried_object();
$category_name = $current_term->name;
$category_slug = $current_term->slug;
$category_description = $current_term->description;
?>

<main id="primary" class="site-main category-page">
    <div class="container">
        
        <!-- Category Header -->
        <header class="category-header">
            <div class="category-breadcrumb">
                <a href="<?php echo home_url(); ?>">Home</a> 
                <span>→</span> 
                <a href="<?php echo home_url('/ai-tools'); ?>">AI Tools</a> 
                <span>→</span> 
                <span><?php echo esc_html($category_name); ?></span>
            </div>
            
            <h1><?php echo esc_html($category_name); ?> AI Tools</h1>
            
            <?php if ($category_description): ?>
                <p class="category-description"><?php echo esc_html($category_description); ?></p>
            <?php else: ?>
                <p class="category-description">
                    Discover the best <?php echo strtolower(esc_html($category_name)); ?> AI tools. 
                    Compare features, pricing, and reviews to find the perfect solution for your needs.
                </p>
            <?php endif; ?>
            
            <div class="category-stats">
                <div class="stat">
                    <span class="stat-number"><?php echo $current_term->count; ?></span>
                    <span class="stat-label">Tools</span>
                </div>
                <div class="stat">
                    <span class="stat-number">4.5★</span>
                    <span class="stat-label">Avg Rating</span>
                </div>
                <div class="stat">
                    <span class="stat-number">Free-$99</span>
                    <span class="stat-label">Price Range</span>
                </div>
            </div>
        </header>

        <!-- Category Tools Grid -->
        <section class="category-tools">
            <div class="tools-header">
                <h2>All <?php echo esc_html($category_name); ?> Tools</h2>
                <div class="tools-filters">
                    <select id="sort-tools">
                        <option value="popularity">Sort by Popularity</option>
                        <option value="rating">Sort by Rating</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Alphabetical</option>
                    </select>
                </div>
            </div>
            
            <?php echo do_shortcode('[ai_tools_grid category="' . $category_slug . '" count="12" columns="3"]'); ?>
        </section>

        <!-- Category-Specific Comparison -->
        <?php if ($current_term->count >= 2): ?>
        <section class="category-comparison">
            <h2>Compare <?php echo esc_html($category_name); ?> Tools</h2>
            <p>Side-by-side comparison of the top tools in this category</p>
            
            <?php
            // Get tools for comparison (limit to 3 for display)
            $tools_query = new WP_Query(array(
                'post_type' => 'ai_tool',
                'posts_per_page' => 3,
                'tax_query' => array(
                    array(
                        'taxonomy' => 'ai_tool_category',
                        'field'    => 'term_id',
                        'terms'    => $current_term->term_id,
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
                echo do_shortcode('[ai_comparison tools="' . $tools_string . '" features="price,rating,pros,cons"]');
            }
            ?>
        </section>
        <?php endif; ?>

        <!-- Category Guide -->
        <section class="category-guide">
            <h2>How to Choose the Best <?php echo esc_html($category_name); ?> Tool</h2>
            
            <div class="guide-content">
                <?php if ($category_slug === 'writing' || $category_slug === 'ai-writing'): ?>
                    <div class="guide-steps">
                        <div class="guide-step">
                            <h3>1. Define Your Content Type</h3>
                            <p>Blog posts, marketing copy, social media, or technical documentation</p>
                        </div>
                        <div class="guide-step">
                            <h3>2. Consider Team Size</h3>
                            <p>Individual use vs team collaboration features</p>
                        </div>
                        <div class="guide-step">
                            <h3>3. Check Integrations</h3>
                            <p>WordPress, Google Docs, CMS platforms</p>
                        </div>
                        <div class="guide-step">
                            <h3>4. Test Writing Quality</h3>
                            <p>Use free trials to test output quality</p>
                        </div>
                    </div>
                <?php elseif ($category_slug === 'image-generation' || $category_slug === 'ai-images'): ?>
                    <div class="guide-steps">
                        <div class="guide-step">
                            <h3>1. Art Style Preference</h3>
                            <p>Realistic, artistic, cartoon, or abstract styles</p>
                        </div>
                        <div class="guide-step">
                            <h3>2. Image Resolution</h3>
                            <p>Web use (512px) vs print quality (1024px+)</p>
                        </div>
                        <div class="guide-step">
                            <h3>3. Commercial Rights</h3>
                            <p>Personal use vs commercial licensing</p>
                        </div>
                        <div class="guide-step">
                            <h3>4. Generation Speed</h3>
                            <p>Fast iterations vs high-quality outputs</p>
                        </div>
                    </div>
                <?php elseif ($category_slug === 'code-assistant' || $category_slug === 'ai-coding'): ?>
                    <div class="guide-steps">
                        <div class="guide-step">
                            <h3>1. Programming Languages</h3>
                            <p>Python, JavaScript, Java, C++, etc.</p>
                        </div>
                        <div class="guide-step">
                            <h3>2. IDE Integration</h3>
                            <p>VS Code, JetBrains, Vim, Emacs support</p>
                        </div>
                        <div class="guide-step">
                            <h3>3. Team Policies</h3>
                            <p>Code privacy, security, compliance</p>
                        </div>
                        <div class="guide-step">
                            <h3>4. Learning Curve</h3>
                            <p>Ease of setup and daily usage</p>
                        </div>
                    </div>
                <?php else: ?>
                    <div class="guide-steps">
                        <div class="guide-step">
                            <h3>1. Identify Your Needs</h3>
                            <p>What specific tasks do you want to automate or improve?</p>
                        </div>
                        <div class="guide-step">
                            <h3>2. Set Your Budget</h3>
                            <p>Consider monthly costs and potential ROI</p>
                        </div>
                        <div class="guide-step">
                            <h3>3. Try Before You Buy</h3>
                            <p>Most tools offer free trials or freemium tiers</p>
                        </div>
                        <div class="guide-step">
                            <h3>4. Check Support & Updates</h3>
                            <p>Regular updates, documentation, and customer support</p>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </section>

        <!-- ROI Calculator -->
        <section class="category-calculator">
            <h2>Calculate ROI for <?php echo esc_html($category_name); ?> Tools</h2>
            <?php echo do_shortcode('[ai_calculator title="' . $category_name . ' Tool ROI Calculator"]'); ?>
        </section>

        <!-- Category FAQ -->
        <section class="category-faq">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-grid">
                
                <?php if ($category_slug === 'writing' || $category_slug === 'ai-writing'): ?>
                    <div class="faq-item">
                        <h3>What makes AI writing tools different from regular writing software?</h3>
                        <p>AI writing tools use machine learning to generate human-like text, suggest improvements, and help overcome writer's block. They understand context and can adapt to different writing styles.</p>
                    </div>
                    <div class="faq-item">
                        <h3>Can AI writing tools replace human writers?</h3>
                        <p>AI tools are best used as assistants to enhance human creativity and productivity. They excel at generating drafts, ideas, and overcoming writer's block, but human oversight ensures quality and authenticity.</p>
                    </div>
                    <div class="faq-item">
                        <h3>How do I maintain my brand voice with AI writing tools?</h3>
                        <p>Many tools allow you to train them on your existing content or set specific tone guidelines. Start with AI-generated drafts and edit them to match your brand voice.</p>
                    </div>
                    <div class="faq-item">
                        <h3>Are AI-generated articles good for SEO?</h3>
                        <p>AI-generated content can be SEO-friendly when properly optimized and fact-checked. Focus on providing value to readers and follow SEO best practices regardless of how content is created.</p>
                    </div>
                
                <?php elseif ($category_slug === 'image-generation' || $category_slug === 'ai-images'): ?>
                    <div class="faq-item">
                        <h3>What resolution images can AI tools generate?</h3>
                        <p>Most AI image generators create images from 512x512 to 1024x1024 pixels. Some newer tools can generate higher resolutions up to 2048x2048 or use upscaling for larger images.</p>
                    </div>
                    <div class="faq-item">
                        <h3>Can I use AI-generated images commercially?</h3>
                        <p>Commercial usage rights vary by platform. Many paid plans include commercial rights, but always check the specific license terms before using images for business purposes.</p>
                    </div>
                    <div class="faq-item">
                        <h3>How do I write effective prompts for AI image generation?</h3>
                        <p>Be specific about style, composition, colors, and mood. Include artistic references, camera angles, and lighting conditions. Experiment with different prompt structures to get better results.</p>
                    </div>
                    <div class="faq-item">
                        <h3>Why do AI images sometimes look unrealistic?</h3>
                        <p>AI models are trained on existing images and may struggle with complex scenarios or uncommon combinations. The technology is rapidly improving, with newer models producing increasingly realistic results.</p>
                    </div>
                
                <?php else: ?>
                    <div class="faq-item">
                        <h3>How do I get started with <?php echo strtolower($category_name); ?> AI tools?</h3>
                        <p>Start with free trials or freemium plans to test different tools. Identify your specific use case and compare features that matter most to your workflow.</p>
                    </div>
                    <div class="faq-item">
                        <h3>What's the learning curve for these tools?</h3>
                        <p>Most modern AI tools are designed for ease of use. Basic functionality can be learned in hours, while advanced features may take weeks to master.</p>
                    </div>
                    <div class="faq-item">
                        <h3>How do I measure the ROI of AI tools?</h3>
                        <p>Track time saved, quality improvements, and cost reductions. Use our ROI calculator to estimate potential returns before making a purchase decision.</p>
                    </div>
                    <div class="faq-item">
                        <h3>Are these tools suitable for beginners?</h3>
                        <p>Yes, many <?php echo strtolower($category_name); ?> AI tools are beginner-friendly with intuitive interfaces, tutorials, and customer support to help you get started.</p>
                    </div>
                <?php endif; ?>
                
            </div>
        </section>

        <!-- Related Categories -->
        <section class="related-categories">
            <h2>Explore Related Categories</h2>
            <div class="related-grid">
                <?php
                $related_categories = get_terms(array(
                    'taxonomy' => 'ai_tool_category',
                    'exclude' => $current_term->term_id,
                    'number' => 4,
                    'hide_empty' => true,
                ));
                
                foreach ($related_categories as $related_cat): ?>
                    <a href="<?php echo get_term_link($related_cat); ?>" class="related-card">
                        <h3><?php echo esc_html($related_cat->name); ?></h3>
                        <p><?php echo $related_cat->count; ?> tools available</p>
                    </a>
                <?php endforeach; ?>
            </div>
        </section>

    </div>
</main>

<style>
.category-page {
    padding: 60px 0;
    background: #f8fafc;
}

.category-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 60px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.category-breadcrumb {
    margin-bottom: 20px;
    opacity: 0.9;
}

.category-breadcrumb a {
    color: white;
    text-decoration: none;
}

.category-breadcrumb a:hover {
    text-decoration: underline;
}

.category-breadcrumb span {
    margin: 0 10px;
}

.category-header h1 {
    font-size: 2.5rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.category-description {
    font-size: 1.1rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 40px;
}

.category-stats {
    display: flex;
    justify-content: center;
    gap: 60px;
}

.stat {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-number {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
}

.category-tools,
.category-comparison,
.category-guide,
.category-calculator,
.category-faq,
.related-categories {
    margin: 60px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.tools-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.tools-header h2 {
    font-size: 1.5rem;
    color: #1a202c;
    margin: 0;
}

.tools-filters select {
    padding: 10px 15px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    background: white;
    color: #4a5568;
    font-size: 0.9rem;
}

.category-comparison h2,
.category-guide h2,
.category-calculator h2,
.category-faq h2,
.related-categories h2 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2rem;
    color: #1a202c;
}

.guide-content {
    max-width: 800px;
    margin: 0 auto;
}

.guide-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.guide-step {
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #667eea;
}

.guide-step h3 {
    color: #667eea;
    margin-bottom: 15px;
    font-size: 1.1rem;
}

.guide-step p {
    color: #4a5568;
    line-height: 1.6;
    margin: 0;
}

.faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.faq-item {
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
}

.faq-item h3 {
    color: #667eea;
    margin-bottom: 15px;
    font-size: 1.1rem;
}

.faq-item p {
    color: #4a5568;
    line-height: 1.6;
    margin: 0;
}

.related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.related-card {
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    text-decoration: none;
    color: #1a202c;
    transition: all 0.3s;
    text-align: center;
    border: 2px solid transparent;
}

.related-card:hover {
    border-color: #667eea;
    transform: translateY(-3px);
}

.related-card h3 {
    margin-bottom: 10px;
    color: #667eea;
}

.related-card p {
    color: #64748b;
    margin: 0;
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .category-header h1 {
        font-size: 2rem;
    }
    
    .category-stats {
        gap: 30px;
    }
    
    .stat-number {
        font-size: 1.5rem;
    }
    
    .tools-header {
        flex-direction: column;
        gap: 20px;
    }
    
    .guide-steps {
        grid-template-columns: 1fr;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sort-tools');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // This would typically trigger an AJAX request to resort tools
            // For now, just show a loading indicator
            console.log('Sorting by:', this.value);
        });
    }
});
</script>

<?php
get_footer('ultra-premium');
?>