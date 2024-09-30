import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
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

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

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
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1,
    };

    const petalGeometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);

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
    bendGeometry(petalGeometry, 0.5); // Adjust bendAmount as needed

    // Load a texture for the petals (optional)
    const textureLoader = new THREE.TextureLoader();
    // const petalTexture = textureLoader.load('path/to/your/petalTexture.png'); // Replace with your texture path

    const petalMaterial = new THREE.MeshPhongMaterial({
      color: 0xff69b4,
      side: THREE.DoubleSide,
      shininess: 100,
      // map: petalTexture, // Uncomment if using a texture
    });

    const OPEN_ROTATION = 0;
    const CLOSED_ROTATION = Math.PI / 4; // Adjusted for smoother closing
    const ROTATION_SPEED = 0.05;

    const petals = [];
    const numPetals = 6; // Adjust for more or fewer petals
    const petalAngle = (Math.PI * 2) / numPetals;

    for (let i = 0; i < numPetals; i++) {
      const petal = new THREE.Mesh(petalGeometry, petalMaterial.clone());

      // Position the petal around the circle
      const angle = i * petalAngle;
      const radius = 1;

      petal.position.x = radius * Math.sin(angle);
      petal.position.z = radius * Math.cos(angle);

      // Rotate the petal to face outward
      petal.rotation.y = angle;

      // Set initial rotation for opening/closing
      petal.userData.baseRotationX = OPEN_ROTATION;
      petal.userData.targetRotationX = OPEN_ROTATION;

      scene.add(petal);
      petals.push(petal);
    }

    // Add a center sphere
    const centerGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const centerMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 }); // Yellow color
    const center = new THREE.Mesh(centerGeometry, centerMaterial);
    scene.add(center);

    // Raycaster and mouse for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove(event) {
      const rect = canvas.getBoundingClientRect();

      // Calculate mouse position relative to the canvas
      mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
    }

    window.addEventListener('mousemove', onMouseMove, false);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(petals);

      const isHovering = intersects.length > 0;

      petals.forEach((petal) => {
        if (isHovering) {
          petal.userData.targetRotationX = CLOSED_ROTATION;
        } else {
          petal.userData.targetRotationX = OPEN_ROTATION;
        }

        // Smoothly interpolate the petal's rotation towards the target rotation
        petal.rotation.x +=
          (petal.userData.targetRotationX - petal.rotation.x) * ROTATION_SPEED;
      });

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
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center text-center text-white"
    >
      <canvas
        ref={canvasRef}
        id="bg"
        className="absolute top-0 left-0 w-full h-full"
      ></canvas>

      <div className="relative z-10 hero-content">
        <h1 className="text-5xl font-bold">Hello!</h1>
        <p className="text-xl mt-4">
          I'm Anastasia, a Design Engineering student with a passion for wearables, AI, and fashion.
        </p>
        <div className="mt-8">
          <a
            href="#projects"
            className="px-6 py-3 bg-white text-indigo-600 rounded-md hover:bg-gray-200"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
}
