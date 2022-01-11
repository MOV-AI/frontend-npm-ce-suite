/**
 * Rules for a valid flow
 *
 * 1 - The flow should have at least one link from the start node
 * 2 - @TODO Check cross-talk
 *
 */

import { MisMatchMessageLink } from "../../Components/Links/Errors";
import { isLinkeable } from "../../Components/Nodes/BaseNode/PortValidator";

const t = v => v;

const messages = {
  startLink: {
    message: t("Start link(s) not found"),
    type: "warning",
    isRuntime: true,
    isPersistent: false
  },
  linkMismatchMessage: {
    message: t("There're links with message mismatch"),
    type: "warning",
    isRuntime: false,
    isPersistent: true
  }
};

export default class GraphValidator {
  constructor(graph) {
    this.graph = graph;
  }

  /**
   * check if links to the start node
   * @param {object} link object
   *
   * @returns {bool}
   */
  _isLinkFromStart = link => {
    return link.data.sourceNode === "start";
  };

  /**
   * Validate links in graph
   *  Rule nr. 1 : Missing start link
   *  Rule nr. 2 : Links between ports with different message types
   * @returns {Array} warnings objects
   */
  _validateLinks = () => {
    const warnings = [];
    const links = this.graph.links;
    const nodes = this.graph.nodes;
    let links_start = false;
    let links_mismatches = false;

    links.forEach((link, link_id, _links) => {
      links_start = links_start ? links_start : this._isLinkFromStart(link);
      // Validate links message mismatch
      const error = GraphValidator.validateLinkMismatch(link.data, nodes);
      link.update_error(error);
      if (!links_mismatches)
        links_mismatches = link.error instanceof MisMatchMessageLink;
    });

    // Check rule nr. 1 : Missing start link
    if (!links_start) warnings.push(messages.startLink);
    // Check rule nr. 2 : Links between ports with different message types
    if (links_mismatches) warnings.push(messages.linkMismatchMessage);

    return warnings;
  };

  /**
   * Validate if the flow contains any sub-flow with invalid params
   *  - Invalid params: params set on instance and not set on template
   *
   * @returns {Array} List of container id that has invalid params
   */
  _validateContainerParams = () => {
    const invalidContainers = new Map();
    const containers = new Map(
      [...this.graph.nodes].filter(
        ([_, node]) => node.obj.data.type === "Container"
      )
    );
    containers.forEach(container => {
      const containerNode = container.obj;
      const instanceParams = containerNode?.data?.Parameter ?? {};
      const templateParams = containerNode?._template?.Parameter ?? {};
      for (const param in instanceParams) {
        if (!Object.hasOwnProperty.call(templateParams, param)) {
          console.log("debug invalid containerNode", templateParams, param);
          invalidContainers.set(containerNode.data.id, containerNode);
        }
      }
    });
    // return containers id
    return [...invalidContainers.keys()];
  };

  /**
   * run validation rules
   *
   * @returns {Object}
   *  warnings: array with warning messages
   *  invalidContainers: array with containers id with invalid params
   */
  validateFlow = () => {
    const warnings = this._validateLinks();
    const invalidContainersParam = this._validateContainerParams();
    return { warnings, invalidContainersParam };
  };

  /**
   * check conditions for a valid name
   * 1 - should be unique
   * 2 - should pass regex test
   * @param {string} name value to validate
   * @param {Map} nodes list of nodes already added to the flow
   *
   * @returns {object} {result <bool>, error <string>}
   */
  static validateNodeName = (name, nodes) => {
    const rosValidation = new RegExp(/^[a-zA-Z]\w*$/);

    const re = new RegExp(/(_{2,})/);

    try {
      let nodeExists = false;
      nodes.forEach(node => {
        if (name === node.obj.name) {
          nodeExists = true;
        }
      });

      if (nodeExists) {
        throw new Error("Node already exists");
      }
      if (!rosValidation.test(name) || re.test(name)) {
        throw new Error("Invalid name");
      }
    } catch (error) {
      return { result: false, error: error.message };
    }
    return { result: true, error: "" };
  };

  /**
   * validateLinkMismatch : check if link has message type mismatch
   * @param {*} link : parsed link object
   * @param {*} nodes : graph nodes
   * @returns null or error MisMatchMessageLink object
   */
  static validateLinkMismatch = (link, nodes) => {
    const [sourceNode, targetNode] = ["sourceNode", "targetNode"].map(key => {
      const node = nodes.get(link[key]);
      if (!node) throw new Error(`Node ${link[key]} not found`);
      return node;
    });

    const sourcePortPos = sourceNode.obj.getPortPos(link.sourcePort);
    const targetPortPos = targetNode.obj.getPortPos(link.targetPort);

    // Check if link is invalid to define error
    const error = !isLinkeable(sourcePortPos.data, targetPortPos.data)
      ? new MisMatchMessageLink(
          link,
          { source: sourcePortPos, target: targetPortPos },
          () => {}
        )
      : null;

    link.error = error;
    // Return error
    return error;
  };
}