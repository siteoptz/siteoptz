<?php
/**
 * Template Name: About Page
 * Description: About SiteOptz.ai page
 *
 * @package SiteOptz_Premium
 */

get_header('premium');
?>

<main id="primary" class="site-main about-page">
    <div class="container">
        
        <!-- About Header -->
        <header class="about-header">
            <h1>About SiteOptz.ai</h1>
            <p>Your trusted guide to the world of AI tools. We help businesses and professionals discover, compare, and choose the perfect AI solutions.</p>
            <div class="about-badge">
                <span>🚀 Trusted by 50,000+ professionals worldwide</span>
            </div>
        </header>

        <!-- Mission Section -->
        <section class="mission-section">
            <div class="mission-content">
                <div class="mission-text">
                    <h2>Our Mission</h2>
                    <p>To democratize access to AI technology by providing transparent, unbiased comparisons and reviews of AI tools. We believe every business should have the power to leverage AI, regardless of their technical expertise or budget.</p>
                    
                    <div class="mission-stats">
                        <div class="stat">
                            <span class="stat-number">500+</span>
                            <span class="stat-label">AI Tools Reviewed</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">50+</span>
                            <span class="stat-label">Categories</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">1M+</span>
                            <span class="stat-label">Monthly Visitors</span>
                        </div>
                    </div>
                </div>
                <div class="mission-image">
                    <div class="placeholder-image">
                        <div class="image-content">
                            <h3>AI Revolution</h3>
                            <p>Helping businesses transform with AI</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Values Section -->
        <section class="values-section">
            <h2>Our Values</h2>
            <div class="values-grid">
                <div class="value-card">
                    <div class="value-icon">🔍</div>
                    <h3>Transparency</h3>
                    <p>We provide honest, unbiased reviews based on real testing and user feedback. No paid placements or hidden agendas.</p>
                </div>
                <div class="value-card">
                    <div class="value-icon">🎯</div>
                    <h3>Accuracy</h3>
                    <p>Our team tests every tool thoroughly, ensuring our comparisons and reviews reflect real-world performance.</p>
                </div>
                <div class="value-card">
                    <div class="value-icon">🤝</div>
                    <h3>Community</h3>
                    <p>We're building a community of AI enthusiasts, sharing knowledge and helping each other succeed.</p>
                </div>
                <div class="value-card">
                    <div class="value-icon">⚡</div>
                    <h3>Innovation</h3>
                    <p>We stay ahead of AI trends, constantly discovering and reviewing the latest tools and technologies.</p>
                </div>
            </div>
        </section>

        <!-- Team Section -->
        <section class="team-section">
            <h2>Meet Our Team</h2>
            <div class="team-grid">
                <div class="team-member">
                    <div class="member-photo">
                        <div class="photo-placeholder">
                            <span>👨‍💻</span>
                        </div>
                    </div>
                    <h3>Alex Chen</h3>
                    <p class="member-role">Founder & CEO</p>
                    <p class="member-bio">Former AI researcher at Google. 10+ years in machine learning and product development.</p>
                </div>
                <div class="team-member">
                    <div class="member-photo">
                        <div class="photo-placeholder">
                            <span>👩‍🔬</span>
                        </div>
                    </div>
                    <h3>Sarah Rodriguez</h3>
                    <p class="member-role">Head of Research</p>
                    <p class="member-bio">PhD in Computer Science. Expert in AI tool evaluation and performance analysis.</p>
                </div>
                <div class="team-member">
                    <div class="member-photo">
                        <div class="photo-placeholder">
                            <span>👨‍💼</span>
                        </div>
                    </div>
                    <h3>Marcus Johnson</h3>
                    <p class="member-role">Business Development</p>
                    <p class="member-bio">15+ years helping enterprises adopt new technologies. MBA from Stanford.</p>
                </div>
                <div class="team-member">
                    <div class="member-photo">
                        <div class="photo-placeholder">
                            <span>👩‍🎨</span>
                        </div>
                    </div>
                    <h3>Emma Wilson</h3>
                    <p class="member-role">Product Design</p>
                    <p class="member-bio">Award-winning UX designer with expertise in AI interface design.</p>
                </div>
            </div>
        </section>

        <!-- Get Started Section -->
        <section id="get-started" class="get-started-section">
            <div class="get-started-content">
                <h2>Ready to Transform Your Business with AI?</h2>
                <p>Join thousands of professionals who trust SiteOptz.ai to guide their AI journey</p>
                
                <div class="get-started-steps">
                    <div class="step">
                        <div class="step-icon">📋</div>
                        <h3>1. Assess Your Needs</h3>
                        <p>Use our free assessment tool to identify which AI solutions fit your business goals</p>
                    </div>
                    <div class="step">
                        <div class="step-icon">🔍</div>
                        <h3>2. Explore Options</h3>
                        <p>Browse our curated database of 500+ AI tools across 50+ categories</p>
                    </div>
                    <div class="step">
                        <div class="step-icon">⚖️</div>
                        <h3>3. Compare & Decide</h3>
                        <p>Use our detailed comparisons and ROI calculators to make informed decisions</p>
                    </div>
                    <div class="step">
                        <div class="step-icon">🚀</div>
                        <h3>4. Implement & Scale</h3>
                        <p>Get implementation guides and ongoing support to maximize your AI investment</p>
                    </div>
                </div>
                
                <div class="get-started-actions">
                    <a href="<?php echo esc_url(home_url('/ai-tools')); ?>" class="cta-primary">
                        Explore AI Tools
                    </a>
                    <a href="<?php echo esc_url(home_url('/calculator')); ?>" class="cta-secondary">
                        Calculate ROI
                    </a>
                </div>
                
                <div class="trust-badges">
                    <div class="badge">✅ 500+ Tools Reviewed</div>
                    <div class="badge">✅ Unbiased Comparisons</div>
                    <div class="badge">✅ Expert Testing</div>
                    <div class="badge">✅ Free Resources</div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="contact-section">
            <h2>Get In Touch</h2>
            <div class="contact-grid">
                <div class="contact-info">
                    <h3>Contact Information</h3>
                    <div class="contact-item">
                        <strong>Email:</strong> hello@siteoptz.ai
                    </div>
                    <div class="contact-item">
                        <strong>Business Inquiries:</strong> partnerships@siteoptz.ai
                    </div>
                    <div class="contact-item">
                        <strong>Press:</strong> press@siteoptz.ai
                    </div>
                    <div class="contact-item">
                        <strong>Support:</strong> support@siteoptz.ai
                    </div>
                </div>
                <div class="contact-form">
                    <h3>Send us a message</h3>
                    <form class="message-form">
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="Your Email" required>
                        <select required>
                            <option value="">Select Topic</option>
                            <option value="partnership">Partnership</option>
                            <option value="press">Press Inquiry</option>
                            <option value="support">Support</option>
                            <option value="feedback">Feedback</option>
                        </select>
                        <textarea placeholder="Your Message" rows="4" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </section>

    </div>
