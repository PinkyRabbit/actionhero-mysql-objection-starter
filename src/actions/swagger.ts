import { Action, config, api, RouteType } from 'actionhero';
import { PackageJson } from 'type-fest';
import * as packageJson from '../../package.json';

const SWAGGER_VERSION = '2.0';
const API_VERSION = ''; // if you need a prefix to your API routes, like `v1`

const responses = {
  200: {
    description: 'successful operation',
  },
  400: {
    description: 'Invalid input',
  },
  404: {
    description: 'Not Found',
  },
  422: {
    description: 'Missing or invalid params',
  },
  500: {
    description: 'Server error',
  },
};

export class Swagger extends Action {
  private p: PackageJson;

  constructor() {
    super();
    this.name = 'swagger';
    this.description = 'return API documentation in the OpenAPI specification';
    this.outputExample = {};
    this.p = { ...packageJson } as PackageJson;
  }

  getLatestAction(route: RouteType) {
    let matchedAction: Action;
    Object.keys(api.actions.actions).forEach((actionName) => {
      Object.keys(api.actions.actions[actionName]).forEach((version) => {
        const action = api.actions.actions[actionName][version];
        if (action.name === route.action) {
          matchedAction = action;
        }
      });
    });

    return matchedAction;
  }

  buildSwaggerPaths() {
    const swaggerPaths: {
      [path: string]: {
        [method: string]: {
          tags: string[];
          summary: string;
          consumes: string[];
          produces: string[];
          parameters: {
            in: string;
            name: string;
            type: string;
            required: boolean;
            default: string | number | boolean;
          }[];
          responses: typeof responses;
          security: string[];
        };
      };
    } = {};
    const tags: string[] = [];

    for (const [method, routes] of Object.entries(api.routes.routes)) {
      routes.map((route) => {
        const action = this.getLatestAction(route);
        if (!action) return;

        const tag = action.name.split(':')[0];
        const formattedPath = route.path
          .replace('/v:apiVersion', '')
          .replace(/\/:(\w*)/g, '/{$1}');

        swaggerPaths[formattedPath] = swaggerPaths[formattedPath] || {};
        swaggerPaths[formattedPath][method] = {
          tags: [tag],
          summary: action.description,
          // description: action.description, // this is redundant
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: Object.keys(action.inputs)
            .sort()
            .map((inputName: string) => {
              return {
                in: route.path.includes(`:${inputName}`) ? 'path' : 'query',
                name: inputName,
                type: 'string', // not really true, but helps the swagger validator
                required:
                  action.inputs[inputName].required ||
                  route.path.includes(`:${inputName}`)
                    ? true
                    : false,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                default:
                  action.inputs[inputName].default !== null &&
                  action.inputs[inputName].default !== undefined
                    ? typeof action.inputs[inputName].default === 'object'
                      ? JSON.stringify(action.inputs[inputName].default)
                      : typeof action.inputs[inputName].default === 'function'
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                      ? action.inputs[inputName].default()
                      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                      : `${action.inputs[inputName].default}`
                    : undefined,
              };
            }),
          responses,
          security: [],
        };

        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    }

    return { swaggerPaths, tags };
  }

  async run() {
    const { swaggerPaths } = this.buildSwaggerPaths();
    // const { swaggerPaths, tags } = this.buildSwaggerPaths();

    return {
      swagger: SWAGGER_VERSION,
      info: {
        description: this.p.description,
        version: this.p.version,
        title: this.p.name,
        license: { name: this.p.license },
    },
      host:
        config.web.allowedRequestHosts[0]
          ?.replace('https://', '')
          .replace('https://', '') ?? `localhost:${config.web.port}`,
      basePath: `/api/${API_VERSION}`,
      // tags: tags.map((tag) => {
      //   return { name: tag, description: `topic: ${tag}` };
      // }),
      schemes: config.web.allowedRequestHosts[0] ? ['https', 'http'] : ['http'],
      paths: swaggerPaths,

      securityDefinitions: {
      },
      externalDocs: {
        description: 'Learn more about Actionhero',
        url: 'https://www.actionherojs.com',
      },
    };
  }
}
