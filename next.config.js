require('dotenv').config();

module.exports = {
  experimental: {
    reactRefresh: false,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
  env: { FAUNADB_SECRET: process.env.FAUNADB_SECRET },
};
