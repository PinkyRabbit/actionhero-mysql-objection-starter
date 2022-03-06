import { api, id, task, Action, actionheroVersion } from 'actionhero';
import { name, version, description } from '../../package.json';
import { NodeStatus } from '../enums';

// These values are probably good starting points, but you should expect to tweak them for your application
const maxMemoryAlloted = process.env.maxMemoryAlloted || 500;
const maxResqueQueueLength = process.env.maxResqueQueueLength || 1000;

export class Status extends Action {
  constructor() {
    super();
    this.name = 'status';
    this.description = 'I will return some basic information about the API';
    this.outputExample = {
      id: '192.168.2.11',
      actionheroVersion: '9.4.1',
      uptime: 10469,
    };
  }

  async run() {
    let nodeStatus = NodeStatus.HEALTHY;
    const problems: string[] = [];

    const consumedMemoryMB =
      Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;
    if (consumedMemoryMB > maxMemoryAlloted) {
      nodeStatus = NodeStatus.UNHEALTHY;
      problems.push(`Using more than ${maxMemoryAlloted} MB of RAM/HEAP`);
    }

    let resqueTotalQueueLength = 0;
    const details = await task.details();
    let resultLength = 0;
    Object.keys(details.queues).forEach((key: string) => {
      resultLength += details.queues[key] && (details.queues[key] as string).length || 0;
    });
    resqueTotalQueueLength = resultLength;

    if (length > maxResqueQueueLength) {
      nodeStatus = NodeStatus.UNHEALTHY;
      problems.push(`Resque Queues over ${maxResqueQueueLength} jobs`);
    }

    return {
      id,
      actionheroVersion,
      name,
      description,
      version,
      uptime: new Date().getTime() - api.bootTime,
      consumedMemoryMB,
      resqueTotalQueueLength,
      nodeStatus,
      problems,
    };
  }
}
