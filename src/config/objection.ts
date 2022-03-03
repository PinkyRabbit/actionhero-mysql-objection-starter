import * as path from "path";
import { Knex } from "knex";
import { ActionheroConfigInterface } from "actionhero";

const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_PASSWORD } = process.env;

const namespace = "objection";

declare module "actionhero" {
  export interface ActionheroConfigInterface {
    [namespace]: ReturnType<typeof DEFAULT[typeof namespace]>;
  }
}

const objectionDirectory = path.join(__dirname, '../../objection')
const migrations = {
  directory: path.join(objectionDirectory, './migrations'),
  stub: path.join(objectionDirectory, './stub/migrations'),
  extension: 'ts',
  loadExtensions: ['.js'],
}
const seeds = {
  directory: path.join(objectionDirectory, './seeds'),
  stub: path.join(objectionDirectory, './stub/seeds'),
  extension: 'ts',
};

export const DEFAULT = {
  [namespace]: () => {
    const config: Knex.Config  = {
      client: 'mysql',
      connection: {
        database: MYSQL_DATABASE,
        host: MYSQL_HOST,
        port: 3306,
        user: 'root',
        password: MYSQL_PASSWORD,
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations,
      seeds,
      debug: true,
    };
    return config as any;
  },
};