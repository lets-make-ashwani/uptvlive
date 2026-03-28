import { useState, useEffect } from 'react';
import { fetchPosts } from '../services/api';
import BreakingTicker from '../components/BreakingTicker';
import HeroSection from '../components/HeroSection';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';

const cities = ['सभी', 'लखनऊ', 'वाराणसी', 'कानपुर', 'आगरा', 'नोएडा', 'प्रयागराज', 'दिल्ली', 'मुंबई'];

export default function HomePage() {
  const [allPosts, setAllPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [videoPosts, setVideoPosts] = useState([]);
  const [breakingPosts, setBreakingPosts] = useState([]);
  const [selectedCity, setSelectedCity] = useState('सभी');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [allRes, trendingRes, videoRes, breakingRes] = await Promise.all([
        fetchPosts({ limit: 50 }),
        fetchPosts({ trending: 'true', limit: 10 }),
        fetchPosts({ type: 'video', limit: 8 }),
        fetchPosts({ breaking: 'true', limit: 5 })
      ]);
      
      setAllPosts(allRes.data || []);
      setTrendingPosts(trendingRes.data || []);
      setVideoPosts(videoRes.data || []);
      setBreakingPosts(breakingRes.data || []);
      setError(null);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('समाचार लोड करने में त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  // Featured posts for hero
  const featuredPosts = allPosts.filter(p => p.isFeatured).length > 0
    ? allPosts.filter(p => p.isFeatured)
    : allPosts.slice(0, 5);

  // City filtered posts
  const cityPosts = selectedCity === 'सभी'
    ? allPosts
    : allPosts.filter(p => p.city === selectedCity);

  // Latest news (non-featured, non-video)
  const latestNews = allPosts.filter(p => p.type !== 'video').slice(0, 6);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">समाचार लोड हो रहे हैं...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-container">
        <div className="empty-state-icon">⚠️</div>
        <p>{error}</p>
        <button onClick={loadData} style={{
          background: 'var(--primary)',
          color: 'white',
          padding: '10px 24px',
          borderRadius: 'var(--radius-md)',
          fontWeight: '600',
          marginTop: '12px'
        }}>
          पुनः प्रयास करें
        </button>
      </div>
    );
  }

  if (allPosts.length === 0) {
    return (
      <div className="loading-container">
        <div className="empty-state-icon">📰</div>
        <p className="loading-text">अभी कोई समाचार उपलब्ध नहीं है।</p>
        <p className="loading-text" style={{ fontSize: '12px' }}>
          Admin Panel से समाचार जोड़ें।
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Breaking News Ticker */}
      <BreakingTicker posts={breakingPosts.length > 0 ? breakingPosts : allPosts.slice(0, 3)} />

      {/* Hero Section */}
      <HeroSection posts={featuredPosts} />

      {/* Main Content + Sidebar */}
      <div className="container">
        <div className="main-layout">
          <div>
            {/* Latest News */}
            <section>
              <div className="section-header">
                <h2 className="section-title">ताज़ा खबरें</h2>
                <span className="section-link">और देखें →</span>
              </div>
              <div className="news-grid">
                {latestNews.map(post => (
                  <NewsCard key={post._id} post={post} />
                ))}
              </div>
            </section>

            {/* City News */}
            <section className="city-section">
              <div className="section-header">
                <h2 className="section-title">शहर की खबरें</h2>
              </div>
              <div className="city-tabs">
                {cities.map(city => (
                  <button
                    key={city}
                    className={`city-tab ${selectedCity === city ? 'active' : ''}`}
                    onClick={() => setSelectedCity(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
              <div className="news-grid">
                {cityPosts.length > 0 ? (
                  cityPosts.slice(0, 6).map(post => (
                    <NewsCard key={post._id} post={post} />
                  ))
                ) : (
                  <div className="empty-state">
                    <p>इस शहर से कोई खबर नहीं मिली।</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <Sidebar trendingPosts={trendingPosts} videoPosts={videoPosts} />
        </div>
      </div>

      {/* Video Section */}
      {videoPosts.length > 0 && (
        <section className="video-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">📺 वीडियो</h2>
              <span className="section-link" style={{ color: 'var(--accent)' }}>सभी वीडियो →</span>
            </div>
            <div className="video-grid">
              {videoPosts.slice(0, 4).map(post => (
                <NewsCard key={post._id} post={post} isVideo />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
