const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = function override(config, env) {
  // Add alias to vscode
  config.resolve.alias.vscode = require.resolve(
    "@codingame/monaco-languageclient/lib/vscode-compatibility"
  );
  // target
  config.target = "web";
  // Add plugins
  config.plugins = [...config.plugins, new MonacoWebpackPlugin()];
  // Optimizations
  config.optimization =  {
    ...config.optimization,
    concatenateModules: false,
    providedExports: false,
    usedExports: false,
  }
  // Add loaders
  config.module.rules = [
    ...config.module.rules,
    {
      test: /node_modules\/monaco-editor/,
      use: {
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env"] }
      }
    },
    // {
    //   test: /\.css$/,
    //   resolve: {
    //     extensions: [".css"]
    //   },
    //   use: ["style-loader", "css-loader"],
    //   include: [
    //     path.resolve(__dirname, "./node_modules/monaco-editor")
    //   ]
    // },
    // {
    //   test: /\.ttf$/,
    //   use: ['file-loader'],
    // },
  ];
  // return config
  return config;
};