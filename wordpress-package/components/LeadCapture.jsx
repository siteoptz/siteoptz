/**
 * Lead Capture Component - Email Collection & Lead Generation
 * 
 * Captures leads through various forms and integrates with email marketing.
 * Supports multiple form types and customizable messaging.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Download, Gift, TrendingUp, CheckCircle, X, ArrowRight } from 'lucide-react';

const LeadCapture = ({
  type = "newsletter", // "newsletter", "download", "demo", "discount", "waitlist"
  title = "Stay Updated",
  description = "Get the latest AI tool insights delivered to your inbox.",
  buttonText = "Subscribe",
  incentive = null,
  fields = ["email"],
  appearance = "inline", // "inline", "modal", "sidebar", "floating"
  trigger = null, // For modal/floating types
  integrations = [],
  className = ""
}) => {
  const [formData, setFormData] = useState({});
  const [isVisible, setIsVisible] = useState(appearance === "inline");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle form visibility triggers
  useEffect(() => {
    if (appearance === "modal" || appearance === "floating") {
      const handleTrigger = () => {
        switch (trigger?.type) {
          case "scroll":
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent >= (trigger.value || 50)) {
              setIsVisible(true);
            }
            break;
          case "time":
            setTimeout(() => setIsVisible(true), (trigger.value || 5000));
            break;
          case "exit":
            // Exit intent detection would go here
            break;
          default:
            break;
        }
      };

      if (trigger?.type === "scroll") {
        window.addEventListener('scroll', handleTrigger);
        return () => window.removeEventListener('scroll', handleTrigger);
      } else if (trigger?.type === "time") {
        handleTrigger();
      }
    }
  }, [appearance, trigger]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate required fields
    const newErrors = {};
    fields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit to WordPress API
      const response = await fetch('/wp-json/siteoptz/v1/capture-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type,
          source: window.location.pathname,
          timestamp: new Date().toISOString()
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        
        // Track conversion
        if (window.gtag) {
          window.gtag('event', 'conversion', {
            event_category: 'Lead Capture',
            event_label: type,
            value: 1
          });
        }

        // Auto-hide after success (for floating/modal types)
        if (appearance !== "inline") {
          setTimeout(() => setIsVisible(false), 3000);
        }
      } else {
        setErrors({ general: result.message || "Something went wrong. Please try again." });
      }
    } catch (error) {
      setErrors({ general: "Network error. Please check your connection and try again." });
    }

    setIsSubmitting(false);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Get form configuration based on type
  const getFormConfig = () => {
    const configs = {
      newsletter: {
        icon: Mail,
        title: "Stay Updated",
        description: "Get weekly AI tool reviews and comparisons delivered to your inbox.",
        buttonText: "Subscribe Now",
        incentive: "Join 50,000+ professionals"
      },
      download: {
        icon: Download,
        title: "Download Free Guide",
        description: "Get our comprehensive AI Tools Comparison Guide (45 pages, PDF).",
        buttonText: "Download Free Guide",
        incentive: "Instant download, no spam"
      },
      demo: {
        icon: TrendingUp,
        title: "Book a Demo",
        description: "See how our AI tool comparison platform can save you time and money.",
        buttonText: "Schedule Demo",
        incentive: "30-minute personalized session"
      },
      discount: {
        icon: Gift,
        title: "Get 20% Off",
        description: "Unlock exclusive discounts on premium AI tool subscriptions.",
        buttonText: "Claim Discount",
        incentive: "Limited time offer"
      },
      waitlist: {
        icon: ArrowRight,
        title: "Join Waitlist",
        description: "Be the first to access our new AI tool comparison features.",
        buttonText: "Join Waitlist",
        incentive: "Early access guaranteed"
      }
    };

    return {
      ...configs[type],
      title: title || configs[type].title,
      description: description || configs[type].description,
      buttonText: buttonText || configs[type].buttonText
    };
  };

  const config = getFormConfig();
  const IconComponent = config.icon;

  // Render field inputs
  const renderField = (field) => {
    const fieldConfigs = {
      email: {
        type: "email",
        placeholder: "your@email.com",
        label: "Email Address"
      },
      name: {
        type: "text",
        placeholder: "Your Name",
        label: "Full Name"
      },
      company: {
        type: "text",
        placeholder: "Company Name",
        label: "Company"
      },
      phone: {
        type: "tel",
        placeholder: "+1 (555) 123-4567",
        label: "Phone Number"
      },
      role: {
        type: "select",
        placeholder: "Select your role",
        label: "Job Role",
        options: [
          "Marketing Manager",
          "Product Manager",
          "Developer",
          "Designer",
          "Founder/CEO",
          "Other"
        ]
      }
    };

    const fieldConfig = fieldConfigs[field];
    if (!fieldConfig) return null;

    if (fieldConfig.type === "select") {
      return (
        <div key={field} className="form-field">
          <label className="field-label">{fieldConfig.label}</label>
          <select
            value={formData[field] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className={`field-input select-input ${errors[field] ? 'error' : ''}`}
          >
            <option value="">{fieldConfig.placeholder}</option>
            {fieldConfig.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors[field] && <span className="field-error">{errors[field]}</span>}
        </div>
      );
    }

    return (
      <div key={field} className="form-field">
        <label className="field-label">{fieldConfig.label}</label>
        <input
          type={fieldConfig.type}
          placeholder={fieldConfig.placeholder}
          value={formData[field] || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={`field-input ${errors[field] ? 'error' : ''}`}
          disabled={isSubmitting}
        />
        {errors[field] && <span className="field-error">{errors[field]}</span>}
      </div>
    );
  };

  // Main form content
  const formContent = (
    <div className={`lead-capture-content ${isSuccess ? 'success' : ''}`}>
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="form-container"
          >
            <div className="form-header">
              <div className="header-icon">
                <IconComponent size={24} />
              </div>
              <div className="header-content">
                <h3 className="form-title">{config.title}</h3>
                <p className="form-description">{config.description}</p>
                {(incentive || config.incentive) && (
                  <div className="form-incentive">
                    <span>{incentive || config.incentive}</span>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="lead-form">
              <div className="form-fields">
                {fields.map(renderField)}
              </div>

              {errors.general && (
                <div className="general-error">
                  {errors.general}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <span>{config.buttonText}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="form-privacy">
                <p>We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="success-container"
          >
            <div className="success-icon">
              <CheckCircle size={48} />
            </div>
            <h3 className="success-title">Success!</h3>
            <p className="success-message">
              {type === "newsletter" && "Welcome to our community! Check your email for confirmation."}
              {type === "download" && "Your download is ready! Check your email for the link."}
              {type === "demo" && "Thanks for your interest! We'll contact you within 24 hours."}
              {type === "discount" && "Your discount code has been sent to your email!"}
              {type === "waitlist" && "You're on the list! We'll notify you when we launch."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Render based on appearance type
  if (!isVisible) return null;

  if (appearance === "modal") {
    return (
      <motion.div
        className="lead-capture-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`lead-capture lead-capture--modal ${className}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <button
            className="close-button"
            onClick={() => setIsVisible(false)}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          {formContent}
        </motion.div>
      </motion.div>
    );
  }

  if (appearance === "floating") {
    return (
      <motion.div
        className={`lead-capture lead-capture--floating ${className}`}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
      >
        <button
          className="close-button"
          onClick={() => setIsVisible(false)}
          aria-label="Close"
        >
          <X size={16} />
        </button>
        {formContent}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`lead-capture lead-capture--${appearance} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {formContent}
    </motion.div>
  );
};

// Component Styles
const leadCaptureStyles = `
  .lead-capture {
    background: white;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--gray-200);
    overflow: hidden;
  }

  .lead-capture--inline {
    margin: var(--space-8) 0;
  }

  .lead-capture--sidebar {
    position: sticky;
    top: var(--space-8);
    max-width: 350px;
  }

  .lead-capture--modal {
    position: relative;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .lead-capture--floating {
    position: fixed;
    bottom: var(--space-6);
    right: var(--space-6);
    max-width: 350px;
    z-index: 1000;
  }

  .lead-capture-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .close-button {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
    background: var(--gray-100);
    border: none;
    border-radius: var(--radius-full);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition-base);
    z-index: 10;
  }

  .close-button:hover {
    background: var(--gray-200);
  }

  .lead-capture-content {
    padding: var(--space-8);
  }

  .lead-capture--floating .lead-capture-content {
    padding: var(--space-6);
  }

  .form-header {
    display: flex;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .header-icon {
    background: var(--blue-50);
    color: var(--blue-600);
    padding: var(--space-3);
    border-radius: var(--radius-lg);
    flex-shrink: 0;
  }

  .form-title {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin-bottom: var(--space-2);
  }

  .form-description {
    color: var(--text-secondary);
    line-height: 1.5;
    margin-bottom: var(--space-3);
  }

  .form-incentive {
    display: inline-flex;
    align-items: center;
    padding: var(--space-1) var(--space-3);
    background: var(--amber-100);
    color: var(--amber-800);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
  }

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .field-label {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--text-primary);
  }

  .field-input {
    padding: var(--space-3);
    border: 1px solid var(--gray-300);
    border-radius: var(--radius-md);
    font-size: var(--text-base);
    transition: var(--transition-base);
  }

  .field-input:focus {
    outline: none;
    border-color: var(--blue-500);
    box-shadow: 0 0 0 3px var(--blue-100);
  }

  .field-input.error {
    border-color: var(--red-500);
  }

  .field-input.error:focus {
    box-shadow: 0 0 0 3px var(--red-100);
  }

  .select-input {
    background: white;
    cursor: pointer;
  }

  .field-error {
    font-size: var(--text-sm);
    color: var(--red-600);
    margin-top: var(--space-1);
  }

  .general-error {
    padding: var(--space-3);
    background: var(--red-50);
    border: 1px solid var(--red-200);
    border-radius: var(--radius-md);
    color: var(--red-800);
    font-size: var(--text-sm);
    margin-bottom: var(--space-4);
  }

  .submit-button {
    width: 100%;
    padding: var(--space-4);
    background: var(--blue-600);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-size: var(--text-base);
    font-weight: var(--font-medium);
    cursor: pointer;
    transition: var(--transition-base);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-height: 48px;
  }

  .submit-button:hover:not(:disabled) {
    background: var(--blue-700);
    transform: translateY(-1px);
  }

  .submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .form-privacy {
    text-align: center;
    margin-top: var(--space-4);
  }

  .form-privacy p {
    font-size: var(--text-xs);
    color: var(--text-secondary);
  }

  .success-container {
    text-align: center;
    padding: var(--space-8);
  }

  .success-icon {
    color: var(--green-600);
    margin-bottom: var(--space-4);
    display: flex;
    justify-content: center;
  }

  .success-title {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin-bottom: var(--space-3);
  }

  .success-message {
    color: var(--text-secondary);
    line-height: 1.5;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .lead-capture--floating {
      left: var(--space-4);
      right: var(--space-4);
      max-width: none;
    }

    .lead-capture-content {
      padding: var(--space-6);
    }

    .form-header {
      flex-direction: column;
      text-align: center;
    }

    .header-icon {
      align-self: center;
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .lead-capture {
      background: var(--gray-900);
      border-color: var(--gray-700);
    }

    .close-button {
      background: var(--gray-800);
      color: var(--gray-300);
    }

    .close-button:hover {
      background: var(--gray-700);
    }

    .field-input {
      background: var(--gray-800);
      border-color: var(--gray-600);
      color: var(--gray-100);
    }

    .form-incentive {
      background: var(--amber-900);
      color: var(--amber-200);
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .submit-button {
      transition: none;
    }

    .submit-button:hover:not(:disabled) {
      transform: none;
    }

    .loading-spinner {
      animation: none;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = leadCaptureStyles;
  document.head.appendChild(styleSheet);
}

export default LeadCapture;