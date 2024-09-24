// src/pages/_app.js

import '../styles/globals.css'; // Corrected path

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
