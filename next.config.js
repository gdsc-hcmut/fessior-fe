/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if your project has ESLint errors.
    // TODO: Remove this when we fix all ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
