import React, { useEffect, useRef } from "react";
import hotkeys from "hotkeys-js";
import { getRefComponent } from "../utils/Utils";
import { KEYBINDINGS } from "../utils/Keybindings";

/**
 * By default hotkeys are not enabled for INPUT SELECT TEXTAREA elements.
 * Hotkeys.filter to return to the true shortcut keys set to play a role, false shortcut keys set up failure.
 */
hotkeys.filter = function () {
  return true;
};

hotkeys(KEYBINDINGS.SAVE, event => {
  event.preventDefault();
});

/**
 * Manage Key binds
 * @param {*} Component
 * @returns
 */
const withKeyBinds = Component => {
  const RefComponent = getRefComponent(Component);

  return (props, ref) => {
    // Props
    const { id } = props;
    // Refs
    const scopeRef = useRef();

    /**
     * Activate scope shortcuts.
     * This will automatically deactivate all other scopes
     */
    const activateKeyBind = () => {
      hotkeys.setScope(scopeRef.current);
    };

    /**
     * Set scope to global
     *  This will deactivate the current scope
     */
    const deactivateKeyBind = () => {
      hotkeys.setScope("all");
    };

    /**
     * Add Key bind to its scope
     * @param {*} keys
     * @param {*} callback
     */
    const addKeyBind = (keys, callback) => {
      if (!scopeRef.current) return;
      const keysToBind = Array.isArray(keys) ? keys.join(",") : keys;
      activateKeyBind();
      hotkeys(keysToBind, scopeRef.current, callback);
    };

    /**
     * Remove key bind from scope
     * @param {*} key
     */
    const removeKeyBind = keys => {
      const keysToUnbind = Array.isArray(keys) ? keys.join(",") : keys;
      hotkeys.unbind(keysToUnbind, scopeRef.current);
    };

    /**
     * Component initialization : set scope id
     */
    useEffect(() => {
      scopeRef.current = id;
      // Delete scope to unbind keys when component is unmounted
      return () => {
        hotkeys.deleteScope(scopeRef.current);
      };
    }, [id]);

    return (
      <RefComponent
        {...props}
        ref={ref}
        addKeyBind={addKeyBind}
        removeKeyBind={removeKeyBind}
        activateKeyBind={activateKeyBind}
        deactivateKeyBind={deactivateKeyBind}
      />
    );
  };
};

export default withKeyBinds;
