import "./Sidebar.css";
import newsData from "../../data/newsData";
import { Link } from "react-router-dom";

const Sidebar = () => {

  // 🔥 TRENDING (TOP VIEWS)
  const trendingNews = [...newsData]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // 🎥 VIDEOS
  const videoNews = newsData
    .filter(item => item.type === "video")
    .slice(0, 3);

  return (
    <div className="sidebar">

      {/* 🔴 AD */}
      <div className="ad-box">
        <div className="ad-label">Advertisement</div>
        <div className="ad-size">300×250</div>
      </div>

      {/* 🔥 TRENDING */}
      <div className="sidebar-section">
        <div className="sidebar-title">🔥 ट्रेंडिंग</div>

        {trendingNews.map((item, index) => (
          <Link
            to={`/article/${item.slug}`}
            key={item.id}
            className="numbered-link"
          >
            <div className="numbered-card">

              <div className="num">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <div className="numbered-title">
                  {item.title}
                </div>

                <div className="numbered-meta">
                  👁 {item.views} • {item.time}
                </div>
              </div>

            </div>
          </Link>
        ))}

      </div>

      {/* 🌦️ WEATHER */}
      <div className="weather-box">
        <div className="weather-city">☁️ लखनऊ, उत्तर प्रदेश</div>

        <div className="weather-main">
          <div className="temp">22°</div>
          <div>
            <div className="desc">बादल छाए</div>
            <div className="range">अधिकतम 27° | न्यूनतम 16°</div>
          </div>
        </div>

        <div className="weather-details">
          <span>💧 68%</span>
          <span>💨 12km/h</span>
          <span>👁️ 8km</span>
        </div>
      </div>

      {/* ▶️ VIDEOS */}
      <div className="sidebar-section">
        <div className="sidebar-title">▶️ Latest Videos</div>

        {videoNews.map((item) => (
          <Link
            to={`/article/${item.slug}`}
            key={item.id}
            className="video-link"
          >
            <div className="video-item">

              <img
                src={item.image}
                alt={item.title}
                className="video-thumb"
              />

              <div>
                <div className="video-title">
                  {item.title}
                </div>
                <div className="video-meta">
                  {item.views} views • {item.time}
                </div>
              </div>

            </div>
          </Link>
        ))}

        <div className="view-all">सभी वीडियो देखें →</div>
      </div>

    </div>
  );
};

export default Sidebar;