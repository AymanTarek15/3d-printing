/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Product/category images are arbitrary remote URLs entered in the Django
    // admin, so any host must be allowed. Wildcard hostname keeps new hosts
    // from breaking next/image optimization.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
