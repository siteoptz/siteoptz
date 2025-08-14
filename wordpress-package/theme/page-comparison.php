<?php
/**
 * Comparison Page Template - Enhanced Version
 * 
 * Template for displaying AI tool comparison pages (/compare/[tool-a]-vs-[tool-b])
 * Updated to match the comprehensive comparison.html structure
 * 
 * @package SiteOptz
 * @version 2.0.0
 */

get_header(); 

// Get comparison data from URL or custom fields
$comparison_slug = get_query_var('comparison_slug', '');
$tools = [];

// Parse URL for tool comparison (e.g., chatgpt-vs-claude)
if ($comparison_slug) {
    $tool_slugs = explode('-vs-', $comparison_slug);
    if (count($tool_slugs) === 2) {
        // Query for the tools being compared
        foreach ($tool_slugs as $slug) {
            $tool_query = new WP_Query([
                'post_type' => 'tool',
                'name' => $slug,
                'posts_per_page' => 1
            ]);
            
            if ($tool_query->have_posts()) {
                $tool_query->the_post();
                $tools[] = [
                    'ID' => get_the_ID(),
                    'tool_name' => get_the_title(),
                    'slug' => get_post_field('post_name'),
                    'description' => get_field('description'),
                    'category' => get_field('category'),
                    'benchmarks' => get_field('benchmarks') ?: [],
                    'pricing' => get_field('pricing') ?: [],
                    'key_features' => get_field('key_features') ?: [],
                    'pros' => get_field('pros') ?: [],
                    'cons' => get_field('cons') ?: [],
                    'strengths' => get_field('strengths') ?: [],
                    'api_available' => get_field('api_available'),
                    'website_url' => get_field('website_url'),
                    'starting_price' => get_field('starting_price'),
                    'review_count' => get_field('review_count') ?: 150
                ];
            }
            wp_reset_postdata();
        }
    }
}

// Generate comparison metadata
$comparison_title = '';
$comparison_description = '';
$comparison_keywords = [];

if (count($tools) >= 2) {
    $tool_names = array_column($tools, 'tool_name');
    $comparison_title = implode(' vs ', $tool_names) . ' - Detailed Comparison 2025';
    $comparison_description = 'Compare ' . implode(' and ', $tool_names) . ' side by side. Features, pricing, pros & cons analysis to help you choose the right AI tool.';
    $comparison_keywords = array_merge(
        array_map(function($name) { return strtolower($name) . ' review'; }, $tool_names),
        [strtolower(implode(' vs ', $tool_names)), 'ai tool comparison', 'ai software comparison']
    );
}

// Get all unique features across tools
$all_features = [];
foreach ($tools as $tool) {
    if (is_array($tool['key_features'])) {
        foreach ($tool['key_features'] as $feature) {
            $feature_name = is_array($feature) ? $feature['title'] : $feature;
            if (!in_array($feature_name, $all_features)) {
                $all_features[] = $feature_name;
            }
        }
    }
}

// Schema markup
$schema_tools = [];
foreach ($tools as $tool) {
    $average_rating = 0;
    if (!empty($tool['benchmarks'])) {
        $rating_fields = ['content_quality', 'ease_of_use', 'value_for_money'];
        $total = 0;
        $count = 0;
        foreach ($rating_fields as $field) {
            if (isset($tool['benchmarks'][$field]) && is_numeric($tool['benchmarks'][$field])) {
                $total += floatval($tool['benchmarks'][$field]);
                $count++;
            }
        }
        $average_rating = $count > 0 ? $total / $count : 0;
    }
    
    $schema_tools[] = [
        '@type' => 'SoftwareApplication',
        'name' => $tool['tool_name'],
        'description' => $tool['description'],
        'applicationCategory' => $tool['category'],
        'aggregateRating' => [
            '@type' => 'AggregateRating',
            'ratingValue' => number_format($average_rating, 1),
            'bestRating' => '5',
            'worstRating' => '1'
        ]
    ];
}

$schema = [
    '@context' => 'https://schema.org',
    '@type' => 'ComparisonPage',
    'name' => $comparison_title,
    'description' => $comparison_description,
    'mainEntity' => $schema_tools
];
?>

<!-- Dynamic Meta Tags -->
<meta name="description" content="<?php echo esc_attr($comparison_description); ?>">
<meta name="keywords" content="<?php echo esc_attr(implode(', ', $comparison_keywords)); ?>">

