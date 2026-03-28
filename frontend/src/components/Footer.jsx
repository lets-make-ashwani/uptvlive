import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>UP TV Live</h3>
            <p>
              उत्तर प्रदेश और देश-दुनिया की ताज़ा खबरें, ब्रेकिंग न्यूज़, 
              राजनीति, खेल, मनोरंजन, टेक्नोलॉजी और बहुत कुछ। 
              हिंदी में विश्वसनीय समाचार।
            </p>
          </div>

          <div>
            <h4 className="footer-heading">श्रेणियां</h4>
            <div className="footer-links">
              <Link to="/category/राजनीति">राजनीति</Link>
              <Link to="/category/खेल">खेल</Link>
              <Link to="/category/मनोरंजन">मनोरंजन</Link>
              <Link to="/category/टेक्नोलॉजी">टेक्नोलॉजी</Link>
              <Link to="/category/शिक्षा">शिक्षा</Link>
              <Link to="/category/स्वास्थ्य">स्वास्थ्य</Link>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">शहर</h4>
            <div className="footer-links">
              <Link to="/">लखनऊ</Link>
              <Link to="/">वाराणसी</Link>
              <Link to="/">कानपुर</Link>
              <Link to="/">आगरा</Link>
              <Link to="/">नोएडा</Link>
              <Link to="/">प्रयागराज</Link>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">हमसे जुड़ें</h4>
            <div className="footer-links">
              <a href="#">📘 Facebook</a>
              <a href="#">🐦 Twitter</a>
              <a href="#">📸 Instagram</a>
              <a href="#">▶️ YouTube</a>
              <a href="#">📱 हमारा ऐप डाउनलोड करें</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} UP TV Live. सर्वाधिकार सुरक्षित। All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
