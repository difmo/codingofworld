// webpack.config.js in Project 1

const path = require('path');
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: 'development',
  devServer: {
    port: 3001, // Port for Project 1
  },
  entry: './src/index.js', // Entry point for your React app
  output: {
    publicPath: 'auto', // Public path for loading assets
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'project1', // Name of your microfrontend (Project 1)
      remotes: {
        course: 'course@http://localhost:3001/remoteEntry.js',
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
};
