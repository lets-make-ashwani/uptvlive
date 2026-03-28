import "./TopBar.css";
import { Link } from "react-router-dom";

const TopBar = () => {

  // 📅 Dynamic Date (English)
  const formattedDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar-inner">

          {/* LEFT - DATE */}
          <div className="topbar-date">
            {formattedDate} | Hindi News | Uttar Pradesh
          </div>

          {/* RIGHT - LINKS */}
          <div className="topbar-links">



            <Link to="/contact">📞 Contact</Link>

            {/* ✅ ABOUT PAGE LINK */}
            <Link to="/about">About Us</Link>

          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBar;