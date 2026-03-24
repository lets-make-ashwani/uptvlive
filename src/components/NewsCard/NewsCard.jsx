import { Link } from "react-router-dom";
import "./NewsCard.css";

const NewsCard = ({ news }) => {
  return (
    <Link to={`/article/${news.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      
      <div className="news-card">

        <img 
          src={news.image} 
          alt={news.title} 
          style={{ height: "170px", width: "100%", objectFit: "cover" }}
        />

        <div className="news-card-body">
          <span className="tag">{news.category}</span>

          <div className="news-card-title">
            {news.title}
          </div>

          <div className="news-card-meta">
            ⏰ {news.time} • 👁 {news.views}
          </div>
        </div>

      </div>

    </Link>
  );
};

export default NewsCard;