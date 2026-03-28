import { Link } from 'react-router-dom';
import { formatTime } from '../utils/helpers';

export default function Sidebar({ trendingPosts, videoPosts }) {
  return (
    <aside className="sidebar">
      {/* Ad Widget */}
      <div className="ad-widget">
        <p>विज्ञापन स्थान</p>
        <p style={{ fontSize: '12px', marginTop: '8px' }}>AD SPACE - 300x250</p>
      </div>

      {/* Trending Widget */}
      {trendingPosts && trendingPosts.length > 0 && (
        <div className="sidebar-widget">
          <h3 className="widget-title">🔥 ट्रेंडिंग</h3>
          <div className="trending-list">
            {trendingPosts.slice(0, 5).map((post, index) => (
              <Link to={`/article/${post.slug}`} key={post._id} className="trending-item">
                <span className="trending-number">{index + 1}</span>
                <div>
                  <h4>{post.title}</h4>
                  <div className="meta">{formatTime(post.createdAt)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Video Widget */}
      {videoPosts && videoPosts.length > 0 && (
        <div className="sidebar-widget">
          <h3 className="widget-title">📺 वीडियो</h3>
          <div className="trending-list">
            {videoPosts.slice(0, 4).map((post) => (
              <Link to={`/article/${post.slug}`} key={post._id} className="trending-item">
                <div>
                  <h4>▶ {post.title}</h4>
                  <div className="meta">{formatTime(post.createdAt)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Weather Widget placeholder */}
      <div className="sidebar-widget" style={{ textAlign: 'center' }}>
        <h3 className="widget-title">🌤️ मौसम</h3>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>☀️</div>
        <p style={{ fontSize: '24px', fontWeight: '800' }}>34°C</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>लखनऊ, उत्तर प्रदेश</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
          आज का मौसम: साफ आसमान
        </p>
      </div>

      {/* Another Ad */}
      <div className="ad-widget">
        <p>विज्ञापन स्थान</p>
        <p style={{ fontSize: '12px', marginTop: '8px' }}>AD SPACE - 300x600</p>
      </div>
    </aside>
  );
}
