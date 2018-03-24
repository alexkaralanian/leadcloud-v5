const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

const config = {
  entry: ["babel-polyfill", "./src/index.js"],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/",
    historyApiFallback: true,
    open: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3001"
      }
    }
  },
  // caches stuff and accelerates refresh with HMR in dev
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              // enables module scoping
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          }
        ]
      },
      {
        // images
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        // fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      inject: "body"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new CleanWebpackPlugin(["dist"]),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  );
}

module.exports = config;
