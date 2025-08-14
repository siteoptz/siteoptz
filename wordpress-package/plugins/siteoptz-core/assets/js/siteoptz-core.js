/**
 * SiteOptz Core Plugin JavaScript
 * Version: 1.0.0
 */

(function($) {
    'use strict';

    /**
     * Main SiteOptz object
     */
    window.SiteOptz = {
        
        /**
         * Initialize the plugin
         */
        init: function() {
            this.bindEvents();
            this.initComponents();
            this.setupAjax();
        },
        
        /**
         * Bind event listeners
         */
        bindEvents: function() {
            // Tool import functionality
            $(document).on('click', '.siteoptz-import-tools', this.importTools);
            
            // Tool rating interactions
            $(document).on('click', '.siteoptz-rating .star', this.setRating);
            
            // Search functionality
            $(document).on('input', '.siteoptz-search', this.debounce(this.performSearch, 300));
            
            // Filter functionality
            $(document).on('change', '.siteoptz-filter', this.applyFilters);
            
            // Comparison functionality
            $(document).on('click', '.siteoptz-compare-btn', this.addToComparison);
            $(document).on('click', '.siteoptz-remove-comparison', this.removeFromComparison);
            
            // Quick actions
            $(document).on('click', '.siteoptz-quick-edit', this.quickEdit);
            $(document).on('click', '.siteoptz-bulk-action', this.bulkAction);
        },
        
        /**
         * Initialize components
         */
        initComponents: function() {
            // Initialize tooltips
            this.initTooltips();
            
            // Initialize rating displays
            this.initRatings();
            
            // Initialize comparison basket
            this.initComparisonBasket();
            
            // Initialize search suggestions
            this.initSearchSuggestions();
        },
        
        /**
         * Setup AJAX configuration
         */
        setupAjax: function() {
            // Set up AJAX defaults
            $.ajaxSetup({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-WP-Nonce', siteoptz_ajax.nonce);
                }
            });
        },
        
        /**
         * Import tools functionality
         */
        importTools: function(e) {
            e.preventDefault();
            
            var $button = $(this);
            var $form = $button.closest('form');
            var formData = new FormData($form[0]);
            
            $button.prop('disabled', true).html('<span class="siteoptz-loading"></span> Importing...');
            
            $.ajax({
                url: siteoptz_ajax.ajax_url,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    if (response.success) {
                        SiteOptz.showNotice('Tools imported successfully!', 'success');
                        $form[0].reset();
                    } else {
                        SiteOptz.showNotice(response.data.message || 'Import failed', 'error');
                    }
                },
                error: function() {
                    SiteOptz.showNotice('Network error occurred', 'error');
                },
                complete: function() {
                    $button.prop('disabled', false).html('Import Tools');
                }
            });
        },
        
        /**
         * Set tool rating
         */
        setRating: function(e) {
            e.preventDefault();
            
            var $star = $(this);
            var $ratingContainer = $star.closest('.siteoptz-rating');
            var rating = $star.data('rating');
            var toolId = $ratingContainer.data('tool-id');
            
            // Update visual rating
            $ratingContainer.find('.star').each(function(index) {
                $(this).toggleClass('empty', index >= rating);
            });
            
            // Save rating via AJAX
            if (toolId) {
                $.post(siteoptz_ajax.ajax_url, {
                    action: 'siteoptz_save_rating',
                    tool_id: toolId,
                    rating: rating,
                    nonce: siteoptz_ajax.nonce
                });
            }
        },
        
        /**
         * Perform search
         */
        performSearch: function(e) {
            var query = $(this).val();
            var $results = $('.siteoptz-search-results');
            
            if (query.length < 2) {
                $results.empty();
                return;
            }
            
            $.get(siteoptz_ajax.api_url + 'tools', {
                search: query,
                per_page: 10
            }, function(tools) {
                SiteOptz.displaySearchResults(tools, $results);
            });
        },
        
        /**
         * Display search results
         */
        displaySearchResults: function(tools, $container) {
            $container.empty();
            
            if (tools.length === 0) {
                $container.html('<p>No tools found</p>');
                return;
            }
            
            tools.forEach(function(tool) {
                var $result = $('<div class="siteoptz-search-result">');
                $result.html(`
                    <h4><a href="${tool.permalink}">${tool.name}</a></h4>
                    <p>${tool.description}</p>
                    <div class="tool-meta">
                        <span class="rating">${SiteOptz.renderStars(tool.rating)}</span>
                        <span class="pricing">${tool.pricing}</span>
                    </div>
                `);
                $container.append($result);
            });
        },
        
        /**
         * Apply filters
         */
        applyFilters: function() {
            var filters = {};
            
            $('.siteoptz-filter').each(function() {
                var $filter = $(this);
                var key = $filter.data('filter');
                var value = $filter.val();
                
                if (value) {
                    filters[key] = value;
                }
            });
            
            // Apply filters to results
            SiteOptz.filterResults(filters);
        },
        
        /**
         * Filter results
         */
        filterResults: function(filters) {
            var params = $.extend({}, filters, { per_page: 20 });
            
            $.get(siteoptz_ajax.api_url + 'tools', params, function(tools) {
                SiteOptz.displayFilteredResults(tools);
            });
        },
        
        /**
         * Display filtered results
         */
        displayFilteredResults: function(tools) {
            var $container = $('.siteoptz-tools-grid');
            $container.empty();
            
            tools.forEach(function(tool) {
                var $card = $('<div class="siteoptz-tool-card">');
                $card.html(`
                    <h3><a href="${tool.permalink}">${tool.name}</a></h3>
                    <p>${tool.description}</p>
                    <div class="tool-meta">
                        <span class="rating">${SiteOptz.renderStars(tool.rating)}</span>
                        <span class="pricing">${tool.pricing}</span>
                    </div>
                    <div class="tool-actions">
                        <button class="button siteoptz-compare-btn" data-tool-id="${tool.id}">
                            Compare
                        </button>
                        <a href="${tool.permalink}" class="button button-primary">
                            View Details
                        </a>
                    </div>
                `);
                $container.append($card);
            });
        },
        
        /**
         * Add tool to comparison
         */
        addToComparison: function(e) {
            e.preventDefault();
            
            var toolId = $(this).data('tool-id');
            var comparison = SiteOptz.getComparison();
            
            if (comparison.indexOf(toolId) === -1 && comparison.length < 4) {
                comparison.push(toolId);
                SiteOptz.saveComparison(comparison);
                SiteOptz.updateComparisonBasket();
                $(this).text('Added to Comparison').prop('disabled', true);
            }
        },
        
        /**
         * Remove tool from comparison
         */
        removeFromComparison: function(e) {
            e.preventDefault();
            
            var toolId = $(this).data('tool-id');
            var comparison = SiteOptz.getComparison();
            var index = comparison.indexOf(toolId);
            
            if (index > -1) {
                comparison.splice(index, 1);
                SiteOptz.saveComparison(comparison);
                SiteOptz.updateComparisonBasket();
                $(this).closest('.comparison-item').remove();
            }
        },
        
        /**
         * Get comparison tools from localStorage
         */
        getComparison: function() {
            var comparison = localStorage.getItem('siteoptz_comparison');
            return comparison ? JSON.parse(comparison) : [];
        },
        
        /**
         * Save comparison to localStorage
         */
        saveComparison: function(comparison) {
            localStorage.setItem('siteoptz_comparison', JSON.stringify(comparison));
        },
        
        /**
         * Initialize comparison basket
         */
        initComparisonBasket: function() {
            this.updateComparisonBasket();
        },
        
        /**
         * Update comparison basket display
         */
        updateComparisonBasket: function() {
            var comparison = this.getComparison();
            var $basket = $('.siteoptz-comparison-basket');
            var $count = $('.siteoptz-comparison-count');
            
            $count.text(comparison.length);
            
            if (comparison.length > 0) {
                $basket.addClass('has-items');
            } else {
                $basket.removeClass('has-items');
            }
        },
        
        /**
         * Initialize tooltips
         */
        initTooltips: function() {
            $('.siteoptz-tooltip').each(function() {
                var $tooltip = $(this);
                var content = $tooltip.data('tooltip');
                
                $tooltip.hover(
                    function() {
                        SiteOptz.showTooltip($(this), content);
                    },
                    function() {
                        SiteOptz.hideTooltip();
                    }
                );
            });
        },
        
        /**
         * Show tooltip
         */
        showTooltip: function($element, content) {
            var $tooltip = $('<div class="siteoptz-tooltip-popup">').html(content);
            $('body').append($tooltip);
            
            var offset = $element.offset();
            $tooltip.css({
                top: offset.top - $tooltip.height() - 10,
                left: offset.left + ($element.width() / 2) - ($tooltip.width() / 2)
            });
        },
        
        /**
         * Hide tooltip
         */
        hideTooltip: function() {
            $('.siteoptz-tooltip-popup').remove();
        },
        
        /**
         * Initialize rating displays
         */
        initRatings: function() {
            $('.siteoptz-rating-display').each(function() {
                var $rating = $(this);
                var value = parseFloat($rating.data('rating'));
                $rating.html(SiteOptz.renderStars(value));
            });
        },
        
        /**
         * Render star rating
         */
        renderStars: function(rating) {
            var stars = '';
            var fullStars = Math.floor(rating);
            var hasHalfStar = rating % 1 !== 0;
            
            for (var i = 0; i < 5; i++) {
                if (i < fullStars) {
                    stars += '<span class="star">★</span>';
                } else if (i === fullStars && hasHalfStar) {
                    stars += '<span class="star half">★</span>';
                } else {
                    stars += '<span class="star empty">☆</span>';
                }
            }
            
            return `<span class="stars">${stars}</span> <span class="rating-value">(${rating})</span>`;
        },
        
        /**
         * Initialize search suggestions
         */
        initSearchSuggestions: function() {
            $('.siteoptz-search').on('focus', function() {
                SiteOptz.showSearchSuggestions($(this));
            });
            
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.siteoptz-search-container').length) {
                    SiteOptz.hideSearchSuggestions();
                }
            });
        },
        
        /**
         * Show search suggestions
         */
        showSearchSuggestions: function($input) {
            // Implementation for search suggestions
        },
        
        /**
         * Hide search suggestions
         */
        hideSearchSuggestions: function() {
            $('.siteoptz-search-suggestions').hide();
        },
        
        /**
         * Quick edit functionality
         */
        quickEdit: function(e) {
            e.preventDefault();
            
            var $button = $(this);
            var toolId = $button.data('tool-id');
            
            // Show quick edit form
            SiteOptz.showQuickEditForm(toolId);
        },
        
        /**
         * Show quick edit form
         */
        showQuickEditForm: function(toolId) {
            // Get tool data
            $.get(siteoptz_ajax.api_url + 'tools/' + toolId, function(tool) {
                var $form = SiteOptz.createQuickEditForm(tool);
                $('body').append($form);
                $form.fadeIn();
            });
        },
        
        /**
         * Create quick edit form
         */
        createQuickEditForm: function(tool) {
            return $(`
                <div class="siteoptz-quick-edit-overlay">
                    <div class="siteoptz-quick-edit-form">
                        <h3>Quick Edit: ${tool.name}</h3>
                        <form>
                            <label>Rating:
                                <input type="number" name="rating" value="${tool.rating}" min="0" max="5" step="0.1">
                            </label>
                            <label>Pricing:
                                <input type="text" name="pricing" value="${tool.pricing}">
                            </label>
                            <div class="form-actions">
                                <button type="submit" class="button button-primary">Save</button>
                                <button type="button" class="button siteoptz-cancel-edit">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            `);
        },
        
        /**
         * Bulk action functionality
         */
        bulkAction: function(e) {
            e.preventDefault();
            
            var action = $('.siteoptz-bulk-actions select').val();
            var selected = $('.siteoptz-tool-checkbox:checked').map(function() {
                return $(this).val();
            }).get();
            
            if (!action || selected.length === 0) {
                SiteOptz.showNotice('Please select tools and an action', 'warning');
                return;
            }
            
            // Perform bulk action
            SiteOptz.performBulkAction(action, selected);
        },
        
        /**
         * Perform bulk action
         */
        performBulkAction: function(action, toolIds) {
            $.post(siteoptz_ajax.ajax_url, {
                action: 'siteoptz_bulk_action',
                bulk_action: action,
                tool_ids: toolIds,
                nonce: siteoptz_ajax.nonce
            }, function(response) {
                if (response.success) {
                    SiteOptz.showNotice(response.data.message, 'success');
                    location.reload();
                } else {
                    SiteOptz.showNotice(response.data.message, 'error');
                }
            });
        },
        
        /**
         * Show admin notice
         */
        showNotice: function(message, type) {
            type = type || 'info';
            var $notice = $(`
                <div class="notice notice-${type} is-dismissible siteoptz-notice">
                    <p>${message}</p>
                    <button type="button" class="notice-dismiss">
                        <span class="screen-reader-text">Dismiss this notice.</span>
                    </button>
                </div>
            `);
            
            $('.wrap h1').after($notice);
            
            // Auto-dismiss after 5 seconds
            setTimeout(function() {
                $notice.fadeOut();
            }, 5000);
        },
        
        /**
         * Debounce function
         */
        debounce: function(func, wait) {
            var timeout;
            return function executedFunction() {
                var context = this;
                var args = arguments;
                var later = function() {
                    timeout = null;
                    func.apply(context, args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        /**
         * Format currency
         */
        formatCurrency: function(amount, currency) {
            currency = currency || 'USD';
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency
            }).format(amount);
        },
        
        /**
         * Format date
         */
        formatDate: function(date) {
            return new Date(date).toLocaleDateString();
        },
        
        /**
         * Validate email
         */
        validateEmail: function(email) {
            var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    };
    
    /**
     * Initialize when document is ready
     */
    $(document).ready(function() {
        SiteOptz.init();
    });
    
})(jQuery);