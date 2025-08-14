<?php
/**
 * Single Tool Template - Enhanced Version
 * 
 * Template for displaying individual AI tool pages (/tools/[tool])
 * Updated to match the comprehensive tool_detail.html structure
 * 
 * @package SiteOptz
 * @version 2.0.0
 */

get_header(); ?>

<?php while (have_posts()) : the_post(); ?>
    
    <!-- Dynamic Meta Tags -->
    <meta name="description" content="<?php echo esc_attr(get_field('meta_description') ?: get_field('description')); ?>">
    <meta name="keywords" content="<?php echo esc_attr(implode(', ', get_field('target_keywords') ?: [])); ?>">
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="<?php echo esc_attr(get_field('meta_title') ?: get_the_title()); ?>">
    <meta property="og:description" content="<?php echo esc_attr(get_field('meta_description') ?: get_field('description')); ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo esc_url(get_permalink()); ?>">
    <meta property="og:image" content="<?php echo esc_url(get_field('og_image') ?: get_field('logo')); ?>">
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo esc_attr(get_field('meta_title') ?: get_the_title()); ?>">
    <meta name="twitter:description" content="<?php echo esc_attr(get_field('meta_description') ?: get_field('description')); ?>">
    <meta name="twitter:image" content="<?php echo esc_url(get_field('twitter_image') ?: get_field('logo')); ?>">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="<?php echo esc_url(get_permalink()); ?>">
    
    <!-- JSON-LD Schema Markup -->
    <?php 
    $benchmarks = get_field('benchmarks') ?: [];
    $average_rating = 0;
    if (!empty($benchmarks)) {
        $rating_fields = ['content_quality', 'ease_of_use', 'value_for_money'];
        $total = 0;
        $count = 0;
        foreach ($rating_fields as $field) {
            if (isset($benchmarks[$field]) && is_numeric($benchmarks[$field])) {
                $total += floatval($benchmarks[$field]);
                $count++;
            }
        }
        $average_rating = $count > 0 ? $total / $count : 0;
    }

    $pricing = get_field('pricing') ?: [];
    $offers = [];
    $pricing_types = ['free', 'basic', 'pro', 'enterprise'];
    foreach ($pricing_types as $type) {
        if (!empty($pricing[$type])) {
            $offers[] = [
                '@type' => 'Offer',
                'name' => ucfirst($type) . ' Plan',
                'description' => $pricing[$type],
                'price' => $type === 'free' ? '0' : null,
                'priceCurrency' => 'USD'
            ];
        }
    }

    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'SoftwareApplication',
        'name' => get_the_title(),
        'description' => get_field('description'),
        'applicationCategory' => get_field('category'),
        'operatingSystem' => 'Web',
        'offers' => $offers,
        'featureList' => implode(', ', get_field('key_features') ?: []),
        'aggregateRating' => [
            '@type' => 'AggregateRating',
            'ratingValue' => number_format($average_rating, 1),
            'reviewCount' => '150'
        ]
    ];
    ?>
    <script type="application/ld+json">
    <?php echo json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?>
    </script>
    
    <!-- FAQ Schema Markup -->
    <?php if (get_field('faqs')) : ?>
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
    <?php endif; ?>

    <article class="single-tool-page bg-gray-50">
        
        <!-- Header -->
        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-6">
                    <div class="flex items-center">
                        <h1 class="text-2xl font-bold text-gray-900"><?php bloginfo('name'); ?></h1>
                    </div>
                    <nav class="hidden md:flex space-x-8">
                        <a href="<?php echo home_url(); ?>" class="text-gray-500 hover:text-gray-900">Home</a>
                        <a href="<?php echo home_url('/tools'); ?>" class="text-gray-500 hover:text-gray-900">Tools</a>
                        <a href="<?php echo home_url('/comparisons'); ?>" class="text-gray-500 hover:text-gray-900">Comparisons</a>
                        <a href="<?php echo home_url('/about'); ?>" class="text-gray-500 hover:text-gray-900">About</a>
                    </nav>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Tool Header -->
            <div class="bg-white rounded-lg shadow-sm p-8 mb-8">
                <div class="flex items-center space-x-6">
                    <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <?php if (get_field('logo')) : ?>
                            <img src="<?php echo esc_url(get_field('logo')); ?>" 
                                 alt="<?php echo esc_attr(get_the_title()); ?> Logo"
                                 class="w-16 h-16 object-contain rounded-lg">
                        <?php else : ?>
                            <span class="text-white text-2xl font-bold"><?php echo substr(get_the_title(), 0, 1); ?></span>
                        <?php endif; ?>
                    </div>
                    <div class="flex-1">
                        <h1 class="text-4xl font-bold text-gray-900 mb-2"><?php the_title(); ?></h1>
                        <p class="text-xl text-gray-600 mb-4"><?php echo esc_html(get_field('description')); ?></p>
                        <div class="flex items-center space-x-4">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                <?php echo esc_html(get_field('category')); ?>
                            </span>
                            <div class="flex items-center space-x-1">
                                <span class="text-yellow-400">★</span>
                                <span class="text-gray-600"><?php echo number_format($average_rating, 1); ?>/5</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <a href="#pricing" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                            View Pricing
                        </a>
                    </div>
                </div>
            </div>

            <!-- Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Main Content -->
                <div class="lg:col-span-2 space-y-8">
                    <!-- Overview Section -->
                    <section class="bg-white rounded-lg shadow-sm p-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
                        <div class="text-gray-700 leading-relaxed">
                            <?php echo wp_kses_post(get_field('description')); ?>
                        </div>
                    </section>

                    <!-- Features Section -->
                    <?php if (get_field('key_features')) : ?>
                        <section class="bg-white rounded-lg shadow-sm p-8">
                            <h2 class="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <?php foreach (get_field('key_features') as $feature) : ?>
                                    <div class="flex items-center space-x-3">
                                        <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span class="text-gray-700"><?php echo esc_html(is_array($feature) ? $feature['title'] : $feature); ?></span>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </section>
                    <?php endif; ?>

                    <!-- Pros & Cons Section -->
                    <section class="bg-white rounded-lg shadow-sm p-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Pros & Cons</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <!-- Pros -->
                            <?php if (get_field('pros')) : ?>
                                <div>
                                    <h3 class="text-lg font-semibold text-green-700 mb-4">Pros</h3>
                                    <ul class="space-y-3">
                                        <?php foreach (get_field('pros') as $pro) : ?>
                                            <li class="flex items-start space-x-3">
                                                <svg class="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                                </svg>
                                                <span class="text-gray-700"><?php echo esc_html(is_array($pro) ? $pro['point'] : $pro); ?></span>
                                            </li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>
                            <?php endif; ?>
                            
                            <!-- Cons -->
                            <?php if (get_field('cons')) : ?>
                                <div>
                                    <h3 class="text-lg font-semibold text-red-700 mb-4">Cons</h3>
                                    <ul class="space-y-3">
                                        <?php foreach (get_field('cons') as $con) : ?>
                                            <li class="flex items-start space-x-3">
                                                <svg class="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                                </svg>
                                                <span class="text-gray-700"><?php echo esc_html(is_array($con) ? $con['point'] : $con); ?></span>
                                            </li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>
                            <?php endif; ?>
                        </div>
                    </section>

                    <!-- Benchmarks Section -->
                    <?php if (!empty($benchmarks)) : ?>
                        <section class="bg-white rounded-lg shadow-sm p-8">
                            <h2 class="text-2xl font-bold text-gray-900 mb-6">Performance Benchmarks</h2>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <?php if (isset($benchmarks['content_quality'])) : ?>
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-blue-600 mb-2"><?php echo esc_html($benchmarks['content_quality']); ?>/10</div>
                                        <div class="text-sm text-gray-600">Content Quality</div>
                                    </div>
                                <?php endif; ?>
                                
                                <?php if (isset($benchmarks['ease_of_use'])) : ?>
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-green-600 mb-2"><?php echo esc_html($benchmarks['ease_of_use']); ?>/10</div>
                                        <div class="text-sm text-gray-600">Ease of Use</div>
                                    </div>
                                <?php endif; ?>
                                
                                <?php if (isset($benchmarks['seo_features'])) : ?>
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-purple-600 mb-2"><?php echo esc_html($benchmarks['seo_features']); ?>/10</div>
                                        <div class="text-sm text-gray-600">SEO Features</div>
                                    </div>
                                <?php endif; ?>
                                
                                <?php if (isset($benchmarks['team_collaboration'])) : ?>
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-orange-600 mb-2"><?php echo esc_html($benchmarks['team_collaboration']); ?>/10</div>
                                        <div class="text-sm text-gray-600">Team Collaboration</div>
                                    </div>
                                <?php endif; ?>
                                
                                <?php if (isset($benchmarks['value_for_money'])) : ?>
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-red-600 mb-2"><?php echo esc_html($benchmarks['value_for_money']); ?>/10</div>
                                        <div class="text-sm text-gray-600">Value for Money</div>
                                    </div>
                                <?php endif; ?>
                                
                                <?php if (isset($benchmarks['customer_support'])) : ?>
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-indigo-600 mb-2"><?php echo esc_html($benchmarks['customer_support']); ?>/10</div>
                                        <div class="text-sm text-gray-600">Customer Support</div>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </section>
                    <?php endif; ?>

                    <!-- FAQ Section -->
                    <?php if (get_field('faqs')) : ?>
                        <section class="bg-white rounded-lg shadow-sm p-8">
                            <h2 class="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                            <div class="space-y-4">
                                <?php foreach (get_field('faqs') as $index => $faq) : ?>
                                    <div class="border border-gray-200 rounded-lg">
                                        <button class="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset faq-toggle" onclick="toggleFAQ(this)">
                                            <div class="flex items-center justify-between">
                                                <h3 class="text-lg font-medium text-gray-900"><?php echo esc_html($faq['question']); ?></h3>
                                                <svg class="w-5 h-5 text-gray-500 transform transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                        </button>
                                        <div class="px-6 pb-4 hidden faq-answer">
                                            <p class="text-gray-700"><?php echo wp_kses_post($faq['answer']); ?></p>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </section>
                    <?php endif; ?>
                </div>

                <!-- Sidebar -->
                <div class="space-y-8">
                    <!-- Pricing Section -->
                    <section id="pricing" class="bg-white rounded-lg shadow-sm p-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Pricing Plans</h2>
                        <div class="space-y-4">
                            <?php if (!empty($pricing['free'])) : ?>
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <h3 class="font-semibold text-gray-900 mb-2">Free Plan</h3>
                                    <p class="text-sm text-gray-600"><?php echo esc_html($pricing['free']); ?></p>
                                </div>
                            <?php endif; ?>
                            
                            <?php if (!empty($pricing['basic'])) : ?>
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <h3 class="font-semibold text-gray-900 mb-2">Basic Plan</h3>
                                    <p class="text-sm text-gray-600"><?php echo esc_html($pricing['basic']); ?></p>
                                </div>
                            <?php endif; ?>
                            
                            <?php if (!empty($pricing['pro'])) : ?>
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <h3 class="font-semibold text-gray-900 mb-2">Pro Plan</h3>
                                    <p class="text-sm text-gray-600"><?php echo esc_html($pricing['pro']); ?></p>
                                </div>
                            <?php endif; ?>
                            
                            <?php if (!empty($pricing['enterprise'])) : ?>
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <h3 class="font-semibold text-gray-900 mb-2">Enterprise Plan</h3>
                                    <p class="text-sm text-gray-600"><?php echo esc_html($pricing['enterprise']); ?></p>
                                </div>
                            <?php endif; ?>
                        </div>
                        <div class="mt-6">
                            <?php if (get_field('website_url')) : ?>
                                <a href="<?php echo esc_url(get_field('website_url')); ?>" target="_blank" rel="noopener noreferrer" class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                    Get Started
                                </a>
                            <?php endif; ?>
                        </div>
                    </section>

                    <!-- Related Tools -->
                    <?php
                    $related_tools = get_field('related_tools');
                    if (!$related_tools) {
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
                    }
                    ?>
                    
                    <?php if ($related_tools && (is_array($related_tools) || $related_tools->have_posts())) : ?>
                        <section class="bg-white rounded-lg shadow-sm p-8">
                            <h2 class="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
                            <div class="space-y-4">
                                <?php 
                                if (is_array($related_tools)) {
                                    foreach ($related_tools as $related) : ?>
                                        <a href="/tools/<?php echo strtolower(str_replace(' ', '-', $related)); ?>" class="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                                            <h3 class="font-medium text-gray-900"><?php echo esc_html($related); ?></h3>
                                            <p class="text-sm text-gray-600">View comparison</p>
                                        </a>
                                    <?php endforeach;
                                } else {
                                    while ($related_tools->have_posts()) : $related_tools->the_post(); ?>
                                        <a href="<?php the_permalink(); ?>" class="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                                            <h3 class="font-medium text-gray-900"><?php the_title(); ?></h3>
                                            <p class="text-sm text-gray-600"><?php echo esc_html(get_field('category')); ?></p>
                                        </a>
                                    <?php endwhile;
                                    wp_reset_postdata();
                                } ?>
                            </div>
                        </section>
                    <?php endif; ?>

                    <!-- Email Capture -->
                    <section class="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-8 text-white">
                        <h2 class="text-2xl font-bold mb-4">Get AI Tool Insights</h2>
                        <p class="text-blue-100 mb-6">Stay updated with the latest AI tool reviews, comparisons, and exclusive insights.</p>
                        <form class="space-y-4" onsubmit="handleEmailCapture(event)">
                            <input type="email" name="email" placeholder="Enter your email" required class="w-full px-4 py-3 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white">
                            <button type="submit" class="w-full bg-white text-blue-600 px-4 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                                Subscribe Now
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <?php get_footer(); ?>

    </article>

