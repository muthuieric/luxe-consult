// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ⚠️ Warning: this allows production builds to complete even if ESLint has errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⚠️ Warning: this allows production builds to complete even if type errors exist.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
