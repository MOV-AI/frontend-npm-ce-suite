import React from "react";
import ReactDOM from "react-dom";
import App from "./src/App/App";
import reportWebVitals from "./src/reportWebVitals";
// Import shared classes to be exported
import BaseApp, { installEditor, installTool } from "./src/App/BaseApp";
import { Store, DBSubscriber } from "./src/store";
import { Model, Manager } from "./src/models";
import { withAlerts, withTheme, withKeyBinds } from "./src/decorators";
import { withEditorPlugin, withViewPlugin } from "./src/engine";
// Import editors
import {
  CallbackModel,
  CallbackStore,
  CallbackView
} from "./src/editors/Callback";
import {
  ConfigurationModel,
  ConfigurationStore,
  ConfigurationView
} from "./src/editors/Configuration";
import { NodeModel, NodeStore, NodeView } from "./src/editors/Node";
import { FlowModel, FlowStore, FlowView } from "./src/editors/Flow";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Export classes to build App
export { BaseApp, installEditor, installTool };
export { Store, DBSubscriber };
export { Model, Manager };
export { withAlerts, withTheme, withKeyBinds };
export { withEditorPlugin, withViewPlugin };
// Export built-in editors
export { CallbackModel, CallbackStore, CallbackView };
export { ConfigurationModel, ConfigurationStore, ConfigurationView };
export { NodeModel, NodeStore, NodeView };
export { FlowModel, FlowStore, FlowView };
