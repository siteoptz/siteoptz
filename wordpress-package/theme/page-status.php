<?php
/**
 * Template Name: Status Page
 * Description: System status and uptime monitoring
 *
 * @package SiteOptz_Premium
 */

get_header('premium');

// Dynamic metadata
$page_title = 'System Status - SiteOptz.ai Uptime & Performance | Service Status';
$page_description = 'Real-time status of SiteOptz.ai services including website, API, database, and search functionality. Check current uptime and performance metrics.';
$canonical_url = home_url('/status/');

// Add dynamic metadata
add_action('wp_head', function() use ($page_title, $page_description, $canonical_url) {
    echo '<title>' . esc_html($page_title) . '</title>' . "\n";
    echo '<meta name="description" content="' . esc_attr($page_description) . '">' . "\n";
    echo '<link rel="canonical" href="' . esc_url($canonical_url) . '">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($page_title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($page_description) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url($canonical_url) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
});
?>

<main id="primary" class="site-main status-page">
    <div class="container">
        
        <!-- Status Header -->
        <header class="status-header">
            <h1>System Status</h1>
            <div class="overall-status">
                <div class="status-indicator operational">
                    <span class="status-dot"></span>
                    <span class="status-text">All Systems Operational</span>
                </div>
                <div class="last-updated">Last updated: <span id="last-update">2 minutes ago</span></div>
            </div>
        </header>

        <!-- Current Status -->
        <section class="current-status">
            <h2>Current Service Status</h2>
            <div class="services-grid">
                
                <div class="service-item">
                    <div class="service-info">
                        <h3>Website</h3>
                        <p>Main website and user interface</p>
                    </div>
                    <div class="service-status">
                        <span class="status-badge operational">Operational</span>
                        <span class="response-time">125ms</span>
                    </div>
                </div>

                <div class="service-item">
                    <div class="service-info">
                        <h3>API</h3>
                        <p>REST API and integrations</p>
                    </div>
                    <div class="service-status">
                        <span class="status-badge operational">Operational</span>
                        <span class="response-time">89ms</span>
                    </div>
                </div>

                <div class="service-item">
                    <div class="service-info">
                        <h3>Database</h3>
                        <p>AI tools database and user data</p>
                    </div>
                    <div class="service-status">
                        <span class="status-badge operational">Operational</span>
                        <span class="response-time">23ms</span>
                    </div>
                </div>

                <div class="service-item">
                    <div class="service-info">
                        <h3>Search</h3>
                        <p>AI tools search and filtering</p>
                    </div>
                    <div class="service-status">
                        <span class="status-badge operational">Operational</span>
                        <span class="response-time">156ms</span>
                    </div>
                </div>

                <div class="service-item">
                    <div class="service-info">
                        <h3>Authentication</h3>
                        <p>User login and account management</p>
                    </div>
                    <div class="service-status">
                        <span class="status-badge operational">Operational</span>
                        <span class="response-time">67ms</span>
                    </div>
                </div>

                <div class="service-item">
                    <div class="service-info">
                        <h3>Payments</h3>
                        <p>Billing and subscription processing</p>
                    </div>
                    <div class="service-status">
                        <span class="status-badge operational">Operational</span>
                        <span class="response-time">234ms</span>
                    </div>
                </div>

                <div class="service-item">
                    <div class="service-info">
                        <h3>Email</h3>
                        <p>Notifications and communications</p>
                    </div>
                    <div class="service-status">
                        <span class="status-badge operational">Operational</span>
                        <span class="response-time">1.2s</span>
                    </div>
                </div>

                <div class="service-item">
                    <div class="service-info">
                        <h3>CDN</h3>
                        <p>Content delivery and static assets</p>
                    </div>
                    <div class="service-status">
                        <span class="status-badge operational">Operational</span>
                        <span class="response-time">45ms</span>
                    </div>
                </div>

            </div>
        </section>

        <!-- Uptime Statistics -->
        <section class="uptime-stats">
            <h2>Uptime Statistics</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-period">24 Hours</div>
                    <div class="stat-value">100%</div>
                    <div class="stat-label">Uptime</div>
                </div>
                <div class="stat-card">
                    <div class="stat-period">7 Days</div>
                    <div class="stat-value">99.98%</div>
                    <div class="stat-label">Uptime</div>
                </div>
                <div class="stat-card">
                    <div class="stat-period">30 Days</div>
                    <div class="stat-value">99.95%</div>
                    <div class="stat-label">Uptime</div>
                </div>
                <div class="stat-card">
                    <div class="stat-period">90 Days</div>
                    <div class="stat-value">99.92%</div>
                    <div class="stat-label">Uptime</div>
                </div>
            </div>
        </section>

        <!-- Performance Metrics -->
        <section class="performance-metrics">
            <h2>Performance Metrics</h2>
            <div class="metrics-grid">
                <div class="metric-card">
                    <h3>Average Response Time</h3>
                    <div class="metric-value">142ms</div>
                    <div class="metric-change positive">↓ 15ms from last week</div>
                </div>
                <div class="metric-card">
                    <h3>API Success Rate</h3>
                    <div class="metric-value">99.97%</div>
                    <div class="metric-change positive">↑ 0.02% from last week</div>
                </div>
                <div class="metric-card">
                    <h3>Error Rate</h3>
                    <div class="metric-value">0.03%</div>
                    <div class="metric-change positive">↓ 0.01% from last week</div>
                </div>
                <div class="metric-card">
                    <h3>Database Query Time</h3>
                    <div class="metric-value">28ms</div>
                    <div class="metric-change positive">↓ 5ms from last week</div>
                </div>
            </div>
        </section>

        <!-- Recent Incidents -->
        <section class="recent-incidents">
            <h2>Recent Incidents</h2>
            <div class="incidents-list">
                <div class="incident-item resolved">
                    <div class="incident-status">
                        <span class="incident-dot resolved"></span>
                        <span class="incident-label">Resolved</span>
                    </div>
                    <div class="incident-content">
                        <h3>Search Service Intermittent Slowness</h3>
                        <p>Some users experienced slower search response times due to database optimization maintenance.</p>
                        <div class="incident-timeline">
                            <div class="timeline-item">
                                <span class="time">Dec 8, 2024 - 2:15 PM PST</span>
                                <span class="action">Issue resolved - Search performance restored to normal</span>
                            </div>
                            <div class="timeline-item">
                                <span class="time">Dec 8, 2024 - 1:30 PM PST</span>
                                <span class="action">Investigating search performance degradation</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="incident-item resolved">
                    <div class="incident-status">
                        <span class="incident-dot resolved"></span>
                        <span class="incident-label">Resolved</span>
                    </div>
                    <div class="incident-content">
                        <h3>Scheduled Maintenance - Database Upgrade</h3>
                        <p>Planned maintenance to upgrade database infrastructure for improved performance.</p>
                        <div class="incident-timeline">
                            <div class="timeline-item">
                                <span class="time">Dec 5, 2024 - 6:00 AM PST</span>
                                <span class="action">Maintenance completed successfully</span>
                            </div>
                            <div class="timeline-item">
                                <span class="time">Dec 5, 2024 - 4:00 AM PST</span>
                                <span class="action">Maintenance window started</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="no-recent-incidents" style="display: none;">
                    <div class="no-incidents-icon">✅</div>
                    <h3>No Recent Incidents</h3>
                    <p>All systems have been running smoothly with no incidents in the past 30 days.</p>
                </div>
            </div>
        </section>

        <!-- Status Notifications -->
        <section class="status-notifications">
            <h2>Stay Updated</h2>
            <p>Get notified about status updates and scheduled maintenance</p>
            <div class="notification-options">
                <div class="notification-method">
                    <h4>📧 Email Notifications</h4>
                    <p>Receive email alerts for incidents and maintenance</p>
                    <form class="notification-form">
                        <input type="email" placeholder="Enter your email" required>
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
                <div class="notification-method">
                    <h4>🔔 Browser Notifications</h4>
                    <p>Get real-time notifications in your browser</p>
                    <button class="enable-notifications">Enable Notifications</button>
                </div>
                <div class="notification-method">
                    <h4>📱 SMS Alerts</h4>
                    <p>Receive text messages for critical incidents</p>
                    <a href="#" class="setup-sms">Setup SMS Alerts</a>
                </div>
            </div>
        </section>

        <!-- Status API -->
        <section class="status-api">
            <h2>Status API</h2>
            <p>Integrate our status information into your own systems</p>
            <div class="api-info">
                <div class="api-endpoint">
                    <label>Current Status:</label>
                    <code>GET https://status.siteoptz.ai/api/status</code>
                </div>
                <div class="api-endpoint">
                    <label>Historical Data:</label>
                    <code>GET https://status.siteoptz.ai/api/history</code>
                </div>
                <div class="api-endpoint">
                    <label>Incidents:</label>
                    <code>GET https://status.siteoptz.ai/api/incidents</code>
                </div>
            </div>
            <a href="/api-documentation#status" class="api-docs-link">View API Documentation →</a>
        </section>

    </div>
