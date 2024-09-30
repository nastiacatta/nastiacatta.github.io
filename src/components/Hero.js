import React, { useEffect } from 'react';
import * as THREE from 'three';

export default function Hero() {
  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Create petal geometry and material
    const petalGeometry = new THREE.PlaneGeometry(1, 2);
    const petalMaterial = new THREE.MeshPhongMaterial({
      color: 0xFF69B4, // Light pink
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });

    // Define the open and closed rotation angles (in radians)
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
      // Normalize mouse coordinates between -1 and 1
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener('mousemove', onMouseMove, false);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Update raycaster with the current mouse position and camera
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(petals);

      petals.forEach((petal) => {
        if (intersects.find(intersect => intersect.object === petal)) {
          petal.userData.targetRotation = CLOSED_ROTATION;
        } else {
          petal.userData.targetRotation = OPEN_ROTATION;
        }

        // Smoothly interpolate the petal's rotation towards the target rotation
        petal.rotation.x += (petal.userData.targetRotation - petal.rotation.x) * ROTATION_SPEED;
      });

      renderer.render(scene, camera);
    }

    animate();

    // Handle window resizing
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize, false);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <section id="hero" className="h-screen bg-indigo-600 flex items-center justify-center text-center text-white">
      <canvas id="bg" className="absolute top-0 left-0 w-full h-full"></canvas>
      <div>
        <h1 className="text-5xl font-bold">Hi, I'm Anastasia</h1>
        <p className="text-xl mt-4">Aspiring Designer Engineer</p>
        <div className="mt-8">
          <a href="#projects" className="px-6 py-3 bg-white text-indigo-600 rounded-md hover:bg-gray-200">
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
}

