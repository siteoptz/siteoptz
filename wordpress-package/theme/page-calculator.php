<?php
/**
 * Template Name: Calculator Page
 * Description: AI ROI Calculator page
 *
 * @package SiteOptz_Premium
 */

get_header('premium');
?>

<main id="primary" class="site-main calculator-page">
    <div class="container">
        
        <!-- Calculator Header -->
        <header class="calculator-header">
            <h1>AI ROI Calculator</h1>
            <p>Calculate the potential return on investment for AI tools and make data-driven decisions for your business</p>
            <div class="calculator-badge">
                <span>💰 Calculate potential savings up to $100K+ annually</span>
            </div>
        </header>

        <!-- Main Calculator -->
        <section class="main-calculator">
            <h2>Universal AI ROI Calculator</h2>
            <?php echo do_shortcode('[ai_calculator title="AI Tool ROI Calculator"]'); ?>
        </section>

        <!-- Category Specific Calculators -->
        <section class="category-calculators">
            <h2>Category-Specific Calculators</h2>
            <div class="calculators-grid">
                
                <!-- Writing Tools Calculator -->
                <div class="calculator-card">
                    <div class="calculator-card-header">
                        <h3>✍️ AI Writing Tools</h3>
                        <p>Calculate ROI for content creation and copywriting tools</p>
                    </div>
                    <div class="calculator-inputs">
                        <div class="input-group">
                            <label>Content pieces per month</label>
                            <input type="number" id="writing-pieces" value="20" min="1">
                        </div>
                        <div class="input-group">
                            <label>Hours per piece (current)</label>
                            <input type="number" id="writing-hours" value="2" min="0.5" step="0.5">
                        </div>
                        <div class="input-group">
                            <label>Writer hourly rate ($)</label>
                            <input type="number" id="writing-rate" value="50" min="10">
                        </div>
                        <div class="input-group">
                            <label>AI tool cost per month ($)</label>
                            <input type="number" id="writing-cost" value="39" min="0">
                        </div>
                        <div class="input-group">
                            <label>Time savings with AI (%)</label>
                            <input type="range" id="writing-savings" min="20" max="80" value="50">
                            <span class="range-value">50%</span>
                        </div>
                        <button onclick="calculateWritingROI()" class="calc-button">Calculate Writing ROI</button>
                    </div>
                    <div class="calculator-results" id="writing-results" style="display: none;">
                        <h4>Writing Tools ROI</h4>
                        <div class="results-grid">
                            <div class="result-item">
                                <span class="result-label">Monthly Savings</span>
                                <span class="result-value" id="writing-monthly">$0</span>
                            </div>
                            <div class="result-item">
                                <span class="result-label">Annual ROI</span>
                                <span class="result-value" id="writing-roi">0%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Image Generation Calculator -->
                <div class="calculator-card">
                    <div class="calculator-card-header">
                        <h3>🎨 AI Image Generation</h3>
                        <p>Calculate savings for graphic design and image creation</p>
                    </div>
                    <div class="calculator-inputs">
                        <div class="input-group">
                            <label>Images needed per month</label>
                            <input type="number" id="image-count" value="50" min="1">
                        </div>
                        <div class="input-group">
                            <label>Cost per image (designer) ($)</label>
                            <input type="number" id="image-designer-cost" value="25" min="5">
                        </div>
                        <div class="input-group">
                            <label>AI tool monthly cost ($)</label>
                            <input type="number" id="image-ai-cost" value="30" min="0">
                        </div>
                        <div class="input-group">
                            <label>Images created with AI (%)</label>
                            <input type="range" id="image-ai-percent" min="20" max="90" value="60">
                            <span class="range-value">60%</span>
                        </div>
                        <button onclick="calculateImageROI()" class="calc-button">Calculate Image ROI</button>
                    </div>
                    <div class="calculator-results" id="image-results" style="display: none;">
                        <h4>Image Generation ROI</h4>
                        <div class="results-grid">
                            <div class="result-item">
                                <span class="result-label">Monthly Savings</span>
                                <span class="result-value" id="image-monthly">$0</span>
                            </div>
                            <div class="result-item">
                                <span class="result-label">Annual ROI</span>
                                <span class="result-value" id="image-roi">0%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Code Assistant Calculator -->
                <div class="calculator-card">
                    <div class="calculator-card-header">
                        <h3>💻 AI Code Assistants</h3>
                        <p>Calculate productivity gains for development teams</p>
                    </div>
                    <div class="calculator-inputs">
                        <div class="input-group">
                            <label>Number of developers</label>
                            <input type="number" id="code-devs" value="5" min="1">
                        </div>
                        <div class="input-group">
                            <label>Average developer salary ($)</label>
                            <input type="number" id="code-salary" value="100000" min="50000">
                        </div>
                        <div class="input-group">
                            <label>Productivity increase (%)</label>
                            <input type="range" id="code-productivity" min="10" max="40" value="20">
                            <span class="range-value">20%</span>
                        </div>
                        <div class="input-group">
                            <label>Tool cost per developer/month ($)</label>
                            <input type="number" id="code-cost" value="19" min="0">
                        </div>
                        <button onclick="calculateCodeROI()" class="calc-button">Calculate Code ROI</button>
                    </div>
                    <div class="calculator-results" id="code-results" style="display: none;">
                        <h4>Code Assistant ROI</h4>
                        <div class="results-grid">
                            <div class="result-item">
                                <span class="result-label">Monthly Savings</span>
                                <span class="result-value" id="code-monthly">$0</span>
                            </div>
                            <div class="result-item">
                                <span class="result-label">Annual ROI</span>
                                <span class="result-value" id="code-roi">0%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Customer Service Calculator -->
                <div class="calculator-card">
                    <div class="calculator-card-header">
                        <h3>🤖 AI Chatbots</h3>
                        <p>Calculate savings from automated customer support</p>
                    </div>
                    <div class="calculator-inputs">
                        <div class="input-group">
                            <label>Customer inquiries per month</label>
                            <input type="number" id="support-inquiries" value="1000" min="100">
                        </div>
                        <div class="input-group">
                            <label>Average handling time (minutes)</label>
                            <input type="number" id="support-time" value="15" min="5">
                        </div>
                        <div class="input-group">
                            <label>Support agent hourly rate ($)</label>
                            <input type="number" id="support-rate" value="20" min="10">
                        </div>
                        <div class="input-group">
                            <label>Inquiries automated (%)</label>
                            <input type="range" id="support-automated" min="30" max="80" value="60">
                            <span class="range-value">60%</span>
                        </div>
                        <div class="input-group">
                            <label>Chatbot monthly cost ($)</label>
                            <input type="number" id="support-cost" value="99" min="0">
                        </div>
                        <button onclick="calculateSupportROI()" class="calc-button">Calculate Support ROI</button>
                    </div>
                    <div class="calculator-results" id="support-results" style="display: none;">
                        <h4>Chatbot ROI</h4>
                        <div class="results-grid">
                            <div class="result-item">
                                <span class="result-label">Monthly Savings</span>
                                <span class="result-value" id="support-monthly">$0</span>
                            </div>
                            <div class="result-item">
                                <span class="result-label">Annual ROI</span>
                                <span class="result-value" id="support-roi">0%</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- ROI Guide -->
        <section class="roi-guide">
            <h2>How to Maximize Your AI ROI</h2>
            <div class="guide-content">
                <div class="guide-steps">
                    <div class="guide-step">
                        <div class="step-number">1</div>
                        <h3>Start Small</h3>
                        <p>Begin with one or two AI tools in your most time-consuming processes. This allows you to measure impact and build confidence.</p>
                    </div>
                    <div class="guide-step">
                        <div class="step-number">2</div>
                        <h3>Measure Baseline</h3>
                        <p>Document current time spent, costs, and quality metrics before implementing AI tools. This baseline is crucial for ROI calculation.</p>
                    </div>
                    <div class="guide-step">
                        <div class="step-number">3</div>
                        <h3>Train Your Team</h3>
                        <p>Invest in proper training to ensure your team can effectively use AI tools. Poor adoption leads to poor ROI.</p>
                    </div>
                    <div class="guide-step">
                        <div class="step-number">4</div>
                        <h3>Monitor & Optimize</h3>
                        <p>Continuously track performance metrics and optimize workflows. AI tools often have learning curves that improve over time.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ROI Factors -->
        <section class="roi-factors">
            <h2>Key Factors That Impact AI ROI</h2>
            <div class="factors-grid">
                <div class="factor-card">
                    <h3>⚡ Time Savings</h3>
                    <p>The most immediate benefit. Track hours saved per task and multiply by hourly rates.</p>
                    <div class="factor-example">
                        <strong>Example:</strong> AI writing tool saves 2 hours per article × $50/hour = $100 per article
                    </div>
                </div>
                <div class="factor-card">
                    <h3>📈 Quality Improvement</h3>
                    <p>Better quality leads to higher conversion rates, fewer revisions, and increased customer satisfaction.</p>
                    <div class="factor-example">
                        <strong>Example:</strong> AI-generated images reduce revision cycles from 3 to 1
                    </div>
                </div>
                <div class="factor-card">
                    <h3>🎯 Scalability</h3>
                    <p>AI tools handle increased workload without proportional cost increase.</p>
                    <div class="factor-example">
                        <strong>Example:</strong> Chatbot handles 10x more inquiries with same monthly cost
                    </div>
                </div>
                <div class="factor-card">
                    <h3>💡 Innovation</h3>
                    <p>Free up human resources for higher-value strategic work and innovation.</p>
                    <div class="factor-example">
                        <strong>Example:</strong> Designers focus on strategy while AI handles routine graphics
                    </div>
                </div>
            </div>
        </section>

        <!-- Industry Benchmarks -->
        <section class="benchmarks">
            <h2>Industry ROI Benchmarks</h2>
            <div class="benchmarks-table">
                <table>
                    <thead>
                        <tr>
                            <th>AI Tool Category</th>
                            <th>Average ROI</th>
                            <th>Payback Period</th>
                            <th>Time Savings</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Writing & Content</td>
                            <td>300-500%</td>
                            <td>2-3 months</td>
                            <td>40-60%</td>
                        </tr>
                        <tr>
                            <td>Code Assistants</td>
                            <td>400-600%</td>
                            <td>1-2 months</td>
                            <td>20-35%</td>
                        </tr>
                        <tr>
                            <td>Image Generation</td>
                            <td>250-400%</td>
                            <td>3-4 months</td>
                            <td>50-70%</td>
                        </tr>
                        <tr>
                            <td>Customer Support</td>
                            <td>200-300%</td>
                            <td>4-6 months</td>
                            <td>60-80%</td>
                        </tr>
                        <tr>
                            <td>Data Analysis</td>
                            <td>500-800%</td>
                            <td>3-6 months</td>
                            <td>70-85%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

    </div>
