// Affiliate Link Tracking and Analytics for AI Tool Comparison Pages
// SiteOptz.com Implementation

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        // Google Analytics 4 Configuration
        GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX', // Replace with your GA4 Measurement ID
        
        // Affiliate URLs (Replace with actual affiliate links)
        AFFILIATE_LINKS: {
            jasper: {
                trial: 'https://jasper.ai/free-trial?via=siteoptz',
                starter: 'https://jasper.ai/pricing?via=siteoptz&plan=starter',
                boss: 'https://jasper.ai/pricing?via=siteoptz&plan=boss'
            },
            chatgpt: {
                plus: 'https://chat.openai.com/auth/login?next=%2F%3Fmodel%3Dgpt-4',
                team: 'https://openai.com/chatgpt/team',
                enterprise: 'https://openai.com/chatgpt/enterprise'
            }
        },

        // UTM Parameters for tracking
        UTM_PARAMS: {
            source: 'siteoptz',
            medium: 'comparison',
            campaign: 'chatgpt-vs-jasper-ai-2025'
        }
    };

    // Initialize tracking when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeTracking();
        setupAffiliateLinks();
        setupEmailCapture();
        setupScrollTracking();
        setupTimeOnPageTracking();
    });

    // Initialize Google Analytics 4
    function initializeTracking() {
        // Load GA4 if not already loaded
        if (typeof gtag === 'undefined') {
            loadGA4();
        }

        // Track page view
        trackEvent('page_view', {
            page_title: document.title,
            page_location: window.location.href,
            content_group1: 'ai-tool-comparison',
            content_group2: 'chatgpt-vs-jasper'
        });
    }

    // Load Google Analytics 4
    function loadGA4() {
        // Create script tag for GA4
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA4_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        // Initialize gtag
        script.onload = function() {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            
            gtag('js', new Date());
            gtag('config', CONFIG.GA4_MEASUREMENT_ID);
        };
    }

    // Setup affiliate link tracking
    function setupAffiliateLinks() {
        // Track all affiliate link clicks
        document.addEventListener('click', function(event) {
            const target = event.target.closest('a[href]');
            if (!target) return;

            const href = target.getAttribute('href');
            
            // Check if it's an affiliate link
            if (isAffiliateLink(href) || target.hasAttribute('rel') && target.getAttribute('rel').includes('sponsored')) {
                trackAffiliateClick(target, href);
            }
        });

        // Update affiliate links with UTM parameters
        updateAffiliateLinks();
    }

    // Check if URL is an affiliate link
    function isAffiliateLink(url) {
        const affiliateDomains = ['jasper.ai', 'openai.com', 'chat.openai.com'];
        return affiliateDomains.some(domain => url.includes(domain));
    }

    // Track affiliate link clicks
    function trackAffiliateClick(element, url) {
        const toolName = element.textContent.toLowerCase().includes('jasper') ? 'jasper_ai' : 'chatgpt';
        const linkType = determineLinkType(element, url);
        const linkPosition = getLinkPosition(element);

        // Track with Google Analytics
        trackEvent('affiliate_click', {
            tool_name: toolName,
            link_type: linkType,
            link_position: linkPosition,
            link_url: url,
            button_text: element.textContent.trim()
        });

        // Track with custom analytics if needed
        trackCustomEvent('affiliate_click', {
            tool: toolName,
            type: linkType,
            position: linkPosition,
            url: url,
            timestamp: new Date().toISOString()
        });

        // Optional: Send to backend for detailed tracking
        sendToBackend('affiliate_click', {
            tool: toolName,
            linkType: linkType,
            position: linkPosition,
            url: url,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            timestamp: Date.now()
        });
    }

    // Determine link type (trial, pricing, etc.)
    function determineLinkType(element, url) {
        const text = element.textContent.toLowerCase();
        const href = url.toLowerCase();

        if (text.includes('free') || text.includes('trial') || href.includes('trial')) {
            return 'free_trial';
        } else if (text.includes('plus') || href.includes('plus')) {
            return 'plus_plan';
        } else if (text.includes('team') || href.includes('team')) {
            return 'team_plan';
        } else if (text.includes('enterprise') || href.includes('enterprise')) {
            return 'enterprise_plan';
        } else if (text.includes('starter') || href.includes('starter')) {
            return 'starter_plan';
        } else if (text.includes('boss') || href.includes('boss')) {
            return 'boss_plan';
        } else {
            return 'general';
        }
    }

    // Get link position on page
    function getLinkPosition(element) {
        if (element.closest('.comparison-hero')) return 'hero';
        if (element.closest('.comparison-table-section')) return 'comparison_table';
        if (element.closest('.final-cta')) return 'final_cta';
        if (element.closest('.lead-magnet')) return 'lead_magnet';
        if (element.closest('.comparison-content')) return 'content_area';
        return 'other';
    }

    // Update affiliate links with UTM parameters
    function updateAffiliateLinks() {
        const affiliateLinks = document.querySelectorAll('a[rel*="sponsored"], a[href*="jasper.ai"], a[href*="openai.com"]');
        
        affiliateLinks.forEach(link => {
            const url = new URL(link.href);
            
            // Add UTM parameters
            url.searchParams.set('utm_source', CONFIG.UTM_PARAMS.source);
            url.searchParams.set('utm_medium', CONFIG.UTM_PARAMS.medium);
            url.searchParams.set('utm_campaign', CONFIG.UTM_PARAMS.campaign);
            url.searchParams.set('utm_content', determineLinkType(link, link.href));
            
            // Update the link
            link.href = url.toString();
        });
    }

    // Setup email capture tracking
    function setupEmailCapture() {
        const emailForm = document.querySelector('.email-capture');
        if (!emailForm) return;

        emailForm.addEventListener('submit', function(event) {
            // Track email capture attempt
            trackEvent('email_capture_attempt', {
                form_location: 'lead_magnet',
                lead_magnet_type: 'ai_tool_guide'
            });

            // Add delay to ensure tracking completes
            event.preventDefault();
            
            setTimeout(() => {
                emailForm.submit();
            }, 100);
        });

        // Track email input focus
        const emailInput = emailForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('focus', function() {
                trackEvent('email_input_focus', {
                    form_location: 'lead_magnet'
                });
            });
        }
    }

    // Setup scroll tracking
    function setupScrollTracking() {
        let scrollMilestones = [25, 50, 75, 90];
        let trackedMilestones = [];

        window.addEventListener('scroll', throttle(function() {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            scrollMilestones.forEach(milestone => {
                if (scrollPercent >= milestone && !trackedMilestones.includes(milestone)) {
                    trackedMilestones.push(milestone);
                    trackEvent('scroll_milestone', {
                        milestone: milestone,
                        page_type: 'comparison_page'
                    });
                }
            });
        }, 1000));
    }

    // Setup time on page tracking
    function setupTimeOnPageTracking() {
        let timeOnPage = 0;
        const interval = 15000; // Track every 15 seconds

        setInterval(() => {
            timeOnPage += interval;
            
            // Track milestone time intervals
            if (timeOnPage % 60000 === 0) { // Every minute
                trackEvent('time_on_page_milestone', {
                    minutes: timeOnPage / 60000,
                    page_type: 'comparison_page'
                });
            }
        }, interval);

        // Track when user leaves page
        window.addEventListener('beforeunload', function() {
            trackEvent('page_exit', {
                time_on_page_seconds: timeOnPage / 1000,
                page_type: 'comparison_page'
            });
        });
    }

    // Generic event tracking function
    function trackEvent(eventName, parameters = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }

        // Console log for debugging
        console.log('Tracked event:', eventName, parameters);
    }

    // Custom event tracking for additional analytics
    function trackCustomEvent(eventName, data) {
        // Store in localStorage for offline tracking
        const events = JSON.parse(localStorage.getItem('siteoptz_events') || '[]');
        events.push({
            event: eventName,
            data: data,
            timestamp: Date.now(),
            url: window.location.href
        });
        
        // Keep only last 100 events
        if (events.length > 100) {
            events.splice(0, events.length - 100);
        }
        
        localStorage.setItem('siteoptz_events', JSON.stringify(events));
    }

    // Send data to backend (optional)
    function sendToBackend(eventType, data) {
        // Only send if backend endpoint is configured
        const backendUrl = '/wp-admin/admin-ajax.php';
        
        fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                action: 'track_affiliate_event',
                event_type: eventType,
                event_data: JSON.stringify(data),
                nonce: document.querySelector('[name="affiliate_tracking_nonce"]')?.value || ''
            })
        }).catch(error => {
            console.log('Backend tracking error:', error);
        });
    }

    // Utility function to throttle events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // A/B Testing functionality
    function setupABTesting() {
        // Example: Test different CTA button colors
        const variant = Math.random() < 0.5 ? 'blue' : 'green';
        
        if (variant === 'green') {
            document.querySelectorAll('.btn-primary').forEach(btn => {
                btn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            });
        }

        // Track A/B test variant
        trackEvent('ab_test_variant', {
            test_name: 'cta_button_color',
            variant: variant
        });

        // Store variant for session consistency
        sessionStorage.setItem('ab_test_cta_color', variant);
    }

    // Conversion tracking
    function trackConversion(conversionType, value = null) {
        trackEvent('conversion', {
            conversion_type: conversionType,
            conversion_value: value,
            page_type: 'comparison_page'
        });

        // Send conversion to backend for revenue tracking
        sendToBackend('conversion', {
            type: conversionType,
            value: value,
            timestamp: Date.now()
        });
    }

    // Heat mapping integration (optional)
    function initializeHeatmap() {
        // Example: Hotjar integration
        if (typeof hj !== 'undefined') {
            hj('event', 'comparison_page_view');
        }

        // Example: Microsoft Clarity integration
        if (typeof clarity !== 'undefined') {
            clarity('set', 'page_type', 'ai_tool_comparison');
        }
    }

    // Performance monitoring
    function trackPerformance() {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                trackEvent('page_performance', {
                    load_time_ms: loadTime,
                    page_type: 'comparison_page'
                });
            }, 0);
        });
    }

    // Initialize all tracking
    function initializeAllTracking() {
        initializeTracking();
        setupABTesting();
        initializeHeatmap();
        trackPerformance();
    }

    // Export functions for global use
    window.SiteOptzTracking = {
        trackEvent: trackEvent,
        trackConversion: trackConversion,
        trackCustomEvent: trackCustomEvent
    };

})();