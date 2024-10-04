// src/pages/_app.js

import '../styles/globals.css';
import Head from 'next/head';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const flashlightArea = document.querySelector('.flashlight-area');
    const flashlight = document.querySelector('.flashlight');

    if (!flashlightArea || !flashlight) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top } = flashlightArea.getBoundingClientRect();

      // Calculate position relative to the flashlight area
      const posX = clientX - left;
      const posY = clientY - top;

      // Update CSS variables for positioning
      flashlight.style.left = `${posX}px`;
      flashlight.style.top = `${posY}px`;
    };

    flashlightArea.addEventListener('mousemove', handleMouseMove);

    return () => {
      flashlightArea.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta
          name="description"
          content="Anastasia's Design Engineering Portfolio showcasing projects in wearables, AI, and fashion."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Anastasia's Portfolio" />
        <meta
          property="og:description"
          content="Design Engineering projects in wearables, AI, and fashion."
        />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://your-portfolio-url.com" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Add more meta tags as needed */}
      </Head>

      {/* Flashlight Overlay */}
      <div className="flashlight-area">
        <div className="flashlight"></div>
      </div>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
