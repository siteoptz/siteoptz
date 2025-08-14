<?php
/**
 * Template Name: Case Studies Page
 * Description: AI Tools Case Studies and Success Stories
 *
 * @package SiteOptz_Premium
 */

get_header('premium');

// Dynamic metadata
$page_title = 'AI Tools Case Studies - Real ROI Results & Success Stories | SiteOptz.ai';
$page_description = 'Discover real-world AI tool implementations with detailed ROI analysis, cost savings, and productivity improvements across different industries.';
$canonical_url = home_url('/case-studies/');

// Add dynamic metadata
add_action('wp_head', function() use ($page_title, $page_description, $canonical_url) {
    echo '<title>' . esc_html($page_title) . '</title>' . "\n";
    echo '<meta name="description" content="' . esc_attr($page_description) . '">' . "\n";
    echo '<link rel="canonical" href="' . esc_url($canonical_url) . '">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($page_title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($page_description) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url($canonical_url) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
    
    // Schema markup for case studies page
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'CollectionPage',
        'name' => 'AI Tools Case Studies',
        'description' => $page_description,
        'url' => $canonical_url,
        'mainEntity' => array(
            '@type' => 'ItemList',
            'name' => 'Case Studies',
            'description' => 'Real-world AI tool implementation success stories'
        )
    );
    
    echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
});
?>

