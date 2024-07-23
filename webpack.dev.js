const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./index.tsx",
  mode: "development",
  devServer: {
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/preset-react", "@babel/preset-typescript"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: [".*", ".js", ".jsx", ".ts", ".tsx"] },
  output: {
    path: path.resolve(__dirname, "public/"),
    publicPath: '/',
    filename: "bundle.js"
  }
};