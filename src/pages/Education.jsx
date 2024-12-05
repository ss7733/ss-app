import { AnimationWaveText } from "_components/AnimationWaveText";
import React, { useEffect, useState } from "react";

const Experience = () => {
  const [w, setW] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setW(window.innerWidth); // Update state with the current window width
    };

    // Add the resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="Bg-content">
      <div className="Experience-list">
        {w > 600 ? (
          <>
            <div className="Title">
              <AnimationWaveText text="Bachelor of Science (Honours) " />
            </div>
            <div className="Title">
              <AnimationWaveText text="in Multimedia Technology and Innovation" />
            </div>
          </>
        ) : (
          <>
            <div className="Title">
              <AnimationWaveText text="Bachelor of Science" />
            </div>
            <div className="Title">
              <AnimationWaveText text="(Honours) in Multimedia" />
            </div>
            <div className="Title">
              <AnimationWaveText text="Technology and Innovation" />
            </div>
          </>
        )}

        {w > 600 ? (
          <div className="Company">
            <AnimationWaveText text="Technological and Higher Education Institute of Hong Kong" />
          </div>
        ) : (
          <>
            <div className="Company">
              <AnimationWaveText text="Technological and" />
            </div>
            <div className="Company">
              <AnimationWaveText text="Higher Education Institute " />
            </div>
            <div className="Company">
              <AnimationWaveText text="of Hong Kong" />
            </div>
          </>
        )}

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
        {w > 600 ? (
          <div className="Title">
            <AnimationWaveText text="Higher Diploma in Game Software Development" />
          </div>
        ) : (
          <>
            <div className="Title">
              <AnimationWaveText text="Higher Diploma in" />
            </div>{" "}
            <div className="Title">
              <AnimationWaveText text="Game Software Development" />
            </div>
          </>
        )}

        {w > 600 ? (
          <div className="Company">
            <AnimationWaveText text="Hong Kong Institute of Vocational Education, TY" />
          </div>
        ) : (
          <>
            <div className="Company">
              <AnimationWaveText text="Hong Kong" />
            </div>
            <div className="Company">
              <AnimationWaveText text="Institute of Vocational Education, TY" />
            </div>
          </>
        )}

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
