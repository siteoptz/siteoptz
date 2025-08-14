<?php
/**
 * Template Name: Careers Page
 * Description: Join our team at SiteOptz.ai
 *
 * @package SiteOptz_Premium
 */

get_header('premium');

// Dynamic metadata
$page_title = 'Careers at SiteOptz.ai - Join the AI Tools Revolution | Remote Jobs';
$page_description = 'Join our mission to help businesses discover and implement the best AI tools. Remote-first company with competitive benefits and growth opportunities.';
$canonical_url = home_url('/careers/');

// Add dynamic metadata
add_action('wp_head', function() use ($page_title, $page_description, $canonical_url) {
    echo '<title>' . esc_html($page_title) . '</title>' . "\n";
    echo '<meta name="description" content="' . esc_attr($page_description) . '">' . "\n";
    echo '<link rel="canonical" href="' . esc_url($canonical_url) . '">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($page_title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($page_description) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url($canonical_url) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
    
    // Schema markup for careers page
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'JobPosting',
        'hiringOrganization' => array(
            '@type' => 'Organization',
            'name' => 'SiteOptz.ai',
            'url' => home_url()
        ),
        'jobLocation' => array(
            '@type' => 'Place',
            'address' => 'Remote Worldwide'
        ),
        'employmentType' => 'FULL_TIME',
        'workHours' => 'Flexible'
    );
    
    echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
});
?>

