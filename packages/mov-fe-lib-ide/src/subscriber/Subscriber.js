import { MasterDB } from "@mov-ai/fe-lib-core";

class Subscriber {
  constructor({ pattern, _onLoad, _onUpdate }) {
    this.pattern = pattern;
  }

  subscribe(onUpdate, onLoad) {
    MasterDB.subscribe(this.pattern, onUpdate, onLoad);
  }

  unsubscribe() {
    MasterDB.unsubscribe(this.pattern);
  }

  destroy() {
    this.unsubscribe();
    MasterDB.close();
  }
}

export default Subscriber;
