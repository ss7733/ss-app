import anime from "animejs";
import React from "react";
import { useState } from "react";
const FrontPage = () => {
  return (
    <div className="Bg-content">
      <div className="Bg-name">
        <AnimationWaveText text="I'm Casper" />
      </div>
      <div className="Bg-title">
        <AnimationWaveText text="A Multimedia Developer" />
      </div>
      <div className="Role-list">
        <span>- FrontEnd Deveploper</span>
        <span>- 2D Artist</span>
        <span>- Animator</span>
        <span>- Game Developer</span>
      </div>
    </div>
  );
};

export default FrontPage;

const AnimationWaveText = (props) => {
  const [running, setRunning] = useState(false);
  const name = props.text;
  const nameArray = [];
  const handleWave = (target, text, e) => {
    if (!running) {
      setRunning(true);
      anime({
        targets: target,
        scale: [
          { value: 1.35, easing: "easeOutSine", duration: 250 },
          { value: 1, easing: "easeInOutQuad", duration: 500 },
        ],
        translateY: [
          { value: -15, easing: "easeOutSine", duration: 250 },
          { value: 0, easing: "easeInOutQuad", duration: 500 },
        ],
        opacity: [
          { value: 1, easing: "easeOutSine", duration: 250 },
          { value: 0.5, easing: "easeInOutQuad", duration: 500 },
        ],
        delay: anime.stagger(100, {
          grid: [text.length, 1],
          from: e.target.dataset.index,
        }),
        complete: () => {
          setRunning(false); // Unlock the animation once complete
        },
      });
    }
  };
  for (let i = 0; i < name.length; i++) {
    nameArray.push(
      <div
        className={props.text.replace(/[\s']/g, "")}
        data-index={i}
        key={i}
        onMouseOver={(e) =>
          handleWave("." + props.text.replace(/[\s']/g, ""), name, e)
        }
      >
        {name[i] === " " ? "\u00A0" : name[i]}
      </div>
    );
  }
  return <>{nameArray}</>;
};
