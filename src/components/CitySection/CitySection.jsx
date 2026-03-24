import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CitySection.css";
import newsData from "../../data/newsData";

const cities = [
  "कानपुर",
  "लखनऊ",
  "अयोध्या",
  "आगरा",
  "वाराणसी",
  "गोरखपुर",
  "प्रयागराज",
  "गाज़ियाबाद"
];

const CitySection = () => {

  const [activeCity, setActiveCity] = useState("कानपुर");

  // 🔥 Filter news by city
  const cityNews = newsData
    .filter(item => item.city === activeCity)
    .slice(0, 6);

  // Split into 2 columns
  const leftNews = cityNews.slice(0, 3);
  const rightNews = cityNews.slice(3, 6);

  return (
    <div className="city-section">

      {/* ===== TABS ===== */}
      <div className="city-tabs">
        {cities.map((city) => (
          <span
            key={city}
            className={`city-tab ${activeCity === city ? "active" : ""}`}
            onClick={() => setActiveCity(city)}
          >
            {city}
          </span>
        ))}
      </div>

      {/* ===== GRID ===== */}
      <div className="grid-2">

        {/* LEFT */}
        <div>
          {leftNews.map((item) => (
            <Link
              to={`/article/${item.slug}`}
              key={item.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="list-card">

                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "88px",
                    height: "60px",
                    objectFit: "cover",
                    flexShrink: 0
                  }}
                />

                <div className="list-card-body">
                  <div className="list-card-title">
                    {item.title}
                  </div>

                  <div className="list-card-meta">
                    {item.city} • {item.time}
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* RIGHT */}
        <div>
          {rightNews.map((item) => (
            <Link
              to={`/article/${item.slug}`}
              key={item.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="list-card">

                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "88px",
                    height: "60px",
                    objectFit: "cover",
                    flexShrink: 0
                  }}
                />

                <div className="list-card-body">
                  <div className="list-card-title">
                    {item.title}
                  </div>

                  <div className="list-card-meta">
                    {item.city} • {item.time}
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* ===== BUTTON ===== */}
      <div className="city-btn-wrap">
        <Link to={`/city/${activeCity}`} className="city-btn">
          {activeCity} की सभी खबरें देखें →
        </Link>
      </div>

    </div>
  );
};

export default CitySection;