<main id="primary" class="site-main careers-page">
    <div class="container">
        
        <!-- Careers Header -->
        <header class="careers-header">
            <h1>Join the AI Revolution</h1>
            <p>Help businesses worldwide discover and implement the best AI tools for their success</p>
            
            <div class="company-stats">
                <div class="stat">
                    <span class="stat-number">Remote-First</span>
                    <span class="stat-label">Work Anywhere</span>
                </div>
                <div class="stat">
                    <span class="stat-number">$120K+</span>
                    <span class="stat-label">Competitive Pay</span>
                </div>
                <div class="stat">
                    <span class="stat-number">100K+</span>
                    <span class="stat-label">Users Helped</span>
                </div>
                <div class="stat">
                    <span class="stat-number">25+</span>
                    <span class="stat-label">Team Members</span>
                </div>
            </div>
        </header>

        <!-- Why Join Us -->
        <section class="why-join-us">
            <h2>Why Work at SiteOptz.ai?</h2>
            <div class="benefits-grid">
                <div class="benefit-card">
                    <div class="benefit-icon">🌍</div>
                    <h3>Remote-First Culture</h3>
                    <p>Work from anywhere in the world with flexible hours and a strong async communication culture.</p>
                </div>
                <div class="benefit-card">
                    <div class="benefit-icon">🚀</div>
                    <h3>Cutting-Edge Technology</h3>
                    <p>Work with the latest AI tools and technologies while building products that shape the future.</p>
                </div>
                <div class="benefit-card">
                    <div class="benefit-icon">💰</div>
                    <h3>Competitive Compensation</h3>
                    <p>Market-leading salaries, equity participation, and comprehensive benefits package.</p>
                </div>
                <div class="benefit-card">
                    <div class="benefit-icon">📈</div>
                    <h3>Growth Opportunities</h3>
                    <p>Fast-growing company with clear career progression paths and learning & development budget.</p>
                </div>
                <div class="benefit-card">
                    <div class="benefit-icon">🏥</div>
                    <h3>Health & Wellness</h3>
                    <p>Premium health insurance, dental, vision, and $1000 annual wellness stipend.</p>
                </div>
                <div class="benefit-card">
                    <div class="benefit-icon">🎯</div>
                    <h3>Meaningful Impact</h3>
                    <p>Help thousands of businesses improve productivity and efficiency with AI tools.</p>
                </div>
            </div>
        </section>

        <!-- Open Positions -->
        <section class="open-positions">
            <h2>Open Positions</h2>
            
            <div class="positions-list">
                <div class="position-card">
                    <div class="position-header">
                        <h3>Senior Full-Stack Developer</h3>
                        <span class="position-type">Full-time • Remote</span>
                    </div>
                    <div class="position-details">
                        <p>Build and scale our AI tools directory platform using React, Node.js, and WordPress. Experience with AI/ML APIs preferred.</p>
                        <div class="position-requirements">
                            <span class="requirement">5+ years React/Node.js</span>
                            <span class="requirement">WordPress expertise</span>
                            <span class="requirement">API integration</span>
                        </div>
                        <div class="position-footer">
                            <span class="salary">$120K - $160K</span>
                            <a href="#" class="apply-btn">Apply Now</a>
                        </div>
                    </div>
                </div>
                
                <div class="position-card">
                    <div class="position-header">
                        <h3>AI Tools Research Analyst</h3>
                        <span class="position-type">Full-time • Remote</span>
                    </div>
                    <div class="position-details">
                        <p>Research, test, and analyze AI tools across different categories. Create comprehensive reviews and comparison guides.</p>
                        <div class="position-requirements">
                            <span class="requirement">AI/ML knowledge</span>
                            <span class="requirement">Technical writing</span>
                            <span class="requirement">Research skills</span>
                        </div>
                        <div class="position-footer">
                            <span class="salary">$80K - $110K</span>
                            <a href="#" class="apply-btn">Apply Now</a>
                        </div>
                    </div>
                </div>
                
                <div class="position-card">
                    <div class="position-header">
                        <h3>Content Marketing Manager</h3>
                        <span class="position-type">Full-time • Remote</span>
                    </div>
                    <div class="position-details">
                        <p>Lead our content strategy, manage blog publications, and create educational content about AI tools and implementation.</p>
                        <div class="position-requirements">
                            <span class="requirement">5+ years content marketing</span>
                            <span class="requirement">SEO expertise</span>
                            <span class="requirement">AI tools experience</span>
                        </div>
                        <div class="position-footer">
                            <span class="salary">$90K - $120K</span>
                            <a href="#" class="apply-btn">Apply Now</a>
                        </div>
                    </div>
                </div>
                
                <div class="position-card">
                    <div class="position-header">
                        <h3>Product Designer (UI/UX)</h3>
                        <span class="position-type">Full-time • Remote</span>
                    </div>
                    <div class="position-details">
                        <p>Design intuitive user experiences for our platform, comparison tools, and mobile applications. AI/SaaS experience preferred.</p>
                        <div class="position-requirements">
                            <span class="requirement">4+ years UI/UX design</span>
                            <span class="requirement">Figma/Sketch expert</span>
                            <span class="requirement">SaaS experience</span>
                        </div>
                        <div class="position-footer">
                            <span class="salary">$100K - $140K</span>
                            <a href="#" class="apply-btn">Apply Now</a>
                        </div>
                    </div>
                </div>
                
                <div class="position-card">
                    <div class="position-header">
                        <h3>Customer Success Manager</h3>
                        <span class="position-type">Full-time • Remote</span>
                    </div>
                    <div class="position-details">
                        <p>Help enterprise customers maximize value from our platform, manage relationships, and drive expansion revenue.</p>
                        <div class="position-requirements">
                            <span class="requirement">3+ years customer success</span>
                            <span class="requirement">SaaS/tech background</span>
                            <span class="requirement">Relationship building</span>
                        </div>
                        <div class="position-footer">
                            <span class="salary">$70K - $95K + commission</span>
                            <a href="#" class="apply-btn">Apply Now</a>
                        </div>
                    </div>
                </div>
                
                <div class="position-card">
                    <div class="position-header">
                        <h3>DevOps Engineer</h3>
                        <span class="position-type">Full-time • Remote</span>
                    </div>
                    <div class="position-details">
                        <p>Build and maintain our infrastructure, CI/CD pipelines, and ensure scalability as we grow to millions of users.</p>
                        <div class="position-requirements">
                            <span class="requirement">AWS/GCP expertise</span>
                            <span class="requirement">Docker/Kubernetes</span>
                            <span class="requirement">Infrastructure as Code</span>
                        </div>
                        <div class="position-footer">
                            <span class="salary">$130K - $170K</span>
                            <a href="#" class="apply-btn">Apply Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Hiring Process -->
        <section class="hiring-process">
            <h2>Our Hiring Process</h2>
            <div class="process-steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <h3>Application Review</h3>
                    <p>We review your application and portfolio within 3 business days.</p>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <h3>Initial Interview</h3>
                    <p>30-minute video call to discuss your background and the role.</p>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <h3>Technical Assessment</h3>
                    <p>Role-specific project or technical interview (2-3 hours).</p>
                </div>
                <div class="step">
                    <div class="step-number">4</div>
                    <h3>Team Interview</h3>
                    <p>Meet your potential teammates and ask questions about the culture.</p>
                </div>
                <div class="step">
                    <div class="step-number">5</div>
                    <h3>Final Decision</h3>
                    <p>Reference check and offer extended within 24 hours.</p>
                </div>
            </div>
        </section>

        <!-- Company Culture -->
        <section class="company-culture">
            <h2>Our Culture & Values</h2>
            <div class="culture-grid">
                <div class="culture-item">
                    <h3>🎯 Customer Obsession</h3>
                    <p>Everything we do is focused on helping our users make better AI tool decisions.</p>
                </div>
                <div class="culture-item">
                    <h3>🔬 Continuous Learning</h3>
                    <p>The AI landscape changes rapidly. We encourage experimentation and learning.</p>
                </div>
                <div class="culture-item">
                    <h3>🤝 Collaboration</h3>
                    <p>We work together across time zones with transparency and respect.</p>
                </div>
                <div class="culture-item">
                    <h3>⚡ Move Fast</h3>
                    <p>We ship quickly, iterate based on feedback, and aren't afraid to make mistakes.</p>
                </div>
            </div>
        </section>

        <!-- Don't See Your Role -->
        <section class="general-application">
            <h2>Don't See Your Perfect Role?</h2>
            <p>We're always looking for talented people to join our mission. Send us your resume and tell us how you'd like to contribute.</p>
            <a href="#" class="general-apply-btn">Send General Application</a>
        </section>

        <!-- Perks & Benefits -->
        <section class="perks-benefits">
            <h2>Perks & Benefits</h2>
            <div class="perks-grid">
                <div class="perk">
                    <span class="perk-icon">💻</span>
                    <span class="perk-text">$3000 equipment budget</span>
                </div>
                <div class="perk">
                    <span class="perk-icon">🏖️</span>
                    <span class="perk-text">Unlimited PTO policy</span>
                </div>
                <div class="perk">
                    <span class="perk-icon">📚</span>
                    <span class="perk-text">$2000 learning budget</span>
                </div>
                <div class="perk">
                    <span class="perk-icon">🏡</span>
                    <span class="perk-text">$500 home office setup</span>
                </div>
                <div class="perk">
                    <span class="perk-icon">🎉</span>
                    <span class="perk-text">Annual team retreats</span>
                </div>
                <div class="perk">
                    <span class="perk-icon">⚡</span>
                    <span class="perk-text">AI tools subscriptions</span>
                </div>
            </div>
        </section>

    </div>
