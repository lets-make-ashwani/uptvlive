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

  const cityNews = newsData
    .filter(item => item.city === activeCity)
    .slice(0, 6);

  return (
    <div className="city-section">

      {/* TABS */}
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

      {/* NEWS */}
      <div className="city-grid">
        {cityNews.map((item) => (
          <Link
            to={`/article/${item.slug}`}
            key={item.id}
            className="city-link"
          >
            <div className="list-card">

              <img
                src={item.image}
                alt={item.title}
                className="list-img"
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

      {/* BUTTON */}
      <div className="city-btn-wrap">
        <Link to={`/city/${activeCity}`} className="city-btn">
          {activeCity} की सभी खबरें देखें →
        </Link>
      </div>

    </div>
  );
};

export default CitySection;