# Comparison Template Variables Mapping Guide

This guide shows how template variables map between the comparison HTML template and WordPress PHP template.

## Comparison Metadata

| HTML Template Variable | WordPress/PHP Equivalent | Description |
|----------------------|---------------------------|-------------|
| `{{comparison.meta_title}}` | `$comparison_title` | Generated from tool names |
| `{{comparison.meta_description}}` | `$comparison_description` | Generated comparison description |
| `{{comparison.title}}` | `$comparison_title` | Main page title |
| `{{comparison.description}}` | `$comparison_description` | Page description |
| `{{comparison.slug}}` | `$comparison_slug` | URL slug (e.g., "chatgpt-vs-claude") |
| `{{comparison.keywords.join(', ')}}` | `implode(', ', $comparison_keywords)` | SEO keywords array |

## Tools Array

| HTML Template Variable | WordPress/PHP Equivalent | Description |
|----------------------|---------------------------|-------------|
| `{% for tool in tools %}` | `foreach ($tools as $tool)` | Loop through compared tools |
| `{{tool.tool_name}}` | `$tool['tool_name']` | Tool name from post title |
| `{{tool.slug}}` | `$tool['slug']` | Tool URL slug |
| `{{tool.description}}` | `$tool['description']` | Tool description from ACF |
| `{{tool.category}}` | `$tool['category']` | Tool category |
| `{{tool.website_url}}` | `$tool['website_url']` | Official tool website |

## Benchmarks and Ratings

| HTML Template Variable | WordPress/PHP Equivalent | Description |
|----------------------|---------------------------|-------------|
| `{{tool.benchmarks.content_quality}}` | `$tool['benchmarks']['content_quality']` | Content quality score /10 |
| `{{tool.benchmarks.ease_of_use}}` | `$tool['benchmarks']['ease_of_use']` | Ease of use score /10 |
| `{{tool.benchmarks.seo_features}}` | `$tool['benchmarks']['seo_features']` | SEO features score /10 |
| `{{tool.benchmarks.value_for_money}}` | `$tool['benchmarks']['value_for_money']` | Value for money score /10 |

## Average Rating Calculation

### HTML Template
```handlebars
{{((tool.benchmarks.content_quality + tool.benchmarks.ease_of_use + tool.benchmarks.value_for_money) / 3).toFixed(1)}}
```

### WordPress PHP
```php
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
echo number_format($average_rating, 1);
```

## Pricing Information

| HTML Template Variable | WordPress/PHP Equivalent | Description |
|----------------------|---------------------------|-------------|
| `{{tool.pricing.free}}` | `$tool['pricing']['free']` | Free plan description |
| `{{tool.pricing.basic}}` | `$tool['pricing']['basic']` | Basic plan description |
| `{{tool.pricing.pro}}` | `$tool['pricing']['pro']` | Pro plan description |
| `{{tool.pricing.enterprise}}` | `$tool['pricing']['enterprise']` | Enterprise plan description |
| `{{tool.starting_price}}` | `$tool['starting_price']` | Starting price display |

## Features Comparison

| HTML Template Variable | WordPress/PHP Equivalent | Description |
|----------------------|---------------------------|-------------|
| `{% for feature in allFeatures %}` | `foreach ($all_features as $feature)` | Loop through all unique features |
| `{{tool.key_features.includes(feature)}}` | `in_array($feature, $tool_features)` | Check if tool has feature |

### Feature Detection Logic

#### HTML Template
```handlebars
{% if tool.key_features.includes(feature) %}
    <svg class="w-5 h-5 text-green-500"><!-- checkmark --></svg>
{% else %}
    <svg class="w-5 h-5 text-red-500"><!-- x mark --></svg>
{% endif %}
```

#### WordPress PHP
```php
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

if ($has_feature) {
    // Show checkmark
} else {
    // Show x mark
}
```

## Pros and Cons

| HTML Template Variable | WordPress/PHP Equivalent | Description |
|----------------------|---------------------------|-------------|
| `{% for pro in tool.pros %}` | `foreach ($tool['pros'] as $pro)` | Loop through tool pros |
| `{% for con in tool.cons %}` | `foreach ($tool['cons'] as $con)` | Loop through tool cons |
| `{{pro}}` | `$pro` or `$pro['point']` | Pro text (handle both string and array) |
| `{{con}}` | `$con` or `$con['point']` | Con text (handle both string and array) |

## Strengths for Quick Verdict

| HTML Template Variable | WordPress/PHP Equivalent | Description |
|----------------------|---------------------------|-------------|
| `{% for strength in tool.strengths %}` | `foreach ($tool['strengths'] as $strength)` | Tool-specific strengths |
| `{{strength}}` | `$strength` | Individual strength description |

## Boolean Values

