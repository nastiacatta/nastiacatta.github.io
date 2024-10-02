// src/components/Hero.js

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Link from 'next/link';

export default function Hero() {
  const canvasRef = useRef(null);
  const [text, setText] = useState('');
  const phrases = ['AI', 'wearables', 'fashion'];
  const typingSpeed = 150; // Milliseconds per character
  const deletingSpeed = 100; // Milliseconds per character when deleting
  const pauseDuration = 1000; // Milliseconds to pause at the end of each phrase

  useEffect(() => {
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeoutId;

    function type() {
      const currentPhrase = phrases[currentPhraseIndex];

      if (!isDeleting) {
        // Typing
        setText(currentPhrase.substring(0, currentCharIndex + 1));
        currentCharIndex++;

        if (currentCharIndex === currentPhrase.length) {
          // Pause at the end of the phrase
          timeoutId = setTimeout(() => {
            isDeleting = true;
            timeoutId = setTimeout(type, pauseDuration);
          }, pauseDuration);
          return;
        }
      } else {
        // Deleting
        setText(currentPhrase.substring(0, currentCharIndex - 1));
        currentCharIndex--;

        if (currentCharIndex === 0) {
          // Move to next phrase
          isDeleting = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }
      }

      timeoutId = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }

    type();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let controls;
    let animationFrameId;

    if (typeof window !== 'undefined') {
      const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls');

      const canvas = canvasRef.current;
      if (!canvas) return;

      // Set up the scene, camera, and renderer
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      // Add OrbitControls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enablePan = false; // Disable panning
      controls.enableZoom = false; // Disable zoom if desired

      // Limit vertical rotation to prevent moving animation around vertically
      controls.minPolarAngle = Math.PI / 2 - 0.5; // Adjust angle as needed
      controls.maxPolarAngle = Math.PI / 2 + 0.5;

      // Limit horizontal rotation to prevent moving animation around horizontally
      controls.minAzimuthAngle = -0.5; // Adjust angle as needed
      controls.maxAzimuthAngle = 0.5;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(0, 1, 1);
      scene.add(directionalLight);

      // Create a custom petal shape
      const petalShape = new THREE.Shape();
      petalShape.moveTo(0, 0);
      petalShape.bezierCurveTo(0.5, 0, 0.5, 2, 0, 3);
      petalShape.bezierCurveTo(-0.5, 2, -0.5, 0, 0, 0);

      const extrudeSettings = {
        depth: 0.05,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 0.02,
        bevelThickness: 0.02,
      };

      const petalGeometry = new THREE.ExtrudeGeometry(
        petalShape,
        extrudeSettings
      );

      // Adjust the geometry to rotate around the base of the petal
      petalGeometry.translate(0, -1.5, 0); // Move geometry so pivot is at base

      // Function to bend geometry along the Y-axis
      function bendGeometry(geometry, bendAmount) {
        const positionAttribute = geometry.attributes.position;

        for (let i = 0; i < positionAttribute.count; i++) {
          const y = positionAttribute.getY(i);
          const z = positionAttribute.getZ(i);

          const theta = y * bendAmount;
          const sinTheta = Math.sin(theta);
          const cosTheta = Math.cos(theta);

          positionAttribute.setZ(i, z * cosTheta - y * sinTheta);
          positionAttribute.setY(i, z * sinTheta + y * cosTheta);
        }

        geometry.computeVertexNormals();
      }

      // Apply bending to the petal geometry
      bendGeometry(petalGeometry, 0.3); // Adjust bendAmount as needed

      // Petal Material with light pink color and increased transparency
      const petalMaterial = new THREE.MeshPhongMaterial({
        color: 0xffc0cb, // Light pink color
        emissive: 0xffc0cb, // Add emissive color for glow effect
        emissiveIntensity: 0.2,
        side: THREE.DoubleSide,
        shininess: 100,
        opacity: 0.8,
        transparent: true,
      });

      // Adjusted rotation angles
      const OPEN_ROTATION = Math.PI / 6; // Petals slightly open
      const CLOSED_ROTATION = -Math.PI / 2.5; // Adjusted to close petals fully without intersecting
      const BASE_ROTATION_SPEED = 0.02; // Slightly faster for smoother motion

      const petals = [];
      const numPetals = 8; // Adjust for more or fewer petals
      const petalAngle = (Math.PI * 2) / numPetals;

      // Create a group for the entire flower
      const flowerGroup = new THREE.Group();
      scene.add(flowerGroup);

      // Adjust the size of the flower
      flowerGroup.scale.set(0.8, 0.8, 0.8); // Adjusted scale to make the animation bigger

      for (let i = 0; i < numPetals; i++) {
        const petalMesh = new THREE.Mesh(
          petalGeometry,
          petalMaterial.clone()
        );

        // Create a group for each petal
        const petalGroup = new THREE.Group();
        petalGroup.add(petalMesh);

        // Position the petal group around the circle
        const angle = i * petalAngle;
        const radius = 1.2;

        petalGroup.position.x = radius * Math.sin(angle);
        petalGroup.position.z = radius * Math.cos(angle);

        // Rotate the petal group to face outward
        petalGroup.rotation.y = angle;

        // Set initial rotation for the petal mesh
        petalMesh.rotation.x = OPEN_ROTATION;

        // Add rotation properties to the group
        petalGroup.userData.targetRotationX = OPEN_ROTATION;

        // Assign a random rotation speed variation
        petalGroup.userData.rotationSpeed =
          BASE_ROTATION_SPEED + Math.random() * 0.005;

        petals.push(petalGroup);
        flowerGroup.add(petalGroup);
      }

      // Remove any unnecessary geometry that might cause the glitch
      // Ensure the scene's background is transparent
      renderer.setClearColor(0x000000, 0); // Fully transparent background

      // Animation loop
      const clock = new THREE.Clock();

      function animate() {
        animationFrameId = requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        petals.forEach((petalGroup) => {
          const petalMesh = petalGroup.children[0]; // Get the petal mesh

          // Smoothly interpolate the petal's rotation towards the target rotation
          petalMesh.rotation.x +=
            (petalGroup.userData.targetRotationX - petalMesh.rotation.x) *
            petalGroup.userData.rotationSpeed;

          // Ensure petals do not over-rotate to prevent intersection
          petalMesh.rotation.x = THREE.MathUtils.clamp(
            petalMesh.rotation.x,
            CLOSED_ROTATION,
            OPEN_ROTATION
          );

          // Add subtle trembling to petals
          petalMesh.rotation.z =
            Math.sin(elapsedTime * 2 + petalGroup.position.x * 2) * 0.01;

          // Petals oscillate slightly in position
          petalGroup.position.y =
            Math.sin(elapsedTime * 1.5 + petalGroup.position.x * 2) * 0.02;

          // Petals gently sway
          petalGroup.rotation.z =
            Math.sin(elapsedTime + petalGroup.position.x) * 0.02;
        });

        // Make the flower rotate slowly
        flowerGroup.rotation.y += 0.005;

        // Update controls
        controls.update();

        renderer.render(scene, camera);
      }

      animate();

      function onWindowResize() {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;

        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      }

      window.addEventListener('resize', onWindowResize, false);

      // Cleanup event listeners on component unmount
      return () => {
        window.removeEventListener('resize', onWindowResize);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        if (controls) controls.dispose();
      };
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center"
    >
      <div className="flex flex-col md:flex-row items-center w-full h-full px-8">
        {/* Left Column - Intro Text */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start justify-center">
          <h1 className="text-6xl neon mt-4">Anastasia</h1>
          <p className="text-2xl mt-4 text-center md:text-left">
            Design Engineering with a passion for{' '}
            <span className="typewriter">
              {text}
              <span className="typewriter-cursor">|</span>
            </span>
          </p>
        </div>

        {/* Right Column - Animation */}
        <div className="md:w-1/2 flex flex-col items-center justify-center">
          <canvas
            ref={canvasRef}
            id="bg"
            className="w-full h-64 md:h-full"
          ></canvas>

          {/* "View My Work" button under the animation */}
          <div className="mt-6">
            <Link href="/#projects" scroll={false}>
              <a
                className="px-6 py-3 text-xl transition-transform transform hover:scale-105 view-my-work-button"
                style={{ fontSize: '24px' }} // Increase the font size
              >
                View My Work
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
