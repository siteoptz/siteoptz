<?php
/**
 * Template Name: FAQ Page
 * Description: Frequently Asked Questions page
 *
 * @package SiteOptz_Premium
 */

get_header('premium');
?>

<main id="primary" class="site-main faq-page">
    <div class="container">
        
        <!-- FAQ Header -->
        <header class="faq-header">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about AI tools, our platform, and how to get the most value from artificial intelligence</p>
            <div class="faq-search">
                <input type="text" id="faq-search" placeholder="Search FAQs..." />
                <button type="button">🔍</button>
            </div>
        </header>

        <!-- FAQ Categories -->
        <section class="faq-categories">
            <div class="category-tabs">
                <button class="tab-btn active" data-category="all">All Questions</button>
                <button class="tab-btn" data-category="getting-started">Getting Started</button>
                <button class="tab-btn" data-category="pricing">Pricing & Plans</button>
                <button class="tab-btn" data-category="tools">AI Tools</button>
                <button class="tab-btn" data-category="technical">Technical</button>
                <button class="tab-btn" data-category="business">Business & ROI</button>
            </div>
        </section>

        <!-- FAQ Content -->
        <section class="faq-content">
            
            <!-- Getting Started FAQs -->
            <div class="faq-category" data-category="getting-started">
                <h2>🚀 Getting Started</h2>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>What is SiteOptz.ai and how can it help me?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>SiteOptz.ai is a comprehensive platform that helps you discover, compare, and choose the best AI tools for your specific needs. We provide unbiased reviews, detailed comparisons, ROI calculators, and implementation guides to help you make informed decisions about AI adoption.</p>
                        <p>Whether you're looking for writing assistants, image generators, code helpers, or business automation tools, we've tested and reviewed over 500 AI tools across 50+ categories.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>How do I choose the right AI tool for my business?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>Choosing the right AI tool involves several key steps:</p>
                        <ul>
                            <li><strong>Identify your needs:</strong> What specific tasks do you want to automate or improve?</li>
                            <li><strong>Set your budget:</strong> Consider both upfront costs and potential ROI</li>
                            <li><strong>Use our comparisons:</strong> Compare features, pricing, and user reviews side by side</li>
                            <li><strong>Calculate ROI:</strong> Use our calculators to estimate potential savings</li>
                            <li><strong>Try before you buy:</strong> Most tools offer free trials or freemium tiers</li>
                        </ul>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>Do I need technical expertise to use AI tools?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>Most modern AI tools are designed for non-technical users with intuitive interfaces and user-friendly features. However, the level of technical knowledge required varies by tool type:</p>
                        <ul>
                            <li><strong>Beginner-friendly:</strong> Writing assistants, image generators, chatbots</li>
                            <li><strong>Moderate complexity:</strong> Code assistants, data analysis tools</li>
                            <li><strong>Advanced:</strong> Custom ML platforms, enterprise automation</li>
                        </ul>
                        <p>We provide difficulty ratings and implementation guides for each tool to help you assess if it's right for your skill level.</p>
                    </div>
                </div>
            </div>

            <!-- Pricing FAQs -->
            <div class="faq-category" data-category="pricing">
                <h2>💰 Pricing & Plans</h2>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>How much do AI tools typically cost?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>AI tool pricing varies widely based on functionality and target market:</p>
                        <ul>
                            <li><strong>Free tools:</strong> Basic features with limitations (ChatGPT, Runway ML)</li>
                            <li><strong>Budget ($1-20/month):</strong> Individual use, basic features</li>
                            <li><strong>Professional ($20-100/month):</strong> Advanced features, team collaboration</li>
                            <li><strong>Enterprise ($100+/month):</strong> Custom solutions, dedicated support</li>
                        </ul>
                        <p>Most tools offer free trials, and many have freemium tiers that let you test basic functionality before upgrading.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>Are annual plans worth it?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>Annual plans typically offer 20-40% savings compared to monthly billing, plus additional benefits:</p>
                        <ul>
                            <li><strong>Cost savings:</strong> 2-3 months free on average</li>
                            <li><strong>Price protection:</strong> Lock in current rates</li>
                            <li><strong>Additional features:</strong> Some tools offer extra capabilities on annual plans</li>
                            <li><strong>Priority support:</strong> Faster response times</li>
                        </ul>
                        <p>We recommend starting with monthly plans to test the tool, then switching to annual if you're satisfied with the results.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>What's the typical ROI for AI tools?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>ROI varies by tool type and implementation, but here are typical ranges:</p>
                        <ul>
                            <li><strong>Writing tools:</strong> 300-500% ROI (2-3 month payback)</li>
                            <li><strong>Code assistants:</strong> 400-600% ROI (1-2 month payback)</li>
                            <li><strong>Image generation:</strong> 250-400% ROI (3-4 month payback)</li>
                            <li><strong>Customer support:</strong> 200-300% ROI (4-6 month payback)</li>
                        </ul>
                        <p>Use our ROI calculator to estimate potential returns for your specific use case.</p>
                    </div>
                </div>
            </div>

            <!-- AI Tools FAQs -->
            <div class="faq-category" data-category="tools">
                <h2>🛠️ AI Tools</h2>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>What's the difference between ChatGPT, Claude, and other AI chatbots?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>Each AI chatbot has unique strengths:</p>
                        <ul>
                            <li><strong>ChatGPT:</strong> Best overall for general tasks, coding, creative writing</li>
                            <li><strong>Claude:</strong> Excellent for long-form content, document analysis</li>
                            <li><strong>Bard:</strong> Real-time information, Google integration</li>
                            <li><strong>Copilot:</strong> Microsoft integration, web search capabilities</li>
                        </ul>
                        <p>Check our detailed comparison tables to see feature-by-feature differences and choose based on your specific needs.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>Which AI image generator should I use?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>The best choice depends on your needs:</p>
                        <ul>
                            <li><strong>Midjourney:</strong> Best for artistic, stylized images</li>
                            <li><strong>DALL-E:</strong> Most realistic results, safety-focused</li>
                            <li><strong>Stable Diffusion:</strong> Open source, highly customizable</li>
                            <li><strong>Adobe Firefly:</strong> Commercial-safe, integrated with Creative Suite</li>
                        </ul>
                        <p>Consider factors like commercial licensing, image style, ease of use, and integration with your existing workflow.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>Are AI-generated content and images copyright-free?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>Copyright for AI-generated content is complex and evolving:</p>
                        <ul>
                            <li><strong>Generally:</strong> AI outputs aren't automatically copyrightable</li>
                            <li><strong>Platform terms:</strong> Each tool has specific licensing terms</li>
                            <li><strong>Commercial use:</strong> Some platforms require paid plans for commercial use</li>
                            <li><strong>Best practice:</strong> Always check platform terms and consider original input</li>
                        </ul>
                        <p>We provide licensing information for each tool in our reviews to help you stay compliant.</p>
                    </div>
                </div>
            </div>

            <!-- Technical FAQs -->
            <div class="faq-category" data-category="technical">
                <h2>⚙️ Technical</h2>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>How do AI tools integrate with existing software?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>AI tools offer various integration methods:</p>
                        <ul>
                            <li><strong>Browser extensions:</strong> Work with web-based tools (Gmail, Google Docs)</li>
                            <li><strong>API integration:</strong> Connect with custom applications</li>
                            <li><strong>Native integrations:</strong> Direct connections with popular platforms</li>
                            <li><strong>Zapier/webhooks:</strong> Automate workflows between tools</li>
                            <li><strong>Plugins:</strong> Add functionality to existing software</li>
                        </ul>
                        <p>Check our integration guides for specific setup instructions for popular combinations.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>What about data privacy and security?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>Data security varies by provider, but key considerations include:</p>
                        <ul>
                            <li><strong>Data encryption:</strong> In transit and at rest</li>
                            <li><strong>Data retention:</strong> How long providers keep your data</li>
                            <li><strong>Training usage:</strong> Whether your data trains future models</li>
                            <li><strong>Compliance:</strong> GDPR, CCPA, HIPAA certifications</li>
                            <li><strong>Business tiers:</strong> Often provide additional privacy protections</li>
                        </ul>
                        <p>We include privacy and security ratings in all our tool reviews.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>What if an AI tool stops working or shuts down?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>Minimize risk with these strategies:</p>
                        <ul>
                            <li><strong>Data export:</strong> Regularly backup your data and outputs</li>
                            <li><strong>Multiple tools:</strong> Don't rely on a single AI tool for critical tasks</li>
                            <li><strong>Established providers:</strong> Choose tools from well-funded, stable companies</li>
                            <li><strong>Open source alternatives:</strong> Consider tools with open source versions</li>
                            <li><strong>Transition plans:</strong> Have backup tools identified and tested</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Business FAQs -->
            <div class="faq-category" data-category="business">
                <h2>🏢 Business & ROI</h2>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>How do I convince my team/boss to invest in AI tools?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>Build a compelling business case:</p>
                        <ul>
                            <li><strong>Start small:</strong> Pilot with free trials and document results</li>
                            <li><strong>Calculate ROI:</strong> Use our calculators to show potential savings</li>
                            <li><strong>Address concerns:</strong> Prepare answers about security, training, and implementation</li>
                            <li><strong>Show examples:</strong> Find case studies from similar companies</li>
                            <li><strong>Propose trial period:</strong> Suggest 3-month test with success metrics</li>
                        </ul>
                        <p>We provide business case templates and ROI presentations to help with internal buy-in.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>Will AI tools replace human workers?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>AI tools are best viewed as productivity enhancers rather than replacements:</p>
                        <ul>
                            <li><strong>Augmentation:</strong> AI handles routine tasks, humans focus on strategy</li>
                            <li><strong>New opportunities:</strong> Creates demand for AI-literate workers</li>
                            <li><strong>Higher-value work:</strong> Frees humans for creative and interpersonal tasks</li>
                            <li><strong>Competitive advantage:</strong> Companies using AI effectively outperform those that don't</li>
                        </ul>
                        <p>The key is training teams to work alongside AI tools effectively.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h3>What's the best way to train employees on AI tools?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>Effective AI training strategies:</p>
                        <ul>
                            <li><strong>Start with champions:</strong> Train enthusiastic early adopters first</li>
                            <li><strong>Hands-on practice:</strong> Learning by doing is most effective</li>
                            <li><strong>Real use cases:</strong> Train with actual work examples, not generic demos</li>
                            <li><strong>Ongoing support:</strong> Provide regular check-ins and advanced training</li>
                            <li><strong>Success sharing:</strong> Celebrate wins and share best practices</li>
                        </ul>
                        <p>Many AI tool providers offer training resources and certification programs.</p>
                    </div>
                </div>
            </div>

        </section>

        <!-- Still Have Questions -->
        <section class="contact-section">
            <h2>Still Have Questions?</h2>
            <div class="contact-options">
                <div class="contact-option">
                    <h3>📧 Email Support</h3>
                    <p>Get detailed answers to specific questions</p>
                    <a href="mailto:support@siteoptz.ai" class="contact-btn">support@siteoptz.ai</a>
                </div>
                <div class="contact-option">
                    <h3>💬 Community Forum</h3>
                    <p>Join discussions with other AI tool users</p>
                    <a href="<?php echo esc_url(home_url('/community')); ?>" class="contact-btn">Join Community</a>
                </div>
                <div class="contact-option">
                    <h3>📅 Expert Consultation</h3>
                    <p>Book a 1-on-1 session with our AI specialists</p>
                    <a href="<?php echo esc_url(home_url('/consultation')); ?>" class="contact-btn">Book Session</a>
                </div>
            </div>
        </section>

    </div>
