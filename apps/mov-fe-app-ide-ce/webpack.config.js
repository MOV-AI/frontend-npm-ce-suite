const { merge } = require("webpack-merge");

module.exports = (config, _context) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: "url-loader",
          },
        },
      ],
    },
  });
};
