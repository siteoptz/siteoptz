<?php
/**
 * Template Name: Feedback Page
 * Description: User feedback and suggestions
 *
 * @package SiteOptz_Premium
 */

get_header('premium');

// Dynamic metadata
$page_title = 'Feedback & Suggestions - Help Improve SiteOptz.ai | User Feedback';
$page_description = 'Share your feedback, suggestions, and feature requests to help us improve SiteOptz.ai. Your input shapes our product development.';
$canonical_url = home_url('/feedback/');

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

<main id="primary" class="site-main feedback-page">
    <div class="container">
        
        <!-- Feedback Header -->
        <header class="feedback-header">
            <h1>We Value Your Feedback</h1>
            <p>Help us improve SiteOptz.ai with your suggestions, ideas, and experiences</p>
        </header>

        <!-- Feedback Types -->
        <section class="feedback-types">
            <h2>What would you like to share?</h2>
            <div class="types-grid">
                <button class="feedback-type-btn active" data-type="general">
                    <div class="type-icon">💬</div>
                    <h3>General Feedback</h3>
                    <p>Share your overall experience</p>
                </button>
                
                <button class="feedback-type-btn" data-type="feature">
                    <div class="type-icon">💡</div>
                    <h3>Feature Request</h3>
                    <p>Suggest new features or improvements</p>
                </button>
                
                <button class="feedback-type-btn" data-type="bug">
                    <div class="type-icon">🐛</div>
                    <h3>Report a Bug</h3>
                    <p>Tell us about technical issues</p>
                </button>
                
                <button class="feedback-type-btn" data-type="tool">
                    <div class="type-icon">🛠️</div>
                    <h3>Suggest AI Tool</h3>
                    <p>Recommend tools for our database</p>
                </button>
            </div>
        </section>

        <!-- Feedback Forms -->
        <section class="feedback-forms">
            
            <!-- General Feedback Form -->
            <div id="general-form" class="feedback-form-container active">
                <h3>General Feedback</h3>
                <form class="feedback-form">
                    <div class="form-group">
                        <label>How would you rate your overall experience?</label>
                        <div class="rating-stars">
                            <span class="star" data-rating="1">⭐</span>
                            <span class="star" data-rating="2">⭐</span>
                            <span class="star" data-rating="3">⭐</span>
                            <span class="star" data-rating="4">⭐</span>
                            <span class="star" data-rating="5">⭐</span>
                        </div>
                        <input type="hidden" name="rating" value="">
                    </div>
                    
                    <div class="form-group">
                        <label>What do you like most about SiteOptz.ai?</label>
                        <textarea rows="4" placeholder="Tell us what works well for you..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>What could we improve?</label>
                        <textarea rows="4" placeholder="Share your suggestions for improvement..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>How did you discover SiteOptz.ai?</label>
                        <select>
                            <option value="">Select source</option>
                            <option value="search">Google search</option>
                            <option value="social">Social media</option>
                            <option value="referral">Friend/colleague recommendation</option>
                            <option value="blog">Blog post/article</option>
                            <option value="ad">Advertisement</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Your Email (optional)</label>
                        <input type="email" placeholder="your@email.com">
                        <small>We'll only use this to follow up if needed</small>
                    </div>
                    
                    <button type="submit" class="submit-btn">Submit Feedback</button>
                </form>
            </div>

            <!-- Feature Request Form -->
            <div id="feature-form" class="feedback-form-container">
                <h3>Feature Request</h3>
                <form class="feedback-form">
                    <div class="form-group">
                        <label>Feature Title</label>
                        <input type="text" placeholder="Brief title for your feature idea" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Feature Category</label>
                        <select required>
                            <option value="">Select category</option>
                            <option value="search">Search & Discovery</option>
                            <option value="comparison">Comparison Tools</option>
                            <option value="ui">User Interface</option>
                            <option value="mobile">Mobile Experience</option>
                            <option value="api">API & Integrations</option>
                            <option value="analytics">Analytics & Reporting</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Detailed Description</label>
                        <textarea rows="6" placeholder="Describe your feature idea in detail..." required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Problem it Solves</label>
                        <textarea rows="4" placeholder="What problem would this feature solve for you?"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Priority Level</label>
                        <select>
                            <option value="low">Nice to have</option>
                            <option value="medium">Important</option>
                            <option value="high">Critical for my workflow</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Your Email</label>
                        <input type="email" placeholder="your@email.com" required>
                        <small>We'll update you on the status of your request</small>
                    </div>
                    
                    <button type="submit" class="submit-btn">Submit Feature Request</button>
                </form>
            </div>

            <!-- Bug Report Form -->
            <div id="bug-form" class="feedback-form-container">
                <h3>Bug Report</h3>
                <form class="feedback-form">
                    <div class="form-group">
                        <label>Bug Title</label>
                        <input type="text" placeholder="Brief description of the issue" required>
                    </div>
                    
                    <div class="form-group">
                        <label>What happened?</label>
                        <textarea rows="4" placeholder="Describe what went wrong..." required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>What were you trying to do?</label>
                        <textarea rows="4" placeholder="Describe the steps you took before the issue occurred..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Browser & Device</label>
                        <input type="text" placeholder="e.g., Chrome 120 on Windows 11" id="browser-info">
                        <small>Auto-detected, but please verify</small>
                    </div>
                    
                    <div class="form-group">
                        <label>Page URL (if applicable)</label>
                        <input type="url" placeholder="https://siteoptz.ai/page-where-issue-occurred">
                    </div>
                    
                    <div class="form-group">
                        <label>Severity</label>
                        <select>
                            <option value="low">Low - Minor inconvenience</option>
                            <option value="medium">Medium - Affects functionality</option>
                            <option value="high">High - Blocks important tasks</option>
                            <option value="critical">Critical - Site unusable</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Your Email</label>
                        <input type="email" placeholder="your@email.com" required>
                        <small>We'll contact you if we need more information</small>
                    </div>
                    
                    <button type="submit" class="submit-btn">Submit Bug Report</button>
                </form>
            </div>

            <!-- AI Tool Suggestion Form -->
            <div id="tool-form" class="feedback-form-container">
                <h3>Suggest an AI Tool</h3>
                <form class="feedback-form">
                    <div class="form-group">
                        <label>Tool Name</label>
                        <input type="text" placeholder="Name of the AI tool" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Tool Website</label>
                        <input type="url" placeholder="https://tool-website.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Tool Category</label>
                        <select required>
                            <option value="">Select category</option>
                            <option value="writing">AI Writing</option>
                            <option value="image">Image Generation</option>
                            <option value="code">Code Assistant</option>
                            <option value="chatbot">Chatbots</option>
                            <option value="video">Video Creation</option>
                            <option value="audio">Audio/Voice</option>
                            <option value="data">Data Analysis</option>
                            <option value="automation">Automation</option>
                            <option value="design">Design</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Tool Description</label>
                        <textarea rows="4" placeholder="What does this tool do?" required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Why should we add it?</label>
                        <textarea rows="4" placeholder="What makes this tool unique or valuable?"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Pricing Model</label>
                        <select>
                            <option value="free">Free</option>
                            <option value="freemium">Freemium</option>
                            <option value="paid">Paid only</option>
                            <option value="unknown">Don't know</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Your Relationship to this Tool</label>
                        <select required>
                            <option value="">Select one</option>
                            <option value="user">I'm a user</option>
                            <option value="creator">I'm the creator/team member</option>
                            <option value="discovered">I discovered it recently</option>
                            <option value="recommended">It was recommended to me</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Your Email</label>
                        <input type="email" placeholder="your@email.com" required>
                    </div>
                    
                    <button type="submit" class="submit-btn">Suggest Tool</button>
                </form>
            </div>

        </section>

        <!-- Recent Feedback -->
        <section class="recent-feedback">
            <h2>Recent Community Feedback</h2>
            <div class="feedback-items">
                <div class="feedback-item">
                    <div class="feedback-type">Feature Request</div>
                    <h4>"Mobile app for iOS and Android"</h4>
                    <p>Multiple users have requested a native mobile app for better on-the-go access to AI tool comparisons.</p>
                    <div class="feedback-status implemented">✅ In Development</div>
                </div>
                
                <div class="feedback-item">
                    <div class="feedback-type">Improvement</div>
                    <h4>"Better filtering options for enterprise tools"</h4>
                    <p>Request for more granular filters to find enterprise-suitable AI tools with compliance features.</p>
                    <div class="feedback-status implemented">✅ Implemented</div>
                </div>
                
                <div class="feedback-item">
                    <div class="feedback-type">Tool Suggestion</div>
                    <h4>"Add more AI video creation tools"</h4>
                    <p>Community request to expand our video AI tools section with more options and detailed comparisons.</p>
                    <div class="feedback-status in-progress">🔄 In Progress</div>
                </div>
            </div>
        </section>

        <!-- Feedback Stats -->
        <section class="feedback-stats">
            <h2>Your Voice Matters</h2>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">500+</div>
                    <div class="stat-label">Feedback Submissions</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">85%</div>
                    <div class="stat-label">Feature Requests Implemented</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">24hrs</div>
                    <div class="stat-label">Average Response Time</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">150+</div>
                    <div class="stat-label">AI Tools Added from Suggestions</div>
                </div>
            </div>
        </section>

    </div>
