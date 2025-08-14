<?php
/**
 * Template Name: AI Tools Comparisons
 * Description: Comprehensive AI tools comparison page
 *
 * @package SiteOptz_Premium
 */

get_header('premium');
?>

<main id="primary" class="site-main comparisons-page">
    <div class="container">
        
        <!-- Comparisons Header -->
        <header class="comparisons-header">
            <h1>AI Tools Comparisons</h1>
            <p>In-depth side-by-side comparisons of the best AI tools across different categories</p>
            <div class="comparison-stats">
                <div class="stat">
                    <span class="stat-number">25+</span>
                    <span class="stat-label">Comparisons</span>
                </div>
                <div class="stat">
                    <span class="stat-number">100+</span>
                    <span class="stat-label">Tools Analyzed</span>
                </div>
                <div class="stat">
                    <span class="stat-number">50+</span>
                    <span class="stat-label">Features Compared</span>
                </div>
            </div>
        </header>

        <!-- Comparison Categories -->
        <section class="comparison-categories">
            <h2>Choose Your Comparison Category</h2>
            <div class="category-grid">
                <div class="category-card" onclick="showComparison('writing')">
                    <div class="category-icon">✍️</div>
                    <h3>AI Writing Tools</h3>
                    <p>Compare ChatGPT, Jasper AI, Copy.ai, and more</p>
                    <span class="tools-count">6 tools</span>
                </div>
                
                <div class="category-card" onclick="showComparison('image')">
                    <div class="category-icon">🎨</div>
                    <h3>Image Generation</h3>
                    <p>Midjourney vs DALL-E vs Stable Diffusion</p>
                    <span class="tools-count">4 tools</span>
                </div>
                
                <div class="category-card" onclick="showComparison('code')">
                    <div class="category-icon">💻</div>
                    <h3>Code Assistants</h3>
                    <p>GitHub Copilot vs Tabnine vs CodeWhisperer</p>
                    <span class="tools-count">5 tools</span>
                </div>
                
                <div class="category-card" onclick="showComparison('video')">
                    <div class="category-icon">🎬</div>
                    <h3>Video Creation</h3>
                    <p>Runway ML vs Synthesia vs Pictory</p>
                    <span class="tools-count">4 tools</span>
                </div>
                
                <div class="category-card" onclick="showComparison('chatbot')">
                    <div class="category-icon">🤖</div>
                    <h3>Chatbots</h3>
                    <p>ChatGPT vs Claude vs Bard comparison</p>
                    <span class="tools-count">3 tools</span>
                </div>
                
                <div class="category-card" onclick="showComparison('analytics')">
                    <div class="category-icon">📊</div>
                    <h3>Data Analytics</h3>
                    <p>DataRobot vs H2O.ai vs Azure ML</p>
                    <span class="tools-count">4 tools</span>
                </div>
            </div>
        </section>

        <!-- Featured Comparison -->
        <section class="featured-comparison">
            <h2>🔥 Featured Comparison: Top AI Writing Tools</h2>
            <?php echo do_shortcode('[ai_comparison tools="ChatGPT,Jasper AI" features="price,rating,pros,cons"]'); ?>
        </section>

        <!-- Detailed Comparisons -->
        <section class="detailed-comparisons">
            
            <!-- Writing Tools Comparison -->
            <div id="comparison-writing" class="comparison-section">
                <h2>✍️ AI Writing Tools Comparison</h2>
                <p>Compare the best AI writing assistants for content creation, copywriting, and marketing.</p>
                
                <div class="comparison-features">
                    <h3>What We Compare:</h3>
                    <div class="features-grid">
                        <div class="feature-item">📝 Content Quality</div>
                        <div class="feature-item">💰 Pricing Plans</div>
                        <div class="feature-item">🚀 Speed & Performance</div>
                        <div class="feature-item">🎯 Use Cases</div>
                        <div class="feature-item">🔗 Integrations</div>
                        <div class="feature-item">👥 Team Features</div>
                    </div>
                </div>
                
                <?php echo do_shortcode('[ai_comparison tools="ChatGPT,Jasper AI" features="price,rating,pros,cons"]'); ?>
                
                <div class="comparison-verdict">
                    <h3>Our Verdict</h3>
                    <p><strong>Best Overall:</strong> Jasper AI for professional content marketing</p>
                    <p><strong>Best Value:</strong> ChatGPT for general writing tasks</p>
                    <p><strong>Best for Teams:</strong> Jasper AI with collaboration features</p>
                </div>
            </div>

            <!-- Image Generation Comparison -->
            <div id="comparison-image" class="comparison-section" style="display: none;">
                <h2>🎨 AI Image Generation Comparison</h2>
                <p>Compare the leading AI image generation tools for creating stunning visuals.</p>
                
                <?php echo do_shortcode('[ai_comparison tools="Midjourney" features="price,rating,pros,cons"]'); ?>
                
                <div class="image-samples">
                    <h3>Sample Outputs</h3>
                    <div class="samples-grid">
                        <div class="sample-card">
                            <div class="sample-placeholder">Midjourney Sample</div>
                            <p>Artistic, cinematic style</p>
                        </div>
                        <div class="sample-card">
                            <div class="sample-placeholder">DALL-E Sample</div>
                            <p>Realistic, detailed images</p>
                        </div>
                        <div class="sample-card">
                            <div class="sample-placeholder">Stable Diffusion</div>
                            <p>Customizable, open-source</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Code Assistants Comparison -->
            <div id="comparison-code" class="comparison-section" style="display: none;">
                <h2>💻 AI Code Assistants Comparison</h2>
                <p>Compare AI-powered coding tools that boost developer productivity.</p>
                
                <?php echo do_shortcode('[ai_comparison tools="GitHub Copilot" features="price,rating,pros,cons"]'); ?>
                
                <div class="code-features">
                    <h3>Supported Languages & IDEs</h3>
                    <div class="languages-grid">
                        <div class="lang-card">
                            <h4>GitHub Copilot</h4>
                            <ul>
                                <li>Python, JavaScript, TypeScript</li>
                                <li>Java, C++, C#, Go, Ruby</li>
                                <li>VS Code, JetBrains, Neovim</li>
                            </ul>
                        </div>
                        <div class="lang-card">
                            <h4>Tabnine</h4>
                            <ul>
                                <li>30+ languages supported</li>
                                <li>All major IDEs</li>
                                <li>Local & cloud processing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Video Creation Comparison -->
            <div id="comparison-video" class="comparison-section" style="display: none;">
                <h2>🎬 AI Video Creation Comparison</h2>
                <p>Compare AI video generation and editing tools for content creators.</p>
                
                <?php echo do_shortcode('[ai_comparison tools="Runway ML" features="price,rating,pros,cons"]'); ?>
                
                <div class="video-use-cases">
                    <h3>Best Use Cases</h3>
                    <div class="use-cases-grid">
                        <div class="use-case-card">
                            <h4>Runway ML</h4>
                            <p>✅ Creative video effects</p>
                            <p>✅ Green screen removal</p>
                            <p>✅ Motion tracking</p>
                            <p>❌ Limited text-to-video</p>
                        </div>
                        <div class="use-case-card">
                            <h4>Synthesia</h4>
                            <p>✅ AI avatar videos</p>
                            <p>✅ Multi-language support</p>
                            <p>✅ Business presentations</p>
                            <p>❌ Limited customization</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Chatbot Comparison -->
            <div id="comparison-chatbot" class="comparison-section" style="display: none;">
                <h2>🤖 AI Chatbot Comparison</h2>
                <p>Compare the most advanced conversational AI models available today.</p>
                
                <?php echo do_shortcode('[ai_comparison tools="ChatGPT" features="price,rating,pros,cons"]'); ?>
                
                <div class="chatbot-capabilities">
                    <h3>Capability Matrix</h3>
                    <div class="capabilities-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th>ChatGPT</th>
                                    <th>Claude</th>
                                    <th>Bard</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Code Generation</td>
                                    <td>✅ Excellent</td>
                                    <td>✅ Excellent</td>
                                    <td>✅ Good</td>
                                </tr>
                                <tr>
                                    <td>Creative Writing</td>
                                    <td>✅ Excellent</td>
                                    <td>✅ Excellent</td>
                                    <td>✅ Good</td>
                                </tr>
                                <tr>
                                    <td>Real-time Info</td>
                                    <td>❌ Limited</td>
                                    <td>❌ No</td>
                                    <td>✅ Yes</td>
                                </tr>
                                <tr>
                                    <td>Document Analysis</td>
                                    <td>✅ Yes (Plus)</td>
                                    <td>✅ Excellent</td>
                                    <td>✅ Limited</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Analytics Tools Comparison -->
            <div id="comparison-analytics" class="comparison-section" style="display: none;">
                <h2>📊 AI Analytics Tools Comparison</h2>
                <p>Compare enterprise-grade AI platforms for data science and machine learning.</p>
                
                <?php echo do_shortcode('[ai_comparison tools="DataRobot" features="price,rating,pros,cons"]'); ?>
                
                <div class="analytics-features">
                    <h3>Enterprise Features Comparison</h3>
                    <div class="enterprise-grid">
                        <div class="enterprise-card">
                            <h4>DataRobot</h4>
                            <p>🏢 Enterprise AutoML</p>
                            <p>🔄 Full MLOps pipeline</p>
                            <p>🛡️ Enterprise security</p>
                            <p>💰 Premium pricing</p>
                        </div>
                        <div class="enterprise-card">
                            <h4>H2O.ai</h4>
                            <p>🔓 Open source option</p>
                            <p>⚡ Fast processing</p>
                            <p>🎯 Specialized algorithms</p>
                            <p>💡 Developer-friendly</p>
                        </div>
                    </div>
                </div>
            </div>

        </section>

        <!-- Comparison Tools -->
        <section class="comparison-tools">
            <h2>🛠️ Build Your Own Comparison</h2>
            <p>Use our interactive tools to compare any AI tools side by side</p>
            
            <div class="tools-row">
                <div class="tool-card">
                    <h3>ROI Calculator</h3>
                    <p>Calculate potential savings from AI tool adoption</p>
                    <?php echo do_shortcode('[ai_calculator title="Compare Tool Costs"]'); ?>
                </div>
            </div>
        </section>

        <!-- Comparison Guide -->
        <section class="comparison-guide">
            <h2>📖 How to Choose the Right AI Tool</h2>
            <div class="guide-steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <h3>Define Your Use Case</h3>
                    <p>Identify specific tasks: writing, coding, image generation, data analysis</p>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <h3>Set Your Budget</h3>
                    <p>Consider monthly costs, team sizes, and potential ROI</p>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <h3>Test Free Trials</h3>
                    <p>Most tools offer 7-30 day trials. Test with real workflows</p>
                </div>
                <div class="step">
                    <div class="step-number">4</div>
                    <h3>Check Integrations</h3>
                    <p>Ensure compatibility with your existing tech stack</p>
                </div>
            </div>
        </section>

    </div>
</main>

<style>
.comparisons-page {
    padding: 60px 0;
    background: #f8fafc;
}

.comparisons-header {
    text-align: center;
    margin-bottom: 80px;
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 80px -20px;
}

.comparisons-header h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.comparisons-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 40px;
}

.comparison-stats {
    display: flex;
    justify-content: center;
    gap: 60px;
}

.stat {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 1rem;
    opacity: 0.9;
}

.comparison-categories {
    margin-bottom: 80px;
}

.comparison-categories h2 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 2rem;
    color: #1a202c;
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.category-card {
    background: white;
    padding: 30px;
    border-radius: 16px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}

.category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.category-icon {
    font-size: 3rem;
    margin-bottom: 20px;
}

.category-card h3 {
    font-size: 1.25rem;
    margin-bottom: 10px;
    color: #1a202c;
}

.category-card p {
    color: #64748b;
    margin-bottom: 15px;
}

.tools-count {
    background: #667eea;
    color: white;
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 0.85rem;
    font-weight: 600;
}

.featured-comparison,
.detailed-comparisons,
.comparison-tools,
.comparison-guide {
    margin: 80px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.featured-comparison h2,
.detailed-comparisons h2,
.comparison-tools h2,
.comparison-guide h2 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 2rem;
    color: #1a202c;
}

