import * as webpack from "webpack";
import * as path from "path";

import ESLintPlugin from "eslint-webpack-plugin";

const cwd = `deploy-render`;
type Mode = "development" | "none" | "production";
const mode = (process.env.NODE_ENV || "development") as Mode;
const config: webpack.Configuration = {
  mode,
  devtool: mode === "development" ? "inline-source-map" : false,
  target: "node",
  entry: {
    server: path.resolve(__dirname, "../server.ts"),
  },
  output: {
    filename: "[name][contenthash].js",
    path: path.resolve(__dirname, "../", "../", `../${cwd}/server`),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
        include: [path.resolve(__dirname, "../")],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: ["mongodb-client-encryption", "pg-native"],
  plugins: [new ESLintPlugin()],
};

export default config;
