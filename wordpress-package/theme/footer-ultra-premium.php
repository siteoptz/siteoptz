<?php
/**
 * The template for displaying the footer for SiteOptz.ai Ultra Premium Theme
 *
 * Contains the closing of the #content div and all content after.
 * Premium footer with advanced features, newsletter signup, and social proof.
 *
 * @package SiteOptz_Premium
 * @version 1.0.0
 */
?>

    </div><!-- #content -->

    <!-- Newsletter CTA Section (above footer) -->
    <?php if (get_theme_mod('show_newsletter_cta', true)) : ?>
    <section class="newsletter-cta-section">
        <div class="container">
            <div class="newsletter-cta-content">
                <div class="newsletter-cta-text">
                    <h3 class="newsletter-cta-title">
                        <?php echo esc_html(get_theme_mod('newsletter_cta_title', 'Stay Ahead with AI Insights')); ?>
                    </h3>
                    <p class="newsletter-cta-description">
                        <?php echo esc_html(get_theme_mod('newsletter_cta_description', 'Get weekly updates on the latest AI tools, trends, and exclusive comparison reports delivered to your inbox.')); ?>
                    </p>
                </div>
                <div class="newsletter-signup-form">
                    <form class="newsletter-form" id="footer-newsletter">
                        <div class="newsletter-input-group">
                            <input type="email" 
                                   class="newsletter-input" 
                                   placeholder="<?php echo esc_attr(get_theme_mod('newsletter_placeholder', 'Enter your email address')); ?>" 
                                   required>
                            <button type="submit" class="newsletter-submit">
                                <span class="button-text"><?php echo esc_html(get_theme_mod('newsletter_button_text', 'Subscribe')); ?></span>
                                <span class="button-loading" style="display: none;">
                                    <i class="fas fa-spinner fa-spin"></i>
                                </span>
                            </button>
                        </div>
                        <div class="newsletter-privacy">
                            <small>
                                <i class="fas fa-shield-alt"></i>
                                <?php echo esc_html(get_theme_mod('newsletter_privacy_text', 'No spam, unsubscribe anytime. Read our privacy policy.')); ?>
                            </small>
                        </div>
                        <div class="newsletter-message" style="display: none;"></div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <?php endif; ?>

    <!-- Main Footer -->
    <footer id="colophon" class="site-footer premium-footer" role="contentinfo">
        <div class="container">
            
            <!-- Footer Top Section -->
            <div class="footer-top">
                
                <!-- Company Branding & Info -->
                <div class="footer-brand">
                    <div class="footer-logo">
                        <?php if (has_custom_logo()) : ?>
                            <div class="site-logo">
                                <?php the_custom_logo(); ?>
                            </div>
                        <?php else : ?>
                            <div class="logo-container">
                                <div class="logo-icon">
                                    <i class="fas fa-robot"></i>
                                </div>
                                <span class="logo-text"><?php bloginfo('name'); ?></span>
                            </div>
                        <?php endif; ?>
                    </div>
                    
                    <div class="footer-tagline">
                        <h3><?php echo esc_html(get_theme_mod('footer_company_title', 'SiteOptz.ai')); ?></h3>
                        <p class="footer-description">
                            <?php echo esc_html(get_theme_mod('footer_company_description', 'The most comprehensive AI tools comparison platform. Make informed decisions with data-driven insights and personalized recommendations.')); ?>
                        </p>
                    </div>
                    
                    <!-- Trust Badges -->
                    <div class="footer-trust-badges">
                        <div class="trust-badge">
                            <i class="fas fa-shield-check"></i>
                            <span>SOC 2 Compliant</span>
                        </div>
                        <div class="trust-badge">
                            <i class="fas fa-lock"></i>
                            <span>256-bit SSL</span>
                        </div>
                        <div class="trust-badge">
                            <i class="fas fa-award"></i>
                            <span>ISO 27001</span>
                        </div>
                    </div>
                    
                    <!-- Social Links -->
                    <div class="footer-social">
                        <h4 class="social-title"><?php echo esc_html(get_theme_mod('footer_social_title', 'Follow Us')); ?></h4>
                        <div class="social-links">
                            <?php 
                            $social_links = array(
                                'twitter' => array(
                                    'url' => get_theme_mod('social_twitter', '#'),
                                    'icon' => 'fab fa-twitter',
                                    'label' => 'Twitter'
                                ),
                                'linkedin' => array(
                                    'url' => get_theme_mod('social_linkedin', '#'),
                                    'icon' => 'fab fa-linkedin',
                                    'label' => 'LinkedIn'
                                ),
                                'github' => array(
                                    'url' => get_theme_mod('social_github', '#'),
                                    'icon' => 'fab fa-github',
                                    'label' => 'GitHub'
                                ),
                                'discord' => array(
                                    'url' => get_theme_mod('social_discord', '#'),
                                    'icon' => 'fab fa-discord',
                                    'label' => 'Discord'
                                ),
                                'youtube' => array(
                                    'url' => get_theme_mod('social_youtube', ''),
                                    'icon' => 'fab fa-youtube',
                                    'label' => 'YouTube'
                                ),
                                'facebook' => array(
                                    'url' => get_theme_mod('social_facebook', ''),
                                    'icon' => 'fab fa-facebook',
                                    'label' => 'Facebook'
                                ),
                            );
                            
                            foreach ($social_links as $platform => $data) :
                                if (!empty($data['url'])) :
                            ?>
                                <a href="<?php echo esc_url($data['url']); ?>" 
                                   class="social-link social-<?php echo esc_attr($platform); ?>" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   aria-label="<?php echo esc_attr($data['label']); ?>">
                                    <i class="<?php echo esc_attr($data['icon']); ?>"></i>
                                </a>
                            <?php 
                                endif;
                            endforeach; 
                            ?>
                        </div>
                    </div>
                </div>
                
                <!-- Footer Navigation Columns -->
                <div class="footer-navigation">
                    
                    <!-- AI Tools Column -->
                    <div class="footer-column footer-tools">
                        <h4 class="footer-column-title">
                            <i class="fas fa-brain"></i>
                            <?php echo esc_html(get_theme_mod('footer_tools_title', 'AI Tools')); ?>
                        </h4>
                        <?php if (has_nav_menu('footer-tools')) : ?>
                            <?php
                            wp_nav_menu(array(
                                'theme_location' => 'footer-tools',
                                'menu_class'     => 'footer-links',
                                'container'      => false,
                                'depth'          => 1,
                            ));
                            ?>
                        <?php else : ?>
                            <ul class="footer-links">
                                <li><a href="<?php echo esc_url(home_url('/category/text-generation')); ?>">
                                    <i class="fas fa-edit"></i> Text Generation
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/category/image-creation')); ?>">
                                    <i class="fas fa-image"></i> Image Creation
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/category/code-generation')); ?>">
                                    <i class="fas fa-code"></i> Code Generation
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/category/voice-audio')); ?>">
                                    <i class="fas fa-microphone"></i> Voice & Audio
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/category/business-intelligence')); ?>">
                                    <i class="fas fa-chart-line"></i> Business Intelligence
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/category/automation')); ?>">
                                    <i class="fas fa-robot"></i> Automation Tools
                                </a></li>
                            </ul>
                        <?php endif; ?>
                    </div>
                    
                    <!-- Resources Column -->
                    <div class="footer-column footer-resources">
                        <h4 class="footer-column-title">
                            <i class="fas fa-book"></i>
                            <?php echo esc_html(get_theme_mod('footer_resources_title', 'Resources')); ?>
                        </h4>
                        <?php if (has_nav_menu('footer-resources')) : ?>
                            <?php
                            wp_nav_menu(array(
                                'theme_location' => 'footer-resources',
                                'menu_class'     => 'footer-links',
                                'container'      => false,
                                'depth'          => 1,
                            ));
                            ?>
                        <?php else : ?>
                            <ul class="footer-links">
                                <li><a href="<?php echo esc_url(home_url('/ai-tool-guide')); ?>">
                                    <i class="fas fa-compass"></i> AI Tool Guide
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/comparison-charts')); ?>">
                                    <i class="fas fa-chart-bar"></i> Comparison Charts
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/pricing-calculator')); ?>">
                                    <i class="fas fa-calculator"></i> Pricing Calculator
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/api-documentation')); ?>">
                                    <i class="fas fa-code"></i> API Documentation
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/blog')); ?>">
                                    <i class="fas fa-blog"></i> Blog & Insights
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/case-studies')); ?>">
                                    <i class="fas fa-file-alt"></i> Case Studies
                                </a></li>
                            </ul>
                        <?php endif; ?>
                    </div>
                    
                    <!-- Company Column -->
                    <div class="footer-column footer-company">
                        <h4 class="footer-column-title">
                            <i class="fas fa-building"></i>
                            <?php echo esc_html(get_theme_mod('footer_company_links_title', 'Company')); ?>
                        </h4>
                        <?php if (has_nav_menu('footer-company')) : ?>
                            <?php
                            wp_nav_menu(array(
                                'theme_location' => 'footer-company',
                                'menu_class'     => 'footer-links',
                                'container'      => false,
                                'depth'          => 1,
                            ));
                            ?>
                        <?php else : ?>
                            <ul class="footer-links">
                                <li><a href="<?php echo esc_url(home_url('/about')); ?>">
                                    <i class="fas fa-info-circle"></i> About Us
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/careers')); ?>">
                                    <i class="fas fa-briefcase"></i> Careers
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/contact')); ?>">
                                    <i class="fas fa-envelope"></i> Contact
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/press')); ?>">
                                    <i class="fas fa-newspaper"></i> Press Kit
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/partnerships')); ?>">
                                    <i class="fas fa-handshake"></i> Partnerships
                                </a></li>
                                <li><a href="<?php echo esc_url(home_url('/investors')); ?>">
                                    <i class="fas fa-chart-pie"></i> Investors
                                </a></li>
                            </ul>
                        <?php endif; ?>
                    </div>
                    
                    <!-- Support Column -->
                    <div class="footer-column footer-support">
                        <h4 class="footer-column-title">
                            <i class="fas fa-life-ring"></i>
                            <?php echo esc_html(get_theme_mod('footer_support_title', 'Support')); ?>
                        </h4>
                        <ul class="footer-links">
                            <li><a href="<?php echo esc_url(home_url('/help-center')); ?>">
                                <i class="fas fa-question-circle"></i> Help Center
                            </a></li>
                            <li><a href="<?php echo esc_url(home_url('/documentation')); ?>">
                                <i class="fas fa-file-text"></i> Documentation
                            </a></li>
                            <li><a href="<?php echo esc_url(home_url('/community')); ?>">
                                <i class="fas fa-users"></i> Community
                            </a></li>
                            <li><a href="<?php echo esc_url(home_url('/status')); ?>">
                                <i class="fas fa-heartbeat"></i> System Status
                            </a></li>
                            <li><a href="<?php echo esc_url(home_url('/security')); ?>">
                                <i class="fas fa-shield-alt"></i> Security
                            </a></li>
                            <li><a href="<?php echo esc_url(home_url('/feedback')); ?>">
                                <i class="fas fa-comment"></i> Send Feedback
                            </a></li>
                        </ul>
                        
                        <!-- Support Contact Info -->
                        <div class="support-contact">
                            <div class="support-item">
                                <i class="fas fa-envelope"></i>
                                <div>
                                    <strong>Email Support</strong>
                                    <a href="mailto:support@siteoptz.ai">support@siteoptz.ai</a>
                                </div>
                            </div>
                            <div class="support-item">
                                <i class="fas fa-clock"></i>
                                <div>
                                    <strong>Response Time</strong>
                                    <span>< 2 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
            <!-- Footer Stats Section -->
            <?php if (get_theme_mod('show_footer_stats', true)) : ?>
            <div class="footer-stats">
                <div class="footer-stats-grid">
                    <div class="footer-stat">
                        <div class="stat-number"><?php echo esc_html(get_theme_mod('footer_stat_1_number', '1000+')); ?></div>
                        <div class="stat-label"><?php echo esc_html(get_theme_mod('footer_stat_1_label', 'AI Tools Tracked')); ?></div>
                    </div>
                    <div class="footer-stat">
                        <div class="stat-number"><?php echo esc_html(get_theme_mod('footer_stat_2_number', '50K+')); ?></div>
                        <div class="stat-label"><?php echo esc_html(get_theme_mod('footer_stat_2_label', 'Active Users')); ?></div>
                    </div>
                    <div class="footer-stat">
                        <div class="stat-number"><?php echo esc_html(get_theme_mod('footer_stat_3_number', '1M+')); ?></div>
                        <div class="stat-label"><?php echo esc_html(get_theme_mod('footer_stat_3_label', 'Comparisons Made')); ?></div>
                    </div>
                    <div class="footer-stat">
                        <div class="stat-number"><?php echo esc_html(get_theme_mod('footer_stat_4_number', '99.9%')); ?></div>
                        <div class="stat-label"><?php echo esc_html(get_theme_mod('footer_stat_4_label', 'Uptime')); ?></div>
                    </div>
                </div>
            </div>
            <?php endif; ?>
            
            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <div class="footer-bottom-left">
                    <div class="copyright">
                        <?php
                        $copyright_text = get_theme_mod('footer_copyright', '© 2024 SiteOptz.ai. All rights reserved.');
                        echo esc_html($copyright_text);
                        ?>
                    </div>
                    <div class="footer-legal-links">
                        <a href="<?php echo esc_url(home_url('/privacy-policy')); ?>">Privacy Policy</a>
                        <a href="<?php echo esc_url(home_url('/terms-of-service')); ?>">Terms of Service</a>
                        <a href="<?php echo esc_url(home_url('/cookie-policy')); ?>">Cookie Policy</a>
                        <a href="<?php echo esc_url(home_url('/gdpr')); ?>">GDPR</a>
                    </div>
                </div>
                
                <div class="footer-bottom-right">
                    <div class="footer-credit">
                        <!-- TEST: If you see this, the file is being used -->
                        TEST MODE: Empowering businesses with AI tools comparison
                    </div>
                    
                    <!-- Language Selector -->
                    <?php if (get_theme_mod('show_language_selector', false)) : ?>
                    <div class="language-selector">
                        <i class="fas fa-globe"></i>
                        <select class="language-select" onchange="window.location.href=this.value">
                            <option value="">English</option>
                            <option value="/es/">Español</option>
                            <option value="/fr/">Français</option>
                            <option value="/de/">Deutsch</option>
                        </select>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
            
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button id="back-to-top" class="back-to-top-btn" aria-label="Back to top">
        <i class="fas fa-chevron-up"></i>
    </button>

