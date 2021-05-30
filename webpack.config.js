const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV;
const sourceMap = mode === "development" ? "eval-source-map" : "source-map";

module.exports = {
  mode,
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    library: "Parawait",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "this"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  devtool: sourceMap
};
