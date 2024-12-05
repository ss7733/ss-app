import React from "react";

const { default: anime } = require("animejs");
const { useEffect, useState } = require("react");

export const AnimationWaveText = (props) => {
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
          { value: 0.5, easing: "easeInOutQuad", duration: 500 },
          { value: 1, easing: "easeOutSine", duration: 250 },
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
  const handleStart = (target, text) => {
    anime({
      targets: target,
      opacity: [
        { value: 0, easing: "easeInOutQuad", duration: 500 },
        { value: 0.5, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      delay: anime.stagger(100),
    });
  };
  useEffect(() => {
    handleStart("." + props.text.replace(/[\s',:().\-\/]/g, ""), name);
  }, []);

  for (let i = 0; i < name.length; i++) {
    nameArray.push(
      <div
        className={props.text.replace(/[\s',:().\-\/]/g, "")}
        data-index={i}
        key={i}
        onMouseOver={(e) =>
          handleWave("." + props.text.replace(/[\s',:().\-\/]/g, ""), name, e)
        }
      >
        {name[i] === " " ? "\u00A0" : name[i]}
      </div>
    );
  }
  return <>{nameArray}</>;
};
