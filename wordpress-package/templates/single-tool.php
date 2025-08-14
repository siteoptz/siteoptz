<?php
/**
 * Single Tool Template
 * 
 * Template for displaying individual AI tool pages (/tools/[tool])
 * 
 * @package SiteOptz
 * @version 1.0.0
 */

get_header(); ?>

<?php while (have_posts()) : the_post(); ?>
    
    <!-- Tool Schema Data -->
    <?php 
    $tool_schema = [
        '@context' => 'https://schema.org',
        '@type' => 'SoftwareApplication',
        'name' => get_the_title(),
        'description' => get_field('description'),
        'applicationCategory' => get_field('category'),
        'operatingSystem' => 'Web Browser',
        'screenshot' => get_field('screenshots'),
        'softwareVersion' => get_field('version'),
        'datePublished' => get_field('release_date'),
        'author' => [
            '@type' => 'Organization',
            'name' => get_field('developer_name'),
            'url' => get_field('developer_website')
        ],
        'offers' => [
            '@type' => 'Offer',
            'price' => get_field('starting_price'),
            'priceCurrency' => 'USD',
            'availability' => 'https://schema.org/InStock'
        ],
        'aggregateRating' => [
            '@type' => 'AggregateRating',
            'ratingValue' => get_field('rating'),
            'ratingCount' => get_field('review_count'),
            'bestRating' => '5',
            'worstRating' => '1'
        ],
        'review' => get_field('user_reviews') ? array_map(function($review) {
            return [
                '@type' => 'Review',
                'author' => ['@type' => 'Person', 'name' => $review['author']],
                'reviewRating' => [
                    '@type' => 'Rating',
                    'ratingValue' => $review['rating'],
                    'bestRating' => '5'
                ],
                'reviewBody' => $review['content']
            ];
        }, get_field('user_reviews')) : []
    ];
    ?>
    <script type="application/ld+json">
    <?php echo json_encode($tool_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?>
    </script>

    <article class="single-tool-page">
        
        <!-- Breadcrumbs -->
        <?php siteoptz_breadcrumbs(); ?>

        <!-- Tool Hero Section -->
        <section class="tool-hero section-sm">
            <div class="container">
                <div class="tool-hero-content">
                    
                    <!-- Tool Header -->
                    <div class="tool-header">
                        <div class="tool-basic-info">
                            <?php if (get_field('logo')) : ?>
                                <div class="tool-logo">
                                    <img src="<?php echo esc_url(get_field('logo')); ?>" 
                                         alt="<?php echo esc_attr(get_the_title()); ?> Logo"
                                         class="tool-logo-img">
                                </div>
                            <?php endif; ?>
                            
                            <div class="tool-meta">
                                <h1 class="tool-title heading-1"><?php the_title(); ?></h1>
                                
                                <?php if (get_field('tagline')) : ?>
                                    <p class="tool-tagline body-lg"><?php echo esc_html(get_field('tagline')); ?></p>
                                <?php endif; ?>
                                
                                <!-- Tool Badges -->
                                <div class="tool-badges">
                                    <?php if (get_field('badge')) : ?>
                                        <span class="badge badge-primary"><?php echo esc_html(get_field('badge')); ?></span>
                                    <?php endif; ?>
                                    
                                    <?php if (get_field('category')) : ?>
                                        <span class="badge badge-secondary"><?php echo esc_html(get_field('category')); ?></span>
                                    <?php endif; ?>
                                    
                                    <?php if (get_field('free_plan_available')) : ?>
                                        <span class="badge badge-success">Free Plan</span>
                                    <?php endif; ?>
                                </div>
                                
                                <!-- Rating and Stats -->
                                <div class="tool-stats">
                                    <?php if (get_field('rating')) : ?>
                                        <div class="tool-rating">
                                            <div class="rating-stars">
                                                <?php 
                                                $rating = floatval(get_field('rating'));
                                                for ($i = 1; $i <= 5; $i++) {
                                                    $class = $i <= $rating ? 'star-filled' : 'star-empty';
                                                    echo '<span class="star ' . $class . '">★</span>';
                                                }
                                                ?>
                                            </div>
                                            <span class="rating-value"><?php echo number_format($rating, 1); ?></span>
                                            <span class="rating-count">(<?php echo number_format(get_field('review_count')); ?> reviews)</span>
                                        </div>
                                    <?php endif; ?>
                                    
                                    <?php if (get_field('active_users')) : ?>
                                        <div class="tool-stat">
                                            <span class="stat-value"><?php echo esc_html(get_field('active_users')); ?></span>
                                            <span class="stat-label">Active Users</span>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="tool-actions">
                            <?php if (get_field('website_url')) : ?>
                                <a href="<?php echo esc_url(get_field('website_url')); ?>" 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   class="btn btn-primary btn-lg">
                                    Try <?php the_title(); ?>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="m9 18 6-6-6-6"/>
                                    </svg>
                                </a>
                            <?php endif; ?>
                            
                            <a href="/pricing?tool=<?php echo urlencode(get_the_title()); ?>" class="btn btn-secondary btn-lg">
                                View Pricing
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tool Overview -->
        <section class="tool-overview section-sm">
            <div class="container">
                <div class="tool-content-grid">
                    
                    <!-- Main Content -->
                    <div class="tool-main-content">
                        
                        <!-- Description -->
                        <?php if (get_field('description')) : ?>
                            <div class="tool-section">
                                <h2 class="heading-2">What is <?php the_title(); ?>?</h2>
                                <div class="tool-description body-base">
                                    <?php echo wp_kses_post(get_field('description')); ?>
                                </div>
                            </div>
                        <?php endif; ?>

                        <!-- Key Features -->
                        <?php if (get_field('key_features')) : ?>
                            <div class="tool-section">
                                <h2 class="heading-2">Key Features</h2>
                                <div class="features-grid">
                                    <?php foreach (get_field('key_features') as $feature) : ?>
                                        <div class="feature-card card">
                                            <?php if ($feature['icon']) : ?>
                                                <div class="feature-icon">
                                                    <img src="<?php echo esc_url($feature['icon']); ?>" alt="Feature icon">
                                                </div>
                                            <?php endif; ?>
                                            <div class="feature-content">
                                                <h3 class="feature-title heading-3"><?php echo esc_html($feature['title']); ?></h3>
                                                <p class="feature-description body-base"><?php echo esc_html($feature['description']); ?></p>
                                            </div>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        <?php endif; ?>

                        <!-- Pros and Cons -->
                        <div class="tool-section">
                            <h2 class="heading-2">Pros and Cons</h2>
                            <div class="pros-cons-grid">
                                
                                <!-- Pros -->
                                <?php if (get_field('pros')) : ?>
                                    <div class="pros-section">
                                        <h3 class="heading-3 pros-title">
                                            <span class="pros-icon">✅</span>
                                            Pros
                                        </h3>
                                        <ul class="pros-list">
                                            <?php foreach (get_field('pros') as $pro) : ?>
                                                <li class="pro-item"><?php echo esc_html($pro['point']); ?></li>
                                            <?php endforeach; ?>
                                        </ul>
                                    </div>
                                <?php endif; ?>

                                <!-- Cons -->
                                <?php if (get_field('cons')) : ?>
                                    <div class="cons-section">
                                        <h3 class="heading-3 cons-title">
                                            <span class="cons-icon">❌</span>
                                            Cons
                                        </h3>
                                        <ul class="cons-list">
                                            <?php foreach (get_field('cons') as $con) : ?>
                                                <li class="con-item"><?php echo esc_html($con['point']); ?></li>
                                            <?php endforeach; ?>
                                        </ul>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>

                        <!-- Use Cases -->
                        <?php if (get_field('use_cases')) : ?>
                            <div class="tool-section">
                                <h2 class="heading-2">Best Use Cases</h2>
                                <div class="use-cases-grid">
                                    <?php foreach (get_field('use_cases') as $use_case) : ?>
                                        <div class="use-case-card card">
                                            <h3 class="use-case-title heading-3"><?php echo esc_html($use_case['scenario']); ?></h3>
                                            <p class="use-case-description body-base"><?php echo esc_html($use_case['description']); ?></p>
                                            <?php if ($use_case['ideal_for']) : ?>
                                                <div class="ideal-for">
                                                    <strong>Ideal for:</strong> <?php echo esc_html($use_case['ideal_for']); ?>
                                                </div>
                                            <?php endif; ?>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        <?php endif; ?>

                        <!-- Alternatives -->
                        <?php if (get_field('alternatives')) : ?>
                            <div class="tool-section">
                                <h2 class="heading-2">Alternatives to <?php the_title(); ?></h2>
                                <div class="alternatives-grid">
                                    <?php foreach (get_field('alternatives') as $alternative) : ?>
                                        <div class="alternative-card card">
                                            <?php if ($alternative['logo']) : ?>
                                                <img src="<?php echo esc_url($alternative['logo']); ?>" 
                                                     alt="<?php echo esc_attr($alternative['name']); ?>"
                                                     class="alternative-logo">
                                            <?php endif; ?>
                                            <div class="alternative-content">
                                                <h3 class="alternative-name heading-3"><?php echo esc_html($alternative['name']); ?></h3>
                                                <p class="alternative-description body-sm"><?php echo esc_html($alternative['description']); ?></p>
                                                <div class="alternative-meta">
                                                    <span class="alternative-price"><?php echo esc_html($alternative['starting_price']); ?></span>
                                                    <a href="<?php echo esc_url($alternative['url']); ?>" class="alternative-link">Learn More</a>
                                                </div>
                                            </div>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        <?php endif; ?>
                    </div>

                    <!-- Sidebar -->
                    <aside class="tool-sidebar">
                        
                        <!-- Pricing Snapshot -->
                        <div class="sidebar-section pricing-snapshot card">
                            <h3 class="sidebar-title">Pricing Overview</h3>
                            <?php if (get_field('pricing_plans')) : ?>
                                <div class="pricing-plans">
                                    <?php foreach (get_field('pricing_plans') as $plan) : ?>
                                        <div class="pricing-plan">
                                            <div class="plan-name"><?php echo esc_html($plan['name']); ?></div>
                                            <div class="plan-price">
                                                <?php if ($plan['price'] == 0) : ?>
                                                    <span class="price-free">Free</span>
                                                <?php else : ?>
                                                    <span class="price-amount">$<?php echo number_format($plan['price']); ?></span>
                                                    <span class="price-period">/<?php echo esc_html($plan['billing_period']); ?></span>
                                                <?php endif; ?>
                                            </div>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                            <a href="/pricing?tool=<?php echo urlencode(get_the_title()); ?>" 
                               class="btn btn-primary full-width">
                                Calculate Your Cost
                            </a>
                        </div>

                        <!-- Quick Stats -->
                        <div class="sidebar-section quick-stats card">
                            <h3 class="sidebar-title">Quick Stats</h3>
                            <div class="stats-list">
                                <?php if (get_field('founded_year')) : ?>
                                    <div class="stat-item">
                                        <span class="stat-label">Founded</span>
                                        <span class="stat-value"><?php echo esc_html(get_field('founded_year')); ?></span>
                                    </div>
                                <?php endif; ?>
                                
                                <?php if (get_field('company_size')) : ?>
                                    <div class="stat-item">
                                        <span class="stat-label">Company Size</span>
                                        <span class="stat-value"><?php echo esc_html(get_field('company_size')); ?></span>
                                    </div>
                                <?php endif; ?>
                                
                                <?php if (get_field('funding')) : ?>
                                    <div class="stat-item">
                                        <span class="stat-label">Funding</span>
                                        <span class="stat-value"><?php echo esc_html(get_field('funding')); ?></span>
                                    </div>
                                <?php endif; ?>
                                
                                <?php if (get_field('api_available')) : ?>
                                    <div class="stat-item">
                                        <span class="stat-label">API</span>
                                        <span class="stat-value"><?php echo get_field('api_available') ? 'Available' : 'Not Available'; ?></span>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>

                        <!-- Social Proof -->
                        <?php if (get_field('testimonials')) : ?>
                            <div class="sidebar-section testimonials card">
                                <h3 class="sidebar-title">What Users Say</h3>
                                <?php foreach (array_slice(get_field('testimonials'), 0, 2) as $testimonial) : ?>
                                    <blockquote class="testimonial">
                                        <p class="testimonial-text body-sm">"<?php echo esc_html($testimonial['quote']); ?>"</p>
                                        <cite class="testimonial-author">
                                            — <?php echo esc_html($testimonial['author']); ?>
                                            <?php if ($testimonial['company']) : ?>
                                                <span class="author-company">, <?php echo esc_html($testimonial['company']); ?></span>
                                            <?php endif; ?>
                                        </cite>
                                    </blockquote>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>

                        <!-- Related Tools -->
                        <?php
                        $related_tools = new WP_Query([
                            'post_type' => 'tool',
                            'posts_per_page' => 3,
                            'post__not_in' => [get_the_ID()],
                            'meta_query' => [
                                [
                                    'key' => 'category',
                                    'value' => get_field('category'),
                                    'compare' => 'LIKE'
                                ]
                            ]
                        ]);
                        ?>
                        
                        <?php if ($related_tools->have_posts()) : ?>
                            <div class="sidebar-section related-tools card">
                                <h3 class="sidebar-title">Related Tools</h3>
                                <div class="related-tools-list">
                                    <?php while ($related_tools->have_posts()) : $related_tools->the_post(); ?>
                                        <a href="<?php the_permalink(); ?>" class="related-tool-item">
                                            <?php if (get_field('logo')) : ?>
                                                <img src="<?php echo esc_url(get_field('logo')); ?>" 
                                                     alt="<?php echo esc_attr(get_the_title()); ?>"
                                                     class="related-tool-logo">
                                            <?php endif; ?>
                                            <div class="related-tool-content">
                                                <div class="related-tool-name"><?php the_title(); ?></div>
                                                <div class="related-tool-category"><?php echo esc_html(get_field('category')); ?></div>
                                            </div>
                                        </a>
                                    <?php endwhile; ?>
                                </div>
                            </div>
                        <?php endif; wp_reset_postdata(); ?>
                    </aside>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <?php if (get_field('faqs')) : ?>
            <section class="tool-faq section-sm bg-secondary">
                <div class="container">
                    <h2 class="heading-2 text-center mb-12">Frequently Asked Questions</h2>
                    
                    <!-- FAQ Schema -->
                    <?php
                    $faq_schema = [
                        '@context' => 'https://schema.org',
                        '@type' => 'FAQPage',
                        'mainEntity' => []
                    ];
                    
                    foreach (get_field('faqs') as $faq) {
                        $faq_schema['mainEntity'][] = [
                            '@type' => 'Question',
                            'name' => $faq['question'],
                            'acceptedAnswer' => [
                                '@type' => 'Answer',
                                'text' => $faq['answer']
                            ]
                        ];
                    }
                    ?>
                    <script type="application/ld+json">
                    <?php echo json_encode($faq_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?>
                    </script>
                    
                    <div class="faq-accordion">
                        <?php foreach (get_field('faqs') as $index => $faq) : ?>
                            <div class="faq-item">
                                <button class="faq-question" 
                                        data-target="faq-<?php echo $index; ?>"
                                        aria-expanded="false">
                                    <span><?php echo esc_html($faq['question']); ?></span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="faq-chevron">
                                        <polyline points="6,9 12,15 18,9"></polyline>
                                    </svg>
                                </button>
                                <div class="faq-answer" id="faq-<?php echo $index; ?>">
                                    <div class="faq-answer-content">
                                        <?php echo wp_kses_post($faq['answer']); ?>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </section>
        <?php endif; ?>

        <!-- CTA Section -->
        <section class="tool-cta section-sm">
            <div class="container">
                <div class="cta-content text-center">
                    <h2 class="heading-2">Ready to try <?php the_title(); ?>?</h2>
                    <p class="body-lg">Join thousands of users who are already using <?php the_title(); ?> to improve their workflow.</p>
                    <div class="cta-actions">
                        <?php if (get_field('website_url')) : ?>
                            <a href="<?php echo esc_url(get_field('website_url')); ?>" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               class="btn btn-primary btn-lg">
                                Start Free Trial
                            </a>
                        <?php endif; ?>
                        <a href="/pricing?tool=<?php echo urlencode(get_the_title()); ?>" 
                           class="btn btn-secondary btn-lg">
                            View All Plans
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </article>

<?php endwhile; ?>

<!-- Sticky CTA -->
<div class="sticky-cta no-print">
    <div class="sticky-cta-content">
        <div class="sticky-cta-text">
            <strong><?php the_title(); ?></strong>
            <span>Starting at <?php echo esc_html(get_field('starting_price') ?: 'Free'); ?></span>
        </div>
        <div class="sticky-cta-actions">
            <?php if (get_field('website_url')) : ?>
                <a href="<?php echo esc_url(get_field('website_url')); ?>" 
                   class="btn btn-primary">
                    Try Now
                </a>
            <?php endif; ?>
            <a href="/pricing?tool=<?php echo urlencode(get_the_title()); ?>" 
               class="btn btn-secondary">
                Pricing
            </a>
        </div>
    </div>
</div>

<style>
/* Tool-specific styles */
.tool-hero {
    background: linear-gradient(135deg, var(--blue-50), var(--indigo-50));
    border-bottom: 1px solid var(--gray-200);
}

.tool-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-8);
    flex-wrap: wrap;
}

.tool-basic-info {
    display: flex;
    gap: var(--space-6);
    flex: 1;
    min-width: 300px;
}

.tool-logo-img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    border-radius: var(--radius-lg);
    background: white;
    padding: var(--space-2);
    box-shadow: var(--shadow-sm);
}

.tool-tagline {
    color: var(--text-secondary);
    margin: var(--space-2) 0 var(--space-4) 0;
}

.tool-badges {
    display: flex;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
    flex-wrap: wrap;
}

.tool-stats {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    flex-wrap: wrap;
}

.tool-rating {
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.rating-stars {
    display: flex;
    gap: var(--space-1);
}

.star-filled {
    color: var(--amber-500);
}

.star-empty {
    color: var(--gray-300);
}

.tool-actions {
    display: flex;
    gap: var(--space-3);
    flex-shrink: 0;
}

.tool-content-grid {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: var(--space-12);
    align-items: start;
}

.tool-section {
    margin-bottom: var(--space-16);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-6);
}

.feature-card {
    display: flex;
    gap: var(--space-4);
    align-items: flex-start;
}

.feature-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-lg);
    background: var(--blue-50);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.pros-cons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-8);
}

.pros-title, .cons-title {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
}

.pros-list, .cons-list {
    list-style: none;
    padding: 0;
}

