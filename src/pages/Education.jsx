import { AnimationWaveText } from "_components/AnimationWaveText";
import React from "react";

const Experience = () => {
  return (
    <div className="Bg-content">
      <div className="Experience-list">
        <div className="Title">
          <AnimationWaveText text="Bachelor of Science (Honours) in Multimedia Technology and Innovation" />
        </div>

        <div className="Company">
          <AnimationWaveText text="Technological and Higher Education Institute of Hong Kong" />
        </div>
        <div className="Container">
          <div className="Detail">
            {" "}
            <AnimationWaveText text="Skill : Arduino / Android Studio / video Editing" />
          </div>
          <div className="Detail">
            <AnimationWaveText text="Sep 2021 - Jun 2023" />
          </div>
        </div>
      </div>
      <div className="Experience-list">
        <div className="Title">
          <AnimationWaveText text="Higher Diploma in Game Software Development" />
        </div>

        <div className="Company">
          <AnimationWaveText text="Hong Kong Institute of Vocational Education, TY" />
        </div>
        <div className="Container">
          <div className="Detail">
            {" "}
            <AnimationWaveText text="Skill : Unity / C# / C++ / java" />
          </div>
          <div className="Detail">
            <AnimationWaveText text="Sep 2019 - Jun 2021" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Experience;
