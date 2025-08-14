<?php
/**
 * The template for displaying the footer for SiteOptz.ai Premium Theme
 *
 * Contains the closing of the #content div and all content after.
 *
 * @package SiteOptz_Premium
 * @version 1.0.0
 */
?>

    </div><!-- #content -->

    <!-- Footer -->
    <footer id="colophon" class="site-footer" role="contentinfo">
        <div class="container">
            
            <!-- Footer Content -->
            <div class="footer-content">
                
                <!-- Company Info Section -->
                <div class="footer-section footer-company">
                    <h3><?php echo esc_html(get_theme_mod('footer_company_title', 'SiteOptz.ai')); ?></h3>
                    <p><?php echo esc_html(get_theme_mod('footer_company_description', 'The most comprehensive AI tools comparison platform. Make informed decisions with data-driven insights.')); ?></p>
                    
                    <!-- Social Links -->
                    <div class="social-links">
                        <?php 
                        $social_links = array(
                            'twitter' => get_theme_mod('social_twitter', '#'),
                            'linkedin' => get_theme_mod('social_linkedin', '#'),
                            'github' => get_theme_mod('social_github', '#'),
                            'discord' => get_theme_mod('social_discord', '#'),
                            'youtube' => get_theme_mod('social_youtube', ''),
                            'facebook' => get_theme_mod('social_facebook', ''),
                        );
                        
                        foreach ($social_links as $platform => $url) :
                            if (!empty($url)) :
                        ?>
                            <a href="<?php echo esc_url($url); ?>" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr(ucfirst($platform)); ?>">
                                <i class="fab fa-<?php echo esc_attr($platform); ?>"></i>
                            </a>
                        <?php 
                            endif;
                        endforeach; 
                        ?>
                    </div>
                </div>
                
                <!-- AI Tools Section -->
                <div class="footer-section footer-tools">
                    <h3><?php echo esc_html(get_theme_mod('footer_tools_title', 'AI Tools')); ?></h3>
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
                            <li><a href="<?php echo esc_url(home_url('/category/text-generation')); ?>">Text Generation</a></li>
                            <li><a href="<?php echo esc_url(home_url('/category/image-creation')); ?>">Image Creation</a></li>
                            <li><a href="<?php echo esc_url(home_url('/category/code-generation')); ?>">Code Generation</a></li>
                            <li><a href="<?php echo esc_url(home_url('/category/voice-audio')); ?>">Voice & Audio</a></li>
                            <li><a href="<?php echo esc_url(home_url('/category/business-intelligence')); ?>">Business Intelligence</a></li>
                        </ul>
                    <?php endif; ?>
                </div>
                
                <!-- Resources Section -->
                <div class="footer-section footer-resources">
                    <h3><?php echo esc_html(get_theme_mod('footer_resources_title', 'Resources')); ?></h3>
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
                            <li><a href="<?php echo esc_url(home_url('/ai-tool-guide')); ?>">AI Tool Guide</a></li>
                            <li><a href="<?php echo esc_url(home_url('/comparison-charts')); ?>">Comparison Charts</a></li>
                            <li><a href="<?php echo esc_url(home_url('/pricing-calculator')); ?>">Pricing Calculator</a></li>
                            <li><a href="<?php echo esc_url(home_url('/api-documentation')); ?>">API Documentation</a></li>
                            <li><a href="<?php echo esc_url(home_url('/blog')); ?>">Blog</a></li>
                        </ul>
                    <?php endif; ?>
                </div>
                
                <!-- Company Section -->
                <div class="footer-section footer-company-links">
                    <h3><?php echo esc_html(get_theme_mod('footer_company_links_title', 'Company')); ?></h3>
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
                            <li><a href="<?php echo esc_url(home_url('/about')); ?>">About Us</a></li>
                            <li><a href="<?php echo esc_url(home_url('/contact')); ?>">Contact</a></li>
                            <li><a href="<?php echo esc_url(home_url('/privacy-policy')); ?>">Privacy Policy</a></li>
                            <li><a href="<?php echo esc_url(home_url('/terms-of-service')); ?>">Terms of Service</a></li>
                            <li><a href="<?php echo esc_url(home_url('/support')); ?>">Support</a></li>
                        </ul>
                    <?php endif; ?>
                </div>
                
            </div>
            
            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <div class="copyright">
                    <?php
                    $copyright_text = get_theme_mod('footer_copyright', '© 2024 SiteOptz.ai. All rights reserved.');
                    echo esc_html($copyright_text);
                    ?>
                </div>
                <div class="footer-credit">
                    Empowering businesses with AI tools comparison
                </div>
            </div>
            
        </div>
    </footer>

</div><!-- #page -->

<!-- Scripts -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('masthead');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all animation elements
    const animateElements = document.querySelectorAll('.fade-in, .slide-up, .ai-card, .tool-card, .section-header');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Mobile menu toggle (for future implementation)
    const menuToggle = document.querySelector('.menu-toggle');
    const primaryMenu = document.querySelector('#primary-menu');
    
    if (menuToggle && primaryMenu) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            primaryMenu.classList.toggle('toggled');
        });
    }

    // Form enhancements
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // Add focus classes
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (this.value) {
                    this.parentElement.classList.add('filled');
                } else {
                    this.parentElement.classList.remove('filled');
                }
            });
        });
    });

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.hero-button-primary, .hero-button-secondary, .header-cta');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Google Analytics (if ID is provided)
<?php if (get_theme_mod('google_analytics_id')) : ?>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '<?php echo esc_js(get_theme_mod('google_analytics_id')); ?>');
<?php endif; ?>
</script>

<?php if (get_theme_mod('google_analytics_id')) : ?>
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo esc_attr(get_theme_mod('google_analytics_id')); ?>"></script>
<?php endif; ?>

<?php wp_footer(); ?>

</body>
</html>