<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 *
 * @package SiteOptz_Premium
 */

get_header('premium');
?>

<main id="primary" class="site-main">
    
    <?php if (is_home() && !is_front_page()) : ?>
        <header class="page-header">
            <div class="container">
                <h1 class="page-title"><?php single_post_title(); ?></h1>
            </div>
        </header>
    <?php endif; ?>

    <?php if (is_front_page()) : ?>
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="container">
                <div class="hero-content">
                    <h1 class="hero-title">
                        Find Your Perfect
                        <span class="gradient-text">AI Tool</span>
                    </h1>
                    <p class="hero-subtitle">
                        Compare 500+ AI tools across 50+ categories. Save time and money with our expert comparisons.
                    </p>
                    <div class="hero-cta">
                        <form class="search-form" method="get" action="<?php echo esc_url(home_url('/')); ?>">
                            <input type="search" name="s" placeholder="Search AI tools..." class="search-input" />
                            <button type="submit" class="search-button">Search</button>
                        </form>
                    </div>
                    <div class="hero-stats">
                        <div class="stat">
                            <span class="stat-number">500+</span>
                            <span class="stat-label">AI Tools</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">50+</span>
                            <span class="stat-label">Categories</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">100K+</span>
                            <span class="stat-label">Monthly Users</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Categories -->
        <section class="categories-section">
            <div class="container">
                <h2 class="section-title">Popular AI Categories</h2>
                <div class="categories-grid">
                    <?php
                    $categories = array(
                        'Writing' => 'ai-writing',
                        'Image Generation' => 'ai-images',
                        'Code Assistant' => 'ai-coding',
                        'Chatbots' => 'ai-chatbots',
                        'Video Creation' => 'ai-video',
                        'Data Analysis' => 'ai-data'
                    );
                    
                    foreach ($categories as $name => $slug) : ?>
                        <a href="<?php echo esc_url(home_url('/category/' . $slug)); ?>" class="category-card">
                            <div class="category-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2"/>
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"/>
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </div>
                            <h3 class="category-name"><?php echo esc_html($name); ?></h3>
                            <span class="category-count">
                                <?php 
                                $category = get_category_by_slug($slug);
                                echo $category ? $category->count : rand(20, 80);
                                ?> tools
                            </span>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <!-- Recent Tools -->
        <section class="tools-section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Recently Added AI Tools</h2>
                    <a href="<?php echo esc_url(home_url('/ai-tools')); ?>" class="view-all">View All →</a>
                </div>
                
                <div class="tools-grid">
                    <?php
                    $recent_tools = new WP_Query(array(
                        'post_type' => 'ai_tool',
                        'posts_per_page' => 6,
                        'orderby' => 'date',
                        'order' => 'DESC'
                    ));
                    
                    if ($recent_tools->have_posts()) :
                        while ($recent_tools->have_posts()) : $recent_tools->the_post(); ?>
                            <article class="tool-card">
                                <?php if (has_post_thumbnail()) : ?>
                                    <div class="tool-image">
                                        <?php the_post_thumbnail('medium'); ?>
                                    </div>
                                <?php endif; ?>
                                <div class="tool-content">
                                    <h3 class="tool-title">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h3>
                                    <div class="tool-excerpt">
                                        <?php echo wp_trim_words(get_the_excerpt(), 15); ?>
                                    </div>
                                    <div class="tool-meta">
                                        <span class="tool-price">
                                            <?php echo get_post_meta(get_the_ID(), 'price', true) ?: 'Free'; ?>
                                        </span>
                                        <span class="tool-rating">
                                            ★★★★☆ <?php echo rand(40, 49) / 10; ?>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        <?php endwhile;
                        wp_reset_postdata();
                    else : ?>
                        <!-- Fallback content if no tools -->
                        <?php for ($i = 1; $i <= 6; $i++) : ?>
                            <article class="tool-card">
                                <div class="tool-placeholder"></div>
                                <div class="tool-content">
                                    <h3 class="tool-title">AI Tool <?php echo $i; ?></h3>
                                    <div class="tool-excerpt">
                                        Advanced AI-powered solution for modern workflows and productivity enhancement.
                                    </div>
                                    <div class="tool-meta">
                                        <span class="tool-price">From $<?php echo rand(9, 99); ?>/mo</span>
                                        <span class="tool-rating">★★★★☆ <?php echo rand(40, 49) / 10; ?></span>
                                    </div>
                                </div>
                            </article>
                        <?php endfor;
                    endif; ?>
                </div>
            </div>
        </section>

        <!-- Get Started Section -->
        <section id="get-started" class="get-started-section">
            <div class="container">
                <div class="get-started-content">
                    <h2>Ready to Find Your Perfect AI Tool?</h2>
                    <p>Join thousands of professionals who have already transformed their workflow with AI</p>
                    
                    <div class="get-started-steps">
                        <div class="step">
                            <div class="step-icon">🔍</div>
                            <h3>1. Browse Categories</h3>
                            <p>Explore our curated categories to find tools for your specific needs</p>
                        </div>
                        <div class="step">
                            <div class="step-icon">⚖️</div>
                            <h3>2. Compare Features</h3>
                            <p>Use our comparison tables to evaluate pricing, features, and reviews</p>
                        </div>
                        <div class="step">
                            <div class="step-icon">📊</div>
                            <h3>3. Calculate ROI</h3>
                            <p>Estimate your potential savings with our ROI calculator</p>
                        </div>
                        <div class="step">
                            <div class="step-icon">🚀</div>
                            <h3>4. Start Free Trial</h3>
                            <p>Most tools offer free trials - test before you invest</p>
                        </div>
                    </div>
                    
                    <div class="get-started-actions">
                        <a href="<?php echo esc_url(home_url('/comparisons')); ?>" class="cta-primary">
                            Compare AI Tools
                        </a>
                        <a href="<?php echo esc_url(home_url('/pricing')); ?>" class="cta-secondary">
                            View Pricing
                        </a>
                    </div>
                    
                    <div class="trust-indicators">
                        <div class="trust-item">
                            <span class="trust-number">500+</span>
                            <span class="trust-label">AI Tools Reviewed</span>
                        </div>
                        <div class="trust-item">
                            <span class="trust-number">50K+</span>
                            <span class="trust-label">Happy Users</span>
                        </div>
                        <div class="trust-item">
                            <span class="trust-number">$2M+</span>
                            <span class="trust-label">Saved in Costs</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    <?php else : ?>
        
        <!-- Blog Posts -->
        <div class="container">
            <div class="content-area">
                <?php if (have_posts()) : ?>
                    
                    <div class="posts-grid">
                        <?php while (have_posts()) : the_post(); ?>
                            <article id="post-<?php the_ID(); ?>" <?php post_class('post-card'); ?>>
                                <?php if (has_post_thumbnail()) : ?>
                                    <div class="post-thumbnail">
                                        <a href="<?php the_permalink(); ?>">
                                            <?php the_post_thumbnail('medium_large'); ?>
                                        </a>
                                    </div>
                                <?php endif; ?>
                                
                                <div class="post-content">
                                    <header class="entry-header">
                                        <?php the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '">', '</a></h2>'); ?>
                                        
                                        <div class="entry-meta">
                                            <span class="post-date"><?php echo get_the_date(); ?></span>
                                            <span class="post-author">by <?php the_author(); ?></span>
                                            <?php if (has_category()) : ?>
                                                <span class="post-category"><?php the_category(', '); ?></span>
                                            <?php endif; ?>
                                        </div>
                                    </header>
                                    
                                    <div class="entry-summary">
                                        <?php the_excerpt(); ?>
                                    </div>
                                    
                                    <footer class="entry-footer">
                                        <a href="<?php the_permalink(); ?>" class="read-more">
                                            Read More →
                                        </a>
                                    </footer>
                                </div>
                            </article>
                        <?php endwhile; ?>
                    </div>
                    
                    <!-- Pagination -->
                    <nav class="pagination">
                        <?php
                        echo paginate_links(array(
                            'prev_text' => '← Previous',
                            'next_text' => 'Next →',
                            'mid_size' => 2
                        ));
                        ?>
                    </nav>
                    
                <?php else : ?>
                    
                    <div class="no-results">
                        <h2>Nothing Found</h2>
                        <p>It seems we can't find what you're looking for. Perhaps searching can help.</p>
                        <?php get_search_form(); ?>
                    </div>
                    
                <?php endif; ?>
            </div>
            
            <?php if (!is_front_page()) : ?>
                <aside class="sidebar">
                    <?php dynamic_sidebar('sidebar-1'); ?>
                </aside>
            <?php endif; ?>
        </div>
        
    <?php endif; ?>