</main>

<style>
.careers-page {
    padding: 60px 0;
    background: #f8fafc;
}

.careers-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.careers-header h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: 800;
}

.careers-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 40px;
}

.company-stats {
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
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
}

.why-join-us,
.open-positions,
.hiring-process,
.company-culture,
.general-application,
.perks-benefits {
    margin: 60px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.why-join-us h2,
.open-positions h2,
.hiring-process h2,
.company-culture h2,
.general-application h2,
.perks-benefits h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #1a202c;
    text-align: center;
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.benefit-card {
    text-align: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
    transition: all 0.3s;
}

.benefit-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.benefit-icon {
    font-size: 3rem;
    margin-bottom: 15px;
}

.benefit-card h3 {
    margin-bottom: 10px;
    color: #667eea;
}

.benefit-card p {
    color: #4a5568;
    line-height: 1.6;
}

.positions-list {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.position-card {
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    transition: all 0.3s;
}

.position-card:hover {
    border-color: #667eea;
}

.position-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.position-header h3 {
    color: #1a202c;
    font-size: 1.25rem;
}

.position-type {
    color: #64748b;
    font-size: 0.9rem;
    padding: 4px 12px;
    background: #e2e8f0;
    border-radius: 12px;
}

.position-details p {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 15px;
}

.position-requirements {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.requirement {
    background: #f0f9ff;
    color: #667eea;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
}

.position-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.salary {
    font-weight: 600;
    color: #10b981;
    font-size: 1.1rem;
}

.apply-btn {
    background: #667eea;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.3s;
}

.apply-btn:hover {
    background: #5a67d8;
}

.process-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
}

.step {
    text-align: center;
    position: relative;
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
    font-size: 1.2rem;
    font-weight: 800;
    margin: 0 auto 15px;
}

.step h3 {
    margin-bottom: 10px;
    color: #1a202c;
}

.step p {
    color: #4a5568;
    line-height: 1.6;
    font-size: 0.9rem;
}

.culture-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.culture-item {
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #667eea;
}

.culture-item h3 {
    margin-bottom: 10px;
    color: #667eea;
}

.culture-item p {
    color: #4a5568;
    line-height: 1.6;
}

.general-application {
    text-align: center;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
}

.general-application h2 {
    color: white;
    margin-bottom: 15px;
}

.general-application p {
    opacity: 0.9;
    margin-bottom: 30px;
}

.general-apply-btn {
    background: white;
    color: #10b981;
    padding: 15px 30px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
}

.general-apply-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.perks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.perk {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    background: #f8fafc;
    border-radius: 8px;
}

.perk-icon {
    font-size: 1.5rem;
}

.perk-text {
    font-weight: 500;
    color: #4a5568;
}

@media (max-width: 768px) {
    .careers-header h1 {
        font-size: 2rem;
    }
    
    .company-stats {
        gap: 30px;
    }
    
    .position-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    
    .position-footer {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
    }
    
    .process-steps {
        grid-template-columns: 1fr;
    }
    
    .perks-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<?php
get_footer('ultra-premium');
?>