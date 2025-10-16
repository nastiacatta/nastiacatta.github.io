/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // static HTML export
  images: { unoptimized: true },
  trailingSlash: true      // safer on GitHub Pages
};
module.exports = nextConfig;
