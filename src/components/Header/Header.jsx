import "./Header.css";
import logo from "../../assets/logo.jpeg";
const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header-main">

          {/* LOGO SECTION */}
          <div className="logo-wrap">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              
              {/* IMAGE LOGO */}
              <img
                src={logo}
                alt="UPTV Logo"
                className="logo-img"
              />

              {/* TAGLINE */}
              <div className="logo-tagline">
                उत्तर प्रदेश की नंबर 1 न्यूज़ वेबसाइट
              </div>

            </div>
          </div>

          {/* SEARCH */}
          <div className="header-search">
            <input type="text" placeholder="खोजें..." />
          </div>

          {/* BUTTONS */}
          <a
            href="https://www.youtube.com/@UPtvLIVE1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-yt"
          >
            <span className="yt-icon">▶</span>
            YouTube
          </a>

        </div>
      </div>
    </header>
  );
};

export default Header;