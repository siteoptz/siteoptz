<?php
/**
 * Template Name: Partnerships Page
 * Description: Partner program and collaboration opportunities
 *
 * @package SiteOptz_Premium
 */

get_header('premium');

// Dynamic metadata
$page_title = 'Partnerships - Collaborate with SiteOptz.ai | Partner Program';
$page_description = 'Join our partner program and collaborate with SiteOptz.ai. Integration partnerships, affiliate program, and strategic alliances available.';
$canonical_url = home_url('/partnerships/');

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

<main id="primary" class="site-main partnerships-page">
    <div class="container">
        
        <!-- Partnerships Header -->
        <header class="partnerships-header">
            <h1>Partner with Us</h1>
            <p>Join forces with SiteOptz.ai to help businesses discover the best AI tools</p>
        </header>

        <!-- Partnership Types -->
        <section class="partnership-types">
            <h2>Partnership Opportunities</h2>
            <div class="types-grid">
                <div class="partnership-card">
                    <div class="partnership-icon">🤝</div>
                    <h3>Integration Partners</h3>
                    <p>Integrate your AI tool with our platform for maximum visibility and user adoption.</p>
                    <ul>
                        <li>Featured placement in relevant categories</li>
                        <li>API integration for real-time data</li>
                        <li>Co-marketing opportunities</li>
                        <li>Dedicated partner success manager</li>
                    </ul>
                    <a href="#integration-form" class="partnership-btn">Apply Now</a>
                </div>
                
                <div class="partnership-card">
                    <div class="partnership-icon">💰</div>
                    <h3>Affiliate Program</h3>
                    <p>Earn commission by referring customers to AI tools through our platform.</p>
                    <ul>
                        <li>Up to 30% commission on referrals</li>
                        <li>Real-time tracking and analytics</li>
                        <li>Marketing materials provided</li>
                        <li>Monthly payments via PayPal</li>
                    </ul>
                    <a href="#affiliate-form" class="partnership-btn">Join Program</a>
                </div>
                
                <div class="partnership-card">
                    <div class="partnership-icon">🔗</div>
                    <h3>Strategic Alliances</h3>
                    <p>Long-term partnerships for market expansion and product development.</p>
                    <ul>
                        <li>Joint go-to-market strategies</li>
                        <li>Product integration opportunities</li>
                        <li>Shared marketing initiatives</li>
                        <li>Enterprise customer introductions</li>
                    </ul>
                    <a href="#strategic-form" class="partnership-btn">Discuss Partnership</a>
                </div>
            </div>
        </section>

        <!-- Current Partners -->
        <section class="current-partners">
            <h2>Our Trusted Partners</h2>
            <div class="partners-showcase">
                <div class="partner-category">
                    <h3>AI Tool Providers</h3>
                    <div class="partners-grid">
                        <div class="partner-logo">OpenAI</div>
                        <div class="partner-logo">Anthropic</div>
                        <div class="partner-logo">Midjourney</div>
                        <div class="partner-logo">Jasper</div>
                        <div class="partner-logo">Copy.ai</div>
                        <div class="partner-logo">GitHub</div>
                    </div>
                </div>
                
                <div class="partner-category">
                    <h3>Technology Partners</h3>
                    <div class="partners-grid">
                        <div class="partner-logo">AWS</div>
                        <div class="partner-logo">Stripe</div>
                        <div class="partner-logo">Zapier</div>
                        <div class="partner-logo">Slack</div>
                        <div class="partner-logo">HubSpot</div>
                        <div class="partner-logo">Salesforce</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Partnership Benefits -->
        <section class="partnership-benefits">
            <h2>Why Partner with SiteOptz.ai?</h2>
            <div class="benefits-grid">
                <div class="benefit-item">
                    <h4>📈 Reach 100K+ Monthly Users</h4>
                    <p>Get your AI tool in front of thousands of businesses actively searching for solutions.</p>
                </div>
                <div class="benefit-item">
                    <h4>🎯 Qualified Lead Generation</h4>
                    <p>Our platform attracts decision-makers ready to invest in AI tools for their businesses.</p>
                </div>
                <div class="benefit-item">
                    <h4>📊 Detailed Analytics</h4>
                    <p>Track performance with comprehensive analytics on views, clicks, and conversions.</p>
                </div>
                <div class="benefit-item">
                    <h4>🚀 Co-Marketing Opportunities</h4>
                    <p>Joint webinars, content creation, and marketing campaigns to amplify your reach.</p>
                </div>
            </div>
        </section>

        <!-- Success Stories -->
        <section class="success-stories">
            <h2>Partner Success Stories</h2>
            <div class="stories-grid">
                <div class="story-card">
                    <div class="story-quote">"Partnering with SiteOptz.ai increased our user acquisition by 300% in just 6 months. Their platform brings us highly qualified leads."</div>
                    <div class="story-author">
                        <strong>Sarah Chen</strong><br>
                        Head of Growth, AI Writing Co.
                    </div>
                </div>
                
                <div class="story-card">
                    <div class="story-quote">"The integration was seamless and the support team is fantastic. We've seen a 45% increase in trial signups since joining."</div>
                    <div class="story-author">
                        <strong>Mike Rodriguez</strong><br>
                        VP Marketing, Image AI Pro
                    </div>
                </div>
            </div>
        </section>

        <!-- Partnership Forms -->
        <section class="partnership-forms">
            <div class="forms-container">
                
                <!-- Integration Partner Form -->
                <div id="integration-form" class="form-section">
                    <h3>Integration Partner Application</h3>
                    <form class="partnership-form">
                        <div class="form-group">
                            <label>Company Name</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>AI Tool/Product Name</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select required>
                                <option value="">Select Category</option>
                                <option value="writing">AI Writing</option>
                                <option value="image">Image Generation</option>
                                <option value="code">Code Assistant</option>
                                <option value="chatbot">Chatbots</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Monthly Active Users</label>
                            <select required>
                                <option value="">Select Range</option>
                                <option value="0-1k">0 - 1,000</option>
                                <option value="1k-10k">1,000 - 10,000</option>
                                <option value="10k-100k">10,000 - 100,000</option>
                                <option value="100k+">100,000+</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Contact Email</label>
                            <input type="email" required>
                        </div>
                        <div class="form-group">
                            <label>Partnership Goals</label>
                            <textarea rows="4" placeholder="Tell us about your partnership objectives..."></textarea>
                        </div>
                        <button type="submit" class="submit-btn">Submit Application</button>
                    </form>
                </div>

                <!-- Affiliate Form -->
                <div id="affiliate-form" class="form-section">
                    <h3>Affiliate Program Registration</h3>
                    <form class="partnership-form">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" required>
                        </div>
                        <div class="form-group">
                            <label>Website/Platform</label>
                            <input type="url" placeholder="https://yourwebsite.com">
                        </div>
                        <div class="form-group">
                            <label>Audience Size</label>
                            <select required>
                                <option value="">Select Range</option>
                                <option value="0-1k">0 - 1,000</option>
                                <option value="1k-10k">1,000 - 10,000</option>
                                <option value="10k-50k">10,000 - 50,000</option>
                                <option value="50k+">50,000+</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Primary Traffic Source</label>
                            <select required>
                                <option value="">Select Source</option>
                                <option value="blog">Blog/Website</option>
                                <option value="social">Social Media</option>
                                <option value="youtube">YouTube</option>
                                <option value="newsletter">Newsletter</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>How will you promote AI tools?</label>
                            <textarea rows="4" placeholder="Describe your promotion strategy..."></textarea>
                        </div>
                        <button type="submit" class="submit-btn">Join Affiliate Program</button>
                    </form>
                </div>

                <!-- Strategic Partnership Form -->
                <div id="strategic-form" class="form-section">
                    <h3>Strategic Partnership Inquiry</h3>
                    <form class="partnership-form">
                        <div class="form-group">
                            <label>Company Name</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Your Role</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Company Size</label>
                            <select required>
                                <option value="">Select Size</option>
                                <option value="startup">Startup (1-50)</option>
                                <option value="scaleup">Scale-up (51-200)</option>
                                <option value="enterprise">Enterprise (200+)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Industry/Sector</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Contact Email</label>
                            <input type="email" required>
                        </div>
                        <div class="form-group">
                            <label>Partnership Proposal</label>
                            <textarea rows="6" placeholder="Describe your strategic partnership idea..." required></textarea>
                        </div>
                        <button type="submit" class="submit-btn">Submit Inquiry</button>
                    </form>
                </div>

            </div>
        </section>

    </div>
