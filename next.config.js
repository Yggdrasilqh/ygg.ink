/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["sway.office.com"],
  },
};

module.exports = nextConfig;
