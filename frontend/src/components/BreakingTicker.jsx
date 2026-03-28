import { Link } from 'react-router-dom';

export default function BreakingTicker({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="breaking-ticker">
      <div className="breaking-badge">
        <span className="breaking-dot"></span>
        ब्रेकिंग न्यूज़
      </div>
      <div className="ticker-content">
        {/* Duplicate for seamless loop */}
        {[...posts, ...posts].map((post, i) => (
          <Link to={`/article/${post.slug}`} key={i} className="ticker-item">
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