</main>

<style>
.calculator-page {
    padding: 60px 0;
    background: #f8fafc;
}

.calculator-header {
    text-align: center;
    margin-bottom: 80px;
    padding: 80px 0;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 80px -20px;
}

.calculator-header h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.calculator-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 30px;
}

.calculator-badge {
    display: inline-block;
    background: rgba(255,255,255,0.2);
    padding: 12px 24px;
    border-radius: 25px;
    backdrop-filter: blur(10px);
}

.main-calculator,
.category-calculators,
.roi-guide,
.roi-factors,
.benchmarks {
    margin: 80px 0;
    padding: 60px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.main-calculator h2,
.category-calculators h2,
.roi-guide h2,
.roi-factors h2,
.benchmarks h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 40px;
    color: #1a202c;
}

.calculators-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
}

.calculator-card {
    background: #f8fafc;
    border-radius: 16px;
    padding: 30px;
    border: 2px solid #e2e8f0;
}

.calculator-card-header {
    margin-bottom: 30px;
    text-align: center;
}

.calculator-card-header h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #1a202c;
}

.calculator-card-header p {
    color: #64748b;
    font-size: 0.95rem;
}

.calculator-inputs {
    margin-bottom: 20px;
}

.input-group {
    margin-bottom: 20px;
}

