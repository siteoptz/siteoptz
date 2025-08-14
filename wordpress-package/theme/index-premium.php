<?php
/**
 * The main template file for SiteOptz.ai Premium Theme
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @package SiteOptz_Premium
 * @version 1.0.0
 */

get_header(); ?>

<main id="primary" class="site-main">
    
    <?php if (is_home() || is_front_page()) : ?>
        
        <!-- Hero Section -->
        <section class="siteoptz-hero">
            <div class="container">
                <div class="hero-content">
                    <div class="hero-badge">
                        <i class="fas fa-sparkles"></i> 
                        <?php echo esc_html(get_theme_mod('hero_badge_text', 'Trusted by 50,000+ Users')); ?>
                    </div>
                    
                    <h1 class="hero-title">
                        <?php 
                        $hero_title = get_theme_mod('hero_title', 'Find Your Perfect<br><span class="gradient-text">AI Tool</span>');
                        echo wp_kses($hero_title, array(
                            'br' => array(),
                            'span' => array('class' => array())
                        ));
                        ?>
                    </h1>
                    
                    <p class="hero-description">
                        <?php echo esc_html(get_theme_mod('hero_description', 'Compare 1000+ AI tools with data-driven insights, real-time pricing, and personalized recommendations. Make informed decisions for your business.')); ?>
                    </p>
                    
                    <div class="hero-actions">
                        <?php 
                        $primary_cta_text = get_theme_mod('hero_primary_cta_text', 'Explore AI Tools');
                        $primary_cta_url = get_theme_mod('hero_primary_cta_url', '#tools');
                        $secondary_cta_text = get_theme_mod('hero_secondary_cta_text', 'Watch Demo');
                        $secondary_cta_url = get_theme_mod('hero_secondary_cta_url', '#demo');
                        ?>
                        
                        <a href="<?php echo esc_url($primary_cta_url); ?>" class="hero-button-primary">
                            <i class="fas fa-search"></i>
                            <?php echo esc_html($primary_cta_text); ?>
                        </a>
                        <a href="<?php echo esc_url($secondary_cta_url); ?>" class="hero-button-secondary">
                            <i class="fas fa-play"></i>
                            <?php echo esc_html($secondary_cta_text); ?>
                        </a>
                    </div>
                    
                    <?php 
                    // Hero Stats
                    $show_stats = get_theme_mod('show_hero_stats', true);
                    if ($show_stats) :
                    ?>
                    <div class="hero-stats">
                        <div class="hero-stat">
                            <span class="hero-stat-number"><?php echo esc_html(get_theme_mod('stat_1_number', '1000+')); ?></span>
                            <span class="hero-stat-label"><?php echo esc_html(get_theme_mod('stat_1_label', 'AI Tools')); ?></span>
                        </div>
                        <div class="hero-stat">
                            <span class="hero-stat-number"><?php echo esc_html(get_theme_mod('stat_2_number', '50K+')); ?></span>
                            <span class="hero-stat-label"><?php echo esc_html(get_theme_mod('stat_2_label', 'Happy Users')); ?></span>
                        </div>
                        <div class="hero-stat">
                            <span class="hero-stat-number"><?php echo esc_html(get_theme_mod('stat_3_number', '24/7')); ?></span>
                            <span class="hero-stat-label"><?php echo esc_html(get_theme_mod('stat_3_label', 'Support')); ?></span>
                        </div>
                        <div class="hero-stat">
                            <span class="hero-stat-number"><?php echo esc_html(get_theme_mod('stat_4_number', '99.9%')); ?></span>
                            <span class="hero-stat-label"><?php echo esc_html(get_theme_mod('stat_4_label', 'Uptime')); ?></span>
                        </div>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </section>

        <!-- AI Categories Section -->
        <section class="ai-elements" id="tools">
            <div class="container">
                <div class="section-header">
                    <div class="section-badge">AI Categories</div>
                    <h2 class="section-title">Discover AI Tools by Category</h2>
                    <p class="section-subtitle">
                        Explore our comprehensive database of AI tools across different categories and use cases.
                    </p>
                </div>
                
                <?php
                // Display AI Tools Grid using shortcode
                echo do_shortcode('[siteoptz_tools_grid categories="all" per_page="6" show_filters="false"]');
                ?>
            </div>
        </section>

        <!-- Featured Comparison Section -->
        <section class="comparison-section" id="compare">
            <div class="container-wide">
                <div class="section-header">
                    <div class="section-badge">Popular Comparisons</div>
                    <h2 class="section-title">Compare Top AI Tools</h2>
                    <p class="section-subtitle">
                        Side-by-side comparison of the most popular AI tools with real-time pricing and feature analysis.
                    </p>
                </div>
                
                <?php
                // Display Comparison Table using shortcode
                echo do_shortcode('[siteoptz_comparison_table tools="chatgpt,claude,midjourney" columns="name,pricing,rating,features" sortable="true"]');
                ?>
            </div>
        </section>

        <!-- Pricing Calculator Section -->
        <section class="calculator-section" id="pricing">
            <div class="container">
                <div class="section-header">
                    <div class="section-badge">Cost Calculator</div>
                    <h2 class="section-title">Calculate Your AI Tool Costs</h2>
                    <p class="section-subtitle">
                        Get accurate pricing estimates based on your usage patterns and requirements.
                    </p>
                </div>
                
                <?php
                // Display Pricing Calculator using shortcode
                echo do_shortcode('[siteoptz_calculator show_email_capture="true" show_discount_codes="true"]');
                ?>
            </div>
        </section>

        <!-- Trust Indicators -->
        <section class="trust-section">
            <div class="container">
                <?php
                // Display Trust Band using shortcode
                echo do_shortcode('[siteoptz_trust_band type="logos" title="Trusted by Industry Leaders"]');
                ?>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="cta-section" id="get-started">
            <div class="container">
                <div class="cta-content">
                    <h2 class="cta-title">Ready to Find Your Perfect AI Tool?</h2>
                    <p class="cta-subtitle">
                        Join 50,000+ professionals who trust SiteOptz.ai for their AI tool decisions.
                    </p>
                    <div class="hero-actions">
                        <a href="<?php echo esc_url(get_permalink(get_page_by_path('tools'))); ?>" class="hero-button-primary">
                            <i class="fas fa-rocket"></i>
                            Start Comparing Now
                        </a>
                        <a href="<?php echo esc_url(get_permalink(get_page_by_path('contact'))); ?>" class="hero-button-secondary">
                            <i class="fas fa-calendar"></i>
                            Book a Demo
                        </a>
                    </div>
                </div>
            </div>
        </section>

    <?php else : ?>
        
        <!-- Standard WordPress Content -->
        <div class="content-area">
            <div class="container">
                
                <?php if (have_posts()) : ?>
                    
                    <?php if (is_archive() || is_search()) : ?>
                        <header class="page-header">
                            <h1 class="page-title">
                                <?php
                                if (is_category()) {
                                    echo 'Category: ' . single_cat_title('', false);
                                } elseif (is_tag()) {
                                    echo 'Tag: ' . single_tag_title('', false);
                                } elseif (is_search()) {
                                    echo 'Search Results for: ' . get_search_query();
                                } elseif (is_archive()) {
                                    the_archive_title();
                                }
                                ?>
                            </h1>
                            <?php if (is_category() || is_tag()) : ?>
                                <div class="page-description">
                                    <?php the_archive_description(); ?>
                                </div>
                            <?php endif; ?>
                        </header>
                    <?php endif; ?>

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
                                        <h2 class="entry-title">
                                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                        </h2>
                                        
                                        <div class="entry-meta">
                                            <span class="posted-on">
                                                <i class="fas fa-calendar-alt"></i>
                                                <?php echo get_the_date(); ?>
                                            </span>
                                            <span class="byline">
                                                <i class="fas fa-user"></i>
                                                <?php the_author(); ?>
                                            </span>
                                            <?php if (has_category()) : ?>
                                                <span class="cat-links">
                                                    <i class="fas fa-folder"></i>
                                                    <?php the_category(', '); ?>
                                                </span>
                                            <?php endif; ?>
                                        </div>
                                    </header>
                                    
                                    <div class="entry-summary">
                                        <?php the_excerpt(); ?>
                                    </div>
                                    
                                    <footer class="entry-footer">
                                        <a href="<?php the_permalink(); ?>" class="read-more">
                                            Read More <i class="fas fa-arrow-right"></i>
                                        </a>
                                    </footer>
                                </div>
                            </article>

                        <?php endwhile; ?>
                    </div>

                    <?php
                    // Pagination
                    the_posts_pagination(array(
                        'mid_size' => 2,
                        'prev_text' => '<i class="fas fa-chevron-left"></i> Previous',
                        'next_text' => 'Next <i class="fas fa-chevron-right"></i>',
                        'class' => 'pagination-wrapper'
                    ));
                    ?>

                <?php else : ?>
                    
                    <!-- No content found -->
                    <div class="no-content">
                        <div class="no-content-inner">
                            <i class="fas fa-search fa-3x text-muted mb-4"></i>
                            <h2>No Content Found</h2>
                            <p>Sorry, but nothing matched your search criteria. Please try again with different keywords.</p>
                            
                            <?php if (is_search()) : ?>
                                <div class="search-form-wrapper">
                                    <?php get_search_form(); ?>
                                </div>
                            <?php endif; ?>
                            
                            <a href="<?php echo esc_url(home_url('/')); ?>" class="hero-button-primary">
                                <i class="fas fa-home"></i>
                                Go to Homepage
                            </a>
                        </div>
                    </div>

                <?php endif; ?>
                
            </div>
        </div>

    <?php endif; ?>

