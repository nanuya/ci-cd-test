const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { parsed: { CLIENT_STATIC_PATH }} = require('dotenv').config();


module.exports = {
  entry: path.resolve(__dirname, 'render.tsx'),
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'render.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jxs']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
        patterns: [
            { from: `${CLIENT_STATIC_PATH}`, to: '.' },
        ]
    })
  ]
};