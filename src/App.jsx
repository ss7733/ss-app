import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import Nav from "./pages/Nav";
import Experience from "./pages/Experience";
import Portfolio from "./pages/Portfolio";
import React from "react";
import ThreeScene from "./_components/ThreeScene";
import Education from "pages/Education";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ThreeScene>
          <Nav />
          <div className="content">
            <Routes>
              <Route path="/ss-app" element={<FrontPage />} />
              <Route path="/ss-app/Experience" element={<Experience />} />
              <Route path="/ss-app/Education" element={<Education />} />
              <Route path="/ss-app/Portfolio" element={<Portfolio />} />
            </Routes>
          </div>
        </ThreeScene>
      </div>
    </BrowserRouter>
  );
}

export default App;
