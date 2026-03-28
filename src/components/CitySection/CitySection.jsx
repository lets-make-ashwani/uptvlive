import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CitySection.css";
import newsData from "../../data/newsData";

const cities = [
  { name: "कानपुर", slug: "kanpur" },
  { name: "लखनऊ", slug: "lucknow" },
  { name: "अयोध्या", slug: "ayodhya" },
  { name: "आगरा", slug: "agra" },
  { name: "वाराणसी", slug: "varanasi" },
  { name: "गोरखपुर", slug: "gorakhpur" },
  { name: "प्रयागराज", slug: "prayagraj" },
  { name: "गाज़ियाबाद", slug: "ghaziabad" }
];

const CitySection = () => {
  const [activeCity, setActiveCity] = useState(cities[0]);

  const cityNews = newsData
    .filter(item => item.city === activeCity.name)
    .slice(0, 6);

  return (
    <div className="city-section">

      {/* TABS */}
      <div className="city-tabs">
        {cities.map((city) => (
          <span
            key={city.slug}
            className={`city-tab ${activeCity.name === city.name ? "active" : ""}`}
            onClick={() => setActiveCity(city)}
          >
            {city.name}
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

              <img src={item.image} alt={item.title} className="list-img" />

              <div className="list-card-body">
                <div className="list-card-title">{item.title}</div>
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
        <Link to={`/city/${activeCity.slug}`} className="city-btn">
          {activeCity.name} News →
        </Link>
      </div>

    </div>
  );
};

export default CitySection;