</div><!-- #page -->

<!-- Additional Premium Styles for Footer -->
<style>
/* Newsletter CTA Section */
.newsletter-cta-section {
    background: var(--gradient-primary);
    color: var(--neutral-0);
    padding: var(--space-16) 0;
    position: relative;
    overflow: hidden;
}

.newsletter-cta-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="newsletter-gradient" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(255,255,255,0.1)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient></defs><circle cx="100" cy="100" r="80" fill="url(%23newsletter-gradient)"/><circle cx="900" cy="200" r="120" fill="url(%23newsletter-gradient)"/></svg>') no-repeat center;
    background-size: cover;
    opacity: 0.3;
}

.newsletter-cta-content {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
}

.newsletter-cta-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--space-4);
    line-height: 1.2;
}

.newsletter-cta-description {
    font-size: var(--text-lg);
    opacity: 0.9;
    line-height: 1.6;
}

.newsletter-signup-form {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.newsletter-input-group {
    display: flex;
    gap: var(--space-3);
    margin-bottom: var(--space-3);
}

.newsletter-input {
    flex: 1;
    padding: var(--space-4);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--radius-xl);
    background: rgba(255, 255, 255, 0.1);
    color: var(--neutral-0);
    font-size: var(--text-base);
    backdrop-filter: blur(10px);
}

