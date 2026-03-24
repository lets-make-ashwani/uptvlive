import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import newsData from "../../data/newsData";

const Hero = () => {

  const mainNews =
    newsData.find(item => item.isTop) || newsData[0];

  const sideNews = newsData
    .filter(item => item.id !== mainNews.id)
    .slice(0, 5);

  return (
    <div className="container">
      <div className="hero">

        <div className="hero-grid">

          {/* MAIN */}
          <div className="hero-main">
            <Link to={`/article/${mainNews.slug}`}>
              <img
                src={mainNews.image}
                alt={mainNews.title}
                className="hero-img"
              />
            </Link>

            <div className="hero-overlay">

              <div className="hero-category">
                <span className="tag">🔴 BREAKING</span>
                <span className="tag tag-blue">
                  {mainNews.city}
                </span>
              </div>

              <Link to={`/article/${mainNews.slug}`} className="hero-link">
                <div className="hero-title">{mainNews.title}</div>
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

          {/* SIDE */}
          <div className="hero-side">

            <div className="hero-side-header">
              ताज़ा खबरें
            </div>

            {sideNews.map((item) => (
              <Link
                to={`/article/${item.slug}`}
                key={item.id}
                className="side-link"
              >
                <div className="side-card">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="side-card-img"
                  />

                  <div className="side-card-body">

                    <span className="tag small-tag">
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