</main>

<style>
.faq-page {
    padding: 60px 0;
    background: #f8fafc;
}

.faq-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 80px 0;
    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.faq-header h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.faq-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 40px;
}

.faq-search {
    display: flex;
    max-width: 500px;
    margin: 0 auto;
    background: white;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.faq-search input {
    flex: 1;
    padding: 15px 25px;
    border: none;
    outline: none;
    font-size: 1rem;
    color: #1a202c;
}

.faq-search button {
    padding: 15px 25px;
    background: #7c3aed;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
}

.faq-categories {
    margin-bottom: 40px;
}

.category-tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    background: white;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.tab-btn {
    padding: 12px 24px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 25px;
    color: #64748b;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.tab-btn:hover,
.tab-btn.active {
    background: #7c3aed;
    border-color: #7c3aed;
    color: white;
}

.faq-content {
    background: white;
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    margin-bottom: 60px;
}

.faq-category {
    margin-bottom: 60px;
}

.faq-category h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #1a202c;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 15px;
}

.faq-item {
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 20px;
}

.faq-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 0;
    cursor: pointer;
    transition: color 0.3s;
}

.faq-question:hover {
    color: #7c3aed;
}

.faq-question h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
}

.faq-toggle {
    font-size: 1.5rem;
    font-weight: 300;
    color: #7c3aed;
    transition: transform 0.3s;
    min-width: 30px;
    text-align: center;
}

