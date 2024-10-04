// src/pages/_app.js

import '../styles/globals.css';
import Head from 'next/head';
import Flashlight from '../components/Flashlight'; // Import Flashlight component

function MyApp({ Component, pageProps }) {
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
      <Flashlight /> {/* Always-on flashlight */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
