/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: false,
  },
  // Configure webpack to handle custom aliases if needed
  webpack: (config, { isServer }) => {
    const path = require('path');
    // Add '@' alias to resolve to the src directory
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Configure images
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com',
      'randomuser.me', // For user avatars
      'picsum.photos', // For placeholder images
    ],
    // Enable blur-up placeholder loading
    formats: ['image/avif', 'image/webp'],
    // Set device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Set image sizes for different viewport sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable experimental features if needed
  experimental: {
    // serverActions: true, // Uncomment if using Server Actions
  },
};

module.exports = nextConfig;
