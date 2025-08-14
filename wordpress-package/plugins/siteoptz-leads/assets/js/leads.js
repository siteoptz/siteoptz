/**
 * SiteOptz Leads Plugin JavaScript
 * Version: 1.0.0
 */

(function($) {
    'use strict';

    window.SiteOptzLeads = {
        
        init: function() {
            this.bindEvents();
            this.initForms();
            this.initTriggers();
        },
        
        bindEvents: function() {
            $(document).on('submit', '.lead-capture-form', this.handleFormSubmit);
            $(document).on('input', '.form-field input', this.validateField);
            $(document).on('change', '.form-field input', this.validateField);
            $(document).on('click', '.close-lead-form', this.closeForm);
            $(document).on('click', '.lead-form-overlay', this.closeFormOnOverlay);
        },
        
        initForms: function() {
            $('.siteoptz-lead-form').each(function() {
                var $form = $(this);
                SiteOptzLeads.setupForm($form);
            });
        },
        
        setupForm: function($form) {
            // Add any form-specific initialization here
            $form.find('input[type="email"]').attr('autocomplete', 'email');
            $form.find('input[name="name"]').attr('autocomplete', 'name');
            $form.find('input[name="company"]').attr('autocomplete', 'organization');
            $form.find('input[name="phone"]').attr('autocomplete', 'tel');
        },
        
        initTriggers: function() {
            // Initialize exit-intent triggers
            this.initExitIntent();
            
            // Initialize scroll triggers
            this.initScrollTriggers();
            
            // Initialize time-based triggers
            this.initTimeTriggers();
        },
        
        initExitIntent: function() {
            var exitIntentTriggered = false;
            
            $(document).on('mouseleave', function(e) {
                if (e.clientY <= 0 && !exitIntentTriggered) {
                    exitIntentTriggered = true;
                    SiteOptzLeads.triggerExitIntentForm();
                }
            });
        },
        
        initScrollTriggers: function() {
            var scrollTriggered = false;
            var triggerPoint = 0.5; // 50% of page
            
            $(window).on('scroll', function() {
                if (scrollTriggered) return;
                
                var scrollPercent = $(window).scrollTop() / ($(document).height() - $(window).height());
                
                if (scrollPercent >= triggerPoint) {
                    scrollTriggered = true;
                    SiteOptzLeads.triggerScrollForm();
                }
            });
        },
        
        initTimeTriggers: function() {
            // Trigger form after 30 seconds
            setTimeout(function() {
                SiteOptzLeads.triggerTimeForm();
            }, 30000);
        },
        
        triggerExitIntentForm: function() {
            // Show exit-intent lead form if configured
            $('.lead-form-exit-intent').fadeIn();
        },
        
        triggerScrollForm: function() {
            // Show scroll-triggered lead form if configured
            $('.lead-form-scroll-trigger').fadeIn();
        },
        
        triggerTimeForm: function() {
            // Show time-triggered lead form if configured
            $('.lead-form-time-trigger').fadeIn();
        },
        
        handleFormSubmit: function(e) {
            e.preventDefault();
            
            var $form = $(this);
            var $submitBtn = $form.find('.submit-button');
            var $messages = $form.find('.form-messages');
            
            // Validate form
            if (!SiteOptzLeads.validateForm($form)) {
                return false;
            }
            
            // Show loading state
            $submitBtn.prop('disabled', true);
            $submitBtn.find('.button-text').hide();
            $submitBtn.find('.button-loading').show();
            $messages.hide();
            
            // Collect form data
            var formData = {
                action: 'capture_lead',
                nonce: siteoptz_leads.nonce,
                email: $form.find('input[name="email"]').val(),
                name: $form.find('input[name="name"]').val() || '',
                company: $form.find('input[name="company"]').val() || '',
                phone: $form.find('input[name="phone"]').val() || '',
                type: $form.find('input[name="type"]').val(),
                source: $form.find('input[name="source"]').val() || window.location.href,
                gdpr_consent: $form.find('input[name="gdpr_consent"]').is(':checked')
            };
            
            // Submit form
            $.post(siteoptz_leads.ajax_url, formData)
                .done(function(response) {
                    if (response.success) {
                        SiteOptzLeads.showSuccess($form, response.data.message);
                        
                        // Track conversion
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'conversion', {
                                event_category: 'Lead Capture',
                                event_label: formData.type,
                                value: 1
                            });
                        }
                        
                        // Auto-hide form after delay (for modals/floating forms)
                        if ($form.closest('.lead-form-modal, .lead-form-floating').length) {
                            setTimeout(function() {
                                SiteOptzLeads.closeForm($form);
                            }, 3000);
                        }
                        
                    } else {
                        SiteOptzLeads.showError($form, response.data || siteoptz_leads.messages.error);
                    }
                })
                .fail(function() {
                    SiteOptzLeads.showError($form, siteoptz_leads.messages.error);
                })
                .always(function() {
                    // Reset button state
                    $submitBtn.prop('disabled', false);
                    $submitBtn.find('.button-text').show();
                    $submitBtn.find('.button-loading').hide();
                });
        },
        
        validateForm: function($form) {
            var isValid = true;
            var $fields = $form.find('.form-field input[required], .form-field input[data-required="true"]');
            
            $fields.each(function() {
                var $field = $(this);
                var value = $field.val().trim();
                var type = $field.attr('type');
                
                // Remove previous error states
                $field.removeClass('error');
                $field.siblings('.field-error').remove();
                
                // Check if field is required and empty
                if (!value && ($field.prop('required') || $field.data('required'))) {
                    SiteOptzLeads.showFieldError($field, siteoptz_leads.messages.required_field);
                    isValid = false;
                    return;
                }
                
                // Validate email
                if (type === 'email' && value && !SiteOptzLeads.isValidEmail(value)) {
                    SiteOptzLeads.showFieldError($field, siteoptz_leads.messages.email_invalid);
                    isValid = false;
                    return;
                }
                
                // Validate phone (basic)
                if (type === 'tel' && value && !SiteOptzLeads.isValidPhone(value)) {
                    SiteOptzLeads.showFieldError($field, 'Please enter a valid phone number');
                    isValid = false;
                    return;
                }
            });
            
            // Check GDPR consent if required
            var $gdprCheckbox = $form.find('input[name="gdpr_consent"]');
            if ($gdprCheckbox.length && !$gdprCheckbox.is(':checked')) {
                SiteOptzLeads.showFieldError($gdprCheckbox, 'Please accept the privacy policy');
                isValid = false;
            }
            
            return isValid;
        },
        
        validateField: function() {
            var $field = $(this);
            var value = $field.val().trim();
            var type = $field.attr('type');
            
            // Remove previous error state
            $field.removeClass('error');
            $field.siblings('.field-error').remove();
            
            // Skip validation if field is empty and not required
            if (!value && !$field.prop('required') && !$field.data('required')) {
                return;
            }
            
            // Validate email in real-time
            if (type === 'email' && value && !SiteOptzLeads.isValidEmail(value)) {
                SiteOptzLeads.showFieldError($field, siteoptz_leads.messages.email_invalid);
                return;
            }
            
            // Validate phone in real-time
            if (type === 'tel' && value && !SiteOptzLeads.isValidPhone(value)) {
                SiteOptzLeads.showFieldError($field, 'Please enter a valid phone number');
                return;
            }
            
            // Field is valid
            $field.addClass('valid');
        },
        
        showFieldError: function($field, message) {
            $field.addClass('error');
            $field.after('<div class="field-error">' + message + '</div>');
        },
        
        showSuccess: function($form, message) {
            var $messages = $form.find('.form-messages');
            $messages.removeClass('error').addClass('success');
            $messages.html(message || siteoptz_leads.messages.success);
            $messages.show();
            
            // Hide form fields and show success state
            $form.find('.form-fields, .form-actions').fadeOut(300, function() {
                $form.find('.form-title').text('Thank You!');
                $form.addClass('success-state');
            });
        },
        
        showError: function($form, message) {
            var $messages = $form.find('.form-messages');
            $messages.removeClass('success').addClass('error');
            $messages.html(message || siteoptz_leads.messages.error);
            $messages.show();
        },
        
        closeForm: function(target) {
            var $form;
            
            if (target instanceof jQuery) {
                $form = target.closest('.lead-form-overlay, .lead-form-floating');
            } else {
                $form = $(target).closest('.lead-form-overlay, .lead-form-floating');
            }
            
            if ($form.hasClass('lead-form-overlay')) {
                $form.fadeOut(300, function() {
                    $(this).remove();
                });
            } else if ($form.hasClass('lead-form-floating')) {
                $form.slideUp(300, function() {
                    $(this).remove();
                });
            }
        },
        
        closeFormOnOverlay: function(e) {
            if (e.target === this) {
                SiteOptzLeads.closeForm($(this));
            }
        },
        
        isValidEmail: function(email) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        
        isValidPhone: function(phone) {
            // Basic phone validation - allows various formats
            var phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            var cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
            return cleanPhone.length >= 10 && phoneRegex.test(cleanPhone);
        },
        
        // Multi-step form functionality
        initMultiStepForm: function($form) {
            var $steps = $form.find('.form-step');
            var currentStep = 0;
            var totalSteps = $steps.length;
            
            // Show first step
            $steps.eq(0).addClass('active');
            
            // Update progress
            this.updateProgress($form, currentStep, totalSteps);
            
            // Bind step navigation
            $form.on('click', '.step-next', function(e) {
                e.preventDefault();
                
                if (SiteOptzLeads.validateStep($steps.eq(currentStep))) {
                    currentStep++;
                    SiteOptzLeads.showStep($form, currentStep, totalSteps);
                }
            });
            
            $form.on('click', '.step-prev', function(e) {
                e.preventDefault();
                currentStep--;
                SiteOptzLeads.showStep($form, currentStep, totalSteps);
            });
        },
        
        showStep: function($form, step, total) {
            var $steps = $form.find('.form-step');
            
            // Hide all steps
            $steps.removeClass('active');
            
            // Show current step
            $steps.eq(step).addClass('active');
            
            // Update progress
            this.updateProgress($form, step, total);
            
            // Update navigation buttons
            $form.find('.step-prev').prop('disabled', step === 0);
            $form.find('.step-next').toggle(step < total - 1);
            $form.find('.submit-button').toggle(step === total - 1);
        },
        
        updateProgress: function($form, current, total) {
            var $progress = $form.find('.progress-step');
            
            $progress.each(function(index) {
                var $step = $(this);
                
                if (index < current) {
                    $step.addClass('completed').removeClass('active');
                } else if (index === current) {
                    $step.addClass('active').removeClass('completed');
                } else {
                    $step.removeClass('active completed');
                }
            });
        },
        
        validateStep: function($step) {
            var isValid = true;
            var $fields = $step.find('input[required], input[data-required="true"]');
            
            $fields.each(function() {
                if (!SiteOptzLeads.validateField.call(this)) {
                    isValid = false;
                }
            });
            
            return isValid;
        }
    };
    
    // Initialize when document is ready
    $(document).ready(function() {
        SiteOptzLeads.init();
    });
    
    // Initialize multi-step forms
    $('.multi-step-form').each(function() {
        SiteOptzLeads.initMultiStepForm($(this));
    });
    
})(jQuery);