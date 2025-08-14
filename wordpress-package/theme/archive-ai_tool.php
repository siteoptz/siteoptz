<?php
/**
 * The template for displaying AI Tools archive
 *
 * @package SiteOptz_Premium
 */

get_header('premium');
?>

<main id="primary" class="site-main ai-tools-archive">
    <div class="container">
        
        <!-- Archive Header -->
        <header class="archive-header">
            <h1>AI Tools Directory</h1>
            <p>Discover and compare 500+ AI tools across 50+ categories. Find the perfect solution for your business needs.</p>
            
            <div class="archive-stats">
                <div class="stat">
                    <span class="stat-number"><?php echo wp_count_posts('ai_tool')->publish; ?></span>
                    <span class="stat-label">AI Tools</span>
                </div>
                <div class="stat">
                    <span class="stat-number"><?php echo wp_count_terms('ai_tool_category'); ?></span>
                    <span class="stat-label">Categories</span>
                </div>
                <div class="stat">
                    <span class="stat-number">4.5★</span>
                    <span class="stat-label">Avg Rating</span>
                </div>
                <div class="stat">
                    <span class="stat-number">Free-$500</span>
                    <span class="stat-label">Price Range</span>
                </div>
            </div>
        </header>

        <!-- Search and Filters -->
        <section class="tools-filters">
            <div class="filters-row">
                <div class="search-box">
                    <input type="text" id="tools-search" placeholder="Search AI tools..." />
                    <button type="button">🔍</button>
                </div>
                
                <div class="filter-group">
                    <select id="category-filter">
                        <option value="">All Categories</option>
                        <?php
                        $categories = get_terms(array(
                            'taxonomy' => 'ai_tool_category',
                            'hide_empty' => true,
                        ));
                        foreach ($categories as $category) {
                            echo '<option value="' . $category->slug . '">' . $category->name . '</option>';
                        }
                        ?>
                    </select>
                </div>
                
                <div class="filter-group">
                    <select id="price-filter">
                        <option value="">All Prices</option>
                        <option value="free">Free</option>
                        <option value="budget">Budget ($1-20)</option>
                        <option value="professional">Professional ($20-100)</option>
                        <option value="enterprise">Enterprise ($100+)</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <select id="sort-filter">
                        <option value="popularity">Sort by Popularity</option>
                        <option value="rating">Highest Rated</option>
                        <option value="name">Alphabetical</option>
                        <option value="newest">Newest First</option>
                    </select>
                </div>
            </div>
        </section>

        <!-- Featured Tools -->
        <section class="featured-tools">
            <h2>🔥 Featured AI Tools</h2>
            <div class="featured-grid">
                <?php
                $featured_tools = new WP_Query(array(
                    'post_type' => 'ai_tool',
                    'posts_per_page' => 3,
                    'meta_key' => '_ai_tool_rating',
                    'orderby' => 'meta_value_num',
                    'order' => 'DESC'
                ));
                
                if ($featured_tools->have_posts()) :
                    while ($featured_tools->have_posts()) : $featured_tools->the_post(); ?>
                        <div class="featured-tool">
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="tool-image">
                                    <?php the_post_thumbnail('medium'); ?>
                                </div>
                            <?php else : ?>
                                <div class="tool-placeholder"></div>
                            <?php endif; ?>
                            
                            <div class="tool-content">
                                <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                                <p><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                                
                                <div class="tool-meta">
                                    <span class="price"><?php echo get_post_meta(get_the_ID(), '_ai_tool_price', true) ?: 'Free'; ?></span>
                                    <span class="rating">
                                        <?php 
                                        $rating = get_post_meta(get_the_ID(), '_ai_tool_rating', true);
                                        if ($rating) {
                                            for ($i = 1; $i <= 5; $i++) {
                                                echo $i <= floatval($rating) ? '★' : '☆';
                                            }
                                            echo ' ' . $rating;
                                        }
                                        ?>
                                    </span>
                                </div>
                                
                                <div class="tool-categories">
                                    <?php
                                    $terms = get_the_terms(get_the_ID(), 'ai_tool_category');
                                    if ($terms && !is_wp_error($terms)) {
                                        foreach ($terms as $term) {
                                            echo '<span class="category-tag">' . $term->name . '</span>';
                                        }
                                    }
                                    ?>
                                </div>
                            </div>
                        </div>
                    <?php endwhile;
                    wp_reset_postdata();
                endif;
                ?>
            </div>
        </section>

        <!-- Categories Section -->
        <section class="categories-section">
            <h2>Browse by Category</h2>
            <div class="categories-grid">
                <?php
                $categories = get_terms(array(
                    'taxonomy' => 'ai_tool_category',
                    'hide_empty' => true,
                ));
                
                foreach ($categories as $category) : ?>
                    <a href="<?php echo get_term_link($category); ?>" class="category-card">
                        <div class="category-info">
                            <h3><?php echo $category->name; ?></h3>
                            <p><?php echo $category->count; ?> tools</p>
                        </div>
                        <div class="category-arrow">→</div>
                    </a>
                <?php endforeach; ?>
            </div>
        </section>

        <!-- All Tools Grid -->
        <section class="all-tools">
            <div class="section-header">
                <h2>All AI Tools</h2>
                <div class="view-toggle">
                    <button class="view-btn active" data-view="grid">⊞ Grid</button>
                    <button class="view-btn" data-view="list">☰ List</button>
                </div>
            </div>
            
            <div id="tools-container" class="tools-grid">
                <?php if (have_posts()) : ?>
                    <?php while (have_posts()) : the_post(); ?>
                        <article class="tool-card" data-price="<?php echo strtolower(get_post_meta(get_the_ID(), '_ai_tool_price', true)); ?>">
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="tool-image">
                                    <?php the_post_thumbnail('medium'); ?>
                                </div>
                            <?php else : ?>
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
                                    <span class="tool-price">
                                        <?php echo get_post_meta(get_the_ID(), '_ai_tool_price', true) ?: 'Free'; ?>
                                    </span>
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
                                </div>
                                
                                <div class="tool-categories">
                                    <?php
                                    $terms = get_the_terms(get_the_ID(), 'ai_tool_category');
                                    if ($terms && !is_wp_error($terms)) {
                                        foreach ($terms as $term) {
                                            echo '<span class="category-tag">' . $term->name . '</span>';
                                        }
                                    }
                                    ?>
                                </div>
                                
                                <a href="<?php the_permalink(); ?>" class="tool-cta">Learn More →</a>
                            </div>
                        </article>
                    <?php endwhile; ?>
                <?php else : ?>
                    <p>No AI tools found.</p>
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

        <!-- CTA Section -->
        <section class="cta-section">
            <h2>Can't Find What You're Looking For?</h2>
            <p>Submit a tool request and we'll review it for inclusion in our directory</p>
            <div class="cta-actions">
                <a href="<?php echo esc_url(home_url('/submit-tool')); ?>" class="cta-primary">Submit a Tool</a>
                <a href="<?php echo esc_url(home_url('/contact')); ?>" class="cta-secondary">Contact Us</a>
            </div>
        </section>

    </div>
