import "./App.css";
import PaintBackground from "./_components/PaintBackground";
import VtcLogo from "./imgs/Vtc-logo.png";
import TheiLogo from "./imgs/Thei-logo.png";
import SamprasLogo from "./imgs/Sampras-logo.png";

function App() {
  return (
    <div className="App">
      <div className="App-bg">
        <div className="Bg-name">Casper</div>
        <div className="Bg-title"> A multiMedia developer</div>
        <div className="Nav">
          <span>Home</span>
          <div>/</div>
          <span>Portfolio</span>
        </div>
        <div className="Pre-portfolio">
          <div className="Card-list">
            <div className="Card">
              <div className="Img"></div>
              <div className="Text"> Live 2D </div>
            </div>
            <div className="Card">
              <div className="Img"></div>
              <div className="Text"> Sprine 2D </div>
            </div>
            <div className="Card">
              <div className="Img"></div>
              <div className="Text"> Unity </div>
            </div>
          </div>
        </div>
        <div className="About-me">
          <div className="Part">
            <span className="Title">Education</span>
            <link />
            <img src={VtcLogo} alt={""} />
            <span>Higher Diploma in Game Software Development</span>
            <span className="Date">Sep 2019 – Jun 2021</span>
            <div className="Line">-</div>
            <img src={TheiLogo} alt={""} />
            <span>
              Bachelor of Science (Honours) in Multimedia Technology and
              Innovation
            </span>
            <span className="Date">Sep 2021 –Jun 2023</span>
          </div>
          <div className="Part">
            <img src={SamprasLogo} alt={""} />
            <span className="Title">Work Experience</span>
            <span>Sampras (HK) Limited Web - Frontend Programmer</span>
            <span className="Date">Jan 2024 - Dec 2024</span>
          </div>
        </div>
        <PaintBackground />
      </div>
    </div>
  );
}

export default App;
