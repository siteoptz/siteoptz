<?php
/**
 * Template Name: Blog Page
 * Description: AI Tools Blog and News
 *
 * @package SiteOptz_Premium
 */

get_header('premium');

// Dynamic metadata
$page_title = 'AI Tools Blog - Latest News, Reviews & Guides | SiteOptz.ai';
$page_description = 'Stay updated with the latest AI tools news, in-depth reviews, and expert guides. Discover new AI technologies and implementation strategies.';
$canonical_url = home_url('/blog/');

// Add dynamic metadata
add_action('wp_head', function() use ($page_title, $page_description, $canonical_url) {
    echo '<title>' . esc_html($page_title) . '</title>' . "\n";
    echo '<meta name="description" content="' . esc_attr($page_description) . '">' . "\n";
    echo '<link rel="canonical" href="' . esc_url($canonical_url) . '">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($page_title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($page_description) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url($canonical_url) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
    
    // Schema markup for blog page
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'Blog',
        'name' => 'SiteOptz.ai Blog',
        'description' => $page_description,
        'url' => $canonical_url,
        'publisher' => array(
            '@type' => 'Organization',
            'name' => 'SiteOptz.ai',
            'url' => home_url()
        )
    );
    
    echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
});
?>

<main id="primary" class="site-main blog-page">
    <div class="container">
        
        <!-- Blog Header -->
        <header class="blog-header">
            <h1>AI Tools Blog</h1>
            <p>Latest news, reviews, and expert insights on AI tools and technologies</p>
            
            <div class="blog-stats">
                <div class="stat">
                    <span class="stat-number">500+</span>
                    <span class="stat-label">Articles</span>
                </div>
                <div class="stat">
                    <span class="stat-number">50K+</span>
                    <span class="stat-label">Readers</span>
                </div>
                <div class="stat">
                    <span class="stat-number">Weekly</span>
                    <span class="stat-label">Updates</span>
                </div>
            </div>
        </header>

        <!-- Blog Navigation -->
        <section class="blog-navigation">
            <div class="nav-tabs">
                <a href="#latest" class="nav-tab active">Latest</a>
                <a href="#reviews" class="nav-tab">Reviews</a>
                <a href="#guides" class="nav-tab">Guides</a>
                <a href="#news" class="nav-tab">Industry News</a>
            </div>
            
            <div class="blog-search">
                <input type="text" placeholder="Search articles..." />
                <button type="button">🔍</button>
            </div>
        </section>

        <!-- Featured Articles -->
        <section class="featured-articles">
            <h2>Featured Articles</h2>
            <div class="featured-grid">
                <article class="featured-post">
                    <div class="post-image">
                        <div class="placeholder-image"></div>
                    </div>
                    <div class="post-content">
                        <div class="post-category">AI Writing</div>
                        <h3>ChatGPT vs Claude: The Ultimate AI Writing Assistant Comparison 2024</h3>
                        <p>We tested 15 AI writing tools across 50+ use cases to determine the best choice for content creators, marketers, and businesses...</p>
                        <div class="post-meta">
                            <span class="author">by Sarah Chen</span>
                            <span class="date">Dec 10, 2024</span>
                            <span class="read-time">8 min read</span>
                        </div>
                    </div>
                </article>
                
                <article class="featured-post">
                    <div class="post-image">
                        <div class="placeholder-image"></div>
                    </div>
                    <div class="post-content">
                        <div class="post-category">Industry News</div>
                        <h3>OpenAI Announces GPT-5: What This Means for Business AI Tools</h3>
                        <p>Breaking down the latest AI developments and their impact on business productivity tools, cost considerations, and implementation strategies...</p>
                        <div class="post-meta">
                            <span class="author">by Mark Rodriguez</span>
                            <span class="date">Dec 8, 2024</span>
                            <span class="read-time">12 min read</span>
                        </div>
                    </div>
                </article>
            </div>
        </section>

        <!-- Latest Posts -->
        <section class="latest-posts">
            <h2>Latest Articles</h2>
            <div class="posts-grid">
                <?php
                $recent_posts = new WP_Query(array(
                    'post_type' => 'post',
                    'posts_per_page' => 12,
                    'post_status' => 'publish'
                ));
                
                if ($recent_posts->have_posts()) :
                    while ($recent_posts->have_posts()) : $recent_posts->the_post(); ?>
                        <article class="post-card">
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="post-image">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail('medium_large', array('loading' => 'lazy')); ?>
                                    </a>
                                </div>
                            <?php else : ?>
                                <div class="post-image">
                                    <div class="placeholder-image"></div>
                                </div>
                            <?php endif; ?>
                            
                            <div class="post-content">
                                <div class="post-category">
                                    <?php
                                    $categories = get_the_category();
                                    if (!empty($categories)) {
                                        echo esc_html($categories[0]->name);
                                    } else {
                                        echo 'AI Tools';
                                    }
                                    ?>
                                </div>
                                
                                <h3 class="post-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h3>
                                
                                <div class="post-excerpt">
                                    <?php echo wp_trim_words(get_the_excerpt(), 20); ?>
                                </div>
                                
                                <div class="post-meta">
                                    <span class="author">by <?php the_author(); ?></span>
                                    <span class="date"><?php echo get_the_date(); ?></span>
                                    <span class="read-time"><?php echo siteoptz_reading_time(); ?> min read</span>
                                </div>
                                
                                <a href="<?php the_permalink(); ?>" class="read-more">Read More →</a>
                            </div>
                        </article>
                    <?php endwhile;
                    wp_reset_postdata();
                else : ?>
                    <div class="sample-posts">
                        <!-- Sample blog posts when no real posts exist -->
                        <article class="post-card">
                            <div class="post-image">
                                <div class="placeholder-image"></div>
                            </div>
                            <div class="post-content">
                                <div class="post-category">AI Image</div>
                                <h3 class="post-title">
                                    <a href="#">Midjourney vs DALL-E 3: Which AI Image Generator is Worth Your Money?</a>
                                </h3>
                                <div class="post-excerpt">
                                    Comprehensive comparison of the two leading AI image generators, including pricing, features, and quality analysis...
                                </div>
                                <div class="post-meta">
                                    <span class="author">by Alex Kim</span>
                                    <span class="date">Dec 5, 2024</span>
                                    <span class="read-time">6 min read</span>
                                </div>
                                <a href="#" class="read-more">Read More →</a>
                            </div>
                        </article>
                        
                        <article class="post-card">
                            <div class="post-image">
                                <div class="placeholder-image"></div>
                            </div>
                            <div class="post-content">
                                <div class="post-category">Business</div>
                                <h3 class="post-title">
                                    <a href="#">ROI Calculator: How Much Money Can AI Tools Save Your Business?</a>
                                </h3>
                                <div class="post-excerpt">
                                    Real case studies and calculations showing the exact ROI potential of implementing AI tools in different business scenarios...
                                </div>
                                <div class="post-meta">
                                    <span class="author">by Jennifer Lee</span>
                                    <span class="date">Dec 3, 2024</span>
                                    <span class="read-time">10 min read</span>
                                </div>
                                <a href="#" class="read-more">Read More →</a>
                            </div>
                        </article>
                        
                        <article class="post-card">
                            <div class="post-image">
                                <div class="placeholder-image"></div>
                            </div>
                            <div class="post-content">
                                <div class="post-category">Guides</div>
                                <h3 class="post-title">
                                    <a href="#">The Complete Guide to AI Tool Implementation for Small Businesses</a>
                                </h3>
                                <div class="post-excerpt">
                                    Step-by-step guide to choosing, implementing, and measuring success with AI tools for businesses with limited budgets...
                                </div>
                                <div class="post-meta">
                                    <span class="author">by Michael Torres</span>
                                    <span class="date">Dec 1, 2024</span>
                                    <span class="read-time">15 min read</span>
                                </div>
                                <a href="#" class="read-more">Read More →</a>
                            </div>
                        </article>
                    </div>
                <?php endif; ?>
            </div>
            
            <!-- Pagination -->
            <nav class="pagination">
                <?php
                if ($recent_posts->have_posts()) {
                    echo paginate_links(array(
                        'total' => $recent_posts->max_num_pages,
                        'prev_text' => '← Previous',
                        'next_text' => 'Next →',
                        'mid_size' => 2
                    ));
                }
                ?>
            </nav>
        </section>

        <!-- Newsletter Signup -->
        <section class="newsletter-signup">
            <h2>Stay Updated with AI Trends</h2>
            <p>Get weekly insights on new AI tools, reviews, and industry updates</p>
            <form class="newsletter-form" action="#" method="post">
                <input type="email" placeholder="Enter your email" required>
                <button type="submit">Subscribe</button>
            </form>
        </section>

    </div>
