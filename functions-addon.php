<?php
/**
 * SiteOptz AI Tool Comparison Functionality
 * Add these functions to your theme's functions.php file
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue comparison page scripts and styles
 */
function siteoptz_enqueue_comparison_assets() {
    // Only load on comparison pages
    if (is_page_template('page-chatgpt-vs-jasper-ai.php') || 
        has_shortcode(get_post()->post_content, 'ai_comparison') ||
        is_page('chatgpt-vs-jasper-ai-comparison-2025')) {
        
        // Enqueue CSS
        wp_enqueue_style(
            'ai-comparison-styles',
            get_template_directory_uri() . '/css/ai-comparison-styles.css',
            array(),
            '1.0.0'
        );
        
        // Enqueue JavaScript
        wp_enqueue_script(
            'affiliate-tracking',
            get_template_directory_uri() . '/js/affiliate-tracking.js',
            array('jquery'),
            '1.0.0',
            true
        );
        
        // Localize script with WordPress data
        wp_localize_script('affiliate-tracking', 'siteoptz_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('siteoptz_tracking_nonce'),
            'ga4_id' => get_option('siteoptz_ga4_id', ''),
            'affiliate_links' => get_option('siteoptz_affiliate_links', array())
        ));
    }
}
add_action('wp_enqueue_scripts', 'siteoptz_enqueue_comparison_assets');

/**
 * Handle email capture AJAX request
 */
function handle_email_capture() {
    // Verify nonce
    if (!wp_verify_nonce($_POST['email_nonce'], 'email_capture_nonce')) {
        wp_die('Security check failed');
    }
    
    $email = sanitize_email($_POST['email']);
    
    if (!is_email($email)) {
        wp_send_json_error('Invalid email address');
        return;
    }
    
    // Save to database
    $result = save_email_capture($email);
    
    if ($result) {
        // Send to email marketing platform (example: Mailchimp)
        $mailchimp_result = add_to_mailchimp($email);
        
        // Track conversion
        track_conversion('email_capture', $email);
        
        wp_send_json_success('Email captured successfully');
    } else {
        wp_send_json_error('Failed to save email');
    }
}
add_action('wp_ajax_capture_email', 'handle_email_capture');
add_action('wp_ajax_nopriv_capture_email', 'handle_email_capture');

/**
 * Save email capture to database
 */
function save_email_capture($email) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'siteoptz_email_captures';
    
    // Create table if it doesn't exist
    create_email_captures_table();
    
    $result = $wpdb->insert(
        $table_name,
        array(
            'email' => $email,
            'source_page' => $_SERVER['HTTP_REFERER'] ?? '',
            'lead_magnet' => 'ai_tool_guide',
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
            'capture_date' => current_time('mysql')
        ),
        array('%s', '%s', '%s', '%s', '%s', '%s')
    );
    
    return $result !== false;
}

/**
 * Create email captures table
 */
