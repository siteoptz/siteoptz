import { useState, useEffect } from 'react';
import { login } from '../utils/auth';

export default function AuthLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Clear any NextAuth cookies/sessions
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Redirect DIRECTLY to the correct dashboard
        const redirectUrl = result.redirectUrl || `https://siteoptz.ai/dashboard/${result.user.plan || 'free'}`;
        console.log('Login successful, redirecting to:', redirectUrl);
        
        // Force redirect - bypass everything
        window.location.replace(redirectUrl);
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '400px', 
      margin: '100px auto',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h1>Login to SiteOptz.ai</h1>
      <p>Use your email and password to login</p>
      
      {error && (
        <div style={{ 
          padding: '0.75rem', 
          background: '#fee', 
          color: '#c00', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ 
                display: 'block', 
                width: '100%', 
                padding: '0.5rem',
                marginTop: '0.25rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ 
                display: 'block', 
                width: '100%', 
                padding: '0.5rem',
                marginTop: '0.25rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%',
            padding: '0.75rem',
            background: loading ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p>Don't have an account?</p>
        <a href="/auth-register" style={{ color: '#4CAF50' }}>Create Account</a>
      </div>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#fff3e0',
        borderRadius: '4px',
        fontSize: '0.9rem'
      }}>
        <strong>⚠️ Note:</strong> Google OAuth is temporarily disabled. Please use email/password login.
      </div>
    </div>
  );
}