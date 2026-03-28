import { useState } from 'react';
import { login } from '../services/api';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('कृपया यूजरनेम और पासवर्ड दर्ज करें');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await login(username, password);
      if (data.success) {
        onLogin(data.token, data.username);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'लॉगिन में त्रुटि हुई');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">
            <span>UP TV</span>
            <span>LIVE</span>
          </div>
          <h2>Admin Panel</h2>
          <p>एडमिन पैनल में लॉगिन करें</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>यूजरनेम</label>
            <input
              type="text"
              className="form-input"
              placeholder="Username दर्ज करें"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>पासवर्ड</label>
            <input
              type="password"
              className="form-input"
              placeholder="Password दर्ज करें"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? '⏳ लॉगिन हो रहा है...' : '🔐 लॉगिन करें'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: 'var(--text-muted)' }}>
          Default: admin / admin123
        </p>
      </div>
    </div>
  );
}
