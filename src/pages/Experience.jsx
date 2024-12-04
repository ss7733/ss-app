import { AnimationWaveText } from "_components/AnimationWaveText";
import anime from "animejs";
import React, { useEffect } from "react";

const Experience = () => {
  return (
    <div className="Bg-content">
      <div className="Experience-list">
        <div className="Title">
          <AnimationWaveText text="Web - Frontend Programmer" />
        </div>

        <div className="Company">
          <AnimationWaveText text="Sampras (HK) Limited" />
        </div>
        <div className="Container">
          <div className="Detail">
            {" "}
            <AnimationWaveText text="Skill : React / Next.js / Typescript / Git" />
          </div>
          <div className="Detail">
            <AnimationWaveText text="Jan 2024 - Dec 2024" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Experience;
