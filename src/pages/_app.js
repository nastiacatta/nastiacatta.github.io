import '../styles/globals.css';
import Head from 'next/head';
import Flashlight from '../components/Flashlight';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Anastasia Cattaneo — Design Engineering Portfolio</title>
        <meta
          name="description"
          content="Anastasia Cattaneo's Design Engineering Portfolio — projects in robotics, ML, wearables, and software."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Anastasia Cattaneo — Portfolio" />
        <meta property="og:description" content="Design Engineering projects in robotics, AI, wearables, and software." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://nastiacatta.github.io" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Google Fonts */}
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