.comparison-section {
    margin-bottom: 60px;
    padding-bottom: 60px;
    border-bottom: 2px solid #e2e8f0;
}

.comparison-section:last-child {
    border-bottom: none;
}

.comparison-features {
    margin: 30px 0;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 20px;
}

.feature-item {
    background: #f1f5f9;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    font-weight: 600;
    color: #475569;
}

.comparison-verdict {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 30px;
    border-radius: 12px;
    margin-top: 30px;
}

.comparison-verdict h3 {
    margin-bottom: 15px;
    color: white;
}

.comparison-verdict p {
    margin: 10px 0;
    opacity: 0.95;
}

.image-samples {
    margin-top: 40px;
}

.samples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.sample-card {
    text-align: center;
}

.sample-placeholder {
    width: 100%;
    height: 150px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    margin-bottom: 10px;
}

.code-features,
.video-use-cases,
.chatbot-capabilities,
.analytics-features {
    margin-top: 40px;
}

.languages-grid,
.use-cases-grid,
.enterprise-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.lang-card,
.use-case-card,
.enterprise-card {
    background: #f8fafc;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #667eea;
}

.lang-card h4,
.use-case-card h4,
.enterprise-card h4 {
    margin-bottom: 15px;
    color: #1a202c;
}

.lang-card ul {
    list-style: none;
    padding: 0;
}

.lang-card li {
    margin: 8px 0;
    color: #4a5568;
}

.capabilities-table {
    overflow-x: auto;
    margin-top: 20px;
}

.capabilities-table table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
}

.capabilities-table th,
.capabilities-table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}

.capabilities-table th {
    background: #f8fafc;
    font-weight: 600;
    color: #1a202c;
}

.guide-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-top: 40px;
}

.step {
    text-align: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
}

.step-number {
    width: 50px;
    height: 50px;
    background: #667eea;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0 auto 20px;
}

.step h3 {
    margin-bottom: 15px;
    color: #1a202c;
}

.step p {
    color: #4a5568;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .comparisons-header h1 {
        font-size: 2rem;
    }
    
    .comparison-stats {
        gap: 30px;
    }
    
    .stat-number {
        font-size: 2rem;
    }
    
    .category-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<script>
function showComparison(category) {
    // Hide all comparison sections
    const sections = document.querySelectorAll('.comparison-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected comparison
    const targetSection = document.getElementById('comparison-' + category);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update active category
    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => {
        card.style.border = '2px solid transparent';
    });
    
    event.target.closest('.category-card').style.border = '2px solid #667eea';
}

// Show writing comparison by default
document.addEventListener('DOMContentLoaded', function() {
    showComparison('writing');
});
</script>

<?php
get_footer('ultra-premium');
?>