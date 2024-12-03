// src/components/About.jsx

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export default function About() {
  const canvasRef = useRef(null);
  const hoveredRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      50,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 4, 12); // Elevated and closer to the robot
    camera.lookAt(0, 2.5, 0); // Look at the robot's center

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true; // Enable shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
    canvasRef.current.appendChild(renderer.domElement);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Increased intensity
    directionalLight.position.set(10, 20, 15); // Higher position for better shadow casting
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048; // Higher resolution shadows
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    // Create Robot
    const robot = createRobot();
    robot.group.scale.set(1.2, 1.2, 1.2); // Scale down to 120%
    scene.add(robot.group);

    // Ground Plane to Receive Shadows (Transparent)
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.0,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.0; // Elevated to align with robot's new position
    ground.receiveShadow = true;
    scene.add(ground);

    // Handle Resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      renderer.setSize(
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight
      );
      camera.aspect =
        canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Mouse Variables
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

    // Event Listeners
    canvasRef.current.addEventListener('mousedown', onMouseDown);
    canvasRef.current.addEventListener('mousemove', onMouseMove);
    canvasRef.current.addEventListener('mouseup', onMouseUp);
    canvasRef.current.addEventListener('mouseleave', onMouseUp);

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
    const waveSpeed = 0.01; // Reduced speed for slower waving
    const maxWaveAngleUp = Math.PI; // 180 degrees
    const maxWaveAngleDown = Math.PI - (Math.PI / 12); // 165 degrees to allow oscillation

    // Resting Arm
    let restingWaveDirection = 1;
    const restingWaveSpeed = 0.005; // Slow speed for subtle movement
    const restingMaxWaveAngle = Math.PI / 24; // 7.5 degrees

    let eyeRotationAngle = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      // Waving Arm Animation
      if (hoveredRef.current) {
        robot.rightArm.rotation.z += waveSpeed * waveDirection;
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

      // Slight up and down motion (levitating)
      robot.group.position.y = Math.sin(Date.now() * 0.001) * 0.05 + 2.5; // Base y-position

      // Rotation with momentum
      if (!isDragging && Math.abs(spinVelocity) > 0.001) {
        // Apply spin velocity to rotation
        robot.group.rotation.y += spinVelocity;
        // Apply damping to spin velocity
        spinVelocity *= 0.95; // Adjust damping factor as needed
      } else if (isDragging) {
        // Apply spin velocity while dragging
        robot.group.rotation.y += spinVelocity;
      } else {
        // Idle rotation
        robot.group.rotation.y += 0.002;
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
        // Eyes wiggle in opposite directions when spinning
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
        canvasRef.current.removeEventListener('mouseenter', onMouseEnter);
        canvasRef.current.removeEventListener('mouseleave', onMouseLeaveCanvas);
      }
      if (renderer && renderer.domElement && canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
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

    // Material for the robot (bright light pink with emissive properties)
    const material = new THREE.MeshStandardMaterial({
      color: 0xFFC0CB, // Light baby pink
      metalness: 0.8,  // High metalness for a metallic look
      roughness: 0.2,
      emissive: 0xFFC0CB, // Emissive color matching the main color
      emissiveIntensity: 0.5, // Adjust for desired brightness
    });

    // Material for the screen (black, thinner)
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000, // Black
      metalness: 0.7,
      roughness: 0.2,
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

    // Eyes
    const eyeGeometry = new THREE.CircleGeometry(0.04, 16); // Smaller eyes
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFC0CB }); // Pink eyes

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 0.1, 0.03); // Adjusted positions
    leftEye.userData.initialPosition = leftEye.position.clone();
    facePlate.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 0.1, 0.03);
    rightEye.userData.initialPosition = rightEye.position.clone();
    facePlate.add(rightEye);

    // Mouth
    const mouthGeometry = new THREE.CircleGeometry(0.08, 16, 0, Math.PI);
    const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0xFFC0CB }); // Pink mouth
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.rotation.z = Math.PI; // Inverted to look like a smile
    mouth.position.set(0, -0.15, 0.03); // Adjusted position
    facePlate.add(mouth);

    // Left Arm (Resting Arm)
    const leftArmGeometry = new RoundedBoxGeometry(0.08, 0.6, 0.08, 5, 0.04); // Smaller arm
    const leftArm = new THREE.Mesh(leftArmGeometry, material);
    leftArm.position.set(-0.6, 0.3, 0); // Adjusted position for better connection
    leftArm.castShadow = true;
    leftArm.receiveShadow = true;
    body.add(leftArm);

    // Right Arm (Waving Arm)
    const rightArmGeometry = new RoundedBoxGeometry(0.08, 0.6, 0.08, 5, 0.04); // Smaller arm
    const rightArm = new THREE.Mesh(rightArmGeometry, material);
    rightArm.position.set(0.6, 0.3, 0); // Adjusted position for better connection
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
    };
  };

  return (
    <section id="about" className="section flex items-center justify-center py-20">
      <div className="flex flex-col md:flex-row items-center justify-center w-full">
        {/* Text Section */}
        <div className="md:w-1/2 pr-4">
          <h2 className="text-4xl font-normal mb-6 hover:text-lilac transition-colors">
            About Me
          </h2>
          <p className="text-lg">
            I am a third-year MEng Design Engineering student at Imperial College
            London. My passion lies in the fusion of electronics, AI, and fashion.
            I am driven by a commitment to integrating elegant design with robust
            engineering to develop solutions that are both functional and
            aesthetically pleasing. Beyond my core focus, I have a deep interest
            in the arts, literature, and architecture, which continually inspire
            my work.
          </p>
        </div>

        {/* Animation Section */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center items-center">
          <div
            ref={canvasRef}
            className="w-full"
            style={{ height: '40rem', maxWidth: '700px' }} // Set height to 40rem and increased maxWidth
            aria-label="Animated robot waving its arm" // Accessibility enhancement
          ></div>
        </div>
      </div>
    </section>
  );
}
