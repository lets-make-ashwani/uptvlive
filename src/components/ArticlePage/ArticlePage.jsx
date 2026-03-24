import { useParams } from "react-router-dom";
import newsData from "../../data/newsData";

const ArticlePage = () => {
  const { slug } = useParams();

  // 🔍 Find article
  const article = newsData.find((item) => item.slug === slug);

  if (!article) {
    return <h2 style={{ padding: "20px" }}>Article Not Found</h2>;
  }

  return (
    <div className="container" style={{ padding: "20px" }}>
      
      {/* TITLE */}
      <h1 style={{ marginBottom: "10px" }}>
        {article.title}
      </h1>

      {/* META */}
      <p style={{ color: "gray", marginBottom: "15px" }}>
        ⏰ {article.time} • 👁 {article.views}
      </p>

      {/* IMAGE */}
      <img
        src={article.image}
        alt={article.title}
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          borderRadius: "6px"
        }}
      />

      {/* CONTENT */}
      <div style={{ marginTop: "20px", lineHeight: "1.8", fontSize: "16px" }}>
        {article.content}
      </div>

    </div>
  );
};

export default ArticlePage;