.faq-toggle.active {
    transform: rotate(45deg);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
}

.faq-answer.active {
    max-height: 500px;
    padding-bottom: 25px;
}

.faq-answer p {
    margin: 0 0 15px 0;
    color: #4a5568;
    line-height: 1.7;
}

.faq-answer ul {
    margin: 15px 0;
    padding-left: 20px;
}

.faq-answer li {
    margin: 8px 0;
    color: #4a5568;
    line-height: 1.6;
}

.faq-answer strong {
    color: #1a202c;
}

.contact-section {
    background: white;
    border-radius: 16px;
    padding: 60px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    text-align: center;
}

.contact-section h2 {
    font-size: 2.5rem;
    margin-bottom: 40px;
    color: #1a202c;
}

.contact-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
}

.contact-option {
    padding: 30px;
    background: #f8fafc;
    border-radius: 16px;
    text-align: center;
}

.contact-option h3 {
    font-size: 1.25rem;
    margin-bottom: 15px;
    color: #7c3aed;
}

.contact-option p {
    color: #4a5568;
    margin-bottom: 20px;
    line-height: 1.6;
}

.contact-btn {
    display: inline-block;
    background: #7c3aed;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.3s;
}

.contact-btn:hover {
    background: #6d28d9;
}

@media (max-width: 768px) {
    .faq-header h1 {
        font-size: 2rem;
    }
    
    .category-tabs {
        flex-direction: column;
        align-items: center;
    }
    
    .tab-btn {
        width: 100%;
        max-width: 200px;
    }
    
    .faq-question h3 {
        font-size: 1rem;
        padding-right: 15px;
    }
    
    .contact-options {
        grid-template-columns: 1fr;
    }
}
</style>

<script>
function toggleFAQ(element) {
    const toggle = element.querySelector('.faq-toggle');
    const answer = element.nextElementSibling;
    const isActive = answer.classList.contains('active');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer.active').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.faq-toggle.active').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current FAQ
    if (!isActive) {
        answer.classList.add('active');
        toggle.classList.add('active');
    }
}

// Category filtering
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-btn');
    const categories = document.querySelectorAll('.faq-category');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.dataset.category;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide categories
            categories.forEach(category => {
                if (targetCategory === 'all' || category.dataset.category === targetCategory) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('faq-search');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
</script>

<?php
get_footer('ultra-premium');
?>