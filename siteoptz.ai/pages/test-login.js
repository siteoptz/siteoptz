import { useState } from 'react';

export default function TestLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTestLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      setResult({
        status: response.status,
        data: data,
        timestamp: new Date().toISOString()
      });

      // If successful, show redirect info but don't actually redirect
      if (data.success) {
        console.log('Would redirect to:', data.redirectUrl);
      }
    } catch (error) {
      setResult({
        error: error.message,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Test Login Page</h1>
      <p>Use this page to debug authentication issues</p>

      <form onSubmit={handleTestLogin} style={{ marginTop: '2rem' }}>
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
                marginTop: '0.25rem'
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
                marginTop: '0.25rem'
              }}
            />
          </label>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '0.5rem 2rem',
            background: loading ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Testing...' : 'Test Login'}
        </button>
      </form>

      {result && (
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: '#f5f5f5',
          borderRadius: '4px'
        }}>
          <h3>Result:</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {JSON.stringify(result, null, 2)}
          </pre>

          {result.data?.success && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#e8f5e9',
              borderRadius: '4px'
            }}>
              <strong>✅ Login Successful!</strong>
              <br />
              <strong>User Plan:</strong> {result.data.user?.plan || 'Not found'}
              <br />
              <strong>Redirect URL:</strong> {result.data.redirectUrl || 'Not specified'}
              <br />
              <br />
              <button
                onClick={() => window.location.href = result.data.redirectUrl}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Go to Dashboard
              </button>
            </div>
          )}

          {result.data?.error === 'user_not_found' && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#fff3e0',
              borderRadius: '4px'
            }}>
              <strong>⚠️ User Not Found</strong>
              <br />
              This email is not registered in GoHighLevel.
              <br />
              <a href="#register">Create Account</a>
            </div>
          )}
        </div>
      )}

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#e3f2fd',
        borderRadius: '4px'
      }}>
        <h3>Test Instructions:</h3>
        <ol>
          <li>Enter an email that exists in your GoHighLevel account</li>
          <li>Enter any password (6+ characters for dev mode)</li>
          <li>Click "Test Login"</li>
          <li>Check the result to see:
            <ul>
              <li>If the user was found</li>
              <li>What plan they have</li>
              <li>What URL they would be redirected to</li>
            </ul>
          </li>
        </ol>
        
        <h4>Known Test User:</h4>
        <p>Email: test-auth@example.com</p>
        <p>Expected Plan: pro</p>
        <p>Expected Redirect: https://siteoptz.ai/dashboard/pro</p>
      </div>

      <div style={{ 
        marginTop: '1rem',
        padding: '0.5rem',
        background: '#fafafa',
        borderRadius: '4px',
        fontSize: '0.9rem'
      }}>
        <strong>Debug Info:</strong>
        <br />
        Check browser console for additional logging
      </div>
    </div>
  );
}