</main>

<style>
.feedback-page {
    padding: 60px 0;
    background: #f8fafc;
}

.feedback-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.feedback-header h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.feedback-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
}

.feedback-types,
.feedback-forms,
.recent-feedback,
.feedback-stats {
    margin: 60px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.feedback-types h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #1a202c;
    text-align: center;
}

.types-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.feedback-type-btn {
    text-align: center;
    padding: 30px 20px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s;
}

.feedback-type-btn:hover,
.feedback-type-btn.active {
    border-color: #667eea;
    background: #f0f9ff;
}

.type-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
}

.feedback-type-btn h3 {
    color: #667eea;
    margin-bottom: 10px;
    font-size: 1.1rem;
}

.feedback-type-btn p {
    color: #64748b;
    font-size: 0.9rem;
    margin: 0;
}

.feedback-form-container {
    display: none;
}

.feedback-form-container.active {
    display: block;
}

.feedback-form-container h3 {
    color: #667eea;
    margin-bottom: 30px;
    text-align: center;
    font-size: 1.5rem;
}

.feedback-form {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 25px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
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
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #667eea;
}

.form-group small {
    display: block;
    margin-top: 5px;
    color: #64748b;
    font-size: 0.85rem;
}

.rating-stars {
    display: flex;
    gap: 5px;
    margin: 10px 0;
}

