import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/styles";
import { Typography, Tooltip } from "@material-ui/core";
import { RobotManager, Document } from "@mov-ai/mov-fe-lib-core";
import { defaultFunction } from "../../../../../../utils/Utils";
import styles from "./styles";

const useStyles = makeStyles(styles);

const FlowBottomBar = props => {
  // State(s)
  const [barStatus, setBarStatus] = useState("default");
  const [allRobots, setRobots] = useState({});
  const [selectedRobotName, setSelectedRobotName] = useState("");
  const [warningVisibility, setWarningVisibility] = useState(true);

  // Prop(s)
  const { onToggleWarnings, robotSelected, runningFlow, warnings } = props;

  // Hook(s)
  const classes = useStyles();

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================

  const updateRobots = useCallback(changedRobots => {
    setRobots(prevState => {
      const newState = {};
      Object.keys(changedRobots).forEach(id => {
        newState[id] = changedRobots[id];
      });
      return { ...prevState, ...newState };
    });
  }, []);

  const parseFlowName = flowName => {
    return flowName.replace("/__UNVERSIONED__", "");
  };

  const handleOpenFlow = event => {
    const doc = new Document({ path: runningFlow });
    const { workspace, type, name, version } = doc;

    props.openFlow({
      id: name,
      scope: type,
      workspace,
      name,
      version,
      ctrlKey: event.ctrlKey
    });
  };

  /**
   * Toggle warnings visibility in canvas
   */
  const toggleVisibility = useCallback(() => {
    if (!warnings.length) return;
    // Toggle warnings if there's any
    setWarningVisibility(prevState => !prevState);
  }, [warnings]);

  //========================================================================================
  /*                                                                                      *
   *                                    React lifecycle                                   *
   *                                                                                      */
  //========================================================================================

  useEffect(() => {
    const robotManager = new RobotManager();
    robotManager.getAll(robots => setRobots(robots));
    const subscriberId = robotManager.subscribeToChanges(updateRobots);
    // Unsubscribe to changes on component unmount
    return () => {
      robotManager.unsubscribeToChanges(subscriberId);
    };
  }, [updateRobots]);

  useEffect(() => {
    const status = runningFlow ? "active" : "default";
    setBarStatus(status);
    // Set selected robot name
    if (robotSelected && status === "active") {
      const robotName = allRobots[robotSelected]?.RobotName || "";
      setSelectedRobotName(robotName);
    }
  }, [robotSelected, allRobots, runningFlow]);

  // Call toggle warnings on change of warningVisibility
  useEffect(() => {
    onToggleWarnings(warningVisibility);
  }, [warningVisibility, onToggleWarnings]);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <Typography
      data-testid="section_flow-bottom-bar"
      component="div"
      className={`${classes.bar} ${classes[barStatus]}`}
    >
      <Typography component="div">
        {runningFlow && (
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            title={`The selected robot is running: ${parseFlowName(
              runningFlow
            )}`}
          >
            <Typography
              data-testid="input_open-flow"
              component="div"
              className={classes.action}
              onClick={evt => handleOpenFlow(evt)}
            >
              <i className="icon-Happy"></i>
              {selectedRobotName} : {parseFlowName(runningFlow)}
            </Typography>
          </Tooltip>
        )}
        <Tooltip title="Show warnings" classes={{ tooltip: classes.tooltip }}>
          <Typography
            data-testid="input_show-warnings"
            component="div"
            className={`${classes.action} ${classes.alignRight} ${
              warningVisibility ? classes.actionActive : ""
            }`}
            onClick={toggleVisibility}
          >
            <WarningIcon fontSize="small" /> {warnings.length}
          </Typography>
        </Tooltip>
      </Typography>
    </Typography>
  );
};

FlowBottomBar.propTypes = {
  openFlow: PropTypes.func,
  robotSelected: PropTypes.string,
  runningFlow: PropTypes.string
};

FlowBottomBar.defaultProps = {
  openFlow: () => defaultFunction("openFlow"),
  robotSelected: "",
  runningFlow: ""
};

export default FlowBottomBar;