</main>

<style>
/* Additional styles for WordPress content */
.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--space-8);
    margin: var(--space-8) 0;
}

.post-card {
    background: var(--gradient-card);
    border-radius: var(--radius-2xl);
    overflow: hidden;
    border: 1px solid var(--neutral-200);
    transition: all var(--transition-base);
    box-shadow: var(--shadow-base);
}

.post-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-2xl);
}

.post-thumbnail {
    position: relative;
    overflow: hidden;
}

.post-thumbnail img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: transform var(--transition-base);
    border-radius: 0;
}

.post-card:hover .post-thumbnail img {
    transform: scale(1.05);
}

.post-content {
    padding: var(--space-6);
}

.entry-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--space-3);
    line-height: 1.3;
}

.entry-title a {
    color: var(--neutral-900);
    text-decoration: none;
}

.entry-title a:hover {
    color: var(--brand-primary);
    text-decoration: none;
}

.entry-meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
    font-size: var(--text-sm);
    color: var(--neutral-500);
}

.entry-meta span {
    display: flex;
    align-items: center;
    gap: var(--space-1);
}

.entry-summary {
    color: var(--neutral-600);
    line-height: 1.6;
    margin-bottom: var(--space-4);
}

.read-more {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--brand-primary);
    font-weight: var(--font-medium);
    text-decoration: none;
    transition: all var(--transition-base);
}

