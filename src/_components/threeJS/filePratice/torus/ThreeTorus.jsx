import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./shaders/vertex";
import fragmentShader from "./shaders/fragment";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

const ThreeTorus = (props) => {
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

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.3, 100, 100),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2() },
          uDisplace: { value: 2 },
          uSpread: { value: 1.2 },
          uNoise: { value: 16 },
        },
      })
    );
    scene.add(torus);

    let composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.4,
      0.00001,
      0.01
    );
    composer.addPass(bloomPass);

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
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      torus.material.uniforms.uTime.value = elapsedTime;
      torus.rotation.z = Math.sin(elapsedTime) / 4 + elapsedTime / 20 + 5;
      renderer.render(scene, camera);
      composer.render();
      controls.update();
      requestAnimationFrame(animate);
    };
    animate();
    // Cleanup on component unmount
    return () => {
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}>{props.children}</div>;
};

export default ThreeTorus;