.newsletter-input::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

.newsletter-input:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
}

.newsletter-submit {
    background: var(--neutral-0);
    color: var(--brand-primary);
    border: none;
    padding: var(--space-4) var(--space-6);
    border-radius: var(--radius-xl);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
    white-space: nowrap;
}

.newsletter-submit:hover {
    background: var(--neutral-100);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.newsletter-privacy {
    text-align: center;
    opacity: 0.8;
}

.newsletter-privacy i {
    margin-right: var(--space-1);
    color: var(--color-success);
}

.newsletter-message {
    margin-top: var(--space-3);
    padding: var(--space-3);
    border-radius: var(--radius-lg);
    text-align: center;
    font-size: var(--text-sm);
}

.newsletter-message.success {
    background: rgba(16, 185, 129, 0.2);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: var(--color-success);
}

.newsletter-message.error {
    background: rgba(239, 68, 68, 0.2);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: var(--color-error);
}

/* Premium Footer Styles */
.premium-footer {
    background: var(--neutral-900);
    color: var(--neutral-300);
    padding: var(--space-20) 0 0;
    margin-top: var(--space-24);
}

.footer-top {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--space-16);
    margin-bottom: var(--space-16);
    padding-bottom: var(--space-16);
    border-bottom: 1px solid var(--neutral-700);
}

