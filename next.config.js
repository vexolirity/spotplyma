/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.scdn.co', 'i.ytimg.com', 'p16-common-sign.tiktokcdn.com'],
  },
  experimental: {
    serverActions: true,
  },
}
module.exports = nextConfig