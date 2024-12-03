import "./App.css";
import PaintBackground from "./_components/PaintBackground";
import ThreeSceneOther from "./_components/ThreeSceneOther";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import Nav from "./pages/Nav";
import Experience from "./pages/Experience";
import Portfolio from "./pages/Portfolio";
import React from "react";
import ThreeScene from "./_components/ThreeScene";

function App() {
  return (
    <BrowserRouter>
      <ThreeScene>
        <Nav />
        <div className="content">
          <Routes>
            <Route path="/ss-app" element={<FrontPage />} />
            <Route path="/ss-app/Experience" element={<Experience />} />
            <Route path="/ss-app/Portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </ThreeScene>

      {/* <ThreeSceneOther />
        <PaintBackground /> */}
    </BrowserRouter>
  );
}

export default App;
