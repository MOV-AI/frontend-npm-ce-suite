import React, { Component } from "react";
import PropTypes from "prop-types";
import MainInterface from "../Components/interface/MainInterface";
import GraphTreeView from "../Core/Graph/GraphTreeView";
import { Backdrop, CircularProgress } from "@material-ui/core";
import ReactResizeDetector from "react-resize-detector";
import Warnings from "../Components/Warnings/Warnings";
import Tooltip from "../Components/Tooltips/Tooltip";
import { Rest } from "@mov-ai/mov-fe-lib-core";
import { DEFAULT_FUNCTION } from "../../_shared/mocks";

class Monitoring extends Component {
  state = {
    loading: true,
    width: 0,
    height: 0,
    warnings: []
  };
  id = this.props.id;
  type = this.props.type || "flow";
  interface = null;

  container = React.createRef();
  warnings = React.createRef();
  tooltip = React.createRef();

  containerId = `baseTree-${Math.floor(Math.random() * 9999)}`;

  //========================================================================================
  /*                                                                                      *
   *                                    React lifecycle                                   *
   *                                                                                      */
  //========================================================================================

  componentDidMount() {
    this.interface = new MainInterface(
      this,
      this.id,
      this.type,
      this.state.width,
      this.state.height,
      this.container,
      this.model,
      true,
      this.props.workspace,
      this.props.version,
      (_interface, _canvas, _id) => new GraphTreeView(_interface, _canvas, _id)
    );
    this.interface.onStateChange(state => this.onMainInit(state));
  }

  componentWillUnmount() {
    this.interface.destroy();
  }

  componentDidUpdate(prevProps) {
    // only try to renderMenus if tab is visible
    if (
      prevProps.open !== this.props.open ||
      prevProps.updateId !== this.props.updateId
    ) {
      this.interface.graph.updateNodePositions();
    }
  }

  //========================================================================================
  /*                                                                                      *
   *                             Properties, Setters, Getters                             *
   *                                                                                      */
  //========================================================================================

  get clipboard() {
    return this.interface.api.clipboard;
  }

  set clipboard(value) {
    this.interface.api.clipboard = value;
  }

  //========================================================================================
  /*                                                                                      *
   *                                       Events                                         *
   *                                                                                      */
  //========================================================================================

  onMainInit = state => {
    if (state !== 1) return;
    this.interface.graph.onFlowValidated.subscribe(warnings => {
      const persistentWarns = warnings.warnings.filter(el => el.isPersistent);
      this.props.onFlowValidated({ warnings: persistentWarns });
      this.setState({ warnings: persistentWarns });
    });

    // Render right menu when finish loading
    this.interface.mode.loading.onExit.subscribe(() => {
      this.props.renderRMenu();
    });

    this.interface.mode.selectNode.onEnter.subscribe(_ => {
      const selectedNodes = this.interface.selectedNodes;
      const node = selectedNodes.length !== 1 ? null : selectedNodes[0];
      this.props.onNodeSelected(node);
    });

    this.interface.mode.default.onEnter.subscribe(data => {
      if (data && data.event === "_onMouseDown") return;
      this.props.onNodeSelected(null);
    });

    this.interface.mode.addNode.onEnter.subscribe(_ => {
      this.props.onNodeSelected(null);
    });

    this.interface.mode.onDblClick.onEnter.subscribe(data => {
      this.props.onDblClick(data);
    });
  };

  reload = () => {
    this.interface.reload();
  };

  onResize = (w, h) => {
    this.setState({ width: w, height: h });
  };

  /**
   * Triggers update to right menu when there's a change to the main flow
   * @param {String} key
   * @param {*} value
   */
  onDocChange(key, value) {
    this.interface.setDocument(key, value);
    this.props.updateRMainMenu();
  }

  stopFlow() {
    this.interface.graph.resetStatus();
  }

  /**
   * Start node
   * @param {Object} target : Node to be started
   */
  startNode = target => {
    this.commandNode("RUN", target.node).then(() => {
      target.node.statusLoading = true;
    });
  };

  /**
   * Stop node
   * @param {Object} target : Node to be stopped
   */
  stopNode = target => {
    this.commandNode("KILL", target.node).then(() => {
      target.node.statusLoading = true;
    });
  };

  /**
   * Execute command action to node to start or stop
   *
   * @param {String} action : One of values "RUN" or "KILL"
   * @param {TreeNode} node : Node to be started/stopped
   * @param {Function} callback : Success callback
   */
  commandNode = (action, node) => {
    const nodeNamePath = node.getNodePath();
    return Rest.cloudFunction({
      cbName: "backend.FlowTopBar",
      func: "commandNode",
      args: {
        command: action,
        nodeName: nodeNamePath,
        robotName: this.props.robotSelected
      }
    })
      .then(res => {
        if (!res.success) this.handleError(res.error);
      })
      .catch(err => {
        this.handleError(err.toString());
      });
  };

  handleError = error => {
    const appInterface = this.props.masterComponent;
    appInterface.alert(error, appInterface.ALERTS.error);
  };

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  render() {
    const { classes, id } = this.props;
    const { loading } = this.state;
    return (
      <div id={`flow-main-${id}`} className={classes.flowContainer}>
        {loading && (
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <div
          style={{
            width: "100%",
            height: "100%",
            flexGrow: 1
          }}
          id={this.containerId}
          ref={this.container}
        >
          <ReactResizeDetector
            handleWidth
            handleHeight
            onResize={this.onResize}
          />
          {this.container.current && (
            <React.Fragment>
              <Warnings
                ref={this.warnings}
                warnings={this.state.warnings}
                domNode={this.container}
              />
              <Tooltip ref={this.tooltip} domNode={this.container} />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

Monitoring.propTypes = {
  id: PropTypes.string.isRequired,
  robotSelected: PropTypes.string,
  nodeContextMenu: PropTypes.object,
  masterComponent: PropTypes.object,
  onNodeSelected: PropTypes.func,
  onDblClick: PropTypes.func,
  updateRMainMenu: PropTypes.func,
  model: PropTypes.string,
  readOnly: PropTypes.bool,
  workspace: PropTypes.string,
  version: PropTypes.string
};

Monitoring.defaultProps = {
  type: "flow",
  robotSelected: "Default",
  nodeContextMenu: {},
  onNodeSelected: () => DEFAULT_FUNCTION("onNodeSelected"),
  onDblClick: () => DEFAULT_FUNCTION("onDblClick"),
  updateRMainMenu: () => DEFAULT_FUNCTION("updateRMainMenu"),
  masterComponent: { alert: window.alert, ALERTS: { error: 1 } },
  model: "Flow",
  readOnly: false,
  workspace: "global",
  version: "__UNVERSIONED__"
};

export default Monitoring;