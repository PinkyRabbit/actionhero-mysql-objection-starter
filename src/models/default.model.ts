import { wrapper } from "./wrapper";

const Model = wrapper();

export class DefaultModel extends Model {
    created_at: string;
    updated_at: string;

    static get tableName() {
        return 'random';
    }

    // @ts-ignore
    static get hidden() {
        return [];
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['test'],
            properties: {
                id: { type: 'integer' },
                test: { type: 'string', minLength: 1, maxLength: 255 },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' },
                deleted_at: { type: ['string', null], format: 'date-time' },
            },
        };
    }

    $beforeInsert() {
        this.created_at = new Date().toISOString();
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }
}