</main>

<style>
.blog-page {
    padding: 60px 0;
    background: #f8fafc;
}

.blog-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.blog-header h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.blog-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 40px;
}

.blog-stats {
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

.blog-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 20px 30px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    margin-bottom: 40px;
}

.nav-tabs {
    display: flex;
    gap: 30px;
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

.blog-search {
    display: flex;
    background: #f8fafc;
    border-radius: 25px;
    overflow: hidden;
}

.blog-search input {
    padding: 12px 20px;
    border: none;
    outline: none;
    background: transparent;
    width: 250px;
}

.blog-search button {
    padding: 12px 15px;
    background: #667eea;
    color: white;
    border: none;
    cursor: pointer;
}

.featured-articles,
.latest-posts,
.newsletter-signup {
    margin: 60px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.featured-articles h2,
.latest-posts h2,
.newsletter-signup h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #1a202c;
    text-align: center;
}

.featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 40px;
}

.featured-post {
    display: flex;
    gap: 25px;
    padding: 30px;
    background: #f8fafc;
    border-radius: 16px;
    border: 2px solid #e2e8f0;
    transition: all 0.3s;
}

.featured-post:hover {
    border-color: #667eea;
    transform: translateY(-3px);
}

.post-image {
    flex-shrink: 0;
}

