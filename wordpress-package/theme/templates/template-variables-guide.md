# Template Variables Mapping Guide

This guide shows how template variables map between the HTML template and WordPress PHP template.

## Meta Tags & SEO

| HTML Template Variable | WordPress/PHP Equivalent | ACF Field |
|----------------------|---------------------------|-----------|
| `{{tool.meta_title}}` | `get_field('meta_title')` | meta_title |
| `{{tool.meta_description}}` | `get_field('meta_description')` | meta_description |
| `{{tool.target_keywords.join(', ')}}` | `implode(', ', get_field('target_keywords'))` | target_keywords (repeater) |
| `{{tool.slug}}` | `get_post_field('post_name')` | Auto-generated from post |

## Basic Tool Information

| HTML Template Variable | WordPress/PHP Equivalent | ACF Field |
|----------------------|---------------------------|-----------|
| `{{tool.tool_name}}` | `get_the_title()` | Post title |
| `{{tool.description}}` | `get_field('description')` | description |
| `{{tool.category}}` | `get_field('category')` | category |
| `{{tool.developer}}` | `get_field('developer')` | developer |
| `{{tool.website}}` | `get_field('website_url')` | website_url |

## Logo and Images

| HTML Template Variable | WordPress/PHP Equivalent | ACF Field |
|----------------------|---------------------------|-----------|
| `{{tool.tool_name.charAt(0)}}` | `substr(get_the_title(), 0, 1)` | First letter fallback |
| Logo image | `get_field('logo')` | logo (image field) |

## Pricing Information

| HTML Template Variable | WordPress/PHP Equivalent | ACF Field |
|----------------------|---------------------------|-----------|
| `{{tool.pricing.free}}` | `$pricing['free']` | pricing.free |
| `{{tool.pricing.basic}}` | `$pricing['basic']` | pricing.basic |
| `{{tool.pricing.pro}}` | `$pricing['pro']` | pricing.pro |
| `{{tool.pricing.enterprise}}` | `$pricing['enterprise']` | pricing.enterprise |

## Features and Content

| HTML Template Variable | WordPress/PHP Equivalent | ACF Field |
|----------------------|---------------------------|-----------|
| `{% for feature in tool.key_features %}` | `foreach (get_field('key_features') as $feature)` | key_features (repeater) |
| `{% for pro in tool.pros %}` | `foreach (get_field('pros') as $pro)` | pros (repeater) |
| `{% for con in tool.cons %}` | `foreach (get_field('cons') as $con)` | cons (repeater) |

## Benchmarks/Ratings

| HTML Template Variable | WordPress/PHP Equivalent | ACF Field |
|----------------------|---------------------------|-----------|
| `{{tool.benchmarks.content_quality}}` | `$benchmarks['content_quality']` | benchmarks.content_quality |
| `{{tool.benchmarks.ease_of_use}}` | `$benchmarks['ease_of_use']` | benchmarks.ease_of_use |
| `{{tool.benchmarks.seo_features}}` | `$benchmarks['seo_features']` | benchmarks.seo_features |
| `{{tool.benchmarks.team_collaboration}}` | `$benchmarks['team_collaboration']` | benchmarks.team_collaboration |
| `{{tool.benchmarks.value_for_money}}` | `$benchmarks['value_for_money']` | benchmarks.value_for_money |
| `{{tool.benchmarks.customer_support}}` | `$benchmarks['customer_support']` | benchmarks.customer_support |

## Average Rating Calculation

```php
// HTML Template
{{(tool.benchmarks.content_quality + tool.benchmarks.ease_of_use + tool.benchmarks.value_for_money) / 3}}

// WordPress PHP
$benchmarks = get_field('benchmarks') ?: [];
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
```

## FAQ Section

| HTML Template Variable | WordPress/PHP Equivalent | ACF Field |
|----------------------|---------------------------|-----------|
| `{% for faq in faqs %}` | `foreach (get_field('faqs') as $faq)` | faqs (repeater) |
| `{{faq.question}}` | `$faq['question']` | faqs.question |
| `{{faq.answer}}` | `$faq['answer']` | faqs.answer |

## Related Tools

| HTML Template Variable | WordPress/PHP Equivalent | ACF Field |
|----------------------|---------------------------|-----------|
| `{% for related in tool.related_tools %}` | `foreach (get_field('related_tools') as $related)` | related_tools (repeater) |
| `{{related.toLowerCase().replace(' ', '-')}}` | `strtolower(str_replace(' ', '-', $related))` | URL slugification |

## Template Engine Differences

### Jinja2/Handlebars (HTML Template)
- Uses `{{variable}}` for output
- Uses `{% for %}` for loops
- Uses `{% if %}` for conditions
- Has built-in filters like `.join()`, `.charAt()`

### WordPress PHP Template
- Uses `<?php echo $variable; ?>` for output
- Uses `foreach ($array as $item)` for loops
- Uses `if ($condition)` for conditions
- Uses PHP functions like `implode()`, `substr()`

## Schema.org JSON-LD Mapping

Both templates generate similar schema markup but with different data sources:

### HTML Template
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "{{tool.tool_name}}",
  "description": "{{tool.description}}"
}
```

### WordPress PHP
```php
$schema = [
    '@context' => 'https://schema.org',
    '@type' => 'SoftwareApplication',
    'name' => get_the_title(),
    'description' => get_field('description')
];
echo json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
```

## Data Structure Requirements

### For HTML Template (JSON/JavaScript)
- Data should be provided as nested objects
- Arrays for repeating content (features, pros, cons)
- Numeric values for benchmarks
- String values for text content

### For WordPress Template (ACF Fields)
- Use ACF Groups for nested data (pricing, benchmarks)
- Use ACF Repeaters for arrays (features, pros, cons, faqs)
- Use appropriate field types (text, textarea, number, true/false)
- Use image fields for logos and media

## Fallback Values

Both templates should handle missing data gracefully:

### HTML Template
```handlebars
{{#if tool.pricing.free}}
    {{tool.pricing.free}}
{{else}}
    No free plan available
{{/if}}
```

### WordPress PHP
```php
<?php if (get_field('pricing')['free']) : ?>
    <?php echo esc_html(get_field('pricing')['free']); ?>
<?php else : ?>
    No free plan available
<?php endif; ?>
```

## Security Considerations

### HTML Template
- Variables are automatically escaped in most template engines
- User content should be sanitized before template rendering

### WordPress PHP
- Use `esc_html()` for text output
- Use `esc_url()` for URLs  
- Use `wp_kses_post()` for rich text content
- Use `esc_attr()` for HTML attributes

## Performance Notes

1. **HTML Template**: Faster rendering as it's client-side processed
2. **WordPress PHP**: Server-side processing, better for SEO
3. **Caching**: Consider caching compiled templates for better performance
4. **Image Optimization**: Both templates should use optimized images
5. **Lazy Loading**: Implement lazy loading for images in both templates