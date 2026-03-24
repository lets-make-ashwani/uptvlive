import "../Sidebar/Sidebar.css";
const Trending = () => {
  return (
    <div className="sidebar-section">

      <div className="sidebar-section-title">🔥 ट्रेंडिंग</div>

      {[1,2,3,4,5].map((i)=>(
        <div className="numbered-card" key={i}>
          <div className="num-badge">0{i}</div>
          <div className="numbered-card-title">
            ट्रेंडिंग न्यूज़ {i}
          </div>
        </div>
      ))}

    </div>
  );
};

export default Trending;