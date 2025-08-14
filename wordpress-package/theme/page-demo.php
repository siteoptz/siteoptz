<?php
/**
 * Template Name: AI Tools Demo Page
 * Description: Full demonstration of all AI tools components
 *
 * @package SiteOptz_Premium
 */

get_header('premium');
?>

<main id="primary" class="site-main demo-page">
    <div class="container">
        
        <!-- Page Header -->
        <header class="demo-header">
            <h1>AI Tools Platform Demo</h1>
            <p>Complete showcase of all available components and features</p>
        </header>

        <!-- AI Tools Grid Section -->
        <section class="demo-section">
            <div class="section-header">
                <h2>🔧 AI Tools Grid</h2>
                <p>Display AI tools in a responsive grid layout</p>
            </div>
            
            <div class="shortcode-demo">
                <div class="shortcode-display">
                    <?php echo do_shortcode('[ai_tools_grid count="6" columns="3"]'); ?>
                </div>
                
                <div class="shortcode-code">
                    <h4>Shortcode Usage:</h4>
                    <code>[ai_tools_grid count="6" columns="3" show_rating="true" show_price="true"]</code>
                </div>
            </div>
        </section>

        <!-- Comparison Table Section -->
        <section class="demo-section">
            <div class="section-header">
                <h2>⚖️ Comparison Table</h2>
                <p>Side-by-side comparison of AI tools</p>
            </div>
            
            <div class="shortcode-demo">
                <div class="shortcode-display">
                    <?php echo do_shortcode('[ai_comparison tools="ChatGPT,Midjourney,GitHub Copilot" features="price,rating,pros,cons"]'); ?>
                </div>
                
                <div class="shortcode-code">
                    <h4>Shortcode Usage:</h4>
                    <code>[ai_comparison tools="ChatGPT,Midjourney,GitHub Copilot" features="price,rating,pros,cons"]</code>
                </div>
            </div>
        </section>

        <!-- ROI Calculator Section -->
        <section class="demo-section">
            <div class="section-header">
                <h2>📊 ROI Calculator</h2>
                <p>Interactive calculator for AI tool investment</p>
            </div>
            
            <div class="shortcode-demo">
                <div class="shortcode-display">
                    <?php echo do_shortcode('[ai_calculator title="AI Tool ROI Calculator"]'); ?>
                </div>
                
                <div class="shortcode-code">
                    <h4>Shortcode Usage:</h4>
                    <code>[ai_calculator title="AI Tool ROI Calculator" type="roi"]</code>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="demo-section">
            <div class="section-header">
                <h2>❓ FAQ Section</h2>
                <p>Frequently asked questions with expandable answers</p>
            </div>
            
            <div class="shortcode-demo">
                <div class="shortcode-display">
                    <?php echo do_shortcode('[ai_faq title="AI Tools FAQ"]'); ?>
                </div>
                
                <div class="shortcode-code">
                    <h4>Shortcode Usage:</h4>
                    <code>[ai_faq title="AI Tools FAQ" category="general"]</code>
                </div>
            </div>
        </section>

        <!-- Category Grid Section -->
        <section class="demo-section">
            <div class="section-header">
                <h2>🏷️ Category-Specific Tools</h2>
                <p>Filter tools by specific categories</p>
            </div>
            
            <div class="shortcode-demo">
                <div class="shortcode-display">
                    <?php echo do_shortcode('[ai_tools_grid category="chatbots" count="3" columns="3"]'); ?>
                </div>
                
                <div class="shortcode-code">
                    <h4>Shortcode Usage:</h4>
                    <code>[ai_tools_grid category="chatbots" count="3" columns="3"]</code>
                </div>
            </div>
        </section>

        <!-- Usage Instructions -->
        <section class="demo-section usage-section">
            <div class="section-header">
                <h2>📝 How to Use These Components</h2>
                <p>Implementation guide for all shortcodes</p>
            </div>
            
            <div class="usage-grid">
                <div class="usage-card">
                    <h3>AI Tools Grid</h3>
                    <p>Display tools in a grid layout with optional filtering by category.</p>
                    <ul>
                        <li><strong>count:</strong> Number of tools to show</li>
                        <li><strong>columns:</strong> Grid columns (1-4)</li>
                        <li><strong>category:</strong> Filter by category slug</li>
                        <li><strong>show_rating:</strong> Show/hide ratings</li>
                        <li><strong>show_price:</strong> Show/hide pricing</li>
                    </ul>
                </div>
                
                <div class="usage-card">
                    <h3>Comparison Table</h3>
                    <p>Compare multiple AI tools side by side with detailed features.</p>
                    <ul>
                        <li><strong>tools:</strong> Comma-separated tool names</li>
                        <li><strong>features:</strong> price,rating,pros,cons,features</li>
                    </ul>
                </div>
                
                <div class="usage-card">
                    <h3>ROI Calculator</h3>
                    <p>Interactive calculator for estimating AI tool returns.</p>
                    <ul>
                        <li><strong>title:</strong> Calculator heading</li>
                        <li><strong>type:</strong> roi, cost, savings</li>
                    </ul>
                </div>
                
                <div class="usage-card">
                    <h3>FAQ Section</h3>
                    <p>Expandable FAQ section with pre-built questions.</p>
                    <ul>
                        <li><strong>title:</strong> Section heading</li>
                        <li><strong>category:</strong> Filter questions by type</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Admin Instructions -->
        <section class="demo-section admin-section">
            <div class="section-header">
                <h2>⚙️ WordPress Admin Features</h2>
                <p>What you'll find in your WordPress admin</p>
            </div>
            
            <div class="admin-features">
                <div class="feature-card">
                    <h3>AI Tools Post Type</h3>
                    <p>Manage your AI tools from <strong>AI Tools</strong> menu in admin. Each tool includes:</p>
                    <ul>
                        <li>Title and description</li>
                        <li>Featured image</li>
                        <li>Price, rating, website URL</li>
                        <li>Pros, cons, and key features</li>
                        <li>Category assignment</li>
                    </ul>
                </div>
                
                <div class="feature-card">
                    <h3>Sample Data</h3>
                    <p>6 AI tools are automatically created:</p>
                    <ul>
                        <li>ChatGPT (Chatbots)</li>
                        <li>Midjourney (Image Generation)</li>
                        <li>GitHub Copilot (Code Assistant)</li>
                        <li>Jasper AI (Writing)</li>
                        <li>Runway ML (Video Creation)</li>
                        <li>DataRobot (Data Analysis)</li>
                    </ul>
                </div>
                
                <div class="feature-card">
                    <h3>Theme Customizer</h3>
                    <p>Customize your site from <strong>Appearance → Customize</strong>:</p>
                    <ul>
                        <li>Hero section content</li>
                        <li>Colors and branding</li>
                        <li>Footer options</li>
                        <li>Newsletter settings</li>
                    </ul>
                </div>
            </div>
        </section>
        
    </div>