.post-image img,
.placeholder-image {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 12px;
    background: linear-gradient(135deg, #667eea, #764ba2);
}

.placeholder-image {
    background: linear-gradient(135deg, #667eea, #764ba2);
}

.post-category {
    background: #667eea;
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 10px;
}

.post-content h3 {
    margin-bottom: 10px;
    font-size: 1.1rem;
    line-height: 1.4;
}

.post-content h3 a {
    color: #1a202c;
    text-decoration: none;
}

.post-content h3 a:hover {
    color: #667eea;
}

.post-content p,
.post-excerpt {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 15px;
}

.post-meta {
    display: flex;
    gap: 15px;
    font-size: 0.9rem;
    color: #64748b;
    margin-bottom: 15px;
    flex-wrap: wrap;
}

.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
}

.post-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    transition: all 0.3s;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.post-card .post-image img,
.post-card .placeholder-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.post-card .post-content {
    padding: 25px;
}

.post-title {
    font-size: 1.25rem;
    margin-bottom: 10px;
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
    .blog-header h1 {
        font-size: 2rem;
    }
    
    .blog-navigation {
        flex-direction: column;
        gap: 20px;
    }
    
    .nav-tabs {
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
    }
    
    .blog-search input {
        width: 200px;
    }
    
    .featured-grid {
        grid-template-columns: 1fr;
    }
    
    .featured-post {
        flex-direction: column;
        text-align: center;
    }
    
    .posts-grid {
        grid-template-columns: 1fr;
    }
    
    .newsletter-form {
        flex-direction: column;
    }
}
</style>

<?php
get_footer('ultra-premium');
?>
