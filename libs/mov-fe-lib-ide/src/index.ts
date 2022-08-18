import reportWebVitals from "./lib/reportWebVitals";
// Import shared classes to be exported
import BaseApp, { installEditor, installTool } from "./lib/App/BaseApp";
import { Store, DBSubscriber } from "./lib/store";
import { Model, Manager } from "./lib/models";
import { withAlerts, withTheme, withKeyBinds } from "./lib/decorators";
import { withEditorPlugin, withViewPlugin } from "./lib/engine";
// Import editors
import {
  CallbackModel,
  CallbackStore,
  CallbackView,
} from "./lib/editors/Callback";
import {
  ConfigurationModel,
  ConfigurationStore,
  ConfigurationView,
} from "./lib/editors/Configuration";
import { NodeModel, NodeStore, NodeView } from "./lib/editors/Node";
import { FlowModel, FlowStore, FlowView } from "./lib/editors/Flow";
import FlowExplorer from "./lib/editors/Flow/view/Components/Explorer/Explorer";
import * as CONSTANTS from "./lib/utils/Constants";

import { ApplicationTheme } from "./lib/themes";

import HomeTabPlugin, { getHomeTab } from "./lib/tools/HomeTab/HomeTab";
import ShortcutsPlugin, {
  getShortcutsTab,
} from "./lib/tools/AppShortcuts/AppShortcuts";
import { ThemeProvider } from "@material-ui/core/styles";

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
export { FlowExplorer };
export { CONSTANTS };
export { HomeTabPlugin, getHomeTab };
export { ShortcutsPlugin, getShortcutsTab };
export { reportWebVitals };
export { ThemeProvider, ApplicationTheme };
