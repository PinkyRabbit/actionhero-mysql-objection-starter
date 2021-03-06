import { Initializer, api, log, config } from 'actionhero';
import { Model, knexSnakeCaseMappers  } from 'objection';
import Knex, { Knex as IKnex } from 'knex';

declare module 'actionhero' {
  export interface Api {
    knex: IKnex,
  }
}

export class MySqlInitializer extends Initializer {
  private knex: IKnex;

  constructor() {
    super();
    this.name = 'Objection initializer';
    this.loadPriority = 100;
    this.startPriority = 100;
    this.stopPriority = 7777;
  }

  async initialize() {
    const configWithSnakeMapper = { ...config.objection, ...knexSnakeCaseMappers };
    this.knex = Knex(configWithSnakeMapper);
    api.knex = this.knex;
    Model.knex(this.knex);
    log('MySQL initialized', 'debug', this.name);
  }

  async stop() {
    await this.knex.destroy();
    log('MySQL stopped', 'debug', this.name);
  }

  async start() {
    return this.knex.raw('select 1+1 as result')
      .then(() => {
        log('MySQL is available', 'debug', this.name);
      })
      .catch(error => {
        const { message } = error as Error;
        log(`MySQL is errored with: ${message}`, 'error', this.name);
        process.exit(1);
      });
  }
}