.pro-item, .con-item {
    padding: var(--space-2) 0;
    border-bottom: 1px solid var(--gray-200);
    position: relative;
    padding-left: var(--space-6);
}

.pro-item:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--green-600);
    font-weight: bold;
}

.con-item:before {
    content: '×';
    position: absolute;
    left: 0;
    color: var(--red-600);
    font-weight: bold;
}

.use-cases-grid, .alternatives-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-6);
}

.sidebar-section {
    margin-bottom: var(--space-8);
}

.sidebar-title {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    margin-bottom: var(--space-4);
    border-bottom: 2px solid var(--blue-600);
    padding-bottom: var(--space-2);
}

.pricing-plans {
    margin-bottom: var(--space-6);
}

.pricing-plan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-3) 0;
    border-bottom: 1px solid var(--gray-200);
}

.plan-name {
    font-weight: var(--font-medium);
}

.plan-price {
    font-weight: var(--font-semibold);
}

.price-free {
    color: var(--green-600);
}

.stats-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.stat-label {
    color: var(--text-secondary);
}

.stat-value {
    font-weight: var(--font-medium);
}

.testimonial {
    margin: 0 0 var(--space-4) 0;
    padding: var(--space-4);
    background: var(--gray-50);
    border-radius: var(--radius-lg);
    border-left: 4px solid var(--blue-600);
}

