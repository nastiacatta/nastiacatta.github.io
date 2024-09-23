// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true, // Since you're exporting static HTML
    },
  };
  
  module.exports = nextConfig;
  