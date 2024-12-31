import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = (props) => {
  const mountRef = useRef(null);
  let h =
    window.innerHeight < (window.innerWidth / 16) * 9
      ? window.innerHeight
      : (window.innerWidth / 16) * 9;
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

    // // Add a cube to the scene
    const geometry = new THREE.IcosahedronGeometry();
    const material = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa, // Base color
      metalness: 1, // Fully metallic surface
      roughness: 0.3, // Slightly rough surface
    });
    const Icosahedron = new THREE.Mesh(geometry, material);
    Icosahedron.position.set(0, 0, 0);
    scene.add(Icosahedron);

    window.addEventListener("resize", () => {
      h =
        window.innerHeight < (window.innerWidth / 16) * 9
          ? window.innerHeight
          : (window.innerWidth / 16) * 9;
      console.log("h", h);
      renderer.setSize(window.innerWidth, h); // Update renderer size

      camera.aspect = window.innerWidth / h; // Update camera aspect ratio
      camera.updateProjectionMatrix(); // Apply changes to the camera
    });
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 500);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      Icosahedron.rotation.x += 0.005;
      Icosahedron.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on component unmount
    return () => {
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="ThreeScene" ref={mountRef}>
      {props.children}
    </div>
  );
};

export default ThreeScene;
