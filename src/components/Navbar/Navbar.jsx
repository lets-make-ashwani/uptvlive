import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

  const location = useLocation();

  return (
    <nav>
      <div className="container">
        <div className="nav-inner">

          {/* HOME */}
          <Link
            to="/"
            className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>

          <div className="nav-divider"></div>

          {/* MAIN CATEGORIES */}
          <Link to="/category/nation" className="nav-item">Nation</Link>
          <Link to="/category/state" className="nav-item">State</Link>
          <Link to="/category/world" className="nav-item">World</Link>
          <Link to="/category/special" className="nav-item">Special</Link>

          <div className="nav-divider"></div>

          <Link to="/category/sports" className="nav-item">Sports</Link>
          <Link to="/category/business" className="nav-item">Business</Link>
          <Link to="/category/tech" className="nav-item">Tech</Link>
          <Link to="/category/auto" className="nav-item">Auto</Link>
          <Link to="/category/lifestyle" className="nav-item">Lifestyle</Link>
          <Link to="/category/career" className="nav-item">Career</Link>

          <div className="nav-divider"></div>

          {/* VIDEO */}
          <Link to="/category/video" className="nav-item">
            📹 Video
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;