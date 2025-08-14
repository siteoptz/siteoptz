/**
 * SiteOptz Calculator Plugin JavaScript
 * Version: 1.0.0
 */

(function($) {
    'use strict';

    window.SiteOptzCalculator = {
        
        init: function() {
            this.bindEvents();
            this.initCalculators();
        },
        
        bindEvents: function() {
            $(document).on('change', '.range-input', this.updateRangeValue);
            $(document).on('click', '.plan-button', this.selectPlan);
            $(document).on('change', '.plan-select', this.calculatePricing);
            $(document).on('change', '.usage-input', this.calculatePricing);
            $(document).on('change', '.billing-cycle', this.calculatePricing);
            $(document).on('click', '.apply-discount-btn', this.applyDiscount);
            $(document).on('click', '.save-quote-btn', this.saveQuote);
            $(document).on('click', '.share-quote-btn', this.shareQuote);
        },
        
        initCalculators: function() {
            $('.siteoptz-pricing-calculator').each(function() {
                var $calculator = $(this);
                var toolId = $calculator.data('tool-id');
                
                if (toolId) {
                    SiteOptzCalculator.loadCalculatorData(toolId, $calculator);
                }
            });
        },
        
        loadCalculatorData: function(toolId, $calculator) {
            $.get(siteoptz_calculator.api_url + 'plans/' + toolId)
                .done(function(plans) {
                    SiteOptzCalculator.renderPlans(plans, $calculator);
                })
                .fail(function() {
                    $calculator.find('.calculator-loading').html('<p>Error loading calculator data.</p>');
                });
        },
        
        renderPlans: function(plans, $calculator) {
            var html = '<div class="plans-selector">';
            
            plans.forEach(function(plan, index) {
                var popularClass = plan.popular ? ' popular' : '';
                html += `
                    <div class="plan-option${popularClass}" data-plan-id="${plan.id}">
                        ${plan.popular ? '<div class="plan-badge">Most Popular</div>' : ''}
                        <h3>${plan.name}</h3>
                        <div class="plan-price">
                            <span class="currency">${siteoptz_calculator.currency_symbol}</span>
                            <span class="amount">${plan.base_price}</span>
                            <span class="period">/month</span>
                        </div>
                        <ul class="plan-features">
                            ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        <button class="plan-select-btn" data-plan-id="${plan.id}">Select Plan</button>
                    </div>
                `;
            });
            
            html += '</div>';
            
            $calculator.find('.calculator-loading').replaceWith(html);
        },
        
        selectPlan: function(e) {
            e.preventDefault();
            
            var $button = $(this);
            var planId = $button.data('plan-id');
            var $calculator = $button.closest('.siteoptz-pricing-calculator');
            
            // Mark plan as selected
            $calculator.find('.plan-option').removeClass('selected');
            $button.closest('.plan-option').addClass('selected');
            
            // Load usage metrics for this plan
            SiteOptzCalculator.loadUsageMetrics(planId, $calculator);
            
            // Show calculator sections
            $calculator.find('.calculator-sections').show();
        },
        
        loadUsageMetrics: function(planId, $calculator) {
            // In a real implementation, this would load usage metrics from the API
            var sampleMetrics = [
                {
                    key: 'api_calls',
                    label: 'API Calls per Month',
                    min: 0,
                    max: 100000,
                    step: 1000,
                    default: 10000,
                    included: 5000,
                    price_per_unit: 0.001
                },
                {
                    key: 'storage',
                    label: 'Storage (GB)',
                    min: 0,
                    max: 1000,
                    step: 10,
                    default: 100,
                    included: 50,
                    price_per_unit: 0.10
                }
            ];
            
            this.renderUsageMetrics(sampleMetrics, $calculator);
        },
        
        renderUsageMetrics: function(metrics, $calculator) {
            var html = '<div class="usage-metrics">';
            html += '<h3>Customize Your Usage</h3>';
            
            metrics.forEach(function(metric) {
                html += `
                    <div class="metric-group">
                        <label>${metric.label}</label>
                        <div class="range-container">
                            <input type="range" 
                                   class="range-input usage-input" 
                                   data-metric="${metric.key}"
                                   min="${metric.min}" 
                                   max="${metric.max}" 
                                   step="${metric.step}" 
                                   value="${metric.default}">
                            <div class="range-value">${metric.default.toLocaleString()}</div>
                        </div>
                        <p class="metric-info">Included: ${metric.included.toLocaleString()}, Additional: $${metric.price_per_unit}/unit</p>
                    </div>
                `;
            });
            
            html += '</div>';
            
            if (!$calculator.find('.calculator-sections').length) {
                $calculator.append('<div class="calculator-sections" style="display:none;"></div>');
            }
            
            $calculator.find('.calculator-sections').html(html);
            $calculator.find('.calculator-sections').show();
            
            // Add billing options and summary
            this.addBillingOptions($calculator);
            this.addCostSummary($calculator);
        },
        
        addBillingOptions: function($calculator) {
            var billingHtml = `
                <div class="billing-options">
                    <h3>Billing Options</h3>
                    <div class="checkbox-container">
                        <input type="checkbox" id="annual-billing" class="billing-cycle">
                        <label for="annual-billing">Annual billing (Save 17%)</label>
                    </div>
                    <div class="discount-section">
                        <label>Discount Code:</label>
                        <div class="discount-input-group">
                            <input type="text" class="discount-input" placeholder="Enter code">
                            <button class="apply-discount-btn">Apply</button>
                        </div>
                        <div class="discount-status"></div>
                    </div>
                </div>
            `;
            
            $calculator.find('.calculator-sections').append(billingHtml);
        },
        
        addCostSummary: function($calculator) {
            var summaryHtml = `
                <div class="cost-summary">
                    <h3>Cost Summary</h3>
                    <div class="cost-breakdown">
                        <div class="breakdown-row">
                            <span class="breakdown-label">Base Plan</span>
                            <span class="breakdown-value base-cost">$0</span>
                        </div>
                        <div class="breakdown-row usage-costs" style="display: none;">
                            <span class="breakdown-label">Usage Overages</span>
                            <span class="breakdown-value">$0</span>
                        </div>
                        <div class="breakdown-row annual-discount" style="display: none;">
                            <span class="breakdown-label">Annual Discount (17%)</span>
                            <span class="breakdown-value">-$0</span>
                        </div>
                        <div class="breakdown-row applied-discount" style="display: none;">
                            <span class="breakdown-label">Discount Code</span>
                            <span class="breakdown-value">-$0</span>
                        </div>
                    </div>
                    <div class="total-cost">
                        <span>Total Cost:</span>
                        <span class="total-amount">${siteoptz_calculator.currency_symbol}0</span>
                    </div>
                    <div class="save-quote-section">
                        <button class="save-quote-btn">Save Quote</button>
                        <button class="share-quote-btn">Share Quote</button>
                    </div>
                </div>
            `;
            
            $calculator.find('.calculator-sections').append(summaryHtml);
            
            // Initial calculation
            this.calculatePricing.call($calculator.find('.usage-input')[0]);
        },
        
        updateRangeValue: function() {
            var $input = $(this);
            var value = parseInt($input.val());
            var $container = $input.closest('.range-container');
            
            $container.find('.range-value').text(value.toLocaleString());
            
            // Trigger calculation update
            SiteOptzCalculator.calculatePricing.call(this);
        },
        
        calculatePricing: function() {
            var $calculator = $(this).closest('.siteoptz-pricing-calculator');
            var planId = $calculator.find('.plan-option.selected').data('plan-id');
            
            if (!planId) return;
            
            // Collect form data
            var formData = {
                plan_id: planId,
                usage_metrics: {},
                billing_cycle: $calculator.find('#annual-billing').is(':checked') ? 'annual' : 'monthly',
                discount_code: $calculator.find('.discount-input').val()
            };
            
            // Collect usage metrics
            $calculator.find('.usage-input').each(function() {
                var $input = $(this);
                var metric = $input.data('metric');
                formData.usage_metrics[metric] = parseInt($input.val());
            });
            
            // Make API call to calculate pricing
            $.post(siteoptz_calculator.ajax_url, {
                action: 'calculate_pricing',
                nonce: siteoptz_calculator.nonce,
                plan_id: formData.plan_id,
                usage_metrics: formData.usage_metrics,
                billing_cycle: formData.billing_cycle,
                discount_code: formData.discount_code
            })
            .done(function(response) {
                if (response.success) {
                    SiteOptzCalculator.updateCostSummary(response.data, $calculator);
                }
            });
        },
        
        updateCostSummary: function(data, $calculator) {
            var $summary = $calculator.find('.cost-summary');
            
            // Update base cost
            $summary.find('.base-cost').text('$' + data.base_price.toFixed(2));
            
            // Update usage costs
            if (data.usage_cost > 0) {
                $summary.find('.usage-costs').show();
                $summary.find('.usage-costs .breakdown-value').text('$' + data.usage_cost.toFixed(2));
            } else {
                $summary.find('.usage-costs').hide();
            }
            
            // Update annual discount
            if (data.billing_cycle === 'annual' && data.discount_amount > 0) {
                $summary.find('.annual-discount').show();
                $summary.find('.annual-discount .breakdown-value').text('-$' + data.discount_amount.toFixed(2));
            } else {
                $summary.find('.annual-discount').hide();
            }
            
            // Update applied discount
            if (data.discount_amount > 0) {
                $summary.find('.applied-discount').show();
                $summary.find('.applied-discount .breakdown-value').text('-$' + data.discount_amount.toFixed(2));
            } else {
                $summary.find('.applied-discount').hide();
            }
            
            // Update total
            var total = data.total_cost;
            $summary.find('.total-amount').text(data.currency + total.toFixed(2));
        },
        
        applyDiscount: function(e) {
            e.preventDefault();
            
            var $button = $(this);
            var $calculator = $button.closest('.siteoptz-pricing-calculator');
            var code = $calculator.find('.discount-input').val();
            
            if (!code) {
                $calculator.find('.discount-status').html('<span style="color: red;">Please enter a discount code</span>');
                return;
            }
            
            $button.prop('disabled', true).text('Applying...');
            
            // Trigger recalculation (which will include the discount code)
            SiteOptzCalculator.calculatePricing.call($calculator.find('.usage-input')[0]);
            
            setTimeout(function() {
                $button.prop('disabled', false).text('Apply');
            }, 1000);
        },
        
        saveQuote: function(e) {
            e.preventDefault();
            
            var $button = $(this);
            var $calculator = $button.closest('.siteoptz-pricing-calculator');
            
            // Show email input if needed
            var email = prompt('Enter your email to save this quote:');
            if (!email) return;
            
            var quoteData = {
                email: email,
                tool_name: 'AI Tool', // Would be dynamic
                plan_name: $calculator.find('.plan-option.selected h3').text(),
                total_cost: parseFloat($calculator.find('.total-amount').text().replace(/[^0-9.-]+/g,'')),
                usage_metrics: {},
                billing_cycle: $calculator.find('#annual-billing').is(':checked') ? 'annual' : 'monthly',
                discount_code: $calculator.find('.discount-input').val()
            };
            
            $button.prop('disabled', true).html('<span class="loading-spinner"></span> Saving...');
            
            $.post(siteoptz_calculator.ajax_url, {
                action: 'save_calculator_quote',
                nonce: siteoptz_calculator.nonce,
                ...quoteData
            })
            .done(function(response) {
                if (response.success) {
                    alert('Quote saved successfully! Quote ID: ' + response.data.quote_id);
                } else {
                    alert('Error saving quote: ' + response.data.message);
                }
            })
            .fail(function() {
                alert('Network error. Please try again.');
            })
            .always(function() {
                $button.prop('disabled', false).text('Save Quote');
            });
        },
        
        shareQuote: function(e) {
            e.preventDefault();
            
            var $calculator = $(this).closest('.siteoptz-pricing-calculator');
            var quoteUrl = window.location.href; // Would include quote ID in real implementation
            
            if (navigator.share) {
                navigator.share({
                    title: 'AI Tool Pricing Quote',
                    text: 'Check out this pricing quote',
                    url: quoteUrl
                });
            } else {
                // Fallback to clipboard
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(quoteUrl).then(function() {
                        alert('Quote URL copied to clipboard!');
                    });
                } else {
                    prompt('Copy this URL to share your quote:', quoteUrl);
                }
            }
        }
    };
    
    // Initialize when document is ready
    $(document).ready(function() {
        SiteOptzCalculator.init();
    });
    
})(jQuery);