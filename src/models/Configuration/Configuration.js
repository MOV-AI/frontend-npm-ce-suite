import Model from "../Model/Model";

export default class Configuration extends Model {
  /**
   * This should be private
   * @param {*} name
   * @param {*} extension
   * @param {*} code
   * @param {*} details
   */
  constructor(name, extension, code, details) {
    super(name, details);
    this.extension = extension || "yaml";
    this.code = code || "";
  }

  getCode() {
    return this.code;
  }

  setCode(code) {
    this.code = code;
    return this;
  }

  getExtension() {
    return this.extension;
  }

  setExtension(extension) {
    this.extension = extension;
    return this;
  }

  getScope() {
    return Configuration.SCOPE;
  }

  static SCOPE = "Configuration";

  static ofJSON(json) {
    const {
      Label: name,
      Yaml: code,
      Type: extension,
      LastUpdate: details
    } = json;
    return new Configuration(name, extension, code, details);
  }

  static EMPTY = new Configuration();
}