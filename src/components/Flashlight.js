// src/components/Flashlight.js

import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';

const Flashlight = () => {
  const flashlightRef = useRef(null);
  const animationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Enable flashlight after component mounts to avoid initial residual light
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Disable flashlight on touch devices
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const flashlight = flashlightRef.current;
    if (!flashlight) return;

    const handleMouseMove = throttle((event) => {
      const { clientX, clientY } = event;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      animationRef.current = requestAnimationFrame(() => {
        flashlight.style.left = `${clientX}px`;
        flashlight.style.top = `${clientY}px`;
      });
    }, 10); // Throttle by 10ms for performance

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`flashlight ${isVisible ? '' : 'hidden'}`}
      ref={flashlightRef}
      aria-hidden="true"
    ></div>
  );
};

export default Flashlight;
