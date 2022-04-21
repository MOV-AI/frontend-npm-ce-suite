import i18n from "../../../i18n/i18n";

export const KEYBINDINGS = {
  GENERAL: {
    NAME: "appShortcuts",
    LABEL: i18n.t("AppKeybindLabel"),
    DESCRIPTION: i18n.t("AppKeybindDescription"),
    KEYBINDS: {
      OPEN_WELCOME_TAB: {
        NAME: "openWelcomeTab",
        LABEL: i18n.t("HomeTabTitle"),
        DESCRIPTION: i18n.t("HomeTabKeybindDescription"),
        SHORTCUTS: "ctrl+shift+home"
      },
      OPEN_SHORTCUTS_TAB: {
        NAME: "openShortcutsTab",
        LABEL: i18n.t("ShortcutsTabTitle"),
        DESCRIPTION: i18n.t("ShortcutsTabKeybindDescription"),
        SHORTCUTS: "ctrl+shift+k"
      }
    }
  },
  EDITOR_GENERAL: {
    NAME: "editorGeneral",
    LABEL: i18n.t("EditorGeneralKeybindLabel"),
    DESCRIPTION: i18n.t("EditorGeneralKeybindDescription"),
    KEYBINDS: {
      SAVE: {
        NAME: "save",
        LABEL: i18n.t("SaveDoc"),
        DESCRIPTION: i18n.t("SaveDocKeybindDescription"),
        SHORTCUTS: "ctrl+s"
      },
      SAVE_ALL: {
        NAME: "saveAll",
        LABEL: i18n.t("SaveAllDocs"),
        DESCRIPTION: i18n.t("SaveAllDocsKeybindDescription"),
        SHORTCUTS: "ctrl+shift+s"
      },
      // TODO Add later when we have a working UNDO / REDO engine
      // UNDO: {
      //   NAME: "undo",
      //   LABEL: i18n.t("Undo"),
      //   DESCRIPTION: i18n.t("UndoKeybindDescription"),
      //   SHORTCUTS: "ctrl+z"
      // },
      // REDO: {
      //   NAME: "redo",
      //   LABEL: i18n.t("Redo"),
      //   DESCRIPTION: i18n.t("RedoKeybindDescription"),
      //   SHORTCUTS: "ctrl+shift+z"
      // },
      // COPY: {
      //   NAME: "copy",
      //   LABEL: i18n.t("Copy"),
      //   DESCRIPTION: i18n.t("CopyKeybindDescription"),
      //   SHORTCUTS: "ctrl+c"
      // },
      // PASTE: {
      //   NAME: "paste",
      //   LABEL: i18n.t("Paste"),
      //   DESCRIPTION: i18n.t("PasteKeybindDescription"),
      //   SHORTCUTS: "ctrl+v"
      // },
      CANCEL: {
        NAME: "cancel",
        LABEL: i18n.t("Cancel"),
        DESCRIPTION: i18n.t("CancelKeybindDescription"),
        SHORTCUTS: "esc"
      },
      DELETE: {
        NAME: "delete",
        LABEL: i18n.t("Delete"),
        DESCRIPTION: i18n.t("DeleteKeybindDescription"),
        SHORTCUTS: ["del", "backspace"]
      }
    }
  },
  CALLBACK: {
    NAME: "editorCallback",
    LABEL: i18n.t("EditorCallbackKeybindLabel"),
    DESCRIPTION: i18n.t("EditorCallbackKeybindDescription"),
    KEYBINDS: {
      UNDO: {
        NAME: "undo",
        LABEL: i18n.t("Undo"),
        DESCRIPTION: i18n.t("UndoKeybindDescription"),
        SHORTCUTS: "ctrl+z"
      },
      REDO: {
        NAME: "redo",
        LABEL: i18n.t("Redo"),
        DESCRIPTION: i18n.t("RedoKeybindDescription"),
        SHORTCUTS: "ctrl+shift+z"
      },
      COPY_NODE: {
        NAME: "callbackCopyCode",
        LABEL: i18n.t("CopyCode"),
        DESCRIPTION: i18n.t("CopyCodeKeybindDescription"),
        SHORTCUTS: "ctrl+c"
      },
      PASTE_NODE: {
        NAME: "callbackPasteCode",
        LABEL: i18n.t("PasteCode"),
        DESCRIPTION: i18n.t("PasteCodeKeybindDescription"),
        SHORTCUTS: "ctrl+v"
      }
    }
  },
  CONFIGURATION: {
    NAME: "editorConfiguration",
    LABEL: i18n.t("EditorConfigurationKeybindLabel"),
    DESCRIPTION: i18n.t("EditorConfigurationKeybindDescription"),
    KEYBINDS: {
      UNDO: {
        NAME: "undo",
        LABEL: i18n.t("Undo"),
        DESCRIPTION: i18n.t("UndoKeybindDescription"),
        SHORTCUTS: "ctrl+z"
      },
      REDO: {
        NAME: "redo",
        LABEL: i18n.t("Redo"),
        DESCRIPTION: i18n.t("RedoKeybindDescription"),
        SHORTCUTS: "ctrl+shift+z"
      },
      COPY_NODE: {
        NAME: "configurationCopyCode",
        LABEL: i18n.t("CopyCode"),
        DESCRIPTION: i18n.t("CopyCodeKeybindDescription"),
        SHORTCUTS: "ctrl+c"
      },
      PASTE_NODE: {
        NAME: "configurationPasteCode",
        LABEL: i18n.t("PasteCode"),
        DESCRIPTION: i18n.t("PasteCodeKeybindDescription"),
        SHORTCUTS: "ctrl+v"
      }
    }
  },
  FLOW: {
    NAME: "editorFlow",
    LABEL: i18n.t("EditorFlowKeybindLabel"),
    DESCRIPTION: i18n.t("EditorFlowKeybindDescription"),
    KEYBINDS: {
      COPY_NODE: {
        NAME: "copyNode",
        LABEL: i18n.t("CopyNode"),
        DESCRIPTION: i18n.t("CopyNodeKeybindDescription"),
        SHORTCUTS: "ctrl+c"
      },
      PASTE_NODE: {
        NAME: "pasteNode",
        LABEL: i18n.t("PasteNode"),
        DESCRIPTION: i18n.t("PasteNodeKeybindDescription"),
        SHORTCUTS: "ctrl+v"
      }
    }
  }
};
