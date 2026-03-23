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
    if (!canvasRef.current) return;

    let envRT = null;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      42,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3.8, 9.2);
    camera.lookAt(0, 2.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    canvasRef.current.appendChild(renderer.domElement);

    // IBL environment for physically correct reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    pmrem.dispose();

    // Lights
    scene.add(new THREE.AmbientLight(0xffeef8, 0.4));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(5, 14, 8);
    key.castShadow = true;
    key.shadow.mapSize.setScalar(2048);
    key.shadow.bias = -0.0003;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffc8e8, 0.45);
    fill.position.set(-7, 4, 6);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xf060b4, 0.5);
    rim.position.set(0, 5, -11);
    scene.add(rim);

    // ── Robot ─────────────────────────────────────────────────
    const robot = buildRobot();
    robot.group.scale.setScalar(1.6);
    scene.add(robot.group);

    // Transparent shadow-catcher
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.ShadowMaterial({ opacity: 0.22 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.6;
    ground.receiveShadow = true;
    scene.add(ground);

    // ── Interactions ──────────────────────────────────────────
    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let spinVelocity = 0;

    const onDown = (e) => {
      isDragging = true;
      const r = canvasRef.current.getBoundingClientRect();
      prevMouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e) => {
      const r = canvasRef.current.getBoundingClientRect();
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
      const r = canvasRef.current.getBoundingClientRect();
      prevMouse = { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
    };
    const onTouchMove = (e) => {
      if (!isDragging) return;
      const r = canvasRef.current.getBoundingClientRect();
      const t = e.touches[0];
      mouseRef.current.x = ((t.clientX - r.left) / r.width) * 2 - 1;
      mouseRef.current.y = -((t.clientY - r.top) / r.height) * 2 + 1;
      spinVelocity = (t.clientX - r.left - prevMouse.x) * 0.005;
      prevMouse = { x: t.clientX - r.left, y: t.clientY - r.top };
    };

    const el = canvasRef.current;
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mouseleave', onUp);
    el.addEventListener('mouseenter', () => { hoveredRef.current = true; });
    el.addEventListener('mouseleave', () => { hoveredRef.current = false; });
    el.addEventListener('touchstart', onTouchStart);
    el.addEventListener('touchmove', onTouchMove);
    el.addEventListener('touchend', onUp);
    el.addEventListener('touchcancel', onUp);

    // ── Animation ─────────────────────────────────────────────
    let waveDir = 1;
    const waveSpeed = 0.013;
    const maxUp = (5 * Math.PI) / 6;
    const maxDown = maxUp - Math.PI / 10;

    let restDir = 1;
    const restSpeed = 0.0045;
    const restMax = Math.PI / 22;

    let eyeAngle = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Right arm wave
      if (hoveredRef.current) {
        robot.rightArm.rotation.z += (waveSpeed + Math.sin(t * 2.1) * 0.0015) * waveDir;
        robot.rightArm.rotation.z = THREE.MathUtils.clamp(robot.rightArm.rotation.z, maxDown, maxUp);
        if (robot.rightArm.rotation.z >= maxUp || robot.rightArm.rotation.z <= maxDown) waveDir *= -1;
      } else {
        robot.rightArm.rotation.z = THREE.MathUtils.lerp(robot.rightArm.rotation.z, Math.PI / 2, 0.055);
      }

      // Left arm subtle sway
      if (hoveredRef.current) {
        robot.leftArm.rotation.z += restSpeed * restDir;
        robot.leftArm.rotation.z = THREE.MathUtils.clamp(robot.leftArm.rotation.z, -restMax, restMax);
        if (Math.abs(robot.leftArm.rotation.z) >= restMax) restDir *= -1;
      } else {
        robot.leftArm.rotation.z = THREE.MathUtils.lerp(robot.leftArm.rotation.z, 0, 0.05);
      }

      // Levitate + body micro-motions
      robot.group.position.y = Math.sin(t * 1.05) * 0.07 + 2.55;
      robot.head.rotation.z = Math.sin(t * 0.75) * 0.04;
      robot.head.rotation.x = Math.sin(t * 1.2) * 0.018;
      if (robot.antenna) {
        robot.antenna.rotation.z = Math.sin(t * 2.2) * 0.13;
        robot.antenna.rotation.x = Math.sin(t * 1.8) * 0.06;
      }

      // Spin
      if (isDragging) {
        robot.group.rotation.y += spinVelocity;
      } else if (Math.abs(spinVelocity) > 0.0005) {
        robot.group.rotation.y += spinVelocity;
        spinVelocity *= 0.93;
      } else {
        robot.group.rotation.y += 0.002;
        spinVelocity = 0;
      }

      // Eye tracking
      if (hoveredRef.current) {
        const v = new THREE.Vector3(mouseRef.current.x, mouseRef.current.y, 0.5);
        v.unproject(camera);
        const dir = v.sub(camera.position).normalize();
        const dist = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(dist));
        robot.eyes.forEach((eye) => {
          eye.position.x = eye.userData.initialPosition.x +
            THREE.MathUtils.clamp((pos.x - robot.group.position.x) * 0.1, -0.05, 0.05);
          eye.position.y = eye.userData.initialPosition.y +
            THREE.MathUtils.clamp((pos.y - (robot.group.position.y + 1.5)) * 0.1, -0.05, 0.05);
        });
      } else if (Math.abs(spinVelocity) > 0.001) {
        eyeAngle += 0.1;
        robot.eyes.forEach((eye, i) => {
          const d = i === 0 ? 1 : -1;
          eye.position.x = eye.userData.initialPosition.x + 0.02 * Math.cos(eyeAngle * d);
          eye.position.y = eye.userData.initialPosition.y + 0.02 * Math.sin(eyeAngle * d);
        });
      } else {
        robot.eyes.forEach((eye) => {
          eye.position.x = THREE.MathUtils.lerp(eye.position.x, eye.userData.initialPosition.x, 0.05);
          eye.position.y = THREE.MathUtils.lerp(eye.position.y, eye.userData.initialPosition.y, 0.05);
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        const c = canvasRef.current;
        c.removeEventListener('mousedown', onDown);
        c.removeEventListener('mousemove', onMove);
        c.removeEventListener('mouseup', onUp);
        c.removeEventListener('touchstart', onTouchStart);
        c.removeEventListener('touchmove', onTouchMove);
        c.removeEventListener('touchend', onUp);
        c.removeEventListener('touchcancel', onUp);
        if (renderer.domElement) c.removeChild(renderer.domElement);
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
  }, []);

  // ── Robot builder ────────────────────────────────────────────
  function buildRobot() {
    const group = new THREE.Group();

    // Materials
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
      color: 0x242030,
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
      transmission: 0.2,
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

    // ── Torso ──
    const torso = new THREE.Mesh(new RoundedBoxGeometry(1.14, 1.52, 0.64, 8, 0.16), bodyMat);
    torso.castShadow = true; torso.receiveShadow = true;
    group.add(torso);

    // Chest screen
    const chestScreen = new THREE.Mesh(new RoundedBoxGeometry(0.6, 0.7, 0.05, 6, 0.05), screenMat);
    chestScreen.position.set(0, 0.1, 0.345);
    torso.add(chestScreen);
    // Glow strip
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.015), glowMat);
    strip.position.set(0, -0.31, 0.348);
    torso.add(strip);
    // Two small indicator dots
    [-0.18, 0, 0.18].forEach((x, i) => {
      const dot = new THREE.Mesh(new THREE.CircleGeometry(0.025, 12), glowMat);
      dot.position.set(x, 0.1, 0.025);
      dot.material = dot.material.clone();
      dot.material.emissiveIntensity = 0.9 + i * 0.2;
      chestScreen.add(dot);
    });

    // ── Neck ──
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.18, 20), darkMat);
    neck.position.y = 0.87;
    neck.castShadow = true;
    torso.add(neck);

    // ── Head ──
    const head = new THREE.Mesh(new RoundedBoxGeometry(0.98, 0.88, 0.9, 8, 0.16), bodyMat);
    head.position.y = 1.16;
    head.castShadow = true; head.receiveShadow = true;
    torso.add(head);

    // Visor
    const visor = new THREE.Mesh(new RoundedBoxGeometry(0.74, 0.35, 0.042, 6, 0.04), screenMat);
    visor.position.set(0, 0.07, 0.475);
    head.add(visor);

    // Eye rings
    const eyeRingGeo = new THREE.RingGeometry(0.05, 0.082, 24);
    const lRing = new THREE.Mesh(eyeRingGeo, glowMat);
    lRing.position.set(-0.175, 0.07, 0.026);
    visor.add(lRing);
    const rRing = new THREE.Mesh(eyeRingGeo, glowMat);
    rRing.position.set(0.175, 0.07, 0.026);
    visor.add(rRing);

    // Pupils
    const pupilGeo = new THREE.CircleGeometry(0.038, 20);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0xffe0f5 });
    const leftEye = new THREE.Mesh(pupilGeo, pupilMat);
    leftEye.position.set(-0.175, 0.07, 0.03);
    leftEye.userData.initialPosition = leftEye.position.clone();
    visor.add(leftEye);
    const rightEye = new THREE.Mesh(pupilGeo, pupilMat);
    rightEye.position.set(0.175, 0.07, 0.03);
    rightEye.userData.initialPosition = rightEye.position.clone();
    visor.add(rightEye);

    // Smile
    const mouth = new THREE.Mesh(
      new THREE.CircleGeometry(0.09, 20, 0, Math.PI),
      new THREE.MeshBasicMaterial({ color: 0xff9ecf })
    );
    mouth.rotation.z = Math.PI;
    mouth.position.set(0, -0.12, 0.03);
    visor.add(mouth);

    // Side ear panels
    ['left', 'right'].forEach((side) => {
      const ear = new THREE.Mesh(new RoundedBoxGeometry(0.09, 0.34, 0.26, 6, 0.05), darkMat);
      ear.position.set(side === 'left' ? -0.56 : 0.56, 0.03, 0);
      ear.castShadow = true;
      head.add(ear);
    });

    // Antenna
    const antennaGroup = new THREE.Group();
    antennaGroup.position.set(0.3, 0.56, 0);
    head.add(antennaGroup);
    const antStem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.028, 0.36, 12), darkMat);
    antStem.position.y = 0.18; antStem.castShadow = true;
    antennaGroup.add(antStem);
    const antBall = new THREE.Mesh(new THREE.SphereGeometry(0.056, 16, 16), glowMat);
    antBall.position.y = 0.38;
    antennaGroup.add(antBall);

    // ── Shoulder hubs ──
    const shoulderGeo = new THREE.SphereGeometry(0.17, 22, 22);
    const lHub = new THREE.Mesh(shoulderGeo, darkMat);
    lHub.position.set(-0.68, 0.4, 0); lHub.castShadow = true;
    torso.add(lHub);
    const rHub = new THREE.Mesh(shoulderGeo, darkMat);
    rHub.position.set(0.68, 0.4, 0); rHub.castShadow = true;
    torso.add(rHub);

    // ── Left arm (Group pivot for subtle sway) ──
    const leftArm = new THREE.Group();
    leftArm.position.set(-0.68, 0.4, 0);
    torso.add(leftArm);
    const lUpper = new THREE.Mesh(new RoundedBoxGeometry(0.25, 0.5, 0.25, 6, 0.08), bodyMat);
    lUpper.geometry.translate(0, -0.25, 0); lUpper.castShadow = true;
    leftArm.add(lUpper);
    const lElbow = new THREE.Mesh(new THREE.SphereGeometry(0.115, 16, 16), darkMat);
    lElbow.position.y = -0.5; leftArm.add(lElbow);
    const lFore = new THREE.Mesh(new RoundedBoxGeometry(0.21, 0.44, 0.21, 6, 0.07), bodyMat);
    lFore.geometry.translate(0, -0.22, 0);
    lFore.position.y = -0.5; lFore.castShadow = true;
    leftArm.add(lFore);

    // ── Right arm (Group pivot — rotation.z does the wave) ──
    const rightArm = new THREE.Group();
    rightArm.position.set(0.68, 0.4, 0);
    torso.add(rightArm);
    const rUpper = new THREE.Mesh(new RoundedBoxGeometry(0.25, 0.5, 0.25, 6, 0.08), bodyMat);
    rUpper.geometry.translate(0, -0.25, 0); rUpper.castShadow = true;
    rightArm.add(rUpper);
    const rElbow = new THREE.Mesh(new THREE.SphereGeometry(0.115, 16, 16), darkMat);
    rElbow.position.y = -0.5; rightArm.add(rElbow);
    const rFore = new THREE.Mesh(new RoundedBoxGeometry(0.21, 0.44, 0.21, 6, 0.07), bodyMat);
    rFore.geometry.translate(0, -0.22, 0);
    rFore.position.y = -0.5; rFore.castShadow = true;
    rightArm.add(rFore);

    // ── Hip ──
    const hip = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.54, 0.16, 24), darkMat);
    hip.position.y = -0.87; hip.castShadow = true;
    torso.add(hip);

    // ── Legs (thigh / knee / shin / foot) ──
    [-0.25, 0.25].forEach((x) => {
      const thigh = new THREE.Mesh(new RoundedBoxGeometry(0.3, 0.5, 0.3, 6, 0.08), bodyMat);
      thigh.position.set(x, -1.24, 0); thigh.castShadow = true; thigh.receiveShadow = true;
      group.add(thigh);
      const knee = new THREE.Mesh(new THREE.SphereGeometry(0.135, 16, 16), darkMat);
      knee.position.set(x, -1.52, 0); group.add(knee);
      const shin = new THREE.Mesh(new RoundedBoxGeometry(0.25, 0.46, 0.25, 6, 0.07), bodyMat);
      shin.position.set(x, -1.78, 0); shin.castShadow = true; shin.receiveShadow = true;
      group.add(shin);
      const foot = new THREE.Mesh(new RoundedBoxGeometry(0.32, 0.14, 0.44, 6, 0.05), darkMat);
      foot.position.set(x, -2.06, 0.07); foot.castShadow = true; foot.receiveShadow = true;
      group.add(foot);
    });

    return { group, leftArm, rightArm, head, eyes: [leftEye, rightEye], antenna: antennaGroup };
  }

  return (
    <section id="about" className="section">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-6xl mx-auto">

        {/* Text + Photo */}
        <div className="md:w-1/2 flex flex-col" data-animate>
          <div className="flex items-center gap-5 mb-7">
            <img
              src="/profilepic.jpeg"
              alt="Anastasia Cattaneo"
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
            style={{ height: 'clamp(360px, 50vw, 540px)' }}
            aria-label="Animated 3D robot — hover to wave, drag to rotate"
          />
        </div>
      </div>
    </section>
  );
}
