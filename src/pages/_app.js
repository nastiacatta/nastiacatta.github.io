// src/pages/_app.js

import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Anastasia's Portfolio</title>
        <meta name="description" content="Anastasia's Design Engineering Portfolio showcasing projects in wearables, AI, and fashion." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add more meta tags as needed */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
