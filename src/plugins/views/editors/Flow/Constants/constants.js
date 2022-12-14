const MAX_MOVING_PIXELS = 15000;
const CANVAS_LIMITS = [
  [10, MAX_MOVING_PIXELS - 75],
  [25, MAX_MOVING_PIXELS - 75]
];
const FLOW_VIEW_MODE = {
  default: "default",
  treeView: "treeView"
};

const ROBOT_BLACKLIST = window.SERVER_DATA?.RobotBlackList ?? [];

const TRANSITION_LINK = "movai_msgs/Transition";

const NODE_TYPES = {
  NODE: "NODE",
  CONTAINER: "CONTAINER"
};

const generateContainerId = flowId => {
  return `base-${flowId?.replace(/\//g, "-")}`;
};

export {
  MAX_MOVING_PIXELS,
  CANVAS_LIMITS,
  generateContainerId,
  FLOW_VIEW_MODE,
  TRANSITION_LINK,
  ROBOT_BLACKLIST,
  NODE_TYPES
};
