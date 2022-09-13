// babel.config.js
module.exports = {
  sourceType: "unambiguous",
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-syntax-jsx",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime"
  ]
};
