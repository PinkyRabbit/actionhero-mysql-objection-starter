import { wrapper } from "./wrapper";
import {RolesEnum} from "../enums";

const Model = wrapper(true, ['username', 'email']);

export class User extends Model {
    created_at: string;
    updated_at: string;
    role: RolesEnum;

    static get tableName() {
        return 'Users';
    }

    static get hidden() {
        return [
            'resetPasswordCode',
            'resetPasswordCodeTimestamp',
            'password',
        ];
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'password', 'role'],
            properties: {
                id: { type: 'integer' },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255 },
                role: { type: 'string', enum: ['super_admin', 'admin', 'viewer'] },
                resetPasswordCode: { type: ['string', null] },
                resetPasswordCodeTimestamp: { type: ['string', null], format: 'date-time' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                deletedAt: { type: ['string', null], format: 'date-time' },
            },
        };
    }

    static get roles() {
        return {
            SUPER_ADMIN: 'super_admin',
            ADMIN: 'admin',
            VIEWER: 'viewer',
        };
    }

    static get timestamp() {
        return true;
    }

    static get relationMappings() {
        return {};
    }

    $beforeInsert() {
        this.created_at = new Date().toISOString();
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }

    isSuperAdmin() {
        return this.role === User.roles.SUPER_ADMIN;
    }

    isAdmin() {
        return this.role === User.roles.ADMIN;
    }

    isViewer() {
        return this.role === User.roles.VIEWER;
    }
}