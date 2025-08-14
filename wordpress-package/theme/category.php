<?php
/**
 * The template for displaying category archives (text-generation, image-creation, etc.)
 *
 * @package SiteOptz_Premium
 */

get_header('premium');

$current_category = get_queried_object();
$category_name = $current_category->name;
$category_slug = $current_category->slug;
$category_description = $current_category->description;

// Dynamic metadata based on category
$page_title = $category_name . ' AI Tools - Complete Guide & Reviews | SiteOptz.ai';
$page_description = 'Discover the best ' . strtolower($category_name) . ' AI tools. Compare features, pricing, and reviews. Expert analysis and buying guides for ' . $category_name . ' solutions.';
$canonical_url = get_category_link($current_category->term_id);

// Add dynamic metadata
add_action('wp_head', function() use ($page_title, $page_description, $canonical_url, $category_name) {
    echo '<title>' . esc_html($page_title) . '</title>' . "\n";
    echo '<meta name="description" content="' . esc_attr($page_description) . '">' . "\n";
    echo '<link rel="canonical" href="' . esc_url($canonical_url) . '">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($page_title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($page_description) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url($canonical_url) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
    echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($page_title) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($page_description) . '">' . "\n";
    
    // Schema markup for category pages
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'CollectionPage',
        'name' => $category_name . ' AI Tools',
        'description' => $page_description,
        'url' => $canonical_url,
        'breadcrumb' => array(
            '@type' => 'BreadcrumbList',
            'itemListElement' => array(
                array(
                    '@type' => 'ListItem',
                    'position' => 1,
                    'name' => 'Home',
                    'item' => home_url()
                ),
                array(
                    '@type' => 'ListItem',
                    'position' => 2,
                    'name' => 'AI Tools',
                    'item' => home_url('/ai-tools/')
                ),
                array(
                    '@type' => 'ListItem',
                    'position' => 3,
                    'name' => $category_name,
                    'item' => $canonical_url
                )
            )
        )
    );
    
    echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
});
?>