function create_email_captures_table() {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'siteoptz_email_captures';
    
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        email varchar(255) NOT NULL,
        source_page text,
        lead_magnet varchar(100),
        ip_address varchar(45),
        user_agent text,
        capture_date datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY email (email)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

/**
 * Add to Mailchimp (example integration)
 */
function add_to_mailchimp($email) {
    $api_key = get_option('siteoptz_mailchimp_api_key');
    $list_id = get_option('siteoptz_mailchimp_list_id');
    
    if (!$api_key || !$list_id) {
        return false;
    }
    
    $datacenter = substr($api_key, strpos($api_key, '-') + 1);
    $url = "https://{$datacenter}.api.mailchimp.com/3.0/lists/{$list_id}/members";
    
    $data = array(
        'email_address' => $email,
        'status' => 'subscribed',
        'tags' => array('ai-tools', 'comparison-page', 'lead-magnet')
    );
    
    $response = wp_remote_post($url, array(
        'headers' => array(
            'Authorization' => 'Basic ' . base64_encode('user:' . $api_key),
            'Content-Type' => 'application/json'
        ),
        'body' => json_encode($data)
    ));
    
    return !is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200;
}

/**
 * Handle affiliate tracking AJAX request
 */
function handle_affiliate_tracking() {
    // Verify nonce
    if (!wp_verify_nonce($_POST['nonce'], 'siteoptz_tracking_nonce')) {
        wp_die('Security check failed');
    }
    
    $event_type = sanitize_text_field($_POST['event_type']);
    $event_data = json_decode(stripslashes($_POST['event_data']), true);
    
    // Save tracking data
    save_tracking_event($event_type, $event_data);
    
    wp_send_json_success('Event tracked');
}
add_action('wp_ajax_track_affiliate_event', 'handle_affiliate_tracking');
add_action('wp_ajax_nopriv_track_affiliate_event', 'handle_affiliate_tracking');

/**
 * Save tracking event to database
 */
function save_tracking_event($event_type, $event_data) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'siteoptz_tracking_events';
    
    // Create table if it doesn't exist
    create_tracking_events_table();
    
    $wpdb->insert(
        $table_name,
        array(
            'event_type' => $event_type,
            'event_data' => json_encode($event_data),
            'page_url' => $_SERVER['HTTP_REFERER'] ?? '',
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
            'event_date' => current_time('mysql')
        ),
        array('%s', '%s', '%s', '%s', '%s', '%s')
    );
}

/**
 * Create tracking events table
 */
function create_tracking_events_table() {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'siteoptz_tracking_events';
    
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        event_type varchar(100) NOT NULL,
        event_data longtext,
        page_url text,
        ip_address varchar(45),
        user_agent text,
        event_date datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY event_type (event_type),
        KEY event_date (event_date)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

/**
 * Track conversion events
 */
function track_conversion($conversion_type, $conversion_value = null) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'siteoptz_conversions';
    
    // Create table if it doesn't exist
    create_conversions_table();
    
    $wpdb->insert(
        $table_name,
        array(
            'conversion_type' => $conversion_type,
            'conversion_value' => $conversion_value,
            'page_url' => $_SERVER['HTTP_REFERER'] ?? '',
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
            'conversion_date' => current_time('mysql')
        ),
        array('%s', '%s', '%s', '%s', '%s')
    );
}

/**
 * Create conversions table
 */
