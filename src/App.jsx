import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import Nav from "./pages/Nav";
import Experience from "./pages/Experience";
import Portfolio from "./pages/Portfolio";
import React from "react";

import FrontPageBG from "./_components/threeJS/frontpage/FrontPageBG";
import Education from "pages/Education";
import ThreeJSPracticePage from "pages/ThreeJSPracticePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <FrontPageBG>
          <Nav />
          <div className="content">
            <Routes>
              <Route path="/ss-app" element={<FrontPage />} />
              <Route path="/ss-app/Experience" element={<Experience />} />
              <Route path="/ss-app/Education" element={<Education />} />
              <Route path="/ss-app/Portfolio" element={<Portfolio />} />
              <Route
                path="/ss-app/Practice"
                element={<ThreeJSPracticePage />}
              />
            </Routes>
          </div>
        </FrontPageBG>
      </div>
    </BrowserRouter>
  );
}

export default App;
