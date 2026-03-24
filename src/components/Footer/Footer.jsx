import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.jpeg";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-left">

          {/* ✅ IMAGE LOGO */}
          <div className="logo">
            <img src={logo} alt="UP TV LIVE" className="footer-logo" />
          </div>

          <p className="tagline">
            उत्तर प्रदेश की सबसे तेज़, सबसे विश्वसनीय हिंदी न्यूज़ वेबसाइट।
            <br />
            ताज़ा खबर, लाइव अपडेट, ग्राउंड रिपोर्ट।
          </p>

          <div className="social">
            <span>f</span>
            <span>X</span>
            <span>◎</span>
            <span>▶</span>
          </div>

          <p className="contact">📞 समाचार भेजें: +91 88888555555 </p>
          <p className="contact">📧 brandmate@uptvlive.com</p>
          <p className="contact">🏢 brandmate@uptvlive.com</p>
        </div>

        {/* CATEGORY */}
        <div className="footer-section">
          <h3>विषय</h3>
          <ul>
            <li>देश</li>
            <li>राज्य</li>
            <li>विदेश</li>
            <li>खेल</li>
            <li>बिजनेस</li>
            <li>टेक</li>
            <li>लाइफस्टाइल</li>
            <li>करियर</li>
            <li>वीडियो</li>
            <li>स्पेशल</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div className="footer-section">
          <h3>कंपनी</h3>
          <ul>
            <li>हमारे बारे में</li>
            <li>संपर्क करें</li>
            <li>करियर</li>
            <li>विज्ञापन दें</li>
            <li>RSS Feed</li>
          </ul>

          <h3 style={{ marginTop: "15px" }}>शहर</h3>
          <ul>
            <li>लखनऊ</li>
            <li>कानपुर</li>
            <li>अयोध्या</li>
            <li>आगरा</li>
            <li>वाराणसी</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © 2026 All Rights Reserved. Brandmate Digital
      </div>
    </footer>
  );
}

export default Footer;