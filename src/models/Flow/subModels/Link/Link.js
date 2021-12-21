import Model from "../../../Model";
import schema from "./schema";

class Link extends Model {
  constructor() {
    // inject imported schema and forward constructor arguments
    super({ schema, ...arguments[0] });
  }

  // Model properties
  name = "";
  from = "";
  to = "";

  observables = ["name", "from", "to"];

  //========================================================================================
  /*                                                                                      *
   *                                     Data Handlers                                    *
   *                                                                                      */
  //========================================================================================

  getFrom() {
    return this.from;
  }

  setFrom(value) {
    this.from = value;
    return this;
  }

  getTo() {
    return this.to;
  }

  setTo(value) {
    this.to = value;
    return this;
  }

  //========================================================================================
  /*                                                                                      *
   *                                      Serializers                                     *
   *                                                                                      */
  //========================================================================================

  serialize() {
    return {
      name: this.getName(),
      from: this.getFrom(),
      to: this.getTo()
    };
  }

  serializeToDB() {
    const { from, to } = this.serialize();

    return {
      From: from,
      To: to
    };
  }

  static serializeOfDB(json) {
    const name = Object.keys(json)[0];
    const content = Object.values(json)[0];
    const { From: from, To: to } = content;

    return { name, from, to };
  }
}

export default Link;
