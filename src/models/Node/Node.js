import Model from "../Model/Model";
import schema from "./schema";
import { Command, EnvVar, Parameter, Port } from "../subModels";
import Manager from "../Manager";

class Node extends Model {
  constructor() {
    // inject imported schema and forward constructor arguments
    super({ schema, ...arguments[0] });
  }

  //========================================================================================
  /*                                                                                      *
   *                                        Events                                        *
   *                                                                                      */
  //========================================================================================
  events = {
    onAny: (event, name, value) => this.propsUpdate(event, name, value)
  };

  //========================================================================================
  /*                                                                                      *
   *                                   Model Properties                                   *
   *                                                                                      */
  //========================================================================================

  description = "";
  path = "";
  type = "";
  persistent = false;
  launch = true;
  remappable = true;
  packageDep = "";
  parameters = new Manager("parameters", Parameter, this.events);
  envVars = new Manager("envVars", EnvVar, this.events);
  commands = new Manager("commands", Command, this.events);
  ports = new Manager("ports", Port, this.events);

  observables = [
    "name",
    "details",
    "description",
    "path",
    "type",
    "persistent",
    "launch",
    "remappable",
    "packageDep"
  ];

  //========================================================================================
  /*                                                                                      *
   *                                     Data Handlers                                    *
   *                                                                                      */
  //========================================================================================

  /**
   * Returns the description property
   * @returns {string}
   */
  getDescription() {
    return this.description;
  }

  /**
   * Sets the new value of the property
   * @param {string} value : The new value
   * @returns {object} : The instance
   */
  setDescription(value) {
    this.description = value;
    return this;
  }

  /**
   * Returns the path property
   * @returns {string}
   */
  getPath() {
    return this.path;
  }

  /**
   * Sets the new value of the property
   * @param {string} value : The new value
   * @returns {object} : The instance
   */
  setPath(value) {
    this.path = value;
    return this;
  }

  /**
   * Returns the type property
   * @returns {string}
   */
  getType() {
    return this.type;
  }

  /**
   * Sets the new value of the property
   * @param {string} value : The new value
   * @returns {object} : The instance
   */
  setType(value) {
    this.type = value;
    return this;
  }

  /**
   * Sets the new value of the property
   * @param {string} parameter : The name of the parameter
   * @param {string} value : The value of the parameter
   * @returns {object} : The instance
   */
  setExecutionParameter(parameter, value) {
    super.setData({ [parameter]: value });
    return this;
  }

  /**
   * Returns the persisten property
   * @returns {boolean}
   */
  getPersistent() {
    return this.persistent;
  }

  /**
   * Sets the new value of the property
   * @param {boolean} value : The new value
   * @returns {object} : The instance
   */
  setPersistent(value) {
    this.persistent = value;
    return this;
  }

  /**
   * Returns the launch property
   * @returns {boolean}
   */
  getLaunch() {
    return this.launch;
  }

  /**
   * Sets the new value of the property
   * @param {boolean} value : The new value
   * @returns {object} : The instance
   */
  setLaunch(value) {
    this.launch = value;
    return this;
  }

  /**
   * Returns the remappable property
   * @returns {boolean}
   */
  getRemappable() {
    return this.remappable;
  }

  /**
   * Sets the new value of the property
   * @param {boolean} value : The new value
   * @returns {object} : The instance
   */
  setRemappable(value) {
    this.remappable = value;
    return this;
  }

  /**
   * Returns the packageDep property
   * @returns {string}
   */
  getPackageDep() {
    return this.packageDep;
  }

  /**
   * Sets the new value of the property
   * @param {string} value : The new value
   * @returns {object} : The instance
   */
  setPackageDep(value) {
    this.packageDep = value;
    return this;
  }

  /**
   * Returns the parameters property
   * @returns {Manager}
   */
  getParameters() {
    return this.parameters;
  }

  /**
   * Adds a new instance of a managed property
   * Can only be used with managed properties
   * @param {string} varName : The name of the property
   * @param {any} data : The data of the item
   * @returns {object} : The instance
   */
  setKeyValue(varName, data) {
    this[varName].setData(data);
    return this;
  }

  /**
   * Deletes an instance of a managed property
   * Can only be used with managed properties
   * @param {string} varName : The name of the property
   * @param {any} key : The name of the item
   * @returns {object} : The instance
   */
  deleteKeyValue(varName, key) {
    this[varName].deleteItem(key);
    return this;
  }

  /**
   * Returns an instance of a managed property
   * Can only be used with managed properties
   * @param {string} varName : The name of the property
   * @param {any} key : The name of the item
   * @returns {any}
   */
  getKeyValue(varName, key) {
    return this[varName].getItem(key);
  }

  /**
   * Returns the envVars property
   * @returns {Manager}
   */
  getEnvVars() {
    return this.envVars;
  }

  /**
   * Returns the commands property
   * @returns {Manager}
   */
  getCommands() {
    return this.commands;
  }

  /**
   * Adds a port
   * @param {object} value : The port value
   * @returns {object} : The instance
   */
  setPort(value) {
    this.ports.setData(value);
    return this;
  }