<!-- Open Graph Tags -->
<meta property="og:title" content="<?php echo esc_attr($comparison_title); ?>">
<meta property="og:description" content="<?php echo esc_attr($comparison_description); ?>">
<meta property="og:type" content="website">
<meta property="og:url" content="<?php echo esc_url(get_permalink()); ?>">
<meta property="og:image" content="<?php echo esc_url(home_url('/images/comparisons/' . $comparison_slug . '.jpg')); ?>">

<!-- Twitter Card Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?php echo esc_attr($comparison_title); ?>">
<meta name="twitter:description" content="<?php echo esc_attr($comparison_description); ?>">
<meta name="twitter:image" content="<?php echo esc_url(home_url('/images/comparisons/' . $comparison_slug . '.jpg')); ?>">

<!-- Canonical URL -->
<link rel="canonical" href="<?php echo esc_url(get_permalink()); ?>">

<!-- JSON-LD Schema Markup -->
<script type="application/ld+json">
<?php echo json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?>
</script>

<style>
.comparison-table {
    border-collapse: separate;
    border-spacing: 0;
}

.comparison-table th,
.comparison-table td {
    border-bottom: 1px solid #e5e7eb;
}

.comparison-table th:first-child,
.comparison-table td:first-child {
    position: sticky;
    left: 0;
    background: white;
    z-index: 10;
    border-right: 2px solid #e5e7eb;
}

.comparison-table th {
    background: #f9fafb;
    position: sticky;
    top: 0;
    z-index: 20;
}

.winner-highlight {
    background-color: #dcfce7 !important;
    border-left: 4px solid #16a34a;
}

.slider {
    -webkit-appearance: none;
    height: 6px;
    border-radius: 3px;
    background: #d1d5db;
    outline: none;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2563eb;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2563eb;
    cursor: pointer;
    border: none;
}
</style>

