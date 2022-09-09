import MonacoCodeEditor from "./src/components/MonacoCodeEditor/MonacoCodeEditor";

const reactDom = require("react-dom");
console.log("in Code Editor");
window.ReactLibCode = require("react");
console.log("R1 === R2", window.React1 === window.ReactLibCode, window.React1);

export { MonacoCodeEditor };