  /**
   * Returns a port instance
   * @param {string} key : The port id
   * @returns {Port}
   */
  getPort(key) {
    return this.ports.getItem(key);
  }

  /**
   * Deletes a port
   * @param {string} key : The name of the port
   * @returns {object} : The instance
   */
  deletePort(key) {
    this.ports.deleteItem(key);
    return this;
  }

  /**
   * Returns the ports property
   * @returns {Manager}
   */
  getPorts() {
    return this.ports;
  }

  /**
   * Sets the callback value of the port
   * @param {string} portId : The id of the port
   * @param {string} portName : The name of the port
   * @param {string} callbackName : The new callback name
   * @returns {object} : The instance
   */
  setPortCallback(portId, portName, callbackName) {
    this.getPorts()
      .getItem(portId)
      .getPortIn()
      .getItem(portName)
      .setCallback(callbackName);

    return this;
  }

  /**
   * Sets a parameter value of the port
   * @param {string} portId : The id of the port
   * @param {string} direction : In or Out
   * @param {string} portName : The name of the port
   * @param {string} parameterName : The parameter of the port to update
   * @param {any} value : The new value of the parameter
   * @returns {object} : The instance
   */
  setPortParameter(portId, direction, portName, parameterName, value) {
    this.getPorts()
      .getItem(portId)
      [direction].getItem(portName)
      .setParameter(parameterName, value);

    return this;
  }

  /**
   * Returns the scope property
   * @returns {string}
   */
  getScope() {
    return Node.SCOPE;
  }

  /**
   * Returns the file extension property
   * @returns {string}
   */
  getFileExtension() {
    return Node.EXTENSION;
  }

  /**
   * Updates the properties of the instance
   * @param {object} json : The data to update to the model
   * @returns {object} : The instance
   */
  setData(json) {
    const {
      name,
      details,
      description,
      path,
      type,
      persistent,
      packageDep,
      launch,
      remappable,
      parameters,
      envVars,
      commands,
      ports
    } = json;

    super.setData({
      name,
      details,
      description,
      path,
      type,
      persistent,
      packageDep,
      launch,
      remappable
    });

    this.parameters.setData(parameters);
    this.envVars.setData(envVars);
    this.commands.setData(commands);
    this.ports.setData(ports);

    return this;
  }

  //========================================================================================
  /*                                                                                      *
   *                                    Event Handlers                                    *
   *                                                                                      */
  //========================================================================================

  /**
   * @private
   * Forces the events dispatcher
   * @param {string} event : The name of the event
   * @param {string} prop : The of the property updated
   * @param {any} value : The new value of the property
   */
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
      ...super.serialize(),
      name: this.getName(),
      details: this.getDetails(),
      description: this.getDescription(),
      path: this.getPath(),
      type: this.getType(),
      persistent: this.getPersistent(),
      packageDep: this.getPackageDep(),
      launch: this.getLaunch(),
      remappable: this.getRemappable(),
      parameters: this.getParameters().serialize(),
      envVars: this.getEnvVars().serialize(),
      commands: this.getCommands().serialize(),
      ports: this.getPorts().serialize()
    };
  }

  /**
   * Returns the instance properties serialized to
   * the database format
   * Override in the extended class
   * @returns {object}
   */
  serializeToDB() {
    const {
      name,
      details,
      description,
      path,
      type,
      persistent,
      packageDep,
      launch,
      remappable
    } = this.serialize();

    return {
      Label: name,
      Info: description,
      Path: path,
      Type: type,
      Persistent: persistent,
      Launch: launch,
      Remappable: remappable,
      LastUpdate: details,
      PackageDepends: packageDep,
      Parameter: this.getParameters().serializeToDB(),
      EnvVar: this.getEnvVars().serializeToDB(),
      CmdLine: this.getCommands().serializeToDB(),
      PortsInst: this.getPorts().serializeToDB()
    };
  }

  /**
   * Returns properties serialized from the database format
   * Override in the extended class
   * @param {object} json : The data received from the database
   * @returns {object}
   */
  static serializeOfDB(json) {
    const {
      Label: id,
      Label: name,
      LastUpdate: details,
      workspace,
      version,
      Info: description,
      Path: path,
      Type: type,
      Persistent: persistent,
      Launch: launch,
      Remappable: remappable,
      PackageDepends: packageDep,
      Parameter: parameters,
      EnvVar: envVars,
      CmdLine: commands,
      PortsInst: ports
    } = json;

    return {
      id,
      name,
      details,
      workspace,
      version,
      description,
      path,
      type,
      persistent,
      launch,
      remappable,
      packageDep,
      parameters: Manager.serializeOfDB(parameters, Parameter),
      envVars: Manager.serializeOfDB(envVars, EnvVar),
      commands: Manager.serializeOfDB(commands, Command),
      ports: Manager.serializeOfDB(ports, Port)
    };
  }
  static SCOPE = "Node";

  static EXTENSION = ".nd";
}

Node.defaults = {
  description: "",
  path: "",
  type: "",
  persistent: false,
  launch: true,
  remappable: true,
  packageDep: ""
};

export default Node;
