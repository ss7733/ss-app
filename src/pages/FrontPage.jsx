import { AnimationWaveText } from "_components/AnimationWaveText";
import React from "react";
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
        <div className="Role">
          <AnimationWaveText text="- FrontEnd Deveploper" />
        </div>
        <div className="Role">
          <AnimationWaveText text="- Artist" />
        </div>
        <div className="Role">
          <AnimationWaveText text="- Animator" />
        </div>
        <div className="Role">
          <AnimationWaveText text="- Game Developer" />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
