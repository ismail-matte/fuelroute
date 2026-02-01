'use client';

import { useState, useEffect } from 'react';
import { isLoggedIn, login, logout, getAdminConfig, updateAdminConfig, changePassword, requestPasswordReset, resetPassword, generateSocialPost, postToSocialMedia, type AdminConfig } from '../../lib/admin';
import { getAnalytics } from '../../lib/analytics';
import { getHistory } from '../../lib/historyManager';
import './admin.css';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'social' | 'settings'>('dashboard');
  const [config, setConfig] = useState<AdminConfig | null>(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (isLoggedIn()) {
      setLoggedIn(true);
      setConfig(getAdminConfig());
    }
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setLoginError('');
    
    // Simulate async login (add small delay for UX)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (login(username, password)) {
      setLoggedIn(true);
      setConfig(getAdminConfig());
      setLoginError('');
    } else {
      setLoginError('Invalid username or password. Please try again.');
    }
    
    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setConfig(null);
  };

  const handlePasswordReset = async () => {
    const success = await requestPasswordReset(resetEmail);
    if (success) {
      alert('Password reset instructions sent to your email!');
      setShowPasswordReset(false);
    } else {
      alert('Email not found');
    }
  };

  const handleResetPassword = () => {
    if (resetPassword(resetToken, newPassword)) {
      alert('Password reset successful! Please login with your new password.');
      setShowPasswordReset(false);
      setResetToken('');
      setNewPassword('');
    } else {
      alert('Invalid or expired reset token');
    }
  };

  const handlePostToSocial = async () => {
    const post = generateSocialPost();
    const success = await postToSocialMedia(post);
    if (success) {
      alert(`Posted to ${post.platform} successfully!`);
    } else {
      alert('Failed to post. Check your API configuration.');
    }
  };

  if (!loggedIn) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-logo">
            <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#0a66c2"/>
              <path d="M12 28V16L20 12L28 16V28H24V20H16V28H12Z" fill="white"/>
              <circle cx="20" cy="24" r="2" fill="#0a66c2"/>
            </svg>
          </div>
          <h1>FuelRoute Admin</h1>
          <p>Control Panel</p>

          {!showPasswordReset ? (
            <>
              <div className="admin-form">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="admin-input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoggingIn && handleLogin()}
                  className="admin-input"
                  disabled={isLoggingIn}
                />
                {loginError && <p className="admin-error">{loginError}</p>}
                <button
                  onClick={handleLogin}
                  className="admin-btn-primary"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <span className="admin-spinner"></span>
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
                <button 
                  onClick={() => setShowPasswordReset(true)} 
                  className="admin-btn-link"
                >
                  Forgot Password?
                </button>
              </div>
            </>
          ) : (
            <div className="admin-form">
              <h3>Reset Password</h3>
              {!resetToken ? (
                <>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="admin-input"
                  />
                  <button onClick={handlePasswordReset} className="admin-btn-primary">
                    Send Reset Link
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Reset token from email"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    className="admin-input"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="admin-input"
                  />
                  <button onClick={handleResetPassword} className="admin-btn-primary">
                    Reset Password
                  </button>
                </>
              )}
              <button 
                onClick={() => setShowPasswordReset(false)} 
                className="admin-btn-link"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const analytics = getAnalytics();
  const history = getHistory();
  const postHistory = JSON.parse(localStorage.getItem('fuelroute_post_history') || '[]');

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <h1>🎛️ FuelRoute Admin</h1>
          <p>Welcome back, {config?.username}</p>
        </div>
        <button onClick={handleLogout} className="admin-btn-logout">
          Logout
        </button>
      </header>

      {/* Tabs */}
      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={`admin-tab ${activeTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          📱 Social Media
        </button>
        <button 
          className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="admin-content">
          <h2>Analytics Overview</h2>
          
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon">👥</div>
              <div className="admin-stat-value">{analytics.totalVisits}</div>
              <div className="admin-stat-label">Total Visits</div>
            </div>
            
            <div className="admin-stat-card">
              <div className="admin-stat-icon">🧮</div>
              <div className="admin-stat-value">{analytics.totalCalculations}</div>
              <div className="admin-stat-label">Calculations</div>
            </div>
            
            <div className="admin-stat-card">
              <div className="admin-stat-icon">📊</div>
              <div className="admin-stat-value">{history.length}</div>
              <div className="admin-stat-label">Saved Journeys</div>
            </div>
            
            <div className="admin-stat-card">
              <div className="admin-stat-icon">📱</div>
              <div className="admin-stat-value">{postHistory.length}</div>
              <div className="admin-stat-label">Social Posts</div>
            </div>
          </div>

          <div className="admin-section">
            <h3>Recent Calculations</h3>
            <div className="admin-table">
              {history.slice(0, 10).map((item) => (
                <div key={item.id} className="admin-table-row">
                  <div>{item.locationFrom} → {item.locationTo}</div>
                  <div>{item.distance.toFixed(1)} {item.distanceUnit}</div>
                  <div>{item.currencySymbol}{item.cost.toFixed(2)}</div>
                  <div>{new Date(item.timestamp).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Social Media Tab */}
      {activeTab === 'social' && (
        <div className="admin-content">
          <h2>Social Media Management</h2>
          
          <div className="admin-section">
            <h3>Quick Post</h3>
            <button onClick={handlePostToSocial} className="admin-btn-primary">
              📤 Generate & Post to Social Media
            </button>
            <p className="admin-hint">Automatically generates and posts content to configured platforms</p>
          </div>

          <div className="admin-section">
            <h3>API Configuration</h3>
            <div className="admin-api-grid">
              <div className="admin-api-card">
                <h4>🐦 Twitter</h4>
                <input type="text" placeholder="API Key" className="admin-input" />
                <input type="text" placeholder="API Secret" className="admin-input" />
                <input type="text" placeholder="Access Token" className="admin-input" />
                <input type="text" placeholder="Access Secret" className="admin-input" />
                <button className="admin-btn-secondary">Save Twitter Config</button>
              </div>

              <div className="admin-api-card">
                <h4>📘 Facebook</h4>
                <input type="text" placeholder="Page ID" className="admin-input" />
                <input type="text" placeholder="Access Token" className="admin-input" />
                <button className="admin-btn-secondary">Save Facebook Config</button>
              </div>

              <div className="admin-api-card">
                <h4>💼 LinkedIn</h4>
                <input type="text" placeholder="Access Token" className="admin-input" />
                <button className="admin-btn-secondary">Save LinkedIn Config</button>
              </div>

              <div className="admin-api-card">
                <h4>📸 Instagram</h4>
                <input type="text" placeholder="Username" className="admin-input" />
                <input type="password" placeholder="Password" className="admin-input" />
                <button className="admin-btn-secondary">Save Instagram Config</button>
              </div>
            </div>
          </div>

          <div className="admin-section">
            <h3>Post History</h3>
            <div className="admin-table">
              {postHistory.slice(0, 10).map((post: any, i: number) => (
                <div key={i} className="admin-table-row">
                  <div>{post.platform}</div>
                  <div>{post.content.substring(0, 50)}...</div>
                  <div>{new Date(post.timestamp).toLocaleDateString()}</div>
                  <div className="admin-status-success">{post.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="admin-content">
          <h2>Settings</h2>
          
          <div className="admin-section">
            <h3>Account Settings</h3>
            <div className="admin-form-group">
              <label>Username</label>
              <input 
                type="text" 
                value={config?.username || ''} 
                className="admin-input"
                disabled
              />
            </div>
            <div className="admin-form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={config?.email || ''} 
                className="admin-input"
                disabled
              />
            </div>
          </div>

          <div className="admin-section">
            <h3>Change Password</h3>
            <div className="admin-form-group">
              <label>Old Password</label>
              <input type="password" className="admin-input" id="oldPassword" />
            </div>
            <div className="admin-form-group">
              <label>New Password</label>
              <input type="password" className="admin-input" id="newPassword" />
            </div>
            <button 
              onClick={() => {
                const oldPwd = (document.getElementById('oldPassword') as HTMLInputElement).value;
                const newPwd = (document.getElementById('newPassword') as HTMLInputElement).value;
                if (changePassword(oldPwd, newPwd)) {
                  alert('Password changed successfully!');
                } else {
                  alert('Old password incorrect');
                }
              }}
              className="admin-btn-primary"
            >
              Update Password
            </button>
          </div>

          <div className="admin-section">
            <h3>Contact Information</h3>
            <div className="admin-info-grid">
              <div className="admin-info-card">
                <strong>PayPal:</strong> imatte@engineer.com
              </div>
              <div className="admin-info-card">
                <strong>Mobile Money:</strong> +256 782 475 028
              </div>
              <div className="admin-info-card">
                <strong>General Email:</strong> info@tech-center.com
              </div>
              <div className="admin-info-card">
                <strong>Business Email:</strong> imatte@engineer.com
              </div>
            </div>
          </div>

          <div className="admin-section">
            <h3>Auto-Posting Settings</h3>
            <div className="admin-form-group">
              <label>
                <input 
                  type="checkbox" 
                  checked={config?.autoPost || false}
                  onChange={(e) => {
                    updateAdminConfig({ autoPost: e.target.checked });
                    setConfig(getAdminConfig());
                  }}
                />
                Enable automatic social media posting
              </label>
            </div>
            <div className="admin-form-group">
              <label>Post Frequency</label>
              <select 
                value={config?.postFrequency || 'weekly'}
                onChange={(e) => {
                  updateAdminConfig({ postFrequency: e.target.value as any });
                  setConfig(getAdminConfig());
                }}
                className="admin-input"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="admin-section admin-danger-zone">
            <h3>⚠️ Danger Zone</h3>
            <button 
              onClick={() => {
                if (confirm('Clear all analytics data?')) {
                  localStorage.removeItem('fuelroute_analytics');
                  alert('Analytics cleared');
                }
              }}
              className="admin-btn-danger"
            >
              Clear Analytics
            </button>
            <button 
              onClick={() => {
                if (confirm('Clear all calculation history?')) {
                  localStorage.removeItem('fuelroute_history');
                  alert('History cleared');
                }
              }}
              className="admin-btn-danger"
            >
              Clear History
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
