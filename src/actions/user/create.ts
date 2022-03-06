import { Action, ActionProcessor, api } from "actionhero";
import * as Joi from 'joi';
import { UserModel } from "../../models";

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

    const otherUser = await UserModel.query().findOne({ email });
    if (otherUser) {
      throw new Error(api.__('err.user.exists'));
    }
    await UserModel.query().insert({ email, password });
    data.response.ok = true;
  }

  _v(schema: Joi.Schema, type: string) {
    return (value: unknown) => Joi.assert(value, schema.message(api.__(`err.v.${type}`)));
  }
}
