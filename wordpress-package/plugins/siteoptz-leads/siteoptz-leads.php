<?php
/**
 * Plugin Name: SiteOptz Lead Management
 * Description: Advanced lead capture, management and email marketing integration for SiteOptz platform
 * Version: 1.0.0
 * Author: SiteOptz.ai
 * License: GPL v2 or later
 * Text Domain: siteoptz-leads
 * Requires: SiteOptz Core
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SITEOPTZ_LEADS_VERSION', '1.0.0');
define('SITEOPTZ_LEADS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SITEOPTZ_LEADS_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main SiteOptz Leads Plugin Class
 */
class SiteOptz_Leads {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('admin_enqueue_scripts', array($this, 'admin_enqueue_scripts'));
        add_action('rest_api_init', array($this, 'register_api_routes'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Shortcodes
        add_shortcode('siteoptz_lead_form', array($this, 'lead_form_shortcode'));
        add_shortcode('siteoptz_newsletter', array($this, 'newsletter_shortcode'));
        add_shortcode('siteoptz_demo_request', array($this, 'demo_request_shortcode'));
        
        // AJAX handlers
        add_action('wp_ajax_capture_lead', array($this, 'handle_capture_lead'));
        add_action('wp_ajax_nopriv_capture_lead', array($this, 'handle_capture_lead'));
        add_action('wp_ajax_export_leads', array($this, 'handle_export_leads'));
        add_action('wp_ajax_update_lead_status', array($this, 'handle_update_lead_status'));
        
        // Cron jobs
        add_action('siteoptz_send_email_campaigns', array($this, 'send_email_campaigns'));
        add_action('siteoptz_clean_old_leads', array($this, 'clean_old_leads'));
        
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
        load_plugin_textdomain('siteoptz-leads', false, dirname(plugin_basename(__FILE__)) . '/languages');
        
        // Register post types
        $this->register_post_types();
        
        // Schedule cron jobs
        if (!wp_next_scheduled('siteoptz_send_email_campaigns')) {
            wp_schedule_event(time(), 'hourly', 'siteoptz_send_email_campaigns');
        }
        
        if (!wp_next_scheduled('siteoptz_clean_old_leads')) {
            wp_schedule_event(time(), 'daily', 'siteoptz_clean_old_leads');
        }
    }
    
    /**
     * Register custom post types
     */
    public function register_post_types() {
        // Lead Forms
        register_post_type('lead_form', array(
            'labels' => array(
                'name' => __('Lead Forms', 'siteoptz-leads'),
                'singular_name' => __('Lead Form', 'siteoptz-leads'),
                'add_new' => __('Add New Form', 'siteoptz-leads'),
                'add_new_item' => __('Add New Lead Form', 'siteoptz-leads'),
                'edit_item' => __('Edit Lead Form', 'siteoptz-leads'),
                'new_item' => __('New Lead Form', 'siteoptz-leads'),
                'view_item' => __('View Lead Form', 'siteoptz-leads'),
                'search_items' => __('Search Lead Forms', 'siteoptz-leads'),
                'not_found' => __('No lead forms found', 'siteoptz-leads'),
                'not_found_in_trash' => __('No lead forms found in trash', 'siteoptz-leads')
            ),
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => 'siteoptz-dashboard',
            'menu_icon' => 'dashicons-feedback',
            'supports' => array('title', 'editor', 'custom-fields'),
            'show_in_rest' => true,
            'capability_type' => 'post',
            'hierarchical' => false
        ));
        
        // Email Campaigns
        register_post_type('email_campaign', array(
            'labels' => array(
                'name' => __('Email Campaigns', 'siteoptz-leads'),
                'singular_name' => __('Email Campaign', 'siteoptz-leads'),
                'add_new' => __('Add New Campaign', 'siteoptz-leads'),
                'add_new_item' => __('Add New Email Campaign', 'siteoptz-leads'),
                'edit_item' => __('Edit Email Campaign', 'siteoptz-leads'),
                'new_item' => __('New Email Campaign', 'siteoptz-leads'),
                'view_item' => __('View Email Campaign', 'siteoptz-leads'),
                'search_items' => __('Search Email Campaigns', 'siteoptz-leads'),
                'not_found' => __('No email campaigns found', 'siteoptz-leads'),
                'not_found_in_trash' => __('No email campaigns found in trash', 'siteoptz-leads')
            ),
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => 'siteoptz-dashboard',
            'menu_icon' => 'dashicons-email-alt',
            'supports' => array('title', 'editor', 'custom-fields'),
            'show_in_rest' => true,
            'capability_type' => 'post',
            'hierarchical' => false
        ));
    }
    
    /**
     * Enqueue frontend scripts
     */
    public function enqueue_scripts() {
        wp_enqueue_style(
            'siteoptz-leads-styles',
            SITEOPTZ_LEADS_PLUGIN_URL . 'assets/css/leads.css',
            array(),
            SITEOPTZ_LEADS_VERSION
        );
        
        wp_enqueue_script(
            'siteoptz-leads-scripts',
            SITEOPTZ_LEADS_PLUGIN_URL . 'assets/js/leads.js',
            array('jquery'),
            SITEOPTZ_LEADS_VERSION,
            true
        );
        
        wp_localize_script('siteoptz-leads-scripts', 'siteoptz_leads', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('siteoptz_leads_nonce'),
            'api_url' => home_url('/wp-json/siteoptz-leads/v1/'),
            'messages' => array(
                'success' => __('Thank you! Your information has been submitted.', 'siteoptz-leads'),
                'error' => __('Something went wrong. Please try again.', 'siteoptz-leads'),
                'email_invalid' => __('Please enter a valid email address.', 'siteoptz-leads'),
                'required_field' => __('This field is required.', 'siteoptz-leads')
            )
        ));
    }
    
