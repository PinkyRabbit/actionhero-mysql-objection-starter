import { Model, compose, snakeCaseMappers } from 'objection';
// @ts-ignore
import * as objectionUnique from 'objection-unique';
import objectionSoftDelete from 'objection-js-soft-delete';
import { default as visibility } from 'objection-visibility';
import { IBaseModel } from './base.model.d';


interface BaseModel extends IBaseModel {}

class BaseModel extends Model {
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
      properties: {
        id: { type: 'integer' },
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


const softDelete = objectionSoftDelete({
    columnName: 'deletedAt',
    deletedValue: new Date(),
    notDeletedValue: null,
});

export function getModel(hasHiddenFields = false, uniq?: string[]) {
    const plugins: any[] = [softDelete];
    if (hasHiddenFields) {
        plugins.push(visibility);
    }
    if (uniq) {
        // eslint-disable-next-line
        const unique = objectionUnique({ fields: uniq });
        plugins.push(unique);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const mixins = compose(...plugins);
    return mixins(BaseModel);
}