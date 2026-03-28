import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPosts, deletePost as deletePostApi } from '../services/api';

export default function Dashboard({ onLogout }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteModal, setDeleteModal] = useState(null);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts({ limit: 100 });
      setPosts(data.data || []);
    } catch (err) {
      console.error('Error loading posts:', err);
      showToast('पोस्ट लोड करने में त्रुटि', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    try {
      await deletePostApi(deleteModal._id);
      setPosts(posts.filter(p => p._id !== deleteModal._id));
      setDeleteModal(null);
      showToast('पोस्ट सफलतापूर्वक हटा दी गई ✅', 'success');
    } catch (err) {
      showToast('डिलीट करने में त्रुटि', 'error');
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredPosts = posts.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.city?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Stats
  const totalPosts = posts.length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
  const videoPosts = posts.filter(p => p.type === 'video').length;
  const breakingPosts = posts.filter(p => p.isBreaking).length;

  const adminUser = localStorage.getItem('admin_user') || 'Admin';

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span>UP TV</span>
            <span>LIVE</span>
          </div>
          <div className="sidebar-brand">
            <h3>UP TV Live</h3>
            <p>Admin Panel</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link active">
            <span className="sidebar-link-icon">📊</span>
            डैशबोर्ड
          </Link>
          <Link to="/posts/new" className="sidebar-link">
            <span className="sidebar-link-icon">✍️</span>
            नई पोस्ट
          </Link>
          <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer" className="sidebar-link">
            <span className="sidebar-link-icon">🌐</span>
            फ्रंटएंड देखें
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{adminUser[0]?.toUpperCase()}</div>
            <div className="sidebar-user-info">
              <p>{adminUser}</p>
              <span>एडमिन</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <h2>📊 डैशबोर्ड</h2>
          <div className="admin-header-actions">
            <Link to="/posts/new" className="btn btn-primary btn-sm">
              ✍️ नई पोस्ट
            </Link>
            <button onClick={onLogout} className="btn btn-secondary btn-sm">
              🚪 लॉगआउट
            </button>
          </div>
        </header>

        <div className="admin-content">
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-header">
                <span className="stat-card-label">कुल पोस्ट</span>
                <div className="stat-card-icon red">📰</div>
              </div>
              <div className="stat-card-value">{totalPosts}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-header">
                <span className="stat-card-label">कुल व्यूज़</span>
                <div className="stat-card-icon blue">👁️</div>
              </div>
              <div className="stat-card-value">{totalViews.toLocaleString('hi-IN')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-header">
                <span className="stat-card-label">वीडियो</span>
                <div className="stat-card-icon yellow">📺</div>
              </div>
              <div className="stat-card-value">{videoPosts}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-header">
                <span className="stat-card-label">ब्रेकिंग न्यूज़</span>
                <div className="stat-card-icon green">🔴</div>
              </div>
              <div className="stat-card-value">{breakingPosts}</div>
            </div>
          </div>

          {/* Posts Table */}
          <div className="table-wrapper">
            <div className="table-header">
              <h3>📋 सभी पोस्ट ({filteredPosts.length})</h3>
              <input
                type="text"
                className="table-search"
                placeholder="🔍 खोजें..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>छवि</th>
                    <th>शीर्षक</th>
                    <th>श्रेणी</th>
                    <th>शहर</th>
                    <th>प्रकार</th>
                    <th>व्यूज़</th>
                    <th>तिथि</th>
                    <th>एक्शन</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        कोई पोस्ट नहीं मिली
                      </td>
                    </tr>
                  ) : (
                    filteredPosts.map(post => (
                      <tr key={post._id}>
                        <td>
                          {post.image ? (
                            <img src={post.image} alt="" className="table-img" />
                          ) : (
                            <div className="table-img" style={{ background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>📷</div>
                          )}
                        </td>
                        <td>
                          <span className="table-title">{post.title}</span>
                          {post.isBreaking && <span className="badge badge-breaking" style={{ marginLeft: '6px' }}>BREAKING</span>}
                          {post.isTrending && <span className="badge badge-trending" style={{ marginLeft: '4px' }}>TRENDING</span>}
                        </td>
                        <td>{post.category}</td>
                        <td>{post.city}</td>
                        <td>
                          <span className={`badge ${post.type === 'video' ? 'badge-video' : 'badge-news'}`}>
                            {post.type === 'video' ? '📺 वीडियो' : '📰 न्यूज़'}
                          </span>
                        </td>
                        <td>{post.views?.toLocaleString('hi-IN')}</td>
                        <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{formatDate(post.createdAt)}</td>
                        <td>
                          <div className="table-actions">
                            <button
                              className="btn-icon edit"
                              onClick={() => navigate(`/posts/edit/${post._id}`)}
                              title="एडिट करें"
                            >
                              ✏️
                            </button>
                            <button
                              className="btn-icon delete"
                              onClick={() => setDeleteModal(post)}
                              title="डिलीट करें"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="modal-overlay" onClick={() => setDeleteModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>⚠️ पोस्ट हटाएं?</h3>
            <p>क्या आप "{deleteModal.title}" को हटाना चाहते हैं? यह बदलाव पूर्ववत नहीं किया जा सकता।</p>
            <div className="modal-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => setDeleteModal(null)}>
                रद्द करें
              </button>
              <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                🗑️ हटाएं
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}
