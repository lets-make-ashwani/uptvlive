import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ===== COMMON =====
import TopBar from "./components/TopBar/TopBar";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import BreakingNews from "./components/BreakingNews/BreakingNews";
import Footer from "./components/Footer/Footer";

// ===== HOME ONLY =====
import CityStrip from "./components/CityStrip/CityStrip";

// ===== HOME COMPONENTS =====
import Hero from "./components/Hero/Hero";
import NewsGrid from "./components/NewsGrid/NewsGrid";
import CitySection from "./components/CitySection/CitySection";
import SpecialSection from "./components/SpecialSection/SpecialSection";
import Sidebar from "./components/Sidebar/Sidebar";
import VideoSection from "./components/VideoSection/VideoSection";

// ===== PAGES =====
import ArticlePage from "./components/ArticlePage/ArticlePage";
import About from "./components/about/about";
import Contact from "./components/Contact/Contact";
import CityPage from "./components/CityPage/CityPage";

/* ================= BASE LAYOUT ================= */
const BaseLayout = ({ children }) => {
  return (
    <>
      <TopBar />
      <Header />
      <Navbar />
      <BreakingNews />

      {children}

      <Footer />
    </>
  );
};

/* ================= HOME LAYOUT ================= */
const HomeLayout = () => {
  return (
    <BaseLayout>
      {/* ✅ Only Home gets CityStrip */}


      <Hero />

      <div className="container">
        <div className="main-layout">

          {/* LEFT */}
          <div className="main-content">
            <NewsGrid />
            <CitySection />
            <SpecialSection />
          </div>

          {/* RIGHT */}
          <div className="right-sidebar">
            <Sidebar />
          </div>

        </div>
      </div>

      <VideoSection />
    </BaseLayout>
  );
};

/* ================= APP ================= */
const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🏠 HOME */}
        <Route path="/" element={<HomeLayout />} />

        {/* 📖 ARTICLE */}
        <Route
          path="/article/:slug"
          element={
            <BaseLayout>
              <ArticlePage />
            </BaseLayout>
          }
        />

        {/* 🏙 CITY */}
        <Route
          path="/city/:city"
          element={
            <BaseLayout>
              <CityPage />
            </BaseLayout>
          }
        />

        {/* ℹ️ ABOUT */}
        <Route
          path="/about"
          element={
            <BaseLayout>
              <About />
            </BaseLayout>
          }
        />

        {/* 📞 CONTACT */}
        <Route
          path="/contact"
          element={
            <BaseLayout>
              <Contact />
            </BaseLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;