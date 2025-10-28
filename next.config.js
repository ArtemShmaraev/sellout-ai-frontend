/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['cdn.poizon.com', 'drive.google.com', 'storage.yandexcloud.net', 'img.stadiumgoods.com', "console.cloud.yandex.ru", "bucket.sellout.su", "sellout.su"],
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
