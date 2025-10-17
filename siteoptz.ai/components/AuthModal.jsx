import { useState, useEffect } from 'react';
import { login, register, getAuth } from '../utils/auth';

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    plan: 'free'
  });

  useEffect(() => {
    // Initialize auth and listen for hash changes
    const auth = getAuth();
    
    // Listen for show login/register events
    const handleShowLogin = () => {
      setMode('login');
      setIsOpen(true);
      setError(null);
      setSuccess(null);
    };
    
    const handleShowRegister = () => {
      setMode('register');
      setIsOpen(true);
      setError(null);
      setSuccess(null);
    };
    
    window.addEventListener('siteoptz:show-login', handleShowLogin);
    window.addEventListener('siteoptz:show-register', handleShowRegister);
    
    // Check initial hash
    const hash = window.location.hash.toLowerCase();
    if (hash === '#login' || hash === '#/login') {
      handleShowLogin();
    } else if (hash === '#register' || hash === '#/register') {
      handleShowRegister();
    }
    
    return () => {
      window.removeEventListener('siteoptz:show-login', handleShowLogin);
      window.removeEventListener('siteoptz:show-register', handleShowRegister);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user types
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let result;
      
      if (mode === 'login') {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(
          formData.name,
          formData.email,
          formData.password,
          formData.plan
        );
      }

      if (result.success) {
        setSuccess(result.message);
        // Will auto-redirect, but keep modal open to show success message
      } else {
        setError(result.message);
        
        // Handle specific actions
        if (result.action === 'redirect_to_register') {
          setTimeout(() => {
            setMode('register');
            setError(null);
          }, 2000);
        } else if (result.action === 'redirect_to_login') {
          setTimeout(() => {
            setMode('login');
            setError(null);
          }, 2000);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    window.location.hash = '';
    setError(null);
    setSuccess(null);
    setFormData({ name: '', email: '', password: '', plan: 'free' });
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={closeModal}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={closeModal}>
          &times;
        </button>
        
        <h2 className="auth-modal-title">
          {mode === 'login' ? 'Welcome Back' : 'Get Started with SiteOptz.ai'}
        </h2>
        
        <p className="auth-modal-subtitle">
          {mode === 'login' 
            ? 'Sign in to access your dashboard' 
            : 'Create your account and start scaling with AI'}
        </p>

        {error && (
          <div className="auth-message error">
            <span className="auth-message-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="auth-message success">
            <span className="auth-message-icon">✅</span>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="auth-form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required={mode === 'register'}
                disabled={loading}
              />
            </div>
          )}

          <div className="auth-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={mode === 'login' ? 'Enter your password' : 'At least 6 characters'}
              required
              minLength="6"
              disabled={loading}
            />
          </div>

          {mode === 'register' && (
            <div className="auth-form-group">
              <label htmlFor="plan">Choose Your Plan</label>
              <select
                id="plan"
                name="plan"
                value={formData.plan}
                onChange={handleInputChange}
                disabled={loading}
              >
                <option value="free">Free - Get Started</option>
                <option value="starter">Starter - $29/month</option>
                <option value="pro">Pro - $99/month (Most Popular)</option>
                <option value="enterprise">Enterprise - Custom Pricing</option>
              </select>
            </div>
          )}

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>

        <div className="auth-modal-footer">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <a 
                href="#register" 
                onClick={(e) => {
                  e.preventDefault();
                  setMode('register');
                  setError(null);
                  setSuccess(null);
                }}
              >
                Create Account
              </a>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <a 
                href="#login" 
                onClick={(e) => {
                  e.preventDefault();
                  setMode('login');
                  setError(null);
                  setSuccess(null);
                }}
              >
                Sign In
              </a>
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .auth-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .auth-modal {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          max-width: 450px;
          width: 100%;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }

        .auth-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-modal-close:hover {
          color: #000;
        }

        .auth-modal-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.75rem;
          color: #333;
        }

        .auth-modal-subtitle {
          margin: 0 0 1.5rem 0;
          color: #666;
          font-size: 1rem;
        }

        .auth-message {
          padding: 0.75rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .auth-message.error {
          background: #fee;
          color: #c00;
          border: 1px solid #fcc;
        }

        .auth-message.success {
          background: #efe;
          color: #060;
          border: 1px solid #cfc;
        }

        .auth-message-icon {
          font-size: 1.2rem;
        }

        .auth-form {
          margin: 0;
        }

        .auth-form-group {
          margin-bottom: 1.25rem;
        }

        .auth-form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #333;
          font-size: 0.95rem;
        }

        .auth-form-group input,
        .auth-form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .auth-form-group input:focus,
        .auth-form-group select:focus {
          outline: none;
          border-color: #4CAF50;
        }

        .auth-form-group input:disabled,
        .auth-form-group select:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }

        .auth-submit-btn {
          width: 100%;
          padding: 0.875rem;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .auth-submit-btn:hover:not(:disabled) {
          background: #45a049;
        }

        .auth-submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .auth-modal-footer {
          margin-top: 1.5rem;
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid #eee;
        }

        .auth-modal-footer p {
          margin: 0;
          color: #666;
          font-size: 0.95rem;
        }

        .auth-modal-footer a {
          color: #4CAF50;
          text-decoration: none;
          font-weight: 500;
        }

        .auth-modal-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .auth-modal {
            padding: 1.5rem;
          }
          
          .auth-modal-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}