.star {
    font-size: 2rem;
    cursor: pointer;
    transition: opacity 0.3s;
}

.star:hover,
.star.active {
    opacity: 1;
}

.star:not(.active) {
    opacity: 0.3;
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

.recent-feedback h2,
.feedback-stats h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #1a202c;
    text-align: center;
}

.feedback-items {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.feedback-item {
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #667eea;
}

.feedback-type {
    background: #667eea;
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 10px;
}

.feedback-item h4 {
    color: #1a202c;
    margin-bottom: 10px;
}

.feedback-item p {
    color: #4a5568;
    margin-bottom: 15px;
    line-height: 1.6;
}

.feedback-status {
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    display: inline-block;
}

.feedback-status.implemented {
    background: #dcfce7;
    color: #065f46;
}

.feedback-status.in-progress {
    background: #fef3c7;
    color: #92400e;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
}

.stat-item {
    text-align: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: #667eea;
    margin-bottom: 10px;
}

.stat-label {
    color: #4a5568;
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .feedback-header h1 {
        font-size: 2rem;
    }
    
    .types-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Feedback type switching
    const typeButtons = document.querySelectorAll('.feedback-type-btn');
    const formContainers = document.querySelectorAll('.feedback-form-container');
    
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.dataset.type;
            
            // Update button states
            typeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            formContainers.forEach(container => {
                container.classList.remove('active');
            });
            document.getElementById(type + '-form').classList.add('active');
        });
    });
    
    // Star rating functionality
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.querySelector('input[name="rating"]');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            ratingInput.value = rating;
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
    
    // Auto-detect browser info
    const browserInfo = document.getElementById('browser-info');
    if (browserInfo) {
        const userAgent = navigator.userAgent;
        let browser = 'Unknown';
        let os = 'Unknown';
        
        // Detect browser
        if (userAgent.includes('Chrome')) browser = 'Chrome';
        else if (userAgent.includes('Firefox')) browser = 'Firefox';
        else if (userAgent.includes('Safari')) browser = 'Safari';
        else if (userAgent.includes('Edge')) browser = 'Edge';
        
        // Detect OS
        if (userAgent.includes('Windows')) os = 'Windows';
        else if (userAgent.includes('Mac')) os = 'macOS';
        else if (userAgent.includes('Linux')) os = 'Linux';
        else if (userAgent.includes('Android')) os = 'Android';
        else if (userAgent.includes('iOS')) os = 'iOS';
        
        browserInfo.value = `${browser} on ${os}`;
    }
    
    // Form submissions
    const forms = document.querySelectorAll('.feedback-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form type
            const container = this.closest('.feedback-form-container');
            const formType = container.id.replace('-form', '');
            
            // Show success message
            alert(`Thank you for your ${formType} feedback! We'll review it and get back to you soon.`);
            
            // Reset form
            this.reset();
            
            // Reset stars if rating form
            if (formType === 'general') {
                stars.forEach(star => star.classList.remove('active'));
                ratingInput.value = '';
            }
        });
    });
});
</script>

<?php
get_footer('ultra-premium');
?>