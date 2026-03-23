const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Avoid Turbopack picking a parent folder when another package-lock exists above this repo
  turbopack: {
    root: path.join(__dirname),
  },
  // Old bookmarks to the removed Next page → live Shiny app
  async redirects() {
    const shiny =
      'https://anastasiacattaneo.shinyapps.io/data2product-dashboard/';
    return [
      { source: '/data2product-dashboard', destination: shiny, permanent: false },
      { source: '/data2product-dashboard/', destination: shiny, permanent: false },
    ];
  },
};
module.exports = nextConfig;
