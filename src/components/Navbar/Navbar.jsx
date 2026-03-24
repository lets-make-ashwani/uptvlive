import "./Navbar.css"
const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <div className="nav-inner">

          <span className="nav-item active">🏠 होम</span>
          <div className="nav-divider"></div>

          <span className="nav-item">देश</span>
          <span className="nav-item">राज्य</span>
          <span className="nav-item">विदेश</span>
          <span className="nav-item">स्पेशल</span>

          <div className="nav-divider"></div>

          <span className="nav-item">खेल</span>
          <span className="nav-item">बिजनेस</span>
          <span className="nav-item">टेक</span>
          <span className="nav-item">ऑटो</span>
          <span className="nav-item">लाइफस्टाइल</span>
          <span className="nav-item">करियर</span>

          <div className="nav-divider"></div>

          <span className="nav-item">📹 वीडियो</span>

          <div className="nav-divider"></div>

          <span className="nav-item" style={{ color: "var(--white)", fontWeight: 300 }}>
            🔴 लाइव
          </span>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;