| HTML Template Variable | WordPress/PHP Equivalent | Description |
|----------------------|---------------------------|-------------|
| `{{tool.api_available}}` | `$tool['api_available']` | API availability (true/false) |
| `{{tool.pricing.free}}` | `!empty($tool['pricing']['free'])` | Has free plan |

## Dynamic Grid Columns

| HTML Template Variable | WordPress/PHP Equivalent | Description |
|----------------------|---------------------------|-------------|
| `grid-cols-{{tools.length}}` | `grid-cols-<?php echo count($tools); ?>` | Dynamic CSS grid columns |
| `md:grid-cols-{{tools.length}}` | `md:grid-cols-<?php echo count($tools); ?>` | Responsive grid columns |

## Schema Markup Generation

### HTML Template
```json
{
    "@context": "https://schema.org",
    "@type": "ComparisonPage",
    "name": "{{comparison.title}}",
    "mainEntity": [
        {% for tool in tools %}
        {
            "@type": "SoftwareApplication",
            "name": "{{tool.tool_name}}",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "{{((tool.benchmarks.content_quality + tool.benchmarks.ease_of_use + tool.benchmarks.value_for_money) / 3).toFixed(1)}}"
            }
        }{% if not loop.last %},{% endif %}
        {% endfor %}
    ]
}
```

### WordPress PHP
```php
$schema_tools = [];
foreach ($tools as $tool) {
    $average_rating = /* calculation logic */;
    $schema_tools[] = [
        '@type' => 'SoftwareApplication',
        'name' => $tool['tool_name'],
        'aggregateRating' => [
            '@type' => 'AggregateRating',
            'ratingValue' => number_format($average_rating, 1)
        ]
    ];
}

$schema = [
    '@context' => 'https://schema.org',
    '@type' => 'ComparisonPage',
    'name' => $comparison_title,
    'mainEntity' => $schema_tools
];

echo json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
```

## JavaScript Data Passing

### HTML Template
```javascript
let toolsData = {{tools | json}};
```

### WordPress PHP
```javascript
let toolsData = <?php echo json_encode($tools, JSON_UNESCAPED_SLASHES); ?>;
```

## URL Generation

| HTML Template | WordPress/PHP Equivalent | Description |
|--------------|---------------------------|-------------|
| `/tools/{{tool.slug}}` | `<?php echo home_url('/tools/' . $tool['slug']); ?>` | Tool detail page link |
| `/comparisons/{{comparison.slug}}` | `<?php echo get_permalink(); ?>` | Current comparison page |
| `/quote?tool={{tool.slug}}` | `<?php echo home_url('/quote?tool=' . $tool['slug']); ?>` | Quote request page |

## Image Paths

| HTML Template | WordPress/PHP Equivalent | Description |
|--------------|---------------------------|-------------|
| `/images/tools/{{tool.slug}}.jpg` | `<?php echo esc_url($tool['logo']); ?>` | Tool logo from ACF |
| `/images/comparisons/{{comparison.slug}}.jpg` | `<?php echo home_url('/images/comparisons/' . $comparison_slug . '.jpg'); ?>` | Comparison OG image |

## AJAX Endpoints

| HTML Template | WordPress/PHP Equivalent | Description |
|--------------|---------------------------|-------------|
| `/api/subscribe` | `<?php echo admin_url('admin-ajax.php'); ?>` | WordPress AJAX endpoint |
| Action: none needed | `action: 'siteoptz_subscribe'` | WordPress AJAX action |
| No nonce | `nonce: '<?php echo wp_create_nonce('siteoptz_subscribe'); ?>'` | WordPress security nonce |

## Data Validation and Sanitization

### HTML Template
- Template engines handle basic escaping
- Client-side validation for forms

### WordPress PHP
- Use `esc_html()` for text output
- Use `esc_url()` for URLs
- Use `esc_attr()` for HTML attributes
- Use `wp_kses_post()` for rich content
- Validate all user inputs

## Responsive Design

Both templates use identical Tailwind CSS classes:
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- `flex flex-col sm:flex-row`
- `hidden md:flex`
- `space-y-4 sm:space-y-0 sm:space-x-4`

## Error Handling

### HTML Template
```javascript
try {
    // API call
} catch (error) {
    console.error('Error:', error);
    alert('Something went wrong');
}
```

### WordPress PHP
```php
// Check if tools exist
if (count($tools) >= 2) {
    // Show comparison
} else {
    // Show error message
}

// Validate data before use
if (!empty($tool['benchmarks'])) {
    // Use benchmarks
}
```

## SEO Best Practices

1. **Dynamic Titles**: Generate SEO-optimized titles from tool names
2. **Meta Descriptions**: Create compelling descriptions mentioning key features
3. **Canonical URLs**: Use proper canonical URLs for comparison pages
4. **Internal Linking**: Link to individual tool pages and related comparisons
5. **Schema Markup**: Implement ComparisonPage and SoftwareApplication schemas
6. **Image Alt Text**: Use descriptive alt text for tool logos and screenshots