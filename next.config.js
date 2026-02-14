/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Server Actions are enabled by default in Next.js 14
  output: 'standalone', // Optimized for cloud deployment
}

module.exports = nextConfig
