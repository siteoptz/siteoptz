import { useState, useEffect } from 'react';
import { getCurrentUser, logout } from '../utils/auth';

export default function Navigation() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Listen for auth events
    const handleLogin = (e) => {
      setUser(e.detail);
    };

    const handleLogout = () => {
      setUser(null);
    };

    window.addEventListener('siteoptz:login', handleLogin);
    window.addEventListener('siteoptz:register', handleLogin);
    window.addEventListener('siteoptz:logout', handleLogout);

    return () => {
      window.removeEventListener('siteoptz:login', handleLogin);
      window.removeEventListener('siteoptz:register', handleLogin);
      window.removeEventListener('siteoptz:logout', handleLogout);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (user && user.plan) {
      window.location.href = `https://siteoptz.ai/dashboard/${user.plan}`;
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="/">🚀 SiteOptz.ai</a>
        </div>
        
        <div className="nav-links">
          <a href="/compare">AI Tools</a>
          <a href="/pricing">Pricing</a>
          <a href="/features">Features</a>
        </div>

        <div className="auth-nav">
          {user && user.authenticated ? (
            <div className="user-info">
              <span className="user-email">{user.email}</span>
              <span className="user-plan">{user.plan}</span>
              <a 
                href={`https://siteoptz.ai/dashboard/${user.plan}`}
                onClick={handleDashboardClick}
                className="dashboard-link"
              >
                Dashboard
              </a>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <a 
              href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="auth-btn-register"
            >
              Get Started
            </a>
          )}
        </div>
      </div>

      <style jsx>{`
        .navigation {
          position: sticky;
          top: 0;
          background: white;
          border-bottom: 1px solid #eee;
          z-index: 100;
          padding: 1rem 0;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo a {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          flex: 1;
          justify-content: center;
        }

        .nav-links a {
          color: #666;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: #4CAF50;
        }

        .auth-nav {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .auth-btn-register {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s;
          background: #4CAF50;
          color: white;
        }

        .auth-btn-register:hover {
          background: #45a049;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-email {
          color: #666;
          font-size: 0.95rem;
        }

        .user-plan {
          padding: 0.25rem 0.5rem;
          background: #4CAF50;
          color: white;
          border-radius: 4px;
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 600;
        }

        .dashboard-link {
          padding: 0.5rem 1rem;
          background: #2196F3;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: background 0.3s;
        }

        .dashboard-link:hover {
          background: #1976D2;
        }

        .logout-btn {
          padding: 0.5rem 1rem;
          background: #f44336;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 500;
          transition: background 0.3s;
        }

        .logout-btn:hover {
          background: #d32f2f;
        }

        @media (max-width: 768px) {
          .nav-container {
            flex-wrap: wrap;
          }

          .nav-links {
            display: none;
          }

          .auth-nav {
            margin-left: auto;
          }

          .user-info {
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .user-email {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}