import { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'होम', path: '/' },
  { name: 'उत्तर प्रदेश', path: '/category/उत्तर प्रदेश' },
  { name: 'राष्ट्रीय', path: '/category/राष्ट्रीय' },
  { name: 'अंतरराष्ट्रीय', path: '/category/अंतरराष्ट्रीय' },
  { name: 'राजनीति', path: '/category/राजनीति' },
  { name: 'खेल', path: '/category/खेल' },
  { name: 'मनोरंजन', path: '/category/मनोरंजन' },
  { name: 'व्यापार', path: '/category/व्यापार' },
  { name: 'टेक्नोलॉजी', path: '/category/टेक्नोलॉजी' },
  { name: 'शिक्षा', path: '/category/शिक्षा' },
  { name: 'स्वास्थ्य', path: '/category/स्वास्थ्य' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const today = new Date().toLocaleDateString('hi-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-date">
            <span>📅</span>
            <span>{today}</span>
          </div>
          <div className="top-bar-links">
            <a href="#">ई-पेपर</a>
            <a href="#">वीडियो</a>
            <a href="#">संपर्क करें</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header">
        <div className="container">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span>UP TV</span>
              <span>LIVE</span>
            </div>
            <div className="logo-text">
              <h1>UP TV Live</h1>
              <span>उत्तर प्रदेश की ताज़ा खबरें</span>
            </div>
          </Link>
          
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`nav-bar ${menuOpen ? 'open' : ''}`}>
        <div className="container">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              to={cat.path} 
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
