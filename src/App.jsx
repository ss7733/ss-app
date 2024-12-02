import "./App.css";
import PaintBackground from "./_components/PaintBackground";
import Logo from "./imgs/ss-icon.png";

function App() {
  return (
    <div className="App">
      <div className="App-bg">
        <div className="Bg-upper">
          <div className="Bg-name">Casper</div>
          <div className="Bg-title"> A multiMedia developer</div>
          <div className="Role-list">
            <span>- FrontEnd Deveploper</span>
            <span>- 2D Artist</span>
            <span>- Animator</span>
            <span>- Game Developer</span>
          </div>
        </div>

        <div className="Nav">
          <img alt="" src={Logo} />
          <div className="List">
            <span>Home</span>
            <div>/</div>
            <span>Portfolio</span>
          </div>
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

        <PaintBackground />
      </div>
    </div>
  );
}

export default App;
