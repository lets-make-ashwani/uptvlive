import NewsCard from "../NewsCard/NewsCard";
import newsData from "../../data/newsData";
import "./NewsGrid.css";

const NewsGrid = () => {
  return (
    <div style={{ marginBottom: "24px" }}>
      
      <div className="section-hdr">
        <div className="section-title">
          टॉप न्यूज़ <span className="count">आज की खबरें</span>
        </div>
        <a href="#" className="view-all">सभी देखें →</a>
      </div>

      <div className="grid-3">
        
        {newsData?.slice(0, 12).map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}

      </div>

    </div>
  );
};

export default NewsGrid;