</main>

<style>
.partnerships-page {
    padding: 60px 0;
    background: #f8fafc;
}

.partnerships-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.partnership-types,
.current-partners,
.partnership-benefits,
.success-stories,
.partnership-forms {
    margin: 60px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.types-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.partnership-card {
    text-align: center;
    padding: 40px;
    background: #f8fafc;
    border-radius: 16px;
    border: 2px solid #e2e8f0;
    transition: all 0.3s;
}

.partnership-card:hover {
    border-color: #667eea;
    transform: translateY(-5px);
}

.partnership-icon {
    font-size: 3rem;
    margin-bottom: 20px;
}

.partnership-card h3 {
    color: #667eea;
    margin-bottom: 15px;
}

.partnership-card ul {
    text-align: left;
    margin: 20px 0;
    color: #4a5568;
}

.partnership-btn {
    background: #667eea;
    color: white;
    padding: 15px 30px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    margin-top: 20px;
    display: inline-block;
}

.partners-showcase {
    margin-top: 30px;
}

.partner-category {
    margin-bottom: 40px;
}

.partner-category h3 {
    color: #667eea;
    margin-bottom: 20px;
    text-align: center;
}

.partners-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
}

.partner-logo {
    background: #f8fafc;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    font-weight: 600;
    color: #4a5568;
    border: 2px solid #e2e8f0;
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.benefit-item {
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #667eea;
}

.benefit-item h4 {
    color: #667eea;
    margin-bottom: 10px;
}

.stories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
}

.story-card {
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
}

.story-quote {
    font-style: italic;
    color: #4a5568;
    margin-bottom: 20px;
    line-height: 1.6;
}

.story-author {
    color: #667eea;
    font-weight: 600;
}

.forms-container {
    display: grid;
    gap: 40px;
}

.form-section {
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
}

.form-section h3 {
    color: #667eea;
    margin-bottom: 20px;
    text-align: center;
}

.partnership-form {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #1a202c;
    font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #667eea;
}

.submit-btn {
    background: #667eea;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    width: 100%;
    transition: background 0.3s;
}

.submit-btn:hover {
    background: #5a67d8;
}

@media (max-width: 768px) {
    .types-grid {
        grid-template-columns: 1fr;
    }
    
    .partners-grid {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
    
    .stories-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Handle form submissions
    const forms = document.querySelectorAll('.partnership-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form type
            const formSection = this.closest('.form-section');
            const formType = formSection.id;
            
            // Show success message
            alert(`Thank you for your ${formType.replace('-', ' ')} submission! We'll get back to you within 24 hours.`);
            
            // Reset form
            this.reset();
        });
    });
    
    // Smooth scroll to forms
    const partnershipBtns = document.querySelectorAll('.partnership-btn');
    
    partnershipBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
</script>

<?php
get_footer('ultra-premium');
?>