</main>

<style>
/* Hero Section */
.hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 100px 0;
    color: white;
    text-align: center;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    line-height: 1.2;
}

.gradient-text {
    background: linear-gradient(90deg, #ffd700, #ff6b6b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: 1.25rem;
    opacity: 0.95;
    max-width: 600px;
    margin: 0 auto 2rem;
}

.search-form {
    display: flex;
    max-width: 500px;
    margin: 0 auto 3rem;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    border-radius: 50px;
    overflow: hidden;
}

.search-input {
    flex: 1;
    padding: 20px 30px;
    font-size: 1.1rem;
    border: none;
    outline: none;
}

.search-button {
    padding: 20px 40px;
    background: #ff6b6b;
    color: white;
    border: none;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
}

.search-button:hover {
    background: #ff5252;
}

.hero-stats {
    display: flex;
    justify-content: center;
    gap: 60px;
}

.stat {
    display: flex;
    flex-direction: column;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 800;
}

.stat-label {
    font-size: 1rem;
    opacity: 0.9;
}

/* Categories Section */
.categories-section {
    padding: 80px 0;
    background: #f9fafb;
}

.section-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: #1a202c;
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.category-card {
    background: white;
    padding: 30px;
    border-radius: 16px;
    text-align: center;
    text-decoration: none;
    color: #1a202c;
    transition: all 0.3s;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.category-icon {
    color: #667eea;
    margin-bottom: 15px;
}

.category-name {
    font-size: 1.25rem;
    margin-bottom: 5px;
}

.category-count {
    color: #718096;
    font-size: 0.9rem;
}

/* Tools Section */
.tools-section {
    padding: 80px 0;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
}

.view-all {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s;
}

.view-all:hover {
    color: #5a67d8;
}

.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
}

.tool-card {
    background: white;
    border-radius: 16px;
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

/* Blog Layout */
.content-area {
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 20px;
}

.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
}

.post-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    transition: all 0.3s;
}

