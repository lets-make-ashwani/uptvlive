import { Link } from 'react-router-dom';
import { formatTime } from '../utils/helpers';

export default function HeroSection({ posts }) {
  if (!posts || posts.length === 0) return null;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 5);

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Main Hero */}
          <Link to={`/article/${mainPost.slug}`} className="hero-main">
            <img 
              src={mainPost.image || 'https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=800'} 
              alt={mainPost.title}
            />
            <div className="hero-overlay">
              <span className="category-badge">{mainPost.category}</span>
              <h2>{mainPost.title}</h2>
              <div className="meta">
                <span>📍 {mainPost.city}</span>
                <span>⏰ {formatTime(mainPost.createdAt)}</span>
                <span>👁️ {mainPost.views?.toLocaleString('hi-IN')} व्यूज़</span>
              </div>
            </div>
          </Link>

          {/* Side Posts */}
          <div className="hero-sidebar-list">
            {sidePosts.map(post => (
              <Link to={`/article/${post.slug}`} key={post._id} className="hero-side-card">
                <img 
                  src={post.image || 'https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=400'} 
                  alt={post.title}
                />
                <div className="card-content">
                  <h3>{post.title}</h3>
                  <div className="meta">
                    <span>{formatTime(post.createdAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
