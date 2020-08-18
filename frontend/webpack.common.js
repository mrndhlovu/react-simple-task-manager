const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: ["./src/index.js", "./src/assets/scss/styles.scss"],
  },
  output: {
    path: path.join(__dirname, "build"),
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,

        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.jpg$/,
        use: [{ loader: "url-loader" }],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new webpack.DefinePlugin({
      __isBrowser__: "true",
    }),
    new HtmlWebPackPlugin({
      template: "./src/assets/static/template.html",
      filename: "./index.html",
      favicon: "./src/assets/static/favicon.ico",
    }),
  ],
};
