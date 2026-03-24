import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import newsData from "../../data/newsData";

const Hero = () => {

  // 🔥 Main News
  const mainNews =
    newsData.find(item => item.isTop) || newsData[0];

  // 🔥 Side News
  const sideNews = newsData
    .filter(item => item.id !== mainNews.id)
    .slice(0, 5);

  return (
    <div className="container">
      <div className="hero">
        <div className="hero-grid">

          {/* ===== MAIN HERO ===== */}
          <div className="hero-main">

            {/* IMAGE */}
            <Link to={`/article/${mainNews.slug}`}>
              <img
                src={mainNews.image}
                alt={mainNews.title}
                className="hero-img"
                style={{ width: "100%", height: "420px", objectFit: "cover" }}
              />
            </Link>

            {/* OVERLAY */}
            <div className="hero-overlay">

              <div className="hero-category">
                <span className="tag">🔴 BREAKING</span>
                <span className="tag tag-blue" style={{ marginLeft: "6px" }}>
                  {mainNews.city}
                </span>
              </div>

              {/* TITLE */}
              <Link
                to={`/article/${mainNews.slug}`}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <div className="hero-title">
                  {mainNews.title}
                </div>
              </Link>

              <div className="hero-meta">
                <span>✍️ UPTV Desk</span>
                <span className="dot"></span>
                <span>{mainNews.time}</span>
                <span className="dot"></span>
                <span>👁 {mainNews.views}</span>
              </div>

            </div>
          </div>

          {/* ===== SIDE CARDS ===== */}
          <div className="hero-side" style={{ background: "#fff", padding: "12px" }}>

            {/* HEADER SAME AS UI */}
            <div
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "12px",
                letterSpacing: ".5px",
                color: "var(--muted)",
                textTransform: "uppercase",
                paddingBottom: "8px",
                borderBottom: "2px solid var(--blue)",
                marginBottom: "4px"
              }}
            >
              ताज़ा खबरें
            </div>

            {sideNews.map((item) => (
              
              <Link
                to={`/article/${item.slug}`}
                key={item.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="side-card">

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="side-card-img"
                    style={{ width: "90px", height: "65px", objectFit: "cover" }}
                  />

                  <div className="side-card-body">

                    <span
                      className="tag"
                      style={{
                        fontSize: "9px",
                        padding: "1px 6px",
                        marginBottom: "4px"
                      }}
                    >
                      {item.city}
                    </span>

                    <div className="side-card-title">
                      {item.title}
                    </div>

                    <div className="side-card-meta">
                      {item.time}
                    </div>

                  </div>

                </div>
              </Link>

            ))}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;