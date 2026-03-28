import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createPost, updatePost, fetchPostById } from '../services/api';

const categories = ['राजनीति', 'खेल', 'मनोरंजन', 'व्यापार', 'टेक्नोलॉजी', 'शिक्षा', 'स्वास्थ्य', 'अपराध', 'सामान्य', 'अंतरराष्ट्रीय', 'राष्ट्रीय', 'उत्तर प्रदेश'];
const cities = ['लखनऊ', 'वाराणसी', 'कानपुर', 'आगरा', 'नोएडा', 'प्रयागराज', 'दिल्ली', 'मुंबई', 'मेरठ', 'गोरखपुर', 'इलाहाबाद', 'अन्य'];

const initialFormData = {
  title: '',
  image: '',
  content: '',
  city: 'लखनऊ',
  category: 'सामान्य',
  type: 'news',
  videoUrl: '',
  views: 0,
  isBreaking: false,
  isTrending: false,
  isFeatured: false,
  tags: '',
  author: 'UP TV Live'
};

export default function PostForm({ onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEditing) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const data = await fetchPostById(id);
      const post = data.data;
      setFormData({
        title: post.title || '',
        image: post.image || '',
        content: post.content || '',
        city: post.city || 'लखनऊ',
        category: post.category || 'सामान्य',
        type: post.type || 'news',
        videoUrl: post.videoUrl || '',
        views: post.views || 0,
        isBreaking: post.isBreaking || false,
        isTrending: post.isTrending || false,
        isFeatured: post.isFeatured || false,
        tags: post.tags?.join(', ') || '',
        author: post.author || 'UP TV Live'
      });
    } catch (err) {
      setError('पोस्ट लोड करने में त्रुटि');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.title.trim()) {
      setError('शीर्षक आवश्यक है');
      return;
    }
    if (!formData.content.trim()) {
      setError('सामग्री आवश्यक है');
      return;
    }
    if (formData.type === 'video' && !formData.videoUrl.trim()) {
      setError('वीडियो URL आवश्यक है');
      return;
    }

    try {
      setSaving(true);
      const submitData = {
        ...formData,
        views: parseInt(formData.views) || 0,
        tags: formData.tags
          ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
          : []
      };

      if (isEditing) {
        await updatePost(id, submitData);
        setSuccess('पोस्ट सफलतापूर्वक अपडेट हो गई! ✅');
      } else {
        await createPost(submitData);
        setSuccess('पोस्ट सफलतापूर्वक प्रकाशित हो गई! ✅');
        setFormData(initialFormData);
      }

      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'सेव करने में त्रुटि हुई');
    } finally {
      setSaving(false);
    }
  };

  const adminUser = localStorage.getItem('admin_user') || 'Admin';

  if (loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar adminUser={adminUser} />
        <div className="admin-main">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar adminUser={adminUser} />

      <div className="admin-main">
        <header className="admin-header">
          <h2>{isEditing ? '✏️ पोस्ट संपादित करें' : '✍️ नई पोस्ट बनाएं'}</h2>
          <div className="admin-header-actions">
            <Link to="/" className="btn btn-secondary btn-sm">← वापस जाएं</Link>
            <button onClick={onLogout} className="btn btn-secondary btn-sm">🚪 लॉगआउट</button>
          </div>
        </header>

        <div className="admin-content">
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="post-form">
            <h3>{isEditing ? 'पोस्ट संपादित करें' : 'नई पोस्ट'}</h3>

            {/* Title */}
            <div className="form-group">
              <label>शीर्षक *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="समाचार का शीर्षक दर्ज करें..."
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Author & Type */}
            <div className="form-row">
              <div className="form-group">
                <label>लेखक</label>
                <input
                  type="text"
                  name="author"
                  className="form-input"
                  placeholder="लेखक का नाम"
                  value={formData.author}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>प्रकार</label>
                <select name="type" className="form-select" value={formData.type} onChange={handleChange}>
                  <option value="news">📰 न्यूज़</option>
                  <option value="video">📺 वीडियो</option>
                </select>
              </div>
            </div>

            {/* Category, City, Views */}
            <div className="form-row-3">
              <div className="form-group">
                <label>श्रेणी</label>
                <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>शहर</label>
                <select name="city" className="form-select" value={formData.city} onChange={handleChange}>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>व्यूज़</label>
                <input
                  type="number"
                  name="views"
                  className="form-input"
                  value={formData.views}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="form-group">
              <label>छवि URL</label>
              <input
                type="url"
                name="image"
                className="form-input"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleChange}
              />
              {formData.image && (
                <div className="image-preview">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              )}
            </div>

            {/* Video URL (conditional) */}
            {formData.type === 'video' && (
              <div className="form-group">
                <label>वीडियो URL (YouTube) *</label>
                <input
                  type="url"
                  name="videoUrl"
                  className="form-input"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.videoUrl}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Content */}
            <div className="form-group">
              <label>सामग्री * (HTML सपोर्टेड)</label>
              <textarea
                name="content"
                className="form-textarea"
                placeholder="<p>यहां समाचार की सामग्री लिखें...</p>"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tags */}
            <div className="form-group">
              <label>टैग (कॉमा से अलग करें)</label>
              <input
                type="text"
                name="tags"
                className="form-input"
                placeholder="राजनीति, UP, चुनाव"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            {/* Flags */}
            <div className="form-row-3" style={{ marginBottom: '0' }}>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="isBreaking"
                  name="isBreaking"
                  checked={formData.isBreaking}
                  onChange={handleChange}
                />
                <label htmlFor="isBreaking">🔴 ब्रेकिंग न्यूज़</label>
              </div>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="isTrending"
                  name="isTrending"
                  checked={formData.isTrending}
                  onChange={handleChange}
                />
                <label htmlFor="isTrending">🔥 ट्रेंडिंग</label>
              </div>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                />
                <label htmlFor="isFeatured">⭐ फीचर्ड</label>
              </div>
            </div>

            {/* Actions */}
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving
                  ? '⏳ सेव हो रहा है...'
                  : isEditing
                    ? '💾 अपडेट करें'
                    : '🚀 प्रकाशित करें'
                }
              </button>
              <Link to="/" className="btn btn-secondary">रद्द करें</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Sidebar sub-component
function AdminSidebar({ adminUser }) {
  return (
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
        <Link to="/" className="sidebar-link">
          <span className="sidebar-link-icon">📊</span>
          डैशबोर्ड
        </Link>
        <Link to="/posts/new" className="sidebar-link active">
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
  );
}