function create_conversions_table() {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'siteoptz_conversions';
    
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        conversion_type varchar(100) NOT NULL,
        conversion_value varchar(255),
        page_url text,
        ip_address varchar(45),
        conversion_date datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY conversion_type (conversion_type),
        KEY conversion_date (conversion_date)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

/**
 * Add admin menu for tracking analytics
 */
function siteoptz_add_admin_menu() {
    add_menu_page(
        'SiteOptz Analytics',
        'SiteOptz Analytics',
        'manage_options',
        'siteoptz-analytics',
        'siteoptz_analytics_page',
        'dashicons-chart-area',
        30
    );
    
    add_submenu_page(
        'siteoptz-analytics',
        'Email Captures',
        'Email Captures',
        'manage_options',
        'siteoptz-emails',
        'siteoptz_emails_page'
    );
    
    add_submenu_page(
        'siteoptz-analytics',
        'Affiliate Tracking',
        'Affiliate Tracking',
        'manage_options',
        'siteoptz-affiliate',
        'siteoptz_affiliate_page'
    );
    
    add_submenu_page(
        'siteoptz-analytics',
        'Settings',
        'Settings',
        'manage_options',
        'siteoptz-settings',
        'siteoptz_settings_page'
    );
}
add_action('admin_menu', 'siteoptz_add_admin_menu');

/**
 * Analytics dashboard page
 */
function siteoptz_analytics_page() {
    global $wpdb;
    
    // Get recent statistics
    $email_captures = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}siteoptz_email_captures WHERE capture_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
    $affiliate_clicks = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}siteoptz_tracking_events WHERE event_type = 'affiliate_click' AND event_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
    $conversions = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}siteoptz_conversions WHERE conversion_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
    
    ?>
    <div class="wrap">
        <h1>SiteOptz Analytics Dashboard</h1>
        
        <div class="siteoptz-stats-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0;">
            <div class="stat-card" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3>Email Captures (30 days)</h3>
                <p style="font-size: 2rem; font-weight: bold; color: #4CAF50;"><?php echo esc_html($email_captures); ?></p>
            </div>
            
            <div class="stat-card" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3>Affiliate Clicks (30 days)</h3>
                <p style="font-size: 2rem; font-weight: bold; color: #2196F3;"><?php echo esc_html($affiliate_clicks); ?></p>
            </div>
            
            <div class="stat-card" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3>Conversions (30 days)</h3>
                <p style="font-size: 2rem; font-weight: bold; color: #FF9800;"><?php echo esc_html($conversions); ?></p>
            </div>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3>Recent Activity</h3>
            <?php
            $recent_events = $wpdb->get_results("
                SELECT event_type, event_date, COUNT(*) as count 
                FROM {$wpdb->prefix}siteoptz_tracking_events 
                WHERE event_date >= DATE_SUB(NOW(), INTERVAL 7 DAY) 
                GROUP BY event_type, DATE(event_date) 
                ORDER BY event_date DESC 
                LIMIT 10
            ");
            
            if ($recent_events) {
                echo '<table class="wp-list-table widefat fixed striped">';
                echo '<thead><tr><th>Event Type</th><th>Date</th><th>Count</th></tr></thead>';
                echo '<tbody>';
                foreach ($recent_events as $event) {
                    echo '<tr>';
                    echo '<td>' . esc_html($event->event_type) . '</td>';
                    echo '<td>' . esc_html($event->event_date) . '</td>';
                    echo '<td>' . esc_html($event->count) . '</td>';
                    echo '</tr>';
                }
                echo '</tbody></table>';
            } else {
                echo '<p>No recent activity found.</p>';
            }
            ?>
        </div>
    </div>
    <?php
}

/**
 * Email captures page
 */
function siteoptz_emails_page() {
    global $wpdb;
    
    $emails = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}siteoptz_email_captures ORDER BY capture_date DESC LIMIT 100");
    
    ?>
    <div class="wrap">
        <h1>Email Captures</h1>
        
        <?php if ($emails): ?>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Lead Magnet</th>
                        <th>Source Page</th>
                        <th>Capture Date</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($emails as $email): ?>
                        <tr>
                            <td><?php echo esc_html($email->email); ?></td>
                            <td><?php echo esc_html($email->lead_magnet); ?></td>
                            <td><?php echo esc_html($email->source_page); ?></td>
                            <td><?php echo esc_html($email->capture_date); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <p>No email captures found.</p>
        <?php endif; ?>
    </div>
    <?php
}

/**
 * Affiliate tracking page
 */
