// src/components/About.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export default function About() {
  const canvasRef = useRef(null);
  const hoveredRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    // Defer until the container has real dimensions (it starts in a data-animate
    // element at opacity:0 which can report 0 dimensions on some engines).
    let rafId;
    const waitForSize = (cb) => {
      if (container.clientWidth > 0 && container.clientHeight > 0) { cb(); return; }
      rafId = requestAnimationFrame(() => waitForSize(cb));
    };

    waitForSize(init);

    function init() {
      if (!canvasRef.current) return;
      let envRT = null;

      const scene = new THREE.Scene();
      scene.background = null;

      const W = container.clientWidth;
      const H = container.clientHeight;

      const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 1000);
      camera.position.set(0, 4.2, 11.5);
      camera.lookAt(0, 2.0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      const dprCap = W < 768 ? 1.25 : 2;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      container.appendChild(renderer.domElement);

      const pmrem = new THREE.PMREMGenerator(renderer);
      envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
      scene.environment = envRT.texture;
      pmrem.dispose();

      // Lights
      scene.add(new THREE.AmbientLight(0xffeef8, 0.4));
      const key = new THREE.DirectionalLight(0xffffff, 1.1);
      key.position.set(5, 14, 8);
      key.castShadow = true;
      key.shadow.mapSize.setScalar(W < 768 ? 1024 : 2048);
      key.shadow.bias = -0.0003;
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xffc8e8, 0.45);
      fill.position.set(-7, 4, 6);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0xf060b4, 0.5);
      rim.position.set(0, 5, -11);
      scene.add(rim);

      // Robot
      const robot = buildRobot();
      robot.group.scale.setScalar(1.45);
      scene.add(robot.group);

      // Shadow-catcher ground
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50),
        new THREE.ShadowMaterial({ opacity: 0.2 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -2.8;
      ground.receiveShadow = true;
      scene.add(ground);

      // Resize
      const handleResize = () => {
        if (!canvasRef.current) return;
        const w = canvasRef.current.clientWidth;
        const h = canvasRef.current.clientHeight;
        renderer.setSize(w, h);
        const cap = w < 768 ? 1.25 : 2;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, cap));
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', handleResize);

      // Drag-spin
      let isDragging = false;
      let prevMouse = { x: 0, y: 0 };
      let spinVelocity = 0;

      const onDown = (e) => {
        isDragging = true;
        const r = container.getBoundingClientRect();
        prevMouse = { x: e.clientX - r.left, y: e.clientY - r.top };
      };
      const onMove = (e) => {
        const r = container.getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        mouseRef.current.y = -((e.clientY - r.top) / r.height) * 2 + 1;
        if (isDragging) {
          spinVelocity = (e.clientX - r.left - prevMouse.x) * 0.005;
          prevMouse = { x: e.clientX - r.left, y: e.clientY - r.top };
        }
      };
      const onUp = () => { isDragging = false; };
      const onTouchStart = (e) => {
        isDragging = true;
        const r = container.getBoundingClientRect();
        prevMouse = { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
      };
      const onTouchMove = (e) => {
        if (!isDragging) return;
        const r = container.getBoundingClientRect();
        const t = e.touches[0];
        mouseRef.current.x = ((t.clientX - r.left) / r.width) * 2 - 1;
        mouseRef.current.y = -((t.clientY - r.top) / r.height) * 2 + 1;
        spinVelocity = (t.clientX - r.left - prevMouse.x) * 0.005;
        prevMouse = { x: t.clientX - r.left, y: t.clientY - r.top };
      };

      container.addEventListener('mousedown', onDown);
      container.addEventListener('mousemove', onMove);
      container.addEventListener('mouseup', onUp);
      container.addEventListener('mouseleave', onUp);
      container.addEventListener('mouseenter', () => { hoveredRef.current = true; });
      container.addEventListener('mouseleave', () => { hoveredRef.current = false; });
      container.addEventListener('touchstart', onTouchStart, { passive: true });
      container.addEventListener('touchmove', onTouchMove, { passive: true });
      container.addEventListener('touchend', onUp);
      container.addEventListener('touchcancel', onUp);

      // Animation
      // Right arm: ~18° = PI*0.1 at rest, wave swings from ~54° to ~144°
      let waveDir = 1;
      const waveSpeed = 0.013;
      const waveMax = Math.PI * 0.80;   // ~144° — arm almost straight up
      const waveMin = Math.PI * 0.30;   // ~54° — arm above horizontal

      let restDir = 1;
      const restSpeed = 0.0045;
      const restMax = Math.PI / 22;

      let eyeAngle = 0;
      const clock = new THREE.Clock();
      let animRunning = true;

      const animate = () => {
        if (!animRunning) return;
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        // Right arm — wave on hover, hang at rest
        if (hoveredRef.current) {
          robot.rightArm.rotation.z += (waveSpeed + Math.sin(t * 2.1) * 0.0015) * waveDir;
          robot.rightArm.rotation.z = THREE.MathUtils.clamp(robot.rightArm.rotation.z, waveMin, waveMax);
          if (robot.rightArm.rotation.z >= waveMax || robot.rightArm.rotation.z <= waveMin) waveDir *= -1;
        } else {
          // lerp back to natural hanging position (slight outward lean)
          robot.rightArm.rotation.z = THREE.MathUtils.lerp(robot.rightArm.rotation.z, Math.PI * 0.1, 0.055);
        }

        // Left arm — subtle idle sway when hovered, hang at rest
        if (hoveredRef.current) {
          robot.leftArm.rotation.z += restSpeed * restDir;
          robot.leftArm.rotation.z = THREE.MathUtils.clamp(robot.leftArm.rotation.z, -restMax, restMax);
          if (Math.abs(robot.leftArm.rotation.z) >= restMax) restDir *= -1;
        } else {
          robot.leftArm.rotation.z = THREE.MathUtils.lerp(robot.leftArm.rotation.z, 0, 0.05);
        }

        // Levitate + micro head tilt + antenna wobble
        robot.group.position.y = Math.sin(t * 1.05) * 0.07 + 1.85;
        robot.head.rotation.z = Math.sin(t * 0.75) * 0.035;
        robot.head.rotation.x = Math.sin(t * 1.2) * 0.015;
        if (robot.antenna) {
          robot.antenna.rotation.z = Math.sin(t * 2.2) * 0.12;
          robot.antenna.rotation.x = Math.sin(t * 1.8) * 0.055;
        }

        // Heart pulse
        if (robot.heartMat) {
          robot.heartMat.emissiveIntensity = 1.15 + Math.sin(t * 2.4) * 0.28;
        }

        // Spin — drag or momentum; ease back to front when idle
        if (isDragging) {
          robot.group.rotation.y += spinVelocity;
        } else if (Math.abs(spinVelocity) > 0.0005) {
          robot.group.rotation.y += spinVelocity;
          spinVelocity *= 0.93;
        } else {
          spinVelocity = 0;
          robot.group.rotation.y = THREE.MathUtils.lerp(robot.group.rotation.y, 0, 0.045);
        }

        // Eye tracking — use normalised mouse coords directly (avoids world-space errors)
        const eyeRange = 0.036;
        if (hoveredRef.current) {
          const mx = THREE.MathUtils.clamp(mouseRef.current.x, -1, 1);
          const my = THREE.MathUtils.clamp(mouseRef.current.y, -1, 1);
          robot.eyes.forEach((eye) => {
            eye.position.x = THREE.MathUtils.lerp(
              eye.position.x,
              eye.userData.ip.x + mx * eyeRange,
              0.10
            );
            eye.position.y = THREE.MathUtils.lerp(
              eye.position.y,
              eye.userData.ip.y + my * eyeRange * 0.65,
              0.10
            );
          });
        } else {
          // Idle: small slow random drift
          eyeAngle += 0.008;
          robot.eyes.forEach((eye, i) => {
            const drift = Math.sin(t * 0.6 + i * 1.4) * 0.012;
            eye.position.x = THREE.MathUtils.lerp(eye.position.x, eye.userData.ip.x + drift, 0.04);
            eye.position.y = THREE.MathUtils.lerp(eye.position.y, eye.userData.ip.y + Math.sin(t * 0.4) * 0.008, 0.04);
          });
        }

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        animRunning = false;
        window.removeEventListener('resize', handleResize);
        const c = canvasRef.current;
        if (c) {
          c.removeEventListener('mousedown', onDown);
          c.removeEventListener('mousemove', onMove);
          c.removeEventListener('mouseup', onUp);
          c.removeEventListener('touchstart', onTouchStart);
          c.removeEventListener('touchmove', onTouchMove);
          c.removeEventListener('touchend', onUp);
          c.removeEventListener('touchcancel', onUp);
          if (renderer.domElement && c.contains(renderer.domElement)) c.removeChild(renderer.domElement);
        }
        renderer.dispose();
        scene.environment = null;
        if (envRT) envRT.dispose();
        robot.group.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
            else child.material?.dispose();
          }
        });
      };
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      // cleanup handled inside init's return
    };
  }, []);

  // ── Robot builder ────────────────────────────────────────────
  function buildRobot() {
    const group = new THREE.Group();

    // ── Materials ──
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xd2afc4,
      metalness: 0.68,
      roughness: 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.07,
      sheen: 0.5,
      sheenColor: new THREE.Color(0xf060b4),
      sheenRoughness: 0.28,
      envMapIntensity: 1.25,
    });
    const darkMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e1828,
      metalness: 0.88,
      roughness: 0.28,
      clearcoat: 0.7,
      clearcoatRoughness: 0.22,
      envMapIntensity: 0.85,
    });
    const screenMat = new THREE.MeshPhysicalMaterial({
      color: 0x050107,
      roughness: 0.02,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      envMapIntensity: 2.0,
      transparent: true,
      opacity: 0.92,
    });
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xff88cc,
      emissive: 0xf060b4,
      emissiveIntensity: 1.5,
    });
    // Deep raspberry/dark pink — distinct from the light body colour
    const heartPixelMat = new THREE.MeshStandardMaterial({
      color: 0xb81060,
      emissive: 0x8c0842,
      emissiveIntensity: 1.8,
      metalness: 0.05,
      roughness: 0.40,
    });

    // ── Torso ──
    const torso = new THREE.Mesh(new RoundedBoxGeometry(1.1, 1.45, 0.62, 8, 0.15), bodyMat);
    torso.castShadow = true; torso.receiveShadow = true;
    group.add(torso);

    // Chest screen
    const chestScreen = new THREE.Mesh(new RoundedBoxGeometry(0.58, 0.68, 0.05, 6, 0.05), screenMat);
    chestScreen.position.set(0, 0.08, 0.335);
    torso.add(chestScreen);

    // Glow strip below heart
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.035, 0.012), glowMat);
    strip.position.set(0, -0.33, 0.34);
    torso.add(strip);

    // Pixel heart (7×6 grid of LED cubes)
    const px = 0.060;
    const pixelGeo = new THREE.BoxGeometry(px * 0.90, px * 0.90, 0.026);
    const heartPattern = [
      [0, 1, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
    ];
    const heartGroup = new THREE.Group();
    heartGroup.position.set(0, 0.10, 0.365);
    const rows = heartPattern.length;
    const cols = heartPattern[0].length;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!heartPattern[r][c]) continue;
        const cube = new THREE.Mesh(pixelGeo, heartPixelMat);
        cube.position.set((c - (cols - 1) / 2) * px, ((rows - 1) / 2 - r) * px, 0);
        heartGroup.add(cube);
      }
    }
    torso.add(heartGroup);

    // ── Neck ──
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.20, 0.16, 20), darkMat);
    neck.position.y = 0.82;
    neck.castShadow = true;
    torso.add(neck);

    // ── Head ──
    const head = new THREE.Mesh(new RoundedBoxGeometry(0.94, 0.84, 0.86, 8, 0.15), bodyMat);
    head.position.y = 1.10;
    head.castShadow = true; head.receiveShadow = true;
    torso.add(head);

    // Visor
    const visor = new THREE.Mesh(new RoundedBoxGeometry(0.70, 0.33, 0.040, 6, 0.04), screenMat);
    visor.position.set(0, 0.065, 0.458);
    head.add(visor);

    // Eye LED rings (Torus in XY plane → faces viewer)
    const eyeRingGeo = new THREE.TorusGeometry(0.052, 0.011, 10, 28);
    const eyeRingMat = glowMat.clone();
    eyeRingMat.emissiveIntensity = 1.3;
    const lRing = new THREE.Mesh(eyeRingGeo, eyeRingMat);
    lRing.position.set(-0.168, 0.065, 0.022);
    visor.add(lRing);
    const rRing = new THREE.Mesh(eyeRingGeo, eyeRingMat.clone());
    rRing.position.set(0.168, 0.065, 0.022);
    visor.add(rRing);

    // Pupils
    const pupilGeo = new THREE.CircleGeometry(0.034, 24);
    const pupilMat = new THREE.MeshStandardMaterial({
      color: 0xfff0ff,
      emissive: 0xffc8f0,
      emissiveIntensity: 0.6,
      metalness: 0.05,
      roughness: 0.2,
    });
    const leftEye = new THREE.Mesh(pupilGeo, pupilMat);
    leftEye.position.set(-0.168, 0.065, 0.032);
    leftEye.userData.ip = leftEye.position.clone();
    visor.add(leftEye);
    const rightEye = new THREE.Mesh(pupilGeo, pupilMat.clone());
    rightEye.position.set(0.168, 0.065, 0.032);
    rightEye.userData.ip = rightEye.position.clone();
    visor.add(rightEye);

    // Specular highlight dot on each pupil
    const hlGeo = new THREE.PlaneGeometry(0.010, 0.010);
    const hlMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.92 });
    const lHl = new THREE.Mesh(hlGeo, hlMat);
    lHl.position.set(0.015, 0.011, 0.005);
    leftEye.add(lHl);
    const rHl = new THREE.Mesh(hlGeo, hlMat.clone());
    rHl.position.set(0.015, 0.011, 0.005);
    rightEye.add(rHl);

    // Smile
    const mouth = new THREE.Mesh(
      new THREE.CircleGeometry(0.085, 20, 0, Math.PI),
      new THREE.MeshBasicMaterial({ color: 0xff9ecf })
    );
    mouth.rotation.z = Math.PI;
    mouth.position.set(0, -0.115, 0.028);
    visor.add(mouth);

    // Ear panels
    ['left', 'right'].forEach((side) => {
      const ear = new THREE.Mesh(new RoundedBoxGeometry(0.085, 0.32, 0.24, 6, 0.05), darkMat);
      ear.position.set(side === 'left' ? -0.52 : 0.52, 0.02, 0);
      ear.castShadow = true;
      head.add(ear);
    });

    // Antenna
    const antennaGroup = new THREE.Group();
    antennaGroup.position.set(0.28, 0.52, 0);
    head.add(antennaGroup);
    const antStem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.026, 0.32, 12), darkMat);
    antStem.position.y = 0.16; antStem.castShadow = true;
    antennaGroup.add(antStem);
    const antBall = new THREE.Mesh(new THREE.SphereGeometry(0.052, 16, 16), glowMat);
    antBall.position.y = 0.34;
    antennaGroup.add(antBall);

    // ── Shoulder hubs ──
    const shoulderGeo = new THREE.SphereGeometry(0.15, 22, 22);
    [-0.64, 0.64].forEach((x) => {
      const hub = new THREE.Mesh(shoulderGeo, darkMat);
      hub.position.set(x, 0.38, 0); hub.castShadow = true;
      torso.add(hub);
    });

    // ── Left arm ──
    const leftArm = new THREE.Group();
    leftArm.position.set(-0.64, 0.38, 0);
    torso.add(leftArm);
    const lUpper = new THREE.Mesh(new RoundedBoxGeometry(0.23, 0.48, 0.23, 6, 0.07), bodyMat);
    lUpper.geometry.translate(0, -0.24, 0); lUpper.castShadow = true;
    leftArm.add(lUpper);
    const lElbow = new THREE.Mesh(new THREE.SphereGeometry(0.105, 16, 16), darkMat);
    lElbow.position.y = -0.48; leftArm.add(lElbow);
    const lFore = new THREE.Mesh(new RoundedBoxGeometry(0.19, 0.40, 0.19, 6, 0.07), bodyMat);
    lFore.geometry.translate(0, -0.20, 0);
    lFore.position.y = -0.48; lFore.castShadow = true;
    leftArm.add(lFore);
    // Left hand
    const lHand = new THREE.Mesh(new RoundedBoxGeometry(0.22, 0.22, 0.18, 6, 0.06), darkMat);
    lHand.position.y = -0.90; leftArm.add(lHand);

    // ── Right arm ──
    const rightArm = new THREE.Group();
    rightArm.position.set(0.64, 0.38, 0);
    torso.add(rightArm);
    const rUpper = new THREE.Mesh(new RoundedBoxGeometry(0.23, 0.48, 0.23, 6, 0.07), bodyMat);
    rUpper.geometry.translate(0, -0.24, 0); rUpper.castShadow = true;
    rightArm.add(rUpper);
    const rElbow = new THREE.Mesh(new THREE.SphereGeometry(0.105, 16, 16), darkMat);
    rElbow.position.y = -0.48; rightArm.add(rElbow);
    const rFore = new THREE.Mesh(new RoundedBoxGeometry(0.19, 0.40, 0.19, 6, 0.07), bodyMat);
    rFore.geometry.translate(0, -0.20, 0);
    rFore.position.y = -0.48; rFore.castShadow = true;
    rightArm.add(rFore);
    // Right hand
    const rHand = new THREE.Mesh(new RoundedBoxGeometry(0.22, 0.22, 0.18, 6, 0.06), darkMat);
    rHand.position.y = -0.90; rightArm.add(rHand);

    // ── Pelvis / waist belt (bridges torso→legs cleanly) ──
    const pelvis = new THREE.Mesh(new RoundedBoxGeometry(1.04, 0.22, 0.56, 8, 0.08), darkMat);
    pelvis.position.y = -0.835; pelvis.castShadow = true;
    torso.add(pelvis);

    // Decorative belt strip
    const belt = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.035, 0.015), glowMat);
    belt.position.set(0, -0.835, 0.295);
    torso.add(belt);

    // Hip sphere joints on each side
    [-0.38, 0.38].forEach((x) => {
      const hipJoint = new THREE.Mesh(new THREE.SphereGeometry(0.13, 18, 18), darkMat);
      hipJoint.position.set(x, -0.92, 0); hipJoint.castShadow = true;
      torso.add(hipJoint);
    });

    // ── Legs ──
    [-0.32, 0.32].forEach((x) => {
      const legBase = new THREE.Group();
      legBase.position.set(x, -0.95, 0);
      torso.add(legBase);

      const thigh = new THREE.Mesh(new RoundedBoxGeometry(0.26, 0.50, 0.26, 6, 0.07), bodyMat);
      thigh.geometry.translate(0, -0.25, 0); thigh.castShadow = true; thigh.receiveShadow = true;
      legBase.add(thigh);

      const knee = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), darkMat);
      knee.position.y = -0.50; legBase.add(knee);

      const shin = new THREE.Mesh(new RoundedBoxGeometry(0.21, 0.46, 0.21, 6, 0.07), bodyMat);
      shin.geometry.translate(0, -0.23, 0);
      shin.position.y = -0.50; shin.castShadow = true; shin.receiveShadow = true;
      legBase.add(shin);

      const foot = new THREE.Mesh(new RoundedBoxGeometry(0.28, 0.12, 0.40, 6, 0.05), darkMat);
      foot.position.set(0, -1.02, 0.06); foot.castShadow = true; foot.receiveShadow = true;
      legBase.add(foot);
    });

    return {
      group,
      leftArm,
      rightArm,
      head,
      eyes: [leftEye, rightEye],
      antenna: antennaGroup,
      heartMat: heartPixelMat,
    };
  }

  return (
    <section id="about" className="section">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-6xl mx-auto min-w-0">

        {/* Text + Photo */}
        <div className="md:w-1/2 flex flex-col" data-animate>
          <div className="flex items-center gap-5 mb-7">
            <img
              src="/profilepic.jpeg"
              alt="Anastasia Cattaneo"
              loading="eager"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover object-top border-2 border-pink-400/40 shadow-[0_0_20px_rgba(240,96,180,0.25)] shrink-0"
            />
            <div>
              <p className="section-label !mb-1">Background</p>
              <p className="text-sm text-white/55 dark:text-zinc-500 leading-snug">
                MEng Design Engineering<br />Imperial College London
              </p>
            </div>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-zinc-900 leading-tight"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            About Me
          </h2>
          <p className="text-base md:text-lg text-white/80 dark:text-zinc-700 leading-relaxed mb-4">
            I&apos;m a fourth-year MEng Design Engineering student at Imperial College London
            and a Business Intelligence Engineer (intern → part-time) at Amazon.
          </p>
          <p className="text-base md:text-lg text-white/80 dark:text-zinc-700 leading-relaxed">
            I&apos;m interested in machine learning, data science, software, and robotics.
            I like owning problems end-to-end and building user-centred solutions that are
            elegant to use and robust underneath.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {['Machine Learning', 'Data Science', 'Robotics', 'Amazon'].map(tag => (
              <span key={tag} className="px-3 py-1.5 text-xs rounded-full border border-pink-400/25 text-pink-200 dark:text-pink-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Robot — no border box, fully transparent */}
        <div className="md:w-1/2 w-full flex justify-center items-center" data-animate data-delay="2">
          <div
            ref={canvasRef}
            className="w-full max-w-[min(100%,560px)]"
            style={{ height: 'clamp(300px, min(72vw, 50vh), 560px)' }}
            aria-label="Animated 3D robot — hover to wave, drag to rotate"
          />
        </div>
      </div>
    </section>
  );
}
