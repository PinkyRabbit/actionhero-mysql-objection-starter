import { Knex } from 'knex';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ActionheroConfigInterface } from 'actionhero';

const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_PASSWORD } = process.env;

const namespace = 'objection';

declare module 'actionhero' {
  export interface ActionheroConfigInterface {
    [namespace]: ReturnType<typeof DEFAULT[typeof namespace]>;
  }
}

export const DEFAULT = {
  [namespace]: () => {
    const config: Knex.Config  = {
      client: 'mysql',
      connection: {
        database: MYSQL_DATABASE || 'actionhero-db',
        host: MYSQL_HOST || '0.0.0.0',
        port: 3306,
        user: 'root',
        password: MYSQL_PASSWORD || 'yes',
      },
      pool: {
        min: 2,
        max: 10,
      },
      debug: true,
    };
    return config;
  },
};