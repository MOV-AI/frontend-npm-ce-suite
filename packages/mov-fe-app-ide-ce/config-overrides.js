const path = require("path");
const { merge } = require("webpack-merge");
const { override, babelInclude } = require("customize-cra");

module.exports = function (config, env) {
  const finalConfig = merge(config, {
    resolve: {
      alias: {
        vscode: require.resolve(
          "@codingame/monaco-languageclient/lib/vscode-compatibility"
        ),
      },
      extensions: [".js", ".json", ".ttf"],
    },
  });

  finalConfig.entry = {
    main: finalConfig.entry,
    "editor.worker": "monaco-editor-core/esm/vs/editor/editor.worker.js",
  };

  finalConfig.output.filename = "[name].bundle.js";

  return Object.assign(
    finalConfig,
    override(
      babelInclude([
        /* transpile (converting to es5) code in src/ and shared component library */
        path.resolve("src"),
        path.resolve("../mov-fe-lib-ide"),
        path.resolve("../mov-fe-lib-code-editor"),
      ])
    )(config, env)
  );
};
