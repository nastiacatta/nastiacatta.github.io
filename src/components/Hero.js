// src/components/Hero.js
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Link from 'next/link';

export default function Hero() {
  const canvasRef = useRef(null);
  const [text, setText] = useState('');
  const phrases = ['Business Intelligence Engineering'];
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
          timeoutId = setTimeout(() => { isDeleting = true; timeoutId = setTimeout(type, deletingSpeed); }, pauseDuration);
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
    if (typeof window === 'undefined') return;
    const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls');
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, canvas.clientWidth / canvas.clientHeight, 0.1, 1500);
    camera.position.set(0.1, 0.2, 7.0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minAzimuthAngle = 0;
    controls.maxAzimuthAngle = 0;

    // Lighting
    scene.add(new THREE.AmbientLight(0xffeef8, 0.6));
    const dirLight = new THREE.DirectionalLight(0xff9dd8, 1.4);
    dirLight.position.set(2.8, 4.2, 3.4);
    scene.add(dirLight);
    const fillLight = new THREE.DirectionalLight(0xf060b4, 0.65);
    fillLight.position.set(-3.2, 0.8, 2.4);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xffb1e1, 0.8);
    rimLight.position.set(0, 2.8, -3.8);
    scene.add(rimLight);

    // ── Outer petal shape — wider, more natural ──
    const outerShape = new THREE.Shape();
    outerShape.moveTo(0, 0);
    outerShape.bezierCurveTo(0.72, 0.2,  0.78, 1.6,  0.38, 2.6);
    outerShape.bezierCurveTo(0.10, 3.1,  0.0,  3.2,  0.0,  3.2);
    outerShape.bezierCurveTo(0.0,  3.2,  -0.10, 3.1, -0.38, 2.6);
    outerShape.bezierCurveTo(-0.78, 1.6, -0.72, 0.2,  0.0,  0.0);

    const extOuter = {
      depth: 0.07, bevelEnabled: true,
      bevelSegments: 3, steps: 2,
      bevelSize: 0.022, bevelThickness: 0.022,
    };
    const outerPetalGeo = new THREE.ExtrudeGeometry(outerShape, extOuter);
    outerPetalGeo.translate(0, -1.6, 0);

    // Bend toward center
    const bendGeo = (geo, bend) => {
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i), z = pos.getZ(i);
        const theta = y * bend;
        pos.setZ(i, z * Math.cos(theta) - y * Math.sin(theta));
        pos.setY(i, z * Math.sin(theta) + y * Math.cos(theta));
      }
      geo.computeVertexNormals();
    };
    bendGeo(outerPetalGeo, 0.26);

    // ── Inner petal shape — shorter, rounder ──
    const innerShape = new THREE.Shape();
    innerShape.moveTo(0, 0);
    innerShape.bezierCurveTo(0.45, 0.15, 0.48, 1.0, 0.22, 1.6);
    innerShape.bezierCurveTo(0.06, 1.9, 0.0, 2.0, 0.0, 2.0);
    innerShape.bezierCurveTo(0.0, 2.0, -0.06, 1.9, -0.22, 1.6);
    innerShape.bezierCurveTo(-0.48, 1.0, -0.45, 0.15, 0.0, 0.0);

    const extInner = {
      depth: 0.06, bevelEnabled: true,
      bevelSegments: 2, steps: 2,
      bevelSize: 0.018, bevelThickness: 0.018,
    };
    const innerPetalGeo = new THREE.ExtrudeGeometry(innerShape, extInner);
    innerPetalGeo.translate(0, -1.0, 0);
    bendGeo(innerPetalGeo, 0.32);

    // ── Materials ──
    const outerMat = (i, total) => new THREE.MeshPhysicalMaterial({
      color: new THREE.Color().setHSL(0.87 + i * 0.007, 0.92, 0.68),
      emissive: new THREE.Color().setHSL(0.88, 1.0, 0.42),
      emissiveIntensity: 0.24,
      side: THREE.DoubleSide,
      roughness: 0.30,
      metalness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.14,
      transmission: 0.08,
      thickness: 0.5,
      opacity: 0.92,
      transparent: true,
    });

    const innerMat = (i) => new THREE.MeshPhysicalMaterial({
      color: new THREE.Color().setHSL(0.92 + i * 0.006, 0.95, 0.78),
      emissive: new THREE.Color(0xffd0f0),
      emissiveIntensity: 0.35,
      side: THREE.DoubleSide,
      roughness: 0.22,
      metalness: 0.02,
      clearcoat: 0.9,
      clearcoatRoughness: 0.10,
      transmission: 0.12,
      thickness: 0.3,
      opacity: 0.88,
      transparent: true,
    });

    const OPEN_OUTER  = Math.PI / 5.2;
    const CLOSED_OUTER = -Math.PI / 2.1;
    const OPEN_INNER  = Math.PI / 6.5;
    const CLOSED_INNER = -Math.PI / 1.9;

    const flowerGroup = new THREE.Group();
    scene.add(flowerGroup);
    flowerGroup.position.y = 0.18;

    // Outer petals (10)
    const NUM_OUTER = 10;
    const outerPetals = [];
    for (let i = 0; i < NUM_OUTER; i++) {
      const angle = (i / NUM_OUTER) * Math.PI * 2;
      const pg = new THREE.Group();
      pg.position.set(Math.sin(angle) * 0.90, 0, Math.cos(angle) * 0.90);
      pg.rotation.y = angle;
      const pm = new THREE.Mesh(outerPetalGeo, outerMat(i, NUM_OUTER));
      pm.rotation.x = OPEN_OUTER;
      pg.add(pm);
      pg.userData = {
        phase: (i / NUM_OUTER) * Math.PI * 2,
        rotSpeed: 0.016 + Math.random() * 0.006,
      };
      outerPetals.push(pg);
      flowerGroup.add(pg);
    }

    // Inner petals (7, offset by half-step, slightly closer)
    const NUM_INNER = 7;
    const innerPetals = [];
    for (let i = 0; i < NUM_INNER; i++) {
      const angle = ((i + 0.5) / NUM_INNER) * Math.PI * 2;
      const pg = new THREE.Group();
      pg.position.set(Math.sin(angle) * 0.46, 0.04, Math.cos(angle) * 0.46);
      pg.rotation.y = angle;
      const pm = new THREE.Mesh(innerPetalGeo, innerMat(i));
      pm.rotation.x = OPEN_INNER;
      pg.add(pm);
      pg.userData = {
        phase: (i / NUM_INNER) * Math.PI * 2 + 0.5,
        rotSpeed: 0.018 + Math.random() * 0.007,
      };
      innerPetals.push(pg);
      flowerGroup.add(pg);
    }

    // Outer glow halo
    const glowVert = `varying vec3 vNormal; void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
    const glowFrag = `varying vec3 vNormal; void main(){float i=pow(0.62-dot(vNormal,vec3(0,0,1)),2.2);gl_FragColor=vec4(1.0,0.35,0.72,0.5)*i;}`;
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.85, 32, 32),
      new THREE.ShaderMaterial({ vertexShader: glowVert, fragmentShader: glowFrag, side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true })
    );
    flowerGroup.add(halo);

    // Center sphere — warm honey yellow
    const center = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 24, 24),
      new THREE.MeshPhysicalMaterial({
        color: 0xffe58a,
        emissive: 0xffaa00,
        emissiveIntensity: 1.0,
        roughness: 0.25,
        metalness: 0.12,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      })
    );
    flowerGroup.add(center);

    // Stamen bumps around center
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const stamen = new THREE.Mesh(
        new THREE.SphereGeometry(0.052, 10, 10),
        new THREE.MeshStandardMaterial({ color: 0xffee99, emissive: 0xffcc44, emissiveIntensity: 0.85 })
      );
      stamen.position.set(Math.sin(a) * 0.34, 0.04, Math.cos(a) * 0.34);
      flowerGroup.add(stamen);
    }

    // ── Sparkle particles ──
    const SPARKS = 180;
    const sparkPositions = new Float32Array(SPARKS * 3);
    const sparkData = []; // { r, theta, phi, speed, phase }
    for (let i = 0; i < SPARKS; i++) {
      const r     = 1.1 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.random() * Math.PI;
      sparkData.push({ r, theta, phi, speed: 0.18 + Math.random() * 0.32, phase: Math.random() * Math.PI * 2 });
      sparkPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      sparkPositions[i * 3 + 1] = r * Math.cos(phi);
      sparkPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

    const sparkMat = new THREE.PointsMaterial({
      color: 0xffaad8,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    flowerGroup.add(sparks);

    // Mouse / hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isHovering = false;
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, false);

    const clock = new THREE.Clock();

    function animate() {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      raycaster.setFromCamera(mouse, camera);
      isHovering = raycaster.intersectObject(flowerGroup, true).length > 0;

      const targetOuter = isHovering ? CLOSED_OUTER : OPEN_OUTER;
      const targetInner = isHovering ? CLOSED_INNER : OPEN_INNER;

      outerPetals.forEach((pg) => {
        const pm = pg.children[0];
        const { phase, rotSpeed } = pg.userData;
        pm.rotation.x += (targetOuter - pm.rotation.x) * rotSpeed;
        pm.rotation.z = Math.sin(t * 1.5 + phase) * 0.022;
        pm.rotation.y = Math.sin(t * 0.85 + phase) * 0.012;
        pg.position.y = Math.sin(t * 1.0 + phase) * 0.038;
        pm.material.emissiveIntensity = 0.18 + Math.abs(Math.sin(t * 1.6 + phase)) * 0.14;
      });

      innerPetals.forEach((pg) => {
        const pm = pg.children[0];
        const { phase, rotSpeed } = pg.userData;
        pm.rotation.x += (targetInner - pm.rotation.x) * rotSpeed;
        pm.rotation.z = Math.sin(t * 1.8 + phase) * 0.018;
        pg.position.y = 0.04 + Math.sin(t * 1.15 + phase) * 0.025;
        pm.material.emissiveIntensity = 0.28 + Math.abs(Math.sin(t * 2.0 + phase)) * 0.16;
      });

      // Animate sparkles — each orbits at its own speed, fades in/out
      const pos = sparkGeo.attributes.position;
      for (let i = 0; i < SPARKS; i++) {
        const sd = sparkData[i];
        sd.theta += sd.speed * 0.008;
        const fade = 0.55 + 0.45 * Math.sin(t * sd.speed * 1.8 + sd.phase);
        pos.setX(i, sd.r * Math.sin(sd.phi) * Math.cos(sd.theta));
        pos.setY(i, sd.r * Math.cos(sd.phi) + Math.sin(t * sd.speed + sd.phase) * 0.15);
        pos.setZ(i, sd.r * Math.sin(sd.phi) * Math.sin(sd.theta));
        // Pack opacity into alpha via size variation
        sparkData[i]._alpha = fade;
      }
      pos.needsUpdate = true;
      sparkMat.opacity = 0.82;

      // Center & stamen pulse
      center.material.emissiveIntensity = 0.85 + Math.sin(t * 2.8) * 0.32;
      center.scale.setScalar(1 + Math.sin(t * 2.8) * 0.035);

      flowerGroup.rotation.y += isHovering ? 0.0016 : 0.0024;
      flowerGroup.rotation.x = Math.sin(t * 0.5) * 0.030;
      flowerGroup.position.y = 0.16 + Math.sin(t * 0.7) * 0.048;

      halo.material.opacity = 0.5 + Math.sin(t * 1.4) * 0.12;

      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener('resize', onResize, false);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (animId) cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] min-h-[100vh] flex items-center justify-center overflow-hidden"
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

          <div className="mt-5 text-center md:text-left">
            <p className="text-lg md:text-xl text-white/70 dark:text-zinc-600 leading-snug">
              Design Engineer ·{' '}
              <span className="typewriter text-pink-300 dark:text-pink-600 font-medium">
                {text}
              </span>
              <span className="typewriter-caret" aria-hidden>|</span>
            </p>
          </div>

          <div className="mt-8">
            <Link href="/#projects" scroll={false}>
              <a className="view-my-work-button inline-flex min-h-[44px] items-center justify-center touch-manipulation">
                View My Work
              </a>
            </Link>
          </div>
        </div>

        {/* Right Column — flower canvas */}
        <div className="md:w-1/2 w-full mt-6 md:mt-0 relative flex items-center justify-center"
             style={{ height: 'clamp(280px, 44vw, 480px)' }}>
          <canvas ref={canvasRef} id="bg" className="w-full h-full" />
        </div>
      </div>
    </section>
  );
}
