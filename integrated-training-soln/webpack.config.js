// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : "style-loader";

const config = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    assetModuleFilename: "images/[name][ext]",
  },
  devServer: {
    open: true,
    host: "localhost",
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/login.html",
      filename: "login.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/description.html",
      filename: "description.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/dashboard.html",
      filename: "dashboard.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/course.html",
      filename: "course.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/catalog.html",
      filename: "catalog.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/about.html",
      filename: "about.html",
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]", // Maintain original file names and place them in 'images' folder
        },
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
