/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  appDir: true,
},
  images: {
    domains: ["example.com", "localhost"],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
