<?php
/**
 * Template Name: Investors Page
 * Description: Investor relations and company information
 *
 * @package SiteOptz_Premium
 */

get_header('premium');

// Dynamic metadata
$page_title = 'Investor Relations - SiteOptz.ai Investment Information | IR';
$page_description = 'SiteOptz.ai investor relations information including funding rounds, financial updates, and investor resources.';
$canonical_url = home_url('/investors/');

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

<main id="primary" class="site-main investors-page">
    <div class="container">
        
        <!-- Investors Header -->
        <header class="investors-header">
            <h1>Investor Relations</h1>
            <p>Building the future of AI tool discovery and comparison</p>
        </header>

        <!-- Company Overview -->
        <section class="company-overview">
            <h2>Company Overview</h2>
            <div class="overview-content">
                <div class="overview-text">
                    <p>SiteOptz.ai is the leading platform for AI tool discovery, comparison, and recommendations. We help businesses navigate the rapidly growing AI landscape with data-driven insights and expert analysis.</p>
                    
                    <div class="key-metrics">
                        <div class="metric">
                            <span class="metric-number">500+</span>
                            <span class="metric-label">AI Tools Listed</span>
                        </div>
                        <div class="metric">
                            <span class="metric-number">100K+</span>
                            <span class="metric-label">Monthly Users</span>
                        </div>
                        <div class="metric">
                            <span class="metric-number">$5M</span>
                            <span class="metric-label">Series A Raised</span>
                        </div>
                        <div class="metric">
                            <span class="metric-number">300%</span>
                            <span class="metric-label">YoY Growth</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Funding History -->
        <section class="funding-history">
            <h2>Funding History</h2>
            <div class="funding-timeline">
                <div class="funding-round">
                    <div class="round-date">December 2024</div>
                    <div class="round-details">
                        <h3>Series A - $5M</h3>
                        <p>Led by Innovation Ventures with participation from AI Capital Partners and several angel investors.</p>
                        <div class="round-use">
                            <strong>Use of funds:</strong> Product development, team expansion, and market growth
                        </div>
                    </div>
                </div>
                
                <div class="funding-round">
                    <div class="round-date">March 2024</div>
                    <div class="round-details">
                        <h3>Seed Round - $1.2M</h3>
                        <p>Seed funding from TechStart Capital and prominent industry angels.</p>
                        <div class="round-use">
                            <strong>Use of funds:</strong> MVP development and initial team building
                        </div>
                    </div>
                </div>
                
                <div class="funding-round">
                    <div class="round-date">September 2023</div>
                    <div class="round-details">
                        <h3>Pre-Seed - $300K</h3>
                        <p>Pre-seed funding from founders and early supporters.</p>
                        <div class="round-use">
                            <strong>Use of funds:</strong> Initial product development and market validation
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Financial Highlights -->
        <section class="financial-highlights">
            <h2>Financial Highlights</h2>
            <div class="highlights-grid">
                <div class="highlight-card">
                    <h4>Revenue Growth</h4>
                    <div class="highlight-chart">
                        <div class="chart-bar" style="height: 30%">
                            <span>Q1</span>
                            <span>$50K</span>
                        </div>
                        <div class="chart-bar" style="height: 60%">
                            <span>Q2</span>
                            <span>$120K</span>
                        </div>
                        <div class="chart-bar" style="height: 85%">
                            <span>Q3</span>
                            <span>$200K</span>
                        </div>
                        <div class="chart-bar" style="height: 100%">
                            <span>Q4</span>
                            <span>$350K</span>
                        </div>
                    </div>
                </div>
                
                <div class="highlight-card">
                    <h4>User Growth</h4>
                    <div class="growth-stats">
                        <div class="stat-item">
                            <span class="stat-value">300%</span>
                            <span class="stat-desc">YoY User Growth</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">25%</span>
                            <span class="stat-desc">Monthly Active Users Growth</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">85%</span>
                            <span class="stat-desc">User Retention Rate</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Market Opportunity -->
        <section class="market-opportunity">
            <h2>Market Opportunity</h2>
            <div class="market-content">
                <div class="market-size">
                    <h3>Total Addressable Market</h3>
                    <div class="market-stats">
                        <div class="market-stat">
                            <span class="market-number">$184B</span>
                            <span class="market-label">Global AI Market by 2030</span>
                        </div>
                        <div class="market-stat">
                            <span class="market-number">42%</span>
                            <span class="market-label">CAGR (2023-2030)</span>
                        </div>
                        <div class="market-stat">
                            <span class="market-number">90%</span>
                            <span class="market-label">Of enterprises plan AI adoption</span>
                        </div>
                    </div>
                </div>
                
                <div class="competitive-advantage">
                    <h3>Competitive Advantages</h3>
                    <ul>
                        <li><strong>First-mover advantage</strong> in AI tool comparison space</li>
                        <li><strong>Comprehensive database</strong> of 500+ verified AI tools</li>
                        <li><strong>Expert curation</strong> and unbiased reviews</li>
                        <li><strong>Strong user engagement</strong> and retention metrics</li>
                        <li><strong>Scalable business model</strong> with multiple revenue streams</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Leadership Team -->
        <section class="leadership-team">
            <h2>Leadership Team</h2>
            <div class="team-grid">
                <div class="team-member">
                    <div class="member-photo"></div>
                    <h4>Sarah Johnson</h4>
                    <span class="member-title">CEO & Co-Founder</span>
                    <p>Former VP of Product at TechCorp, 10+ years in AI and SaaS</p>
                </div>
                
                <div class="team-member">
                    <div class="member-photo"></div>
                    <h4>Michael Chen</h4>
                    <span class="member-title">CTO & Co-Founder</span>
                    <p>Ex-Google Senior Engineer, PhD in Machine Learning from Stanford</p>
                </div>
                
                <div class="team-member">
                    <div class="member-photo"></div>
                    <h4>Emily Rodriguez</h4>
                    <span class="member-title">VP of Growth</span>
                    <p>Former Growth Lead at ScaleUp Inc, expert in B2B SaaS growth</p>
                </div>
            </div>
        </section>

        <!-- Investment Highlights -->
        <section class="investment-highlights">
            <h2>Why Invest in SiteOptz.ai?</h2>
            <div class="highlights-list">
                <div class="highlight-item">
                    <h4>🚀 Massive Market Growth</h4>
                    <p>AI adoption is accelerating across all industries, creating huge demand for tool discovery and comparison services.</p>
                </div>
                
                <div class="highlight-item">
                    <h4>💼 Proven Business Model</h4>
                    <p>Multiple revenue streams including subscriptions, referral fees, and enterprise partnerships.</p>
                </div>
                
                <div class="highlight-item">
                    <h4>📈 Strong Unit Economics</h4>
                    <p>High gross margins, low customer acquisition cost, and strong lifetime value metrics.</p>
                </div>
                
                <div class="highlight-item">
                    <h4>🎯 Network Effects</h4>
                    <p>More users attract more tool providers, creating a valuable ecosystem that's hard to replicate.</p>
                </div>
            </div>
        </section>

        <!-- Investor Contact -->
        <section class="investor-contact">
            <h2>Investor Relations Contact</h2>
            <div class="contact-info">
                <p><strong>Sarah Johnson</strong><br>
                CEO & Investor Relations<br>
                📧 investors@siteoptz.ai<br>
                📞 +1 (555) 123-4567</p>
                
                <p><strong>For press inquiries:</strong><br>
                📧 press@siteoptz.ai</p>
            </div>
        </section>

    </div>
