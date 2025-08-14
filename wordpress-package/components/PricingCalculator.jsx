/**
 * Pricing Calculator Component - Interactive Cost Estimation
 * 
 * Calculates costs based on usage parameters and displays pricing tiers.
 * Includes email capture for lead generation and quote saving.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, Mail, Download, Share2, CheckCircle } from 'lucide-react';

const PricingCalculator = ({
  tool = null,
  plans = [],
  usageMetrics = [],
  showEmailCapture = true,
  enableQuoteSharing = true,
  discountCodes = [],
  className = ""
}) => {
  const [usage, setUsage] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [annualDiscount, setAnnualDiscount] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [email, setEmail] = useState('');
  const [quoteId, setQuoteId] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [savedQuote, setSavedQuote] = useState(false);

  // Initialize usage metrics
  useEffect(() => {
    const initialUsage = {};
    usageMetrics.forEach(metric => {
      initialUsage[metric.key] = metric.defaultValue || 0;
    });
    setUsage(initialUsage);
  }, [usageMetrics]);

  // Calculate total cost
  useEffect(() => {
    if (!selectedPlan) return;

    let cost = selectedPlan.basePrice || 0;
    
    // Add usage-based costs
    usageMetrics.forEach(metric => {
      const usageValue = usage[metric.key] || 0;
      const overage = Math.max(0, usageValue - (metric.included || 0));
      cost += overage * (metric.pricePerUnit || 0);
    });

    // Apply annual discount
    if (annualDiscount) {
      cost = cost * 12 * 0.83; // 17% annual discount
    }

    // Apply discount code
    if (appliedDiscount) {
      if (appliedDiscount.type === 'percentage') {
        cost = cost * (1 - appliedDiscount.value / 100);
      } else if (appliedDiscount.type === 'fixed') {
        cost = Math.max(0, cost - appliedDiscount.value);
      }
    }

    setTotalCost(cost);
  }, [selectedPlan, usage, annualDiscount, appliedDiscount, usageMetrics]);

  // Apply discount code
  const handleDiscountCode = () => {
    const discount = discountCodes.find(code => 
      code.code.toLowerCase() === discountCode.toLowerCase() &&
      (!code.expiryDate || new Date(code.expiryDate) > new Date())
    );
    
    if (discount) {
      setAppliedDiscount(discount);
    } else {
      alert('Invalid or expired discount code');
    }
  };

  // Save quote
  const handleSaveQuote = async () => {
    if (!email) {
      setShowEmailForm(true);
      return;
    }

    const quoteData = {
      tool: tool?.name || 'AI Tool',
      plan: selectedPlan,
      usage,
      totalCost,
      annualDiscount,
      appliedDiscount,
      email,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('/wp-json/siteoptz/v1/save-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData)
      });

      const result = await response.json();
      if (result.success) {
        setQuoteId(result.quoteId);
        setSavedQuote(true);
        
        // Update URL with quote ID
        if (enableQuoteSharing) {
          const url = new URL(window.location);
          url.searchParams.set('quoteId', result.quoteId);
          window.history.pushState({}, '', url);
        }
      }
    } catch (error) {
      console.error('Error saving quote:', error);
    }
  };

  // Share quote
  const handleShareQuote = () => {
    if (!quoteId) return;
    
    const shareUrl = `${window.location.origin}${window.location.pathname}?quoteId=${quoteId}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${tool?.name || 'AI Tool'} Pricing Quote`,
        text: `Check out this pricing quote for ${tool?.name || 'AI Tool'}`,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Quote URL copied to clipboard!');
    }
  };

  return (
    <div className={`pricing-calculator ${className}`}>
      <div className="calculator-header">
        <div className="header-content">
          <Calculator className="header-icon" size={32} />
          <div>
            <h2>Pricing Calculator</h2>
            <p>Get personalized pricing based on your usage</p>
          </div>
        </div>
      </div>

      <div className="calculator-content">
        {/* Plan Selection */}
        <div className="plan-selection">
          <h3>Choose Your Plan</h3>
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`plan-card ${selectedPlan?.name === plan.name ? 'selected' : ''}`}
                onClick={() => setSelectedPlan(plan)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="plan-header">
                  <h4>{plan.name}</h4>
                  <div className="plan-price">
                    <span className="currency">$</span>
                    <span className="amount">{plan.basePrice}</span>
                    <span className="period">/month</span>
                  </div>
                </div>
                
                <div className="plan-features">
                  {plan.features?.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {plan.popular && (
                  <div className="popular-badge">Popular</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Usage Inputs */}
        {selectedPlan && usageMetrics.length > 0 && (
          <motion.div
            className="usage-inputs"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <h3>Customize Your Usage</h3>
            <div className="metrics-grid">
              {usageMetrics.map((metric) => (
                <div key={metric.key} className="metric-input">
                  <label htmlFor={metric.key}>
                    {metric.label}
                    {metric.included && (
                      <span className="included">
                        ({metric.included} included)
                      </span>
                    )}
                  </label>
                  
                  <div className="input-group">
                    <input
                      type="range"
                      id={metric.key}
                      min={metric.min || 0}
                      max={metric.max || 1000}
                      step={metric.step || 1}
                      value={usage[metric.key] || 0}
                      onChange={(e) => setUsage(prev => ({
                        ...prev,
                        [metric.key]: parseInt(e.target.value)
                      }))}
                      className="range-input"
                    />
                    
                    <input
                      type="number"
                      min={metric.min || 0}
                      max={metric.max || 1000}
                      value={usage[metric.key] || 0}
                      onChange={(e) => setUsage(prev => ({
                        ...prev,
                        [metric.key]: parseInt(e.target.value) || 0
                      }))}
                      className="number-input"
                    />
                  </div>
                  
                  {metric.description && (
                    <p className="metric-description">{metric.description}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Billing Options */}
        {selectedPlan && (
          <motion.div
            className="billing-options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Billing Options</h3>
            
            <div className="billing-toggle">
              <label className="toggle-container">
                <input
                  type="checkbox"
                  checked={annualDiscount}
                  onChange={(e) => setAnnualDiscount(e.target.checked)}
                />
                <span className="toggle-slider"></span>
                <span className="toggle-label">
                  Annual billing (Save 17%)
                </span>
              </label>
            </div>

            {discountCodes.length > 0 && (
              <div className="discount-code">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Enter discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="discount-input"
                  />
                  <button
                    onClick={handleDiscountCode}
                    className="apply-btn"
                    disabled={!discountCode}
                  >
                    Apply
                  </button>
                </div>
                
                {appliedDiscount && (
                  <div className="discount-applied">
                    <CheckCircle size={16} />
                    <span>
                      Discount applied: {appliedDiscount.name} 
                      ({appliedDiscount.type === 'percentage' ? 
                        `${appliedDiscount.value}%` : 
                        `$${appliedDiscount.value}`} off)
                    </span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Cost Summary */}
        {selectedPlan && (
          <motion.div
            className="cost-summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Cost Summary</h3>
            
            <div className="summary-breakdown">
              <div className="breakdown-item">
                <span>Base Plan ({selectedPlan.name})</span>
                <span>${selectedPlan.basePrice}/month</span>
              </div>
              
              {usageMetrics.map((metric) => {
                const usageValue = usage[metric.key] || 0;
                const overage = Math.max(0, usageValue - (metric.included || 0));
                const cost = overage * (metric.pricePerUnit || 0);
                
                if (cost > 0) {
                  return (
                    <div key={metric.key} className="breakdown-item">
                      <span>
                        {metric.label} overage ({overage} × ${metric.pricePerUnit})
                      </span>
                      <span>${cost.toFixed(2)}</span>
                    </div>
                  );
                }
                return null;
              })}
              
              {annualDiscount && (
                <div className="breakdown-item discount">
                  <span>Annual discount (17% off)</span>
                  <span>-${((totalCost / 0.83) - totalCost).toFixed(2)}</span>
                </div>
              )}
              
              {appliedDiscount && (
                <div className="breakdown-item discount">
                  <span>{appliedDiscount.name}</span>
                  <span>
                    -{appliedDiscount.type === 'percentage' ? 
                      `${appliedDiscount.value}%` : 
                      `$${appliedDiscount.value}`}
                  </span>
                </div>
              )}
            </div>
            
            <div className="total-cost">
              <div className="cost-amount">
                <span className="currency">$</span>
                <span className="amount">{totalCost.toFixed(2)}</span>
                <span className="period">
                  {annualDiscount ? '/year' : '/month'}
                </span>
              </div>
              
              <div className="cost-actions">
                {showEmailCapture && (
                  <motion.button
                    className="save-quote-btn"
                    onClick={handleSaveQuote}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={16} />
                    Save Quote
                  </motion.button>
                )}
                
                {enableQuoteSharing && quoteId && (
                  <button
                    className="share-quote-btn"
                    onClick={handleShareQuote}
                  >
                    <Share2 size={16} />
                    Share
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Email Capture Form */}
        <AnimatePresence>
          {showEmailForm && (
            <motion.div
              className="email-capture-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="email-capture-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h3>Save Your Quote</h3>
                <p>Enter your email to save and share this pricing quote.</p>
                
                <div className="email-form">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email-input"
                  />
                  
                  <div className="form-actions">
                    <button
                      onClick={() => setShowEmailForm(false)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveQuote}
                      disabled={!email}
                      className="save-btn"
                    >
                      Save Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {savedQuote && (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CheckCircle size={20} />
              <span>Quote saved successfully! Check your email for details.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Component Styles */}
      <style jsx>{`
        .pricing-calculator {
          background: white;
          border-radius: var(--radius-2xl);
          border: 1px solid var(--gray-200);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .calculator-header {
          background: linear-gradient(135deg, var(--blue-600), var(--blue-700));
          color: white;
          padding: var(--space-8);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .header-icon {
          background: rgba(255, 255, 255, 0.2);
          padding: var(--space-2);
          border-radius: var(--radius-lg);
        }

        .calculator-content {
          padding: var(--space-8);
        }

        .calculator-content h3 {
          font-size: var(--text-xl);
          font-weight: var(--font-semibold);
          color: var(--text-primary);
          margin-bottom: var(--space-6);
        }

        /* Plan Selection */
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-6);
          margin-bottom: var(--space-10);
        }

        .plan-card {
          position: relative;
          border: 2px solid var(--gray-200);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          cursor: pointer;
          transition: var(--transition-base);
          background: white;
        }

        .plan-card:hover {
          border-color: var(--blue-300);
          box-shadow: var(--shadow-md);
        }

        .plan-card.selected {
          border-color: var(--blue-600);
          background: var(--blue-50);
        }

        .popular-badge {
          position: absolute;
          top: -10px;
          right: var(--space-4);
          background: var(--amber-500);
          color: white;
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: var(--font-semibold);
        }

        .plan-header h4 {
          font-size: var(--text-lg);
          font-weight: var(--font-semibold);
          margin-bottom: var(--space-2);
        }

        .plan-price {
          display: flex;
          align-items: baseline;
          gap: var(--space-1);
          margin-bottom: var(--space-4);
        }

        .plan-price .currency {
          font-size: var(--text-lg);
          color: var(--text-secondary);
        }

        .plan-price .amount {
          font-size: var(--text-3xl);
          font-weight: var(--font-bold);
          color: var(--text-primary);
        }

        .plan-price .period {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .plan-features {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .feature-item svg {
          color: var(--green-600);
          flex-shrink: 0;
        }

        /* Usage Inputs */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-6);
          margin-bottom: var(--space-8);
        }

        .metric-input label {
          display: block;
          font-weight: var(--font-medium);
          margin-bottom: var(--space-2);
          color: var(--text-primary);
        }

        .included {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          font-weight: var(--font-normal);
        }

        .input-group {
          display: flex;
          gap: var(--space-3);
          align-items: center;
        }

        .range-input {
          flex: 1;
          -webkit-appearance: none;
          height: 6px;
          border-radius: var(--radius-full);
          background: var(--gray-200);
          outline: none;
        }

        .range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--blue-600);
          cursor: pointer;
        }

        .number-input {
          width: 80px;
          padding: var(--space-2);
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-md);
          text-align: center;
        }

        .metric-description {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          margin-top: var(--space-1);
        }

        /* Billing Options */
        .billing-options {
          margin-bottom: var(--space-8);
        }

        .toggle-container {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          cursor: pointer;
          margin-bottom: var(--space-4);
        }

        .toggle-slider {
          position: relative;
          width: 44px;
          height: 24px;
          background: var(--gray-300);
          border-radius: var(--radius-full);
          transition: var(--transition-base);
        }

        .toggle-slider::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: var(--transition-base);
        }

        input[type="checkbox"]:checked + .toggle-slider {
          background: var(--blue-600);
        }

        input[type="checkbox"]:checked + .toggle-slider::before {
          transform: translateX(20px);
        }

        input[type="checkbox"] {
          display: none;
        }

        .discount-code .input-group {
          max-width: 300px;
        }

        .discount-input {
          flex: 1;
          padding: var(--space-3);
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-md);
        }

        .apply-btn {
          padding: var(--space-3) var(--space-4);
          background: var(--blue-600);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition-base);
        }

        .apply-btn:hover:not(:disabled) {
          background: var(--blue-700);
        }

        .apply-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .discount-applied {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-top: var(--space-2);
          padding: var(--space-2);
          background: var(--green-50);
          border: 1px solid var(--green-200);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          color: var(--green-800);
        }

        /* Cost Summary */
        .cost-summary {
          background: var(--gray-50);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
        }

        .summary-breakdown {
          margin-bottom: var(--space-6);
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          padding: var(--space-2) 0;
          border-bottom: 1px solid var(--gray-200);
        }

        .breakdown-item.discount {
          color: var(--green-600);
        }

        .total-cost {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-4) 0;
          border-top: 2px solid var(--gray-300);
        }

        .cost-amount {
          display: flex;
          align-items: baseline;
          gap: var(--space-1);
        }

        .cost-amount .currency {
          font-size: var(--text-xl);
          color: var(--text-secondary);
        }

        .cost-amount .amount {
          font-size: var(--text-4xl);
          font-weight: var(--font-bold);
          color: var(--text-primary);
        }

        .cost-amount .period {
          font-size: var(--text-lg);
          color: var(--text-secondary);
        }

        .cost-actions {
          display: flex;
          gap: var(--space-3);
        }

        .save-quote-btn,
        .share-quote-btn {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-md);
          border: none;
          cursor: pointer;
          transition: var(--transition-base);
          font-weight: var(--font-medium);
        }

        .save-quote-btn {
          background: var(--blue-600);
          color: white;
        }

        .save-quote-btn:hover {
          background: var(--blue-700);
        }

        .share-quote-btn {
          background: var(--gray-200);
          color: var(--text-primary);
        }

        .share-quote-btn:hover {
          background: var(--gray-300);
        }

        /* Email Capture Modal */
        .email-capture-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .email-capture-modal {
          background: white;
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          max-width: 400px;
          width: 90%;
          box-shadow: var(--shadow-2xl);
        }

        .email-capture-modal h3 {
          margin-bottom: var(--space-2);
        }

        .email-capture-modal p {
          color: var(--text-secondary);
          margin-bottom: var(--space-6);
        }

        .email-input {
          width: 100%;
          padding: var(--space-3);
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-4);
        }

        .form-actions {
          display: flex;
          gap: var(--space-3);
          justify-content: flex-end;
        }

        .cancel-btn,
        .save-btn {
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-md);
          border: none;
          cursor: pointer;
          transition: var(--transition-base);
        }

        .cancel-btn {
          background: var(--gray-200);
          color: var(--text-primary);
        }

        .save-btn {
          background: var(--blue-600);
          color: white;
        }

        .save-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Success Message */
        .success-message {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-4);
          background: var(--green-50);
          border: 1px solid var(--green-200);
          border-radius: var(--radius-lg);
          color: var(--green-800);
          margin-top: var(--space-4);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .calculator-content {
            padding: var(--space-4);
          }

          .plans-grid {
            grid-template-columns: 1fr;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .total-cost {
            flex-direction: column;
            gap: var(--space-4);
            align-items: stretch;
          }

          .cost-actions {
            justify-content: center;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .pricing-calculator {
            background: var(--gray-900);
            border-color: var(--gray-700);
          }

          .plan-card {
            background: var(--gray-800);
            border-color: var(--gray-600);
          }

          .plan-card.selected {
            background: var(--blue-900);
            border-color: var(--blue-500);
          }

          .cost-summary {
            background: var(--gray-800);
          }

          .email-capture-modal {
            background: var(--gray-900);
          }
        }
      `}</style>
    </div>
  );
};

export default PricingCalculator;