import { useParams, Link } from "react-router-dom";
import newsData from "../../data/newsData";

const ArticlePage = () => {
  const { slug } = useParams();

  const article = newsData.find((item) => item.slug === slug);

  if (!article) {
    return <h2 style={{ padding: "20px" }}>Article Not Found</h2>;
  }

  // 🔥 Related News (excluding current)
  const relatedNews = newsData
    .filter((n) => n.slug !== slug)
    .slice(0, 4);

  return (
    <div className="container" style={{ padding: "20px", maxWidth: "900px" }}>

      {/* 🔙 BACK */}
      <Link to="/" style={{ color: "#d60000", textDecoration: "none" }}>
        ← होम पर जाएं
      </Link>

      {/* 🏷 CATEGORY + CITY */}
      <p style={{ marginTop: "10px", color: "#d60000", fontWeight: "bold" }}>
        {article.category} | {article.city}
      </p>

      {/* 📰 TITLE */}
      <h1 style={{ margin: "10px 0", fontSize: "28px", lineHeight: "1.4" }}>
        {article.title}
      </h1>

      {/* ⏰ META */}
      <p style={{ color: "gray", marginBottom: "15px" }}>
        ⏰ {article.time} • 👁 {article.views}
      </p>

      {/* 📸 IMAGE */}
      <img
        src={article.image}
        alt={article.title}
        style={{
          width: "100%",
          maxHeight: "420px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
      />

      {/* 📤 SHARE BUTTONS */}
      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <a
          href={`https://wa.me/?text=${article.title}`}
          target="_blank"
          rel="noreferrer"
          style={{ background: "#25D366", color: "#fff", padding: "6px 12px", borderRadius: "4px", textDecoration: "none" }}
        >
          WhatsApp
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
          rel="noreferrer"
          style={{ background: "#1877f2", color: "#fff", padding: "6px 12px", borderRadius: "4px", textDecoration: "none" }}
        >
          Facebook
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=${article.title}`}
          target="_blank"
          rel="noreferrer"
          style={{ background: "#000", color: "#fff", padding: "6px 12px", borderRadius: "4px", textDecoration: "none" }}
        >
          X
        </a>
      </div>

      {/* 📖 CONTENT */}
      <div
        style={{
          marginTop: "20px",
          lineHeight: "1.9",
          fontSize: "17px",
          color: "#222"
        }}
      >
        {article.content}
      </div>

      {/* 🔥 RELATED NEWS */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={{ borderBottom: "2px solid red", paddingBottom: "5px" }}>
          🔥 संबंधित खबरें
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "15px" }}>
          {relatedNews.map((item) => (
            <Link
              key={item.id}
              to={`/article/${item.slug}`}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <img
                  src={item.image}
                  alt=""
                  style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                />
                <p style={{ fontSize: "14px" }}>{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ArticlePage;