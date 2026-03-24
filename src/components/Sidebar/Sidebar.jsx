import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">

      {/* 🔴 AD ZONE */}
      <div className="ad-box">
        <div className="ad-label">Advertisement — Zone B</div>
        <div className="ad-size">300×250</div>
        <div className="ad-text">Premium Rectangle Ad</div>
      </div>

      {/* 🔥 TRENDING */}
      <div className="sidebar-section">
        <div className="sidebar-title">🔥 ट्रेंडिंग</div>

        {[1,2,3,4,5].map((num) => (
          <div className="numbered-card" key={num}>
            <div className="num">{String(num).padStart(2, "0")}</div>
            <div>
              <div className="numbered-title">
                कानपुर लैंबॉर्गिनी कांड — पूरी कहानी
              </div>
              <div className="numbered-meta">
                👁 24.5k • 2 घंटे पहले
              </div>
            </div>
          </div>
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

      {/* 🔴 BIG AD */}
      <div className="ad-box big">
        <div className="ad-label">Zone D — Sticky Sidebar</div>
        <div className="ad-size">300×600</div>
        <div className="ad-text">Half Page Ad</div>
      </div>

      {/* ▶️ VIDEOS */}
      <div className="sidebar-section">
        <div className="sidebar-title">▶️ Latest Videos</div>

        {[1,2,3].map((item) => (
          <div className="video-item" key={item}>
            <div className="video-thumb">▶</div>
            <div>
              <div className="video-title">
                महाशिवरात्रि LIVE: बाबा विश्वनाथ मंदिर में भव्य आरती
              </div>
              <div className="video-meta">
                2.1k views • 3 घंटे पहले
              </div>
            </div>
          </div>
        ))}

        <div className="view-all">सभी वीडियो देखें →</div>
      </div>

    </div>
  );
};

export default Sidebar;