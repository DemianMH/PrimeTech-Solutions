/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // <-- AÑADE ESTE BLOQUE
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com', // <-- AÑADE ESTE BLOQUE
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;