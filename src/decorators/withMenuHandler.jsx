import React, { useCallback } from "react";

/**
 * Handle actions to update right menu of each editor
 * @param {*} Component : Editor React Component
 * @returns {ReactComponent} React component that receives props to handle menu actions
 */
const withMenuHandler = Component => {
  return (props, ref) => {
    const { call } = props;
    const updateRightMenuRef = React.useRef();

    /**
     * Reset right menu : clear menu and close right drawer
     */
    const resetRightMenu = useCallback(() => {
      call("rightDrawer", "resetBookmarks");
    }, [call]);

    /**
     * Render components menu if any and bind events of active tab to trigger the component's renderRightMenu method
     * @returns
     */
    const initRightMenu = useCallback(() => {
      // render component menus (if any)
      const editorRef = ref?.current;
      if (!editorRef) return;
      const _updateRightMenu = editorRef.renderRightMenu
        ? editorRef.renderRightMenu
        : resetRightMenu;
      // Render (or close) right menu details
      _updateRightMenu();
      updateRightMenuRef.current = _updateRightMenu;
    }, [ref, resetRightMenu]);

    /**
     * Update Right menu
     */
    const updateRightMenu = useCallback(() => {
      if (!updateRightMenuRef.current) initRightMenu();
      updateRightMenuRef.current();
    }, [initRightMenu]);

    return (
      <Component
        {...props}
        ref={ref}
        initRightMenu={initRightMenu}
        updateRightMenu={updateRightMenu}
      />
    );
  };
};

export default withMenuHandler;
