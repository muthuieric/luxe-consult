/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // allow ik.imagekit.io & utfs.io (upload cdns)
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io", pathname: "/tmf1uuhtr/**" },
      { protocol: "https", hostname: "utfs.io", pathname: "**" },
    ],
    qualities: [75, 100], // removes quality-related warnings
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;


        