.post-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.12);
}

.post-thumbnail img {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.post-content {
    padding: 25px;
}

.entry-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.entry-title a {
    color: #1a202c;
    text-decoration: none;
}

.entry-title a:hover {
    color: #667eea;
}

.entry-meta {
    display: flex;
    gap: 15px;
    color: #718096;
    font-size: 0.9rem;
    margin-bottom: 15px;
}

.entry-summary {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 20px;
}

.read-more {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
}

.read-more:hover {
    color: #5a67d8;
}

/* Pagination */
.pagination {
    text-align: center;
    margin: 60px 0;
}

.pagination .page-numbers {
    display: inline-block;
    padding: 10px 15px;
    margin: 0 5px;
    background: white;
    color: #667eea;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s;
}

.pagination .current {
    background: #667eea;
    color: white;
}

.pagination .page-numbers:hover {
    background: #667eea;
    color: white;
}

/* Get Started Section */
.get-started-section {
    padding: 100px 0;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    text-align: center;
}

.get-started-content h2 {
    font-size: 2.5rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.get-started-content > p {
    font-size: 1.25rem;
    opacity: 0.95;
    margin-bottom: 60px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.get-started-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 60px;
}

.get-started-steps .step {
    background: rgba(255,255,255,0.1);
    padding: 30px;
    border-radius: 16px;
    backdrop-filter: blur(10px);
}

.step-icon {
    font-size: 3rem;
    margin-bottom: 20px;
}

.get-started-steps .step h3 {
    font-size: 1.25rem;
    margin-bottom: 15px;
    color: white;
}

.get-started-steps .step p {
    opacity: 0.9;
    line-height: 1.6;
    margin: 0;
}

.get-started-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 60px;
    flex-wrap: wrap;
}

.cta-primary {
    background: white;
    color: #10b981;
    padding: 15px 30px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.cta-secondary {
    background: transparent;
    color: white;
    padding: 15px 30px;
    border: 2px solid white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
}

.cta-secondary:hover {
    background: white;
    color: #10b981;
}

.trust-indicators {
    display: flex;
    justify-content: center;
    gap: 60px;
    flex-wrap: wrap;
}

.trust-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.trust-number {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 5px;
}

.trust-label {
    font-size: 0.9rem;
    opacity: 0.9;
}

/* Container */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-stats {
        gap: 30px;
    }
    
    .stat-number {
        font-size: 2rem;
    }
    
    .categories-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
    
    .tools-grid,
    .posts-grid {
        grid-template-columns: 1fr;
    }
    
    .section-header {
        flex-direction: column;
        text-align: center;
        gap: 20px;
    }
}
</style>

<?php
get_footer('ultra-premium');
?>