import "./CityStrip.css"
const CityStrip = () => {
  return (
    <div className="city-strip">
      <div className="container">
        <div className="city-strip-inner">

          <span style={{
            fontFamily: "Oswald",
            fontSize: "12px",
            color: "var(--blue)",
            padding: "4px 8px",
            fontWeight: "600"
          }}>
            📍 शहर:
          </span>

          <span className="city-chip active">लखनऊ</span>
          <span className="city-chip">कानपुर</span>
          <span className="city-chip">अयोध्या</span>
          <span className="city-chip">आगरा</span>
          <span className="city-chip">वाराणसी</span>
          <span className="city-chip">गोरखपुर</span>

        </div>
      </div>
    </div>
  );
};

export default CityStrip;