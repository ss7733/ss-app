import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./shaders/vertex";
import fragmentShader from "./shaders/fragment";

const ThreeScene = (props) => {
  const mountRef = useRef(null);
  let h =
    window.innerHeight < (window.innerWidth / 16) * 9
      ? window.innerHeight
      : (window.innerWidth / 16) * 9;

  const baseColor = new THREE.Color(0xaaaaaa); // RGB normalized (0xaaaaaa)
  const metalness = 1.0;
  const roughness = 0.3;
  useEffect(() => {
    // Create the Three.js scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / h, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.z = 3;

    // Create a renderer and attach it to the DOM
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, h);
    mountRef.current.appendChild(renderer.domElement);

    const sphereGeometry = new THREE.IcosahedronGeometry(1, 50);
    const sphereMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uBaseColor: { value: baseColor },
        uMetalness: { value: metalness },
        uRoughness: { value: roughness },
        uLightPosition: { value: new THREE.Vector3(6, 6, 6) },
        uLightColor: { value: new THREE.Color(1, 1, 1) },
        uLightIntensity: { value: 1.0 },
        uLightRange: { value: 150.0 },
        uAmbientColor: { value: new THREE.Color(0.2, 0.2, 0.2) },
        uCameraPosition: { value: camera.position },
      },
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, window.innerWidth < 600 ? -0.5 : 0, 0);

    scene.add(sphere);

    const handleResize = () => {
      h =
        window.innerHeight < (window.innerWidth / 16) * 9
          ? window.innerHeight
          : (window.innerWidth / 16) * 9;
      renderer.setSize(window.innerWidth, h);
      sphere.position.set(0, window.innerWidth < 600 ? -0.5 : 0, 0);

      camera.aspect = window.innerWidth / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      const timestamp = performance.now();
      const time = timestamp / 10000;
      sphereMaterial.uniforms.uTime.value = time;
      sphere.rotation.x += 0.0005;
      sphere.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="ThreeScene" ref={mountRef}>
      {props.children}
    </div>
  );
};

export default ThreeScene;
