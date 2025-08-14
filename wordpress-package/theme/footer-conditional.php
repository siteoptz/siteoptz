<?php
/**
 * Footer template with conditional loading
 *
 * This file allows you to switch between different footer versions
 *
 * @package SiteOptz_Premium
 */

// Check if we should use the premium footer
$use_premium_footer = get_theme_mod('use_premium_footer', true);

if ($use_premium_footer) {
    // Load the ultra-premium footer
    get_template_part('footer', 'ultra-premium');
} else {
    // Load the standard footer
    get_template_part('footer', 'standard');
}
?>