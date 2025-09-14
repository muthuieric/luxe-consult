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
  images: {
    qualities: [75, 100], // ✅ allow quality=100 and the default 75
  },
};

module.exports = nextConfig;
