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
    scene.background = new THREE.Color(0x1a1a1a); // Dark grey

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasRef.current.appendChild(renderer.domElement);

    // Light
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
    plane.position.y = -0.75;
    plane.receiveShadow = true;
    scene.add(plane);

    // Robot
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
    const maxWaveAngle = Math.PI / 4;

    const animate = () => {
      requestAnimationFrame(animate);

      if (isHovered) {
        robot.arm.rotation.z += waveSpeed * waveDirection;
        if (robot.arm.rotation.z > maxWaveAngle || robot.arm.rotation.z < -maxWaveAngle) {
          waveDirection *= -1;
        }
      } else {
        robot.arm.rotation.z = THREE.MathUtils.lerp(robot.arm.rotation.z, 0, 0.05);
      }

      renderer.render(scene, camera);
    };
    animate();

    console.log('Three.js setup complete');

    // Cleanup
    return () => {
      console.log('Cleaning up Three.js in About.js');
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
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

    // Arm Group for Rigging
    const armGroup = new THREE.Group();
    armGroup.position.set(0.75, 0.25, 0);
    group.add(armGroup);
    armGroup.add(rightArm);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 0.05, 0.35);
    head.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 0.05, 0.35);
    head.add(rightEye);

    return { group, arm: armGroup };
  };

  return (
    <section className="py-10 px-6 flex flex-col md:flex-row items-center justify-between" id="about">
      {/* Text Section */}
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-lg">
          I am a third-year MEng Design Engineering student at Imperial College London, passionate about wearables, AI, and fashion.
        </p>
      </div>
      
      {/* Animation Section */}
      <div
        className="md:w-1/2 mt-8 md:mt-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={canvasRef}
          className="w-full h-80 bg-gray-800"
        ></div>
      </div>
    </section>
  );
}
