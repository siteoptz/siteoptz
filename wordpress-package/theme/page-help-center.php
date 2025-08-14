<?php
/**
 * Template Name: Help Center Page
 * Description: Customer support and help documentation
 *
 * @package SiteOptz_Premium
 */

get_header('premium');

// Dynamic metadata
$page_title = 'Help Center - Support & Documentation | SiteOptz.ai';
$page_description = 'Find answers to common questions, browse our knowledge base, and get support for using SiteOptz.ai to find the best AI tools for your business.';
$canonical_url = home_url('/help-center/');

// Add dynamic metadata
add_action('wp_head', function() use ($page_title, $page_description, $canonical_url) {
    echo '<title>' . esc_html($page_title) . '</title>' . "\n";
    echo '<meta name="description" content="' . esc_attr($page_description) . '">' . "\n";
    echo '<link rel="canonical" href="' . esc_url($canonical_url) . '">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($page_title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($page_description) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url($canonical_url) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
    
    // Schema markup for help center
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'WebPage',
        'name' => 'Help Center',
        'description' => $page_description,
        'url' => $canonical_url,
        'mainEntity' => array(
            '@type' => 'FAQPage',
            'name' => 'Frequently Asked Questions'
        )
    );
    
    echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
});
?>

<main id="primary" class="site-main help-center-page">
    <div class="container">
        
        <!-- Help Center Header -->
        <header class="help-center-header">
            <h1>How can we help you?</h1>
            <p>Find answers, browse documentation, or contact our support team</p>
            
            <div class="help-search">
                <div class="search-box">
                    <input type="text" id="help-search" placeholder="Search for help articles..." />
                    <button type="button">🔍</button>
                </div>
                <p class="search-suggestions">
                    Popular searches: <a href="#">How to compare tools</a>, <a href="#">Pricing plans</a>, <a href="#">API access</a>
                </p>
            </div>
        </header>

        <!-- Quick Actions -->
        <section class="quick-actions">
            <div class="action-cards">
                <a href="#getting-started" class="action-card">
                    <div class="action-icon">🚀</div>
                    <h3>Getting Started</h3>
                    <p>New to SiteOptz? Learn the basics</p>
                </a>
                <a href="#contact-support" class="action-card">
                    <div class="action-icon">💬</div>
                    <h3>Contact Support</h3>
                    <p>Get help from our team</p>
                </a>
                <a href="#api-docs" class="action-card">
                    <div class="action-icon">⚙️</div>
                    <h3>API Documentation</h3>
                    <p>Integrate with our platform</p>
                </a>
                <a href="#status" class="action-card">
                    <div class="action-icon">🟢</div>
                    <h3>System Status</h3>
                    <p>Check service availability</p>
                </a>
            </div>
        </section>

        <!-- Help Categories -->
        <section class="help-categories">
            <h2>Browse by Category</h2>
            <div class="categories-grid">
                
                <div class="category-section" id="getting-started">
                    <div class="category-header">
                        <h3>🚀 Getting Started</h3>
                        <p>Everything you need to start using SiteOptz.ai</p>
                    </div>
                    <div class="articles-list">
                        <a href="#" class="article-link">
                            <h4>How to find the right AI tool for your business</h4>
                            <p>Step-by-step guide to using our search and filter features</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Understanding our rating system</h4>
                            <p>How we evaluate and score AI tools</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Using comparison tables effectively</h4>
                            <p>Tips for comparing multiple tools side-by-side</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Setting up your account and preferences</h4>
                            <p>Customize your experience for better recommendations</p>
                        </a>
                    </div>
                </div>

                <div class="category-section">
                    <div class="category-header">
                        <h3>💳 Billing & Pricing</h3>
                        <p>Questions about plans, billing, and payments</p>
                    </div>
                    <div class="articles-list">
                        <a href="#" class="article-link">
                            <h4>Understanding our pricing plans</h4>
                            <p>Free vs Pro vs Enterprise features comparison</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>How to upgrade or downgrade your plan</h4>
                            <p>Manage your subscription and billing preferences</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Refund policy and cancellations</h4>
                            <p>What to expect when canceling your subscription</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Corporate and team accounts</h4>
                            <p>Setting up accounts for multiple users</p>
                        </a>
                    </div>
                </div>

                <div class="category-section">
                    <div class="category-header">
                        <h3>🔧 Platform Features</h3>
                        <p>Learn about all our tools and features</p>
                    </div>
                    <div class="articles-list">
                        <a href="#" class="article-link">
                            <h4>Advanced search and filtering</h4>
                            <p>Use filters to find exactly what you need</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>ROI Calculator guide</h4>
                            <p>Calculate potential savings with our ROI tool</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Bookmark and save tools</h4>
                            <p>Keep track of tools you're interested in</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Getting personalized recommendations</h4>
                            <p>How our AI suggests tools based on your needs</p>
                        </a>
                    </div>
                </div>

                <div class="category-section" id="api-docs">
                    <div class="category-header">
                        <h3>⚙️ API & Integrations</h3>
                        <p>Technical documentation for developers</p>
                    </div>
                    <div class="articles-list">
                        <a href="#" class="article-link">
                            <h4>API Authentication</h4>
                            <p>Getting started with API keys and authentication</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Tools Database API</h4>
                            <p>Access our complete database of AI tools</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Comparison API</h4>
                            <p>Generate tool comparisons programmatically</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Rate limiting and best practices</h4>
                            <p>Optimize your API usage for best performance</p>
                        </a>
                    </div>
                </div>

                <div class="category-section">
                    <div class="category-header">
                        <h3>🔒 Security & Privacy</h3>
                        <p>How we protect your data and privacy</p>
                    </div>
                    <div class="articles-list">
                        <a href="#" class="article-link">
                            <h4>Data privacy and GDPR compliance</h4>
                            <p>How we handle and protect your personal data</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Security measures and encryption</h4>
                            <p>Technical details about our security infrastructure</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Account security best practices</h4>
                            <p>Tips for keeping your account secure</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Cookie policy and tracking</h4>
                            <p>What cookies we use and how to manage them</p>
                        </a>
                    </div>
                </div>

                <div class="category-section">
                    <div class="category-header">
                        <h3>🤝 Business & Enterprise</h3>
                        <p>Information for business and enterprise users</p>
                    </div>
                    <div class="articles-list">
                        <a href="#" class="article-link">
                            <h4>Enterprise features and pricing</h4>
                            <p>Advanced features for large organizations</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Custom integrations and white-labeling</h4>
                            <p>Integrate our platform into your workflow</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>Team management and permissions</h4>
                            <p>Manage multiple users and access levels</p>
                        </a>
                        <a href="#" class="article-link">
                            <h4>SLA and support guarantees</h4>
                            <p>Service level agreements for enterprise customers</p>
                        </a>
                    </div>
                </div>

            </div>
        </section>

        <!-- Popular Articles -->
        <section class="popular-articles">
            <h2>Most Popular Articles</h2>
            <div class="popular-grid">
                <article class="popular-article">
                    <div class="article-number">1</div>
                    <div class="article-content">
                        <h3>How to choose between ChatGPT, Claude, and Gemini</h3>
                        <p>Comprehensive comparison of the three leading AI assistants</p>
                        <span class="read-time">5 min read • 15K views</span>
                    </div>
                </article>
                
                <article class="popular-article">
                    <div class="article-number">2</div>
                    <div class="article-content">
                        <h3>Free vs paid AI tools: What's worth the investment?</h3>
                        <p>When to upgrade from free plans and which features matter most</p>
                        <span class="read-time">8 min read • 12K views</span>
                    </div>
                </article>
                
                <article class="popular-article">
                    <div class="article-number">3</div>
                    <div class="article-content">
                        <h3>ROI Calculator: How to measure AI tool success</h3>
                        <p>Step-by-step guide to calculating return on investment</p>
                        <span class="read-time">6 min read • 10K views</span>
                    </div>
                </article>
            </div>
        </section>

        <!-- Contact Support -->
        <section id="contact-support" class="contact-support">
            <h2>Still Need Help?</h2>
            <p>Can't find what you're looking for? Our support team is here to help.</p>
            
            <div class="support-options">
                <div class="support-option">
                    <div class="support-icon">💬</div>
                    <h3>Live Chat</h3>
                    <p>Chat with our support team</p>
                    <span class="availability">Available 9 AM - 6 PM PST</span>
                    <button class="support-btn">Start Chat</button>
                </div>
                
                <div class="support-option">
                    <div class="support-icon">📧</div>
                    <h3>Email Support</h3>
                    <p>Send us a detailed message</p>
                    <span class="availability">Response within 24 hours</span>
                    <a href="mailto:support@siteoptz.ai" class="support-btn">Send Email</a>
                </div>
                
                <div class="support-option">
                    <div class="support-icon">📞</div>
                    <h3>Phone Support</h3>
                    <p>Talk to our enterprise team</p>
                    <span class="availability">Enterprise customers only</span>
                    <a href="tel:+1-555-0123" class="support-btn">Call Now</a>
                </div>
            </div>
        </section>

        <!-- System Status -->
        <section id="status" class="system-status">
            <h2>System Status</h2>
            <div class="status-overview">
                <div class="status-indicator">
                    <span class="status-dot operational"></span>
                    <span class="status-text">All systems operational</span>
                </div>
                <div class="last-updated">Last updated: 2 minutes ago</div>
            </div>
            
            <div class="services-status">
                <div class="service-status">
                    <span class="service-name">Website</span>
                    <span class="status-badge operational">Operational</span>
                </div>
                <div class="service-status">
                    <span class="service-name">API</span>
                    <span class="status-badge operational">Operational</span>
                </div>
                <div class="service-status">
                    <span class="service-name">Database</span>
                    <span class="status-badge operational">Operational</span>
                </div>
                <div class="service-status">
                    <span class="service-name">Search</span>
                    <span class="status-badge operational">Operational</span>
                </div>
            </div>
            
            <a href="/status" class="view-detailed-status">View Detailed Status Page →</a>
        </section>

    </div>
