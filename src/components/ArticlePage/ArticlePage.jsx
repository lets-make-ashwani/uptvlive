import { useParams, Link } from "react-router-dom";
import newsData from "../../data/newsData";

const ArticlePage = () => {
  const { slug } = useParams();

  const article = newsData.find((item) => item.slug === slug);

  if (!article) {
    return <h2 style={{ padding: "20px" }}>Article Not Found</h2>;
  }

  // 🔥 SHARE DATA
  const shareUrl = window.location.href;
  const shareText = article.title;

  // 🔥 RELATED NEWS
  const relatedNews = newsData
    .filter((n) => n.slug !== slug)
    .slice(0, 4);

  // 🔥 NATIVE SHARE (MOBILE)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        url: shareUrl,
      });
    } else {
      alert("Sharing not supported on this device");
    }
  };

  return (
    <div className="container" style={{ padding: "15px", maxWidth: "900px" }}>

      {/* 🔙 BACK */}
      <Link to="/" style={{ color: "#d60000", textDecoration: "none" }}>
        ← होम पर जाएं
      </Link>

      {/* 🏷 CATEGORY */}
      <p style={{ marginTop: "10px", color: "#d60000", fontWeight: "bold" }}>
        {article.category} | {article.city}
      </p>

      {/* 📰 TITLE */}
      <h1 style={{ margin: "10px 0", fontSize: "26px", lineHeight: "1.4" }}>
        {article.title}
      </h1>

      {/* ⏰ META */}
      <p style={{ color: "gray", marginBottom: "12px" }}>
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
          borderRadius: "10px"
        }}
      />

      {/* 📤 SHARE BUTTONS */}
      <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>

        {/* WHATSAPP */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#25D366",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "6px",
            textDecoration: "none"
          }}
        >
          WhatsApp
        </a>

        {/* FACEBOOK */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#1877f2",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "6px",
            textDecoration: "none"
          }}
        >
          Facebook
        </a>

        {/* X */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#000",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "6px",
            textDecoration: "none"
          }}
        >
          X
        </a>

        {/* 📱 NATIVE SHARE */}
        <button
          onClick={handleShare}
          style={{
            background: "#ff9800",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Share
        </button>

      </div>

      {/* 📖 CONTENT */}
      <div
        style={{
          marginTop: "20px",
          lineHeight: "1.9",
          fontSize: "16px",
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginTop: "15px"
          }}
        >
          {relatedNews.map((item) => (
            <Link
              key={item.id}
              to={`/article/${item.slug}`}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <div style={{ display: "flex", gap: "8px" }}>
                <img
                  src={item.image}
                  alt=""
                  style={{
                    width: "80px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "5px"
                  }}
                />
                <p style={{ fontSize: "13px" }}>{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ArticlePage;