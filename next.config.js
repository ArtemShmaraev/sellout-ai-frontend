/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['cdn.poizon.com', 'drive.google.com'],
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