</main>

<style>
.help-center-page {
    padding: 60px 0;
    background: #f8fafc;
}

.help-center-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.help-center-header h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.help-center-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    margin-bottom: 40px;
}

.help-search {
    max-width: 600px;
    margin: 0 auto;
}

.search-box {
    display: flex;
    background: white;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.search-box input {
    flex: 1;
    padding: 20px 30px;
    border: none;
    outline: none;
    font-size: 1.1rem;
    color: #1a202c;
}

.search-box button {
    padding: 20px 25px;
    background: #667eea;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
}

.search-suggestions {
    margin-top: 15px;
    opacity: 0.9;
}

.search-suggestions a {
    color: white;
    text-decoration: underline;
    margin: 0 10px;
}

.quick-actions,
.help-categories,
.popular-articles,
.contact-support,
.system-status {
    margin: 60px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.action-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.action-card {
    text-align: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
    text-decoration: none;
    color: #1a202c;
    transition: all 0.3s;
    border: 2px solid transparent;
}

.action-card:hover {
    border-color: #667eea;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.action-icon {
    font-size: 3rem;
    margin-bottom: 15px;
}

.action-card h3 {
    margin-bottom: 10px;
    color: #667eea;
}

.action-card p {
    color: #64748b;
    font-size: 0.9rem;
}

.help-categories h2,
.popular-articles h2,
.contact-support h2,
.system-status h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #1a202c;
    text-align: center;
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 40px;
}

.category-section {
    background: #f8fafc;
    border-radius: 12px;
    overflow: hidden;
}

.category-header {
    padding: 25px;
    background: white;
    border-bottom: 2px solid #e2e8f0;
}

.category-header h3 {
    margin-bottom: 5px;
    color: #667eea;
    font-size: 1.3rem;
}

.category-header p {
    color: #64748b;
    font-size: 0.9rem;
    margin: 0;
}

.articles-list {
    padding: 20px;
}

.article-link {
    display: block;
    padding: 20px;
    background: white;
    border-radius: 8px;
    text-decoration: none;
    color: #1a202c;
    margin-bottom: 15px;
    transition: all 0.3s;
    border: 1px solid #e2e8f0;
}

.article-link:hover {
    border-color: #667eea;
    transform: translateX(5px);
}

.article-link h4 {
    margin-bottom: 5px;
    color: #667eea;
    font-size: 1rem;
}

.article-link p {
    color: #64748b;
    font-size: 0.85rem;
    margin: 0;
}

.popular-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.popular-article {
    display: flex;
    gap: 20px;
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    transition: all 0.3s;
}

.popular-article:hover {
    background: #f1f5f9;
    transform: translateY(-2px);
}

.article-number {
    width: 40px;
    height: 40px;
    background: #667eea;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.1rem;
    flex-shrink: 0;
}

.article-content h3 {
    margin-bottom: 5px;
    color: #1a202c;
    font-size: 1.1rem;
}

.article-content p {
    color: #4a5568;
    margin-bottom: 10px;
    font-size: 0.9rem;
}

.read-time {
    color: #64748b;
    font-size: 0.8rem;
}

.contact-support {
    text-align: center;
}

.contact-support h2 {
    margin-bottom: 15px;
}

.contact-support p {
    color: #64748b;
    margin-bottom: 40px;
}

.support-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.support-option {
    text-align: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
}

.support-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
}