</main>

<style>
.about-page {
    padding: 60px 0;
    background: #f8fafc;
}

.about-header {
    text-align: center;
    margin-bottom: 80px;
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 80px -20px;
}

.about-header h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.about-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 30px;
}

.about-badge {
    display: inline-block;
    background: rgba(255,255,255,0.2);
    padding: 12px 24px;
    border-radius: 25px;
    backdrop-filter: blur(10px);
}

.mission-section,
.values-section,
.team-section,
.get-started-section,
.contact-section {
    margin: 80px 0;
    padding: 60px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.mission-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}

.mission-text h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #1a202c;
}

.mission-text p {
    font-size: 1.1rem;
    color: #4a5568;
    line-height: 1.8;
    margin-bottom: 40px;
}

.mission-stats {
    display: flex;
    gap: 40px;
}

.stat {
    display: flex;
    flex-direction: column;
}

.stat-number {
    font-size: 2rem;
    font-weight: 800;
    color: #667eea;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 0.9rem;
    color: #64748b;
}

.placeholder-image {
    height: 400px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
}

.image-content h3 {
    font-size: 2rem;
    margin-bottom: 10px;
}

.values-section h2,
.team-section h2,
.contact-section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 50px;
    color: #1a202c;
}

.values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
}

.value-card {
    text-align: center;
    padding: 40px;
    background: #f8fafc;
    border-radius: 16px;
    transition: all 0.3s;
}

.value-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.value-icon {
    font-size: 4rem;
    margin-bottom: 20px;
}

.value-card h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #667eea;
}

.value-card p {
    color: #4a5568;
    line-height: 1.6;
}

.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
}

.team-member {
    text-align: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 16px;
}

.member-photo {
    margin-bottom: 20px;
}

.photo-placeholder {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 50%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
}

.team-member h3 {
    font-size: 1.25rem;
    margin-bottom: 5px;
    color: #1a202c;
}

.member-role {
    color: #667eea;
    font-weight: 600;
    margin-bottom: 15px;
}

.member-bio {
    color: #4a5568;
    line-height: 1.6;
    font-size: 0.95rem;
}

.get-started-section {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    text-align: center;
}

.get-started-content h2 {
    font-size: 2.5rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.get-started-content > p {
    font-size: 1.25rem;
    opacity: 0.95;
    margin-bottom: 60px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.get-started-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 60px;
}

.get-started-steps .step {
    background: rgba(255,255,255,0.1);
    padding: 30px;
    border-radius: 16px;
    backdrop-filter: blur(10px);
}

.step-icon {
    font-size: 3rem;
    margin-bottom: 20px;
}

.get-started-steps .step h3 {
    font-size: 1.25rem;
    margin-bottom: 15px;
    color: white;
}

.get-started-steps .step p {
    opacity: 0.9;
    line-height: 1.6;
}

.get-started-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 60px;
    flex-wrap: wrap;
}

.cta-primary {
    background: white;
    color: #10b981;
    padding: 15px 30px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
}

.cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.cta-secondary {
    background: transparent;
    color: white;
    padding: 15px 30px;
    border: 2px solid white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
}

.cta-secondary:hover {
    background: white;
    color: #10b981;
}

.trust-badges {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.badge {
    background: rgba(255,255,255,0.2);
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 0.9rem;
    backdrop-filter: blur(10px);
}

.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
}

.contact-item {
    margin: 15px 0;
    color: #4a5568;
}

.contact-item strong {
    color: #1a202c;
}

.message-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.message-form input,
.message-form select,
.message-form textarea {
    padding: 15px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
}

.message-form input:focus,
.message-form select:focus,
.message-form textarea:focus {
    border-color: #667eea;
    outline: none;
}

.message-form button {
    background: #667eea;
    color: white;
    padding: 15px;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
}

.message-form button:hover {
    background: #5a67d8;
}

@media (max-width: 768px) {
    .about-header h1 {
        font-size: 2rem;
    }
    
    .mission-content {
        grid-template-columns: 1fr;
    }
    
    .mission-stats {
        justify-content: center;
        gap: 20px;
    }
    
    .contact-grid {
        grid-template-columns: 1fr;
    }
    
    .values-grid,
    .team-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<?php
get_footer('ultra-premium');
?>