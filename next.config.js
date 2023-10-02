const nextConfig = {
  experimental: {
    appDir: true,
  },
  // ESLint is disabled for experimental use.
  // eslint: false,
  webpack: {
    resolve: {
      alias: {
        '/env': './.env',
      },
    },
  },
};

module.exports = nextConfig;