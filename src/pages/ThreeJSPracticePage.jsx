import ThreeMusicVisualizer from "_components/threeJS/filePratice/musicVisualizer/ThreeMusicVisualizer";
import ThreeTorus from "_components/threeJS/filePratice/torus/ThreeTorus";
import ThreeThird from "_components/threeJS/filePratice/first/ThreeThird";
import ThreeScene from "_components/threeJS/ThreeScene";
import ThreeSceneOther from "_components/threeJS/ThreeSceneOther";
import React from "react";

const ThreeJSPracticePage = () => {
  return (
    <div className=" ">
      <ThreeScene />
      <ThreeThird />
      <ThreeTorus />
      <ThreeMusicVisualizer />
      <ThreeSceneOther />
    </div>
  );
};
export default ThreeJSPracticePage;
