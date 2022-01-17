import lodash from "lodash";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import Canvas from "./canvas";
import Graph from "../../Core/Graph/GraphBase";
import InterfaceModes from "./InterfaceModes";
import { maxMovingPixels } from "../../Constants/constants";
import { EVT_NAMES } from "../../events";

const TYPES = {
  NODE: "NodeInst",
  CONTAINER: "Container"
};

export default class MainInterface {
  constructor({
    id,
    containerId,
    modelView,
    type,
    width,
    height,
    data,
    classes,
    call,
    graphCls
  }) {
    this.id = id;
    this.containerId = containerId;
    this.width = width;
    this.height = height;
    this.modelView = modelView;
    this.data = data;
    this.graphCls = graphCls ?? Graph;
    this.classes = classes;
    this.docManager = call;

    // TODO: Review
    this.type = type ?? "flow";
    this.initialize();
  }

  //========================================================================================
  /*                                                                                      *
   *                                      Properties                                      *
   *                                                                                      */
  //========================================================================================

  stateSub = new BehaviorSubject(0);
  mode = new InterfaceModes(this);
  api = null;
  canvas = null;
  graph = null;
  shortcuts = null;

  //========================================================================================
  /*                                                                                      *
   *                                    Initialization                                    *
   *                                                                                      */
  //========================================================================================

  initialize = () => {
    this.mode.setMode(EVT_NAMES.LOADING);

    const { classes, containerId, docManager, height, id, width } = this;

    this.canvas = new Canvas({
      mInterface: this,
      containerId,
      width,
      height,
      maxMovingPixels,
      classes,
      docManager
    });

    this.graph = new this.graphCls({
      id,
      mInterface: this,
      canvas: this.canvas,
      docManager
    });

    // Set initial mode as loading
    this.setMode(EVT_NAMES.LOADING);

    // Load document and add subscribers
    this.addSubscribers()
      .loadDoc()
      .then(() => {
        this.canvas.el.focus();

        this.mode.setMode(EVT_NAMES.DEFAULT);
      });
  };

  reload = () => {
    this.canvas.reload();
    this.destroy();
    this.loadDoc();
  };

  /**
   * @private
   * Loads the document in the graph
   * @returns {MainInterface} : The instance
   */
  loadDoc = () => {
    return this.graph.loadData(this.data);
  };

  //========================================================================================
  /*                                                                                      *
   *                                  Setters and Getters                                 *
   *                                                                                      */
  //========================================================================================

  get selectedNodes() {
    return this.graph.selectedNodes;
  }

  set selectedNodes(nodes) {
    this.graph.selectedNodes = nodes;
    if (this.selectedLink) this.selectedLink.onSelected(false);
  }

  get selectedLink() {
    return this.graph.selectedLink;
  }

  set selectedLink(link) {
    if (this.graph.selectedLink) this.graph.selectedLink.onSelected(false);
    this.graph.selectedLink = link;
  }

  setMode = (mode, props, force) => {
    this.mode.setMode(mode, props, force);
  };

  setPreviousMode = () => {
    this.mode.setPrevious();
  };

  nodeStatusUpdated = (nodeStatus, robotStatus) => {
    this.graph.nodeStatusUpdated(nodeStatus, robotStatus);
  };

  // TODO: move to where it matters
  validateNodeTocopy = data => {
    return data.node?.ContainerFlow !== this.id;
  };

  addLink = () => {
    console.log("debug add link");
    const { src, trg, link, toCreate } = this.mode.linking.props;

    if (toCreate && link.isValid(src, trg, this.graph.links)) {
      // TODO: add link
    }
  };

  //========================================================================================
  /*                                                                                      *
   *                                      Subscribers                                     *
   *                                                                                      */
  //========================================================================================

  /**
   * @private
   * Initializes the subscribers
   * @returns {MainInterface} : The instance
   */
  addSubscribers = () => {
    this.mode.default.onEnter.subscribe(this.onDefault);

    // drag mode -> onExit event
    this.mode.drag.onExit.subscribe(this.onDragEnd);

    // Node click and double click events
    this.mode.selectNode.onEnter.subscribe(this.onSelectNode);

    this.mode.onDblClick.onEnter.subscribe(() => {
      this.setMode(EVT_NAMES.DEFAULT);
    });

    // Linking mode events
    this.mode.linking.onEnter.subscribe(this.onLinkingEnter);
    this.mode.linking.onExit.subscribe(this.onLinkingExit);

    // Canvas events (not modes)
    // toggle warnings
    this.canvas.events
      .pipe(filter(event => event.name === EVT_NAMES.ON_TOGGLE_WARNINGS))
      .subscribe(this.onToggleWarnings);

    return this;
  };

  //========================================================================================
  /*                                                                                      *
   *                                    Event Handlers                                    *
   *                                                                                      */
  //========================================================================================

  onDefault = () => {
    this.selectedNodes.length = 0;
  };

  onDragEnd = draggedNode => {
    const nodes = this.selectedNodes.filter(
      node => node.data.id === draggedNode.data.id
    );
    nodes.push(draggedNode);

    nodes.forEach(node => {
      const { id } = node.data;
      const [x, y] = node.data.Visualization;

      const items =
        node.data.type === TYPES.CONTAINER
          ? this.modelView.current.getSubFlows()
          : this.modelView.current.getNodeInstances();

      items.getItem(id).setPosition(x, y);
    });
  };

  onLinking = data => {
    this.graph.nodes.forEach(node => node.obj.linking(data));
  };

  onLinkingEnter = () => {
    const { data } = this.mode.current.props.src;
    this.onLinking(data);
  };

  onLinkingExit = () => {
    this.onLinking();
    this.addLink();
  };

  onSelectNode = data => {
    const { nodes, shiftKey } = data;
    const { selectedNodes } = this;
    this.selectedLink = null;

    if (!shiftKey) selectedNodes.length = 0;

    nodes.forEach(node => {
      node.selected
        ? selectedNodes.push(node)
        : lodash.pull(selectedNodes, node);
    });
  };

  onToggleWarnings = event => {
    // show/hide warnings
    this.graph.updateWarningsVisibility(event.data);
  };

  onStateChange = fn => {
    return this.stateSub.subscribe(fn);
  };

  onLayersChange = layers => {
    const visitedLinks = new Set();

    this.graph.nodes.forEach(node => {
      node.obj.onLayersChange(layers);

      node.links.forEach(linkId => {
        const link = this.graph.links.get(linkId);
        if (
          // link was not yet visited or is visible
          !visitedLinks.has(linkId) ||
          link.visible
        ) {
          link.visibility = node.obj.visible;
        }
        visitedLinks.add(linkId);
      });
    });
  };

  destroy = () => {
    // Nothing to do
  };
}
