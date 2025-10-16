// src/components/Hero.js
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Link from 'next/link';

export default function Hero() {
  const canvasRef = useRef(null);
  const [text, setText] = useState('');
  const phrases = ['Machine Learning', 'Data Science', 'Robotics'];
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseDuration = 1000;

  useEffect(() => {
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeoutId;

    function type() {
      const currentPhrase = phrases[currentPhraseIndex];
      if (!isDeleting) {
        setText(currentPhrase.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        if (currentCharIndex === currentPhrase.length) {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            timeoutId = setTimeout(type, pauseDuration);
          }, pauseDuration);
          return;
        }
      } else {
        setText(currentPhrase.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }
      }
      timeoutId = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }
    type();
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    let controls;
    let animationFrameId;

    if (typeof window !== 'undefined') {
      const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls');
      const canvas = canvasRef.current;
      if (!canvas) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1500);
      camera.position.z = 6;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.minPolarAngle = Math.PI / 2;
      controls.maxPolarAngle = Math.PI / 2;
      controls.minAzimuthAngle = 0;
      controls.maxAzimuthAngle = 0;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(0, 1, 1);
      scene.add(directionalLight);

      const petalShape = new THREE.Shape();
      petalShape.moveTo(0, 0);
      petalShape.bezierCurveTo(0.5, 0, 0.5, 2, 0, 3);
      petalShape.bezierCurveTo(-0.5, 2, -0.5, 0, 0, 0);

      const extrudeSettings = { depth: 0.05, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.02, bevelThickness: 0.02 };
      const petalGeometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
      petalGeometry.translate(0, -1.5, 0);

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
      bendGeometry(petalGeometry, 0.3);

      const petalMaterial = new THREE.MeshPhongMaterial({
        color: 0xffc0cb,
        emissive: 0xffc0cb,
        emissiveIntensity: 0.2,
        side: THREE.DoubleSide,
        shininess: 100,
        opacity: 0.8,
        transparent: true,
      });

      const OPEN_ROTATION = Math.PI / 6;
      const CLOSED_ROTATION = -Math.PI / 2;
      const BASE_ROTATION_SPEED = 0.01;

      const petals = [];
      const numPetals = 8;
      const petalAngle = (Math.PI * 2) / numPetals;

      const flowerGroup = new THREE.Group();
      scene.add(flowerGroup);
      flowerGroup.scale.set(1.4, 1.4, 1.4);

      for (let i = 0; i < numPetals; i++) {
        const petalMesh = new THREE.Mesh(petalGeometry, petalMaterial.clone());
        const petalGroup = new THREE.Group();
        petalGroup.add(petalMesh);

        const angle = i * petalAngle;
        const radius = 1.2;
        petalGroup.position.x = radius * Math.sin(angle);
        petalGroup.position.z = radius * Math.cos(angle);
        petalGroup.rotation.y = angle;

        petalMesh.rotation.x = OPEN_ROTATION;
        petalGroup.userData.targetRotationX = OPEN_ROTATION;
        petalGroup.userData.rotationSpeed = BASE_ROTATION_SPEED + Math.random() * 0.005;

        petals.push(petalGroup);
        flowerGroup.add(petalGroup);
      }

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
          gl_FragColor = vec4( 255.0/255.0, 192.0/255.0, 203.0/255.0, 0.5 ) * intensity;
        }
      `;
      const glowMaterial = new THREE.ShaderMaterial({
        vertexShader: glowVertexShader,
        fragmentShader: glowFragmentShader,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });
      const glowGeometry = new THREE.SphereGeometry(1.5, 32, 32);
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      flowerGroup.add(glowMesh);

      flowerGroup.position.y = 1;

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      let isHovering = false;

      function onMouseMove(event) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
      }
      window.addEventListener('mousemove', onMouseMove, false);

      const clock = new THREE.Clock();
      function animate() {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(flowerGroup, true);
        isHovering = intersects.length > 0;

        petals.forEach((petalGroup) => {
          const petalMesh = petalGroup.children[0];
          petalGroup.userData.targetRotationX = isHovering ? CLOSED_ROTATION : OPEN_ROTATION;

          petalMesh.rotation.x +=
            (petalGroup.userData.targetRotationX - petalMesh.rotation.x) *
            petalGroup.userData.rotationSpeed;

          petalMesh.rotation.x = THREE.MathUtils.clamp(
            petalMesh.rotation.x,
            CLOSED_ROTATION,
            OPEN_ROTATION
          );

          petalMesh.rotation.z = Math.sin(elapsedTime * 2 + petalGroup.position.x * 2) * 0.01;
          petalGroup.position.y = Math.sin(elapsedTime * 1.5 + petalGroup.position.x * 2) * 0.02;
          petalGroup.rotation.z = Math.sin(elapsedTime + petalGroup.position.x) * 0.02;
        });

        flowerGroup.rotation.y += 0.005;
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

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onWindowResize);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (controls) controls.dispose();
      };
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0"
    >
      <div className="flex flex-col md:flex-row items-center w-full h-full px-8">
        {/* Left Column - Intro Text */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start justify-center">
          <h1 className="text-6xl neon mt-4">Anastasia Cattaneo</h1>
          <p className="text-2xl mt-4 text-center md:text-left">
            Design Engineer with a passion for{' '}
            <span className="typewriter">{text}</span>
          </p>
        </div>

        {/* Right Column - Animation */}
        <div className="md:w-1/2 relative flex flex-col items-center justify-center">
          <canvas ref={canvasRef} id="bg" className="w-full h-full"></canvas>

          {/* "View My Work" button positioned higher over the canvas */}
          <div className="absolute bottom-20 md:bottom-30">
            <Link href="/#projects" scroll={false}>
              <a className="px-6 py-3 text-xl transition-transform transform hover:scale-105 view-my-work-button" style={{ fontSize: '24px' }}>
                View My Work
              </a>
            </Link>
          </div>
        </div>
      </div> {/* <-- missing in your version; closes the wrapper */}
    </section>
  );
}
