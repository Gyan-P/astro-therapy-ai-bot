/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      appDir: true,
      ppr: true,
    },
    images: {
      remotePatterns: [
        {
          hostname: 'avatar.vercel.sh',
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  