const path = require("path");
const { override, babelInclude } = require("customize-cra");

const DEBUG = false;

module.exports = function (config, env) {
  // Include babel transpiliers
  const finalConfig = Object.assign(
    config,
    override(
      babelInclude([
        /* transpile (converting to es5) code in src/ and shared component library */
        path.resolve("src"),
        path.resolve("../mov-fe-lib-ide"),
        path.resolve("../mov-fe-lib-react"),
        path.resolve("../mov-fe-lib-code-editor"),
      ])
    )(config, env)
  );

  // resolve vscode alias
  finalConfig.resolve.extensions.push(...[".ts", ".tsx"]);
  finalConfig.resolve.alias.vscode = require.resolve(
    "@codingame/monaco-languageclient/lib/vscode-compatibility"
  );
  finalConfig.entry = {
    main: finalConfig.entry,
    "editor.worker": "monaco-editor-core/esm/vs/editor/editor.worker.js",
  };
  finalConfig.output.filename = "[name].bundle.js";
  // Print final config
  if (DEBUG) console.log("debug finalConfig", finalConfig);
  return finalConfig;
};