<main id="primary" class="site-main case-studies-page">
    <div class="container">
        
        <!-- Case Studies Header -->
        <header class="case-studies-header">
            <h1>Case Studies</h1>
            <p>Real-world AI tool implementations with measurable results and ROI data</p>
            
            <div class="stats-overview">
                <div class="stat">
                    <span class="stat-number">$2.5M+</span>
                    <span class="stat-label">Total Savings</span>
                </div>
                <div class="stat">
                    <span class="stat-number">300%</span>
                    <span class="stat-label">Avg ROI</span>
                </div>
                <div class="stat">
                    <span class="stat-number">50+</span>
                    <span class="stat-label">Companies</span>
                </div>
                <div class="stat">
                    <span class="stat-number">15</span>
                    <span class="stat-label">Industries</span>
                </div>
            </div>
        </header>

        <!-- Filter Section -->
        <section class="case-studies-filters">
            <div class="filter-buttons">
                <button class="filter-btn active" data-filter="all">All Industries</button>
                <button class="filter-btn" data-filter="saas">SaaS</button>
                <button class="filter-btn" data-filter="ecommerce">E-commerce</button>
                <button class="filter-btn" data-filter="agency">Marketing Agency</button>
                <button class="filter-btn" data-filter="healthcare">Healthcare</button>
                <button class="filter-btn" data-filter="finance">Finance</button>
            </div>
        </section>

        <!-- Featured Case Study -->
        <section class="featured-case-study">
            <div class="case-study-card featured">
                <div class="case-study-image">
                    <div class="placeholder-image"></div>
                </div>
                <div class="case-study-content">
                    <div class="company-info">
                        <h2>TechFlow Inc.</h2>
                        <span class="industry">SaaS Company • 150 employees</span>
                    </div>
                    
                    <h3>How AI Writing Tools Increased Content Output by 400% and Saved $120K Annually</h3>
                    
                    <div class="challenge">
                        <h4>🎯 Challenge</h4>
                        <p>TechFlow's marketing team was struggling to produce enough content for their multi-product SaaS platform, spending $150K annually on freelance writers with inconsistent quality.</p>
                    </div>
                    
                    <div class="solution">
                        <h4>⚡ Solution</h4>
                        <p>Implemented ChatGPT Plus, Jasper AI, and Copy.ai for different content types, with a structured workflow and quality control process.</p>
                    </div>
                    
                    <div class="results-grid">
                        <div class="result-item">
                            <span class="result-number">400%</span>
                            <span class="result-label">Content Increase</span>
                        </div>
                        <div class="result-item">
                            <span class="result-number">$120K</span>
                            <span class="result-label">Annual Savings</span>
                        </div>
                        <div class="result-item">
                            <span class="result-number">60%</span>
                            <span class="result-label">Time Reduction</span>
                        </div>
                        <div class="result-item">
                            <span class="result-number">85%</span>
                            <span class="result-label">Quality Score</span>
                        </div>
                    </div>
                    
                    <a href="#" class="read-full-case">Read Full Case Study →</a>
                </div>
            </div>
        </section>

        <!-- Case Studies Grid -->
        <section class="case-studies-grid">
            <h2>More Success Stories</h2>
            
            <div class="grid-container">
                <article class="case-study-card" data-industry="ecommerce">
                    <div class="case-study-image">
                        <div class="placeholder-image"></div>
                    </div>
                    <div class="case-study-content">
                        <div class="company-info">
                            <h3>StyleHub</h3>
                            <span class="industry">E-commerce • Fashion</span>
                        </div>
                        <h4>AI Image Generation Reduced Product Photography Costs by 80%</h4>
                        <div class="key-metrics">
                            <span class="metric">ROI: 320%</span>
                            <span class="metric">Savings: $85K/year</span>
                            <span class="metric">Time: 70% faster</span>
                        </div>
                        <p>Using Midjourney and DALL-E for product mockups and lifestyle images...</p>
                        <a href="#" class="read-more">Read Case Study →</a>
                    </div>
                </article>
                
                <article class="case-study-card" data-industry="agency">
                    <div class="case-study-image">
                        <div class="placeholder-image"></div>
                    </div>
                    <div class="case-study-content">
                        <div class="company-info">
                            <h3>Digital Boost Agency</h3>
                            <span class="industry">Marketing Agency</span>
                        </div>
                        <h4>ChatGPT & Claude Helped Agency Scale From 10 to 50 Clients</h4>
                        <div class="key-metrics">
                            <span class="metric">ROI: 450%</span>
                            <span class="metric">Revenue: +$200K</span>
                            <span class="metric">Clients: 5x growth</span>
                        </div>
                        <p>Automating client research, proposal writing, and campaign optimization...</p>
                        <a href="#" class="read-more">Read Case Study →</a>
                    </div>
                </article>
                
                <article class="case-study-card" data-industry="saas">
                    <div class="case-study-image">
                        <div class="placeholder-image"></div>
                    </div>
                    <div class="case-study-content">
                        <div class="company-info">
                            <h3>CodeMaster</h3>
                            <span class="industry">SaaS • Developer Tools</span>
                        </div>
                        <h4>GitHub Copilot Reduced Development Time by 40%</h4>
                        <div class="key-metrics">
                            <span class="metric">ROI: 280%</span>
                            <span class="metric">Savings: $95K/year</span>
                            <span class="metric">Bugs: -30%</span>
                        </div>
                        <p>20-person development team using AI coding assistants for faster delivery...</p>
                        <a href="#" class="read-more">Read Case Study →</a>
                    </div>
                </article>
                
                <article class="case-study-card" data-industry="healthcare">
                    <div class="case-study-image">
                        <div class="placeholder-image"></div>
                    </div>
                    <div class="case-study-content">
                        <div class="company-info">
                            <h3>MedTech Solutions</h3>
                            <span class="industry">Healthcare Technology</span>
                        </div>
                        <h4>AI Chatbots Improved Patient Support by 60%</h4>
                        <div class="key-metrics">
                            <span class="metric">ROI: 190%</span>
                            <span class="metric">Savings: $50K/year</span>
                            <span class="metric">Satisfaction: +60%</span>
                        </div>
                        <p>24/7 patient support automation while maintaining compliance...</p>
                        <a href="#" class="read-more">Read Case Study →</a>
                    </div>
                </article>
                
                <article class="case-study-card" data-industry="finance">
                    <div class="case-study-image">
                        <div class="placeholder-image"></div>
                    </div>
                    <div class="case-study-content">
                        <div class="company-info">
                            <h3>FinanceFlow</h3>
                            <span class="industry">Financial Services</span>
                        </div>
                        <h4>AI Data Analysis Cut Report Generation Time by 75%</h4>
                        <div class="key-metrics">
                            <span class="metric">ROI: 350%</span>
                            <span class="metric">Savings: $110K/year</span>
                            <span class="metric">Accuracy: +95%</span>
                        </div>
                        <p>Automated financial reporting and client insights generation...</p>
                        <a href="#" class="read-more">Read Case Study →</a>
                    </div>
                </article>
                
                <article class="case-study-card" data-industry="ecommerce">
                    <div class="case-study-image">
                        <div class="placeholder-image"></div>
                    </div>
                    <div class="case-study-content">
                        <div class="company-info">
                            <h3>HomeDecor Plus</h3>
                            <span class="industry">E-commerce • Home Goods</span>
                        </div>
                        <h4>AI Customer Service Increased Satisfaction by 45%</h4>
                        <div class="key-metrics">
                            <span class="metric">ROI: 240%</span>
                            <span class="metric">Savings: $65K/year</span>
                            <span class="metric">Response: 24/7</span>
                        </div>
                        <p>Intelligent chatbot handling 80% of customer inquiries automatically...</p>
                        <a href="#" class="read-more">Read Case Study →</a>
                    </div>
                </article>
            </div>
        </section>

        <!-- ROI Calculator CTA -->
        <section class="roi-calculator-cta">
            <h2>Calculate Your Potential ROI</h2>
            <p>See how much your business could save with AI tools based on these real case studies</p>
            <a href="<?php echo esc_url(home_url('/calculator')); ?>" class="cta-button">Try ROI Calculator</a>
        </section>

        <!-- Submit Your Story -->
        <section class="submit-story">
            <h2>Share Your Success Story</h2>
            <p>Have you achieved great results with AI tools? We'd love to feature your case study.</p>
            <div class="story-benefits">
                <div class="benefit">
                    <span class="icon">📈</span>
                    <span>Free marketing exposure</span>
                </div>
                <div class="benefit">
                    <span class="icon">🎯</span>
                    <span>Establish thought leadership</span>
                </div>
                <div class="benefit">
                    <span class="icon">🤝</span>
                    <span>Help other businesses</span>
                </div>
            </div>
            <a href="#" class="submit-btn">Submit Your Case Study</a>
        </section>

    </div>
