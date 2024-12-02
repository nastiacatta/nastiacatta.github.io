// src/components/About.js

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function About() {
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log('Initializing Three.js in About.js');

    if (!canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a); // Dark grey background

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 5); // Adjust as needed

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
    canvasRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Ground Plane
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.75; // Adjust based on robot's position
    plane.receiveShadow = true;
    scene.add(plane);

    // Create Robot
    const robot = createRobot();
    scene.add(robot.group);

    // Handle Resize
    const handleResize = () => {
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let waveDirection = 1;
    const waveSpeed = 0.02;
    const maxWaveAngle = Math.PI / 4; // 45 degrees

    const animate = () => {
      requestAnimationFrame(animate);

      if (isHovered) {
        // Waving Animation
        robot.arm.rotation.z += waveSpeed * waveDirection;
        if (robot.arm.rotation.z > maxWaveAngle || robot.arm.rotation.z < -maxWaveAngle) {
          waveDirection *= -1;
        }
      } else {
        // Return arm to original position smoothly
        robot.arm.rotation.z = THREE.MathUtils.lerp(robot.arm.rotation.z, 0, 0.05);
      }

      // Optional: Add subtle movements or other animations here

      renderer.render(scene, camera);
    };
    animate();

    console.log('Three.js setup complete');

    // Cleanup on Unmount
    return () => {
      console.log('Cleaning up Three.js in About.js');
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
      // Dispose geometries and materials to free memory
      robot.group.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
      scene.clear();
    };
  }, [isHovered]);

  // Function to Create a Simple Human-like Robot
  const createRobot = () => {
    const group = new THREE.Group();

    // Body
    const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 0.5);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xFFC0CB }); // Light pink
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xFFC0CB });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.25;
    head.castShadow = true;
    head.receiveShadow = true;
    group.add(head);

    // Left Arm
    const leftArmGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
    const leftArmMaterial = new THREE.MeshStandardMaterial({ color: 0xFFC0CB });
    const leftArm = new THREE.Mesh(leftArmGeometry, leftArmMaterial);
    leftArm.position.set(-0.75, 0.25, 0);
    leftArm.castShadow = true;
    leftArm.receiveShadow = true;
    group.add(leftArm);

    // Right Arm
    const rightArmGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
    const rightArmMaterial = new THREE.MeshStandardMaterial({ color: 0xFFC0CB });
    const rightArm = new THREE.Mesh(rightArmGeometry, rightArmMaterial);
    rightArm.position.set(0.75, 0.25, 0);
    rightArm.castShadow = true;
    rightArm.receiveShadow = true;
    group.add(rightArm);

    // For Rigging: Make the arm a separate group to rotate it
    const armGroup = new THREE.Group();
    armGroup.position.set(0.75, 0.25, 0);
    group.add(armGroup);
    armGroup.add(rightArm);

    // Add Eyes for Better Appearance
    // Left Eye
    const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black eyes
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 0.05, 0.35);
    head.add(leftEye);

    // Right Eye
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 0.05, 0.35);
    head.add(rightEye);

    return { group, arm: armGroup };
  };

  return (
    <div className="relative">
      <div
        className="absolute top-0 right-0 z-10 mt-4 mr-4"
        onClick={() => window.location.href = 'mailto:anastasia.cattaneo@gmail.com'}
      >
        <a href="mailto:anastasia.cattaneo@gmail.com" className="text-white underline hover:text-lilac transition-colors">
          anastasia.cattaneo@gmail.com
        </a>
      </div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-pointer"
      >
        <div
          ref={canvasRef}
          className="w-full h-80 bg-gray-800"
        ></div>
      </div>
    </div>
  );
}
