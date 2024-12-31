const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point for your app
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Process JavaScript/JSX files
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(glsl|vs|fs)$/,
        type: "asset/source", // For Webpack 5
        use: "raw-loader",
      },
      {
        test: /\.(mp3|wav)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name].[hash][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve these extensions
  },
  mode: "development", // Can be 'development' or 'production'
};
