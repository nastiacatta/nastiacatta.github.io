// src/components/Hero.js
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Link from 'next/link';

export default function Hero() {
  const canvasRef = useRef(null);
  const [text, setText] = useState('');
  const phrases = ['Machine Learning', 'Data Science', 'Robotics', 'Full-stack'];
  const typingSpeed = 130;
  const deletingSpeed = 80;
  const pauseDuration = 1800;

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
            timeoutId = setTimeout(type, deletingSpeed);
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
      camera.position.z = 6.8;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.minPolarAngle = Math.PI / 2;
      controls.maxPolarAngle = Math.PI / 2;
      controls.minAzimuthAngle = 0;
      controls.maxAzimuthAngle = 0;

      // Lighting — warm pink tint
      scene.add(new THREE.AmbientLight(0xffeef8, 0.9));
      const dirLight = new THREE.DirectionalLight(0xff80cc, 1.2);
      dirLight.position.set(3, 3, 3);
      scene.add(dirLight);
      const fillLight = new THREE.DirectionalLight(0xf060b4, 0.4);
      fillLight.position.set(-3, -1, 2);
      scene.add(fillLight);

      // Petal shape
      const petalShape = new THREE.Shape();
      petalShape.moveTo(0, 0);
      petalShape.bezierCurveTo(0.5, 0, 0.5, 2, 0, 3);
      petalShape.bezierCurveTo(-0.5, 2, -0.5, 0, 0, 0);

      const extrudeSettings = {
        depth: 0.06,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 2,
        bevelSize: 0.025,
        bevelThickness: 0.025,
      };
      const petalGeometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
      petalGeometry.translate(0, -1.5, 0);

      function bendGeometry(geometry, bendAmount) {
        const pos = geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const y = pos.getY(i);
          const z = pos.getZ(i);
          const theta = y * bendAmount;
          pos.setZ(i, z * Math.cos(theta) - y * Math.sin(theta));
          pos.setY(i, z * Math.sin(theta) + y * Math.cos(theta));
        }
        geometry.computeVertexNormals();
      }
      bendGeometry(petalGeometry, 0.28);

      // Vibrant pink petal material matching the palette
      const petalMaterial = new THREE.MeshPhongMaterial({
        color: 0xff80cc,
        emissive: 0xf060b4,
        emissiveIntensity: 0.3,
        side: THREE.DoubleSide,
        shininess: 120,
        opacity: 0.88,
        transparent: true,
      });

      const OPEN_ROTATION = Math.PI / 6;
      const CLOSED_ROTATION = -Math.PI / 2;

      const petals = [];
      const numPetals = 8;
      const petalAngle = (Math.PI * 2) / numPetals;
      const flowerGroup = new THREE.Group();
      scene.add(flowerGroup);
      flowerGroup.scale.set(1.08, 1.08, 1.08);

      for (let i = 0; i < numPetals; i++) {
        const petalMesh = new THREE.Mesh(petalGeometry, petalMaterial.clone());
        const petalGroup = new THREE.Group();
        petalGroup.add(petalMesh);

        const angle = i * petalAngle;
        petalGroup.position.x = 1.0 * Math.sin(angle);
        petalGroup.position.z = 1.0 * Math.cos(angle);
        petalGroup.rotation.y = angle;
        petalMesh.rotation.x = OPEN_ROTATION;
        petalGroup.userData.targetRotationX = OPEN_ROTATION;
        petalGroup.userData.rotationSpeed = 0.012 + Math.random() * 0.005;

        petals.push(petalGroup);
        flowerGroup.add(petalGroup);
      }

      // Glow sphere — pink
      const glowVert = `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;
      const glowFrag = `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(1.0, 0.376, 0.706, 0.55) * intensity;
        }
      `;
      const glowMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.6, 32, 32),
        new THREE.ShaderMaterial({
          vertexShader: glowVert,
          fragmentShader: glowFrag,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true,
        })
      );
      flowerGroup.add(glowMesh);
      flowerGroup.position.y = 0.18;

      // Small glowing center sphere
      const centerMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 24, 24),
        new THREE.MeshPhongMaterial({
          color: 0xffd0e8,
          emissive: 0xf060b4,
          emissiveIntensity: 0.8,
          shininess: 200,
        })
      );
      flowerGroup.add(centerMesh);

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
        const t = clock.getElapsedTime();

        raycaster.setFromCamera(mouse, camera);
        isHovering = raycaster.intersectObject(flowerGroup, true).length > 0;

        petals.forEach((pg) => {
          const pm = pg.children[0];
          pg.userData.targetRotationX = isHovering ? CLOSED_ROTATION : OPEN_ROTATION;
          pm.rotation.x += (pg.userData.targetRotationX - pm.rotation.x) * pg.userData.rotationSpeed;
          pm.rotation.x = THREE.MathUtils.clamp(pm.rotation.x, CLOSED_ROTATION, OPEN_ROTATION);
          pm.rotation.z = Math.sin(t * 2 + pg.position.x * 2) * 0.012;
          pg.position.y = Math.sin(t * 1.5 + pg.position.x * 2) * 0.022;
          pg.rotation.z = Math.sin(t + pg.position.x) * 0.022;
        });

        flowerGroup.rotation.y += 0.004;
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      function onWindowResize() {
        if (!canvasRef.current) return;
        camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      }
      window.addEventListener('resize', onWindowResize, false);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onWindowResize);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (controls) controls.dispose();
        renderer.dispose();
      };
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-center w-full h-full max-w-6xl mx-auto px-6 md:px-10">

        {/* Left Column */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start justify-center pt-20 md:pt-0">
          <p className="section-label mb-3">Portfolio</p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl neon leading-tight"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
          >
            Anastasia<br />Cattaneo
          </h1>

          {/* Typewriter — fixed-height line prevents layout shift */}
          <div className="mt-5 text-center md:text-left">
            <p className="text-lg md:text-xl text-white/70 dark:text-zinc-600">
              Design Engineer
            </p>
            <div className="h-8 flex items-center mt-1">
              <span className="typewriter font-medium text-base md:text-lg text-pink-300 dark:text-pink-600">
                {text}
              </span>
              <span className="typewriter-caret" aria-hidden>|</span>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/#projects" scroll={false}>
              <a className="view-my-work-button">
                View My Work
              </a>
            </Link>
          </div>
        </div>

        {/* Right Column — flower canvas */}
        <div className="md:w-1/2 w-full md:pl-10 mt-8 md:mt-0 relative flex items-center justify-center h-[46vw] md:h-[480px] max-h-[500px] overflow-hidden">
          <canvas ref={canvasRef} id="bg" className="w-full h-full" />
        </div>
      </div>
    </section>
  );
}