    /**
     * Enqueue admin scripts
     */
    public function admin_enqueue_scripts($hook) {
        $screens = array(
            'siteoptz_page_siteoptz-leads-manager',
            'siteoptz_page_siteoptz-leads-settings',
            'post.php',
            'post-new.php'
        );
        
        if (!in_array($hook, $screens)) {
            return;
        }
        
        wp_enqueue_style(
            'siteoptz-leads-admin-styles',
            SITEOPTZ_LEADS_PLUGIN_URL . 'assets/css/admin-leads.css',
            array(),
            SITEOPTZ_LEADS_VERSION
        );
        
        wp_enqueue_script(
            'siteoptz-leads-admin-scripts',
            SITEOPTZ_LEADS_PLUGIN_URL . 'assets/js/admin-leads.js',
            array('jquery', 'wp-i18n'),
            SITEOPTZ_LEADS_VERSION,
            true
        );
        
        wp_localize_script('siteoptz-leads-admin-scripts', 'siteoptz_leads_admin', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('siteoptz_leads_admin_nonce'),
            'api_url' => home_url('/wp-json/siteoptz-leads/v1/')
        ));
    }
    
    /**
     * Add admin menu pages
     */
    public function add_admin_menu() {
        add_submenu_page(
            'siteoptz-dashboard',
            __('Lead Manager', 'siteoptz-leads'),
            __('Leads', 'siteoptz-leads'),
            'manage_options',
            'siteoptz-leads-manager',
            array($this, 'admin_leads_page')
        );
        
        add_submenu_page(
            'siteoptz-dashboard',
            __('Lead Settings', 'siteoptz-leads'),
            __('Lead Settings', 'siteoptz-leads'),
            'manage_options',
            'siteoptz-leads-settings',
            array($this, 'admin_settings_page')
        );
    }
    
    /**
     * Admin leads manager page
     */
    public function admin_leads_page() {
        $current_tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'leads';
        ?>
        <div class="wrap">
            <h1><?php _e('Lead Management', 'siteoptz-leads'); ?></h1>
            
            <nav class="nav-tab-wrapper">
                <a href="?page=siteoptz-leads-manager&tab=leads" class="nav-tab <?php echo $current_tab === 'leads' ? 'nav-tab-active' : ''; ?>">
                    <?php _e('Leads', 'siteoptz-leads'); ?>
                </a>
                <a href="?page=siteoptz-leads-manager&tab=campaigns" class="nav-tab <?php echo $current_tab === 'campaigns' ? 'nav-tab-active' : ''; ?>">
                    <?php _e('Email Campaigns', 'siteoptz-leads'); ?>
                </a>
                <a href="?page=siteoptz-leads-manager&tab=analytics" class="nav-tab <?php echo $current_tab === 'analytics' ? 'nav-tab-active' : ''; ?>">
                    <?php _e('Analytics', 'siteoptz-leads'); ?>
                </a>
            </nav>
            
            <div class="tab-content">
                <?php
                switch ($current_tab) {
                    case 'leads':
                        $this->render_leads_tab();
                        break;
                    case 'campaigns':
                        $this->render_campaigns_tab();
                        break;
                    case 'analytics':
                        $this->render_analytics_tab();
                        break;
                }
                ?>
            </div>
        </div>
        <?php
    }
    
    /**
     * Render leads tab
     */
    private function render_leads_tab() {
        global $wpdb;
        
        // Get leads with pagination
        $per_page = 20;
        $page = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;
        $offset = ($page - 1) * $per_page;
        
        $table_name = $wpdb->prefix . 'siteoptz_leads';
        
        // Filters
        $where_clauses = array('1=1');
        $filter_type = isset($_GET['filter_type']) ? sanitize_text_field($_GET['filter_type']) : '';
        $filter_status = isset($_GET['filter_status']) ? sanitize_text_field($_GET['filter_status']) : '';
        $search = isset($_GET['s']) ? sanitize_text_field($_GET['s']) : '';
        
        if ($filter_type) {
            $where_clauses[] = $wpdb->prepare('type = %s', $filter_type);
        }
        
        if ($filter_status) {
            $where_clauses[] = $wpdb->prepare('status = %s', $filter_status);
        }
        
        if ($search) {
            $where_clauses[] = $wpdb->prepare('(email LIKE %s OR name LIKE %s OR company LIKE %s)', 
                                             '%' . $search . '%', '%' . $search . '%', '%' . $search . '%');
        }
        
        $where_sql = implode(' AND ', $where_clauses);
        
        // Get leads
        $leads = $wpdb->get_results($wpdb->prepare("
            SELECT * FROM {$table_name} 
            WHERE {$where_sql}
            ORDER BY timestamp DESC 
            LIMIT %d OFFSET %d
        ", $per_page, $offset));
        
        // Get total count
        $total_leads = $wpdb->get_var("SELECT COUNT(*) FROM {$table_name} WHERE {$where_sql}");
        $total_pages = ceil($total_leads / $per_page);
        
        ?>
        <div class="leads-filters">
            <form method="get">
                <input type="hidden" name="page" value="siteoptz-leads-manager">
                <input type="hidden" name="tab" value="leads">
                
                <div class="filter-row">
                    <input type="search" name="s" value="<?php echo esc_attr($search); ?>" placeholder="<?php _e('Search leads...', 'siteoptz-leads'); ?>" />
                    
                    <select name="filter_type">
                        <option value=""><?php _e('All Types', 'siteoptz-leads'); ?></option>
                        <option value="newsletter" <?php selected($filter_type, 'newsletter'); ?>><?php _e('Newsletter', 'siteoptz-leads'); ?></option>
                        <option value="demo" <?php selected($filter_type, 'demo'); ?>><?php _e('Demo Request', 'siteoptz-leads'); ?></option>
                        <option value="download" <?php selected($filter_type, 'download'); ?>><?php _e('Download', 'siteoptz-leads'); ?></option>
                        <option value="contact" <?php selected($filter_type, 'contact'); ?>><?php _e('Contact', 'siteoptz-leads'); ?></option>
                    </select>
                    
                    <select name="filter_status">
                        <option value=""><?php _e('All Statuses', 'siteoptz-leads'); ?></option>
                        <option value="new" <?php selected($filter_status, 'new'); ?>><?php _e('New', 'siteoptz-leads'); ?></option>
                        <option value="contacted" <?php selected($filter_status, 'contacted'); ?>><?php _e('Contacted', 'siteoptz-leads'); ?></option>
                        <option value="qualified" <?php selected($filter_status, 'qualified'); ?>><?php _e('Qualified', 'siteoptz-leads'); ?></option>
                        <option value="converted" <?php selected($filter_status, 'converted'); ?>><?php _e('Converted', 'siteoptz-leads'); ?></option>
                    </select>
                    
                    <input type="submit" class="button" value="<?php _e('Filter', 'siteoptz-leads'); ?>" />
                    <a href="?page=siteoptz-leads-manager&tab=leads" class="button"><?php _e('Clear', 'siteoptz-leads'); ?></a>
                    <button type="button" class="button button-primary" id="export-leads"><?php _e('Export CSV', 'siteoptz-leads'); ?></button>
                </div>
            </form>
        </div>
        
        <div class="leads-stats">
            <div class="stat-box">
                <h3><?php echo number_format($total_leads); ?></h3>
                <p><?php _e('Total Leads', 'siteoptz-leads'); ?></p>
            </div>
            <div class="stat-box">
                <h3><?php echo number_format($this->get_leads_count('new')); ?></h3>
                <p><?php _e('New Leads', 'siteoptz-leads'); ?></p>
            </div>
            <div class="stat-box">
                <h3><?php echo number_format($this->get_leads_count('qualified')); ?></h3>
                <p><?php _e('Qualified', 'siteoptz-leads'); ?></p>
            </div>
            <div class="stat-box">
                <h3><?php echo number_format($this->get_leads_count('converted')); ?></h3>
                <p><?php _e('Converted', 'siteoptz-leads'); ?></p>
            </div>
        </div>
        
        <div class="leads-table-container">
            <table class="wp-list-table widefat fixed striped leads-table">
                <thead>
                    <tr>
                        <th class="check-column"><input type="checkbox" id="select-all-leads" /></th>
                        <th><?php _e('Name', 'siteoptz-leads'); ?></th>
                        <th><?php _e('Email', 'siteoptz-leads'); ?></th>
                        <th><?php _e('Company', 'siteoptz-leads'); ?></th>
                        <th><?php _e('Type', 'siteoptz-leads'); ?></th>
                        <th><?php _e('Status', 'siteoptz-leads'); ?></th>
                        <th><?php _e('Source', 'siteoptz-leads'); ?></th>
                        <th><?php _e('Date', 'siteoptz-leads'); ?></th>
                        <th><?php _e('Actions', 'siteoptz-leads'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($leads)): ?>
                        <tr>
                            <td colspan="9" class="no-leads">
                                <?php _e('No leads found.', 'siteoptz-leads'); ?>
                            </td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($leads as $lead): ?>
                            <tr data-lead-id="<?php echo esc_attr($lead->id); ?>">
                                <td class="check-column">
                                    <input type="checkbox" name="lead_ids[]" value="<?php echo esc_attr($lead->id); ?>" />
                                </td>
                                <td>
                                    <strong><?php echo esc_html($lead->name ?: '—'); ?></strong>
                                </td>
                                <td>
                                    <a href="mailto:<?php echo esc_attr($lead->email); ?>"><?php echo esc_html($lead->email); ?></a>
                                </td>
                                <td><?php echo esc_html($lead->company ?: '—'); ?></td>
                                <td>
                                    <span class="lead-type type-<?php echo esc_attr($lead->type); ?>">
                                        <?php echo esc_html(ucfirst($lead->type)); ?>
                                    </span>
                                </td>
                                <td>
                                    <select class="lead-status-select" data-lead-id="<?php echo esc_attr($lead->id); ?>">
                                        <option value="new" <?php selected($lead->status, 'new'); ?>><?php _e('New', 'siteoptz-leads'); ?></option>
                                        <option value="contacted" <?php selected($lead->status, 'contacted'); ?>><?php _e('Contacted', 'siteoptz-leads'); ?></option>
                                        <option value="qualified" <?php selected($lead->status, 'qualified'); ?>><?php _e('Qualified', 'siteoptz-leads'); ?></option>
                                        <option value="converted" <?php selected($lead->status, 'converted'); ?>><?php _e('Converted', 'siteoptz-leads'); ?></option>
                                        <option value="lost" <?php selected($lead->status, 'lost'); ?>><?php _e('Lost', 'siteoptz-leads'); ?></option>
                                    </select>
                                </td>
                                <td><?php echo esc_html($lead->source ?: '—'); ?></td>
                                <td><?php echo esc_html(date('M j, Y', strtotime($lead->timestamp))); ?></td>
                                <td>
                                    <div class="row-actions">
                                        <span class="edit">
                                            <a href="#" class="edit-lead" data-lead-id="<?php echo esc_attr($lead->id); ?>">
                                                <?php _e('Edit', 'siteoptz-leads'); ?>
                                            </a> |
                                        </span>
                                        <span class="delete">
                                            <a href="#" class="delete-lead" data-lead-id="<?php echo esc_attr($lead->id); ?>">
                                                <?php _e('Delete', 'siteoptz-leads'); ?>
                                            </a>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        
        <?php if ($total_pages > 1): ?>
            <div class="tablenav">
                <div class="tablenav-pages">
                    <?php
                    $page_links = paginate_links(array(
                        'base' => add_query_arg('paged', '%#%'),
                        'format' => '',
                        'prev_text' => __('&laquo;'),
                        'next_text' => __('&raquo;'),
                        'total' => $total_pages,
                        'current' => $page
                    ));
                    echo $page_links;
                    ?>
                </div>
            </div>
        <?php endif; ?>
        
        <div class="bulk-actions">
            <select id="bulk-action-select">
                <option value=""><?php _e('Bulk Actions', 'siteoptz-leads'); ?></option>
                <option value="delete"><?php _e('Delete', 'siteoptz-leads'); ?></option>
                <option value="export"><?php _e('Export', 'siteoptz-leads'); ?></option>
                <option value="mark-contacted"><?php _e('Mark as Contacted', 'siteoptz-leads'); ?></option>
                <option value="mark-qualified"><?php _e('Mark as Qualified', 'siteoptz-leads'); ?></option>
            </select>
            <button type="button" id="bulk-action-apply" class="button"><?php _e('Apply', 'siteoptz-leads'); ?></button>
        </div>
        <?php
    }
    
    /**
     * Render campaigns tab
     */
    private function render_campaigns_tab() {
        ?>
        <div class="email-campaigns-section">
            <div class="section-header">
                <h2><?php _e('Email Campaigns', 'siteoptz-leads'); ?></h2>
                <a href="<?php echo admin_url('post-new.php?post_type=email_campaign'); ?>" class="button button-primary">
                    <?php _e('Create New Campaign', 'siteoptz-leads'); ?>
                </a>
            </div>
            
            <?php
            $campaigns = get_posts(array(
                'post_type' => 'email_campaign',
                'posts_per_page' => -1,
                'post_status' => 'any'
            ));
            ?>
            
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th><?php _e('Campaign', 'siteoptz-leads'); ?></th>
                        <th><?php _e('Status', 'siteoptz-leads'); ?></th>
                        <th><?php _e('Recipients', 'siteoptz-leads'); ?></th>
                        <th><?php _e('Sent', 'siteoptz-leads'); ?></th>
                        <th><?php _e('Opens', 'siteoptz-leads'); ?></th>
                        <th><?php _e('Clicks', 'siteoptz-leads'); ?></th>
                        <th><?php _e('Actions', 'siteoptz-leads'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($campaigns)): ?>
                        <tr>
                            <td colspan="7" class="no-campaigns">
                                <?php _e('No email campaigns found. Create your first campaign!', 'siteoptz-leads'); ?>
                            </td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($campaigns as $campaign): 
                            $recipients = get_post_meta($campaign->ID, '_recipients_count', true) ?: 0;
                            $sent = get_post_meta($campaign->ID, '_emails_sent', true) ?: 0;
                            $opens = get_post_meta($campaign->ID, '_email_opens', true) ?: 0;
                            $clicks = get_post_meta($campaign->ID, '_email_clicks', true) ?: 0;
                        ?>
                            <tr>
                                <td>
                                    <strong><?php echo esc_html($campaign->post_title); ?></strong>
                                    <div class="row-actions">
                                        <span class="edit">
                                            <a href="<?php echo get_edit_post_link($campaign->ID); ?>">
                                                <?php _e('Edit', 'siteoptz-leads'); ?>
                                            </a>
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <span class="campaign-status status-<?php echo esc_attr($campaign->post_status); ?>">
                                        <?php echo esc_html(ucfirst($campaign->post_status)); ?>
                                    </span>
                                </td>
                                <td><?php echo number_format($recipients); ?></td>
                                <td><?php echo number_format($sent); ?></td>
                                <td>
                                    <?php echo number_format($opens); ?>
                                    <?php if ($sent > 0): ?>
                                        <span class="percentage">(<?php echo round(($opens / $sent) * 100, 1); ?>%)</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <?php echo number_format($clicks); ?>
                                    <?php if ($opens > 0): ?>
                                        <span class="percentage">(<?php echo round(($clicks / $opens) * 100, 1); ?>%)</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <?php if ($campaign->post_status === 'draft'): ?>
                                        <button class="button button-primary send-campaign" data-campaign-id="<?php echo esc_attr($campaign->ID); ?>">
                                            <?php _e('Send', 'siteoptz-leads'); ?>
                                        </button>
                                    <?php elseif ($campaign->post_status === 'publish'): ?>
                                        <span class="campaign-sent"><?php _e('Sent', 'siteoptz-leads'); ?></span>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        <?php
    }
    
    /**
     * Render analytics tab
     */
    private function render_analytics_tab() {
        global $wpdb;
        
        // Get analytics data
        $table_name = $wpdb->prefix . 'siteoptz_leads';
        
        // Leads by month (last 12 months)
        $monthly_leads = $wpdb->get_results("
            SELECT 
                DATE_FORMAT(timestamp, '%Y-%m') as month,
                COUNT(*) as count
            FROM {$table_name}
            WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
            GROUP BY DATE_FORMAT(timestamp, '%Y-%m')
            ORDER BY month ASC
        ");
        
        // Leads by type
        $leads_by_type = $wpdb->get_results("
            SELECT type, COUNT(*) as count
            FROM {$table_name}
            GROUP BY type
            ORDER BY count DESC
        ");
        
        // Leads by source
        $leads_by_source = $wpdb->get_results("
            SELECT source, COUNT(*) as count
            FROM {$table_name}
            WHERE source != ''
            GROUP BY source
            ORDER BY count DESC
            LIMIT 10
        ");
        
        // Conversion funnel
        $conversion_stats = array(
            'new' => $this->get_leads_count('new'),
            'contacted' => $this->get_leads_count('contacted'),
            'qualified' => $this->get_leads_count('qualified'),
            'converted' => $this->get_leads_count('converted')
        );
        
        ?>
        <div class="analytics-dashboard">
            <div class="analytics-section">
                <h2><?php _e('Lead Analytics', 'siteoptz-leads'); ?></h2>
                
                <div class="analytics-grid">
                    <div class="chart-container">
                        <h3><?php _e('Leads Over Time', 'siteoptz-leads'); ?></h3>
                        <canvas id="leads-timeline-chart" width="400" height="200"></canvas>
                    </div>
                    
                    <div class="chart-container">
                        <h3><?php _e('Leads by Type', 'siteoptz-leads'); ?></h3>
                        <canvas id="leads-type-chart" width="400" height="200"></canvas>
                    </div>
                    
                    <div class="chart-container">
                        <h3><?php _e('Top Sources', 'siteoptz-leads'); ?></h3>
                        <div class="sources-list">
                            <?php foreach ($leads_by_source as $source): ?>
                                <div class="source-item">
                                    <span class="source-name"><?php echo esc_html($source->source); ?></span>
                                    <span class="source-count"><?php echo number_format($source->count); ?></span>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    
                    <div class="chart-container">
                        <h3><?php _e('Conversion Funnel', 'siteoptz-leads'); ?></h3>
                        <div class="funnel-chart">
                            <div class="funnel-stage">
                                <div class="stage-bar" style="width: 100%;">
                                    <span class="stage-label"><?php _e('New', 'siteoptz-leads'); ?></span>
                                    <span class="stage-count"><?php echo number_format($conversion_stats['new']); ?></span>
                                </div>
                            </div>
                            <div class="funnel-stage">
                                <div class="stage-bar" style="width: <?php echo $conversion_stats['new'] > 0 ? ($conversion_stats['contacted'] / $conversion_stats['new']) * 100 : 0; ?>%;">
                                    <span class="stage-label"><?php _e('Contacted', 'siteoptz-leads'); ?></span>
                                    <span class="stage-count"><?php echo number_format($conversion_stats['contacted']); ?></span>
                                </div>
                            </div>
                            <div class="funnel-stage">
                                <div class="stage-bar" style="width: <?php echo $conversion_stats['new'] > 0 ? ($conversion_stats['qualified'] / $conversion_stats['new']) * 100 : 0; ?>%;">
                                    <span class="stage-label"><?php _e('Qualified', 'siteoptz-leads'); ?></span>
                                    <span class="stage-count"><?php echo number_format($conversion_stats['qualified']); ?></span>
                                </div>
                            </div>
                            <div class="funnel-stage">
                                <div class="stage-bar" style="width: <?php echo $conversion_stats['new'] > 0 ? ($conversion_stats['converted'] / $conversion_stats['new']) * 100 : 0; ?>%;">
                                    <span class="stage-label"><?php _e('Converted', 'siteoptz-leads'); ?></span>
                                    <span class="stage-count"><?php echo number_format($conversion_stats['converted']); ?></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <script>
        // Pass data to JavaScript for charts
        window.leadsAnalyticsData = {
            monthlyLeads: <?php echo json_encode($monthly_leads); ?>,
            leadsByType: <?php echo json_encode($leads_by_type); ?>,
            leadsBySource: <?php echo json_encode($leads_by_source); ?>
        };
        </script>
        <?php
    }
    
    /**
     * Get leads count by status
     */
    private function get_leads_count($status = null) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'siteoptz_leads';
        
        if ($status) {
            return $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$table_name} WHERE status = %s", $status));
        } else {
            return $wpdb->get_var("SELECT COUNT(*) FROM {$table_name}");
        }
    }
    
    /**
     * Admin settings page
     */
    public function admin_settings_page() {
        if (isset($_POST['submit'])) {
            $this->save_lead_settings();
            echo '<div class="notice notice-success"><p>' . __('Settings saved!', 'siteoptz-leads') . '</p></div>';
        }
        
        $settings = $this->get_lead_settings();
        ?>
        <div class="wrap">
            <h1><?php _e('Lead Settings', 'siteoptz-leads'); ?></h1>
            
            <form method="post" action="">
                <?php wp_nonce_field('siteoptz_leads_settings', 'leads_nonce'); ?>
                
                <h2><?php _e('Email Integration', 'siteoptz-leads'); ?></h2>
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php _e('Email Service', 'siteoptz-leads'); ?></th>
                        <td>
                            <select name="email_service">
                                <option value="wordpress" <?php selected($settings['email_service'], 'wordpress'); ?>><?php _e('WordPress (Default)', 'siteoptz-leads'); ?></option>
                                <option value="mailchimp" <?php selected($settings['email_service'], 'mailchimp'); ?>><?php _e('Mailchimp', 'siteoptz-leads'); ?></option>
                                <option value="convertkit" <?php selected($settings['email_service'], 'convertkit'); ?>><?php _e('ConvertKit', 'siteoptz-leads'); ?></option>
                                <option value="mailerlite" <?php selected($settings['email_service'], 'mailerlite'); ?>><?php _e('MailerLite', 'siteoptz-leads'); ?></option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('API Key', 'siteoptz-leads'); ?></th>
                        <td>
                            <input type="password" name="email_api_key" value="<?php echo esc_attr($settings['email_api_key']); ?>" class="regular-text" />
                            <p class="description"><?php _e('API key for your chosen email service', 'siteoptz-leads'); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('Default List ID', 'siteoptz-leads'); ?></th>
                        <td>
                            <input type="text" name="default_list_id" value="<?php echo esc_attr($settings['default_list_id']); ?>" class="regular-text" />
                            <p class="description"><?php _e('Default mailing list/audience ID for new subscribers', 'siteoptz-leads'); ?></p>
                        </td>
                    </tr>
                </table>
                
                <h2><?php _e('Form Settings', 'siteoptz-leads'); ?></h2>
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php _e('Required Fields', 'siteoptz-leads'); ?></th>
                        <td>
                            <fieldset>
                                <label><input type="checkbox" name="required_fields[]" value="name" <?php echo in_array('name', $settings['required_fields']) ? 'checked' : ''; ?> /> <?php _e('Name', 'siteoptz-leads'); ?></label><br>
                                <label><input type="checkbox" name="required_fields[]" value="email" checked disabled /> <?php _e('Email (always required)', 'siteoptz-leads'); ?></label><br>
                                <label><input type="checkbox" name="required_fields[]" value="company" <?php echo in_array('company', $settings['required_fields']) ? 'checked' : ''; ?> /> <?php _e('Company', 'siteoptz-leads'); ?></label><br>
                                <label><input type="checkbox" name="required_fields[]" value="phone" <?php echo in_array('phone', $settings['required_fields']) ? 'checked' : ''; ?> /> <?php _e('Phone', 'siteoptz-leads'); ?></label>
                            </fieldset>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('Double Opt-in', 'siteoptz-leads'); ?></th>
                        <td>
                            <label>
                                <input type="checkbox" name="double_optin" <?php checked($settings['double_optin']); ?> />
                                <?php _e('Require email confirmation for newsletter subscriptions', 'siteoptz-leads'); ?>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('GDPR Compliance', 'siteoptz-leads'); ?></th>
                        <td>
                            <label>
                                <input type="checkbox" name="gdpr_enabled" <?php checked($settings['gdpr_enabled']); ?> />
                                <?php _e('Show GDPR consent checkbox', 'siteoptz-leads'); ?>
                            </label>
                            <br><br>
                            <textarea name="gdpr_text" rows="3" cols="50" class="large-text"><?php echo esc_textarea($settings['gdpr_text']); ?></textarea>
                            <p class="description"><?php _e('GDPR consent text', 'siteoptz-leads'); ?></p>
                        </td>
                    </tr>
                </table>
                
                <h2><?php _e('Notifications', 'siteoptz-leads'); ?></h2>
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php _e('Admin Notifications', 'siteoptz-leads'); ?></th>
                        <td>
                            <label>
                                <input type="checkbox" name="admin_notifications" <?php checked($settings['admin_notifications']); ?> />
                                <?php _e('Send email notification for new leads', 'siteoptz-leads'); ?>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('Notification Email', 'siteoptz-leads'); ?></th>
                        <td>
                            <input type="email" name="notification_email" value="<?php echo esc_attr($settings['notification_email']); ?>" class="regular-text" />
                            <p class="description"><?php _e('Email address to receive lead notifications', 'siteoptz-leads'); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('Auto-responder', 'siteoptz-leads'); ?></th>
                        <td>
                            <label>
                                <input type="checkbox" name="auto_responder_enabled" <?php checked($settings['auto_responder_enabled']); ?> />
                                <?php _e('Send automatic thank you email to new leads', 'siteoptz-leads'); ?>
                            </label>
                            <br><br>
                            <textarea name="auto_responder_template" rows="10" cols="50" class="large-text"><?php echo esc_textarea($settings['auto_responder_template']); ?></textarea>
                            <p class="description"><?php _e('Auto-responder email template. Use {name}, {email}, {company} for personalization.', 'siteoptz-leads'); ?></p>
                        </td>
                    </tr>
                </table>
                
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
    
    /**
     * Save lead settings
     */
    private function save_lead_settings() {
        if (!wp_verify_nonce($_POST['leads_nonce'], 'siteoptz_leads_settings')) {
            return;
        }
        
        $settings = array(
            'email_service' => sanitize_text_field($_POST['email_service']),
            'email_api_key' => sanitize_text_field($_POST['email_api_key']),
            'default_list_id' => sanitize_text_field($_POST['default_list_id']),
            'required_fields' => array_merge(array('email'), (array) $_POST['required_fields']),
            'double_optin' => isset($_POST['double_optin']),
            'gdpr_enabled' => isset($_POST['gdpr_enabled']),
            'gdpr_text' => sanitize_textarea_field($_POST['gdpr_text']),
            'admin_notifications' => isset($_POST['admin_notifications']),
            'notification_email' => sanitize_email($_POST['notification_email']),
            'auto_responder_enabled' => isset($_POST['auto_responder_enabled']),
            'auto_responder_template' => sanitize_textarea_field($_POST['auto_responder_template'])
        );
        
        update_option('siteoptz_leads_settings', $settings);
    }
    
    /**
     * Get lead settings
     */
    private function get_lead_settings() {
        $defaults = array(
            'email_service' => 'wordpress',
            'email_api_key' => '',
            'default_list_id' => '',
            'required_fields' => array('email'),
            'double_optin' => false,
            'gdpr_enabled' => false,
            'gdpr_text' => 'I consent to having this website store my submitted information so they can respond to my inquiry.',
            'admin_notifications' => true,
            'notification_email' => get_option('admin_email'),
            'auto_responder_enabled' => true,
            'auto_responder_template' => "Hi {name},\n\nThank you for your interest in SiteOptz! We've received your information and will be in touch soon.\n\nBest regards,\nThe SiteOptz Team"
        );
        
        $settings = get_option('siteoptz_leads_settings', array());
        return wp_parse_args($settings, $defaults);
    }
    
    /**
     * Register REST API routes
     */
    public function register_api_routes() {
        register_rest_route('siteoptz-leads/v1', '/capture', array(
            'methods' => 'POST',
            'callback' => array($this, 'api_capture_lead'),
            'permission_callback' => '__return_true'
        ));
        
        register_rest_route('siteoptz-leads/v1', '/forms/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'api_get_form_config'),
            'permission_callback' => '__return_true'
        ));
    }
    
    /**
     * API: Capture lead
     */
    public function api_capture_lead($request) {
        $params = $request->get_json_params();
        
        $email = sanitize_email($params['email']);
        if (!is_email($email)) {
            return new WP_Error('invalid_email', 'Invalid email address', array('status' => 400));
        }
        
        $lead_data = array(
            'email' => $email,
            'name' => sanitize_text_field($params['name'] ?: ''),
            'company' => sanitize_text_field($params['company'] ?: ''),
            'phone' => sanitize_text_field($params['phone'] ?: ''),
            'type' => sanitize_text_field($params['type'] ?: 'newsletter'),
            'source' => sanitize_text_field($params['source'] ?: ''),
            'status' => 'new',
            'timestamp' => current_time('mysql')
        );
        
        // Save to database
        global $wpdb;
        $table_name = $wpdb->prefix . 'siteoptz_leads';
        
        $result = $wpdb->insert($table_name, $lead_data);
        
        if ($result) {
            $lead_id = $wpdb->insert_id;
            
            // Send to email service
            $this->add_to_email_service($lead_data);
            
            // Send notifications
            $this->send_lead_notifications($lead_data);
            
            return new WP_REST_Response(array(
                'success' => true,
                'lead_id' => $lead_id,
                'message' => 'Lead captured successfully'
            ), 200);
        }
        
        return new WP_Error('database_error', 'Failed to save lead', array('status' => 500));
    }
    
    /**
     * Add lead to email service
     */
    private function add_to_email_service($lead_data) {
        $settings = $this->get_lead_settings();
        
        switch ($settings['email_service']) {
            case 'mailchimp':
                $this->add_to_mailchimp($lead_data, $settings);
                break;
            case 'convertkit':
                $this->add_to_convertkit($lead_data, $settings);
                break;
            case 'mailerlite':
                $this->add_to_mailerlite($lead_data, $settings);
                break;
        }
    }
    
    /**
     * Add to Mailchimp
     */
    private function add_to_mailchimp($lead_data, $settings) {
        if (empty($settings['email_api_key']) || empty($settings['default_list_id'])) {
            return false;
        }
        
        $api_key = $settings['email_api_key'];
        $list_id = $settings['default_list_id'];
        $datacenter = substr($api_key, strpos($api_key, '-') + 1);
        
        $url = "https://{$datacenter}.api.mailchimp.com/3.0/lists/{$list_id}/members";
        
        $data = array(
            'email_address' => $lead_data['email'],
            'status' => $settings['double_optin'] ? 'pending' : 'subscribed',
            'merge_fields' => array(
                'FNAME' => $lead_data['name'],
                'COMPANY' => $lead_data['company']
            )
        );
        
        wp_remote_post($url, array(
            'headers' => array(
                'Authorization' => 'Basic ' . base64_encode('user:' . $api_key),
                'Content-Type' => 'application/json'
            ),
            'body' => json_encode($data),
            'timeout' => 30
        ));
    }
    
    /**
     * Send lead notifications
     */
    private function send_lead_notifications($lead_data) {
        $settings = $this->get_lead_settings();
        
        // Admin notification
        if ($settings['admin_notifications'] && $settings['notification_email']) {
            $subject = sprintf(__('New Lead: %s', 'siteoptz-leads'), $lead_data['email']);
            $message = sprintf(
                __("New lead captured:\n\nName: %s\nEmail: %s\nCompany: %s\nType: %s\nSource: %s", 'siteoptz-leads'),
                $lead_data['name'],
                $lead_data['email'],
                $lead_data['company'],
                $lead_data['type'],
                $lead_data['source']
            );
            
            wp_mail($settings['notification_email'], $subject, $message);
        }
        
        // Auto-responder
        if ($settings['auto_responder_enabled'] && $settings['auto_responder_template']) {
            $template = $settings['auto_responder_template'];
            $variables = array(
                '{name}' => $lead_data['name'] ?: 'there',
                '{email}' => $lead_data['email'],
                '{company}' => $lead_data['company']
            );
            
            $message = str_replace(array_keys($variables), array_values($variables), $template);
            $subject = __('Thank you for your interest!', 'siteoptz-leads');
            
            wp_mail($lead_data['email'], $subject, $message);
        }
    }
    
    /**
     * Handle capture lead AJAX
     */
    public function handle_capture_lead() {
        check_ajax_referer('siteoptz_leads_nonce', 'nonce');
        
        $email = sanitize_email($_POST['email']);
        $name = sanitize_text_field($_POST['name'] ?: '');
        $company = sanitize_text_field($_POST['company'] ?: '');
        $phone = sanitize_text_field($_POST['phone'] ?: '');
        $type = sanitize_text_field($_POST['type'] ?: 'newsletter');
        $source = sanitize_text_field($_POST['source'] ?: $_SERVER['HTTP_REFERER']);
        
        if (!is_email($email)) {
            wp_send_json_error('Invalid email address');
        }
        
        // Create mock request for API method
        $request = new stdClass();
        $request->params = array(
            'email' => $email,
            'name' => $name,
            'company' => $company,
            'phone' => $phone,
            'type' => $type,
            'source' => $source
        );
        
        $response = $this->api_capture_lead($request);
        
        if (is_wp_error($response)) {
            wp_send_json_error($response->get_error_message());
        } else {
            wp_send_json_success($response->data);
        }
    }
    
    /**
     * Handle update lead status AJAX
     */
    public function handle_update_lead_status() {
        check_ajax_referer('siteoptz_leads_admin_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error('Insufficient permissions');
        }
        
        $lead_id = intval($_POST['lead_id']);
        $status = sanitize_text_field($_POST['status']);
        
        global $wpdb;
        $table_name = $wpdb->prefix . 'siteoptz_leads';
        
        $result = $wpdb->update(
            $table_name,
            array('status' => $status),
            array('id' => $lead_id),
            array('%s'),
            array('%d')
        );
        
        if ($result !== false) {
            wp_send_json_success('Status updated');
        } else {
            wp_send_json_error('Failed to update status');
        }
    }
    
    /**
     * Handle export leads AJAX
     */
    public function handle_export_leads() {
        check_ajax_referer('siteoptz_leads_admin_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error('Insufficient permissions');
        }
        
        global $wpdb;
        $table_name = $wpdb->prefix . 'siteoptz_leads';
        
        $leads = $wpdb->get_results("SELECT * FROM {$table_name} ORDER BY timestamp DESC");
        
        // Generate CSV
        $filename = 'leads_export_' . date('Y-m-d_H-i-s') . '.csv';
        $upload_dir = wp_upload_dir();
        $filepath = $upload_dir['path'] . '/' . $filename;
        
        $file = fopen($filepath, 'w');
        
        // Headers
        fputcsv($file, array('ID', 'Name', 'Email', 'Company', 'Phone', 'Type', 'Status', 'Source', 'Date'));
        
        // Data
        foreach ($leads as $lead) {
            fputcsv($file, array(
                $lead->id,
                $lead->name,
                $lead->email,
                $lead->company,
                $lead->phone,
                $lead->type,
                $lead->status,
                $lead->source,
                $lead->timestamp
            ));
        }
        
        fclose($file);
        
        wp_send_json_success(array(
            'download_url' => $upload_dir['url'] . '/' . $filename,
            'filename' => $filename
        ));
    }
    
    /**
     * Lead form shortcode
     */
    public function lead_form_shortcode($atts) {
        $atts = shortcode_atts(array(
            'type' => 'newsletter',
            'title' => '',
            'description' => '',
            'button_text' => __('Submit', 'siteoptz-leads'),
            'fields' => 'email,name',
            'redirect' => '',
            'class' => ''
        ), $atts);
        
        $fields = explode(',', $atts['fields']);
        $settings = $this->get_lead_settings();
        
        ob_start();
        ?>
        <div class="siteoptz-lead-form <?php echo esc_attr($atts['class']); ?>" data-type="<?php echo esc_attr($atts['type']); ?>">
            <?php if ($atts['title']): ?>
                <h3 class="form-title"><?php echo esc_html($atts['title']); ?></h3>
            <?php endif; ?>
            
            <?php if ($atts['description']): ?>
                <p class="form-description"><?php echo esc_html($atts['description']); ?></p>
            <?php endif; ?>
            
            <form class="lead-capture-form">
                <?php wp_nonce_field('siteoptz_leads_nonce', 'nonce'); ?>
                <input type="hidden" name="action" value="capture_lead">
                <input type="hidden" name="type" value="<?php echo esc_attr($atts['type']); ?>">
                <input type="hidden" name="source" value="<?php echo esc_url($_SERVER['REQUEST_URI']); ?>">
                
                <div class="form-fields">
                    <?php foreach ($fields as $field): 
                        $field = trim($field);
                        $required = in_array($field, $settings['required_fields']);
                        $field_id = 'lead_' . $field . '_' . uniqid();
                        ?>
                        <div class="form-field field-<?php echo esc_attr($field); ?>">
                            <?php if ($field === 'email'): ?>
                                <label for="<?php echo esc_attr($field_id); ?>"><?php _e('Email Address', 'siteoptz-leads'); ?> <?php echo $required ? '<span class="required">*</span>' : ''; ?></label>
                                <input type="email" id="<?php echo esc_attr($field_id); ?>" name="email" <?php echo $required ? 'required' : ''; ?> placeholder="<?php _e('your@email.com', 'siteoptz-leads'); ?>" />
                            <?php elseif ($field === 'name'): ?>
                                <label for="<?php echo esc_attr($field_id); ?>"><?php _e('Full Name', 'siteoptz-leads'); ?> <?php echo $required ? '<span class="required">*</span>' : ''; ?></label>
                                <input type="text" id="<?php echo esc_attr($field_id); ?>" name="name" <?php echo $required ? 'required' : ''; ?> placeholder="<?php _e('Your Name', 'siteoptz-leads'); ?>" />
                            <?php elseif ($field === 'company'): ?>
                                <label for="<?php echo esc_attr($field_id); ?>"><?php _e('Company', 'siteoptz-leads'); ?> <?php echo $required ? '<span class="required">*</span>' : ''; ?></label>
                                <input type="text" id="<?php echo esc_attr($field_id); ?>" name="company" <?php echo $required ? 'required' : ''; ?> placeholder="<?php _e('Company Name', 'siteoptz-leads'); ?>" />
                            <?php elseif ($field === 'phone'): ?>
                                <label for="<?php echo esc_attr($field_id); ?>"><?php _e('Phone', 'siteoptz-leads'); ?> <?php echo $required ? '<span class="required">*</span>' : ''; ?></label>
                                <input type="tel" id="<?php echo esc_attr($field_id); ?>" name="phone" <?php echo $required ? 'required' : ''; ?> placeholder="<?php _e('+1 (555) 123-4567', 'siteoptz-leads'); ?>" />
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                    
                    <?php if ($settings['gdpr_enabled']): ?>
                        <div class="form-field field-gdpr">
                            <label class="gdpr-consent">
                                <input type="checkbox" name="gdpr_consent" required>
                                <span class="checkmark"></span>
                                <span class="gdpr-text"><?php echo esc_html($settings['gdpr_text']); ?></span>
                            </label>
                        </div>
                    <?php endif; ?>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="submit-button">
                        <span class="button-text"><?php echo esc_html($atts['button_text']); ?></span>
                        <span class="button-loading" style="display: none;"><?php _e('Please wait...', 'siteoptz-leads'); ?></span>
                    </button>
                </div>
                
                <div class="form-messages" style="display: none;"></div>
            </form>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * Newsletter shortcode
     */
    public function newsletter_shortcode($atts) {
        $defaults = array(
            'type' => 'newsletter',
            'title' => __('Stay Updated', 'siteoptz-leads'),
            'description' => __('Get the latest AI tool insights delivered to your inbox.', 'siteoptz-leads'),
            'button_text' => __('Subscribe', 'siteoptz-leads'),
            'fields' => 'email,name'
        );
        
        $atts = shortcode_atts($defaults, $atts);
        return $this->lead_form_shortcode($atts);
    }
    
    /**
     * Demo request shortcode
     */
    public function demo_request_shortcode($atts) {
        $defaults = array(
            'type' => 'demo',
            'title' => __('Request a Demo', 'siteoptz-leads'),
            'description' => __('See how SiteOptz can help you find the perfect AI tools.', 'siteoptz-leads'),
            'button_text' => __('Request Demo', 'siteoptz-leads'),
            'fields' => 'email,name,company'
        );
        
        $atts = shortcode_atts($defaults, $atts);
        return $this->lead_form_shortcode($atts);
    }
    
    /**
     * Send email campaigns (cron job)
     */
    public function send_email_campaigns() {
        // Get pending campaigns
        $campaigns = get_posts(array(
            'post_type' => 'email_campaign',
            'meta_query' => array(
                array(
                    'key' => '_campaign_status',
                    'value' => 'scheduled'
                ),
                array(
                    'key' => '_send_time',
                    'value' => current_time('timestamp'),
                    'compare' => '<='
                )
            )
        ));
        
        foreach ($campaigns as $campaign) {
            $this->send_campaign($campaign->ID);
        }
    }
    
    /**
     * Send individual campaign
     */
    private function send_campaign($campaign_id) {
        // Implementation for sending email campaigns
        // This would integrate with the chosen email service
    }
    
    /**
     * Clean old leads (cron job)
     */
    public function clean_old_leads() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'siteoptz_leads';
        $days_to_keep = apply_filters('siteoptz_leads_retention_days', 730); // 2 years default
        
        $wpdb->query($wpdb->prepare("
            DELETE FROM {$table_name}
            WHERE timestamp < DATE_SUB(NOW(), INTERVAL %d DAY)
            AND status = 'lost'
        ", $days_to_keep));
    }
    
    /**
     * Core missing notice
     */
    public function core_missing_notice() {
        ?>
        <div class="notice notice-error">
            <p><?php _e('SiteOptz Lead Management requires SiteOptz Core plugin to be installed and activated.', 'siteoptz-leads'); ?></p>
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
            wp_die(__('SiteOptz Lead Management requires SiteOptz Core plugin to be installed and activated.', 'siteoptz-leads'));
        }
        
        // Create database tables (already done in Core)
        
        // Create default settings
        if (!get_option('siteoptz_leads_settings')) {
            $default_settings = $this->get_lead_settings();
            update_option('siteoptz_leads_settings', $default_settings);
        }
        
        flush_rewrite_rules();
    }
    
    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Clear scheduled events
        wp_clear_scheduled_hook('siteoptz_send_email_campaigns');
        wp_clear_scheduled_hook('siteoptz_clean_old_leads');
        
        flush_rewrite_rules();
    }
}

// Initialize the plugin
new SiteOptz_Leads();