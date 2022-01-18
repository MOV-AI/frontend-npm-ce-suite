import Model from "../../../Model";
import schema from "./schema";
import Position from "../Position/Position";
import Manager from "../../../Manager";
import { Parameter } from "../../../subModels";

class SubFlow extends Model {
  constructor() {
    // inject imported schema and forward constructor arguments
    super({ schema, ...arguments[0] });
  }

  //========================================================================================
  /*                                                                                      *
   *                                        Events                                        *
   *                                                                                      */
  //========================================================================================

  propEvents = {
    onAny: (event, name, value) => this.propsUpdate(event, name, value)
  };

  //========================================================================================
  /*                                                                                      *
   *                                   Model Properties                                   *
   *                                                                                      */
  //========================================================================================

  template = "";
  position = new Position();
  parameters = new Manager("parameters", Parameter, this.propEvents);

  // Define observable properties
  observables = Object.values(SubFlow.OBSERVABLE_KEYS);

  //========================================================================================
  /*                                                                                      *
   *                                     Data Handlers                                    *
   *                                                                                      */
  //========================================================================================

  /**
   * Returns the template property
   * @returns {string}
   */
  getTemplate() {
    return this.template;
  }

  /**
   * Sets the template property
   * @param {string} value : The new value
   * @returns {SubFlow}
   */
  setTemplate(value) {
    this.template = value;
    return this;
  }

  /**
   * Returns the subflow's position object
   * @returns {Position}
   */
  getPosition() {
    return this.position;
  }

  /**
   * Sets the subflow's position
   * @param {number} x : Coordinate x
   * @param {number} y : Coordinate y
   * @returns
   */
  setPosition(x, y) {
    this.position.setData({ x, y });
    this.dispatch(
      SubFlow.OBSERVABLE_KEYS.POSITION,
      this.getPosition().serialize()
    );

    return this;
  }

  /**
   * Returns the parameters manager
   * @returns {Manager}
   */
  getParameters() {
    return this.parameters;
  }

  /**
   * Updates the properties of the instance
   * @param {object} json : The data to update the instance
   * @returns {SubFlow} : The instance
   */
  setData(json) {
    const { name, template, position, parameters } = json;
    super.setData({ name, template });

    this.position.setData(position);
    this.parameters.setData(parameters);
  }

  //========================================================================================
  /*                                                                                      *
   *                                    Event Handlers                                    *
   *                                                                                      */
  //========================================================================================

  propsUpdate(event, prop, value) {
    // force dispatch
    this.dispatch(prop, value);
  }

  //========================================================================================
  /*                                                                                      *
   *                                      Serializers                                     *
   *                                                                                      */
  //========================================================================================

  /**
   * Returns the instance properties serialized
   * @returns {object}
   */
  serialize() {
    return {
      name: this.getName(),
      template: this.getTemplate(),
      position: this.getPosition().serialize(),
      parameters: this.getParameters().serialize()
    };
  }

  /**
   * Returns the instance properties serialized to
   * the database format
   * @returns {object}
   */
  serializeToDB() {
    const { name, template } = this.serialize();

    return {
      ContainerLabel: name,
      ContainerFlow: template,
      Visualization: this.getPosition().serializeToDB(),
      Parameter: this.getParameters().serializeToDB()
    };
  }

  //========================================================================================
  /*                                                                                      *
   *                                        Static                                        *
   *                                                                                      */
  //========================================================================================

  /**
   * Returns properties serialized from the database format
   * @param {object} json : The data received from the database
   * @returns {object}
   */
  static serializeOfDB(json) {
    const name = Object.keys(json)[0];
    const content = Object.values(json)[0];

    const {
      ContainerFlow: template,
      Visualization: position,
      Parameter: parameters
    } = content;

    return {
      name,
      template,
      position: Position.serializeOfDB(position),
      parameters: Manager.serializeOfDB(parameters, Parameter)
    };
  }

  static OBSERVABLE_KEYS = {
    NAME: "name",
    TEMPLATE: "template",
    POSITION: "position"
  };
}

SubFlow.defaults = {};

export default SubFlow;
