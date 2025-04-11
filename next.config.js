/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.poizon.com'],
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
