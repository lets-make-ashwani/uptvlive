import "./Header.css";
import logo from "../../assets/logo.jpeg";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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



          {/* BUTTONS */}

          <div className="social">

            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaXTwitter />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>

            <a href="https://www.youtube.com/@UPtvLIVE1" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;