<article class="comparison-page bg-gray-50">
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
        <?php if (count($tools) >= 2) : ?>
            <!-- Hero Section -->
            <section class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4"><?php echo esc_html($comparison_title); ?></h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto"><?php echo esc_html($comparison_description); ?></p>
                
                <!-- Tool Overview Cards -->
                <div class="grid grid-cols-1 md:grid-cols-<?php echo count($tools); ?> gap-6 mt-8">
                    <?php foreach ($tools as $tool) : 
                        $average_rating = 0;
                        if (!empty($tool['benchmarks'])) {
                            $rating_fields = ['content_quality', 'ease_of_use', 'value_for_money'];
                            $total = 0;
                            $count = 0;
                            foreach ($rating_fields as $field) {
                                if (isset($tool['benchmarks'][$field]) && is_numeric($tool['benchmarks'][$field])) {
                                    $total += floatval($tool['benchmarks'][$field]);
                                    $count++;
                                }
                            }
                            $average_rating = $count > 0 ? $total / $count : 0;
                        }
                    ?>
                        <div class="bg-white rounded-lg shadow-sm p-6 border-2 border-gray-200 hover:border-blue-300 transition-colors">
                            <div class="flex items-center justify-center mb-4">
                                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span class="text-white text-xl font-bold"><?php echo substr($tool['tool_name'], 0, 1); ?></span>
                                </div>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900 mb-2"><?php echo esc_html($tool['tool_name']); ?></h3>
                            <p class="text-sm text-gray-600 mb-4"><?php echo esc_html($tool['description']); ?></p>
                            <div class="flex items-center justify-center space-x-2 mb-4">
                                <span class="text-yellow-400">★</span>
                                <span class="text-sm font-medium"><?php echo number_format($average_rating, 1); ?>/5</span>
                            </div>
                            <a href="<?php echo home_url('/tools/' . $tool['slug']); ?>" class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                                View Details
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>
            </section>

            <!-- Quick Verdict Section -->
            <section class="bg-white rounded-lg shadow-sm p-8 mb-12">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Verdict</h2>
                <div class="grid grid-cols-1 md:grid-cols-<?php echo count($tools); ?> gap-6">
                    <?php foreach ($tools as $tool) : ?>
                        <div class="border border-gray-200 rounded-lg p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">Choose <?php echo esc_html($tool['tool_name']); ?> if:</h3>
                            <ul class="space-y-2">
                                <?php if (!empty($tool['strengths'])) : ?>
                                    <?php foreach ($tool['strengths'] as $strength) : ?>
                                        <li class="flex items-start space-x-2">
                                            <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                            </svg>
                                            <span class="text-sm text-gray-700"><?php echo esc_html($strength); ?></span>
                                        </li>
                                    <?php endforeach; ?>
                                <?php else : ?>
                                    <!-- Default strengths if not specified -->
                                    <li class="flex items-start space-x-2">
                                        <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span class="text-sm text-gray-700">You need a reliable and feature-rich solution</span>
                                    </li>
                                <?php endif; ?>
                            </ul>
                        </div>
                    <?php endforeach; ?>
                </div>
            </section>

            <!-- Interactive Comparison Table -->
            <section class="bg-white rounded-lg shadow-sm p-8 mb-12">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <h2 class="text-2xl font-bold text-gray-900">Feature Comparison</h2>
                    <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <button onclick="toggleDifferences()" class="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                            <span id="diff-toggle">Show Differences</span>
                        </button>
                        <button onclick="highlightWinners()" class="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 border border-green-600 rounded-md hover:bg-green-50 transition-colors">
                            Highlight Winners
                        </button>
                    </div>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="w-full comparison-table">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">Feature</th>
                                <?php foreach ($tools as $tool) : ?>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                                        <div class="flex flex-col items-center space-y-2">
                                            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                <span class="text-white text-sm font-bold"><?php echo substr($tool['tool_name'], 0, 1); ?></span>
                                            </div>
                                            <span class="font-medium text-gray-900 text-center"><?php echo esc_html($tool['tool_name']); ?></span>
                                        </div>
                                    </th>
                                <?php endforeach; ?>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <!-- Tool Ratings -->
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Overall Rating</td>
                                <?php foreach ($tools as $tool) : 
                                    $average_rating = 0;
                                    if (!empty($tool['benchmarks'])) {
                                        $rating_fields = ['content_quality', 'ease_of_use', 'value_for_money'];
                                        $total = 0;
                                        $count = 0;
                                        foreach ($rating_fields as $field) {
                                            if (isset($tool['benchmarks'][$field]) && is_numeric($tool['benchmarks'][$field])) {
                                                $total += floatval($tool['benchmarks'][$field]);
                                                $count++;
                                            }
                                        }
                                        $average_rating = $count > 0 ? $total / $count : 0;
                                    }
                                ?>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div class="flex flex-col items-center space-y-1">
                                            <div class="flex items-center space-x-1">
                                                <span class="text-yellow-400">★</span>
                                                <span class="font-medium"><?php echo number_format($average_rating, 1); ?>/5</span>
                                            </div>
                                            <span class="text-xs text-gray-500"><?php echo esc_html($tool['review_count']); ?> reviews</span>
                                        </div>
                                    </td>
                                <?php endforeach; ?>
                            </tr>
                            
                            <!-- Benchmark Rows -->
                            <?php 
                            $benchmark_labels = [
                                'content_quality' => ['Content Quality', 'bg-blue-600'],
                                'ease_of_use' => ['Ease of Use', 'bg-green-600'],
                                'seo_features' => ['SEO Features', 'bg-purple-600'],
                                'value_for_money' => ['Value for Money', 'bg-red-600']
                            ];
                            
                            foreach ($benchmark_labels as $field => $data) : 
                                list($label, $color) = $data;
                            ?>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><?php echo $label; ?></td>
                                    <?php foreach ($tools as $tool) : 
                                        $value = isset($tool['benchmarks'][$field]) ? floatval($tool['benchmarks'][$field]) : 0;
                                    ?>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div class="flex flex-col items-center space-y-2">
                                                <div class="w-full bg-gray-200 rounded-full h-2">
                                                    <div class="<?php echo $color; ?> h-2 rounded-full transition-all duration-300" style="width: <?php echo $value * 10; ?>%"></div>
                                                </div>
                                                <span class="text-sm font-medium"><?php echo $value; ?>/10</span>
                                            </div>
                                        </td>
                                    <?php endforeach; ?>
                                </tr>
                            <?php endforeach; ?>
                            
                            <!-- Pricing -->
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Starting Price</td>
                                <?php foreach ($tools as $tool) : ?>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div class="text-center">
                                            <?php if (!empty($tool['pricing']['free'])) : ?>
                                                <div class="text-green-600 font-medium">Free</div>
                                                <div class="text-xs text-gray-500"><?php echo esc_html($tool['pricing']['free']); ?></div>
                                            <?php else : ?>
                                                <div class="font-medium"><?php echo esc_html($tool['starting_price'] ?: 'Contact for pricing'); ?></div>
                                            <?php endif; ?>
                                        </div>
                                    </td>
                                <?php endforeach; ?>
                            </tr>
                            
                            <!-- Key Features -->
                            <?php foreach ($all_features as $feature) : ?>
                                <tr class="feature-row" data-feature="<?php echo esc_attr($feature); ?>">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><?php echo esc_html($feature); ?></td>
                                    <?php foreach ($tools as $tool) : 
                                        $has_feature = false;
                                        if (is_array($tool['key_features'])) {
                                            foreach ($tool['key_features'] as $tool_feature) {
                                                $feature_name = is_array($tool_feature) ? $tool_feature['title'] : $tool_feature;
                                                if ($feature_name === $feature) {
                                                    $has_feature = true;
                                                    break;
                                                }
                                            }
                                        }
                                    ?>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div class="flex justify-center">
                                                <?php if ($has_feature) : ?>
                                                    <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                                    </svg>
                                                <?php else : ?>
                                                    <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                                    </svg>
                                                <?php endif; ?>
                                            </div>
                                        </td>
                                    <?php endforeach; ?>
                                </tr>
                            <?php endforeach; ?>
                            
                            <!-- API Available -->
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">API Available</td>
                                <?php foreach ($tools as $tool) : ?>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div class="flex justify-center">
                                            <?php if ($tool['api_available']) : ?>
                                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Yes</span>
                                            <?php else : ?>
                                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">No</span>
                                            <?php endif; ?>
                                        </div>
                                    </td>
                                <?php endforeach; ?>
                            </tr>
                            
                            <!-- Free Plan -->
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Free Plan</td>
                                <?php foreach ($tools as $tool) : ?>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div class="flex justify-center">
                                            <?php if (!empty($tool['pricing']['free'])) : ?>
                                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Available</span>
                                            <?php else : ?>
                                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Not Available</span>
                                            <?php endif; ?>
                                        </div>
                                    </td>
                                <?php endforeach; ?>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- Pricing Calculator -->
            <section class="bg-white rounded-lg shadow-sm p-8 mb-12">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Pricing Calculator</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Calculator Controls -->
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Select Tool</label>
                            <select id="tool-select" onchange="updatePricing()" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <?php foreach ($tools as $tool) : ?>
                                    <option value="<?php echo esc_attr($tool['slug']); ?>"><?php echo esc_html($tool['tool_name']); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
                            <select id="plan-select" onchange="updatePricing()" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="free">Free Plan</option>
                                <option value="basic">Basic Plan</option>
                                <option value="pro">Pro Plan</option>
                                <option value="enterprise">Enterprise Plan</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Usage Level</label>
                            <input type="range" id="usage-slider" min="1" max="4" value="2" onchange="updatePricing()" class="w-full slider">
                            <div class="flex justify-between text-xs text-gray-500 mt-1">
                                <span>Light</span>
                                <span>Moderate</span>
                                <span>Heavy</span>
                                <span>Enterprise</span>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                            <input type="number" id="team-size" value="1" min="1" max="100" onchange="updatePricing()" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Billing Period</label>
                            <select id="billing-period" onchange="updatePricing()" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly (20% discount)</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Pricing Results -->
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Estimated Cost</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Base Plan:</span>
                                <span id="base-price" class="font-medium">$0</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Usage Multiplier:</span>
                                <span id="usage-multiplier" class="font-medium">1x</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Team Members:</span>
                                <span id="team-cost" class="font-medium">$0</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Billing Discount:</span>
                                <span id="billing-discount" class="font-medium text-green-600">$0</span>
                            </div>
                            <hr class="border-gray-300">
                            <div class="flex justify-between text-lg font-bold">
                                <span>Total <span id="billing-period-text">Monthly</span>:</span>
                                <span id="total-price" class="text-blue-600">$0</span>
                            </div>
                            <div class="text-center text-sm text-gray-500">
                                <span id="annual-savings" class="hidden">Save $0/year with annual billing</span>
                            </div>
                        </div>
                        <button onclick="getQuote()" class="w-full mt-6 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                            Get Custom Quote
                        </button>
                        <button onclick="startTrial()" class="w-full mt-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors">
                            Start Free Trial
                        </button>
                    </div>
                </div>
            </section>

            <!-- Pros and Cons Comparison -->
            <section class="bg-white rounded-lg shadow-sm p-8 mb-12">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Pros & Cons Comparison</h2>
                <div class="grid grid-cols-1 md:grid-cols-<?php echo count($tools); ?> gap-6">
                    <?php foreach ($tools as $tool) : ?>
                        <div class="border border-gray-200 rounded-lg p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4 text-center"><?php echo esc_html($tool['tool_name']); ?></h3>
                            
                            <!-- Pros -->
                            <div class="mb-6">
                                <h4 class="text-md font-medium text-green-700 mb-3 flex items-center">
                                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                    Pros
                                </h4>
                                <ul class="space-y-2">
                                    <?php if (!empty($tool['pros'])) : ?>
                                        <?php foreach ($tool['pros'] as $pro) : ?>
                                            <li class="text-sm text-gray-700 flex items-start">
                                                <span class="text-green-500 mr-2 mt-0.5">•</span>
                                                <?php echo esc_html(is_array($pro) ? $pro['point'] : $pro); ?>
                                            </li>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </ul>
                            </div>
                            
                            <!-- Cons -->
                            <div>
                                <h4 class="text-md font-medium text-red-700 mb-3 flex items-center">
                                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                    </svg>
                                    Cons
                                </h4>
                                <ul class="space-y-2">
                                    <?php if (!empty($tool['cons'])) : ?>
                                        <?php foreach ($tool['cons'] as $con) : ?>
                                            <li class="text-sm text-gray-700 flex items-start">
                                                <span class="text-red-500 mr-2 mt-0.5">•</span>
                                                <?php echo esc_html(is_array($con) ? $con['point'] : $con); ?>
                                            </li>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </ul>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </section>

        <?php else : ?>
            <!-- No tools found message -->
            <section class="text-center py-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">Comparison Not Found</h1>
                <p class="text-xl text-gray-600 mb-8">The tools you're looking for could not be found.</p>
                <a href="<?php echo home_url('/tools'); ?>" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Browse All Tools
                </a>
            </section>
        <?php endif; ?>

        <!-- CTA Section with Email Capture -->
        <section class="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-12 text-white text-center">
            <h2 class="text-3xl font-bold mb-4">Get Expert AI Tool Recommendations</h2>
            <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and get personalized AI tool recommendations, exclusive insights, and early access to new tool reviews.
            </p>
            <form class="max-w-md mx-auto space-y-4" onsubmit="handleEmailCapture(event)">
                <input type="email" name="email" placeholder="Enter your email address" required class="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white text-lg">
                <button type="submit" class="w-full bg-white text-blue-600 px-6 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                    Get Free Recommendations
                </button>
            </form>
            <p class="text-sm text-blue-200 mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
        </section>
    </main>

    <!-- Footer -->
    <?php get_footer(); ?>

</article>

<script>
let showDifferences = false;
let winnersHighlighted = false;
let toolsData = <?php echo json_encode($tools, JSON_UNESCAPED_SLASHES); ?>;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updatePricing();
});

// Toggle differences highlighting
function toggleDifferences() {
    showDifferences = !showDifferences;
    const button = document.getElementById('diff-toggle');
    button.textContent = showDifferences ? 'Show All' : 'Show Differences';
    
    const rows = document.querySelectorAll('.comparison-table tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 1) {
            const values = Array.from(cells).slice(1).map(cell => cell.textContent.trim());
            const uniqueValues = [...new Set(values)];
            
            if (showDifferences && uniqueValues.length === 1) {
                row.style.display = 'none';
            } else {
                row.style.display = '';
                if (showDifferences && uniqueValues.length > 1) {
                    row.style.backgroundColor = '#fef3c7';
                } else {
                    row.style.backgroundColor = '';
                }
            }
        }
    });
}

// Highlight winners in each category
function highlightWinners() {
    winnersHighlighted = !winnersHighlighted;
    const rows = document.querySelectorAll('.comparison-table tbody tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 1) {
            // Remove existing highlights
            cells.forEach(cell => cell.classList.remove('winner-highlight'));
            
            if (winnersHighlighted) {
                // Find the best value in this row
                const values = Array.from(cells).slice(1);
                let bestCell = null;
                let bestValue = -1;
                
                values.forEach(cell => {
                    const text = cell.textContent.trim();
                    // Look for numeric values
                    const match = text.match(/(\d+(?:\.\d+)?)/);
                    if (match) {
                        const value = parseFloat(match[1]);
                        if (value > bestValue) {
                            bestValue = value;
                            bestCell = cell;
                        }
                    }
                });
                
                if (bestCell) {
                    bestCell.classList.add('winner-highlight');
                }
            }
        }
    });
}

// Update pricing calculator
function updatePricing() {
    const selectedTool = document.getElementById('tool-select').value;
    const selectedPlan = document.getElementById('plan-select').value;
    const usageLevel = parseInt(document.getElementById('usage-slider').value);
    const teamSize = parseInt(document.getElementById('team-size').value);
    const billingPeriod = document.getElementById('billing-period').value;
    
    const tool = toolsData.find(t => t.slug === selectedTool);
    if (!tool) return;
    
    // Base pricing logic
    let basePrice = 0;
    switch (selectedPlan) {
        case 'free':
            basePrice = 0;
            break;
        case 'basic':
            basePrice = 29;
            break;
        case 'pro':
            basePrice = 79;
            break;
        case 'enterprise':
            basePrice = 199;
            break;
    }
    
    // Usage multiplier
    const usageMultipliers = {1: 0.5, 2: 1, 3: 1.5, 4: 2};
    const usageMultiplier = usageMultipliers[usageLevel] || 1;
    
    // Team cost (additional members)
    const teamCost = Math.max(0, (teamSize - 1) * 15);
    
    // Calculate subtotal
    let subtotal = (basePrice * usageMultiplier) + teamCost;
    
    // Apply billing discount
    let discount = 0;
    if (billingPeriod === 'yearly' && subtotal > 0) {
        discount = subtotal * 0.2; // 20% discount
    }
    
    const total = subtotal - discount;
    
    // Update display
    document.getElementById('base-price').textContent = `$${basePrice}`;
    document.getElementById('usage-multiplier').textContent = `${usageMultiplier}x`;
    document.getElementById('team-cost').textContent = `$${teamCost}`;
    document.getElementById('billing-discount').textContent = discount > 0 ? `-$${discount.toFixed(0)}` : '$0';
    document.getElementById('total-price').textContent = `$${total.toFixed(0)}`;
    document.getElementById('billing-period-text').textContent = billingPeriod === 'yearly' ? 'Yearly' : 'Monthly';
    
    // Show annual savings
    const annualSavings = document.getElementById('annual-savings');
    if (billingPeriod === 'yearly' && discount > 0) {
        annualSavings.textContent = `Save $${(discount * 12).toFixed(0)}/year with annual billing`;
        annualSavings.classList.remove('hidden');
    } else {
        annualSavings.classList.add('hidden');
    }
}