<main id="primary" class="site-main category-page">
    <div class="container">
        
        <!-- Category Header -->
        <header class="category-header">
            <!-- TEST: If you see this, category.php is being used -->
            <div style="background: red; color: white; padding: 10px; text-align: center;">
                TEST MODE: Category page is working
            </div>
            <div class="category-breadcrumb">
                <a href="<?php echo home_url(); ?>">Home</a> 
                <span>→</span> 
                <a href="<?php echo home_url('/blog'); ?>">Blog</a> 
                <span>→</span> 
                <span><?php echo esc_html($category_name); ?></span>
            </div>
            
            <h1><?php echo esc_html($category_name); ?> AI Tools</h1>
            
            <?php if ($category_description): ?>
                <p class="category-description"><?php echo esc_html($category_description); ?></p>
            <?php else: ?>
                <p class="category-description">
                    <?php echo siteoptz_get_category_description($category_slug); ?>
                </p>
            <?php endif; ?>
            
            <div class="category-stats">
                <div class="stat">
                    <span class="stat-number"><?php echo $current_category->count; ?></span>
                    <span class="stat-label">Articles</span>
                </div>
                <div class="stat">
                    <span class="stat-number">50+</span>
                    <span class="stat-label">Tools Reviewed</span>
                </div>
                <div class="stat">
                    <span class="stat-number">4.8★</span>
                    <span class="stat-label">Expert Rating</span>
                </div>
            </div>
        </header>

        <!-- Category Navigation -->
        <section class="category-navigation">
            <div class="nav-tabs">
                <a href="#overview" class="nav-tab active" data-target="overview">Overview</a>
                <a href="#tools" class="nav-tab" data-target="tools">Top Tools</a>
                <a href="#comparisons" class="nav-tab" data-target="comparisons">Comparisons</a>
                <a href="#guides" class="nav-tab" data-target="guides">Guides</a>
                <a href="#faq" class="nav-tab" data-target="faq">FAQ</a>
            </div>
        </section>

        <!-- Category Overview -->
        <section id="overview" class="category-overview">
            <div class="overview-content">
                <div class="overview-text">
                    <?php echo siteoptz_get_category_overview($category_slug); ?>
                </div>
                <div class="overview-quick-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="<?php echo home_url('/comparisons/?category=' . $category_slug); ?>">Compare Tools</a></li>
                        <li><a href="<?php echo home_url('/pricing/?category=' . $category_slug); ?>">Pricing Guide</a></li>
                        <li><a href="<?php echo home_url('/calculator/?category=' . $category_slug); ?>">ROI Calculator</a></li>
                        <li><a href="#faq">Frequently Asked Questions</a></li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Top Tools Section -->
        <section id="tools" class="top-tools-section">
            <h2>Best <?php echo esc_html($category_name); ?> AI Tools</h2>
            <div class="tools-grid">
                <?php echo siteoptz_get_category_tools($category_slug, 6); ?>
            </div>
            <div class="view-all-tools">
                <a href="<?php echo home_url('/ai-tools/?category=' . $category_slug); ?>" class="view-all-btn">
                    View All <?php echo esc_html($category_name); ?> Tools →
                </a>
            </div>
        </section>

        <!-- Comparisons Section -->
        <section id="comparisons" class="comparisons-section">
            <h2><?php echo esc_html($category_name); ?> Tools Comparison</h2>
            <p>Compare the leading tools in this category side by side</p>
            
            <?php echo siteoptz_get_category_comparison($category_slug); ?>
            
            <div class="comparison-cta">
                <a href="<?php echo home_url('/comparisons/?category=' . $category_slug); ?>" class="cta-btn">
                    View Detailed Comparison
                </a>
            </div>
        </section>

        <!-- Latest Articles -->
        <section id="guides" class="latest-articles">
            <h2>Latest <?php echo esc_html($category_name); ?> Guides</h2>
            
            <div class="articles-grid">
                <?php if (have_posts()) : ?>
                    <?php while (have_posts()) : the_post(); ?>
                        <article class="article-card">
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="article-image">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail('medium_large', array('loading' => 'lazy', 'alt' => get_the_title())); ?>
                                    </a>
                                </div>
                            <?php endif; ?>
                            
                            <div class="article-content">
                                <header class="article-header">
                                    <h3 class="article-title">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h3>
                                    
                                    <div class="article-meta">
                                        <span class="article-date"><?php echo get_the_date(); ?></span>
                                        <span class="article-author">by <?php the_author(); ?></span>
                                        <span class="reading-time"><?php echo siteoptz_reading_time(); ?> min read</span>
                                    </div>
                                </header>
                                
                                <div class="article-excerpt">
                                    <?php the_excerpt(); ?>
                                </div>
                                
                                <footer class="article-footer">
                                    <a href="<?php the_permalink(); ?>" class="read-more">Read More →</a>
                                </footer>
                            </div>
                        </article>
                    <?php endwhile; ?>
                <?php else : ?>
                    <div class="no-posts">
                        <h3>No articles yet in this category</h3>
                        <p>We're working on comprehensive guides for <?php echo strtolower($category_name); ?>. Check back soon!</p>
                    </div>
                <?php endif; ?>
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
        </section>

        <!-- Category FAQ -->
        <section id="faq" class="category-faq">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-container">
                <?php echo siteoptz_get_category_faq($category_slug); ?>
            </div>
        </section>

        <!-- Related Categories -->
        <section class="related-categories">
            <h2>Related Categories</h2>
            <div class="related-grid">
                <?php
                $related_categories = get_categories(array(
                    'exclude' => $current_category->term_id,
                    'number' => 4,
                    'hide_empty' => false,
                ));
                
                foreach ($related_categories as $related_cat): ?>
                    <a href="<?php echo get_category_link($related_cat); ?>" class="related-card">
                        <h3><?php echo esc_html($related_cat->name); ?></h3>
                        <p><?php echo $related_cat->count; ?> articles</p>
                    </a>
                <?php endforeach; ?>
            </div>
        </section>

        <!-- Newsletter Signup -->
        <section class="newsletter-signup">
            <h2>Stay Updated on <?php echo esc_html($category_name); ?></h2>
            <p>Get the latest news, reviews, and guides delivered to your inbox</p>
            <form class="newsletter-form" action="#" method="post">
                <input type="email" placeholder="Enter your email" required>
                <button type="submit">Subscribe</button>
            </form>
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
    padding: 80px 0;
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
    line-height: 1.6;
}

