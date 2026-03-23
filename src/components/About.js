// src/components/About.jsx

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

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      40,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3.65, 7.35);
    camera.lookAt(0, 2.35, 0);

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true; // Enable shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    canvasRef.current.appendChild(renderer.domElement);

    // Studio-style reflections for more realistic metal / clearcoat
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    envRT = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    pmremGenerator.dispose();

    // Lighting — balanced key + fill + rim (environment does heavy lifting)
    const hemi = new THREE.HemisphereLight(0xfff0f8, 0x1a1220, 0.42);
    scene.add(hemi);

    const ambientLight = new THREE.AmbientLight(0xffeef8, 0.28);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.15);
    directionalLight.position.set(6, 14, 8);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.bias = -0.00028;
    directionalLight.shadow.normalBias = 0.02;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);
    const fillLight = new THREE.DirectionalLight(0xffc8e8, 0.42);
    fillLight.position.set(-8, 5, 6);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xf060b4, 0.55);
    rimLight.position.set(0, 6, -12);
    scene.add(rimLight);

    // Create Robot
    const robot = createRobot();
    robot.group.scale.set(2.05, 2.05, 2.05);
    scene.add(robot.group);

    // Ground Plane to Receive Shadows (Transparent)
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080, // Neutral gray to cast visible shadows without being colorful
      transparent: true,
      opacity: 0.0, // Set to 0 if you don't want to see the ground; shadows will still be cast
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.0; // Elevated to align with robot's new position
    ground.receiveShadow = true;
    scene.add(ground);

    // Handle Resize for Responsiveness
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Mouse and Touch Variables
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let spinVelocity = 0;

    // Mouse Events
    const onMouseDown = (event) => {
      isDragging = true;
      const rect = canvasRef.current.getBoundingClientRect();
      previousMousePosition = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const onMouseMove = (event) => {
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaMove = {
          x: event.clientX - rect.left - previousMousePosition.x,
          y: event.clientY - rect.top - previousMousePosition.y,
        };

        // Update spin velocity based on mouse movement
        spinVelocity = deltaMove.x * 0.005; // Adjusted multiplier for momentum

        previousMousePosition = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch Events for Mobile
    const onTouchStart = (event) => {
      isDragging = true;
      const rect = canvasRef.current.getBoundingClientRect();
      const touch = event.touches[0];
      previousMousePosition = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    };

    const onTouchMove = (event) => {
      if (!isDragging) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const touch = event.touches[0];
      mouseRef.current.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

      const deltaMove = {
        x: touch.clientX - rect.left - previousMousePosition.x,
        y: touch.clientY - rect.top - previousMousePosition.y,
      };

      // Update spin velocity based on touch movement
      spinVelocity = deltaMove.x * 0.005; // Adjusted multiplier for momentum

      previousMousePosition = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    // Event Listeners
    canvasRef.current.addEventListener('mousedown', onMouseDown);
    canvasRef.current.addEventListener('mousemove', onMouseMove);
    canvasRef.current.addEventListener('mouseup', onMouseUp);
    canvasRef.current.addEventListener('mouseleave', onMouseUp);

    // Touch Event Listeners
    canvasRef.current.addEventListener('touchstart', onTouchStart);
    canvasRef.current.addEventListener('touchmove', onTouchMove);
    canvasRef.current.addEventListener('touchend', onTouchEnd);
    canvasRef.current.addEventListener('touchcancel', onTouchEnd);

    const onMouseEnter = () => {
      hoveredRef.current = true;
    };

    const onMouseLeaveCanvas = () => {
      hoveredRef.current = false;
    };

    canvasRef.current.addEventListener('mouseenter', onMouseEnter);
    canvasRef.current.addEventListener('mouseleave', onMouseLeaveCanvas);

    // Animation Loop Adjustments

    // Waving Arm
    let waveDirection = 1;
    const waveSpeed = 0.012; // Slightly smoother, more lifelike wave
    const maxWaveAngleUp = (5 * Math.PI) / 6; // 150 degrees
    const maxWaveAngleDown = (5 * Math.PI) / 6 - (Math.PI / 12); // 135 degrees

    // Resting Arm
    let restingWaveDirection = 1;
    const restingWaveSpeed = 0.0045; // Slow speed for subtle movement
    const restingMaxWaveAngle = Math.PI / 24; // 7.5 degrees

    let eyeRotationAngle = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Waving Arm Animation
      if (hoveredRef.current) {
        robot.rightArm.rotation.z += (waveSpeed + Math.sin(elapsed * 2.2) * 0.0016) * waveDirection;
        robot.rightArm.rotation.z = THREE.MathUtils.clamp(
          robot.rightArm.rotation.z,
          maxWaveAngleDown,
          maxWaveAngleUp
        );

        // Reverse direction if limits are reached
        if (
          robot.rightArm.rotation.z >= maxWaveAngleUp ||
          robot.rightArm.rotation.z <= maxWaveAngleDown
        ) {
          waveDirection *= -1;
        }
      } else {
        // Smoothly return the arm to the default resting position (90 degrees)
        robot.rightArm.rotation.z = THREE.MathUtils.lerp(
          robot.rightArm.rotation.z,
          Math.PI / 2,
          0.05
        );
      }

      // Resting Arm Slight Movement
      if (hoveredRef.current) {
        robot.leftArm.rotation.z += restingWaveSpeed * restingWaveDirection;
        robot.leftArm.rotation.z = THREE.MathUtils.clamp(
          robot.leftArm.rotation.z,
          -restingMaxWaveAngle,
          restingMaxWaveAngle
        );

        if (
          robot.leftArm.rotation.z >= restingMaxWaveAngle ||
          robot.leftArm.rotation.z <= -restingMaxWaveAngle
        ) {
          restingWaveDirection *= -1;
        }
      } else {
        // Return resting arm to neutral position
        robot.leftArm.rotation.z = THREE.MathUtils.lerp(
          robot.leftArm.rotation.z,
          0,
          0.05
        );
      }

      // Slight up/down + subtle body tilt for realism
      robot.group.position.y = Math.sin(elapsed * 1.05) * 0.07 + 2.52;
      robot.head.rotation.z = Math.sin(elapsed * 0.8) * 0.045;
      robot.head.rotation.x = Math.sin(elapsed * 1.3) * 0.02;
      if (robot.antenna) {
        robot.antenna.rotation.z = Math.sin(elapsed * 2.4) * 0.12;
        robot.antenna.rotation.x = Math.sin(elapsed * 1.9) * 0.06;
      }

      // Rotation with momentum
      if (isDragging) {
        robot.group.rotation.y += spinVelocity;
      } else if (Math.abs(spinVelocity) > 0.0005) {
        robot.group.rotation.y += spinVelocity;
        spinVelocity *= 0.94;
      } else {
        // Gentle idle slow rotation when at rest
        robot.group.rotation.y += 0.0021;
        spinVelocity = 0;
      }

      // Eye Movement
      if (hoveredRef.current) {
        // Eyes follow mouse
        // Convert mouse position to 3D coordinates
        const vector = new THREE.Vector3(mouseRef.current.x, mouseRef.current.y, 0.5);
        vector.unproject(camera);

        // Calculate direction from head to mouse position
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));

        // Limit eye movement
        robot.eyes.forEach((eye) => {
          const eyeDirX = THREE.MathUtils.clamp(
            (pos.x - robot.group.position.x) * 0.1,
            -0.05,
            0.05
          );
          const eyeDirY = THREE.MathUtils.clamp(
            (pos.y - (robot.group.position.y + 1.5)) * 0.1,
            -0.05,
            0.05
          );
          eye.position.x = eye.userData.initialPosition.x + eyeDirX;
          eye.position.y = eye.userData.initialPosition.y + eyeDirY;
        });
      } else {
        if (Math.abs(spinVelocity) > 0.001) {
          // Eyes wiggle when spinning
          eyeRotationAngle += 0.1;
          robot.eyes.forEach((eye, index) => {
            const direction = index === 0 ? 1 : -1; // Opposite directions for each eye
            eye.position.x =
              robot.eyes[index].userData.initialPosition.x +
              0.02 * Math.cos(eyeRotationAngle * direction);
            eye.position.y =
              robot.eyes[index].userData.initialPosition.y +
              0.02 * Math.sin(eyeRotationAngle * direction);
          });
        } else {
          // Eyes return to default position when not spinning
          robot.eyes.forEach((eye) => {
            eye.position.x = THREE.MathUtils.lerp(
              eye.position.x,
              eye.userData.initialPosition.x,
              0.05
            );
            eye.position.y = THREE.MathUtils.lerp(
              eye.position.y,
              eye.userData.initialPosition.y,
              0.05
            );
          });
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousedown', onMouseDown);
        canvasRef.current.removeEventListener('mousemove', onMouseMove);
        canvasRef.current.removeEventListener('mouseup', onMouseUp);
        canvasRef.current.removeEventListener('mouseleave', onMouseUp);

        // Remove Touch Event Listeners
        canvasRef.current.removeEventListener('touchstart', onTouchStart);
        canvasRef.current.removeEventListener('touchmove', onTouchMove);
        canvasRef.current.removeEventListener('touchend', onTouchEnd);
        canvasRef.current.removeEventListener('touchcancel', onTouchEnd);

        canvasRef.current.removeEventListener('mouseenter', onMouseEnter);
        canvasRef.current.removeEventListener('mouseleave', onMouseLeaveCanvas);
      }
      if (renderer && renderer.domElement && canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
      scene.environment = null;
      if (envRT) envRT.dispose();
      robot.group.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry && typeof child.geometry.dispose === 'function') {
            child.geometry.dispose();
          }
          if (child.material && typeof child.material.dispose === 'function') {
            child.material.dispose();
          }
        }
      });
    };
  }, []);

  // Function to Create Robot
  const createRobot = () => {
    const group = new THREE.Group();
    group.position.y = 0; // Centered vertically

    // Chassis — brushed metal with pink tint (reads more “real” under IBL)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xc9a8bc,
      metalness: 0.78,
      roughness: 0.26,
      emissive: 0x4a2038,
      emissiveIntensity: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      envMapIntensity: 1.25,
      ior: 1.55,
      sheen: 0.55,
      sheenColor: new THREE.Color(0xf060b4),
      sheenRoughness: 0.35,
      side: THREE.DoubleSide,
    });

    // Joint / accent rings — darker gunmetal
    const jointMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3a3540,
      metalness: 0.88,
      roughness: 0.32,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      envMapIntensity: 1.1,
    });

    // Screen panel — glassy display
    const screenMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x08050c,
      metalness: 0.92,
      roughness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.6,
      transparent: true,
      opacity: 0.94,
      side: THREE.DoubleSide,
    });

    // Body (rounded box)
    const bodyGeometry = new RoundedBoxGeometry(1, 1.5, 0.5, 5, 0.2);
    const body = new THREE.Mesh(bodyGeometry, material);
    body.position.y = 0;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Head (rounded box)
    const headGeometry = new RoundedBoxGeometry(1.0, 1.0, 1.0, 5, 0.2); // Smaller head
    const head = new THREE.Mesh(headGeometry, material);
    head.position.y = 1.2; // Positioned higher on the body
    head.castShadow = true;
    head.receiveShadow = true;
    body.add(head);

    // Face plate (black, attached directly to the head, larger and well-centered)
    const facePlateGeometry = new RoundedBoxGeometry(0.7, 0.6, 0.02, 5, 0.02); // Increased size
    const facePlate = new THREE.Mesh(facePlateGeometry, screenMaterial);
    facePlate.position.set(0, 0, 0.55); // Tight attachment
    facePlate.castShadow = true;
    facePlate.receiveShadow = true;
    head.add(facePlate);

    // Neck — separates head from torso
    const neckGeom = new THREE.CylinderGeometry(0.28, 0.32, 0.22, 24);
    const neck = new THREE.Mesh(neckGeom, jointMaterial);
    neck.position.y = 0.78;
    neck.castShadow = true;
    neck.receiveShadow = true;
    body.add(neck);

    // Shoulder hubs
    const hubGeom = new THREE.SphereGeometry(0.11, 20, 20);
    const leftHub = new THREE.Mesh(hubGeom, jointMaterial);
    leftHub.position.set(-0.52, 0.32, 0.06);
    leftHub.castShadow = true;
    body.add(leftHub);
    const rightHub = new THREE.Mesh(hubGeom, jointMaterial);
    rightHub.position.set(0.52, 0.32, 0.06);
    rightHub.castShadow = true;
    body.add(rightHub);

    // Antenna (subtle idle sway in animate loop)
    const antennaStem = new THREE.CylinderGeometry(0.025, 0.035, 0.45, 12);
    const antennaBall = new THREE.SphereGeometry(0.07, 16, 16);
    const antennaGroup = new THREE.Group();
    const stem = new THREE.Mesh(antennaStem, jointMaterial);
    stem.position.y = 0.225;
    stem.castShadow = true;
    const ball = new THREE.Mesh(antennaBall, material);
    ball.position.y = 0.48;
    ball.castShadow = true;
    antennaGroup.add(stem, ball);
    antennaGroup.position.set(0.38, 0.62, -0.42);
    head.add(antennaGroup);

    // Eyes
    const eyeGeometry = new THREE.CircleGeometry(0.04, 20);
    const eyeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffb8e8,
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 0.1, 0.03); // Adjusted positions
    leftEye.userData.initialPosition = leftEye.position.clone();
    facePlate.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 0.1, 0.03);
    rightEye.userData.initialPosition = rightEye.position.clone();
    facePlate.add(rightEye);

    // Mouth
    const mouthGeometry = new THREE.CircleGeometry(0.08, 20, 0, Math.PI);
    const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0xff9ecf });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.rotation.z = Math.PI; // Inverted to look like a smile
    mouth.position.set(0, -0.15, 0.03); // Adjusted position
    facePlate.add(mouth);

    // Left Arm (Resting Arm)
    const leftArmGeometry = new RoundedBoxGeometry(0.07, 0.6, 0.07, 5, 0.035); // Slightly reduced width
    const leftArm = new THREE.Mesh(leftArmGeometry, material);

    // Translate geometry to set pivot at the shoulder
    leftArm.geometry.translate(0, -0.3, 0); // Pivot at shoulder

    // Set position accordingly
    leftArm.position.set(-0.45, 0.3, 0.05); // Increased Z to move arm forward
    leftArm.castShadow = true;
    leftArm.receiveShadow = true;
    body.add(leftArm);

    // Right Arm (Waving Arm)
    const rightArmGeometry = new RoundedBoxGeometry(0.07, 0.6, 0.07, 5, 0.035); // Slightly reduced width
    const rightArm = new THREE.Mesh(rightArmGeometry, material);
    rightArm.position.set(0.475, 0.3, 0.03); // Slightly closer on X and adjusted Z
    rightArm.castShadow = true;
    rightArm.receiveShadow = true;
    body.add(rightArm);

    // Set the pivot point at the shoulder for rotation
    rightArm.geometry.translate(0, -0.3, 0); // Pivot at shoulder
    rightArm.position.y += 0.3; // Adjust position after translation

    // Legs
    const legGeometry = new RoundedBoxGeometry(0.08, 0.5, 0.08, 5, 0.04); // Smaller legs
    const leftLeg = new THREE.Mesh(legGeometry, material);
    leftLeg.position.set(-0.15, -0.75, 0);
    leftLeg.castShadow = true;
    leftLeg.receiveShadow = true;
    body.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, material);
    rightLeg.position.set(0.15, -0.75, 0);
    rightLeg.castShadow = true;
    rightLeg.receiveShadow = true;
    body.add(rightLeg);

    return {
      group,
      leftArm,
      rightArm,
      head,
      eyes: [leftEye, rightEye],
      antenna: antennaGroup,
    };
  };

  return (
    <section id="about" className="section">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-6xl mx-auto">

        {/* Text + Photo */}
        <div className="md:w-1/2 flex flex-col" data-animate>
          {/* Profile picture */}
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
              <span
                key={tag}
                className="px-3 py-1.5 text-xs rounded-full border border-pink-400/25 text-pink-200 dark:text-pink-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Robot animation — larger canvas for readability on mobile + desktop */}
        <div className="md:w-1/2 w-full flex justify-center items-center" data-animate data-delay="2">
          <div
            ref={canvasRef}
            className="w-full max-w-[min(100%,680px)] rounded-2xl border border-pink-400/20 dark:border-pink-400/25 shadow-[0_12px_48px_rgba(0,0,0,0.35)] dark:shadow-[0_12px_40px_rgba(192,25,110,0.12)] overflow-hidden bg-gradient-to-b from-zinc-900/40 to-transparent dark:from-pink-100/30"
            style={{ height: 'clamp(400px, 62vw, 640px)' }}
            aria-label="Animated 3D robot waving its arm — drag to rotate"
          />
        </div>
      </div>
    </section>
  );
}