.input-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
}

.input-group input {
    width: 100%;
    padding: 12px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
}

.input-group input:focus {
    border-color: #10b981;
    outline: none;
}

.range-value {
    margin-left: 10px;
    font-weight: 600;
    color: #10b981;
}

.calc-button {
    width: 100%;
    background: #10b981;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
}

.calc-button:hover {
    background: #059669;
}

.calculator-results {
    background: white;
    padding: 20px;
    border-radius: 12px;
    margin-top: 20px;
    border: 2px solid #10b981;
}

.calculator-results h4 {
    margin-bottom: 15px;
    color: #10b981;
    text-align: center;
}

.results-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.result-item {
    text-align: center;
    padding: 15px;
    background: #f0fdf4;
    border-radius: 8px;
}

.result-label {
    display: block;
    font-size: 0.9rem;
    color: #374151;
    margin-bottom: 5px;
}

.result-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 800;
    color: #10b981;
}

.guide-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.guide-step {
    text-align: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
}

.step-number {
    width: 50px;
    height: 50px;
    background: #10b981;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0 auto 20px;
}

.guide-step h3 {
    margin-bottom: 15px;
    color: #1a202c;
}

.guide-step p {
    color: #4a5568;
    line-height: 1.6;
}

.factors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.factor-card {
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #10b981;
}

.factor-card h3 {
    margin-bottom: 15px;
    color: #10b981;
}

