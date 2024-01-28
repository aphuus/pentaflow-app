/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'replicate.com'
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery'
      }
    ]
  }
};

export default nextConfig;
