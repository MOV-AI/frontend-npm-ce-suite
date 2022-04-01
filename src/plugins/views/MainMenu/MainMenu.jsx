import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  VerticalBar,
  ProfileMenu,
  ContextMenu
} from "@mov-ai/mov-fe-lib-react";
import { Authentication } from "@mov-ai/mov-fe-lib-core";
import HomeIcon from "@material-ui/icons/Home";
import TextSnippetIcon from "@material-ui/icons/Description";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Tooltip } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { withViewPlugin } from "../../../engine/ReactPlugin/ViewReactPlugin";
import { MainContext } from "../../../main-context";
import {
  HOMETAB_PROFILE,
  APP_INFORMATION,
  PLUGINS,
  HOSTS
} from "../../../utils/Constants";
import movaiIcon from "../editors/_shared/Branding/movai-logo-transparent.png";
import { getIconByScope, getHomeTab } from "../../../utils/Utils";
import { mainMenuStyles } from "./styles";

const MainMenu = props => {
  const { call } = props;
  // State hooks
  const [docTypes, setDocTypes] = useState([]);
  // Other hooks
  const classes = mainMenuStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  // Refs
  const MENUS = useRef([
    {
      name: HOMETAB_PROFILE.name,
      icon: _props => <HomeIcon {..._props}></HomeIcon>,
      title: t("Get Started"),
      isActive: true,
      getOnClick: () => {
        call(PLUGINS.TABS.NAME, PLUGINS.TABS.CALL.OPEN, getHomeTab());
      }
    },
    {
      name: PLUGINS.EXPLORER.NAME,
      icon: _props => <TextSnippetIcon {..._props}></TextSnippetIcon>,
      title: "Explorer",
      isActive: true,
      getOnClick: () => {
        // Toggle left drawer
        call(HOSTS.LEFT_DRAWER.NAME, HOSTS.LEFT_DRAWER.CALL.TOGGLE);
      }
    }
  ]);

  //========================================================================================
  /*                                                                                      *
   *                                    React Lifecycle                                   *
   *                                                                                      */
  //========================================================================================

  // To run when component is initiated
  useEffect(() => {
    call(PLUGINS.DOC_MANAGER.NAME, PLUGINS.DOC_MANAGER.CALL.GET_DOC_TYPES).then(
      _docTypes => {
        setDocTypes(_docTypes);
      }
    );
  }, [call]);

  //========================================================================================
  /*                                                                                      *
   *                                     Handle Events                                    *
   *                                                                                      */
  //========================================================================================

  /**
   * Open Welcome Tab
   */
  const openHomeTab = useCallback(() => {
    getHomeTab().then(homeTab => {
      call(PLUGINS.TABS.NAME, PLUGINS.TABS.CALL.OPEN, homeTab);
    });
  }, [call]);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <MainContext.Consumer>
      {({ isDarkTheme, handleLogOut, handleToggleTheme }) => (
        <VerticalBar
          unsetAccountAreaPadding={true}
          backgroundColor={theme.palette.background.default}
          upperElement={
            <Tooltip title={t("Open Welcome Tab")} placement="right" arrow>
              <HomeIcon
                className={classes.icon}
                onClick={openHomeTab}
              ></HomeIcon>
            </Tooltip>
          }
          navigationList={[
            ...MENUS.current.map(menu => (
              <Tooltip title={menu.title} placement="right" arrow>
                {menu.icon({
                  className: classes.icon,
                  onClick: menu.getOnClick
                })}
              </Tooltip>
            )),
            <ContextMenu
              element={
                <Tooltip
                  title={t("Create new document")}
                  placement="right"
                  arrow
                >
                  <AddBoxIcon
                    id="mainMenuCreateNewDocument"
                    className={classes.icon}
                  ></AddBoxIcon>
                </Tooltip>
              }
              menuList={docTypes.map(docType => ({
                onClick: () =>
                  call(
                    PLUGINS.DOC_MANAGER.NAME,
                    PLUGINS.DOC_MANAGER.CALL.CREATE,
                    {
                      scope: docType.scope
                    }
                  ).then(document => {
                    call(PLUGINS.TABS.NAME, PLUGINS.TABS.CALL.OPEN_EDITOR, {
                      id: document.getUrl(),
                      name: document.getName(),
                      scope: docType.scope,
                      isNew: true
                    });
                  }),
                element: docType.scope,
                icon: getIconByScope(docType.scope),
                onClose: true
              }))}
            ></ContextMenu>
          ]}
          lowerElement={[
            <ProfileMenu
              version={APP_INFORMATION.VERSION}
              userName={Authentication.getTokenData().message.name ?? ""}
              isDarkTheme={isDarkTheme}
              handleLogout={handleLogOut}
            />,
            <img src={movaiIcon} className={classes.movaiIcon} alt="MOV.AI" />
          ]}
        ></VerticalBar>
      )}
    </MainContext.Consumer>
  );
};

export default withViewPlugin(MainMenu);

MainMenu.propTypes = {
  call: PropTypes.func.isRequired,
  emit: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
