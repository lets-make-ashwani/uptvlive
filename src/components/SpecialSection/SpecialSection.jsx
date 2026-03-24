import "./SpecialSection.css";

const SpecialSection = () => {
  return (
    <div className="special-section">

      {/* Heading */}
      <div className="section-hdr">
        <div className="section-title">स्पेशल रिपोर्ट</div>
      </div>

      {/* Grid */}
      <div className="grid-2 special-grid">

        <div className="special-card">
          <div className="special-card-label">Ground Report</div>
          <div className="special-card-title">
            राम मंदिर के साथ बदला अयोध्या के युवाओं का भाग्य — 'ताबड़तोड़ कमाई' के लिए निकाला ये रास्ता
          </div>
          <div className="special-meta">
            अभय त्रिपाठी • 5 मिनट पढ़ें
          </div>
        </div>

        <div className="special-card">
          <div className="special-card-label">विशेष रिपोर्ट</div>
          <div className="special-card-title">
            UP में बिजली संकट: 18 घंटे की कटौती से जनता परेशान, विपक्ष ने उठाए सवाल
          </div>
          <div className="special-meta">
            रवि शंकर • 4 मिनट पढ़ें
          </div>
        </div>

        <div className="special-card">
          <div className="special-card-label">Exclusive</div>
          <div className="special-card-title">
            UP के 15 ज़िलों में भूमाफिया का जाल — 500 करोड़ की ज़मीन पर कब्जे की कहानी
          </div>
          <div className="special-meta">
            सुनील वर्मा • 7 मिनट पढ़ें
          </div>
        </div>

        <div className="special-card">
          <div className="special-card-label">Fact Check</div>
          <div className="special-card-title">
            क्या सच में UP में सबसे ज़्यादा निवेश आया? — फैक्ट चेक में सामने आई असलियत
          </div>
          <div className="special-meta">
            प्रिया सिंह • 6 मिनट पढ़ें
          </div>
        </div>

      </div>

    </div>
  );
};

export default SpecialSection;