import React, { forwardRef, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import withAlerts from "../../../decorators/withAlerts";
import { withViewPlugin } from "../../../engine/ReactPlugin/ViewReactPlugin";
import Workspace from "../../../utils/Workspace";
import { getNameFromURL } from "../../../utils/Utils";
import { HOMETAB_PROFILE, PLUGINS } from "../../../utils/Constants";
import ERROR_MESSAGES from "../../../utils/ErrorMessages";
import movaiIcon from "../editors/_shared/Loader/movai_red.svg";
import QuickAccessComponent from "./components/QuickAccess";
import RecentDocumentsComponent from "./components/RecentDocuments";
import SamplesComponent from "./components/Samples";
import { homeTabStyles } from "./styles";

const HomeTab = forwardRef((props, ref) => {
  const { call, on, off, alert, alertSeverities } = props;
  const workspaceManager = useMemo(() => new Workspace(), []);
  const classes = homeTabStyles();
  const { t } = useTranslation();

  //========================================================================================
  /*                                                                                      *
   *                                        Methods                                       *
   *                                                                                      */
  //========================================================================================

  /**
   * Open Document
   * @param {{name: string, scope: string, id: string, isDeleted: bool}} doc : Document data
   */
  const openExistingDocument = useCallback(
    doc => {
      if (!doc.name) doc.name = getNameFromURL(doc.id);

      if (doc.isDeleted) {
        alert({
          message: t(ERROR_MESSAGES.FILE_DOESNT_EXIST, {
            FILE_URL: doc.id
          }),
          severity: alertSeverities.WARNING
        });
      } else {
        call("tabs", "openEditor", doc);
      }
    },
    [alertSeverities, alert, call, t]
  );

  //========================================================================================
  /*                                                                                      *
   *                                    React Lifecycle                                   *
   *                                                                                      */
  //========================================================================================

  useEffect(() => {
    const HOMETAB_ID_TOPIC = `${HOMETAB_PROFILE.name}-active`;
    call(PLUGINS.RIGHT_DRAWER.NAME, PLUGINS.RIGHT_DRAWER.CALL.RESET_BOOKMARKS);
    on("tabs", HOMETAB_ID_TOPIC, () => {
      call(
        PLUGINS.RIGHT_DRAWER.NAME,
        PLUGINS.RIGHT_DRAWER.CALL.RESET_BOOKMARKS
      );
    });
    return () => {
      off("tabs", HOMETAB_ID_TOPIC);
    };
  }, [call, on, off]);

  //========================================================================================
  /*                                                                                      *
   *                                        Renders                                       *
   *                                                                                      */
  //========================================================================================

  return (
    <div className={classes.root}>
      <div className={classes.body}>
        <div className={classes.column}>
          <QuickAccessComponent call={call} />
          <RecentDocumentsComponent
            workspaceManager={workspaceManager}
            openRecentDocument={openExistingDocument}
            on={on}
          />
        </div>
        <div className={classes.column}>
          <SamplesComponent openExistingDocument={openExistingDocument} />
        </div>
      </div>
      <div className={classes.footer}>
        <Tooltip title={t("MOV.AI Website")}>
          <IconButton
            href="https://mov.ai"
            target="_blank"
            rel="noreferrer"
            className={classes.socialIconBadge}
          >
            <img
              src={movaiIcon}
              alt="MOV.AI Logo"
              className={classes.movaiIcon}
            />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
});

export default withViewPlugin(withAlerts(HomeTab));

HomeTab.propTypes = {
  call: PropTypes.func.isRequired,
  on: PropTypes.func.isRequired
};
