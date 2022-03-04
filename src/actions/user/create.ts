import { Action, ActionProcessor, api } from "actionhero";
import * as Joi from 'joi';
import { User } from "../../models";

export class CreateUser extends Action {
  constructor() {
    super();
    this.name = "user.create";
    this.description = "create user";
    this.outputExample = {};

    this.inputs = {
      email: {
        required: true,
        validator: this._v(Joi.string().email(), 'email'),
      },
      password: {
        required: true,
        validator: this._v(Joi.string().min(8).max(50), 'password'),
      },
    };
  }

  async run(data: Partial<ActionProcessor<Action>>)  {
    const { email, password } = data.params;

    const otherUser = await User.query().findOne({ email }).whereNull('deletedAt');
    if (otherUser) {
      throw new Error(api.__('err.user.exists'));
    }
    await User.query().insert({ email, password });
    data.response.ok = true;
  }

  _v(schema: Joi.Schema, type: string) {
    return (value: unknown) => Joi.assert(value, schema.message(api.__(`err.v.${type}`)));
  }
}
