import { Model, compose } from 'objection';
// @ts-ignore
import * as objectionUnique from 'objection-unique';
import objectionSoftDelete from 'objection-js-soft-delete';
import { default as visibility } from 'objection-visibility';

const softDelete = objectionSoftDelete({
    columnName: 'deleted_at',
    deletedValue: new Date(),
    notDeletedValue: null,
});

export function wrapper(hasHiddenFields = false, uniq?: string[]) {
    const plugins: any[] = [softDelete];
    if (hasHiddenFields) {
        plugins.push(visibility);
    }
    if (uniq) {
        const unique = objectionUnique({ fields: uniq });
        plugins.push(unique);
    }
    const mixins = compose(...plugins);
    return mixins(Model);
}