import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./shaders/vertex";
import fragmentShader from "./shaders/fragment";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SavePass } from "three/examples/jsm/postprocessing/SavePass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { BlendShader } from "three/examples/jsm/shaders/BlendShader.js";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";

import TRACK from "./sounds/bgm.mp3";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { SoftGlitchPass } from "./SoftGlitch";
const ThreeMusicVisualizer = (props) => {
  const mountRef = useRef(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    // Create a renderer and attach it to the DOM
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const controls = new OrbitControls(camera, renderer.domElement);
    mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 3;

    let composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // postprocessing
    const renderTargetParameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
    };

    // save pass
    const savePass = new SavePass(
      new THREE.WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight,
        renderTargetParameters
      )
    );

    // blend pass
    const MOTION_BLUR_AMOUNT = 0.725;
    const blendPass = new ShaderPass(BlendShader, "tDiffuse1");
    blendPass.uniforms["tDiffuse2"].value = savePass.renderTarget.texture;
    blendPass.uniforms["mixRatio"].value = MOTION_BLUR_AMOUNT;

    // output pass
    const outputPass = new ShaderPass(CopyShader);
    outputPass.renderToScreen = true;

    // adding passes to composer
    composer.addPass(blendPass);
    composer.addPass(savePass);
    composer.addPass(outputPass);

    const softGlitch = new SoftGlitchPass();
    softGlitch.factor = 1;
    composer.addPass(softGlitch);

    const sphereGeometry = new THREE.SphereGeometry(1, 100, 100);
    const sphereMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    const wireframe = new THREE.LineSegments(sphereGeometry, sphereMaterial);
    const WIREFRAME_DELTA = 0.015;
    wireframe.scale.setScalar(1 + WIREFRAME_DELTA);
    sphere.add(wireframe);
    const visualizer = Visualizer(sphere, "uAudioFreauency");

    scene.add(sphere);
    controls.update();
    window.addEventListener("resize", () => {
      let h =
        window.innerHeight < (window.innerWidth / 16) * 9
          ? window.innerHeight
          : (window.innerWidth / 16) * 9;
      renderer.setSize(window.innerWidth, h); // Update renderer size

      camera.aspect = window.innerWidth / h; // Update camera aspect ratio
      camera.updateProjectionMatrix(); // Apply changes to the camera
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("TRACK LOAD");
            // Sphere is visible, play the audio
            visualizer.load(TRACK);
          } else {
            // Sphere is not visible, stop or pause the audio
            visualizer.stop();
          }
        });
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    );
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      sphere.material.uniforms.uTime.value = elapsedTime;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    if (mountRef.current) {
      observer.observe(mountRef.current);
    }
    animate();
    // Cleanup on component unmount
    return () => {
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
      observer.disconnect(); // Disconnect the observer
    };
  }, []);

  return <div ref={mountRef}>{props.children}</div>;
};

export default ThreeMusicVisualizer;

const Visualizer = (mesh, frequencyUniformName) => {
  const listener = new THREE.AudioListener();
  mesh.add(listener);
  mesh.material.uniforms[frequencyUniformName] = { value: 0 };
  const sound = new THREE.Audio(listener);
  const loader = new THREE.AudioLoader();

  const analyser = new THREE.AudioAnalyser(sound, 32);

  function load(path) {
    if (!sound.isPlaying) {
      loader.load(path, (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
        console.log("sound load");
      });
    }
  }

  function stop() {
    if (sound.isPlaying) {
      console.log("sound stop");
      sound.stop(); // Stop the sound
    }

    // Completely disconnect the audio from the context
  }
  function getFrequency() {
    return analyser.getAverageFrequency();
  }
  function update() {
    const freq = Math.max(getFrequency() - 100, 0) / 50;
    mesh.material.uniforms[frequencyUniformName].value = freq;
  }
  return { load, stop, getFrequency, update };
};
