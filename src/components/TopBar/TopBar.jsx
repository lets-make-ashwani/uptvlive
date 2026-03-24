import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar-inner">

          <div className="topbar-date">
            सोमवार, 02 मार्च 2026 | हिंदी न्यूज़ | उत्तर प्रदेश
          </div>

          <div className="topbar-links">
            <a href="#">📧 न्यूज़लेटर</a>
            <a href="#">📱 ऐप डाउनलोड</a>
            <a href="#">📞 सम्पर्क</a>
            <a href="#">हमारे बारे में</a>
          </div>

          <div className="topbar-social">
            <a href="#">f</a>
            <a href="#">𝕏</a>
            <a href="#">📷</a>
            <a href="#">▶</a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBar;