import { Link } from 'react-router-dom';
import { formatTime, extractYouTubeId } from '../utils/helpers';

export default function NewsCard({ post, isVideo = false }) {
  const thumbnail = post.type === 'video' && post.videoUrl
    ? `https://img.youtube.com/vi/${extractYouTubeId(post.videoUrl)}/hqdefault.jpg`
    : post.image;

  return (
    <Link to={`/article/${post.slug}`} className={isVideo ? 'video-card' : 'news-card'}>
      <div className={isVideo ? 'video-card-img' : 'news-card-img'}>
        <img
          src={thumbnail || 'https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=400'}
          alt={post.title}
          loading="lazy"
        />
        {!isVideo && (
          <span className="category-badge">{post.category}</span>
        )}
        {(post.type === 'video' || isVideo) && (
          <div className={isVideo ? 'video-play-btn' : 'video-badge'}>▶</div>
        )}
      </div>
      <div className={isVideo ? 'video-card-body' : 'news-card-body'}>
        <h3>{isVideo ? null : post.title}</h3>
        {isVideo && <h4>{post.title}</h4>}
        {!isVideo && post.excerpt && (
          <p className="excerpt">{post.excerpt}</p>
        )}
        <div className="meta">
          {!isVideo && (
            <>
              <span className="meta-item">📍 {post.city}</span>
              <span className="meta-item">⏰ {formatTime(post.createdAt)}</span>
            </>
          )}
          {isVideo && (
            <span>{formatTime(post.createdAt)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
