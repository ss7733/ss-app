import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./shaders/vertex";
import fragmentShader from "./shaders/fragment";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeThird = (props) => {
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

    controls.update();
    const sphereGeometry = new THREE.IcosahedronGeometry(1, 50);
    const sphereMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);
    window.addEventListener("resize", () => {
      let h =
        window.innerHeight < (window.innerWidth / 16) * 9
          ? window.innerHeight
          : (window.innerWidth / 16) * 9;
      renderer.setSize(window.innerWidth, h); // Update renderer size

      camera.aspect = window.innerWidth / h; // Update camera aspect ratio
      camera.updateProjectionMatrix(); // Apply changes to the camera
    });

    const animate = () => {
      const timestamp = performance.now();
      const time = timestamp / 10000;
      sphereMaterial.uniforms.uTime.value = time;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
    // Cleanup on component unmount
    return () => {
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}>{props.children}</div>;
};

export default ThreeThird;