.factor-card p {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 15px;
}

.factor-example {
    background: #ecfdf5;
    padding: 15px;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #065f46;
}

.benchmarks-table {
    overflow-x: auto;
}

.benchmarks-table table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.benchmarks-table th,
.benchmarks-table td {
    padding: 20px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}

.benchmarks-table th {
    background: #f8fafc;
    font-weight: 600;
    color: #1a202c;
}

.benchmarks-table td {
    color: #4a5568;
}

@media (max-width: 768px) {
    .calculator-header h1 {
        font-size: 2rem;
    }
    
    .calculators-grid {
        grid-template-columns: 1fr;
    }
    
    .results-grid {
        grid-template-columns: 1fr;
    }
    
    .factors-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<script>
// Update range values
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input[type="range"]').forEach(range => {
        const updateValue = () => {
            const valueSpan = range.parentNode.querySelector('.range-value');
            if (valueSpan) {
                valueSpan.textContent = range.value + '%';
            }
        };
        
        range.addEventListener('input', updateValue);
        updateValue(); // Set initial value
    });
});

function calculateWritingROI() {
    const pieces = parseFloat(document.getElementById('writing-pieces').value);
    const hours = parseFloat(document.getElementById('writing-hours').value);
    const rate = parseFloat(document.getElementById('writing-rate').value);
    const cost = parseFloat(document.getElementById('writing-cost').value);
    const savings = parseFloat(document.getElementById('writing-savings').value) / 100;
    
    const monthlyCost = pieces * hours * rate;
    const timeSaved = monthlyCost * savings;
    const monthlySavings = timeSaved - cost;
    const annualROI = ((monthlySavings * 12) / (cost * 12)) * 100;
    
    document.getElementById('writing-monthly').textContent = '$' + Math.round(monthlySavings);
    document.getElementById('writing-roi').textContent = Math.round(annualROI) + '%';
    document.getElementById('writing-results').style.display = 'block';
}

function calculateImageROI() {
    const count = parseFloat(document.getElementById('image-count').value);
    const designerCost = parseFloat(document.getElementById('image-designer-cost').value);
    const aiCost = parseFloat(document.getElementById('image-ai-cost').value);
    const aiPercent = parseFloat(document.getElementById('image-ai-percent').value) / 100;
    
    const monthlyDesignerCost = count * designerCost;
    const imagesWithAI = count * aiPercent;
    const savingsFromAI = imagesWithAI * designerCost;
    const monthlySavings = savingsFromAI - aiCost;
    const annualROI = ((monthlySavings * 12) / (aiCost * 12)) * 100;
    
    document.getElementById('image-monthly').textContent = '$' + Math.round(monthlySavings);
    document.getElementById('image-roi').textContent = Math.round(annualROI) + '%';
    document.getElementById('image-results').style.display = 'block';
}

function calculateCodeROI() {
    const devs = parseFloat(document.getElementById('code-devs').value);
    const salary = parseFloat(document.getElementById('code-salary').value);
    const productivity = parseFloat(document.getElementById('code-productivity').value) / 100;
    const cost = parseFloat(document.getElementById('code-cost').value);
    
    const monthlyValue = (salary / 12) * devs * productivity;
    const monthlyCost = cost * devs;
    const monthlySavings = monthlyValue - monthlyCost;
    const annualROI = ((monthlySavings * 12) / (monthlyCost * 12)) * 100;
    
    document.getElementById('code-monthly').textContent = '$' + Math.round(monthlySavings);
    document.getElementById('code-roi').textContent = Math.round(annualROI) + '%';
    document.getElementById('code-results').style.display = 'block';
}

function calculateSupportROI() {
    const inquiries = parseFloat(document.getElementById('support-inquiries').value);
    const time = parseFloat(document.getElementById('support-time').value);
    const rate = parseFloat(document.getElementById('support-rate').value);
    const automated = parseFloat(document.getElementById('support-automated').value) / 100;
    const cost = parseFloat(document.getElementById('support-cost').value);
    
    const totalHours = (inquiries * time) / 60;
    const automatedHours = totalHours * automated;
    const savingsFromAutomation = automatedHours * rate;
    const monthlySavings = savingsFromAutomation - cost;
    const annualROI = ((monthlySavings * 12) / (cost * 12)) * 100;
    
    document.getElementById('support-monthly').textContent = '$' + Math.round(monthlySavings);
    document.getElementById('support-roi').textContent = Math.round(annualROI) + '%';
    document.getElementById('support-results').style.display = 'block';
}
</script>

<?php
get_footer('ultra-premium');
?>