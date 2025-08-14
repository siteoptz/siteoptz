<?php
/**
 * Plugin Name: SiteOptz Core
 * Description: Core functionality for SiteOptz.ai AI tools comparison platform
 * Version: 1.0.0
 * Author: SiteOptz.ai
 * License: GPL v2 or later
 * Text Domain: siteoptz
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SITEOPTZ_CORE_VERSION', '1.0.0');
define('SITEOPTZ_CORE_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SITEOPTZ_CORE_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main SiteOptz Core Plugin Class
 */
class SiteOptz_Core {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('rest_api_init', array($this, 'register_api_routes'));
        
        // Admin hooks
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'admin_enqueue_scripts'));
        
        // Activation/deactivation hooks
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    /**
     * Initialize plugin
     */
    public function init() {
        // Load text domain
        load_plugin_textdomain('siteoptz', false, dirname(plugin_basename(__FILE__)) . '/languages');
        
        // Register custom post types
        $this->register_post_types();
        
        // Register custom taxonomies
        $this->register_taxonomies();
        
        // Add custom capabilities
        $this->add_capabilities();
    }
    
    /**
     * Register AI Tools custom post type
     */
    public function register_post_types() {
        // AI Tools Post Type
        register_post_type('ai_tool', array(
            'labels' => array(
                'name' => __('AI Tools', 'siteoptz'),
                'singular_name' => __('AI Tool', 'siteoptz'),
                'add_new' => __('Add New Tool', 'siteoptz'),
                'add_new_item' => __('Add New AI Tool', 'siteoptz'),
                'edit_item' => __('Edit AI Tool', 'siteoptz'),
                'new_item' => __('New AI Tool', 'siteoptz'),
                'view_item' => __('View AI Tool', 'siteoptz'),
                'search_items' => __('Search AI Tools', 'siteoptz'),
                'not_found' => __('No AI tools found', 'siteoptz'),
                'not_found_in_trash' => __('No AI tools found in trash', 'siteoptz')
            ),
            'public' => true,
            'has_archive' => true,
            'menu_icon' => 'dashicons-admin-tools',
            'menu_position' => 20,
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'revisions'),
            'show_in_rest' => true,
            'rewrite' => array('slug' => 'tools'),
            'capability_type' => 'post',
            'hierarchical' => false
        ));
        
        // Comparisons Post Type
        register_post_type('comparison', array(
            'labels' => array(
                'name' => __('Comparisons', 'siteoptz'),
                'singular_name' => __('Comparison', 'siteoptz'),
                'add_new' => __('Add New Comparison', 'siteoptz'),
                'add_new_item' => __('Add New Comparison', 'siteoptz'),
                'edit_item' => __('Edit Comparison', 'siteoptz'),
                'new_item' => __('New Comparison', 'siteoptz'),
                'view_item' => __('View Comparison', 'siteoptz'),
                'search_items' => __('Search Comparisons', 'siteoptz'),
                'not_found' => __('No comparisons found', 'siteoptz'),
                'not_found_in_trash' => __('No comparisons found in trash', 'siteoptz')
            ),
            'public' => true,
            'has_archive' => true,
            'menu_icon' => 'dashicons-analytics',
            'menu_position' => 21,
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'revisions'),
            'show_in_rest' => true,
            'rewrite' => array('slug' => 'comparisons'),
            'capability_type' => 'post',
            'hierarchical' => false
        ));
    }
    
    /**
     * Register custom taxonomies
     */
    public function register_taxonomies() {
        // Tool Categories
        register_taxonomy('tool_category', 'ai_tool', array(
            'labels' => array(
                'name' => __('Tool Categories', 'siteoptz'),
                'singular_name' => __('Tool Category', 'siteoptz'),
                'search_items' => __('Search Categories', 'siteoptz'),
                'all_items' => __('All Categories', 'siteoptz'),
                'parent_item' => __('Parent Category', 'siteoptz'),
                'parent_item_colon' => __('Parent Category:', 'siteoptz'),
                'edit_item' => __('Edit Category', 'siteoptz'),
                'update_item' => __('Update Category', 'siteoptz'),
                'add_new_item' => __('Add New Category', 'siteoptz'),
                'new_item_name' => __('New Category Name', 'siteoptz'),
                'menu_name' => __('Categories', 'siteoptz')
            ),
            'hierarchical' => true,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'show_in_rest' => true,
            'rewrite' => array('slug' => 'tool-category')
        ));
        
        // Tool Tags
        register_taxonomy('tool_tag', 'ai_tool', array(
            'labels' => array(
                'name' => __('Tool Tags', 'siteoptz'),
                'singular_name' => __('Tool Tag', 'siteoptz'),
                'search_items' => __('Search Tags', 'siteoptz'),
                'popular_items' => __('Popular Tags', 'siteoptz'),
                'all_items' => __('All Tags', 'siteoptz'),
                'edit_item' => __('Edit Tag', 'siteoptz'),
                'update_item' => __('Update Tag', 'siteoptz'),
                'add_new_item' => __('Add New Tag', 'siteoptz'),
                'new_item_name' => __('New Tag Name', 'siteoptz'),
                'menu_name' => __('Tags', 'siteoptz')
            ),
            'hierarchical' => false,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'show_in_rest' => true,
            'rewrite' => array('slug' => 'tool-tag')
        ));
    }
    
    /**
     * Add custom capabilities
     */
    public function add_capabilities() {
        $role = get_role('administrator');
        if ($role) {
            $role->add_cap('manage_ai_tools');
            $role->add_cap('edit_ai_tools');
            $role->add_cap('delete_ai_tools');
        }
    }
    
    /**
     * Enqueue frontend scripts and styles
     */
    public function enqueue_scripts() {
        wp_enqueue_style(
            'siteoptz-core-styles',
            SITEOPTZ_CORE_PLUGIN_URL . 'assets/css/siteoptz-core.css',
            array(),
            SITEOPTZ_CORE_VERSION
        );
        
        wp_enqueue_script(
            'siteoptz-core-scripts',
            SITEOPTZ_CORE_PLUGIN_URL . 'assets/js/siteoptz-core.js',
            array('jquery'),
            SITEOPTZ_CORE_VERSION,
            true
        );
        
        // Localize script for AJAX
        wp_localize_script('siteoptz-core-scripts', 'siteoptz_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('siteoptz_nonce'),
            'api_url' => home_url('/wp-json/siteoptz/v1/')
        ));
    }
    
    /**
     * Enqueue admin scripts and styles
     */
    public function admin_enqueue_scripts($hook) {
        wp_enqueue_style(
            'siteoptz-admin-styles',
            SITEOPTZ_CORE_PLUGIN_URL . 'assets/css/admin.css',
            array(),
            SITEOPTZ_CORE_VERSION
        );
        
        wp_enqueue_script(
            'siteoptz-admin-scripts',
            SITEOPTZ_CORE_PLUGIN_URL . 'assets/js/admin.js',
            array('jquery'),
            SITEOPTZ_CORE_VERSION,
            true
        );
    }
    
    /**
     * Add admin menu pages
     */
    public function add_admin_menu() {
        add_menu_page(
            __('SiteOptz Dashboard', 'siteoptz'),
            __('SiteOptz', 'siteoptz'),
            'manage_options',
            'siteoptz-dashboard',
            array($this, 'admin_dashboard_page'),
            'dashicons-admin-tools',
            6
        );
        
        add_submenu_page(
            'siteoptz-dashboard',
            __('Settings', 'siteoptz'),
            __('Settings', 'siteoptz'),
            'manage_options',
            'siteoptz-settings',
            array($this, 'admin_settings_page')
        );
        
        add_submenu_page(
            'siteoptz-dashboard',
            __('Import Tools', 'siteoptz'),
            __('Import Tools', 'siteoptz'),
            'manage_options',
            'siteoptz-import',
            array($this, 'admin_import_page')
        );
    }
    
    /**
     * Admin dashboard page
     */
    public function admin_dashboard_page() {
        $tools_count = wp_count_posts('ai_tool')->publish;
        $comparisons_count = wp_count_posts('comparison')->publish;
        ?>
        <div class="wrap">
            <h1><?php _e('SiteOptz Dashboard', 'siteoptz'); ?></h1>
            
            <div class="siteoptz-dashboard-stats">
                <div class="stat-box">
                    <h3><?php echo $tools_count; ?></h3>
                    <p><?php _e('AI Tools', 'siteoptz'); ?></p>
                </div>
                <div class="stat-box">
                    <h3><?php echo $comparisons_count; ?></h3>
                    <p><?php _e('Comparisons', 'siteoptz'); ?></p>
                </div>
            </div>
            
            <div class="siteoptz-quick-actions">
                <h2><?php _e('Quick Actions', 'siteoptz'); ?></h2>
                <p>
                    <a href="<?php echo admin_url('post-new.php?post_type=ai_tool'); ?>" class="button button-primary">
                        <?php _e('Add New AI Tool', 'siteoptz'); ?>
                    </a>
                    <a href="<?php echo admin_url('post-new.php?post_type=comparison'); ?>" class="button button-secondary">
                        <?php _e('Create Comparison', 'siteoptz'); ?>
                    </a>
                    <a href="<?php echo admin_url('admin.php?page=siteoptz-import'); ?>" class="button button-secondary">
                        <?php _e('Import Tools', 'siteoptz'); ?>
                    </a>
                </p>
            </div>
        </div>
        <?php
    }
    
    /**
     * Admin settings page
     */
    public function admin_settings_page() {
        if (isset($_POST['submit'])) {
            update_option('siteoptz_api_key', sanitize_text_field($_POST['api_key']));
            update_option('siteoptz_email_notifications', isset($_POST['email_notifications']));
            echo '<div class="notice notice-success"><p>' . __('Settings saved!', 'siteoptz') . '</p></div>';
        }
        
        $api_key = get_option('siteoptz_api_key', '');
        $email_notifications = get_option('siteoptz_email_notifications', false);
        ?>
        <div class="wrap">
            <h1><?php _e('SiteOptz Settings', 'siteoptz'); ?></h1>
            
            <form method="post" action="">
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php _e('API Key', 'siteoptz'); ?></th>
                        <td>
                            <input type="text" name="api_key" value="<?php echo esc_attr($api_key); ?>" class="regular-text" />
                            <p class="description"><?php _e('Enter your SiteOptz API key for external integrations.', 'siteoptz'); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('Email Notifications', 'siteoptz'); ?></th>
                        <td>
                            <label>
                                <input type="checkbox" name="email_notifications" <?php checked($email_notifications); ?> />
                                <?php _e('Enable email notifications for new tools and comparisons', 'siteoptz'); ?>
                            </label>
                        </td>
                    </tr>
                </table>
                
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
    
    /**
     * Admin import page
     */
    public function admin_import_page() {
        if (isset($_POST['import_tools']) && isset($_FILES['tools_file'])) {
            $this->import_tools_from_json($_FILES['tools_file']);
        }
        ?>
        <div class="wrap">
            <h1><?php _e('Import AI Tools', 'siteoptz'); ?></h1>
            
            <form method="post" enctype="multipart/form-data">
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php _e('Tools JSON File', 'siteoptz'); ?></th>
                        <td>
                            <input type="file" name="tools_file" accept=".json" required />
                            <p class="description"><?php _e('Upload a JSON file containing AI tools data.', 'siteoptz'); ?></p>
                        </td>
                    </tr>
                </table>
                
                <?php submit_button(__('Import Tools', 'siteoptz'), 'primary', 'import_tools'); ?>
            </form>
        </div>
        <?php
    }
    
    /**
     * Import tools from JSON file
     */
    public function import_tools_from_json($file) {
        if ($file['error'] !== UPLOAD_ERR_OK) {
            echo '<div class="notice notice-error"><p>' . __('Upload error occurred.', 'siteoptz') . '</p></div>';
            return;
        }
        
        $json_data = file_get_contents($file['tmp_name']);
        $tools_data = json_decode($json_data, true);
        
        if (!$tools_data || !isset($tools_data['tools'])) {
            echo '<div class="notice notice-error"><p>' . __('Invalid JSON file format.', 'siteoptz') . '</p></div>';
            return;
        }
        
        $imported_count = 0;
        
        foreach ($tools_data['tools'] as $tool_data) {
            $post_id = wp_insert_post(array(
                'post_title' => sanitize_text_field($tool_data['name']),
                'post_content' => wp_kses_post($tool_data['description']),
                'post_excerpt' => wp_trim_words($tool_data['description'], 20),
                'post_status' => 'publish',
                'post_type' => 'ai_tool'
            ));
            
            if ($post_id) {
                // Add meta fields
                update_post_meta($post_id, '_tool_pricing', sanitize_text_field($tool_data['pricing']['plans'][0]['price'] ?? ''));
                update_post_meta($post_id, '_tool_rating', floatval($tool_data['rating'] ?? 0));
                update_post_meta($post_id, '_tool_website', esc_url($tool_data['website'] ?? ''));
                update_post_meta($post_id, '_tool_features', sanitize_textarea_field(implode(', ', $tool_data['features'] ?? array())));
                
                // Set category
                if (isset($tool_data['category'])) {
                    wp_set_object_terms($post_id, $tool_data['category'], 'tool_category');
                }
                
                $imported_count++;
            }
        }
        
        echo '<div class="notice notice-success"><p>' . sprintf(__('%d tools imported successfully!', 'siteoptz'), $imported_count) . '</p></div>';
    }
    
    /**
     * Register REST API routes
     */
    public function register_api_routes() {
        // Tools API
        register_rest_route('siteoptz/v1', '/tools', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_tools_api'),
            'permission_callback' => '__return_true'
        ));
        
        register_rest_route('siteoptz/v1', '/tools/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_tool_api'),
            'permission_callback' => '__return_true'
        ));
        
        // Save quote endpoint
        register_rest_route('siteoptz/v1', '/save-quote', array(
            'methods' => 'POST',
            'callback' => array($this, 'save_quote_api'),
            'permission_callback' => '__return_true'
        ));
        
        // Lead capture endpoint
        register_rest_route('siteoptz/v1', '/capture-lead', array(
            'methods' => 'POST',
            'callback' => array($this, 'capture_lead_api'),
            'permission_callback' => '__return_true'
        ));
    }
    
    /**
     * Get tools API endpoint
     */
    public function get_tools_api($request) {
        $args = array(
            'post_type' => 'ai_tool',
            'posts_per_page' => $request->get_param('per_page') ?: 10,
            'post_status' => 'publish'
        );
        
        $tools = get_posts($args);
        $data = array();
        
        foreach ($tools as $tool) {
            $data[] = array(
                'id' => $tool->ID,
                'name' => $tool->post_title,
                'description' => $tool->post_excerpt,
                'content' => $tool->post_content,
                'pricing' => get_post_meta($tool->ID, '_tool_pricing', true),
                'rating' => floatval(get_post_meta($tool->ID, '_tool_rating', true)),
                'website' => get_post_meta($tool->ID, '_tool_website', true),
                'features' => explode(', ', get_post_meta($tool->ID, '_tool_features', true)),
                'permalink' => get_permalink($tool->ID)
            );
        }
        
        return new WP_REST_Response($data, 200);
    }
    
    /**
     * Get single tool API endpoint
     */
    public function get_tool_api($request) {
        $tool_id = $request->get_param('id');
        $tool = get_post($tool_id);
        
        if (!$tool || $tool->post_type !== 'ai_tool') {
            return new WP_Error('tool_not_found', 'Tool not found', array('status' => 404));
        }
        
        $data = array(
            'id' => $tool->ID,
            'name' => $tool->post_title,
            'description' => $tool->post_excerpt,
            'content' => $tool->post_content,
            'pricing' => get_post_meta($tool->ID, '_tool_pricing', true),
            'rating' => floatval(get_post_meta($tool->ID, '_tool_rating', true)),
            'website' => get_post_meta($tool->ID, '_tool_website', true),
            'features' => explode(', ', get_post_meta($tool->ID, '_tool_features', true)),
            'permalink' => get_permalink($tool->ID)
        );
        
        return new WP_REST_Response($data, 200);
    }
    
    /**
     * Save quote API endpoint
     */
    public function save_quote_api($request) {
        $params = $request->get_json_params();
        
        $quote_id = wp_generate_uuid4();
        $quote_data = array(
            'quote_id' => $quote_id,
            'email' => sanitize_email($params['email']),
            'tool' => sanitize_text_field($params['tool']),
            'plan' => $params['plan'],
            'usage' => $params['usage'],
            'total_cost' => floatval($params['totalCost']),
            'timestamp' => current_time('mysql')
        );
        
        // Save to database (you might want to create a custom table)
        update_option('siteoptz_quote_' . $quote_id, $quote_data);
        
        // Send email notification
        $this->send_quote_email($quote_data);
        
        return new WP_REST_Response(array(
            'success' => true,
            'quoteId' => $quote_id,
            'message' => 'Quote saved successfully'
        ), 200);
    }
    
    /**
     * Capture lead API endpoint
     */
    public function capture_lead_api($request) {
        $params = $request->get_json_params();
        
        $lead_data = array(
            'email' => sanitize_email($params['email']),
            'name' => sanitize_text_field($params['name'] ?? ''),
            'company' => sanitize_text_field($params['company'] ?? ''),
            'type' => sanitize_text_field($params['type']),
            'source' => sanitize_text_field($params['source']),
            'timestamp' => current_time('mysql')
        );
        
        // Save lead to database
        global $wpdb;
        $table_name = $wpdb->prefix . 'siteoptz_leads';
        
        $result = $wpdb->insert($table_name, $lead_data);
        
        if ($result) {
            // Send welcome email
            $this->send_welcome_email($lead_data);
            
            return new WP_REST_Response(array(
                'success' => true,
                'message' => 'Lead captured successfully'
            ), 200);
        }
        
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Failed to save lead'
        ), 500);
    }
    
    /**
     * Send quote email
     */
    private function send_quote_email($quote_data) {
        $to = $quote_data['email'];
        $subject = __('Your SiteOptz AI Tool Quote', 'siteoptz');
        $message = sprintf(
            __('Thank you for using our pricing calculator! Your quote for %s is $%.2f. Quote ID: %s', 'siteoptz'),
            $quote_data['tool'],
            $quote_data['total_cost'],
            $quote_data['quote_id']
        );
        
        wp_mail($to, $subject, $message);
    }
    
    /**
     * Send welcome email
     */
    private function send_welcome_email($lead_data) {
        $to = $lead_data['email'];
        $subject = __('Welcome to SiteOptz!', 'siteoptz');
        $message = sprintf(
            __('Hi %s, welcome to SiteOptz! We\'ll keep you updated with the latest AI tool insights.', 'siteoptz'),
            $lead_data['name'] ?: 'there'
        );
        
        wp_mail($to, $subject, $message);
    }
    
    /**
     * Plugin activation
     */
    public function activate() {
        // Create custom database tables
        $this->create_database_tables();
        
        // Flush rewrite rules
        flush_rewrite_rules();
        
        // Set default options
        add_option('siteoptz_version', SITEOPTZ_CORE_VERSION);
        add_option('siteoptz_activation_date', current_time('mysql'));
    }
    
    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Create custom database tables
     */
    private function create_database_tables() {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        
        // Leads table
        $table_name = $wpdb->prefix . 'siteoptz_leads';
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            email varchar(100) NOT NULL,
            name varchar(100) DEFAULT '',
            company varchar(100) DEFAULT '',
            type varchar(50) DEFAULT '',
            source varchar(255) DEFAULT '',
            timestamp datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}

// Initialize the plugin
new SiteOptz_Core();