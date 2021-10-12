const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const fonts = require('next-fonts');

require('dotenv').config();

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
  env: { FAUNADB_SECRET: process.env.FAUNADB_SECRET },
};

module.exports = withPlugins([[optimizedImages, fonts]], nextConfig);
