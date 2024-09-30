// src/components/Hero.js

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let controls;
    let animationFrameId;

    // Ensure the code runs only on the client side
    if (typeof window !== 'undefined') {
      // Import OrbitControls inside useEffect
      const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls');

      // Ensure the canvas element is available
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

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      // Add OrbitControls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableRotate = true;
      controls.enableZoom = false; // Disable zoom if desired
      controls.enablePan = false; // Disable panning

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

      const petalGeometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);

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

      // Petal Material with bright electric lilac color and increased transparency
      const petalMaterial = new THREE.MeshPhongMaterial({
        color: 0xB666D2, // Bright electric lilac
        emissive: 0xB666D2, // Add emissive color for glow effect
        emissiveIntensity: 0.5,
        side: THREE.DoubleSide,
        shininess: 100,
        opacity: 0.5,
        transparent: true,
      });

      const OPEN_ROTATION = 0;
      const CLOSED_ROTATION = Math.PI / 2; // Adjusted to rotate petals upward when closing
      const BASE_ROTATION_SPEED = 0.01; // Slower speed for smoother motion

      const petals = [];
      const numPetals = 8; // Adjust for more or fewer petals
      const petalAngle = (Math.PI * 2) / numPetals;

      // Create a group for the entire flower
      const flowerGroup = new THREE.Group();
      scene.add(flowerGroup);

      // Increase the size of the flower
      flowerGroup.scale.set(1.5, 1.5, 1.5); // Make the flower bigger

      for (let i = 0; i < numPetals; i++) {
        const petalMesh = new THREE.Mesh(petalGeometry, petalMaterial.clone());

        // Create a group for each petal
        const petalGroup = new THREE.Group();
        petalGroup.add(petalMesh);

        // Position the petal group around the circle
        const angle = i * petalAngle;
        const radius = 1;

        petalGroup.position.x = radius * Math.sin(angle);
        petalGroup.position.z = radius * Math.cos(angle);

        // Rotate the petal group to face outward
        petalGroup.rotation.y = angle;

        // Set initial rotation for the petal mesh
        petalMesh.rotation.x = OPEN_ROTATION;

        // Add rotation properties to the group
        petalGroup.userData.targetRotationX = OPEN_ROTATION;

        // Assign a random rotation speed variation
        petalGroup.userData.rotationSpeed = BASE_ROTATION_SPEED + Math.random() * 0.005;

        petals.push(petalGroup);
        flowerGroup.add(petalGroup);
      }

      // Add a center sphere
      const centerGeometry = new THREE.SphereGeometry(0.2, 32, 32);
      const centerMaterial = new THREE.MeshPhongMaterial({ color: 0xffffcc }); // Light yellow color
      const center = new THREE.Mesh(centerGeometry, centerMaterial);
      flowerGroup.add(center);

      // Add a glow effect around the flower using shaders
      const glowVertexShader = `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize( normalMatrix * normal );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `;

      const glowFragmentShader = `
        varying vec3 vNormal;
        void main() {
          float intensity = pow( 0.6 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 2.0 );
          gl_FragColor = vec4( 182.0/255.0, 102.0/255.0, 210.0/255.0, 1.0 ) * intensity;
        }
      `;

      const glowMaterial = new THREE.ShaderMaterial({
        vertexShader: glowVertexShader,
        fragmentShader: glowFragmentShader,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });

      const glowGeometry = new THREE.SphereGeometry(2.5, 32, 32);
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      flowerGroup.add(glowMesh);

      // Raycaster and mouse for interaction
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      // Animation loop
      const clock = new THREE.Clock();

      function animate() {
        animationFrameId = requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Gradually close the flower over time
        const closingDuration = 10; // Duration in seconds for the flower to close
        let closingProgress = Math.min(elapsedTime / closingDuration, 1); // 0 to 1

        petals.forEach((petalGroup) => {
          const petalMesh = petalGroup.children[0];

          // Compute the target rotation based on progress
          petalGroup.userData.targetRotationX =
            OPEN_ROTATION + closingProgress * (CLOSED_ROTATION - OPEN_ROTATION);

          // Smoothly interpolate the petal's rotation towards the target rotation
          petalMesh.rotation.x +=
            (petalGroup.userData.targetRotationX - petalMesh.rotation.x) *
            petalGroup.userData.rotationSpeed;

          // Add subtle trembling to petals
          petalMesh.rotation.z =
            Math.sin(elapsedTime * 2 + petalGroup.position.x * 2) * 0.01;

          // Petals oscillate slightly in position
          petalGroup.position.y =
            Math.sin(elapsedTime * 1.5 + petalGroup.position.x * 2) * 0.02;

          // Petals gently sway
          petalGroup.rotation.z = Math.sin(elapsedTime + petalGroup.position.x) * 0.02;
        });

        // Make the flower oscillate slightly
        flowerGroup.position.y = Math.sin(elapsedTime * 0.5) * 0.05;

        // Update controls to allow rotation at any time
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
      className="relative h-screen flex items-center justify-center text-center text-white"
    >
      {/* Canvas for Three.js animation */}
      <canvas
        ref={canvasRef}
        id="bg"
        className="absolute top-0 left-0 w-full h-full"
      ></canvas>

      {/* Text content overlaid on the animation */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1
          className="text-7xl font-bold"
          style={{
            background: 'linear-gradient(90deg, rgba(182,102,210,1) 0%, rgba(255,255,255,1) 100%)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 10px rgba(182,102,210,0.7)',
          }}
        >
          Hello!
        </h1>
        <p
          className="text-xl mt-4"
          style={{
            background: 'linear-gradient(90deg, rgba(182,102,210,1) 0%, rgba(255,255,255,1) 100%)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          I'm Anastasia, a Design Engineering student with a passion for wearables, AI, and fashion.
        </p>
        <div className="mt-8">
          <a
            href="#projects"
            className="px-6 py-3 text-indigo-600 font-bold text-xl hover:text-indigo-400"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
}