.footer-brand {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
}

.footer-logo .logo-container {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
}

.footer-logo .logo-icon {
    width: 48px;
    height: 48px;
    background: var(--gradient-primary);
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--neutral-0);
    font-size: var(--text-xl);
}

.footer-logo .logo-text {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--neutral-0);
}

.footer-tagline h3 {
    color: var(--neutral-0);
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--space-3);
}

.footer-description {
    line-height: 1.7;
    color: var(--neutral-400);
    font-size: var(--text-base);
}

.footer-trust-badges {
    display: flex;
    gap: var(--space-6);
    flex-wrap: wrap;
}

.trust-badge {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    background: var(--neutral-800);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-lg);
    border: 1px solid var(--neutral-700);
    font-size: var(--text-sm);
}

.trust-badge i {
    color: var(--color-success);
}

.footer-social {
    border-top: 1px solid var(--neutral-700);
    padding-top: var(--space-6);
}

.social-title {
    color: var(--neutral-0);
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    margin-bottom: var(--space-4);
}

.social-links {
    display: flex;
    gap: var(--space-3);
    flex-wrap: wrap;
}

.social-link {
    width: 48px;
    height: 48px;
    background: var(--neutral-800);
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--neutral-400);
    text-decoration: none;
    transition: all var(--transition-base);
    border: 1px solid var(--neutral-700);
    position: relative;
    overflow: hidden;
}

