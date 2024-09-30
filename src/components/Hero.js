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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Create petal geometry and material
    const petalGeometry = new THREE.PlaneGeometry(1, 2);
    const petalMaterial = new THREE.MeshPhongMaterial({
      color: 0xff69b4, // Light pink
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });

    const OPEN_ROTATION = 0;
    const CLOSED_ROTATION = Math.PI / 2;
    const ROTATION_SPEED = 0.05;

    const petals = [];
    for (let i = 0; i < 5; i++) {
      const petal = new THREE.Mesh(petalGeometry, petalMaterial.clone());
      petal.position.set((i - 2) * 1.5, 0, 0); // Positioning the petals
      petal.rotation.x = OPEN_ROTATION;
      petal.userData.targetRotation = OPEN_ROTATION;
      scene.add(petal);
      petals.push(petal);
    }

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

      console.log('Animating...'); // Optional: For debugging

      // Update raycaster with the current mouse position and camera
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(petals);

      petals.forEach((petal) => {
        if (intersects.find((intersect) => intersect.object === petal)) {
          petal.userData.targetRotation = CLOSED_ROTATION;
        } else {
          petal.userData.targetRotation = OPEN_ROTATION;
        }

        // Smoothly interpolate the petal's rotation towards the target rotation
        petal.rotation.x +=
          (petal.userData.targetRotation - petal.rotation.x) * ROTATION_SPEED;
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