</main>

<style>
.demo-page {
    padding: 60px 0;
    background: #f8fafc;
}

.demo-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 60px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.demo-header h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.demo-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
}

.demo-section {
    margin-bottom: 80px;
    background: white;
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.section-header {
    text-align: center;
    margin-bottom: 40px;
}

.section-header h2 {
    font-size: 2rem;
    margin-bottom: 10px;
    color: #1a202c;
}

.section-header p {
    color: #718096;
    font-size: 1.1rem;
}

.shortcode-demo {
    margin-bottom: 40px;
}

.shortcode-display {
    margin-bottom: 30px;
}

.shortcode-code {
    background: #f1f5f9;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #667eea;
}

.shortcode-code h4 {
    margin: 0 0 10px 0;
    color: #475569;
}

.shortcode-code code {
    background: #334155;
    color: #e2e8f0;
    padding: 10px 15px;
    border-radius: 6px;
    display: block;
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 0.9rem;
}

.usage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.usage-card {
    background: #f8fafc;
    padding: 30px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
}

.usage-card h3 {
    color: #667eea;
    margin-bottom: 15px;
    font-size: 1.25rem;
}

.usage-card p {
    color: #4a5568;
    margin-bottom: 15px;
    line-height: 1.6;
}

.usage-card ul {
    list-style: none;
    padding: 0;
}

.usage-card li {
    margin: 8px 0;
    color: #6b7280;
    font-size: 0.9rem;
}

.usage-card strong {
    color: #374151;
}

.admin-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.feature-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    border-radius: 12px;
}

.feature-card h3 {
    margin-bottom: 15px;
    font-size: 1.25rem;
}

.feature-card p {
    margin-bottom: 15px;
    opacity: 0.9;
    line-height: 1.6;
}

.feature-card ul {
    list-style: none;
    padding: 0;
}

.feature-card li {
    margin: 8px 0;
    opacity: 0.9;
    font-size: 0.95rem;
}

.feature-card li::before {
    content: '✓ ';
    margin-right: 8px;
    color: #ffd700;
    font-weight: 600;
}

.usage-section {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
}

.usage-section .section-header h2,
.usage-section .section-header p {
    color: white;
}

.admin-section {
    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
    color: white;
}

.admin-section .section-header h2,
.admin-section .section-header p {
    color: white;
}

@media (max-width: 768px) {
    .demo-header h1 {
        font-size: 2rem;
    }
    
    .demo-header p {
        font-size: 1rem;
    }
    
    .section-header h2 {
        font-size: 1.5rem;
    }
    
    .usage-grid,
    .admin-features {
        grid-template-columns: 1fr;
    }
}
</style>

<?php
get_footer('ultra-premium');
?>