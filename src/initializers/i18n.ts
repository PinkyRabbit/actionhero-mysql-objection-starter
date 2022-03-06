import { Initializer, api } from 'actionhero';
import { join as pathJoin } from 'path';
import { I18n } from 'i18n';

declare module 'actionhero' {
  export interface Api {
    __(phraseOrOptions: string | i18n.TranslateOptions, ...replace: string[]): string;
  }
}

export class I18nInitializer extends Initializer {
  private readonly config = {
    locales: ['en'],
    directory: pathJoin(__dirname, '../..', '/locales'),
    updateFiles: false,
    objectNotation: true,
  };

  constructor() {
    super();
    this.name = 'i18n initializer';
    this.loadPriority = 101;
    this.startPriority = 101;
    this.stopPriority = 7777;
  }

  async initialize() {
    const i18n = new I18n();
    i18n.configure(this.config)

    /*
    const instance = new MyClass();
    const { logBound } = instance;
    logBound();
    const dotBindLog = instance.logBound.bind(instance);
    const innerLog = () => instance.logBound();
    */

    api.__ = (...args) => i18n.__(...args);
  }
}