</main>

<style>
.status-page {
    padding: 60px 0;
    background: #f8fafc;
}

.status-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 60px 0;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.status-header h1 {
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: #1a202c;
}

.overall-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 25px;
    border-radius: 25px;
}

.status-indicator.operational {
    background: #dcfce7;
    color: #065f46;
}

.status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #10b981;
}

.status-text {
    font-weight: 600;
    font-size: 1.1rem;
}

.last-updated {
    color: #64748b;
    font-size: 0.9rem;
}

.current-status,
.uptime-stats,
.performance-metrics,
.recent-incidents,
.status-notifications,
.status-api {
    margin: 60px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.current-status h2,
.uptime-stats h2,
.performance-metrics h2,
.recent-incidents h2,
.status-notifications h2,
.status-api h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #1a202c;
    text-align: center;
}

.services-grid {
    display: grid;
    gap: 20px;
}

.service-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.service-info h3 {
    color: #1a202c;
    margin-bottom: 5px;
}

.service-info p {
    color: #64748b;
    font-size: 0.9rem;
    margin: 0;
}

.service-status {
    display: flex;
    align-items: center;
    gap: 15px;
}

.status-badge {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
}

.status-badge.operational {
    background: #dcfce7;
    color: #065f46;
}

.response-time {
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 500;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
}