.social-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--gradient-primary);
    transition: left var(--duration-normal);
    z-index: 0;
}

.social-link i {
    position: relative;
    z-index: 1;
    transition: color var(--transition-base);
}

.social-link:hover::before {
    left: 0;
}

.social-link:hover {
    color: var(--neutral-0);
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
    text-decoration: none;
}

.footer-navigation {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-8);
}

.footer-column-title {
    color: var(--neutral-0);
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    margin-bottom: var(--space-6);
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.footer-column-title i {
    color: var(--brand-primary);
    font-size: var(--text-base);
}

.footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-links li {
    margin-bottom: var(--space-3);
}

.footer-links a {
    color: var(--neutral-400);
    text-decoration: none;
    transition: all var(--transition-base);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) 0;
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
}

.footer-links a i {
    width: 16px;
    color: var(--neutral-500);
    transition: color var(--transition-base);
}

.footer-links a:hover {
    color: var(--neutral-0);
    text-decoration: none;
    padding-left: var(--space-2);
}

.footer-links a:hover i {
    color: var(--brand-primary);
}

.support-contact {
    margin-top: var(--space-8);
    padding-top: var(--space-6);
    border-top: 1px solid var(--neutral-700);
}

.support-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
}

.support-item i {
    width: 20px;
    color: var(--brand-primary);
    flex-shrink: 0;
}

.support-item div {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
}

.support-item strong {
    color: var(--neutral-0);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
}

.support-item a,
.support-item span {
    color: var(--neutral-400);
    font-size: var(--text-sm);
    text-decoration: none;
}

.support-item a:hover {
    color: var(--brand-primary);
}

.footer-stats {
    background: var(--neutral-800);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
    margin-bottom: var(--space-12);
    border: 1px solid var(--neutral-700);
}

.footer-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-8);
}

.footer-stat {
    text-align: center;
}

.stat-number {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    color: var(--neutral-0);
    display: block;
    line-height: 1;
    margin-bottom: var(--space-2);
}

.stat-label {
    font-size: var(--text-sm);
    color: var(--neutral-400);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-8) 0;
    border-top: 1px solid var(--neutral-700);
    flex-wrap: wrap;
    gap: var(--space-4);
}

.footer-bottom-left,
.footer-bottom-right {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    flex-wrap: wrap;
}

.copyright {
    color: var(--neutral-400);
    font-size: var(--text-sm);
}

.footer-legal-links {
    display: flex;
    gap: var(--space-4);
    flex-wrap: wrap;
}

.footer-legal-links a {
    color: var(--neutral-500);
    text-decoration: none;
    font-size: var(--text-sm);
    transition: color var(--transition-base);
}

.footer-legal-links a:hover {
    color: var(--neutral-0);
    text-decoration: none;
}

