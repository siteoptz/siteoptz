<?php
/**
 * Plugin Name: SiteOptz Pricing Calculator
 * Description: Advanced pricing calculator for AI tools with quote generation and email capture
 * Version: 1.0.0
 * Author: SiteOptz.ai
 * License: GPL v2 or later
 * Text Domain: siteoptz-calculator
 * Requires: SiteOptz Core
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SITEOPTZ_CALCULATOR_VERSION', '1.0.0');
define('SITEOPTZ_CALCULATOR_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SITEOPTZ_CALCULATOR_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main SiteOptz Calculator Plugin Class
 */
class SiteOptz_Calculator {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('rest_api_init', array($this, 'register_api_routes'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Shortcodes
        add_shortcode('siteoptz_calculator', array($this, 'calculator_shortcode'));
        add_shortcode('siteoptz_pricing_table', array($this, 'pricing_table_shortcode'));
        
        // AJAX handlers
        add_action('wp_ajax_calculate_pricing', array($this, 'handle_calculate_pricing'));
        add_action('wp_ajax_nopriv_calculate_pricing', array($this, 'handle_calculate_pricing'));
        add_action('wp_ajax_save_calculator_quote', array($this, 'handle_save_quote'));
        add_action('wp_ajax_nopriv_save_calculator_quote', array($this, 'handle_save_quote'));
        
        // Activation/deactivation hooks
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    /**
     * Initialize plugin
     */
    public function init() {
        // Check if SiteOptz Core is active
        if (!class_exists('SiteOptz_Core')) {
            add_action('admin_notices', array($this, 'core_missing_notice'));
            return;
        }
        
        // Load text domain
        load_plugin_textdomain('siteoptz-calculator', false, dirname(plugin_basename(__FILE__)) . '/languages');
        
        // Create calculator configurations post type
        $this->register_post_types();
    }
    
    /**
     * Register custom post types
     */
    public function register_post_types() {
        // Calculator Configurations
        register_post_type('calculator_config', array(
            'labels' => array(
                'name' => __('Calculator Configs', 'siteoptz-calculator'),
                'singular_name' => __('Calculator Config', 'siteoptz-calculator'),
                'add_new' => __('Add New Config', 'siteoptz-calculator'),
                'add_new_item' => __('Add New Calculator Config', 'siteoptz-calculator'),
                'edit_item' => __('Edit Calculator Config', 'siteoptz-calculator'),
                'new_item' => __('New Calculator Config', 'siteoptz-calculator'),
                'view_item' => __('View Calculator Config', 'siteoptz-calculator'),
                'search_items' => __('Search Calculator Configs', 'siteoptz-calculator'),
                'not_found' => __('No calculator configs found', 'siteoptz-calculator'),
                'not_found_in_trash' => __('No calculator configs found in trash', 'siteoptz-calculator')
            ),
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => 'siteoptz-dashboard',
            'menu_icon' => 'dashicons-calculator',
            'supports' => array('title', 'editor', 'custom-fields'),
            'show_in_rest' => true,
            'capability_type' => 'post',
            'hierarchical' => false
        ));
        
        // Pricing Plans
        register_post_type('pricing_plan', array(
            'labels' => array(
                'name' => __('Pricing Plans', 'siteoptz-calculator'),
                'singular_name' => __('Pricing Plan', 'siteoptz-calculator'),
                'add_new' => __('Add New Plan', 'siteoptz-calculator'),
                'add_new_item' => __('Add New Pricing Plan', 'siteoptz-calculator'),
                'edit_item' => __('Edit Pricing Plan', 'siteoptz-calculator'),
                'new_item' => __('New Pricing Plan', 'siteoptz-calculator'),
                'view_item' => __('View Pricing Plan', 'siteoptz-calculator'),
                'search_items' => __('Search Pricing Plans', 'siteoptz-calculator'),
                'not_found' => __('No pricing plans found', 'siteoptz-calculator'),
                'not_found_in_trash' => __('No pricing plans found in trash', 'siteoptz-calculator')
            ),
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => 'siteoptz-dashboard',
            'menu_icon' => 'dashicons-money-alt',
            'supports' => array('title', 'editor', 'custom-fields', 'thumbnail'),
            'show_in_rest' => true,
            'capability_type' => 'post',
            'hierarchical' => false
        ));
    }
    
    /**
     * Enqueue scripts and styles
     */
    public function enqueue_scripts() {
        wp_enqueue_style(
            'siteoptz-calculator-styles',
            SITEOPTZ_CALCULATOR_PLUGIN_URL . 'assets/css/calculator.css',
            array(),
            SITEOPTZ_CALCULATOR_VERSION
        );
        
        wp_enqueue_script(
            'siteoptz-calculator-scripts',
            SITEOPTZ_CALCULATOR_PLUGIN_URL . 'assets/js/calculator.js',
            array('jquery'),
            SITEOPTZ_CALCULATOR_VERSION,
            true
        );
        
        // Localize script
        wp_localize_script('siteoptz-calculator-scripts', 'siteoptz_calculator', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('siteoptz_calculator_nonce'),
            'api_url' => home_url('/wp-json/siteoptz-calculator/v1/'),
            'currency_symbol' => get_option('siteoptz_currency_symbol', '$'),
            'decimal_places' => get_option('siteoptz_decimal_places', 2)
        ));
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_submenu_page(
            'siteoptz-dashboard',
            __('Calculator Settings', 'siteoptz-calculator'),
            __('Calculator', 'siteoptz-calculator'),
            'manage_options',
            'siteoptz-calculator-settings',
            array($this, 'admin_settings_page')
        );
    }
    
    /**
     * Admin settings page
     */
    public function admin_settings_page() {
        if (isset($_POST['submit'])) {
            $this->save_calculator_settings();
            echo '<div class="notice notice-success"><p>' . __('Settings saved!', 'siteoptz-calculator') . '</p></div>';
        }
        
        $settings = $this->get_calculator_settings();
        ?>
        <div class="wrap">
            <h1><?php _e('Calculator Settings', 'siteoptz-calculator'); ?></h1>
            
            <form method="post" action="">
                <?php wp_nonce_field('siteoptz_calculator_settings', 'calculator_nonce'); ?>
                
                <h2><?php _e('General Settings', 'siteoptz-calculator'); ?></h2>
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php _e('Currency Symbol', 'siteoptz-calculator'); ?></th>
                        <td>
                            <input type="text" name="currency_symbol" value="<?php echo esc_attr($settings['currency_symbol']); ?>" class="small-text" />
                            <p class="description"><?php _e('Symbol to display for currency (e.g., $, €, £)', 'siteoptz-calculator'); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('Decimal Places', 'siteoptz-calculator'); ?></th>
                        <td>
                            <input type="number" name="decimal_places" value="<?php echo esc_attr($settings['decimal_places']); ?>" min="0" max="4" class="small-text" />
                            <p class="description"><?php _e('Number of decimal places to show in prices', 'siteoptz-calculator'); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('Default Annual Discount', 'siteoptz-calculator'); ?></th>
                        <td>
                            <input type="number" name="annual_discount" value="<?php echo esc_attr($settings['annual_discount']); ?>" min="0" max="100" step="0.1" class="small-text" />%
                            <p class="description"><?php _e('Default discount percentage for annual billing', 'siteoptz-calculator'); ?></p>
                        </td>
                    </tr>
                </table>
                
                <h2><?php _e('Email Settings', 'siteoptz-calculator'); ?></h2>
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php _e('Quote Email Template', 'siteoptz-calculator'); ?></th>
                        <td>
                            <textarea name="quote_email_template" rows="10" cols="50" class="large-text"><?php echo esc_textarea($settings['quote_email_template']); ?></textarea>
                            <p class="description">
                                <?php _e('Available variables: {tool_name}, {total_cost}, {quote_id}, {user_email}, {plan_name}', 'siteoptz-calculator'); ?>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('Quote Expiry (days)', 'siteoptz-calculator'); ?></th>
                        <td>
                            <input type="number" name="quote_expiry_days" value="<?php echo esc_attr($settings['quote_expiry_days']); ?>" min="1" max="365" class="small-text" />
                            <p class="description"><?php _e('Number of days before quotes expire', 'siteoptz-calculator'); ?></p>
                        </td>
                    </tr>
                </table>
                
                <h2><?php _e('Discount Codes', 'siteoptz-calculator'); ?></h2>
                <div id="discount-codes-container">
                    <?php 
                    $discount_codes = $settings['discount_codes'] ?: array();
                    foreach ($discount_codes as $index => $code) {
                        $this->render_discount_code_row($code, $index);
                    }
                    ?>
                </div>
                <button type="button" id="add-discount-code" class="button"><?php _e('Add Discount Code', 'siteoptz-calculator'); ?></button>
                
                <?php submit_button(); ?>
            </form>
        </div>
        
        <script>
        jQuery(document).ready(function($) {
            $('#add-discount-code').on('click', function() {
                var index = $('#discount-codes-container .discount-code-row').length;
                var template = `
                    <div class="discount-code-row" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; border-radius: 4px;">
                        <table class="form-table">
                            <tr>
                                <th><label>Code:</label></th>
                                <td><input type="text" name="discount_codes[${index}][code]" class="regular-text" /></td>
                            </tr>
                            <tr>
                                <th><label>Type:</label></th>
                                <td>
                                    <select name="discount_codes[${index}][type]">
                                        <option value="percentage">Percentage</option>
                                        <option value="fixed">Fixed Amount</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th><label>Value:</label></th>
                                <td><input type="number" name="discount_codes[${index}][value]" step="0.01" class="small-text" /></td>
                            </tr>
                            <tr>
                                <th><label>Expiry Date:</label></th>
                                <td><input type="date" name="discount_codes[${index}][expiry_date]" /></td>
                            </tr>
                        </table>
                        <button type="button" class="button remove-discount-code">Remove</button>
                    </div>
                `;
                $('#discount-codes-container').append(template);
            });
            
            $(document).on('click', '.remove-discount-code', function() {
                $(this).closest('.discount-code-row').remove();
            });
        });
        </script>
        <?php
    }
    
    /**
     * Render discount code row
     */
    private function render_discount_code_row($code, $index) {
        ?>
        <div class="discount-code-row" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; border-radius: 4px;">
            <table class="form-table">
                <tr>
                    <th><label><?php _e('Code:', 'siteoptz-calculator'); ?></label></th>
                    <td><input type="text" name="discount_codes[<?php echo $index; ?>][code]" value="<?php echo esc_attr($code['code']); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label><?php _e('Type:', 'siteoptz-calculator'); ?></label></th>
                    <td>
                        <select name="discount_codes[<?php echo $index; ?>][type]">
                            <option value="percentage" <?php selected($code['type'], 'percentage'); ?>><?php _e('Percentage', 'siteoptz-calculator'); ?></option>
                            <option value="fixed" <?php selected($code['type'], 'fixed'); ?>><?php _e('Fixed Amount', 'siteoptz-calculator'); ?></option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th><label><?php _e('Value:', 'siteoptz-calculator'); ?></label></th>
                    <td><input type="number" name="discount_codes[<?php echo $index; ?>][value]" value="<?php echo esc_attr($code['value']); ?>" step="0.01" class="small-text" /></td>
                </tr>
                <tr>
                    <th><label><?php _e('Expiry Date:', 'siteoptz-calculator'); ?></label></th>
                    <td><input type="date" name="discount_codes[<?php echo $index; ?>][expiry_date]" value="<?php echo esc_attr($code['expiry_date']); ?>" /></td>
                </tr>
            </table>
            <button type="button" class="button remove-discount-code"><?php _e('Remove', 'siteoptz-calculator'); ?></button>
        </div>
        <?php
    }
    
    /**
     * Save calculator settings
     */
    private function save_calculator_settings() {
        if (!wp_verify_nonce($_POST['calculator_nonce'], 'siteoptz_calculator_settings')) {
            return;
        }
        
        $settings = array(
            'currency_symbol' => sanitize_text_field($_POST['currency_symbol']),
            'decimal_places' => intval($_POST['decimal_places']),
            'annual_discount' => floatval($_POST['annual_discount']),
            'quote_email_template' => sanitize_textarea_field($_POST['quote_email_template']),
            'quote_expiry_days' => intval($_POST['quote_expiry_days']),
            'discount_codes' => array()
        );
        
        if (isset($_POST['discount_codes']) && is_array($_POST['discount_codes'])) {
            foreach ($_POST['discount_codes'] as $code_data) {
                $settings['discount_codes'][] = array(
                    'code' => sanitize_text_field($code_data['code']),
                    'type' => sanitize_text_field($code_data['type']),
                    'value' => floatval($code_data['value']),
                    'expiry_date' => sanitize_text_field($code_data['expiry_date'])
                );
            }
        }
        
        update_option('siteoptz_calculator_settings', $settings);
    }
    
    /**
     * Get calculator settings
     */
    private function get_calculator_settings() {
        $defaults = array(
            'currency_symbol' => '$',
            'decimal_places' => 2,
            'annual_discount' => 17,
            'quote_email_template' => "Hi there!\n\nThank you for using our AI tool pricing calculator.\n\nYour quote details:\nTool: {tool_name}\nPlan: {plan_name}\nTotal Cost: {total_cost}\nQuote ID: {quote_id}\n\nThis quote is valid for 30 days.\n\nBest regards,\nSiteOptz.ai Team",
            'quote_expiry_days' => 30,
            'discount_codes' => array()
        );
        
        $settings = get_option('siteoptz_calculator_settings', array());
        return wp_parse_args($settings, $defaults);
    }
    
    /**
     * Register REST API routes
     */
    public function register_api_routes() {
        register_rest_route('siteoptz-calculator/v1', '/calculate', array(
            'methods' => 'POST',
            'callback' => array($this, 'api_calculate_pricing'),
            'permission_callback' => '__return_true'
        ));
        
        register_rest_route('siteoptz-calculator/v1', '/plans/(?P<tool_id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'api_get_pricing_plans'),
            'permission_callback' => '__return_true'
        ));
        
        register_rest_route('siteoptz-calculator/v1', '/quote/(?P<quote_id>[a-zA-Z0-9-]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'api_get_quote'),
            'permission_callback' => '__return_true'
        ));
    }
    
    /**
     * API: Calculate pricing
     */
    public function api_calculate_pricing($request) {
        $params = $request->get_json_params();
        
        $plan_id = intval($params['plan_id']);
        $usage_metrics = $params['usage_metrics'] ?: array();
        $billing_cycle = sanitize_text_field($params['billing_cycle'] ?: 'monthly');
        $discount_code = sanitize_text_field($params['discount_code'] ?: '');
        
        // Get plan details
        $plan = get_post($plan_id);
        if (!$plan || $plan->post_type !== 'pricing_plan') {
            return new WP_Error('invalid_plan', 'Invalid pricing plan', array('status' => 400));
        }
        
        $base_price = floatval(get_post_meta($plan_id, '_base_price', true));
        $included_metrics = get_post_meta($plan_id, '_included_metrics', true) ?: array();
        $overage_rates = get_post_meta($plan_id, '_overage_rates', true) ?: array();
        
        // Calculate usage costs
        $usage_cost = 0;
        foreach ($usage_metrics as $metric_key => $usage_amount) {
            $included = floatval($included_metrics[$metric_key] ?: 0);
            $rate = floatval($overage_rates[$metric_key] ?: 0);
            $overage = max(0, $usage_amount - $included);
            $usage_cost += $overage * $rate;
        }
        
        $total_cost = $base_price + $usage_cost;
        
        // Apply billing cycle discount
        if ($billing_cycle === 'annual') {
            $settings = $this->get_calculator_settings();
            $annual_discount = $settings['annual_discount'] / 100;
            $total_cost = $total_cost * 12 * (1 - $annual_discount);
        }
        
        // Apply discount code
        $discount_amount = 0;
        if ($discount_code) {
            $discount_amount = $this->apply_discount_code($discount_code, $total_cost);
            $total_cost -= $discount_amount;
        }
        
        return new WP_REST_Response(array(
            'base_price' => $base_price,
            'usage_cost' => $usage_cost,
            'total_cost' => max(0, $total_cost),
            'billing_cycle' => $billing_cycle,
            'discount_amount' => $discount_amount,
            'currency' => get_option('siteoptz_currency_symbol', '$')
        ), 200);
    }
    
    /**
     * Apply discount code
     */
    private function apply_discount_code($code, $total_cost) {
        $settings = $this->get_calculator_settings();
        $discount_codes = $settings['discount_codes'];
        
        foreach ($discount_codes as $discount) {
            if (strtolower($discount['code']) === strtolower($code)) {
                // Check expiry
                if (!empty($discount['expiry_date']) && strtotime($discount['expiry_date']) < time()) {
                    continue;
                }
                
                if ($discount['type'] === 'percentage') {
                    return $total_cost * ($discount['value'] / 100);
                } else {
                    return min($discount['value'], $total_cost);
                }
            }
        }
        
        return 0;
    }
    
    /**
     * API: Get pricing plans for a tool
     */
    public function api_get_pricing_plans($request) {
        $tool_id = $request->get_param('tool_id');
        
        $plans = get_posts(array(
            'post_type' => 'pricing_plan',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => '_tool_id',
                    'value' => $tool_id
                )
            )
        ));
        
        $plans_data = array();
        foreach ($plans as $plan) {
            $plans_data[] = array(
                'id' => $plan->ID,
                'name' => $plan->post_title,
                'description' => $plan->post_content,
                'base_price' => floatval(get_post_meta($plan->ID, '_base_price', true)),
                'features' => get_post_meta($plan->ID, '_features', true) ?: array(),
                'included_metrics' => get_post_meta($plan->ID, '_included_metrics', true) ?: array(),
                'overage_rates' => get_post_meta($plan->ID, '_overage_rates', true) ?: array(),
                'popular' => get_post_meta($plan->ID, '_popular', true) === '1'
            );
        }
        
        return new WP_REST_Response($plans_data, 200);
    }
    
    /**
     * API: Get saved quote
     */
    public function api_get_quote($request) {
        $quote_id = $request->get_param('quote_id');
        $quote_data = get_option('siteoptz_calculator_quote_' . $quote_id);
        
        if (!$quote_data) {
            return new WP_Error('quote_not_found', 'Quote not found', array('status' => 404));
        }
        
        // Check if quote has expired
        $settings = $this->get_calculator_settings();
        $expiry_date = strtotime($quote_data['timestamp']) + ($settings['quote_expiry_days'] * 24 * 60 * 60);
        
        if (time() > $expiry_date) {
            return new WP_Error('quote_expired', 'Quote has expired', array('status' => 410));
        }
        
        return new WP_REST_Response($quote_data, 200);
    }
    
    /**
     * Handle calculate pricing AJAX
     */
    public function handle_calculate_pricing() {
        check_ajax_referer('siteoptz_calculator_nonce', 'nonce');
        
        $plan_id = intval($_POST['plan_id']);
        $usage_metrics = $_POST['usage_metrics'] ?: array();
        $billing_cycle = sanitize_text_field($_POST['billing_cycle'] ?: 'monthly');
        $discount_code = sanitize_text_field($_POST['discount_code'] ?: '');
        
        // Create a mock request object for the API method
        $request = new stdClass();
        $request->params = array(
            'plan_id' => $plan_id,
            'usage_metrics' => $usage_metrics,
            'billing_cycle' => $billing_cycle,
            'discount_code' => $discount_code
        );
        
        $response = $this->api_calculate_pricing($request);
        
        if (is_wp_error($response)) {
            wp_send_json_error($response->get_error_message());
        } else {
            wp_send_json_success($response->data);
        }
    }
    
    /**
     * Handle save quote AJAX
     */
    public function handle_save_quote() {
        check_ajax_referer('siteoptz_calculator_nonce', 'nonce');
        
        $quote_data = array(
            'quote_id' => wp_generate_uuid4(),
            'email' => sanitize_email($_POST['email']),
            'tool_name' => sanitize_text_field($_POST['tool_name']),
            'plan_name' => sanitize_text_field($_POST['plan_name']),
            'total_cost' => floatval($_POST['total_cost']),
            'usage_metrics' => $_POST['usage_metrics'] ?: array(),
            'billing_cycle' => sanitize_text_field($_POST['billing_cycle']),
            'discount_code' => sanitize_text_field($_POST['discount_code'] ?: ''),
            'timestamp' => current_time('mysql')
        );
        
        // Save quote
        update_option('siteoptz_calculator_quote_' . $quote_data['quote_id'], $quote_data);
        
        // Send email
        $this->send_quote_email($quote_data);
        
        wp_send_json_success(array(
            'quote_id' => $quote_data['quote_id'],
            'message' => 'Quote saved successfully'
        ));
    }
    
    /**
     * Send quote email
     */
    private function send_quote_email($quote_data) {
        $settings = $this->get_calculator_settings();
        $template = $settings['quote_email_template'];
        
        // Replace variables
        $variables = array(
            '{tool_name}' => $quote_data['tool_name'],
            '{plan_name}' => $quote_data['plan_name'],
            '{total_cost}' => $settings['currency_symbol'] . number_format($quote_data['total_cost'], $settings['decimal_places']),
            '{quote_id}' => $quote_data['quote_id'],
            '{user_email}' => $quote_data['email']
        );
        
        $message = str_replace(array_keys($variables), array_values($variables), $template);
        
        $subject = sprintf(__('Your %s Pricing Quote - %s', 'siteoptz-calculator'), 
                          $quote_data['tool_name'], 
                          $quote_data['quote_id']);
        
        wp_mail($quote_data['email'], $subject, $message);
    }
    
    /**
     * Calculator shortcode
     */
    public function calculator_shortcode($atts) {
        $atts = shortcode_atts(array(
            'tool_id' => 0,
            'show_email_capture' => 'true',
            'show_discount_codes' => 'true',
            'default_plan' => '',
            'theme' => 'default'
        ), $atts);
        
        $tool_id = intval($atts['tool_id']);
        if (!$tool_id) {
            return '<p>' . __('Please specify a tool ID for the calculator.', 'siteoptz-calculator') . '</p>';
        }
        
        ob_start();
        ?>
        <div class="siteoptz-pricing-calculator" 
             data-tool-id="<?php echo esc_attr($tool_id); ?>"
             data-show-email="<?php echo esc_attr($atts['show_email_capture']); ?>"
             data-show-discounts="<?php echo esc_attr($atts['show_discount_codes']); ?>"
             data-default-plan="<?php echo esc_attr($atts['default_plan']); ?>"
             data-theme="<?php echo esc_attr($atts['theme']); ?>">
            
            <div class="calculator-loading">
                <p><?php _e('Loading calculator...', 'siteoptz-calculator'); ?></p>
            </div>
        </div>
        
        <script>
        jQuery(document).ready(function($) {
            // Initialize React calculator component
            if (window.SiteOptzPricingCalculator) {
                window.SiteOptzPricingCalculator.init('.siteoptz-pricing-calculator');
            }
        });
        </script>
        <?php
        return ob_get_clean();
    }
    
    /**
     * Pricing table shortcode
     */
    public function pricing_table_shortcode($atts) {
        $atts = shortcode_atts(array(
            'tool_id' => 0,
            'columns' => '3',
            'show_features' => 'true',
            'highlight_plan' => ''
        ), $atts);
        
        $tool_id = intval($atts['tool_id']);
        if (!$tool_id) {
            return '<p>' . __('Please specify a tool ID for the pricing table.', 'siteoptz-calculator') . '</p>';
        }
        
        // Get pricing plans
        $plans = get_posts(array(
            'post_type' => 'pricing_plan',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => '_tool_id',
                    'value' => $tool_id
                )
            )
        ));
        
        if (empty($plans)) {
            return '<p>' . __('No pricing plans found for this tool.', 'siteoptz-calculator') . '</p>';
        }
        
        ob_start();
        ?>
        <div class="siteoptz-pricing-table columns-<?php echo esc_attr($atts['columns']); ?>">
            <?php foreach ($plans as $plan): 
                $base_price = get_post_meta($plan->ID, '_base_price', true);
                $features = get_post_meta($plan->ID, '_features', true) ?: array();
                $popular = get_post_meta($plan->ID, '_popular', true);
                $highlight = ($atts['highlight_plan'] === $plan->post_name || $popular);
            ?>
                <div class="pricing-plan <?php echo $highlight ? 'highlighted' : ''; ?>">
                    <?php if ($highlight): ?>
                        <div class="plan-badge"><?php _e('Most Popular', 'siteoptz-calculator'); ?></div>
                    <?php endif; ?>
                    
                    <h3 class="plan-name"><?php echo esc_html($plan->post_title); ?></h3>
                    
                    <div class="plan-price">
                        <span class="currency"><?php echo get_option('siteoptz_currency_symbol', '$'); ?></span>
                        <span class="amount"><?php echo number_format($base_price, 0); ?></span>
                        <span class="period"><?php _e('/month', 'siteoptz-calculator'); ?></span>
                    </div>
                    
                    <?php if ($plan->post_content): ?>
                        <p class="plan-description"><?php echo wp_kses_post($plan->post_content); ?></p>
                    <?php endif; ?>
                    
                    <?php if ($atts['show_features'] === 'true' && !empty($features)): ?>
                        <ul class="plan-features">
                            <?php foreach ($features as $feature): ?>
                                <li><?php echo esc_html($feature); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                    
                    <div class="plan-action">
                        <button class="plan-button" data-plan-id="<?php echo $plan->ID; ?>">
                            <?php _e('Choose Plan', 'siteoptz-calculator'); ?>
                        </button>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * Core missing notice
     */
    public function core_missing_notice() {
        ?>
        <div class="notice notice-error">
            <p><?php _e('SiteOptz Calculator requires SiteOptz Core plugin to be installed and activated.', 'siteoptz-calculator'); ?></p>
        </div>
        <?php
    }
    
    /**
     * Plugin activation
     */
    public function activate() {
        // Check dependencies
        if (!class_exists('SiteOptz_Core')) {
            deactivate_plugins(plugin_basename(__FILE__));
            wp_die(__('SiteOptz Calculator requires SiteOptz Core plugin to be installed and activated.', 'siteoptz-calculator'));
        }
        
        // Create default settings
        if (!get_option('siteoptz_calculator_settings')) {
            $default_settings = $this->get_calculator_settings();
            update_option('siteoptz_calculator_settings', $default_settings);
        }
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Plugin deactivation
     */
    public function deactivate() {
        flush_rewrite_rules();
    }
}

// Initialize the plugin
new SiteOptz_Calculator();