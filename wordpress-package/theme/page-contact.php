<?php
/**
 * Template Name: Contact Page
 * Description: Contact us and get in touch
 *
 * @package SiteOptz_Premium
 */

get_header('premium');

// Dynamic metadata
$page_title = 'Contact Us - Get in Touch with SiteOptz.ai | Support & Sales';
$page_description = 'Contact SiteOptz.ai for support, sales inquiries, partnerships, or general questions. Multiple ways to reach our team.';
$canonical_url = home_url('/contact/');

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

<main id="primary" class="site-main contact-page">
    <div class="container">
        
        <!-- Contact Header -->
        <header class="contact-header">
            <h1>Get in Touch</h1>
            <p>We're here to help you find the perfect AI tools for your business</p>
        </header>

        <!-- Contact Methods -->
        <section class="contact-methods">
            <div class="methods-grid">
                
                <div class="contact-method">
                    <div class="method-icon">💬</div>
                    <h3>Live Chat</h3>
                    <p>Chat with our support team for immediate assistance</p>
                    <div class="method-info">
                        <span>Available 9 AM - 6 PM PST</span>
                        <button class="contact-btn" onclick="openChat()">Start Chat</button>
                    </div>
                </div>

                <div class="contact-method">
                    <div class="method-icon">📧</div>
                    <h3>Email Support</h3>
                    <p>Send us detailed questions and we'll respond quickly</p>
                    <div class="method-info">
                        <span>support@siteoptz.ai</span>
                        <a href="mailto:support@siteoptz.ai" class="contact-btn">Send Email</a>
                    </div>
                </div>

                <div class="contact-method">
                    <div class="method-icon">💼</div>
                    <h3>Sales Team</h3>
                    <p>Discuss enterprise plans and custom solutions</p>
                    <div class="method-info">
                        <span>sales@siteoptz.ai</span>
                        <a href="mailto:sales@siteoptz.ai" class="contact-btn">Contact Sales</a>
                    </div>
                </div>

                <div class="contact-method">
                    <div class="method-icon">📞</div>
                    <h3>Phone Support</h3>
                    <p>Speak directly with our enterprise team</p>
                    <div class="method-info">
                        <span>+1 (555) 123-4567</span>
                        <a href="tel:+15551234567" class="contact-btn">Call Now</a>
                    </div>
                </div>

            </div>
        </section>

        <!-- Contact Form -->
        <section class="contact-form-section">
            <h2>Send us a Message</h2>
            <div class="form-container">
                <form class="contact-form" id="contactForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">First Name *</label>
                            <input type="text" id="firstName" name="firstName" required>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name *</label>
                            <input type="text" id="lastName" name="lastName" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="email">Email Address *</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="company">Company</label>
                            <input type="text" id="company" name="company">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="subject">Subject *</label>
                        <select id="subject" name="subject" required>
                            <option value="">Select a subject</option>
                            <option value="general">General Inquiry</option>
                            <option value="support">Technical Support</option>
                            <option value="sales">Sales & Pricing</option>
                            <option value="partnership">Partnership Opportunity</option>
                            <option value="press">Press & Media</option>
                            <option value="feedback">Feedback & Suggestions</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="message">Message *</label>
                        <textarea id="message" name="message" rows="6" placeholder="Tell us how we can help you..." required></textarea>
                    </div>

                    <div class="form-group checkbox-group">
                        <input type="checkbox" id="newsletter" name="newsletter">
                        <label for="newsletter">Subscribe to our newsletter for AI tools updates and industry insights</label>
                    </div>

                    <button type="submit" class="submit-btn">Send Message</button>
                </form>
            </div>
        </section>

        <!-- FAQ Quick Links -->
        <section class="quick-faq">
            <h2>Quick Answers</h2>
            <div class="faq-grid">
                <div class="faq-item">
                    <h4>How do I get started?</h4>
                    <p>Browse our <a href="/ai-tools/">AI tools directory</a> or use our <a href="/calculator/">ROI calculator</a> to find the best tools for your needs.</p>
                </div>
                <div class="faq-item">
                    <h4>Is there a free plan?</h4>
                    <p>Yes! Our basic plan is free and includes access to tool comparisons and basic features. <a href="/pricing/">View pricing</a>.</p>
                </div>
                <div class="faq-item">
                    <h4>How do I suggest a new tool?</h4>
                    <p>Use our <a href="/feedback/">feedback form</a> to suggest new AI tools for our database.</p>
                </div>
                <div class="faq-item">
                    <h4>Do you offer enterprise solutions?</h4>
                    <p>Yes! Contact our sales team at sales@siteoptz.ai for custom enterprise features and pricing.</p>
                </div>
            </div>
        </section>

        <!-- Office Information -->
        <section class="office-info">
            <h2>Our Offices</h2>
            <div class="offices-grid">
                <div class="office">
                    <h4>🇺🇸 San Francisco HQ</h4>
                    <p>123 AI Innovation Drive<br>
                    San Francisco, CA 94105<br>
                    United States</p>
                </div>
                <div class="office">
                    <h4>🇪🇺 London Office</h4>
                    <p>456 Tech Hub Lane<br>
                    London EC2A 4NE<br>
                    United Kingdom</p>
                </div>
                <div class="office">
                    <h4>🇦🇺 Sydney Office</h4>
                    <p>789 Innovation Square<br>
                    Sydney NSW 2000<br>
                    Australia</p>
                </div>
            </div>
        </section>

    </div>