<?php endwhile; ?>

<script>
// FAQ Toggle Function
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('svg');
    
    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}

// Email Capture Function
async function handleEmailCapture(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    try {
        const response = await fetch('<?php echo admin_url('admin-ajax.php'); ?>', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                action: 'siteoptz_subscribe',
                email: email,
                nonce: '<?php echo wp_create_nonce('siteoptz_subscribe'); ?>'
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Thank you for subscribing!');
            event.target.reset();
        } else {
            alert('Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
}
</script>

<?php
// Add the subscription handler
add_action('wp_ajax_siteoptz_subscribe', 'siteoptz_handle_subscription');
add_action('wp_ajax_nopriv_siteoptz_subscribe', 'siteoptz_handle_subscription');

function siteoptz_handle_subscription() {
    // Verify nonce
    if (!wp_verify_nonce($_POST['nonce'], 'siteoptz_subscribe')) {
        wp_send_json_error('Invalid nonce');
        return;
    }
    
    $email = sanitize_email($_POST['email']);
    if (!is_email($email)) {
        wp_send_json_error('Invalid email');
        return;
    }
    
    // Here you would typically add the email to your mailing list
    // For now, we'll just store it in the options table
    $subscribers = get_option('siteoptz_subscribers', []);
    if (!in_array($email, $subscribers)) {
        $subscribers[] = $email;
        update_option('siteoptz_subscribers', $subscribers);
    }
    
    wp_send_json_success('Subscribed successfully');
}
?>