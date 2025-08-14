/**
 * SiteOptz Core Admin JavaScript
 * Version: 1.0.0
 */

(function($) {
    'use strict';

    /**
     * Admin functionality
     */
    window.SiteOptzAdmin = {
        
        /**
         * Initialize admin functionality
         */
        init: function() {
            this.bindEvents();
            this.initMetaBoxes();
            this.initImportForm();
        },
        
        /**
         * Bind admin events
         */
        bindEvents: function() {
            // Meta box events
            $(document).on('click', '.siteoptz-add-feature', this.addFeature);
            $(document).on('click', '.siteoptz-remove-feature', this.removeFeature);
            $(document).on('click', '.siteoptz-add-pricing-plan', this.addPricingPlan);
            $(document).on('click', '.siteoptz-remove-pricing-plan', this.removePricingPlan);
            
            // Import form events
            $(document).on('submit', '#siteoptz-import-form', this.handleImport);
            $(document).on('change', '#tools_file', this.validateImportFile);
            
            // Settings events
            $(document).on('click', '.siteoptz-test-connection', this.testConnection);
            $(document).on('change', '.siteoptz-toggle-setting', this.toggleSetting);
        },
        
        /**
         * Initialize meta boxes
         */
        initMetaBoxes: function() {
            // Make meta boxes sortable
            if (typeof postboxes !== 'undefined') {
                postboxes.add_postbox_toggles(pagenow);
            }
            
            // Initialize color pickers
            $('.siteoptz-color-picker').wpColorPicker();
            
            // Initialize date pickers
            $('.siteoptz-date-picker').datepicker({
                dateFormat: 'yy-mm-dd'
            });
        },
        
        /**
         * Add feature to tool
         */
        addFeature: function(e) {
            e.preventDefault();
            
            var $container = $(this).closest('.siteoptz-features-container');
            var $template = $container.find('.siteoptz-feature-template').clone();
            var index = $container.find('.siteoptz-feature-item').length;
            
            $template.removeClass('siteoptz-feature-template')
                     .addClass('siteoptz-feature-item')
                     .show();
            
            // Update field names with proper index
            $template.find('input, textarea').each(function() {
                var name = $(this).attr('name');
                if (name) {
                    $(this).attr('name', name.replace('[0]', '[' + index + ']'));
                }
            });
            
            $container.find('.siteoptz-features-list').append($template);
        },
        
        /**
         * Remove feature from tool
         */
        removeFeature: function(e) {
            e.preventDefault();
            $(this).closest('.siteoptz-feature-item').remove();
        },
        
        /**
         * Add pricing plan
         */
        addPricingPlan: function(e) {
            e.preventDefault();
            
            var $container = $(this).closest('.siteoptz-pricing-container');
            var $template = $container.find('.siteoptz-pricing-template').clone();
            var index = $container.find('.siteoptz-pricing-item').length;
            
            $template.removeClass('siteoptz-pricing-template')
                     .addClass('siteoptz-pricing-item')
                     .show();
            
            // Update field names with proper index
            $template.find('input, select').each(function() {
                var name = $(this).attr('name');
                if (name) {
                    $(this).attr('name', name.replace('[0]', '[' + index + ']'));
                }
            });
            
            $container.find('.siteoptz-pricing-list').append($template);
        },
        
        /**
         * Remove pricing plan
         */
        removePricingPlan: function(e) {
            e.preventDefault();
            $(this).closest('.siteoptz-pricing-item').remove();
        },
        
        /**
         * Initialize import form
         */
        initImportForm: function() {
            // Add drag and drop functionality
            var $dropZone = $('.siteoptz-import-dropzone');
            
            if ($dropZone.length) {
                $dropZone.on('dragover', function(e) {
                    e.preventDefault();
                    $(this).addClass('dragover');
                });
                
                $dropZone.on('dragleave', function(e) {
                    e.preventDefault();
                    $(this).removeClass('dragover');
                });
                
                $dropZone.on('drop', function(e) {
                    e.preventDefault();
                    $(this).removeClass('dragover');
                    
                    var files = e.originalEvent.dataTransfer.files;
                    if (files.length > 0) {
                        $('#tools_file')[0].files = files;
                        SiteOptzAdmin.validateImportFile();
                    }
                });
            }
        },
        
        /**
         * Validate import file
         */
        validateImportFile: function() {
            var file = $('#tools_file')[0].files[0];
            var $feedback = $('.siteoptz-file-feedback');
            
            if (!file) {
                $feedback.empty();
                return;
            }
            
            // Check file type
            if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
                $feedback.html('<div class="error">Please select a valid JSON file.</div>');
                return;
            }
            
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                $feedback.html('<div class="error">File size must be less than 5MB.</div>');
                return;
            }
            
            // File looks good
            $feedback.html(`
                <div class="success">
                    ✓ File selected: ${file.name} (${SiteOptzAdmin.formatFileSize(file.size)})
                </div>
            `);
            
            // Try to preview the file contents
            SiteOptzAdmin.previewImportFile(file);
        },
        
        /**
         * Preview import file
         */
        previewImportFile: function(file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    var data = JSON.parse(e.target.result);
                    var toolsCount = data.tools ? data.tools.length : 0;
                    
                    $('.siteoptz-import-preview').html(`
                        <h4>Import Preview:</h4>
                        <ul>
                            <li>Tools to import: ${toolsCount}</li>
                            <li>File format: Valid JSON</li>
                            <li>Ready to import: ✓</li>
                        </ul>
                    `).show();
                    
                    $('.siteoptz-import-submit').prop('disabled', false);
                } catch (error) {
                    $('.siteoptz-file-feedback').html('<div class="error">Invalid JSON format.</div>');
                }
            };
            reader.readAsText(file);
        },
        
        /**
         * Handle import form submission
         */
        handleImport: function(e) {
            e.preventDefault();
            
            var $form = $(this);
            var $submitBtn = $form.find('.siteoptz-import-submit');
            var $progress = $('.siteoptz-import-progress');
            var formData = new FormData($form[0]);
            
            $submitBtn.prop('disabled', true).text('Importing...');
            $progress.show();
            
            // Start progress animation
            SiteOptzAdmin.animateProgress($progress.find('.siteoptz-progress-fill'), 0, 100, 5000);
            
            $.ajax({
                url: $form.attr('action'),
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    if (response.success) {
                        SiteOptzAdmin.showImportSuccess(response.data);
                        $form[0].reset();
                        $('.siteoptz-import-preview').hide();
                        $('.siteoptz-file-feedback').empty();
                    } else {
                        SiteOptzAdmin.showImportError(response.data.message);
                    }
                },
                error: function(xhr, status, error) {
                    SiteOptzAdmin.showImportError('Network error: ' + error);
                },
                complete: function() {
                    $submitBtn.prop('disabled', false).text('Import Tools');
                    $progress.hide();
                }
            });
        },
        
        /**
         * Show import success message
         */
        showImportSuccess: function(data) {
            var message = `Successfully imported ${data.imported || 0} tools!`;
            if (data.skipped) {
                message += ` (${data.skipped} skipped)`;
            }
            
            $('.siteoptz-import-results').html(`
                <div class="notice notice-success">
                    <p>${message}</p>
                </div>
            `);
        },
        
        /**
         * Show import error message
         */
        showImportError: function(message) {
            $('.siteoptz-import-results').html(`
                <div class="notice notice-error">
                    <p>Import failed: ${message}</p>
                </div>
            `);
        },
        
        /**
         * Animate progress bar
         */
        animateProgress: function($element, start, end, duration) {
            var startTime = Date.now();
            
            function updateProgress() {
                var elapsed = Date.now() - startTime;
                var progress = Math.min(elapsed / duration, 1);
                var value = start + (end - start) * progress;
                
                $element.css('width', value + '%').text(Math.round(value) + '%');
                
                if (progress < 1) {
                    requestAnimationFrame(updateProgress);
                }
            }
            
            updateProgress();
        },
        
        /**
         * Test API connection
         */
        testConnection: function(e) {
            e.preventDefault();
            
            var $button = $(this);
            var $status = $('.siteoptz-connection-status');
            var apiKey = $('#siteoptz_api_key').val();
            
            if (!apiKey) {
                $status.html('<span class="error">Please enter an API key first.</span>');
                return;
            }
            
            $button.prop('disabled', true).text('Testing...');
            $status.html('<span class="loading">Testing connection...</span>');
            
            $.post(ajaxurl, {
                action: 'siteoptz_test_connection',
                api_key: apiKey,
                nonce: $('#siteoptz_nonce').val()
            }, function(response) {
                if (response.success) {
                    $status.html('<span class="success">✓ Connection successful!</span>');
                } else {
                    $status.html('<span class="error">✗ Connection failed: ' + response.data.message + '</span>');
                }
            }).fail(function() {
                $status.html('<span class="error">✗ Network error</span>');
            }).always(function() {
                $button.prop('disabled', false).text('Test Connection');
            });
        },
        
        /**
         * Toggle setting
         */
        toggleSetting: function() {
            var $toggle = $(this);
            var $dependent = $('.' + $toggle.data('dependent'));
            
            if ($toggle.is(':checked')) {
                $dependent.slideDown();
            } else {
                $dependent.slideUp();
            }
        },
        
        /**
         * Format file size
         */
        formatFileSize: function(bytes) {
            if (bytes === 0) return '0 Bytes';
            
            var k = 1024;
            var sizes = ['Bytes', 'KB', 'MB', 'GB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },
        
        /**
         * Show admin notice
         */
        showNotice: function(message, type, dismissible) {
            type = type || 'info';
            dismissible = dismissible !== false;
            
            var dismissClass = dismissible ? ' is-dismissible' : '';
            var $notice = $(`
                <div class="notice notice-${type}${dismissClass}">
                    <p>${message}</p>
                    ${dismissible ? '<button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss</span></button>' : ''}
                </div>
            `);
            
            $('.wrap > h1').after($notice);
            
            if (dismissible) {
                setTimeout(function() {
                    $notice.fadeOut();
                }, 5000);
            }
        },
        
        /**
         * Confirm dialog
         */
        confirm: function(message, callback) {
            if (window.confirm(message)) {
                callback();
            }
        },
        
        /**
         * Initialize dashboard widgets
         */
        initDashboardWidgets: function() {
            // Refresh stats
            $('.siteoptz-refresh-stats').on('click', function(e) {
                e.preventDefault();
                SiteOptzAdmin.refreshDashboardStats();
            });
            
            // Chart initialization
            if (typeof Chart !== 'undefined') {
                SiteOptzAdmin.initCharts();
            }
        },
        
        /**
         * Refresh dashboard stats
         */
        refreshDashboardStats: function() {
            $('.siteoptz-dashboard-stats .stat-box').addClass('loading');
            
            $.get(ajaxurl, {
                action: 'siteoptz_get_dashboard_stats',
                nonce: $('#siteoptz_nonce').val()
            }, function(response) {
                if (response.success) {
                    var stats = response.data;
                    
                    $('.stat-box[data-stat="tools"] h3').text(stats.tools_count);
                    $('.stat-box[data-stat="comparisons"] h3').text(stats.comparisons_count);
                    $('.stat-box[data-stat="leads"] h3').text(stats.leads_count);
                    $('.stat-box[data-stat="quotes"] h3').text(stats.quotes_count);
                }
            }).always(function() {
                $('.siteoptz-dashboard-stats .stat-box').removeClass('loading');
            });
        },
        
        /**
         * Initialize charts
         */
        initCharts: function() {
            // Tools by category chart
            var $categoryChart = $('#siteoptz-category-chart');
            if ($categoryChart.length) {
                // Chart implementation would go here
            }
            
            // Performance metrics chart
            var $performanceChart = $('#siteoptz-performance-chart');
            if ($performanceChart.length) {
                // Chart implementation would go here
            }
        }
    };
    
    /**
     * Initialize when document is ready
     */
    $(document).ready(function() {
        SiteOptzAdmin.init();
        
        // Initialize dashboard widgets if on dashboard
        if ($('.siteoptz-dashboard-stats').length) {
            SiteOptzAdmin.initDashboardWidgets();
        }
    });
    
})(jQuery);