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
};
module.exports = nextConfig;
