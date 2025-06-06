/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['images.unsplash.com', 'images.pexels.com'],
      formats: ['image/avif', 'image/webp']
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5001/:path*',
        },
      ]
    }
  };
  
  module.exports = nextConfig;