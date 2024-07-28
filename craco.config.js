const CracoAlias = require("craco-alias");
const webpack = require('webpack');
const envKeys = require('./scripts/env');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.paths.json",
      },
    }
  ],
  webpack: {
    plugins: [
      new webpack.DefinePlugin(envKeys),
    ]
  }
};
