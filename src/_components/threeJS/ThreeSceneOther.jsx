import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeSceneOther = (props) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Create the Three.js scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.z = 50;
    // Create a renderer and attach it to the DOM
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    //Create a PointLight and turn on shadows for the light
    const light = new THREE.PointLight(0xffffff, 100, 10);
    light.position.set(0, 10, 4);
    light.castShadow = true; // default false
    scene.add(light);

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default

    //Create a sphere that cast shadows (but does not receive them)
    const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = false; //default
    scene.add(sphere);

    //Create a plane that receives shadows (but does not cast them)
    const planeGeometry = new THREE.PlaneGeometry(400, 9, 20, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    scene.add(plane);

    window.addEventListener("resize", () => {
      let h =
        window.innerHeight < (window.innerWidth / 16) * 9
          ? window.innerHeight
          : (window.innerWidth / 16) * 9;
      renderer.setSize(window.innerWidth, h); // Update renderer size

      camera.aspect = window.innerWidth / h; // Update camera aspect ratio
      camera.updateProjectionMatrix(); // Apply changes to the camera
    });

    //Create a helper for the shadow camera (optional)
    const helper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(helper);
    controls.update();
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    };
    animate();

    // Cleanup on component unmount
    return () => {
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}>{props.children}</div>;
};

export default ThreeSceneOther;
