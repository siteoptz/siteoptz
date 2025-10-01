import React, { useState } from 'react';
import { User, Lock, Mail, Building2, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

const Login = ({ onLogin, onToggleMode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(`http://localhost:5001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user, data.token);
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Optz BI</h1>
          <p>Track, analyze, and optimize your marketing campaigns</p>
        </div>

        <div className="auth-tabs">
          <button 
            className={isLogin ? 'active' : ''}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={!isLogin ? 'active' : ''}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label>
                  <User size={20} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>

              <div className="form-group">
                <label>
                  <Building2 size={20} />
                  Company (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>
              <Mail size={20} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Lock size={20} />
              Password
            </label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {!isLogin && (
              <small>Password must be at least 6 characters long</small>
            )}
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>

        <div className="auth-features">
          <h3>What you'll get:</h3>
          <ul>
            <li>✅ Connect Google Ads, Meta, TikTok & Google Analytics</li>
            <li>✅ Automated data sync and ROI calculations</li>
            <li>✅ AI-powered insights and recommendations</li>
            <li>✅ Real-time campaign performance dashboards</li>
            <li>✅ Multi-channel analytics and reporting</li>
          </ul>
        </div>
      </div>

      <div className="auth-demo">
        <h3>🚀 Live Demo Available</h3>
        <p>Experience the full platform with sample data</p>
        <button 
          className="demo-btn"
          onClick={() => onLogin({ 
            id: 'demo', 
            name: 'Demo User', 
            email: 'demo@example.com', 
            plan: 'pro' 
          }, 'demo-token')}
        >
          Try Demo Mode
        </button>
      </div>
    </div>
  );
};

export default Login;