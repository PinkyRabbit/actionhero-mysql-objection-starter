import { Action, ActionProcessor, api } from 'actionhero';
import * as Joi from 'joi';
import UserModel from '../../models/user.model';
import { ILoginPayload } from './auth.login.d';

export class Login extends Action {
  constructor() {
    super();
    this.name = 'auth.login';
    this.description = 'user login';
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
    const { email, password } = data.params as ILoginPayload;

    const user = await UserModel.query().findOne({ email, password });
    if (!user) {
      throw new Error(api.__('err.user.exists'));
    }
    data.response.data = user;
    data.response.ok = true;
  }

  _v(schema: Joi.Schema, type: string) {
    return (value: unknown) => Joi.assert(value, schema.message(api.__(`err.v.${type}`)));
  }
}
