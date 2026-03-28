import "./BreakingNews.css";
import newsData from "../../data/newsData";
import { Link } from "react-router-dom";

const BreakingNews = () => {
  // 🔥 latest news first
  const latestNews = [...newsData].reverse();

  return (
    <div className="breaking">

      {/* 🔴 LEFT LABEL */}
      <div className="breaking-label">
        <span className="breaking-pulse"></span>
        ब्रेकिंग
      </div>

      {/* 📰 TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">

          {latestNews.map((news) => (
            <Link
              to={`/article/${news.slug}`}
              key={news.id}
              className="ticker-item"
            >
              {news.title}
              <span className="ticker-sep"> ● </span>
            </Link>
          ))}

          {/* 🔁 Duplicate for smooth infinite scroll */}
          {latestNews.map((news) => (
            <Link
              to={`/article/${news.slug}`}
              key={`dup-${news.id}`}
              className="ticker-item"
            >
              {news.title}
              <span className="ticker-sep"> ● </span>
            </Link>
          ))}

        </div>
      </div>

    </div>
  );
};

export default BreakingNews;