.footer-credit {
    color: var(--neutral-400);
    font-size: var(--text-sm);
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.language-selector {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--neutral-400);
    font-size: var(--text-sm);
}

.language-select {
    background: var(--neutral-800);
    color: var(--neutral-300);
    border: 1px solid var(--neutral-700);
    border-radius: var(--radius-md);
    padding: var(--space-2);
    font-size: var(--text-sm);
}

.back-to-top-btn {
    position: fixed;
    bottom: var(--space-8);
    right: var(--space-8);
    width: 56px;
    height: 56px;
    background: var(--gradient-primary);
    color: var(--neutral-0);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-base);
    z-index: var(--z-fixed);
    box-shadow: var(--shadow-lg);
}

.back-to-top-btn.visible {
    opacity: 1;
    visibility: visible;
}

.back-to-top-btn:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-glow);
}

/* Responsive Design */
@media (max-width: 1024px) {
    .footer-top {
        grid-template-columns: 1fr;
        gap: var(--space-12);
    }
    
    .footer-navigation {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-6);
    }
    
    .newsletter-cta-content {
        grid-template-columns: 1fr;
        gap: var(--space-8);
        text-align: center;
    }
    
    .footer-stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-6);
    }
}

@media (max-width: 768px) {
    .footer-navigation {
        grid-template-columns: 1fr;
        gap: var(--space-8);
    }
    
    .footer-stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-4);
    }
    
    .footer-bottom {
        flex-direction: column;
        text-align: center;
        gap: var(--space-6);
    }
    
    .footer-bottom-left,
    .footer-bottom-right {
        justify-content: center;
        flex-direction: column;
        gap: var(--space-4);
    }
    
    .newsletter-input-group {
        flex-direction: column;
    }
    
    .newsletter-submit {
        width: 100%;
    }
    
    .trust-badge {
        font-size: var(--text-xs);
        padding: var(--space-1) var(--space-3);
    }
    
    .social-links {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .footer-stats-grid {
        grid-template-columns: 1fr;
        gap: var(--space-4);
    }
    
    .newsletter-cta-section {
        padding: var(--space-12) 0;
    }
    
    .newsletter-signup-form {
        padding: var(--space-6);
    }
    
    .footer-trust-badges {
        justify-content: center;
        gap: var(--space-3);
    }
    
    .premium-footer {
        padding: var(--space-16) 0 0;
    }
}
</style>

<!-- Enhanced JavaScript for Footer -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter form submission
    const newsletterForm = document.getElementById('footer-newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const submitBtn = this.querySelector('.newsletter-submit');
            const messageDiv = this.querySelector('.newsletter-message');
            const buttonText = submitBtn.querySelector('.button-text');
            const buttonLoading = submitBtn.querySelector('.button-loading');
            
            // Show loading state
            buttonText.style.display = 'none';
            buttonLoading.style.display = 'inline-block';
            submitBtn.disabled = true;
            messageDiv.style.display = 'none';
            
            // Simulate API call (replace with actual implementation)
            setTimeout(() => {
                // Reset button state
                buttonText.style.display = 'inline-block';
                buttonLoading.style.display = 'none';
                submitBtn.disabled = false;
                
                // Show success message
                messageDiv.className = 'newsletter-message success';
                messageDiv.textContent = 'Thank you for subscribing! Check your email for confirmation.';
                messageDiv.style.display = 'block';
                
                // Clear form
                emailInput.value = '';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            }, 2000);
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate stats on scroll
    const footerStats = document.querySelectorAll('.stat-number');
    if (footerStats.length > 0 && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const finalValue = stat.textContent;
                    const isNumber = !isNaN(parseFloat(finalValue));
                    
                    if (isNumber) {
                        animateCounter(stat, 0, parseFloat(finalValue), 2000);
                    }
                    
                    statsObserver.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });
        
        footerStats.forEach(stat => statsObserver.observe(stat));
    }
    
    // Counter animation function
    function animateCounter(element, start, end, duration) {
        const range = end - start;
        const startTime = performance.now();
        const suffix = element.textContent.replace(/[0-9.,]/g, '');
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            const current = start + (range * easeProgress);
            
            element.textContent = Math.floor(current).toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = end.toLocaleString() + suffix;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Social link hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
</script>

<?php wp_footer(); ?>

</body>
</html>