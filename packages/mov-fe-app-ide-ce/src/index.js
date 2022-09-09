import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./Main";

window.React = React;

require("react-dom");
console.log("in APP");
window.ReactApp = require("react");
console.log("R1 === R2", window.React1 === window.ReactApp, window.React1);

ReactDOM.render(<Main />, document.getElementById("root"));
