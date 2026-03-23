import '../styles/globals.css';
import Head from 'next/head';
import Flashlight from '../components/Flashlight';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // Scroll-entrance observer — adds .is-visible when element enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    const animate = () => {
      document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    };
    // Run once on mount and re-run after navigation
    animate();
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Anastasia Cattaneo — Portfolio</title>
        <link rel="icon" type="image/png" href="/logo.png" />
        <meta
          name="description"
          content="Anastasia Cattaneo — Design Engineering Portfolio. Projects in robotics, ML, wearables, and software."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Anastasia Cattaneo — Portfolio" />
        <meta property="og:description" content="Design Engineering projects in robotics, AI, wearables, and software." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://nastiacatta.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Flashlight />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