.testimonial-text {
    margin-bottom: var(--space-2);
    font-style: italic;
}

.testimonial-author {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    font-style: normal;
}

.related-tools-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
}

.related-tool-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    border-radius: var(--radius-lg);
    text-decoration: none;
    color: inherit;
    transition: var(--transition-base);
}

.related-tool-item:hover {
    background: var(--gray-50);
}

.related-tool-logo {
    width: 32px;
    height: 32px;
    object-fit: contain;
    border-radius: var(--radius-md);
}

.related-tool-name {
    font-weight: var(--font-medium);
    color: var(--text-primary);
}

.related-tool-category {
    font-size: var(--text-sm);
    color: var(--text-secondary);
}

.faq-accordion {
    max-width: 800px;
    margin: 0 auto;
}

.faq-item {
    border-bottom: 1px solid var(--gray-200);
}

.faq-question {
    width: 100%;
    padding: var(--space-6);
    text-align: left;
    background: none;
    border: none;
    font-size: var(--text-lg);
    font-weight: var(--font-medium);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--transition-base);
}

.faq-question:hover {
    background: var(--gray-50);
}

.faq-chevron {
    transition: transform var(--transition-base);
}

.faq-question[aria-expanded="true"] .faq-chevron {
    transform: rotate(180deg);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-slow);
}

