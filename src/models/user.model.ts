import { snakeCaseMappers } from 'objection';
import { getModel } from './base.model';
import { IUser } from './user.model.d';

const Model = getModel();

interface UserModel extends IUser {}

class UserModel extends Model {
  public static tableName = 'Users';

  static get idColumn() {
    return 'id';
  }

  static get pickJsonSchemaProperties() {
    return true;
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get jsonSchema() {
    return {
      type: 'object',
      additionalProperties: false,
      required: ['email', 'password'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        role: { type: 'string', enum: ['super_admin', 'admin', 'viewer'] },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        deletedAt: { type: ['string', 'null'], format: 'date-time' },
      }
    };
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
}

export default UserModel;