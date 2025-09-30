const nextConfig = {
  experimental: {
    turbo: false,
  },
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8777',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8777',
        pathname: '/api/storage/**',
      },
    ],
    unoptimized: true,
  }
};

module.exports = nextConfig;
