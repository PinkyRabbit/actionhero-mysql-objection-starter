import { Action } from "actionhero";

export class Users extends Action {
  constructor() {
    super();
    this.name = "users";
    this.description = "an actionhero action";
    this.outputExample = {};
  }

  async run(data) {
    // your logic here
    data.response.ok = true;
  }
}
