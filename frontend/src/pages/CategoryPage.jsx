import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPosts } from '../services/api';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';

export default function CategoryPage() {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    window.scrollTo(0, 0);
    document.title = `${category} - UP TV Live`;
  }, [category]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [catRes, trendRes] = await Promise.all([
        fetchPosts({ category, limit: 20 }),
        fetchPosts({ trending: 'true', limit: 5 })
      ]);
      setPosts(catRes.data || []);
      setTrendingPosts(trendRes.data || []);
    } catch (err) {
      console.error('Error loading category:', err);
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

  return (
    <div className="container">
      <div className="main-layout">
        <div>
          <div className="section-header" style={{ marginTop: '24px' }}>
            <h2 className="section-title">{category}</h2>
            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              {posts.length} खबरें
            </span>
          </div>
          {posts.length > 0 ? (
            <div className="news-grid">
              {posts.map(post => (
                <NewsCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <p>इस श्रेणी में अभी कोई खबर नहीं है।</p>
            </div>
          )}
        </div>
        <Sidebar trendingPosts={trendingPosts} />
      </div>
    </div>
  );
}
