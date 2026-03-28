import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.jpeg";
import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-left">

          {/* LOGO */}
          <div className="logo">
            <img src={logo} alt="UP TV LIVE" className="footer-logo" />
          </div>

          {/* TAGLINE */}
          <p className="tagline">
            Uttar Pradesh’s fastest and most trusted Hindi news website.
            <br />
            Latest news, live updates, and ground reports.
          </p>

          {/* SOCIAL ICONS */}
          <div className="social">

            <a href="https://www.facebook.com/share/g/1F2hjHwfW4/" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>

            <a href="https://x.com/UPTV_BREAKING" target="_blank" rel="noreferrer">
              <FaXTwitter />
            </a>

            <a href="https://www.instagram.com/uptvlive?igsh=ejA1ZzR1OGhwdjhm" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>

            <a href="https://www.youtube.com/@UPtvLIVE1" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>

            <a href="https://whatsapp.com/channel/0029VaA2qZEDTkK9Rx1evr3z" target="_blank" rel="noreferrer">
              <FaWhatsapp />
            </a>

            <a href="mailto:editorpvnews@gmail.com">
              <FaEnvelope />
            </a>

          </div>

          {/* CONTACT */}
          <div className="contact">

            <p>
              📞 <a href="tel:+919335690008">+91 9335690008</a>
            </p>

            <p>
              📧 <a href="mailto:editorpvnews@gmail.com">editorpvnews@gmail.com</a>
            </p>

            <p>
              🏢{" "}
              <a
                href="https://www.google.com/maps?q=Gandhi+Nagar+Kanpur+Nagar+Uttar+Pradesh"
                target="_blank"
                rel="noreferrer"
              >
                UPTVLIVE Head Office,Gandhi Nagar, Kanpur Nagar, Uttar Pradesh | Pin Code:208002
              </a>
            </p>

          </div>

        </div> {/* ✅ CLOSED footer-left */}

        {/* CATEGORY */}
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/">Nation</Link></li>
            <li><Link to="/">State</Link></li>
            <li><Link to="/">World</Link></li>
            <li><Link to="/">Sports</Link></li>
            <li><Link to="/">Business</Link></li>
            <li><Link to="/">Tech</Link></li>
            <li><Link to="/">Lifestyle</Link></li>
            <li><Link to="/">Career</Link></li>
            <li><Link to="/">Video</Link></li>
            <li><Link to="/">Special</Link></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>

          <h3 style={{ marginTop: "15px" }}>Cities</h3>
          <ul>
            <li><Link to="/">Lucknow</Link></li>
            <li><Link to="/">Kanpur</Link></li>
            <li><Link to="/">Ayodhya</Link></li>
            <li><Link to="/">Agra</Link></li>
            <li><Link to="/">Varanasi</Link></li>
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