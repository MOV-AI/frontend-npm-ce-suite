import React, { useEffect } from "react";
import {
  BaseApp,
  installEditor,
  installTool,
  ConfigurationModel,
  ConfigurationStore,
  ConfigurationView,
  CallbackModel,
  CallbackStore,
  CallbackView,
  NodeStore,
  NodeModel,
  NodeView,
  FlowModel,
  FlowStore,
  FlowView,
  FlowExplorer,
  CONSTANTS,
  getHomeTab,
  HomeTabPlugin,
  ShortcutsPlugin,
  getShortcutsTab,
} from "@mov-ai/mov-fe-lib-ide";

import KeyboardIcon from "@material-ui/icons/Keyboard";
import HomeIcon from "@material-ui/icons/Home";

const AppCE = (props) => {
  //========================================================================================
  /*                                                                                      *
   *                                    React Lifecycle                                   *
   *                                                                                      */
  //========================================================================================

  // On component did mount
  useEffect(() => {
    // Install editors
    installEditor({
      scope: FlowModel.SCOPE,
      store: FlowStore,
      editorPlugin: FlowView,
      otherPlugins: [
        {
          profile: CONSTANTS.FLOW_EXPLORER_PROFILE,
          factory: (profile) => new FlowExplorer(profile),
        },
      ],
    });
    installEditor({
      scope: NodeModel.SCOPE,
      store: NodeStore,
      editorPlugin: NodeView,
    });
    installEditor({
      scope: CallbackModel.SCOPE,
      store: CallbackStore,
      editorPlugin: CallbackView,
    });
    installEditor({
      scope: ConfigurationModel.SCOPE,
      store: ConfigurationStore,
      editorPlugin: ConfigurationView,
    });

    // Install tools
    installTool({
      id: CONSTANTS.HOMETAB_PROFILE.name,
      profile: CONSTANTS.HOMETAB_PROFILE,
      Plugin: HomeTabPlugin,
      tabData: getHomeTab(),
      icon: HomeIcon,
      quickAccess: false,
      toolBar: false,
      mainMenu: false,
    });
    installTool({
      id: CONSTANTS.SHORTCUTS_PROFILE.name,
      profile: CONSTANTS.SHORTCUTS_PROFILE,
      Plugin: ShortcutsPlugin,
      tabData: getShortcutsTab(),
      icon: KeyboardIcon,
      quickAccess: false,
      toolBar: false,
      mainMenu: false,
    });
  }, []);

  return <BaseApp {...props} />;
};

export default AppCE;