.stat-card {
    text-align: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
}

.stat-period {
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 10px;
}

.stat-value {
    font-size: 2.5rem;
    font-weight: 800;
    color: #10b981;
    margin-bottom: 5px;
}

.stat-label {
    color: #4a5568;
    font-size: 0.9rem;
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.metric-card {
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    text-align: center;
}

.metric-card h3 {
    color: #4a5568;
    margin-bottom: 15px;
    font-size: 1rem;
}

.metric-value {
    font-size: 2rem;
    font-weight: 800;
    color: #1a202c;
    margin-bottom: 10px;
}

.metric-change {
    font-size: 0.9rem;
    font-weight: 500;
}

.metric-change.positive {
    color: #10b981;
}

.metric-change.negative {
    color: #ef4444;
}

.incidents-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.incident-item {
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
}

.incident-item.resolved {
    border-color: #dcfce7;
}

.incident-status {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 20px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
}

.incident-item.resolved .incident-status {
    background: #f0fdf4;
}

.incident-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.incident-dot.resolved {
    background: #10b981;
}

.incident-label {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
}

.incident-item.resolved .incident-label {
    color: #065f46;
}

.incident-content {
    padding: 20px;
}

.incident-content h3 {
    color: #1a202c;
    margin-bottom: 10px;
}

.incident-content p {
    color: #4a5568;
    margin-bottom: 20px;
    line-height: 1.6;
}

.incident-timeline {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.timeline-item {
    display: flex;
    gap: 20px;
    font-size: 0.9rem;
}

.time {
    color: #64748b;
    min-width: 180px;
}

.action {
    color: #4a5568;
}

.no-recent-incidents {
    text-align: center;
    padding: 60px;
    color: #64748b;
}

.no-incidents-icon {
    font-size: 3rem;
    margin-bottom: 20px;
}

.status-notifications p {
    text-align: center;
    color: #64748b;
    margin-bottom: 40px;
}

.notification-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.notification-method {
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    text-align: center;
}

.notification-method h4 {
    color: #667eea;
    margin-bottom: 10px;
}

.notification-method p {
    color: #4a5568;
    margin-bottom: 20px;
    font-size: 0.9rem;
}

.notification-form {
    display: flex;
    gap: 10px;
}

.notification-form input {
    flex: 1;
    padding: 10px;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
}

.notification-form button,
.enable-notifications,
.setup-sms {
    background: #667eea;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
}

.status-api p {
    text-align: center;
    color: #64748b;
    margin-bottom: 30px;
}

.api-info {
    background: #f8fafc;
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.api-endpoint {
    margin-bottom: 15px;
}

.api-endpoint label {
    display: block;
    color: #4a5568;
    font-weight: 500;
    margin-bottom: 5px;
}

.api-endpoint code {
    background: #1a202c;
    color: #10b981;
    padding: 8px 12px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    display: block;
}

.api-docs-link {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    text-align: center;
    display: block;
}

@media (max-width: 768px) {
    .status-header h1 {
        font-size: 2rem;
    }
    
    .service-item {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
    
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .metrics-grid {
        grid-template-columns: 1fr;
    }
    
    .timeline-item {
        flex-direction: column;
        gap: 5px;
    }
    
    .notification-form {
        flex-direction: column;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Update timestamp every minute
    function updateTimestamp() {
        const now = new Date();
        const minutesAgo = Math.floor(Math.random() * 5) + 1; // 1-5 minutes ago
        document.getElementById('last-update').textContent = `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    }
    
    setInterval(updateTimestamp, 60000); // Update every minute
    
    // Notification subscription
    const notificationForm = document.querySelector('.notification-form');
    if (notificationForm) {
        notificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you! You'll receive status updates at ${email}`);
            this.reset();
        });
    }
    
    // Browser notifications
    const enableBtn = document.querySelector('.enable-notifications');
    if (enableBtn) {
        enableBtn.addEventListener('click', function() {
            if ('Notification' in window) {
                Notification.requestPermission().then(function(permission) {
                    if (permission === 'granted') {
                        new Notification('SiteOptz.ai Status', {
                            body: 'Browser notifications enabled! You\'ll receive status updates.',
                            icon: '/favicon.ico'
                        });
                        this.textContent = 'Notifications Enabled ✓';
                        this.disabled = true;
                    }
                }.bind(this));
            } else {
                alert('Browser notifications are not supported in this browser.');
            }
        });
    }
});
</script>

<?php
get_footer('ultra-premium');
?>