</main>

<style>
.contact-page {
    padding: 60px 0;
    background: #f8fafc;
}

.contact-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.contact-header h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.contact-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
}

.contact-methods,
.contact-form-section,
.quick-faq,
.office-info {
    margin: 60px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.methods-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.contact-method {
    text-align: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
    transition: all 0.3s;
}

.contact-method:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.method-icon {
    font-size: 3rem;
    margin-bottom: 20px;
}

.contact-method h3 {
    color: #667eea;
    margin-bottom: 10px;
}

.contact-method p {
    color: #4a5568;
    margin-bottom: 20px;
    line-height: 1.6;
}

.method-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.method-info span {
    color: #64748b;
    font-size: 0.9rem;
}

.contact-btn {
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

.contact-btn:hover {
    background: #5a67d8;
}

.contact-form-section h2,
.quick-faq h2,
.office-info h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 30px;
    color: #1a202c;
}

.form-container {
    max-width: 600px;
    margin: 0 auto;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 5px;
    color: #1a202c;
    font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 12px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #667eea;
}

.checkbox-group {
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
}

.checkbox-group input {
    width: auto;
    margin: 0;
}

.checkbox-group label {
    margin: 0;
    font-size: 0.9rem;
    color: #4a5568;
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
    transition: background 0.3s;
}

.submit-btn:hover {
    background: #5a67d8;
}

.faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

.faq-item {
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #667eea;
}

.faq-item h4 {
    color: #667eea;
    margin-bottom: 10px;
}

.faq-item p {
    color: #4a5568;
    line-height: 1.6;
}

.faq-item a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
}

.faq-item a:hover {
    text-decoration: underline;
}

.offices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.office {
    text-align: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
}

.office h4 {
    color: #667eea;
    margin-bottom: 15px;
    font-size: 1.1rem;
}

.office p {
    color: #4a5568;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .contact-header h1 {
        font-size: 2rem;
    }
    
    .methods-grid {
        grid-template-columns: 1fr;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .checkbox-group {
        flex-direction: column;
        gap: 5px;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show success message
        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
        
        // Reset form
        this.reset();
    });
    
    // Live chat function
    window.openChat = function() {
        // Placeholder for live chat integration
        alert('Live chat would open here. In a real implementation, this would integrate with your chat service.');
    };
});
</script>

<?php
get_footer('ultra-premium');
?>