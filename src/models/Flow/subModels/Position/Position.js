import Model from "../../../Model/Model";
import schema from "./schema";

class Position extends Model {
  constructor() {
    // inject imported schema and forward constructor arguments
    super({ schema, ...arguments[0] });
  }

  // Model properties
  x = 0;
  y = 0;

  observables = ["x", "y"];

  //========================================================================================
  /*                                                                                      *
   *                                     Data Handlers                                    *
   *                                                                                      */
  //========================================================================================

  getX() {
    return this.x;
  }

  setX(value) {
    this.x = value;
    return this;
  }

  getY() {
    return this.y;
  }

  setY(value) {
    this.y = value;
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
      x: this.getX(),
      y: this.getY()
    };
  }

  serializeToDB() {
    const { x, y } = this.serialize();

    return [x, y];
  }

  static serializeOfDB(arr) {
    const output = {};

    const position = arr ?? [0, 0];
    output.x = position[0];
    output.y = position[1];

    return output;
  }
}

export default Position;