<?php
/**
 * Template Name: Pricing Page
 * Description: AI tools pricing comparison page
 *
 * @package SiteOptz_Premium
 */

get_header('premium');
?>

<main id="primary" class="site-main pricing-page">
    <div class="container">
        
        <!-- Pricing Header -->
        <header class="pricing-header">
            <h1>AI Tools Pricing</h1>
            <p>Compare pricing across the best AI tools and find the perfect solution for your budget</p>
            <div class="pricing-badge">
                <span>💰 Save up to 40% with annual plans</span>
            </div>
        </header>

        <!-- Pricing Categories -->
        <section class="pricing-categories">
            <div class="category-filters">
                <button class="filter-btn active" data-category="all">All Tools</button>
                <button class="filter-btn" data-category="free">Free Tools</button>
                <button class="filter-btn" data-category="budget">Budget ($1-20)</button>
                <button class="filter-btn" data-category="premium">Premium ($20+)</button>
                <button class="filter-btn" data-category="enterprise">Enterprise</button>
            </div>
        </section>

        <!-- Pricing Grid -->
        <section class="pricing-grid">
            
            <!-- ChatGPT Pricing -->
            <div class="pricing-card" data-category="budget free">
                <div class="pricing-header-card">
                    <h3>ChatGPT</h3>
                    <div class="category-tag">Conversational AI</div>
                </div>
                <div class="pricing-plans">
                    <div class="plan">
                        <div class="plan-name">Free</div>
                        <div class="plan-price">$0<span>/month</span></div>
                        <ul class="plan-features">
                            <li>GPT-3.5 model</li>
                            <li>Standard response speed</li>
                            <li>Usage during peak times may be limited</li>
                        </ul>
                        <a href="https://chat.openai.com" class="plan-cta">Get Started</a>
                    </div>
                    <div class="plan featured">
                        <div class="plan-badge">Most Popular</div>
                        <div class="plan-name">ChatGPT Plus</div>
                        <div class="plan-price">$20<span>/month</span></div>
                        <ul class="plan-features">
                            <li>GPT-4 access</li>
                            <li>Faster response times</li>
                            <li>Priority access during peak times</li>
                            <li>Plugin access</li>
                        </ul>
                        <a href="https://chat.openai.com" class="plan-cta">Start Free Trial</a>
                    </div>
                </div>
            </div>

            <!-- Midjourney Pricing -->
            <div class="pricing-card" data-category="budget premium">
                <div class="pricing-header-card">
                    <h3>Midjourney</h3>
                    <div class="category-tag">AI Image Generation</div>
                </div>
                <div class="pricing-plans">
                    <div class="plan">
                        <div class="plan-name">Basic</div>
                        <div class="plan-price">$10<span>/month</span></div>
                        <ul class="plan-features">
                            <li>~200 images per month</li>
                            <li>Personal use only</li>
                            <li>Standard generation speed</li>
                        </ul>
                        <a href="https://midjourney.com" class="plan-cta">Subscribe</a>
                    </div>
                    <div class="plan">
                        <div class="plan-name">Standard</div>
                        <div class="plan-price">$30<span>/month</span></div>
                        <ul class="plan-features">
                            <li>~900 images per month</li>
                            <li>Commercial use</li>
                            <li>Fast generation mode</li>
                        </ul>
                        <a href="https://midjourney.com" class="plan-cta">Subscribe</a>
                    </div>
                    <div class="plan featured">
                        <div class="plan-badge">Best Value</div>
                        <div class="plan-name">Pro</div>
                        <div class="plan-price">$60<span>/month</span></div>
                        <ul class="plan-features">
                            <li>~1800 images per month</li>
                            <li>Stealth mode</li>
                            <li>Maximum concurrent jobs</li>
                        </ul>
                        <a href="https://midjourney.com" class="plan-cta">Subscribe</a>
                    </div>
                </div>
            </div>

            <!-- GitHub Copilot Pricing -->
            <div class="pricing-card" data-category="budget">
                <div class="pricing-header-card">
                    <h3>GitHub Copilot</h3>
                    <div class="category-tag">Code Assistant</div>
                </div>
                <div class="pricing-plans">
                    <div class="plan">
                        <div class="plan-name">Individual</div>
                        <div class="plan-price">$10<span>/month</span></div>
                        <ul class="plan-features">
                            <li>Code suggestions</li>
                            <li>Multiple language support</li>
                            <li>IDE integrations</li>
                            <li>Individual use</li>
                        </ul>
                        <a href="https://github.com/features/copilot" class="plan-cta">Start Free Trial</a>
                    </div>
                    <div class="plan">
                        <div class="plan-name">Business</div>
                        <div class="plan-price">$19<span>/month</span></div>
                        <ul class="plan-features">
                            <li>Everything in Individual</li>
                            <li>Organization management</li>
                            <li>Policy controls</li>
                            <li>Enterprise security</li>
                        </ul>
                        <a href="https://github.com/features/copilot" class="plan-cta">Contact Sales</a>
                    </div>
                </div>
            </div>

            <!-- Jasper AI Pricing -->
            <div class="pricing-card" data-category="premium">
                <div class="pricing-header-card">
                    <h3>Jasper AI</h3>
                    <div class="category-tag">AI Writing</div>
                </div>
                <div class="pricing-plans">
                    <div class="plan">
                        <div class="plan-name">Creator</div>
                        <div class="plan-price">$39<span>/month</span></div>
                        <ul class="plan-features">
                            <li>20,000 words per month</li>
                            <li>50+ templates</li>
                            <li>Basic integrations</li>
                            <li>Browser extension</li>
                        </ul>
                        <a href="https://jasper.ai" class="plan-cta">Start Free Trial</a>
                    </div>
                    <div class="plan featured">
                        <div class="plan-badge">Most Popular</div>
                        <div class="plan-name">Teams</div>
                        <div class="plan-price">$99<span>/month</span></div>
                        <ul class="plan-features">
                            <li>Unlimited words</li>
                            <li>Brand voice training</li>
                            <li>Team collaboration</li>
                            <li>Advanced integrations</li>
                        </ul>
                        <a href="https://jasper.ai" class="plan-cta">Start Free Trial</a>
                    </div>
                    <div class="plan">
                        <div class="plan-name">Business</div>
                        <div class="plan-price">$499<span>/month</span></div>
                        <ul class="plan-features">
                            <li>Everything in Teams</li>
                            <li>API access</li>
                            <li>Custom integrations</li>
                            <li>Dedicated support</li>
                        </ul>
                        <a href="https://jasper.ai" class="plan-cta">Contact Sales</a>
                    </div>
                </div>
            </div>

            <!-- Runway ML Pricing -->
            <div class="pricing-card" data-category="free premium">
                <div class="pricing-header-card">
                    <h3>Runway ML</h3>
                    <div class="category-tag">AI Video</div>
                </div>
                <div class="pricing-plans">
                    <div class="plan">
                        <div class="plan-name">Free</div>
                        <div class="plan-price">$0<span>/month</span></div>
                        <ul class="plan-features">
                            <li>3 video projects</li>
                            <li>720p export</li>
                            <li>Watermarked videos</li>
                            <li>Community support</li>
                        </ul>
                        <a href="https://runwayml.com" class="plan-cta">Get Started</a>
                    </div>
                    <div class="plan">
                        <div class="plan-name">Standard</div>
                        <div class="plan-price">$15<span>/month</span></div>
                        <ul class="plan-features">
                            <li>Unlimited projects</li>
                            <li>4K export</li>
                            <li>No watermark</li>
                            <li>Priority processing</li>
                        </ul>
                        <a href="https://runwayml.com" class="plan-cta">Subscribe</a>
                    </div>
                    <div class="plan">
                        <div class="plan-name">Pro</div>
                        <div class="plan-price">$35<span>/month</span></div>
                        <ul class="plan-features">
                            <li>Everything in Standard</li>
                            <li>Advanced AI models</li>
                            <li>Team collaboration</li>
                            <li>API access</li>
                        </ul>
                        <a href="https://runwayml.com" class="plan-cta">Subscribe</a>
                    </div>
                </div>
            </div>

            <!-- DataRobot Pricing -->
            <div class="pricing-card" data-category="enterprise">
                <div class="pricing-header-card">
                    <h3>DataRobot</h3>
                    <div class="category-tag">Enterprise AI</div>
                </div>
                <div class="pricing-plans">
                    <div class="plan">
                        <div class="plan-name">Starter</div>
                        <div class="plan-price">Custom<span>/month</span></div>
                        <ul class="plan-features">
                            <li>Basic AutoML</li>
                            <li>Model deployment</li>
                            <li>Standard support</li>
                            <li>Up to 10 models</li>
                        </ul>
                        <a href="https://datarobot.com" class="plan-cta">Contact Sales</a>
                    </div>
                    <div class="plan featured">
                        <div class="plan-badge">Enterprise</div>
                        <div class="plan-name">Professional</div>
                        <div class="plan-price">Custom<span>/month</span></div>
                        <ul class="plan-features">
                            <li>Advanced AutoML</li>
                            <li>MLOps capabilities</li>
                            <li>Premium support</li>
                            <li>Unlimited models</li>
                        </ul>
                        <a href="https://datarobot.com" class="plan-cta">Contact Sales</a>
                    </div>
                </div>
            </div>

        </section>

        <!-- Pricing Calculator -->
        <section class="pricing-calculator-section">
            <h2>Calculate Your AI Tool Investment</h2>
            <?php echo do_shortcode('[ai_calculator title="AI Tools Cost Calculator"]'); ?>
        </section>

        <!-- Pricing Comparison -->
        <section class="pricing-comparison">
            <h2>Side-by-Side Pricing Comparison</h2>
            <?php echo do_shortcode('[ai_comparison tools="ChatGPT,Midjourney,GitHub Copilot" features="price,rating"]'); ?>
        </section>

        <!-- Pricing FAQ -->
        <section class="pricing-faq">
            <h2>Pricing FAQ</h2>
            <div class="faq-grid">
                <div class="faq-item">
                    <h3>Do AI tools offer free trials?</h3>
                    <p>Most AI tools offer free trials ranging from 7-30 days. Some like ChatGPT and Runway ML have permanent free tiers with limitations.</p>
                </div>
                <div class="faq-item">
                    <h3>What's the difference between monthly and annual pricing?</h3>
                    <p>Annual plans typically offer 20-40% savings compared to monthly billing. Most tools also include additional features with annual subscriptions.</p>
                </div>
                <div class="faq-item">
                    <h3>Can I switch plans anytime?</h3>
                    <p>Yes, most AI tools allow plan upgrades or downgrades at any time. Changes typically take effect at the next billing cycle.</p>
                </div>
                <div class="faq-item">
                    <h3>Are there student discounts available?</h3>
                    <p>Many AI tools offer student discounts of 50% or more. GitHub Copilot is free for verified students and teachers.</p>
                </div>
            </div>
        </section>

    </div>
