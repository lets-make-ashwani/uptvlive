import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar/TopBar";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import CityStrip from "./components/CityStrip/CityStrip";
import BreakingNews from "./components/BreakingNews/BreakingNews";

import Hero from "./components/Hero/Hero";
import NewsGrid from "./components/NewsGrid/NewsGrid";
import CitySection from "./components/CitySection/CitySection";
import SpecialSection from "./components/SpecialSection/SpecialSection";

import Sidebar from "./components/Sidebar/Sidebar";

import VideoSection from "./components/VideoSection/VideoSection";
import Footer from "./components/Footer/Footer";

// 👉 ARTICLE PAGE
import ArticlePage from "./components/ArticlePage/ArticlePage";

/* ================= HOME LAYOUT ================= */
const HomeLayout = () => {
  return (
    <>
      {/* ===== TOP ===== */}
      <TopBar />
      <Header />
      <Navbar />
      <CityStrip />
      <BreakingNews />

      {/* ===== HERO ===== */}
      <Hero />

      {/* ===== MAIN ===== */}
      <div className="container">
        <div className="main-layout">

          {/* LEFT CONTENT */}
          <div className="main-content">
            <NewsGrid />
            <CitySection />
            <SpecialSection />
          </div>

          {/* RIGHT SIDEBAR (ONLY ONE COMPONENT) */}
          <div className="right-sidebar">
            <Sidebar />
          </div>

        </div>
      </div>

      {/* ===== BOTTOM ===== */}
      <VideoSection />
      <Footer />
    </>
  );
};

/* ================= APP ROUTES ================= */
const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🏠 HOME */}
        <Route path="/" element={<HomeLayout />} />

        {/* 📖 ARTICLE PAGE */}
        <Route
          path="/article/:slug"
          element={
            <>
              <Header />
              <Navbar />
              <ArticlePage />
              <Footer />
            </>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;