</main>

<style>
.ai-tools-archive {
    padding: 60px 0;
    background: #f8fafc;
}

.archive-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.archive-header h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.archive-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 40px;
}

.archive-stats {
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

.tools-filters {
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    margin-bottom: 40px;
}

.filters-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 20px;
    align-items: center;
}

.search-box {
    display: flex;
    background: #f8fafc;
    border-radius: 50px;
    overflow: hidden;
}

.search-box input {
    flex: 1;
    padding: 15px 25px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1rem;
}

.search-box button {
    padding: 15px 20px;
    background: #667eea;
    color: white;
    border: none;
    cursor: pointer;
}

.filter-group select {
    width: 100%;
    padding: 15px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    background: white;
    font-size: 0.95rem;
}

.featured-tools,
.categories-section,
.all-tools,
.cta-section {
    margin: 60px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.featured-tools h2,
.categories-section h2,
.all-tools h2,
.cta-section h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #1a202c;
}

.featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
}

.featured-tool {
    display: flex;
    gap: 20px;
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    transition: all 0.3s;
}

.featured-tool:hover {
    border-color: #667eea;
    transform: translateY(-3px);
}

.tool-image img,
.tool-placeholder {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    background: linear-gradient(135deg, #667eea, #764ba2);
}

.tool-content h3 {
    margin-bottom: 10px;
    font-size: 1.1rem;
}

.tool-content h3 a {
    color: #1a202c;
    text-decoration: none;
}

.tool-content h3 a:hover {
    color: #667eea;
}

.tool-content p {
    color: #4a5568;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 15px;
}

.tool-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 0.9rem;
}

.price {
    font-weight: 600;
    color: #667eea;
}

.rating {
    color: #fbbf24;
}

.tool-categories {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.category-tag {
    background: #e2e8f0;
    color: #4a5568;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.category-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    text-decoration: none;
    color: #1a202c;
    transition: all 0.3s;
    border: 2px solid transparent;
}

.category-card:hover {
    border-color: #667eea;
    transform: translateY(-3px);
}

.category-info h3 {
    margin-bottom: 5px;
    color: #667eea;
}

.category-info p {
    color: #64748b;
    font-size: 0.9rem;
    margin: 0;
}

.category-arrow {
    font-size: 1.5rem;
    color: #667eea;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.view-toggle {
    display: flex;
    gap: 10px;
}

.view-btn {
    padding: 8px 16px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
}

.view-btn.active {
    background: #667eea;
    border-color: #667eea;
    color: white;
}

.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
}

.tools-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.tool-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    transition: all 0.3s;
}

.tool-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.tool-card .tool-image img,
.tool-card .tool-placeholder {
    width: 100%;
    height: 200px;
    object-fit: cover;
    background: linear-gradient(135deg, #667eea, #764ba2);
}

.tool-card .tool-content {
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

.tool-card .tool-meta {
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

.tool-card .tool-categories {
    margin-bottom: 20px;
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

.cta-section {
    text-align: center;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
}

.cta-section h2 {
    color: white;
    margin-bottom: 15px;
}

.cta-section p {
    opacity: 0.9;
    margin-bottom: 30px;
}

.cta-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
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

@media (max-width: 768px) {
    .archive-header h1 {
        font-size: 2rem;
    }
    
    .archive-stats {
        gap: 30px;
    }
    
    .filters-row {
        grid-template-columns: 1fr;
    }
    
    .tools-grid {
        grid-template-columns: 1fr;
    }
    
    .section-header {
        flex-direction: column;
        gap: 20px;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // View toggle
    const viewBtns = document.querySelectorAll('.view-btn');
    const toolsContainer = document.getElementById('tools-container');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            if (view === 'list') {
                toolsContainer.className = 'tools-list';
            } else {
                toolsContainer.className = 'tools-grid';
            }
        });
    });
    
    // Filter functionality would go here
    // This is a simplified version - in a real implementation, 
    // you'd use AJAX to filter tools without page reload
});
</script>

<?php
get_footer('ultra-premium');
?>