.faq-answer.open {
    max-height: 1000px;
}

.faq-answer-content {
    padding: 0 var(--space-6) var(--space-6);
    color: var(--text-secondary);
    line-height: 1.6;
}

.sticky-cta {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid var(--gray-200);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-sticky);
    padding: var(--space-4);
    transform: translateY(100%);
    transition: transform var(--transition-base);
}

.sticky-cta.show {
    transform: translateY(0);
}

.sticky-cta-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    gap: var(--space-4);
}

.sticky-cta-actions {
    display: flex;
    gap: var(--space-2);
}

@media (max-width: 1024px) {
    .tool-content-grid {
        grid-template-columns: 1fr;
        gap: var(--space-8);
    }
}

@media (max-width: 768px) {
    .tool-header {
        flex-direction: column;
        align-items: stretch;
    }

    .tool-basic-info {
        flex-direction: column;
        gap: var(--space-4);
    }

    .tool-actions {
        justify-content: stretch;
    }

    .tool-actions .btn {
        flex: 1;
        justify-content: center;
    }

    .features-grid,
    .pros-cons-grid,
    .use-cases-grid,
    .alternatives-grid {
        grid-template-columns: 1fr;
    }

    .sticky-cta-content {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
    }

    .sticky-cta-actions {
        justify-content: stretch;
    }
}
</style>

<script>
// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqButtons = document.querySelectorAll('.faq-question');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetAnswer = document.getElementById(targetId);
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQs
            faqButtons.forEach(btn => {
                if (btn !== this) {
                    btn.setAttribute('aria-expanded', 'false');
                    const otherId = btn.getAttribute('data-target');
                    const otherAnswer = document.getElementById(otherId);
                    otherAnswer.classList.remove('open');
                }
            });
            
            // Toggle current FAQ
            this.setAttribute('aria-expanded', !isExpanded);
            if (isExpanded) {
                targetAnswer.classList.remove('open');
            } else {
                targetAnswer.classList.add('open');
            }
        });
    });
    
    // Sticky CTA show/hide based on scroll
    const stickyCTA = document.querySelector('.sticky-cta');
    const toolActions = document.querySelector('.tool-actions');
    
    if (stickyCTA && toolActions) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyCTA.classList.remove('show');
                } else {
                    stickyCTA.classList.add('show');
                }
            });
        }, { threshold: 0 });
        
        observer.observe(toolActions);
    }
});
</script>

<?php get_footer(); ?>