.category-stats {
    display: flex;
    justify-content: center;
    gap: 60px;
    flex-wrap: wrap;
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

.category-navigation {
    background: white;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 40px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.nav-tabs {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
}

.nav-tab {
    padding: 12px 24px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 25px;
    color: #64748b;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s;
}

.nav-tab:hover,
.nav-tab.active {
    background: #667eea;
    border-color: #667eea;
    color: white;
}

.category-overview,
.top-tools-section,
.comparisons-section,
.latest-articles,
.category-faq,
.related-categories,
.newsletter-signup {
    margin: 60px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.overview-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;
    align-items: start;
}

.overview-text {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4a5568;
}

.overview-quick-links {
    background: #f8fafc;
    padding: 30px;
    border-radius: 12px;
}

.overview-quick-links h3 {
    margin-bottom: 20px;
    color: #667eea;
}

.overview-quick-links ul {
    list-style: none;
    padding: 0;
}

.overview-quick-links li {
    margin: 12px 0;
}

.overview-quick-links a {
    color: #4a5568;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
}

.overview-quick-links a:hover {
    color: #667eea;
}

.top-tools-section h2,
.comparisons-section h2,
.latest-articles h2,
.category-faq h2,
.related-categories h2,
.newsletter-signup h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #1a202c;
    text-align: center;
}

.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 30px;
}

.view-all-tools {
    text-align: center;
}

.view-all-btn {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: color 0.3s;
}

.view-all-btn:hover {
    color: #5a67d8;
}

.comparisons-section p {
    text-align: center;
    color: #64748b;
    margin-bottom: 30px;
}

.comparison-cta {
    text-align: center;
    margin-top: 30px;
}

.cta-btn {
    background: #667eea;
    color: white;
    padding: 15px 30px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.3s;
}

.cta-btn:hover {
    background: #5a67d8;
}

.articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
}

.article-card {
    background: #f8fafc;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s;
}

.article-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.article-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.article-content {
    padding: 25px;
}

.article-title {
    margin-bottom: 10px;
    font-size: 1.25rem;
}

.article-title a {
    color: #1a202c;
    text-decoration: none;
}

.article-title a:hover {
    color: #667eea;
}

.article-meta {
    display: flex;
    gap: 15px;
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 15px;
    flex-wrap: wrap;
}

.article-excerpt {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 20px;
}

.read-more {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s;
}

.read-more:hover {
    color: #5a67d8;
}

.no-posts {
    text-align: center;
    padding: 60px;
    color: #64748b;
}

.pagination {
    text-align: center;
    margin: 40px 0;
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

.newsletter-signup {
    text-align: center;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
}

.newsletter-signup h2 {
    color: white;
    margin-bottom: 15px;
}

.newsletter-signup p {
    opacity: 0.9;
    margin-bottom: 30px;
}

.newsletter-form {
    display: flex;
    max-width: 400px;
    margin: 0 auto;
    gap: 10px;
}

.newsletter-form input {
    flex: 1;
    padding: 15px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
}

.newsletter-form button {
    background: white;
    color: #10b981;
    padding: 15px 25px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.newsletter-form button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
    .category-header h1 {
        font-size: 2rem;
    }
    
    .category-stats {
        gap: 30px;
    }
    
    .nav-tabs {
        justify-content: center;
        gap: 10px;
    }
    
    .nav-tab {
        padding: 8px 16px;
        font-size: 0.9rem;
    }
    
    .overview-content {
        grid-template-columns: 1fr;
    }
    
    .articles-grid {
        grid-template-columns: 1fr;
    }
    
    .newsletter-form {
        flex-direction: column;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    console.log('Category page JavaScript loaded');
    
    // Handle navigation tab clicks
    const navTabs = document.querySelectorAll('.nav-tab');
    console.log('Found nav tabs:', navTabs.length);
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Tab clicked:', this.getAttribute('href'));
            
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            console.log('Target section found:', !!targetSection);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL hash
                window.location.hash = targetId;
            }
        });
    });
    
    // Handle direct hash navigation (when visiting URL with hash)
    function handleHashNavigation() {
        const hash = window.location.hash;
        console.log('Current hash:', hash);
        
        if (hash) {
            const targetSection = document.querySelector(hash);
            const activeTab = document.querySelector('.nav-tab[href="' + hash + '"]');
            
            if (targetSection && activeTab) {
                // Remove active from all tabs
                navTabs.forEach(t => t.classList.remove('active'));
                
                // Add active to target tab
                activeTab.classList.add('active');
                
                // Scroll to section after a brief delay
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        }
    }
    
    // Handle hash navigation on page load
    setTimeout(handleHashNavigation, 500);
    
    // Handle hash changes (back/forward navigation)
    window.addEventListener('hashchange', handleHashNavigation);
});
</script>
</style>

<?php
get_footer('ultra-premium');
?>