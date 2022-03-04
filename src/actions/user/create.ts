import { Action, ActionProcessor, api } from "actionhero";
import * as Joi from 'joi';

export class CreateUser extends Action {
  constructor() {
    super();
    this.name = "user.create";
    this.description = "create user";
    this.outputExample = {};

    this.inputs = {
      email: {
        required: true,
        validator: this._v(Joi.string().email({ tlds: { allow: false } }), 'email'),
      },
      password: {
        required: true,
        validator: this._v(Joi.string().min(8).max(50), 'password'),
      },
    };
    console.log(api);
  }

  async run(data: Partial<ActionProcessor<Action>>)  {
    // your logic here
    data.response.ok = true;
  }

  _v(schema: Joi.Schema, type: string) {
    return (value: unknown) => Joi.attempt(value, schema.message(api.__(`v.${type}`)));
  }
}