function siteoptz_affiliate_page() {
    global $wpdb;
    
    $affiliate_clicks = $wpdb->get_results("
        SELECT * FROM {$wpdb->prefix}siteoptz_tracking_events 
        WHERE event_type = 'affiliate_click' 
        ORDER BY event_date DESC 
        LIMIT 100
    ");
    
    ?>
    <div class="wrap">
        <h1>Affiliate Click Tracking</h1>
        
        <?php if ($affiliate_clicks): ?>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Event Data</th>
                        <th>Page URL</th>
                        <th>Click Date</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($affiliate_clicks as $click): ?>
                        <tr>
                            <td><?php echo esc_html($click->event_data); ?></td>
                            <td><?php echo esc_html($click->page_url); ?></td>
                            <td><?php echo esc_html($click->event_date); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <p>No affiliate clicks found.</p>
        <?php endif; ?>
    </div>
    <?php
}

/**
 * Settings page
 */
function siteoptz_settings_page() {
    if (isset($_POST['submit'])) {
        update_option('siteoptz_ga4_id', sanitize_text_field($_POST['ga4_id']));
        update_option('siteoptz_mailchimp_api_key', sanitize_text_field($_POST['mailchimp_api_key']));
        update_option('siteoptz_mailchimp_list_id', sanitize_text_field($_POST['mailchimp_list_id']));
        echo '<div class="notice notice-success"><p>Settings saved!</p></div>';
    }
    
    $ga4_id = get_option('siteoptz_ga4_id', '');
    $mailchimp_api_key = get_option('siteoptz_mailchimp_api_key', '');
    $mailchimp_list_id = get_option('siteoptz_mailchimp_list_id', '');
    
    ?>
    <div class="wrap">
        <h1>SiteOptz Settings</h1>
        
        <form method="post" action="">
            <table class="form-table">
                <tr>
                    <th scope="row">Google Analytics 4 Measurement ID</th>
                    <td>
                        <input type="text" name="ga4_id" value="<?php echo esc_attr($ga4_id); ?>" class="regular-text" />
                        <p class="description">Your GA4 Measurement ID (e.g., G-XXXXXXXXXX)</p>
                    </td>
                </tr>
                
                <tr>
                    <th scope="row">Mailchimp API Key</th>
                    <td>
                        <input type="text" name="mailchimp_api_key" value="<?php echo esc_attr($mailchimp_api_key); ?>" class="regular-text" />
                        <p class="description">Your Mailchimp API key for email list integration</p>
                    </td>
                </tr>
                
                <tr>
                    <th scope="row">Mailchimp List ID</th>
                    <td>
                        <input type="text" name="mailchimp_list_id" value="<?php echo esc_attr($mailchimp_list_id); ?>" class="regular-text" />
                        <p class="description">The ID of your Mailchimp list for new subscribers</p>
                    </td>
                </tr>
            </table>
            
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

/**
 * Create database tables on activation
 */
function siteoptz_create_tables() {
    create_email_captures_table();
    create_tracking_events_table();
    create_conversions_table();
}
register_activation_hook(__FILE__, 'siteoptz_create_tables');

/**
 * Add comparison page shortcode
 */
function ai_comparison_shortcode($atts) {
    $atts = shortcode_atts(array(
        'tool1' => 'ChatGPT',
        'tool2' => 'Jasper AI',
        'template' => 'basic'
    ), $atts);
    
    ob_start();
    
    // Include comparison template
    if ($atts['template'] === 'table') {
        include(get_template_directory() . '/templates/comparison-table.php');
    } else {
        include(get_template_directory() . '/templates/comparison-basic.php');
    }
    
    return ob_get_clean();
}
add_shortcode('ai_comparison', 'ai_comparison_shortcode');

/**
 * SEO meta tags for comparison pages
 */
function add_comparison_meta_tags() {
    if (is_page_template('page-chatgpt-vs-jasper-ai.php') || is_page('chatgpt-vs-jasper-ai-comparison-2025')) {
        ?>
        <meta name="description" content="Compare ChatGPT vs Jasper AI pricing, features, and use cases. Find the best AI writing tool for your needs in 2025." />
        <meta name="keywords" content="ChatGPT vs Jasper AI, AI writing tools, content creation, comparison 2025" />
        <meta property="og:title" content="ChatGPT vs Jasper AI: Complete Comparison [2025]" />
        <meta property="og:description" content="Compare ChatGPT vs Jasper AI pricing, features, and use cases. Find the best AI writing tool for your needs in 2025." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="<?php echo get_permalink(); ?>" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ChatGPT vs Jasper AI: Complete Comparison [2025]" />
        <meta name="twitter:description" content="Compare ChatGPT vs Jasper AI pricing, features, and use cases." />
        <?php
    }
}
add_action('wp_head', 'add_comparison_meta_tags');
?>