.read-more:hover {
    color: var(--brand-primary-hover);
    transform: translateX(4px);
    text-decoration: none;
}

.pagination-wrapper {
    margin: var(--space-12) 0;
    text-align: center;
}

.pagination-wrapper .nav-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-2);
    flex-wrap: wrap;
}

.pagination-wrapper a,
.pagination-wrapper span {
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--neutral-300);
    border-radius: var(--radius-lg);
    text-decoration: none;
    transition: all var(--transition-base);
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.pagination-wrapper a {
    color: var(--neutral-600);
    background: var(--neutral-0);
}

.pagination-wrapper a:hover {
    background: var(--brand-primary);
    color: var(--neutral-0);
    border-color: var(--brand-primary);
    text-decoration: none;
}

.pagination-wrapper .current {
    background: var(--brand-primary);
    color: var(--neutral-0);
    border-color: var(--brand-primary);
}

.no-content {
    text-align: center;
    padding: var(--space-20) 0;
}

.no-content-inner {
    max-width: 500px;
    margin: 0 auto;
}

.no-content h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--space-4);
    color: var(--neutral-800);
}

.no-content p {
    color: var(--neutral-600);
    margin-bottom: var(--space-8);
    line-height: 1.6;
}

.search-form-wrapper {
    margin: var(--space-8) 0;
}

.search-form-wrapper input[type="search"] {
    width: 100%;
    max-width: 400px;
    padding: var(--space-4);
    border: 2px solid var(--neutral-300);
    border-radius: var(--radius-xl);
    font-size: var(--text-base);
    margin-bottom: var(--space-4);
}

.search-form-wrapper input[type="submit"] {
    background: var(--gradient-primary);
    color: var(--neutral-0);
    padding: var(--space-3) var(--space-6);
    border: none;
    border-radius: var(--radius-xl);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
}

.search-form-wrapper input[type="submit"]:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .posts-grid {
        grid-template-columns: 1fr;
        gap: var(--space-6);
    }
    
    .post-content {
        padding: var(--space-4);
    }
    
    .entry-meta {
        flex-direction: column;
        gap: var(--space-2);
    }
    
    .pagination-wrapper .nav-links {
        flex-direction: column;
        gap: var(--space-3);
    }
}
</style>

<?php get_footer(); ?>