// Get quote function
function getQuote() {
    const selectedTool = document.getElementById('tool-select').value;
    const selectedPlan = document.getElementById('plan-select').value;
    const totalPrice = document.getElementById('total-price').textContent;
    const billingPeriod = document.getElementById('billing-period').value;
    
    // Create quote request data
    const quoteData = {
        tool: selectedTool,
        plan: selectedPlan,
        price: totalPrice,
        billing: billingPeriod,
        teamSize: document.getElementById('team-size').value,
        usage: document.getElementById('usage-slider').value
    };
    
    // Store in localStorage for quote form
    localStorage.setItem('quoteRequest', JSON.stringify(quoteData));
    
    // Redirect to quote form or show modal
    window.location.href = '<?php echo home_url('/quote'); ?>?tool=' + encodeURIComponent(selectedTool);
}

// Start trial function
function startTrial() {
    const selectedTool = document.getElementById('tool-select').value;
    const tool = toolsData.find(t => t.slug === selectedTool);
    
    if (tool && tool.website_url) {
        window.open(tool.website_url, '_blank');
    } else {
        alert('Trial not available for this tool');
    }
}

// Email capture function
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
                source: 'comparison_page',
                tools: JSON.stringify(toolsData.map(t => t.tool_name)),
                nonce: '<?php echo wp_create_nonce('siteoptz_subscribe'); ?>'
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Thank you for subscribing! You\'ll receive your first recommendations soon.');
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

<?php get_footer(); ?>