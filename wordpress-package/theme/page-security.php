<?php
/**
 * Template Name: Security Page
 * Description: Security practices and compliance information
 *
 * @package SiteOptz_Premium
 */

get_header('premium');

// Dynamic metadata
$page_title = 'Security & Compliance - SiteOptz.ai Data Protection | Privacy';
$page_description = 'Learn about SiteOptz.ai security practices, data protection measures, compliance certifications, and privacy policies.';
$canonical_url = home_url('/security/');

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

<main id="primary" class="site-main security-page">
    <div class="container">
        
        <!-- Security Header -->
        <header class="security-header">
            <h1>Security & Compliance</h1>
            <p>Your data security and privacy are our top priorities</p>
        </header>

        <!-- Security Overview -->
        <section class="security-overview">
            <h2>Our Commitment to Security</h2>
            <div class="overview-content">
                <p>At SiteOptz.ai, we implement industry-leading security practices to protect your data and ensure the integrity of our platform. Our comprehensive security program covers infrastructure, application, and operational security.</p>
                
                <div class="security-stats">
                    <div class="stat">
                        <span class="stat-icon">🔒</span>
                        <span class="stat-text">256-bit SSL Encryption</span>
                    </div>
                    <div class="stat">
                        <span class="stat-icon">🛡️</span>
                        <span class="stat-text">SOC 2 Type II Compliant</span>
                    </div>
                    <div class="stat">
                        <span class="stat-icon">🌍</span>
                        <span class="stat-text">GDPR & CCPA Compliant</span>
                    </div>
                    <div class="stat">
                        <span class="stat-icon">⚡</span>
                        <span class="stat-text">99.9% Uptime SLA</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Security Measures -->
        <section class="security-measures">
            <h2>Security Measures</h2>
            <div class="measures-grid">
                
                <div class="measure-card">
                    <div class="measure-icon">🔐</div>
                    <h3>Data Encryption</h3>
                    <p>All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.</p>
                    <ul>
                        <li>End-to-end encryption for all communications</li>
                        <li>Database encryption with rotating keys</li>
                        <li>Encrypted backups and disaster recovery</li>
                    </ul>
                </div>

                <div class="measure-card">
                    <div class="measure-icon">🏗️</div>
                    <h3>Infrastructure Security</h3>
                    <p>Our infrastructure is built on enterprise-grade cloud platforms with multiple security layers.</p>
                    <ul>
                        <li>AWS/GCP enterprise security controls</li>
                        <li>Network segmentation and firewalls</li>
                        <li>DDoS protection and rate limiting</li>
                        <li>Regular security assessments</li>
                    </ul>
                </div>

                <div class="measure-card">
                    <div class="measure-icon">👤</div>
                    <h3>Access Control</h3>
                    <p>Strict access controls ensure only authorized personnel can access sensitive systems.</p>
                    <ul>
                        <li>Multi-factor authentication (MFA)</li>
                        <li>Role-based access control (RBAC)</li>
                        <li>Principle of least privilege</li>
                        <li>Regular access reviews</li>
                    </ul>
                </div>

                <div class="measure-card">
                    <div class="measure-icon">🔍</div>
                    <h3>Monitoring & Detection</h3>
                    <p>24/7 monitoring and advanced threat detection to identify and respond to security incidents.</p>
                    <ul>
                        <li>Real-time security monitoring</li>
                        <li>Automated threat detection</li>
                        <li>Incident response procedures</li>
                        <li>Security information and event management (SIEM)</li>
                    </ul>
                </div>

                <div class="measure-card">
                    <div class="measure-icon">🔄</div>
                    <h3>Backup & Recovery</h3>
                    <p>Comprehensive backup and disaster recovery procedures ensure business continuity.</p>
                    <ul>
                        <li>Automated daily backups</li>
                        <li>Multi-region data replication</li>
                        <li>Disaster recovery testing</li>
                        <li>RTO/RPO commitments</li>
                    </ul>
                </div>

                <div class="measure-card">
                    <div class="measure-icon">🎓</div>
                    <h3>Security Training</h3>
                    <p>Regular security training ensures our team maintains the highest security standards.</p>
                    <ul>
                        <li>Security awareness training</li>
                        <li>Phishing simulation exercises</li>
                        <li>Secure coding practices</li>
                        <li>Incident response training</li>
                    </ul>
                </div>

            </div>
        </section>

        <!-- Compliance Certifications -->
        <section class="compliance-certifications">
            <h2>Compliance & Certifications</h2>
            <div class="certifications-grid">
                
                <div class="certification-card">
                    <div class="cert-logo">SOC 2</div>
                    <h4>SOC 2 Type II</h4>
                    <p>Independently audited for security, availability, processing integrity, confidentiality, and privacy controls.</p>
                    <a href="#" class="view-cert">View Certificate</a>
                </div>

                <div class="certification-card">
                    <div class="cert-logo">GDPR</div>
                    <h4>GDPR Compliant</h4>
                    <p>Full compliance with European General Data Protection Regulation for data privacy and protection.</p>
                    <a href="#" class="view-cert">View Policy</a>
                </div>

                <div class="certification-card">
                    <div class="cert-logo">CCPA</div>
                    <h4>CCPA Compliant</h4>
                    <p>Compliance with California Consumer Privacy Act for enhanced data privacy rights.</p>
                    <a href="#" class="view-cert">View Policy</a>
                </div>

                <div class="certification-card">
                    <div class="cert-logo">ISO</div>
                    <h4>ISO 27001</h4>
                    <p>Information security management system certification (in progress).</p>
                    <a href="#" class="view-cert">Learn More</a>
                </div>

            </div>
        </section>

        <!-- Data Protection -->
        <section class="data-protection">
            <h2>Data Protection & Privacy</h2>
            <div class="protection-content">
                
                <div class="protection-section">
                    <h3>🔒 Data Collection</h3>
                    <p>We collect only the minimum data necessary to provide our services and improve user experience.</p>
                    <ul>
                        <li>Transparent data collection practices</li>
                        <li>Clear consent mechanisms</li>
                        <li>Purpose limitation principles</li>
                        <li>Data minimization approach</li>
                    </ul>
                </div>

                <div class="protection-section">
                    <h3>🗄️ Data Storage</h3>
                    <p>All user data is stored securely with encryption and access controls in compliant data centers.</p>
                    <ul>
                        <li>Encrypted data at rest</li>
                        <li>Secure cloud storage providers</li>
                        <li>Geographic data residency options</li>
                        <li>Regular data retention review</li>
                    </ul>
                </div>

                <div class="protection-section">
                    <h3>🔄 Data Processing</h3>
                    <p>Data processing is limited to legitimate business purposes with appropriate safeguards.</p>
                    <ul>
                        <li>Lawful basis for processing</li>
                        <li>Data processing agreements</li>
                        <li>Third-party vendor assessments</li>
                        <li>Processing activity records</li>
                    </ul>
                </div>

                <div class="protection-section">
                    <h3>👤 Your Rights</h3>
                    <p>You have comprehensive rights regarding your personal data and how it's used.</p>
                    <ul>
                        <li>Right to access your data</li>
                        <li>Right to rectification</li>
                        <li>Right to erasure ("right to be forgotten")</li>
                        <li>Right to data portability</li>
                    </ul>
                </div>

            </div>
        </section>

        <!-- Security Best Practices -->
        <section class="security-best-practices">
            <h2>Security Best Practices for Users</h2>
            <div class="practices-grid">
                
                <div class="practice-item">
                    <h4>🔑 Strong Passwords</h4>
                    <p>Use unique, complex passwords and enable two-factor authentication on your account.</p>
                </div>

                <div class="practice-item">
                    <h4>🔄 Regular Updates</h4>
                    <p>Keep your browser and devices updated with the latest security patches.</p>
                </div>

                <div class="practice-item">
                    <h4>🌐 Secure Networks</h4>
                    <p>Avoid accessing sensitive data on public Wi-Fi networks. Use VPN when necessary.</p>
                </div>

                <div class="practice-item">
                    <h4>📧 Phishing Awareness</h4>
                    <p>Be cautious of suspicious emails. We'll never ask for passwords via email.</p>
                </div>

                <div class="practice-item">
                    <h4>🔐 Session Management</h4>
                    <p>Log out of your account when finished and don't share login credentials.</p>
                </div>

                <div class="practice-item">
                    <h4>📱 Device Security</h4>
                    <p>Use device locks and avoid saving passwords in unsecured browsers.</p>
                </div>

            </div>
        </section>

        <!-- Incident Response -->
        <section class="incident-response">
            <h2>Security Incident Response</h2>
            <div class="response-content">
                <p>We have established procedures for detecting, responding to, and recovering from security incidents.</p>
                
                <div class="response-steps">
                    <div class="step">
                        <div class="step-number">1</div>
                        <h4>Detection</h4>
                        <p>Automated monitoring and threat detection systems identify potential security incidents.</p>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">2</div>
                        <h4>Assessment</h4>
                        <p>Security team assesses the scope, impact, and severity of the incident.</p>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">3</div>
                        <h4>Containment</h4>
                        <p>Immediate steps to contain the incident and prevent further damage.</p>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">4</div>
                        <h4>Communication</h4>
                        <p>Transparent communication with affected users and stakeholders as required.</p>
                    </div>
                    
                    <div class="step">
                        <div class="step-number">5</div>
                        <h4>Recovery</h4>
                        <p>Restore normal operations and implement additional safeguards.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Security Team -->
        <section class="security-contact">
            <h2>Contact Our Security Team</h2>
            <div class="contact-options">
                <div class="contact-method">
                    <h4>🛡️ Security Issues</h4>
                    <p>Report security vulnerabilities or incidents</p>
                    <a href="mailto:security@siteoptz.ai">security@siteoptz.ai</a>
                </div>
                
                <div class="contact-method">
                    <h4>🔒 Privacy Questions</h4>
                    <p>Data protection and privacy inquiries</p>
                    <a href="mailto:privacy@siteoptz.ai">privacy@siteoptz.ai</a>
                </div>
                
                <div class="contact-method">
                    <h4>📋 Compliance</h4>
                    <p>Compliance and certification questions</p>
                    <a href="mailto:compliance@siteoptz.ai">compliance@siteoptz.ai</a>
                </div>
            </div>
        </section>

    </div>