.support-option h3 {
    margin-bottom: 10px;
    color: #667eea;
}

.support-option p {
    color: #4a5568;
    margin-bottom: 10px;
}

.availability {
    color: #64748b;
    font-size: 0.85rem;
    margin-bottom: 20px;
    display: block;
}

.support-btn {
    background: #667eea;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
}

.support-btn:hover {
    background: #5a67d8;
}

.status-overview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 20px;
    background: #f0fdf4;
    border-radius: 8px;
    border: 1px solid #dcfce7;
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 10px;
}

.status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.status-dot.operational {
    background: #10b981;
}

.status-text {
    color: #065f46;
    font-weight: 600;
}

.last-updated {
    color: #64748b;
    font-size: 0.9rem;
}

.services-status {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
}

.service-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: #f8fafc;
    border-radius: 8px;
}

.service-name {
    font-weight: 500;
    color: #1a202c;
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

.view-detailed-status {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    text-align: center;
    display: block;
}

.view-detailed-status:hover {
    color: #5a67d8;
}

@media (max-width: 768px) {
    .help-center-header h1 {
        font-size: 2rem;
    }
    
    .categories-grid {
        grid-template-columns: 1fr;
    }
    
    .status-overview {
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }
    
    .services-status {
        grid-template-columns: 1fr;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Help search functionality
    const searchInput = document.getElementById('help-search');
    const articleLinks = document.querySelectorAll('.article-link');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        articleLinks.forEach(link => {
            const title = link.querySelector('h4').textContent.toLowerCase();
            const description = link.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                link.style.display = 'block';
            } else {
                link.style.display = searchTerm === '' ? 'block' : 'none';
            }
        });
    });
    
    // Live chat button functionality
    const chatBtn = document.querySelector('.support-option button');
    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            // Placeholder for live chat integration
            alert('Live chat would open here in a real implementation');
        });
    }
});
</script>

<?php
get_footer('ultra-premium');
?>