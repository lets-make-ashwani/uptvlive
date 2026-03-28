import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPostBySlug } from '../services/api';
import { formatTime, extractYouTubeId } from '../utils/helpers';
import NewsCard from '../components/NewsCard';

export default function ArticlePage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const res = await fetchPostBySlug(slug);
      setPost(res.data);
      setRelated(res.related || []);
      setError(null);
      
      // Update page title
      document.title = `${res.data.title} - UP TV Live`;
    } catch (err) {
      console.error('Error loading post:', err);
      setError('समाचार नहीं मिला। कृपया बाद में पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">लोड हो रहा है...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="empty-state-icon">😔</div>
          <p>{error || 'पोस्ट नहीं मिली'}</p>
          <Link to="/" style={{
            background: 'var(--primary)',
            color: 'white',
            padding: '10px 24px',
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            display: 'inline-block',
            marginTop: '12px'
          }}>
            होमपेज पर जाएं
          </Link>
        </div>
      </div>
    );
  }

  const youtubeId = post.type === 'video' ? extractYouTubeId(post.videoUrl) : null;

  return (
    <div className="container">
      <div className="main-layout">
        <article className="article-page">
          {/* Breadcrumb */}
          <div className="article-breadcrumb">
            <Link to="/">🏠 होम</Link>
            <span>›</span>
            <Link to={`/category/${post.category}`}>{post.category}</Link>
            <span>›</span>
            <span>{post.city}</span>
          </div>

          {/* Article Header */}
          <div className="article-header">
            <span className="article-category">{post.category}</span>
            <h1 className="article-title">{post.title}</h1>
            <div className="article-meta">
              <span className="article-meta-item">✍️ {post.author}</span>
              <span className="article-meta-item">📅 {formatTime(post.createdAt)}</span>
              <span className="article-meta-item">📍 {post.city}</span>
              <span className="article-meta-item">👁️ {post.views?.toLocaleString('hi-IN')} व्यूज़</span>
            </div>
          </div>

          {/* Video embed */}
          {youtubeId && (
            <iframe
              className="article-video"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={post.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}

          {/* Article Image */}
          {post.image && !youtubeId && (
            <img className="article-image" src={post.image} alt={post.title} />
          )}

          {/* Article Content */}
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="article-tags">
              <span style={{ fontWeight: '700', marginRight: '8px' }}>टैग:</span>
              {post.tags.map(tag => (
                <span key={tag} className="tag"># {tag}</span>
              ))}
            </div>
          )}

          {/* Related News */}
          {related.length > 0 && (
            <section className="related-section">
              <div className="section-header">
                <h2 className="section-title">संबंधित खबरें</h2>
              </div>
              <div className="news-grid">
                {related.slice(0, 3).map(post => (
                  <NewsCard key={post._id} post={post} />
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="ad-widget">
            <p>विज्ञापन स्थान</p>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>AD SPACE</p>
          </div>

          {related.length > 2 && (
            <div className="sidebar-widget">
              <h3 className="widget-title">📰 और पढ़ें</h3>
              <div className="trending-list">
                {related.slice(0, 5).map((p, i) => (
                  <Link to={`/article/${p.slug}`} key={p._id} className="trending-item">
                    <span className="trending-number">{i + 1}</span>
                    <div>
                      <h4>{p.title}</h4>
                      <div className="meta">{formatTime(p.createdAt)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