</main>

<style>
.pricing-page {
    padding: 60px 0;
    background: #f8fafc;
}

.pricing-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.pricing-header h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.pricing-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 30px;
}

.pricing-badge {
    display: inline-block;
    background: rgba(255,255,255,0.2);
    padding: 12px 24px;
    border-radius: 25px;
    backdrop-filter: blur(10px);
}

.pricing-categories {
    margin-bottom: 40px;
}

.category-filters {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 12px 24px;
    background: white;
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

.pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 40px;
    margin-bottom: 80px;
}

.pricing-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    transition: all 0.3s;
}

.pricing-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
}

.pricing-header-card {
    padding: 30px;
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    text-align: center;
}

.pricing-header-card h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #1a202c;
}

.category-tag {
    background: #667eea;
    color: white;
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 0.85rem;
    font-weight: 600;
}

.pricing-plans {
    padding: 30px;
}

.plan {
    padding: 25px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    margin-bottom: 20px;
    position: relative;
    transition: all 0.3s;
}

.plan:hover {
    border-color: #667eea;
}

.plan.featured {
    border-color: #667eea;
    background: linear-gradient(135deg, #f8faff 0%, #f1f5ff 100%);
}

.plan-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: #667eea;
    color: white;
    padding: 6px 20px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
}

.plan-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 10px;
}

