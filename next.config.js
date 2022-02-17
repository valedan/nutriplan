module.exports = {
  reactStrictMode: true,
  eslint: {},
  swcMinify: true,
  // https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions#including-non-page-files-in-the-pages-directory
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
};