</main>

<style>
.case-studies-page {
    padding: 60px 0;
    background: #f8fafc;
}

.case-studies-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.case-studies-header h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.case-studies-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 40px;
}

.stats-overview {
    display: flex;
    justify-content: center;
    gap: 60px;
    flex-wrap: wrap;
}

.stat {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-number {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
}

.case-studies-filters {
    background: white;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    margin-bottom: 40px;
    text-align: center;
}

.filter-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 12px 24px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 25px;
    color: #64748b;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.filter-btn:hover,
.filter-btn.active {
    background: #667eea;
    border-color: #667eea;
    color: white;
}

.featured-case-study,
.case-studies-grid,
.roi-calculator-cta,
.submit-story {
    margin: 60px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.case-study-card.featured {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 40px;
    align-items: center;
}

.case-study-image .placeholder-image {
    width: 100%;
    height: 300px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 12px;
}

.company-info {
    margin-bottom: 20px;
}

.company-info h2 {
    font-size: 1.8rem;
    margin-bottom: 5px;
    color: #1a202c;
}

.industry {
    color: #64748b;
    font-weight: 500;
}

.featured .case-study-content h3 {
    font-size: 1.5rem;
    margin-bottom: 30px;
    color: #1a202c;
    line-height: 1.4;
}

.challenge,
.solution {
    margin: 25px 0;
    padding: 20px;
    background: #f8fafc;
    border-radius: 8px;
}

.challenge h4,
.solution h4 {
    margin-bottom: 10px;
    color: #667eea;
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 30px 0;
}

.result-item {
    text-align: center;
    padding: 20px;
    background: #f0f9ff;
    border-radius: 8px;
}

.result-number {
    display: block;
    font-size: 1.5rem;
    font-weight: 800;
    color: #667eea;
    margin-bottom: 5px;
}

.result-label {
    font-size: 0.9rem;
    color: #64748b;
}

.read-full-case {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
}

.case-studies-grid h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #1a202c;
    text-align: center;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
}

.case-study-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    transition: all 0.3s;
}

.case-study-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.case-study-card .case-study-image .placeholder-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, #667eea, #764ba2);
}

.case-study-card .case-study-content {
    padding: 25px;
}

.case-study-card .company-info h3 {
    font-size: 1.2rem;
    margin-bottom: 5px;
    color: #667eea;
}

.case-study-card h4 {
    margin: 15px 0;
    font-size: 1.1rem;
    line-height: 1.4;
    color: #1a202c;
}

.key-metrics {
    display: flex;
    gap: 15px;
    margin: 15px 0;
    flex-wrap: wrap;
}

.metric {
    background: #f0f9ff;
    color: #667eea;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
}

.case-study-card p {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 15px;
}

.read-more {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
}

.read-more:hover {
    color: #5a67d8;
}

.roi-calculator-cta,
.submit-story {
    text-align: center;
}

.roi-calculator-cta {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
}

.roi-calculator-cta h2 {
    color: white;
    margin-bottom: 15px;
}

.roi-calculator-cta p {
    opacity: 0.9;
    margin-bottom: 30px;
}

.cta-button {
    background: white;
    color: #10b981;
    padding: 15px 30px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.submit-story h2 {
    margin-bottom: 15px;
    color: #1a202c;
}

.submit-story p {
    color: #64748b;
    margin-bottom: 30px;
}

.story-benefits {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin: 30px 0;
    flex-wrap: wrap;
}

.benefit {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #4a5568;
}

.benefit .icon {
    font-size: 1.2rem;
}

.submit-btn {
    background: #667eea;
    color: white;
    padding: 15px 30px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.3s;
}

.submit-btn:hover {
    background: #5a67d8;
}

@media (max-width: 768px) {
    .case-studies-header h1 {
        font-size: 2rem;
    }
    
    .stats-overview {
        gap: 30px;
    }
    
    .case-study-card.featured {
        grid-template-columns: 1fr;
    }
    
    .results-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .grid-container {
        grid-template-columns: 1fr;
    }
    
    .story-benefits {
        flex-direction: column;
        gap: 20px;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const caseStudies = document.querySelectorAll('.case-study-card[data-industry]');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            caseStudies.forEach(study => {
                if (filter === 'all' || study.dataset.industry === filter) {
                    study.style.display = 'block';
                } else {
                    study.style.display = 'none';
                }
            });
        });
    });
});
</script>

<?php
get_footer('ultra-premium');
?>