</main>

<style>
.security-page {
    padding: 60px 0;
    background: #f8fafc;
}

.security-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 16px;
    margin: -60px -20px 60px -20px;
}

.security-overview,
.security-measures,
.compliance-certifications,
.data-protection,
.security-best-practices,
.incident-response,
.security-contact {
    margin: 60px 0;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.security-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 30px;
}

.stat {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px;
    background: #f8fafc;
    border-radius: 8px;
}

.stat-icon {
    font-size: 1.5rem;
}

.stat-text {
    font-weight: 600;
    color: #4a5568;
}

.measures-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
}

.measure-card {
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #667eea;
}

.measure-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
}

.measure-card h3 {
    color: #667eea;
    margin-bottom: 10px;
}

.measure-card ul {
    margin-top: 15px;
    color: #4a5568;
}

.certifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.certification-card {
    text-align: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
}

.cert-logo {
    width: 80px;
    height: 80px;
    background: #667eea;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 0.9rem;
    margin: 0 auto 15px;
}

.certification-card h4 {
    color: #667eea;
    margin-bottom: 10px;
}

.view-cert {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    margin-top: 15px;
    display: inline-block;
}

.protection-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.protection-section {
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
}

.protection-section h3 {
    color: #667eea;
    margin-bottom: 10px;
}

.protection-section ul {
    margin-top: 15px;
    color: #4a5568;
}

.practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
}

.practice-item {
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #10b981;
}

.practice-item h4 {
    color: #10b981;
    margin-bottom: 10px;
}

.response-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 30px;
}

.step {
    text-align: center;
    padding: 25px;
    background: #f8fafc;
    border-radius: 12px;
}

.step-number {
    width: 40px;
    height: 40px;
    background: #667eea;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    margin: 0 auto 15px;
}

.step h4 {
    color: #667eea;
    margin-bottom: 10px;
}

.contact-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.contact-method {
    text-align: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;
}

.contact-method h4 {
    color: #667eea;
    margin-bottom: 10px;
}

.contact-method a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    display: block;
    margin-top: 10px;
}

@media (max-width: 768px) {
    .measures-grid {
        grid-template-columns: 1fr;
    }
    
    .protection-content {
        grid-template-columns: 1fr;
    }
    
    .response-steps {
        grid-template-columns: 1fr;
    }
}
</style>

<?php
get_footer('ultra-premium');
?>