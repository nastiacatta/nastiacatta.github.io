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
    const camera = new THREE.PerspectiveCamera(54, canvas.clientWidth / canvas.clientHeight, 0.1, 1500);
    camera.position.set(0, 0.3, 7.5);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minAzimuthAngle = 0;
    controls.maxAzimuthAngle = 0;

    // ── Lights ──
    scene.add(new THREE.AmbientLight(0xffeef8, 0.55));

    const keyLight = new THREE.DirectionalLight(0xffd4ec, 1.5);
    keyLight.position.set(3.5, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf060b4, 0.55);
    fillLight.position.set(-4, 1, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffeedd, 0.85);
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);

    // Warm point light at center for stamen glow
    const centerPoint = new THREE.PointLight(0xffcc55, 1.8, 6);
    centerPoint.position.set(0, 0, 0.5);
    scene.add(centerPoint);

    // ── Shared petal geometry helpers ──
    function makePetalGeo(length, width, bend) {
      // Organic wide petal — broad belly, narrow tip
      const shape = new THREE.Shape();
      const w = width;
      const l = length;
      shape.moveTo(0, 0);
      shape.bezierCurveTo( w * 0.9,  l * 0.08,  w * 0.95,  l * 0.55,  w * 0.28,  l * 0.82);
      shape.bezierCurveTo( w * 0.06,  l * 0.92,  0,         l,          0,          l);
      shape.bezierCurveTo(-w * 0.06,  l * 0.92, -w * 0.28,  l * 0.82, -w * 0.95,  l * 0.55);
      shape.bezierCurveTo(-w * 0.9,  l * 0.08,  0,          0,          0,          0);

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.055,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 3,
        bevelSize: 0.018,
        bevelThickness: 0.018,
      });
      // Centre the pivot at base
      geo.translate(0, -l * 0.5, -0.028);

      // Cup / curl the petal inward
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const z = pos.getZ(i);
        const theta = y * bend;
        pos.setZ(i, z * Math.cos(theta) - y * Math.sin(theta));
        pos.setY(i, z * Math.sin(theta) + y * Math.cos(theta));
      }
      geo.computeVertexNormals();
      return geo;
    }

    // Three petal ring geometries
    const outerGeo  = makePetalGeo(3.2, 0.92, 0.25);  // large outer petals
    const midGeo    = makePetalGeo(2.3, 0.74, 0.30);  // medium mid ring
    const innerGeo  = makePetalGeo(1.5, 0.56, 0.38);  // small inner petals

    // ── Petal material factory ──
    function petalMat(hue, lightness, emissiveIntensity = 0.18) {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL(hue, 0.88, lightness),
        emissive: new THREE.Color().setHSL(hue, 1.0, 0.38),
        emissiveIntensity,
        side: THREE.DoubleSide,
        roughness: 0.28,
        metalness: 0.01,
        clearcoat: 1.0,
        clearcoatRoughness: 0.10,
        transmission: 0.10,
        thickness: 0.6,
        opacity: 0.94,
        transparent: true,
      });
    }

    const OUTER_OPEN   =  Math.PI / 5.0;   // open angle
    const OUTER_CLOSED = -Math.PI / 2.0;   // closed (hover)
    const MID_OPEN     =  Math.PI / 5.8;
    const MID_CLOSED   = -Math.PI / 1.85;
    const INNER_OPEN   =  Math.PI / 6.5;
    const INNER_CLOSED = -Math.PI / 1.6;

    const flowerGroup = new THREE.Group();
    scene.add(flowerGroup);

    function buildRing(geo, matFn, count, radius, yOffset, openAngle, hueStart, hueStep, liStep) {
      const ring = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const mat = matFn(hueStart + i * hueStep, 0.64 + i * liStep);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = openAngle;
        const pg = new THREE.Group();
        pg.add(mesh);
        pg.position.set(Math.sin(angle) * radius, yOffset, Math.cos(angle) * radius);
        pg.rotation.y = angle;
        pg.userData = {
          phase: (i / count) * Math.PI * 2,
          speed: 0.014 + (i % 3) * 0.003,
        };
        flowerGroup.add(pg);
        ring.push(pg);
      }
      return ring;
    }

    // Outer ring: 12 deep-pink petals
    const outerRing = buildRing(
      outerGeo, petalMat,
      12, 0.95, 0,
      OUTER_OPEN,
      0.88, 0.0055, 0.006
    );

    // Mid ring: 9 lighter rose petals, slightly elevated
    const midRing = buildRing(
      midGeo, petalMat,
      9, 0.52, 0.05,
      MID_OPEN,
      0.90, 0.006, 0.008
    );

    // Inner ring: 6 pale blush petals
    const innerRing = buildRing(
      innerGeo, petalMat,
      6, 0.26, 0.12,
      INNER_OPEN,
      0.92, 0.008, 0.012
    );

    // ── Stamen cluster ──
    const stamenMat = new THREE.MeshPhysicalMaterial({
      color: 0xffe066,
      emissive: 0xffaa00,
      emissiveIntensity: 1.1,
      roughness: 0.3,
      metalness: 0.0,
      clearcoat: 0.5,
    });
    const stamenTipMat = new THREE.MeshStandardMaterial({
      color: 0xffcc22,
      emissive: 0xffee55,
      emissiveIntensity: 1.4,
    });

    // Central stamens — thin stems with pollen tips
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const r = 0.05 + (i % 3) * 0.06;
      const h = 0.22 + Math.sin(i * 1.3) * 0.06;

      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.012, h, 6),
        stamenMat
      );
      stem.position.set(Math.sin(a) * r, h * 0.5, Math.cos(a) * r);
      flowerGroup.add(stem);

      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), stamenTipMat);
      tip.position.set(Math.sin(a) * r, h + 0.012, Math.cos(a) * r);
      flowerGroup.add(tip);
    }

    // Central dome — receptacle
    const receptacle = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 24, 24),
      new THREE.MeshPhysicalMaterial({
        color: 0x4a2800,
        emissive: 0xaa5500,
        emissiveIntensity: 0.4,
        roughness: 0.65,
        metalness: 0.05,
      })
    );
    receptacle.scale.y = 0.55;
    flowerGroup.add(receptacle);

    // ── Outer glow halo ──
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: `varying vec3 vN; void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying vec3 vN; void main(){float i=pow(0.60-dot(vN,vec3(0,0,1)),2.4);gl_FragColor=vec4(0.95,0.26,0.65,0.48)*i;}`,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const halo = new THREE.Mesh(new THREE.SphereGeometry(2.1, 32, 32), haloMat);
    flowerGroup.add(halo);

    // ── Pollen sparkle particles (kept subtle / dim) ──
    const N_SPARKS = 90;
    const sparkPos = new Float32Array(N_SPARKS * 3);
    const sparkMeta = [];
    for (let i = 0; i < N_SPARKS; i++) {
      const r     = 1.1 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.PI * 0.2 + Math.random() * Math.PI * 0.6;
      sparkMeta.push({ r, theta, phi, dTheta: (0.15 + Math.random() * 0.25) * (Math.random() < 0.5 ? 1 : -1), phase: Math.random() * Math.PI * 2 });
      sparkPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      sparkPos[i * 3 + 1] = r * Math.cos(phi);
      sparkPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xc9b8a8,
      size: 0.028,
      transparent: true,
      opacity: 0.22,
      blending: THREE.NormalBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    flowerGroup.add(sparks);

    // ── Hover detection ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isHovering = false;
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, false);

    flowerGroup.position.y = 0.15;
    const clock = new THREE.Clock();

    function lerpAngle(current, target, speed) {
      return current + (target - current) * speed;
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      raycaster.setFromCamera(mouse, camera);
      isHovering = raycaster.intersectObject(flowerGroup, true).length > 0;

      const tgtOuter = isHovering ? OUTER_CLOSED : OUTER_OPEN;
      const tgtMid   = isHovering ? MID_CLOSED   : MID_OPEN;
      const tgtInner = isHovering ? INNER_CLOSED : INNER_OPEN;

      outerRing.forEach((pg) => {
        const pm = pg.children[0];
        const { phase, speed } = pg.userData;
        pm.rotation.x = lerpAngle(pm.rotation.x, tgtOuter + Math.sin(t * 0.9 + phase) * 0.028, speed);
        pm.rotation.z = Math.sin(t * 0.55 + phase) * 0.018;
        pg.position.y = Math.sin(t * 0.85 + phase) * 0.032;
        pm.material.emissiveIntensity = 0.14 + Math.abs(Math.sin(t * 1.2 + phase)) * 0.10;
      });

      midRing.forEach((pg) => {
        const pm = pg.children[0];
        const { phase, speed } = pg.userData;
        pm.rotation.x = lerpAngle(pm.rotation.x, tgtMid + Math.sin(t * 1.0 + phase) * 0.022, speed * 1.1);
        pm.rotation.z = Math.sin(t * 0.65 + phase) * 0.016;
        pg.position.y = 0.05 + Math.sin(t * 0.95 + phase) * 0.025;
        pm.material.emissiveIntensity = 0.20 + Math.abs(Math.sin(t * 1.4 + phase)) * 0.12;
      });

      innerRing.forEach((pg) => {
        const pm = pg.children[0];
        const { phase, speed } = pg.userData;
        pm.rotation.x = lerpAngle(pm.rotation.x, tgtInner + Math.sin(t * 1.15 + phase) * 0.018, speed * 1.2);
        pg.position.y = 0.12 + Math.sin(t * 1.05 + phase) * 0.018;
        pm.material.emissiveIntensity = 0.28 + Math.abs(Math.sin(t * 1.6 + phase)) * 0.14;
      });

      // Sparkle drift
      const sp = sparkGeo.attributes.position;
      for (let i = 0; i < N_SPARKS; i++) {
        const sm = sparkMeta[i];
        sm.theta += sm.dTheta * 0.006;
        const yWave = Math.sin(t * sm.dTheta * 1.5 + sm.phase) * 0.06;
        sp.setX(i, sm.r * Math.sin(sm.phi) * Math.cos(sm.theta));
        sp.setY(i, sm.r * Math.cos(sm.phi) + yWave);
        sp.setZ(i, sm.r * Math.sin(sm.phi) * Math.sin(sm.theta));
      }
      sp.needsUpdate = true;

      // Center warmth pulse
      centerPoint.intensity = 1.6 + Math.sin(t * 2.2) * 0.4;

      // Overall group sway — slow and organic, no full rotation
      flowerGroup.rotation.y += isHovering ? 0.0014 : 0.0020;
      flowerGroup.rotation.x = Math.sin(t * 0.42) * 0.028;
      flowerGroup.rotation.z = Math.sin(t * 0.31) * 0.012;
      flowerGroup.position.y = 0.15 + Math.sin(t * 0.65) * 0.042;

      halo.material.uniforms && undefined; // halo uses ShaderMaterial (no uniforms needed)

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
             style={{ height: 'clamp(280px, 44vw, 490px)' }}>
          <canvas ref={canvasRef} id="bg" className="w-full h-full" />
        </div>
      </div>
    </section>
  );
}