</main>

<style>
.investors-page {
    padding: 60px 0;
    background: #f8fafc;
}

.investors-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.company-overview,
.funding-history,
.financial-highlights,
.market-opportunity,
.leadership-team,
.investment-highlights,
.investor-contact {
    margin: 60px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.key-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 30px;
    margin-top: 30px;
}

.metric {
    text-align: center;
    padding: 20px;
    background: #f8fafc;
    border-radius: 12px;
}

.metric-number {
    display: block;
    font-size: 2rem;
    font-weight: 800;
    color: #667eea;
    margin-bottom: 5px;
}

.metric-label {
    color: #64748b;
    font-size: 0.9rem;
}

.funding-timeline {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.funding-round {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 30px;
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #667eea;
}

.round-date {
    color: #64748b;
    font-weight: 600;
}

.round-details h3 {
    color: #667eea;
    margin-bottom: 10px;
}

.round-use {
    margin-top: 15px;
    color: #4a5568;
    font-size: 0.9rem;
}

.highlights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.highlight-card {
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
    text-align: center;
}

.highlight-chart {
    display: flex;
    justify-content: space-around;
    align-items: end;
    height: 200px;
    margin-top: 20px;
}

.chart-bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40px;
    background: #667eea;
    border-radius: 4px 4px 0 0;
    color: white;
    padding: 10px 5px;
    font-size: 0.8rem;
    text-align: center;
}

.growth-stats {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: white;
    border-radius: 8px;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: #10b981;
}

.market-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
}

.market-stats {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
}

.market-stat {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 20px;
    background: #f8fafc;
    border-radius: 8px;
}

.market-number {
    font-size: 2rem;
    font-weight: 800;
    color: #667eea;
    margin-bottom: 5px;
}

.competitive-advantage ul {
    list-style: none;
    padding: 0;
}

.competitive-advantage li {
    padding: 10px 0;
    border-bottom: 1px solid #e2e8f0;
    color: #4a5568;
}

.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.team-member {
    text-align: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
}

.member-photo {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 50%;
    margin: 0 auto 20px;
}

.member-title {
    color: #667eea;
    font-weight: 600;
    margin-bottom: 10px;
    display: block;
}

.highlights-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

.highlight-item {
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #667eea;
}

.highlight-item h4 {
    color: #667eea;
    margin-bottom: 10px;
}

.investor-contact {
    text-align: center;
}

.contact-info {
    background: #f8fafc;
    padding: 30px;
    border-radius: 12px;
    display: inline-block;
}

@media (max-width: 768px) {
    .funding-round {
        grid-template-columns: 1fr;
        gap: 15px;
    }
    
    .market-content {
        grid-template-columns: 1fr;
    }
    
    .highlights-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<?php
get_footer('ultra-premium');
?>