.plan-price {
    font-size: 2.5rem;
    font-weight: 800;
    color: #667eea;
    margin-bottom: 20px;
}

.plan-price span {
    font-size: 1rem;
    color: #64748b;
    font-weight: 400;
}

.plan-features {
    list-style: none;
    padding: 0;
    margin-bottom: 25px;
}

.plan-features li {
    margin: 8px 0;
    color: #4a5568;
    position: relative;
    padding-left: 25px;
}

.plan-features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: 600;
}

.plan-cta {
    display: block;
    width: 100%;
    padding: 15px;
    background: #667eea;
    color: white;
    text-align: center;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: background 0.3s;
}

.plan-cta:hover {
    background: #5a67d8;
}

.pricing-calculator-section,
.pricing-comparison,
.pricing-faq {
    margin: 80px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.pricing-calculator-section h2,
.pricing-comparison h2,
.pricing-faq h2 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 2rem;
    color: #1a202c;
}

.faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.faq-item {
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
}

.faq-item h3 {
    color: #667eea;
    margin-bottom: 15px;
    font-size: 1.1rem;
}

.faq-item p {
    color: #4a5568;
    line-height: 1.6;
    margin: 0;
}

@media (max-width: 768px) {
    .pricing-grid {
        grid-template-columns: 1fr;
    }
    
    .pricing-header h1 {
        font-size: 2rem;
    }
    
    .category-filters {
        justify-content: center;
    }
    
    .filter-btn {
        padding: 8px 16px;
        font-size: 0.9rem;
    }
}
</style>

<script>
// Pricing filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            pricingCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardCategories = card.dataset.category.split(' ');
                    if (cardCategories.includes(category)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});
</script>

<?php
get_footer('ultra-premium');
?>