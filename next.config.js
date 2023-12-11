/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.bsky.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cardyb.bsky.app",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
